---
sidebar_label: Introduction 
sidebar_position: 2
hide_table_of_contents: false
---

# Introduction

BNB 스마트 체인은 비콘 체인(Beacon Chain)에 프로그램성과 상호운용성을 도입하기 위한 혁신적인 솔루션입니다. BNB 스마트 체인은 21명의 검증인과 Proof of Staked Authority (PosA)로 구성된 시스템을 기반으로 하고 있어 짧은 블록타임과 낮은 수수료를 구현할 수 있습니다. 가장 많이 스테이킹한 검증인 후보들이 검증인이 되어 블록을 생성합니다. 이중서명 식별과 슬래싱 로직으로 보안, 안전성, 체인 완결성이 보장됩니다.

BSC는 21명의 검증인을 더 늘려갈 것입니다. 예컨대 "후보"라고 칭해지는 20명의 비활성 검증인을 예비 인력에 포함시킬 것입니다.

후보들은 BSC 메인넷에서 블록을 생성하고 가스비를 받지만, 이는 21명의 선출된 공식 검증인 보다는 낮은 확률로 이루어집니다. 부재중인 후보들은 적은 수이긴 하지만 슬래싱됩니다. 후보 검증인들이 BSC의 품질과 안정성을 유지할 수 있기 위해서는 어느 정도의 의지가 필요합니다.

극단적인 경우 21명의 활동 검증인의 과반수가 공격을 받아 접속이 끊길 경우 후보 검증인들이 비콘 체인에 이 스테일 블록킹에 대해 보고하고, 재개한 뒤 활동 검증인 집단을 재선출하자는 제안을 올릴 수 있습니다.

BNB 스마트 체인은 또한 EVM 호환이 되는 스마트 컨트랙트와 프로토콜을 지원합니다. 체인 간 전송과 커뮤니케이션이 가능한 것은 네이티브 상호호환성 지원하기 때문입니다. 바이낸스 DEX는 양 체인 모두에서의 자산 교환을 위한 유동적 공간입니다. 이 이중체인 구조는 한 측에서의 빠른 트레이딩, 다른 쪽에서의 탈중앙화 앱 개발을 하고자 하는 사용자들에게 이상적입니다. 바이낸스 스마트 체인의 특성은 다음과 같습니다:

* **자기주권적 블록체인**: 선출된 [검증인](consensus.md)들을 통해 보안과 안전을 제공합니다.
* **EVM 호환**: 기존의 모든 이더리움 툴을 지원하면서 더 빠른 확정성과 낮은 거래 수수료를 제공합니다.
* **상호호환**: 효율적인 네이티브 이중 체인 커뮤니케이션이 포함됩니다. 빠르고 매끄러운 사용자 경험을 요구하는 고성능 dApp을 확장하는 데 최적화되어 있습니다.
* **온체인 거버넌스를 포함한 탈중앙성**: Proof of Staked Authority (PoSA)는 탈중앙성과 커뮤니티 참여를 가능하게 해줍니다. 네이티브 토큰으로서 BNB는 스마트 컨트랙트 실행을 위한 가스 및 스테이킹 토큰으로서 기능할 것입니다.

<!--## 비콘체인과 BNB 스마트 체인 비교

|                   | 비콘 체인 | BNB 스마트 체인                    |
| ----------------- | ------------- | -------------------------------------- |
| Consensus         | DPoS          | PoSA                                   |
| No. of Validators | 11            | up to 41 (20 candidate block producers)|
| Mean Block Time   | <1s           | ~5s                                    |
| Programmability   | BEPs          | Support EVM-compatible smart contracts |
| Cross Chain       |[BEP3](https://github.com/bnb-chain/BEPs/blob/master/BEP3.md) introduces *Hash Timer Locked Contract functions* and further [mechanism](https://community.binance.org/topic/1892) to handle inter-blockchain tokens peg.    | BSC comes with efficient [native dual chain communication](cross-chain.md); Optimized for scaling high-performance dApps that require fast and smooth user experience.                    |
-->
## 크로스체인과 멀티체인의 생태계
2021년에 BSC가 얻은 큰 교훈은 "하나의 체인"으로 모든 것을 처리할 수 없다는 것입니다. 피크 타임에서 BSC는 200만명 이상의 일일 활성 사용자(DAU)를 기록했고, 단일 GameFi 분야가 100만명까지 가기도 했습니다. 기서은 네트워크 자체와 그것을 지원하는 RPC/API 노드 등 인프라에 막대한 도전을 제기했습니다. 거대한 사용자 기반을 지닌 dApp의 경우 멀티체인과 크로스체인이 해결방안이 되어야 합니다.

BSC 코어 팀은 탈중앙화된 연산력과 스토리지에 대한 계속되는 수요 증가를 충족시킬 수 있는 파티션체인과 멀티체인의 미래를 강력히 믿습니다. 이는 ETH2.0, 폴카닷의 멀티체인 전략, 코스모스, 아발란체 등 업계의 다른 블록체인들과도 일관적입니다.

크로스샤드와 크로스체인/멀티체인의 상호호환성이 2022년의 핵심 주제가 될 것입니다. BSC 검증인 및 개발자 커뮤니티는 탈중앙화된 블록체인 미래의 갈림길에서 기능하고자 하는 BSC의 비전을 충족시키기 위해 노력하고 있습니다. 특히 BNB 사이드체인과 BSC 파티션 체인 (BPC) 인프라 레이어를 통해 BSC의 신기술을 구현함으로써 이를 달성하고자 합니다.

![BSC 2022](/static/img/assets/BNBChain2022.png)

### BNB 사이드체인
BNB 사이드체인은 개발자들과 노드 운영자들이 BSC와의 밀접한 연관을 유지하면서 대량의 유저들을 위한 내부 밸류 시스템으로서의 자체 블록체인을 구축할 수 있도록 도입된 인프라입니다. 어떤 프로젝트 개발자든지 고유한 스펙과 검증인 집단을 가진 자체 BNB 사이드체인을 배포할 수 있습니다. 이 검증인 집단는 BNB 사이드체인 배포자에 따라 BSC 보다 적은 수의 검증인를 가지고 동작할 수 있습니다. 이 검증인들은 앱의 주인이나 커뮤니티 이해관계자에 의해 동작될 수 있으며, 이를 통해 BNB 사이드체인의 유연성과 탈중앙성이 보장됩니다. BNB 사이드체인의 전형적인 사용 사례는 액시 인피니티(Axie Infinity)의 로닌 체인과 같습니다. 하지만 사이드체인의 잠재적 리스크를 최소화하기 위해서는 BNB 사이드체인과 BSC 간의 매끄러운 유동성을 보장하기 위한 (빌트인(Built-in) 애셋 타입과 크로스체인을 포함한) 새로운 프로토콜이 도입되어야 할 것입니다.

### BNB ZkRollup - 무신뢰 확장 솔루션
   
BNB ZkRollup은 BNB 스마트 체인을 위한 무신뢰 확장 솔루션입니다. BNB ZkRollup은 ZK 롤업 아키텍처 위에 구축되어 있습니다. BNB ZkRollup은 체인 밖에서 수백 개의 트랜잭션을 묶어서(“롤업”) 암호화 증명을 생성해냅니다. 이러한 증명들은 롤업 블록의 모든 트랜잭션의 유효성을 증명할 수 있는 SNARK (succinct non-interactive argument of knowledge) 형태로 있기도 합니다. 이는 즉 연산과 스토리지가 더 저렴한 비용과 빠른 속도로 BNB 사이드체인에서 실행되는 동시에 모든 자금들이 BSC에 보관된다는 것을 뜻합니다.

BNB ZkRollup이 달성하는 목표는 다음과 같습니다:

* 탈중앙화나 보안을 희생하지 않을 것
* BNB ZkRollup은 BSC와 동일안 보안을 가질 것. zkSNARK 증명 덕분에 암호학적으로 보안이 보장됨. 사용자들은 사기를 방지하기 위해 제3자를 신뢰할 필요도, Rollup블록을 계속해서 감시할 필요도 없음.
* 빠른 트랜잭션, 더 빠른 완결성, 더 낮은 가스비.
* BSC나 BNB ZkRollup에서 만들어진 BNB 및 BEP20/BEP721/BEP115는 BSC와 ZkRollup 사이에서 자유롭게 이동 가능.
* BNB ZkRollup의 가스 토큰은 BEP20 또는 BNB 둘 다 가능. 
* 사용자들은 BSC로부터 “full exit” 가능. 자신의 트랜잭션들이 BNB ZkRollup에 의해 검열되고 있다고 느낄 경우 자금 철회 동작을 요청할 수 있음.
* 빌트인 실시간 AMM 스왑.
* 빌트인 NFT 마켓플레이스.

## 참고자료
[백서](https://github.com/bnb-chain/whitepaper/blob/master/WHITEPAPER.md)
