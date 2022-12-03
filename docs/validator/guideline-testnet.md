---
sidebar_label: Run Validator on Testnet
sidebar_position: 2
hide_table_of_contents: false
---
# BNB 스마트 체인 테스트넷에서 검증인이 되는 법

### 시작에 앞서

시작하기 전에 검증인 노드에 대한 하드웨어 요구사항을 충족시키는 지 확인해야 합니다.

#### 검증인 하드웨어 선택하기

- 최신 버전의 Mac OS X 또는 Linux를 지원하는 VPS.
- **중요** 2T GB의 빈 디스크 공간, solid-state drive(SSD), gp3, 8k IOPS, 250MB/S 처리량, 읽기 지연시간(read latency) <1ms (snap/fast sync로 시작할 경우 NVMe SSD 필요)
- 16 코어 CPU와 메모리 64 GB (RAM)
- AWS m5zn.3xlarge 인스턴스 타입 또는 구글 클라우드 c2-standard-16 권장.
- 10 MB/s 업로드/다운로드 속도의 브로드밴드 인터넷

### 테스트넷에 검증자 노드 설치하기

!!! 참고
	테스트넷에서 노드를 운영할 경우 2CPU/8GB의 RAM으로 충분합니다.

### BSC 풀노드 설치하기

 [릴리즈 페이지](https://github.com/bnb-chain/bsc/releases/latest)에서 미리 빌드된 바이너리를 다운받거나 [풀노드 설치하는 법](fullnode.md)의 지침을 따르면 됩니다.

**config 파일 다운받기**

`genesis.json`와 `config.toml`를 다음과 같이 다운받습니다:
```bash
## testnet
wget --no-check-certificate  $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep testnet |cut -d\" -f4)
unzip testnet.zip
```

노드를 띄우고 동기화가 될 때까지 대기합니다.

### 합의 키 생성하기

검증인의 합의 키, 즉 계정을 생성해야 합니다. 아래의 명령어를 통해 새로운 계정을 만들고 비밀번호를 설정할 수 있습니다.

```bash
geth account new --datadir ./node
```

### 검증인 노드 시작하기

!!! 경고
	퍼블릭 네트워크의 여러분의 RPC 엔드포인트를 노출하지 마세요.

```bash
echo {your-password} > password.txt
geth --config ./config.toml --datadir ./node --syncmode snap -unlock {your-validator-address} --password password.txt  --mine  --allow-insecure-unlock --cache 18000
```

### 포셋에서 테스트넷 토큰 받기

<https://testnet.binance.org/faucet-smart>에서 테스트넷 BNB를 받을 수 있지만, BNB는 BNB 스마트 체인에 있습니다.

`tbnbcli`는 [GitHub](https://github.com/bnb-chain/node-binary/tree/master/cli/testnet/0.8.1)에서 다운받을 수 있습니다. `tbnbcli`를 사용해 계정을 생성하거나 복구합니다.

이 [가이드](https://docs.bnbchain.org/docs/binance#transfer-testnet-bnb-from-bsc-to-bc)를 따라 BNB를 BSC 테스트넷에서 BC 테스트넷으로 전송할 수 있습니다.

### 후보 선언하기

`bnbcli`를 사용하여 계정을 생성 또는 복구할 수 있습니다. 메인넷의 경우 잔고가 10000 BNB, 테스트넷은 100 BNB 이상임을 확인하세요.

 `create-validator` 트랜잭션을 생성하기 전에 여러분의 BSC 검증인이 완전히 동기화 되었는지 확인하세요.

테스트넷 예제

```
tbnbcli staking bsc-create-validator \
--side-cons-addr {validator address} \
--side-fee-addr {wallet address on BSC} \
--address-delegator {wallet address on BC} \
--side-chain-id chapel \
--amount 10000000000:BNB \
--commission-rate {10000000 represent 10%} \
--commission-max-rate {20000000 represent 20%} \
--commission-max-change-rate {10000000 represent 1%} \
--moniker {validator name} \
--details {validator detailed description} \
--identity {keybase identity} \
--website {website for validator} \
--from {key name} \
--chain-id Binance-Chain-Ganges \
--node=http://data-seed-pre-1-s3.binance.org:80
```

[Explorer](https://explorer.bnbchain.org/)에서 트랜잭션을 확인할 수 있습니다.

[여기](https://testnet-staking.binance.org/en/staking)에서 검증인 상태를 확인하세요.

## 후보 선언 이후

### 1. 노드 상태 모니터하기

빠른 시작을 위해 도커 컨테이너에서 GethExporter를 실행하세요.

```
docker run -it -d -p 9090:9090 \
  -e "GETH=http://mygethserverhere.com:8545" \
  hunterlong/gethexporter
```

![](https://grafana.com/api/dashboards/6976/images/4471/image)

### 2. 검증인 프로필 업데이트 하기

이 리포지토리에 Pull Request를 올려서 여러분의 정보를 업데이트하세요: <https://github.com/bnb-chain/validator-directory>
참고: <https://grafana.com/grafana/dashboards/6976>


### 3. 검증인 정보를 게시하기

이 리포지토리에 Pull Request를 올리세요: <https://github.com/bnb-chain/validator-directory>

이 저장소는 검증인 후보자들이 잠재 위임인들에게 자신의 팀과 인프라, 생태계 기여에 대해 간략하게 소개할 수 있는 공간입니다.

### 4. 검증 중단하기

`geth console`에 명령어를 입력함으로써 신규 블록 채굴을 중단할 수 있습니다.

`geth attach ipc:path/to/geth.ipc`을 이용해 검증인 노드에 연결하세요.

```bash
miner.stop()
```

다음과 같이 검증을 재개할 수 있습니다.
```bash
miner.start()
```

