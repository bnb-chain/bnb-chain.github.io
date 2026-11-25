---
title: Transaction Pre-confirmation - New L1
---

# Transaction Pre-confirmation

Transaction pre-confirmation lets a client learn in roughly 20 milliseconds, rather than after a full block interval or more, that the validator currently building a block has committed to including their transaction at a specific position within it. It is always-on network infrastructure (every node relays and serves it), not a per-operator opt-in, though only the current block producer originates a stream at any given moment.

## Guarantees

Pre-confirmation is a best-effort, validator-signed promise about ordering and inclusion. It says nothing about execution success and nothing about finality:

- It never touches the vote pool, fork choice, or finality logic; it is purely advisory and read-only with respect to consensus.
- A bad or dishonest stream can mislead a subscriber, but it can never affect the chain itself.
- Pre-confirmations can and do get revoked, reported as `aborted` or `superseded` on the same subscription. That is expected behavior, not a fault. Applications must handle revocation rather than treating "pre-confirmed" as final.

## Confirmation Ladder

Transaction status progresses through several milestones, and ordering and execution advance independently after inclusion:

| Stage | Latency | Meaning |
|---|---|---|
| `preconfirmed` | ~20 ms | The current leader has streamed a signed sub-block including your tx. Revocable. |
| `ordered` | ~1 block interval | Your tx is in an imported block. |
| `order-finalized` | ~1–few block intervals | Two-thirds of validators voted for the containing block (see [Consensus](./consensus.md)), so its order is irreversible. |
| `executed` | Shortly after ordering | The EVM has actually run the transaction and produced a result. |
| `execution-finalized` | After execution is committed and the committing block is finalized | The transaction's result is covered by the commitment-backed `finalized` height. |

Read raw order finality from `finalizedNumber` on `newl1_subscribeNewHeads`. For anything that depends on execution success or state changes, wait until the transaction's block is at or below `eth_blockNumber("finalized")`, then re-check the canonical block hash.

## How to Use It

### RPC (WebSocket)

- **`newl1_subscribePreconfirmations`** streams node-interpreted pre-confirmation events: `{txHash, blockNumber, parentHash, subBlockIndex, subBlockHash, position, leader, timestampMs, status}`. Accepts an optional `{txHash}` filter (no sender-level filter). Also emits `{"status": "lagged", "dropped": n}` flow-control frames if the subscriber falls behind, so a missed revocation is never silent.
- **`newl1_subscribeSubBlocks`** streams the raw, signed sub-blocks as gossiped, for clients that prefer to verify independently rather than trust the node's interpretation.

### RPC (HTTP)

- **`newl1_getTransactionPreconfirmation(txHash)`** is a one-shot cache lookup. Cache retention is short (roughly 80 blocks); a `null` result does not mean the transaction was never pre-confirmed, only that it's outside the retention window or wasn't tracked.
- **`newl1_getValidatorSchedule`** returns the current validator set, RPC endpoints, current leader index, `epoch_length`/`turn_length`, and next rotation block, which is what you need to independently verify who the leader should be.

### Self-Verification

A client that doesn't want to trust the node's own interpretation can verify a raw sub-block itself:

1. Subscribe to `newl1_subscribeSubBlocks`.
2. Recover the signer from the sub-block's signature.
3. Confirm the signer is in the current validator set via `newl1_getValidatorSchedule` (this checks set membership only, not exact turn/rank, and only against the live/near-real-time schedule).
4. Re-derive the transaction root and confirm your transaction's position within it.

## Limitations

- Ordering-only: a pre-confirmation never implies execution will succeed.
- Append-only within its ~20 ms window: a later, higher-fee transaction cannot reorder transactions that have already been streamed.
- The promise dies with a leader failover. If the current leader goes offline before finishing its turn, any of its outstanding pre-confirmations may be superseded by the next leader's block.
- Coverage can be incomplete during mixed-version network rollouts.
- A conservative (fail-closed) break rate is expected and is a health metric to monitor, not necessarily a sign of a problem.

!!! note "Producer-local subscriptions are supported"
    Sub-blocks are gossiped to peers, and the producer also feeds its own published slices directly to local subscribers. `newl1_subscribePreconfirmations` and `newl1_subscribeSubBlocks` therefore work against the producer's RPC, including on a fully isolated single-node devnet.
