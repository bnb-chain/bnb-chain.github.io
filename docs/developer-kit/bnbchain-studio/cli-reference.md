---
title: BNB Agent Studio CLI Reference
---

# CLI Reference

This reference follows Studio CLI 0.0.16. Run `bag --help` or
`bag <group> --help` for the installed version's full flag lists.

## Command groups

| Group | Purpose | Key subcommands |
|-------|---------|-----------------|
| `init` | Scaffold a seller agent workspace | `bag init <name> [--runtime agentcore\|azure-foundry] [--network bsc-testnet] [--wallet-kind evm-local\|twak\|turnkey\|altana] [--protocols A2A,MCP,X402] [--payment-protocol x402\|mpp] [--seller-price-usd 0.10] [--storage-provider local\|ipfs\|s3\|azure-blob] [--no-onboard]` |
| `scan` | Detect project type + manifest | `bag scan` |
| `recipe` | Print recipe code/files | `list` / `show` / `code` |
| `skills` | Install IDE skills | `list` / `install --target {claude-code,cursor,both}` / `uninstall` |
| `wallet` | Wallet and Altana-session operations | `new` / `twak-init` / `show` / `list` / `sign` / `balance` / `fund` / `policy` / `session` |
| `erc8004` | ERC-8004 identity | `register` / `show` / `resolve` / `update-endpoint` |
| `erc8183` | ERC-8183 commerce | `list` / `status` / `buy` / `submit` / `fetch` / `settle` |
| `x402` | x402 buyer and B402 seller configuration | `trust` / `quote` / `buy` / `sell init` / `sell status` |
| `mpp` | Native MPP+B402 buyer | `trust` / `quote` / `buy` |
| `agents` | Global agent-project registry | `list` / `show` / `forget` / `register` |
| `config` | `studio.toml` CRUD | `show` / `get` / `set` / `list-keys` |
| `env` | `.env.local` editor | `set` / `get` |
| `dev` | Run the selected faces in one local runtime | `bag dev [--port N] [--host HOST] [--reload] [--in-process\|--container]` |
| `doctor` | Diagnose project + environment | `bag doctor` |
| `deploy` | Deploy one runtime to an explicit provider | `--provider bnb\|aws\|azure\|nodeops`; `prepare` / `verify` / `status` / `info` / `logs` / `destroy` / `list` / `wallet` |
| `platform` | Managed BNB trial account | `login` / `logout` / `whoami` / `agents` / `credit` / `token` |
| `feedback` | Create a redacted local diagnostic bundle | `bag feedback --help` |
| `bundle` | Offline agent tarball | `bag bundle` |
| `budget` | Auto-topup policy | `show` / `enable` / `disable` |
| `audit` | On-chain action audit log | `ls` / `tail` / `show` |
| `llm` | LLM provider helpers | `test` / `activate` / `status [--full]` / `topup` / `allocate` / `rotate` / `list-models` / `usage` |

## Common workflows

### Scaffold and onboard

```bash
bag init myseller --network bsc-testnet
bag wallet show
bag llm status --full
```

### Register on-chain identity

```bash
bag erc8004 register --endpoint https://my-agent.example.com
bag erc8004 show
```

### Operate ERC-8183 jobs

```bash
bag erc8183 list
bag erc8183 status 42
bag erc8183 settle 42
```

### Local development

```bash
bag dev
bag doctor
```

### Deploy

```bash
bag deploy prepare
bag deploy --provider bnb
bag deploy verify --provider bnb
bag deploy status --provider bnb
```

`bag deploy agent` is a deprecated compatibility alias. `bag deploy package` is
not a command in 0.0.16. Packaging is part of the selected deployment flow.

## MCP seller face and read tools

Select MCP with `bag init <name> --protocols MCP`, then run it with `bag dev`.
Its `negotiate` and `notify_funded` tools sign quotes and submit verified funded
jobs through fixed handlers. There is no `bag mcp` command in 0.0.16.

The runtime library also provides 15 read/usage functions under
`@bnbagent/studio-runtime/tools`:

| Category | Tools |
|----------|-------|
| Wallet | `walletInfo`, `walletList`, `walletAddress` |
| Balances | `balanceNative`, `balanceU` |
| Network | `networkInfo`, `txStatus`, `blockInfo`, `contractCallView` |
| ERC-8004 | `agentInfo`, `agentByAddress` |
| ERC-8183 | `jobStatus`, `jobList`, `jobCount` |
| LLM | `pieverseUsage` |

The Pieverse usage function authenticates with a domain-locked SIWE message;
it does not send an on-chain transaction. See [Security](security.md) for the
distinction between these reads, the seller handlers, and LLM tools.

## Project resolution

Project commands (`wallet`, `llm`, `deploy`, `budget`, `audit`, `x402`, `mpp`) resolve from:

- Inside `app/agent/`, where `studio.toml` is present, or
- The workspace root, which resolves to `app/agent/`

There is no separate Service config. Use `--project-root app/agent` on `config`
and `env` to select the runtime explicitly. Environment edits target workspace
`.studio/.env.local` by default.

## Runtime name rules

AgentCore runtime names must match `^[A-Za-z][A-Za-z0-9]{0,22}$` (no `-`, `_`, `.`). `bag doctor` validates `agentcore/agentcore.json` names and fails on violations.

## Further reference

`bag --help` and `bag <group> --help` are the authoritative surface for the installed
version.

[← BNB Agent Studio overview](index.md)
