---
title: Blob API - BSC Develop
---


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