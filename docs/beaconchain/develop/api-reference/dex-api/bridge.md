Swagger API reference for swap service
======================================
API description for swap service

**Version:** V1.0

**Contact information:**
Binance Chain

**Base URL:** api.binance.org/bridge

**Rate 제한:**  2000 request per IP per 5 mins.

### /api/v1/tokens
---
##### ***GET***
**요약:** get

**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| direction | query | In or OUT | 아니오 | string |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [TokenList](#tokenlist) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found(칮을 수 없음) |  |

### /api/v1/tokens/{symbol}/networks
---
##### ***GET***
**요약:** get

**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| symbol | path | token symbol | 예 | string |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [NetworkList](#networklist) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found(칮을 수 없음) |  |

### /api/v1/swaps
---
##### ***GET***
**요약:** find

**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| direction | query | direction | 아니오 | string |
| endTime | query | endTime | 아니오 | long |
| limit | query | limit | 아니오 | long |
| offset | query | offset | 아니오 | long |
| startTime | query | startTime | 아니오 | long |
| status | query | status | 아니오 | [ string ] |
| symbol | query | symbol | 아니오 | string |
| walletAddress | query | walletAddress | 예 | string |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [ResponseStatusBodySwapList](#responsestatusbodyswaplist) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found(칮을 수 없음) |  |

##### ***POST***
**요약:** create

**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| payload | body | payload | 예 | [SwapCreationRequest](#swapcreationrequest) |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [ResponseStatusBodySwapCreation](#responsestatusbodyswapcreation) |
| 201 | Created |  |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found(칮을 수 없음) |  |

### /api/v1/swaps/{swapId}
---
##### ***GET***
**요약:** get

**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| swapId | path | swapId | 예 | string |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [ResponseStatusBodySwapDetail](#responsestatusbodyswapdetail) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found(칮을 수 없음) |  |

### /api/v1/swaps/{swapId}/email
---
##### ***PUT***
**요약:** createEmail

**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| payload | body | payload | 예 | [EmailUpdateRequest](#emailupdaterequest) |
| swapId | path | swapId | 예 | string |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [ResponseStatus](#responsestatus) |
| 201 | Created |  |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found(칮을 수 없음) |  |

### /api/v1/swaps/quota/24hour
---
##### ***GET***
**요약:** getQuota

**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| symbol | query | symbol | 예 | string |
| walletAddress | query | walletAddress | 예 | string |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [ResponseStatusBodyQuota](#responsestatusbodyquota) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found(칮을 수 없음) |  |

### /api/v2/swaps
---
##### ***GET***
**요약:** findV2

**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| endTime | query | endTime | 아니오 | long |
| limit | query | limit | 아니오 | long |
| offset | query | offset | 아니오 | long |
| startTime | query | startTime | 아니오 | long |
| status | query | status | 아니오 | string |
| symbol | query | symbol | 아니오 | string |
| walletAddress | query | walletAddress | 예 | string |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [ResponseStatusBodySwapList](#responsestatusbodyswaplist) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found(칮을 수 없음) |  |

##### ***POST***
**요약:** createV2

**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| payload | body | payload | 예 | [SwapCreationRequestV2](#swapcreationrequestv2) |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [ResponseStatusBodySwapCreation](#responsestatusbodyswapcreation) |
| 201 | Created |  |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found(칮을 수 없음) |  |

### /api/v2/tokens
---
##### ***GET***
**요약:** getTokens

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [TokenListV2](#tokenlistv2) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found(칮을 수 없음) |  |

### /api/v2/tokens/{symbol}/networks
---
##### ***GET***
**요약:** get

**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| symbol | path | token symbol | 예 | string |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [NetworkListV2](#networklistv2) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found(칮을 수 없음) |  |

### /api/v1/unknown-deposits
---
##### ***GET***
**요약:** getUnknownDeposits

**매개 변수** 

| 이름 | 위치 | 설명 | 필수 | 스키마 |
| ---- | ---------- | ----------- | -------- | ---- |
| limit | query | limit | 아니오 | long |
| offset | query | offset | 아니오 | long |
| walletAddress | query | walletAddress | 예 | string |

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [ResponseStatusBodyDepositList](#responsestatusbodydepositlist) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found(칮을 수 없음) |  |

### /api/v2/swaps/validation/ip
---
##### ***GET***
**요약:** validateIP

**응답** 

| 코드 | 설명 | 스키마 |
| ---- | ----------- | ------ |
| 200 | OK | [ResponseStatusBodyboolean](#responsestatusbodyboolean) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found(칮을 수 없음) |  |

### Models
---

### EmailUpdateRequest

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| email | string |  |  |
| walletAddress | string |  |  |

### ResponseStatus

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| code | integer |  |  |
| message | string |  |  |

### ResponseStatusBodySwapCreation

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| code | integer |  |  |
| data | [SwapCreation](#swapcreation) |  |  |
| message | string |  |  |

### ResponseStatusBodySwapDetail

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| code | integer |  |  |
| data | [SwapDetail](#swapdetail) |  |  |
| message | string |  |  |

### SwapCreation

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| amount | number |  |  |
| createTime | dateTime |  |  |
| depositAddress | string |  |  |
| depositAddressLabel | string |  |  |
| depositTimeout | dateTime |  |  |
| direction | string |  |  |
| fromNetwork | string |  |  |
| id | string |  |  |
| networkFee | number |  |  |
| networkFeePromoted | boolean |  |  |
| status | string |  |  |
| swapFee | number |  |  |
| swapFeeRate | number |  |  |
| symbol | string |  |  |
| toAddress | string |  |  |
| toAddressLabel | string |  |  |
| toNetwork | string |  |  |
| walletAddress | string |  |  |

### SwapCreationRequest

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| amount | number |  |  |
| direction | string |  |  |
| fromNetwork | string |  |  |
| source | integer |  |  |
| symbol | string |  |  |
| toAddress | string |  |  |
| toAddressLabel | string |  |  |
| toNetwork | string |  |  |
| walletAddress | string |  |  |

### SwapDetail

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| actualFromAmount | number |  |  |
| actualNetworkFee | number |  |  |
| actualSwapFee | number |  |  |
| actualToAmount | number |  |  |
| amount | number |  |  |
| createTime | dateTime |  |  |
| depositAddress | string |  |  |
| depositAddressLabel | string |  |  |
| depositReceivedConfirms | integer |  |  |
| depositRequiredConfirms | integer |  |  |
| depositTimeout | dateTime |  |  |
| depositTxId | string |  |  |
| depositTxLink | string |  |  |
| direction | string |  |  |
| fromNetwork | string |  |  |
| id | string |  |  |
| networkFee | number |  |  |
| networkFeePromoted | boolean |  |  |
| status | string |  | [WaitingForDeposit,DepositInProgress,WithdrawInProgress,Completed,Failed,Cancelled] |
| swapFee | number |  |  |
| swapFeeRate | number |  |  |
| swapTxId | string |  |  |
| swapTxLink | string |  |  |
| symbol | string |  |  |
| toAddress | string |  |  |
| toAddressLabel | string |  |  |
| toNetwork | string |  |  |
| updateTime | dateTime |  |  |
| walletAddress | string |  |  |

### ResponseStatusBodySwapList

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| code | integer |  |  |
| data | [SwapList](#swaplist) |  |  |
| message | string |  |  |

### SwapList

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| swaps | [ [SwapDetail](#swapdetail) ] |  |  |
| total | long |  |  |

### TokenList

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| swaps | [ [TokenDetail](#tokendetail) ] |  |  |
| total | long |  |  |

### TokenListV2

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| swaps | [ [TokenDetailV2](#tokendetailv2) ] |  |  |
| total | long |  |  |

### TokenDetail

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| name | string |  |  |
| symbol | string |  |  |
| bcSymbol | string |  |  |
| icon | string |  |  |
| minAmount | number |  |  |
| maxAmount | number |  |  |
| promotion | boolean |  |  |
| enabled | boolean |  |  |
| bscContractAddress | string |  |  |
| bscContractDecimal | integer |  |  |

### TokenDetailV2

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| name | string |  |  |
| symbol | string |  |  |
| bcSymbol | string |  |  |
| ethSymbol | string |  |  |
| icon | string |  |  |
| minAmount | number |  |  |
| maxAmount | number |  |  |
| promotion | boolean |  |  |
| enabled | boolean |  |  |
| bscContractAddress | string |  |  |
| bscContractDecimal | integer |  |  |
| ethContractAddress | string |  |  |
| ethContractDecimal | integer |  |  |
| bscGasExchangeEnabled | boolean |  |  |
| bscGasExchangeNetworkFee | number |  |  |

### NetworkList

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| from | [ [NetworkDetail](#networkdetail) ] |  |  |
| to | [ [NetworkDetail](#networkdetail) ] |  |  |

### NetworkDetail

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| name | string |  |  |
| supportLabel | boolean |  |  |
| labelName | string |  |  |
| labelRegex | string |  |  |
| txUrl | number |  |  |
| enabled | boolean |  |  |
| requiredConfirms | integer |  |  |
| tokenStandard | string |  |  |

### NetworkListV2

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| from | [ [NetworkDetailV2](#networkdetailv2) ] |  |  |
| to | [ [NetworkDetailV2](#networkdetailv2) ] |  |  |

### NetworkDetailV2

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| name | string |  |  |
| symbol | string |  |  |
| swapFeeRate | number |  |  |
| networkFee | number |  |  |
| supportLabel | boolean |  |  |
| labelName | string |  |  |
| labelRegex | string |  |  |
| txUrl | number |  |  |
| depositEnabled | boolean |  |  |
| withdrawEnabled | boolean |  |  |
| withdrawAmountUnit | number |  |  |
| addressRegex | string |  |  |
| tokenStandard | string |  |  |
| requiredConfirms | integer |  |  |

### ResponseStatusBodyQuota

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| code | integer |  |  |
| data | [Quota](#quota) |  |  |
| message | string |  |  |

### Quota

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| left | number |  |  |
| total | number |  |  |
| used | number |  |  |

### SwapCreationRequestV2

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| amount | number |  |  |
| exchangeGasAmount | number |  | 0.5,1,2 |
| fromNetwork | string |  |  |
| source | integer |  |  |
| symbol | string |  |  |
| toAddress | string |  |  |
| toAddressLabel | string |  |  |
| toNetwork | string |  |  |
| walletAddress | string |  |  |
| walletNetwork | string |  |  |

### ResponseStatusBodyDepositList

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| code | integer |  |  |
| data | [DepositList](#depositlist) |  |  |
| message | string |  |  |

### Deposit

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| amount | number |  |  |
| confirmTimes | integer |  |  |
| depositTime | long |  |  |
| depositTxUrl | string |  |  |
| fromAddress | string |  |  |
| label | string |  |  |
| network | string |  |  |
| refundId | string |  |  |
| refundMessage | string |  |  |
| refundStatus | string |  |  |
| refundTx | string |  |  |
| refundTxUrl | string |  |  |
| status | string |  |  |
| swapId | string |  |  |
| toAddress | string |  |  |
| tokenSymbol | string |  |  |
| txId | string |  |  |

### DepositList

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| deposits | [ [Deposit](#deposit) ] |  |  |
| total | long |  |  |

### ResponseStatusBodyboolean

| 이름 |유형 | 설명 | 예시 |
| ---- | ---- | ----------- | ------- |
| code | integer |  |  |
| data | boolean |  |  |
| message | string |  |  |