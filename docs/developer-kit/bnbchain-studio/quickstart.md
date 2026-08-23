---
title: BNB Agent Studio Quickstart
---

# Quickstart

Build a TypeScript seller agent on BNB Chain, run it locally, and deploy it.

## Requirements

- **Node.js 22 or newer**
- **Claude Code or Cursor** — the bundled skill is the primary interface
- **Corepack and pnpm 10** for the generated workspace
- **Bun 1.3+** when you deploy
- **Docker** only for container paths, such as a `twak` deployment
- The AWS CLI is optional, and used only by a read-only AgentCore quota check

## 1. Install Studio and its IDE skill

```bash
npm install --global @bnbagent/studio-cli
bag skills install
```

The npm install puts the `bag` CLI on your machine once; each agent you build later
gets its own project directory. `bag skills install` detects Claude Code and Cursor,
lets you choose user or project scope, and installs the `/bnbagent-studio` router plus
its on-demand playbooks. For a scripted install:

```bash
bag skills install --target both --scope user
```

Reload your IDE afterwards so it discovers the skill.

## 2. Tell the skill what you want to sell

Open Claude Code or Cursor in the directory where the project should be created:

```text
/bnbagent-studio Create a BNB Chain seller agent named weatheragent.
Start on BSC testnet, explain the available choices, then build and run it.
```

You can be more specific:

```text
/bnbagent-studio Create an agent named researchagent that sells cited research
reports. Use ERC-8183, expose A2A and MCP, use the default wallet and LLM, store
deliverables on IPFS, and prepare it for the 48-hour BNB testnet trial.
```

The skill asks for the decisions it needs in one round, shows its work as a todo
list, and routes each stage to the relevant playbook. You do not need to memorise
the CLI.

!!! important "Keep control of the consequential steps"
    The skill prepares and runs the workflow, but leaves the decisions with you:

    - approve each shell command in your IDE — **do not** grant a blanket `bag:*`
      permission, because the CLI includes deploy and payment commands
    - enter wallet passwords through hidden prompts or `.studio/.env.local`, never
      in chat or as command-line arguments
    - obtain testnet funds and decide how much value a wallet may hold
    - review cloud permissions, runtime-secret exposure, and costs before deploying
    - confirm on-chain transactions and buyer settlement actions

## 3. Implement the work

Everything the skill generates is ordinary TypeScript under `app/agent/src/`. The
only file you normally need to edit is the `runWork` hook:

```text
app/agent/src/sellerCore.ts     ← the work your agent sells
```

Pricing and signing deliberately stay out of your way, in fixed deterministic code
(`app/agent/src/signing.ts`). The LLM never participates in pricing and never gets a
signing tool — its chain tools are read-only.

## 4. Run and diagnose locally

```bash
bag doctor      # project, wallet, balances, LLM, network, local runtime
bag dev         # start the selected faces
```

Depending on the faces you chose, `bag dev` serves:

| Face | Local surface |
| --- | --- |
| A2A | agent card + JSON-RPC on port `9000` |
| MCP | Streamable HTTP at `http://localhost:8000/mcp` |
| X402 | `/x402` on the same runtime |

## 5. Deploy

```bash
bag deploy prepare                  # storage, provider and tooling readiness gates
bag deploy --provider bnb           # or: aws | azure
bag deploy verify --provider bnb    # reconcile ERC-8004 identity with the live endpoint
```

Every deploy explicitly selects a target — a recorded deployment is only ever offered
as an explicit update, never used as a silent default.

| Target | What it is | Notes |
| --- | --- | --- |
| `bnb` | Managed 48-hour **testnet** trial | Runs in the operator's cloud, so signing material leaves your control. Use a throwaway wallet (`bag wallet new`) and never reuse it on mainnet. Disabled after expiry. |
| `aws` | AWS Bedrock AgentCore in **your** account | Runtime material is injected into your own infrastructure. |
| `azure` | Azure AI Foundry hosted agents | Container-only, delegated to the pinned deploy engine. **A2A scaffolds only** — an MCP entrypoint is rejected before deploy. |

Local deliverable storage **fails deployment readiness** by design; switch to IPFS
before deploying.

## 6. Earn and settle

Buyers fund ERC-8183 jobs or pay an x402 request. The agent verifies payment on-chain
*before* doing paid work, submits the result, and records an audit trail
(`bag audit ls`).

Settlement stays with the buyer: after fetching the deliverable they choose approve,
reject, or dispute. Studio never silently auto-settles a buyer's job. Operator-side
settle is manual:

```bash
bag erc8183 settle <jobId>
```

## Notes on the CLI

`bag --help` lists the full surface. The commands above are the ones the guided path
uses; `bag deploy --help` covers the deploy subcommands (`prepare`, `verify`,
`status`, `logs`, `info`, `destroy`).

---

[← BNB Agent Studio overview](index.md) · [Configuration](configuration.md) · [Deployment](deployment.md)
