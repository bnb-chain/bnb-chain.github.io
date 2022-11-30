---
sidebar_label: Cross Chain Transfer
hide_table_of_contents: false
sidebar_position: 2
---

# 크로스 체인 전송

크로스 체인 전송은 BC의 바인딩된 BEP2 또는 BEP8 토큰과 BSC의 BEP20 토큰만 지원합니다.

## 토큰 정보 검증

우선, 이미 바인딩이 완료된 것을 확인해야 합니다. 예를 들어, **BNB**의 바인딩 정보를 확인할 수 있습니다.

```shell
## mainnet
bnbcli token info --symbol BNB --trust-node --node http://dataseed4.binance.org:80

## testnet
tbnbcli token info --symbol BNB --trust-node --node http://data-seed-pre-0-s3.binance.org:80 
```

```json
{
  "type": "bnbchain/Token",
  "value": {
    "name": "BNB Chain Native Token",
    "symbol": "BNB",
    "original_symbol": "BNB",
    "total_supply": "200000000.00000000",
    "owner": "tbnb1l9ffdr8e2pk7h4agvhwcslh2urwpuhqm2u82hy",
    "mintable": false,
    "contract_address": "0x0000000000000000000000000000000000000000",
    "contract_decimals": 18
  }
}
```

BNB는 두 체인 모두의 네이티브 토큰이기 때문에 컨트랙트주소로 `0x0000000000000000000000000000000000000000`을 사용합니다. 또한 BSC에서는 네이티브 토큰 소수점이 18인 반면 BC에서는 소수점이 8입니다. 따라서 BNB를 BSC로 1e8 만큼 전송하면 수신자의 잔액은 1e18 만큼 증가합니다.


## BC에서 BSC로 BNB 보내기

**예시:**

```shell
## mainnet
bnbcli bridge transfer-out --to 0xEe9546E92e6876EdF6a234eFFbD72d75360d91f0 --expire-time 1597543193 --chain-id Binance-Chain-Tigris --from owner --amount 100000000:BNB --node http://dataseed4.binance.org:80

## testnet
tbnbcli bridge transfer-out --to 0xEe9546E92e6876EdF6a234eFFbD72d75360d91f0 --expire-time 1597543193 --chain-id Binance-Chain-Ganges --from owner --amount 100000000:BNB --node http://data-seed-pre-0-s3.binance.org:80
```

결과:

```bash
Committed at block 465899 (tx hash: 68FFF82197E27A3EC14AFF8C99A035FA9CA7120312AA55E98D11DFC0F8D9F3B9, response: {Code:0 Data:[] Log:Msg 0:  Info: GasWanted:0 GasUsed:0 Events:[{Type: Attributes:[{Key:[84 114 97 110 115 102 101 114 79 117 116 83 101 113 117 101 110 99 101] Value:[49 49] XXX_NoUnkeyedLiteral:{} XXX_unrecognized:[] XXX_sizecache:0} {Key:[69 120 112 105 114 101 84 105 109 101] Value:[49 53 57 55 53 52 51 49 57 51] XXX_NoUnkeyedLiteral:{} XXX_unrecognized:[] XXX_sizecache:0} {Key:[97 99 116 105 111 110] Value:[99 114 111 115 115 84 114 97 110 115 102 101 114 79 117 116] XXX_NoUnkeyedLiteral:{} XXX_unrecognized:[] XXX_sizecache:0}] XXX_NoUnkeyedLiteral:{} XXX_unrecognized:[] XXX_sizecache:0}] Codespace: XXX_NoUnkeyedLiteral:{} XXX_unrecognized:[] XXX_sizecache:0})
```

## BSC에서 BC로 BNB 보내기

### transferOut

[MyEtherWallet](https://www.myetherwallet.com/)의 [TokenHub 컨트랙트](https://raw.githubusercontent.com/bnb-chain/bsc-genesis-contract/master/abi/tokenhub.abi)에서 **transferOut**을 호출합니다:

![img](https://lh3.googleusercontent.com/q8-nnt12h8gvYyMe6iwLalwzY-1jHfQ11BsSyIz3qkQPCjp_-D-dIzPxZ-HuMJngCxTs7pt65-zSUIYImpsoO8bJ_QC_pyfPMu_2O7Lh65uDvVXrkhKqOakI070vKuEK3UNnlk8m)



| 파라미터 이름 | 타입    | 설명                                                  |
| -------------- | ------- | ------------------------------------------------------------ |
| contractAddr   | address | BNB에서는 0x0000000000000000000000000000000000000000 |
| recipient      | address | bech32 주소를 디코딩합니다. hex 문자열로 전송하기 위해 `0x`로 시작합니다. bech32를 디코딩할 수 있는 온라인 툴: https://slowli.github.io/bech32-buffer/ |
| amount         | uint256 | BSC에서 BNB 소수점은 18. 1 BNB를 전송하고 싶은 경우, 값은 1e18임. 그 외의 경우 N * 1e10 |
| expireTime     | uint256 | 초 단위 타임 스탬프                             |

여기서 값은 다음의 공식을 따릅니다:

```
txValue = (amount + RelayFee)/1e18
```

`RelayFee`는 0.01BNB이며 온체인 거버넌스로 업데이트될 수 있습니다. 예를 들어 BSC에서 BC까지 1BNB를 전송한다면, 그 값은 적어도 1.01BNB이어야 합니다.

위의 모든 파라미터를 적절한 값으로 설정한 후 트랜잭션 버튼을 클릭하여 트랜잭션을 빌드할 수 있으며, 메타마스크 플러그인이 이젝트됩니다. 그런 다음 메타마스크에서 확인 버튼을 클릭하여 트랜잭션에 서명하고 전파할 수 있습니다.


### batchTransferOutBNB

MyEtherWallet의 TokenHub 컨트랙트에서 **batchTransferOutBNB**를 호출합니다.

![img](https://github.com/bnb-chain/docs-site/raw/master/docs/assets/batchTransferOutBNB.png)

| 파라미터 이름  | 타입      | 설명                                                  |
| -------------- | --------- | ------------------------------------------------------------ |
| recipientAddrs | address[] | bech32 주소를 디코딩합니다. hex 문자열로 전송하기 위해 `0x`로 시작합니다. bech32를 디코딩할 수 있는 온라인 툴: https://slowli.github.io/bech32-buffer/0 |
| amounts        | uint256[] | 각 수신인을 위한 값, N * 1e10여야 함              |
| refundAddrs    | address[] | 전송인은 크로스 체인 전송 실패 경우를 위해 일부 주소를 반환 주소로 설정 가능 |
| expireTime     | uint256   | 초 단위 타임 스탬프                               |


여기서 값은 다음의 공식을 따릅니다:

```
txValue = (sumOfAmounts + RelayFee * batchSize)/1e18
```

## BSC로 BEP2 전송하기
BSC로 ABC-A64 토큰을 보내기 위해 다음의 명령어를 실행합니다:
```bash
## mainnet
bnbcli bridge transfer-out --to 0xEe9546E92e6876EdF6a234eFFbD72d75360d91f0 --expire-time 1597543193 --chain-id Binance-Chain-Tigris --from owner --amount 10000000000:ABC-A64 --node http://dataseed4.binance.org:80

## testnet
tbnbcli bridge transfer-out --to 0xEe9546E92e6876EdF6a234eFFbD72d75360d91f0 --expire-time 1597543193 --chain-id Binance-Chain-Ganges --from owner --amount 10000000000:ABC-A64 --node http://data-seed-pre-0-s3.binance.org:80
```
## BC로 BEP20 전송하기
**transferOut**나 **batchTransferOut**를 호출하기 전, 사용자들은 **approve** 메서드를 호출하여 TokenHub 컨트랙트에 충분한 금액을 부여해야 합니다. **transferOut** 메서드의 경우 허용은 전송 금액과 같아야 합니다. **batchTransferOut**의 경우 허용은 금액 배열의 합입니다.

### transferOut

![img](https://lh3.googleusercontent.com/q8-nnt12h8gvYyMe6iwLalwzY-1jHfQ11BsSyIz3qkQPCjp_-D-dIzPxZ-HuMJngCxTs7pt65-zSUIYImpsoO8bJ_QC_pyfPMu_2O7Lh65uDvVXrkhKqOakI070vKuEK3UNnlk8m)

| 파라미터 이름  | 타입      | 설명                                                  |
| ------------   | ------- | ------------------------------------------------------------ |
| contractAddr   | address | BEP20 컨트랙트 주소                                      |
| recipient      | address | bech32 주소를 hex 문자열로 디코딩합니다. bech32를 디코딩할 수 있는 온라인 툴: https://slowli.github.io/bech32-buffer/ |
| amount         | uint256 | BEP20 토큰 액수. 여기서 소수점이 18이므로 N * 1e10. |
| expireTime     | uint256 | 초 단위 타임 스탬프                                  |

여기서 값은 RelayFee여야 합니다.

### 발행하기

BEP20 토큰과 BEP2 토큰이 모두 민팅 가능한 경우, 토큰 바인딩 후에도 토큰 소유자는 여전히 토큰을 민팅할 수 있습니다. 또한 토큰 소유자는 두 체인의 총 공급량과 예치된 금액이 여전히 일치하는지 확인해야 합니다. 그렇지 않으면 사용자가 토큰을 다른 체인으로 전송할 수 없을 수도 있습니다

#### BC에서 토큰 발행하기

1. 10000 ABC-A64를 민팅하기 위해 다음 명령어를 실행합니다:
```bash
## mainnet
bnbcli token mint --symbol ABC-A64 --amount 1000000000000 --from owner --chain-id Binance-Chain-Tigris --node http://dataseed4.binance.org:80

## testnet
tbnbcli token mint --symbol ABC-A64 --amount 1000000000000 --from owner --chain-id Binance-Chain-Ganges --node http://data-seed-pre-0-s3.binance.org:80
```

2. BSC에서 토큰을 발행하고 새로 발행된 토큰을 예치합니다:
* BEP20 컨트랙트의 **mint** 메서드를 호출합니다. 민팅 금액은 1e22이어야 합니다.
* 모든 발행된 ABC 토큰을 tokenHub 컨트랙트로 전송합니다: `0x0000000000000000000000000000000000001004`

#### BSC에서 토큰 발행하기

1. BEP20 컨트랙트의 **mint**를 호출하여 10000 ABC를 민팅하세요. 민트 액수는 1e22(소수점: 18)여야 합니다.
2. BC에서 토큰을 발행하고 새로 발행된 토큰을 예치하세요:

* 10000 ABC-A64를 민팅하기 위해 다음의 명령어를 실행하세요:
```bash
## mainnet
bnbcli token mint --symbol ABC-A64 --amount 1000000000000 --from owner --chain-id Binance-Chain-Tigris --node http://dataseed4.binance.org:80

## testnet
tbnbcli token mint --symbol ABC-A64 --amount 1000000000000 --from owner --chain-id Binance-Chain-Ganges --node http://data-seed-pre-0-s3.binance.org:80
```
* 다음 순수 코드 제어 주소로 모든 ABC-A64 토큰을 전송하세요: `tbnb1v8vkkymvhe2sf7gd2092ujc6hweta38xnc4wpr`(메인넷 주소: `bnb1v8vkkymvhe2sf7gd2092ujc6hweta38xadu2pj`)