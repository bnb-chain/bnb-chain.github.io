---
title: MPP SDK Architecture
---

# Architecture

`@bnb-chain/mpp` exposes three entry points sharing one wire contract:

- `@bnb-chain/mpp` — top-level barrel (`chargeFromDecimal`, the receipt
  codec, the `chargeMethod` instance)
- `@bnb-chain/mpp/server` — `preflightCharge` / `charge` / `chargeAsync`
  server factory + the four credential verifiers
- `@bnb-chain/mpp/client` — the four credential constructors

The **single source of truth for the wire shape** is `src/Methods.ts`
(`chargeMethod` = a `Method.from({...})` instance). Server and client both
import it, so a wire-schema change is impossible to make on one side only.

## End-to-end data flow

```
        ┌─────────── server (@bnb-chain/mpp/server) ───────────┐
        │                                                       │
  preflightCharge(params)                                       │
        │  curated (chain,token) resolve → currency/decimals/   │
        │  chainId/permit2Address; Permit2 eth_getCode probe;   │
        │  settlement signer resolve; EIP-712 domain resolve    │
        ▼                                                        │
   charge(prepared) → Method.Server                             │
        │  defaults (incl. permit2Spender), request hook,       │
        │  stableBinding, verify router                         │
        ▼                                                        │
   charge handler → HTTP route                                 │
        │                                                       │
        ▼                                                        │
   GET /resource (no credential)                                │
        └──────────────▶ 402 + WWW-Authenticate: Payment <challenge>
                                       │
        ┌────────── client (@bnb-chain/mpp/client) ─────────────┐
        │  Challenge.deserialize(header)                        │
        │  createXxxCredential({ challenge, account, ... })     │
        │    parseEvmChargeChallenge → accepted-type gate →     │
        │    per-field match → sign (EIP-712 / EIP-1559) /      │
        │    broadcast (hash)                                   │
        ▼                                                        │
   GET /resource  Authorization: Payment <credential>           │
        └──────────────▶ verify router (by payload.type)        │
                                       │                         │
        ┌─────────── verifier (per credential type) ────────────┐
        │  challenge binding check (managed/hmac/lookup)      │
        │  accepted-types gate → local checks → replay reserve  │
        │  → on-chain settle (permit2/auth) or correlate (hash) │
        │  → markConsumed → buildEvmReceipt                     │
        ▼                                                        │
   200 + Payment-Receipt: <serializeEvmReceipt(receipt)>        │
        └───────────────────────────────────────────────────────┘
```

## Layers

### Wire schema — `src/Methods.ts`

`chargeMethod.schema.request` is the zod-mini allowlist for the
challenge's `request` payload. `methodDetails` REQUIRED fields are
`chainId` + `permit2Address`; OPTIONAL are `permit2Spender`,
`credentialTypes`, `decimals`, `splits`. `credentialPayload` is a
discriminated union over `type` for the four credential shapes.

Anything REQUIRED here must be present at `schema.request.parse()` time —
the server factory injects defaults _before_ parse; it is never the
request hook's job to backfill REQUIRED fields.

### Server factory — `src/server/Charge.ts`

`preflightCharge(params)` resolves everything that needs I/O or curated
lookups up front:

- curated `(chain, token)` → `currency` / `decimals` / `chainId` /
  `permit2Address` (`src/server/curated.ts`)
- Permit2 deployment probe via `eth_getCode` (drops `permit2` from the
  accepted set if not deployed)
- settlement signer (`src/server/Settlement.ts`) — required iff
  `permit2` or `authorization` is in the resolved set
- EIP-712 domain (`name` / `version`) for `authorization` from the
  curated presets (see upstream `curated.ts`)
- replay store (presence-only check; durable backend is a deployment
  claim — see [replay-store.md](replay-store.md))

`charge(prepared)` builds the `Method.Server` with four hooks:

- **defaults** — every REQUIRED `methodDetails` field, plus
  `permit2Spender` (from the settlement signer's address) when a signer
  is configured
- **request hook** — route-override guard (§14.10): rejects any route
  option that tries to change a server-pinned field, and rejects partial
  `methodDetails` (shallow merge — a partial would silently drop fields)
- **stableBinding** — augments the default HMAC binding to cover the full
  `methodDetails` (not just `chainId` + `splits`)
- **verify** — challenge-binding check, then the accepted-types gate,
  then dispatch by `credential.payload.type` to the matching verifier

### Verifiers — `src/server/{Hash,Transaction,Permit2,Authorization}.ts`

Each verifier follows the same skeleton: cheap local checks (no I/O) →
replay-slot reserve → on-chain action → `markConsumed` → `buildEvmReceipt`.
The replay store is a 3-state CAS machine; see
[replay-store.md](replay-store.md) for the inflight/consumed/rejected
transitions and the terminal-commit phase that prevents double-spend.

- **hash** — correlate an existing on-chain `Transfer` log against the
  challenge (payer already broadcast)
- **transaction** — `sendRawTransaction` the payer's signed EIP-1559 RLP,
  then assert the receipt
- **permit2** — recover the EIP-712 signer, `permitWitnessTransferFrom`
  (single) / `permitBatchWitnessTransferFrom` (batch), assert all
  `Transfer` logs. The EIP-712 `spender` MUST equal the settlement signer
  (published in `methodDetails.permit2Spender` on the challenge).
- **authorization** — recover the EIP-3009 signer against the curated
  token domain, `transferWithAuthorization`, assert the `Transfer` log

### Client constructors — `src/client/{Hash,Transaction,Permit2,Authorization}.ts`

Each `createXxxCredential` runs the shared challenge guards
(`src/client/internal/AssertChallenge.ts`): `parseEvmChargeChallenge`
(method/intent + schema parse) → `assertCredentialTypeAccepted` (the type
must be in the challenge's advertised set; default `['transaction','hash']`
when omitted) → `assertMatchesChallengeRequest` (caller fields must equal
wire truth) → sign / broadcast → `Credential.serialize` (returns the
complete `Payment ...` Authorization header value).

### Receipt codec — `src/server/Receipt.ts`

`buildEvmReceipt` / `serializeEvmReceipt` / `deserializeEvmReceipt`
implement the payment receipt (`method` / `challengeId` / `reference` /
`status` / `timestamp` / `chainId` / optional `externalId`). The codec
is browser-safe (no Node `Buffer`) so the demo can round-trip it
client-side. The SDK ships its own `evmHttpTransport`
(`src/server/Transport.ts`) that `charge()` auto-wires on the per-method
transport slot.

## Challenge binding modes

`challengeBinding.mode` on `ServerParameters` selects how a credential's
embedded challenge is trusted (`src/server/ChallengeBinding.ts`):

- **`mppx-managed`** — integrated HTTP handler path; `Challenge.verify`
  HMAC + `Expires.assert` run automatically. The SDK adds method/intent +
  route-binding guards.
- **`mppx-hmac`** — bare `Method.toServer(...).verify`; the SDK runs the
  full `Challenge.verify({ secretKey })` + `Expires.assert` itself.
- **stored-lookup** — no server secret; the deployment persists each
  issued challenge (`rememberChallenge`) and the verifier constant-time
  compares the inbound challenge's canonical wire form against the stored
  snapshot (`src/server/ChallengeStore.ts`).

## Source map

See the package source map in the repository for the file-by-file layout and contributor
workflow rules.
