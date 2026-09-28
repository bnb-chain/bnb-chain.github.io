---
title: Examples - BNB NewL1
---

# Examples

The examples illustrate the proposed NewL1 RPC workflow. To run them, use the matching client release and devnet configuration supplied by the protocol team. Set the required endpoint variables and test with a development account before using a funded account:

```bash
RPC=      # node HTTP endpoint
WS=       # node WebSocket endpoint
SK=       # funded private key
FROM=     # its address
TO=       # any recipient

rpc() { curl -s $RPC -H 'content-type: application/json' \
  -d "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"$1\",\"params\":${2:-[]}}" \
  | jq -c '.result // .error'; }
```

Needs `curl` and `jq`. Sending transactions uses Foundry's `cast`; the subscription uses any WebSocket client.

!!! note "No endpoint yet"
    BNB NewL1 has no public network, so there is nothing to point `RPC` at today; see [Network Information](../get-started/network-info.md). These are protocol demonstrations, not an ecosystem showcase.

## Ordering, Execution, and Finality Move Separately

```bash
rpc eth_blockNumber                      # executed tip (no params = "latest")
rpc eth_blockNumber '["finalized"]'      # newest commitment under the finalized block
rpc eth_blockNumber '["safe"]'           # same, under the justified block
```

Poll them in a loop and they advance independently. For the ordered tip plus both consensus pointers in one frame, subscribe to `newl1_subscribeNewHeads` (below).

## Watch Pre-confirmations Live

Any WebSocket client works; `websocat` here:

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"newl1_subscribePreconfirmations","params":[]}' \
  | websocat -n $WS
```

Each notification is a `newl1_preconfirmation` frame: `{txHash, blockNumber, parentHash, subBlockIndex, subBlockHash, position, leader, timestampMs, status}`. Send transactions in another terminal and they appear ~20 ms after submission, well before their block seals. `status` transitions to `aborted` / `superseded` if the promise is withdrawn.

Filter to a single transaction with `"params":[{"txHash":"0x…"}]`. Chain tips instead: `newl1_subscribeNewHeads`, or standard `eth_subscribe` with `["newHeads"]`.

The producer feeds its own published slices to local subscribers as well as gossiping them to peers, so `WS` may point at either a producing or non-producing node.

## Follow One Transaction Through Every Stage

```bash
TX=$(cast send --private-key $SK --legacy --gas-price 1000000000 --gas-limit 21000 \
  --rpc-url $RPC $TO --value 1 --async)

rpc newl1_getTransactionPreconfirmation "[\"$TX\"]"   # leader committed to including it
rpc newl1_getTransactionStatus          "[\"$TX\"]"   # pool-plane state: ready/parked/ordered/…
rpc eth_getTransactionByHash            "[\"$TX\"]"   # in an ordered block (not execution-gated)
rpc eth_getTransactionReceipt           "[\"$TX\"]"   # executed - errors -38004 until then
```

The ladder runs pre-confirmed → ordered → executed → finalized, each stage observable on its own. A `-38004` from the receipt call means "not executed yet, retry", distinct from `null`, which means the transaction is unknown.

## Prove You're Charged for the Gas Limit, Not Gas Used

Send a plain transfer with a deliberately padded limit:

```bash
TX=$(cast send --private-key $SK --legacy --gas-price 1000000000 --gas-limit 100000 \
  --rpc-url $RPC $TO --value 1 --async)
rpc eth_getTransactionReceipt "[\"$TX\"]" | jq '{gasUsed, effectiveGasPrice}'
```

`gasUsed` comes back as `0x186a0` (100,000), the declared limit, not the 21,000 a transfer actually burns. You paid `effectiveGasPrice × 100000`. Compare against what the work really costs:

```bash
rpc eth_estimateGas "[{\"from\":\"$FROM\",\"to\":\"$TO\",\"value\":\"0x1\"}]"   # 0x5208 = 21000
```

Estimation runs with charge-by-limit disabled, so it measures real usage. [Details](../get-started/migrate-from-bsc.md#you-pay-for-your-declared-gas-limit).

## Read the Chain's Own Features

```bash
rpc newl1_laneConfig                                    # live Multi-Lane quota + routes
rpc newl1_getKey "[\"$ACCOUNT\",\"$KEY_ID\"]"           # AA delegated-key state
rpc newl1_getSystemReceiptsByBlock '["latest"]'         # slashing/reward/validator-set txs
rpc eth_getProof '[]'                                   # -32004: LtHash, not an MPT
```

`newl1_getSystemReceiptsByBlock` is the only way to see system transactions; they never appear in `eth_getBlockReceipts` or the block's transaction list.

Full method list, parameters, and response shapes: [BNB NewL1 API List](./json_rpc/newl1-api-list.md).
