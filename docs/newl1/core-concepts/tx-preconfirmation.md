---
title: Transaction Pre-confirmation - New L1
---

# Transaction Pre-confirmation

During delegated production, the [TEE Gateway](mev.md) publishes signed SubBlocks so subscribers can see the developing order before the validator seals a complete block. Operators configure a 20 or 50 ms packing tick. Submission latency also depends on arrival time, available capacity, and the production permit.

## How to subscribe

Connect to a Gateway with its public WebSocket adapter enabled. Send:

```json
{"jsonrpc":"2.0","method":"newl1_subscribe","params":["subblocks"],"id":1}
```

Notifications use `newl1_subscription`. Each chunk contains the validator's permit, an index, the previous signed chunk hash, the appended transaction bytes, cumulative lane spans, an `is_last` marker, and the Gateway signature. Clients can verify the permit against the proposer, check the registered Gateway signer for its epoch, and verify the sequence and hash chain. If the stream breaks, reconnect and reconcile with canonical blocks. Local validator production has no SubBlock stream.

## Confirmation ladder

| Stage | What the client can observe |
|---|---|
| Streamed | A signed Gateway chunk contains the transaction. An expired permit or local fallback can produce a different canonical body. |
| Ordered | The validator has sealed a block and the node reports its hash and transaction position. |
| Order-finalized | The transaction's canonical block is covered by the consensus finality pointer on `newl1_subscribeNewHeads`. |
| Executed | The transaction has a receipt with its execution outcome. |
| Execution-finalized | A later finalized block commits the result. Check the successful receipt and its canonical block hash against the finalized execution height. |

Use the [transaction lifecycle](../developers/transaction-lifecycle.md#order-execute-and-finalize) for the corresponding node RPC calls.
