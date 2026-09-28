---
title: BNB NewL1 Overview - BNB NewL1
---

# BNB NewL1 - High-Performance EVM L1

BNB NewL1 is an EVM-compatible Layer 1 and the next generation chain in the BNB Chain family. It targets workloads that need sub-second finality and predictable inclusion, include but not limited to: high-frequency trading, real-time payments, confidential finance, and agent-driven activity. Under the proposed Parlia design, cross-block BLS votes target transaction-order finality in under one second at the 200 ms block interval. SubBlocks provide an earlier preconfirmation at approximately 20 ms. Execution finality occurs only after a subsequent block records the `ExecutionCommitment` and that block itself finalizes.

## Key Features and Advantages

Execution runs off the consensus critical path, so ordering never waits on it. State lives in a flat key-value store under a cumulative lattice-hash commitment, with no Merkle-Patricia trie underneath. Account UX and privacy are protocol primitives, not contracts layered on top of the EVM.

## Where BNB NewL1 Fits

| | | |
|---|---|---|
| 2017 | ERC-20 BNB | utility token on Ethereum |
| 2019 | Beacon Chain | governance and staking |
| 2020 | BSC | general-purpose EVM L1 |
| 2023 | opBNB + Greenfield | scaling and decentralized storage |
| Next | BNB NewL1 | latency-first EVM L1, optimized end to end |

BSC remains the broad-base chain for the existing ecosystem. BNB NewL1 is a clean-slate design for the workloads that outgrow it. It stays fully EVM-compatible and keeps BNB at the economic center, on the same tooling as BSC, opBNB, and Greenfield.

## Architecture

![BNB NewL1 system architecture](../assets/newl1-architecture.png)

| Layer | What's in it | Read more |
|---|---|---|
| Application | DeFi, payments, confidential finance, AI agents. An opt-in native shielded pool hides sender, recipient, and amount, and transparent transactions are unaffected | [Privacy](./core-concepts/privacy.md) |
| Account & UX | Gas sponsorship, passkey (WebAuthn/P256) signing, batched calls, and scoped access keys, all as a native transaction type (`0x76`). No bundler, no entry-point contract, and the sender need not hold BNB | [Account Abstraction](./core-concepts/account-abstraction.md) |
| Execution | Parallel EVM, with ordering decoupled from execution: consensus liveness does not depend on execution throughput. Multi-Lane reserves gas capacity per transaction class, so latency-sensitive traffic can't be crowded out | [Async Execution](./core-concepts/async-execution.md) · [Multi-Lane](./core-concepts/multi-lane.md) |
| Consensus | Enhanced Parlia uses cross-block BLS votes to target transaction-order finality in under one second, at the target 200 ms block interval. SubBlocks can provide a preconfirmation in approximately 20 ms. Execution finality follows only after a later block records the result and itself finalizes. | [Consensus](./core-concepts/consensus.md) · [Pre-confirmation](./core-concepts/tx-preconfirmation.md) |
| Network | P2P block and sub-block gossip. Transactions are routed straight to the current and next proposer instead of a global mempool | [JSON-RPC Endpoint](./developers/json_rpc/json-rpc-endpoint.md) |
| Storage | Flat key-value store under a cumulative lattice-hash (LtHash) commitment instead of a Merkle-Patricia trie | [State DB](./core-concepts/state-db.md) |
| Governance | Token-weighted (govBNB) proposal / vote / timelock control over protocol parameters, including the Multi-Lane quotas | [Governance](./governance/overview.md) |

## Role of BNB

BNB is the native asset of BNB NewL1, and no new token is issued. It is bridged from BSC and pays for gas, through a native BSC ↔ BNB NewL1 bridge that is still in development. Staking it with `StakeHub` mints govBNB 1:1, a non-transferable voting ledger that carries governance weight once it is delegated.

## What This Means for Developers

Existing Solidity contracts and standard wallet flows run unchanged. Contracts, opcodes, and EVM behave exactly as on any other EVM chain, since execution builds on [reth](https://github.com/paradigmxyz/reth) and [revm](https://github.com/bluealloy/revm). Four things around it changed:

- **You pay for your declared gas limit, not gas used.** Block space is sold by declared gas before execution runs ([details](./get-started/migrate-from-bsc.md#you-pay-for-your-declared-gas-limit)).
- **There is no global mempool.** Transactions go directly to the current and next block producer, which is part of what makes pre-confirmation and Multi-Lane packing possible.
- **`eth_getProof` is unsupported, and so are EIP-4844 and EIP-7702 transactions.** [JSON-RPC Endpoint](./developers/json_rpc/json-rpc-endpoint.md) lists every difference in the RPC surface.
- **New features are additive.** Account abstraction, pre-confirmation, Multi-Lane, and the shielded pool run alongside standard transactions, and none of them change how an existing contract behaves.

Start with [Migrating from BSC](./get-started/migrate-from-bsc.md) if you already ship on BSC, or the [Quick Guide](./developers/quick-guide.md) if you don't.

## Network Parameters

| Parameter | Value |
|---|---|
| Block interval | 200 ms |
| Finality | sub-second (BLS fast finality) |
| Pre-confirmation | ~20 ms (sub-block) |
| Turn length (blocks per validator, per rotation) | 16 |
| Epoch length | 2,250 blocks (7.5 minutes) |
| Consensus | Parlia PoSA, up to 64 validators |
| Gas asset | BNB (bridged from BSC) |

## Current Status

BNB NewL1 runs today as a multi-validator devnet with real block production, P2P gossip, and end-to-end finality. Public testnet and mainnet are still ahead, and each feature page calls out what's shipped versus still in progress.

Every interface in this manual has been exercised against a devnet built from source: the `eth_*`/`newl1_*` RPC surface, the full governance lifecycle, account-abstraction key management and the `0x76` envelope, and the complete shielded-pool flow. The only corrections that came out of it were minor response shapes, already reflected here. The client has moved on since, so the [JSON-RPC Endpoint](./developers/json_rpc/json-rpc-endpoint.md) page is kept current against client source, and its newer methods are documented from the implementation rather than from a live call.
