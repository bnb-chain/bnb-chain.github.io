---
sidebar_label: Introduction
sidebar_position: 2
---
# 소개

[비컨 체인](https://www.binance.org) 은 [바이낸스](https://www.binance.com)와 BNB 커뮤니티에서 가상 자산을 위한 DEX(탈중앙화 거래소)를 구현하기 위해 개발되었습니다.

비컨 체인은 [분산 합의](../beaconchain/learn/architecture.md) 위에 구현된 고성능 [매칭 엔진](../beaconchain/learn/matching-engine.md)을 통해 1초 내로 거래를 처리하는 현재 중앙화 거래소 정도의 효율을 구현하는 것을 목표로 하고 있습니다.

비컨 체인의 트랜잭션은 정해진 요금표에 의거하여 BNB(바이낸스 생태계의 기초 통화)를 소각합니다.

비컨 체인은 [다른 체인에 있는 자산들](../beaconchain/atomic-swap.md)도 거래 가능하도록 만들었으며, [임계치 서명](../beaconchain/learn/threshold-signature-scheme.md)같은 암호화 기술을 통해 구현하였습니다.

## 기능

비컨 체인은 블록체인의 기초적인 기능들을 사용할 수 있습니다:

- BNB와 가상 자산들 송신 및 수신
- 새로운 디지털 자산 발생 (BNB에서는 BEP-2)
- 디지털 자산의 주조/소각, 동결/해제, 잠금/해제

DEX 및 거래 특화 기능이 존재합니다:

- 거래쌍에 대한 거래소 상장 제안
- 트레이더를 위한 메이커/테이커 주문 생성
- 아토믹스왑(atomic swap)을 통한 타 체인 자산 상장 (BEP-3)

또한 비컨 체인만의 새로운 기능도 제공합니다:

- 임계치 서명 (다중서명 대안)
- 스마트 컨트랙트 사이드체인 (개발 중)

## 기술 상세

비컨 체인 기술에 관심이 있으면 다음을 읽으세요:

- [블록체인으로서 비컨 체인](../beaconchain/blockchain.md): 합의 방법, 소프트웨어 기술 스택, 네트워크 레이아웃 및 역할.
- [비컨 체인에 연결하기](../beaconchain/chain-access.md): 비컨 체인과 DEX에 다양한 방법으로 연결하기.
- [비컨 체인 풀 노드 실행하기](../beaconchain/fullnode.md): 풀 노드를 운영하여 비컨 체인 p2p 네트워크에 일원이 되기.
- [비컨 체인 라이트 클라이언트 실행하기](../beaconchain/light-client.md): 라이트 클라이언트 실행 방법.
- [비컨 체인 거버넌스](../beaconchain/governance.md): 제안, 투표와 검증인으로 참가.

## 참여

라이트 노드부터 풀 검증자까지 네트워크에 다양한 방법으로 참여할 수 있습니다. 비컨 체인은 점진적인 탈중앙화를 지향합니다. 우리는 개인이나 기업 누구나 BNB를 예치하여 검증자 노드를 실행하고, 거버넌스에 참여하는 미래를 꿈꿉니다.