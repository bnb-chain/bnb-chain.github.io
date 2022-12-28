# 거버넌스

## 거버넌스 입문

비컨 체인은 자체 거버넌스 모델을 통해 BNB 소유자들이 거래쌍 추가 제안을 할 수 있도록 만들었습니다. 제안을 투표할 수 있도록 만들려면, 예치 금액인`deposit`이 `Deposit`이란 매개 변수보다 더 크면 됩니다. 제안한 사람이 `deposit` 전액을 제공할 필요는 없습니다. 만일 최초 제안한 사람의 `deposit`이 충분하지 않다면, 제안은 BNB 소유자 누구나 `depositTx`를 통해 예치금을 늘릴 수 있는 `deposit_period` 상태가 됩니다.
투표 기간 동안 코드로만 작동하는 에스크로(escrow) 계정이 예치금을 보관하게 됩니다. 에스크로 계정은 비컨 체인 프로토콜에서 하드코딩된 문자열에서 파생된 것입니다. 이와 같은 계정은 개인키가 존재하지 않으며 프로토콜의 코드에 의해서만 작동합니다. 에스크로 계정을 연산하기 위해 사용되는 코드는[cosmos-sdk](https://github.com/cosmos/cosmos-sdk/blob/82a2c5d6d86ffd761f0162b93f0aaa57b7f66fe7/x/supply/internal/types/account.go#L40)에서 사용하는 것과 같습니다:
```
DepositedCoinsAccAddr = sdk.AccAddress(crypto.AddressHash([]byte("BinanceChainDepositedCoins")))
```
메인넷의 계정은: **bnb1vu5max8wqn997ayhrrys0drpll2rlz4dh39s3h** 이고 테스트넷의 계정은: **tbnb1vu5max8wqn997ayhrrys0drpll2rlz4deyv53x** 입니다. 투표 후 스왑이 통과되거나 반환될 때, 코드 기반의 에스크로 계정에서 보관하고 있던 금액이 사용자 계정으로 전송될 것입니다.

## 제안 작업 흐름
![workflow](../assets/workflow.jpg)

### 전역 변수
* `min-deposit`: 메인넷에 제안을 접수할 때 최소 **1000BNB**가 필요하고, 테스트넷에 접수할 때는 **2000BNB**가 필요합니다.
* `deposit_period`: 전역 변수이며 메인넷에서는 2일이 주어지며, 테스트넷에서는 2주가 주어집니다. 이는 메인넷에서는 이틀 안에 충분한 BNB를 예치해야하고, 테스트넷에서는 2주 안에 예치해야하는 것을 뜻합니다.
* `fee`: 거버넌스 기반 트랜잭션 비용은 [여기](trading-spec.md)를 확인하세요.

### 제안 매개 변수
* `deposit` : 입력값이 `min-deposit`보다 커야합니다.
* `voting-period`: 검증인들이 투표하는 기간을 초 단위로 설정합니다. 입력이 누락 될 시 기본 투표 기간은 1주일로 설정됩니다.
* `expire-time`: 제안이 통과될 시 상장 트랜잭션을 보내야하는 기한입니다. 만료 기한은 현재 시간보다 이른 시점으로 설정될 수 없습니다.

### 거버넌스 참여하기
#### 도구

제안을 생성하기 위해 다음 [스크립트](<https://github.com/bnb-chain/node-binary/tree/master/tools>)를 이용해주세요.

[웹 지갑](https://community.binance.org/topic/2487/how-to-manage-your-bep2-token-on-binance-chain-in-web-wallet)을 통해서도 토큰 관리 작업을 진행할 수 있습니다.

#### 상장 제안 제출하기
새로운 거래 쌍을 제안하기 위해, 다음과 같이 명령어를 실행해야 합니다:<br/>
참고로:<br/>

+ `--init-price` 는 **1e8**만큼 곱해져서 표현되며, 1 BNB를 표현하려면 100000000을 입력하면 됩니다.
+ `--from`: 주소/키에 키 이름을 입력하세요. 상장은 토큰의 소유자 주소만 접수 가능합니다. 
+ `--expire-time`: 만료 기한은 제안이 통과된 후 상장 트랜잭션을 보내야 하는 마감 기한입니다. 기한이 만료될 시 통과된 제안이어도 토큰을 상장할 수 없습니다.
+ `--voting-period`: 검증인이 투표할 수 있는 기간입니다. 초 단위로 구성되며 기본 투표 기간은 1주일입니다. 최대 설정 가능한 기한은 2주입니다. 투표 기한이 끝난 후 검증인의 투표가 집계될 것입니다.
+ `--title`: 제안의 제목
+ `--quote-asset-symbol`: 견적 자산 부호. BEP2 토큰을 바이낸스 DEX에 상장할 때, 우선 BNB 마켓에 배치해야합니다.따라서 첫 제안에서 `quote-asset-symbol` 을 **BNB** 로 설정해야 하며, 이후 BEP2 자산을 [BUSD-BD1](https://explorer.binance.org/asset/BUSD-BD1)나 다른 스테이블 코인과 거래쌍으로 상장할 수 있습니다.
+ `--base-asset-symbol`: 상장하고자 하는 자산 기호

참고로 예치금(deposit과) 초기값(init-price)은 **1e8** 이 곱해져 있습니다. (기본값은 소수점 8자리입니다)

**mainnet** 예시:

```shell
./bnbcli gov submit-list-proposal --from test --deposit 100000000000:BNB
--base-asset-symbol AAA-254 --quote-asset-symbol BNB --init-price 100000000 --title "list AAA-254/BNB"
--description "list AAA-254/BNB" --expire-time 1570665600 --chain-id Binance-Chain-Tigris --node https://dataseed5.defibit.io:443 --voting-period 604800 --json
```

**testnet** 예시:

```shell
./tbnbcli gov submit-list-proposal --from test --deposit 200000000000:BNB
--base-asset-symbol AAA-254 --quote-asset-symbol BNB --init-price 100000000 --title "list AAA-254/BNB"
--description "list AAA-254/BNB" --expire-time 1570665600 --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 --json --voting-period 604800
```
!!! 팁
        [BEP-70](https://github.com/bnb-chain/BEPs/blob/master/BEP70.md)에서 논의한 대로, BUSD는 세계에서 가장 영향력이 큰 스테이블 코인 중 하나이며 비컨 체인의 가장 지배적인 스테이블 코인입니다. BEP2 토큰을 상장하는 발행인은 BNB쌍을 우선 생산하지 않고 [BUSD-BD1](https://explorer.binance.org/asset/BUSD-BD1)로 상장할 수 있습니다. 비컨 체인 상에서 BUSD로 상장 및 거래하는 것은 토큰 보유와 거래를 촉진하여 시장을 더 유동적이고 건강하게 만들 것입니다. BEP70은 이미 테스트넷 Nightingale 업그레이드에서 구현되여 사용되고 있습니다. 비컨 체인 메인넷도 근 시일 내 업그레이드를 통해 BEP-70을 지원할 계획입니다.

#### 상장 폐지 제안 제출하기
테스트넷에서는 검증인만 상장 폐지 제안을 생성할 수 있습니다. 거래쌍을 상장 폐지하려면, 검증인은 다음과 같은 명령어를 실행해야 합니다:<br/>

참고로:

+ `--quote-asset-symbol`: 견적 자산 부호
+ `--base-asset-symbol`: 상장 폐지하는 자산의 부호
+ `--from`: 주소 키에 키 이름을 입력하세요. 토큰의 소유자 주소만 신청이 가능합니다.
+ `--voting-period`: 검증인이 투표할 수 있는 기간입니다. 초 단위로 구성되며 기본 투표 기간은 1주일입니다. 최대 설정 가능한 기한은 2주입니다. 투표 기한이 끝난 후 검증인의 투표가 집계될 것입니다.
+ `--justification`: 제안 이유
+ `--depodit`: 이 제안을 위한 예치금이 얼마나 필요한지 표시합니다. 거버넌스 모듈은 예치된 토큰을 코드 기반 에스크로 계정에 전송하고 잠금 시간이 만료될 때까지 예치금을 보관합니다. 메인넷의 계정은:*bnb1vu5max8wqn997ayhrrys0drpll2rlz4dh39s3h* 이고 테스트넷의 계정은: *tbnb1vu5max8wqn997ayhrrys0drpll2rlz4deyv53x* 입니다.

**mainnet** 예시:

```shell
bnbcli gov submit-delist-proposal --title "delist EDD-0AC" --voting-period 7200 --deposit "200000000000:BNB" --justification " justification " --base-asset-symbol EDD-0AC --quote-asset-symbol BNB --from <your-key-name> --chain-id Binance-Chain-Tigris --node https://dataseed5.defibit.io:443 --trust-node
```


**testnet** 예시:

```shell
tbnbcli gov submit-delist-proposal --title "delist EDD-0AC" --voting-period 7200 --deposit "200000000000:BNB" --justification " justification " --base-asset-symbol EDD-0AC --quote-asset-symbol BNB --from <your-key-name> --chain-id Binance-Chain-Ganges --trust-node --node https://seed-pre-s3.binance.org:443
```

#### 제안에 예치금 추가하기 (선택)
만일 제안의 최초 예치금 `submit-list-proposal` is not enough, `deposit` 연산으로 예치금을 늘릴 수 있습니다. 현재 비컨 체인 메인넷에서는 예치 기간이 **2일**입니다. 제안 제출 이후 예치금을 늘리는 데 이틀이 주어지며, 충족하지 못했을 시 투표 기간을 거치지 않고 바로 거절됩니다.

참고로 양(amount)은 **1e8** 이 곱해져 있습니다. (기본값은 소수점 8자리입니다)

**mainnet** 예시:

```shell
bnbcli gov deposit --from name --proposal-id <proposl-ID> --deposit <amount>:BNB --chain-id Binance-Chain-Tigris --node https://dataseed5.defibit.io:443
```

**testnet** 예시:

```shell
tbnbcli gov deposit --from name --proposal-id <proposl-ID> --deposit <amount>:BNB --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80
```

#### 제안 정보 요청
특정 제안에 관한 자세한 정보를 보고 싶으면 다음 명령어를 실행하세요:

**mainnet** 예시:

```shell
./bnbcli gov query-proposal --proposal-id <proposal-ID> --chain-id Binance-Chain-Tigris --node https://dataseed5.defibit.io:443
```

**testnet** 예시:

```shell
./tbnbcli gov query-proposal --proposal-id <proposal-ID> --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80
```

결과 예시:
```json
{
  "type": "gov/TextProposal",
  "value": {
    "proposal_id": "100",
    "title": "list CZZ-696/BNB",
    "description": "{\"base_asset_symbol\":\"CZZ-696\",\"quote_asset_symbol\":\"BNB\",\"init_price\":100000000,\"description\":\"list CZZ-696/BNB\",\"expire_time\":\"2019-03-21T09:00:00+09:00\"}",
    "proposal_type": "ListTradingPair",
    "proposal_status": "Passed",
    "tally_result": {
      "yes": "1100000000000",
      "abstain": "0",
      "no": "0",
      "no_with_veto": "0"
    },
    "submit_time": "2019-03-07T20:49:03.504103408Z",
    "total_deposit": [
      {
        "denom": "BNB",
        "amount": "200000000000"
      }
    ],
    "voting_start_time": "2019-03-07T21:01:36.159585594Z"
  }
}
```
다음과 같은 결과를 통해 제안의 상태 정보나 집계 결과를 확인할 수 있습니다.

#### 제안 투표 정보 요청
다음 명령어를 통해 제안에서 투표 정보를 조회할 수 있습니다:

**mainnet** 예시:

```shell
./bnbcli gov query-votes --proposal-id 272 --chain-id Binance-Chain-Tigris --node https://dataseed5.defibit.io:443
```

**testnet** 예시:

```shell
./tbnbcli gov query-votes --proposal-id 272 --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80
```

결과 예시:
```json
[
  {
    "voter": "tbnb1q82g2h9q0kfe7sysnj5w7nlak92csfjztymp39",
    "proposal_id": "272",
    "option": "Yes"
  },
  {
    "voter": "tbnb1r6l0c0fxu458hlq6m7amkcltj8nufyl9mr2wm5",
    "proposal_id": "272",
    "option": "Yes"
  },
  {
    "voter": "tbnb193t8pkhm2sxw5uy5ypesygda8rzsk25ge3e9y7",
    "proposal_id": "272",
    "option": "Yes"
  },
  {
    "voter": "tbnb183nch8pn3f698vurrqypq3s254slcane2t66aj",
    "proposal_id": "272",
    "option": "Yes"
  },
  {
    "voter": "tbnb12hlquylu78cjylk5zshxpdj6hf3t0tahwjt3ex",
    "proposal_id": "272",
    "option": "Yes"
  },
  {
    "voter": "tbnb1vehecekrsks5sshcwvxyeyrd469j9wvcqm37yu",
    "proposal_id": "272",
    "option": "Yes"
  },
  {
    "voter": "tbnb108drn8exhv72tp40e6lq9z949nnjj54yzqrr2f",
    "proposal_id": "272",
    "option": "Yes"
  },
  {
    "voter": "tbnb135mqtf9gef879nmjlpwz6u2fzqcw4qlzrqwgvw",
    "proposal_id": "272",
    "option": "Yes"
  },
  {
    "voter": "tbnb1hexqyu3m8uuudqdnnpnsnlwe6xg0n3078lx68l",
    "proposal_id": "272",
    "option": "Yes"
  },
  {
    "voter": "tbnb1earfwcjre04hp7phqnkw8ts04tkumdn0cyzun0",
    "proposal_id": "272",
    "option": "Yes"
  },
  {
    "voter": "tbnb167yp9jkv6uaqnyq62gfkx82xmfny0cl9xe04zj",
    "proposal_id": "272",
    "option": "Yes"
  }
]
```

## 주요 개념

#### 투표 옵션
4가지 투표 옵션이 있습니다:
- `Yes`
- `No`
- `NoWithVeto`
- `Abstain`

`No` 는 검증인이 제안을 반대한다는 것을 뜻하고 `NoWithVeto` 는 강하게 반대한다는 것을 뜻합니다.<br/>
`Abstain` 은 검증인이 찬성 및 반대 의견에 투표하는 것은 아니지만 결과를 수용할 예정이란 것을 표현합니다.

#### 정족수 (Quorum)

정족수는 결과가 유효하려면 충족해야하는 최소 투표 비율을 나타내며, 현재 0.5(50%) 입니다.

만일 투표권이 투표 기한 끝까지 정족수에 도달하지 못할 경우, 제안은 기각되며
모든 예치금이 예치한 주소들로 반환될 것입니다.

**참고**: 모든 투표가 `Abstain`이고 투표권이 50%를 넘는 특수한 경우에는, 제안이 거절되면 모든 예치금이 환불됩니다.

#### 거부권 (Veto)

거부권은 제안이 기각되기 위한 `NoWithVeto`의 최소 비율을 나타내며, 현재 0.334(1/3) 입니다. 만일 1/3 이상 투표 참여자가 거부권을 행사하면, 제안이 기각되고 예치금이 검증인에게 배분됩니다.

#### 최소치 (Threshold)

최소치는 제안이 통과되기 위한 `Yes`의 최소 비율(`Abstain`을 제외)을 나타내며, 현재 0.5(50%) 입니다.

따라서 `NoWithVeto`의 비율이 1/3을 넘지 않고 `Yes`의 비율이 (`Abstain` 제외) 50%를 넘으면, 제안이 통과되며 예치금이 모두 반환됩니다. 그 외의 경우에는, 제안이 기각되고 모든 예치금이 검증인에게 배분됩니다.

#### 집계 결과 예시

`bnbcli`를 통해 제안 정보를 요청할 수 있습니다.

```bash
$ ./bnbcli gov query-proposal --chain-id Binance-Chain-Ganges --node=tcp://data-seed-pre-1-s3.binance.org:80 --proposal-id 370
{
  "type": "gov/TextProposal",
  "value": {
    "proposal_id": "370",
    "title": "list JCC-CB1/BNB",
    "description": "{\"base_asset_symbol\":\"JCC-CB1\",\"quote_asset_symbol\":\"BNB\",\"init_price\":100000000,\"description\":\"list JCC-CB1/BNB\",\"expire_time\":\"2019-04-24T14:46:35+08:00\"}",
    "proposal_type": "ListTradingPair",
    "voting_period": "604800000000000",
    "proposal_status": "Passed",
    "tally_result": {
      "yes": "1100000000000",
      "abstain": "0",
      "no": "0",
      "no_with_veto": "0",
      "total": "1100000000000"
    },
    "submit_time": "2019-04-10T06:49:11.568747217Z",
    "total_deposit": [
      {
        "denom": "BNB",
        "amount": "200000000000"
      }
    ],
    "voting_start_time": "2019-04-10T06:52:00.064744275Z"
  }
}
```

`tally result`와 `proposal_status`를 받을 수 있습니다.<br/>

`tally result`의 옵션들은:

- `yes` 는 `찬성`으로 투표한 투표권을 나타냅니다
- `abstain` 는 `기권`으로 투표한 투표권을 나타냅니다
- `no` 는 `반대`로 투표한 투표권을 나타냅니다
- `no_with_veto` 는 `강한 반대`로 투표한 투표권을 나타냅니다
- `total` 투표 기간이 끝났을 시 참요한 총 투표권을 나타냅니다

각 투표 옵션의 비율은 쉽계 계산할 수 있습니다.<br/>
위의 예시는, 투표 권력 `합계`가 1100000000000 이고 `yes`의 투표 권력이1100000000000 입니다.
따라서 `찬성`이 100% 이며 제안이 통과되고 예치금이 반환될 것입니다.

**참고:** 투표 기한을 거치지 않은 제안을 요청하면 `error`가 반환됩니다.

```bash
$ ./bnbcli gov query-proposal --chain-id Binance-Chain-Tigris --node https://dataseed5.defibit.io:443 --proposal-id 25
{
  "codespace": 5,
  "code": 1,
  "abci_code": 327681,
  "message": "Unknown proposal with id 25"
}
```
