---
title: Bsc API List- BSC Develop
---

## Finality API
Finality is a crucial aspect of blockchain security, ensuring that once a block is confirmed, it cannot be reversed or altered. This provides users with the confidence to act on the information in the block without delay.

### Probabilistic Finality and Economic Finality

BNB Smart Chain (BSC) implements a dual-layer finality mechanism combining Economic Finality and Probabilistic Finality to ensure transaction security and network efficiency.

#### Economic Finality (Fast Finality)

The Fast Finality feature, introduced through **[BEP-126](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP126.md)**, enables Economic Finality using a slashing mechanism similar to Casper FFG and Tendermint. Key characteristics:

- Block n achieves economic finality by block n+2
- Transaction finality time: **~3.75 seconds** (with 1.5 seconds block time)
- Economic penalties make block reversal extremely expensive
- Validators violating voting rules forfeit part of their staked assets

This significantly improves user experience through faster and more reliable transaction confirmations.

#### Probabilistic Finality (Fallback Mechanism)

When Fast Finality is unavailable, BSC falls back to Probabilistic Finality. Security increases as more blocks are added - the deeper a block is buried, the lower the probability of reversal.

Network Parameters:

- TurnLength: 8 (consecutive blocks per validator)
- ValidatorSize: 21 (total active validators)
- Block Time: ~1.5 seconds

Finality Requirements:

- Majority (>1/2) validator confirmations: 88 blocks (11 × 8) ≈ 132 seconds
- Supermajority (>2/3) validator confirmations: 120 blocks (15 × 8) ≈ 180 seconds

This dual-layer approach ensures network security and finality guarantees even when Fast Finality encounters issues.

### Economic Finality API

### [eth_getHeaderByNumber](<https://www.quicknode.com/docs/kaia/eth_getHeaderByNumber>) as in the Ethereum client.
**Parameters**

**BlockNumber** QUANTITY|TAG

* HEX String - an integer block number
* String "earliest" for the earliest/genesis block
* String "latest" - for the latest mined block
* String "safe" - for the latest justified head block
* String "**finalized**" - for the latest finalized block

### [eth_getBlockByNumber](<https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbynumber>) as in the Ethereum client.
**Parameters**

**BlockNumber** QUANTITY|TAG

* HEX String - an integer block number
* String "earliest" for the earliest/genesis block
* String "latest" - for the latest mined block
* String "safe" - for the latest justified head block
* String "**finalized**" - for the latest finalized block
  
**Full_transaction_flag** Boolean

- If true it returns the full transaction objects, if false only the hashes of the transactions.

### eth_newFinalizedHeaderFilter
Here are two APIs that can help you trace the latest finalized blocks:
1. Create a finalized header filter:
```
curl -X POST "http://localhost:8545" -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_newFinalizedHeaderFilter","params":[],"id":1}'
```
This will return an rpc.ID which will expire in 5 minutes, then you can get another:
```
{"jsonrpc":"2.0","id":1,"result":"0xcbdc7c21459e2cfbf72e2028f15a98c"}
```
2. Get latest finalized blocks using above rpc.ID. You can call it many times until rpc.ID expires:
```
curl -X POST "http://localhost:8545" -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0xcbdc7c21459e2cfbf72e2028f15a98c"],"id":1}'
```
This will return block hashes:
```
{"jsonrpc":"2.0","id":1,"result":["0x4b52061726b9f15905217699fd5dab8ff9bb704b3b16d27c34541cb15752a91f","0x2b984b80b25f0dddc92ba11290a3d250fc8a3ec6a09bd485c21dbbb8155d2f90"]}
```

### Combined Probabilistic Finality and Economic Finality API

These methods allow you to handle block finality using a straightforward API.

### eth_getFinalizedHeader
* `verifiedValidatorNum` must be within the range `[1, len(currentValidators)]`,with the exception that:
    - `-1` represents at least `len(currentValidators) * 1/2`
    - `-2` represents at least `len(currentValidators) * 2/3`
    - `-3` represents at least `len(currentValidators)`
* Using `-1`, `-2`, or `-3` provides a convenient way to select the desired security level according to your application and the corresponding waiting time. When one of these values is used as the parameter, the returned block is increasingly less likely to be reverted. **Historically, blocks returned by `eth_getFinalizedHeader` with `-1`, `-2`, or `-3` on BSC have never been reverted.**
* If the highest security level is required, you can choose `-3`.
* This function calculates `probabilisticFinalizedHeight` as the highest height of the block verified by `verifiedValidatorNum` validators and then returns the block header with a height equal to `max(fastFinalizedHeight, probabilisticFinalizedHeight)`.
* The height of the returned block header is guaranteed to increase monotonically.
For example:
```
curl -X POST "http://localhost:8545/" -H "Content-Type: application/json"  --data '{"jsonrpc":"2.0","method":"eth_getFinalizedHeader","params":[15],"id":1}'
```

### eth_getFinalizedBlock
* `verifiedValidatorNum` must be within the range `[1, len(currentValidators)]`,with the exception that:
    - `-1` represents at least `len(currentValidators) * 1/2`
    - `-2` represents at least `len(currentValidators) * 2/3`
    - `-3` represents at least `len(currentValidators)`
* Using `-1`, `-2`, or `-3` provides a convenient way to select the desired security level according to your application and the corresponding waiting time. When one of these values is used as the parameter, the returned block is increasingly less likely to be reverted. **Historically, blocks returned by `eth_getFinalizedHeader` with `-1`, `-2`, or `-3` on BSC have never been reverted.**
* If the highest security level is required, you can choose `-3`.
* This function calculates `probabilisticFinalizedHeight` as the highest height of the block verified by `verifiedValidatorNum` validators and then returns the block header with a height equal to `max(fastFinalizedHeight, probabilisticFinalizedHeight)`.
* If `fullTx` is true, the block includes all transactions; otherwise, only transaction hashes are included.
* The height of the returned block is guaranteed to be monotonically increasing.
For example:
```
curl -X POST "http://localhost:8545/" -H "Content-Type: application/json"  --data '{"jsonrpc":"2.0","method":"eth_getFinalizedBlock","params":[11, false],"id":1}'

curl -X POST "http://localhost:8545/" -H "Content-Type: application/json"  --data '{"jsonrpc":"2.0","method":"eth_getFinalizedBlock","params":[15, true],"id":1}'
```

## Blob API

### eth_getBlobSidecarByTxHash
**Parameters**

**Hash** String (REQUIRED)

* HEX String - the hash of the transaction

**full_blob_flag** Boolean (OPTIONAL)

* Default is true. If ture it returns the full blob info, if false only return first 32 bytes of blobs.

```
curl -X POST "http://localhost:8545/" -H "Content-Type: application/json"  --data '{"jsonrpc":"2.0","method":"eth_getBlobSidecarByTxHash","params":["0x377d3615d2e76f4dcc0c9a1674d2f5487cba7644192e7a4a5af9fe5f08b60a63"],"id":1}'

curl -X POST "http://localhost:8545/" -H "Content-Type: application/json"  --data '{"jsonrpc":"2.0","method":"eth_getBlobSidecarByTxHash","params":["0x377d3615d2e76f4dcc0c9a1674d2f5487cba7644192e7a4a5af9fe5f08b60a63", false],"id":1}'
```

### eth_getBlobSidecars
**Parameters**

**BlockNumber** QUANTITY|TAG

* HEX String - an integer block number
* HEX String - the hash of the block
* String "earliest" for the earliest/genesis block
* String "latest" - for the latest mined block
* String "safe" - for the latest justified head block
* String "finalized" - for the latest finalized block

**full_blob_flag** Boolean (OPTIONAL)

* Default is true. If ture it returns the full blob info, if false only return first 32 bytes of blobs.

```
curl -X POST "http://localhost:8545/" -H "Content-Type: application/json"  --data '{"jsonrpc":"2.0","method":"eth_getBlobSidecars","params":["latest"],"id":1}'

curl -X POST "http://localhost:8545/" -H "Content-Type: application/json"  --data '{"jsonrpc":"2.0","method":"eth_getBlobSidecarByTxHash","params":["0xc5043f", false],"id":1}'
```



## Others

### eth_health

* a health check endpoint to detect whether the RPC func of a node is ok. Return true is ok, false is no health.


```
curl -X POST "http://localhost:8545/" -H "Content-Type: application/json"  --data '{"jsonrpc":"2.0","method":"eth_health","params":[],"id":1}'
```

### eth_getTransactionsByBlockNumber

* get all the transactions for the given block number.

**Parameters**

**BlockNumber** QUANTITY|TAG

* HEX String - an integer block number
* String "earliest" for the earliest/genesis block
* String "latest" - for the latest mined block
* String "safe" - for the latest justified head block
* String "finalized" - for the latest finalized block

```
curl -X POST "http://localhost:8545/" -H "Content-Type: application/json"  --data '{"jsonrpc":"2.0","method":"eth_getTransactionsByBlockNumber","params":["0x539492"],"id":1}'
```


### eth_getTransactionDataAndReceipt

* get the original transaction data and transaction receipt for the given transaction hash.

**Parameters**

**Hash** String (REQUIRED)

* HEX String - the hash of the transaction

```
curl -X POST "http://localhost:8545/" -H "Content-Type: application/json"  --data '{"jsonrpc":"2.0","method":"eth_getTransactionDataAndReceipt","params":["0x516a2ab1506b020e7f49d0d0ddbc471065624d1a603087262cebf4ca114ff588"],"id":1}'
```