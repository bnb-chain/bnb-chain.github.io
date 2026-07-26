---
title: MPP SDK Examples
---

Three runnable examples under `examples/`. The first two are designed to
run **together** — the browser demo drives real end-to-end flows against
the local server; the third (`bnb-wire-demo`) is a standalone CLI
inspector that needs no server.

| Example                                      | What it is                                                                                                                                                                                                     |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [charge-server](https://github.com/bnb-chain/mpp-sdk/tree/main/examples/charge-server) | Minimal Hono HTTP server using `@bnb-chain/mpp/server`. Six protected routes (article / download / tip / split / hash-only / stored-lookup) + a public `/api/config`, BSC Testnet preset, `permit2` / `transaction` / `hash`. |
| [charge-demo](https://github.com/bnb-chain/mpp-sdk/tree/main/examples/charge-demo)     | React + shadcn/ui + wagmi browser app driving the full client flow against the server.                                                                                                                         |
| [bnb-wire-demo](https://github.com/bnb-chain/mpp-sdk/tree/main/examples/bnb-wire-demo) | Standalone CLI wire-shape inspector — resolves each curated `(chain, token)` via the SDK and prints the challenge / credentialTypes / EIP-712 domain / receipt shape. No on-chain broadcast. |

## Running both together

```bash
# Terminal 1 — server on :3000 (needs examples/charge-server/.env)
pnpm --filter @bnb-chain/mpp-example-charge-server start

# Terminal 2 — demo on :5173
pnpm --filter @bnb-chain/mpp-example-charge-demo dev
```

The demo's Vite dev server proxies `/api/*` → `http://localhost:3000`
(override with `VITE_CHARGE_SERVER_URL`), so the browser talks to the
server with no CORS setup. Both `start` / `dev` run a `prestart` /
`predev` hook (`pnpm -C ../.. build`) to rebuild the SDK `dist/` first.

## charge-server

Configured for a BSC testnet curated preset (see upstream `curated.ts`),
accepting `permit2` / `transaction` / `hash`. Because `permit2` settles
server-side, it requires `SETTLEMENT_PRIVATE_KEY` (a hot signer holding
tBNB for gas) alongside `RECIPIENT_ADDRESS` + `MPP_SECRET_KEY`.

Its `402` advertises `permit2Spender` (the settlement signer's address)
in `methodDetails` — required so Permit2 clients sign with the right
EIP-712 `spender` (read from `methodDetails.permit2Spender` on the challenge).

For a fully payer-funded path (no server gas), hit `/api/hash-only` — its
handler advertises only `['transaction', 'hash']` and carries no
settlement signer.

Full setup + the client-side settlement snippet:
[examples/charge-server/README.md](https://github.com/bnb-chain/mpp-sdk/tree/main/examples/charge-server/README.md).

## charge-demo

A 4-step flow (Fetch challenge → Build credential → Local verify → Submit
& settle), per credential type, with each type's state kept in its own
pool. End-to-end mode (default) does the real server roundtrip; toggle it
off for local-only wire-shape inspection. Includes a Permit2 allowance
panel that handles the one-time `approve(Permit2, max)`.

Per-credential realism (what's on-chain vs in-page) and the source layout:
[examples/charge-demo/README.md](https://github.com/bnb-chain/mpp-sdk/tree/main/examples/charge-demo/README.md).

## bnb-wire-demo

A standalone CLI that resolves curated `(chain, token)` presets through
the SDK and prints, for each, the wire shapes a real deployment would
emit — resolved currency / decimals / chainId / `permit2Address`, the
advertised `credentialTypes`, the EIP-712 domain, and the receipt shape.
It does **no** on-chain broadcast and needs no server or signer.

```bash
pnpm --filter @bnb-chain/mpp-example-bnb-wire-demo start
```

[← MPP SDK overview](index.md)
