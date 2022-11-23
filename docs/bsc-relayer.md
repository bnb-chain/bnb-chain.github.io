---
sidebar_label: BSC Relayer Guides
hide_table_of_contents: false
sidebar_position: 2
---

# BSC 릴레이어 가이드

## 자금 준비하기

1. 계정에 충분한 BNB가 있는지 확인합니다. [포셋](https://testnet.binance.org/faucet-smart)에서 구할 수 있습니다.

계정을 아직 만들지 않은 경우 [가이드](wallet/metamask.md)를 따라 먼저 계정을 만드세요.

* 릴레이어 등록 **100BNB**
* 트랜잭션 수수료로 **500BNB** 이상

!!! 팁
		현재 BSC 릴레이어 코드가 완전히 준비되지 않았습니다. `db persistence`, `alert`, `prometheus monitor 등 일부 기능은 아직 개발 중입니다. 따라서 db_config, alert_config, instrumentation_config, admin_config에 대한 설정을 수정하지 마십시오.

## BSC 릴레이어 설치 방법

1. 소스 코드에서 빌드하기

[Go 1.13+](https://golang.org/doc/install)가 설치되어 있고, `PATH` 환경 변수에 `GOPATH`를 다운 받았음을 확인하세요.

```bash
git clone https://github.com/bnb-chain/bsc-relayer
# Enter the folder bsc was cloned into
cd bsc-relayer
# Comile and install bsc
make build
```

[릴리즈 페이지](https://github.com/bnb-chain/bsc-relayer/releases/tag/v1.1.0)에서 이미 빌드된 바이너리를 다운받을 수 있습니다.

## 예시 config file 받기

이 url 에서 예시 config file을 다운 받습니다: <https://github.com/bnb-chain/bsc-relayer/blob/master/config/config.json>

`config.json`을 수정하고 bsc_config.private_key에 BSC 개인키를 입력합니다. 개인키의 예시는 다음과 같습니다: `AFD8C5D83F148065176268A9D1EE375A10CEE1E74D15985D4CC63E467EC34DA5`

* 비콘 체인 구성:
	* `mnemonic`: 복구 프레이즈를 여기에 붙여넣기 하세요. bsc-relayer가 자동적으로 `double-sign` 증거를 제출할 것이기 때문에, 커밋된 후 보상이 이 주소로 보내질 것입니다
* BNB 스마트 체인 구성:

## 릴레이어 시작하기

로컬 환경에서 시작할 수 있습니다.

```shell
./bsc-relayer --config-type local --config-path config.json
```

결과:

```
(base) huangsuyudeMacBook-Pro:mac huangsuyu$ bsc-relayer --config-type local --config-path config.json
2020-05-27 17:01:16 INFO main Start relayer
2020-05-27 17:01:16 INFO SyncProtocol Sync cross chain protocol from https://github.com/bnb-chain/bsc-relayer-config.git
2020-05-27 17:01:18 INFO RegisterRelayerHub This relayer has already been registered
2020-05-27 17:01:18 INFO CleanPreviousPackages channelID: 1, next deliver sequence 55 on BSC, next sequence 55 on BC
2020-05-27 17:01:18 INFO CleanPreviousPackages channelID: 2, next deliver sequence 1273 on BSC, next sequence 1273 on BC
2020-05-27 17:01:18 INFO CleanPreviousPackages channelID: 3, next deliver sequence 6 on BSC, next sequence 6 on BC
2020-05-27 17:01:19 INFO CleanPreviousPackages channelID: 8, next deliver sequence 5 on BSC, next sequence 5 on BC
2020-05-27 17:01:19 INFO RelayerDaemon Start relayer daemon
2020-05-27 17:01:19 INFO Serve start admin server at 0.0.0.0:8080
```

또는 <https://github.com/bnb-chain/bsc-relayer-config>의 동적인 크로스 체인 프로토콜 구성 동기화

* config.json을 수정하고 "cross_chain_config.protocol_config_type"를 "remote"로 변경합니다. 릴레이어는 동적으로 이 레포지토리 <https://github.com/bnb-chain/bsc-relayer-config>에서 크로스 체인 프로토콜 구성을 동기화하 것입니다.
* 릴레이어 서비스 시작

```shell
./bsc-relayer --config-type local --config-path config.json
```

### 상태 확인

[RelayerHub 컨트랙트](https://bscscan.com/address/0x0000000000000000000000000000000000001006)를 호출하여 릴레이어가 등록된 것을 확인할 수 있습니다. [컨트랙트 읽기](https://bscscan.com/address/0x0000000000000000000000000000000000001006#readContract)로 가서 **isRelayer** 함수를 호출합니다. **true**를 반환하면 릴레이어는 제대로 작동하는 것입니다.

## 릴레이어 보상

1. 시스템 컨트랙트 로그에서 릴레이어 보상 분배를 확인할 수 있습니다: <https://bscscan.com/address/0x0000000000000000000000000000000000001005#events>. [릴레이어 인센티브](learn/incentives.md)에 따르면, 보상은 매 1000 개의 데이터 패키지 마다 분배됩니다. 총 축적된 보상은 [컨트랙트](https://bscscan.com/address/0x0000000000000000000000000000000000001005#readContract)의 `_collectedRewardForHeaderRelayer`와 `_collectedRewardForTransferRelayer` 값에서 읽을 수 있습니다.

2. 릴레이어 상태 쿼리하기

총 축적된 릴레이 횟수는 [컨트랙트](https://bscscan.com/address/0x0000000000000000000000000000000000001005#readContract)의 `_transferRelayersSubmitCount`에서 읽을 수 있습니다.


## 릴레이어 중단

예치된 **100BNB**를 돌려 받기 위해서는 [RelayerHub 컨트랙트](https://bscscan.com/address/0x0000000000000000000000000000000000001006)를 호출하여 릴레이어 등록을 취소해야 합니다. 수수료는 **0.1BNB**입니다.

* 마이이더월렛으로 가서 [컨트랙트 사용하기](https://www.myetherwallet.com/interface/interact-with-contract)로 갑니다.
* 컨트랙트 주소 **0x0000000000000000000000000000000000001006**를 [abi](relayerhub.abi) 인터페이스로 채워 넣습니다.
* **unregister** 함수를 호출하고 ETH 값을 0로 둡니다.
* **메타마스크**에서 트랜잭션에 서명합니다.
