Swagger API reference for swap service
======================================
API description for swap service

**Version:** V1.0

**Contact information:**
Binance Chain

**Base URL:** api.binance.org/bridge

**Rate Limit:** 2000 request per IP per 5 mins.

### /api/v1/tokens
---
##### ***GET***
**Summary:** get

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| direction | query | In or OUT | No | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [TokenList](#tokenlist) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /api/v1/tokens/{symbol}/networks
---
##### ***GET***
**Summary:** get

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| symbol | path | token symbol | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [NetworkList](#networklist) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /api/v1/swaps
---
##### ***GET***
**Summary:** find

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| direction | query | direction | No | string |
| endTime | query | endTime | No | long |
| limit | query | limit | No | long |
| offset | query | offset | No | long |
| startTime | query | startTime | No | long |
| status | query | status | No | [ string ] |
| symbol | query | symbol | No | string |
| walletAddress | query | walletAddress | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ResponseStatusBodySwapList](#responsestatusbodyswaplist) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

##### ***POST***
**Summary:** create

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| payload | body | payload | Yes | [SwapCreationRequest](#swapcreationrequest) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ResponseStatusBodySwapCreation](#responsestatusbodyswapcreation) |
| 201 | Created |  |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /api/v1/swaps/{swapId}
---
##### ***GET***
**Summary:** get

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| swapId | path | swapId | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ResponseStatusBodySwapDetail](#responsestatusbodyswapdetail) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /api/v1/swaps/{swapId}/email
---
##### ***PUT***
**Summary:** createEmail

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| payload | body | payload | Yes | [EmailUpdateRequest](#emailupdaterequest) |
| swapId | path | swapId | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ResponseStatus](#responsestatus) |
| 201 | Created |  |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /api/v1/swaps/quota/24hour
---
##### ***GET***
**Summary:** getQuota

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| symbol | query | symbol | Yes | string |
| walletAddress | query | walletAddress | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ResponseStatusBodyQuota](#responsestatusbodyquota) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /api/v2/swaps
---
##### ***GET***
**Summary:** findV2

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| endTime | query | endTime | No | long |
| limit | query | limit | No | long |
| offset | query | offset | No | long |
| startTime | query | startTime | No | long |
| status | query | status | No | string |
| symbol | query | symbol | No | string |
| walletAddress | query | walletAddress | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ResponseStatusBodySwapList](#responsestatusbodyswaplist) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

##### ***POST***
**Summary:** createV2

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| payload | body | payload | Yes | [SwapCreationRequestV2](#swapcreationrequestv2) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ResponseStatusBodySwapCreation](#responsestatusbodyswapcreation) |
| 201 | Created |  |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /api/v2/tokens
---
##### ***GET***
**Summary:** getTokens

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [TokenListV2](#tokenlistv2) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /api/v2/tokens/{symbol}/networks
---
##### ***GET***
**Summary:** get

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| symbol | path | token symbol | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [NetworkListV2](#networklistv2) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /api/v1/unknown-deposits
---
##### ***GET***
**Summary:** getUnknownDeposits

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| limit | query | limit | No | long |
| offset | query | offset | No | long |
| walletAddress | query | walletAddress | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ResponseStatusBodyDepositList](#responsestatusbodydepositlist) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /api/v2/swaps/validation/ip
---
##### ***GET***
**Summary:** validateIP

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ResponseStatusBodyboolean](#responsestatusbodyboolean) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### Models
---

### EmailUpdateRequest

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| email | string |  |  |
| walletAddress | string |  |  |

### ResponseStatus

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| code | integer |  |  |
| message | string |  |  |

### ResponseStatusBodySwapCreation

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| code | integer |  |  |
| data | [SwapCreation](#swapcreation) |  |  |
| message | string |  |  |

### ResponseStatusBodySwapDetail

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| code | integer |  |  |
| data | [SwapDetail](#swapdetail) |  |  |
| message | string |  |  |

### SwapCreation

| Name | Type | Description | Example |
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

| Name | Type | Description | Example |
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

| Name | Type | Description | Example |
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

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| code | integer |  |  |
| data | [SwapList](#swaplist) |  |  |
| message | string |  |  |

### SwapList

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| swaps | [ [SwapDetail](#swapdetail) ] |  |  |
| total | long |  |  |

### TokenList

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| swaps | [ [TokenDetail](#tokendetail) ] |  |  |
| total | long |  |  |

### TokenListV2

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| swaps | [ [TokenDetailV2](#tokendetailv2) ] |  |  |
| total | long |  |  |

### TokenDetail

| Name | Type | Description | Example |
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

| Name | Type | Description | Example |
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

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| from | [ [NetworkDetail](#networkdetail) ] |  |  |
| to | [ [NetworkDetail](#networkdetail) ] |  |  |

### NetworkDetail

| Name | Type | Description | Example |
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

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| from | [ [NetworkDetailV2](#networkdetailv2) ] |  |  |
| to | [ [NetworkDetailV2](#networkdetailv2) ] |  |  |

### NetworkDetailV2

| Name | Type | Description | Example |
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

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| code | integer |  |  |
| data | [Quota](#quota) |  |  |
| message | string |  |  |

### Quota

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| left | number |  |  |
| total | number |  |  |
| used | number |  |  |

### SwapCreationRequestV2

| Name | Type | Description | Example |
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

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| code | integer |  |  |
| data | [DepositList](#depositlist) |  |  |
| message | string |  |  |

### Deposit

| Name | Type | Description | Example |
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

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| deposits | [ [Deposit](#deposit) ] |  |  |
| total | long |  |  |

### ResponseStatusBodyboolean

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| code | integer |  |  |
| data | boolean |  |  |
| message | string |  |  |