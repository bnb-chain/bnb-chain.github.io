---
title: BNB Agent SDK Quickstart (TypeScript)
---

# Quickstart — TypeScript

The BNB Agent SDK ships as two first-class implementations that target the same
protocols and the same on-chain deployments. This page is the TypeScript path; for
Python see [Quickstart (Python)](quickstart.md).

!!! info "Choosing a language"
    Both SDKs are actively maintained long term — pick the one that matches your
    application. They release independently, so their published version numbers
    routinely differ; that is expected and does not mean either is behind.
    Language-specific wallet and runtime integrations do differ, and the
    differences that affect this page are called out inline.

## Install

```bash
pnpm add @bnbagent/sdk
# or
npm install @bnbagent/sdk
```

Requires **Node.js ≥ 20**. The package ships both ESM (`import`) and CommonJS
(`require`) builds plus TypeScript types.

Available subpath exports: `./erc8004`, `./erc8183`, `./x402`, `./storage`,
`./wallets`, `./signing`, `./networks`, `./utils`.

### Environment

Nothing is read automatically. Call `loadEnv()` once at your entrypoint to load
`.env.local` then `.env`, or inject variables however your deployment normally
does. The snippets below use:

| Variable | Used by | Notes |
| --- | --- | --- |
| `NETWORK` | network resolution | `bsc-testnet` (default) or `bsc-mainnet` |
| `WALLET_PASSWORD` | `EVMWalletProvider` | required; encrypts/decrypts the local Keystore V3 file |
| `PRIVATE_KEY` | `EVMWalletProvider` | first run only — imported, then encrypted to disk; remove afterward |
| `ERC8183_AGENT_URL` | `ERC8183JobOps` | public base URL; deliverable-URL fallback host |
| `PROVIDER_ADDRESS` | client flow | address of the agent you are buying from |

The full table lives in the [SDK README](https://github.com/bnb-chain/bnbagent-sdk/tree/main/typescript#environment-variables).

Both protocol snippets assume a funded wallet on `bsc-testnet` — get test BNB from
the [BNB Chain faucet](https://www.bnbchain.org/en/testnet-faucet).

---

## Register an agent (ERC-8004)

A one-time on-chain operation so clients can discover your agent.

```ts
import { EVMWalletProvider, loadEnv } from "@bnbagent/sdk";
import { AgentEndpoint, ERC8004Agent } from "@bnbagent/sdk/erc8004";

loadEnv();

const wallet = new EVMWalletProvider({
  password: process.env.WALLET_PASSWORD!,
  // First run only — encrypted to ~/.bnbagent/wallets/<address>.json;
  // later runs need only the password.
  privateKey: process.env.PRIVATE_KEY,
});

const sdk = await ERC8004Agent.create({
  walletProvider: wallet,
  network: process.env.NETWORK ?? "bsc-testnet",
});

const agentUri = sdk.generateAgentUri({
  name: "my-ai-agent",
  description: "AI agent for document processing",
  endpoints: [
    new AgentEndpoint({
      name: "web",
      endpoint: "https://my-agent.example.com/status",
    }),
  ],
});

const result = await sdk.registerAgent(agentUri);
console.log(`agent_id: ${result.agentId}  tx: ${result.transactionHash}`);
```

The endpoint `name` is an open string — `"A2A"` and `"MCP"` are the spec-named
protocol types, and `"web"` is the conventional choice for a plain HTTP surface.
Registration is gas-free on BSC Testnet via MegaFuel paymaster sponsorship.

Working script: [`typescript/examples/agent-server/scripts/register.ts`](https://github.com/bnb-chain/bnbagent-sdk/tree/main/typescript/examples/agent-server/scripts/register.ts).

---

## Earn as a provider (ERC-8183)

!!! important "The TypeScript SDK ships no HTTP server layer"
    The Python SDK's provider examples wrap the protocol in FastAPI. The
    TypeScript SDK is transport-agnostic: the provider path is a **headless
    polling loop**, not a web app. `fundedJobWatcher` only *detects* funded jobs
    — your callback decides what to do with each one, so you can bring whatever
    HTTP framework you like, or none at all.

`ERC8183JobOps` handles verification (status, assignment, expiry, budget floor)
and deliverable upload.

```ts
import { EVMWalletProvider } from "@bnbagent/sdk";
import { ERC8183JobOps, fundedJobWatcher } from "@bnbagent/sdk/erc8183";
import { LocalStorageProvider } from "@bnbagent/sdk/storage";

const wallet = new EVMWalletProvider({
  password: process.env.WALLET_PASSWORD!,
});

const jobOps = await ERC8183JobOps.create({
  walletProvider: wallet,
  network: "bsc-testnet",
  storageProvider: new LocalStorageProvider(".agent-data"),
  servicePrice: 1n * 10n ** 18n, // reject jobs budgeted below 1 token (18 decimals)
  agentUrl: process.env.ERC8183_AGENT_URL, // public base URL; deliverable-URL fallback
});

await fundedJobWatcher(
  jobOps,
  async (job) => {
    const jobId = job.jobId as number;
    console.log(`[earn-loop] job ${jobId} funded, budget=${job.budget}`);

    const result = await jobOps.submitResult(
      jobId,
      `computed result for job ${jobId}`,
      { model: "my-model-v1" },
    );
    if (!result.success) {
      console.error(`[earn-loop] submit(${jobId}) failed: ${result.error}`);
      // { retry: true } asks the watcher to re-validate and re-fire this job
      // on the next tick — only for transient failures.
      return { retry: result.retryable === true };
    }
    console.log(`[earn-loop] submitted ${jobId}, tx=${result.txHash}`);
  },
  { interval: 30 }, // seconds between polls
);
```

Settle is permissionless and is **not** run for you: any party can finalise a
submitted job once its dispute window elapses. Operators typically run a separate
script that polls verdicts and calls `settle()`.

---

## Buy as a client (ERC-8183)

The client creates a job, binds the on-chain dispute policy, funds escrow, and —
once the provider submits — settles it.

```ts
import {
  loadEnv,
  EVMWalletProvider,
  ERC8183Client,
  JobStatus,
} from "@bnbagent/sdk";

loadEnv();

const wallet = new EVMWalletProvider({
  password: process.env.WALLET_PASSWORD!,
  privateKey: process.env.PRIVATE_KEY,
});

const client = await ERC8183Client.create({
  walletProvider: wallet,
  network: "bsc-testnet",
});

const decimals = await client.tokenDecimals();
const budget = 1n * 10n ** BigInt(decimals); // 1 token

// expiredAt must clear (disputeWindow + a safety buffer) or createJob() throws —
// a job whose deadline is too close can never be submitted.
const disputeWindow = await client.policy.disputeWindow();
const expiredAt =
  BigInt(Math.floor(Date.now() / 1000)) + disputeWindow + 600n; // +10 min slack

const { jobId } = await client.createJob({
  provider: process.env.PROVIDER_ADDRESS!,
  expiredAt,
  description: "ERC-8183 demo: summarize this week's BSC ecosystem news",
});

// Bind the OptimisticPolicy so settle() has a verdict source.
await client.registerJob(jobId!);

// Escrow the budget — auto-approves the payment token if the allowance is short.
// For a free job, setBudget(jobId, 0n) then fund(jobId, 0n) moves no tokens and
// skips the ERC-20 approve entirely.
await client.fund(jobId!, budget);

// ... the provider submits its deliverable here ...

// After the dispute window elapses with no rejection, settle() finalizes the job
// as COMPLETED (or REJECTED if the policy recorded a reject vote).
await client.settle(jobId!);
const job = await client.getJob(jobId!);
console.log(`settled -> ${JobStatus[job.status]}`);
```

Five canonical client flows (happy, dispute-reject, stalemate-expire,
never-submit, cancel-open) live in
[`typescript/examples/client/`](https://github.com/bnb-chain/bnbagent-sdk/tree/main/typescript/examples/client).

---

## Wallets

`EVMWalletProvider` (local Keystore V3) is used above. The TypeScript SDK also
ships `TWAKProvider` (Trust Wallet Agent Kit CLI) and `AltanaWalletProvider`
(EIP-7702 session keys) — select the backend at construction time, or set
`WALLET_KIND=evm|twak`. See the
[wallet providers section](https://github.com/bnb-chain/bnbagent-sdk/tree/main/typescript#wallet-providers)
of the SDK README.

---

[← BNB Agent SDK overview](index.md) · [Quickstart (Python)](quickstart.md)
