# Get Extra Data From Your Full Node

This document is intended for developers who are interested in transactions, order books, account changes, fee charges in every block and would like to build their own downstream services of the full node.<br/>
Please refer to [Running Full Node](fullnode.md), if you still haven't deployed a full node.

## Publish Different Messages to Local Files

You can set the `publishLocal` option to `true` in `nodebinary/fullnode/{network}/node/app.toml`.<br/>
The full node will append the messages each block published to `{fullnode home}/marketdata/marketdata.json` (each line is a json object for a topic and height), and you can consume them in your own apps. The messages types are explained below.

Note: only block messages after this option get turned on can be saved. This function won't make up messages for already saved blocks.

## Set Kafka Broker Version

Since the release of bnbchaind `v0.6.3`, you can customize the version of `kafka broker` in `app.toml`. The default value is `v2.1.0`:

> The recommended version 2.1.0 and the minimal version is 0.8.2.0

```
kafkaVersion = "2.1.0"
```
If you are using another version of Kafka, please test the compatibility first.

### 1. OrderUpdates
You can set  the `publishOrderUpdates` option to `true` in `nodebinary/fullnode/{network}/node/app.toml`.<br/>
Then, the full node will save all the trades that have been filled, orders that changed and proposals that been submitted.

* Example:

All those [extra info](https://docs.bnbchain.org/docs/beaconchain/develop/node/extra-info#publish-different-messages-to-local-files) can also be found in exported data from your fullnode.

### Changes
In `trade` data structure, there are five new fields: `SSrc`,`BSrc`,`SSingleFee`, `BSingleFee` and `TickerType`.

* `SSrc`: Source code of Sell order transaction
* `BSrc`: Source code of Buy order transaction
* `SSingleFee`: fee of matched sell order
* `BSingleFee`: fee of matched buy order
* `TickerType`: ticker type

In `Order` data structure, there is a new field: `singlefee`. This is used to show the fee of this order.

`Status` is used to indicate the current status of this order. Namely there are 9 status:  0 for Acknowledge; 1 for Canceled ; 2 for Expired , 3 for IocNoFill, 4 for IocExpire, 5 for PartialFill, 6 for FullyFill, 7 for FailedBlocking, 8 for FailedMatching.

For example:


```json
{
  "Height": 36384232,
  "Timestamp": 1569196830136718300,
  "NumOfMsgs": 10,
  "Trades": {
    "NumOfMsgs": 2,
    "Trades": [
      {
        "Id": "36384232-0",
        "Symbol": "DEFI-FA5_BNB",
        "Price": 345282,
        "Qty": 23200000000,
        "Sid": "5F511BE6120CE2F92877F3A1E92D408CE56A5CCC-62632",
        "Bid": "4C28D006CF8061E05EEE50D17D8B2375CE09E7EC-71967",
        "Sfee": "BNB:32042",
        "Bfee": "BNB:32042",
        "SSrc": 0,
        "BSrc": 0,
        "SSingleFee": "BNB:32042",
        "BSingleFee": "BNB:32042",
        "TickType": 5,
        "SAddr": "bnb1tag3hesjpn30j2rh7ws7jt2q3njk5hxvsx023c",
        "BAddr": "bnb1fs5dqpk0sps7qhhw2rghmzerwh8qnelv7tyat8"
      },
      {
        "Id": "36384232-1",
        "Symbol": "EQL-586_BNB",
        "Price": 4798,
        "Qty": 110000000000,
        "Sid": "610BFE81695EFD89B19D27D1E8C17D57C0239C66-6367",
        "Bid": "B3CEA961E95C4F104A791F6C33DB83458577BA76-5471",
        "Sfee": "BNB:2111",
        "Bfee": "BNB:2111",
        "SSrc": 0,
        "BSrc": 0,
        "SSingleFee": "BNB:2111",
        "BSingleFee": "BNB:2111",
        "TickType": 2,
        "SAddr": "bnb1vy9laqtftm7cnvvaylg73sta2lqz88rxs72mx7",
        "BAddr": "bnb1k082jc0ft383qjnerakr8kurgkzh0wnk8gulnj"
      }
    ]
  },
  "Orders": {
    "NumOfMsgs": 8,
    "Orders": [
      {
        "Symbol": "DEFI-FA5_BNB",
        "Status": 0,
        "OrderId": "37D9383E6AD9AFEF6C5D8066ABA3ACA8C75D9F39-1724193",
        "TradeId": "",
        "Owner": "bnb1xlvns0n2mxh77mzaspn2hgav4rr4m8eerfju38",
        "Side": 1,
        "OrderType": 2,
        "Price": 344271,
        "Qty": 89600000000,
        "LastExecutedPrice": 0,
        "LastExecutedQty": 0,
        "CumQty": 0,
        "Fee": "",
        "OrderCreationTime": 1569196830136718300,
        "TransactionTime": 1569196830136718300,
        "TimeInForce": 1,
        "CurrentExecutionType": 0,
        "TxHash": "D74A96022A2F090D7D739C1C6716481A215E0F7F10C430C28290758E9DC4EF73",
        "SingleFee": ""
      },
      {
        "Symbol": "EQL-586_BNB",
        "Status": 0,
        "OrderId": "B3CEA961E95C4F104A791F6C33DB83458577BA76-5471",
        "TradeId": "",
        "Owner": "bnb1k082jc0ft383qjnerakr8kurgkzh0wnk8gulnj",
        "Side": 1,
        "OrderType": 2,
        "Price": 4798,
        "Qty": 110000000000,
        "LastExecutedPrice": 0,
        "LastExecutedQty": 0,
        "CumQty": 110000000000,
        "Fee": "",
        "OrderCreationTime": 1569196830136718300,
        "TransactionTime": 1569196830136718300,
        "TimeInForce": 1,
        "CurrentExecutionType": 0,
        "TxHash": "792BA5F932813F9C006075EAA090D82305AD049DDC570271FA8515339A874E97",
        "SingleFee": ""
      },
      {
        "Symbol": "DEFI-FA5_BNB",
        "Status": 0,
        "OrderId": "4C28D006CF8061E05EEE50D17D8B2375CE09E7EC-71967",
        "TradeId": "",
        "Owner": "bnb1fs5dqpk0sps7qhhw2rghmzerwh8qnelv7tyat8",
        "Side": 1,
        "OrderType": 2,
        "Price": 345283,
        "Qty": 23200000000,
        "LastExecutedPrice": 0,
        "LastExecutedQty": 0,
        "CumQty": 23200000000,
        "Fee": "",
        "OrderCreationTime": 1569196830136718300,
        "TransactionTime": 1569196830136718300,
        "TimeInForce": 1,
        "CurrentExecutionType": 0,
        "TxHash": "574CB6DAF26C5D1A465A8D86760FFDFF3DA5946F9C02EB5B89051A8120844523",
        "SingleFee": ""
      },
      {
        "Symbol": "DEFI-FA5_BNB",
        "Status": 0,
        "OrderId": "5F511BE6120CE2F92877F3A1E92D408CE56A5CCC-62632",
        "TradeId": "",
        "Owner": "bnb1tag3hesjpn30j2rh7ws7jt2q3njk5hxvsx023c",
        "Side": 2,
        "OrderType": 2,
        "Price": 345282,
        "Qty": 23200000000,
        "LastExecutedPrice": 0,
        "LastExecutedQty": 0,
        "CumQty": 23200000000,
        "Fee": "",
        "OrderCreationTime": 1569196830136718300,
        "TransactionTime": 1569196830136718300,
        "TimeInForce": 1,
        "CurrentExecutionType": 0,
        "TxHash": "9D8EF7CEAE5D2CDC4026F6306296D57764BB80099B3A65865971D8D71399B6EA",
        "SingleFee": ""
      },
      {
        "Symbol": "EQL-586_BNB",
        "Status": 5,
        "OrderId": "610BFE81695EFD89B19D27D1E8C17D57C0239C66-6367",
        "TradeId": "36384232-1",
        "Owner": "bnb1vy9laqtftm7cnvvaylg73sta2lqz88rxs72mx7",
        "Side": 2,
        "OrderType": 2,
        "Price": 4798,
        "Qty": 230000000000,
        "LastExecutedPrice": 4798,
        "LastExecutedQty": 110000000000,
        "CumQty": 110000000000,
        "Fee": "BNB:2111",
        "OrderCreationTime": 1569196786802324000,
        "TransactionTime": 1569196830136718300,
        "TimeInForce": 1,
        "CurrentExecutionType": 0,
        "TxHash": "EDF132EBDA03382D2BFF7EF58CDE574D4E3FB9622BD8BCF12BA6ABECD692BA5C",
        "SingleFee": "BNB:2111"
      },
      {
        "Symbol": "DEFI-FA5_BNB",
        "Status": 6,
        "OrderId": "4C28D006CF8061E05EEE50D17D8B2375CE09E7EC-71967",
        "TradeId": "36384232-0",
        "Owner": "bnb1fs5dqpk0sps7qhhw2rghmzerwh8qnelv7tyat8",
        "Side": 1,
        "OrderType": 2,
        "Price": 345283,
        "Qty": 23200000000,
        "LastExecutedPrice": 345282,
        "LastExecutedQty": 23200000000,
        "CumQty": 23200000000,
        "Fee": "BNB:32042",
        "OrderCreationTime": 1569196830136718300,
        "TransactionTime": 1569196830136718300,
        "TimeInForce": 1,
        "CurrentExecutionType": 0,
        "TxHash": "574CB6DAF26C5D1A465A8D86760FFDFF3DA5946F9C02EB5B89051A8120844523",
        "SingleFee": "BNB:32042"
      },
      {
        "Symbol": "DEFI-FA5_BNB",
        "Status": 6,
        "OrderId": "5F511BE6120CE2F92877F3A1E92D408CE56A5CCC-62632",
        "TradeId": "36384232-0",
        "Owner": "bnb1tag3hesjpn30j2rh7ws7jt2q3njk5hxvsx023c",
        "Side": 2,
        "OrderType": 2,
        "Price": 345282,
        "Qty": 23200000000,
        "LastExecutedPrice": 345282,
        "LastExecutedQty": 23200000000,
        "CumQty": 23200000000,
        "Fee": "BNB:32042",
        "OrderCreationTime": 1569196830136718300,
        "TransactionTime": 1569196830136718300,
        "TimeInForce": 1,
        "CurrentExecutionType": 0,
        "TxHash": "9D8EF7CEAE5D2CDC4026F6306296D57764BB80099B3A65865971D8D71399B6EA",
        "SingleFee": "BNB:32042"
      },
      {
        "Symbol": "EQL-586_BNB",
        "Status": 6,
        "OrderId": "B3CEA961E95C4F104A791F6C33DB83458577BA76-5471",
        "TradeId": "36384232-1",
        "Owner": "bnb1k082jc0ft383qjnerakr8kurgkzh0wnk8gulnj",
        "Side": 1,
        "OrderType": 2,
        "Price": 4798,
        "Qty": 110000000000,
        "LastExecutedPrice": 4798,
        "LastExecutedQty": 110000000000,
        "CumQty": 110000000000,
        "Fee": "BNB:2111",
        "OrderCreationTime": 1569196830136718300,
        "TransactionTime": 1569196830136718300,
        "TimeInForce": 1,
        "CurrentExecutionType": 0,
        "TxHash": "792BA5F932813F9C006075EAA090D82305AD049DDC570271FA8515339A874E97",
        "SingleFee": "BNB:2111"
      }
    ]
  },
  "Proposals": {
    "NumOfMsgs": 0,
    "Proposals": null
  },
  "StakeUpdates": {
    "NumOfMsgs": 0,
    "CompletedUnbondingDelegations": null
  }
}
```


### 2. AccountBalance

You can set the `publishAccountBalance` option to `true` in `nodebinary/fullnode/{network}/node/app.toml`.<br/>
Then, the full node will save all the changed accounts.

* Example

```
{
	Owner:    string,
	Fee:      string,
	Balances: []{
	    Asset:  string,
        Free:   int64,
        Frozen: int64,
        Locked: int64
	}

}
```

### 3. OrderBook

You can set the `publishOrderBook` option to `true` in `nodebinary/fullnode/{network}/node/app.toml`.<br/>
Then, the full node will save all order book changes.

* Example

```
{
    Height:    int64,
    Timestamp: int64,
    NumOfMsgs: int,
    Books:     []{
       Symbol: string,
       Buys:   []{
            Price:   int64,
            LastQty: int64
       },
       Sells:  []{
            Price:   int64,
            LastQty: int64
       }
    }
}
```

### 4. BlockFee

You can set the `publishBlockFee` option to `true` in `nodebinary/fullnode/{network}/node/app.toml`.<br/>
Then, the full node will save all the block fee charged.

* Example

```
{
    Height:     int64,
    Fee:        string,
    Validators: []string
}
```


### 5. Transfers
You can set the `publishTransfer` option to `true` in `nodebinary/fullnode/{network}/node/app.toml`.<br/>
Then, the full node will save all the transfer transactions.

* Example

```
{
	Height:    int64,
	Num:       int,
	Timestamp: int64,
	Transfers: []{
        TxHash: string,
        Memo: string,
	    From: string,
        To:   []{
            Addr:  string,
            Coins: []{
                Denom:  string,
                Amount: int64
            }
        }
	}
}
```
### 6. Staking Record

You can set the `publishStaking` option to `true` in `nodebinary/fullnode/{network}/node/app.toml`.
Then, the full node will save all the messages about staking.

* Example

```
{
    "height":     int64,
    "timestamp":  int64,
    "numOfMsgs":  int,
       "validators": []{
        "feeAddr":      string,
        "operatorAddr": string,
        "consAddr":     string,
        "jailed":       bool,
        "status":       string,
        "tokens":       int64,
        "delegatorShares":int64,
        "description":{
          "moniker":  string,
          "identity": string,
          "website":  string,
          "details":  string,
        },
        "bondHeight": int64,
        "bondIntraTxCounter": int,
        "commission":{
            "rate":      int64,
            "maxRate":   int64,
            "maxChangeRate": int64,
            "updateTime": int64,
        },
        "distributionAddr":string,
        "sideChainId": string,
        "sideConsAddr": string,
        "sideFeeAddr": string
      },
      "removedValidators": map[string][]string, //key: chain id, value: operatorAddr
      "delegatioins": map[string][]{
        "delegator": string,
        "validator": string,
        "shares":    int64
    }, // map key: chain-id
    "unBondingDelegations": map[string][]{
        "delegator": string,
        "validator": string,
        "creationHeight": int64,
        "minTime": int64,
        "initialBalance": {
            "denom":  string,
            "amount": int64
        },
        "balance": {
            "denom":  string,
            "amount": int64
        }
    }, // map key: chain id
    "reDelegations": map[string][]{
        "delegator": string,
        "srcValidator": string,
        "dstValidator": string,
        "creationHeight": int64,
        "sharesSrc": int64,
        "sharesDst": int64,
        "initialBalance": {
            "denom":  string,
            "amount": int64
        },
        "balance": {
            "denom":  string,
            "amount": int64
        },
        "minTime": int64
    }, // map key: chain id
    "completedUBDs": map[string][]{
        "validator": string,
        "delegator": string,
        "amount":  {
            "denom":  string,
            "amount": int64
        }
    },
    "completedREDs": map[string][]{
        "delegator": string,
        "srcValidator": string,
        "dstValidator": string
    },
    "delegateEvents": map[string][]{
        "validator": string,
        "delegator": string,
        "amount":  {
            "denom":  string,
            "amount": int64
        },
        "txHash": string
    },
    "unDelegateEvents": map[string][]{
        "validator": string,
        "delegator": string,
        "amount":  {
            "denom":  string,
            "amount": int64
        },
        "txHash": string
    },
    "reDelegateEvents": map[string][]{
        "delegator": string,
        "srcValidator": string,
        "dstValidator": string,
        "amount":  {
            "denom":  string,
            "amount": int64
        },
        "txHash": string
    },
    "electedValidators": map[string][]{
        "feeAddr":      string,
        "operatorAddr": string,
        "consAddr":     string,
        "jailed":       bool,
        "status":       string,
        "tokens":       int64,
        "delegatorShares":int64,
        "description":{
          "moniker":  string,
          "identity": string,
          "website":  string,
          "details":  string,
},
        "bondHeight": int64,
        "bondIntraTxCounter": int,
        "commission":{
            "rate":      int64,
            "maxRate":   int64,
            "maxChangeRate": int64,
            "updateTime": int64,
        },
        "distributionAddr":string,
        "sideChainId": string,
        "sideConsAddr": string,
        "sideFeeAddr": string
    }
}

```

* Schema

```json
{
    "type": "record",
    "name": "Staking",
    "namespace": "org.binance.dex.model.avro",
    "fields": [
        {"name": "height", "type": "long"},
        {"name": "timestamp", "type": "long" },
        {"name": "numOfMsgs", "type": "int" },
        {"name": "validators", "type": ["null", {
            "type": "array",
            "items": {
                "type": "record",
                "name": "Validator",
                "namespace": "org.binance.dex.model.avro",
                "fields": [
                    {"name": "feeAddr", "type": "string"},
                    {"name": "operatorAddr", "type": "string"},
                    {"name": "consAddr", "type": ["null","string"], "default": "null"},
                    {"name": "jailed", "type": "boolean"},
                    {"name": "status", "type": "string"},
                    {"name": "tokens", "type": "long"},
                    {"name": "delegatorShares", "type": "long"},
                    {"name": "description", "type": {
                        "type": "record",
                        "name": "Description",
                        "namespace": "org.binance.dex.model.avro",
                        "fields": [
                            {"name": "moniker", "type": "string"},
                            {"name": "identity", "type": "string"},
                            {"name": "website", "type": "string"},
                            {"name": "details", "type": "string"}
                        ]
                    }},
                    {"name": "bondHeight", "type": "long"},
                    {"name": "bondIntraTxCounter", "type": "int"},
                    {"name": "commission", "type": {
                        "type": "record",
                        "name": "Commission",
                        "namespace": "org.binance.dex.model.avro",
                        "fields": [
                            {"name": "rate", "type": "long"},
                            {"name": "maxRate", "type": "long"},
                            {"name": "maxChangeRate", "type": "long"},
                            {"name": "updateTime", "type": "long"}
                        ]
                    }},
                    {"name": "distributionAddr", "type": "string"},
                    {"name": "sideChainId", "type": "string"},
                    {"name": "sideConsAddr", "type": "string"},
                    {"name": "sideFeeAddr", "type": "string"}
                ]
            }
        }], "default": "null"},
        {"name": "removedValidators", "type": ["null", {
            "type": "map",
            "values": {
                "type": "array",
                "items": {"type": "string"}
            }
        }], "default": null},
        {"name": "delegations", "type": ["null",{
            "type": "map",
            "values": {
                "type": "array",
                "items": {
                    "type": "record",
                    "name": "Delegation",
                    "namespace": "org.binance.dex.model.avro",
                    "fields": [
                        {"name": "delegator", "type": "string"},
                        {"name": "validator", "type": "string"},
                        {"name": "shares", "type": "long"}
                    ]
                }
            }
        }], "default": null},
        {"name": "unBondingDelegations", "type": ["null",{
            "type": "map",
            "values": {
                "type": "array",
                "items": {
                    "type": "record",
                    "name": "UnBondingDelgation",
                    "namespace": "org.binance.dex.model.avro",
                    "fields": [
                        {"name": "delegator", "type": "string"},
                        {"name": "validator", "type": "string"},
                        {"name": "creationHeight", "type": "long"},
                        {"name": "minTime", "type": "long"},
                        {"name": "initialBalance", "type": {
                            "type": "record",
                            "name": "Coin",
                            "namespace": "org.binance.dex.model.avro",
                            "fields": [
                                { "name": "denom", "type": "string" },
                                { "name": "amount", "type": "long" }
                            ]
                        }},
                        {"name": "balance", "type": "org.binance.dex.model.avro.Coin"}
                    ]
                }
            }
        }], "default": null},
        {"name": "reDelegations", "type": ["null",{
            "type": "map",
            "values": {
                "type": "array",
                "items": {
                    "type": "record",
                    "name": "ReDelegation",
                    "namespace": "org.binance.dex.model.avro",
                    "fields": [
                        {"name": "delegator", "type": "string"},
                        {"name": "srcValidator", "type": "string"},
                        {"name": "dstValidator", "type": "string"},
                        {"name": "creationHeight", "type": "long"},
                        {"name": "sharesSrc", "type": "long"},
                        {"name": "sharesDst", "type": "long"},
                        {"name": "initialBalance", "type": "org.binance.dex.model.avro.Coin" },
                        {"name": "balance", "type": "org.binance.dex.model.avro.Coin" },
                        {"name": "minTime", "type": "long"}
                    ]
                }
            }
        }], "default": null},
        {"name": "completedUBDs", "type": ["null",{
            "type": "map",
            "values": {
                "type": "array",
                "items": {
                    "type": "record",
                    "name": "CompletedUnbondingDelegation",
                    "namespace": "org.binance.dex.model.avro",
                    "fields": [
                        { "name": "validator", "type": "string" },
                        { "name": "delegator", "type": "string" },
                        { "name": "amount", "type": "org.binance.dex.model.avro.Coin"}
                    ]
                }
            }
        }],  "default": null},
        {"name": "completedREDs", "type": ["null",{
            "type": "map",
            "values": {
                "type": "array",
                "items": {
                    "type": "record",
                    "name": "CompletedReDelegation",
                    "namespace": "org.binance.dex.model.avro",
                    "fields": [
                        { "name": "delegator", "type": "string" },
                        { "name": "srcValidator", "type": "string" },
                        { "name": "dstValidator", "type": "string" }
                    ]
                }
            }
        }],  "default": null},
        {"name": "delegateEvents", "type": ["null", {
            "type": "map",
            "values": {
                "type": "array",
                "items": {
                    "type": "record",
                    "name": "DelegateEvent",
                    "namespace": "org.binance.dex.model.avro",
                    "fields": [
                        {"name": "delegator", "type": "string"},
                        {"name": "validator", "type": "string"},
                        {"name": "amount", "type": "org.binance.dex.model.avro.Coin"},
                        {"name": "txHash", "type": "string"}
                    ]
                }
            }
        }], "default": null},
        {"name": "unDelegateEvents", "type": ["null", {
            "type": "map",
            "values": {
                "type": "array",
                "items": {
                    "type": "record",
                    "name": "UndelegateEvent",
                    "namespace": "org.binance.dex.model.avro",
                    "fields": [
                        {"name": "delegator", "type": "string"},
                        {"name": "validator", "type": "string"},
                        {"name": "amount", "type": "org.binance.dex.model.avro.Coin"},
                        {"name": "txHash", "type": "string"}
                    ]
                }
            }
        }], "default": null},
        {"name": "reDelegateEvents", "type": ["null", {
            "type": "map",
            "values": {
                "type": "array",
                "items": {
                    "type": "record",
                    "name": "RedelegateEvent",
                    "namespace": "org.binance.dex.model.avro",
                    "fields": [
                        {"name": "delegator", "type": "string"},
                        {"name": "srcValidator", "type": "string"},
                        {"name": "dstValidator", "type": "string"},
                        {"name": "amount", "type": "org.binance.dex.model.avro.Coin"},
                        {"name": "txHash", "type": "string"}
                    ]
                }
            }
        }], "default": null},
        {"name": "electedValidators", "type": ["null", {
            "type": "map",
            "values": {
                "type": "array",
                "items": "org.binance.dex.model.avro.Validator"
            }
        }], "default": null}
    ]
}
```


### 7. Reward Distribution

You can set the `publishDistributeReward` option to `true` in `nodebinary/fullnode/{network}/node/app.toml`.
Then, the full node will save all the messages about reward distribution.

* Example

```
{
    "height":     int64,
    "timestamp":  int64,
    "numOfMsgs":  int,
    "distributions" : map[string][]{
        "validator": string,
        "selfDelegator": string,
        "distributeAddr": string,
        "valTokens": int64,
        "totalReward": int64,
        "commission": int64,
        "rewards": []{
            "delegator": string,
            "delegationTokens": int64,
            "reward": int64
        }
    } // map key: chain id
}
```

* Schema

```
{
    "type": "record",
    "name": "Distribution",
    "namespace": "org.binance.dex.model.avro",
    "fields": [
        { "name": "height", "type": "long" },
        { "name": "timestamp", "type": "long" },
        { "name": "numOfMsgs", "type": "int" },
        { "name": "distributions", "type": {
                "type": "map",
                "values": {
                    "type": "array",
                    "items": {
                        "type": "record",
                        "name": "DistributionData",
                        "namespace": "org.binance.dex.model.avro",
                        "fields": [
                            {"name": "validator", "type": "string"},
                            {"name": "selfDelegator","type": "string"},
                            {"name": "distributeAddr","type": "string"},
                            {"name": "valTokens", "type": "long"},
                            {"name": "totalReward", "type": "long"},
                            {"name": "commission", "type": "long"},
                            {"name": "rewards", "type":{
                                "type": "array",
                                "items": {
                                    "type": "record",
                                    "name": "Reward",
                                    "namespace": "org.binance.dex.model.avro",
                                    "fields":[
                                        {"name": "delegator", "type": "string"},
                                        {"name": "delegationTokens", "type": "long"},
                                        {"name": "reward", "type": "long"}
                                    ]
                                }
                            }}
                        ]
                    }
                }
            }
        }
    ]
}
```

### 8. Slashing

You can set the `publishSlashing` option to `true` in `nodebinary/fullnode/{network}/node/app.toml`.
Then, the full node will save all the messages about slashing.

* Example

```
{
    "height":     int64,
    "timestamp":  int64,
    "numOfMsgs":  int,
    "slashData":  map[string][]{
        "validator": string,
        "infractionType": int,
        "infractionHeight": int64,
        "jailUtil": int64,
        "slashAmount": int64,
        "toFeePool": int64,
        "submitter": string,
        "submitterReward": int64,
        "validatorsCompensation": []{
            "address": string,
            "amount": int64
        }
    }
}
```

* Schema

```json
{
    "type": "record",
    "name": "Slashing",
    "namespace": "org.binance.dex.model.avro",
    "fields": [
        { "name": "height", "type": "long" },
        { "name": "timestamp", "type": "long" },
        { "name": "numOfMsgs", "type": "int" },
        { "name": "slashData", "type": {
            "type": "map",
            "values": {
                "type": "array",
                "items": {
                    "type": "record",
                    "name": "SlashData",
                    "namespace": "org.binance.dex.model.avro",
                    "fields": [
                        {"name": "validator", "type": "string"},
                        {"name": "infractionType", "type": "int"},
                        {"name": "infractionHeight", "type": "long"},
                        {"name": "jailUtil", "type": "long"},
                        {"name": "slashAmount", "type": "long"},
                        {"name": "toFeePool", "type": "long"},
                        {"name": "submitter", "type": "string"},
                        {"name": "submitterReward", "type": "long"},
                        {"name": "validatorsCompensation", "type":{
                            "type": "array",
                            "items": {
                                "type": "record",
                                "name": "AllocatedAmt",
                                "namespace": "org.binance.dex.model.avro",
                                "fields":[
                                    {"name": "address", "type": "string"},
                                    {"name": "amount", "type": "long"}
                                ]
                            }
                        }}
                    ]
                }
            }
        }}
    ]
}
```

### 9. CrossTransfer

You can set the `publishCrossTransfer` option to `true` in `nodebinary/fullnode/{network}/node/app.toml`.
Then, the full node will save all the messages about cross transfer.

* Example

```
{
    "height":     int64,
    "timestamp":  int64,
    "num":        int,
    "transfers":  []{
        "txhash": string,
        "type": string,
        "relayerFee": int64,
        "chainid": string,
        "from": "string",
        "denom": string,
        "contract": string,
        "decimals": int,
        "to": []{
            "addr": string,
            "amount": int64
        }
    }
}
```

* Schema

```json
{
    "type": "record",
    "name": "CrossTransfers",
    "namespace": "com.company",
    "fields": [
        { "name": "height", "type": "long"},
        { "name": "num", "type": "int" },
        { "name": "timestamp", "type": "long" },
        { "name": "transfers",
          "type": {
            "type": "array",
            "items": {
                "type": "record",
                "name": "Transfer",
                "namespace": "com.company",
                "fields": [
                    { "name": "txhash", "type": "string" },
                    { "name": "type", "type": "string" },
                    { "name": "relayerFee", "type": "long" },
                    { "name": "chainid", "type": "string" },
                    { "name": "from", "type": "string" },
                    { "name": "denom", "type": "string" },
                    { "name": "contract", "type": "string" },
                    { "name": "decimals", "type": "int" },
                    { "name": "to",
                          "type": {
                             "type": "array",
                            "items": {
                                "type": "record",
                                "name": "Receiver",
                                "namespace": "com.company",
                                "fields": [
                                    { "name": "addr", "type": "string" },
                                    { "name": "amount", "type": "long" }
                                ]
                            }
                          }
                    }
                ]
            }
          }
        }
    ]
}
```

### 10. SideProposal

You can set the `publishSideProposal` option to `true` in `nodebinary/fullnode/{network}/node/app.toml`.
Then, the full node will save all the messages about side proposals.

* Example

```
{
    "height":     int64,
    "timestamp":  int64,
    "numOfMsgs":  int,
    "proposals":  []{
        "id": int64,
        "chainid": string,
        "status": string
    }
}
```

* Schema

```json
{
    "type": "record",
    "name": "SideProposals",
    "namespace": "com.company",
    "fields": [
        { "name": "height", "type": "long" },
        { "name": "timestamp", "type": "long" },
        { "name": "numOfMsgs", "type": "int" },
        { "name": "proposals", "type": {
            "type": "array",
            "items":
            {
                "type": "record",
                "name": "Proposal",
                "namespace": "org.binance.dex.model.avro",
                "fields": [
                    { "name": "id", "type": "long" },
                    { "name": "chainid", "type": "string" },
                    { "name": "status", "type": "string" }
                ]
            }
           }
        }
    ]
}
```

### 11. BreatheBlock

You can set the `publichBreatheBlock` option to `true` in `nodebinary/fullnode/{network}/node/app.toml`. Then, the full node will save all the messages about side proposals.

* Example

```
{
    "height":     int64,
    "timestamp":  int64
}
```

* Schema

```json
{
    "type": "record",
    "name": "BreatheBlock",
    "namespace": "org.binance.dex.model.avro",
    "fields": [
        {"name": "height", "type": "long"},
        {"name": "timestamp", "type": "long"}
    ]
}
```


## Publish Different Messages to Kafka
You can set the `publishKafka` option to `true` in `nodebinary/fullnode/{network}/node/app.toml`.<br/>
Then, the full node will save messages that you are interested into Kafka, and you can consume them in your own apps.<br/>
The message is encoded based on `Avro` serialization system.<br/>
Their schemas are shown below:<br/>

- **OrderUpdates**:

```json
{
    "type": "record",
    "name": "ExecutionResults",
    "namespace": "org.binance.dex.model.avro",
    "fields": [
        { "name": "height", "type": "long" },
        { "name": "timestamp", "type": "long" },
        { "name": "numOfMsgs", "type": "int" },
        { "name": "trades", "type": ["null", {
            "type": "record",
            "name": "Trades",
            "namespace": "org.binance.dex.model.avro",
            "fields": [
                { "name": "numOfMsgs", "type": "int" },
                { "name": "trades", "type": {
                    "type": "array",
                    "items":
                        {
                            "type": "record",
                            "name": "Trade",
                            "namespace": "org.binance.dex.model.avro",
                            "fields": [
                                { "name": "symbol", "type": "string" },
                                { "name": "id", "type": "string" },
                                { "name": "price", "type": "long" },
                                { "name": "qty", "type": "long" },
                                { "name": "sid", "type": "string" },
                                { "name": "bid", "type": "string" },
                                { "name": "sfee", "type": "string" },
                                { "name": "bfee", "type": "string" },
                                { "name": "saddr", "type": "string" },
                                { "name": "baddr", "type": "string" }
                            ]
                        }
                    }
                }
            ]
        }], "default": null },
        { "name": "orders", "type": ["null", {
            "type": "record",
            "name": "Orders",
            "namespace": "org.binance.dex.model.avro",
            "fields": [
                { "name": "numOfMsgs", "type": "int" },
                { "name": "orders", "type": {
                    "type": "array",
                    "items":
                    {
                        "type": "record",
                        "name": "Order",
                        "namespace": "org.binance.dex.model.avro",
                        "fields": [
                            { "name": "symbol", "type": "string" },
                            { "name": "status", "type": "string" },
                            { "name": "orderId", "type": "string" },
                            { "name": "tradeId", "type": "string" },
                            { "name": "owner", "type": "string" },
                            { "name": "side", "type": "int" },
                            { "name": "orderType", "type": "int" },
                            { "name": "price", "type": "long" },
                            { "name": "qty", "type": "long" },
                            { "name": "lastExecutedPrice", "type": "long" },
                            { "name": "lastExecutedQty", "type": "long" },
                            { "name": "cumQty", "type": "long" },
                            { "name": "fee", "type": "string" },
                            { "name": "orderCreationTime", "type": "long" },
                            { "name": "transactionTime", "type": "long" },
                            { "name": "timeInForce", "type": "int" },
                            { "name": "currentExecutionType", "type": "string" },
                            { "name": "txHash", "type": "string" }
                        ]
                    }
                   }
                }
            ]
        }], "default": null },
        { "name": "proposals", "type": ["null", {
            "type": "record",
            "name": "Proposals",
            "namespace": "org.binance.dex.model.avro",
            "fields": [
                { "name": "numOfMsgs", "type": "int" },
                { "name": "proposals", "type": {
                    "type": "array",
                    "items":
                    {
                        "type": "record",
                        "name": "Proposal",
                        "namespace": "org.binance.dex.model.avro",
                        "fields": [
                            { "name": "id", "type": "long" },
                            { "name": "status", "type": "string" }
                        ]
                    }
                   }
                }
            ]
        }], "default": null },
        { "name": "stakeUpdates", "type": ["null", {
            "type": "record",
            "name": "StakeUpdates",
            "namespace": "org.binance.dex.model.avro",
            "fields": [
                { "name": "numOfMsgs", "type": "int" },
                { "name": "completedUnbondingDelegations", "type": {
                    "type": "array",
                    "items":
                    {
                        "type": "record",
                        "name": "CompletedUnbondingDelegation",
                        "namespace": "org.binance.dex.model.avro",
                        "fields": [
                            { "name": "validator", "type": "string" },
                            { "name": "delegator", "type": "string" },
                            { "name": "amount", "type": {
                                    "type": "record",
                                    "name": "Coin",
                                    "namespace": "org.binance.dex.model.avro",
                                    "fields": [
                                        { "name": "denom", "type": "string" },
                                        { "name": "amount", "type": "long" }
                                    ]
                                }
                            }
                        ]
                     }
                   }
                }
            ]
        }], "default": null }
    ]
}
```

- **OrderBooksSchema**:
```
{
    "type": "record",
    "name": "Books",
    "namespace": "com.company",
    "fields": [
        { "name": "height", "type": "long" },
        { "name": "timestamp", "type": "long" },
        { "name": "numOfMsgs", "type": "int" },
        { "name": "books", "type": {
            "type": "array",
            "items":
                {
                    "type": "record",
                    "name": "OrderBookDelta",
                    "namespace": "com.company",
                    "fields": [
                        { "name": "symbol", "type": "string" },
                        { "name": "buys", "type": {
                            "type": "array",
                            "items": {
                                "type": "record",
                                "name": "PriceLevel",
                                "namespace": "com.company",
                                "fields": [
                                    { "name": "price", "type": "long" },
                                    { "name": "lastQty", "type": "long" }
                                ]
                            }
                        } },
                        { "name": "sells", "type": {
                            "type": "array",
                            "items": "com.company.PriceLevel"
                        } }
                    ]
                }
            }, "default": []
        }
    ]
}
```

- **AccountBalanceSchema**:

```json
{
            "type": "record",
            "name": "Accounts",
            "namespace": "com.company",
            "fields": [
                { "name": "height", "type": "long" },
                { "name": "numOfMsgs", "type": "int" },
                { "name": "accounts", "type": {
                    "type": "array",
                    "items":
                        {
                            "type": "record",
                            "name": "Account",
                            "namespace": "com.company",
                            "fields": [
                                { "name": "owner", "type": "string" },
                                { "name": "fee", "type": "string" },
                                { "name": "balances", "type": {
                                        "type": "array",
                                        "items": {
                                            "type": "record",
                                            "name": "AssetBalance",
                                            "namespace": "com.company",
                                            "fields": [
                                                { "name": "asset", "type": "string" },
                                                { "name": "free", "type": "long" },
                                                { "name": "frozen", "type": "long" },
                                                { "name": "locked", "type": "long" }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                   }, "default": []
                }
            ]
        }

```


- **BlockFeeSchema**:

```json
{
    "type": "record",
    "name": "BlockFee",
    "namespace": "com.company",
    "fields": [
        { "name": "height", "type": "long"},
        { "name": "fee", "type": "string"},
        { "name": "validators", "type": { "type": "array", "items": "string" }}
    ]
}
```

- **TransfersSchema**:

```json
{
    "type": "record",
    "name": "Transfers",
    "namespace": "com.company",
    "fields": [
        { "name": "height", "type": "long"},
        { "name": "num", "type": "int" },
        { "name": "timestamp", "type": "long" },
        { "name": "transfers",
          "type": {
            "type": "array",
            "items": {
                "type": "record",
                "name": "Transfer",
                "namespace": "com.company",
                "fields": [
                    { "name": "txhash", "type": "string" },
                    { "name": "from", "type": "string" },
                    { "name": "to",
                        "type": {
                            "type": "array",
                            "items": {
                                "type": "record",
                                "name": "Receiver",
                                "namespace": "com.company",
                                "fields": [
                                    { "name": "addr", "type": "string" },
                                    { "name": "coins",
                                        "type": {
                                            "type": "array",
                                            "items": {
                                                "type": "record",
                                                "name": "Coin",
                                                "namespace": "com.company",
                                                "fields": [
                                                    { "name": "denom", "type": "string" },
                                                    { "name": "amount", "type": "long" }
                                                ]
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
          }
        }
    ]
}
```
