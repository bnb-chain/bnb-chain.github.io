---
sidebar_label: RPC
---

# JSON-RPC Endpoint

## BNB Smart Chain

:::info

The rate limit of BSC endpoint on Testnet and Mainnet is 10K/5min.

:::

:::note

You can make `eth_getLogs` requests with up to a 5K block range.
If you need to pull logs frequently, we recommend using WebSockets to push new logs to you when they are available.

:::

### Mainnet (ChainID 0x38, 56 in decimal)

* https://bsc-dataseed.binance.org
* https://bsc-dataseed1.defibit.io
* https://bsc-dataseed1.ninicoin.io
* https://bsc.nodereal.io

You could find more endpoints from **[here](https://chainlist.org/chain/56)**.

### Testnet (ChainID 0x61, 97 in decimal)

BSC RPC Endpoints:

* https://data-seed-prebsc-1-s1.binance.org:8545
* https://data-seed-prebsc-2-s1.binance.org:8545
* https://data-seed-prebsc-1-s2.binance.org:8545
* https://data-seed-prebsc-2-s2.binance.org:8545
* https://data-seed-prebsc-1-s3.binance.org:8545
* https://data-seed-prebsc-2-s3.binance.org:8545

### 3rd Party Provider

<!--* [Moralis](https://moralis.io/): <https://moralis.io/speedy-nodes/>-->

* NodeReal: <https://docs.nodereal.io/nodereal/meganode/introduction>

* Ankr: <https://app.ankr.com/api>

* Chainstack: <https://chainstack.com/build-better-with-binance-smart-chain/>

* GetBlock: <https://getblock.io/nodes/bsc>

* QuickNode: <https://quicknode.com>
  
* BlockVision: <https://docs.blockvision.org/blockvision/chain-apis/bnb-chain-api>

* NOWNodes: <https://bit.ly/nownodes-bnb>

### Start HTTP JSON-RPC

You can start the HTTP JSON-RPC with the --http flag
```bash
## mainnet
geth attach https://bsc-dataseed.binance.org

## testnet
geth attach https://data-seed-prebsc-1-s1.binance.org:8545
```

### JSON-RPC methods

Please refer to this [wiki page](https://github.com/ethereum/wiki/wiki/JSON-RPC) or use Postman: <https://documenter.getpostman.com/view/4117254/ethereum-json-rpc/RVu7CT5J?version=latest>

## BNB Beacon Chain

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
