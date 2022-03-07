# API reference for block service
API description for block and transaction service

## Version: V1.0
Mainnet base path: <https://api.binance.org/bc/>

Testnet base path: <https://testnet-api.binance.org/bc/>

### /api/v1/blocks

#### GET
##### Summary

Get a batch of blocks, including fees.

Rate Limit: 500 request per IP in 5 minutes.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| endHeight | query | end of block height, endHeight-startHeight <= 50 | Yes | long |
| startHeight | query | start of block height, startHeight should bigger than 0 | Yes | long |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [BlocksVO](#blocksvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /api/v1/blocks/{blockHeight}

#### GET
##### Summary

Get a block, including fees, for a particular block height.

Rate Limit: in together with `/api/v1/blocks/{blockHeight}/txs` 1500 request per IP in 5 minutes.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| blockHeight | path | height of block | Yes | long |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [BlockVO](#blockvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /api/v1/blocks/{blockHeight}/txs

#### GET
##### Summary

Get transactions in a particular block height.

Rate Limit: in together with `/api/v1/blocks/{blockHeight}` 1500 request per IP in 5 minutes.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| blockHeight | path | height of block | Yes | long |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [TxsVO](#txsvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /api/v1/txs

#### GET
##### Summary

Search transactions by criteria.

Rate Limit: 500 request per IP in 5 minutes (please read notes for more detials).

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| address | query | address | Yes | string |
| addressType | query | address type: FROM or TO | No | string |
| asset | query | asset | No | string |
| endTime | query | end time in in milliseconds, endTime - startTime should be smaller than 7 days | Yes | long |
| limit | query | default 10, max 50 | No | integer |
| offset | query | default 0, max 10000 | No | integer |
| startTime | query | start time in milliseconds | Yes | long |
| type | query | type | No | string |

Notes:
1. The timeframe between endTime and startTime should be less than 7 days. The shorter timeframe will get faster response, and longer timeframe will trigger more strict rate limiter.
2. type: NEW_ORDER, ISSUE_TOKEN, BURN_TOKEN, LIST_TOKEN, CANCEL_ORDER, FREEZE_TOKEN, UN_FREEZE_TOKEN, TRANSFER, PROPOSAL, SIDE_PROPOSAL, VOTE, SIDE_VOTE, DEPOSIT, SIDE_DEPOSIT, MINT, CREATE_VALIDATOR, REMOVE_VALIDATOR, TIME_LOCK, TIME_UNLOCK, TIME_RELOCK, SET_ACCOUNT_FLAG, HTL_TRANSFER, DEPOSIT_HTL, CLAIM_HTL, REFUND_HTL, CREATE_SIDECHAIN_VALIDATOR, EDIT_SIDECHAIN_VALIDATOR, SIDECHAIN_DELEGATE, SIDECHAIN_REDELEGATE, SIDECHAIN_UNDELEGATE, ORACLE_CLAIM, CROSS_TRANSFER_OUT, CROSS_BIND, CROSS_UNBIND, BSC_SUBMIT_EVIDENCE, SIDECHAIN_UNJAIL, TRANSFER_TOKEN_OWNERSHIP, TINY_TOKEN_ISSUE, MINI_TOKEN_ISSUE, MINI_TOKEN_LIST, MINI_TOKEN_SET_URI
3. addressType: FROM or TO

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [TxsVO](#txsvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### /api/v1/txs/{txHash}

#### GET
##### Summary

Get a transaction by a hash.

Rate Limit: 1500 request per IP in 5 minutes.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| txHash | path | hash of tx | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [TxVO](#txvo) |
| 401 | Unauthorized |  |
| 403 | Forbidden |  |
| 404 | Not Found |  |

### Models

#### BlockVO

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| consumeTime | long | elapsed time from last block   | No |
| fees | [ [FeeVO](#feevo) ] | fees | No |
| hash | string | block hash | No |
| height | long | block height | No |
| parentHash | string | block's parent hash  | No |
| proposerAddr | string | proposer's address of the block | No |
| proposerNode | string | proposer's name | No |
| size | long | size | No |
| time | long | block timestamp | No |
| txCount | integer | the count of tx in the block | No |

#### BlocksVO

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| blocks | [ [BlockVO](#blockvo) ] | blocks | No |

#### FeeVO

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| address | string | address | No |
| asset | string | fee asset | No |
| blockHeight | long | height of block | No |
| quantity | long | quantity of the asset | No |

#### FeesVO

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| fees | [ [FeeVO](#feevo) ] | fees | No |

#### TxVO

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| amount | long | amount of the asset | No |
| asset | string | asset | No |
| blockHeight | long | height of the block | No |
| blockTime | long | timestamp of the block | No |
| code | integer | code | No |
| data | string | different schemas for different tx types | No |
| fee | long | fee | No |
| fromAddr | string | from address | No |
| hash | string | hash of the tx | No |
| log | string | log | No |
| memo | string | memo | No |
| sequence | long | sequence | No |
| source | long | source | No |
| toAddr | string | to address | No |
| type | string | tx type | No |

#### TxsVO

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| total | long | total count of txs | No |
| txs | [ [TxVO](#txvo) ] | txs | No |