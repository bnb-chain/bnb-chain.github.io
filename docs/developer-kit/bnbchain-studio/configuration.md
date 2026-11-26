---
title: BNB Agent Studio Configuration
---

# Configuration

Studio uses one runtime config, `app/agent/studio.toml`, and a gitignored secrets
file, `.studio/.env.local`, at the workspace root.

## One `studio.toml` file

`bag init` emits the runtime configuration:

| File | Sections |
|------|----------|
| `app/agent/studio.toml` | `[stack]`, `[wallet]`, `[llm.*]`, `[budget]`, `[payments.seller]`, `[payments.erc8183]`, `[payments.b402_seller]`, `[network]`, `[storage]`, provider-specific deployment state |

One runtime means one `studio.toml`. Earlier versions emitted a second config for a
separate keyless service; that tier no longer exists.

### Wallet and payout

`[wallet].address` anchors the agent wallet. Paid B402 seller payout supports
`evm-local`, `twak`, `turnkey`, and `altana`. The payout uses
`[payments.b402_seller].pay_to`, or the wallet address when that field is empty.
For Altana's EIP-7702 account, the wallet address is the admin EOA, whose locally
held admin key can move the revenue. Register merchant credentials for the exact
payout address. Outbound payment authority is separate from receiving seller payout.

Altana cannot authenticate Pieverse SIWE; choose OpenRouter, OpenAI, or Anthropic
when scaffolding an Altana agent.

### Key agent sections

```toml
[stack]
runtime   = "agentcore"
protocols = ["A2A", "X402"]

[wallet]
kind = "evm-local"
keystore_dir = "../../.studio/wallets"
# address anchored by bag wallet new

[llm]
provider = "pieverse-llm"
model = "auto/free"

[payments.seller]
price_usd = "0.10"
assets = ["TEST_U"]

[network]
default = "bsc-testnet"
```

### Deploy and rail sections

```toml
[payments.erc8183]
enabled = true
quote_ttl_seconds = 900
default_estimated_completion_seconds = 600
poll_interval_seconds = 30
auto_settle = false

[payments.b402_seller]
enabled = true
pay_to = ""       # empty means [wallet].address
work_timeout_seconds = 60
```

Studio CLI 0.0.16 uses `[payments.seller]` for one USD price shared by the selected
assets and seller rails. `price_usd = "0"` explicitly selects FREE mode. ERC-8183
still uses its on-chain job lifecycle; X402/MPP bypasses B402 settlement and has no
payout. Do not mix canonical price/asset fields with legacy per-rail pricing fields.

Keep the scaffold's supported asset subset unless the configured contracts support
additional assets. Mainnet supports U/USD1/USDC/USDT; testnet supports
`TEST_U`/`TEST_USDC`/`TEST_USDT`, without USD1. Testnet U and USDC use different token
contracts and decimals across ERC-8183 and B402; resolve them through the SDK catalog.

`[payments.x402]` configures the outbound buyer's host and recipient trust. It is
separate from the inbound `[payments.b402_seller]` rail.

Use `bag config show`, `bag config get <key>`, and `bag config set <key> <value>` for CRUD. From workspace root, pass `--project-root app/agent`.

## Environment variables

### Workspace secrets (`.studio/.env.local`)

Studio loads this file automatically. Enter secrets locally, never in chat or
command-line arguments.

| Variable | Required | Description |
|----------|----------|-------------|
| `WALLET_PASSWORD` | Local keystore | Unlocks an `evm-local` wallet or the local Altana admin keystore |
| `PIEVERSE_LLM_API_KEY` | If Pieverse | Written by `bag llm activate`; auto-managed for default provider |
| `OPENROUTER_API_KEY` | If OpenRouter | Enter privately in `.studio/.env.local` |
| `OPENAI_API_KEY` | If OpenAI | Same pattern |
| `ANTHROPIC_API_KEY` | If Anthropic | Same pattern |
| `STORAGE_LOCAL_PATH` | Local dev | Default `~/.bag/deliverables/<workspace>/`; set by `bag dev` |
| `STORAGE_API_URL`, `STORAGE_API_KEY`, `STORAGE_GATEWAY_URL` | IPFS | Upload endpoint, write credential, and read gateway |
| `B402_BASE_URL`, `B402_CLIENT_ID`, `B402_ACCESS_TOKEN`, `B402_PRIVATE_KEY_B64` | Paid B402 seller | Per-agent, per-environment merchant credentials; FREE mode needs none |
| `TURNKEY_API_PUBLIC_KEY`, `TURNKEY_API_PRIVATE_KEY`, `TURNKEY_ORG_ID`, `TURNKEY_SIGN_WITH` | Turnkey | API credentials and the account's wallet address |
| `TWAK_WALLET_PASSWORD` | TWAK | Unlocks the project-dedicated TWAK wallet |

### Deploy-time secrets

Deployment excludes secrets and keystores from the packaged `app/agent/` code and
sends the required runtime secrets separately through the selected provider's channel.

| Wallet | Runtime authority |
| --- | --- |
| `evm-local` | Encrypted `WALLET_KEYSTORE_JSON` plus its unlock password |
| `altana` | Only `ALTANA_SESSION`; the admin keystore and password stay local |

See [Deployment](deployment.md) for provider channels and [Security](security.md)
for the TWAK and Turnkey custody boundaries.

## Local development wiring

`bag dev` runs the selected faces in one process: A2A on port `9000`, or MCP-only
on port `8000`. A2A+MCP uses `dualMain.ts` on port `9000` with tunneled `/mcp`.
Local deliverable storage is for development and fails deployment readiness.

## MCP seller face

Select MCP with `--protocols MCP` or `--protocols A2A,MCP` at initialization and
run it with `bag dev`. Its bounded seller operations can sign quotes and submit
verified funded jobs; its chain-read tools do not send transactions. There is no
`bag mcp serve` command in Studio CLI 0.0.16.

## CLI config helpers

```bash
bag config show --project-root app/agent
bag config get payments.seller.price_usd --project-root app/agent
bag config set payments.seller.price_usd 0.10 --project-root app/agent
bag env get OPENROUTER_API_KEY --project-root app/agent
```

`bag env get` redacts secrets. `bag env set` rejects wallet passwords and private
signing credentials; enter those privately in `.studio/.env.local`.

[← BNB Agent Studio overview](index.md)
