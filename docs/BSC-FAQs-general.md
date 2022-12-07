---
sidebar_label: BSC 기본 FAQs
hide_table_of_contents: false
sidebar_position: 2
---

# BNB 스마트 체인 FAQs

### BNB 스마트 체인이 무엇인가요?

BNB 스마트 체인은 혁신적인 합의 체계인 권한지분증명(Proof of Staked Authority, PoSA) 방식을 통해 비컨 체인과 EVM 호환 프로그래밍 및 자체 교차 통신이 가능한 블록체인입니다.

### 왜 BNB 스마트 체인은 비컨 체인과 별도의 체인으로 만들어졌나요?

스마트 컨트랙트를 실행하는 것은 거래 기능을 둔화시키고 비결정론적 요소들이 더해질 수 있습니다. 다음 기능이 타협이 되더라도 비컨 체인에 텐더민트 기반의 새로운 가상 머신으로 현재 기본 합의 프로토콜과 주요 RPC를 구현하는 것이 직관적인 방법일 수 있습니다. 다만 이런 방법들은 모든 dApp 커뮤니티에 학습 요고사항이 많아져서 환영 받지 못할 것입니다.

### 백서는 어디서 볼 수 있나요?

백서는 다음 링크에서 볼 수 있습니다 <https://github.com/bnb-chain/whitepaper/blob/master/WHITEPAPER.md>. 피드백은 언제나 환영합니다.

### BNB 스마트 체인 코드는 어디서 볼 수 있나요? GitHub 리포지토리가 있나요? 

BSC의 코드는 다음 링크에서 확인 가능합니다:

* <https://github.com/bnb-chain/bsc>
* <https://github.com/bnb-chain/bsc-relayer>
* <https://github.com/bnb-chain/bsc-relayer-config>
* <https://github.com/bnb-chain/bsc-genesis-contract>
* <https://github.com/bnb-chain/bsc-double-sign-sdk>
* <https://github.com/bnb-chain/oracle-relayer>

## BSC의 합의 모델은 무엇인가요?

BNB 스마트 체인은 비컨 체인에 프로그래밍 가능성 및 상호 운용성을 제공하는 혁신적인 솔루션입니다. BNB 스마트 체인은 21개의 검증인이 참여하는 권한지분증명(PoSA) 합의 체계를 통해 적은 블록 생성 시간과 낮은 수수료로 사용할 수 있습니다. 자세한 사항은 [여기](learn/consensus.md)를 참고하세요. 

## 도움을 어디서 받을 수 있나요?
* 기술적 지원 및 소프트웨어 관련 사항은 다음 채널을 통해 지원 받을 수 있습니다: 
  * 텔레그램: <https://t.me/joinchat/IuVfSlYWC5seijz6a0Bjww>
  * 디스코드: <https://discord.com/channels/789402563035660308/912296662834241597>
* 버그 및 개발 기여: 깃허브 <https://github.com/bnb-chain>
* 블록체인 관련 일반 논의 채널: 텔레그램 <https://t.me/BinanceDEXchange>

## BNB 스마트 체인의 공식 체널은 어디인가요?

* 바이낸스 DEX 공지: <https://t.me/Binance_DEX_Announcement>
* 트위터: <https://twitter.com/bnbchain>
* BNB 체인 포럼: <https://buildnbuild.dev/>


### BNB 스마트 체인을 지원하는 지갑

  - [Binance Extension Wallet](wallet/binance.md)
  - [MetaMask](wallet/metamask.md)
  - [Math Wallet](wallet/math.md)
  - [Arkane](wallet/arkane.md)
  - [Ledger](wallet/ledger.md)
  - [MEW](wallet/myetherwallet.md)
  - [Trust Wallet](wallet/trustwallet.md)
  - [ezDeFi](wallet/ezdefi.md)
  - [SafePal](https://blog.safepal.io/pre-announcement-trade-on-dex-with-safepal/)
  - [TokenPocket](https://tokenpocket-gm.medium.com/defi-with-tokenpocket-how-to-use-binance-smart-chain-swap-with-tokenpocket-e76d6cd7986)
  

###  잘못된 네트워크를 선택했을 때 어떻게 복구하나요?

다음 가이드를 읽어주세요: [가이드](./wallet/withdraw-en.md)

### BNB 스마트 체인은 어떤 구조와 합의 체계를 통해 작동하나요?

BNB 스마트 체인은 21개의 검증인이 참여하는 권한지분증명(PoSA) 합의 체계를 통해 적은 블록 생성 시간과 낮은 수수료를 지원합니다.

BNB 스마트 체인 테스트넷은 더 적은 검증인이 참여합니다.

### 권한지분증명(PoSA)이 무엇인지 더 자세하게 알 수 있나요?

권한지분증명은 권한증명(PoA)방식과 지분증명(PoS)방식을 합쳐서 만들었습니다. 블록들은 제한된 수의 검증인을 통해서 생성되며, 스테이킹 기반 거버넌스를 통해 검증인이 선정됩니다. 검증인은 권한증명 방식처럼 교대로 블록을 생성합니다.

### BNB 스마트 체인에서 개발할 시 장점이 무엇인가요?

* EVM-호환: BNB 스마트 체인은 현존하는 모든 이더리움 툴을 지원합니다

* 빠른 블록 시간 및 낮은 수수료

* 자체 크로스체인 전송 및 통신: 바이낸스 DEX는 비컨 체인과 BNB 스마트 체인에서 자산을 교환할 수 있는 유동성을 제공합니다.

### BNB 체인에서 개발할 시 장점이 무엇인가요?

BNB 체인은 사용자들이 더 빠른 전송 및 거래를 할 수 있게 해줍니다.

### BNB 체인 상에서 얼마나 많은 자산이 발행되었나요?

이미 BNB 체인 상에서 [140개](https://explorer.binance.org/assets/bep2) 이상의 자산이 발행되었습니다.

[BEP8](https://github.com/bnb-chain/BEPs/blob/master/BEP8.md)의 등장으로 혁신적인 자산 토큰화도 가능합니다.

### BNB 스마트 체인의 특징은 무엇인가요?

주요 혁신:

* 권한지분증명 합의체계 (Proof-of-staked-authority Consensus)

* 자체 크로스 체인 통신 (Native Cross-Chain Communication)

* BNB 토큰의 활용처 증가 (Expand the use cases of the BNB token)

### BNB 스마트 체인은 EVM이 호환된다는데, 무슨 뜻인가요?

EVM은 이더리움 가상 머신(Ethereum Virtual Machine)을 의미합니다. EVM 상에 작성된 스마트 계약은 BNB 체인으로 쉽게 옮겨올 수 있습니다.

### Can developers make hybrid Dapps using both Beacon Chain and BNB Smart Chain in one single Dapp?

네, 다양한 자체 크로스 체인 함수를 통해 구현 가능합니다.

### 시스템 매개 변수를 어떻게 요청하나요?

```
bnbcli  params side-params  --side-chain-id=bsc   --node  http://dataseed4.binance.org:80   --chain-id=Binance-Chain-Tigris --trust-node --output=json
```

* 최소 자기 위임 금액: **10000BNB**

* 최소 위임 금액: **1BNB**

* 본딩 해제 시간: 7 days

* 오프라인 석방 비용:  1BNB

* 오프라인 수감 시간: 2 day

* 오프라인 슬래싱 금액: 50BNB

* 이중 서명 슬래싱 금액: 10000BNB

* 크로스 체인 릴레이 수수료: 0.004 BNB


### BNB 스마트 체인 생태계 현황은 어떤가요?

링크를 참고하세요: <https://github.com/bnb-chain/bsc-ecosystem>

### 개발자들이 BSC에서 개발하는 인센티브는 무엇인가요?

향후 해커톤이 개최됩니다.

* Gitcoin: https://gitcoin.co/binancex
* Dorahacks: https://hackerlink.io/en/grant/1

### BNB 스마트 체인 상 패그 토큰(Pegged Tokens)은 무엇인가요?

비컨 체인 출시 후, 바이낸스는 비트코인(BTC/BTCB), 이더리움(ETH), 리플(XRP), 라이트코인(LTC), 비트코인캐시(BCH) 및 온톨로지(ONT) 같이 다른 네트워크에서 운영되는 코인에 패깅된 BEP2 토큰을 발행했습니다. 다음 토큰들은 실제 토큰으로 공개 주소에 백업되어 잠기게 되어 사용자들이 해당 토큰의 변동성과 빠른 전송 및 거래가 가능해지는 혜택을 누리게 되었습니다.

현재 리스트:

* BUSD: <https://bscscan.com/address/0xe9e7cea3dedca5984780bafc599bd69add087d56>
* USDT: <https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955>
* BTC: <https://bscscan.com/token/0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c>
* ETH: <https://bscscan.com/token/0x2170ed0880ac9a755fd29b2688956bd959f933f8>
* DAI: <https://bscscan.com/token/0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3>
* DOT: <https://bscscan.com/token/0x7083609fce4d1d8dc0c979aab8c869ea2c873402>
* XRP: <https://bscscan.com/token/0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe>
* LINK: <https://bscscan.com/token/0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd>
* BAND: <https://bscscan.com/token/0xad6caeb32cd2c308980a548bd0bc5aa4306c6c18>
* LTC: <https://bscscan.com/token/0x4338665cbb7b2485a8855a139b75d5e34ab0db94>
* EOS: <https://bscscan.com/token/0x56b6fb708fc5732dec1afc8d8556423a2edccbd6>
* BCH: <https://bscscan.com/token/0x8ff795a6f4d97e7887c79bea79aba5cc76444adf>
* XTZ: <https://bscscan.com/token/0x16939ef78684453bfdfb47825f8a5f714f12623a>
* ONT: <https://bscscan.com/token/0xfd7b3a77848f1c2d67e05e54d78d174a0c850335>
* ADA: <https://bscscan.com/token/0x3ee2200efb3400fabb9aacf31297cbdd1d435d47>
* ATOM: <https://bscscan.com/token/0x0eb3a705fc54725037cc9e008bdede697f62f335>
* YFII: <https://bscscan.com/token/0x7f70642d88cf1c4a3a7abb072b53b929b653eda5>
* ZEC: <https://bscscan.com/token/0x1ba42e5193dfa8b03d15dd1b86a3113bbbef8eeb>

자세한 사항은 [여기](https://www.bnbchain.org/en/blog/binance-presents-project-token-canal-2/)를 참고하세요.


### 스마트 체인 상에서 어떻게 BNB를 주고 받을 수 있나요?

[binance.com](https:/www.binance.com)에서 BNB를 BSC로 인출할 수 있습니다.

1. 만일 BNB 스마트 체인 주소가 없다면, 다음 [지갑](Wallet.md) 중 하나를 통해 주소를 생성하세요.

2. 바이낸스 계정에서 바이낸스 익스텐션 지갑을 선택 후 인출(Withdraw)을 선택하세요. 네트워크는 BEP20를 선택하세요. 출금한 금액을 작성하고 BNB를 받을 BSC 주소를 붙어 넣으세요.

3. 인출하기 위한 과정을 처리해주세요.

4. 거래소가 요청을 처리하기까지 기다려주세요. 처리가 완료되면 바로 스마트 체인 주소에 BNB를 받을 수 있습니다.

### 스마트 체인에 패깅된 토큰 주고 받기?

[binance.com](https:/www.binance.com)에서 패깅된 토큰을 BSC로 인출할 수 있습니다.

1. 만일 BNB 스마트 체인 주소가 없다면, 다음 [지갑](Wallet.md) 중 하나를 통해 주소를 생성하세요.

2. 바이낸스 계정에서 바이낸스 익스텐션 지갑을 선택 후 인출(Withdraw)을 선택하세요. 네트워크는 BEP20를 선택하세요. 출금한 금액을 작성하고 패깅된 토큰을 받을 BSC 주소를 붙어 넣으세요.


![img](https://lh5.googleusercontent.com/dR9bBqUpNlBFX6zsKFkVRMgHz27Ak0Icu8AFsuJm_1ke6-qSG5Cg2FJLcpRYlFeuFEpisOdXpwn1KDOHBH7qQV9CpYxVb--2B1NxQm-L6B6qSl9Cq90uCSrwHEPAOh69Z0MM2VtG)


3. 인출하기 위한 과정을 처리해주세요.

4. 거래소가 요청을 처리하기까지 기다려주세요. 처리가 완료되면 바로 스마트 체인 주소에 패깅된 토큰을 받을 수 있습니다.

## BSC에 어떤 디앱들이 있나요?
[여기](https://bnbproject.org/)를 참고하여 BSC에 배포된 다양한 프로젝트들에 대해 알아보세요.

## 거래소 지갑에 자금을 전송했는데 BSC 체인을 지원하지 않으면 어떻게 해야 되나요?

다른 거래소로 전송할 때는 BSC를 지원하고 입금을 받는지 확인해 주세요. 블록체인에서 전송이 완료되면 되돌릴 수 없으므로 저희는 지갑 주소에 접근할 수 없어 도와드릴 수 없습니다.

## 잘못된 네트워크로 출금했을 시 어떻게 해결해야 되나요?

가능하면 BSC와 이더리움 네트워크를 동시에 지원하는 지갑을 사용해 주세요. 만일 잘못된 네트워크로 전송해도 같은 주소를 사용하여 자금을 되찾을 수 있습니다.

##  메모 작성이 잘못되었거나 누락되었을 시 어떻게 해야 되나요?
도착 주소의 지원처에 입금에 관련되서 문의하세요. 받는 지갑 주소가 거래소라면 정확한 메모를 갖고 문의하세요.


## BC에서 BSC로 크로스 체인 전송된 것을 어떻게 추적하나요?

1. 바이낸스 체인의 크로스 체인 전송 트랜잭션 해시를 확인합니다

예를 들어: https://explorer.binance.org/tx/8B9B066BAF9DC1C233A9D316C75E8139B985518868C1120B656C5B3EBAC7C498 

“Transaction Type”(트랜잭션 유형)이 “Cross-chain transfer out”(크로스 체인 전송 나감)임을 확인하세요

![img](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/67020215774/original/qZ5KzDcOjCyKO2H42HftM15NEtcZTHwjfw.png?1629968129)

2. 도착 주소를 확인합니다

“TxHash on BSC”(BSC상 트랜잭션 해시)는 바이낸스 스마트 체인 탐색기에 연결되어 있습니다

![img](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/67020216076/original/YdIbat5IAnpWgQO0SuNX4zHY_rsF97fErA.png?1629968302)

예를 들어 https://www.bscscan.com/tx/0x43980b4f9ae4c03685dd61172d23ccae07eb8abb0d677c579bfc7059e447ead9

만일 "status"(상태)가 성공(success)면 트랜잭션이 성공적으로 전송된 것입니다. 

토큰은 "BSC: Token Hub"에서 수취인 주소로 보내졌습니다.

![img](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/67020216406/original/FsSI7rAvaRuwQ-60br8EmVgrWoFvxYN-_Q.png?1629968479)

## 메타마스크에 BNB 스마트 체인을 어떻게 연결하나요?
Please refer [here](wallet/metamask.md)

## 스캠 및 러그 풀을 어디에 신고하나요?

만일 잠재적인 스캠, 피싱, 러그 풀, 해킹 관련된 사이트나 프로젝트를 발견하면 다음 사이트를 통해 신고해 주세요:
https://forms.coinholmes.com

Coinholmes.com는 전문 보안 업체인 Peckshield 팀에서 운영하고 있습니다.

## 바이낸스 익스텐션 지갑을 어떻게 초기화하나요?
사용자가 시드 구문을 보유하고 있으면 [여기](wallet/extension/reset.md)를 참고하여 지갑을 초기화 할 수 있습니다.

## 개척자 소각 환불(Pioneer Burn Refunding) 프로그램에 어떻게 신청하나요?

[BNB 개척자 소각 프로그램](https://www.binance.com/en/support/announcement/7bcf4da5671d44a0a5118c2277773bb4)은 [여기](https://www.binance.com/en/my/wallet/uncredited_deposit/form?&coin=&network=&amount=&txId=tx)에서 신청 가능합니다. BNB 스마트 체인에서 트랜잭션을 보내다가 실수하여 토큰을 분실한 사용자들은 위의 페이지를 통해 신청서를 작성하면 됩니다. 해당 사례를 조사 후 프로그램에 적합한 경우 자산 회수를 도와드립니다.

