---
sidebar_label: Geth 업그레이드
hide_table_of_contents: false
sidebar_position: 2
---

# Geth 업그레이드하는 방법

`geth`를 업그레이드하는 법은 너무나 간단합니다. `geth`의 최신 버전을 다운로드받아 설치하고, 노드를 셧다운한 뒤 재시작하면 됩니다. Geth는 자동으로 이전 노드의 데이터를 사용하고, 이전 버전을 셧다운 한 이후로 채굴된 최신 블록과 동기화할 것입니다.

## 1 단계: 새 버전 컴파일 혹은 미리 빌드된 바이너리 다운로드하기

```bash
git clone https://github.com/bnb-chain/bsc
# Enter the folder bsc was cloned into
cd bsc
# Comile and install bsc
make geth
```


## 2 단계: Geth 중단하기

```

$ pid=`ps -ef | grep geth | grep -v grep | awk '{print $2}'`

$ kill  $pid

```


### 3 단계: 재시작하기
:::참고
업그레이드 전 같은 start-up 커맨드를 사용하세요. 이 경우에는 [튜토리얼](./validator/fullnode.md)과 같은 커맨드를 사용합니다. 
:::

```bash
##
./geth --config ./config.toml --datadir ./node --cache 8000 --rpc.allow-unprotected-txs --txlookuplimit 0
```
