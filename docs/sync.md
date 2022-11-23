---
sidebar_label: Sync Token Supply
hide_table_of_contents: false
sidebar_position: 2
---

# BEP2과 BEP20 토큰 총공급량 싱크 맞추기

## 요구사항

이 BEP20 토큰은 BEP2 토큰에 [미러](mirror.md)되어 있습니다.

## 동기

BC에 미러된 BEP20 토큰의 경우, 누구든지 `sync` 메서드를 호출하여 BC와 BSC에서의 총공급량의 균형을 맞출 수 있습니다. 따라서, 두 블록체인 간의 총공급량은 동일하게 유지됩니다.

## 작동 방식

- 이미 미러링이 되어 있는지 확인합니다.
- 총 공급량 및 토큰 심볼이 유효한지 확인합니다.
- 바이낸스 체인에서 BEP2의 총공급량을 수정하기 위해 크로스 체인 패키지를 보냅니다.

동기화 후, BC와 BSC의 총공급량은 동일합니다.

## 수수료 테이블

| 수수료 이름   | BNB로 지불 |
| ----------- | ---------------------------- |
| syncFee     | 현재 메인넷에서 0.002BNB |
| relayFee    | 현재 메인넷에서 0.002BNB |

`syncFee`와 `relayFee` 둘 다 온체인 거버넌스로 변경될 수 있습니다.

시스템 컨트랙트에서 `syncFee` 쿼리하기;

- 최신 [ABI](https://github.com/bnb-chain/bsc-genesis-contract/blob/master/abi/tokenmanager.abi )를 사용하여 `Tokenmanager` [컨트랙트](https://testnet.bscscan.com/address/0x0000000000000000000000000000000000001008#writeContract) 호출

- `syncFee` 함수 호출

Fee= result/1e18

시스템 컨트랙트에서 `relayFee` 쿼리하기;

- 최신 [ABI](https://github.com/bnb-chain/bsc-genesis-contract/blob/master/abi/tokenhub.abi) 사용하여 `TokenHub` [컨트랙트](https://testnet.bscscan.com/address/0x0000000000000000000000000000000000001008#writeContract) 호출

- `getMiniRelayFee` 함수 쿼리하기;

Fee= result/1e18

## 마이이더넷월렛과 싱크하기

- `Tokenmanager` 컨트랙트 호출

최신 [ABI](https://github.com/bnb-chain/bsc-genesis-contract/blob/master/abi/tokenmanager.abi) 사용하기

![img](https://lh5.googleusercontent.com/SYyvWVcLHELSE72JSXqBwMJB6Y50jMz5HgH6irmCbyxGwr-W_Hz-vbm4IqWXAqE2hvCAXaqNKfs28ZhGFtMrMrDgWvDfEkHPunnSuxSKPpLBtuxmiX-b5yRjfczENJxKDrqSAYWy)

- `sync` 함수 선택하고 여러분의 BEP20 주소를 기입합니다

여기서 최소값은 `syncFee`+ `relayFee`입니다.

타임스탬프는 `unix_timestamp(now())` 이상이어야 합니다. 격차는 120에서 86400 사이여야 합니다. `unix_timestamp(now())+1000` 사용을 권장합니다.

![img](https://lh5.googleusercontent.com/EIgRKIBY8unMsuSBa88jY_EXdJeO1WtaXTQLV905AZmPJDsN72chHcPZrDEWOeD8m1a1awEwP43Uh0eFURLXSKQvnfc3J9YzWLYuBvAeVwIwicKfLUZlCkvkR0NdWxkYWAQKa3Ii)

다 준비가 되었습니다!