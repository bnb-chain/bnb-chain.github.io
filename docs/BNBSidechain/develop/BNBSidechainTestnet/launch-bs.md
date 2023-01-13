---
title: BNB 사이드 체인 실행하기
id: launch-bs
---

# BNB 사이드 체인 실행하기

## 전제 조건

명령어를 실행하기 전에 다음을 수행해야 합니다:
* 7개의 노드를 돌리기 위해 전용 기기와 최소 8개의 전용 CPU 및 32GB RAM을 준비해 주세요.
* 와일드 카드 도메인 `*.example.com`가 기기에 설정되어 있는지 확인하세요 (공개IP를 지닌 전용 기기를 사용하세요).
* `config.json`를 수정하여 필요한 매개 변수를 업데이트 합니다(모든 주소는 keystore 폴더에서 찾을 수 있습니다).

## Config 파일 매개 변수

config 파일 구조는 다음과 같습니다:

* `chainId` — 체인에서의 당신 체인 식별자.
* `validators` — 최초 검증인 집합 리스트(도커 compose file에 같은 리스트가 있는지 확인하세요).
* `systemTreasury` — 보상의 1/16을 수집하는 시스템 트레저리 주소 (거버넌스 일 수 있습니다).
   * `consensusParams` — 합의 및 스테이킹 매개 변수.
   * `activeValidatorsLength` — 추천 값은 3k+1개 (정직한 노드들이 많을수록 좋습니다): 7, 13, 19, 25, 31...
   * `epochBlockInterval` — 블록에서 특정된 에포크(epoch)의 길이; 추천되는 값은 1일입니다 (86400/3=28800로, 3초가 블록 생성 시간입니다).
   * `misdemeanorThreshold` — 해당 값 만큼 블록을 놓치면 검증인이 일일 보상을 다 잃습니다(처벌).
   * `felonyThreshold` — 해당 값 만큼 블록을 놓치면 검증인이 N 에포크 동안 감옥엥 들어갑니다.
   * `validatorJailEpochLength` — 검증인이 투옥되는 기간입니다 (7 epochs = ~7 days).
   * `undelegatePeriod` — 6 에포크 (~7일) 이후 자산을 회수하도록 허용합니다.
   * `minValidatorStakeAmount` — 검증인이 되기 위해 스테이킹 해야 하는 토큰 금액 (ETH).
   * `minStakingAmount` — 위임인의 최소 스테이킹 금액 (ETH).
* `initialStakes` — 초기 스테이킹한 검증인들 (검증인 리스트와 일치해야 합니다).
* `votingPeriod` — 거버넌스 제안을 위한 기본 투표 기간.
* `faucet` — (테스트 토큰 배포)수도꼭지 및 기타 필요에 의한 최초 잔액을 표시합니다.

## 실행

두 가지 실행 옵션이 있습니다:

* 기본 옵션
* balance loader와 SSL certificates 없이 실행

### 기본 옵션

Makefile을 확인하면 더 재밌는 명령어들에 대해 알 수 있습니다. 다만 단순히 설정하는 것은 다음을 실행하면 됩니다:
```
apt update
apt install build-essential socat
git clone https://github.com/bnb-chain/bas-devnet-setup bas --recursive
cd bas
DOMAIN_NAME=dev-02.bas.ankr.com make all
```

:::팁
`DOMAIN_NAME` 변수는 당신의 도메인으로 설정되어야 합니다.
:::

배포된 서비스는 다음 엔드포인트를 통해 접근 가능합니다:
* https://rpc.${DOMAIN_NAME} (port 8545,9546) - Web3 RPC 엔드포인트
* https://explorer.${DOMAIN_NAME} (port 4000) - 블록체인 탐색기
* https://faucet.${DOMAIN_NAME} (port 3000) - Faucet
* https://staking.${DOMAIN_NAME} (port 3001) - 스테이킹 UI

### balance loader와 SSL certificates 없이 실행

balance loader와 SSL certificates 없이 노드를 실행하고 싶은 때, 다음을 실행합니다:
```
make all-no-balancer
```

## 노출된 포트

Docker Compose 파일이 다음 포트들을 공개합니다:
* 7432 - Blockscout PostgreSQL 데이터베이스
* 4000 - Blockscout 탐색기
* 3000 - Faucet UI
* 3001 - 스테이킹 UI
* 8545 - RPC 엔드포인트
* 8546 - WS 엔드포인트
* 30303 - Bootnode
