# Transaction Data
A transaction in tendermint is any sequence of bytes. It's up to the ABCI application to accept or reject the transactions.

On Binance Chain, all kinds of transactions are wrapped in type `StdTx` before marshalling by [Amino](https://github.com/tendermint/go-amino):
```go
type StdTx struct {
    Msg                       `json:"msg"`
    Fee        StdFee         `json:"fee"`
    Signatures []StdSignature `json:"signatures"`
}
```

All kinds of transactions have the same type of Fee and Signatures, the difference is the `msg` part.

Adding new transaction types would not require fork of blockchain, while upgrading transaction would be done via adding new transaction type: e.g. Burn2 vs. Burn.

### Order
```go
type Msg struct {
    From   sdk.Address `json:"from"`
    Id	   string `json:"id"`
    Pair   string `json:"pair"`
    Type   int8   `json:"type"`
    Side   int8   `json:"side"`
    Price  int64  `json:price`
    Quantity int64 `json:"quantity"`
    TimeInForce int8 `json:"tif"
}
```

### Issue Msg

```go
type Msg struct {
  From     sdk.Address `json:"from"`
  Name     string      `json:"name"`
  Symbol   string      `json:"symbol"`
  Supply   int64       `json:"supply"`
  Decimals int8        `json:"decimals"`
}
```

### Burn/Freeze/Unfreeze Msg

```go
type Msg struct {
  From   sdk.Address `json:"from"`
  Symbol string      `json:"symbol"`
  Amount int64       `json:"amount"`
}
```

### IssueTiny/IssueMini Msg

```go
type Msg struct {
  From        sdk.AccAddress `json:"from"`
  Name        string         `json:"name"`
  Symbol      string         `json:"symbol"`
  TotalSupply int64          `json:"total_supply"`
  Mintable    bool           `json:"mintable"`
  TokenURI    string         `json:"token_uri"`
}
```

### SetURI Msg

```go
type Msg struct {
  From     sdk.AccAddress `json:"from"`
  Symbol   string         `json:"symbol"`
  TokenURI string         `json:"token_uri"`
}
```

### ListMini Msg

```go
type Msg struct {
  From             sdk.AccAddress `json:"from"`
  BaseAssetSymbol  string         `json:"base_asset_symbol"`
  QuoteAssetSymbol string         `json:"quote_asset_symbol"`
  InitPrice        int64          `json:"init_price"`
}
```

## Amino Types

Amino uses 4-byte type prefixes to encode type information. This list was obtained through `cdc.PrintTypes(os.Stdout)`.

There is an example on how this prefix is used in JavaScript [here](https://github.com/mappum/js-tendermint/blob/51f4a8601e5e1a697c905bb0612be21ad46ec484/src/types.js#L87). We should use [varstruct](https://www.npmjs.com/package/varstruct) to encode binary structures.

More documentation is available [here](../../learn/encoding/encoding.md)

Binance Chain JavaScript SDK Amino API [example](https://github.com/bnb-chain/javascript-sdk/wiki/API-Examples#amino-js-amino)


| Type | Name | Prefix | Length | Notes |
| ---- | ---- | ------ | ----- | ------ |
| PubKeyEd25519 | tendermint/PubKeyEd25519 | 0x1624DE64 | 0x20 |  |
| PubKeySecp256k1 | tendermint/PubKeySecp256k1 | 0xEB5AE987 | 0x21 |  |
| PubKeyMultisigThreshold | tendermint/PubKeyMultisigThreshold | 0x22C1F7E2 | variable |  |
| PrivKeyEd25519 | tendermint/PrivKeyEd25519 | 0xA3288910 | 0x40 |  |
| PrivKeySecp256k1 | tendermint/PrivKeySecp256k1 | 0xE1B0F79B | 0x20 |  |
| MsgSend | cosmos-sdk/Send | 0x2A2C87FA | variable |  |
| Genesis | dex/Genesis | 0xDE082972 | variable |  |
| NewOrderMsg | dex/NewOrder | 0xCE6DC043 | variable |  |
| CancelOrderMsg | dex/CancelOrder | 0x166E681B | variable |  |
| ListMsg | dex/ListMsg | 0xB41DE13F | variable |  |
| TradingPair | dex/TradingPair | 0x4F88DF56 | variable |  |
| FeeConfig | dex/FeeConfig | 0xF7DB5159 | variable |  |
| OrderBookSnapshot | dex/OrderBookSnapshot | 0x48C09C8E | variable |  |
| ActiveOrders | dex/ActiveOrders | 0xBB70A053 | variable |  |
| RecentPrice | dex/RecentPrice | 0x278FAD64 | variable |  |
| IssueMsg | tokens/IssueMsg | 0x17EFAB80 | variable |  |
| MintMsg | tokens/MintMsg | 0x467E0829 | variable |  |
| BurnMsg | tokens/BurnMsg | 0x7ED2D2A0 | variable |  |
| FreezeMsg | tokens/FreezeMsg | 0xE774B32D | variable |  |
| UnfreezeMsg | tokens/UnfreezeMsg | 0x6515FF0D | variable |  |
| AppAccount | bnbchain/Account | 0x4BDC4C27 | variable |  |
| Token | bnbchain/Token | 0x140364E6 | variable |  |
| StdTx | auth/StdTx | 0xF0625DEE | variable |  |
| MsgCreateValidator | cosmos-sdk/MsgCreateValidator | 0xEB361D01 | variable |  |
| MsgCreateValidatorProposal | cosmos-sdk/MsgCreateValidatorProposal | 0xDB6A19FD | variable |  |
| MsgEditValidator | cosmos-sdk/MsgEditValidator | 0xC2E8BCCD | variable |  |
| MsgDelegate | cosmos-sdk/MsgDelegate | 0x921D2E4E | variable |  |
| MsgBeginUnbonding | cosmos-sdk/BeginUnbonding | 0xA3823C9A | variable |  |
| MsgBeginRedelegate | cosmos-sdk/BeginRedelegate | 0x267996D2 | variable |  |
| MsgSubmitProposal | cosmos-sdk/MsgSubmitProposal | 0xB42D614E | variable |  |
| MsgDeposit | cosmos-sdk/MsgDeposit | 0xA18A56E5 | variable |  |
| MsgVote | cosmos-sdk/MsgVote | 0xA1CADD36 | variable |  |
| TextProposal | gov/TextProposal | 0xACCBA2DE | variable |  |
| FixedFeeParams | params/FixedFeeParams | 0xC2A96FA3 | variable |  |
| TransferFeeParam | params/TransferFeeParams | 0x9A3D2769 | variable |  |
| DexFeeParam | params/DexFeeParam | 0x495A5044 | variable |  |
| MiniToken | bnbchain/MiniToken | 0xE0051C20 | variable | |
| ListMiniMsg | dex/ListMiniMsg | 0x4C264019 | variable | |
| IssueMiniMsg | tokens/IssueMiniMsg | 0xA3F16C41 | variable | |
| IssueTinyMsg | tokens/IssueTinyMsg | 0xED2832D4 | variable | |
| SetURIMsg | tokens/SetURIMsg | 0x7B1D34E7 | variable | |


