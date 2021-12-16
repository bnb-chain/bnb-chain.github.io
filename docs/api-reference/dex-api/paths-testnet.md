HTTP API
========
Within the ecosystem of Binance Chain, there are several accelerated nodes which provides more secure and faster lines to access Binance Chain and DEX data service including HTTP API.


For testnet, there are 2 accelerated nodes setup as below. API users should try to use them directly.

* testnet-dex-atlantic.binance.org

* testnet-dex-asiapacific.binance.org


**Version:** 1.0.0

**License:** [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

### /api/v1/time
---
##### ***GET***
**Summary:** Get the block time.

**Description:** Gets the latest block time and the current time according to the HTTP service.

**Destination:** Validator node.

**Rate Limit:** 1 request per IP per second.

**URL for testnet:** [https://testnet-dex.binance.org/api/v1/time](https://testnet-dex.binance.org/api/v1/time)


**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [Times](#times) |
| 400 | Bad Request | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |

### /api/v1/node-info
---
##### ***GET***
**Summary:** Get node information.

**Description:** Gets runtime information about the node.

**Destination:** Validator node.

**Rate Limit:** 1 request per IP per second.

**URL for testnet:** [https://testnet-dex.binance.org/api/v1/node-info](https://testnet-dex.binance.org/api/v1/node-info)


**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [ResultStatus](#resultstatus) |

### /api/v1/validators
---
##### ***GET***
**Summary:** Get validators.

**Description:** Gets the list of validators used in consensus.

**Destination:** Witness node.

**Rate Limit:** 10 requests per IP per second.

**URL for testnet:** [https://testnet-dex.binance.org/api/v1/validators](https://testnet-dex.binance.org/api/v1/validators)


**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [ [Validators](#validators) ] |
| 400 | Bad Request | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |

### /api/v1/peers
---
##### ***GET***
**Summary:** Get network peers.

**Description:** Gets the list of network peers.

**Destination:** Witness node.

**Rate Limit:** 1 request per IP per second.

**URL for testnet:** [https://testnet-dex.binance.org/api/v1/peers](https://testnet-dex.binance.org/api/v1/peers)


**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [ [Peer](#peer) ] |
| 400 | Bad Request | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |

### /api/v1/account/{address}
---
##### ***GET***
**Summary:** Get an account.

**Description:** Gets account metadata for an address.

**Destination:** Witness node.

**Rate Limit:** 5 requests per IP per second.

**URL for testnet:** [https://testnet-dex.binance.org/api/v1/account/tbnb185tqzq3j6y7yep85lncaz9qeectjxqe5054cgn](https://testnet-dex.binance.org/api/v1/account/tbnb185tqzq3j6y7yep85lncaz9qeectjxqe5054cgn)


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| address | path | The account address to query | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [Account](#account) |
| 400 | Bad Request | [Error](#error) |
| 404 | Not Found | [Error](#error) |
| default | Generic error response | [Error](#error) |

### /api/v1/account/{address}/sequence
---
##### ***GET***
**Summary:** Get an account sequence.

**Description:** Gets an account sequence for an address.

**Destination:** Validator node.

**Rate Limit:** 5 requests per IP per second.

**URL for testnet:** [https://testnet-dex.binance.org/api/v1/account/tbnb13g2le062t340klgm2l2khzr57y3qxlekuhfuch/sequence](https://testnet-dex.binance.org/api/v1/account/tbnb13g2le062t340klgm2l2khzr57y3qxlekuhfuch/sequence)


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| address | path | The account address to query | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [AccountSequence](#accountsequence) |
| 400 | Bad Request | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |

### /api/v1/tx/{hash}
---
##### ***GET***
**Summary:** Get a transaction.

**Description:** Gets transaction metadata by transaction ID. By default, transactions are returned in a raw format. You may add `?format=json` to the end of the path to obtain a more readable response.

**Destination:** Seed node.

**Rate Limit:** 10 requests per IP per second.

**Example:**

Below is an example response of a send transaction when `?format=json` is used.
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


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| hash | path | The transaction hash to query | Yes | string |
| format | query | Response format (`json` or amino) | No | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 0 | Success | [Transaction](#transaction) |
| 404 | Not Found |  |
| 500 | Bad Request | [Error](#error) |
| default | Generic error response | [Error](#error) |

### /api/v1/tokens
---
##### ***GET***
**Summary:** Get tokens list.

**Description:** Gets a list of tokens that have been issued.

**Destination:** Witness node.

**Rate Limit:** 1 request per IP per second.

**URL for testnet:** [https://testnet-dex.binance.org/api/v1/tokens](https://testnet-dex.binance.org/api/v1/tokens)


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| limit | query | default 100. | No | integer |
| offset | query | start with 0; default 0. | No | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [ [Token](#token) ] |
| 400 | Bad Request | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |

### /api/v1/markets
---
##### ***GET***
**Summary:** Get market pairs.

**Description:** Gets the list of market pairs that have been listed.

**Destination:** Witness node.

**Rate Limit:** 1 request per IP per second.

**URL for testnet:** [https://testnet-dex.binance.org/api/v1/markets](https://testnet-dex.binance.org/api/v1/markets)


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| limit | query | default 500; max 1000. | No | integer |
| offset | query | start with 0; default 0. | No | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [ [Market](#market) ] |
| 400 | Bad Request | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |

### /api/v1/fees
---
##### ***GET***
**Summary:** Obtain trading fees information.

**Description:** Gets the current trading fees settings.

**Destination:** Witness node.

**Rate Limit:** 1 request per IP per second.

**URL for testnet:** [https://testnet-dex.binance.org/api/v1/fees](https://testnet-dex.binance.org/api/v1/fees)


**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [ [Fee](#fee) ] |
| default | Generic error response | [Error](#error) |

### /api/v1/depth
---
##### ***GET***
**Summary:** Get the order book.

**Description:** Gets the order book depth data for a given pair symbol.

The given _limit_ must be one of the allowed limits below.

**Destination:** Validator node.

**Rate Limit:** 10 requests per IP per second.

**URL for testnet:** [https://testnet-dex.binance.org/api/v1/depth?symbol=xxx-000_BNB](https://testnet-dex.binance.org/api/v1/depth?symbol=xxx-000_BNB)


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| symbol | query | Market pair symbol, e.g. NNB-0AD_BNB | Yes | string |
| limit | query | The limit of results. Allowed limits: [5, 10, 20, 50, 100, 500, 1000] | No | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [MarketDepth](#marketdepth) |
| 400 | Bad Request | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |

### /api/v1/broadcast
---
##### ***POST***
**Summary:** Broadcast a transaction.

**Description:** Broadcasts a signed transaction. A single transaction must be sent hex-encoded with a `content-type` of `text/plain`.

**Destination:** Witness node.

**Rate Limit:** 5 requests per IP per second.

**URL for testnet:** [https://testnet-dex.binance.org/api/v1/broadcast](https://testnet-dex.binance.org/api/v1/broadcast)


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| sync | query | Synchronous broadcast (wait for [DeliverTx](https://github.com/tendermint/tendermint/wiki/Application-Developers#delivertx))?  | No | boolean |
| body | body |  | Yes | binary |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [ [Transaction](#transaction) ] |
| 400 | Bad Request | [Error](#error) |
| 401 | Bad Signature | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |

### /api/v1/klines
---
##### ***GET***
**Summary:** Get candlestick bars.

**Description:** Gets candlestick/kline bars for a symbol. Bars are uniquely identified by their open time.

If the time window is larger than limits, only the first n klines will return. In this case, please either shrink the window or increase the limit to get proper amount of klines.

**Rate Limit:** 10 requests per IP per second.

**URL for testnet:** [https://testnet-dex.binance.org/api/v1/klines?symbol=NNB-338_BNB&interval=5m](https://testnet-dex.binance.org/api/v1/klines?symbol=NNB-338_BNB&interval=5m)

**Example**

```
[
  1499040000000,      // Open time
  "0.01634790",       // Open
  "0.80000000",       // High
  "0.01575800",       // Low
  "0.01577100",       // Close
  "148976.11427815",  // Volume
  1499644799999,      // Close time
  "2434.19055334",    // Quote asset volume
  308                // Number of trades
]
```


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| symbol | query | symbol | Yes | string |
| interval | query | interval. Allowed value: [1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M] | Yes | enum string |
| limit | query | default 300; max 1000. | No | integer |
| startTime | query | start time in Milliseconds | No | long |
| endTime | query | end time in Milliseconds | No | long |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ [Candlestick](#candlestick) ] |

### /api/v1/orders/closed
---
##### ***GET***
**Summary:** Get closed orders.

**Description:** Gets closed (filled and cancelled) orders for a given address.

**Query Window:** Default query window is latest 7 days; The maximum start - end query window is 3 months.

**Rate Limit:** 5 requests per IP per second.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| address | query | the owner address | Yes | string |
| end | query | end time in Milliseconds | No | long |
| limit | query | default 500; max 1000. | No | integer |
| offset | query | start with 0; default 0. | No | integer |
| side | query | order side. 1 for buy and 2 for sell. | No | integer |
| start | query | start time in Milliseconds | No | long |
| status | query | order status list. Allowed value: [Ack, IocExpire, IocNoFill, FullyFill, Canceled, Expired, FailedBlocking, FailedMatching] | No | enum string |
| symbol | query | symbol | No | string |
| total | query | total number required, 0 for not required and 1 for required; default not required, return total=-1 in response | No | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [OrderList](#orderlist) |

### /api/v1/orders/open
---
##### ***GET***
**Summary:** Get open orders.

**Description:** Gets open orders for a given address.

**Rate Limit:** 5 requests per IP per second.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| address | query | the owner address | Yes | string |
| limit | query | default 500; max 1000. | No | integer |
| offset | query | start with 0; default 0. | No | integer |
| symbol | query | symbol | No | string |
| total | query | total number required, 0 for not required and 1 for required; default not required, return total=-1 in response | No | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [OrderList](#orderlist) |
| 400 | Bad Request | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |

### /api/v1/orders/{id}
---
##### ***GET***
**Summary:** Get an order.

**Description:** Gets metadata for an individual order by its ID.

**Rate Limit:** 5 requests per IP per second.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | order id | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [Order](#order) |
| 400 | Bad Request | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |

### /api/v1/ticker/24hr
---
##### ***GET***
**Summary:** Get a market ticker.

**Description:** Gets 24 hour price change statistics for a market pair symbol. Updated every second.

**Rate Limit:** 5 requests per IP per second.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| symbol | query | symbol | No | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ [TickerStatistics](#tickerstatistics) ] |
| 400 | Bad Request | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |

### /api/v1/trades
---
##### ***GET***
**Summary:** Get market trades.

**Description:** Gets a list of historical trades.

**Query Window:** Default query window is latest 7 days; The maximum start - end query window is 3 months.

**Rate Limit:** 5 requests per IP per second.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| address | query | the buyer/seller address | No | string |
| buyerOrderId | query | buyer order id | No | string |
| end | query | end time in Milliseconds | No | long |
| height | query | block height | No | long |
| limit | query | default 500; max 1000. | No | integer |
| offset | query | start with 0; default 0. | No | integer |
| quoteAsset | query | quote asset | No | string |
| sellerOrderId | query | seller order id | No | string |
| side | query | order side. 1 for buy and 2 for sell. | No | integer |
| start | query | start time in Milliseconds | No | long |
| symbol | query | symbol | No | string |
| total | query | total number required, 0 for not required and 1 for required; default not required, return total=-1 in response | No | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [TradePage](#tradepage) |
| 400 | Bad Request | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |

### /api/v1/block-exchange-fee
---
##### ***GET***
**Summary:** Trading fee of the address grouped by block

**Description:** Get historical trading fees of the address, including fees of trade/canceled order/expired order. Transfer and other transaction fees are not included. Order by block height DESC.
**Query Window:** Default query window is latest 7 days; The maximum start - end query window is 3 months.
**Rate Limit:** 5 requests per IP per second.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| address | query | the seller/buyer address | No | string |
| end | query | end time | No | long |
| limit | query | default 50; max 1000. | No | integer |
| offset | query | start with 0; default 0. | No | integer |
| start | query | start time in Milliseconds | No | long |
| total | query | total number required, 0 for not required and 1 for required; default not required, return total=-1 in response | No | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [BlockExchangeFeePage](#blockexchangefeepage) |

### /api/v1/transactions
---
##### ***GET***
**Summary:** Get transactions.

**Description:** Gets a list of transactions. Multisend transaction is not available in this API. Currently 'confirmBlocks' and 'txAge' are not supported.

**Query Window:** Default query window is latest 24 hours; The maximum start - end query window is 3 months.

**Rate Limit:** 60 requests per IP per minute.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| address | query | address | Yes | string |
| blockHeight | query | blockHeight | No | long |
| endTime | query | endTime in Milliseconds | No | long |
| limit | query | limit | No | integer |
| offset | query | offset | No | integer |
| side | query | transaction side. Allowed value: [ RECEIVE, SEND] | No | enum string |
| startTime | query | start time in Milliseconds | No | long |
| txAsset | query | txAsset | No | string |
| txType | query | transaction type. Allowed value: [ NEW_ORDER,ISSUE_TOKEN,BURN_TOKEN,LIST_TOKEN,CANCEL_ORDER,FREEZE_TOKEN,UN_FREEZE_TOKEN,TRANSFER,PROPOSAL,VOTE,MINT,DEPOSIT,CREATE_VALIDATOR,REMOVE_VALIDATOR,TIME_LOCK,TIME_UNLOCK,TIME_RELOCK,SET_ACCOUNT_FLAG,HTL_TRANSFER,CLAIM_HTL,DEPOSIT_HTL,REFUND_HTL] | No | enum string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [TxPage](#txpage) |
| 400 | Bad Request | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |

### /api/v1/transactions-in-block/{blockHeight}
---
##### ***GET***
**Summary:** Get transactions in the specific block.

**Description:** Get transactions in the block. Multi-send and multi-coin transactions are flattened as transactions. This API is deprecated.

**Rate Limit:** 5 requests per IP per second.

**Rate Limit:** 60 requests per IP per minute.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| blockHeight | path | block height | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [BlockTx](#blocktx) |
| 400 | Bad Request. The block to query is higher than current highest block. | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |

### /api/v2/transactions-in-block/{blockHeight}
---
##### ***GET***
**Summary:** transactions in Block

**Description:** Get transactions in the block. Multi-send and multi-coin transactions are included as sub-transactions.

**Rate Limit:** 5 request per IP per second.

**Rate Limit:** 60 requests per IP per minute.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| blockHeight | path | blockHeight | Yes | long |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [BlockTxV2](#blocktxv2) |
| 400 | Bad Request. The block to query is higher than current highest block. | [Error](#error) |

### /api/v1/atomic-swaps
---
##### ***GET***
**Summary:** AtomicSwap

**Description:** Get atomic swaps by address.

**Rate Limit:** 5 request per IP per second.

**Rate Limit:** 60 requests per IP per minute.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| endTime | query | end time of blockTimestamp | No | long |
| fromAddress | query | At least one of toAddress and fromAddress should be provided as parameter | No | string |
| limit | query | default 25; max 1000. | No | integer |
| offset | query | start with 0; default 0. | No | integer |
| startTime | query | start time of blockTimestamp in Milliseconds; The maximum start - end query window is 3 months; Default query window is the latest 30 days. | No | long |
| toAddress | query | At least one of toAddress and fromAddress should be provided as parameter | No | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [AtomicSwapPage](#atomicswappage) |

### /api/v1/atomic-swaps/{id}
---
##### ***GET***
**Summary:** AtomicSwap

**Description:** Get an AtomicSwap by swap id

**Rate Limit:** 5 request per IP per second.

**Rate Limit:** 60 request per IP per minute.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | swap id | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [AtomicSwap](#atomicswap) |

### /api/v1/timelocks/{address}
---
##### ***GET***
**Summary:** Gets time lock records given an address

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| address | path | The account address to query | Yes | string |
| id | query | the record id of timelock to query | No | long |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [TimeLocks](#timelocks) |
| 400 | Bad Request | [Error](#error) |
| 500 | internal server error | [Error](#error) |

### /api/v1/timelock/{account_addr}?(id={recordid})
---
##### ***GET***
**Summary:** Get timelock records of an address.

**Description:** Get the timelock history of an address.
**Rate Limit:** 60 requests per IP per minute.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| address | path | The account address to query | Yes | string |
| id | query | the record id of timelock to query | No | long |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [TimeLocks](#timelocks) |
| 400 | Bad Request | [Error](#error) |
| 404 | Not Found |  |
| 500 | internal server error | [Error](#error) |

### /api/v1/mini/tokens
---
##### ***GET***
**Summary:** Gets a list of available mini tokens.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| offset | query | offset | No | integer |
| limit | query | limit | No | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [MiniTokens](#minitokens) |
| 400 | Bad Request | [Error](#error) |
| 500 | internal server error | [Error](#error) |

### /api/v1/mini/markets
---
##### ***GET***
**Summary:** Gets a list of mini market pairs.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| offset | query | offset | No | integer |
| limit | query | limit | No | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [Markets](#markets) |
| 400 | Bad Request | [Error](#error) |

### /api/v1/mini/klines
---
##### ***GET***
**Summary:** Get mini-token candlestick bars.

**Description:** Gets candlestick/kline bars for a mini-token symbol pair. Bars are uniquely identified by their open time.

If the time window is larger than limits, only the first n klines will return. In this case, please either shrink the window or increase the limit to get proper amount of klines.

**Rate Limit:** 10 requests per IP per second.

**Example**

```
[
  1499040000000,      // Open time
  "0.01634790",       // Open
  "0.80000000",       // High
  "0.01575800",       // Low
  "0.01577100",       // Close
  "148976.11427815",  // Volume
  1499644799999,      // Close time
  "2434.19055334",    // Quote asset volume
  308                // Number of trades
]
```


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| symbol | query | symbol | Yes | string |
| interval | query | interval. Allowed value: [1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M] | Yes | enum string |
| limit | query | default 300; max 1000. | No | integer |
| startTime | query | start time in Milliseconds | No | long |
| endTime | query | end time in Milliseconds | No | long |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ [Candlestick](#candlestick) ] |

### /api/v1/mini/orders/closed
---
##### ***GET***
**Summary:** Get closed orders of mini-token pairs.

**Description:** Gets closed (filled and cancelled) orders for a given address.

**Query Window:** Default query window is latest 7 days; The maximum start - end query window is 3 months.

**Rate Limit:** 5 requests per IP per second.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| address | query | the owner address | Yes | string |
| end | query | end time in Milliseconds | No | long |
| limit | query | default 500; max 1000. | No | integer |
| offset | query | start with 0; default 0. | No | integer |
| side | query | order side. 1 for buy and 2 for sell. | No | integer |
| start | query | start time in Milliseconds | No | long |
| status | query | order status list. Allowed value: [Ack, IocExpire, IocNoFill, FullyFill, Canceled, Expired, FailedBlocking, FailedMatching] | No | enum string |
| symbol | query | symbol | No | string |
| total | query | total number required, 0 for not required and 1 for required; default not required, return total=-1 in response | No | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [OrderList](#orderlist) |

### /api/v1/mini/orders/open
---
##### ***GET***
**Summary:** Get open orders of mini-token pairs.

**Description:** Gets open orders for a given address.
**Rate Limit:** 5 requests per IP per second.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| address | query | the owner address | Yes | string |
| limit | query | default 500; max 1000. | No | integer |
| offset | query | start with 0; default 0. | No | integer |
| symbol | query | symbol | No | string |
| total | query | total number required, 0 for not required and 1 for required; default not required, return total=-1 in response | No | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [OrderList](#orderlist) |
| 400 | Bad Request | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |

### /api/v1/mini/orders/{id}
---
##### ***GET***
**Summary:** Get an order of mini-token pairs.

**Description:** Gets metadata for an individual order by its ID.
**Rate Limit:** 5 requests per IP per second.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | order id | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [Order](#order) |
| 400 | Bad Request | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |

### /api/v1/mini/ticker/24hr
---
##### ***GET***
**Summary:** Get a market ticker of mini-token pairs.

**Description:** Gets 24 hour price change statistics for a market pair symbol. Updated every second.
**Rate Limit:** 5 requests per IP per second.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| symbol | query | symbol | No | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ [TickerStatistics](#tickerstatistics) ] |
| 400 | Bad Request | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |

### /api/v1/mini/trades
---
##### ***GET***
**Summary:** Get market trades of mini-token pairs.

**Description:** Gets a list of historical trades.
**Query Window:** Default query window is latest 7 days; The maximum start - end query window is 3 months.
**Rate Limit:** 5 requests per IP per second.


**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| address | query | the buyer/seller address | No | string |
| buyerOrderId | query | buyer order id | No | string |
| end | query | end time in Milliseconds | No | long |
| height | query | block height | No | long |
| limit | query | default 500; max 1000. | No | integer |
| offset | query | start with 0; default 0. | No | integer |
| quoteAsset | query | quote asset | No | string |
| sellerOrderId | query | seller order id | No | string |
| side | query | order side. 1 for buy and 2 for sell. | No | integer |
| start | query | start time in Milliseconds | No | long |
| symbol | query | symbol | No | string |
| total | query | total number required, 0 for not required and 1 for required; default not required, return total=-1 in response | No | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [TradePage](#tradepage) |
| 400 | Bad Request | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |

### Models
---

### Error  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| code | long | error code | 400 |
| message | string | error message |  |

### Times  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| ap_time | string | event time | e.g. 2019-01-21T10:30:00Z |
| block_time | string | the time of latest block | e.g. 2019-01-21T10:30:00Z |

### Validators  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| block_height | long | Current block height | 12345 |
| validators | [ [Validator](#validator) ] |  |  |

### Validator  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| address | string (hex address) | Address |  |
| pub_key | [ integer ] | Public key bytes |  |
| voting_power | integer | validator's voting power |  |
| accum | integer | validator's accumulated voting power |  |

### Peer  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| id | string | Authenticated identifier | 8c379d4d3b9995c712665dc9a9414dbde5b30483 |
| original_listen_addr | string (RemoteAddr) | Original listen address before PeersService changed it |  |
| listen_addr | string (RemoteAddr) | Listen address |  |
| access_addr | string (RemoteAddr) | Access address (HTTP) |  |
| stream_addr | string (RemoteAddr) | Stream address (WS) |  |
| network | string | Chain ID | Binance-Chain-Ganges |
| version | string | Version | 0.30.1 |
| moniker | string | Moniker (Name) | data-seed-1 |
| capabilities | [ string ] | Array of capability tags: node, qs, ap, ws | node,ap |
| accelerated | boolean | Is an accelerated path to a validator node |  |

### Transaction  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| hash | string (hex) | Hash of transaction, it returned as bytes before, and now it returns as hex string |  |
| log | string | Log of transaction |  |
| data | string | Data of transaction |  |
| height | string | Height of transaction |  |
| code | integer | Result code of transaction |  |
| ok | boolean |  |  |
| tx | object | Detail of transaction, like transaction type, messages and signature

For example, below is the detail of a send transaction. Most of the fields are fixed, but the detail of msg
varies with msg type, if you query with --format=json.

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

### Account  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| account_number | integer |  |  |
| address | string (address) |  |  |
| balances | [ [Balance](#balance) ] |  |  |
| public_key | [ integer ] | Public key bytes |  |
| sequence | long | sequence is for preventing replay attack |  |

### AccountSequence  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| sequence | long | number used for preventing replay attack | 1 |

### Balance  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| symbol | string (currency) | asset symbol | BNB |
| free | string (fixed8) | In decimal form, e.g. 0.00000000 | 0.00000000 |
| locked | string (fixed8) | In decimal form, e.g. 0.00000000 | 0.00000000 |
| frozen | string (fixed8) | In decimal form, e.g. 0.00000000 | 0.00000000 |

### Token  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| name | string | token name | Binance Chain Native Token |
| symbol | string | unique token trade symbol | BTC-000 |
| original_symbol | string | token symbol | BTC |
| total_supply | string (fixed8) | total token supply in decimal form, e.g. 1.00000000 | 0.00000000 |
| owner | string (address) | Address which issue the token |  |
| contract_address | string | smart contract address for this token |  |
| contract_decimals | int | the token decimals |  |

### Market  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| base_asset_symbol | string (currency) | symbol of base asset | BNB |
| quote_asset_symbol | string (currency) | symbol of quote asset | ABC-5CA |
| list_price | string (fixed8) | In decimal form | 1.00000000 |
| tick_size | string (fixed8) | Minimium price change in decimal form | 0.00000001 |
| lot_size | string (fixed8) | Minimium trading quantity in decimal form | 1.00000000 |

### Fee  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| msg_type | string | Transaction msg type that this fee applies to | submit_proposal |
| fee | number | The fee amount | 1000000000 |
| fee_for | integer | 1 = proposer, 2 = all, 3 = free | 1 |
| multi_transfer_fee | string | Fee for multi-transfer | 200000 |
| lower_limit_as_multi | string | e.g. 2 | 2 |
| fixed_fee_params | [FixedFeeParams](#fixedfeeparams) | Set if the fee is fixed |  |
| dex_fee_fields | [DexFeeFieldParams](#dexfeefieldparams) | dex fee |  |

### FixedFeeParams  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| msg_type | string | Transaction msg type that this fee applies to | submit_proposal |
| fee | number | The fixed fee amount | 1000000000 |
| fee_for | integer | 1 = proposer, 2 = all, 3 = free | 1 |

### DexFeeFieldParams  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| fee_name | string | fee name |  |
| fee_value | integer | fee value |  |

### MarketDepth  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| asks | [ string (fixed8) ] | Price and qty in decimal form, e.g. 1.00000000 | ["1.00000000","800.00000000"] |
| bids | [ string (fixed8) ] | Price and qty in decimal form, e.g. 1.00000000 | ["1.00000000","800.00000000"] |
| pending_match | boolean | If new orders inserted in current block and the matching process has not started in the block, return true. |  |

### Candlestick  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| close | number | closing price |  |
| closeTime | long | time of closing trade |  |
| high | number | the highest price |  |
| low | number | the lowest price |  |
| numberOfTrades | integer | total trades |  |
| open | number | open price |  |
| openTime | long | time of open trade |  |
| quoteAssetVolume | number | the total trading volume in quote asset |  |
| volume | number | the total trading volume |  |

### OrderList  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| order | [ [Order](#order) ] | list of orders |  |
| total | long |  |  |

### Order  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| cumulateQuantity | string | total amount of trades that have made |  |
| fee | string | trading fee on the latest updated block of this order. Multiple assets are split by semicolon. |  |
| lastExecutedPrice | string | price of last execution |  |
| lastExecutedQuantity | string | quantity of last execution |  |
| orderCreateTime | dateTime | time of order creation |  |
| orderId | string | order ID |  |
| owner | string | order issuer |  |
| price | string | order price |  |
| quantity | string | order quantity |  |
| side | integer | 1 for buy and 2 for sell |  |
| status | string | enum [Ack, PartialFill, IocNoFill, FullyFill, Canceled, Expired, FailedBlocking, FailedMatching, IocExpire] |  |
| symbol | string | trading pair symbol |  |
| timeInForce | integer | 1 for Good Till Expire(GTE) order and 3 for Immediate Or Cancel (IOC) |  |
| tradeId | string | trade ID |  |
| transactionHash | string | hash of transaction |  |
| transactionTime | dateTime | time of latest order update, for example, cancel, expire |  |
| type | integer | only 2 is available for now, meaning limit order |  |

### SubTx  

| Name | Type | Description | Example |
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

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| askPrice | string | sell price |  |
| askQuantity | string | sell quantity |  |
| bidPrice | string | buy price |  |
| bidQuantity | string | buy quantity |  |
| closeTime | long | time of closing |  |
| count | long | total trade count |  |
| firstId | string | ID of first trade |  |
| highPrice | string | highest price |  |
| lastId | string | ID of last trade |  |
| lastPrice | string | last price |  |
| lastQuantity | string | last quantity |  |
| lowPrice | string | lowest price |  |
| openPrice | string | open price |  |
| openTime | long | open time |  |
| prevClosePrice | string | last close price |  |
| priceChange | string | change of price |  |
| priceChangePercent | string | change of price in percentage |  |
| quoteVolume | string | trading volume in quote asset |  |
| symbol | string | trading symbol |  |
| volume | string | trading volume |  |
| weightedAvgPrice | string | weighted average price |  |

### TradePage  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| total | long | total number of trades |  |
| trade | [ [Trade](#trade) ] |  |  |

### Trade  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| baseAsset | string | base asset symbol |  |
| blockHeight | long | block height |  |
| buyFee | string | trading fee for the buyer address on the block of this trade |  |
| buyerId | string | id of buyer |  |
| buyerOrderId | string | order id for buyer |  |
| buySingleFee | string | trading fee for the buyer address on this single trade | BNB:0.00000172; |
| buyerSource | long | tx source of buy order | 1 |
| price | string | trade price |  |
| quantity | string | trade quantity |  |
| quoteAsset | string | quote asset symbol |  |
| sellFee | string | trading fee for the seller address on the block of this trade |  |
| sellerId | string | seller ID |  |
| sellerOrderId | string | seller order ID |  |
| sellSingleFee | string | trading fee for the seller address on this single trade | BNB:0.00000216; |
| sellerSource | long | tx source of sell order | 1 |
| symbol | string | asset symbol |  |
| tickType | string | enum [Unknown,SellTaker,BuyTaker,BuySurplus,SellSurplus,Neutral] |  |
| time | long | trade time |  |
| tradeId | string | trade ID |  |

### BlockExchangeFeePage  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| blockExchangeFee | [ [BlockExchangeFee](#blockexchangefee) ] |  |  |
| total | long |  |  |

### BlockExchangeFee  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| address | string |  |  |
| blockHeight | long |  |  |
| blockTime | long | timestamp of a block |  |
| fee | string | total fee collected. Multiple assets are split by semicolon. |  |
| tradeCount | long | trade count of the address on the block |  |

### TxPage  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| total | long | total sum of transactions |  |
| tx | [ [Tx](#tx) ] |  |  |

### BlockTx  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| blockHeight | long | block height |  |
| tx | [ [Tx](#tx) ] |  |  |

### BlockTxV2  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| blockHeight | long | block height |  |
| tx | [ [TxV2](#txv2) ] |  |  |

### Tx  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| blockHeight | long | block height |  |
| code | integer | transaction result code | 0 |
| confirmBlocks | long |  |  |
| data | string |  |  |
| fromAddr | string | from address |  |
| orderId | string | order ID |  |
| timeStamp | dateTime | time of transaction |  |
| toAddr | string | to address |  |
| txAge | long |  |  |
| txAsset | string |  |  |
| txFee | string |  |  |
| txHash | string | hash of transaction |  |
| txType | string | type of transaction |  |
| value | string | value of transaction |  |
| source | long |  |  |
| sequence | long |  |  |
| swapId | string | Optional. Available when the transaction type is one of HTL_TRANSFER, CLAIM_HTL, REFUND_HTL, DEPOSIT_HTL |  |
| proposalId | string |  |  |

### ExchangeRate  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| ExchangeRate | object |  |  |

### ResultStatus  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| validator_info | [ [ValidatorInfo](#validatorinfo) ] |  |  |
| sync_info | [ [SyncInfo](#syncinfo) ] |  |  |
| node_info | [ [NodeInfo](#nodeinfo) ] |  |  |

### NodeInfo  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| Protocol_Version | [ [ProtocolVersion](#protocolversion) ] |  |  |
| ID | string |  |  |
| listen_addr | string |  |  |
| network | string |  |  |
| version | string |  |  |
| channels | string |  |  |
| moniker | string |  |  |
| other | object |  |  |

### SyncInfo  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| latest_block_hash | string (hex) |  |  |
| latest_app_hash | string (hex) |  |  |
| latest_block_height | long |  |  |
| latest_block_time | time |  |  |
| catching_up | boolean |  |  |

### ProtocolVersion  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| P2P | integer (uint64) |  |  |
| block | integer (uint64) |  |  |
| app | integer (uint64) |  |  |

### ValidatorInfo  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| address | string | hex address |  |
| pub_key | string | hex-encoded |  |
| voting_power | long |  |  |

### AtomicSwapPage  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| atomicSwaps | [ [AtomicSwap](#atomicswap) ] |  |  |
| total | long |  |  |

### AtomicSwap  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| blockTimestamp | long | Timestamp of block in which the swap is initiated. The unit is millisecond. |  |
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
| timestamp | string (int64) | The timestamp for randomNumberHash calculation, randomNumberHash=sha256(randomNumber, timestamp). The unit is second. |  |
| toAddr | string |  |  |

### TxV2  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| blockHeight | long |  |  |
| code | integer |  | 0 |
| data | string |  |  |
| fromAddr | string |  |  |
| memo | string |  |  |
| orderId | string | Optional. Available when the transaction type is NEW_ORDER |  |
| proposalId | string | Optional. Available when the transaction type is PROPOSAL |  |
| sequence | long |  |  |
| source | long |  |  |
| subTransactions | [ [SubTx](#subtx) ] | Optional. Available when the transaction has sub-transactions, such as multi-send transaction or a transaction have multiple assets |  |
| swapId | string | Optional. Available when the transaction type is one of HTL_TRANSFER, CLAIM_HTL, REFUND_HTL, DEPOSIT_HTL |  |
| timeStamp | dateTime |  |  |
| toAddr | string |  |  |
| txAsset | string |  |  |
| txFee | string |  |  |
| txHash | string |  |  |
| txType | string |  |  |
| value | string |  |  |

### TimeLocks  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| id | long | The record id of the timelock transaction |  |
| description | string | The description of the timelock transaction |  |
| amount | [  ] |  |  |
| locktime | string | The available unlock time |  |

### MiniTokens  

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| name | string |  | Binance Chain Mini Token |
| symbol | string |  | BTC-000 |
| original_symbol | string |  | BTC |
| total_supply | string (fixed8) | In decimal form, e.g. 1.00000000 | 0.00000000 |
| token_type | integer | Type of the mini token |  |
| owner | string (address) | Address |  |
| mintable | boolean | mintable |  |
| token_uri | string | URI for token description |  |
| contract_address | string | smart contract address for this token |  |
| contract_decimals | int | the token decimals |  |