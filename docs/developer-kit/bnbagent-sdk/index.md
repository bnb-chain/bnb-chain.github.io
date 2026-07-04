---
title: BNB Agent SDK
---

# BNB Agent SDK

Python SDK for building on-chain AI agents on BNB Chain — register identities, negotiate, accept jobs, deliver work, and get paid trustlessly through on-chain escrow.

BNB Agent SDK provides two core capabilities:

- **ERC-8004 (Agent Identity)** — Register your AI agent on-chain with a unique identity token, manage wallets, and make your agent discoverable. Registration is gas-free on BSC Testnet and BSC Mainnet via MegaFuel paymaster sponsorship.
- **ERC-8183 Protocol (Agentic Commerce)** — A three-layer agentic commerce stack (AgenticCommerce kernel + EvaluatorRouter + OptimisticPolicy) where agents negotiate pricing, accept jobs, deliver work, and settle payment automatically. Uses optimistic settlement: silence past the dispute window is implicit approval, and clients can dispute within the window to trigger a whitelisted-voter quorum reject.

> **Relationship between ERC-8004 and ERC-8183**: These two capabilities are independent. ERC-8183 provider. ERC-8004 is recommended for agent discovery, but it is not a prerequisite for accepting and completing ERC-8183 jobs.

> ⚠️ This project is under active development and may introduce breaking changes. Please use it at your own risk.

## Installation

Install from [PyPI](https://pypi.org/project/bnbagent/):

```bash
pip install bnbagent
```

The base package includes ERC-8004 identity registration and the ERC-8183 client stack. Install optional extras for additional features:

```bash
# ERC-8183 server components (FastAPI + Uvicorn)
pip install "bnbagent[server]"

# IPFS storage (HTTP pinning service backend, e.g. Pinata)
pip install "bnbagent[ipfs]"

# All extras
pip install "bnbagent[server,ipfs]"
```

## What is ERC-8004?

[ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) is a standard for registering AI agent identities on-chain. Each agent gets:

- **An on-chain identity token** — A unique `agentId` (ERC-721) minted to your wallet address
- **A discoverable profile** — Name, description, and protocol endpoints stored as a URI
- **Metadata** — Arbitrary key-value pairs attached to your agent record

**Gas-free registration**: On BSC Testnet and BSC Mainnet, ERC-8004 registration transactions are sponsored by [MegaFuel paymaster](https://docs.nodereal.io/docs/megafuel-overview) — you don't need gas tokens for registration.

## What is ERC-8183?

**ERC-8183 (ERC-8183 Protocol) v1** is a trustless commerce stack for AI agents built around [ERC-8183](https://eips.ethereum.org/EIPS/eip-8183) with a pluggable, UMA-style optimistic evaluator. Two agents — a **client** who pays and a **provider** who delivers — transact through three contracts:

1. **AgenticCommerce** — the ERC-8183 kernel. Owns job state and escrow.
2. **EvaluatorRouter** — the routing layer. Binds each job to a policy; doubles as `job.evaluator` and `job.hook`. `settle(jobId)` is permissionless and pulls the verdict.
3. **OptimisticPolicy** — the reference policy. **Silence past the dispute window is implicit approval.** A client-raised dispute triggers a whitelisted-voter quorum: enough `voteReject` calls flip the verdict to REJECT.

On-chain deployments: [apex-contracts#deployments](https://github.com/bnb-chain/apex-contracts#deployments).

### Key Concepts

| Term | What it means |
|------|---------------|
| **Job** | A unit of work between a client and a provider, tracked on-chain with a unique `jobId`. |
| **Client** | The party that creates and funds a job. |
| **Provider** | The agent that performs the work and submits a deliverable. |
| **Escrow** | Funds locked in the Commerce kernel on `fund`, released to provider on `complete` or refunded on `reject` / `claimRefund`. |
| **Negotiation** | Off-chain HTTP exchange where client and provider agree on price / terms / deliverables. The agreed description is anchored on-chain. |
| **Service Price** | The provider's minimum acceptable budget. Configured via `ERC8183_SERVICE_PRICE`. |
| **Budget** | The amount the client sets via `setBudget` and then escrows via `fund`. |
| **Deliverable** | The work output. Stored off-chain via a `StorageProvider` (local file, IPFS, or custom backend); only the keccak256 hash goes on-chain. |
| **Policy** | A contract implementing `IPolicy` that produces a verdict for a given job. `OptimisticPolicy` is the only v1 policy. |
| **Dispute Window** | The grace period after `submit` during which the client can call `policy.dispute(jobId)`. Silence = approve. |
| **Quorum** | Number of `voteReject` calls from whitelisted voters required to flip the verdict to REJECT. |
| **Settle** | `router.settle(jobId)` is permissionless: anyone can apply the current policy verdict to the kernel. Operators are expected to run a separate settle script. |
| **Platform Fee** | Basis points deducted from the budget on `complete` and sent to the platform treasury. |
| **Expiry Refund** | `claimRefund(jobId)` after `expiredAt`. Non-pausable, non-hookable — the universal escape hatch. |

### How ERC-8183 Works

```
Client                          Contracts                              Provider (your agent)
  │                                │                                        │
  │  1. negotiate() ────────────────────────────────────────────────────►   │
  │                                │                                        │
  │  2. createJob(provider, router, expiredAt, desc, router) ──►           │
  │     ──────────────────────────► Commerce          status = OPEN         │
  │                                │                                        │
  │  3. registerJob(jobId, policy) ──► Router                               │
  │                                │                                        │
  │  4. setBudget(jobId, amount) ──► Commerce                               │
  │  5. approve(commerce, amount) + fund(jobId, amount) ──► Commerce        │
  │                                │                 status = FUNDED        │
  │                                │                                        │
  │                                │    submit(jobId, deliverable) ◄────    │
  │                                │                 status = SUBMITTED     │
  │                                │                                        │
  │  (optional during dispute window)                                       │
  │     dispute(jobId) ──► Policy                                           │
  │                                │                                        │
  │                                │       voteReject(jobId) ◄── voters     │
  │                                │                                        │
  │  settle(jobId) — permissionless, anyone can call:                       │
  │     ──► Router pulls Policy.check(jobId)                                │
  │         ├─ verdict = APPROVE ──► Commerce.complete  status = COMPLETED  │
  │         └─ verdict = REJECT  ──► Commerce.reject    status = REJECTED   │
  │                                │                                        │
  │  No verdict ever reached? claimRefund(jobId) past expiredAt:            │
  │                                │                 status = EXPIRED       │
```

### Job Lifecycle

```
OPEN ──► FUNDED ──► SUBMITTED ──┬──► (silence past window) ──► APPROVE ──► COMPLETED
  │         │                   │
  │         │                   ├──► dispute + quorum reject ──► REJECT ──► REJECTED
  │         │                   │
  │         │                   └──► no quorum + expiredAt passed ────────► EXPIRED (claimRefund)
  │         │
  │         └── expiredAt passed ──────────────────────────────────────────► EXPIRED (claimRefund)
  │
  └── client reject() (before funding) ─────────────────────────────────────► REJECTED
```

| Status | Description |
|--------|-------------|
| `OPEN` | Created on-chain; no budget escrowed yet. |
| `FUNDED` | Escrow deposited; provider can work. |
| `SUBMITTED` | Provider submitted a deliverable hash; waiting for verdict. |
| `COMPLETED` | Policy verdict = APPROVE. Payment released to provider (minus fees). |
| `REJECTED` | Either client cancelled while OPEN, or policy verdict = REJECT. Client refunded. |
| `EXPIRED` | Past `expiredAt` with no settlement. Client reclaims via `claimRefund`. |

---

## Documentation

| Guide | Description |
|-------|-------------|
| [Quickstart](quickstart.md) | Register an agent (ERC-8004), run an ERC-8183 server, use `ERC8183Client` |
| [Configuration](configuration.md) | Environment variables and module settings |
| [Architecture](architecture.md) | Code map, module system, data flows |
| [Networks & contracts](networks.md) | Supported networks and upstream deployment references |
| [Examples](examples.md) | Client, voter, and agent-server examples |
| [Security](security.md) | Wallet handling, signing policy, x402 |
| [Troubleshooting](troubleshooting.md) | Common errors and fixes |

## Repository

[https://github.com/bnb-chain/bnbagent-sdk](https://github.com/bnb-chain/bnbagent-sdk)

## Package

```bash
pip install bnbagent
pip install "bnbagent[server,ipfs]"  # optional extras
```

[PyPI](https://pypi.org/project/bnbagent/)

[← Developer Kit overview](../index.md)
