---
title: New L1 API List - New L1
---

# New L1 API List

Every method New L1 serves beyond, or differently from, a standard Geth client. For the standard methods themselves, see the [Geth JSON-RPC API documentation](https://geth.ethereum.org/docs/interacting-with-geth/rpc).

Examples below assume `RPC` is set to a node's HTTP endpoint and `WS` to its WebSocket endpoint.

## Block Tags and the Two Tips

Because ordering and execution are decoupled, the node tracks two heights:

- **Ordered tip.** The freshest block accepted by consensus.
- **Executed tip.** The highest block whose post-state and receipts are materialized. It trails the ordered tip by the proposer-chosen delay.

There are no custom tag strings on the wire, only the five standard Ethereum tags plus an explicit number:

| Tag | Resolves to |
|---|---|
| `latest` / `pending` | The executed tip. `pending` is an alias for `latest`; there is no mempool-simulated pending state. |
| `safe` / `finalized` | The height of the nearest published execution commitment at or before the justified / finalized block. Always at or below the executed tip. |
| `earliest` | Block 0. |
| explicit number | That block, subject to the gating below. |

State-dependent reads (`eth_call`, `eth_getBalance`, `eth_getCode`, `eth_getStorageAt`, `eth_estimateGas`, `eth_getBlockReceipts`, `eth_getTransactionCount`, `eth_getLogs`, `newl1_getKey`) also accept an EIP-1898 `{"blockHash": "0x…"}` object in place of the tag, the same shape BSC and geth accept.

Two error codes distinguish the failure modes an explicit number can hit:

- `-38004`: the block is ordered but not yet executed. Retry once execution catches up.
- `-38001`: the block number is beyond the ordered head, or an EIP-1898 block hash doesn't resolve to a canonical block. No such block exists, so retrying is pointless.

Block header lookups (`eth_getBlockByNumber` / `eth_getBlockByHash`) are not execution-gated: an ordered-but-unexecuted block is readable by its explicit number, and its four execution-derived fields (`stateRoot`, `receiptsRoot`, `logsBloom`, `gasUsed`) are `null` until a later block publishes the matching commitment.

!!! warning "`eth_getTransactionCount("latest")` is the deliberate exception"
    It returns the ordered-tip nonce, not the executed-tip one, so a sender accounts for its own already-ordered-but-unexecuted transactions instead of reusing a nonce. It does not look ahead into the not-yet-ordered pool, so a sender pipelining transactions back-to-back must poll `latest` and wait for each to be ordered before using the next nonce.

```bash
## executed tip
curl -X POST "$RPC" -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'

## newest published commitment under the finalized block
curl -X POST "$RPC" -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":["finalized"],"id":1}'
```

## Divergences from Geth

| Behavior | Difference |
|---|---|
| `eth_getProof` | Always rejects with `-32004`. State is committed with a cumulative hash accumulator (LtHash), not a Merkle-Patricia trie, so there is no trie inclusion proof to serve ([State DB](../../core-concepts/state-db.md)). An accumulator-native scheme is planned. |
| Gas accounting | A transaction pays its declared gas limit, not gas used. `gasUsed` in a receipt therefore equals the transaction's `gas` field, and `header.gasUsed` is the sum of declared limits. `eth_estimateGas` and `eth_call` simulate with this model disabled, so an estimate still measures true usage. Per-transaction gas limit is capped at 16,777,216 (BEP-652 / EIP-7825). See [Migrating from BSC](../../get-started/migrate-from-bsc.md#you-pay-for-your-declared-gas-limit). |
| Fees | The base fee is consensus-pinned to zero (BEP-222), so the effective gas price is `min(maxFeePerGas, maxPriorityFeePerGas)`. A transaction that tips zero pays nothing and is rejected by the pool's minimum-price gate (1 wei default, matching geth's `PriceLimit`). |
| Mempool | No global mempool: transactions route directly to the current and next block producer. There is no `txpool_*` namespace. `eth_subscribe("newPendingTransactions")` reports only the node's own local-pool admissions. |
| Replace-by-fee | Works, but only locally: a same-nonce resubmission must beat the incumbent's effective tip by 10%, and displaces it only in the pools that hold it. A transaction forwarded from another node never displaces one received directly from a client. |
| Transaction expiry | A pooled transaction not included within the pool TTL (3 h default, scanned every 20 s) is evicted, and a nonce more than 256 ahead of the account's current nonce is rejected at submission. Both time values are operator-configurable. |
| Transaction types | EIP-4844 (blob) and EIP-7702 (set-code) transactions are rejected by the pool's type gate. Two native types are added; see [Transaction Types](../transaction-types.md). |
| `eth_syncing` | Always `false`: there is no staged-sync driver to report progress from. |
| Uncle methods | Compatibility stubs: counts are always `0x0`, bodies always `null`. |
| Block bodies | `eth_getBlockBy*` carries two extra fields, `systemTransactionsRoot` and `commitments`. Standard deserializers ignore them. |

## Pre-confirmation API

Pre-confirmations are soft, revocable advisories, never proofs and never a substitute for finality.

!!! warning "This surface is unauthenticated"
    `newl1_subscribePreconfirmations`, `newl1_subscribeSubBlocks`, and `newl1_getTransactionPreconfirmation` are unauthenticated by design, and each subscription holds server-side memory. Firewall the RPC bind address, or place this surface behind a separate admin port, on any non-loopback deployment.

### newl1_getValidatorSchedule

Returns the current validator set and leader schedule, which is what you need to discover where to send transactions and to independently verify pre-confirmation signers.

**Parameters**

None.

```bash
curl -X POST "$RPC" -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"newl1_getValidatorSchedule","params":[],"id":1}'
```

```jsonc
{
  "head_block": "0x961",
  "epoch_length": "0x8ca",      // configured blocks per epoch (2,250)
  "turn_length": 16,
  "validators": [
    { "address": "0x…", "tx_rpc_endpoint": "http://10.0.0.1:8545" }
  ],
  "current_leader_index": 2,
  "next_rotation_block": "0x962"
}
```

`tx_rpc_endpoint` is the peer's VDN-advertised endpoint, and is an empty string for a validator that hasn't completed a VDN handshake with this node. Clients only need to re-fetch the full schedule at epoch boundaries; within an epoch the current leader follows from the head block number and `turn_length`.

### newl1_getTransactionPreconfirmation

One-shot lookup of a transaction's last known pre-confirmation status, from a short-lived cache.

**Parameters**

**Hash** String (REQUIRED)

* HEX String - the hash of the transaction

```bash
curl -X POST "$RPC" -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"newl1_getTransactionPreconfirmation","params":["0x…"],"id":1}'
```

A `null` result does not mean the transaction was never pre-confirmed, only that it fell outside the retention window or wasn't tracked.

### newl1_subscribePreconfirmations

WebSocket only. Streams node-interpreted pre-confirmation events; notification method is `newl1_preconfirmation`, unsubscribe with `newl1_unsubscribePreconfirmations`.

**Parameters**

**Filter** Object (OPTIONAL)

* `{"txHash": "0x…"}` - stream only this transaction's events. Omitted or `null` streams all. There is no sender-level filter.

```bash
echo '{"jsonrpc":"2.0","method":"newl1_subscribePreconfirmations","params":[],"id":1}' \
  | websocat -n "$WS"
```

Each notification carries:

```jsonc
{
  "txHash": "0x…",
  "blockNumber": "0x961",
  "parentHash": "0x…",
  "subBlockIndex": "0x2",
  "subBlockHash": "0x…",
  "position": "0x7",
  "leader": "0x…",
  "timestampMs": "0x…",
  "status": "preconfirmed"   // preconfirmed | aborted | superseded
}
```

If a subscriber falls behind, the node sends `{"status": "lagged", "dropped": n}` rather than silently dropping a revocation; re-query `newl1_getTransactionPreconfirmation` when you see it.

The producer explicitly feeds its own published slices to local subscribers, so this subscription works against the producer's RPC and on a single-node devnet.

### newl1_subscribeSubBlocks

WebSocket only. Streams the raw signed sub-blocks straight from the gossip mesh, for clients that verify signatures themselves rather than trusting the node's interpretation. Notification method is `newl1_subBlock`; unsubscribe with `newl1_unsubscribeSubBlocks`.

**Parameters**

None.

Each frame carries the sub-block header (`blockNumber`, `parentHash`, `index`, `prevSubBlockHash`, `timestampMs`, `flags`, `txRoot`), its hash, the EIP-2718 encoded transactions, and the 65-byte producer signature.

### newl1_subscribeNewHeads

WebSocket only. One notification per canonical-chain advance, carrying the ordered tip and both consensus pointers together. Notification method is `newl1_newHeads`; unsubscribe with `newl1_unsubscribeNewHeads`.

**Parameters**

None.

```jsonc
{
  "hash": "0x…",
  "number": "0x961",
  "justifiedHash": "0x…",
  "justifiedNumber": "0x95f",
  "finalizedHash": "0x…",
  "finalizedNumber": "0x95e"
}
```

Standard `eth_subscribe` with `"newHeads"` or `"newPendingTransactions"` is also available and behaves as in Geth, except that pending transactions are this node's own admissions only.

## Account Abstraction API

### newl1_getKey

Reads the on-chain state of a delegated key in the `AccountKeychain` precompile, the key registry behind the native `0x76` [account-abstraction transaction](../transaction-types.md).

**Parameters**

**Account** String (REQUIRED)

* HEX String - the 20-byte account address

**KeyId** String (REQUIRED)

* HEX String - the key identifier

**BlockNumber** QUANTITY|TAG (OPTIONAL)

* Standard block tag or number, or an EIP-1898 `{"blockHash": "0x…"}` object. Defaults to `latest` (the executed tip).

```bash
curl -X POST "$RPC" -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"newl1_getKey","params":["0x…","0x…"],"id":1}'
```

```jsonc
{
  "sigType": "0x0",                 // 0x0 secp256k1, 0x1 P256, 0x2 WebAuthn
  "expiry": "0xffffffffffffffff",   // max uint64 = no expiry; 0x0 = never authorized
  "isRevoked": false,
  "isAdmin": false,
  "scoped": true,
  "spendLimit": "0x…",
  "spendPeriod": "0x0",
  "spent": "0x…"
}
```

This simulates `AccountKeychain.getKey` against executed state, so it accepts the same block locators as `eth_call`.

## Multi-Lane API

### newl1_laneConfig

Returns the live, governance-resolved [Multi-Lane](../../core-concepts/multi-lane.md) configuration for the current canonical head: the resolver's view (parent context, anchor depth, branch-aware), not a raw registry dump.

**Parameters**

None.

```bash
curl -X POST "$RPC" -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"newl1_laneConfig","params":[],"id":1}'
```

```jsonc
{
  "parentNumber": "0x13",
  "parentHash": "0x…",
  "anchorNumber": "0xb",        // lagged executed-state checkpoint this config resolved from
  "anchorHash": "0x…",
  "configAnchorDepth": "0x8",   // activation-delay depth, in blocks
  "version": "0x0",             // null until governance has ever set a version
  "inert": true,                // true until governance has ever set a lane config
  "laneDefs": [],               // [{ laneId, quotaBps }, …] once configured
  "laneRoutes": []              // [{ to, laneId }, …] address → lane assignments
}
```

`inert: true` with empty `laneDefs` / `laneRoutes` is the genesis default, until a governance proposal activates a lane.

## Transaction Pool API

### newl1_getTransactionStatus

Pool-plane status of a transaction: where it sits in this node's local pool, which is a different question from "is it in a block" (`eth_getTransactionReceipt`).

**Parameters**

**Hash** String (REQUIRED)

* HEX String - the hash of the transaction

```bash
curl -X POST "$RPC" -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"newl1_getTransactionStatus","params":["0x…"],"id":1}'
```

```jsonc
{
  "state": "ready",   // pending | ready | parked | emitted | ordered | evicted | removed | rejected | unknown
  "reason": null,     // set only for a terminal state, e.g. why it was evicted
  "sender": "0x…",
  "nonce": "0x0",
  "ageMs": "0xc"
}
```

`sender`, `nonce`, and `ageMs` are `null` for `unknown`. That state is ambiguous by design: it covers both "never seen" and "aged out of the bounded status ring". Treat it as "no information", not as a negative outcome. This is a local view: it answers for the node you asked, not the network. See [Transaction Lifecycle](../transaction-lifecycle.md#pool-states) for state transitions and terminal reasons.

### newl1_debugSenderSnapshot

Debug surface for one sender's live pool lane: every entry nonce-ascending with its state and age, plus the watermarks the block packer works from (`baseAtExecutedTip`, `orderedNonce`). Answers "why isn't this sender's transaction being packed" without reading node logs.

**Parameters**

**Address** String (REQUIRED)

* HEX String - the 20-byte sender address

```bash
curl -X POST "$RPC" -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"newl1_debugSenderSnapshot","params":["0x…"],"id":1}'
```

```jsonc
{
  "sender": "0x…",
  "baseAtExecutedTip": "0x28",
  "orderedNonce": "0x2a",
  "entries": [
    { "nonce": "0x2a", "hash": "0x…", "state": "emitted", "ageMs": "0xc" }
  ]
}
```

`baseAtExecutedTip` is the sender nonce at the executed tip. `orderedNonce` additionally accounts for canonical transactions that have not necessarily executed yet. Either watermark may be `null` when unavailable.

## System Transaction API

### newl1_getSystemReceiptsByBlock

Receipts for a block's system transactions: slashing, deposits, finality rewards, validator-set updates, and shielded-pool drains. These run in the block executor after ordinary transactions and have no place in `transactions_root`, so they never appear in `eth_getBlockReceipts` or in the block's transaction list. This method is the only way to see them.

**Parameters**

**BlockNumber** QUANTITY|TAG (OPTIONAL)

* HEX String - an integer block number
* String `"earliest"` / `"latest"` / `"pending"` / `"safe"` / `"finalized"`

Defaults to `latest`.

```bash
curl -X POST "$RPC" -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"newl1_getSystemReceiptsByBlock","params":["latest"],"id":1}'
```

Returns `null`, distinct from an empty array, when the block's system transactions haven't been committed by a descendant block yet. Because the system-tx hash index is populated only at finalized-persist time, a hash returned here can still resolve to `null` on `eth_getTransactionReceipt` until finality catches up.

## Finality API

New L1 uses Parlia with BLS fast finality: a block becomes irreversible once two-thirds of validators have voted for it, in roughly one block interval rather than by accumulating confirmation depth.

The standard route is the `finalized` block tag (see [Block Tags](#block-tags-and-the-two-tips)). The methods below are the BSC-compatible explicit form.

### eth_getFinalizedHeader

Returns the header of the block at `max(fastFinalizedHeight, head - verifiedValidatorNum)`.

**Parameters**

**verifiedValidatorNum** QUANTITY (REQUIRED)

* Integer in the range `[2, 21]`.

!!! warning "BSC's `-1` / `-2` / `-3` shorthands are not supported"
    On BSC these select a fraction of the validator set. On New L1 they are rejected with `-32602`; pass an explicit count in `[2, 21]`.

```bash
curl -X POST "$RPC" -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_getFinalizedHeader","params":[15],"id":1}'
```

### eth_getFinalizedBlock

Block form of `eth_getFinalizedHeader`.

**Parameters**

**verifiedValidatorNum** QUANTITY (REQUIRED)

* Integer in the range `[2, 21]`.

**Full_transaction_flag** Boolean (REQUIRED)

* If true it returns the full transaction objects, if false only the hashes of the transactions.

```bash
curl -X POST "$RPC" -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_getFinalizedBlock","params":[15,false],"id":1}'
```

### Parlia Snapshot Methods

| Method | Returns |
|---|---|
| `parlia_getSnapshot(tag?)` / `parlia_getSnapshotAtHash(hash)` | The Parlia snapshot at a block. |
| `parlia_getValidators(tag?)` / `parlia_getValidatorsAtHash(hash)` | Consensus validator addresses from the selected snapshot. |
| `parlia_getJustifiedNumber(tag?)` | Snapshot vote-data target number. |
| `parlia_getFinalizedNumber(tag?)` | Snapshot vote-data source number. |
| `parlia_getTurnLength(tag?)` | Validator turn length from the selected snapshot. |

## Others

### eth_health

A health-check endpoint to detect whether the RPC service of a node is up. Returns `true` while it is serving.

**Parameters**

None.

```bash
curl -X POST "$RPC" -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_health","params":[],"id":1}'
```

Use this together with block-number progress for health checks; `eth_syncing` is always `false` on New L1 and reports nothing useful.

### eth_getTransactionsByBlockNumber

Get all the transactions for the given block number.

**Parameters**

**BlockNumber** QUANTITY|TAG

* HEX String - an integer block number
* String `"earliest"` / `"latest"` / `"pending"` / `"safe"` / `"finalized"`

```bash
curl -X POST "$RPC" -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_getTransactionsByBlockNumber","params":["0x539492"],"id":1}'
```

### eth_getTransactionReceiptsByBlockNumber

Get all receipts for the given block number. Ordinary transactions only; system-transaction receipts come from [`newl1_getSystemReceiptsByBlock`](#newl1_getsystemreceiptsbyblock).

**Parameters**

**BlockNumber** QUANTITY|TAG

* HEX String - an integer block number
* String `"earliest"` / `"latest"` / `"pending"` / `"safe"` / `"finalized"`

```bash
curl -X POST "$RPC" -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceiptsByBlockNumber","params":["latest"],"id":1}'
```

## Error Codes

| Code | Meaning |
|---:|---|
| `-32602` | Malformed params, or a log-filter range exceeding the configured maximum. |
| `-32601` | Method not found. Also used for "registered but not yet meaningfully implemented". |
| `-38004` | The requested block or transaction is ordered but not yet executed. Retry. |
| `-38001` | The requested block doesn't exist: beyond the ordered head, or a non-canonical hash. Don't retry. |
| `-32004` | Protocol-shape mismatch, today only `eth_getProof`. |
| `-32000` | A simulated call reverted (`data` carries the ABI-encoded revert reason) or halted. |
| `-32603` | Internal error. |
