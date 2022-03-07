# Beacon Chain  Transaction Encoding Specification

Beacon Chain  transactions are protocol-based data types and can only be submitted in a compatible encoded frame.

The fundamental encoding logic is from [Tendermint Amino](https://github.com/tendermint/go-amino), which derives from and is "largely compatible with" Google protocol-buffer's Proto3.

However the client sides only needs to stick to the specifications outlined below for the most frequently used transactions.

## Encoding Output

Beacon Chain  (Amino) encoding logic may encode a data structure into two output formats: Binary and JSON.

### JSON Marshal
Amino supports JSON encoding natively, which is the same as other usual json marshalers. Except that it can add one more `type` info for registered type, as shown below.

```json
{
  "type": "<amino type name>",
  "value": <JSON>
}
```
### Binary Marshal

**[Please note the below binary encoding logic is subjected to future changes. Please watch out for the community news](resources.md).**

Binary encoding is a variant of Google's protobuf. The bytes are laid out in the below sequence:

1. a [varint](https://developers.google.com/protocol-buffers/docs/encoding#varints) encoded integer - it contains the length of the encoded bytes for the object, which is displayed as `SIZE-OF-ENCODED` in the below structs. Please note that it contains the length of encoded bytes and also the type prefix (below), but not itself, e.g. if the encoded msg is 20 bytes, then the length would be 20 + 4 = 24, while 4 is used for the type prefix bytes.
2. an object type prefix of 4-8 bytes - For different type of objects, there will be different type prefixes, and they are displayed as in the specific objects below (data structures).
3. a binary encoded object - the encoding is mostly the same as protocol buffer encoding mechanism, except the embedded fields of complex type:
    - to encode data field of some specific types, an object type prefix for the field will be added ahead of the real encoding.
4. repeated (array) Encoding - it is the same as google protocol buffer, while encoding of the object/struct may contain the type prefix as shown below.

## Beacon Chain  Transaction Encoding

Below are the data types that can be sent to Beacon Chain  as requests, and their encoding layout. To simplify the presentation, we will use a variant of [Google protocol buffer proto3](https://developers.google.com/protocol-buffers/docs/proto3) language to illustrate how the data fields are organized. Except the all-capitalized fields, other fields will use the default `proto3` encoding logic.


### Standard Transaction

Transactions are each wrapped in the below "Standard Transaction": structure:

```go
// please note the field name is the JSON name.
message StdTx {
  uint64 SIZE-OF-ENCODED // varint encoded length of the structure after encoding, please note this includes both the below type prefix (4 bytes) and the all encoding bytes
  0xF0625DEE // hardcoded, object type prefix in 4 bytes
  repeated Msg msgs // array of size 1, containing the transaction message, which are one of the transaction types below. please check the above "Array Encoding"
  repeated StdSignature signatures // array of size 1, containing the standard signature structure of the transaction sender
  string memo // a short sentence of remark for the transaction. Please only `Transfer` transaction allows 'memo' input, and other transactions with non-empty `Memo` will be rejected.
  int64 source // an identifier for tools triggerring this transaction, set to zero if unwilling to disclose.
  bytes data // byte array, reserved for future use
}
```

### StdSignBytes
```go
type StdSignDoc struct {
  AccountNumber int64             `json:"account_number"`
  ChainID       string            `json:"chain_id"`
  Memo          string            `json:"memo"`
  Msgs          []json.RawMessage `json:"msgs"`
  Sequence      int64             `json:"sequence"`
  Source        int64             `json:"source"`
  Data          []byte            `json:"data"`
}

```

### Canonical Bytes for Signing

A transaction signature is **not** formed from the Amino-encoded transaction bytes themselves. Rather, a canonical representation of the transaction is generated in JSON format for signing.

This would allow for clients to sign a transaction off-chain, for example, with a hardware HSM device like a Ledger, or within a micro-service in an algorithmic trading system. An external system will not have to understand Amino encoding to be able to approve of the transaction's content and produce the signed JSON string.

The canonical bytes for signing are generated from the StdSignBytes method. It produces a JSON string similar to the format below (formatted for clarity):

```json
{
   "sequence" : "64",
   "account_number" : "12",
   "data" : null,
   "chain_id" : "chain-bnb",
   "memo" : "smiley",
   "msgs" : [
      {
         "inputs" : [
            {
               "coins" : [
                  {
                     "denom" : "BNB",
                     "amount" : "200000000"
                  }
               ],
               "address" : "bnc1hgm0p7khfk85zpz5v0j8wnej3a90w7098fpxyh"
            }
         ],
         "outputs" : [
            {
               "address" : "bnc1cku54wwn66w2rkgs3h6v5zxrwtzyew8chcl720",
               "coins" : [
                  {
                     "denom" : "BNB",
                     "amount" : "200000000"
                  }
               ]
            }
         ]
      }
   ],
   "source" : "1"
}
```


This JSON string, **with all whitespace removed and keys sorted in alphabetical order**, is signed with the private key of the sender. This signature is then attached to the `StdTx` structure described in the above section. Please note that the transaction broadcasted to the blockchain is not JSON - the JSON is merely used as a canonical representation to generate the signature.

The next section describes how the generated signature is attached to a transaction.

### Standard Signature

The sender's signature is stored in the `Standard Transaction` data via a `Standard Signature`, as shown below. This structure is included in the `StdTx` (see above).

Please note that `StdSignature` itself doesn't have type prefix, while the `PubKey` does.

```go
message StdSignature {
  uint64 SIZE-OF-ENCODED // varint encoded length of the structure after encoding
  // please note there is no type prefix for StdSignature
  message PubKey {
    0xEB5AE987 // hardcoded, object type prefix in 4 bytes
    uint64 SIZE-OF-ENCODED // varint encoded length of the bytes below
    bytes // no name or field id, just encode the bytes
  }
  PubKey pub_key // public key bytes of the signer address
  bytes signature // signature bytes, please check the chain access section for signature generation
  int64 account_number // another identifier of signer, which can be read from chain by account REST API or RPC
  int64 sequence // sequence number for the next transaction of the client, which can be read from the chain by account REST API or RPC. Please check the chain access section for details.
}
```

### Message Types
Messages represent the individual operations possible on Beacon Chain , and these can be inserted into the `StdTx.msgs` field. Message types are otherwise known as "transaction types", and these terms are used interchangebly in this document and in our technical documentation. So far every `StdTx` transaction "container" can only contain one "message".

#### Transfer
Transfer is the transaction used for transferring funds to different addresses.

```go
// please note the field name is the JSON name.
message Send {
  0x2A2C87FA   // hardcoded, object type prefix in 4 bytes
  message Token {
    string denom
    int64 amount
  }
  message Input {
    bytes address
    repeated Token coins
  }
  message Output {
    bytes address
    repeated Token coins
  }
  repeated Input inputs
  repeated Output outputs
}
```

#### NewOrder
NewOrder transaction will create a new order to buy or sell tokens on Binance DEX.

```go
// please note the field name is the JSON name.
message NewOrder {
  0xCE6DC043 // hardcoded, object type prefix in 4 bytes
  bytes sender // order originating address
  string id // order id, please check the Order ID section below for details.
  string symbol // symbol for trading pair in full name of the token
  int64 ordertype // only accept 2 for now, meaning limit order
  int64 side // 1 for buy and 2 fory sell
  int64 price // price of the order, which is the real price multiplied by 1e8 (10^8) and rounded to integer
  int64 quantity // quantity of the order, which is the real quantity multiplied by 1e8 (10^8) and rounded to integer
  int64 timeinforce // 1 for Good Till Expire(GTE) order and 3 for Immediate Or Cancel (IOC)
}
```

##### Order ID
Order ID is unique across the world. It is generated by sender and acknowledged by Binance DEX. The current implementation is composed from 3 parts:

1. Sender address in HEX format, without human-readable prefix
2. A dash sign: `-`
3. Sequence number

E.g. `40C2979694BBC961023D1D27BE6FC4D21A9FEBE6-5`

#### Cancel
Cancel transactions (cancel the outstanding/unfilled) orders from the Binance DEX. After cancel success, the locked quantity on the orders will return back to the originating address balance and become free to use, i.e. transfer or send new orders.

```go
// please note the field name is the JSON name.
message CancelOrder {
  0x166E681B // hardcoded, object type prefix in 4 bytes
  bytes sender // order originating address
  string symbol // symbol for trading pair in full name of the token
  string refid // order id of the order to cancel
}
```

#### Freeze
Freeze transaction will move the amount of the tokens into a `frozen` state, in which they cannot be used for transfers or sending new orders.

```go
// please note the field name is the JSON name.
message TokenFreeze {
  0xE774B32D // hardcoded, object type prefix in 4 bytes
  bytes from // owner address
  string symbol // token symbol, in full name with "-" suffix
  int64 amount // amount of tokens to freeze
}
```

#### Unfreeze
Unfreeze will reversely turn the amount of `frozen` tokens back to free state.

```go
// please note the field name is the JSON name.
message TokenUnfreeze {
  0x6515FF0D // hardcoded, object type prefix in 4 bytes
  bytes from // owner address
  string symbol // token symbol, in full name with "-" suffix
  int64 amount // amount of tokens to unfreeze
}
```

#### Vote
Vote transactions for proposals.

```go
// please note the field name is the JSON name.
message Vote {
  0xA1CADD36 // hardcoded, object type prefix in 4 bytes
  int64 proposal_id // ID of the proposal
  bytes voter // address of the voter
  uint64 option // option from OptionSet chosen by the voter
}
```

Below are options for `option`:
```go
OptionYes           = 0x01  // yes
OptionAbstain       = 0x02  // abstain
OptionNo            = 0x03  // no
OptionNoWithVeto    = 0x04  // no with veto
```

#### Issue
Issue (create) new asset on Beacon Chain .
```go
message IssueTokenValue  {
  0x17EFAB80 // hardcoded, object type prefix in 4 bytes
  bytes  from  // issuer's address
  string name // token name
  string symbol // token symbol
  string total_supply // total supply
  bool mintable // is mintable
}
```

#### Mint
Mint is used to increase the total supply of a token.
```go
message Mint {
  0x467E0829 // hardcoded, object type prefix in 4 bytes
  bytes from // sender's address
  string symbol string // token symbol
  int64 amount // increase amount
}
```

#### Burn
Burn is used to decrease the total supply of a token.
```go
message TokenBurn {
  0x7ED2D2A0 // hardcoded, object type prefix in 4 bytes
  bytes from // sender's address
  string symbol string // token symbol
  int64 amount // increase amount
}
```

#### List
List is used to add a new trading pair.
```go
message DexList{
  0xB41DE13F // hardcoded, object type prefix in 4 bytes
  bytes from // sender's address
  int64 proposal_id // id of corresponding proposal
  string base_asset_symbol // token symbol of base asset
  string quote_asset_symbol // token symbol of quote asset
  int64 init_price // init price of the new token
}
```

#### Submit Proposal
Submit proposal is used to create a proposal for validators about adding trading pairs
```go
message Submit{
  0xB42D614E // hardcoded, object type prefix in 4 bytes
  string title // Title of the proposal
  string description // Description of the proposal
  byte proposal_type // Type of proposal. Initial set {PlainTextProposal, SoftwareUpgradeProposal,ListTradingPair, FixedFeeParams}
  bytes proposer // Address of the proposer
  message Coin {
    string denom
    int64 amount
  }
  int64 VotingPeriod // Length of the voting period (s)
}
```

#### Deposit
Deposit is used to increase the total deposit of a proposal.
```go
message Deposit{
  0xA18A56E5 // hardcoded, object type prefix in 4 bytes
  int64 ProposalID // ID of the proposal
  bytes Depositer // Address of the depositer
  message Coin {
    string denom
    int64 amount
  }
}
```
#### Set Account Flags
You can set the flag value of your account.
```go
message SetAccountFlags{
  0xBEA6E301 // hardcoded, object type prefix in 4 bytes
  bytes from // sender's address
  int64 flag // account flag
}
```

#### Time-lock
You can only lock tokens on your own account for a certain period of time.
```go
message Timerelock{
  0x07921531 // hardcoded, object type prefix in 4 bytes
  bytes from // sender's address
  string description // Description of the lock
  message Coin {
    string denom
    int64 amount
  }
  repeated Coin amount
  int64 lock_time // lock time
}
```


#### Time-unlock
You can  unlock tokens on your own account after a certain period of time.
```go
message Timeunlock{
  0xC4050C6C   // hardcoded, object type prefix in 4 bytes
  bytes from // sender's address
  int64 id // lock time id
}
```

#### Time-relock
You can  relock tokens on your own account after a certain period of time.
```go
message Timerelock{
  0x504711DA // hardcoded, object type prefix in 4 bytes
  bytes from // sender's address
  int64 Id // lock time id
  string description // Description of the lock
  message Coin {
    string denom
    int64 amount
  }
  repeated Coin amount
  int64 lock_time // lock time
}
```

#### HTLT

Hash Timer Locked Transfer (HTLT) is a new transaction type on Beacon Chain , to serve as HTLC in the first step of Atomic Swap

```go
message HTLT{
  0xB33F9A24 // hardcoded, object type prefix in 4 bytes
  bytes from // sender's address
  bytes to // receiver's address
  string recipient_other_chain
  string sender_other_chain
  bytes random_number_hash
  int64  timestamp
  message Coin {
    string denom
    int64 amount
  }
  repeated Coin amount
  string expected_income
  int64 height_span
  bool cross_chain
}
```

#### Deposit HTLT
Deposit Hash Timer Locked Transfer is to lock new BEP2 asset to an existed HTLT which is for single chain atomic swap.

```go
message DepositHTLT{
  0x63986496 // hardcoded, object type prefix in 4 bytes
  bytes from // sender's address
  message Coin {
    string denom
    int64 amount
  }
  repeated Coin amount
  bytes swap_id
}
```
#### Claim HTLT
Claim Hash Timer Locked Transfer is to claim the locked asset by showing the random number value that matches the hash. Each HTLT locked asset is guaranteed to be release once.

```go
message ClaimHTLTMsg{
  0xC1665300 // hardcoded, object type prefix in 4 bytes
  bytes from // sender's address
  bytes swap_id
  bytes random_number
}
```
#### Refund HTLT

Refund Hash Timer Locked Transfer is to refund the locked asset after timelock is expired.
```go
message RefundHTLTMsg{
  0x3454A27C // hardcoded, object type prefix in 4 bytes
  bytes from // sender's address
  bytes swap_id
```

