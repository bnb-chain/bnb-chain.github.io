# 테스트넷 합류

!!! Tip
    [노드 바이너리 repo](https://github.com/bnb-chain/node-binary/blob/master/README.md) 를 통해 테스트넷에 관한 정보와 호환되는 바이너리 버전 및 제네시스 파일 세부 사항을 확인하세요.

!!! 경고
    다음 과정을 진행하려면 [bnbchaind](install.md)를 설치해야 합니다.

## 최소 시스템 사양
풀 노드를 실행하기 위해 하드웨어 최소 사양을 만족해야 합니다.

*  최신 맥 OS X, 윈도우, 리눅스 버전이 설치된 데스크탑이나 노트북.
*  최소 읽기/쓰기 속도가 100 MB/s이며, 500GB의 빈 디스크 공간.
* 4 코어 CPU 및 8GB 메모리(RAM).
* 최소 1MB/s 속도를 지닌 광대역 인터넷 접속
* 풀 노드는 24시간 중 최소 4시간 이상 운영해야 비컨 체인 갱신 속도를 따라갈 수 있습니다. 더 운영할 수록 좋으며, 연속적으로 노드를 운영하는 것이 가장 좋습니다.

## 새 노드 설정
> 설치 스크립트를 실행했다면 이 부분은 넘어가셔도 됩니다.

우선 비컨 체인의 홈 폴더를 설정합니다 `$BNCHOME` (i.e. ~/.bnbchaind).
다음을 통해 설정할 수 있습니다:

```
mkdir ~/.bnbchaind
mkdir ~/.bnbchaind/config
```
그리고 `node-binary/fullnode/{network}/{version}/config/`에서 `$BNCHOME/config`로 `app.toml`와 `config.toml`를 다운로드 합니다. 

~/.gaiad/config/config.toml 파일에서 노드 이름을 변경할 수 있습니다:
```toml
# 사람이 읽을 수 있도록 노드 이름 설정
moniker = "<your_custom_moniker>"
```

> 노드 이름은 ASCII 문자만 사용할 수 있습니다. 유니코드 문자를 사용하면 노드에 연결할 수 없게 됩니다. :::


이제 풀 노드가 초기화되었습니다!

## 제네시스 및 시드

### 제네시스 파일 다운로드

테스트넷의 genesis.json 파일을 가져와 노드 바이너리의 config 디랙토리에 저장합니다.

```
cd -p $HOME/.bnbchaind/config
wget https://raw.githubusercontent.com/bnb-chain/node-binary/master/fullnode/testnet/0.6.3-hotfix/config/genesis.json
```

참고로 다운로드 시 최신 버전의 테스트넷 및 제네시스 파일 정보를 지닌 가장 최신 노드 바이너리 repo를 사용합니다.

::: 팁: 제네시스 파일에 대해 이해하고 싶으면, [다음](../../learn/genesis.md)을 클릭하세요. :::

설정이 제대로 작동하는지 확인하려면 다음과 같이 실행하면 됩니다:
```shell
bnbchaind start &
```

만일 풀 노드를 운영할 때 문제가 발생하면, [FAQ 리스트](fullnodeissue.md)를 참고해 주세요.


### 시드 노드 추가
풀 노드는 블록체인 네트워크의 피어를 찾는 방법을 알아야 합니다. 이를 위해 $HOME/.bnbchain/config/config.toml에 활성화된 시드 노드를 추가해야합니다. 추천된 `config.toml`에는 이미 일부 시드에 대한 링크를 포함하고 있습니다.

만일 시드가 작동하지 않는다면, HTTP API 엔드포인트에서 더 많은 시드나 영구 피어들을 찾을 수 있습니다: https://dex.binance.org/api/v1/peers

#### 추가 구성
- 동기화 유형: 기본적으로 새 노드는 `state-sync` 모드로 동기화 됩니다. 동기화 모드를 변경하려면, [다음](./synctypes.md) 문서를 참고하세요.
-로그: 로그 파일은 `bnbchaind` 생성 시 구체화 한 `home`아래 있습니다.
  가장 최신 로그 파일은 `bnc.log`이며 새로운 로그 파일은 1시간마다 생성됩니다.
  로그 파일을 저장하기 위한 충분한 디스크 공간을 확보하기 위해서는 로그 저장소를 `$BNCHOME/config/app.toml`의 `logFileRoot` 옵션에서 로그 위치를 변경하는 것이 좋습니다.
- 서비스 포트: 기본적으로 RPC 서비스는 `27147` 포트를 수신하며 P2P 서비스는 `27146`포트를 수신합니다.
  풀 노드를 실행하기 전에 두 포트가 열려 있는지 확인해야 합니다. 그렇지 않을 경우 풀 노드는 다른 포트를 통해 데이터를 수신해야 합니다.
- 저장: 모든 상태와 블록 데이터는 `$BNCHOME/data`에 저장됩니다. 다음 파일들을 삭제하거나 편집하지 마세요.

## 풀 노드에 관한 추가 정보

풀 노드를 실행하고 있으면, 로컬 파일에 추가 메세지를 작성할 수 있습니다.

##### 동기화 과정 조회

상태 동기화 진행 여부는 `curl localhost:27147/status`가 여러 번 진행될 때 `latest_block_height` 값이 함께 증가하는지 확인하면 됩니다.

```
"sync_info": {
  ...
  "latest_block_height": "878092",
  "latest_block_time": "2019-04-15T00:01:22.610803768Z",
  ...
}
```

## 프로메테우스 메트릭

프로메테우스(Prometheus)는 기본적으로 포트 `28660`에 활성화 되어 있으며, 엔드포인트는 `/metrics`입니다.

## 메인넷 도구

* [탐색기](https://explorer.binance.org/)


## 테스트넷 도구

* [탐색기](https://testnet-explorer.binance.org/)