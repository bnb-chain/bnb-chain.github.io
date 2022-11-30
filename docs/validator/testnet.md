---
sidebar_label: Create a Validator on Testnet
sidebar_position: 2
hide_table_of_contents: false
---

# 검증자 후보되기

## 풀노드 설치

로컬에 BSC 풀 노드를 설치하려면 다음 [가이드](fullnode.md)를 참고하세요.

## 계정 생성

우선 한 쌍의 키를 갖는 계정을 생성해야 합니다. 다믕과 같이 명령어를 입력하여 새로운 계정과 비밀번호를 설정하세요:
```bash
geth account new --datadir ./node
```

이 명령어는 공개 주소와 개인 키를 지닌 주소를 반환할 것입니다. 키 파일은 **백업**이 필수입니다!

이미 계정이 있으면, 시드 구문을 이용하여 복구해주세요:

```bash
geth account import --datadir ./node
```

### 포셋에서 테스트넷 토큰 받기

이 포셋 페이지로 이동하세요: <https://testnet.binance.org/faucet-smart>

### BSC에서 BC로 BNB 이동하기

바이낸스 익스텐션 월렛을 이용하여 BNB를 전송하려면 이 [가이드](https://docs.bnbchain.org/docs/binance#transfer-testnet-bnb-from-bsc-to-bc)를 참고해주세요.


### 검증자 후보되기

명령어 `tbnbcli`를 사용하여 검증자에게 일부 BNB를 [후보 선언](../stake/cli-commands.md)하세요.

[테스트넷 익스플로러](https://testnet-explorer.binance.org/)에서 트랜잭션을 검증하세요.

### 제네시스 파일과 Config 파일 받아오기
```bash
wget --no-check-certificate  $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep testnet |cut -d\" -f4)
unzip testnet.zip
```

### BSC 테스트넷에서 풀노드 시작하기

검증자 후보로서 풀노드를 실행하려면 다음 명령어를 사용하세요.

```bash
geth --datadir node init genesis.json
geth --config ./config.toml --datadir ./node --syncmode snap -unlock {validator-address} --mine --allow-insecure-unlock 
```

### 테스트넷의 검증자 후보되기

명령어 `tbnbcli`를 사용하여 검증자에게 일부 BNB를 [후보 선언](../stake/cli-commands.md)하세요.

[테스트넷 익스플로러](https://testnet-explorer.binance.org/)에서 트랜잭션을 검증하세요.