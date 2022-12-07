---
sidebar_label: 블록체인 및 EVM 보안
---

# 블록체인 및 EVM 보안

## 블록체인

BNB 사이드 체인은 인스턴스를 생성할 때 기본 템플릿에 BSC 코드를 적용하여 보안 문제를 해결하며, [Beosin](https://github.com/Ankr-network/bas-genesis-config/blob/master/audit/2022-04-27-Beosin.pdf)과 Certik에 의해 감사를 받습니다.

## EVM

BNB 사이드 체인은 EVM의 공식 Go-Ethereum 코드베이스를 믿음으로 가상 머신 보안 문제를 해결합니다.

EVM은 블록체인 커뮤니티 전체가 사용하는 검증된 제품으로 수천 번의 감사를 받았습니다.

BNB 사이드 체인은 스테이킹 및 거버넌스 관리할 수 있는 서드 파티 서비스에 의존하지 않습니다.
대신 모든 스테이킹 및 거버넌스 특화 로직을 스마트 컨트랙트에 바로 적용합니다.
이는 스테이킹, 거버넌스, 보상 분배는 EVM 런타임 환경에 의해 관리되고 검증된다는 것입니다.

취약점과 버그가 없음을 검증하기 위해, 몇 번의 감사를 진행하였습니다.
여기서 [BNB Sidechain 시스템 스마트 계약 감사 내역](https://assets.ankr.com/bas/system_smart_contracts_security_audit.pdf)을 확인할 수 있습니다.
