---
sidebar_label: BSC 토큰 FAQs
hide_table_of_contents: false
sidebar_position: 2
---

#  비컨 체인과 BNB 스마트 체인 토큰

## BNB는 스마트 체인의 보안을 위해 어떤 역할을 하나요?

BNB는 토큰은 `무 위험(nothing-at-stake)` 문제를 방지합니다.

## BNB 스마트 체인 상에는 어떤 토큰들이 있나요?

BNB 는 BSC의 네이티브 토큰이며, BSC 위에 패깅된 BEP2 토큰은 BEP20로 불립니다.

## BEP2는 무엇인가요?

비컨 체인 상에서 쉬운 관리가 가능한 토큰 프로토콜입니다  

BNB는 BEP2로 만들어진 토큰입니다.


BEP2 제안서는 여기를 확인해 주세요: <https://github.com/bnb-chain/BEPs/blob/master/BEP2.md>

## BEP20는 무엇인가요?

BSC 상의 토큰 프로토콜로 BEP2와 [ERC20](https://eips.ethereum.org/EIPS/eip-20)과 호환 가능합니다. It extends ERC20을 확장하여 `getOwner`나 `decimals` 같은 추가적인 인터페이스를 보유하고 있습니다. 


BEP20 제안서는 여기를 확인해 주세요: <https://github.com/bnb-chain/BEPs/blob/master/BEP20.md>

## BEP8은 무엇인가요?

소규모 프로젝트나 지적자산권 및 작은 토큰 경제를 수용하기 위해 제안된 프로토콜입니다. 기존 주식 시장의 SME 보드와 비슷하게, BEP8 토큰 시장은 상장을 위한 자본 요건을 없애 스타트업의 유틸리티 토큰이나 지적 재산권(IP) 토큰의 유동성을 높일 것입니다. 또한 BEP8 토큰은 검증인의 투표 과정을 거치지 않고 바로 BNB나 BUSD에 대한 거래 쌍을 상장할 수 있습니다. 


세부 내용:

* [BEP8 제안서](https://github.com/bnb-chain/BEPs/blob/master/BEP8.md)
* [커맨드라인 명령어](beaconchain/learn/BEP8.md)

## 어똏게 BEP2 토큰을 발행하나요?

[다음](https://community.binance.org/topic/2487/) 가이드를 참고해 주세요

## 어떻게 BEP20 토큰을 발행하나요?

[다음](issue-BEP20.md) 가이드를 참고해 주세요

## BNB를 어떻게 스테이킹 하나요?

[다음](del-guide.md) 가이드를 참고해 주세요

## 스테이킹 하기 위해 BNB는 얼마나 필요하나요?

[최소 위임 금액](parameters.md)은 **1BNB**입니다.

## BNB를 어떤 지갑으로 스테이킹 할 수 있나요?

다음 지갑을 사용 가능합니다:

* [커멘드라인 tool](https://github.com/bnb-chain/node/releases/tag/v0.8.1)
* [바이낸스 익스텐션 지갑](wallet/binance.md)
* [Math Wallet](http://blog.mathwallet.xyz/?p=3890)

## 스테이킹 경제 및 보상에 관해서는 어디서 더 알 수 있나요?

백서에서 세부 사항을 확인할 수 있습니다: <https://github.com/bnb-chain/whitepaper/blob/master/WHITEPAPER.md#rewarding>

## 네트워크 보상은 어디서 발생하나요?

검증인과 위임인의 다음을 통해 보상을 받습니다:

* BSC 상 스마트 계약을 호출했을 때 사용되는 가스비
* 검증인이 BSC 릴레이어를 실행하는 것에 대한 보상

## BNB를 보관하기 위해 어떤 지갑을 사용할 수 있나요?

[다음](Wallet.md) 리스트를 통해 확인이 가능합니다

## 어떻게 BSC에서 BC로 크로스 체인 전송을 추적하나요?

1. 바이낸스 스마트 체인의 크로스 체인 전송 트랜잭션 해시를 확인합니다

예를 들어:  https://bscscan.com/tx/0xb6b941a3d44fec69902ea632eb96c6ffa51b3098576629c26ab34ce10deaf357 

“Transaction Action”(트랜잭션 활동)이 “Transfer out”(전송 나감)임을 확인해 주세요

전송된 양은 “value”칸에 표시됩니다. 

![img](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/67013598745/original/zeVlALl0chXv_LpHGv0OmGqH8eudFy0utg.png?1622611333)

2. 도착 주소를 확인합니다

“Cross Chain Package”(크로스 체인 패키지)는 바이낸스 스마트 체인 탐색기에 연결되어 있습니다

![img](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/67013598743/original/-2gMcowNwo2VQNEAatHSzYBrlSfp0vsbxQ.png?1622611332)

예를 들어: https://api.binance.org/cross_chain/v1/tx/0xb6b941a3d44fec69902ea632eb96c6ffa51b3098576629c26ab34ce10deaf357 


만일 "has_refund" 가 거짓(false)이면, 트랜잭션이 트랜잭션이 성공적으로 전송된 것입니다. 

바이낸스 체인 상에서 대응되는 트랜잭션 해시는 “cross_chain_tx_hash"입니다.

토큰은 “receiverAddresses”로 보내졌습니다. 

![img](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/67013598744/original/yma7MlpuPQljanX3WFerZNukdQEPOiuy_A.png?1622611332)



