---
sidebar_label: RPC
---

# JSON-RPC 엔드포인트

## 가용 자원

### 메인넷(ChainID 0x38, 56 in decimal)

BSC RPC 엔드포인트:

!!! 주의
	`eth_getLogs` 요청은 5K 블록 범위까지 가능합니다.
	로그를 자주 조회해야 한다면 새로운 로그가 있을 때 자동으로 푸시해주는 WebSocket을 사용할 것을 권장합니다.

권장

`eth_getLogs` is disabled on below Mainnet endpoints, please use 3rd party endpoints from **[here](https://chainlist.org/chain/56)**.
If you need to pull logs frequently, we recommend using WebSockets to push new logs to you when they are available.

:::

### Mainnet (ChainID 0x38, 56 in decimal)

* https://bsc-dataseed.binance.org
* https://bsc-dataseed1.defibit.io
* https://bsc-dataseed1.ninicoin.io
* https://bsc.nodereal.io


BC RPC 엔드포인트:

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


### 테스트넷(ChainID 0x61, 97 in decimal)

BSC RPC 엔드포인트:

* https://data-seed-prebsc-1-s1.binance.org:8545/
* https://data-seed-prebsc-2-s1.binance.org:8545/
* https://data-seed-prebsc-1-s2.binance.org:8545/
* https://data-seed-prebsc-2-s2.binance.org:8545/
* https://data-seed-prebsc-1-s3.binance.org:8545/
* https://data-seed-prebsc-2-s3.binance.org:8545/

BC RPC 엔드포인트:

*  http://data-seed-pre-0-s1.binance.org:80
*  http://data-seed-pre-1-s1.binance.org:80
*  http://data-seed-pre-2-s1.binance.org:80
*  http://data-seed-pre-0-s3.binance.org:80
*  http://data-seed-pre-1-s3.binance.org:80

### Rate limit

테스트넷과 메인넷에서 엔드포인트 처리율 제한(rate limit)은 8K/5min입니다.

### 3rd Party Provider

<!--* [Moralis](https://moralis.io/): <https://moralis.io/speedy-nodes/>-->

* [ANKR](https://app.ankr.com/api): <https://app.ankr.com/api>

* [Chainstack](https://chainstack.com/): <https://chainstack.com/build-better-with-binance-smart-chain/>

* [GetBlock.io](https://getblock.io/): <https://getblock.io/nodes/bsc>

* [QuickNode](https://quicknode.com) : <https://quicknode.com>

* [NodeReal](https://nodereal.io/): <https://docs.nodereal.io/nodereal/meganode/introduction>
  
* [BlockVision](https://docs.blockvision.org/blockvision/): <https://docs.blockvision.org/blockvision/chain-apis/bnb-chain-api>


## HTTP JSON-RPC 시작하기

--rpc flag로 HTTP JSON-RPC를 시작할 수 있습니다.
```bash
## mainnet
geth attach https://bsc-dataseed1.binance.org

## testnet
geth attach https://data-seed-prebsc-1-s1.binance.org:8545/
```

## JSON-RPC 메서드

[wiki page](https://github.com/ethereum/wiki/wiki/JSON-RPC)를 참고하거나 [Postman](https://documenter.getpostman.com/view/4117254/ethereum-json-rpc/RVu7CT5J?version=latest)을 사용하세요.
