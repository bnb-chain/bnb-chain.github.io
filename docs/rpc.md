---
sidebar_label: RPC
---

# JSON-RPC Endpoint

JSON-RPC endpoints refers to the network location where a program could transfer its RPC requests to access server data. Once you connect a decentralized application to an RPC endpoint, you can access the functionalities of different operations, which could enable real-time usage of blockchain data. BNB Chain provides several RPC endpoints for connectinto both its Minent and Testnet. In this section, we list the JSON-RPC endpoints that can be used for connecting to BNB Smart Chain.

## RPC Endpoints for BNB Smart Chain 

:::info

The rate limit of BSC endpoint on Testnet and Mainnet is **10K/5min**.

:::

:::note

`eth_getLogs` is disabled on below Mainnet endpoints, please use 3rd party endpoints from **[here](https://chainlist.org/chain/56)**.
If you need to pull logs frequently, we recommend using WebSockets to push new logs to you when they are available.

:::

### BSC Mainnet (ChainID 0x38, 56 in decimal)

* https://bsc-dataseed.binance.org
* https://bsc-dataseed1.defibit.io
* https://bsc-dataseed1.ninicoin.io
* https://bsc.nodereal.io

You could find more endpoints from **[here](https://chainlist.org/chain/56)**.

### BSC Testnet (ChainID 0x61, 97 in decimal)

* https://data-seed-prebsc-1-s1.binance.org:8545
* https://data-seed-prebsc-2-s1.binance.org:8545
* https://data-seed-prebsc-1-s2.binance.org:8545
* https://data-seed-prebsc-2-s2.binance.org:8545
* https://data-seed-prebsc-1-s3.binance.org:8545
* https://data-seed-prebsc-2-s3.binance.org:8545

### Thrid-Party RPC Providers

<!--* [Moralis](https://moralis.io/): <https://moralis.io/speedy-nodes/>-->

* NodeReal: <https://docs.nodereal.io/nodereal/meganode/introduction>

* Ankr: <https://app.ankr.com/api>

* Chainstack: <https://chainstack.com/build-better-with-binance-smart-chain/>

* GetBlock: <https://getblock.io/nodes/bsc>

* QuickNode: <https://quicknode.com>
  
* BlockVision: <https://docs.blockvision.org/blockvision/chain-apis/bnb-chain-api>

### Starting HTTP JSON-RPC

You can start the HTTP JSON-RPC with the --http flag
```bash
## mainnet
geth attach https://bsc-dataseed.binance.org

## testnet
geth attach https://data-seed-prebsc-1-s1.binance.org:8545
```

### JSON-RPC methods

Please refer to this [wiki page](https://github.com/ethereum/wiki/wiki/JSON-RPC) or use Postman: <https://documenter.getpostman.com/view/4117254/ethereum-json-rpc/RVu7CT5J?version=latest>

## RPC Endpoints for BNB Beacon Chain

### Mainnet

* https://dataseed1.binance.org:443
* https://dataseed2.binance.org:443
* https://dataseed3.binance.org:443
* https://dataseed4.binance.org:443
* https://dataseed1.defibit.io:443
* https://dataseed2.defibit.io:443
* https://dataseed3.defibit.io:443
* https://dataseed4.defibit.io:443
* https://dataseed1.ninicoin.io:443
* https://dataseed2.ninicoin.io:443
* https://dataseed3.ninicoin.io:443
* https://dataseed4.ninicoin.io:443

### Testnet

*  https://data-seed-pre-0-s1.binance.org:443
*  https://data-seed-pre-1-s1.binance.org:443
*  https://data-seed-pre-2-s1.binance.org:443
*  https://data-seed-pre-0-s3.binance.org:443
