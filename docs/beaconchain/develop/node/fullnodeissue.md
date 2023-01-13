# 풀 노드 실행 시 일반적인 문제

### 풀 노드 동기화 절차 조회 하는 법

* 풀 노드의 현재 높이는 `localhost:26657/status`에서 확인 가능합니다
* $BNCHOME 아래 있는 log에서 로그 정보 확인이 가능합니다.<br/>
다음을 통해 결과를 조회하세요:
```
tail -f $BNCHOME/bnc.log
```
### 일반 문제

만일 풀 노드를 처음부터 돌린다면 다음과 같은 문제가 발생할 확률이 높습니다:

#### AppHash 충돌

* 에러 로그
```
panic: Tendermint state.AppHash does not match AppHash after replay. Got XXXXXXX, expected 251DF08F2BA7824F0875D33992CF03EA35106DDD34B3A9FE4EFA0B73CDD2FE14
```
다음 에러는 합의 문제로 발생하여 bnbchaind가 panic 상태일 것입니다.

* 해결책

이 문제를 해결하려면, 우선 맞는 `genesis file`, `config.toml`과 `app.toml` 파일을 다운 받았는지 확인해 보세요.<br/>
만일 제네시스 파일을 대체했다면, 노드 초기화가 필요합니다.<br/>
노드를 초기화 하려면:
```
rm $BNCHOME/data

rm $BNCHOME/config/priv_validator_key.json
```
를 실행 후 다시 시작하세요.

#### 피어 연결 에러

* 에러 로그:
```
E[2019-04-17|23:52:24.069] Connection failed @ recvRoutine (reading byte) module=p2p peer=[aea74b16d28d06cbfbb1179c177e8cd71315cce4@54.64.99.130:27146](http://aea74b16d28d06cbfbb1179c177e8cd71315cce4@54.64.99.130:27146)conn=MConn{[52.199.237.19:27146](http://52.199.237.19:27146)} err=EOF
E[2019-04-17|23:52:24.070] Stopping peer for error module=p2p peer=&quot;Peer{MConn{[52.199.237.19:27146](http://52.199.237.19:27146)} aea74b16d28d06cbfbb1179c177e8cd71315cce4 out}&quot; err=EOF
```

다음 에러는 두 피어 간의 handshake 오류로 발생합니다.

* 해결책

이 문제를 해결하려면, node_key.json이 `$BNCHOME/config`에 존재하는지 확인해야합니다. 파일이 존재하면 자동으로 노드들이 재접속을 시도하여, 문제가 지속되지 않을 것입니다.

#### 연결 시간 초과

* 에러 로그
```
Dialing failed module=pex addr=2c1fa9c1698961da38d8cd50da9fe8b4bc433c50@34.202.245.91:26856 err=&quot;dial tcp 34.202.245.91:26856: i/o timeout&quot; attempts=3
```

* 해결책

인터넷 연결이 안정적으로 이뤄지고 있는 확인하십시오.

#### 메모리 초과

* 에러 로그
```
fatal error: out of memory
```

* 해결책

기기가 `8 GB 이상 메모리`가 없을 경우 상태 동기화 시 DB 복원을 다룰 수 없습니다.

#### 리셋 후 priv_validator_state.json 없음

* 에러 로그
```
open /Users/.bnbchaind/data/priv_validator_state.json: no such file or directory
```
* 해결책

`priv_validator_state.json`, `node_key.json` 파일과 `data` 폴더를 삭제하여 풀 노드를 리셋합니다.

#### `열린 파일이 너무 많아 bnbchaind`가 충돌하였습니다.

리눅스가 프로세스 당 열 수 있는 파일 수는 `1024`개 입니다.<br/>
`bnbchaind`은 `1024`보다 더 많이 여는 경우가 많습니다.<br/>
따라서 프로세스에서 충돌이 발생합니다.<br/>

`ulimit -n 65535`를 실행하여(열 수 있는 파일 수 증가) 빠르게 고친 후 프로세스를 재시작합니다:
```
bnbchaind start
```

열린 파일의 개수를 확인합니다:
```
ulimit -a
core file size          (blocks, -c) 0
data seg size           (kbytes, -d) unlimited
scheduling priority             (-e) 0
file size               (blocks, -f) unlimited
pending signals                 (-i) 3829
max locked memory       (kbytes, -l) 64
max memory size         (kbytes, -m) unlimited
open files                      (-n) 65535
pipe size            (512 bytes, -p) 8
POSIX message queues     (bytes, -q) 819200
real-time priority              (-r) 0
stack size              (kbytes, -s) 8192
cpu time               (seconds, -t) unlimited
max user processes              (-u) 3829
virtual memory          (kbytes, -v) unlimited
file locks                      (-x) unlimited
```
참고로 실행 파일들은 다릅니다.


#### 업그레이드를 잊음

비컨 체인에 하드포크 업그레이드가 존재하는데 풀노드를 최신 버전으로 업그레이드 하지 않았을 시, `bnbchaind` 프로세스가 중지되고 최신 버전으로 재시작 해도 다음과 같은 에러가 발생할 것입니다:

```
panic: Tendermint state.AppHash does not match AppHash after replay. Got , expected 393887B67F69B19CAB5C48FB87B4966018ABA893FB3FFD241C0A94D2C8668DD2
goroutine 1 [running]:
github.com/binance-chain/node/vendor/github.com/tendermint/tendermint/consensus.checkAppHash(0xa, 0x0, 0xc000bd8c56, 0x6, 0xc000b247c0, 0x12, 0x14e7bf9, 0x8592eb, 0xc000b247e0, 0x20, ...)
/Users/huangsuyu/go/src/github.com/binance-chain/node/vendor/github.com/tendermint/tendermint/consensus/replay.go:464 +0x213
github.com/binance-chain/node/vendor/github.com/tendermint/tendermint/consensus.(*Handshaker).ReplayBlocks(0xc000b37980, 0xa, 0x0, 0xc000bd8c56, 0x6, 0xc000b247c0, 0x12, 0x14e7bf9, 0x8592eb, 0xc000b247e0, ...)
```

`상태` 충돌 에러를 해결하기 위해:

* 홈 디랙토리를 백업합니다 (기본 디렉토리 ~/.bnbchaind)

* 툴 다운로드: [상태-복원](https://github.com/bnb-chain/node-binary/tree/master/tools/recover)

* 업그레이드의 높이를 받습니다. 업그레이드 높이는 포럼에 업그레이드 공지에 발표될 것입니다. 예를 들어, 포럼에 5000 이라고 발표되면 명령어를 통해 업그레이드 블록 전인 4999까지 복원합니다:
```
./state_recover 4999 <your_home_path>
```

* 최신 버전의 `bnbchaind`를 재시작합니다

```
bnbchaind start &
```

#### `bnbchaind` 가 비정상적으로 종료되었습니다

`bnbchaind` 프로세스를 정상적으로 종료하지 않은 상태로 다시 시작할 때 다음과 같은 에러가 발생합니다:
```
panic: ERROR:
Codespace: 5
Code: 9
Message: "Initial ProposalID already set"
```
해결하려면, 노드를 리셋하고 재시작 해야 합니다:
```
bnbchaind unsafe-reset-all --home<your-home-dir>
```

#### `bnbchaind`를 시작할 수 없습니다

바이너리를 완전히 다운로드 하지 않으면, 다음과 같은 메세지가 발생합니다:
```
./bnbchaind: line 1: version: command not found ./bnbchaind: line 2: oid: command not found /Library/Developer/CommandLineTools/usr/bin/size: 45160816 No such file or directory
```

모든 바이너리는 `git lfs`에 저장되므로, 바이너리가 완전하지 않으면 다음과 같은 에러가 발생합니다. 다음 [스크립트](https://github.com/bnb-chain/node-binary/blob/master/install.sh)를 통해 바이너리를 다운로드 하거나 `git lfs clone`을 사용하세요.

#### 특정 블록을 쿼리할 수 없습니다

노드가 실행되면, 해당 노드에게 정보를 쿼리할 수 있습니다. 하지만 요청된 정보를 가져오지 못하는 경우가 존재할 수 있습니다. 예를 들어:
```
curl 'localhost:27147/block?height=10'
```

라고 뜨는 경우는 노드가 상태 동기화(state-sync)를 사용하기 때문에 스냅샷 높이 이전 블록들이 존재하지 않습니다. 해당 노드에는 스냅샷 이후 높이의 블록들만 쿼리가 가능합니다.
기존 블록들의 쿼리가 가능하려면 빠른 동기화(fast-sync)를 사용해야 합니다.
