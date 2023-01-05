# 바이너리 설치

이 가이드는 서버에 `bnbchaind`와 `bnbcli` 두 바이너리를 설치하는 방법에 관해 다룹니다. 바이너리를 서버에 설치하면, 메인넷과 테스트넷에 풀 노드로서 참여할 수 있습니다. 비컨 체인의 풀 노드는 다른 노드에서 트랜잭션을 받고 바이낸스 네트워크 코어에 전파하는 역할을 합니다.

## 지원 플랫폼
`맥 OS`, `윈도우` 및 `리눅스`에서 풀 노드를 실행할 수 있습니다.

### 옵션 1: 설치 스크립트

BNB 커뮤니티에서 관리하는 체인 디렉토리 설정이 가능한 설치 스크립트가 존재합니다(`install.sh`). 다음과 같은 기본값이 사용됩니다:

- `~/.bnbchaind`에 홈 폴더 존재
- 클라이언트 실행 파일(`lightd`, `bnbchaind` 등)이 `/usr/local/bin`에 저장

# Windows
wget   $(curl -s https://api.github.com/repos/bnb-chain/node/releases/latest |grep browser_ |grep windows_binary |cut -d\" -f4)
unzip windows_binary.zip
```
# 한 줄 설치
sh <(wget -qO- https://raw.githubusercontent.com/bnb-chain/node-binary/master/install.sh)
```
다음 스크립트는 `bnbchain`, `bnbcli`와 `tbnbcli` 바이너리를 설치합니다. 모든 것이 정상임을 확인하십시오:
```shell
$ bnbchaind version
$ bnbcli version
```
### 옵션 2: 수동 설치

현재 컴파일된 `node-binaries`의 버전들을 저장하기 위해 다음 repo를 사용합니다.

1. Git LFS 설치

Git LFS(Large File Storage)는 오디오 파일이나, 비디오, 데이터셋, 그래픽 등 용량이 큰 파일을 문자 포인터로 변경한 후 파일을 GitHub.com이나 GitHub Enterprise처럼 별도에 서버에 저장합니다.

https://git-lfs.github.com/ 에 들어가서 `git lfs`를 설치하세요.

2. Git LFS로 바이너리 다운로드:

```
Then you will get binaries in ./build/ folder.

2. Copy the executables (i.e.bnbchaind or bnbcli) to /usr/local/bin
3. Verify that everything is OK:
```shell
$ bnbchaind version
$ bnbcli version
```

[changelog](https://github.com/bnb-chain/node-binary/blob/master/fullnode/Changelog.md)에 가서 최신 풀 노드 버전을 확인하세요.

합류하고 싶은 네트워크의 디렉토리로 들어가세요

1. 다음 명령어를 통해 `network` 변수를 `testnet`이나 `prod`로 변경하세요:

```
cd node-binary/fullnode/{network}/{version}
```
4. bnbchaind나 bnbcli 같은 실행파일을 /usr/local/bin에 복사합니다

## 다음
이제 [메인넷](join-mainnet.md)에 합류하거나, 공개 테스트넷이나 자체 테스트넷을 만들 수 있습니다.
