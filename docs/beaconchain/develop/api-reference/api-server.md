API Server
========

API 서버 데몬

> `api-server`를 시작하기 전에 로컬에서 주소를 생생했는지 확인하세요. 생성하지 않았을 경우 다음과 같은 오류가 발생합니다:

```
panic: stat /Users/user/.bnbcli/keys/keys.db: no such file or directory

goroutine 1 [running]:
github.com/binance-chain/node/plugins/api.newServer(0xc000c12230, 0xc0000a96d0, 0x4e3e600, 0xc0001a0ec0, 0x4e10180, 0xc000010010, 0x0, 0x7ffeefbff802, 0x27, 0x0, ...)
/Users/b/Documents/go/src/github.com/binance-chain/node/plugins/api/server.go:39 +0x28b
github.com/binance-chain/node/plugins/api.ServeCommand.func1(0xc000c27d40, 0xc000c12690, 0x0, 0x7, 0x0, 0x0)
/Users/b/Documents/go/src/github.com/binance-chain/node/plugins/api/cli.go:34 +0x1b3
github.com/binance-chain/node/vendor/github.com/spf13/cobra.(*Command).execute(0xc000c27d40, 0xc000c12620, 0x7, 0x7, 0xc000c27d40, 0xc000c12620)
/Users/b/Documents/go/src/github.com/binance-chain/node/vendor/github.com/spf13/cobra/command.go:698 +0x431
github.com/binance-chain/node/vendor/github.com/spf13/cobra.(*Command).ExecuteC(0x55f9fc0, 0x48110ef, 0x55f9fc0, 0x4b81beb)
/Users/b/Documents/go/src/github.com/binance-chain/node/vendor/github.com/spf13/cobra/command.go:783 +0x29f
github.com/binance-chain/node/vendor/github.com/spf13/cobra.(*Command).Execute(...)
```

플랫폼에 맞춰 API 서버를 시작해주세요

Replace the `platform` 변수를 variable with `mac`, `windows` or `linux` in the following command:

```bash
./{{platform}}/bnbcli api-server --chain-id "{chain-id}" --node tcp://{full node addr}:80 --laddr localhost:8080
```

#### 메인넷 예시:

```bash
./bnbcli api-server --chain-id "Binance-Chain-Tigris" --node tcp://dataseed1.binance.org:80 --laddr tcp://127.0.0.1:8080 --trust-node
```

### 테스트넷 예시:

```bash
./tbnbcli api-server --chain-id "Binance-Chain-Ganges" --node tcp://data-seed-pre-0-s1.binance.org:80 --laddr tcp://127.0.0.1:8080 --trust-node
```

### /version
---
##### ***GET***
**요약:** 블록체인 버전을 가져옵니다.

**설명:**  연결되어 있는 풀 노드의 블록체인 버전을 가져옵니다.

**예시**

```
http://localhost:8080/version
```



### /api/v1/account/{address}
---
##### ***GET***
**요약:** 계정을 가져옵니다.

**설명:**  주소에 대한 계정 메타데이터를 가져옵니다.

**메인넷 예시**
```
http://localhost:8080/api/v1/account/bnb1g9rzc0e2jf8ef3qp9ax8h0pmpmvjzwmtwqmzfj
```

**테스트넷 예시**
```
http://localhost:8080/api/v1/account/tbnb1ke87gxdtsk32kuaqxj6skhhmn79ma89cx2ep4g
```

**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| address | path | 쿼리할 계정 주소 | 예 | string |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [계정](#계정) |
| 500 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |




### /api/v1/markets
---
##### ***GET***
**요약:** 마켓 쌍을 가져옵니다.

**설명:**  상장된 마켓 쌍 리스트 가져오기.

**메인넷 예시**
```
http://localhost:8080/api/v1/markets
```

**테스트넷 예시**

```
http://localhost:8080/api/v1/markets
```

**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| limit | query | default 100; max 1000. | 아니오 | integer |
| offset | query | 0으로 시작; 기본 0. | 아니오 | integer |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [ [Market](#market) ] |
| 500 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |


### /api/v1/depth
---
##### ***GET***
**요약:** 오더 북을 가져옵니다.

**설명:**  주어진 심볼 쌍에 대한 오더 북 깊이 데이터를 가져옵니다.


**메인넷 예시**
```
http://localhost:8080/api/v1/depth?symbol=SPNDB-916_BNB
```
**테스트넷 예시**

```
http://localhost:8080/api/v1/depth?symbol=GEOP-152_BNB
```
**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| symbol | query | 마켓 쌍 심볼, 예. NNB-0AD_BNB | 예 | string |
| limit | query | The limit of results. Default: 100 Allowed limits: [5, 10, 20, 50, 100] | 아니오 | integer |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [MarketDepth](#marketdepth) |
| 500 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |


### /api/v1/orders/open
---
##### ***GET***
**요약:** 열린 주문을 가져옵니다.

**설명:**  주어진 주소에 대한 열린 주문을 가져옵니다.


**메인넷 예시**
```
http://localhost:8080/api/v1/orders/open?address=bnb1g9rzc0e2jf8ef3qp9ax8h0pmpmvjzwmtwqmzfj&symbol=SPNDB-916_BNB

```
**테스트넷 예시**

```
http://localhost:8080/api/v1/orders/open?address=tbnb1g9rzc0e2jf8ef3qp9ax8h0pmpmvjzwmtq4jxfr&symbol=TEST-599_BNB
```
**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| address | query | 소유자 주소 | 예 | string |
| limit | query | default 100; max 1000. | 아니오 | integer |
| offset | query | 0으로 시작; 기본 0. | 아니오 | integer |
| symbol | query | symbol | 아니오 | string |
| total | query | total number required, 0 for not required and 1 for required; default not required, return total =-1 in response | 아니오 | integer |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [OrderList](#orderlist) |
| 500 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v1/tokens
---
##### ***GET***
**요약:** 토큰 리스트 가져오기.

**설명:**  발행된 토큰 리스트 가져오기.

**메인넷 예시**
```
http://localhost:8080/api/v1/tokens
```

**테스트넷 예시**

```
http://localhost:8080/api/v1/tokens
```

**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| limit | query | default 100; max 1000. | 아니오 | integer |
| offset | query | 0으로 시작; 기본 0. | 아니오 | integer |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [ [Token](#token) ] |
| 500 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v1/tokens/{symbol}
---
##### ***GET***
**요약:** 토큰 정보를 가져옵니다.

**설명:**  토큰 정보를 가져옵니다.

**메인넷 예시**
```
http://localhost:8080/api/v1/tokens/SPNDB-916
```

**테스트넷 예시**

```
http://localhost:8080/api/v1/tokens/TEST-599
```


**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [ [Token](#token) ] |
| 500 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v1/balance/{address}
---
##### ***GET***
**요약:** 주소의 계정 잔고를 가져옵니다.

**설명:**  주소의 계정 잔고를 가져옵니다.

**메인넷 예시**
```
http://localhost:8080/api/v1/balances/bnb1qwugqccfrefqyg9kgm0st8szjf8mmgkmvyt76lv9
```

**테스트넷 예시**

```
http://localhost:8080/api/v1/balances/tbnb1g9rzc0e2jf8ef3qp9ax8h0pmpmvjzwmtq4jxfr
```


**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) |  [Balance](#balances) |
| 500 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v1/balance/{address}/{symbol}
---
##### ***GET***
**요약:** 주소에 있는 특정 토큰에 대한 잔고를 가져옵니다.

**설명:**  주소에 있는 특정 토큰에 대한 잔고를 가져옵니다.

**메인넷 예시**
```
http://localhost:8080/api/v1/balances/bnb1qwugqccfrefqyg9kgm0st8szjf8mmgkmvyt76lv9/BNB
```

**테스트넷 예시**

```
http://localhost:8080/api/v1/balances/tbnb1g9rzc0e2jf8ef3qp9ax8h0pmpmvjzwmtq4jxfr/BNB
```


**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) |  [Balance](#balances) |
| 500 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |


### /api/v1/fees
---
##### ***GET***
**요약:** 거래 수수료 정보 가져옵니다.,

**설명:**  현재 거래 수수료 정보 설정 가져옵니다.

**메인넷 예시**
```
http://localhost:8080/api/v1/fees
```

**테스트넷 예시**

```
http://localhost:8080/api/v1/fees
```

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [ [Fee](#fee) ] |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |


### /api/v1/validators
---
##### ***GET***
**요약:** 검증인을 가져옵니다.

**설명:**  합의에 참여하는 검증인의 리스트를 가져옵니다.

**메인넷 예시**
```
http://localhost:8080/api/v1/stake/validators
```

**테스트넷 예시**

```
http://localhost:8080/api/v1/stake/validators
```

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [ [검증인들](#검증인들) ] |
| 400 | Bad Request(잘못된 요청) | [에러](#에러). |
| 404 | Not Found(칮을 수 없음) |  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |


### /api/v1/timelock/timelocks/{address}
---
##### ***GET***
**요약:**주소의 모든 타임록 기록을 가져옵니다.

**설명:**  주소의 모든 타임록 기록 리스트를 가져옵니다.

**메인넷 예시**
```
http://localhost:8080/api/v1/timelock/timelocks/bnb1ycuzfx8cxpqmleu7z64uys9wx5ntcujre2knpc
```

**테스트넷 예시**

```
http://localhost:8080/api/v1/timelock/timelocks/tbnb1g9rzc0e2jf8ef3qp9ax7h0pmpmvjzwmtq4jxfr
```

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [TimelockList](#TimelockList)  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |

### /api/v1/timelock/timelock/{address}/{id}
---
##### ***GET***
**요약:** 주소의 타임록 기록을 가져옵니다.

**설명:**  주소의 \타임록 기록을 가져옵니다.

**메인넷 예시**
```
http://localhost:8080/api/v1/timelock/timelock/bnb1ycuzfx8cxpqmleu7z54uys9wx5ntcujre2knpc/1
```

**테스트넷 예시**

```
http://localhost:8080/api/v1/timelock/timelock/tbnb1g9rzc0e2jf7ef3qp9ax8h0pmpmvjzwmtq4jxfr/1
```

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | Success(성공) | [Timelock](#Timelock)  |
| default | Generic error response(일반 오류 응답) | [에러](#에러). |


### 계정

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| account_number | integer |  |  |
| address | string (address) |  |  |
| balances | [ [잔고](#잔고) ] |  |  |
| public_key | [ integer ] | 공개 키 바이트 수 |  |
| sequence | long | 시퀸스는 재생 공격을 방지합니다 |  |


### 잔고들

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| address | string (address) |  |  |
| balances | [ [잔고](#잔고) ] |  |  |


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

### 마켓

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| base_asset_symbol | string (currency) | 기초 자산 심볼 | BNB |
| quote_asset_symbol | string (currency) | 견적 자산 심볼 | ABC-5CA |
| price | string (fixed8) | 소수점 형태로, 예. 1.00000000 | 0.00000000 |
| tick_size | string (fixed8) | Minimum price change 소수점 형태로, 예. 1.00000000 | 0.00000001 |
| lot_size | string (fixed8) | Minimum trading quantity 소수점 형태로, 예. 1.00000000 | 0.000001 |

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


### 에러

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| code | long | 에러 코드 | 400 |
| message | string | 에러 메세지 |  |

### MarketDepth

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| asks | [ string (fixed8) ] | 가격 및 수량 소수점 형태로, 예. 1.00000000 | ["1.00000000","800.00000000"] |
| bids | [ string (fixed8) ] | 가격 및 수량 소수점 형태로, 예. 1.00000000 | ["1.00000000","800.00000000"] |

### 주문리스트

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| order | [ [주문](#주문) ] | 주문 리스트 |  |
| total | long |  |  |

### 주문

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| cumulateQuantity | string |  |  |
| fee | string | 이 주문이 포함된 블록의 거래수수료 |  |
| lastExecutedPrice | string | 마지막 실행 가격 |  |
| lastExecutedQuantity | string | 마지막 실행 수량 |  |
| orderCreateTime | dateTime | 주문 생성 시각 |  |
| orderId | string | 주문 ID |  |
| owner | string | 주문 생성자 |  |
| price | string | 주문 가격 |  |
| quantity | string | 주문 수량 |  |
| side | integer | 1 - 구매  2 - 판매 |  |
| status | string | enum [Ack, PartialFill, IocNoFill, FullyFill, Canceled, Expired, FailedBlocking, FailedMatching, IocExpire] |  |
| symbol | string |  |  |
| timeInForce | integer | 1 - GTE 주문  3 - IOC 주문 |  |
| tradeId | string | 거래 ID |  |
| transactionHash | string |  |  |
| transactionTime | dateTime | 트랜잭션 시간 |  |
| type | integer | 현재 (2 - 지정가 주문)만 가능 |  |

### 타임록리스트

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| Timelocks | [ [타임록](#타임록) ] | list of timelock records |  |

#### 타임록
| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| ID | integer |  |  |
| description | string |  |  |
| amount | [코인](#코인) |  |  |
| locktime | timestamp |  |  |


#### 코인
| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| denom | string |  |  |
| amount | int |  |  |
