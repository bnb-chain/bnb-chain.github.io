---
sidebar_label: Trezor Wallet
hide_table_of_contents: false
---

# BNB 스마트 체인에서 트레조 월렛 사용하기

트레조 하드웨어 월렛은 BNB 스마트 체인에서 BNB와 코인을 지원합니다. 아래에서는 BSC에 트레조를 연결하여 사용하는 법을 알아보겠습니다.

## 요구 사항
* <https://wallet.trezor.io>를 방문하여 트레조를 초기화
* Trezor Model T firmware version **2.3.0**.
* Trezor Model One firmware version **1.9.3**.
* 인터넷 연결과 사용 가능한 USB 포트. USB-C 포트인 경우 어댑터 사용
* U2F 호환 브라우저: Google Chrome, Opera, FireFox, Brave


## 메타마스크 연결

BNB 스마트 체인은 메타마스크와 호환됩니다. 사용자들은 BNB 스마트 체인 테스트넷에 트랜잭션을 전송하기 위해 트레조와 BNB 스마트 체인 사이의 브릿지로서 메타메스크를 사용할 수 있습니다.

1) 이 지침을 따라 커스텀 네트워크 추가를 위해 [MetaMask](./metamask.md)를 BSC 테스트넷에 연결하세요.

 * Testnet
    * [RPC URLs](../rpc.md)
    * ChainID: 97
    * Symbol: BNB
    * [Block Explorer](https://testnet.bscscan.com)

 * Mainnet
    * [RPC URLs](../rpc.md)
    * ChainID: 56
    * Symbol: BNB
    * Block Explorer](https://bscscan.com)

<img src="https://lh5.googleusercontent.com/rKKpjCDqHacvAPuSZwdMlaD7bGcpN3QRNvcDieBpm3WHCsOWlFDTZN4j3LFw9R1VJ5zGfqoUW3U61GpN4WdfOeSoviSs6NldK4Ypt2O6wnbl-O8wJbpG6uMKBxdNRiH0B5yqRLP1" alt="img" style={{zoom:"50%"}} />

### 메타마스크 잠금해제

<img src="https://lh5.googleusercontent.com/EpbHPRV-ycTSYYNdDi67wqB5GKpiYUj4AOSLr0dTNV3vbTBP377YM75f5iYFeKzHu_6ykJr7UEZ81xds2czCXe4qOtBgekIJGdAwdnh_UGPggujVHxHHrTqHTLgmgLh0HFgiAJgp" alt="img" style={{zoom:"33%"}} />

### “Connect Hardware Wallet” 클릭하기

<img src="https://lh6.googleusercontent.com/1gb3-LE3KVM-rnFBHr3MMrdYrtsknZ3LqRFOanx_LHPyi6wTFpi7qwyIfH0ftwrE8zTN0ossizTk7ddBBGLod-r3JR948XgSFJuIDGzXvMUh-Wp4jLrGdmVGcadhynrv-YFdPuNd" alt="img"style={{zoom:"33%"}} />

### 트레조에서 주소 선택하긴

![img](https://lh6.googleusercontent.com/pR4k7YODv8glVOS1L8BtQ3XBBdY_5--HWX9iethu8QGQeL-59aPmOO61-9VmydW7FgY270a1XGknTWKoj-lohFkCy2AeHpu2Fe00RlzloRCTHGrum7hTLfWDziokCd2SxNeoy_-9)

새 계정이 보일 것입니다.

![img](https://lh5.googleusercontent.com/ezhJcRJA2Pfr6XsNto6zBU6E54hpvfdjd55xj3YlZVYUfOWj1Df4mAOV2VbFVCiTeW-LiBKMpuWpT-0lgsQSGgLDhH2hZnNaMSTsrS9IvPLJbtHLD6YSkqiQeWHQXvRvifyKg1Tm)

## 전송 가이드

### 전송 트랜잭션을 보내고, next 클릭

<img src="https://lh4.googleusercontent.com/vuylKsIqqTMl1SORH1gd7QbAiL6fywTwIOT40asaYjDnYAArTL7cZZon3ozzSylgqwmySun-pBEq__jVaML-Y_mEu5kaSuoZM5i2d7M9utoCCtUmQogW2vQ4wY7GRjN-ACu4Yqxc" alt="img"style={{zoom:"33%"}} />

### 트랜잭션 세부 사항을 검토하고 트레조 기기에서 확인하기

![img](https://lh4.googleusercontent.com/6NKBwtaMaTetlmDBfuHFFFpbBvF49KZl9FFrD5B9uT_fPILH80BhjMOB7zUWTFsXbP0-hYuSa8xBzaiIS2OD7bGhIXlUGkbPE5n8VSXcU5chmtSXfrHqb1oV0FJyWw7AKbR6Ts6Z)

### 트레조 기기에서 같은 정보 확인하기
![img](https://lh3.googleusercontent.com/undvuvIO0EUSzQmLnUoJbkF4_YqYE3QQk-M5cacvcycIWi5ei1kPKWAMW8jLABbLR3eI45M5bKzsumMJ161ogGe2jP7GhJBeM0AdH9FbCmy7ym6lUECoDGfg9nFusgmK6SUCbjHZ)

### “Activity” 탭에서 트랜잭션 상태 추적하기

<img src="https://lh4.googleusercontent.com/ejb2jVBsYnFHctelQtR9gS36Z96td60sQ1yVFYdSbLr_jCTkyv2Im2P1wkHxS3JGAYHRXQTiac3FO9dUH1GX0eKHG1Vwk764tSMERGza_vmQcxxm32S66-kFi18wTifSrF-uD9tL" alt="img"style={{zoom:"33%"}} />