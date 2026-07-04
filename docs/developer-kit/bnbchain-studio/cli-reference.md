---
title: BNB Agent Studio CLI Reference
---

# CLI Reference

The `bag` CLI exposes 19 command groups. Run `bag --help` or `bag <group> --help` for full flag lists.

## Command groups

| Group | Purpose | Key subcommands |
|-------|---------|-----------------|
| `init` | Scaffold a two-layer workspace | `bag init <name> [--framework adk] [--runtime agentcore] [--llm-provider pieverse-llm] [--network bsc-testnet] [--no-onboard] [--ide claude-code\|cursor\|both]` |
| `scan` | Detect project type + manifest | `bag scan` |
| `recipe` | Print recipe code/files | `list` / `show` / `code` |
| `skills` | Install IDE skills | `list` / `install --target {claude-code,cursor,both}` / `uninstall` |
| `wallet` | Local keystore helpers | `new` / `show` / `list` / `sign` |
| `erc8004` | ERC-8004 identity | `register` / `show` / `resolve` / `update-endpoint` |
| `erc8183` | ERC-8183 commerce | `publish` / `list` / `status` / `buy` / `submit` / `fetch` / `settle` |
| `x402` | x402 payment client | `quote` / `buy` |
| `agents` | Global agent-project registry | `list` / `show` / `forget` / `register` |
| `config` | `studio.toml` CRUD | `show` / `get` / `set` / `list-keys` |
| `env` | `.env.local` editor | `set` / `get` |
| `dev` | Run both layers locally | `bag dev [--agent-only] [--service-only] [--port N] [--service-port N]` |
| `doctor` | Diagnose project + environment | `bag doctor` |
| `deploy` | Two-artifact deploy | `prepare` / `agent` / `package` / `verify` / `status` / `destroy` / `logs` |
| `mcp` | Read-only MCP server | `serve` / `tools` |
| `bundle` | Offline agent tarball | `bag bundle` |
| `budget` | Auto-topup policy | `show` / `enable` / `disable` |
| `audit` | On-chain action audit log | `ls` / `tail` / `show` |
| `llm` | LLM provider helpers | `test` / `activate` / `status [--full]` / `topup` / `allocate` / `rotate` / `list-models` / `usage` |

## Common workflows

### Scaffold and onboard

```bash
bag init my-seller --network bsc-testnet
bag wallet show
bag llm status --full
```

### Register on-chain identity

```bash
bag erc8004 register --endpoint https://my-service.example.com/apex/
bag erc8004 show
```

### Operate ERC-8183 jobs

```bash
bag erc8183 list
bag erc8183 status --job-id 42
bag erc8183 settle --job-id 42
```

### Local development

```bash
bag dev
bag doctor
```

### Deploy

```bash
bag deploy prepare
bag deploy prepare --include-service-preflight   # opt-in EC2 IAM simulation
bag deploy agent
bag deploy package                               # Layer B zip → dist/
bag deploy verify --endpoint https://my-service.example.com
bag deploy status
```

## MCP tools (read-only)

Run `bag mcp tools` for the live list. All 15 tools are read-only — no signing, no on-chain state change:

| Category | Tools |
|----------|-------|
| Wallet | `wallet_info`, `wallet_list`, `wallet_address` |
| Balances | `balance_native`, on-chain ERC-20 balance |
| Network | `network_info`, `tx_status`, `block_info`, `contract_call_view` |
| ERC-8004 | `agent_info`, `agent_by_address` |
| ERC-8183 | `job_status`, `job_list`, `job_count` |
| LLM | `pieverse_usage` |

## Project resolution

Agent-side commands (`wallet`, `llm`, `deploy`, `budget`, `audit`, `x402`) resolve from:

- Inside `app/agent/` — cwd finds `app/agent/studio.toml` directly, or
- Workspace root — `find_project_root()` fallback resolves to `app/agent/`

Cross-layer commands (`doctor`, `scan`, `erc8004 register`) operate on whichever layer they need. Use `--project-root` on `config` and `env` to target a specific layer without `cd`.

## Runtime name rules

AgentCore runtime names must match `^[A-Za-z][A-Za-z0-9]{0,22}$` (no `-`, `_`, `.`). `bag doctor` validates `agentcore/agentcore.json` names and fails on violations.

## Flat imports in emitted code

Emitted `app/agent/` and `app/service/` use **flat** (top-level) imports because AgentCore runs `main.py` as a top-level module:

```python
from managed_model import X      # correct
from .managed_model import X     # wrong — bag doctor warns
```

## Further reference

Full capability reference: [GitHub — reference.md](https://github.com/bnb-chain/bnbagent-studio/blob/main/docs/reference.md)

[← BNB Agent Studio overview](index.md)
