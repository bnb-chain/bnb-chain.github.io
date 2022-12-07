---
sidebar_label: 구조
sidebar_position: 2
---
# ZkBNB의 구조적 디테일

Increased throughput and scalability are two of the most desired requirements of any blockchain ecosystem to thrive 경쟁적인 Web3 산업에서 블록체인 생태계가 성공하기 위해서는 처리량과 확장성을 증가하는 것이 . Several solutions have been proposed to achieve this, however, one of the latest and touted solutions is the one based on Zero Knowledge (ZK) Proofs. Joining the bandwagon of providing groundbreaking scalability solutions based on ZK-Proofs is the world's third largest smart contract network, BNB Chain.

영지식 롤업(ZkRollups)은 Zk 증명(Zk-Proofs) 레이어2(L2) 블록체인 확장 솔루션입니다. blockchain scalability solutions based on ZK-Proofs. ZK-Rollups essentially scales the main blockchain network, i.e., Layer-1(L1), by performing computations, bundling transactions, and moving the transaction data off the main blockchain, making sure in this way that the network on the main chain does not become congested.

Harnessing the power of ZK-Rollups, BNB Chain has introduced ZkBNB which is considered a breakthrough in the scalability solutions for blockchain technologies. ZkBNB는 is an infrastructure designed for developers to build large-scale BSC-based applications with higher throughput and much lower or even zero transaction fees.

이 문세에서는, ZkBNB를 혁신적으로 불리게 하는 we dive deep into the underlying architecture that makes ZkBNB a ground-breaking innovation, covering the underlying ZkRollup architecture, protocol overview, key technologies used, and the tokenomics of the ZkBNB infrastructure.

## ZkBNB - 내제된 Zk 롤업 구조

ZK 롤업 아키텍처 상에서 제작된 ZkBNB는 수백개의 오프체인에서의 트랜잭션을 묶는("롤업")is capable of bundling (or "rolling-up") hundreds of transactions off-chain and then generating cryptographic proof for proving the validity of the transactions, included in each batch. 암호화된 증거는 SNARK(succinct non-interactive argument of knowledge) 형태로 되어 있어, which can prove the validity of every single transaction in the rolled up block. It means, all funds are held on the BSC, while computation and storage are performed on BNB Application Sidechains (BAS), with less cost and fast speed. Furthermore, because of the use of Zk-SNARK proofs, ZkBNB shares the same security as that of BSC.

## ZkBNB 프레임워크

![](./zkbnb-framework.png)

위에는 인프라의 주요 구성요소를 표시하였으며, 아래에는 목록으로 표시하였습니다:

-   **Committer:** 커미터(committer)는 트랜잭션을 실행하는 것과 연속적인 블록을 생성해야합니다.
-   **Monitor:** 모니터(Monitor) 컴포넌트는 BSC에서 발생하는 이벤트를 추적하고, ZkBNB에서 트랜잭션으로 번역합니다.
-   **Witness:** 증인(Witness) 컴프넌트는 롤업 블록에 있는 트랜잭션을 재실행하는 것과 증인 responsible for re-executing the transactions within a rollup block and generating witness materials.
-   **Prover:** 증명인(Prover)은 암호학적 증인 material을 통해 증거를 암호학적 증거를 is responsible for generating cryptographic proof based on the witness materials.
-   **Sender:** The Sender rollups the compressed L2 blocks into L1, and submits proof to verify them.
-   **API Server:** The API 서버는 대부분의 유저의 the access endpoint for most users; it provides rich data, including digital assets, blocks, transactions, swap info, and gas fees.
-   **Recovery:** PostgreSQL의 상태 세계를 기반으로한 kv-rock의 Sparse Merkle Tree를 회복하는 툴입니다.

## ZkBNB 프로토콜 개요

ZkBNB는 Zk 롤업 프로토콜을 구현한 것이며, 다음과 같은 내장된 기능을 제공합니다:

-   BNB 및 BEP20 대체 가능한 토큰을 예치하고 전송하는 기능
-   L2 상 AMM 기반 대체 가능한 토큰 스왑
-   BEP721 대체 불가능한 토큰(NFT) 예치 및 전송
-   L2 상 BEP721 대체 불가능한 토큰 민팅 
-   바로 사용 가능한 L2상 NFT 마켓

ZkBNB에서 기본 롤업 작업 흐름은 다음과 같습니다:

-   Users can become owners in the rollup operation by calling registerZNS in L1 to register a short name for L2; 사용자는 L1에서 registerZNS를 호출하여 롤업 작업을 호출하여 소유자가 될 수 있습니다.
-   소유자들은 서로에게 자산을 전송하고, L2 상에서 NFT를 민팅하고, L2에서 토큰 간 스왑할 수 있습니다;
-   소유자들은 보유하고 있는 자산을 어떤 L1 주소로든 전송할 수 있습니다.

It is to note here that Rollup operation in the ZkBNB framework requires the assistance of a committer. The committer here is responsible for rolling transactions together. Other than this, a prover is also responsible for computing the zero-knowledge proof of the correct state transition. Additionally, the prover also affects the state transition by interacting with the rollup contract.ZKBNB 프레임워크 상 롤업 기능은 

프로토콜 디자인에 관한 자세한 사항은 [여기](https://github.com/bnb-chain/zkbnb/blob/master/docs/protocol.md)를 참고하세요.

## 최신 기능의 작동 방식

The working of some of the most important features revolving around the issue of throughout, availability, and scalability that are offered seamlessly by ZkBNB is as follows: ZkBNB에서 원활하게 제공하는 중요한 기능에는 처리량, 가용성, 확장성 문제를 해결한 

#### **Data Availability** 

오프 체인 상에서 진행된 모든 트랜잭션의 상태 데이터는 ZkBNB에서 BSC로 작성됩니다. 해당 데이터로 인해  it is possible to reproduce the rollup's state for an individual or a business to validate the chain themselves. BSC makes this transaction data available to all of the network's participants in the form of **calldata**.

It is to note here that it is not required by ZkBNB to publish extensive transaction data on-chain, i.e., BSC main chain. This is large because the validity proofs generated with each rollup batch already verify the authenticity of state transitions. Nevertheless, it is still important to store transactions on-chain because it allows permissionless, independent verification of the L2 chain's state, allowing anyone to submit batches of transactions. In doing so, malicious committers are prevented from censoring or freezing the L2 chain.

ZkBNB는 BSC에서 사용 가능한 **calldata**를 기반으로 레이어 2의 모든 상태를 재생하는 기본 클라이언트를 제공합니다.

#### 트랜잭션 완결성

In the ZkBNB setup, BSC acts as a settlement layer for ZkBNB. This means that all Layer-2 transactions are finalized, only in case the Layer-1 contract accepts the validity proof and executes the transactions. This condition eliminates the risk of malicious operators corrupting the Layer-2 chain (e.g., stealing roll-up funds), since every transaction must also be approved on the Layer-1 (Mainnet). Furthermore, BSC guarantees that user operations cannot be reversed once finalized on Layer-1. To provide an enhanced user experience, ZkBNB provides a relatively fast finality speed of approximately 10 minutes.

However, this does not affect the usability of the network. The state transition is designed to happen immediately once the block has been proposed on the ZkBNB. Furthermore, rollup operations are totally transparent to the users, allowing the users to make further transfers without waiting. 다만 이것이 네트워크의 활용도에 영향을 주진 않습니다. 상태 전환은 블록이 ZkBNB에 제안되면 

#### 검열 저항성

In the ZkBNB setup, the committer is responsible for executing transactions and producing rollup batches. While this ensures efficiency, it increases the risk of censorship in the way that a malicious ZK-rollup committer can censor users by refusing to include their transactions in the rollup batches. ZkBNB에서는 트랜잭션을 실행하고 롤업 배치(batch)를 
ZkBNB 설정에서 반영하는 사람이 트랜잭션을 실행하고 롤업 배치를 생성해야하는 책임이 있습니다. 이것은 효율성을 보장하지만 악의적인 ZK 롤업 커미터가 롤업 배치에 트랜잭션을 포함하는 것을 거부함으로써 사용자를 검열할 수 있는 방식으로 검열의 위험을 증가시킨다.

As a counter-security measure to censorship, ZkBNB allows users to submit transactions directly to the rollup contract on the BSC Mainnet if they feel that they are being censored by the ZkBNB operator. This feature allows users to force an exit from the ZkBNB to BSC without having to rely on the committer's permission.
검열에 대한 보안 대책으로, ZkBNB 사용자는 ZkBNB 운영자에 의해 검열되고 있다고 느낄 경우 BSC 메인넷의 롤업 컨트랙트에 직접 트랜잭션을 제출할 수 있습니다. 이 기능을 통해 사용자는 커미터(commiter)의 허가에 의존하지 않고도 ZkBNB에서 BSC로 강제로 나갈 수 있다.

## API 참조

API 참조에 관한 제사한 사항은 [여기](https://github.com/bnb-chain/zkbnb/blob/master/docs/api_reference.md)를 참고하세요.