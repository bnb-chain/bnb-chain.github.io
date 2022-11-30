---
sidebar_label: Math Wallet
hide_table_of_contents: false
---

# BNB 스마트 체인에서 매스(Math) 월렛 사용하기
## 설치하기
1. 크롬 웹스토어에서 다운받으세요.
<img src="https://lh5.googleusercontent.com/XbwCKYstUkfmKqHeaZHsU712-id33U5UvR5Dniq2UuwUIRnM8C-cTscbJixIKSFMTCkVBrdb3zmgCa2leASOMlUAgM139TalYkZLyb_eUhWc6xWnTbDj4I8ERd6FI5GlXEYQ2XrL" alt="img" style={{zoom:"50%"}} />

2. 브라우저에 추가하세요.
<img src="https://lh6.googleusercontent.com/li_pfeaAEkB4UyYwOl1TdjoF7i7X9lvi8UNPBoUJQJ5Kd7V2Ptaw-00cMzM2CGeKuWb4c_meuE7UWuiPfYpplRTJhrqluYsPyCnfEGNxKJg9znh_o5iyUVitq4kPQ64qNB8zz9ej" alt="img" style={{zoom:"33%"}} />

<img src="https://lh4.googleusercontent.com/b0aBH_0jXMg2U4Ixm-ids57EGqluIih3tQLqOaZIQw3lHW3685vI9QUlcIjCVB7EThsRx86hJwT1jYEGCHHfcyTraY1eStP8VxThXUtgvRypsXyEsw4-bh8Tem9tH2LtUM5_izph" alt="img" style={{zoom:"50%"}} />

## 월렛 셋업하기
1. 비밀번호를 설정하세요.
 
<img src="https://lh4.googleusercontent.com/04v_hzZBF2wOiNk3XYDKgXi0CzVtfChzC9bIoT0EwCtHMYpGk1OaDfz1bCHAgegKxNHzA14mtHQDoeFnaOTX_BStwTC_GNb-bTzpOihIwjSumdnb2uZtR1obgDYoJwb3aiURKMMz" alt="img" style={{zoom:"50%"}} />

2. BSC 네트워크를 선택하세요.

<img src="https://lh5.googleusercontent.com/vAIW4n_vrcfuqkUJibumqPSGwv3_HeTazQSz0nEFyQz9hntjytTF-i_QiGmPUayUXqMM42dgjJIEdB-dBSygz7i1mrrIJmvQ-6IJNx_HLGtFajxuBDQgXeZd7TTokOX19CSR_OEh" alt="img" style={{zoom:"33%"}} />

3. 목록에서 BNB 스마트 체인을 선택하세요.
   
<img src="https://lh5.googleusercontent.com/k9zfSDN3dSEZDwqqjQriozV-8QiC0Rk1V8U3hWf6i_OD8WvDdmaKL4ZRUVh7nvkAtH0Jl8ZJTj1OEalWwvDY_tdTlRd6jsx3NKYF9pffkMIW97dUMjqmCEDpOcQMNHLv02dfCYHk" alt="img" style={{zoom:"33%"}} />

4. 월렛을 생성하세요.

<img src="https://lh5.googleusercontent.com/ov1JDt8uLKJc8Q8gECGlree_rBkDu6oIUaXLuST6EimwmMSdVlPJIFPBItPIIKl4LqpasKS63y4jRRzKXi5qoT5T_73pD64Q6le9eRI3nXNXEuWSURRdXI-jjl2Pfk0iTQyGMRkz" alt="img" style={{zoom:"33%"}} />

<img src="https://lh6.googleusercontent.com/dzx1pjMPq7F4e1N-1UJXrguzRh6W5DNJ3x1t1TsfJktpe2PkhPXWe3gytm-wMroCnhWv-StxFOaz2H54iSUSmIvwup-LshE3-z2AWnVG7ygpyhtE5BK_nOnTasw-CWJAvhOzxtFn" alt="img" style={{zoom:"33%"}} />

5. 개인키를 저장하세요.

<img src="https://lh5.googleusercontent.com/fhgMWkIjTo_KE5QloGrYesFfaOSgHS6KdySsGjMBLYFH1mmRunRmLSTu4CD3ia4S7nWn044g9lvGIBLiH9MkikPBbIBetiWrOTY1TlQA84WJYieMbFpUeY5dTiR1L5eDO6m23c3C" alt="img" style={{zoom:"33%"}} />

다 준비가 되었으니 포셋에서 테스트넷 BNB를 받으세요.

## 테스트 토큰 받기
1. 주소를 복사하세요.

<img src="https://lh3.googleusercontent.com/1WquPDgLagkXcni9u9yPXzgaagCRd0nzm49cZ516XZSRB_rlOuybVG48C4R2ozhiSlIizxEMI_J7GexZz64E4vUpH362rrAn74GP1ALLOFOZusF8qjM1Xk71cTo5-EWcFvvqpIRL" alt="img" style={{zoom:"33%"}} />

2. <https://testnet.binance.org/faucet-smart/>로 가세요.

탐색기로 가서 BNB가 전송된 것을 확인하세요. <https://testnet.bscscan.com/>

## 테스트넷에서 BSC로부터 BC로 BNB가 전송된 것 확인하기

1. tbnbcli를 이용하여 바이낸스 갠지스 테스트넷 주소를 생성하세요
* [여기](https://github.com/binance-chain/node/releases/tag/v0.8.1)에서 바이너리를 다운받으세요.
> 이미 바이낸스 갠지스 테스트넷의 복구 프레이스가 있다면, 여기에서 재사용할 수 있습니다.
```
tbnbcli keys add {wallet-alias}
```
2. 이 페이지를 방문하세요: <https://developer.mathwallet.org/bsc02/>
메인넷의 경우 여기를 방문하세요: <https://developer.mathwallet.org/bsc01/>


`Recipient`에 테스트넷 주소를 붙여넣기 하고 전송 금액을 입력하세요.
![img](https://lh6.googleusercontent.com/jBLdydCWQEKJ-ksWfixIUH8qrFC9JEaLw4SbGRWngKCWXAjQDzl0ZCKs3Ajn2ZILcnd2XJzZxK6x62DHNb7_VHaJFm78qvU6zD-fhp5p7KGyDesNz5q6hilLLRbuv1Ygw-46JoBq)

가스비와 크로스체인 송금에도 수수료가 차감된다는 사실에 주의해주세요.

3. 트랜잭션을 승인해주세요.

![img](https://lh3.googleusercontent.com/1LZhflItAfxbbPLppP_2mZQXhKlKbvAhk51-Or41wTaHY7Rs3B5g62QO1_4ymA0rgx8HoEmvCyEWbWSm_LOrxXyvHWZ24EsRVSJoLELHdprSiLAMLd5cDiDm_89Nd5z78CP0fPw5)

4. 탐색기에서 트랜잭션을 확인해주세요.
링크: <https://explorer.binance.org/testnet>

## 테스트넷에서 BSC로부터 BC로 BEP20를 전송하기

이중체인 구조의 혁신 중 하나는 토큰 발행인이 양 체인 모두에서 자산을 관리할 수 있다는 점입니다. BEP2와 BEP20 토큰을 바인딩할 수 있습니다. 바이낸스 체인 갠지스 테스트넷에는 페그된 토큰이 몇 가지 있습니다:

* [바이낸스 체인 테스트넷](https://explorer.binance.org/testnet/asset/BTC-E24)과  [BNB 스마트 체인 테스트넷](https://testnet.bscscan.com/address/0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8#code)에서의 페그된 BTC 
* [바이낸스 체인 테스트넷](
https://explorer.binance.org/testnet/asset/ETH-64F)과 [BNB 스마트 체인 테스트넷](https://testnet.bscscan.com/address/0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378#code)에서의 페그된 ETH
* [바이낸스 체인 테스트넷](
https://explorer.binance.org/testnet/asset/XRP-C46)과  [BNB 스마트 체인 테스트넷](https://testnet.bscscan.com/address/0xa83575490d7df4e2f47b7d38ef351a2722ca45b9#code)에서의 페그된 XRP

포셋에서도 이 페그된 토큰들을 일부 획득할 수 있으며 바이낸스 체인 테스트넷에 다시 보낼 수도 있습니다.

### 1. 트랜잭션 승인하기![img](https://lh3.googleusercontent.com/bYfuPLKjeTopR_VUzr6MBEHZWy6UkJ10hlXICxbHh7LvoKi5Hdr2aW7Z_nSDgKphaCc9iOijoignzydzmYU1BGOyN6IRHJPHLKia1XD59651hS-EMU9vboqblgBSziivtZGdQ05e)

### 2. BC로 BEP20 보내기![img](https://lh5.googleusercontent.com/_RKYU23BD2xhw-g63K8O3RRF1sEKGAC5zyTOIpWUJl9scDyn1kbjwEO6gjFPkVCeFMoG-8D0xvqNH17sJSlZP_FxCrduCqEKZqHfk8DtTnBk6XKHnHDLPAaR8VjVcNNWZsAw74FB)