---
sidebar_label: BNB 스마트 체인 검증 노드
hide_table_of_contents: false
sidebar_position: 2
---
# BNB 스마트 체인에서 검증 노드 운영하기

## 검증 노드 기능

* 전체 블록체인 기록을 디스크에 저장하고 네트워크의 데이터 요청에 응답할 수 있습니다.
* 새 블록 및 트랜잭션을 수신하고 유효성을 검사합니다.
* 모든 계정의 상태를 확인합니다.
* 고속 노드의 상태를 확인합니다.

## 검증 노드의 권장 요구 사항

- 최신 버전의 Mac OS X 또는 Linux를 실행하는 VPS
- **중요** 2TB의 사용 가능한 디스크 공간, SSD(solid-state drive), gp3, 8k IOPS, 처리량 250MB/S, 읽기 지연 시간 1ms 미만
- 16개의 CPU 코어와 64기가바이트 메모리(RAM)를 지원
- AWS의 경우 m5zn.3xlarge 인스턴스 타입, Google 클라우드의 경우 c2-standard-16이 권장
- 초당 10mb 업로드/다운로드 속도를 제공하는 브로드밴드 인터넷 연결

## 설정

## 체인 데이터 스냅샷

체인 데이터 [스냅샷](https://github.com/bnb-chain/bsc-snapshots)을 다운받고 홈 폴더에 추출하여 속도를 높입니다

```
## Extract the data
unzip geth.zip -d /NAME_OF_YOUR_HOME/node &
```
## 검증 노드 운영 단계

### 스냅샷 동기화 (권장)

1. [릴리즈 페이지](https://github.com/bnb-chain/bsc/releases/latest)에서 이미 빌드된 바이너리를 다운받거나 아래의 지시를 따릅니다.

```bash
# Linux
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep geth_linux |cut -d\" -f4)
# MacOS
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep geth_mac |cut -d\" -f4)
```

2. config 파일을 다운받습니다.

`genesis.json`과 `config.toml`를 아래와 같이 다운받습니다

```bash
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep mainnet |cut -d\" -f4)
unzip mainnet.zip
```

3. 스냅샷을 다운받습니다.

[다운로드 사이트](https://github.com/bnb-chain/bsc-snapshots)에서 최신 스냅샷을 다운받습니다. 가이드를 따라 파일의 구조를 설정합니다.

4. 풀노드를 시작합니다.
```
geth --config ./config.toml --datadir ./node --diffsync --cache 8000 --rpc.allow-unprotected-txs --txlookuplimit 0
```

### 제네시스 블록에서 동기화 (권장되지 않음)

1. 소스 코드에서 빌드합니다.

[Go 1.13+](https://golang.org/doc/install)가 설치되어 있고 `GOPATH`가 `PATH` 환경 변수에 추가되어 있는 것을 확인해주세요.

```bash
git clone https://github.com/bnb-chain/bsc
# Enter the folder bsc was cloned into
cd bsc
# Compile and install bsc
make geth
```

아니면 [릴리즈 페이지](https://github.com/bnb-chain/bsc/releases/latest)에서 이미 빌드된 바이너리를 다운받거나 아래의 지시를 따릅니다.

```bash
# Linux
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep geth_linux |cut -d\" -f4)
# MacOS
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep geth_mac |cut -d\" -f4)
```

2. config 파일을 다운받습니다.

`genesis.json`과 `config.toml`를 아래와 같이 다운받습니다.

```bash
## mainet
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep mainnet |cut -d\" -f4)
unzip mainnet.zip

## testnet
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep testnet |cut -d\" -f4)
unzip testnet.zip
```

3. 로컬 환경에 제네시스 상태를 기록합니다.

```bash
geth --datadir node init genesis.json
```

다음과 같은 결과를 확인할 수 있습니다.

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

4. 검증 노드를 시작하세요.


!!! 주의
    긴급 변경: EIP155가 아닌 트랜잭션(즉, 재생 방지되지 않은 트랜잭션)은 이제 RPC API에 의해 거부됩니다. --rpc.allow-unprotected-txs 명령어 플래그를 사용하여 이 제한을 해제할 수 있습니다.

```bash
## start a verify node
geth --enabletrustprotocol --persistdiff --diffblock 1000000000 --config ./config.toml --datadir ./node --cache 8000 --rpc.allow-unprotected-txs --txlookuplimit 0
```

## 노드 관리

### 피어 탐색
부트스트랩 노드는 빠른 시일 내에 개선될 것입니다. 지금까지 탐색 http 서비스는 동기화를 위해 일부 안정적인 퍼블릭 p2p 피어를 제공해왔습니다. https://api.binance.org/v1/discovery/peers를 방문하여 피어 정보를 확인하세요. 풀노드의 네트워킹 개선을 위해 config.toml의 `StaticNodes`에 피어 정보를 추가할 수 있습니다. 번잡한 네트워킹을 방지하기 위해, 탐색 서비스가 피어 정보를 종종 변경할 것입니다. 연결된 풀노드 피어 수가 너무 적을 경우 새로 가져오기를 시도해보세요.

### 바이너리
모든 클라이언트들은 가장 최신 버전으로 업그레이드 하는 것이 권장됩니다. [최신 버전](https://github.com/bnb-chain/bsc/releases/latest)은 더 안정적이고 성능이 더 높습니다.

### 스토리지
테스트에 따르면 스토리지 크기가 1.5T를 초과하면 전체 노드의 성능이 저하됩니다. 전체 노드는 스토리지를 프루닝하여 항상 가벼운 스토리지를 유지하는 것이 좋습니다.

프루닝하는 법:

1. BSC 노드를 중단합니다.
2. `nohup geth snapshot prune-state --datadir {the data dir of your bsc node} &`를 실행합니다. 완료되기까지 약 3-5 시간이 걸립니다.
3. 끝나면 노드를 중단합니다.

관리자는 항상 몇 개의 백업 노드가 있어야 합니다.

하드웨어도 중요합니다. **SSD가 2TB의 여유 디스크 공간, SSD(Solid-State Drive), gp3, 8k IOPS, 처리량 250MB/S, 읽기 지연 시간 <1ms를 충족하는지 확인하십시오**.

### Diff Sync
diffsync 프로토콜은 릴리스 v1.1.5에서 안정적인 기능으로 출시되었습니다. Diff sync는 테스트 결과 동기 속도가 약 60~70% 향상되었습니다. 모든 전체 노드는 시작 명령에 `--diffsync`를 추가하여 활성화할 것을 권장합니다.  

### 가벼운 스토리지
노드가 충돌하거나 강제로 중지되면 노드는 몇 분 또는 몇 시간 전의 블록에서 동기화됩니다. 이는 메모리의 상태가 데이터베이스에 실시간으로 유지되지 않고 노드가 시작되면 마지막 체크포인트에서 블록을 재생해야 하기 때문입니다. 재생 시간은 config.toml의 `TrieTimeout` 구성에 따라 달라집니다. 노드가 가벼운 스토리지를 유지할 수 있도록 긴 재생 시간을 허용할 수 있다면 올리는 것이 좋습니다.

## Geth 업그레이드하기

[이 지침](upgrade-fullnode.md)을 참고해주세요.
