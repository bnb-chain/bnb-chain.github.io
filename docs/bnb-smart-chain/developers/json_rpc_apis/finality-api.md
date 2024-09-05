---
title: Finality API - BSC Develop
---

Finality is a crucial aspect of blockchain security, ensuring that once a block is confirmed, it cannot be reversed or altered. This provides users with the confidence to act on the information in the block without delay.

## Probabilistic Finality and Economic Finality

In probabilistic finality, the deeper a block is buried in the chain, the lower the likelihood of it being reverted. The more blocks follow a particular block, the more likely the chain containing that block will be the longest. **Typically, BSC users should wait for at least 11 or 15 different validators to seal a block. If validators are allowed to produce multiple consecutive blocks, the number of blocks required to achieve probabilistic finality is approximately 11\*n or 15\*n, where "n" is the number of consecutive blocks produced.**

Economic Finality refers to the high cost associated with reverting a block. In proof-of-stake systems that use a slashing mechanism (such as Casper FFG, Tendermint, or BSC Fast Finality), if validators violate the voting rules, part or all of their stake can be forfeited. This economic penalty makes it extremely expensive to undermine finality. Generally, block n achieves economic finality by block n+2, meaning that BSC Fast Finality reduces the confirmation time to two blocks in most cases. This improves the user experience by making transaction confirmation faster and more reliable.

## Economic Finality API

### [eth_getHeaderByNumber](<https://www.quicknode.com/docs/kaia/eth_getHeaderByNumber>) as in the Ethereum client.
**Parameters**
1. QUANTITY|TAG
* HEX String - an integer block number
* String "earliest" for the earliest/genesis block
* String "latest" - for the latest mined block
* String "safe" - for the latest justified head block
* String "**finalized**" - for the latest finalized block

### [eth_getBlockByNumber](<https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbynumber>) as in the Ethereum client.
**Parameters**
1. QUANTITY|TAG
* HEX String - an integer block number
* String "earliest" for the earliest/genesis block
* String "latest" - for the latest mined block
* String "safe" - for the latest justified head block
* String "**finalized**" - for the latest finalized block
2. Boolean - If true it returns the full transaction objects, if false only the hashes of the transactions.

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

## Combined Probabilistic Finality and Economic Finality API

These methods allow you to handle block finality using a straightforward API.

### eth_getFinalizedHeader
* `verifiedValidatorNum` must be within the range [1, len(currentValidators)].
* This function calculates `probabilisticFinalizedHeight` as the highest height of the block verified by `verifiedValidatorNum` validators and then returns the block header with a height equal to `max(fastFinalizedHeight, probabilisticFinalizedHeight)`.
* The height of the returned block header is guaranteed to increase monotonically.
For example:
```
curl -X POST "http://localhost:8545/" -H "Content-Type: application/json"  --data '{"jsonrpc":"2.0","method":"eth_getFinalizedHeader","params":[15],"id":1}'
```

### eth_getFinalizedBlock
* `verifiedValidatorNum` must be within the range [1, len(currentValidators)].
* This function calculates `probabilisticFinalizedHeight` as the highest height of the block verified by `verifiedValidatorNum` validators and then returns the block header with a height equal to `max(fastFinalizedHeight, probabilisticFinalizedHeight)`.
* If `fullTx` is true, the block includes all transactions; otherwise, only transaction hashes are included.
* The height of the returned block is guaranteed to be monotonically increasing.
For example:
```
curl -X POST "http://localhost:8545/" -H "Content-Type: application/json"  --data '{"jsonrpc":"2.0","method":"eth_getFinalizedBlock","params":[11, false],"id":1}'

curl -X POST "http://localhost:8545/" -H "Content-Type: application/json"  --data '{"jsonrpc":"2.0","method":"eth_getFinalizedBlock","params":[15, true],"id":1}'
```
