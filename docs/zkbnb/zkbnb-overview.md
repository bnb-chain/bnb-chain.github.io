---
sidebar_label: 개요
sidebar_position: 2
---
# ZkBNB - BNB 체인의 혁신적인 확장

이 문서에서는 구체적인 구성, 저장소 구조, 토크노믹스에 대해 설명하기 전에 큰 흐름과 관련된 기능들을 살펴봅니다.

## 소개

블록체인 기술을 논할 때 항상 확장성 문제가 존재해 왔습니다. 약 10배의 총 사용자 및 트랜잭션이 발생하자, 이 문제는 더 명백해졌습니다. Several solutions have been proposed to overcome this shortcoming which is the biggest hurdle in the path of mass adoption of blockchain. For example, Layer-1 solutions, such as Proof-of-Stake and Sharding, aim to improve performance by implementing changes to the Mainnet. As well as Layer-2 solutions, like rollups, increase the number of processed transactions by offloading transactions off of Mainnet (Layer-1) while still maintaining the same security measures and decentralization as the Mainnet.

Some of these solutions can be regarded as application-specific (e.g., channels), while others as general-purpose (e.g., side-chains). However, there was still a lack of a "global solution" that could work for every blockchain platform. This was until the introduction of the Zero-Knowledge Rollups (ZK Rollups), which are considered the ultimate Layer-2 solution for blockchain-related scalability problems. 

As of writing, the total Daily Active Addresses (DAA) on BSC is around [815,620](https://ycharts.com/indicators/sources/bscscan), whereas the total number of transactions per day is ~[3.572M](https://ycharts.com/indicators/reports/binance_smart_chain_statistics). In not so distant past, on July 29th, 2021, the total network utilization of BSC saw the [highest peak of up to 90%](https://bscscan.com/chart/networkutilization), leading the core dev team to devise scalability solutions to overcome this issue. Harnessing the power of zkRollups, BNB Smart Chain has introduced ZkBNB, a breakthrough in the scalability solutions for blockchain technologies.

## ZkBNB란?

ZkBNB는 ZK(Zero Knowledge) 롤업 아키텍처 기반으로 만들어졌습니다. ZK 롤업은 모든 계산과 상태 변화가 체인 밖에서, 즉 사이드 체인에서 이뤄지는 레이어2 솔루션입니다. 해당 구조에서는, 암호학적 증명 및 a summary of the changes along with some cryptographic proofs for proving the validity of these changes are posted to the Mainnet.

zk롤업처럼, ZkBNB는 하나의 배치에(Rollup Block) has the capability to bundle (or "roll-up") hundreds of transactions into a single batch (Rollup Block) off-chain and generate a cryptographic proof. These proofs can come in the form of [SNARKs (succinct non-interactive argument of knowledge)](https://cointelegraph.com/explained/zk-starks-vs-zk-snarks-explained), which can prove the validity of every single transaction in the Rollup Block. It ensures that all funds are held on the BSC, while computation and storage are performed on [BNB Sidechains)](https://docs.bnbchain.org/docs/BNBSidechain/overview/bs-overview) with less cost and fast speed. Furthermore, thanks to the use of zk-SNARK proofs, ZkBNB shares the same security as that of BNB Smart Chain.

## 왜 ZkBNB를 사용하나요?

To resolve the network scalability problems faced by BSC, a new standard called BEP100 was proposed to introduce a modular framework for creating BSC-compatible sidechains. Sidechains are eㅁssentially separate blockchains that run independently of the main blockchain (BSC), but are, however, connected to the BSC Mainnet via a two-way bridge. BEP100 proposes for these sidechains  to connect to BSC by a native relayer hub, which will  result in an overall improvement in the performance of the network and provide much higher throughput and lower gas fees. Furthermore, the security of native relayer hub is guaranteed by the side chain. Nevertheless, bridges are now being considered as top targets for hackers as attacks on bridges account for 69% of total funds stolen in 2022. Therefore, there was a need to provide a solution that would not only overcome network scalability issues, but also help in secure communication of BSC and BSC-compatible sidechains. Thereforth, zkBNB, an architecture built on the [영지식 롤업이 소개되었습니다](https://ethereum.org/en/developers/docs/scaling/zk-rollups/).

## ZkBNB는 어떤 기능이 있나요?

현재 ZkBNB는 다음과 같은 기능을 구현하고 있습니다:

-   **L1과 같은 수준의 보안:** ZkBNB는 BSC와 같은 보안 수준을 자랑합니다. zkSNARK 증명을 사용하여, 암호학적으로 보안이 보장됩니다. 사용자들은 서드 파티를 믿지 않고 롤업 블록을 모니터링하여 사기를 방지할 수 있습니다.
-   **원할한 L1-L2 통신**: BNB와 BSC나 ZkBNB 상에서 생성된 BEP20/BEP721/BEP1155 토큰들을 BSC와 ZkBNB 사이 매끄럽게 이동할 수 있습니다.
-   **내장된 즉석 AMM (Automated Market Maker) 스왑:** ZkBNB는 내장된 유동성 풀을 통해 허가 과정 없이 자동으로 디지털 자산을 거래할 수 있습니다.
-   **내장된 NFT 마켓:** 개발자들은 ZkBNB에 내장된 기능으로 디지털 수집품이나 NFT(non-fungible tokens)마켓을 바로 구축할 수 있습니다.
-   **빠른 트랜잭션 속도 및 완결성:** 성능이 BNB 스마트 체인의 핵심 우선 순위인만큼, zkBNB는 블록체인 업계에서 독보적인 수치인 1억 개의 주소를 지원하고 초당 최대 1만 건의 트랜잭션(TPS)을 처리할 수 있는 능력을 제시한다.
-  **가스 토큰:** **ZkBNB 상 가스 토큰은 BEP20나 BNB가 될 수 있으며, 수수료가 1/10까지 감소합니다**
-   **BSC상 "Full exit":** 만일 사용자가 트랜잭션이 ZkBNB에서 검열당하는 것처럼 느껴지면 언제든지 "full exit" 작업을 요청해 출금할 수 있습니다. 이는 사용자가 자금을 언제든지 출금할 수 있다는 것을 뜻합니다.

## 누가 ZkBNB로 혜택을 받나요?

BNB 스마트 체인에서 가장 중요한 것을 사용자 경험을 개선하는 것입니다. 이것이 ZkBNB가 사람들이 많이 사용하는 블록체인 기반 게임과 소셜 미디어를 고려하여 만들어진 이유입니다. 

간단히 말하자면, web3 커뮤니티에 있는 모든 개발자들은 ZkBNB가 제공하는 놀라운 기능들을 활용할 수 있습니다. 특히, NFT dAPP 개발자들은 내장된 NFT 마켓이나 API 서비스를 통해 ZkBNB를 최대한 사용할 수 있습니다. 이러한 기능들은 암호화 수집품 및 NFT를 바로 사용할 수 있는 마켓을 쉽게 설정할 수 있습니다.

ZkBNB를 통해 온체인 상의 긴 지연시간은 과거의 일이 될 것입니다. ZkBNB가 즉시 사용 가능한 간단한 토큰 작업을 제공함에 따라 개발자는 이제 BSC와 ZkBNB 사이에서 BNB와 기타 디지털 토큰(BEP20/BEP721/BEP1155)을 매끄럽게 전송할 수 있습니다. ZkBNB는 중단 없는 원할한 환경을 보장하면서도 긴 트랜잭션 목록의 실행 속도를 향상시킵니다.

또한 ZkBNB는 강력한 REST API 서비스를 제공하여 이전에 게임 또는 콘텐츠 프로젝트를 구축한 개발자가 ZkBNB로 빠르고 원활하게 웹3에서 프로젝트를 출시할 수 있도록 보장합니다.

ZkBNB의 또 다른 차별화된 요소는 내장된 네이밍 서비스를 통해 사용자 경험을 향상 시킨다는 것입니다. 이 네이밍 서비스는 모든 사용자 주소를 저장하고 암호화, 토큰 또는 NFT를 수신할 때 읽기 쉬운 이름을 트랜잭션에 제공합니다. 간단하지만 다음과 같은 사용자 친화 기능은 새로운 사용자를 끌어드리는 데 큰 도움이 됩니다.

## 관련 프로젝트
- [ZkBNB 롤업 컨트랙트](https://github.com/bnb-chain/zkbnb-contract).
- [ZkBNB 크립토](https://github.com/bnb-chain/zkbnb-crypto).
- [ZkBNB Eth RPC](https://github.com/bnb-chain/zkbnb-eth-rpc).
- [ZkBNB Go SDK](https://github.com/bnb-chain/zkbnb-go-sdk).

## 결론

BNB Chain의 ZkBNB는 보장된 보안, 높은 트랜잭션 속도, 빠른 완결성과 상당히 절감된 트랜잭션 수수료는BNB 스마트 체인 기반 대규모 어플리케이션을 만들 때 큰 영향을 주는 혁신입니다. 올해 초에 BNB 체인 생태계 내 사이드 체인을 만들기 위한 프레임워크인 BNB 사이드 체인을 출시한 데 이어 출시됩니다.

ZkBNB 테스트넷이 11월에 출시되며, 메인넷은 2023년 1분기 출시를 목표로 하고 있습니다. BNB 스마트 체인의 혁신적인 프로젝트는 [BNB 체인 2022 로드맵](https://www.bnbchain.org/en/blog/bnb-chain-tech-roadmap-2022/)를 참고하세요.