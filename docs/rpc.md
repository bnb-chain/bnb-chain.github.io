# JSON-RPC Endpoint

## Available Resources

### Mainnet(ChainID 0x38, 56 in decimal)

BSC RPC Endpoints:

!!! NOTE
	You can make `eth_getLogs` requests with up to a 5K block range.
	If you need to pull logs frequently, we recommend using WebSockets to push new logs to you when they are available.

Recommend

* https://bsc-dataseed.binance.org/
* https://bsc-dataseed1.defibit.io/
* https://bsc-dataseed1.ninicoin.io/


Backups

* https://bsc-dataseed2.defibit.io/
* https://bsc-dataseed3.defibit.io/
* https://bsc-dataseed4.defibit.io/
* https://bsc-dataseed2.ninicoin.io/
* https://bsc-dataseed3.ninicoin.io/
* https://bsc-dataseed4.ninicoin.io/
* https://bsc-dataseed1.binance.org/
* https://bsc-dataseed2.binance.org/
* https://bsc-dataseed3.binance.org/
* https://bsc-dataseed4.binance.org/

BSC Websocket Endpoints:

*Note: provided by community with no quality promised, building your node should be always the long term goal*

* wss://bsc-ws-node.nariox.org:443


BC RPC Endpoints:

* https://dataseed1.binance.org/
* https://dataseed2.binance.org/
* https://dataseed3.binance.org/
* https://dataseed4.binance.org/
* https://dataseed1.defibit.io/
* https://dataseed2.defibit.io/
* https://dataseed3.defibit.io/
* https://dataseed4.defibit.io/
* https://dataseed1.ninicoin.io/
* https://dataseed2.ninicoin.io/
* https://dataseed3.ninicoin.io/
* https://dataseed4.ninicoin.io/


### Testnet(ChainID 0x61, 97 in decimal)

BSC RPC Endpoints:

* https://data-seed-prebsc-1-s1.binance.org:8545/
* https://data-seed-prebsc-2-s1.binance.org:8545/
* https://data-seed-prebsc-1-s2.binance.org:8545/
* https://data-seed-prebsc-2-s2.binance.org:8545/
* https://data-seed-prebsc-1-s3.binance.org:8545/
* https://data-seed-prebsc-2-s3.binance.org:8545/

BC RPC Endpoints:

*  http://data-seed-pre-0-s1.binance.org:80
*  http://data-seed-pre-1-s1.binance.org:80
*  http://data-seed-pre-2-s1.binance.org:80
*  http://data-seed-pre-0-s3.binance.org:80
*  http://data-seed-pre-1-s3.binance.org:80

### Rate limit

The rate limit of BSC endpoint on Testnet and Mainnet is 10K/5min.

### 3rd Party Provider

* [Moralis](https://moralis.io/): <https://moralis.io/speedy-nodes/>

* ANKR: <https://app.ankr.com/api>

* [Chainstack](https://chainstack.com/): <https://chainstack.com/build-better-with-binance-smart-chain/>

* [GetBlock.io](https://getblock.io/): <https://getblock.io/nodes/bsc>

* QuickNode : <https://quicknode.com>

* [NodeReal](https://nodereal.io/): <https://binance.nodereal.io>


## Start

You can start the HTTP JSON-RPC with the --rpc flag
```bash
## mainnet
geth attach https://bsc-dataseed1.binance.org

## testnet
geth attach https://data-seed-prebsc-1-s1.binance.org:8545/
```

## JSON-RPC methods

Please refer to this [wiki page](https://github.com/ethereum/wiki/wiki/JSON-RPC) or use Postman: <https://documenter.getpostman.com/view/4117254/ethereum-json-rpc/RVu7CT5J?version=latest>
