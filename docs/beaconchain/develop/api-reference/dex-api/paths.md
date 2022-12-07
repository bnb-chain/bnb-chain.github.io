HTTP API
========
바이낸스 생태계 안에는 바이낸스 체인과 HTTP API 같은 DEX 데이터 서비스에 더 안전하고 빠른 회선을 제공하는 몇 개의 가속 노드들이 존재합니다.

메인넷에는 더 많은 가속 노드들이 존재합니다.

  * dex-atlantic.binance.org

  * dex-asiapacific.binance.org

  * dex-european.binance.org


**버전:** 1.0.0

**라이센스:** [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

### /api/v1/time
---
##### ***GET***
**요약:** 블록 생성 시간을 가져옵니다.

**설명:**  HTTP 서비스 현재 시간의 최신 블록 생성 시간을 가져옵니다.

**도착 지점** 검증인 노드.

**Rate 제한:** IP 하나 당 초당 1개 요청.

**URL for mainnet:** [https://dex.binance.org/api/v1/time](https://dex.binance.org/api/v1/time)

**테스트넷 URL:** [https://testnet-dex.binance.org/api/v1/time](https://testnet-dex.binance.org/api/v1/time)


**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [Times](#times) |
| 400 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v1/node-info
---
##### ***GET***
**요약:** 노드 정보를 가져옵니다.

**설명:**  노드에 관한 런타임 정보를 가져옵니다.

**도착 지점**  검증인 노드.

**Rate 제한:**  IP 하나 당 초당 1개 요청.

**URL for mainnet:** [https://dex.binance.org/api/v1/node-info](https://dex.binance.org/api/v1/node-info)

**테스트넷 URL:** [https://testnet-dex.binance.org/api/v1/node-info](https://testnet-dex.binance.org/api/v1/node-info)


**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [ResultStatus](#resultstatus) |

### /api/v1/validators
---
##### ***GET***
**요약:** 검증인을 가져옵니다.

**설명:**  합의에 참여하는 검증인의 리스트를 가져옵니다.

**도착 지점**  증인 노드.

**Rate 제한:**  IP 하나 당 초당 10개 요청.

**URL for mainnet:** [https://dex.binance.org/api/v1/validators](https://dex.binance.org/api/v1/validators)

**테스트넷 URL:** [https://testnet-dex.binance.org/api/v1/validators](https://testnet-dex.binance.org/api/v1/validators)


**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [ [검증인들](#검증인들) ] |
| 400 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v1/peers
---
##### ***GET***
**요약:** 네트워크 피어를 가져옵니다.

**설명:**  네트워크 피어 리스트를 가져옵니다.

**도착 지점**  증인 노드.

**Rate 제한:**  IP 하나 당 초당 1개 요청.

**URL for mainnet:** [https://dex.binance.org/api/v1/peers](https://dex.binance.org/api/v1/peers)

**테스트넷 URL:** [https://testnet-dex.binance.org/api/v1/peers](https://testnet-dex.binance.org/api/v1/peers)


**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [ [피어](#피어) ] |
| 400 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v1/account/{address}
---
##### ***GET***
**요약:** 계정을 가져옵니다.

**설명:**  주소에 대한 계정 메타데이터를 가져옵니다.

**도착 지점**  증인 노드.

**Rate 제한:**  IP 하나 당 초당 5개 요청.

**URL for mainnet:** [https://dex.binance.org/api/v1/account/bnb1jxfh2g85q3v0tdq56fnevx6xcxtcnhtsmcu64m](https://dex.binance.org/api/v1/account/bnb1jxfh2g85q3v0tdq56fnevx6xcxtcnhtsmcu64m)

**테스트넷 URL:** [https://testnet-dex.binance.org/api/v1/account/tbnb185tqzq3j6y7yep85lncaz9qeectjxqe5054cgn](https://testnet-dex.binance.org/api/v1/account/tbnb185tqzq3j6y7yep85lncaz9qeectjxqe5054cgn)


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| address | path | 쿼리할 계정 주소 | 예 | string |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [계정](#계정) |
| 400 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) | [에러](#에러). |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v1/account/{address}/sequence
---
##### ***GET***
**요약:** 계정 시퀸스를 가져옵니다.

**설명:**  주소에 대한 계정 시퀸스를 가져옵니다.

**도착 지점**  검증인 노드.

**Rate 제한:**  IP 하나 당 초당 5개 요청.

**URL for mainnet:** [https://dex.binance.org/api/v1/account/bnb1jxfh2g85q3v0tdq56fnevx6xcxtcnhtsmcu64m/sequence](https://dex.binance.org/api/v1/account/bnb1jxfh2g85q3v0tdq56fnevx6xcxtcnhtsmcu64m/sequence)

**테스트넷 URL:** [https://testnet-dex.binance.org/api/v1/account/tbnb13g2le062t340klgm2l2khzr57y3qxlekuhfuch/sequence](https://testnet-dex.binance.org/api/v1/account/tbnb13g2le062t340klgm2l2khzr57y3qxlekuhfuch/sequence)


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| address | path | 쿼리할 계정 주소 | 예 | string |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [AccountSequence](#accountsequence) |
| 400 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v1/tx/{hash}
---
##### ***GET***
**요약:** 트랜잭션을 가져옵니다.

**설명:**  트랜잭션 ID로 트랜잭션 메타데이터를 가져옵니다.기본적으로 트랜잭션은 원시 형식으로 반환됩니다. 더 읽기 쉬운 응답을 위해 경로 뒤에 `?format=json`를 추가해도 됩니다.

**도착 지점**  시드 노드.

**Rate 제한:**  IP 하나 당 초당 10개 요청.

**예시:**

아래는 `?format=json`가 사용되었을 때 발송 트랜잭션의 응답 예시입니다.
```
    {
     code:0,
     hash:"433806D6A4AB6359CB56EC55BA99896DFAB2AF11326B74881A2ABA7049C492D3",
     height:"7850389",
     log:"Msg 0: ",
     ok:true,
     tx:{
        type:"auth/StdTx",
        value:{
           data:null,
           memo:"101192150",
           msg:[
              {
                 type:"cosmos-sdk/Send",
                 value:{
                    inputs:[
                       {
                          address:"bnb1jafs33u9u6f7w7wzfmm4rr9rzy2cgqzp78kwaw",
                          coins:[
                             {
                                amount:"496429373",
                                denom:"BNB",

                             }
                          ],

                       }
                    ],
                    outputs:[
                       {
                          address:"bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23",
                          coins:[
                             {
                                amount:"496429373",
                                denom:"BNB",

                             }
                          ],

                       }
                    ],

                 },

              }
           ],
           signatures:[
              {
                 account_number:"438",
                 pub_key:{
                    type:"tendermint/PubKeySecp256k1",
                    value:"A3mfgg/i12XNyy9esqCjI7yrkrOs9dngP7c9cDUEJly5",

                 },
                 sequence:"0",
                 signature:"VvvGz3qbyirJ7vv01Df8tuAd7K4I+HK+yEBfep+qwtMKuHWQQH3XtMB9Pqtc2jlia0AtDe+BUEMtIyh3/N66IQ==",

              }
           ],
           source:"1",

        },

     },

  }
```


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| hash | path | 쿼리할 트랜잭션 해시 | 예 | string |
| format | query | 응답 형식 (`json` 이나 amino) | 아니오 | string |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 0 | Success(성공) | [Transaction](#transaction) |
| 404 | Not Found(칮을 수 없음) |  |
| 500 | Bad Request(잘못된 요청) | [에러](#에러). |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v1/tokens
---
##### ***GET***
**요약:** Get tokens list.

**설명:**  발행된 토큰 리스트 가져오기.

**도착 지점**  증인 노드.

**Rate 제한:**  IP 하나 당 초당 1개 요청.

**URL for mainnet:** [https://dex.binance.org/api/v1/tokens](https://dex.binance.org/api/v1/tokens)

**테스트넷 URL:** [https://testnet-dex.binance.org/api/v1/tokens](https://testnet-dex.binance.org/api/v1/tokens)


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| limit | query | 기본 100. | 아니오 | integer |
| offset | query | 0으로 시작; 기본 0. | 아니오 | integer |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [ [Token](#token) ] |
| 400 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v1/markets
---
##### ***GET***
**요약:** 마켓 쌍 가져오기.

**설명:**  상장된 마켓 쌍 리스트 가져오기.

**도착 지점**  증인 노드.

**Rate 제한:**  IP 하나 당 초당 1개 요청.

**URL for mainnet:** [https://dex.binance.org/api/v1/markets](https://dex.binance.org/api/v1/markets)

**테스트넷 URL:** [https://testnet-dex.binance.org/api/v1/markets](https://testnet-dex.binance.org/api/v1/markets)


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| limit | query | 기본 500; 최대 1000. | 아니오 | integer |
| offset | query | 0으로 시작; 기본 0. | 아니오 | integer |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [ [Market](#market) ] |
| 400 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v1/fees
---
##### ***GET***
**요약:** 거래 수수료 정보 가져오기.

**설명:**  현재 거래 수수료 정보 설정 가져오기.

**도착 지점**  증인 노드.

**Rate 제한:**  IP 하나 당 초당 1개 요청.

**URL for mainnet:** [https://dex.binance.org/api/v1/fees](https://dex.binance.org/api/v1/fees)

**테스트넷 URL:** [https://testnet-dex.binance.org/api/v1/fees](https://testnet-dex.binance.org/api/v1/fees)


**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [ [Fee](#fee) ] |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v1/depth
---
##### ***GET***
**요약:** 오더 북을 가져옵니다.

**설명:**  주어진 심볼 쌍에 대한 오더 북 깊이 데이터를 가져옵니다.

_한계_는 아래 혀용된 한계 중 하나여야 합니다.

**도착 지점**  검증인 노드.

**Rate 제한:**  IP 하나 당 초당 10개 요청.

**URL for mainnet:** [https://dex.binance.org/api/v1/depth?symbol=xxx-000_BNB](https://dex.binance.org/api/v1/depth?symbol=xxx-000_BNB)

**테스트넷 URL:** [https://testnet-dex.binance.org/api/v1/depth?symbol=xxx-000_BNB](https://testnet-dex.binance.org/api/v1/depth?symbol=xxx-000_BNB)


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| symbol | query | 마켓 쌍 심볼, 예. NNB-0AD_BNB | 예 | string |
| limit | query | 결과의 한계. 허용된 한계: [5, 10, 20, 50, 100, 500, 1000] | 아니오 | integer |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [MarketDepth](#marketdepth) |
| 400 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v1/broadcast
---
##### ***POST***
**요약:** 트랜잭션 전파.

**설명:**  서명된 트랜잭션 전파. 단일 트랜잭션은 `text/plain`의  `content-type`으로 hex 인코딩 되어 전송되야 합니다.

**도착 지점**  증인 노드.

**Rate 제한:**  IP 하나 당 초당 5개 요청.

**URL for mainnet:** [https://dex.binance.org/api/v1/broadcast](https://dex.binance.org/api/v1/broadcast)

**테스트넷 URL:** [https://testnet-dex.binance.org/api/v1/broadcast](https://testnet-dex.binance.org/api/v1/broadcast)


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| sync | query | 동기적 전파([DeliverTx](https://github.com/tendermint/tendermint/wiki/Application-Developers#delivertx) 대기)?  | 아니오 | boolean |
| body | body |  | 예 | binary |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [ [Transaction](#transaction) ] |
| 400 | Bad Request(잘못된 요청) | [에러](#에러). |
| 401 | Bad Signature | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v1/klines
---
##### ***GET***
**요약:** 캔들스틱 막대 가져오기.

**설명:**  심볼에 대한 캔들스틱/클라인 막대 가져오기. 막대는 각 막대의 시작 시간을 통해 구분 됩니다.

시간 창이 한계보다 크다면, 첫 번째 n개의 클라인만 반환됩니다. 이 경우, 창을 줄이거나 한계를 늘려 적당한 양의 클라인을 가져오세요.

**Rate 제한:**  IP 하나 당 초당 10개 요청.

**URL for mainnet:** [https://dex.binance.org/api/v1/klines?symbol=NNB-338_BNB&interval=5m](https://dex.binance.org/api/v1/klines?symbol=NNB-338_BNB&interval=5m)


**테스트넷 URL:** [https://testnet-dex.binance.org/api/v1/klines?symbol=NNB-338_BNB&interval=5m](https://testnet-dex.binance.org/api/v1/klines?symbol=NNB-338_BNB&interval=5m)

**예시**

```
[
  1499040000000,      // Open time (시작 시간)
  "0.01634790",       // Open
  "0.80000000",       // High (고점)
  "0.01575800",       // Low (저점)
  "0.01577100",       // Close
  "148976.11427815",  // Volume
  1499644799999,      // Close time (종료 시간)
  "2434.19055334",    // Quote asset volume (견적 자산 규모)
  308                // Number of trades (거래 횟수)
]
```


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| symbol | query | symbol | 예 | string |
| interval | query | 간격. 허용된 값: [1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M] | 예 | enum string |
| limit | query | 기본 300; 최대 1000. | 아니오 | integer |
| startTime | query | 시작 시간 (밀리초) | 아니오 | long |
| endTime | query | 종료 시간 (밀리초) | 아니오 | long |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [ [Candlestick](#candlestick) ] |

### /api/v1/orders/closed
---
##### ***GET***
**요약:** 닫힌 주문을 가져옵니다.

**설명:**  주어진 주소에 대한 닫힌(체결 혹은 취소) 주소를 가져옵니다.

**쿼리 창:**  기본 쿼리 창은 최근 7일입니다. 쿼리 창의 최대 시작-종료 기간은 3개월입니다.

**Rate 제한:**  IP 하나 당 초당 5개 요청.


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| address | query | 소유자 주소 | 예 | string |
| end | query | 종료 시간 (밀리초) | 아니오 | long |
| limit | query | 기본 500; 최대 1000. | 아니오 | integer |
| offset | query | 0으로 시작; 기본 0. | 아니오 | integer |
| side | query | 주문 측. 1 - 구매  2 - sell. | 아니오 | integer |
| start | query | 시작 시간 (밀리초) | 아니오 | long |
| status | query | 주문 상태 리스트. 허용된 값: [Ack, IocExpire, IocNoFill, FullyFill, Canceled, Expired, FailedBlocking, FailedMatching] | 아니오 | enum string |
| symbol | query | symbol | 아니오 | string |
| total | query | 필요 총 개수, 0 - 불필요 1 - 필요; 기본 - 불필요, 응답으로 total=-1 반환 | 아니오 | integer |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [OrderList](#orderlist) |

### /api/v1/orders/open
---
##### ***GET***
**요약:** 열린 주문을 가져옵니다.

**설명:**  주어진 주소에 대한 열린 주문을 가져옵니다.

**Rate 제한:**  IP 하나 당 초당 5개 요청.


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| address | query | 소유자 주소 | 예 | string |
| limit | query | 기본 500; 최대 1000. | 아니오 | integer |
| offset | query | 0으로 시작; 기본 0. | 아니오 | integer |
| symbol | query | symbol | 아니오 | string |
| total | query | 필요 총 개수, 0 - 불필요 1 - 필요; 기본 - 불필요, 응답으로 total=-1 반환 | 아니오 | integer |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [OrderList](#orderlist) |
| 400 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v1/orders/{id}
---
##### ***GET***
**요약:** 주문을 가져옵니다.

**설명:**  ID로 개별 주문에 대한 메타 데이터를 가져옵니다.

**Rate 제한:**  IP 하나 당 초당 5개 요청.


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | 주문 ID | 예 | string |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [주문](#주문) |
| 400 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v1/ticker/24hr
---
##### ***GET***
**요약:** 마켓 티커 가져오기.

**설명:**  마켓 거래 쌍에 대한 24시간 가격 변동 통계를 가져옵니다.  매초 업데이트됩니다.

**Rate 제한:**  IP 하나 당 초당 5개 요청.


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| symbol | query | symbol | 아니오 | string |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [ [TickerStatistics](#tickerstatistics) ] |
| 400 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v1/trades
---
##### ***GET***
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

### /api/v1/block-exchange-fee
---
##### ***GET***
**요약:** 블록에 묶인 주소들의 거래 수수료

**설명:**  주소의 거래/거래 취소/만료된 주문을 포함한 거래 수수료를 가져옵니다. 전송 및 다른 트랜잭션 수수료는 포함되지 않습니다.블록 높이 DESC로 정렬됩니다.
**쿼리 창:**  기본 쿼리 창은 최근 7일입니다. 쿼리 창의 최대 시작-종료 기간은 3개월입니다.
**Rate 제한:**  IP 하나 당 초당 5개 요청.


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| address | query | 판매자/구매자 주소 | 아니오 | string |
| end | query | 종료 시간 | 아니오 | long |
| limit | query | default 50; max 1000. | 아니오 | integer |
| offset | query | 0으로 시작; 기본 0. | 아니오 | integer |
| start | query | 시작 시간 (밀리초) | 아니오 | long |
| total | query | 필요 총 개수, 0 - 불필요 1 - 필요; 기본 - 불필요, 응답으로 total=-1 반환 | 아니오 | integer |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [BlockExchangeFeePage](#blockexchangefeepage) |

### /api/v1/transactions
---

**참고:** 해당 엔드포인트는 곧 제거될 예정이며 [다음 api](https://github.com/bnb-chain/bnb-chain.github.io/blob/master/docs/beaconchain/develop/api-reference/dex-api/block-service.md#apiv1txs)를 대신 사용하세요 (이전 방법에 관해 읽어주세요).

##### ***GET***
**요약:** 트랜잭션을 가져옵니다.

**설명:**  트랜잭션 리스트를 가져옵니다. 이 API에서는 다중 전송 트랜잭션을 사용할 수 없습니다. 현재 'confirmBlocks'과 'txAge' 는 지원되지 않습니다.**쿼리 창:**  Default query window is latest 24 hours;쿼리 창의 최대 시작-종료 기간은 3개월입니다.

**Rate 제한:**  IP 하나 당 분당 15개 요청.


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| address | query | 주소 | 예 | string |
| blockHeight | query | blockHeight | 아니오 | long |
| endTime | query | 종료 시간 (밀리초) | 아니오 | long |
| limit | query | limit | 아니오 | integer |
| offset | query | offset | 아니오 | integer |
| side | query | 트랜잭션 측. 허용된 값: [ RECEIVE, SEND] | 아니오 | enum string |
| startTime | query | 시작 시간 (밀리초) | 아니오 | long |
| txAsset | query | txAsset | 아니오 | string |
| txType | query | 트랜잭션 유형. 허용된 값: [ TRANSFER,NEW_ORDER,ISSUE_TOKEN,BURN_TOKEN,LIST_TOKEN,CANCEL_ORDER,FREEZE_TOKEN,UN_FREEZE_TOKEN,TRANSFER,PROPOSAL,VOTE,MINT,DEPOSIT,CREATE_VALIDATOR,REMOVE_VALIDATOR,TIME_LOCK,TIME_UNLOCK,TIME_RELOCK,SET_ACCOUNT_FLAG,HTL_TRANSFER,CLAIM_HTL,DEPOSIT_HTL,REFUND_HTL] | 아니오 | enum string |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [TxPage](#txpage) |
| 400 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| 403 | Tx 이 24시간 쿼리 창에 있지 않습니다 |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v1/transactions-in-block/{blockHeight}
---
**Note:**해당 엔드포인트가 곧 제거되며 [this api](https://github.com/bnb-chain/bnb-chain.github.io/blob/master/docs/beaconchain/develop/api-reference/dex-api/block-service.md#apiv1blocksblockheighttxs) 를 대신 사용하세요 (이전 방법은 가이드를 읽어주세요)..

##### ***GET***
**요약:** 특정 블록의 트랜잭션을 가져옵니다.

**설명:**  블록 내 트랜잭션을 가져옵니다. Multi-send and multi-coin transactions are flattened as transactions. 이 API는 누락되었습니다.

**Rate 제한:**  IP 하나 당 초당 1개 요청.

**Rate 제한:**  IP 하나 당 분당 15개 요청.


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| blockHeight | path | 블록 높이 | 예 | string |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [BlockTx](#blocktx) |
| 400 | Bad Request. 쿼리하는 블록이 현재 블록 높이보다 높습니다. | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v2/transactions-in-block/{blockHeight}

**참고:**해당 엔드포인트가 곧 제거되며 [다음 api](https://github.com/bnb-chain/bnb-chain.github.io/blob/master/docs/beaconchain/develop/api-reference/dex-api/block-service.md#apiv1blocksblockheighttxs) 를 대신 사용하세요 (이전 방법은 가이드를 읽어주세요)..

---
##### ***GET***
**요약:** 블록 내 트랜잭션

**설명:**  블록 내 트랜잭션을 가져옵니다. Multi-send와 multi-coin 트랜잭션이 하위 트랜잭션으로 포함됩니다.

**Rate 제한:**  IP 하나 당 초당 1개 요청.

**Rate 제한:**  IP 하나 당 분당 15개 요청.


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| blockHeight | path | blockHeight | 예 | long |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [BlockTxV2](#blocktxv2) |
| 400 | Bad Request. 쿼리하는 블록이 현재 블록 높이보다 높습니다. | [에러](#에러). |

### /api/v1/atomic-swaps
---
##### ***GET***
**요약:** AtomicSwap

**설명:**  주소로 아토믹 스왑을 가져옵니다.

**Rate 제한:**  IP 하나 당 초당 5개 요청.

**Rate 제한:**  IP 하나 당 분당 60개 요청.


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| endTime | query | blockTimestamp 종료 시간 | 아니오 | long |
| fromAddress | query | toAddress와 fromAddress 중 하나가 매개변수로 주어집니다 | 아니오 | string |
| limit | query | 기본 25; 최대 1000. | 아니오 | integer |
| offset | query | 0으로 시작; 기본 0. | 아니오 | integer |
| startTime | query | blockTimestamp 시작 시간 (밀리초); 최대 시작 - 종료 쿼리 창은 3개월; 기본 쿼리 창은 최근 30 일. | 아니오 | long |
| toAddress | query | toAddress와 fromAddress 중 하나가 매개변수로 주어집니다 | 아니오 | string |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [AtomicSwapPage](#atomicswappage) |

### /api/v1/atomic-swaps/{id}
---
##### ***GET***
**요약:** AtomicSwap

**설명:**  스왑 id로 아토믹스왑을 가져옵니다

**Rate 제한:**  IP 하나 당 초당 5개 요청.

**Rate 제한:**  IP 하나 당 분당 60개 요청.


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | swap id | 예 | string |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [AtomicSwap](#atomicswap) |

### /api/v1/timelocks/{address}
---
##### ***GET***
**요약:** 해당 주소의 타임록 기록을 가져옵니다

**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| address | path | 쿼리할 계정 주소 | 예 | string |
| id | query | 쿼리할 기록 id의 타임록 | 아니오 | long |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [타임록](#타임록) |
| 400 | Bad Request(잘못된 요청) | [에러](#에러). |
| 500 | internal server error | [에러](#에러). |

### /api/v1/timelock/{account_addr}?(id={recordid})
---
##### ***GET***
**요약:** 주소의 타임록 기록을 가져옵니다.

**설명:**  주소의 타임록 기록을 가져옵니다.
**Rate 제한:**  IP 하나 당 분당 60개 요청.


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| address | path | 쿼리할 계정 주소 | 예 | string |
| id | query | 쿼리할 기록 id의 타임록 | 아니오 | long |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [타임록](#타임록) |
| 400 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| 500 | internal server error | [에러](#에러). |

### /api/v1/mini/tokens
---
##### ***GET***
**요약:** 미니 토큰 리스트를 가져옵니다.

**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| offset | query | offset | 아니오 | integer |
| limit | query | limit | 아니오 | integer |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [MiniTokens](#minitokens) |
| 400 | Bad Request(잘못된 요청) | [에러](#에러). |
| 500 | internal server error | [에러](#에러). |

### /api/v1/mini/markets
---
##### ***GET***
**요약:** 미니 마켓 쌍에 대한 리스트를 가져옵니다.

**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| offset | query | offset | 아니오 | integer |
| limit | query | limit | 아니오 | integer |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [마캣](#마켓) |
| 400 | Bad Request(잘못된 요청) | [에러](#에러). |

### /api/v1/mini/klines
---
##### ***GET***
**요약:** 미니 토큰 캔들스틱 막대를 가져옵니다.

**설명:**  미니 토큰 심볼 쌍을 위한 캔들스틱/클라인 막대를 가져옵니다. 막대는 각 막대의 시작 시간을 통해 구분 됩니다.

시간 창이 한계보다 크다면, 첫 번째 n개의 클라인만 반환됩니다. 이 경우, 창을 줄이거나 한계를 늘려 적당한 양의 클라인을 가져오세요.

**Rate 제한:**  IP 하나 당 초당 10개 요청.

**예시**

```
[
  1499040000000,      // Open time (시작 시간)
  "0.01634790",       // Open
  "0.80000000",       // High (고점)
  "0.01575800",       // Low (저점)
  "0.01577100",       // Close
  "148976.11427815",  // Volume
  1499644799999,      // Close time (종료 시간)
  "2434.19055334",    // Quote asset volume (견적 자산 규모)
  308                // Number of trades (거래 횟수)
]
```


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| symbol | query | symbol | 예 | string |
| interval | query | 간격. 허용된 값: [1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M] | 예 | enum string |
| limit | query | 기본 300; 최대 1000. | 아니오 | integer |
| startTime | query | 시작 시간 (밀리초) | 아니오 | long |
| endTime | query | 종료 시간 (밀리초) | 아니오 | long |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [ [Candlestick](#candlestick) ] |

### /api/v1/mini/orders/closed
---
##### ***GET***
**요약:** 미니 토큰 쌍에 대한 닫힌 주문을 가져옵니다.

**설명:**  주어진 주소에 대한 닫힌(체결 혹은 취소) 주소를 가져옵니다.

**쿼리 창:**  기본 쿼리 창은 최근 7일입니다. 쿼리 창의 최대 시작-종료 기간은 3개월입니다.

**Rate 제한:**  IP 하나 당 초당 5개 요청.


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| address | query | 소유자 주소 | 예 | string |
| end | query | 종료 시간 (밀리초) | 아니오 | long |
| limit | query | 기본 500; 최대 1000. | 아니오 | integer |
| offset | query | 0으로 시작; 기본 0. | 아니오 | integer |
| side | query | 주문 측. 1 - 구매  2 - sell. | 아니오 | integer |
| start | query | 시작 시간 (밀리초) | 아니오 | long |
| status | query | 주문 상태 리스트. 허용된 값: [Ack, IocExpire, IocNoFill, FullyFill, Canceled, Expired, FailedBlocking, FailedMatching] | 아니오 | enum string |
| symbol | query | 심볼 | 아니오 | string |
| total | query | 필요 총 개수, 0 - 불필요 1 - 필요; 기본 - 불필요, 응답으로 total=-1 반환 | 아니오 | integer |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [OrderList](#orderlist) |

### /api/v1/mini/orders/open
---
##### ***GET***
**요약:** 미니 토큰 쌍에 대한 열린 주문을 가져옵니다.

**설명:**  주어진 주소에 대한 열린 주문을 가져옵니다.
**Rate 제한:**  IP 하나 당 초당 5개 요청.


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| address | query | 소유자 주소 | 예 | string |
| limit | query | 기본 500; 최대 1000. | 아니오 | integer |
| offset | query | 0으로 시작; 기본 0. | 아니오 | integer |
| symbol | query | symbol | 아니오 | string |
| total | query | 필요 총 개수, 0 - 불필요 1 - 필요; 기본 - 불필요, 응답으로 total=-1 반환 | 아니오 | integer |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [OrderList](#orderlist) |
| 400 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v1/mini/orders/{id}
---
##### ***GET***
**요약:** 미니 토큰 쌍의 주문을 가져옵니다.

**설명:**  ID로 개별 주문에 대한 메타 데이터를 가져옵니다.
**Rate 제한:**  IP 하나 당 초당 5개 요청.


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | 주문 ID | 예 | string |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [주문](#주문) |
| 400 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v1/mini/ticker/24hr
---
##### ***GET***
**요약:** 미니 토큰 쌍에 대한 마켓 티커를 가져옵니다. 

**설명:**  마켓 거래 쌍에 대한 24시간 가격 변동 통계를 가져옵니다.  매초 업데이트됩니다.
**Rate 제한:**  IP 하나 당 초당 5개 요청.


**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| symbol | query | 심볼 | 아니오 | string |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [ [TickerStatistics](#tickerstatistics) ] |
| 400 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v1/mini/trades
---
##### ***GET***
**요약:** 미니 토큰 쌍에 대한 마켓 거래를 가져옵니다.

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

### Models
---

### 에러

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| code | long | 에러 코드 | 400 |
| message | string | 에러 메세지 |  |

### 시간

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| ap_time | string | 이벤트 시간 | 예. 2019-01-21T10:30:00Z |
| block_time | string | 최신 블록 시간 | 예. 2019-01-21T10:30:00Z |

### 검증인들

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| block_height | long | 현재 블록 높이 | 12345 |
| validators | [ [검증인](#검증인) ] |  |  |

### 검증인

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| address | string (hex 주소) | 주소 |  |
| pub_key | [ integer ] | 공개 키 바이트 수 |  |
| voting_power | integer | 검증인의 투표권 |  |
| accum | integer | 검증인의 누적 투표권 |  |

### 피어

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| id | string | 인증된 식별자 | 8c379d4d3b9995c712665dc9a9414dbde5b30483 |
| original_listen_addr | string (RemoteAddr) | PeersService가 바꾸기 전 listen 주소  |  |
| listen_addr | string (RemoteAddr) | Listen 주소 |  |
| access_addr | string (RemoteAddr) | 접근 주소 (HTTP) |  |
| stream_addr | string (RemoteAddr) | 스트림 주소 (WS) |  |
| network | string | 체인 ID | Binance-Chain-Ganges |
| version | string | 버전 | 0.30.1 |
| moniker | string | 이름 | data-seed-1 |
| capabilities | [ string ] | 가능한 태그의 배열: node, qs, ap, ws | node,ap |
| accelerated | boolean | 검증인 노드의 가속된 경로 |  |

### 트랜잭션

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| hash | string (hex) | 트랜잭션 해시; 이전에는 바이트로 왔지만 현재는 hex string 형태로 반환됩니다 |  |
| log | string | 트랜잭션 로그 |  |
| data | string | 트랜잭션 데이터 |  |
| height | string | 트랜잭션 높이 |  |
| code | integer | 트랜잭션 결과 코드 |  |
| ok | boolean |  |  |
| tx | object | Detail of transaction, like transaction type, messages and signature

아래는 트랜잭션 세부 사항에 대한 예시입니다. 대부분은 고정되어 있지만 --format=json로 쿼리하면 msg는 유형에 따라 나뉩니다.

```
{
    "type": "auth/StdTx", // fixed, type of transaction
    "value": {            // fixed, detail of the transaction
        "data": null,     // fixed, data of the transaction
        "memo": "",       // fixed, memo
        "msg": [          // fixed, msgs of the transaction
            {
                "type": "cosmos-sdk/Send",  // vary with msg type
                "value": {                  // value content vary with mst type
                    "inputs": [
                        {
                            "address": "bnb1vt4zwu5hy7tyryktud6mpcu8h2ehh6xw66gzwp",
                            "coins": [
                                {
                                    "amount": "100000000000000",
                                    "denom": "BNB"
                                }
                            ]
                        }
                    ],
                    "outputs": [
                        {
                            "address": "bnb1kg8mh20tndur9d9rry4wjunhpfzcud30qzf0qv",
                            "coins": [
                                {
                                    "amount": "100000000000000",
                                    "denom": "BNB"
                                }
                            ]
                        }
                    ]
                }
            }
        ],
        "signatures": [ // fixed, signatures of the transaction
            {
                "account_number": "0",
                "pub_key": {
                    "type": "tendermint/PubKeySecp256k1",
                    "value": "AoWY3eWBOnnvLPTz4RsUlX1pWCkLLPewu1vAAoTEzxzR"
                },
                "sequence": "1",
                "signature": "6O2TQAgleFNPw4zIWBLaNvOf5dR7DHNSr2DwAPeFK6lokRqZd2KR2BD+WlmaWj4LdLo5N+utN1JtY41E91N0uw=="
            }
        ],
        "source": "0"  // fixed, source of the transaction
    }
}
```
 |  |

### 계정

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| account_number | integer |  |  |
| address | string (address) |  |  |
| balances | [ [잔고](#잔고) ] |  |  |
| public_key | [ integer ] | 공개 키 바이트 수 |  |
| sequence | long | 시퀸스는 재생 공격을 방지합니다 |  |

### AccountSequence

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| sequence | long | 숫자는 재생 공격을 방지하는데 사용됩니다 | 1 |

### 잔고

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| symbol | string (currency) | 자산 심볼 | BNB |
| free | string (fixed8) | 소수점 형태로, 예. 0.00000000 | 0.00000000 |
| locked | string (fixed8) | 소수점 형태로, 예. 0.00000000 | 0.00000000 |
| frozen | string (fixed8) | 소수점 형태로, 예. 0.00000000 | 0.00000000 |

### 토큰

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| name | string | 토큰 이름 | Binance Chain Native Token |
| symbol | string | 고유한 토큰 거래 심볼 | BTC-000 |
| original_symbol | string | 토큰 심볼 | BTC |
| total_supply | string (fixed8) | 총 토큰 공급량 소수점 형태로, 예. 1.00000000 | 0.00000000 |
| owner | string (address) | 토큰을 발행한 주소 |  |
| contract_address | string | 이 토큰의 스마트 계약 주소 |  |
| contract_decimals | int | 토큰 소수점 |  |

### 마켓

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| base_asset_symbol | string (currency) | 기초 자산 심볼 | BNB |
| quote_asset_symbol | string (currency) | 견적 자산 심볼 | ABC-5CA |
| list_price | string (fixed8) | 소수점 형태 | 1.00000000 |
| tick_size | string (fixed8) | 소수점 형태의 최소 가격 변화| 0.00000001 |
| lot_size | string (fixed8) | 소수점 형태의 최소 거래량 변화 | 1.00000000 |

### 수수료

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| msg_type | string | 수수료가 해당하는 트랜잭션 메세지 유형  | submit_proposal |
| fee | number | 수수료 금액 | 1000000000 |
| fee_for | integer | 1 = proposer, 2 = all, 3 = free | 1 |
| multi_transfer_fee | string | 다중 전송 비용 | 200000 |
| lower_limit_as_multi | string | 예. 2 | 2 |
| fixed_fee_params | [FixedFeeParams](#fixedfeeparams) | 고정 수수료일 시 설정 |  |
| dex_fee_fields | [DexFeeFieldParams](#dexfeefieldparams) | dex 수수료 |  |

### FixedFeeParams

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| msg_type | string | 수수료가 해당하는 트랜잭션 메세지 유형  | submit_proposal |
| fee | number | 고정된 수수료 금액 | 1000000000 |
| fee_for | integer | 1 = proposer, 2 = all, 3 = free | 1 |

### DexFeeFieldParams

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| fee_name | string | 수수료 이름 |  |
| fee_value | integer | 수수료 값 |  |

### MarketDepth

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| asks | [ string (fixed8) ] | 가격 및 수량 소수점 형태로, 예. 1.00000000 | ["1.00000000","800.00000000"] |
| bids | [ string (fixed8) ] | 가격 및 수량 소수점 형태로, 예. 1.00000000 | ["1.00000000","800.00000000"] |
| pending_match | boolean | 새 주문이 현재 블록에 들어오고 매칭 과정이 사작되지 않았을 시, 참(true)을 반환 |  |

### 캔들스틱

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

### 주문리스트

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| order | [ [주문](#주문) ] | 주문 리스트 |  |
| total | long |  |  |

### 주문

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| cumulateQuantity | string | 발생한 총 거래량 |  |
| fee | string | 해당 주문의 최신 업데이트 블록에 대한 거래 수수료. 여러 자산은 세미콜론으로 나눠서 표현합니다. |  |
| lastExecutedPrice | string | 마지막 실행 가격 |  |
| lastExecutedQuantity | string | 마지막 실행 수량 |  |
| orderCreateTime | dateTime | 주문 생성 시각 |  |
| orderId | string | 주문 ID |  |
| owner | string | 주문 생성자 |  |
| price | string | 주문 가격 |  |
| quantity | string | 주문 수량 |  |
| side | integer | 1 - 구매  2 - 판매 |  |
| status | string | enum [Ack, PartialFill, IocNoFill, FullyFill, Canceled, Expired, FailedBlocking, FailedMatching, IocExpire] |  |
| symbol | string | 거래 쌍 심볼 |  |
| timeInForce | integer | 1 - GTE 주문  3 - IOC 주문 |  |
| tradeId | string | 거래 ID |  |
| transactionHash | string | 트랜잭션의 해시 |  |
| transactionTime | dateTime | 마지막 주문 업데이트 시간 (취소, 만료 등) |  |
| type | integer | 현재 (2 - 지정가 주문)만 가능 |  |

### SubTx

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| blockHeight | long |  |  |
| fromAddr | string |  |  |
| toAddr | string |  |  |
| txAsset | string |  |  |
| txFee | string |  |  |
| txHash | string |  |  |
| txType | string |  |  |
| value | string |  |  |

### TickerStatistics

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

### TradePage

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| total | long | 총 거래 횟수 |  |
| trade | [ [거래](#거래) ] |  |  |

### 거래

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

### BlockExchangeFeePage

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| blockExchangeFee | [ [BlockExchangeFee](#blockexchangefee) ] |  |  |
| total | long |  |  |

### BlockExchangeFee

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| address | string |  |  |
| blockHeight | long |  |  |
| blockTime | long | 블록의 타임 스탬프 |  |
| fee | string | 총 수수료. 여러 자산은 세미콜론으로 구분됩니다. |  |
| tradeCount | long | 블록에 있는 주소의 거래 건수 |  |

### TxPage

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| total | long | 트랜잭션의 총 계수 |  |
| tx | [ [Tx](#tx) ] |  |  |

### BlockTx

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| blockHeight | long | 블록 높이 |  |
| tx | [ [Tx](#tx) ] |  |  |

### BlockTxV2

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| blockHeight | long | 블록 높이 |  |
| tx | [ [TxV2](#txv2) ] |  |  |

### Tx

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| blockHeight | long | 블록 높이 |  |
| code | integer | 트랜잭션 결과 코드 | 0 |
| confirmBlocks | long |  |  |
| data | string |  |  |
| fromAddr | string | 보내는 주소 |  |
| orderId | string | 주문 ID |  |
| timeStamp | dateTime | 트랜잭션 시간 |  |
| toAddr | string | 받는 주소 |  |
| txAge | long |  |  |
| txAsset | string |  |  |
| txFee | string |  |  |
| txHash | string | 트랜잭션의 해시 |  |
| txType | string | 트랜잭션의 유형 |  |
| value | string | 트랜잭션의 값 |  |
| source | long |  |  |
| sequence | long |  |  |
| swapId | string | 선택사항. 트랜잭션 유형이 HTL_TRANSFER, CLAIM_HTL, REFUND_HTL, DEPOSIT_HTL 중 하나일 때 가능 |  |
| proposalId | string |  |  |

### ExchangeRate

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| ExchangeRate | object |  |  |

### ResultStatus

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| validator_info | [ [ValidatorInfo](#validatorinfo) ] |  |  |
| sync_info | [ [동기화정보](#동기화정보) ] |  |  |
| node_info | [ [노드정보](#노드정보) ] |  |  |

### 노드정보

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| Protocol_Version | [ [ProtocolVersion](#protocolversion) ] |  |  |
| ID | string |  |  |
| listen_addr | string |  |  |
| network | string |  |  |
| version | string |  |  |
| channels | string |  |  |
| moniker | string |  |  |
| other | object |  |  |

### 동기화정보

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| latest_block_hash | string (hex) |  |  |
| latest_app_hash | string (hex) |  |  |
| latest_block_height | long |  |  |
| latest_block_time | time |  |  |
| catching_up | boolean |  |  |

### ProtocolVersion

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| P2P | integer (uint64) |  |  |
| block | integer (uint64) |  |  |
| app | integer (uint64) |  |  |

### 검증인정보

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| address | string | hex 주소 |  |
| pub_key | string | hex 인코딩 |  |
| voting_power | long |  |  |

### AtomicSwapPage

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| atomicSwaps | [ [AtomicSwap](#atomicswap) ] |  |  |
| total | long |  |  |

### AtomicSwap

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| blockTimestamp | long | 스왑이 시작되는 블록의 타임 스탬프 단위는 밀리초 입니다. |  |
| closedTime | long |  |  |
| crossChain | integer |  |  |
| expectedIncome | string |  |  |
| expireHeight | long |  |  |
| fromAddr | string |  |  |
| inAmount | string |  |  |
| outAmount | string |  |  |
| randomNumber | string |  |  |
| randomNumberHash | string |  |  |
| recipientOtherChain | string |  |  |
| status | integer |  |  |
| swapId | string |  |  |
| timestamp | string (int64) | randomNumberHash 계산을 위한 타임 스탬프, randomNumberHash=sha256(randomNumber, timestamp). 단위는 초 입니다. |  |
| toAddr | string |  |  |

### TxV2

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

### 타임록

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| id | long | 타임록 트랜잭션의 기록 id |  |
| description | string | 타임록 트랜잭션 설명 |  |
| amount | [  ] |  |  |
| locktime | string | 가능한 잠금 해제 시간 |  |

### 미니토큰

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| name | string |  | 바이낸스 체인 미니 토큰 |
| symbol | string |  | BTC-000 |
| original_symbol | string |  | BTC |
| total_supply | string (fixed8) | 소수점 형태로, 예. 1.00000000 | 0.00000000 |
| token_type | integer | 미니 토큰 유형 |  |
| owner | string (address) | 주소 |  |
| mintable | boolean | 민팅 가능 |  |
| token_uri | string | 토큰 설명 URI |  |
| contract_address | string | 이 토큰의 스마트 계약 주소 |  |
| contract_decimals | int | 토큰 소수점 |  |
