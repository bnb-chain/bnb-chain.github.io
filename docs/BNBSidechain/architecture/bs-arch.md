---
sidebar_label: Architecture
sidebar_position: 2
hide_table_of_contents: false
---

# BNB 사이드체인 구성

BNB 사이드체인은 BSC-호환 사이드체인을 만드는 모듈식 프레임워크입니다. BSC 생태계와 통합하기 위한 요구사항을 정의하고 스테이킹이나 RPC-API, 스마트 컨트랙트 같이 개발된 EVM-호환 기능들을 제공합니다. BSC는 BNB 사이드체인 보안 모델에 의존하지 않으므로, BSC와 BNB 사이드체인 네트워크 간의 표준 브릿지 솔루션이 없습니다. 대신 BNB 사이드체인은 Multichain이나 Celer Network cBridge같은 서드 파티 브릿지와 통합하기 위한 프로토콜과 표준을 제공할 수 있습니다.

## BNB 사이드체인 구조와 통합

BNB Sidechain specifies the primary structure and configuration of the blockchain, using special templates. A **template** is a ready-made blockchain solution that is **already integrated into the BSC infrastructure**. With this integration, developers automatically get access to products like a ready-made staking system, block explorer, API gateways, interfaces for governance, etc. 

템플릿을 적용한 후, BNB 사이트체인은 프로그램 가능 및 설정 가능한 **모듈**을 통해 쉽게 커스터마이징이 가능하다,

![img](../../../static/img/assets/bas-architecture1.png)

## 모듈

BNB 사이드체인의 주요 목표는 다중 모듈식 블록체인 구조를 구현하고, 누구나 사용이 편리하고 유연하게 만드는 것입니다.

As the current implementation of BNB Sidechain is built on BSC, all existing modules are built into the system smart contracts and into the EVM machine. In the future, a system of modules will be created to allow you to develop a universal smart contract and a bus for interacting between modules and other parts. This all will make it possible to use such modules in any blockchain solution.

BNB Sidechain brings with it programmable and configurable modules that can be used or modified by developers to reach their business goals, for example:

- Cross Chain — BNB Sidechain is designed to provide cross chain functionality for the native assets. Since native assets are fully managed by BAS developers they can compromise token supply or mint/burn tokens.

- Staking & Staking Pool— BNB Sidechain supports on-chain staking system and uses the PoSA (proof-of-stake-of-authority) staking model. It allows users to delegate their tokens to the specific validator and share validator's rewards based on the total staked amount.

- Runtime Upgrade — Runtime upgrade system smart contract allows to modify the existing byte code for the system smart contracts. However, it doesn't allow to modify user's smart contracts. To apply any modification to the sources, the user must create a proposal, and changes can only be applied once a quorum is reached on the governance. This scheme is much simpler compared to hard forks, as it doesn't require all validators to upgrade their nodes.

- Blockchain & EVM — for block producing and EVM transaction execution, of course, each BNB Sidechain can define their own runtime execution environment based, for example, on WebAssembly in future.

- Web3 API — for BNB Sidechain compatibility with Web3 ecosystem including MetaMask and other applications.

- Transaction Pool — for managing internal BNB Sidechain policies for transaction filtering and for charging fees for the system operational.

- PoSA Consensus & Staking — for users to be able to stake to the authorized validators in the BNB Sidechain network and guarantee the safeness of actions applied on the chain.

- 거버넌스 — A decentralized voting system for managing and implementing changes to cryptocurrency blockchains.

- 저장 및 상태 — 로컬 데이터를 유지하기 위해.

내부적으로 BNB 사이드체인은 다음과 같은 모듈을 구현하고 있습니다: Parlia 합의 엔진, 스테이킹 풀, 거버넌스, 동적 런타임 업그레이드, 보상 관리, 관리 가능한 블록체인 변수와 EVM 후크.

## 리포지토리

다음은 앵커(Ankr)에서 제공하는 BNB 사이드체인 개발을 위한 리포지토리입니다:
* [BNB Sidechain-genesis-config](https://github.com/bnb-chain/bas-genesis-config) — 최초 스마트 컨트랙트 및 최초 구성 파일 생성을 위한 스크립트.
* [BNB Sidechain-template-bsc](https://github.com/bnb-chain/bas-template-bsc) — BNB 사이드체인 호환 기반 형식.
* [BNB Sidechain-devnet-setup](https://github.com/bnb-chain/bas-devnet-setup) — BNB 사이드체인 개발넷(devnet)을 실행하기 위한 스크립트.
