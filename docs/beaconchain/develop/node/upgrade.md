# 업그레이드

[비컨 체인 텔레그램 공지 체널](https://t.me/Binance_DEX_Announcement)을 팔로우하거나 포럼에 접속하여 다가오는 업그레이드에 관한 최신 소식을 확인하세요.

## 풀 노드 업그레이드

대부분의 비컨 체인 업그레이드는 하트 포크를 통해 이뤄집니다. 따라서 하드포크 블록 높이 전까지 업그레이드를 맞춰야합니다.

1. 만일 업그레이드가 이미 네트워크가 동기화가 되었다면, 새로운 바이너리를 다운 받아 이전 버전을 교체하세요.
2. 홈 폴더에 있는 config.toml과 app.toml를 최신 버전으로 교체해주세요. 사용자는 매개 변수를 정의할 수 있습니다.
3. bnbchaind 과정을 멈추고 새로운 파일로 재시작 해주세요.
```
bnbchaind start --home <home-path>
```

## 업그레이드를 잊은 경우

비컨 체인에서 하드 포크 업그레이드가 있었는데 풀 노드를 최신 버전으로 업그레이드 하지 못한 경우, `bnbchaind` 절차는 새로운 버전으로 재시작 해도 멈추고, 다음과 같은 오류가 발생합니다:
```
panic: Tendermint state.AppHash does not match AppHash after replay. Got , expected 393887B67F69B19CAB5C48FB87B4966018ABA893FB3FFD241C0A94D2C8668DD2
goroutine 1 [running]:
github.com/binance-chain/node/vendor/github.com/tendermint/tendermint/consensus.checkAppHash(0xa, 0x0, 0xc000bd8c56, 0x6, 0xc000b247c0, 0x12, 0x14e7bf9, 0x8592eb, 0xc000b247e0, 0x20, ...)
/Users/huangsuyu/go/src/github.com/binance-chain/node/vendor/github.com/tendermint/tendermint/consensus/replay.go:464 +0x213
github.com/binance-chain/node/vendor/github.com/tendermint/tendermint/consensus.(*Handshaker).ReplayBlocks(0xc000b37980, 0xa, 0x0, 0xc000bd8c56, 0x6, 0xc000b247c0, 0x12, 0x14e7bf9, 0x8592eb, 0xc000b247e0, ...)
```

다음과 같은 `상태` 충돌 에러를 해결하려면:

* 홈 디렉토리를 백업합니다, (기본 디렉토리: ~/.bnbchaind)

* 툴을 다운로드합니다: [상태-복원](https://github.com/bnb-chain/node-binary/tree/master/tools/recover)

* 업그레이드의 높이를 받습니다. 업그레이드 높이는 포럼에 업그레이드 공지에 발표될 것입니다. 예를 들어, 포럼에 5000 이라고 발표되면 명령어를 통해 업그레이드 블록 전인 4999까지 복원합니다:
```
./state_recover 4999 <your_home_path>
```

* 최신 버전의 `bnbchaind`를 재시작합니다

```
bnbchaind start &
```