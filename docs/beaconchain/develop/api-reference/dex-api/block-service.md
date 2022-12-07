# 블록 서비스의 API 레퍼런스
블록과 트랜잭션 서비스를 위한 API 설명

## 버전: V1.0
메인넷 기초 경로: <https://api.binance.org/bc/>

테스트넷 기초 경로: <https://testnet-api.binance.org/bc/>

### /api/v1/blocks

#### GET
##### 요약

수수료를 포함한 블록의 집단을 가져옵니다.

Rate 제한: 한 IP당 5분에 500개 응답.

##### 매개 변수

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| endHeight | query | 블록 높이의 끝, 끝 높이-시작 높이 <= 50 | 예 | long |
| startHeight | query |블록 높이의 시작, 시작 높이가 0보다 커야 합니다 | 예 | long |

##### 응답

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [BlocksVO](#blocksvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found(칮을 수 없음) |  |

### /api/v1/blocks/{blockHeight}

#### GET
##### 요약

특정 블록 높이의 (수수료를 포함한) 블록을 가져옵니다.

Rate Limit: 한 IP당 5분에 1500개 응답 (`/api/v1/blocks/{blockHeight}/txs`와 함께).

##### 매개 변수

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| blockHeight | path | 블록의 높이 | 예 | long |

##### 응답

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [BlockVO](#blockvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found(칮을 수 없음) |  |

### /api/v1/blocks/{blockHeight}/txs

#### GET
##### 요약

특정 블록 높이의 트랜잭션을 가져옵니다

Rate 제한: 한 IP당 5분에 1500개 응답 (`/api/v1/blocks/{blockHeight}`와 함께).

##### 매개 변수

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| blockHeight | path | 블록의 높이 | 예 | long |

##### Responses

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [TxsVO](#txsvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found(칮을 수 없음) |  |

### /api/v1/txs

#### GET
##### 요약

기준에 맞는 트랜잭션을 탐색합니다.

Rate 제한: 한 IP당 5분에 500개 응답. (자세한 사항은 아래를 참고하세요).

##### 매개 변수

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| address | query | address | 예 | string |
| addressType | query | 주소 타입: FROM이나 TO | 아니오 | string |
| asset | query | asset | 아니오 | string |
| endTime | query | 밀리초로 표현되는 종료 시간, endTime - startTime는 7일보다 짧아야합니다 | 예 | long |
| limit | query | 기본 10, 최대 50 | 아니오 | integer |
| offset | query | 기본 0, 최대 10000 | 아니오 | integer |
| startTime | query | 시작 시간 (밀리초) | 예 | long |
| type | query | type | 아니오 | string |

참고:
1. endTime과 startTime 사이 시간은 7일보다 작아야 합니다. 시간 간격이 짧을 수록 더 빠른 응답을 받으며, 긴 시간 간격은 더 엄격한 rate 제한이 적용됩니다.
2. 타입: NEW_ORDER, ISSUE_TOKEN, BURN_TOKEN, LIST_TOKEN, CANCEL_ORDER, FREEZE_TOKEN, UN_FREEZE_TOKEN, TRANSFER, PROPOSAL, SIDE_PROPOSAL, VOTE, SIDE_VOTE, DEPOSIT, SIDE_DEPOSIT, MINT, CREATE_VALIDATOR, REMOVE_VALIDATOR, TIME_LOCK, TIME_UNLOCK, TIME_RELOCK, SET_ACCOUNT_FLAG, HTL_TRANSFER, DEPOSIT_HTL, CLAIM_HTL, REFUND_HTL, CREATE_SIDECHAIN_VALIDATOR, EDIT_SIDECHAIN_VALIDATOR, SIDECHAIN_DELEGATE, SIDECHAIN_REDELEGATE, SIDECHAIN_UNDELEGATE, ORACLE_CLAIM, CROSS_TRANSFER_OUT, CROSS_BIND, CROSS_UNBIND, BSC_SUBMIT_EVIDENCE, SIDECHAIN_UNJAIL, TRANSFER_TOKEN_OWNERSHIP, TINY_TOKEN_ISSUE, MINI_TOKEN_ISSUE, MINI_TOKEN_LIST, MINI_TOKEN_SET_URI
3. 주소 타입: FROM or TO

##### 응답

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [TxsVO](#txsvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found(칮을 수 없음) |  |

### /api/v1/txs/{txHash}

#### GET
##### 요약

해시를 통해 트랜잭션을 가져옵니다.

Rate 제한: 한 IP당 5분에 1500개 응답.

##### 매개 변수

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| txHash | path | tx의 해시 | 예 | string |

##### 응답

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [TxVO](#txvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found(칮을 수 없음) |  |

### 모델

#### BlockVO

|이름 | 타입 | 설명 | 필수 |
| ---- | ---- | ----------- | -------- |
| consumeTime | long | 마지막 블록에서 흐른 시간   | 아니오 |
| fees | [ [FeeVO](#feevo) ] | fees | 아니오 |
| hash | string | block hash | 아니오 |
| height | long | 블록 높이 | 아니오 |
| parentHash | string | 블록의 부모 해시  | 아니오 |
| proposerAddr | string | 블록의 제안자 주소 | 아니오 |
| proposerNode | string | 제안자 이름 | 아니오 |
| size | long | 사이즈 | 아니오 |
| time | long | 블록 타임스탬프 | 아니오 |
| txCount | integer | 블록에 있는 트랜잭션 개수 | 아니오 |

#### BlocksVO

|이름 | 타입 | 설명 | 필수 |
| ---- | ---- | ----------- | -------- |
| blocks | [ [BlockVO](#blockvo) ] | 블록들 | 아니오 |

#### FeeVO

|이름 | 타입 | 설명 | 필수 |
| ---- | ---- | ----------- | -------- |
| address | string | 주소 | 아니오 |
| asset | string | 수수료 자산 | 아니오 |
| blockHeight | long | 블록의 높이 | 아니오 |
| quantity | long | 자산의 양 | 아니오 |

#### FeesVO

|이름 | 타입 | 설명 | 필수 |
| ---- | ---- | ----------- | -------- |
| fees | [ [FeeVO](#feevo) ] | 수수료 | 아니오 |

#### TxVO

|이름 | 타입 | 설명 | 필수 |
| ---- | ---- | ----------- | -------- |
| amount | long | 자산의 규모 | 아니오 |
| asset | string | 자산 | 아니오 |
| blockHeight | long | 블록의 높이 | 아니오 |
| blockTime | long | 블록의 타임스탬프 | 아니오 |
| code | integer | 코드 | 아니오 |
| data | string | 다른 tx 유형에 대한 다른 스키마 | 아니오 |
| fee | long | fee | 아니오 |
| fromAddr | string | 보내는 주소 | 아니오 |
| hash | string | tx의 해시 | 아니오 |
| log | string | 로그 | 아니오 |
| memo | string | 메모 | 아니오 |
| sequence | long | 시퀸스 | 아니오 |
| source | long | source | 아니오 |
| toAddr | string | 받는 주소 | 아니오 |
| type | string | tx 타입 | 아니오 |

#### TxsVO

|이름 | 타입 | 설명 | 필수 |
| ---- | ---- | ----------- | -------- |
| total | long | tx 총 개수 | 아니오 |
| txs | [ [TxVO](#txvo) ] | txs | 아니오 |