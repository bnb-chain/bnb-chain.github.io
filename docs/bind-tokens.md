---
sidebar_label: BEP2와 BEP20 토큰 바인딩하기
sidebar_position: 2
---

# BEP2와 BEP20 토큰 바인딩하기

BSC와 BC는 하나의 토큰이 확인된 총 공급량으로 두 형식 모두에서 순환할 수 있고 다양한 사용 사례에 사용될 수 있도록 함께 동작합니다. 토큰 바인딩은 BEP2/BEP8 및 BEP20이 준비된 후 언제든지 발생할 수 있습니다. BEP2/BEP8 또는 BEP20의 토큰 소유자는 교차 체인 기능이 필요할 때만 **바인딩** 프로세스를 완료하면 됩니다.

이 [도구](https://github.com/bnb-chain/token-bind-tool)를 사용하면 됩니다.

## BEP2 또는 BEP8 토큰 발행하기

BEP2를 발행하려면 [doc](tokens.md)을 참고하세요.

BEP8을 발행하려면 [doc](beaconchain/learn/BEP8.md)을 참고하세요.


**예시**
새로운 BEP2 토큰 `ABC`를 발행해봅시다
```bash
## mainnet
bnbcli token issue --symbol ABC --token-name "ABC token" --mintable --total-supply 10000000000000000 --from owner --chain-id Binance-Chain-Tigris --node http://dataseed4.org:80

## testnet
tbnbcli token issue --symbol ABC --token-name "ABC token" --mintable --total-supply 10000000000000000 --from owner --chain-id Binance-Chain-Ganges --node http://data-seed-pre-0-s3.binance.org:80
```

## BEP20 토큰 배포하기
[doc](issue-BEP20.md)을 참고하세요.

BEP20 토큰의 심볼은 bep2 토큰의 접두사에 정확히 일치해야 합니다(대소문자 구분).

## 토큰 바인딩
### 바인드 트랜잭션 보내기
```bash
## mainnet
bnbcli bridge bind --symbol ABC-A64 --amount 6000000000000000 --expire-time 1597545851 --contract-decimals 18 --from owner --chain-id Binance-Chain-Tigris --contract-address 0xee3de9d0640ab4342bf83fe2897201543924a324 --node http://dataseed4.binance.org:80

## testnet
tbnbcli bridge bind --symbol ABC-A64 --amount 6000000000000000 --expire-time 1597545851 --contract-decimals 18 --from owner --chain-id Binance-Chain-Ganges --contract-address 0xee3de9d0640ab4342bf83fe2897201543924a324 --node http://data-seed-pre-0-s3.binance.org:80
```
ABC-A64 토큰의 전체 발행량은 1억입니다. 위의 바인드 전송은 6천만 개를 순수 코드 제어 주소로 전송합니다. BC에는 4천만 개의 유동 토큰이 있습니다. 바인드 메커니즘에 따르면 **TokenManager** 큰트랙트에 4,000만 토큰을 예치하고, BSC에 6,000만 개의 유동 토큰을 남겨야 합니다. 따라서 두 체인의 유동 토큰의 합계는 1억 개입니다. 위에 언급한 금액에는 소수점이 포함되지 않는다는 것을 기억해주세요.
### 바인드 요청 승인
1. 금액 부여:

    [myetherwallet](wallet/myetherwallet.md)에서 BEP20의 **approve**를 호출하여 TokenManager 컨트랙트에 4,000만 달러 수당을 부여합니다. 지출자 값은 `0x0000000000000000000000000000000000001008`이어야 하며 금액 값은 4e25여야 합니다. 트랜잭션 전송자는 BEP20 소유자여야 합니다.

    ![img](https://lh6.googleusercontent.com/p-HctNRPwXg0VD1yfE3j4OJ3BrMHPZpiGGCtp7XUJX34z_LT53nvZqgTzY58Ab1EsybJipwjsnwL2uJ-CPH8gntDpcw7LW7aFPK1_KRxxnNq-xErwGpaPTlg5UbfKoVNjd4YT0xU)

2. 바인드 승인

    [myetherwallet](wallet/myetherwallet.md)에서 **approveBind**를 **TokenManager** 컨트랙트에 호출하여 BEP20 소유자 주소에서 온 바인드 요청을 승인합니다.

    ![img](https://lh6.googleusercontent.com/nFIbDxpA8bTVYH0Rt4UD-SYYz62TmYKjOsgK1CXxFRHHJlz6gOyXnq5p3GesM_zrQES4ixmojvN_Srk4CIf1MPxBXbia-K2DNiL23Hao1HiUgdNe4S2BmPe6yn5XJz7ajlwVVCti)

    여기서 값은 최소 `miniRelayFee/1e18`여야 합니다. 최초 `miniRelayFee`는 1e16 이므로 `miniRelayFee/1e18`은 `0.01`과 동일합니다. 또한 `miniRelayFee`는 온체인 거버넌스로 변경 가능합니다.

3. BC에서 바인드 결과를 확인합니다

    20초 정도 후 아래 명령어를 실행하세요:
    ```bash
    ## mainnet
    bnbcli token info --symbol ABC-A64 --trust-node --node http://dataseed4.binance.org:80
    ## testnet
    tbnbcli token info --symbol ABC-A64 --trust-node --node http://data-seed-pre-0-s3.binance.org:80
    ```

    ```json
    {
      "type": "bnbchain/Token",
      "value": {
        "name": "ABC Token",
        "symbol": "ABC-A64",
        "original_symbol": "ABC",
        "total_supply": "100000000.00000000",
        "owner": "tbnb1l9ffdr8e2pk7h4agvhwcslh2urwpuhqm2u82hy",
        "mintable": false,
        "contract_address": "0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "contract_decimals": 18
      }
    }
    ```
    바인드가 성공할 경우, 위 응답에서 "contract_address"와 "contract_decimals"이 빈칸이어선 안 됩니다.




## 활용 사례

### 사례 1: 바인딩 트랜잭션에서 0이 아닌 금액 예치

당신의 금고에 2천만 개가 있는데, bind tx를 통해 일부 토큰을 예치하기로 결정했다고 해봅시다.
1. BNB 체인에서 바인드 전송을 보내고 예치 금액으로 2천만을 지정합니다.
2. BEP20은 1억개의 물량을 보유하고 있으며 tokenHub 컨트랙트에 돈을 송금하기 위해 `approve`를 실행한 다음 `approveBind`를 실행합니다. 이 단계를 따라 tokenHub 컨트랙트로 정확히 얼마가 필요한지 지정할 필요가 없습니다. 충분한 금액으로 `approve`하기만 하면 tokenHub 컨트랙트로 정확히 얼마가 필요한지(실제로 8000만) 알아낼 수 있습니다.
3. `approveBind`이 성공적으로 실행되면 바인딩이 완료됩니다. 2천만이 BSC의 소유자 주소에 있게 되며, 이것은 당신의 **선택**입니다.
4. 바인딩 후, 당신이 원하는 대로 2천만 달러를 쓸 수 있습니다(BC로의 이전 포함). BC에 있는 당신의 토큰의 다른 소유자들의 경우, 그들은 당신의 도움이나 허락 없이 토큰을 BSC로 자유롭게 옮길 수 있습니다.

### 사례 2: 바인딩 트랜잭션에서 0 예치

당신의 금고에 2천만 개 토큰을 전혀 건드리지 않기로 선택했다고 가정해 보세요.
1. 금고에 2,000만 개가 있을 때, 바인드 tx를 실행할 때 0을 예치할 수 있습니다.
2. 당신의 BEP20이 1억개의 물량을 보유하고 있다고 가정하면, tokenHub 컨트랙트에 1억개를 주기 위해 `approve`을 실행한 다음, `approveBind`를 실행합니다.
3. `approveBind`가 성공적으로 실행되면 바인딩이 완료됩니다. 당신의 2천만 개는 BC의 당신의 금고 주소에 남이 있고 아무 일도 일어나지 않으며, 이것은 당신의 선택입니다. 반면 BSC에서는 tokenHub 외에는 아무도 BEP20 토큰을 가지고 있지 않습니다. 하지만 바인드가 완료되었기 때문에 간단한 크로스 체인 전송으로 자신을 포함한 모든 사람이 원할 때 BEP20을 받을 수 있습니다.
