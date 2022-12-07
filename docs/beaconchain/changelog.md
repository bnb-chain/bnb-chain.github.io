CHANGELOG
========

## 비컨 체인 메인넷 API 변경 예정 - 2021-06-04

### HTTP API

#### /api/v1/transactions

***변경***

다음과 같은 변화가 이뤄집니다.


* `address`관련 `Mutli Send Transfer` 트랜잭션 내역이 추가됩니다;
* 만일 주소가 어떤 `HTL_TRANSFER`를 받을 때, 관련된 트랜잭션 내역이 포함됩니다
* `asset`(자산) 매개변수는 NEW_ORDER, CANCEL_ORDER,MINI_TOKEN_LIST,LISTING 트랜잭션의 `quote asset`(견적 자산)을 찾는데 사용될 수 있습니다.
* `asset`(자산) 매개변수는 dex에 상장하는 SUBMIT_PROPOSAL 트랜잭션 `quote asset`(견적 자산)이나 `base asset`(기초 자산)을 찾는데 사용될 수 있습니다.
* DEPOSIT_HTL HTL_TRANSFER, SIDE_DEPOSIT, TIME_LOCK, TIME_RELOCK, TRANSFER 는 여러 자산에 사용될 수 있습니다.


## 비컨 체인 메인넷 API v0.7.2 업데이트 내역

### 노드 RPC

`BEP8` 토큰과 거래 쌍에 대한 정보를 쿼리하기 위한 경로를 사용할 수 있습니다.

**새 쿼리 경로**

*  `/mini-tokens/info`
*  `/mini-tokens/list`
*  `/dex-mini/pairs`


### HTTP API

#### /api/v1/depth

***변경***

pending_match 플래그를 더해 현재 블록이 새롭게 들어오는 주문에 대해 매칭 과정을 진행하지 않았다는 것을 표현합니다. 구체적으론, 만일 새롭게 생성된 주문이 현재 블록에 들어왔지만 매칭 과정이 블록에서 실행되지 않았다면 `pending_math=true`로 표현합니다. 결과적으로 가격이 엇갈릴 수 있는데, 매도가가 매수 희망가보다 낮을 수 있습니다. 클라이언트는 pending_match=true로 응답을 무시하고 깊이 API를 통해 pending_match=false가 될 때까지 요청하면 됩니다.

---
***GET***
**요약:** 오더 북을 가져옵니다.

**설명:**  주어진 심볼 쌍에 대한 오더 북 깊이 데이터를 가져옵니다.

_한계_는 아래 혀용된 한계 중 하나여야 합니다.

**도착 지점**  검증인 노드.

**Rate 제한:**  IP 하나 당 초당 10개 요청.

**테스트넷 URL:** [https://dex.binance.org/api/v1/depth?symbol=xxx-000_BNB](https://dex.binance.org/api/v1/depth?symbol=xxx-000_BNB)

**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| symbol | query | 마켓 쌍 심볼, 예. NNB-0AD_BNB | 예 | string |
| limit | query | 결과의 한계. 허용된 한계: [5, 10, 20, 50, 100, 500, 1000] | 아니오 | integer |

**응답** 

#### 마켓 깊이

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| asks | [ string (fixed8) ] | 가격 및 수량 소수점 형태로, 예. 1.00000000 | ["1.00000000","800.00000000"] |
| bids | [ string (fixed8) ] | 가격 및 수량 소수점 형태로, 예. 1.00000000 | ["1.00000000","800.00000000"] |
| pending_match | boolean | 새 주문이 현재 블록에 들어오고 매칭 과정이 사작되지 않았을 시, 참(true)을 반환 |  |

#### /api/v1/mini/tokens

***변경***

미니 토큰 리스트를 가져옵니다.

#### 미니토큰

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| name | string |  | Beacon Chain  Mini Token |
| symbol | string |  | BTC-000 |
| original_symbol | string |  | BTC |
| total_supply | string (fixed8) | 소수점 형태로, 예. 1.00000000 | 0.00000000 |
| token_type | integer | 미니 토큰 유형 |  |
| owner | string (address) | 주소 |  |
| mintable | boolean | 민팅가능여부 |  |
| token_uri | string | 토큰 설명 URI |  |

#### /api/v1/mini/markets:

***변경***

가능한 미니 토큰 쌍의 리스트를 불러옵니다.

#### Market

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| base_asset_symbol | string (currency) | 기초 자산 심볼 | BNB |
| quote_asset_symbol | string (currency) | 견적 자산 심볼 | ABC-5CA |
| list_price | string (fixed8) | 소수점 형태 | 1.00000000 |
| tick_size | string (fixed8) | 소수점 형태의 최소 가격 변화| 0.00000001 |
| lot_size | string (fixed8) | 소수점 형태의 최소 거래량 변화 | 1.00000000 |

#### /api/v1/mini/kline

***변경***

미니 토큰 캔들스틱 막대를 가져옵니다. Interval allowed value: [1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M]

#### 캔들스틱

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| close | number | 종가 |  |
| closeTime | long | 거래 종료 시각 |  |
| high | number | 최고가 |  |
| low | number | 최저가 |  |
| numberOfTrades | integer | 총 거래량 |  |
| open | number | 열린 가격 |  |
| openTime | long | 거래 시작 시간 |  |
| quoteAssetVolume | number | 총 견적 자산 거래량 |  |
| volume | number | 총 거래 규모 |  |

#### /api/v1/mini/orders/closed

***변경***

미니 토큰 쌍에 대한 닫힌 주문을 가져옵니다.

#### 주문리스트

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| order | [ Order ] | 주문 리스트 |  |
| total | long |  |  |

#### /api/v1/mini/orders/open

***변경***

미니 토큰 쌍에 대한 열린 주문을 가져옵니다.

#### 주문리스트

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| order | [ Order] ] | 주문 리스트 |  |
| total | long |  |  |

#### /api/v1/mini/ticker/24hr

***변경***

미니 토큰 쌍에 대한 마켓 티커를 가져옵니다. 

#### 티커 통계

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| askPrice | string | 판매 가격 |  |
| askQuantity | string | 판매 수량 |  |
| bidPrice | string | 구매 가격 |  |
| bidQuantity | string | 구매 수량 |  |
| closeTime | long | 종료 시각 |  |
| count | long | 총 거래  카운트 |  |
| firstId | string | 첫 거래 ID |  |
| highPrice | string | 최고가 |  |
| lastId | string | 마지막 거래 ID |  |
| lastPrice | string | 마지막 가격 |  |
| lastQuantity | string | 마지막 수량 |  |
| lowPrice | string | 최저가 |  |
| openPrice | string | 열린 가격 |  |
| openTime | long | 열린 시간 |  |
| prevClosePrice | string | 마지막 종가 |  |
| priceChange | string | 가격 변화 |  |
| priceChangePercent | string | 가격 변화율 |  |
| quoteVolume | string | 견적 자산으로 거래 규모 |  |
| symbol | string | 거래 심볼 |  |
| volume | string | 거래 규모 |  |
| weightedAvgPrice | string | 가중된 평균 가격 |  |


#### /api/v1/mini/trades

***변경***

미니 토큰 쌍에 대한 마켓 거래를 가져옵니다.

#### 거래 페이지
| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| total | long | 총 거래 횟수 |  |
| trade | [ [Trade] ] |  |  |

## 비컨 체인 테스트넷 API v0.7.0 업데이트 내역

### Node RPC

`BEP8` 토큰과 거래 쌍에 대한 정보를 쿼리하기 위한 경로를 사용할 수 있습니다.

**새 쿼리 경로**

*  `/mini-tokens/info`
*  `/mini-tokens/list`
*  `/dex-mini/pairs`


### HTTP API

#### /api/v1/depth

***변경***

pending_match 플래그를 더해 현재 블록이 새롭게 들어오는 주문에 대해 매칭 과정을 진행하지 않았다는 것을 표현합니다. 구체적으론, 만일 새롭게 생성된 주문이 현재 블록에 들어왔지만 매칭 과정이 블록에서 실행되지 않았다면 `pending_math=true`로 표현합니다. 결과적으로 가격이 엇갈릴 수 있는데, 매도가가 매수 희망가보다 낮을 수 있습니다. 클라이언트는 pending_match=true로 응답을 무시하고 깊이 API를 통해 pending_match=false가 될 때까지 요청하면 됩니다.

---
***GET***
**요약:** 오더 북을 가져옵니다.

**설명:**  주어진 심볼 쌍에 대한 오더 북 깊이 데이터를 가져옵니다.

_한계_는 아래 혀용된 한계 중 하나여야 합니다.

**도착 지점**  검증인 노드.

**Rate 제한:**  IP 하나 당 초당 10개 요청.

**테스트넷 URL:** [https://testnet-dex.binance.org/api/v1/depth?symbol=xxx-000_BNB](https://testnet-dex.binance.org/api/v1/depth?symbol=xxx-000_BNB)

**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| symbol | query | 마켓 쌍 심볼, 예. NNB-0AD_BNB | 예 | string |
| limit | query | 결과의 한계. 허용된 한계: [5, 10, 20, 50, 100, 500, 1000] | 아니오 | integer |

**응답** 

#### MarketDepth

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| asks | [ string (fixed8) ] | 가격 및 수량 소수점 형태로, 예. 1.00000000 | ["1.00000000","800.00000000"] |
| bids | [ string (fixed8) ] | 가격 및 수량 소수점 형태로, 예. 1.00000000 | ["1.00000000","800.00000000"] |
| pending_match | boolean | 새 주문이 현재 블록에 들어오고 매칭 과정이 사작되지 않았을 시, 참(true)을 반환 |  |

#### MarketDepth

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| asks | [ string (fixed8) ] | 가격 및 수량 소수점 형태로, 예. 1.00000000 | ["1.00000000","800.00000000"] |
| bids | [ string (fixed8) ] | 가격 및 수량 소수점 형태로, 예. 1.00000000 | ["1.00000000","800.00000000"] |
| pending_match | boolean | 새 주문이 현재 블록에 들어오고 매칭 과정이 사작되지 않았을 시, 참(true)을 반환 |  |

#### /api/v1/mini/tokens

***변경***

미니 토큰 리스트를 가져옵니다.

#### 미니토큰

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| name | string |  | Beacon Chain  Mini Token |
| symbol | string |  | BTC-000 |
| original_symbol | string |  | BTC |
| total_supply | string (fixed8) | 소수점 형태로, 예. 1.00000000 | 0.00000000 |
| token_type | integer | 미니 토큰 유형 |  |
| owner | string (address) | 주소 |  |
| mintable | boolean | 민팅가능여부 |  |
| token_uri | string | 토큰 설명 URI |  |

#### /api/v1/mini/markets:

***변경***

거래 가능한 미니 토큰 쌍의 리스트를 가져옵니다.

#### 마켓

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| base_asset_symbol | string (currency) | 기초 자산 심볼 | BNB |
| quote_asset_symbol | string (currency) | 견적 자산 심볼 | ABC-5CA |
| list_price | string (fixed8) | 소수점 형태 | 1.00000000 |
| tick_size | string (fixed8) | 소수점 형태의 최소 가격 변화| 0.00000001 |
| lot_size | string (fixed8) | 소수점 형태의 최소 거래량 변화 | 1.00000000 |

#### /api/v1/mini/kline

***변경***

미니 토큰 캔들스틱 막대를 가져옵니다. Interval allowed value: [1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M]

#### 캔들스틱

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| close | number | 종가 |  |
| closeTime | long | 거래 종료 시각 |  |
| high | number | 최고가 |  |
| low | number | 최저가 |  |
| numberOfTrades | integer | 총 거래량 |  |
| open | number | 열린 가격 |  |
| openTime | long | 거래 시작 시간 |  |
| quoteAssetVolume | number | 총 견적 자산 거래량 |  |
| volume | number | 총 거래 규모 |  |

#### /api/v1/mini/orders/closed

***변경***

미니 토큰 쌍에 대한 닫힌 주문을 가져옵니다.

#### 주문리스트

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| order | [ [Order] ] | 주문 리스트 |  |
| total | long |  |  |

#### /api/v1/mini/orders/open

***변경***

미니 토큰 쌍에 대한 열린 주문을 가져옵니다.

#### 주문리스트

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| order | [Order ] | 주문 리스트 |  |
| total | long |  |  |

#### /api/v1/mini/ticker/24hr

***변경***

미니 토큰 쌍에 대한 마켓 티커를 가져옵니다. 

#### TickerStatistics

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| askPrice | string | 판매 가격 |  |
| askQuantity | string | 판매 수량 |  |
| bidPrice | string | 구매 가격 |  |
| bidQuantity | string | 구매 수량 |  |
| closeTime | long | 종료 시각 |  |
| count | long | 총 거래  카운트 |  |
| firstId | string | 첫 거래 ID |  |
| highPrice | string | 최고가 |  |
| lastId | string | 마지막 거래 ID |  |
| lastPrice | string | 마지막 가격 |  |
| lastQuantity | string | 마지막 수량 |  |
| lowPrice | string | 최저가 |  |
| openPrice | string | 열린 가격 |  |
| openTime | long | 열린 시간 |  |
| prevClosePrice | string | 마지막 종가 |  |
| priceChange | string | 가격 변화 |  |
| priceChangePercent | string | 가격 변화율 |  |
| quoteVolume | string | 견적 자산으로 거래 규모 |  |
| symbol | string | 거래 심볼 |  |
| volume | string | 거래 규모 |  |
| weightedAvgPrice | string | 가중된 평균 가격 |  |


#### /api/v1/mini/trades

***변경***

미니 토큰 쌍에 대한 마켓 거래를 가져옵니다.

#### TradePage

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| total | long | 총 거래 횟수 |  |
| trade | [ [Trade] ] |  |  |

## 비컨 체인 메인넷 API v0.6.4 업데이트 내역

### HTTP API

#### 새로 생된된 주소에 에러 메세지 추가

새로운 계정에 대해 다음과 같은 메세지를 얻습니다`{"code":404,"message":"account not found"}`:

**예시**
```
https://testnet-dex-asiapacific.binance.org/api/v1/account/tbnb10qpmrlsr4mq65xwgjd39xypkkpw3wm9c5e58xm
```
Return:
```
{
code: 404,
message: "account not found"
}
```
#### /api/v1/trades

***변경***

거래 데이터 구조 응답에 `buyerSource`(구매처) 와 `sellerSource`(판매처)를 더합니다. 출처 ID는 다음 링크에서 찾을 수 있습니다 https://github.com/binance-chain/BEPs/blob/master/BEP10.md.

#### 거래

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| baseAsset | string | 기초 자산 심볼 |  |
| blockHeight | long | 블록 높이 |  |
| buyFee | string | 구매자 주소의 블록 거래 수수료 |  |
| buyerId | string | 구매자 ID |  |
| buyerOrderId | string | 구매자 주문 id |  |
| buySingleFee | string | 구매자 주소의 단일 거래에 대한 수수료 | BNB:0.00000172; |
| buyerSource | long | 구매 주문의 tx 출처 | 1 |
| price | string | 거래 가격 |  |
| quantity | string | 거래 수량 |  |
| quoteAsset | string | 견적 자산 심볼 |  |
| sellFee | string | 판매자 주소의 블록 거래 수수료 |  |
| sellerId | string | 판매자 ID |  |
| sellerOrderId | string | 판매자 주문 id |  |
| sellSingleFee | string | 판매자 주소의 단일 거래에 대한 수수료 | BNB:0.00000216; |
| sellerSource | long | 판매 주문 tx 출처 | 1 |
| symbol | string | 자산 심볼 |  |
| tickType | string | enum [Unknown,SellTaker,BuyTaker,BuySurplus,SellSurplus,Neutral] |  |
| time | long  | 거래 시간 |  |
| tradeId | string | 거래 ID |  |

## 비컨 체인 API v0.6.3 업데이트 내역

### HTTP API

#### /api/v1/atomic-swaps
#### /api/v1/atomic-swaps/{id}

***변경***

API는 아토믹 스왑 ID나 주소를 요청합니다.
`AtomicSwap` 데이터 구조에서는:
* 블록 시간을 밀리초 단위로 측정하기 위해 `blockTimestamp` 변수가 추가되었습니다.
* 원래 `timestamp` 는 randomNumberHash 계산을 위한 타임 스탬프로 변경되었습니다. 단위는 초입니다.
* `createTime`과 `updateTime`은 `AtomicSwap`에서 제거되었습니다.


#### 아토믹 스왑

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| blockTimestamp | long | 스왑이 시작되는 블록의 타임 스탬프 단위는 밀리초 입니다. |  |
| closedTime | long |  |  |
| crossChain | integer |  |  |
| expectedIncome | string |  |  |
| expireHeight | long|  |  |
| fromAddr | string |  |  |
| inAmount | string |  |  |
| outAmount | string |  |  |
| randomNumber | string |  |  |
| randomNumberHash | string |  |  |
| recipientOtherChain | string |  |  |
| status | integer |  |  |
| swapId | string |  |  |
| timestamp | long | randomNumberHash 계산을 위한 타임 스탬프, randomNumberHash=sha256(randomNumber, timestamp). 단위는 초 입니다. |  |
| toAddr | string |  |  |

### 웹 소켓

https://docs.bnbchain.org/docs/beaconchain/develop/api-reference/dex-api/ws-streams#6-book-depth-streams에서 설명된 대로, 이제 오토북에 반환되는 레벨을 사용자가 정의할 수 있습니다. The default level is 20 and you can extend the level to 100, 500, or 1000 with compression enabled. 기본 레벨을 20이면 압축을 키면 100, 500, 1000까지 늘릴 수 있습니다.

* 메인넷 예시:
```
var  marketDepth = new WebSocket("wss://dex-atlantic.binance.org/api/ws/NEXO-A84_BNB@marketDepth100");
```
* 테스트넷 예시:
```
var  marketDepth = new WebSocket("wss://testnet-de.binance.org/api/ws/ALT-3B6_BNB@marketDepth100");
```

### RPC 노드

텐더민트 라이브러리의 변화로, `ResponseCheckTx`, `ResponseDeliverTx`, `ResponseBeginBlock`, `ResponseEndBlock`는 `Tags`(태그)대신 `Events`를 갖습니다. 각 `이벤트`는 각 응답에 다양한 다른 이벤트를 포함하는 속성 key-value 리스트를 갖고 있습니다.

#### 이벤트

일부 메서드(`CheckTx, BeginBlock, DeliverTx, EndBlock`)는 `Response*` 부분에서 `Events`를 포함합니다. 각 이벤트에는 메소드 실행 중에 발생한 내용을 나타내는 키-값 쌍인 속성 유형과 유형이 포함됩니다.

이벤트는 트랜잭션에과 블록에 실행 시 어떤 상황이 발생 했는 지를 알립니다. `시작`블록과 `끝`블록에서 반환된 이벤트들을 합쳐집니다. 두 메서드가 같은 태그를 가지고 있는 것을 대비하여, `끝 블록`에서 정의된 값만 사용합니다.

각 이벤트는 특정 Response* 나 tx를 유형으로 분류하는 `type`이 존재합니다. 응답* 또는 tx에는 중복된 유형 값을 가진 여러 이벤트가 포함될 수 있으며, 각 항목은 특정 이벤트에 대한 속성을 분류합니다. 이벤트 속성에 있는 모든 키와 값은 UTF-8 인코딩된 문자열과 이벤트 유형을 포함해야 합니다.

예시:

```go
 abci.ResponseDeliverTx{
  // ...
  Events: []abci.Event{
    {
      Type: "validator.provisions",
      Attributes: cmn.KVPairs{
        cmn.KVPair{Key: []byte("address"), Value: []byte("...")},
        cmn.KVPair{Key: []byte("amount"), Value: []byte("...")},
        cmn.KVPair{Key: []byte("balance"), Value: []byte("...")},
      },
    },
    {
      Type: "validator.provisions",
      Attributes: cmn.KVPairs{
        cmn.KVPair{Key: []byte("address"), Value: []byte("...")},
        cmn.KVPair{Key: []byte("amount"), Value: []byte("...")},
        cmn.KVPair{Key: []byte("balance"), Value: []byte("...")},
      },
    },
    {
      Type: "validator.slashed",
      Attributes: cmn.KVPairs{
        cmn.KVPair{Key: []byte("address"), Value: []byte("...")},
        cmn.KVPair{Key: []byte("amount"), Value: []byte("...")},
        cmn.KVPair{Key: []byte("reason"), Value: []byte("...")},
      },
    },
    // ...
  },
}
```

* ResponseCheckTx

```
type ResponseCheckTx struct {
  Code                 uint32   `protobuf:"varint,1,opt,name=code,proto3" json:"code,omitempty"`
  Data                 []byte   `protobuf:"bytes,2,opt,name=data,proto3" json:"data,omitempty"`
  Log                  string   `protobuf:"bytes,3,opt,name=log,proto3" json:"log,omitempty"`
  Info                 string   `protobuf:"bytes,4,opt,name=info,proto3" json:"info,omitempty"`
  GasWanted            int64    `protobuf:"varint,5,opt,name=gas_wanted,json=gasWanted,proto3" json:"gas_wanted,omitempty"`
  GasUsed              int64    `protobuf:"varint,6,opt,name=gas_used,json=gasUsed,proto3" json:"gas_used,omitempty"`
  Events               []Event  `protobuf:"bytes,7,rep,name=events,proto3" json:"events,omitempty"`
  Codespace            string   `protobuf:"bytes,8,opt,name=codespace,proto3" json:"codespace,omitempty"`
  XXX_NoUnkeyedLiteral struct{} `json:"-"`
  XXX_unrecognized     []byte   `json:"-"`
  XXX_sizecache        int32    `json:"-"`
}
```

* ResponseDeliverTx

```
type ResponseDeliverTx struct {
  Code                 uint32   `protobuf:"varint,1,opt,name=code,proto3" json:"code,omitempty"`
  Data                 []byte   `protobuf:"bytes,2,opt,name=data,proto3" json:"data,omitempty"`
  Log                  string   `protobuf:"bytes,3,opt,name=log,proto3" json:"log,omitempty"`
  Info                 string   `protobuf:"bytes,4,opt,name=info,proto3" json:"info,omitempty"`
  GasWanted            int64    `protobuf:"varint,5,opt,name=gas_wanted,json=gasWanted,proto3" json:"gas_wanted,omitempty"`
  GasUsed              int64    `protobuf:"varint,6,opt,name=gas_used,json=gasUsed,proto3" json:"gas_used,omitempty"`
  Events               []Event  `protobuf:"bytes,7,rep,name=events,proto3" json:"events,omitempty"`
  Codespace            string   `protobuf:"bytes,8,opt,name=codespace,proto3" json:"codespace,omitempty"`
  XXX_NoUnkeyedLiteral struct{} `json:"-"`
  XXX_unrecognized     []byte   `json:"-"`
  XXX_sizecache        int32    `json:"-"`
}
```

* ResponseBeginBlock

```
type ResponseBeginBlock struct {
  Events               []Event  `protobuf:"bytes,1,rep,name=events,proto3" json:"events,omitempty"`
  XXX_NoUnkeyedLiteral struct{} `json:"-"`
  XXX_unrecognized     []byte   `json:"-"`
  XXX_sizecache        int32    `json:"-"`
}
```

* ResponseEndBlock
```
type ResponseEndBlock struct {
  ValidatorUpdates      []ValidatorUpdate `protobuf:"bytes,1,rep,name=validator_updates,json=validatorUpdates,proto3" json:"validator_updates"`
  ConsensusParamUpdates *ConsensusParams  `protobuf:"bytes,2,opt,name=consensus_param_updates,json=consensusParamUpdates,proto3" json:"consensus_param_updates,omitempty"`
  Events                []Event           `protobuf:"bytes,3,rep,name=events,proto3" json:"events,omitempty"`
  XXX_NoUnkeyedLiteral  struct{}          `json:"-"`
  XXX_unrecognized      []byte            `json:"-"`
  XXX_sizecache         int32             `json:"-"`
}
```

## 비컨 체인 API v0.6.2 업데이트 내역

### HTTP API

#### /api/v2/transactions-in-block/{blockHeight}

***변경***

다음 엔트포인트는 모든 트랜잭션을 받기 위해 사용됩니다.다중 전송 및 다중 코인 거래는 하위 거래로 평탄화된다.

#### TxV2

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| blockHeight | long |  |  |
| code | integer |  | 0 |
| data | string |  |  |
| fromAddr | string |  |  |
| memo | string |  |  |
| orderId | string | 선택사항. 트랜잭션 유형이 NEW_ORDER일 때 가능 |  |
| proposalId | string | 선택사항. 트랜잭션 유형이 PROPOSAL일 때 가능 |  |
| sequence | long |  |  |
| source | long |  |  |
| subTransactions | [ [SubTx](#subtx) ] | 선택사항. 트랜잭션이 multi-send 같은 하위 트랜잭션을 갖거나 트랜잭션에 여러 자산이 있을 경우 가능 |  |
| swapId | string | 선택사항. 트랜잭션 유형이 HTL_TRANSFER, CLAIM_HTL, REFUND_HTL, DEPOSIT_HTL 중 하나일 때 가능 |  |
| timeStamp | dateTime |  |  |
| toAddr | string |  |  |
| txAsset | string |  |  |
| txFee | string |  |  |
| txHash | string |  |  |
| txType | string |  |  |
| value | string |  |  |

#### /api/v1/timelocks/{account_addr}

***변경***

다음 함수는 타임볽 기록 전체를 가져오기 위해 제작되었습니다.

#### 타임록

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| id | long | 타임록 트랜잭션의 기록 id |  |
| description | string | 타임록 트랜잭션 설명 |  |
| amount | [  ] |  |  |
| locktime | string | 가능한 잠금 해제 시간 |  |

####/api/v1/timelock/{account_addr}?(id={recordid})

***변경***

다음 함수는 새 id로 접끕한 주소의 타임록 기록을 조회하기 위해 제작되었습니다.

#### 타임록

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| id | long | 타임록 트랜잭션의 기록 id |  |
| description | string | 타임록 트랜잭션 설명 |  |
| amount | [  ] |  |  |
| locktime | string | 가능한 잠금 해제 시간 |  |

## 비컨 체인 API v0.6.1 업데이트 내역

### HTTP API

아시다시피, 대중을 위한 고급 API 서비스를 제공하는 가속 노드가 있습니다. 다음은 메인넷에 모든 HTTP API 정보의 리스트입니다: https://docs.bnbchain.org/docs/beaconchain/develop/api-reference/dex-api/paths

HTTP API 테스넷의 최신 업데이트에서 변경된 점입니다:

#### /api/v1/account/{address}

***변경***
`Account` 데이터 구조에서 새로운 필드인 `flags`가 추가되어 다음 주소에 관한 제약이 나타납니다.

* 어떤 스트립트가 실행될 지 표시하기 위해 `flags`가 사용됩ㄴ디ㅏ. 

#### Account

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| account_number | integer |  |  |
| address | string (address) |  |  |
| balances | [ [잔고](#잔고) ] |  |  |
| public_key | [ integer ] | Public key bytes |  |
| flags | integer | 계정에 대한 추가 확인을 나타냅니다|  |
| sequence | long | 시퀸스는 재생 공격을 방지합니다 |  |

## 비컨 체인 API v0.6.0 업데이트 내역

### HTTP API

아시다시피, 대중을 위한 고급 API 서비스를 제공하는 가속 노드가 있습니다. 다음은 메인넷에 모든 HTTP API 정보의 리스트입니다: https://docs.bnbchain.org/docs/beaconchain/develop/api-reference/dex-api/paths

HTTP API 테스넷의 최신 업데이트에서 변경된 점입니다:


#### /api/v1/trades
---

***변경***

In the `Trade` data structure, a new field `Ticker Type` is added. The enumerate values are: "Unknown", "SellTaker","BuyTaker","BuySurplus","SellSurplus","Neutral". When there is a maker and taker, `SellTaker` and  `BuyTaker` are used to indicate the side. When both sides are taker,  `BuySurplus`, `SellSurplus` and `Neutral` are used to indicate market pressure.`Unknown` mean the type is not possible to define.

* `buySingleFee`는 구매자 계정의 개별 거래에 대한 수수료를 나타냅니다.
* `sellSingleFee`는 구매자 계정의 개별 거래에 대한 수수료를 나타냅니다.

***GET***

**요약:** 마켓 거래를 가져옵니다.

**설명:**  거래 내역 리스트를 가져옵니다.

**쿼리 창:**  기본 쿼리 창은 최근 7일입니다. 쿼리 창의 최대 시작-종료 기간은 3개월입니다.

**Rate 제한:**  IP 하나 당 초당 5개 요청.


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| address | query | 구매자/판매자 주소 | 아니오 | string |
| buyerOrderId | query | 구매자 주문 id | 아니오 | string |
| end | query | 종료 시간 (밀리초) | 아니오 | long |
| height | query | 블록 높이 | 아니오 | long |
| limit | query | 기본 500; 최대 1000. | 아니오 | integer |
| offset | query | 0으로 시작; 기본 0. | 아니오 | integer |
| quoteAsset | query | 견적 자산 | 아니오 | string |
| sellerOrderId | query | 판매자 주문 id | 아니오 | string |
| side | query | 주문 측. 1 - 구매  2 - sell. | 아니오 | integer |
| start | query | 시작 시간 (밀리초) | 아니오 | long |
| symbol | query | symbol | 아니오 | string |
| total | query | 필요 총 개수, 0 - 불필요 1 - 필요; 기본 - 불필요, 응답으로 total=-1 반환 | 아니오 | integer |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [TradePage](#tradepage) |
| 400 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |


#### 거래 페이지

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| total | long |  |  |
| trade | [ [거래](#거래) ] |  |  |

#### 거래

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| baseAsset | string | base asset |  |
| blockHeight | long | 블록 높이 |  |
| buyFee | string | 구매자 주소의 블록 거래 수수료 |  |
| buyerId | string | 구매자 ID |  |
| buyerOrderId | string | 구매자 주문 id |  |
| **buySingleFee** | string | 구매자 주소의 단일 거래에 대한 수수료 |  |
| price | string | 거래 가격 |  |
| quantity | string | 거래 수량 |  |
| quoteAsset | string | 견적 자산 |  |
| sellFee | string | 판매자 주소의 블록 거래 수수료 |  |
| sellerId | string | 판매자 ID |  |
| sellerOrderId | string | 판매자 주문 id |  |
| **sellSingleFee** | string | 판매자 주소의 단일 거래에 대한 수수료 |  |
| symbol | string | 자산 심볼 |  |
| **tickType** | string | enum [Unknown,SellTaker,BuyTaker,BuySurplus,SellSurplus,Neutral] |  |
| time | long  | 거래 시간 |  |
| tradeId | string | 거래 ID |  |



### 웹 소켓

#### 거래

***변경***

수신된 페이로드 `trades`에 `tt` 값이 추가되었습니다. 다음을 표현하는데 사용됩니다:
* 0: Unknown
* 1: SellTaker
* 2: BuyTaker
* 3: BuySurplus
* 4: SellSurplus
* 5: Neutral

  **수신된 페이로드:**

```javascript
{
    "stream": "trades",
    "data": [{
        "e": "trade",       // 이벤트 유형
        "E": 123456789,     // 이벤트 높이
        "s": "BNB_BTC",     // 심볼
        "t": "12345",       // 거래 ID
        "p": "0.001",       // 가격
        "q": "100",         // 수량
        "b": "88",          // 구매자 주문 ID
        "a": "50",          // 판매자 주문 ID
        "T": 123456785,     // 거래 시간
        "sa": "bnb1me5u083m2spzt8pw8vunprnctc8syy64hegrcp", // SellerAddress (판매자 주소)
        "ba": "bnb1kdr00ydr8xj3ydcd3a8ej2xxn8lkuja7mdunr5" // BuyerAddress (구매자 주소)
        "tt": 1   // 티커 타입
    },
    {
        "e": "trade",       // 이벤트 유형
        "E": 123456795,     // 이벤트 시간
        "s": "BNB_BTC",     // 심볼
        "t": "12348",       // 거래 ID
        "p": "0.001",       // 가격
        "q": "100",         // 수량
        "b": "88",          // 구매자 주문 ID
        "a": "52",          // 판매자 주문 ID
        "T": 123456795,     // 거래 시간
        "sa": "bnb1me5u083m2spzt8pw8vunprnctc8syy64hegrcp", // SellerAddress (판매자 주소)
        "ba": "bnb1kdr00ydr8xj3ydcd3a8ej2xxn8lkuja7mdunr5" // BuyerAddress (구매자 주소)
        "tt": 0    // 티커 타입
    }]
}
```

### 풀 노드에세 추가 데이터 가져오기

[추가 정보](get-extra-data-from-fullnode.md#publish-different-messages-to-local-files )는 풀 노드에서 추출된 데이터에서도 볼 수 있습니다.

***변경***

`trade` 데이터 구조에 5가지 새로운 값이 추가되었습니다: `SSrc`,`BSrc`,`SSingleFee`, `BSingleFee`, `TickerType`.

* `SSrc`: 판매 주문 트랜잭션 소스 코드
* `BSrc`: 구매 주문 트랜잭션 소스 코드
* `SSingleFee`: 성사된 판매 주문 수수료
* `BSingleFee`: 성사된 구매 주문 수수료
* `TickerType`: 티커 유형

`Order` 데이터 구조에 `singlefee`라는 새로운 값이 존재합니다. 이는 해당 거래의 수수료를 나타냅니다.



예를 들어:


```json
"Height":3154,
   "Timestamp":1560927932877738000,
   "NumOfMsgs":4,
   "Trades":{
      "NumOfMsgs":1,
      "Trades":[
         {
            "Id":"3154-0",
            "Symbol":"NNB-811_BNB",
            "Price":1200000000,
            "Qty":1200000000,
            "Sid":"8FEC97AB9B3F52A30B860CFBB8E41B72E9EB02C1-11",
            "Bid":"01C93F3512BCAA7E1DDD490B69B85E53A76C79B9-2",
            "Sfee":"BNB:5760000",
            "Bfee":"BNB:5760000",
            "SSrc":0,
            "BSrc":0,
            "SSingleFee":"",
            "BSingleFee":"",
            "TickType":0,
            "SAddr":"bnb13lkf02um8af2xzuxpnam3eqmwt57kqkp3hcvyp",
            "BAddr":"bnb1q8yn7dgjhj48u8wafy9knwz72wnkc7dehf39ch"
         }
      ]
   },
   "Orders":{
      "NumOfMsgs":3,
      "Orders":[
         {
            "Symbol":"NNB-811_BNB",
            "Status":0,
            "OrderId":"01C93F3512BCAA7E1DDD490B69B85E53A76C79B9-2",
            "TradeId":"",
            "Owner":"bnb1q8yn7dgjhj48u8wafy9knwz72wnkc7dehf39ch",
            "Side":1,
            "OrderType":2,
            "Price":1300000000,
            "Qty":1300000000,
            "LastExecutedPrice":0,
            "LastExecutedQty":0,
            "CumQty":1200000000,
            "Fee":"",
            "OrderCreationTime":1560927932877738000,
            "TransactionTime":1560927932877738000,
            "TimeInForce":1,
            "CurrentExecutionType":0,
            "TxHash":"A120FAA19A3448119E7F32B986540B21A5927616C73F95ACD1626FB54A74A865"
         },
         {
            "Symbol":"NNB-811_BNB",
            "Status":5,
            "OrderId":"01C93F3512BCAA7E1DDD490B69B85E53A76C79B9-2",
            "TradeId":"3154-0",
            "Owner":"bnb1q8yn7dgjhj48u8wafy9knwz72wnkc7dehf39ch",
            "Side":1,
            "OrderType":2,
            "Price":1300000000,
            "Qty":1300000000,
            "LastExecutedPrice":1200000000,
            "LastExecutedQty":1200000000,
            "CumQty":1200000000,
            "Fee":"BNB:5760000",
            "OrderCreationTime":1560927932877738000,
            "TransactionTime":1560927932877738000,
            "TimeInForce":1,
            "CurrentExecutionType":0,
            "TxHash":"A120FAA19A3448119E7F32B986540B21A5927616C73F95ACD1626FB54A74A865"
         },
         {
            "Symbol":"NNB-811_BNB",
            "Status":6,
            "OrderId":"8FEC97AB9B3F52A30B860CFBB8E41B72E9EB02C1-11",
            "TradeId":"3154-0",
            "Owner":"bnb13lkf02um8af2xzuxpnam3eqmwt57kqkp3hcvyp",
            "Side":2,
            "OrderType":2,
            "Price":1200000000,
            "Qty":1200000000,
            "LastExecutedPrice":1200000000,
            "LastExecutedQty":1200000000,
            "CumQty":1200000000,
            "Fee":"BNB:5760000",
            "OrderCreationTime":1560927931834863000,
            "TransactionTime":1560927932877738000,
            "TimeInForce":1,
            "CurrentExecutionType":0,
            "TxHash":"617565ECA6464E1B7435819A8154BCF5FC773FE1C5982A833DBEEDBE78E660C6"
         }
      ]
   },
   "Proposals":{
      "NumOfMsgs":0,
      "Proposals":null
   },
   "StakeUpdates":{
      "NumOfMsgs":0,
      "CompletedUnbondingDelegations":null
   }
}
```

## v0.6.2 업데이트 내역

### 텐더민트 변경

#### 1. 더 나은 인덱스 데이터베이스 처리

텐더민트가 재시작이나 크래시로부터 인덱스 데이터를 복구합니다. 상태에서 최신 인텍싱된 높이를 조회할 수 있습니다:
```
{
"jsonrpc": "2.0",
"id": "",
"result": {
...
"sync_info": {
      "latest_block_hash": "F51538DA498299F4C57AC8162AAFA0254CE08286",
      "latest_app_hash": "0000000000000000",
      "latest_block_height": "18",
      "latest_block_time": "2018-09-17T11:42:19.149920551Z",
      "catching_up": false,
      "index_height": "18"
    },
...
}
```
#### 2. 속성 파일에 추가 설정

맴풀(mempool) 부분에 ` skip_tx_from_persistent`가 추가되었습니다. 참으로 설정하면, 영구 피어에게 트랜잭션을 전파하지 않습니다.

#### 3. 모니터링 메트릭 변화

* 메트릭은 다음과 같습니다:
   * IndexHegiht：최신 인덱스 높이를 나타냅니다
   * Height: 블록체인의 최신 =높이를 나타냅니다
   * BlockIntervalSeconds: 현재와 이전 블록 사이 시간을 나타냅니다
   * NumTxs: 현재 블록에 총 트랜잭션 수를 나타냅니다
   * BlockSizeBytes: 블록 사이즈를 나타냅니다
   * TotalTxs: 내역에서 총 트랜잭션 수를 나타냅니다
   * CommittedHeight: 최신 블록 높이를 나타냅니다
   * PermanentPeerSetSize: 안정적으로 분류된 피어의 개수를 나타냅니다
   * PermanentPeers: 안정적으로 분류된 피어의 세부 정보를 나타냅니다
   * DecayPeerSetSize: 불안정한 분류된 피어의 개수를 나타냅니다
* ReceivedTx, PeerSendBytesTotal, PeerReceiveBytesTotal이 제거되었습니다.


