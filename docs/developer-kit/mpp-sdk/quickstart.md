---
title: MPP SDK Quickstart
---

# Quickstart

A runnable, end-to-end walkthrough of `@bnb-chain/mpp`: stand up a server
that gates a route behind an on-chain payment (`402 Payment Required`),
then build a client credential, submit it, and read the `Payment-Receipt`.

This guide uses **BSC Testnet (chainId 97)** with a curated preset from the
upstream curated preset registry — the same defaults the bundled
[examples](https://github.com/bnb-chain/mpp-sdk/tree/main/examples) run on. Swap to any other curated `(chain, token)` pair by changing two strings; see
[Curated presets](#curated-presets).

> Prefer reading code? [examples/charge-server](https://github.com/bnb-chain/mpp-sdk/tree/main/examples/charge-server)
> + [examples/charge-demo](https://github.com/bnb-chain/mpp-sdk/tree/main/examples/charge-demo) are the full, running
> version of everything below.

## Contents

- [Install](#install)
- [Concepts in 30 seconds](#concepts-in-30-seconds)
- [1. Server — protect a route](#1-server--protect-a-route)
- [2. Client — pay the 402](#2-client--pay-the-402)
- [3. Read the receipt](#3-read-the-receipt)
- [Curated presets](#curated-presets)
- [Challenge binding modes](#challenge-binding-modes)
- [Production checklist](#production-checklist)

## Install

```bash
pnpm add @bnb-chain/mpp viem
```

Peer: `viem ^2.51.0`. **Node ≥ 22.**

Three entry points:

| Import | Use it for |
| --- | --- |
| `@bnb-chain/mpp/server` | The server factory (`chargeAsync` / `preflightCharge` / `charge`). |
| `@bnb-chain/mpp/client` | The four credential constructors (`createHashCredential`, `createPermit2Credential`, …). |
| `@bnb-chain/mpp` | Universal helpers — `chargeFromDecimal` (decimal → base units) and the `Payment-Receipt` codec. |

## Concepts in 30 seconds

```
client                                    server (@bnb-chain/mpp/server)
  │                                       │
  │ GET /article (no credential)          │
  │ ─────────────────────────────────────►│ 402 + WWW-Authenticate: Payment <challenge>
  │ ◄─────────────────────────────────────│ (challenge binds chain/token/amount/recipient)
  │                                       │
  │ build credential for one of:          │
  │   hash | transaction | permit2 |      │
  │   authorization                       │
  │                                       │
  │ GET /article                          │
  │ Authorization: Payment <credential>   │
  │ ─────────────────────────────────────►│ verify → settle on-chain (permit2) or
  │ ◄─────────────────────────────────────│ confirm the payer's tx (hash) →
  │ 200 + Payment-Receipt: <receipt>      │ 200 + content
```

- **`hash` / `transaction`** are payer-funded — the payer broadcasts their own
  transfer; the server only verifies it. No settlement signer needed.
- **`permit2` / `authorization`** are server-settled — the server broadcasts
  `permitWitnessTransferFrom` / `transferWithAuthorization`, so it needs a
  funded **settlement signer** (`settlementAccount`).
- A preset only advertises `authorization` if its curated entry has EIP-3009
  support. Plain BEP-20 presets advertise `['permit2', 'transaction', 'hash']`.

## 1. Server — protect a route {#1-server--protect-a-route}

`chargeAsync(params)` resolves the curated `(chain, token)` preset to decimals
and deployment metadata, probes Permit2, and returns a charge method.
Register it with your HTTP payment handler, then call
`handler.evm.charge({ amount })(request)` per route: it returns a `402`
challenge when there's no valid credential, or settles and gives you a
`withReceipt()` wrapper when there is. See [Examples](examples.md) for a
full runnable server.

```ts
import { privateKeyToAccount } from 'viem/accounts'
import type { Address, Hex } from 'viem'

import { chargeAsync } from '@bnb-chain/mpp/server'

// Settlement signer — broadcasts Permit2 settlement; must hold gas (tBNB on
// BSC Testnet). Required when the preset advertises permit2.
const settlementAccount = privateKeyToAccount(
  process.env.SETTLEMENT_PRIVATE_KEY as Hex,
)

const charge = await chargeAsync({
  chain: 'bsc-testnet',
  token: '<bsc-testnet-preset>',
  recipient: process.env.RECIPIENT_ADDRESS as Address,
  settlementAccount,
  challengeBinding: { mode: 'mppx-managed' },
  rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  // store: createDurableReplayStore(...) // REQUIRED in production — see checklist
})

// Register `charge` with your HTTP payment handler and mount paid routes.
// Full Hono/Express wiring: see charge-server in Examples.
```

`.env`:

```bash
RECIPIENT_ADDRESS=<merchant-address>
MPP_SECRET_KEY=...            # openssl rand -hex 32
SETTLEMENT_PRIVATE_KEY=<hex-private-key>  # fund with tBNB (https://testnet.bnbchain.org/faucet-smart)
```

Probe the challenge phase:

```bash
curl -i http://localhost:3000/article
# HTTP/1.1 402 Payment Required
# WWW-Authenticate: Payment id="…", realm="…", method="evm", intent="charge", request="<base64url>", …
```

> Already have a route hook before `chargeAsync` resolves? Use the two-step
> form: `const prepared = await preflightCharge(params)` (does the curated
> resolution + Permit2 probe) then `charge(prepared)` (synchronous).
> `chargeAsync` is just sugar for `charge(await preflightCharge(params))`.

## 2. Client — pay the 402 {#2-client--pay-the-402}

Deserialize the challenge from the server's `WWW-Authenticate` header, then
call the constructor matching one of the advertised
`methodDetails.credentialTypes`. Each constructor returns the **complete**
`Authorization` header value (the `Payment ` prefix is already included — do
not add it again).

All signing inputs (`chainId`, `currency`, `recipient`, `amount`,
`permit2Address`) must equal the challenge's — read them off
`challenge.request`.

Fetch the protected URL without credentials to receive a `402` and deserialize
the `WWW-Authenticate` challenge. The [charge-demo](examples.md) example shows
the full client wiring; the credential builders below take that parsed
`challenge` object.

```ts
import {
  http,
  createWalletClient,
  encodeFunctionData,
  type Address,
  type Hex,
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { bscTestnet } from 'viem/chains'

import { createHashCredential, createPermit2Credential } from '@bnb-chain/mpp/client'

const payer = privateKeyToAccount(process.env.PAYER_PRIVATE_KEY as Hex)

// `challenge` — from the 402 WWW-Authenticate header (see charge-demo).
const req = challenge.request as {
  amount: string
  currency: Address
  recipient: Address
  methodDetails: { chainId: number; permit2Address: Address; credentialTypes: string[] }
}
const { amount, currency, recipient } = req
const { chainId, permit2Address } = req.methodDetails
```

### Option A — `hash` (payer broadcasts, then references the tx)

```ts
// Broadcast the ERC-20 transfer yourself (needs the token + gas), then point
// the credential at the resulting tx hash.
const wallet = createWalletClient({ account: payer, chain: bscTestnet, transport: http() })
const txHash = await wallet.sendTransaction({
  to: currency,
  data: encodeFunctionData({
    abi: [{ type: 'function', name: 'transfer', stateMutability: 'nonpayable',
      inputs: [{ name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }],
      outputs: [{ type: 'bool' }] }],
    functionName: 'transfer',
    args: [recipient, BigInt(amount)],
  }),
})

const credential = await createHashCredential({ challenge, hash: txHash })
```

### Option B — `permit2` (sign EIP-712; the server settles)

```ts
// Permit2 nonces are unordered + single-use, so a fresh random 256-bit value
// per credential is fine (uniqueness, not sequence, is what matters).
const randomNonce = (): string => {
  const b = crypto.getRandomValues(new Uint8Array(32))
  return BigInt('0x' + [...b].map((x) => x.toString(16).padStart(2, '0')).join('')).toString()
}

const credential = await createPermit2Credential({
  challenge,
  account: payer,            // a viem LocalAccount
  chainId,
  permit2Address,            // from the challenge — NOT a hard-coded constant
  currency,
  recipient,
  amount,
  nonce: randomNonce(),                                  // unordered, single-use
  deadline: String(Math.floor(Date.now() / 1000) + 600), // +10 min
  // splits: omit — the SDK reads them from the challenge if present
})
```

> Permit2 prerequisite: the payer must have approved Permit2 once for the
> token (`ERC20.approve(permit2Address, max)`), and the credential is signed
> against the server's `methodDetails.permit2Spender` (the SDK reads it from
> the challenge automatically).

### Submit the credential

```ts
const paid = await fetch(protectedUrl, { headers: { Authorization: credential } })
console.log(paid.status)                          // 200
const receiptHeader = paid.headers.get('Payment-Receipt')!
console.log(await paid.json())
```

> **Browser wallets (MetaMask, etc.):** pass an `account` whose
> `signTypedData` delegates to the wallet (e.g. wagmi's
> `walletClient.signTypedData`) instead of a `privateKeyToAccount`. See
> [examples/charge-demo/src/actions](https://github.com/bnb-chain/mpp-sdk/tree/main/examples/charge-demo/src/actions)
> for the adapter.

## 3. Read the receipt

The `Payment-Receipt` header carries the settlement receipt. Decode it with
the codec from the top-level barrel:

```ts
import { deserializeEvmReceipt } from '@bnb-chain/mpp'

const receipt = deserializeEvmReceipt(receiptHeader)
// { method, challengeId, reference, status, timestamp, chainId, externalId? }
// `reference` is the on-chain settlement / transfer tx hash.
```

## Curated presets {#curated-presets}

`chain` / `token` are restricted to curated presets (v1 — no arbitrary BYO ERC-20). An unsupported pair throws `CuratedLookupError`.

The authoritative preset list is **not duplicated here**. See:

- [MPP SDK overview — Curated presets](index.md#curated-presets)
- [Examples](examples.md) for runnable BSC testnet defaults

## Challenge binding modes

`challengeBinding` is required on `ServerParameters`:

- `{ mode: 'mppx-managed' }` — integrated HTTP handler path;
  `Challenge.verify` + `Expires.assert` run automatically. Pair with
  `secretKey` on the handler.
- `{ mode: 'mppx-hmac', secretKey }` — bare `Method.toServer(...).verify`
  path for custom hosts.
- `{ mode: 'stored-lookup', challengeStore }` — HMAC-free; the server
  persists each issued challenge (`rememberChallenge`) and compares
  canonical bytes at verify.

## Production checklist

- **Replay store** — pass a durable, atomic `store` (Redis / Postgres /
  Cloudflare KV). Under `NODE_ENV=production`, omitting it throws at startup.
  `Store.memory()` is dev/test only. See [replay-store.md](replay-store.md).
- **Settlement signer** — fund it and treat the key as a hot wallet (rotate,
  scope per-deployment). Only needed for permit2 / authorization.
- **RPC** — pin your own provider via `rpcUrl`; public endpoints rate-limit.
- **Hardening** — rate-limit, gas budget, and degrade-to-payer-funded
  patterns are shown in [examples/charge-server](https://github.com/bnb-chain/mpp-sdk/tree/main/examples/charge-server)
  (`src/hardening.ts`).

## See also

- [examples.md](examples.md) — the runnable examples
- [architecture.md](architecture.md) — how the pieces fit
- [replay-store.md](replay-store.md) — durable replay-store backends
