---
sidebar_label: BNB 스마트 체인 아카이브 노드
hide_table_of_contents: false
sidebar_position: 2
---
# BNB 스마트 체인에서 아카이브 노드 운영하기

## 아카이브 노드란?

아카이브 노드는 추가적인 특수 옵션 "--gcmode archive"을 가지고 운영되는 풀노드입니다. 제네시스 블록에서부터 블록체인 전체의 데이터를 저장하고 있습니다. 일부 최신 블록에 모든 상태 변화를 담고 있는 일반적인 풀노드에 비해, 아카이브 노드는 모든 블록에 이를 저장합니다.

## 아카이브 노드가 중요한 이유

개발자들은 풀노드에서 어떤 주소의 잔액을 조회하거나 어떤 스마트 컨트랙트의 상태를 확인하기 위해 최신 블록들을 읽어올 수 밖에 없습니다. 블록체인이 동시에 계속 길어지고 있기 때문에 원하는 모든 것을 얻기 어렵습니다. 하지만 아카이브 노드를 사용하면 특정 시점의 어떤 블록이든 조회할 수 있습니다.
아카이브 노드들은 블록체인에서 다양한 사용 사례가 있습니다. 아래는 그 중 일부입니다:
* 트레이딩 모델 최적화를 위한 자동 트레이딩 시스템은 과거 데이터를 필요로 합니다.
* 검증 모듈은 제 시간에 트랜잭션을 검증하기 위해 상태 정보를 필요로 합니다.
* 분석 툴들은 데이터 분석을 하기 위해 전체 내역 데이터를 필요로 합니다.
* 일부 지갑의 거래소는 신속하고 효율적인 전송을 위해 아카이브 노드를 사용합니다.

## 권장 요구사항

아카이브 노드를 운영하는 데에는 모든 블록과 상태 변화 데이터를 포함하기 때문에 높은 비용이 듭니다. 우선 충분한 용량을 갖춘 디스크를 필요로 합니다. 이 외에도 CPU와 디스크 성능이 최신 블록 높이를 따라잡을 수 있을 정도로 좋아야 합니다.

## BSC 메인넷을 위해 아카이브 노드 운영하는 법

### 1. Geth 클라이언트로 실행하기

#### 1.1 스냅샷을 이용하여 한 세그먼트 아카이브 노드 운영하기
세그먼트 아카이브 노드는 [19000000, latest]와 같이 시작 블록 높이부터 끝 블록 높이까지 모든 데이터를 가지고 있는 노드입니다. 이러한 아카이브 노드를 생성하기 위해서는 19000000 보다 작은 블록 넘버의 스냅샷이 필요합니다.

BNB 체인 공식 문서에서 스냅샷을 받을 수 있습니다:
- [BNB 체인 체인 데이터 스냅샷](https://docs.bnbchain.org/docs/validator/snapshot)
- [BNB Chain Snapshot Repo](https://github.com/binance-chain/bsc-snapshots).

* 노드 실행을 위한 명령어:

```
./geth --config local_config_dir/config.toml --datadir local_data_dir --pprof.addr 0.0.0.0 --rpc.allow-unprotected-txs --rpccorsdomain * --light.serve 50 --cache 5000 --metrics --snapshot=true --rangelimit --gcmode archive --txlookuplimit 0 --syncmode full --pprof
```

#### 1.2 세그먼트 아카이브 노드를 사용하여 하나의 풀 아카이브 노드를 만들기

전체 아카이브 데이터를 단일 Geth 인스턴스에 두는 대신, 각각이 체인의 일부를 담당하는 다수의 세그먼트 인스턴스를 생성하는 것이 권장됩니다. 더 높은 성능을 위해서 각 세그먼트의 크기가 4TB 이하로 유지되는 것이 권장됩니다. 전체(2022년 6월까지) 약 35TB 정도의 데이터가 있을 것으로 예상됩니다. 모든 BSC 스냅샷은 [Free public Binance Smart Chain Archive Snapshot](https://github.com/allada/bsc-archive-snapshot)에서 확인하세요. 소유자가 S3에 모든 BSC 아카이브 스냅샷을 옮겨 두었습니다. 설명한 바 있듯, 이 경로는 공개적이지만 requester-pays로 설정되어 있습니다. 이는 즉, 다운로드를 위해 AWS 계정이 필요하다는 것을 뜻합니다. 모든 세그먼드를 가졌다면, 요청들을 올바른 세그먼트로 파견하기 위한 한 개의 프록시가 필요합니다. 소유자가 감사하게도 프록시 또한 구현했습니다. 빌드를 위해 소유자의 지침을 따르세요.

### 2. Erigon 클라이언트로 실행하기

[Erigon](https://github.com/ledgerwatch/erigon)은 BSC 메인넷을 지원했습니다. Erigon 클라이언트를 사용하여 BSC 아카이브 노드를 실행하는 법은 [Free public Binance Smart Chain Archive Snapshot](https://github.com/allada/bsc-archive-snapshot)에서도 참고할 수 있습니다. 소유자가 최근 BSC 아카이브 노드 사용을 위해 Erigon 클라이언트로 변경했습니다. aws s3의 타르볼인 아카이브 스냅샷을 다운받을 수 있습니다. s3 경로는 "s3://public-blockchain-snapshots/bsc/erigon-latest.tar.zstd"입니다. 이 경로는 공개되어 있지만 requester-pays입니다. 그렇기 때문에 다운 받기 위해서는 AWS 계정이 필요합니다.

* 로컬 디랙토리에 다운로드하기 위한 명령어:

```
aws s3 cp --request-payer=requester  "s3://public-blockchain-snapshots/bsc/erigon-latest.tar.zstd"   local_data_dir

tar --use-compress-program=unzstd -xvf erigon-latest.tar.zstd
```

* 실행을 위한 명령어:

```
./erigon --chain=bsc --datadir  local_data_dir
```

 Erigon 클라이언트에 대해 알려진 문제점 중 하나는 깃헙에도 언급되어 있듯이 최신 블록과 연동이 잘 안된다는 것입니다. 최신 블록에 맞추고 싶다면 NVME와 같은 고성능 디스크를 가진 BSC 아카이브 노드를 실행하거나 Geth 클라이언트와 BSC 풀노드를 동시에 실행하는 것이 권장됩니다. 즉 Erigon에게 블록 높이를 지녔는지 물어보고, 그렇지 않은 경우 Geth 클라이언트에 전달하는 프록시가 하나 필요하다는 말입니다.

## Geth와 Erigon 비교

* **데이터 사이즈**

  현재(2022년 6월)까지는 Geth 클라이언트를 사용한 데이터 사이즈가 35TB 정도이며, Erigon 클라이언트는 6TB로 현저히 작습니다.

* **성숙도**

  Erigon은 생긴지 얼마 되지 않아서 배틀 테스트가 되지 않은 반면, Geth는 오랜 시간 운영되고 있어서 더 안정적입니다. Geth 클라이언트를 지닌 아카이브 노드들은 모든 RPC API를 지원하는데, Erigon 클라이언트는 eth_getProof 등 일부를 지원하지 않습니다.

* **복잡성**

  BSC 아카이브 노드 하나를 운영하는 데에는 Erigon 노드가 Geth 클라이언트보다 간단합니다. 만약 Erigon 아카이브 노드와 Geth 풀노드로 최신 블록을 유지하고 싶을 경우에는 복잡한 정도가 비슷합니다.

각자의 요구사항에 따라 언급된 방법 중 하나로 BSC 아카이브 노드를 운영할 수 있습니다.
