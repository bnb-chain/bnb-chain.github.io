---
title: BNB Agent Studio
---

# BNB Agent Studio

Describe the agent you want in Claude Code or Cursor; Studio scaffolds a working
**TypeScript** project that you own, then helps you run, diagnose, and deploy it.

These pages describe Studio CLI **0.0.16**. For newer releases, check the installed
`bag --help` and bundled skills for changed commands and capabilities.

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
| **Chain-read tools** | `@bnbagent/studio-runtime/tools` | 15 read/usage functions; the agent's MCP seller face also exposes bounded commerce operations |

The bundled skill is the primary interface: it turns your intent into a reviewable
workflow and drives `bag` for you. `bag` remains available for automation and for
anyone who prefers direct control.

## One runtime, one signer

A single deployed process serves the selected faces using one configured wallet
authority: a local key, remote signer, or bounded Altana session.
There is no separate keyless service tier.

- **Faces are composable** (`--protocols`): **A2A** (agent card + JSON-RPC on `:9000`),
  **MCP** (MCP-only at `:8000/mcp`; A2A+MCP at `:9000/mcp`), and either
  **X402** (`/x402`) or **MPP** (`/mpp`). One seller core and one wallet serve them.
- **Signing is fixed code**, never an LLM-callable tool. It lives in
  `app/agent/src/signing.ts`. The LLM's chain tools are read-only, and no LLM
  participates in pricing.
- **The keystore lives at the workspace root** in `.studio/wallets/` — outside
  `app/agent/`, so no packaging path can bundle it into a deploy artifact.

The ERC-8183 rail exposes exactly two bounded operations: `negotiate` (resolve the
configured USD price for the selected asset and sign a quote) and `notify_funded`
(verify the funded job on-chain, produce the deliverable, submit it).

## The choices you make

| Dimension | Choices | Notes |
| --- | --- | --- |
| Network | `bsc-testnet`, `bsc-mainnet` | Start on testnet. The managed BNB trial is always testnet. |
| Wallet | `evm-local` (default), `twak`, `turnkey`, `altana` | Local encrypted keystore; Trust Wallet Agent Kit; Turnkey remote signer; or a bounded Altana session. All four support paid B402 seller payout. |
| LLM | Pieverse (default), OpenRouter, OpenAI, Anthropic, Bedrock | Pieverse `auto/free` starts at $0/token. Others use your own credentials. |
| Commerce rails | ERC-8183, B402, or both | ERC-8183 is job escrow; B402 settles x402 requests. Rails and faces are separate choices. |
| Public faces | A2A, MCP, and either X402 or MPP | X402 and MPP are alternative B402 adapters and cannot coexist. |
| Deployment | BNB managed trial, AWS AgentCore, Azure Foundry, CreateOS (`nodeops`) | Every deploy explicitly selects a target; provider compatibility gates still apply. |
| Deliverable storage | local, IPFS, S3, or Azure Blob | Local is for offline development and **fails deployment readiness**. Configure durable storage before deploying. |

Compatibility limits are separate from payout support: Altana cannot use Pieverse
SIWE, and Azure Foundry deploys **A2A scaffolds only** (an MCP entrypoint is rejected).
Altana's outbound payments require a separately armed session; receiving seller
revenue does not require that buyer authority.

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
        ├── unifiedMain.ts       A2A + X402 entrypoint (:9000)
        ├── mcpMain.ts           MCP-only entrypoint (:8000/mcp)
        └── dualMain.ts          A2A-native + tunneled /mcp (AgentCore only)
```

Ordinary TypeScript that you own — edit, fork, or move it whenever you want.

## How a seller gets paid

**ERC-8183 — negotiated work with escrow.** A buyer calls `negotiate`; fixed code
resolves the configured USD price for the selected asset and signs a quote. The
buyer creates the job, sets a budget, and funds escrow, then sends `notify_funded`.
The seller verifies the signed
terms, assigned provider, status, budget, and funded state **on-chain before doing paid
work**, stores the deliverable, and submits its reference. The buyer then manually
chooses approve, reject, or dispute — Studio never silently auto-settles a buyer's job.

`[payments.seller]` `price_usd = "0"` explicitly selects a **FREE** ERC-8183 job:
it skips token escrow, though state-changing calls still need gas or a sponsored path.

**x402 — pay per HTTP request.** The X402 face exposes `/x402`. A positive
`price_usd` returns a payment challenge and settles through B402 *before* work starts;
`price_usd = "0"` is anonymous FREE passthrough that bypasses B402 entirely. Paid mode
needs a complete per-agent B402 merchant setup and a supported payout wallet:
`evm-local`, `twak`, `turnkey`, or `altana`. The recipient is the configured `pay_to`
or, by default, `[wallet].address`. For Altana's EIP-7702 account, that address is
the admin EOA; the locally held admin key can move the revenue. Register the B402
merchant for that exact payout address. Payment settles before work, so a later
work failure has no automatic refund.

MPP is an alternative B402 payment face at `/mpp`, selected with
`--payment-protocol mpp`. It shares the seller price and payout configuration;
it cannot be enabled alongside X402.

## Next

- **[Quickstart](quickstart.md)** — install, scaffold, run, and deploy your first agent
- [Configuration](configuration.md) · [CLI reference](cli-reference.md) · [Deployment](deployment.md)
- [Security](security.md) · [Troubleshooting](troubleshooting.md)
