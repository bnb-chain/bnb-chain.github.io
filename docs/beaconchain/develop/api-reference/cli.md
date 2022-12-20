# 커멘드 라인 인터페이스 (CLI)

비컨 체인 CLI는 비컨 체인과 상호 작용하기 위한 방법 중 하나입니다.

비컨 체인 CLI는 로컬 지갑으로 사용될 수 있으며, 바이낸스 CLI를 통해 키를 관리할 수 있습니다. 또한 새로운 키를 생성하거나
미모닉 단어를 통해 키를 복원할 수도 있습니다. CLI를 통해 보관된 키의 리스트나 특정 키의 정보를 조회할 수도 있습니다.

비컨 체인 CLI를 통해 비컨 체인에 트랜잭션을 전송하거나, 주문을 넣거나, 토큰을 이전하거나 발행할 수 있습니다.
사실 비컨 체인 웹 지갑으로 어떤 것이든 할 수 있습니다. 상장 거래 쌍을 제안하거나 체인 거버넌스에 참여하는 것도 가능합니다.

CLI를 통해 간단한 쿼리도 가능합니다. 예시로 자기 계정의 잔고나 트랜잭션 해시에 나타난 정보 등도 요청할 수 있습니다.

## 비컨 체인 CLI를 다운로드하기

비컨 체인 CLI 릴리스는 여기에서 다운로드 할 수 있습니다: [https://github.com/bnb-chain/node-binary](https://github.com/bnb-chain/node-binary/tree/master/cli)
```
git clone https://github.com/bnb-chain/node-binary.git
```
다운로드 시 테스트넷 버전과 메인넷 버전을 선택할 수 있습니다. 다음 명령어에서 네트워크 변수를 `testnet`이나 ` prod`로 교체하세요:
```
cd node-binary/cli/{network}/{version}
```
### CLI 설치

플랫폼을 위한 바이너리를 다운 받은 후, 원하는 폴더에다 배치하세요. 해당 폴더에서 터미널이나 `cmd.exe`을 실행하고 문서에 있는 예시를 따라 원하는 기능을 실행하세요.

메인넷:

```bash
$  ./bnbcli
```

Windows 운영체제에서는 다음과 같이 실행하세요:

```bash
C:\> bnbcli.exe
```

테스트넷:
```bash
$  ./tbnbcli
```

Windows 운영체제에서는 다음과 같이 실행하세요:

```bash
C:\> tbnbcli.exe
```


## 연결하기

키는 노드와 연결하지 않고 로컬에서 관리할 수 있습니다. 다만 비컨 체인과 상호작용하려면 비컨 체인 풀 노드 중 하나에 연결해야합니다.

풀 노드를 직접 운영할 수도 있는데, 이 경우는 자동으로 비컨 체인에 연결되고 CLI를 실행할 수 있습니다. 운영하지 않는 경우, 다른 사람들이 제공하는 풀 노드에 연결하면 됩니다.

다음 API 에 요청해서 메인넷 상의 풀 노드의 리스틀르 불러오세요: <https://dex.binance.org/api/v1/peers>.

테스트넷은, 다음 링크를 참고해 주세요:  <https://testnet-dex.binance.org/api/v1/peers>.

풀 노드는 `ip:port` 형식으로 나타내며, `access_addr` 를 피어로 사용하여 접속할 수 있습니다. (예시: `https://dataseed4.defibit.io:443`)

참고로 2가지 유형의 노드가 RPC 서비스를 제공합니다. 일부는 TLS를 지원하지만 나머지는 TLS를 지원하지 않습니다.

## Chain-ID 사용하기

`chain-id`는 `bnbcli`에서 전송된 모든 트랜잭션에 대해 채워야 하는 중요한 필드입니다. 메인넷의 `chain-id`는 `Binance-Chain-Tigris`이며, 테스트넷의 체인 아이디는 `Binance-Chain-Ganges` 입니다. 해당하는 네트워크에 맞게 작성해 주세요.
## 개인 키 사용

트랜잭션을 서명하는 방법은 두 가지 입니다：

* 로컬 키스토어(keystore) 파일 사용하기

이 방식은 `bnbcli`를 통해 서명하는 기본적인 방식입니다. bnbcli 홈 저장된 암호화된 키스토어 파일을 사용합니다. `--from`을 통해 복호화하는 키를 특정해야 합니다.

* 하드웨어 지갑의 개인키를 사용하기

우선 새 주소를 생성할 때 `--ledger`를 추가해야 합니다. 예를 들면:
```
bnbcli keys add test --ledger --index 0 --account 0
```
그 후 렛저에 존재하는 개인 키는 새로운 주소를 생성할 때 사용될 것입니다.

`--account`와 `--index` 인덱스를 특정하여 더 많은 주소를 생성할 수 있습니다. 생성 후, 렛저를 통해 서명할 수 있습니다.

서명 트랜잭션에서 주소를 이용할 때, `bnbcli`는 렛저에 트랜잭션을 전송하고 서명을 받습니다. 이후 `bnbcli`가 서명된 트랜잭션을 풀 노드에 전파합니다.

## 키 관리자

두 가지 종류의 키를 지원합니다: 로컬 키(local key)와 렛저 키(ledger key)

### 로컬 키
* 로컬 키 생성하기
```
bnbcli keys add test_key
```
새롭게 생성된 로컬키는 암호화되어 로컬 키스토어(keystore)에 저장됩니다.
* 로컬 키로 트랜잭션 서명하기
```
bnbcli send --chain-id=<chain-id> --from=test_key --amount=100:BNB --to=<address>
```
예를 들어 토큰 전송 트랜잭션을 보내고 싶을 때 위와 같은 명령어를 작성하면 됩니다. `--from` 플래그는 트랜잭션을 서명할 키를 지정하는 데 사용됩니다.

###  렛저 키
* 렛저 키 생성하기

렛저 키를 생성하기 전에 다음과 같은 절차를 수행했는지 확인하세요:
1. 렛저 기기에 바이낸스 렛저 앱이 설치 되어 있으며 버전이 **v1.1.3** 이상입니다.
2. 렛저 기기가 연결되어 있으며 코드를 입력해 잠금 해제했습니다.
3. 렛저 기기에서 바이낸스 렛저 앱을 열었습니다.
```
bnbcli keys add test_ledger_key --ledger
```
다음과 같은 명령어를 실행하여 렛저 키를 생성하세요. 개인키는 렛저 기기에만 저장됩니다. 로컬 키 저장소에는 대응되는 공개키와 주소만 저장됩니다.
```
bnbcli keys add test_ledger_key_new --ledger --index 0 --account 0
```
--account와 --index를 특정하여 더 많은 키를 생성할 수 있습니다.

* 렛저 키로 트랜잭션 서명하기

전송 트랜잭션을 다음과 같이 실행하세요: 
1. 콘솔에서 명령어를 실행합니다:
```
bnbcli send --chain-id=<chain-id> --from=test_ledger_key --amount=100:BNB --to=<address>
```
2. 콘솔이 다음과 같은 메세지를 반환할 것입니다:
```
Please confirm if address displayed on ledger is identical to bnb15339dcwlq5nza4atfmqxfx6mhamywz35evruva (yes/no)?
```
3. 사용자는 렛저 기기에서 confirm 버튼을 클릭하고 yes를 입력하여 다음 단계를 진행할 수 있습니다.
4. 사용자는 렛저 스크린에서 트랜잭션 데이터를 미리 조회할 수 있습니다.
5. 모든 트랜잭션 데이터를 확인한 후, 사용자는 `트랜잭션 서명`이나 `거절`을 선택할 수 있습니다.
6. `트랜잭션 서명`을 선택한 후, `bnbcli`는 서명된 트랜잭션을 블록체인 노드에게 전파합니다.

## 사용 방법

비컨 체인 CLI를 다운 받았으면, `help` 하위 명령어를 통해 가능한 모든 명령어를 조회할 수 있습니다:

```bash
$  ./bnbcli help
BNBChain light-client

Usage:
  bnbcli [command]

Available Commands:
  init        Initialize light client
  status      Query remote node for status

  txs         Search for all transactions that match the given tags.
  tx          Matches this txhash over all committed blocks

  account     Query account balance
  send        Create and sign a send tx
  transfer

  api-server  Start the API server daemon
  keys        Add or view local private keys

  version     Print the app version
  token       issue or view tokens
  dex         dex commands
  gov         gov commands
  help        Help about any command

Flags:
  -e, --encoding string   Binary encoding (hex|b64|btc) (default "hex")
  -h, --help              help for bnbcli
      --home string       directory for config and data (default "/root/.bnbcli")
  -o, --output string     Output format (text|json) (default "text")
      --trace             print out full stack trace on errors

Use "bnbcli [command] --help" for more information about a command.
```

**참고**:대부분 하위 명령에는 `--trust-node`라는 특수 플래그가 존재하는데, 기본적으로 CLI에서 비활성화 되어 있습니다. 비활성화 된 경우는 같은 높이의 블록체인을 검증할 때 2-4초가 추가로 소요됩니다.피어를 신뢰할 수 있고 대부분 명령어를 0.5초 내로 처리할 수 있으면 플래그를 활성화해도 됩니다. 만일 노드가 트랜잭션을 증명할 수 없으면, 다음과 같은 메세지가 발생합니다:
```
Create verifier failed: Commit: Response error: RPC error -32603 - Internal error: runtime error: invalid memory address or nil pointer dereference
Please check network connection and verify the address of the node to connect to
```
이 문제를 해결하려면, `--trust-node`를 `true`로 설정해야 합니다.



## CLI 레퍼런스

자세한 사용법은 아래 문서를 참고하세요:

- [전송](../../transfer.md)
- [교환](../../trade.md)
- [발행](../../tokens.md)
- [거버넌스](../../governance.md)
- [상장](../../list.md)
- [키](../../keys.md)
- [오프라인](../../offline.md)
- [타임 락](../../timelock.md)
- [메모 검증](../../memo-validation.md)
- [스테이킹](../../learn/bc-staking.md)
- [슬래싱](../../learn/bc-slashing.md)
- [브릿지](../../learn/bc-bridge.md)
- [바이낸스 스마트 체인 거버넌스](../../learn/bsc-gov.md)



## 다른 블록체인의 CLI를 사용하기

`bnbcli`는 검증인집합(validatorset) 변화를 `bnbcli` 홈에 저장합니다. `bnbcli`를 테스트넷에서 메인넷 같이 다른 블록체인에 사용하고 싶으면 호환되지 않는 데이터를 처리해야 합니다. 블록체인을 변경하려면, 데이터 폴더를 `rm -rf ~/.bnbcli/.bnblite/`로 정리하거나  `--home` 플래그를 통해 새로운 홈 폴더를 생성하면 됩니다. 홈 폴더 경로를 특정하지 않을 경우 `bnbcli`를 통해 쿼리를 생성할 수 없을 것입니다.

`tbnbcli`에서 변경 하는 것도 같은 방식으로 처리할 수 있습니다.
