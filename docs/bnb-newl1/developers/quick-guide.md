---
title: Quick Guide - BNB NewL1
---

# Developer Quick Guide

If you build on any EVM chain, you can build on BNB NewL1. Solidity, the toolchain (Foundry, Hardhat, Remix), and the SDKs (ethers.js, viem, web3.py) all work unmodified against a node's standard JSON-RPC endpoint.

!!! note "Devnet stage"
    There is no public testnet or mainnet endpoint, no faucet, and no hosted explorer yet. Today you develop against a local devnet built from the client source. Network parameters on these pages reflect the current devnet client and may change before a public launch.

## Getting Started

There is no endpoint to connect to yet; [Network Information](../get-started/network-info.md) is where one will be published. Until then, read the differences below and work through [Migrating from BSC](../get-started/migrate-from-bsc.md) if you're bringing an existing app, since most of what it lists is decided in your submission path rather than in your contracts.

## What's Different from a Typical EVM Chain

Five things account for nearly every surprise.

| What | Why it matters | Details |
|---|---|---|
| You pay for your declared gas limit | Unused gas is never refunded, so SDK gas padding is money spent, and receipts report `gasUsed` equal to the limit. | [Migrating from BSC](../get-started/migrate-from-bsc.md#you-pay-for-your-declared-gas-limit) |
| `latest` means executed, not ordered | Ordering and execution are decoupled; state reads resolve to the executed tip, and an explicit block number that hasn't executed yet returns `-38004` rather than stale data. | [Async Execution](../core-concepts/async-execution.md) |
| No global mempool | Transactions route straight to the current and next block producer. No `txpool_*`, no public pending-transaction feed, and replace-by-fee only affects the pools holding the transaction. | [JSON-RPC Endpoint](./json_rpc/json-rpc-endpoint.md) |
| No `eth_getProof` | State is committed with an LtHash accumulator, not a Merkle-Patricia trie, so there is no trie proof to serve. Anything proof-based needs a different design. | [Async Execution](../core-concepts/async-execution.md) |
| 200 ms blocks | `block.number` advances about five times a second, and `block.timestamp` (still whole seconds) repeats across consecutive blocks. Block-count and timestamp math both need review. | [Migrating from BSC](../get-started/migrate-from-bsc.md#contracts) |

Coming from BSC specifically? [Migrating from BSC](../get-started/migrate-from-bsc.md) is the full checklist, including what carries over unchanged: the gas asset, the Parlia staking and governance contracts at their original addresses, and the `parlia_*` RPC methods.

## What You Get That You Don't Have Elsewhere

None of these are required to run a standard EVM app. They are additive, and they are the reason to build here.

| Capability | What it gives you |
|---|---|
| [Transaction pre-confirmation](../core-concepts/tx-preconfirmation.md) | A validator-signed inclusion signal in ~20 ms, long before the block lands. Advisory and revocable, so never treat it as finality. |
| [Native account abstraction](../core-concepts/account-abstraction.md) | The `0x76` transaction envelope: atomic call batches, session and admin keys, passkey (WebAuthn/P256) signing, and gas sponsorship, with no bundler and no EntryPoint contract. |
| [Multi-Lane](../core-concepts/multi-lane.md) | Governance-configured reserved gas quota per traffic class, so latency-sensitive flows aren't crowded out by unrelated load. |
| [Shielded pool](../core-concepts/privacy.md) | An opt-in native system contract for private transfers, alongside ordinary transparent ones. |
| [BLS fast finality](../core-concepts/consensus.md) | Fast finality for transaction ordering. The execution result becomes final only after a later block records it and that block also finalizes. |

## Reference

- **[Examples](./examples.md)** collects runnable demos: watch a pre-confirmation land, find the current leader, drive load, run the end-to-end scenario suite.
- **[Transaction Types](./transaction-types.md)** documents the two native EIP-2718 types (`0x76` account abstraction, `0x77` shielded), their fields, how to sign them, and what trips people up.
- **[JSON-RPC Endpoint](./json_rpc/json-rpc-endpoint.md)** covers endpoints, transports, and how the API surface maps onto Geth's.
- **[BNB NewL1 API List](./json_rpc/newl1-api-list.md)** lists every method that goes beyond or differs from Geth, with parameters and `curl` examples.
- **[Network Information](../get-started/network-info.md)** holds the network identifiers, protocol parameters, and endpoints.
- **[System Contracts](../governance/system-contracts.md)** lists every system contract and precompile address, including the BSC carry-overs and the BNB NewL1–original ones.
- **[Governance](../governance/overview.md)** walks the propose → vote → queue → execute lifecycle that controls protocol parameters.
- **[FAQ](../faq.md)**

## Tooling

Standard EVM tooling connects with no chain-specific client:

- Contracts and testing: [Foundry](https://book.getfoundry.sh/), [Hardhat](https://hardhat.org), [Remix](https://remix.ethereum.org)
- SDKs: [ethers.js](https://docs.ethers.org), [viem](https://viem.sh), [web3.py](https://web3py.readthedocs.io)

Two caveats when you wire them up: set a real `maxPriorityFeePerGas` (the base fee is pinned to zero, so the tip is the entire price), and don't pad gas limits (you pay for what you declare). Hosted explorers, indexers, and faucets are not available at this stage.
