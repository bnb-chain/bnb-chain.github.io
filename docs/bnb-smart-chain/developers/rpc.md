
# JSON-RPC Endpoint

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

* **All That Node:** <https://www.allthatnode.com/bsc.dsrv>

### Starting HTTP JSON-RPC

You can start the HTTP JSON-RPC with the --http flag
```bash
## mainnet
geth attach https://bsc-dataseed.bnbchain.org

## testnet
geth attach https://bsc-testnet-dataseed.bnbchain.org
```

### JSON-RPC methods

Please refer to this [wiki page](https://github.com/ethereum/wiki/wiki/JSON-RPC) or use Postman: <https://documenter.getpostman.com/view/4117254/ethereum-json-rpc/RVu7CT5J?version=latest>

