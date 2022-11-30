---
sidebar_label: Download Blockchain Snapshot
sidebar_position: 2
hide_table_of_contents: false
---

# 체인데이터 스냅샷

[여기](https://github.com/bnb-chain/bsc-snapshots)에서 최신 체인데이터 스냅샷 정보를 확인할 수 있습니다.

### For v1.1.0:

* [최신 스냅샷](https://github.com/bnb-chain/bsc-snapshots)

* [2021-05-15 스냅샷](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/geth-20210515.zip?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1623905351&Signature=w1hPMeDxB68aJ2qUM74YbUufCPo%3D) (size 220GB)

checksum: 39e311c37a9844b4dd7fb218553cc99f

* [2021-05-13 스냅샷](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/geth-20210513.zip?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1623567762&Signature=1SJt28tOgUCBdOg4Z7BcK0RkjpE%3D)(Size: 203G)

* [2021-05-02 스냅샷](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/geth.zip?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1646568179&Signature=DaVl4clXyVS%2F65GEUHTqWOfD2DA%3D) (Size: 175G)

### For v1.0.7:

* [2021-04-15 스냅샷](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/chaindata-2021-04-15.zip?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1644459350&Signature=a4vfmga8%2BRwNZl3boisIMEdSWbA%3D) (271 GB, md5sum 3ace16d3e2a52100025da387c73861a3f00de833)

* [2021-04-17  스냅샷](https://binance-smart-chain-snapshot.s3.amazonaws.com/snap.tar.gz ) (260 GB, md5sum dd68c7fddaba42997eda013535a572cb)


3월 스냅샷:  [download](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/chaindata_202103.zip?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1641450253&Signature=hOC8I8HSpCOytlYMVQwKRc5oUaI%3D) (146 GB, md5sum 74ada3bcd6a9d0f101501919f6cc8a534e9d796e)

2월 스냅샷: [download](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/chaindata_202102.zip?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1640142393&Signature=aIiUN%2BJLmFKXkAAc%2BE6xHCW3b14%3D) (87.4 GB, md5sum 6611dedde095ba9b72b50ebf6c35a8d7)


아래 명령어들은 크게 두 가지 상황에서 사용될 수 있는 BSC 노드 운영자들을 위한 단계별 지침입니다:

1. 중단되거나 멈춘 노드를 고치기
2. 새로운 검증인 노드를 시작시키기, 몇 시간 동안 동기화를 기다리지 않기

간단히 말 하자면, 최신의 "좋은" 체인데이터의 압축 버전을 다운 받는 것입니다. 노드의 이전 데이터를 제거하고 새로 다운로드받은 데이터로 업데이트합니다. 마지막으로, 이 검증된 체크포인트부터 동기화 프로세스를 재개합니다.


주의: zip 파일과 압축되지 않은 내용 모두를 위한 디스크 공간이 충분한지 확인해주세요. 공간을 두 배 또는 그 이상으로 늘리세요.

wget을 사용하여 CLI로부터 3월 스냅샷 다운로드하기

```
wget --no-check-certificate --no-proxy 'https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/chaindata_202103.zip?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1641450253&Signature=hOC8I8HSpCOytlYMVQwKRc5oUaI%3D'
```

> 팁: 배경의 데이터를 추출합니다

추출 작업이 끝날 때 까지 기다릴 수 없는 경우, 배경에서 실행시키고 있을 수 있습니다

```
# Extract the data
nohup unzip  /NAME_OF_YOUR_HOME/node/geth/ -f chaindata_202102.zip &
# Start your node back
geth --config ./config.toml --datadir ./node --syncmode snap
```
