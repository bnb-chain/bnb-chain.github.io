---
title: MPP SDK
---

# MPP SDK (@bnb-chain/mpp)

Payment-gated HTTP for **BNB Smart Chain** and **opBNB**. Compose server handlers that return `402 Payment Required` and accept `permit2`, `transaction`, `hash`, and `authorization` (EIP-3009) credentials.

## Capabilities

| Area                  | Supported                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Credential types**  | `authorization` (EIP-3009), `permit2` (single + batch with splits), `transaction` (EIP-1559), `hash`                           |
| **Challenge binding** | Managed, HMAC, and stored-lookup modes (`mppx-managed`, `mppx-hmac`, `stored-lookup`)                                            |
| **Settlement**        | Server-side broadcast for `permit2` / `authorization` (settlement signer pays gas); payer-broadcast for `hash` / `transaction` |
| **Networks**          | Curated `(chain, token)` presets for BSC and opBNB — see [Curated presets](#curated-presets) and [Networks](#networks)       |
| **Receipt**           | `Payment-Receipt` header via a browser-safe codec (`buildEvmReceipt` / `serializeEvmReceipt`)                                  |
| **Replay protection** | 3-state atomic store (inflight / consumed / rejected); durable backend required in production                                  |

All four credential paths are live end-to-end — see [Examples](examples.md). For architecture and replay protection, use the guides below.

v1 limits: curated presets only (no arbitrary BYO ERC-20).

## Install

```bash
pnpm add @bnb-chain/mpp viem
```

Peer: `viem ^2.51.0`. Node ≥ 22 (development uses Node 22 stable).

## Curated presets

The SDK ships curated `(chain, token)` presets for BSC and opBNB. Each preset includes chain metadata, decimals, supported credential types, and EIP-3009 domain parameters where applicable.

Pass `chain` and `token` string keys to `chargeAsync()` — unsupported pairs throw `CuratedLookupError`.

## Networks

| Preset        | chainId | Default confirmations | Notes        |
| ------------- | ------- | --------------------- | ------------ |
| bsc           | 56      | 3                     | reorg buffer |
| opbnb         | 204     | 1                     |              |
| bsc-testnet   | 97      | 0                     | dev velocity |
| opbnb-testnet | 5611    | 0                     | dev velocity |

Permit2 deployment is auto-probed at `preflightCharge` time via `eth_getCode` against the resolved deployment. `rpcUrl` and `chainOverride` may only override an existing preset's RPC / viem `Chain` metadata.

---

## Documentation

| Guide | Description |
|-------|-------------|
| [Quickstart](quickstart.md) | End-to-end server + client walkthrough (BSC Testnet) |
| [Architecture](architecture.md) | Wire schema, server factory, verifiers, client constructors |
| [Replay store](replay-store.md) | Durable atomic replay protection |
| [Examples](examples.md) | `charge-server`, `charge-demo`, `bnb-wire-demo` |

[← Developer Kit overview](../index.md)
