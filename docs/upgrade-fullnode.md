# Geth(풀 노드) 업그레이드 하는 법

`geth` 업데이트는 매우 쉽습니다. 단순히 최신 버전의 `geth`를 다운로드하고 설치하면 되는데, 기존 노드를 종료하고 새로운 소프트웨어와 함꼐 시작합니다. `geth`는 기존 노드의 데이터를 불러옴과 동시에 종료 이후에 채굴된 블록들까지 동기화합니다.

## Step 1: 새 버전을 컴파일

```bash
git clone https://github.com/bnb-chain/bsc
# bsc가 복제된 폴더에 들어갑니다
cd bsc
# bsc를 컴파일하고 설치합니다
make geth
```


## Step 2: Geth 중지

```

$ pid=`ps -ef | grep geth | grep -v grep | awk '{print $2}'`

$ kill  $pid

```


## Step 3: 재시작



```bash
##  풀 노드 시작
geth --config ./config.toml --datadir ./node --syncmode snap
```