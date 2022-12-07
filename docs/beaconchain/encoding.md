# BNB 비컨 체인 트랜잭션 인코딩 사양

BNB 비컨 체인 트랜잭션은 프로토콜 가반 데이터 구조로 호환되는 인코딩 프레임을 통해서만 제출 가능합니다.

기본적인 인코딩 원리는 [텐더민트 Amino](https://github.com/tendermint/go-amino)를 따르며, 이는 호환성이 뛰어난 구글 프로토콜 버퍼 "Proto3"에서 파생되었습니다.

사용하는 클라이언트 측에서는 아래 예시에 설명된 가장 빈번하게 사용되는 트랜잭션 사양만 준수하면 됩니다.

## 인코딩 출력

BNB 비컨 체인 Amino 인코딩 로직은 자료 구조를 두 개의 형식으로 반환할 수 있습니다: 바이너리와 JSON.

### JSON 마샬
Amino는 다른 JSON 마샬(marshal)처럼 자체적으로 JSON 변환(인코딩)을 지원합니다. 다만 아래와 같이 등록된 타입에 하나의 `타입` 정보를 더 추가할 수 있습니다.

```json
{
  "type": "<amino type name>",
  "value": <JSON>
}
```
### 바이너리 마샬

**[아래 바이너리 인코딩 원리는 변경될 예정입니다. 커뮤니티 뉴스를 확인하세요](more-help.md).**

바이너리 인코딩은 구글의 protobuf의 변형을 통해 이뤄졌습니다. 바이트는 다음과 같이 나열됩니다:

1. [varint](https://developers.google.com/protocol-buffers/docs/encoding#varints) 인코딩된 정수 - 인코딩된 바이트가 오브젝트에 포함되며, `SIZE-OF-ENCODED`로 아래 예시에서 볼 수 있습니다. 참고로 길이에는 인코딩된 바이트 뿐만 아니라 타입 접두사(type prefix)도 포함합니다. (예시: 만일 인코딩된 메세지(msg)가 20바이트면, 길이는 20 + 4 = 24로 4는 타입 접두사 바이트로 사용됩니다)
2. 4-8 바이트의 오브젝트 타입 접두사 - 다른 유형의 오브젝트들은 다른 형태의 접두사를 지니며, 이는 특정한 오브젝트(자료구조)에 나타납니다.
3. 바이너리 인코딩된 오브젝트 - 인코딩은 프로토콜 버퍼 인코딩 방법과 거의 같지만, complex 유형이 포함된 필드가 존재합니다:
    - 특정 타입으로 데이터 필드를 변환하려면, 오브젝트 타입 접미사가 실제 인코딩 전에 더해져야 합니다.
4. 반복되는 (배열) 인코딩 - 구글 프로토콜 버퍼와 같지만, 오브젝트 및 구조체가 아래에서 나타나는 접두사를 포함할 수 있습니다.

## BNB 비컨 체인 트랜잭션 인코딩

 아래 문서는 BNB 비컨 체인에 요청이나 인코딩 레이아웃에 보내질 수 있는 데이터 타입을 나타냅니다. 간단하게 표현하기 위해 [구글 프로토콜 버퍼 proto3](https://developers.google.com/protocol-buffers/docs/proto3) 언어의 변형을 사용하여 데이터 필드의 구조를 표현할 것입니다. 전부 대문자로 표현된 곳을 제외하면, 다른 부분들은 기본 `proto3` 인코딩 로직을 사용하여 처리됩니다.


### 표준 트랜잭션

트랜잭션들은 보통 아래 "표준 트랜잭션" 구조에 묶여 있으며, 다음과 같이 나타냅니다:

```go
// 필드 이름은 JSON의 이름입니다.
message StdTx {
  uint64 SIZE-OF-ENCODED // 인코딩 후 인코딩된 구조의 길이를 표현하는 varint로, 이는 타입 접미사(4 바이트)와 모든 인코딩 바이트를 포함합니다
  0xF0625DEE // 하트 코딩된 4바이트 타입 접두사
  repeated Msg msgs // 사이즈 1인 배열로 트랜잭션 메세지를 포함하며, 트랜잭션 타입 중의 하나입니다. 위에 "배열 인코딩"을 참고하세요
  repeated StdSignature signatures // 사이즈 1인 배열로 트랜잭션 발신자의 표준 서명 구조를 포함합니다.
  string memo // 트랜잭션에 관한 간단한 문장 메모. 트랜잭션 전송 시 'memo' 입력을 허용하는 곳에만 보내야 하며, 허용하지 않을 경우  비우지 않은 `Memo`가 보내질 시 트랜잭션이 거절됩니다.
  int64 source // 트랜잭션을 발생한 도구의 식별자로, 공개하지 않는 경우 0으로 설정합니다.
  bytes data // 향후 사용될 바이트 배열
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

### 서명을 위한 표준 바이트

트랜잭션 서명은 Amino 인코딩된 바이트 자체에서 생성되지 **않습니다**. 오히려 서명을 위한 트랜잭션의 표준 표현은 JSON 형식으로 생성됩니다.

이를 통해 클라이언트들은 체인에 접속하지 않아도 서명이 가능합니다. 예시로, 하드웨어 보안 모듈 기기인 Ledger나 알고리즘 트레이딩 시스템에서도 블록체인에 접속하지 않아도 서명이 가능합니다. 외부 시스템은 Amino 인코딩을 이해하지 않아도 트랜잭션을 이해하고 서명된 JSON 문자열을 생성할 수 있게 됩니다.

서명을 위한 표준 바이트는 StdSignBytes 메서드를 통해 생성됩니다. 아래와 같은 형식의 JSON 문자열이 생성됩니다:

(이해를 위해 줄을 변경했습니다. **공백을 제거하고 키들을 알파벳 순서로 정렬하면** 기존 JSON 문자열 형태로 표현됩니다.)

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


다음 JSON 문자열은 발신자의 개인키로 서명되었습니다. 이 서명은 위에서 설명한 `StdTx` 구조에 첨부됩니다. 참고로 블록체인 상 전파되는 트랜잭션은 JSON 형태가 아닙니다. JSON은 표준 표현으로 서명을 생성할 때만 사용됩니다.

다음은 생성된 서명이 트랜잭션에 첨부되는 과정에 대해 설명합니다.

### 표준 서명

발신자의 서명은 아래와 같이 `표준 서명`을 통해 `표준 트랜잭션`에 저장됩니다. 표준 서명 구조는 `StdTx`에 속해 있습니다 (위를 확인하세요).

참고로 `StdSignature`는 타입 접두사(type prefix)가 없지만, `PubKey`는 타입 접두사가 있습니다.

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

### 메세지 유형
메세지는 BNB 비컨 체인에서 가능한 개별 작업들을 나타내며, `StdTx.msgs` 필드에 포함할 수 있습니다. 메세지 유형 혹은 "트랜잭션 유형"은 상호 교환적인 의미로 이 문서 및 앞으로의 기술 문서에서 번갈아 가며 사용될 것입니다. 지금까지 모든 `StdTx` 트랜잭션 "컨테이너"는 하나의 "메세지"만 담을 수 있습니다.

#### 전송
전송은 자금을 다른 주소로 보낼 때 사용하는 트랜잭션입니다.

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

#### 새 주문
NewOrder 트랜잭션은 바이낸스 DEX에서 토큰 매수/매도 주문을 생성합니다.

```go
// please note the field name is the JSON name.
message NewOrder {
  0xCE6DC043 // hardcoded, object type prefix in 4 bytes
  bytes sender // order originating address
  string id // 주문 ID, please check the Order ID section below for details.
  string symbol // symbol for trading pair in full name of the token
  int64 ordertype // only accept 2 for now, meaning limit order
  int64 side // 1 for buy and 2 fory sell
  int64 price // price of the order, which is the real price multiplied by 1e8 (10^8) and rounded to integer
  int64 quantity // quantity of the order, which is the real quantity multiplied by 1e8 (10^8) and rounded to integer
  int64 timeinforce // 1 for Good Till Expire(GTE) order and 3 for Immediate Or Cancel (IOC)
}
```

##### 주문 ID
주문 ID는 고유하며, 송신자에 의해 생성되며 바이낸스 DEX에서 인식합니다. 현재는 세 부분으로 구성되어 있습니다:

1. 사람이 읽을 수 없는 접미사 형식을 가진 HEX 형식의 발신자 주소
2. 대시 기호: `-`
3. 시퀸스 넘버

E.g. `40C2979694BBC961023D1D27BE6FC4D21A9FEBE6-5`

#### 취소
바이낸스 DEX에서 취소 트랜잭션을 통해 미결 및 미지불된 주문을 취소합니다. 취소가 성공한 후, 주문을 위해 잠긴 금액은 원래 주소에 반환되어 다시 사용할 수 있게 됩니다(i.e. 전송하거나 새로운 주문 생성).

```go
// please note the field name is the JSON name.
message CancelOrder {
  0x166E681B // hardcoded, object type prefix in 4 bytes
  bytes sender // order originating address
  string symbol // symbol for trading pair in full name of the token
  string refid // 주문 ID of the order to cancel
}
```

#### 동결
동결 트랜잭션은 토큰을 `동결` 상태로 변환합니다. 동결 상태에서는 전송과 주문에 사용할 수 없습니다.

```go
// please note the field name is the JSON name.
message TokenFreeze {
  0xE774B32D // hardcoded, object type prefix in 4 bytes
  bytes from // owner address
  string symbol // token symbol, in full name with "-" suffix
  int64 amount // amount of tokens to freeze
}
```

#### 동결 해제
`동결` 상태의 토큰을 동결 해제 하여 자유롭게 사용할 수 있는 상태로 변환합니다.

```go
// please note the field name is the JSON name.
message TokenUnfreeze {
  0x6515FF0D // hardcoded, object type prefix in 4 bytes
  bytes from // owner address
  string symbol // token symbol, in full name with "-" suffix
  int64 amount // amount of tokens to unfreeze
}
```

#### 투표
제안을 위한 투표 트랜잭션

```go
// please note the field name is the JSON name.
message Vote {
  0xA1CADD36 // hardcoded, object type prefix in 4 bytes
  int64 proposal_id // ID of the proposal
  bytes voter // address of the voter
  uint64 option // option from OptionSet chosen by the voter
}
```

다음은 `option`의 표현입니다:
```go
OptionYes           = 0x01  // 찬성
OptionAbstain       = 0x02  // 유보
OptionNo            = 0x03  // 반대
OptionNoWithVeto    = 0x04  // 강하게 반대
```

#### 발행
발행(생성)은 새로운 자산은 BNB 비컨 체인에 추가합니다.
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

#### 민팅
민팅은 토큰 총 공급량을 늘릴 때 사용됩니다.
```go
message Mint {
  0x467E0829 // hardcoded, object type prefix in 4 bytes
  bytes from // sender's address
  string symbol string // token symbol
  int64 amount // increase amount
}
```

#### 소각
소각은 토큰 총 공급량을 줄일 때 사용됩니다.
```go
message TokenBurn {
  0x7ED2D2A0 // hardcoded, object type prefix in 4 bytes
  bytes from // sender's address
  string symbol string // token symbol
  int64 amount // increase amount
}
```

#### 상장
상장은 새로운 거래 쌍을 더할 때 사용됩니다.
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

#### 제안 제출
제안 제출은 검증인에게 거래 쌍을 더할 것을 제안하는데 사용됩니다.
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

#### 예치
Deposit은 제안의 총 예치금을 늘리기 위해 사용됩니다.
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
#### 어카운트 플래그 설정
어카운트 플래그 값을 설정할 수 있습니다.
```go
message SetAccountFlags{
  0xBEA6E301 // hardcoded, object type prefix in 4 bytes
  bytes from // sender's address
  int64 flag // account flag
}
```

#### 타임 락
자신 어카운트의 토큰은 일정 시간 동안만 잠글 수 있습니다.
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


#### 타임 언락
일정 시간이 지난 후 자신의 계정에 있는 토큰을 직접 잠금 해제할 수 있습니다.
```go
message Timeunlock{
  0xC4050C6C   // hardcoded, object type prefix in 4 bytes
  bytes from // sender's address
  int64 id // lock time id
}
```

#### 타임 리락(relock)
일정 시간이 지난 후 자신의 계정에 있는 토큰을 다시 잠글 수 있습니다.
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

Hash Timer Locked Transfer (HTLT - 해시 타이머 잠금 전송)는 BNB 비컨 체인에 존재하는 새로운 트랜잭션으로, 아토믹 스왑의 첫 단계의 HTLC 역할을 합니다.

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
Deposit Hash Timer Locked Transfer(예치 해시 타이머 잠금 전송)는 새 BEP2 자산을 싱글 체인 아토믹 스왑을 위해 이미 존재하는 HTLT에 잠급니다.

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
Claim Hash Timer Locked Transfer(수령 해시 타이머 잠금 전송)는 해시와 일치하는 난수 값을 보여주면 잠긴 자산을 수령할 수 있습니다. 각 HTLT 잠금 자산은 한 번 해제됩니다.

```go
message ClaimHTLTMsg{
  0xC1665300 // hardcoded, object type prefix in 4 bytes
  bytes from // sender's address
  bytes swap_id
  bytes random_number
}
```
#### Refund HTLT

Refund Hash Timer Locked Transfer(환불 해시 타이머 잠금 전송)는 잠금 시간이 만료된 후 환불하기 위해 만들어졌습합니다.
```go
message RefundHTLTMsg{
  0x3454A27C // hardcoded, object type prefix in 4 bytes
  bytes from // sender's address
  bytes swap_id
```

