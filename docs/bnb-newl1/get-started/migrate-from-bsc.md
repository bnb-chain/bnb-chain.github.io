---
title: Migrating from BSC - BNB NewL1
---

# Migrating from BNB Smart Chain

Same gas asset, same Parlia consensus family, same staking and governance contracts at the same addresses, unmodified EVM. Contracts deploy unchanged and standard tooling connects unchanged. The differences are almost all above the EVM: fees, mempool, block cadence, and how state is committed.

!!! note "No public network yet"
    There is no public testnet or mainnet endpoint yet, so treat this as a porting checklist to work through ahead of one. A native BNB NewL1 ↔ BSC bridge is designed and under development but not live; the `CrossChain` address currently holds a placeholder (see [System Contracts](../governance/system-contracts.md)).

## You Pay for Your Declared Gas Limit

**NewL1 charges the `gas_limit` you declare, not the gas the EVM actually spends.** If a call needs 70,000 gas and you submit `gas_limit = 500,000`, you pay for 500,000.

NewL1 orders blocks before execution, so declared gas is the block space reserved at ordering time. The node tracks each account's in-flight fee/value exposure and caps cumulative declared gas and calldata. There is no fixed user reserve floor.

- Do not pad blindly. `estimate * 1.5`, ethers' default padding, and hardcoded `500000` waste money.
- `eth_estimateGas` still returns simulated EVM usage. Add only the margin your call path needs.
- Receipts report charged gas: user-transaction `gasUsed` normally equals the declared limit. Use traces for actual EVM consumption.
- Max per transaction: 16,777,216 gas (2²⁴, BEP-652).
- The same rule applies to [`0x76` AA transactions](../developers/transaction-types.md), including sponsors and session-key spend limits.

```ts
const estimated = await provider.estimateGas(tx);
tx.gasLimit = estimated + estimated / 10n; // example: 10% headroom
```

For one transaction, `gasUsed` should not exceed its declared limit. If it looks larger, you are probably reading `header.gasUsed`, `cumulativeGasUsed`, or an inner `0x76` call instead of the outer transaction. If execution needs more than the limit, it runs out of gas and fails.

## Carries Over Unchanged

| Area | Notes |
|---|---|
| EVM semantics | Full Prague from genesis, no fork ramp. |
| Gas asset | BNB. |
| Staking & governance contracts | `ValidatorSet`, `SlashIndicator`, `SystemReward`, `StakeHub`, `StakeCredit`, `Governor`, `GovToken`, `Timelock` at their BSC addresses ([details](../governance/system-contracts.md)). |
| Consensus | Parlia + BLS fast finality, with `parlia_getSnapshot` / `parlia_getValidators` / `parlia_getJustifiedNumber`. |
| BSC-flavored RPC | `eth_getFinalizedHeader`, `eth_getFinalizedBlock`, `eth_getTransactionReceiptsByBlockNumber`, `eth_getTransactionsByBlockNumber`. |
| Millisecond timestamps | As on BSC: seconds in `header.timestamp`, milliseconds in the low 8 bytes of `mixHash`. |

## Contracts

Bytecode runs as-is. What changes meaning is anything that reasons about time or block cadence.

- **`block.number` advances ~5×/second.** Every block-count constant (vesting, `blocksPerDay`, TWAP windows, auction durations) is off by ~3.75× versus BSC. Recompute them, or switch to timestamp math.
- **`block.timestamp` repeats across roughly five consecutive blocks.** `require(block.timestamp > lastUpdate)`, per-block rate limiting, and timestamp-as-unique-key all break.
- **`block.prevrandao` is not randomness.** It is the millisecond part of the timestamp, `0–999`. `block.difficulty` is Parlia's `2`/`1`.
- **The fee payer may not be the sender.** One transaction can also carry up to 64 atomic calls (`0x76`).
- **EIP-7702 and EIP-4844 transactions are rejected.** For smart accounts, use the native [`0x76` envelope](../developers/transaction-types.md) and the `AccountKeychain` precompile instead.

## Submitting Transactions

- **The base fee is pinned to zero (BEP-222), so the tip is the price:** `min(maxFeePerGas, maxPriorityFeePerGas)`. Tipping `0` pays nothing and is rejected. Fees route through the system address to `ValidatorSet`, with BEP-95 burning its share.
- **No global mempool.** Transactions go straight to the current and next producer. No `txpool_*`, and `eth_subscribe("newPendingTransactions")` shows only this node's admissions.
- **Replace-by-fee needs a 10% bump and is local only.** It displaces the incumbent just in the pools holding it.
- **Pooled transactions expire after 3 hours by default**, and that timeout is operator-configurable. A nonce more than 256 ahead is rejected at submission.
- **`eth_getTransactionCount(addr, "latest")` returns the ordered-tip nonce and does not look ahead.** Track nonces client-side when pipelining.

## Reading State and Receipts

This is where [async execution](../core-concepts/async-execution.md) shows up, and it is the biggest behavioral gap versus BSC.

- **`latest` means executed, not ordered.** State reads trail the head you see on a `newHeads` subscription. Expected, not a lagging node.
- **`-38004` is retryable, `-38001` is not.** Ordered-but-unexecuted versus no-such-block. `eth_getTransactionReceipt` uses `-38004` for "block not executed yet" and `null` for "unknown transaction", so keep polling on the former.
- **`eth_getProof` rejects with `-32004`.** State is committed with an LtHash accumulator, not an MPT ([State DB](../core-concepts/state-db.md)). Light clients, proof-based bridges, and similar need a different design; an accumulator-native proof scheme is planned.
- **`eth_syncing` is always `false`.** Use `eth_health` plus block-number progress. Snap sync doesn't exist.

## Indexers and Explorers

- **System transactions are invisible in the block body.** Slashing, deposits, finality rewards, validator-set updates, and shielded drains are not in the transaction list and not counted in `header.gasUsed`. Read them via [`newl1_getSystemReceiptsByBlock`](../developers/json_rpc/newl1-api-list.md#newl1_getsystemreceiptsbyblock); they never appear in `eth_getBlockReceipts`.
- **Blocks carry `systemTransactionsRoot` and `commitments`.** `stateRoot`, `receiptsRoot`, `logsBloom`, and `gasUsed` are `null` while a block is ordered but unexecuted, and strict deserializers fail at the tip.
- **`newl1_subscribeNewHeads`** delivers head, justified, and finalized numbers and hashes in one frame per canonical advance.

Once you're ported, the [Quick Guide](../developers/quick-guide.md) covers what BNB NewL1 adds on top: pre-confirmation, Multi-Lane, native account abstraction, and the shielded pool.
