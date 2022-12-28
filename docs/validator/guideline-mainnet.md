---
sidebar_label: 메인넷 합류하기
sidebar_position: 2
hide_table_of_contents: false
---
# BNB 스마트 체인 메인넷에서 검증인이 되는 법

### 시작에 앞서

시작하기 전에 검증인 노드에 대한 하드웨어 요구사항을 충족시키는 지 확인해야 합니다.

#### 검증인 하드웨어 선택하기

- 최신 버전의 Mac OS X 또는 Linux를 지원하는 VPS.
- **중요** 2T GB의 빈 디스크 공간, solid-state drive(SSD), gp3, 8k IOPS, 250MB/S 처리량, 읽기 지연시간(read latency) <1ms (snap/fast sync로 시작할 경우 NVMe SSD 필요)
- 16 코어 CPU와 메모리 64 GB (RAM)
- AWS m5zn.3xlarge 인스턴스 타입 또는 구글 클라우드 c2-standard-16 권장.
- 10 MB/s 업로드/다운로드 속도의 브로드밴드 인터넷


## 메인넷에 검증자 노드 설치하기

### 1. BSC 풀 노드 설치하기

 [릴리즈 페이지](https://github.com/bnb-chain/bsc/releases/latest)에서 미리 빌드된 바이너리를 다운받거나 [풀 노드 설치하는 법](fullnode.md)의 지침을 따르면 됩니다.

**config 파일 다운받기**

`genesis.json`와 `config.toml`를 다음과 같이 다운받습니다:
```bash
## mainet
wget --no-check-certificate  $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep mainnet |cut -d\" -f4)
unzip mainnet.zip
```

### 2. 로컬 환경에 최초 상태(genesis state) 작성하기

```bash
geth --datadir node init genesis.json
```

다음과 같은 결과를 볼 수 있습니다.

```
INFO [05-19|14:53:17.468] Allocated cache and file handles         database=/Users/huangsuyu/Downloads/bsc/node/geth/chaindata cache=16.00MiB handles=16
INFO [05-19|14:53:17.498] Writing custom genesis block
INFO [05-19|14:53:17.501] Persisted trie from memory database      nodes=21 size=56.84KiB time=357.915µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=-574.00B
INFO [05-19|14:53:17.502] Successfully wrote genesis state         database=chaindata hash=7d79cc…fb0d1e
INFO [05-19|14:53:17.503] Allocated cache and file handles         database=/Users/huangsuyu/Downloads/bsc/node/geth/lightchaindata cache=16.00MiB handles=16
INFO [05-19|14:53:17.524] Writing custom genesis block
INFO [05-19|14:53:17.525] Persisted trie from memory database      nodes=21 size=56.84KiB time=638.396µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=-574.00B
INFO [05-19|14:53:17.528] Successfully wrote genesis state         database=lightchaindata hash=7d79cc…fb0d1e
```


### 3. 합의 키 생성하기

검증인의 합의 키, 즉 계정을 생성해야 합니다. 아래의 명령어를 통해 새로운 계정을 만들고 비밀번호를 설정할 수 있습니다.


!!! 경고
	다른 이들에게 키스토어를 공유하지 마세요.


```bash
geth account new --datadir ./node
```

이 명령어는 퍼블릭 주소와 개인 키에 대한 경로를 반환합니다. 키 파일을 백업해놓아야 합니다!

이미 계정이 있는 경우, 시드 프레이즈를 이용해 복구할 수 있습니다.

```bash
geth account import --datadir ./node
```

### 4. 검증인 노드 시작하기

!!! 경고
	퍼블릭 네트워크에 여러분의 RPC 엔드포인트를 노출하지 마세요.

```bash
## generate the consensus key and input the password
geth account new --datadir ./node
echo {your-password} > password.txt
geth --config ./config.toml --datadir ./node --syncmode snap -unlock {your-validator-address} --password password.txt  --mine  --allow-insecure-unlock --cache 18000
```

### 5.  동기화될 때까지 대기하기

이제 여러분의 노드는 최초(genesis)부터 모든 트랜잭션을 조회하면서 로컬 환경에 블록체인 상태를 재현하고 있을 것입니다. 이는 오랜 시간이 걸리기 때문에, 동기화가 진행되는 동안 자리를 비울 수 있도록 연결이 안정적이어야 합니다.

[https://bscscan.com/](https://bscscan.com/)를 통해 네트워크 상태를 확인할 수 있습니다.

기본적으로 로그 `$HOME/node/bsc.log` 에서 상태를 관찰할 수 있습니다.

축하합니다! 이제 여러분은 [풀 노드](fullnode.md) 운영자로서 네트워크에 참여하게 되었습니다.

### 6. 데이터 백업하기 (메인넷에 권장)

만약 (신뢰할 수 있는 제공자의) 데이터 백업이 있는 기존 네트워크에 연결할 경우, 처음부터 동기화를 하는 대신 선텍사항으로서 백업을 노드 스토리지에 로드할 수 있습니다. 더 자세한 내용은 [여기](snapshot.md)에서 확인하세요.

### 7. 후보 선언하기

`bnbcli` 바이너리를 사용하여 `create-validator` 트랜잭션을 생성하고, 여러분의 후보 지위를 선언할 수 있습니다.


* `bnbcli`는 [GitHub](https://github.com/bnb-chain/node-binary/tree/master/cli/prod/0.8.2)에서 다운받을 수 있습니다.

`bnbcli`를 사용하여 계정을 생성 또는 복구할 수 있습니다. 잔고가 10000 BNB 이상임을 확인하세요.

여러분의 BSC 검증인이 이미 다 따라 동기화를 했는지 확인하세요.

메인넷에서 검증인 생성을 위한 명령어는 다음과 같습니다:

```
bnbcli staking bsc-create-validator \
-side-cons-addr {validator address} \
--side-fee-addr {wallet address on BSC} \
--address-delegator {wallet address on BC} \
--side-chain-id bsc \
--amount 10000000000:BNB \
--commission-rate {10000000 represent 10%} \
--commission-max-rate {20000000 represent 20%} \
--commission-max-change-rate {500000000 represent 5%} \
--moniker {validator name} \
--details {validator detailed description} \
--identity {keybase identity} \
--website {website for validator} \
--from {key name} \
--chain-id Binance-Chain-Tigris \
--node https://dataseed5.defibit.io:443
```

검증인 노드를 시작할 때 여러분이 언락하는 주소가 `side-cons-addr`임을 확인해주세요.

다른 파라미터에 대해 알아보고 싶다면 [여기](../stake/Staking.md)에서 자세한 설명을 찾을 수 있습니다.

[Explorer](https://explorer.bnbchain.org/)에서 트랜잭션을 확인할 수 있습니다.

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

