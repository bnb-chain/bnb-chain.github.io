# 풀 노드에서 추가 데이터 얻기


다음 문서는 트랜잭션, 오더 북, 계정 변경, 수수료 지불 기능에 관심이 있고 풀 노드를 이용하여 자체적인 서비스를 제작하고자 하는 개발자를 대상으로 합니다.<br/>
아지 풀 노드를 배포하지 않았다면 다음 [문서](join-mainnet.md)를 참고해 주세요.

## 로컬 파일에 다른 메세지 게시

`nodebinary/fullnode/{network}/node/app.toml`에 `publishLocal`을 `true`로 설정할 수 있습니다. <br/>
풀 노드는 `{fullnode home}/marketdata/marketdata.json`에 퍼블리시 된 각 블록에 메세지를 추가하며, (각 줄은 주제 및 높이에 대한 json 객체입니다), 이 메세지는 자신의 앱에서 사용할 수 있습니다. 메세지 유형은 아래에 설명되어 있습니다.

참고: 해당 옵션을 킨 후의 블록 메세지만 저장됩니다. 이미 저장된 블록에 대해서는 메세지를 작성할 수 없습니다.

## Kafka Broker 버전 설정

bnbchaind `v0.6.3` 이 출시 된 후, `app.toml`에서 `kafka broker`버전을 설정할 수 있습니다. 기본 값은 `v2.1.0`입니다:

> 권장 버전은 2.1.0 이고 최소 버전은 0.8.2.0

```
kafkaVersion = "2.1.0"
```
만일 다른 버전의 Kafka를 사용하고 있으면, 우선 호환성을 테스트하세요.

### 1. 주문 업데이트
`nodebinary/fullnode/{network}/node/app.toml`의 `publishOrderUpdates`를 `true`로 설정하면<br/>
풀 노드는는 모든 채결된 거래와 변경된 주문 및 신청된 제안을 저장합니다.

* 예시:

다음과 같은 [추가 정보](../../get-extra-data-from-fullnode.md#publish-different-messages-to-local-files)들은 풀 노드로에서 내보낸 데이터에서도 찾아볼 수 있습니다.

### 변경
`trade` 데이터 구조에는 새로운 5개의 필드가 존재합니다: `SSrc`,`BSrc`,`SSingleFee`, `BSingleFee`, `TickerType`

* `SSrc`: 매매 주문 트랜잭션 소스 코드
* `BSrc`: 매수 주문 트랜잭션 소스 코드
* `SSingleFee`: 성사된 매매 주문 수수료
* `BSingleFee`: 성사된 구매 주문 수수료
* `TickerType`: 티커 유형

`Order` 데이터의 구조에는 `singlefee`라는 새로운 필드가 존재합니다. 이는 현재 주문의 수수료를 나타냅니다.

`Status`는 주문의 현재 상태를 나타냅니다. 9가지 상태로 표현되는데:  0은 인지; 1은 취소; 2는 만료, 3은 즉시구매 체결 실패, 4는 즉시구매 만료, 5는 일부 체결, 6은 전체 체결, 7는 블로킹 실패, 8은 매칭 실패 입니다.

예시:


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


### 2. 계정 잔고

`nodebinary/fullnode/{network}/node/app.toml`의 `publishAccountBalance`를 `true`로 설정하면<br/>
풀 노드는 변경된 계정을 전부 저장합니다.

* 예시

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

### 3. 오더 북

`nodebinary/fullnode/{network}/node/app.toml`의 `publishOrderBook`을 `true`로 설정하면<br/>
풀 노드는 오더 북의 변화를 전부 저장합니다.

* 예시

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

### 4. 블록 수수료

`nodebinary/fullnode/{network}/node/app.toml`의 `publishBlockFee`을 `true`로 설정하면<br/>
풀 노드는 부과된 블록 수수료를 전부 저장합니다.

* 예시

```
{
    Height:     int64,
    Fee:        string,
    Validators: []string
}
```


### 5. 전송
`nodebinary/fullnode/{network}/node/app.toml`의 `publishTransfer`를 `true`로 설정하면<br/>
풀 노드는 모든 전송 트랜잭션을 저장합니다.

* 예시

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
### 6. 스테이킹 기록

`nodebinary/fullnode/{network}/node/app.toml`의 `publishStaking`을 `true`로 설정하면<br/>
풀 노드는 스테이킹과 관련된 모든 메세지를 저장합니다.

* 예시

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

* 스키마

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


### 7. 보상 분배

`nodebinary/fullnode/{network}/node/app.toml`의 `publishDistributeReward`를 `true`로 설정하면<br/>
풀 노드는 보상 분배와 관련된 모든 메세지를 저장합니다.

* 예시

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

* 스키마

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

### 8. 슬래싱

`nodebinary/fullnode/{network}/node/app.toml`의 `publishSlashing`을 `true`로 설정하면<br/>
풀 노드는 슬래싱에 관련된 모든 메세지를 저장합니다.

* 예시

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

* 스키마

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

### 9. 크로스 전송

`nodebinary/fullnode/{network}/node/app.toml`의 `publishCrossTransfer`를 `true`로 설정하면<br/>
풀 노드는 크로스 전송에 관한 모든 메세지를 저장합니다.

* 예시

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

* 스키마

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

### 10. 사이드 제안

`nodebinary/fullnode/{network}/node/app.toml`의 `publishSideProposal`을 `true`로 설정하면<br/>
풀 노드는 사이드 제안에 관한 모든 메세지를 저장합니다.

* 예시

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

* 스키마

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

`nodebinary/fullnode/{network}/node/app.toml`의 `publichBreatheBlock`를 `true`로 설정하면<br/>
풀 노드는 BreatheBlock에 관한 모든 메세지를 저장합니다. 
(Breathe Block은 제안 통과 후 비컨 체인의 스테이킹/슬래싱/오라클 모듈의 매개 변수들의 변경이 이뤄지는 블록입니다)

* 예시

```
{
    "height":     int64,
    "timestamp":  int64
}
```

* 스키마

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

## Kafka에 다른 메세지 작성
`nodebinary/fullnode/{network}/node/app.toml`의 `publishKafka`를 `true` 로 설정하면<br/>
풀 노드는 Kafka에 관심 있다는 메세지를 저장하며, 이를 자체 앱에서 사용할 수 있습니다.<br/>
메세지는 `Avro`직렬화 시스템에 기반하여 인코딩됩니다.<br/>
스키마는 다음과 같습니다:<br/>

- **주문 업데이트(OrderUpdates)**:
```
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

- **오더북 스키마(OrderBooksSchema)**:
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

- **계정 잔고 스키마(AccountBalanceSchema)**:
```
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


- **블록 수수료 스키마(BlockFeeSchema)**:
```
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

- **전송 스키마(TransfersSchema)**:
```
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
