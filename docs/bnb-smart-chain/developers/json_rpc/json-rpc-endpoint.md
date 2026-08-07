---
title: JSON-RPC-Endpoint - BSC Develop
---


# JSON-RPC-Endpoint

JSON-RPC endpoints refers to the network location where a program could transfer its RPC requests to access server data. Once you connect a decentralized application to an RPC endpoint, you can access the functionalities of different operations, which could enable real-time usage of blockchain data. BNB Chain provides several RPC endpoints for connectinto both its Minent and Testnet. In this section, we list the JSON-RPC endpoints that can be used for connecting to BNB Smart Chain.

## One-click adding BSC network

Visit the [ChainList](https://chainlist.org/chain/56) and connect to your wallet, it will add alive RPC endpoints.

## RPC Endpoints for BNB Smart Chain 

*The rate limit of BSC endpoint on Testnet and Mainnet is **10K/5min**.*

`eth_getLogs` is disabled on below Mainnet endpoints, please use 3rd party endpoints from **[here](https://chainlist.org/chain/56)**.
If you need to pull logs frequently, we recommend using WebSockets to push new logs to you when they are available.

### BSC Mainnet (ChainID 0x38, 56 in decimal)

* https://bsc-dataseed.bnbchain.org
* https://bsc-dataseed.nariox.org
* https://bsc-dataseed.defibit.io
* https://bsc-dataseed.ninicoin.io
* https://bsc.nodereal.io
* https://bsc-dataseed-public.bnbchain.org
* https://bnb.rpc.subquery.network/public

You could find more endpoints from **[here](https://chainlist.org/chain/56)**.

### BSC Testnet (ChainID 0x61, 97 in decimal)

* https://bsc-testnet-dataseed.bnbchain.org
* https://bsc-testnet.bnbchain.org
* https://bsc-prebsc-dataseed.bnbchain.org

### RPC Providers

* **Moralis:** <https://moralis.io/nodes/?utm_source=bnb-docs&utm_medium=partner-docs>

* **NodeReal:** <https://docs.nodereal.io/nodereal/meganode/introduction>

* **Ankr:** <https://app.ankr.com/api>

* **Chainstack:** <https://chainstack.com/build-better-with-binance-smart-chain/>

* **GetBlock:** <https://getblock.io/nodes/bsc>

* **QuickNode:** <https://quicknode.com>
  
* **BlockVision:** <https://docs.blockvision.org/blockvision/chain-apis/bnb-chain-api>

* **4EVERLAND:** <https://docs.4everland.org/rpc/chains-rpc/bsc-opbnb-rpc>

* **NOWNodes:** <https://nownodes.io/nodes/bsc>
  
* **dRPC:** <https://drpc.org/chainlist/bsc>

* **SubQuery:** <https://rpc.subquery.network/56)>

* **All That Node:** <https://www.allthatnode.com/bsc.dsrv>

* **Alchemy:** <https://docs.alchemy.com/reference/api-overview>

* **Tatum:** <https://tatum.io/chains/binance>


### Starting HTTP JSON-RPC

You can start the HTTP JSON-RPC with the --http flag
```bash
## mainnet
geth attach https://bsc-dataseed.bnbchain.org

## testnet
geth attach https://bsc-testnet-dataseed.bnbchain.org
```

## JSON-RPC API List

BSC (BNB Smart Chain) is EVM-compatible and strives to be as compatible as possible with the Go-Ethereum API. However, BSC also has unique features, such as faster finality and the storage of blob data on the execution layer, which require their own specialized APIs.

### Geth(Go-Ethereum) API

BSC is nearly fully compatible with the Geth APIs. Any exceptions or incompatibilities are explicitly listed. If you're looking for detailed usage of a specific API, you will most likely find the answer in the following link:

[Geth JSON-RPC API documentation](https://geth.ethereum.org/docs/interacting-with-geth/rpc).

### Finality

Ethereum's PoS consensus protocol, known as "Gasper," is built on LMD-GHOST (a fork choice rule) and Casper FFG (a finality gadget). Similarly, BSC's consensus protocol, called "Parlia," is constructed on top of a difficulty-based fork choice mechanism with FFG, as described in [BEP-126](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP126.md). To further enhance BSC's throughput, validators are allowed to produce multiple consecutive blocks, as explained in [BEP-341](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-341.md). These differences result in BSC having a unique finality process compared to Ethereum. For more details, please refer to the the following doc:

[BSC Finality API](bsc-api-list.md#finality-api).

### Blob

Bsc implement EIP-4844, which support Shard Blob Transactions, as described in  [BEP-336](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-336.md). For more details, please refer to the the following doc: [BSC Blob API](bsc-api-list.md#blob-api).

### Other BSC API

Bsc implement some others apis, as described in: [BSC API](bsc-api-list.md#others). 
