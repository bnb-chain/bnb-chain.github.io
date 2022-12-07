---
sidebar_label: 바이낸스 익스텐션 지갑 FAQs
hide_table_of_contents: false
sidebar_position: 2
---

# 바이낸스 익스텐션 지갑 FAQs

## 바이낸스 익스텐션 지갑(BEW)를 어떻게 다운로드할 수 있나요?
**크롬 앱스토어 링크**: <https://chrome.google.com/webstore/detail/binance-chain-wallet/fhbohimaelbohpjbbldcngcnapndodjp>

**파이어폭스 앱스토어 링크**: <https://addons.mozilla.org/en-US/firefox/addon/binance-chain/?src=search>

바이낸스 익스텐션 지갑 설치하기
:::정보
 다음 예시는 파이어폭스에서 BNB 익스텐션 지갑을 설치하는 방법을 다룹니다. 하지만 설치 절차는 모든 브라우저에 대해 동일하게 작동합니다.
:::

1. 파이어폭스에서 확장자를 열어주세요: https://addons.mozilla.org/en-US/firefox/addon/binance-chain/?src=search

2. BNB Chain을 찾아주세요
![img](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/67023396148/original/T7AmJnBZ33pyv-1vmUZvZQvfpdPcvq5_NQ.png?1633501819)

:::경고
BNB 체인에서 제공하는 애드 온인지 다시 한 번 확인해 주세요.
:::

3. “파이어폭스에 추가하기” 클릭
![img](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/67023396147/original/bvX8Y5NViWZJcFgaBt76ipaB1F8V87TgIw.png?1633501818)

끝입니다! 여러분들은 성공적으로 파이어폭스에 바이낸스 체인 지갑을 설치하셨습니다.

**바이낸스 모바일 지갑**: 바이낸스 모바일은 안전하고 신뢰 받는 멀티 체인 지갑으로 암호화폐를 보관하고, 교환하거나 얻을 수 있는 편리한 플랫폼입니다. 

## 안전하게 사용하기
지갑은 약간의 발생의 전환이 포함됩니다. 금융의 자유를 통해 어디서든 자금을 접근할 수 있게 된 대신, 고객 지원이 없어서 사용자가 직접 관리해야 한다는 책임이 따릅니다. 


## 자산을 직접 책임지기
중앙화 거래소는 기존 방식처럼 아이디와 패스워드를 통해 지갑에 연결할 수 있습니다. 이는 거래소가 당신의 잔고를 제어하도록 믿는 행위입니다. 만일 회사가 공격 당하거나 사업을 종료한다면, 당신의 자산이 위험에 노출될 수 있습니다.


## 시드 구문을 작성하세요
보통 지갑은 사용자에게 시드 구문을 제공한 후 작성하고 안전한 곳에 보관하라고 권고합니다. 이것이 지갑을 복구할 수 있는 유일한 수단입니다.

다음은 시드 구문의 예시입니다:
```
there aeroplane curve vent formation doge possible product distinct under spirit lamp
```
컴퓨터에 보관하지 마시고, 작성 후 안전한 곳에 보관하세요.


## 직접 찾아보세요(DYOR)

웹 지갑을 사용한다면, 사이트 북마크를 통해 피싱을 당하지 않도록 조심하세요.

트랜잭션은 되돌릴 수 없고 지갑도 복구가 어려우니 사용할 때 조심하세요.

## 바이낸스에서 출금한 토큰들이 보이지 않는 경우

바이낸스 같은 중앙화된 거래소를 사용한 많은 사용자들은 메타마스크 같이 소유자에게 권한이 지갑으로 출금하는 것을 원합니다. 따라서 출금 요청을 보냈는데 보낸 지갑에 토큰이 표시가 되지 않을 경우 당황할 수 있습니다.

우선 메타마스트에서 커스텀 네트워크 기능으로 비컨 체인 및 BNB 스마트 체인 RPC URL의 엔트 포인트를 추가해야 합니다.

비컨 체인이나 BNB 스마트 체인을 메타마스크에 추가한 후, 서로 다른 네트워크를 선택하여 해당 계정의 특정 네트워크에 있는 토큰을 조회할 수 있습니다. 커스텀 토큰은 따로 추가해야 할 수 있습니다.


## 토큰 전송 시 BNB가 얼마나 필요한가요?

만일 계정에 BNB가 없이 토큰을 전송하려고 하면 자금이 부족하다고 표시됩니다. 이는 해당 계정에 가스비를 낼 BNB가 부족하다는 의미입니다. 각 트랜잭션(토큰과 컨트랙트 트랜잭션 포함)은 가스를 필요로하며, 가스비는 BNB로 지불됩니다. 이는 전송 수수료와 같다고 생각하면 됩니다.

트랜잭션을 생성하려면 계정에 0.001 BNB를 보내면 해결됩니다.

표준 이더 전송 트랜잭션은 21000가스 및 15 GWEI 가스 가격이 소모됩니다. 토큰에서 가스의 양은 일반적으로 가스를 의미하므로, 총 트랜잭션 수수료는 약 0.002 BNB - 0.003 BNB 정도입니다.

## 현재 가스비 조회

```
curl --location --request POST 'https://bsc-dataseed2.binance.org' \
--header 'Content-Type: application/json' \
--data-raw '{"jsonrpc":"2.0", "id":1, "method":"eth_gasPrice", "params": []}'
```

## 시드 구문 조회하기
BNB나 BUSD 같은 암호화폐나 자산을 다룰 때, 당신의 개인키나 시드 구문 및 패스워드를 혹시 모를 사태에 대비해 백업해 두는 것이 중요합니다.

## 시드 구문을 분실했을 경우 어떻게 하나요?

1. 시드 구문은 오직 사용자에게만 제공되었습니다. 만일 분실하거나 도난당하면 복구할 방법이 없습니다. 

    - 저희는 시드 구문을 안전하게 보관하고 누구한테고 공유하지 않도록 권고합니다. 

    - 만일 공용 컴퓨터나 노트북에서 로그인 하면, 사용이 끝난 후 지갑을 확실히 잠그고 가세요. 

2. 사용자에게는 다양한 로그인 옵션들이 제공됩니다 : 이를 잘 활용하세요. 

       a. Safulet 

       b. tKey 

3. 로그인이 가능한 상태라면 시드 구문 복구가 가능합니다

    - 계정에 로그인하세요.

    - 우측 상단 계정 정보(Account Details)에 접근하세요.

    - 설정(Setttings)을 클릭하세요. 

    - 시드 구문(Seed Phrase)에서 조회하세요. 

중요: 시드 구문을 안전하게 보관하는 것이 가장 중요합니다. 만일 보관되거나 분실된다면, 자산을 복구할 수 없습니다.


## 설치 시 백업하기
새로운 바이낸스 익스텐션 지갑을 만들 때, 12개의 시드 구문이 주워지는데, 이는 해당 계정을 관리하는데 가장 중요한 정보이며 안전한 곳에 기록되어야 합니다.

시드 구문은 종이에 작성하거나, 플래시 드라이드에 저정 혹은 해당 정보를 지닌 파일을 다운로드 할 수 있습니다.

![img](https://lh3.googleusercontent.com/n2FtIpBGm0rfQC1WHDUbL44LhT6VVizzV4uBhzOkFCblCIXFdOISvy-OzCF5rEeU6q0suuW8Z6noqgYWW5_u8AU7mjat3ayEzU031SLjULoFSh0pdQOO_spRwGfqBEbSl8TIVOfa)


## 바이낸스 익스텐션 지갑 설치 후 백업 생성하기
모종의 이유로 12단어 시드 구문 기록을 잊었거나 적은 것을 잃어버렸을 때, 다시 백업하기 위해 시드 구문을 조회할 수 있습니다.

**우측 상단의 메뉴를 클릭하여 --> Manage Accounts(계정 관리)에 들어갑니다**

![img](https://lh4.googleusercontent.com/ZXAj9X9TFTunfCJfZjHoJQm9eQZxog61rmZ0zWL4AbQlwhQRe0qj74bHvhnarwHobVbRgaBIKyyDPxQZx4acgAeFPaWN6tloNIiIuRMmDUw2mniafpqfc5RS59Nic-_KXVL64sC6)

**다운로드 버튼을 클릭하세요**

![img](https://lh5.googleusercontent.com/2t3UwpFojwMSh4_stRc9wdaOdbm2UqmtYxVL2SdLVfiCSoqF2gcOhHl3Qys6pZXJFG_7CsK2IkFOEdgpuSTiHR1_OOEi0pF_uy3nvsLhibC0vxQjGXLI0aV5gcdts3pML4xmNc4y)

**비밀번호를 입력하여 시드 구문을 확인하세요**

![img](https://lh5.googleusercontent.com/9WatFdbEVc8A92-6g5zfaHQRZgqrce1EPEQMdpWnHYyEwab9iZqcwz02cal5om_97oni1fSdh-dTJHHqsVqD74K3umO2SlGl3F9f9vQDSeUF4r0fnLOQbMiHdNSwhgbN33Nmg_U2)

## 비밀번호를 재설정하거나 계정 가져요기

바이낸스 익스텐션 지갑에서 비밀번호를 재설정하려면, 계정에서 생성되었던 12나 24단어로 이뤄진 시드 구문이 필요합니다. 만일 시드 구문을 보관하고 있지 않았다면, [시드 구문 조회하기](#시드-구문-조회하기) 문서를 읽어주세요.

**다음 방법을 시도하기 전, 시드 구문을 가지고 있는지 확인하지 않으면 비밀번호를 리셋할 때 다시 지갑에 접근하지 못할 수 있습니다.**

1. 현재 지갑이 잠금 해제되어 있으면, 우선 지갑을 잠가주세요.
2. **시드 구문 가져오기(Import seed phrase)**를 클릭하세요.

![img](https://camo.githubusercontent.com/9fe8761262f1dd77f01a336ae2356e74c15e3552d78be82d761461ade1107f4b/68747470733a2f2f6c68352e676f6f676c6575736572636f6e74656e742e636f6d2f6350443644303336504f69315f794a5f394a4334656d305a6b37476758645a72373236754d706348626d6649476e666179767865465042455932695076733858325a6d5365345f54574f495f3958644e4a786f65496d3641467a6235395643315735344950357945794d4a4e65764d534a62457955377846423149734b51754352443262334f3576)

3. 시드 구문 텍스트창에 시드를 입력해 주세요.
4. 새로운 비밀번호를 입력하세요.
5. 비밀번호를 다시 적에 맞게 적었는지 확인하세요.
6. **리셋(Reset)**을 클릭하세요. 

![img](https://lh6.googleusercontent.com/ZeM4cYV3rirCo91zw3OVMYRqqpwqIsrWhPnv-t3sL7YhpD0M_DNQ4QQH-Rw8WmapLrX2OzwETLKcEwKA-Rakjuhlnoy7S707Yt8Y0nUC5OKjg04ADgM2bLSb-1f3GZvUxdkj-BuI)

## 바이낸스 익스텐션 지갑에서 어떤 네트워크를 지원하나요? 
 * 바이낸스 체인(BEP2)
 * 바이낸스 스마트 체인(BEP20)
 * 이더리움(ERC20)

## 왜 제 토큰을 조회할 수 없나요?
!!! 참고 : 기본적으로 각 지갑 및 네트워크는 이들의 메인 토큰을 기본으로 보여줍니다. 나머지는 리스트에 토큰을 더해야 볼 수 있습니다. 

**바이낸스 익스텐션 지갑 사용자들**
비컨 체인 (BC) 메인넷이나 BNB 스마트 체인 (BSC) 메인넷으로 전환해야 합니다.

자산을 지갑에 더한 후, 서로 다른 네트워크를 선택하여 해당 계정의 특정 네트워크에 있는 토큰을 조회할 수 있습니다.

**메타마스크 지갑 사용자들**

우선 BNB 스마트 체인 (BSC) 메인넷 네트워크를 추가합니다 https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain

이후 토큰을 직접 추가합니다: https://docs.yearn.finance/how-to-guides/how-to-add-a-custom-token-to-metamask


## 바이낸스에서 잘못된 네트워크로 보낸 암호화폐를 어떻게 복구할 수 있나요?

해당 문서를 읽어주세요: https://academy.binance.com/en/articles/how-to-recover-crypto-transferred-to-the-wrong-network-on-binance

## 익스텐션 지갑 업데이트 : 크롬

지갑의 최신 버전을 유지하는 것은 중요합니다. 만일 새로운 버전이 나왔지만 크롬이 자동으로 업데이트 하지 않았으면 다음과 같이 수동으로 업데이트 할 수 있습니다.

1. 구글 크롬을 시작합니다.
   
2. 브라우저 툴바에 있는 세로로 된 점3개 버튼![img](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/67023397042/original/wFxPkU0MkBsPoaTd8oZr3ffcpAoX6i4_4g.png?1633502662)을 클릭하세요.

3. 추가 도구(More Tools) -> 확장(Extensions) 메뉴를 선택하세요.

4. 우측 상단에 있는 개발자 모드(Developer Mode) 버튼을 클릭하세요

5. 이제 업데이트 버튼이 활성화된 것을 볼 수 있습니다.

![img](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/67023397043/original/jZ4fzIgSe5JbszoWQQ3NDi19ZJRV0vpGXw.jpeg?1633502665)

## 익스텐션 지갑 업데이트 : 파이어폭스 

최신 버전을 설치하는 것은 중요합니다.

1. 메뉴 버튼![img](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/67023397186/original/u6iq0Le_iTgiAVUsvbTJexNZKNgrxlGTug.png?1633502819)을 누르세요, 에드 온 및 테마(Add-on and themes)를 누르고 확장(Extensions)을 선택하세요.

2. 확장 패널 우측 상단에 있는 기어 아이콘![img](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/67023397187/original/I9CD5HUT4HYb8kRfjx9g3mSuq0yrRJdgZA.png?1633502819)을 누르세요. 

![img](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/67023397188/original/JTMKK6DuYM0yDYW_m9RcHsEfCtaOVZj-Sg.png?1633502820)

3. 아래 옵션 중 하나를 선택하세요:

   * **업데이트 확인**: 당신의 애드 온 업데이트를 직접 확인합니다. 업데이트가 가능하다면, 원할 때 업데이트할 수 있습니다.
   * **최신 업데이트 조회(View Recent Updates)**: 이 옵션을 클릭하면, 좌측에 최근 업데이트 패널이 나타나며 최신에 업데이트 된 애드 온을 보여줍니다.
   * **자동으로 애드온 업데이트하기**: 애드온을 최신 버전으로 유지하고 싶으면, 다음 옵션을 선택해서 자동으로 업데이트를 해줍니다.
   * **자동 업데이트 위해 모든 애드 온 초기화**: 애드 온 중 수동으로 업데이트 되는 것이 있다면, 해당 옵션을 통해 설정이 초기화되고 자동으로 업데이트됩니다.

## 바이낸스에서 출금한 후 왜 토큰이 보이지 않나요?
바이낸스 같은 중앙화된 거래소를 사용한 많은 사용자들은 결국에는 바이낸스 익스텐션 웰렛이나 메타마스크 같이 소유자에게 권한이 지갑으로 출금하는 것을 원합니다. 따라서 출금 요청을 보냈는데 보낸 지갑에 토큰이 표시가 되지 않을 경우 당황할 수 있습니다.

우선 바이낸스 체인 메인넷(BC)이나 바이낸스 스마트 체인 메인넷(BSC)를 사용해야 합니다.

지갑에 자산을 추가한 후, 서로 다른 네트워크를 선택하여 해당 계정의 특정 네트워크에 있는 토큰을 조회할 수 있습니다.

## 바이낸스 DEX에서 익스텐션 지갑 사용이 가능한가요?
현재는 불가능합니다. 향후 업데이트를 통해 지원될 예정입니다.

## 이더리움 네트워크로 보내진 자금을 복구하는 법
자금이 익스텐션 지갑 계정에 보내졌을 때, 다음과 같이 해결합니다

* 이더리움 네트워크로 전환
* 자산 추가
* 자산 리스트에서 토큰 조회가 가능합니다

만일 다른 지갑의 계정으로 보내졌을 때, 다음과 같이 해결합니다

* 다음 계정의 시드 구문을 가져옵니다 
* 바이낸스 익스텐션 지갑에서 계정을 복구합니다
* 이더리움 네트워크로 전환합니다
* 자산을 추가합니다
* 자산 리스트에서 토큰 조회가 가능합니다

## 왜 Wallet Direct를 사용해야 할까요?
* **매끄러운 토큰 전송**:  매번 주소와 메모를 복사 붙어넣기 하지 않고 편하게 바이낸스 익스텐션 지갑과 연동된 binance.com 계정 간 토큰을 전송하세요(비컨 체인, BNB 체인 및 이더리움 네트워크를 지원합니다).

* **BNB 홀딩**: binance.com 계정의 BNB는 변동되지 않습니다.

## 렛저 계정에서 발생하는 일반적인 문제

1. 현재 Wallet direct는 렛저를 지원하지 않습니다.

2. 바이낸스 DEX는 여전히 렛저를 지원합니다. 단, 렛저를 이용하면서 문제가 발생할 때 바이낸스 익스텐션 지갑를 사용하시는 것이 좋습니다.

- 브라우저에 바이낸스 익스텐션 지갑 확장자를 설치하고 지갑 계정에 로그인 하세요.

- 바이낸스 익스텐션 지갑 계정에 렛저 가져옵니다.

- 트랜잭션에 바이낸스 익스텐션 지갑을 사용합니다.

3. 대안으로, 문제 발생 시 렛저에 문의할 수도 있습니다: https://support.ledger.com/hc/en-us/categories/4404369571601-Support?support=true .

## dApp 이 바이낸스 익스텐션 지갑과 어떻게 연결할 수 있나요?

이 문서를 읽어주세요: https://binance-wallet.gitbook.io/binance-chain-wallet/bew-guides/dapp-interaction

## 풀 노드에 관한 기술적 문제에 대한 지원을 어떻게 받을 수 있나요?

디스코드 채널에 노드 지원(node support) 채널에서 문의해 주세요: https://discord.com/channels/789402563035660308/912296664004452362