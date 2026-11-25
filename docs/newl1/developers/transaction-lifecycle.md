---
title: Transaction Lifecycle - New L1
---

# Transaction Lifecycle

A transaction progresses from submission to pool admission, optional pre-confirmation, ordering, execution, and finality. Each milestone has its own RPC signal.

![New L1 transaction lifecycle](../../assets/newl1-transaction-lifecycle.svg)

## Submit Through a Gateway

For ordinary transactions, submit signed bytes to a node RPC:

```bash
curl -X POST "$RPC" -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":["0xSIGNED_TX"],"id":1}'
```

When a Gateway is configured, the RPC node tries it first. Ordinary flow can fall back to validator forwarding. Private submissions and bundles require an authenticated Gateway and return an error if it is unavailable. For direct submission and the trust boundary of each path, see [MEV and the TEE Gateway](../core-concepts/mev.md).

## Pool States

Once accepted, the transaction enters the receiving node's local pool. Its sender nonce determines when it becomes eligible for packing.

| Pool state | Meaning |
|---|---|
| `pending` | The node has accepted the transaction and is completing admission. This state is normally brief. |
| `parked` | The transaction cannot be packed yet, usually because of a nonce gap, a future validity window, or insufficient available balance. |
| `ready` | The transaction is contiguous with the sender's ordered nonce and currently eligible for packing. |
| `emitted` | A local packing state. Check canonical inclusion by hash. |
| `ordered` | The transaction is in a block known to this node. It remains tracked until finality allows pool cleanup. |
| `evicted` / `removed` / `rejected` | The transaction left the local pool or failed admission. Check `reason` for the terminal cause. |
| `unknown` | This node has no retained information. It does not prove that the network never saw the transaction. |

A parked transaction can become ready when its nonce gap is filled, its validity window opens, or new funds become available. A reorganization can also move an ordered transaction back into an eligible pool state.

### `newl1_getTransactionStatus`

Returns this node's retained pool-plane view of one hash:

```bash
curl -X POST "$RPC" -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"newl1_getTransactionStatus","params":["0x…"],"id":1}'
```

```json
{
  "state": "emitted",
  "reason": null,
  "sender": "0x…",
  "nonce": "0x2a",
  "ageMs": "0xc"
}
```

`reason` is set for terminal states such as `rejected`, `evicted`, and `removed`. Common values include `nonce_gap`, `replacement_underpriced`, `ttl`, `invalid`, `replaced`, and `dual_confirmed`. `sender`, `nonce`, and `ageMs` are `null` when the state is `unknown`.

This result is node-local. With no global mempool, another node may return a different state or `unknown`. `unknown` also covers a result that aged out of the bounded status history; it is not a negative network-wide outcome.

### `newl1_debugSenderSnapshot`

Use the debug snapshot when you need to explain why one sender's transactions are not progressing:

```bash
curl -X POST "$RPC" -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"newl1_debugSenderSnapshot","params":["0xSENDER"],"id":1}'
```

```json
{
  "sender": "0x…",
  "baseAtExecutedTip": "0x28",
  "orderedNonce": "0x2a",
  "entries": [
    {"nonce": "0x2a", "hash": "0x…", "state": "emitted", "ageMs": "0xc"}
  ]
}
```

`baseAtExecutedTip` is the sender nonce at the executed tip; `orderedNonce` includes canonical transactions that may not have executed yet. Entries are returned in nonce order.

### Default Pool Rules

These are node defaults; operators can change them.

- Future nonces may be at most 256 ahead of the current sender nonce.
- A replacement must increase the effective tip by at least 10%, with a strict minimum increase of 1 wei.
- A forwarded replica cannot replace a transaction received directly from a client.
- Pool TTL defaults to 3 hours and the maintenance scan runs every 20 seconds.

## Receive a Pre-confirmation

A [Gateway SubBlock subscription](../core-concepts/tx-preconfirmation.md#how-to-subscribe) shows a signed prefix during delegated production. Treat this as an early ordering signal. A local fallback block can select a different set of transactions. Check canonical inclusion by hash even if the Gateway stream ends normally.

## Order, Execute, and Finalize

After the producer seals and proposes the block, ordering, execution, and their finality signals advance on separate paths:

| Milestone | What it proves | How to observe it |
|---|---|---|
| Ordered | The transaction has a fixed position in an imported canonical block. It may still be reorganized before finality. | `eth_getTransactionByHash` returns non-null `blockHash` and `blockNumber`. |
| Executed | The EVM has run the transaction and produced its receipt and state changes. | `eth_getTransactionReceipt` |
| Order-finalized | Two-thirds of validators have voted for the containing block, making its ordering irreversible. | Compare the transaction's block number with `finalizedNumber` from `newl1_subscribeNewHeads`. |
| Execution-finalized | The execution result has been committed in a later block, and that committing block is finalized. | Wait until the transaction's block number is at or below `eth_blockNumber("finalized")`. |

`eth_getTransactionByHash` also returns transactions still held in the queried node's local pool. A non-null result proves ordering only when `blockHash` and `blockNumber` are populated.

Execution is asynchronous, so an ordered transaction may not have a receipt yet. On devnet2:

- `eth_getTransactionReceipt` returns `-38004` when the transaction is ordered but not yet executed. Retry.
- It returns `null` when the hash is unknown to that endpoint. This does not establish transaction failure.

New L1 extends `eth_blockNumber` with an optional tag parameter:

| Call | Result |
|---|---|
| `eth_blockNumber()` / `eth_blockNumber("latest")` / `eth_blockNumber("pending")` | Executed tip |
| `eth_blockNumber("safe")` | Latest published execution commitment at or before the justified block |
| `eth_blockNumber("finalized")` | Latest published execution commitment at or before the FFG-finalized block |
| `eth_blockNumber("earliest")` | Block 0 |

The `safe` and `finalized` values are commitment-backed execution heights, not the raw consensus pointers. For the raw ordered, justified, and finalized heights, subscribe to `newl1_subscribeNewHeads`; standard `eth_subscribe("newHeads")` follows the executed-block feed instead.

```json
{"jsonrpc":"2.0","method":"newl1_subscribeNewHeads","params":[],"id":1}
```

Each `newl1_newHeads` notification carries:

```json
{
  "hash": "0x…",
  "number": "0x961",
  "justifiedHash": "0x…",
  "justifiedNumber": "0x95f",
  "finalizedHash": "0x…",
  "finalizedNumber": "0x95e"
}
```

See [Async Execution](../core-concepts/async-execution.md) for how the ordered, executed, and committed tips relate.

For anything that depends only on transaction order, order finality is sufficient. For anything that depends on execution success or state changes, wait for execution finality and re-check that the canonical block hash still matches the transaction's `blockHash`.

## Leave the Local Pool

A transaction is removed from a node's pool when any of the following happens:

- both execution and finality have advanced far enough to clean it up (`reason: "dual_confirmed"`);
- another transaction with the same sender and nonce replaces it with a sufficiently higher fee;
- a chain-state change makes its nonce or balance invalid; or
- it exceeds the local pool TTL.

Replacement and eviction are local to the nodes that hold the transaction. A local `evicted`, `removed`, or `unknown` result is therefore not a network-wide failure signal; check canonical inclusion before deciding whether to resubmit.

## Recommended Tracking Flow

1. Save the hash returned by `eth_sendRawTransaction`.
2. Optionally watch pre-confirmations for a low-latency, revocable signal.
3. Poll `eth_getTransactionByHash` until the transaction is ordered.
4. Poll `eth_getTransactionReceipt`; on devnet2, retry `-38004` while execution catches up.
5. Wait for the transaction's block to fall at or below `eth_blockNumber("finalized")` before relying irreversibly on its execution result.
6. Use `newl1_getTransactionStatus` only to explain the local pool path, not as the source of chain finality.

For runnable commands that follow this sequence, see [Examples](./examples.md#follow-one-transaction-through-every-stage).
