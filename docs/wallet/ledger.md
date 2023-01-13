---
sidebar_label: Ledger Hardware Wallet
hide_table_of_contents: false
---

# 레저 하드웨어 월렛

레저 나노 S 하드웨어 월렛은 BNB와 BNB 스마트 체인의 코인들을 지원합니다. 아래의 내용은 레저 나노 S를 BSC에 연동시키는 방법을 설명합니다.

## 요구사항
* 최신 펌웨어를 갖춘 레저 나노 S 하드웨어 월렛
* 최신 버전 이더리움 앱 설치
* 인터넷 연결 및 USB 포트. USB-C 포트를 위한 어댑터를 사용하세요.
* U2F와 호환 가능한 브라우저: Google Chrome, Opera, FireFox, Brave

## 앱 설치 설명

!!! 팁
		기존의 이더리움 앱은 BNB 스마트 체인과 호환 가능합니다

1) 레저 기기를 전원에 연결하고 잠금해제합니다. 컴퓨터에서 레저 라이브(Ledger Live)를 열고, "Manager" 패널을 엽니다.

![img](https://lh4.googleusercontent.com/3IYxS3SPr--yBE7OSuw-i7BkKNk7WR_3PxOdq2PMx_xZl3prBrslPvFbUTEY9keZ-g1XOV4WTpJ_9wM32mPVQ_gNh8A5lSigGb1qRTgkOz6wlZa9LzTjBl0QMCVv5LIouGcJOwwn)

2) "Manager" 패널에서 검색창에 "Ethereum"을 입력합니다. "Ethereum"을 찾고 "Install"을 클릭합니다. (참고: "Binance Chain" 앱을 사용하지 마세요.)

![img](https://lh5.googleusercontent.com/q2SEjHGNgiCZMMdvZ3dvH96o67MqPm4Otj70XGnmsmZT3NekLUXo-FlJlnBpuIPiZRnCstEgOYq3Vmip0gMd7tD7gV_J4oECFBKDYmSe1Euph3ST1e5TeRrZyqZWL_AEAiL3aVer)

![img](https://lh5.googleusercontent.com/FYp-dbx_njGFbP3LqSDGYBIqubv5VEU2n-eLJTqxdtRctpWLNnDpZdN48rGNogCQTC5LgwACaA9eP2_FAwzEMWNQxvxct7AHS3lcojJf8qsbvB_rRMaGrb1-YAO0LYgF0A83fjqY)

3) Ethereum 앱이 레저 기기에 설치될 것입니다.

![img](https://lh5.googleusercontent.com/1lT0rjEpawrZO6TkthQCCCQMs5CHH44iKDhZTJr6_VAOGsftEuJIih6d_-1VWq5DHET9yfn-FgiIA87tZ-zxl4RJPn8kpVWCK7ZHrccJBXeTjlzIfqg5CwGzoESQR3s8yUhVHbmX)

## BEP20를 위한 컨트랙트 데이터 활성화하기

!!! 팁
		 BEP20 토큰 전송 전에 컨트랙트 데이터가 활성화되어 있는 것을 확인하세요 
BEP-20 토큰을 전송하고 싶은 경우 기기에서 컨트랙트 데이터를 활성화해야 합니다. 그렇지 않으면 무효 상태 `6a80`가 반환됩니다.

순서: 

- 레저 기기를 연결하고 언락하세요.
- 이더리움 앱을 여세요.
- Settings으로 이동하기 위한 버튼을 누르세요. 검증하기 위해 두 버튼을 다 누르세요.
- 컨트랙트 데이터 세팅에서 두 버튼을 모두 눌러 트랜잭션에서 컨트랙트 데이터를 허용하세요.
- 기기에 "Allowed"가 나타납니다. 

## 메타마스크에 연결하기

BNB 스마트 체인은 메타마스크와 연동됩니다. 사용자들은 BNB 스마트 체인 테스트넷에 트랜잭션을 생성하기 위해 메타메스크를 레저 나노 S와 BNB 스마트 체인 간의 브릿지로 사용할 수 있습니다.

1) 커스텀 네트워크를 추가하기 위해서는 아래와 같이 [MetaMask](./metamask.md)를 BSC 테스트넷에 연결하세요.

 * Testnet
    * [RPC URLs](./../rpc.md)
    * ChainID: 0x61 (10진수로 97)
    * Symbol: BNB
    * [Block Explorer](https://testnet.bscscan.com)

 * Mainnet
    * [RPC URLs](./../rpc.md)
    * ChainID: 0x38 (10진수로 decimal)
    * Symbol: BNB
    * [Block Explorer](https://bscscan.com)

### 메타마스크 언락하기

<img src="https://lh5.googleusercontent.com/EpbHPRV-ycTSYYNdDi67wqB5GKpiYUj4AOSLr0dTNV3vbTBP377YM75f5iYFeKzHu_6ykJr7UEZ81xds2czCXe4qOtBgekIJGdAwdnh_UGPggujVHxHHrTqHTLgmgLh0HFgiAJgp" alt="img"style={{zoom:"33%"}} />

### “Connect Hardware Wallet” 클릭하기

<img src="https://lh6.googleusercontent.com/1gb3-LE3KVM-rnFBHr3MMrdYrtsknZ3LqRFOanx_LHPyi6wTFpi7qwyIfH0ftwrE8zTN0ossizTk7ddBBGLod-r3JR948XgSFJuIDGzXvMUh-Wp4jLrGdmVGcadhynrv-YFdPuNd" alt="img"style={{zoom:"33%"}} />

### “Ledger” 선택하기

<img src="https://lh5.googleusercontent.com/TCPL_nMhLOTeS1TGRULD_4mMXVx_EhlVqOopfizYK8TiMVQXd0CxDwuefnuAoq_x2ESislvm3z-XZLStw_GJ4pOS1kxSjUZU4-SbZitGrIrFvVbCoVd1qzanzjRBiCTw-hb00f57" alt="img"style={{zoom:"33%"}} />

### 주소 선택하기

![img](https://lh3.googleusercontent.com/FlMY9pjEboYDskkLYu2tZ3QZL6RAaTD-gOUGrSV5F53uFRqVfzvo7znZL_EqU117enWTFaC_1Zx26b-BEneX9ivxo2_-1xjBSBZ-uHZlp0ySTZJ4Rgd5SLhpRP2WZLv7jDZc9Oek)

새로운 계정이 보일 것입니다.

<img src="https://lh5.googleusercontent.com/7Uo7dvi4PVqPiYnVcUEFkVsGNemyIgB0hAq2y244NhM_pNXVwFZi9zU1aYwmqf1koc-bC3BLthA-phkKD8_hr1hd9RkxTCJohbmwTcJiHscPOCzVn5O-Xs6Z2-ci17pVr2Lj1ljr" alt="img"style={{zoom:"33%"}} />

### 블록체인을 이용하는 법을 더 알고 싶다면 이 [문서](metamask.md)를 참고하세요

레저를 사용하면 기기에서 트랜잭션을 승인해야 합니다.

### 전송 트랜잭션을 시작하고 next를 클릭하세요.

<img src="https://lh4.googleusercontent.com/vuylKsIqqTMl1SORH1gd7QbAiL6fywTwIOT40asaYjDnYAArTL7cZZon3ozzSylgqwmySun-pBEq__jVaML-Y_mEu5kaSuoZM5i2d7M9utoCCtUmQogW2vQ4wY7GRjN-ACu4Yqxc" alt="img"style={{zoom:"33%"}} />

### 트랜잭션 세부사항을 확인하고 레저 기기에서 동일한 정보를 확인합니다.

<img src="https://lh5.googleusercontent.com/hICFx-MRkPsAHGtEuSNh5tGAZheKNrm3YjVmw-QcLVV90910YwxccP9bBpH7_o2VBDcYwZ8skZkgLdG5jATXgUhK035urAnr8aUzSexrdqHfi1CXnk3LjPx8dpcE668qzDoHLQEc" alt="img"style={{zoom:"33%"}} />

### 레저에서 트랜잭션 정보를 확인할 수 있습니다.

<img src="https://lh5.googleusercontent.com/x2hiegyGjwWzUkWJ1NknXw7TiWyhJ1M-FT1-2nzfSxHVcYF48AjE73vcEpiSsKiriZTYtOq_l6_SjrWFuNNzbhRDX6vN5sCfQA9vtGLqtJotmS6j5CTOrPK6YGUw2gmfY8HUo6iK" alt="img"style={{zoom:"33%"}} />

11) 트랜잭션을 서명할 준비가 되었다면, 레저 기기에서 다음과 같은 화면이 나올 것입니다. 양 버튼을 모두 눌러 이 트랜잭션을 전파합니다.

<img src="https://lh5.googleusercontent.com/8QvlXBQst1p87Y8Ot1PHHnsxN0DjsdRuJeD03uLR9WPtChcuhVbbZ6xmB_e27LL2F7zIgdcK84mL6qzOJEl-HDpeGIndH91t1Mb9B6_Ix9OqlFdzVbSKiR-Nv1m-Dv4ggtVOY3Tk" alt="img" style={{zoom:"33%"}} />

12) “Activity” 탭에서 트랜잭션 상태를 추적합니다.

<img src="https://lh4.googleusercontent.com/ejb2jVBsYnFHctelQtR9gS36Z96td60sQ1yVFYdSbLr_jCTkyv2Im2P1wkHxS3JGAYHRXQTiac3FO9dUH1GX0eKHG1Vwk764tSMERGza_vmQcxxm32S66-kFi18wTifSrF-uD9tL" alt="img"style={{zoom:"33%"}} />


## FAQ

1. BEP20 토큰 전송 실패

에러 메시지:

```
 '{"value":{"code":-32603,"message":"Error: TransportStatusError: Ledger device: Invalid data received (0x6a80)"}}'
```
위에서 언급된 단계를 따라 컨트랙트 데이터를 활성화해야 합니다.