---
sidebar_label: BNB 스마트 체인 개별 노드
hide_table_of_contents: false
sidebar_position: 2
---

# BNB 스마트 체인에서 개별 노드(separate node) 운영하기

## 개요

![img](../static/img/separate-node-architecture.png)

현재 BSC 노드에는 MPT와 스냅샷의 두 가지 상태 세계가 있습니다. MPT(Merkle Patricia Tries)는 트리 구조의 상태 세계입니다. MPT의 핵심 기능은 상태의 일관성을 보장하기 위해 상태 루트를 생성하는 것이지만, MPT에 대한 쿼리/커밋은 매우 느립니다. 스냅샷은 평평한 key-value 기반 상태 세계입니다. 스냅샷은 빠른 쿼리 및 커밋을 제공합니다. 트랜잭션 볼륨이 크더라도 스냅샷의 스토리지 크기는 천천히 증가합니다. 스냅샷은 일반적으로 블록 처리에 사용되는 반면, MPT는 상태 확인에 사용됩니다.

하드웨어 요구 사항을 낮추고 보안을 유지하기 위해 서로 다른 스토리지를 최대한 활용할 수 있는 두 가지 유형의 노드를 소개합니다. 하나는 고속 노드, 다른 하나는 검증 노드입니다. 고속 노드는 스냅샷을 사용하여 블록 처리를 수행하며, 상태 루트를 제외한 모든 블록에 대해 검증을 수행합니다. 확인 노드는 고속 노드로부터 diffhash를 수신한 다음 고속 노드에 MPT 루트를 응답합니다.

고속 노드는 MPT를 저장할 필요가 없으므로 스토리지 및 계산 요구사항이 훨씬 낮아집니다.

## 역할

- **고속 노드**: 스냅샷만 사용하여 전체 동기화를 수행하고 difflayer를 생성합니다. 블록을 고정하기 전에 검증 노드에서 확인 메시지가 필요하며, 새 블록을 추가하기 전에 조상 블록에 대한 확인 노드에서 확인 메시지를 받을 때까지 기다려야 합니다.

- **검증 노드**: 스냅샷 및 MPT를 사용하여 전체 동기화를 수행하고 difflayer를 생성하는 일반 BSC 풀 노드입니다. 고속 노드로부터 diffash를 수신하고 diffash가 일치하는 해당 difflayer를 찾은 다음 고속 노드에 MPT 루트 메시지를 응답합니다.


## 연관 명령어

#### 고속 노드
새로운 **tries-verify-mode** 설정을 소개합니다. 네 가지 모드가 있습니다.
- **local**: 완전한 상태 세계(MPT 및 스냅샷 모두)가 있는 일반 전체 노드, 머클 상태 루트가 블록 헤더에 대해 검증됩니다.
- **full**: 스냅샷 상태 세계만 있는 빠른 노드입니다. 머클 상태 루트는 diffhash(블록에서 생성된 difflayer의 identity)와 상태 루트를 비교하여 신뢰할 수 있는 원격 검증 노드에서 검증됩니다.
- **diff**: 전체 모드와 동일하지만, 확인 노드에 diffhash가 없는 경우 diffhash를 확인하지 않고 허용할 수 있습니다.
- **none**: 머클 상태 루트 검증이 전혀 없으며, 원격 검증 노드를 설정하거나 연결할 필요가 없으며, 전체 및 보안 모드에 비해 더 가볍지만 다른 피어와 상태가 일치하지 않을 가능성은 거의 없습니다.

고속 노드가 로컬 모드가 아닌 상태에서 실행되는 경우 노드는 기본적으로 diff 프로토콜을 사용하지 않도록 설정합니다. 고속 노드가 전체 또는 라이트 모드로 실행되는 경우 노드는 기본적으로 신뢰 프로토콜을 사용하도록 설정합니다.

` ./geth --config ./config.toml --datadir ./node --syncmode full --cache 5000 --tries-verify-mode none`

#### 검증 노드
풀노드가 신뢰 프로토콜을 활성화했을 때 검증 노드로서 기능할 수 있습니다. 또한 검증 노드 실행 시 persist diff를 활성화하고 snap protocol와 diff protocol를 비활성화하는 것을 권장합니다.

` ./geth --config ./config.toml --datadir ./node --syncmode full --cache 5000 --persistdiff --enabletrustprotocol --disablesnapprotocol --disablediffprotocol`

#### tries 노드 자르기
tries 노드 자르기:  `./geth snapshot insecure-prune-all --datadir ./node  ./genesis.json`

## 검증노드 실행
[이 가이드](./BSC-verify-node.md)를 참고하세요.

## 고속 노드 실행
[이 가이드](./BSC-fast-node.md)를 참고하세요.
