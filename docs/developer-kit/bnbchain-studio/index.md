---
title: BNB Agent Studio
---

# BNB Agent Studio

Scaffold, run, and deploy a **two-layer blockchain seller** on BNB Chain. BNB Agent Studio (`bnbagent-studio`) lets you describe what you want in Claude Code or Cursor; the studio emits a working agent project that **you own**, then helps you develop, debug, and deploy it.

A seller agent earns on-chain by offering services over **ERC-8004** (identity) + **ERC-8183** (commerce) + **x402** (payments), built on the [BNB Agent SDK](https://docs.bnbchain.org/developer-kit/bnbagent-sdk/).

> **v0.0.1 is seller-only.** The CLI (`bag`), runtime library (`bnbagent_studio_core`), read-only MCP server, and IDE skills ship today. Buyer product flows and a hosted console are deferred to v2.

> ⚠️ This project is under active development and may introduce breaking changes. It manages wallet keys and on-chain funds — start on **testnet** and use at your own risk.

## What you get

| Artifact | Package | Purpose |
|----------|---------|---------|
| **`bag` CLI** | `bnbagent-studio` | Scaffold projects, manage wallets, run locally, deploy |
| **Runtime library** | `bnbagent-studio-core` | Wallet, ERC-8004/8183, x402, signing policy — imported by emitted agent code |
| **MCP server** | `bnbagent-studio` | 15 read-only chain tools for your IDE |
| **Skills** | bundled in CLI | 10 procedure playbooks for Claude Code / Cursor |

Install one command:

```bash
pip install bnbagent-studio
```

`pip` auto-pulls `bnbagent-studio-core`. The CLI is also available via `uv tool install bnbagent-studio`.

## Two-layer deploy model

AWS Bedrock AgentCore is invoke-only (no public HTTP routes, no background poll loop), so v1 splits the seller into two deployable artifacts:

```
            buyer                                   BNB Chain
              │ POST /apex/negotiate                   ▲
              ▼                                        │ funds / settles jobs
┌──────────────────────────────┐   InvokeAgentRuntime  │
│  Layer B — ERC-8183 Service  │ ──────────────────►  ┌┴─────────────────────────────┐
│  app/service/ → EC2/Fargate  │                      │  Layer A — the Agent         │
│  public · long-running       │ ◄────────────────── │  app/agent/ → AgentCore      │
│  KEYLESS · no LLM · no sign  │   signed offer /     │  non-public · invoke-only    │
│  /negotiate + funded-job     │   deliverable        │  the LLM + the SOLE signer   │
│  poller                      │                      │  quote / fulfill / settle    │
└──────────────────────────────┘                      └──────────────────────────────┘
```

- **Layer A — the Agent** (`app/agent/` → AWS Bedrock AgentCore): the LLM, memory, tools, and **sole key-holder/signer**. Invoked on action envelopes (`quote` / `fulfill` / `settle`). All signing is fixed entrypoint code — never an LLM-callable tool.
- **Layer B — the ERC-8183 Service** (`app/service/` → EC2/Fargate): a public, long-running, **keyless** container — `/negotiate` ingress, funded-job poller, and `InvokeAgentRuntime` client. Holds no key, runs no LLM, never signs.

## Relationship to BNB Agent SDK

| Layer | Package | Role |
|-------|---------|------|
| Protocol | [bnbagent](https://pypi.org/project/bnbagent/) (BNB Agent SDK) | ERC-8004, ERC-8183, wallet ABC — pure protocol clients |
| Studio core | `bnbagent_studio_core` | Config, workflows, signing policy, audit log |
| Studio surface | `bag` CLI + MCP + skills + recipes | Scaffolding, ops, IDE integration |
| Your code | `app/agent/*`, `app/service/*` | Emitted by recipes; you own and edit freely |

Use BNB Agent SDK directly when you want full control over protocol integration. Use BNB Agent Studio when you want scaffolding, IDE skills, a two-layer deploy path, and safety defaults out of the box.

## Prerequisites

| Requirement | Why |
|-------------|-----|
| Python ≥ 3.10 | CLI and runtime library |
| Claude Code or Cursor | Studio is driven from your AI tool via skills |
| Node ≥ 20 + `npm i -g @aws/agentcore` | `bag init` / `bag dev` / `bag deploy agent` shell out to the native AgentCore CLI |
| A wallet password | `bag init` creates a local encrypted keystore; password lives in `WALLET_PASSWORD` env only |

Optional: testnet funds (only for paid LLM models or on-chain settle — default `auto/free` Pieverse model needs no funds).

## Documentation

| Guide | Description |
|-------|-------------|
| [Quickstart](quickstart.md) | Install, scaffold, run locally, first negotiate |
| [Demo](demo.md) | End-to-end weather-forecast seller walkthrough |
| [Architecture](architecture.md) | Six-layer stack, recipes, workspace layout |
| [Configuration](configuration.md) | `studio.toml`, `.env.local`, cross-layer sync |
| [CLI reference](cli-reference.md) | `bag` command groups and key flags |
| [Deployment](deployment.md) | Layer A (AgentCore) + Layer B (EC2) deploy path |
| [Security](security.md) | Keystore posture, signing policy, MCP read-only guarantee |
| [Troubleshooting](troubleshooting.md) | `bag doctor`, common errors |

## Repository

[https://github.com/bnb-chain/bnbagent-studio](https://github.com/bnb-chain/bnbagent-studio)

## Package

```bash
pip install bnbagent-studio
```

[PyPI — bnbagent-studio](https://pypi.org/project/bnbagent-studio/) · [PyPI — bnbagent-studio-core](https://pypi.org/project/bnbagent-studio-core/)

[← Developer Kit overview](../index.md)
