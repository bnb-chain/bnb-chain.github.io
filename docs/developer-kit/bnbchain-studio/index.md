---
title: BNB Agent Studio
---

# BNB Agent Studio

Describe the agent you want in Claude Code or Cursor; Studio scaffolds a working
**TypeScript** project that you own, then helps you run, diagnose, and deploy it.

A seller agent earns on-chain by offering services over **ERC-8004** (identity),
**ERC-8183** (escrowed commerce), and **x402/B402** (per-request payments), built on
the [BNB Agent SDK](../bnbagent-sdk/index.md).

!!! warning "Under active development"
    Studio manages wallet keys and on-chain funds, and may introduce breaking
    changes. Start on **BSC testnet** with a wallet funded only for the task.

## Studio vs the SDK

Two layers, and it is worth being clear which one you want:

| | What it is | Reach for it when |
| --- | --- | --- |
| **[BNB Agent SDK](../bnbagent-sdk/index.md)** | A **library you import** — ERC-8004, ERC-8183, x402, wallets. Python and TypeScript. | You want full control and will wire the agent yourself. |
| **BNB Agent Studio** | A **tool that builds and deploys an app for you**, which then imports the SDK. | You want scaffolding, IDE-driven workflow, and a guided path to production. |

## What you install

```bash
npm install --global @bnbagent/studio-cli
bag skills install
```

| Artifact | Package | Purpose |
|----------|---------|---------|
| **`bag` CLI** | [`@bnbagent/studio-cli`](https://www.npmjs.com/package/@bnbagent/studio-cli) | Scaffold projects, manage wallets, run locally, deploy |
| **Agent runtime** | [`@bnbagent/studio-runtime`](https://www.npmjs.com/package/@bnbagent/studio-runtime) | Imported by the generated agent code. The generated project depends on this, **not** on the CLI — removing the global CLI does not disable an already-generated agent. |
| **Deploy engine** | [`@bnbagent/deploy-cli`](https://www.npmjs.com/package/@bnbagent/deploy-cli) | Pinned; all cloud lifecycle mutations are delegated to it |
| **IDE skill** | bundled in the CLI | The `/bnbagent-studio` router plus its on-demand playbooks, installed by `bag skills install` |
| **MCP server** | `bag mcp serve` | 15 read-only chain tools for your IDE — it never signs |

The bundled skill is the primary interface: it turns your intent into a reviewable
workflow and drives `bag` for you. `bag` remains available for automation and for
anyone who prefers direct control.

## One runtime, one signer

A single deployed process serves every selected public face and holds the only key.
There is no separate keyless service tier.

- **Faces are composable** (`--protocols`): **A2A** (agent card + JSON-RPC on `:9000`),
  **MCP** (Streamable HTTP at `:8000/mcp`), and **X402** (`/x402`). One seller core and
  one wallet serve all of them.
- **Signing is fixed code**, never an LLM-callable tool. It lives in
  `app/agent/src/signing.ts`. The LLM's chain tools are read-only, and no LLM
  participates in pricing.
- **The keystore lives at the workspace root** in `.studio/wallets/` — outside
  `app/agent/`, so no packaging path can bundle it into a deploy artifact.

The ERC-8183 rail exposes exactly two bounded operations: `negotiate` (a rule-based
price clamp plus a signed quote) and `notify_funded` (verify the funded job on-chain,
produce the deliverable, submit it).

## The choices you make

| Dimension | Choices | Notes |
| --- | --- | --- |
| Network | `bsc-testnet`, `bsc-mainnet` | Start on testnet. The managed BNB trial is always testnet. |
| Wallet | `evm-local` (default), `twak`, `altana` | Local encrypted keystore; Trust Wallet Agent Kit custody; or a budget- and time-bounded Altana session. |
| LLM | Pieverse (default), OpenRouter, OpenAI, Anthropic, Bedrock | Pieverse `auto/free` starts at $0/token. Others use your own credentials. |
| Commerce rails | ERC-8183, B402, or both | ERC-8183 is job escrow; B402 settles x402 requests. Rails and faces are separate choices. |
| Public faces | A2A, MCP, X402, or a combination | One runtime serves every selected face. |
| Deployment | BNB managed trial, AWS AgentCore, Azure Foundry | Every deploy explicitly selects a target; a previous deployment is never a silent default. |
| Deliverable storage | local or IPFS | Local is for offline development and **fails deployment readiness**. IPFS is durable and deploy-ready. |

Some combinations are rejected before the project changes — Altana does not support
paid B402 selling, and Azure Foundry currently deploys **A2A scaffolds only**
(the MCP entrypoint is rejected before a Foundry deploy).

## What gets generated

```text
weatheragent/
├── package.json                 workspace marker
├── pnpm-workspace.yaml
├── AGENTS.md                    generated safety rules for coding agents
├── agentcore/
│   ├── agentcore.json           deployment descriptor
│   └── aws-targets.json         AWS account and region for self-deploy
├── .studio/
│   ├── .env.local               gitignored secrets, mode 0600
│   └── wallets/                 encrypted keystore, outside deployable code
└── app/agent/
    ├── studio.toml              network, wallet, LLM, policy, rails, faces
    └── src/
        ├── sellerCore.ts        the work your agent sells  ← you edit this
        ├── signing.ts           fixed quote / verify / submit path
        ├── tools.ts             read-only chain tools for the LLM
        ├── main.ts              A2A/X402 entrypoint
        ├── mcpMain.ts           MCP-only entrypoint
        └── dualMain.ts          combined A2A + MCP entrypoint
```

Ordinary TypeScript that you own — edit, fork, or move it whenever you want.

## How a seller gets paid

**ERC-8183 — negotiated work with escrow.** A buyer calls `negotiate`; fixed code
clamps the configured list price and signs a quote. The buyer creates the job, sets a
budget, and funds escrow, then sends `notify_funded`. The seller verifies the signed
terms, assigned provider, status, budget, and funded state **on-chain before doing paid
work**, stores the deliverable, and submits its reference. The buyer then manually
chooses approve, reject, or dispute — Studio never silently auto-settles a buyer's job.

`price = "0"` is an explicit **FREE** ERC-8183 job: it skips token escrow, though
state-changing calls still need gas or a sponsored path.

**x402 — pay per HTTP request.** The X402 face exposes `/x402`. A positive
`price_usd` returns a payment challenge and settles through B402 *before* work starts;
`price_usd = "0"` is anonymous FREE passthrough that bypasses B402 entirely. Paid mode
needs a complete per-agent B402 merchant setup and an `evm-local` or `twak` payout
wallet. Payment settles before work, so a later work failure has no automatic refund.

## Next

- **[Quickstart](quickstart.md)** — install, scaffold, run, and deploy your first agent
- [Configuration](configuration.md) · [CLI reference](cli-reference.md) · [Deployment](deployment.md)
- [Security](security.md) · [Troubleshooting](troubleshooting.md)
