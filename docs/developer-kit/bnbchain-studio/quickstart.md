---
title: BNB Agent Studio Quickstart
---

# Quickstart

End-to-end path from zero to a running two-layer seller on BSC testnet. Steps 1–2 are one-time machine setup; step 3 is where you spend most of your time — talking to your AI tool, which drives `bag` for you.

## 1. Install the CLI

```bash
pip install bnbagent-studio
bag --version        # → bag 0.0.1
```

Alternative: `uv tool install bnbagent-studio` for an isolated machine-wide CLI.

**Prerequisite — AgentCore CLI:**

```bash
npm install -g @aws/agentcore   # Node ≥ 20
which -a agentcore              # ensure the npm CLI wins on PATH
```

## 2. Install skills into your AI tool

Skills are the playbooks your AI tool reads to know *how* to drive `bag`. Without this step, Claude Code or Cursor does not know the studio exists.

```bash
bag skills install                            # interactive: detect IDE + pick scope
bag skills install --target both --scope user  # non-interactive: both IDEs, machine-wide
```

Reload your IDE window after installing. You get 10 skills (scaffolding, selling via 8183, operating, deploying to AgentCore/EC2, and more).

## 3. Scaffold a seller agent

Open your AI tool and describe what you want:

> *"Create a new BNB agent named weather-seller on testnet that sells weather forecasts."*

Under the hood, the scaffolding skill runs `bag init`:

```bash
bag init weather-seller
cd weather-seller
```

Defaults (override with flags):

| Setting | Default | Flag |
|---------|---------|------|
| Framework | Google ADK | `--framework adk` |
| Runtime | AWS Bedrock AgentCore | `--runtime agentcore` |
| LLM provider | Pieverse (`auto/free`, $0 deposit) | `--llm-provider pieverse-llm` |
| Network | BSC testnet | `--network bsc-testnet` |
| Storage | IPFS | `--storage-provider ipfs` |

On an interactive terminal, `bag init` also:

1. Prompts once for a wallet password and creates `.studio/wallets/<address>.json` at the **workspace root** (outside `app/agent/`, so no deploy artifact can bundle it).
2. Activates the Pieverse LLM with a **$0 deposit** (default provider).
3. Prints testnet faucet URLs — funding is optional.
4. Provisions per-layer virtualenvs (`app/agent/.venv`, `app/service/.venv`).

Use `--no-onboard` in CI to skip prompts.

### Emitted workspace layout

```
weather-seller/                    workspace root
├── .studio/wallets/               encrypted keystore (gitignored)
├── app/
│   ├── agent/                     Layer A — sole signer + LLM
│   │   ├── studio.toml
│   │   ├── main.py
│   │   ├── signing.py
│   │   └── managed_model.py
│   └── service/                   Layer B — keyless public ingress
│       ├── studio.toml
│       └── service.py
└── agentcore/agentcore.json       AgentCore deploy descriptor
```

## 4. Wire the MCP server (optional but recommended)

The read-only MCP server lets your AI tool query wallet balance, job status, and more:

```bash
bag mcp serve --transport stdio   # 15 read-only tools; no signing
```

In Claude Code or Cursor, add an MCP entry per project:

| Field | Value |
|-------|-------|
| Command | `bag` |
| Args | `mcp serve --transport stdio` |
| CWD | absolute path to your workspace root |
| Env | `WALLET_PASSWORD=<your password>` |

## 5. Run both layers locally

```bash
bag dev
# Agent on :8080 (sole signer, runs the LLM)
# Service on :8003 (public ingress + job poller)
```

Health check:

```bash
curl localhost:8003/apex/health     # → {"status":"ok","keyless":true}
```

Flags: `--agent-only`, `--service-only`, `--port`, `--service-port`.

## 6. Implement your service logic

Edit the emitted handler in `app/agent/` — the one file you typically customize. Set your price in `app/agent/studio.toml` under `[payments.erc8183]`; the Agent clamps the LLM's proposed price to `[min, max]` before signing.

## 7. Deploy (when ready)

```bash
bag deploy prepare                       # readiness sweep
bag deploy agent                         # Layer A → AgentCore
# Layer B → EC2 via the deploying-service-to-ec2 skill
bag deploy verify --endpoint <service-url>   # probe + register ERC-8004 endpoint
```

See [Deployment](deployment.md) for the full two-artifact path.

## Natural-language workflow

After setup, drive everything from your AI tool:

> *"Start my agent and verify it works."*
> *"Why isn't my Service picking up funded jobs?"*
> *"Settle job 23."*
> *"Deploy my agent."*

The skills run the right `bag` commands and edit your files. The commands above are shown for transparency.

## Next steps

- [Demo](demo.md) — full end-to-end weather-forecast seller walkthrough
- [Architecture](architecture.md) — how the six layers fit together
- [Configuration](configuration.md) — `studio.toml` sections and env vars
- [BNB Agent SDK quickstart](../bnbagent-sdk/quickstart.md) — protocol-level integration

[← BNB Agent Studio overview](index.md)
