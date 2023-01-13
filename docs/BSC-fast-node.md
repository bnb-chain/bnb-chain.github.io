---
sidebar_label:  고속 노드
hide_table_of_contents: false
sidebar_position: 2
---
# BNB 스마트 체인에서 고속 노드 운영하기
**고속 노드는 동기화 시 Trie 데이터를 생성하지 않습니다.
고속 노드가 작동 시, 풀 노드로 전환할 수 있는 방법이 없습니다.
풀 노드로 복구하기 위해서는 스냅샷을 재다운로드 해야 합니다.**

## 패스트 노드의 기능

* 전체 블록체인 기록을 디스크에 저장하고 네트워크의 데이터 요청에 응답할 수 있습니다.
* 새 블록 및 트랜잭션을 수신하고 유효성을 검사합니다.
* 모든 계정의 상태를 확인합니다.

## 고속 노드 권장 요구사항

- 최신 버전의 Mac OS X 또는 Linux를 실행하는 VPS
- **중요** 1TB의 사용 가능한 디스크 공간, SSD(Solid-State Drive), gp3, 8k IOPS, 250MB/S 처리량, 읽기 지연 시간이 1ms 미만다(snap/Fast Sync로 시작하는 경우 NVMe SSD 필요)
- CPU 코어 16개와 메모리(RAM) 64gb
- AWS에서는 m5zn.3xlarge 인스턴스, 구글 클라우드에서는 c2-standard-16 권장
- 초당 5메가바이트의 업로드/다운로드 속도를 제공하는 브로드밴드 인터넷 연결

## 설정

## 고속 노드 실행 단계

### 스냅샷에서 동기화 (권장)

1. [릴리즈 페이지](https://github.com/bnb-chain/bsc/releases/latest)에서 이미 빌드된 바이너리를 다운받거나 아래의 지시를 따릅니다.

```bash
# Linux
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep geth_linux |cut -d\" -f4)
mv geth_linux geth
chmod -v u+x geth

# MacOS
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep geth_mac |cut -d\" -f4)
mv geth_mac geth
chmod -v u+x geth
```

2. config 파일을 다운받습니다.

`genesis.json`와 `config.toml`를 다운로드합니다:

```bash
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep mainnet |cut -d\" -f4)
unzip mainnet.zip
```

3. 스냅샷을 다운받습니다.

  [여기](https://github.com/bnb-chain/bsc-snapshots)에서 최신 스냅샷을 다운받습니다.

  지침을 따라 파일 구조를 설정합니다.

4. 모든 트라이 데이터(trie data)를 프루닝합니다.

고속 노드는 더 이상 트라이 데이터를 필요로 하지 않습니다. 다음 명령어를 사용해 트라이 데이터를 프루닝합니다.
```
./geth snapshot insecure-prune-all --datadir ./node  ./genesis.json
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
mv geth_linux geth
chmod -v u+x geth

# MacOS
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep geth_mac |cut -d\" -f4)
mv geth_mac geth
chmod -v u+x geth
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

3. 로컬 환경에 제네시스 상태를 씁니다.

```bash
geth --datadir node init genesis.json
```

다음과 같은 결과를 볼 수 있습니다:

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

## 스냅샷 검증 없이 고속 노드 시작하기
1. 검증 노드를 사용하여 스냅샷 검증 없이 고속 노드를 시작하세요

```bash
## start a fast node
geth --tries-verify-mode none --config ./config.toml --datadir ./node  --cache 8000 --rpc.allow-unprotected-txs --txlookuplimit 0
```

## 스냅샷 검증과 함께 고속 노드 시작하기
1. config.toml에 verifyNodes 피어를 추가하세요.

```
[Node.P2P]
MaxPeers = 1350
NoDiscovery = false
BootstrapNodes = ["enode://...", "enode://...", ...]
VerifyNodes = ["enode://...", "enode://...", ...]
StaticNodes = ["enode://...", "enode://...", ...]
ListenAddr = ":30311"
EnableMsgEvents = false
```

2. 검증 노드를 사용하여 스냅샷 검증과 함께 고속 노드를 시작하세요.

```bash
## start a fast node
geth --tries-verify-mode full --config ./config.toml --datadir ./node  --cache 8000 --rpc.allow-unprotected-txs --txlookuplimit 0
```

## 노드 관리

### 피어 탐색
부트스트랩 노드들은 근시일 내에 개선될 것입니다. 지금까지 탐색 http 서비스가 동기화를 위해 일부 안정적인 퍼블릭 p2p 피어들을 제공해왔습니다. https://api.binance.org/v1/discovery/peers를 방문하여 피어 정보를 확인하세요. 풀노드의 네트워킹 개선을 위해 config.toml의 `StaticNodes`에 피어 정보를 추가할 수 있습니다. 번잡한 네트워킹을 방지하기 위해, 탐색 서비스가 피어 정보를 종종 변경할 것입니다. 연결된 풀노드 피어 수가 너무 적을 경우 새로 가져오기를 시도해보세요.

### 바이너리
모든 클라이언트들은 가장 최신 버전으로 업그레이드 하는 것이 권장됩니다. [최신 버전](https://github.com/bnb-chain/bsc/releases/latest)은 더 안정적이고 성능이 더 높습니다.

## Geth 업그레이드

[이 가이드](./validator/upgrade-fullnode.md)를 읽어주세요.
