---
sidebar_label: BEP2와 BEP20 토큰 미러링하기
hide_table_of_contents: false
sidebar_position: 2
---

# BEP2와 BEP20 토큰 미러링하기

## 요구사항

이 BEP20 토큰은 다른 BEP2 토큰에 연동되지 않았습니다.

## 동기

누구든지 `mirror` [메서드](https://github.com/bnb-chain/bsc-genesis-contract/blob/af4f3993303213052222f55c721e661862d19638/contracts/TokenManager.sol#L331)를 통해 자동으로 BEP2 토큰을 발행하고 바인딩할 수 있습니다.

## 작동 방식

- 펜딩 중인 미러 요청이 없음을 확인합니다.
- 총 공급량 및 토큰 심볼이 유효한지 확인합니다.
- 비컨 체인에서 BEP2를 발행하기 위해 크로스 체인 패키지를 보냅니다.
- 새로 생성된 BEP2 토큰은 토큰 홀더가 크로스 체인 전송을 보내기 전까지는 예치되어 있습니다.

바인딩 후, 모든 유동적 발행량은 BSC에 있습니다.

## 수수료 테이블

| 수수료 이름    | BNB로 지불|
| ----------- | ---------------------------- |
| mirrorFee   | 현재 메인넷에서 10 BNB  |
| relayFee    | 현재 메인넷에서 0.002BNB |

`mirrorFee`와 `relayFee` 모두 온체인 거버넌스로 변경될 수 있습니다.

시스템 컨트랙트에서 `mirrorFee` 쿼리하기;

- 최신 [ABI](https://github.com/bnb-chain/bsc-genesis-contract/blob/master/abi/tokenmanager.abi) 사용하여 `Tokenmanager` [컨트랙트](https://testnet.bscscan.com/address/0x0000000000000000000000000000000000001008#writeContract) 호출하기

- `mirrorFee` 함수 쿼리하기

Fee= result/1e18

시스템 컨트랙트에서 `relayFee` 쿼리하기;

-  최신 [ABI](https://github.com/bnb-chain/bsc-genesis-contract/blob/master/abi/tokenhub.abi) 사용하여 `TokenHub` [Contract](https://testnet.bscscan.com/address/0x0000000000000000000000000000000000001008#writeContract) 호출하기

- `getMiniRelayFee` 함수 쿼리하기

Fee= result/1e18

## 마이이더월렛과 미러링하기

- Call `Tokenmanager` Contract

최신 [ABI](https://github.com/bnb-chain/bsc-genesis-contract/blob/master/abi/tokenmanager.abi)를 사용합니다.

![img](https://lh5.googleusercontent.com/SYyvWVcLHELSE72JSXqBwMJB6Y50jMz5HgH6irmCbyxGwr-W_Hz-vbm4IqWXAqE2hvCAXaqNKfs28ZhGFtMrMrDgWvDfEkHPunnSuxSKPpLBtuxmiX-b5yRjfczENJxKDrqSAYWy)

- `mirror` 함수를 선택하고 여러분의 BEP20 주소를 입력합니다.

여기서 최소값은 `syncFee`+ `relayFee`입니다.

타임스탬프는 `unix_timestamp(now())` 이상이어야 합니다. 격차는 120에서 86400 사이여야 합니다. `unix_timestamp(now())+1000` 사용을 권장합니다.

![img](https://lh3.googleusercontent.com/_DpAMjJwZeujn5bud485SPV014Gf4W8DRIcN9Y9FQyPxt3bveWPK8BImBbKF8pNHlE33a88I3aFLfP04uDZ8iFDvnUHtIj8cTuk_uEmImhsOmDU01UxtkNiHYNKxPGQ5jzLMpTzm)

이제 준비되었습니다.

![img](https://lh4.googleusercontent.com/4SrlLnt8g699kcX6cRYviG1GXko7QQQsym4vShNOz3BVvlR9qUtCxGjoK5Mo8XUK23YQUTjgrPXRKLN9Qk_DVkmoVCEhO9K4g94CkrgJM6P8xTb4rV5r2TF0t61EKfxzS3M6fIyB)

## 토큰 심볼 BEP2 쿼리하기

`tokenhub` 컨트랙트에서 토큰 심볼 BEP2를 쿼리할 수 있습니다.

최신 [ABI](https://raw.githubusercontent.com/bnb-chain/bsc-genesis-contract/master/abi/tokenhub.abi)를 사용합니다.

`getBoundBep2Symbol` 함수를 선택합니다.

그러면 결과값에서 토큰 심볼을 볼 수 있습니다.

![img](https://lh6.googleusercontent.com/i1NSu3t9lWEo5lRmsNw7moE_okqZe7VOto1vjGl3MXhQIoNJUJ0wMEwx-68LYRfMKbTs8TfCXzPGWJ7Oj9nSdtF3vo4wVnb_QFCeeC6RQk6kweQOe61_isnt8BOQs7mGmPpz7PKP)