---
title: Bsc API - BSC Develop
---


## Bsc API

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

