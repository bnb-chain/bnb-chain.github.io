# Cross-Chain Transfer Token Transfer

크로스체인 전송은 BC에서 bound BEP2나 BEP8 토큰 그리고 BSC에서 BEP20 토큰을 지원합니다.

## 토큰 정보 확인

첫째로, 이미 bound되어 있는 것을 확인해야 합니다. 예를 들어 **BNB**의 binding 정보를 확인할 수 있습니다:


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
    "name": "Binance Chain Native Token",
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

BNB가 양 체인의 네이티브 토큰인 만큼, `0x0000000000000000000000000000000000000000`를 상응하는 컨트랙트 주소로 사용합니다. 이에 더해 BSC에서는 네이티브 토큰의 decimals이 18인 반면, BC의 decimals은 8입니다. 따라서 1e8:BNB를 BSC로 전송할 경우, 수신자의 잔액은 1e18 만큼 증가합니다.


## BC에서 BSC로 BNB 전송하기

**Example:**

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

## Transfer BNB from BSC to BC

### transferOut

Call **transferOut** of [TokenHub contract](https://raw.githubusercontent.com/bnb-chain/bsc-genesis-contract/master/abi/tokenhub.abi) in [MyEtherWallet](https://www.myetherwallet.com/):

<img src="https://lh3.googleusercontent.com/q8-nnt12h8gvYyMe6iwLalwzY-1jHfQ11BsSyIz3qkQPCjp_-D-dIzPxZ-HuMJngCxTs7pt65-zSUIYImpsoO8bJ_QC_pyfPMu_2O7Lh65uDvVXrkhKqOakI070vKuEK3UNnlk8m"  alt="img" style= { { zoom:"20%" } } />



| 파라미터  | 타입    | 설명                                                  |
| -------------- | ------- | ------------------------------------------------------------ |
| contractAddr   | address | BNB의 주소는 0x0000000000000000000000000000000000000000입니다. |
| recipient      | address | `0x` 로 시작하는 bech32 주소로 디코딩힙니다. hex 문자열로 변환합니다. bech32를 디코딩하기 위한 온라인 tool : https://slowli.github.io/bech32-buffer/ |
| amount         | uint256 | BSC 에서 BNB의 소수점은 18자리다. 따라서 1BNB를 전송할 때 1e18을 전송해야한다. 그 외에는 N * 1e10 형식으로 처리된다. |
| expireTime     | uint256 | 초 단위의 타임스탬프                              |

값은 다음과 같은 공식을 따릅니다:

```
txValue = (amount + RelayFee)/1e18
```

`RelayFee` 는 0.01BNB 이고 on-chain 거버넌스에 의해 업데이트 될 수 있습니다. 예를 들어, 1BNB를 BSC 에서 BC으로 전송할 때, 값이 최소 1.01BNB보다 커야 합니다. 

위의 모든 파라미터들이 올바르게 작성 되었을 때, 사용자들은 transact 버튼을 클릭하여 트랜잭션을 만들수 있고, 메타마스크 플러그인이 창이 나올 것입니다. 그럼 사용자들은 confirm 버튼을 눌러 메타메스크 상에서 서명하고 트랜잭션을 전파할 수 있습니다.


### batchTransferOutBNB

MyEtherWallet의 TokenHub 컨트랙트에서 **batchTransferOutBNB** 를 호출합니다:

<img src="https://github.com/binance-chain/docs-site/raw/master/docs/assets/batchTransferOutBNB.png" alt="img" style= { { zoom:"20%" } } />

| 파라미터  | 타입    | 설명                                                                    |
| -------------- | --------- | ------------------------------------------------------------ |
| recipientAddrs | address[] | `0x` 로 시작하는 bech32 주소로 디코딩힙니다. hex 문자열로 변환합니다. bech32를 디코딩하기 위한 온라인 tool : https://slowli.github.io/bech32-buffer/ |
| amounts        | uint256[] | 각 수신인의 amount는 N * 1e10 형식으로 표현되야 합니다.             |
| refundAddrs    | address[] | 발송인은 크로스 체인 간 전송이 실패했을 시 몇 개의 주소를 환불 주소로 지정할 수 있습니다. |
| expireTime     | uint256   | 초 단위의 타임스탬프                                 |


값은 다음과 같은 공식을 따릅니다:

```
txValue = (sumOfAmounts + RelayFee * batchSize)/1e18
```

## BEP2를 BSC로 전송
ABC-A64 토큰을 BSC로 전송하기 위해 아래의 명령어를 실행하세요:
```bash
## mainnet
bnbcli bridge transfer-out --to 0xEe9546E92e6876EdF6a234eFFbD72d75360d91f0 --expire-time 1597543193 --chain-id Binance-Chain-Tigris --from owner --amount 10000000000:ABC-A64 --node http://dataseed4.binance.org:80

## testnet
tbnbcli bridge transfer-out --to 0xEe9546E92e6876EdF6a234eFFbD72d75360d91f0 --expire-time 1597543193 --chain-id Binance-Chain-Ganges --from owner --amount 10000000000:ABC-A64 --node http://data-seed-pre-0-s3.binance.org:80
```
## BEP20를 BC로 전송
**transferOut**나 **batchTransferOut**를 호출하기 전, 사용자들은 **approve** 메서드를 호출하여 TokenHub 컨트랙트에 충분한 잔액(allowance)을 제공해야 합니다. **transferOut** 메서드의 경우 이 allowance가 전송 액수와 같아야 합니다. **batchTransferOut**의 경우, allowance가 amount 배열의 합과 같아야 합니다.

### transferOut

<img src="https://lh3.googleusercontent.com/q8-nnt12h8gvYyMe6iwLalwzY-1jHfQ11BsSyIz3qkQPCjp_-D-dIzPxZ-HuMJngCxTs7pt65-zSUIYImpsoO8bJ_QC_pyfPMu_2O7Lh65uDvVXrkhKqOakI070vKuEK3UNnlk8m" alt="img" style= { { zoom:"25%" } } />

| 파라미터  | 타입    | 설명                                                                   |
| ------------   | ------- | ------------------------------------------------------------ |
| contractAddr   | address | BEP20 컨트랙트 주소                                     |
| recipient      | address | bech32 주소를 hex 문자열로 디코딩합니다. bech32를 디코딩하기 위한 온라인
tool: https://slowli.github.io/bech32-buffer |
| amount         | uint256 | BEP20 토큰 amount. 소수18자리까지 표현 가능하며, 1 * 1e10 형식으로 나타냅니다. |
| expireTime     | uint256 | 초 단위의 타임스탬프                            |

값은 RelayFee 입니다.

### 민팅

만일 BEP20과 BEP2 양쪽으로 토큰 민팅이 가능할 때, 토큰 소유자는 토큰 binding 이후에도 민팅 가능합니다. 단, 토큰 소유자가 총 공급량과 잠긴 토큰 양이 양쪽 체인에서 일치해야 합니다. 그렇지 않을 경우 체인 간 전송을 할 수 없습니다.

#### BC에서 토큰 민팅하게

1. 1. 10000 ABC-A64를 민팅하기 위해 다음 명령어를 실행하세요 :
```bash
## mainnet
bnbcli token mint --symbol ABC-A64 --amount 1000000000000 --from owner --chain-id Binance-Chain-Tigris --node http://dataseed4.binance.org:80

## testnet
tbnbcli token mint --symbol ABC-A64 --amount 1000000000000 --from owner --chain-id Binance-Chain-Ganges --node http://data-seed-pre-0-s3.binance.org:80
```

2. BSC 상에서 새 토큰을 민팅하고 잠급니다:
* BEP20 컨트랙트에서 mint 를 부릅니다. 민트 amount 는 1e22(18자리)일 것입니다.
* 민팅된 모든 ABC 토큰을 tokenHub로 전송한다 : `0x0000000000000000000000000000000000001004`

#### BSC에서 토큰 민팅하기

1. 10000 ABC-A64를 민팅하기 위해 BEP20 컨트랙트를 호출하세요. 민트 amount 는 1e22(18자리)일 것입니다.
2. BC(비콘 체인) 상에서 민팅하고 새 토큰을 잠급니다:

* 10000 ABC-A64를 민팅하기 위해 다음 명령어를 실행하세요 :
```bash
## mainnet
bnbcli token mint --symbol ABC-A64 --amount 1000000000000 --from owner --chain-id Binance-Chain-Tigris --node http://dataseed4.binance.org:80

## testnet
tbnbcli token mint --symbol ABC-A64 --amount 1000000000000 --from owner --chain-id Binance-Chain-Ganges --node http://data-seed-pre-0-s3.binance.org:80
```
* 민팅된 모든 ABC-A64 토큰을 순수 코드 제어 주소에 전송한다: `tbnb1v8vkkymvhe2sf7gd2092ujc6hweta38xnc4wpr`(mainnet address: `bnb1v8vkkymvhe2sf7gd2092ujc6hweta38xadu2pj`)
