CHANGELOG
========

## Upcoming Changes in Beacon Chain  Mainnet API - 2021-06-04

### HTTP API

#### /api/v1/transactions

***Changes***

The following changes will take effect.


* `address` related `Mutli Send Transfer` transaction history will also be included;
* If this address is the receiver of any `HTL_TRANSFER` , the related transactions history will also be included
* `asset` parameter can be used to search for `quote asset` of NEW_ORDER, CANCEL_ORDER,MINI_TOKEN_LIST,LISTING transactions
* `asset` parameter can be used to search for `quote asset` or `base asset` of dex listing SUBMIT_PROPOSAL transactions
* DEPOSIT_HTL HTL_TRANSFER, SIDE_DEPOSIT, TIME_LOCK, TIME_RELOCK, TRANSFER can relate to multiple assets, you can search by any of them.


## Upcoming Changes in Beacon Chain  Mainnet API v0.7.2

### Node RPC

Extra paths are available for querying information about `BEP8` tokens and trading pairs.

**New Query Path**

*  `/mini-tokens/info`
*  `/mini-tokens/list`
*  `/dex-mini/pairs`


### HTTP API

#### /api/v1/depth

***Changes***

Add pending_match flag in response to indicate that current block has not run matching process for the new orders incoming in this block.
In detail, if there are new orders created in current block, but the matching process has not run for the block, then pending_math=true. As a result, there could be orders with cross prices - price of ask is lower than price of bid. Client can ignore the response with pending_match=true and query the depth API until pending_match=false.

---
***GET***
**Summary:** Get the order book.

**Description:** Gets the order book depth data for a given pair symbol.

The given _limit_ must be one of the allowed limits below.

**Destination:** Validator node.

**Rate Limit:** 10 requests per IP per second.

**URL for testnet:** [https://dex.binance.org/api/v1/depth?symbol=xxx-000_BNB](https://dex.binance.org/api/v1/depth?symbol=xxx-000_BNB)

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| symbol | query | Market pair symbol, e.g. NNB-0AD_BNB | Yes | string |
| limit | query | The limit of results. Allowed limits: [5, 10, 20, 50, 100, 500, 1000] | No | integer |

**Responses**

#### MarketDepth

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| asks | [ string (fixed8) ] | Price and qty in decimal form, e.g. 1.00000000 | ["1.00000000","800.00000000"] |
| bids | [ string (fixed8) ] | Price and qty in decimal form, e.g. 1.00000000 | ["1.00000000","800.00000000"] |
| pending_match | boolean | If new orders inserted in current block and the matching process has not started in the block, return true. |  |

#### MarketDepth

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| asks | [ string (fixed8) ] | Price and qty in decimal form, e.g. 1.00000000 | ["1.00000000","800.00000000"] |
| bids | [ string (fixed8) ] | Price and qty in decimal form, e.g. 1.00000000 | ["1.00000000","800.00000000"] |
| pending_match | boolean | If new orders inserted in current block and the matching process has not started in the block, return true. |  |

#### /api/v1/mini/tokens

***Changes***

Gets a list of available mini tokens.

#### MiniTokens

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| name | string |  | Beacon Chain  Mini Token |
| symbol | string |  | BTC-000 |
| original_symbol | string |  | BTC |
| total_supply | string (fixed8) | In decimal form, e.g. 1.00000000 | 0.00000000 |
| token_type | integer | Type of the mini token |  |
| owner | string (address) | Address |  |
| mintable | boolean | mintable |  |
| token_uri | string | URI for token description |  |

#### /api/v1/mini/markets:

***Changes***

Gets a list of available mini tokens trading pairs.

#### Market

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| base_asset_symbol | string (currency) | symbol of base asset | BNB |
| quote_asset_symbol | string (currency) | symbol of quote asset | ABC-5CA |
| list_price | string (fixed8) | In decimal form | 1.00000000 |
| tick_size | string (fixed8) | Minimium price change in decimal form | 0.00000001 |
| lot_size | string (fixed8) | Minimium trading quantity in decimal form | 1.00000000 |

#### /api/v1/mini/kline

***Changes***

Get mini-token candlestick bars. Interval allowed value: [1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M]

#### Candlestick

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

#### /api/v1/mini/orders/closed

***Changes***

Get closed orders of mini-token pairs.

#### OrderList

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| order | [ Order ] | list of orders |  |
| total | long |  |  |

#### /api/v1/mini/orders/open

***Changes***

Get open orders of mini-token pairs.

#### OrderList

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| order | [ Order] ] | list of orders |  |
| total | long |  |  |

#### /api/v1/mini/ticker/24hr

***Changes***

Get a market ticker of mini-token pairs.

#### TickerStatistics

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


#### /api/v1/mini/trades

***Changes***

Get market trades of mini-token pairs.

#### TradePage

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| total | long | total number of trades |  |
| trade | [ [Trade] ] |  |  |

## Upcoming Changes in Beacon Chain  Testnet API v0.7.0

### Node RPC

Extra paths are available for querying information about `BEP8` tokens and trading pairs.

**New Query Path**

*  `/mini-tokens/info`
*  `/mini-tokens/list`
*  `/dex-mini/pairs`


### HTTP API

#### /api/v1/depth

***Changes***

Add pending_match flag in response to indicate that current block has not run matching process for the new orders incoming in this block.
In detail, if there are new orders created in current block, but the matching process has not run for the block, then pending_math=true. As a result, there could be orders with cross prices - price of ask is lower than price of bid. Client can ignore the response with pending_match=true and query the depth API until pending_match=false.

---
***GET***
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

#### MarketDepth

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| asks | [ string (fixed8) ] | Price and qty in decimal form, e.g. 1.00000000 | ["1.00000000","800.00000000"] |
| bids | [ string (fixed8) ] | Price and qty in decimal form, e.g. 1.00000000 | ["1.00000000","800.00000000"] |
| pending_match | boolean | If new orders inserted in current block and the matching process has not started in the block, return true. |  |

#### MarketDepth

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| asks | [ string (fixed8) ] | Price and qty in decimal form, e.g. 1.00000000 | ["1.00000000","800.00000000"] |
| bids | [ string (fixed8) ] | Price and qty in decimal form, e.g. 1.00000000 | ["1.00000000","800.00000000"] |
| pending_match | boolean | If new orders inserted in current block and the matching process has not started in the block, return true. |  |

#### /api/v1/mini/tokens

***Changes***

Gets a list of available mini tokens.

#### MiniTokens

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| name | string |  | Beacon Chain  Mini Token |
| symbol | string |  | BTC-000 |
| original_symbol | string |  | BTC |
| total_supply | string (fixed8) | In decimal form, e.g. 1.00000000 | 0.00000000 |
| token_type | integer | Type of the mini token |  |
| owner | string (address) | Address |  |
| mintable | boolean | mintable |  |
| token_uri | string | URI for token description |  |

#### /api/v1/mini/markets:

***Changes***

Gets a list of available mini tokens trading pairs.

#### Market

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| base_asset_symbol | string (currency) | symbol of base asset | BNB |
| quote_asset_symbol | string (currency) | symbol of quote asset | ABC-5CA |
| list_price | string (fixed8) | In decimal form | 1.00000000 |
| tick_size | string (fixed8) | Minimium price change in decimal form | 0.00000001 |
| lot_size | string (fixed8) | Minimium trading quantity in decimal form | 1.00000000 |

#### /api/v1/mini/kline

***Changes***

Get mini-token candlestick bars. Interval allowed value: [1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M]

#### Candlestick

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

#### /api/v1/mini/orders/closed

***Changes***

Get closed orders of mini-token pairs.

#### OrderList

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| order | [ [Order] ] | list of orders |  |
| total | long |  |  |

#### /api/v1/mini/orders/open

***Changes***

Get open orders of mini-token pairs.

#### OrderList

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| order | [Order ] | list of orders |  |
| total | long |  |  |

#### /api/v1/mini/ticker/24hr

***Changes***

Get a market ticker of mini-token pairs.

#### TickerStatistics

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


#### /api/v1/mini/trades

***Changes***

Get market trades of mini-token pairs.

#### TradePage

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| total | long | total number of trades |  |
| trade | [ [Trade] ] |  |  |

## Upcoming Changes in Beacon Chain  API v0.6.4

### HTTP API

#### Add Error Message for Newly Created Address

You will get `{"code":404,"message":"account not found"}` for newly created account:

**Example**
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

***Changes***

Add `buyerSource` and `sellerSource` in the response Trade data structure. The Source Id reference can be found in https://github.com/binance-chain/BEPs/blob/master/BEP10.md.

#### Trade

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

## Upcoming Changes in Beacon Chain  API v0.6.3

### HTTP API

#### /api/v1/atomic-swaps
#### /api/v1/atomic-swaps/{id}

***Changes***

The API is used to query atomic-swaps by id or by address.
In the `AtomicSwap` data structure:
* A new field `blockTimestamp` is added to indicate the block time in millisecond
* The original `timestamp` is changed to indicate the timestamp for randomNumberHash calculation. Its unit is second.
* `createTime` and `updateTime` are removed from `AtomicSwap`.


#### AtomicSwap

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| blockTimestamp | long | Timestamp of block in which the swap is initiated. The unit is millisecond. |  |
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
| timestamp | long | The timestamp for randomNumberHash calculation, randomNumberHash=sha256(randomNumber, timestamp). The unit is second. |  |
| toAddr | string |  |  |

### WebSocket

As described in https://docs.bnbchain.org/docs/beaconchain/develop/api-reference/dex-api/ws-streams#6-book-depth-streams, you can now customize the returned level from orderbook. The default level is 20 and you can extend the level to 100, 500, or 1000 with compression enabled.

* Example on mainnet:
```
var  marketDepth = new WebSocket("wss://dex-atlantic.binance.org/api/ws/NEXO-A84_BNB@marketDepth100");
```
* Example on testnet:
```
var  marketDepth = new WebSocket("wss://testnet-de.binance.org/api/ws/ALT-3B6_BNB@marketDepth100");
```

### Node RPC

Due to changes of underling Tendermint library, `ResponseCheckTx`, `ResponseDeliverTx`, `ResponseBeginBlock`, and `ResponseEndBlock` now include `Events` instead of `Tags`. Each `Event` contains a type and a list of attributes (list of key-value pairs) allowing for inclusion of multiple distinct events in each response.

#### Events

Some methods (`CheckTx, BeginBlock, DeliverTx, EndBlock`)
include an `Events` field in their `Response*`. Each event contains a type and a
list of attributes, which are key-value pairs denoting something about what happened
during the method's execution.

Events can be used to index transactions and blocks according to what happened
during their execution. Note that the set of events returned for a block from
`BeginBlock` and `EndBlock` are merged. In case both methods return the same
tag, only the value defined in `EndBlock` is used.

Each event has a `type` which is meant to categorize the event for a particular
`Response*` or tx. A `Response*` or tx may contain multiple events with duplicate
`type` values, where each distinct entry is meant to categorize attributes for a
particular event. Every key and value in an event's attributes must be UTF-8
encoded strings along with the event type itself.

Example:

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

## Upcoming Changes in Beacon Chain  API v0.6.2

### HTTP API

#### /api/v2/transactions-in-block/{blockHeight}

***Changes***

This endpoint is used for getting all transactions in the block. Multi-send and multi-coin transactions are flattened as sub-transactions.

#### TxV2

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

#### /api/v1/timelocks/{account_addr}

***Changes***

This new function is for getting the whole timelock history of an address.

#### TimeLocks

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| id | long | The record id of the timelock transaction |  |
| description | string | The description of the timelock transaction |  |
| amount | [  ] |  |  |
| locktime | string | The available unlock time |  |

####/api/v1/timelock/{account_addr}?(id={recordid})

***Changes***

This new function is for getting the timelock history of an address by id.

#### TimeLocks

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| id | long | The record id of the timelock transaction |  |
| description | string | The description of the timelock transaction |  |
| amount | [  ] |  |  |
| locktime | string | The available unlock time |  |

## Upcoming Changes in Beacon Chain  API v0.6.1

### HTTP API

As you know, There are some accelerate nodes which provides some advanced API services for the public. Here is a list of all the HTTP API information it provides on mainnet: https://docs.bnbchain.org/docs/beaconchain/develop/api-reference/dex-api/paths

In the latest update of HTTP API for testnet, there are the following changes:

#### /api/v1/account/{address}

***Changes***
In the `Account` data structure, a new field `flags` is added to indicate the constrains for this address.

* `flags` is used to indicate which script needs to be executed.

#### Account

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| account_number | integer |  |  |
| address | string (address) |  |  |
| balances | [ [Balance](#balance) ] |  |  |
| public_key | [ integer ] | Public key bytes |  |
| flags | integer | indicate additional check for this account|  |
| sequence | long | sequence is for preventing replay attack |  |

## Upcoming Changes in Beacon Chain  API v0.6.0

### HTTP API

As you know, There are some accelerate nodes which provides some advanced API services for the public. Here is a list of all the HTTP API information it provides on mainnet: https://docs.bnbchain.org/docs/beaconchain/develop/api-reference/dex-api/paths 

In the latest update of HTTP API for testnet, there are the following changes:


#### /api/v1/trades
---

***Changes***

In the `Trade` data structure, a new field `Ticker Type` is added. The enumerate values are: "Unknown", "SellTaker","BuyTaker","BuySurplus","SellSurplus","Neutral". When there is a maker and taker, `SellTaker` and  `BuyTaker` are used to indicate the side. When both sides are taker,  `BuySurplus`, `SellSurplus` and `Neutral` are used to indicate market pressure.`Unknown` mean the type is not possible to define.

* `buySingleFee` is used to show trading fee for the buyer address on this single trade.
* `sellSingleFee`is used to show  trading fee for the seller address on this single trade.

***GET***

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


#### TradePage

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| total | long |  |  |
| trade | [ [Trade](#trade) ] |  |  |

#### Trade

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| baseAsset | string | base asset |  |
| blockHeight | long | block height |  |
| buyFee | string | trading fee for the buyer address on the block of this trade |  |
| buyerId | string | id of buyer |  |
| buyerOrderId | string | order id for buyer |  |
| **buySingleFee** | string | trading fee for the buyer address on this single trade |  |
| price | string | trade price |  |
| quantity | string | trade quantity |  |
| quoteAsset | string | quote asset |  |
| sellFee | string | trading fee for the seller address on the block of this trade |  |
| sellerId | string | seller ID |  |
| sellerOrderId | string | seller order ID |  |
| **sellSingleFee** | string | trading fee for the seller address on this single trade |  |
| symbol | string | asset symbol |  |
| **tickType** | string | enum [Unknown,SellTaker,BuyTaker,BuySurplus,SellSurplus,Neutral] |  |
| time | long | trade time |  |
| tradeId | string | trade ID |  |



### Websocket

#### Trades

***Changes***

In received Payload of `trades`, a new filed `tt` is added. Its enumerate values are:
* 0: Unknown
* 1: SellTaker
* 2: BuyTaker
* 3: BuySurplus
* 4: SellSurplus
* 5: Neutral

  **Received Payload:**

```javascript
{
    "stream": "trades",
    "data": [{
        "e": "trade",       // Event type
        "E": 123456789,     // Event height
        "s": "BNB_BTC",     // Symbol
        "t": "12345",       // Trade ID
        "p": "0.001",       // Price
        "q": "100",         // Quantity
        "b": "88",          // Buyer order ID
        "a": "50",          // Seller order ID
        "T": 123456785,     // Trade time
        "sa": "bnb1me5u083m2spzt8pw8vunprnctc8syy64hegrcp", // SellerAddress
        "ba": "bnb1kdr00ydr8xj3ydcd3a8ej2xxn8lkuja7mdunr5" // BuyerAddress
        "tt": 1   //tiekertype
    },
    {
        "e": "trade",       // Event type
        "E": 123456795,     // Event time
        "s": "BNB_BTC",     // Symbol
        "t": "12348",       // Trade ID
        "p": "0.001",       // Price
        "q": "100",         // Quantity
        "b": "88",          // Buyer order ID
        "a": "52",          // Seller order ID
        "T": 123456795,     // Trade time
        "sa": "bnb1me5u083m2spzt8pw8vunprnctc8syy64hegrcp", // SellerAddress
        "ba": "bnb1kdr00ydr8xj3ydcd3a8ej2xxn8lkuja7mdunr5" // BuyerAddress
        "tt": 0    //tiekertype
    }]
}
```

### Extra data from your fullnode

All those [extra info](get-extra-data-from-fullnode.md#publish-different-messages-to-local-files ) can also be found in exported data from your fullnode.

***Changes***

In `trade` data structure, there are five new fields: `SSrc`,`BSrc`,`SSingleFee`, `BSingleFee` and `TickerType`.

* `SSrc`: Source code of Sell order transaction
* `BSrc`: Source code of Buy order transaction
* `SSingleFee`: fee of matched sell order
* `BSingleFee`: fee of matched buy order
* `TickerType`: ticker type

In `Order` data structure, there is a new field: `singlefee`. This is used to show the fee of this order.



For example:


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

## Upcoming Changes in v0.6.2

### Tendermint Changes

#### 1. Better Handle Index database

Now Tendermint will recover index data from restart or crash. You can see the latest indexed height from status:
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
#### 2. More configuration in config file

A new field is added: ` skip_tx_from_persistent` under mempool part. If you set this to be True, your node will not broadcast transactions to its persistent peers.

#### 3. Change of Monitoring Metrics

* Add the following metrics:
   * IndexHegiht：This metric will show the latest indexed height.
   * Height: This metric will show the latest  height of the blockchain
   * BlockIntervalSeconds: This metric will show the Time between this and the last block
   * NumTxs: This metric will show the total  number of transactions in the current block
   * BlockSizeBytes: This metric will show the size of the block
   * TotalTxs: This metric will show the total  number of transactions in history
   * CommittedHeight: This metric will show the latest block height
   * PermanentPeerSetSize: This metric will show the number of peers considered as good
   * PermanentPeers: This metric will show the details of peers considered as good
   * DecayPeerSetSize:  This metric will show the number of peers considered as bad
* Remove metrics of ReceivedTx, PeerSendBytesTotal, PeerReceiveBytesTotal


