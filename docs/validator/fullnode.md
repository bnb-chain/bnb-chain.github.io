---
sidebar_label: BNB 스마트 체인 풀 노드
hide_table_of_contents: false
sidebar_position: 2
---
# BNB 스마트 체인에서 풀노드 실행하기

## 풀노드 기능

* 전체 블록체인 기록을 디스크에 저장하고 네트워크의 데이터 요청에 응답할 수 있습니다.
* 새 블록 및 트랜잭션을 수신하고 유효성을 검사합니다.
* 모든 계정의 상태를 확인합니다.

## 지원되는 플랫폼

`Mac OS X`와 `Linux`에서 풀노드 실행을 지원합니다.

## 권장 요구사항

### 풀노드
- 최신 버전의 Mac OS X 또는 Linux를 실행하는 VPS
- **중요** 2TB의 사용 가능한 Disk 공간, 솔리드 스테이트 드라이브(SSD), gp3, 8k IOPS, 250MB/S 처리량, 읽기 지연 시간 1ms 미만(snap/fast sync로 시작하는 경우 NVMe SSD 필요)
- CPU 코어 16개, 메모리(RAM) 64 기가바이트
- AWS에서는 m5zn.3xlarge 인스턴스 타입, 구글 클라우드에서는 c2-standard-16 권장
- 초당 5 메가바이트의 업로드/다운로드 속도를 제공하는 광대역 인터넷 연결

### 검증인
- 최신 버전의 Mac OS X 또는 Linux를 실행하는 VPS
- **중요** 2TB의 사용 가능한 디스크 공간, 솔리드 스테이트 드라이브(SSD), gp3, 8k IOPS, 250MB/S 처리량, 읽기 지연 시간 1ms 미만
- CPU 코어 16개, 메모리(RAM) 64 기가바이트
- AWS에서는 m5zn.3xlarge 인스턴스 타입, 구글 클라우드에서는 c2-standard-16 권장
- 초당 10메가바이트의 업로드/다운로드 속도를 제공하는 광대역 인터넷 연결


## 설정

### 연결과 관련된 일반적인 문제

때때로 동기화될 수 없습니다. 가장 일반적인 이유는 다음과 같습니다.

* 검색 프로토콜 없이 `geth`를 시작했으므로 `--nodiscover` 매개 변수를 `False`로 설정할 수 있습니다. 고정 노드가 있는 풀노드를 실행하는 경우에만 이 옵션을 선택합니다.

- `BootstrapNodes` 업데이트

```
BootstrapNodes = ["enode://1cc4534b14cfe351ab740a1418ab944a234ca2f702915eadb7e558a02010cb7c5a8c295a3b56bcefa7701c07752acd5539cb13df2aab8ae2d98934d712611443@52.71.43.172:30311","enode://28b1d16562dac280dacaaf45d54516b85bc6c994252a9825c5cc4e080d3e53446d05f63ba495ea7d44d6c316b54cd92b245c5c328c37da24605c4a93a0d099c4@34.246.65.14:30311","enode://5a7b996048d1b0a07683a949662c87c09b55247ce774aeee10bb886892e586e3c604564393292e38ef43c023ee9981e1f8b335766ec4f0f256e57f8640b079d5@35.73.137.11:30311"]
```

- `Static nodes` 추가하기

항상 연결하고 싶은 특정 피어가 있는 경우 Geth는 정적 노드라는 기능 또한 지원합니다. 정적 노드들은 연결 해제되었을 때 다시 연결됩니다. 다음의 내용을 `<datadir>/geth/static-nodes.json`에 추가함으로써 영구적 정적 노드를 설정할 수 있습니다.

```
[
  "enode://pubkey@ip:port",
  "enode://cfc556867894dc84707c2ce6290740d6ba112b279217e6db420f215397492a91ef76bbfe18ebd349a09b37fc8bfef5740d2d2335838e063094d5b63c3fd20d8f@34.197.85.99:30311",
  "enode://7cf68af17a83f925f34eeced2a139b1d11bac03fd2635707e459a821965b5e6016021a43379f24dc428ebcb84b8fb377517dee6ae484cd276a2f9360dac9c183@52.86.7.102:30311",
  "enode://b2ed83944f4c0e18d6b2f5f6c2e86b0320c10b8a96f897a535b43f25dc625ae739f449765ad86f38a393472638fcef69f30d7af53b02c3545722b1dd6f18f606@34.194.252.9:30311",
  "enode://42deadff5ff5d97ea4245128952335969fafea6c4ddd05146b3cac125099e1b2d1ea42c8d02c11ee8b5272a75d4f4b9f51a99244fd6daf1c6a1d5017242a3d43@101.36.120.67:30311",
  "enode://905f585c09b8eed66afdf8a99acdab7487185357f33d5c9fe40332e4aa4a661382b159ffb300b20fbc12e81505505944ac3bfc7e6673b352d01e09f2df8af5bc@152.32.131.34:30311",
  "enode://e585bafb7ab5a187534d69e84531165e5d4b0ee4f76b21641fe778c53770cd72e1850d44b48ad00c08ca4dc860cd5c5afa04b23a5061303f61d2658b1c48b9b2@152.32.132.171:30311",
  "enode://8fb5dd1259e0672efb8c141434bf0c24c73b338f7c2da15efc2def7403b952d453814230eeb97f555aaed46ee0b0b6e2a8568b518f88bd328729031746114dd2@3.0.236.154:30311",
  "enode://8fb5dd1259e0672efb8c141434bf0c24c73b338f7c2da15efc2def7403b952d453814230eeb97f555aaed46ee0b0b6e2a8568b518f88bd328729031746114dd2@3.0.236.154:30311"
]
```

admin.addPeer()를 사용하여 js 콘솔을 통해 런타임에 정적 노드를 추가할 수도 있습니다.

```
admin.addPeer( "enode://8fb5dd1259e0672efb8c141434bf0c24c73b338f7c2da15efc2def7403b952d453814230eeb97f555aaed46ee0b0b6e2a8568b518f88bd328729031746114dd2@3.0.236.154:30311"
)
```

- `Trusted nodes` 추가하기

Geth는 피어 제한에 도달하더라도 항상 재연결하도록 허용한 신뢰 노드를 지원합니다. config 파일 `<datadir>/geth/trusted-nodes.json`으로 영구적으로 추가하거나, RPC 호출을 통해 일시적으로 연결할 수 있습니다.

## 체인데이터 스냅샷

체인데이터 [스냅샷](./snapshot)을 다운로드하고 홈 폴더에서 압축을 풀어 속도를 높여주세요

```
## Extract the data
unzip geth.zip -d /NAME_OF_YOUR_HOME/node &
```

### 동기화 모드

* 빠른 동기화 (Fast Sync)

**기본** 동기화 모드입니다. 빠른 동기화를 수행하여 전체 노드를 동기화 합니다. 이는 상태 데이터베이스 전체를 다운로드하고, 헤더를 우선적으로 요청하여 블록 내용과 결과를 나중에 불러오는 것을 통해 구현합니다. 빠른 동기화가 BNB 스마트 체인 네트워크의 최상의 블록에 도달하면, 전체 동기화 모드로 변경됩니다.

* 전체 동기화 (Full Sync)

제네시스 블록부터 모든 블록과 트랜잭션을 검증하여 전체 노드를 동기화합니다. 이 모드는 빠른 동기화보단 느리지만 보안이 강화됩니다.


## 풀노드 운영하는 방법

### 스냅샷에서 동기화 (권장)

1. [릴리즈 페이지](https://github.com/bnb-chain/bsc/releases/latest)에서 이미 빌드된 바이너리를 다운받거나 아래의 지시를 따릅니다.

```bash
# Linux
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep geth_linux |cut -d\" -f4)
mv geth_linux geth

# MacOS
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep geth_mac |cut -d\" -f4)
mv geth_mac geth
```

2. config 파일을 다운받습니다.

`genesis.json`와 `config.toml`를 다운로드합니다:

```bash
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep mainnet |cut -d\" -f4)
unzip mainnet.zip
```

3. 스냅샷을 다운받습니다.

 [여기](https://github.com/bnb-chain/bsc-snapshots)에서 최신 스냅샷을 다운받습니다. 지침을 따라 파일 구조를 설정합니다.

:::참고
`--datadir` 플래그가 추출된 체인 데이터 폴더 경로를 가리켜야 합니다.flag should point to the extracted chaindata folder path
:::


4. 풀노드를 시작합니다.
```
./geth --config ./config.toml --datadir ./node  --cache 8000 --rpc.allow-unprotected-txs --txlookuplimit 0

## It is recommand to run fullnode with `--tries-verify-mode none` if you want high performance and care little about state consistency
./geth --config ./config.toml --datadir ./node  --cache 8000 --rpc.allow-unprotected-txs --txlookuplimit 0 --tries-verify-mode none
```

주의: 로컬에서 설치한 geth가 아닌 위에서 wget로 다운받은 geth 버전을 사용하세요. 로컬의 버전은 틀릴 수 있습니다.

### 제네시스 블록 동기화 (비권장)

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

4.풀노드 시작하기


!!! 주의
    급작스러운 변경: 비 EIP155 트랜잭션들(i.e. 리플레이 보호가 안 된 트랜잭션)은 이제 RPC API에 의해 거절 당합니다. 이러한 제안을 --rpc.allow-unprotected-txs 명령어 플래그를 사용하여 해제할 수 있습니다.

```bash
## start a full node
geth --config ./config.toml --datadir ./node  --cache 8000 --rpc.allow-unprotected-txs --txlookuplimit 0
```


검증인 노드를 시작하세요.

```bash
## generate the consensus key and input the password
geth account new --datadir ./node
echo {your-password} > password.txt
geth --config ./config.toml --datadir ./node --syncmode snap -unlock {your-validator-address} --password password.txt  --mine  --allow-insecure-unlock  --cache 8000
```

!!! 주의
	config.toml 내 `TrieTimeout`의 기본값이 크기 때문에, `geth`는 이 시간 임계치에 도달할 때까지 상태를 데이터베이스에 유지하지 않을 것입니다. 노드가 강제로 셧다운되면 최신 상태부터 동기화를 시작할 것인데, 이는 오랜 시간이 걸립니다. 검증인들을 위한 권장 설정은 `TrieTimeout = 100000000000`입니다.

5. 노드 상태 관찰하기

기본적으로 `/node/bsc.log`에서 노드 로그를 관찰할 수 있습니다.

## 노드 관리

### 피어 탐색
부트스트랩 노드들은 근시일 내에 개선될 것입니다. 지금까지 탐색 http 서비스가 동기화를 위해 일부 안정적인 퍼블릭 p2p 피어들을 제공해왔습니다. https://api.binance.org/v1/discovery/peers를 방문하여 피어 정보를 확인하세요. 풀노드의 네트워킹 개선을 위해 config.toml의 `StaticNodes`에 피어 정보를 추가할 수 있습니다. 번잡한 네트워킹을 방지하기 위해, 탐색 서비스가 피어 정보를 종종 변경할 것입니다. 연결된 풀노드 피어 수가 너무 적을 경우 새로 가져오기를 시도해보세요.

### 바이너리
모든 클라이언트들은 가장 최신 버전으로 업그레이드 하는 것이 권장됩니다. [최신 버전](https://github.com/bnb-chain/bsc/releases/latest)은 더 안정적이고 성능이 더 높습니다.

### 스토리지
테스트에 따르면 스토리지 크기가 1.5T를 초과하면 전체 노드의 성능이 저하됩니다. 전체 노드는 스토리지를 프루닝(pruning)하여 항상 가벼운 스토리지를 유지하는 것이 좋습니다.

프루닝하는 법:

1. BSC 노드를 중단합니다.
2. `nohup geth snapshot prune-state --datadir {the data dir of your bsc node} &`를 실행합니다. 완료되기까지 약 3-5 시간이 걸립니다.
3. 끝나면 노드를 중단합니다.

관리자는 항상 몇 개의 백업 노드가 있어야 합니다.

하드웨어도 중요합니다. **SSD가 2TB의 여유 디스크 공간, SSD(Solid-State Drive), gp3, 8k IOPS, 처리량 250MB/S, 읽기 지연 시간 <1ms를 충족하는지 확인하십시오**.

### Diff 동기화
diffsync 프로토콜은 릴리스 v1.1.5에서 안정적인 기능으로 출시되었습니다. Diff 동기화는 테스트 결과 동기 속도가 약 60~70% 향상되었습니다. 모든 전체 노드는 시작 명령에 `--diffsync`를 추가하여 활성화할 것을 권장합니다.  

### 가벼운 스토리지
노드가 충돌하거나 강제로 중지되면 노드는 몇 분 또는 몇 시간 전의 블록에서 동기화됩니다. 이는 메모리의 상태가 데이터베이스에 실시간으로 유지되지 않고 노드가 시작되면 마지막 체크포인트에서 블록을 재생해야 하기 때문입니다. 재생 시간은 config.toml의 'TrieTimeout' 구성에 따라 달라집니다. 노드가 가벼운 스토리지를 유지할 수 있도록 긴 재생 시간을 허용할 수 있다면 올리는 것이 좋습니다.

## Geth 업그레이드

[이 가이드](./upgrade-fullnode.md)를 참고하세요.

