# 라이트 클라이언트 실행하여 비컨 체인 참여하기

라이트 클라이언트는 풀 노드에 연결되어 사용자들이 블록체인 전체를 동기화 할 필요 없이 안전하고 분산화 된 방식으로 비컨 체인에 접속하거나 상호작용하는 것을 돕는 프로그램입니다.

## 라이트 클라이언트 대 풀 노드

- 라이트 클라이언트는 블록이나 상태를 저장하지 않아서, 저장 공간이 적게 필요합니다 (50MB면 충분합니다).
- 라이트 클라이언트는 p2p 네트워크에 접속하지 않아 통신하지 않을 때는 네트워크 비용이 발생하지 않습니다. 네트워크 처리 시간은 라이트 클라이언트가 동시에 처리하는 요청 수에 따라 달라집니다.
- 라이트 클라이언트는 체인의 상태를 재생하지 않아서 통신하지 않을 때는 CPU 비용이 들지 않습니다. CPU 비용은 동시에 처리하는 요청 수에 따라 달라집니다.
- 라이트 클라이언트는 몇 달 간 코어 네트워크와 접속을 안했어도 풀 노드보다 빠릅니다. 코어 네트워크를 따라잡으려면 몇 초만 기다리면 됩니다.

## 플랫폼과 시스템 요구 사항

### 플랫폼

We support running light client node on `Mac OS X`, `Windows` and `Linux`.<br/>
라이트 클라이언트는 곧 오픈 소스가 될 것이며, 이후 라이트 클라이언트 바이너리를 크로스 컴파일하여 다른 플랫폼에서 실행할 수 있을 것입니다.

### 요구 사항
- 50 MB 빈 디스크 공간
- 2 CPU 코어 및 50 MB 메모리 (RAM).

## 라이트 클라이언트 노드 실행하기

다운로드:
```bash
git clone https://github.com/bnb-chain/node-binary.git
```

접속하고 싶은 네트워크에 맞게 디렉토리에 접속하세요<br/>
다음 명령어에서 `network` 변수를 `testnet`이나 `prod`로 교체하세요:

```bash
cd node-binary/lightd/{network}/{version}
```

Help 정보:

```
./lightd --help
This node will run a secure proxy to a binance rpc server.

All calls that can be tracked back to a block header by a proof
will be verified before passing them back to the caller. Other that
that it will present the same interface as a full binance node,
just with added trust and running locally.

Usage:
  lite [flags]

Flags:
      --cache-size int             Specify the memory trust store cache size (default 10)
      --chain-id string            Specify the Beacon Chain  ID (default "bnbchain")
  -h, --help                       help for lite
      --home-dir string            Specify the home directory (default ".binance-lite")
      --laddr string               Serve the proxy on the given address (default "tcp://localhost:27147")
      --max-open-connections int   Maximum number of simultaneous connections (including WebSocket). (default 900)
      --node string                Connect to a binance node at this address (default "tcp://localhost:27147")
```

--help를 통해 모든 매개 변수들을 특정할 수 있습니다.

플랫폼에 따라 라이트 클라이언트를 시작하세요. 다음 명령어에서 `platform` 변수를 `mac`, `windows`나 `linux`로 교체하세요:

```bash
./{{platform}}/lightd --chain-id "{chain-id}" --node tcp://{full node addr}:80 > node.log  &
```

라이트 클라이언트를 시작하기 위해서는 필수 매개 변수가 두 가지 존재합니다: `chain id`와 `full node addr`입니다.<br/>
`chain id`는 접속하고 싶은 네트워크를 나타냅니다.<br/>
체인 id에 관해서는 [테스트넷의 제네시스 파일](https://https://github.com/bnb-chain/node-binary/blob/master/fullnode/testnet/0.5.8/config/genesis.json)
이나 [prod넷의 제네시스 파일](https://github.com/bnb-chain/node-binary/blob/master/fullnode/prod/0.5.8/config/genesis.json)를 참고해 주세요.<br/>
`full node addr`는 배포된 모든 풀 노드의 주소가 들어갈 수 있습니다<br/>
[비컨 체인 풀 노드 실행하기](fullnode.md)를 참고해 주세요.<br/>

메인넷과 테스트넷 두 네트워크 모두 연결 가능한 풀 노드가 여러 개 제공됩니다.<br/>
간단한 파이썬 코드를 통해 풀 노드에 관한 정보를 얻을 수 있습니다(네트워크에 따라 도메인을 바꿔주세요):<br/>

```python
import requests, json
d = requests.get('https://dex.binance.org/api/v1/peers').text # replace dex.binance.org with testnet-dex.binance.org for testnet
l = json.loads(d)
seeds = ",".join([ (seed["id"]+"@"+seed["original_listen_addr"]) for seed in l if seed["accelerated"] == False])
print (seeds)
```

### Mainnet 예시:
```bash
./lightd --chain-id "Binance-Chain-Tigris" --node tcp://dataseed1.binance.org:80 > node.log  &
```

### Testnet 예시:
```bash
./lightd --chain-id "Binance-Chain-Ganges" --node tcp://data-seed-pre-0-s1.binance.org:80 > node.log  &
```


## 라이트 클라이언트로 작업하기

라이트 클라이언트는 [rpc-api](api-reference/node-rpc.md)와 같은 RPC 인터페이스를 보유하고 있습니다.<br/>
라이트 클라이언트의 기본 포트는 `27147` 입니다.
