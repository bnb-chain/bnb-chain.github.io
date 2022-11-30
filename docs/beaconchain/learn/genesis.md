---
id: genesis
title: 제네시스 파일
---

이 문서에서는 비컨 체인 메인넷의 제네시스 파일이 어떻게 구성되는지 설명합니다. 또한 테스트넷에서 제네시스 파일을 생성하는 법도 설명합니다.

다음 명령어를 통해 테스트넷에서 기본 제네시스 파일을 생성할 수 있습니다:

```
bnbchaind init  --chain-id
```

제네시스 파일은 `~/.bnbchaind/config/genesis.json` 디렉토리에 저장됩니다.

## 제네시스 파일이란

제네시스 파일은 블록체인의 초기 상태를 정의하는 JSON 파일입니다. 따라서 블록체인 상에서 높이 `0`에 해당된다고 볼 수 있습니다. 높이 `1`인 첫 번째 블록은 생성될 때 부모인 제네시스 파일을 참고하여 생성될 것입니다.

The state defined in the genesis file contains all the necessary information, like initial token allocation, genesis time, default parameters, and more. Let us break down these information. 제네시스 파일에는 최초 토큰 공급량, 제네시스 시간, 기본 매개 변수 등 필요한 모든 상태 정보를 포함하고 있습니다. 

### Genesis Time과 Chain_id

`genesis_time`은 제네시스 파일 최상단에 존재합니다. 블록체인이 언제 시작할 지 정의하는 `UTC` 타임스탬프롤 지니고 있습니다. 이 시간에는, 제네시스(생성) 검증인이 네트워크에 접속하여 합의 과정에 참여를 시작해야합니다. 블록체인은 2/3 이상의 제네시스 검증인들이(투표권 기준) 접속해야 시작합니다.

```
"genesis_time": "2019-04-18T05:59:26.228734998Z"
```

`chain_id`는 체인의 고유 번호입니다. 이를 통해 같은 버전의 소프트웨어를 사용하는 다른 체인들과 구분할 수 있습니다.
```
"chain_id": "Binance-Chain-Tigris",
```
## 합의 매개 변수

다음으로 제네시스 파일은 합의 매개 변수를 정의합니다. 합의 매개 변수는 합의 계층과 관련된 모든 변수들을 재구성하는데, `비컨 체인`의 경우는 `텐더민트(Tendermint)`입니다. 매개 변수는 다음과 같습니다:

- 블록 사이즈
  - `max_bytes`: 블록 당 최대 바이트는 1048576입니다.
  - `max_gas`:블록 당 최대 가스 제한. 현재 가스가 트랜잭션 수수료를 계산하지 않을 때는 값이 `-1`로 설정됩니다.

- 증거
  - `max_age`: 증거는 검증인이 같은 높이와 라운드의 다른 두 블록을 서명한 사실을 나타냅니다. 이는 악의적인 동작에 해당하며 증거가 통과될 시 검증인은 상태 머신 레벨에서 처벌됩니다. 다만 일정 블록이 지나면 증거가 명확해도 만료가 되는데, `max-age`는 증거가 유효할 때 까지의 최대 **블록 수**를 표현합니다.

- 검증인
  - `pub_key_types`: 현재는 `ed25519`만 허용됩니다.

```json
consensus_params: {
	block_size: {
		max_bytes: "1048576",
		max_gas: "-1"
		},
	evidence: {
		max_age: "100000"
	},
	validator: {
		pub_key_types: [
			"ed25519"
			]
		}
},
```

## 어플리케이션 상태

어플리케이션 상태는 상태 머신의 최초 상태를 정의합니다

### 제네시스 계정

이 부분에서는 최초 토큰 배분을 정의합니다. 제네시스 파일을 직접 편집하여 계정을 추가하는 것도 가능하지만, 제네시스 파일이 생성된 후 잔고를 수정하는 것도 가능합니다.

다음 명령어는 `app_state`에 존재하는 `accounts`리스트에 객체를 생성합니다. 아래 예시에서는 모든 **11**개 검증인에 대해 서로 다른 3가지 주소가 있는 것을 볼 수 있습니다.

```json
[
  {
  name: "Aconcagua",
  address: "bnb1y888axmhzz6yjj464syfy68mkhzy9phlv8fzac",
  consensus_addr: ""
  },
  {
  name: "Aconcagua",
  address: "bnb1kdx4xkktr35j2mpxncvtsshswj5gq577me7lx4",
  consensus_addr: "A71E5CD078B8C5C7B1AF88BCE84DD70B0557D93E"
  },
```

리스트를 확인해 보면:

- 첫 번째 주소 `bnb1y888axmhzz6yjj464syfy68mkhzy9phlv8fzac`는 제네시스 블록의 `gentx`의 정보에 따라 예치된 토큰들이 균일하게 배분됩니다. 블록체인이 시작 된 후에는 보상을 받을 때 사용됩니다.
- 두 번째 주소 `bnb1kdx4xkktr35j2mpxncvtsshswj5gq577me7lx4`는 거버넌스에 이용됩니다.
- `consensus_addr`는 새로운 블록을 서명할 때 사용됩니다.

### 토큰

`tokens` 묘듈은 토큰을 다룹니다. 이 부분은 비컨 체인의 네이티브 토큰인 `BNB`에 관한 정보를 포함합니다.
```
name: "Beacon Chain  Native Token",
symbol: "BNB",
total_supply: "20000000000000000",
owner: "bnb1ultyhpw2p2ktvr68swz56570lgj2rdsadq3ym2",
mintable: false
```

### 스테이킹

`staking`모듈은 상태 머신의 지분 증명 로직들을 처리합니다. 이 부분은 다음과 같이 나타냅니다:
```
stake: {
pool: {
loose_tokens: "20000000000000000",
bonded_tokens: "0"
},
params: {
unbonding_time: "604800000000000",
max_validators: 21,
bond_denom: "BNB"
},
validators: null,
bonds: null
},
```

매개 변수는 다음과 같습니다:

- pool
  - `not_bonded_tokens`: 제네시스에 묶이지(위임되지) 않은 토큰 양을 정의합니다. 보통 스테이킹 토큰의 총 공급량과 같습니다. 소수점 값 표현을 위해 8자리씩 이동했습니다.
  - `bonded_tokens`: 제네시스에 묶인 토큰을 의미하며, 보통 `0`입니다.
- params
  - `unbonding_time`: 토큰 바인딩 해제까지 걸리는 시간 (**나노 초**로 표현) 
  - `max_validators`: 활성화된 검증인의 최대 값
  - `bond_denom`:  스태이킹 된 토큰의 액면가

- `validators`: 마지막으로 확인된 검증인의 리스트입니다. 이전 상태를 가져와서 생성한 제네시스가 아니면 보통 `null`입니다.

- `bonds`:마지막으로 확인된 위임 리스트입니다. 이전 상태를 가져와서 생성한 제네시스가 아니면 보통 `null`입니다.




### 거버넌스

`gov` 모듈은 거버넌스 관련 트랜젝션들을 다룹니다. `gov`의 초기 상태는 다음과 같습니다:

```
gov: {
  starting_proposalID: "1",
  deposit_params: {
    min_deposit: [
      {
      denom: "BNB",
      amount: "100000000000"
      }
      ],
    max_deposit_period: "172800000000000"
    },
  tally_params: {
  quorum: "50000000",
  threshold: "50000000",
  veto: "33400000"
  }
},
```

매개 변수는 다음과 같습니다:

- `starting_proposal_id`: 첫 제안의 ID를 정의합니다. 각 제인은 고유한 ID를 통해 구분됩니다.
- deposit_params
  - `min_deposit`: `투표 기간`에 진입하기 위한 최소 예치액
  - `max_deposit_period`: 제안에 입금이 불가능해지기 전까지 기한 (**나노 초**로 표현)
- tally_params
  - `quorum`: 투표 결과가 유효하기 위한 예치된 최소 스테이킹 토큰 퍼센티지
  - `threshold`: 투표 결과가 유효하기 위한 최소 `YES` 퍼센티지
  - `veto`: 투표 결과가 유효하기 위한 `NO_WITH_VETO`(강하게 반대) 최대 허용 퍼센티지

### 제네시스 트랜잭션

`gentx`는 제네시스에서 검증인을 만들 때 현재 제네시스 파일 `accounts`에 있는 토큰을 검증인에게 바인딩하는 트랜잭션입니다. 체인은 `genesis_time`이후 `gentx`를 2/3 이상의 검증인이(투표권 기준) 성공적으로 받았을 시 시작됩니다.

`gentx` 는 수동으로 제네시스 파일에 추가할 수 있습니다

```
{
type: "auth/StdTx",
value: {
msg: [
{
type: "cosmos-sdk/MsgCreateValidatorProposal",
value: {
MsgCreateValidator: {
Description: {
moniker: "Aconcagua",
identity: "",
website: "",
details: ""
},
Commission: {
rate: "0",
max_rate: "0",
max_change_rate: "0"
},
delegator_address: "bnb1y888axmhzz6yjj464syfy68mkhzy9phlv8fzac",
validator_address: "bva1kdx4xkktr35j2mpxncvtsshswj5gq577m9l0c3",
pubkey: {
type: "tendermint/PubKeyEd25519",
value: "Xj/NowvRnUXEtzaI2jXn2h/OfGhZssHyDtUgLSQUTj4="
},
delegation: {
denom: "BNB",
amount: "1000000000000"
}
},
proposal_id: "0"
}
}
],
signatures: [
{
pub_key: {
type: "tendermint/PubKeySecp256k1",
value: "AoeLfC96urAqZtAxg7cCSXh/+tRxGMthLbvXFu/w9nO0"
},
signature: "b0wYwS7fJcpg0TerEoH22T1CqcZMc3NHm0BusK/+LPMPtqHQuOkbIlPUM12r1iXJjKZhPM/ItFveKIo1oFtfUg==",
account_number: "0",
sequence: "0"
},
{
pub_key: {
type: "tendermint/PubKeySecp256k1",
value: "AreZUwAj6OlZI+xHZm66K4Nj5G/eNei768x77fdFz1fc"
},
signature: "GefEmRyOFk5jGpIZnaGNAOubzPn+wedg62mf8m8yV5cWK7+SByBCcCTHQ+7kB+mkMjOR1AIuXC7Xfou5Q/QhgQ==",
account_number: "0",
sequence: "0"
}
],
memo: "",
source: "0",
data: null
}
},
```

`gentx`는 검증인이 되는 것을 동의하기 위한 서명된 메세지입니다. 매개 변수는 다음과 같습니다:

- 서명 관련 정보
	- `pub_key`: 공개키(pubkey)는 서명을 확인하기 위해 사용됩니다
	- `signature`: 검증인의 서명입니다
	- `account_number`: 계정의 고유 식별자. 계정이 포함된 트랜잭션이 처음으로 블럭에서 처리될 때 생성됩니다. gentx에서는 `0`입니다.
	- `sequence`: 시퀸스는 계정에 의해 보내진 트랜잭션을 세기 위해 사용됩니다. 트랜잭션이 블록에 포함될 때마다 증가하며, 리플레이 공격을 방지하기 위해 사용됩니다. 초기 값은 0입니다.
	- `memo`, `source` 와 `data` 는 트랜잭션과 관련된 세부 정보입니다.
- `Delegation info` (위임 정보)
	- `moniker`: 검증인 이름
	- `delegator_address`: this is the address that is listed in `app_state` 부분에 section
	- `validator_address`: `bva` 접두사를 갖는 `bech32` 인코딩 된 검증인 공개키입니다
	- delegation: 위임 금액입니다. 소수점 값 표현을 위해 8자리씩 이동했습니다.