---
title: BNB Agent Studio Configuration
---

# Configuration

BNB Agent Studio projects use two config files per layer plus environment variables. The workspace root holds the keystore but **no** `studio.toml` or `.env.local`.

## Two `studio.toml` files

`bag init` emits independent configs:

| File | Sections |
|------|----------|
| `app/agent/studio.toml` | `[stack]`, `[wallet]`, `[llm.*]`, `[budget]`, `[payments.erc8183]`, `[payments.x402]`, `[network]`, `[storage]`, `[identity]`, `[deploy]` |
| `app/service/studio.toml` | `[network]`, `[agent]`, `[deploy]`, `[storage]`, `[provider]`, `[payments.erc8183]` |

### Cross-layer sync

Only two values legitimately live in **both** files:

| Field | Agent | Service | Sync mechanism |
|-------|-------|---------|----------------|
| `[network].default` | signs on it | scans on it | `bag config set network.*` mirrors both |
| Provider EOA | `[wallet].address` | `[provider].address` | `bag wallet new` writes both |

`bag doctor` warns on drift. Everything else is layer-only — do not duplicate agent-only sections into the Service config.

### Key agent sections

```toml
[stack]
framework = "adk"
runtime   = "agentcore"

[wallet]
# address derived from keystore

[llm.pieverse]
# key_hash, provider config (default provider)

[payments.erc8183]
min_price = "100000000000000000"    # raw units (18 decimals)
max_price = "1000000000000000000"

[network]
default = "bsc-testnet"
```

### Key service sections

```toml
[agent]
runtime_arn = ""   # filled after Layer A deploy

[payments.erc8183]
poll_interval_seconds = 30
auto_settle = true

[provider]
# address synced from wallet via bag wallet new
```

Use `bag config show`, `bag config get <key>`, and `bag config set <key> <value>` for CRUD. From workspace root, pass `--project-root app/agent` or `--project-root app/service`.

## Environment variables

### Agent (`app/agent/.env.local`)

| Variable | Required | Description |
|----------|----------|-------------|
| `WALLET_PASSWORD` | Yes | Unlocks the encrypted keystore at workspace root `.studio/wallets/` |
| `PIEVERSE_LLM_API_KEY` | If Pieverse | Written by `bag llm activate`; auto-managed for default provider |
| `OPENROUTER_API_KEY` | If OpenRouter | Set via `bag env set` when using non-default LLM provider |
| `OPENAI_API_KEY` | If OpenAI | Same pattern |
| `ANTHROPIC_API_KEY` | If Anthropic | Same pattern |
| `STORAGE_LOCAL_PATH` | Local dev | Default `~/.bag/deliverables/<workspace>/`; set by `bag dev` |
| `STORAGE_S3_BUCKET` | Deploy | Deliverable storage on AWS |
| `STORAGE_IPFS_GATEWAY` | Deploy | IPFS gateway for deliverables |
| `STUDIO_AGENT_LOCAL_URL` | Service-only dev | Agent URL when running `bag dev --service-only` |

### Service (`app/service/.env.local`)

The Service is keyless — **no wallet secrets**. It may read runtime connection vars injected at deploy time. `bag deploy package` **never** includes any `.env*` in the Service zip.

### Deploy-time secrets (Layer A)

| Mode | Keystore delivery |
|------|-------------------|
| `secretsmanager` (default) | `WALLET_KEYSTORE_JSON` injected from AWS Secrets Manager |
| `envvars` (testnet only) | Plaintext in `agentcore.json` — refused on mainnet |

## Local development wiring

`bag dev` sets `STORAGE_LOCAL_PATH` for both layers so deliverable handoff works. The Service connects to the Agent via `STUDIO_AGENT_LOCAL_URL` (default `http://localhost:8080`).

## MCP server requirements

Run `bag mcp serve` with:

- Working directory at workspace root or inside `app/agent/` (resolves `studio.toml` via walk-up)
- `WALLET_PASSWORD` in environment (read-only — used to resolve address, never to sign)

## CLI config helpers

```bash
bag config show --project-root app/agent
bag config set payments.erc8183.min_price 100000000000000000 --project-root app/agent
bag env set WALLET_PASSWORD <password> --project-root app/agent
bag env get WALLET_PASSWORD --project-root app/agent
```

[← BNB Agent Studio overview](index.md)
