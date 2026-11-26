---
title: BNB Agent Studio Deployment
---

# Deployment

A Studio project deploys as **one runtime** serving the selected faces with its
configured wallet authority. There is no second keyless artifact to ship.

Every deploy **explicitly selects a target**. A recorded deployment is only ever offered
as an explicit update; it is never used as a silent default.

All cloud lifecycle mutations are delegated to the pinned
[`@bnbagent/deploy-cli`](https://www.npmjs.com/package/@bnbagent/deploy-cli). Studio does
not shell out to `azd` or the Azure CLI, and the scaffold contains no `azure.yaml` or
`infra/`.

!!! warning "You are provisioning real resources"
    AWS and Azure deploys create resources in **your own** account, under permissions you
    review. Published IAM reference policies are provided as-is — scoping, costs, and
    security remain yours. Start on BSC testnet.

## Deployment targets

| Target | What it is | Key constraint |
| --- | --- | --- |
| `bnb` | Managed **48-hour testnet** trial | Runs in the **operator's** cloud, so signing material leaves your control. Use a throwaway wallet (`bag wallet new`) and never reuse it on mainnet. Disabled after expiry. |
| `aws` | AWS Bedrock AgentCore in your account | Keystore injected via **AWS Secrets Manager** as `WALLET_KEYSTORE_JSON` — never in the code zip. |
| `azure` | Azure AI Foundry hosted agents | **Container-only**, and **A2A scaffolds only** — `bag init` and provider selection reject an MCP entrypoint for Foundry. Secrets injected through a Foundry **CustomKeys** connection. |
| `nodeops` | CreateOS hosting | Account or wallet mode. Hosting payment and seller payout are separate. B402-only business services are currently rejected by readiness; see the [provider guide](https://github.com/bnb-chain/bnbagent-studio/blob/v0.0.16/docs/guides/createos-deploy.md) for wallet, runtime, and serving constraints. |

## Prerequisites

| Requirement | Needed for |
| --- | --- |
| Node.js ≥ 22 | everything |
| Bun 1.3+ | any deploy |
| Corepack + pnpm 10 | the generated workspace |
| Docker | container paths only — for example a `twak` deployment, and Azure (container-only) |
| AWS CLI | **optional**; used only by the fail-open, read-only AgentCore quota check in `bag deploy prepare` |

## Deploy flow

```bash
bag deploy prepare                    # readiness gates: storage, provider, tooling
bag deploy --provider bnb             # or: aws | azure | nodeops
bag deploy verify --provider bnb      # reconcile ERC-8004 identity with the live endpoint
bag deploy status --provider bnb      # liveness and inventory
```

`bag deploy prepare` gates on storage, provider, and deploy-tooling readiness. **Local
deliverable storage fails readiness by design**. Configure IPFS, S3, Azure Blob,
or the managed platform's supported deliverable storage before deploying.

AWS inbound authentication is handled through the pinned deploy engine's guided
flow. There is no `bag deploy provision-cognito` subcommand in Studio CLI 0.0.16.

## Operating a deployment

```bash
bag deploy status  --provider aws     # liveness + resource inventory
bag deploy logs    --provider aws     # tail runtime logs
bag deploy info    --provider azure   # resolved deployment details
bag deploy destroy --provider aws     # teardown
```

`bag deploy --help` lists the full surface. `bag deploy agent` is a deprecated
compatibility alias; prefer `bag deploy --provider <target>`.

## Keystore posture

The encrypted keystore lives at the workspace root in `.studio/wallets/`, **outside**
`app/agent/` — the deploy `codeLocation`. No packaging path can bundle it into an
artifact. It reaches a deployed runtime only through the selected provider's delegated
secret channel:

| Target | Channel |
| --- | --- |
| `aws` | AWS Secrets Manager (`WALLET_KEYSTORE_JSON`) |
| `azure` | Foundry CustomKeys connection |
| `bnb` | the operator's managed secret store — material leaves your control |
| `nodeops` | Separate runtime variables; for `evm-local`, the provider receives both the encrypted keystore and unlock password |

An **Altana** deployment is different in kind: it sends only a budget- and time-bounded
runtime session rather than a keystore. Keep the budget and expiry tight, and renew or
revoke explicitly.

That session-only transport does not establish compatibility with CreateOS wallet
authentication or hosting payment. Check the provider guide before choosing Altana
for a CreateOS deployment.

## ERC-8004 registration

Buyers discover your agent on-chain. `bag deploy verify --provider <target>` reconciles
the deployed endpoint with its ERC-8004 identity. The registry commands are also
available directly:

```bash
bag erc8004 show
```

## Local mirror

`bag dev` runs the same single runtime locally:

| Local | Deployed |
| --- | --- |
| A2A on `:9000` | the runtime's A2A face |
| MCP-only on `:8000/mcp`; A2A+MCP on `:9000/mcp` | the runtime's MCP face (not available on Azure) |
| `/x402` or `/mpp` on the same process | the selected B402 face, subject to provider readiness |
| local storage path | configured durable deliverable storage |

## Earning after deploy

Buyers fund ERC-8183 jobs or pay an x402 request. The runtime verifies payment on-chain
*before* doing paid work, submits the deliverable, and records an audit trail
(`bag audit ls`).

Settlement stays with the buyer, who chooses approve, reject, or dispute. Operator-side
settle is manual:

```bash
bag erc8183 settle <jobId>
```

---

[← BNB Agent Studio overview](index.md) · [Architecture](architecture.md) · [Security](security.md)
