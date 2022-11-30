
# CLI 명령어

스테이킹과 위임 관련 CLI 명령어를 실행하기 위해서는 `bnbcli`와 `tbnbcli` 바이너리를 먼저 다운받아야 합니다.
### 바이너리 다운받기
### 메인넷
[여기](https://github.com/bnb-chain/node-binary/tree/master/cli/prod)에서 `bnbcli` 바이너리를 다운받으세요.

### 테스트넷
[여기](https://github.com/bnb-chain/node-binary/tree/master/cli/testnet)에서 `tbnbcli` 바이너리를 다운받으세요.

## BSC 검증인 생성하기

### `bsc-create-validator` 파라미터

| **파라미터 이름**          | **예시**                        | **설명**                                                  | **필수 여부** |
| ---------------------------- | ------------------------------------ | ------------------------------------------------------------ | ------------ |
| --chain-id                    | Binance-Chain-XXX                    | 바이낸스 체인의 체인 ID                             | 예          |
| --from                       | bnb1xxx/tbnb1xxx                     | 해당 트랜잭션을 서명하고 검증인 운영 주소로 사용될 개인키 주소  | 예          |
| --address-delegator          | bnb1xxx/tbnb1xxx                     | (선택사항) 자기위임자의 bech32 주소. 제공되지 않을 경우 --from 주소가 자기위임자로서 사용됨. | 아니요           |
| --amount                     | 2000000000000:BNB  (means 20000 BNB) | 자기위임 액수, 8자리            | 예          |
| --moniker                    | myval1                               | 검증인 이름                                             | 예          |
| --identity                   | xxx                                  | (선택사항) identity 서명 (ex. UPort or Keybase)          | 아니요           |
| --website                    | www.example.com                      | (선택사항) 웹사이트                                             | 아니요           |
| --details                    | some details                         | (선택사항) 세부사항                                             | 아니요           |
| --commission-rate            | 80000000(that means 0.8  or 80%)     | 최초 수수료 퍼센티지, 8자리. | 예          |
| --commission-max-rate        | 95000000  (0.95 or 95%)              | 최고 수수료 퍼센티지, 8자리. 이 비율은 변경할 수 없음.| Yes          |
| --commission-max-change-rate | 3000000   (0.03 or 3%)               | 일별 최대 수수료 변경 퍼센티지. 이 비율은 변경할 수 없음.     | Yes          |
| --side-chain-id              | chapel                               | 검증인이 속한 사이드 체인의 chain-id        | 예          |
| --side-cons-addr             | 0x1234abcd                           | 사이드 체인 검증인의 합의 주소, 0x으로 시작하는 16진수 | 예          |
| --side-fee-addr              | 0xabcd1234                           | 사이드 체인에서 검증인이 수수료를 징수하는 주소, 0x으로 시작하는 16진수 | 예          |
| --home                       | /path/to/cli_home                    | bnbcli data와 config의 홈 디렉터리, 기본 설정은 “~/.bnbcli” | 아니요           |

중요한 주소 파라미터들은 다음과 같습니다:

| 필드명 | 용도 |
| ------------- | ------------------------------------------------------------ |
| DelegatorAddr | 자기검증인 주소. BC의 경우 수수료 징수에 사용됨. |
| ValidatorAddr | 검증인 운영 주소. 표결과 같은 거버넌스 운영에 사용. |
| SideConsAddr  | 사이드 체인에서 블록 생성자의 주소, i.e. 합의 주소. BC의 경우 `PubKey`라는 다른 파라미터가 있는데, 여기에서는 SideConsAddr가 BSC를 위해 이를 대체함.  오직 BSC 검증인들만이 필요한 파라미터. |
| SideFeeAddr   | BSC에서 수수료는 이 주소에 징수됨. 오직 BSC 검증인들만이 필요한 파라미터. 상이한 토큰 단위로 인해 BNB 스마트 체인에서 비컨체인으로 블록보상을 보낼 시 소액의 BNB가 남는 경우가 있음. 그 BNB가 수수료 주소로 보내짐.|


### `bsc-create-validator`의 사용 예시

#### 운영 주소 및 자기위임 주소를 동일하게 검증인을 생성하고자 한다면 이 트랜잭션에 하나의 서명 만이 필요합니다

```bash
## mainnet
bnbcli staking bsc-create-validator --chain-id Binance-Chain-Tigris --from bnb1tfh30c67mkzfz06as2hk0756mgdx8mgypu7ajl --amount 1000000000000:BNB --moniker bsc_v1 --identity "xxx" --website "[www.example.](http://www.binance.org)com" --details "bsc validator node 1" --commission-rate 80000000 --commission-max-rate 95000000 --commission-max-change-rate 3000000 --side-chain-id bsc --side-cons-addr 0x9B24Ee0BfBf708b541fB65b6087D6e991a0D11A8 --side-fee-addr 0x5885d2A27Bd4c6D111B83Bc3fC359eD951E8E6F8 --home ~/home_cli
## testnet
tbnbcli staking bsc-create-validator --chain-id Binance-Chain-Ganges --from tbnb1tfh30c67mkzfz06as2hk0756mgdx8mgypu7ajl --amount 2000000000000:BNB --moniker bsc_v1 --identity "xxx" --website "[www.example.](http://www.binance.org)com" --details "bsc validator node 1" --commission-rate 80000000 --commission-max-rate 95000000 --commission-max-change-rate 3000000 --side-chain-id chapel --side-cons-addr 0x9B24Ee0BfBf708b541fB65b6087D6e991a0D11A8 --side-fee-addr 0x5885d2A27Bd4c6D111B83Bc3fC359eD951E8E6F8 --home ~/home_cli
```

#### 분리된 자기위임 주소를 원한다면 `self-delegator`와 `validator operator`가 이 트랜잭션을 서명해야 합니다
다수의 서명을 지원하기 위해 두 가지 명령어를 추가로 작성해야 합니다.

a. ``**--generate-only**`` 파라미터가 추가된 다음의 명령어를 사용하고, 결과값을 서명에 사용될 json 파일에 저장합니다.

```bash
## mainnet
bnbcli staking bsc-create-validator --chain-id Binance-Chain-Tigris --from {validator-operator-address}  --address-delegator {delegator-address} --amount 5000000000000:BNB --moniker bsc_v1 --identity "xxx" --website "www.example.com" --details "bsc validator node 1" --commission-rate 80000000 --commission-max-rate 95000000 --commission-max-change-rate 3000000 --side-chain-id bsc --side-cons-addr 0x9B24Ee0BfBf708b541fB65b6087D6e991a0D11A8 --side-fee-addr 0x5885d2A27Bd4c6D111B83Bc3fC359eD951E8E6F8 --home ~/home_cli --generate-only > unsigned.json
## testnet
tbnbcli staking bsc-create-validator --chain-id Binance-Chain-Ganges --from {validator-operator-address}  --address-delegator {delegator-address} --amount 5000000000000:BNB --moniker bsc_v1 --identity "xxx" --website "www.example.com" --details "bsc validator node 1" --commission-rate 80000000 --commission-max-rate 95000000 --commission-max-change-rate 3000000 --side-chain-id chapel --side-cons-addr 0x9B24Ee0BfBf708b541fB65b6087D6e991a0D11A8 --side-fee-addr 0x5885d2A27Bd4c6D111B83Bc3fC359eD951E8E6F8 --home ~/home_cli --generate-only > unsigned.json
```

b. 검증 운영자(--from)와 자기위임자(--address-delegator) 모두 ``**bnbcli sign**`` 명령어를 사용하여 a.에서의 파일에 서명합니다.

**Delegator** 주소가 `unsigned.json`을 먼저 서명해야 합니다.

* 온라인 모드

```bash
## mainnet
./bnbcli sign unsigned.json --from {delegator-address} --node dataseed4.binance.org:80 --chain-id Binance-Chain-Tigris >> delegator-signed.json
## testnet
./tbnbcli sign unsigned.json --from {delegator-address} --node data-seed-pre-0-s3.binance.org:80 --chain-id Binance-Chain-Ganges >> delegator-signed.json
```

* 오프라인 모드

```bash
## mainnet
./bnbcli sign unsigned.json --account-number <delegator-account-number> --sequence <address-sequence> --chain-id Binance-Chain-Tigris --offline --name {delegator-address} >> delegator-signed.json
## testnet
./tbnbcli sign unsigned.json --account-number <delegator-account-number> --sequence <address-sequence> --chain-id Binance-Chain-Ganges --offline --name {delegator-address} >> delegator-signed.json
```

그 후 **검증인** 운영자 주소가 나중에 서명을 할 것입니다.

* 온라인 모드

```bash
## mainnet
./bnbcli sign delegator-signed.json --from {validator-address} --node dataseed4.binance.org:80 --chain-id Binance-Chain-Tigris >> both-signed.json
## testnet
./tbnbcli sign delegator-signed.json --from {validator-address} --node data-seed-pre-0-s3.binance.org:80 --chain-id Binance-Chain-Ganges >> both-signed.json
```

* 오프라인 모드

```bash
## mainnet
./bnbcli sign delegator-signed.json --account-number <validator-account-number> --sequence <address-sequence> --chain-id Binance-Chain-Tigris --offline --name {validator-address} >> both-signed.json
## testnet
./tbnbcli sign delegator-signed.json --account-number <validator-account-number> --sequence <address-sequence> --chain-id Binance-Chain-Ganges --offline --name {validator-address} >> both-signed.json
```

c. ``**bnbcli broadcast**``를 사용하여 위의 트랜잭션을 블록체인 노드로 보냅니다.

```bash
## mainnet
./bnbcli broadcast both-signed.json  --node dataseed4.binance.org:80 --chain-id Binance-Chain-Tigris
## testnet
./tbnbcli broadcast both-signed.json  --node data-seed-pre-0-s3.binance.org:80 --chain-id Binance-Chain-Ganges
```

[mainnet-explorer](https://explorer.binance.org/) 또는 [testnet-explorer](https://testnet-explorer.binance.org/)에서 트랜잭션을 확인하세요

## BSC Validator 수정하기

### `bsc-edit-validator` 파라미터

| **파라미터 이름**| **예시**                     | **설명**                                                 | **필수 여부** |
| ------------------ | -------------------------------- | ------------------------------------------------------------ | ------------ |
| --chan-id          | Binance-Chain-XXX                | 바이낸스 체인의 체인 ID                              | Yes          |
| --from             | bnb1xxx/tbnb1xxx                 | 해당 트랜잭션을 서명할 개인키이자 편집하고자 하는 검증인 | Yes          |
| --side-chain-id    | chapel                           | 해당 트랜잭션을 서명하고 검증인 운영 주소로 사용될 개인키 주소       | Yes          |
| --moniker          | myval1                           | 검증인 이름 (default  "[do-not-modify]")                  | No           |
| --identity         | xxx                              | (선택사항) identity  서명 (ex. UPort or Keybase) (default "[do-not-modify]") | No           |
| --website          | www.example.com                  | (선택사항) 웹사이트 (default  "[do-not-modify]")                | No           |
| --details          | some details                     | (선택사항) 세부사항 (default  "[do-not-modify]")                | No           |
| --commission-rate  | 80000000(that means 0.8  or 80%) | 새 수수료 퍼센티지                         | No           |
| --side-fee-addr    | 0xabcd1234                       | 사이드 체인에서 수수료 보상을 징수하는 검증인 주소. 0x로 시작하는 16진수. | No           |


### 예시

```bash
## mainnet
bnbcli staking bsc-edit-validator --chain-id Binance-Chain-Tigris --side-chain-id bsc --moniker bsc_v1_new --from bnb1tfh30c67mkzfz06as2hk0756mgdx8mgypu7ajl --home ~/home_cli
##testnet
bash tbnbcli staking bsc-edit-validator --chain-id Binance-Chain-Ganges --side-chain-id chapel --moniker bsc_v1_new --from bnb1tfh30c67mkzfz06as2hk0756mgdx8mgypu7ajl --home ~/home_cli
```

## BNB 위임하기

### `staking bsc-delegate` 파라미터

| **파라미터 이름**| **예시**             | **설명**                                                 | **필수 여부** |
| ------------------ | ------------------------ | ------------------------------------------------------------ | ------------ |
| --chan-id          | Binance-Chain-XXX        | 바이낸스 체인의 체인 ID                              | 필수          |
| --from             | bnb1xxx/tbnb1xxx         | 해당 트랜잭션을 서명할 개인키 주소이자 위임자의 주소 | 필수          |
| --side-chain-id    | chapel                   | 해당 트랜잭션을 서명하고 검증인 운영 주소로 사용될 개인키 주소       | 필수          |
| --validator        | bva1xxx                  | bva로 시작하는 검증인의 bech32 주소        | 필수          |
| --amount           | 1000000000:BNB  (10 BNB) | 위임 액수, 8자리               | 필수          |


### 예시

```bash
## mainnet
bnbcli staking bsc-delegate --chain-id Binance-Chain-Tigris --side-chain-id bsc --from bnb1tfh30c67mkzfz06as2hk0756mgdx8mgypu7ajl --validator bva1tfh30c67mkzfz06as2hk0756mgdx8mgypqldvm --amount 1000000000:BNB --home ~/home_cli
## testnet
tbnbcli staking bsc-delegate --chain-id Binance-Chain-Ganges --side-chain-id chapel --from tbnb1tfh30c67mkzfz06as2hk0756mgdx8mgypu7ajl --validator bva1tfh30c67mkzfz06as2hk0756mgdx8mgypqldvm --amount 1000000000:BNB --home ~/home_cli
```


## BNB 재위임

### `staking bsc-redelegate`의 파라미터

| **파라미터 이름**     | **예시**             | **설명**                                                 | **필수 여부** |
| ----------------------- | ------------------------ | ------------------------------------------------------------ | ------------ |
| --chan-id               | Binance-Chain-XXX        | 바이낸스 체인의 체인 ID                              | 필수          |
| --from                  | bnb1xxx/tbnb1xxx         | 해당 트랜잭션을 서명할 개인키 주소이자 위임자의 주소 | 필수          |
| --side-chain-id         | chapel                   | 해당 트랜잭션을 서명하고 검증인 운영 주소로 사용될 개인키 주소       | 필수          |
| --addr-validator-source | bva1xxx                  | bva로 시작하는 최초 검증인의 bech32 주소   | 필수          |
| --addr-validator-dest   | bva1yyy                  | bva로 시작하는 최종 검증인의 bech32 주소  | 필수          |
| --amount                | 1000000000:BNB  (10 BNB) | 위임 액수, 8자리                   | 필수          |

### 예시

```bash
## mainnet
bnbcli staking bsc-redelegate --chain-id Binance-Chain-Tigris --side-chain-id bsc --from bnb1tfh30c67mkzfz06as2hk0756mgdx8mgypu7ajl --addr-validator-source bva1tfh30c67mkzfz06as2hk0756mgdx8mgypqldvm --addr-validator-dest bva1jam9wn8drs97mskmwg7jwm09kuy5yjumvvx6r2 --amount1000000000:BNB --home ~/home_cli
### testnet
tbnbcli staking bsc-redelegate --chain-id Binance-Chain-Ganges --side-chain-id chapel --from tbnb1tfh30c67mkzfz06as2hk0756mgdx8mgypu7ajl --addr-validator-source bva1tfh30c67mkzfz06as2hk0756mgdx8mgypqldvm --addr-validator-dest bva1jam9wn8drs97mskmwg7jwm09kuy5yjumvvx6r2 --amount1000000000:BNB --home ~/home_cli
```


## BNB 위임 해제하기

### `staking bsc-unbond`의 파라미터

| **파라미터 이름**| **예시**             | **설명**                                                 | **필수 여부** |
| ------------------ | ------------------------ | ------------------------------------------------------------ | ------------ |
| --chan-id          | Binance-Chain-XXX        | 바이낸스 체인의 체인 ID                              | 필수          |
| --from             | bnb1xxx/tbnb1xxx         | 해당 트랜잭션을 서명할 개인키 주소이자 위임자의 주소 | 필수          |
| --side-chain-id    | chapel                   | 해당 트랜잭션을 서명하고 검증인 운영 주소로 사용될 개인키 주소       | 필수          |
| --validator        | bva1xxx                  | bva로 시작하는 검증인의 bech32 주소       | 필수          |
| --amount           | 1000000000:BNB  (10 BNB) | 위임 액수, 8자리                  | 필수          |

### 예시

* Mainnet

```bash
bnbcli staking bsc-unbond --chain-id Binance-Chain-Ganges --side-chain-id chapel --from bnb1tfh30c67mkzfz06as2hk0756mgdx8mgypu7ajl --validator bva1tfh30c67mkzfz06as2hk0756mgdx8mgypqldvm --amount 1000000000:BNB --home ~/home_cli
```


## 운영자 별로 사이드 체인 검증인 쿼리하기

### `staking side-validator` 파라미터

| **파라미터 이름**| **예시**      | **설명**                                        | **필수 여부** |
| ------------------ | ----------------- | ---------------------------------------------------- | ------------ |
| --chan-id          | Binance-Chain-XXX | 바이낸스 체인의 체인 ID                      | 필수          |
| --side-chain-id    | chapel            | 검증인이 속한 사이드 체인의 체인 ID   | 필수          |

### 예시

* 메인넷

```bash
bnbcli staking side-validator bva1hz5sg3u0v4gq2veyw5355z7qx6y7uuqhcuzf3f  --side-chain-id bsc --chain-id=Binance-Chain-Tigris --home ~/home_cli
```

## Query side chain delegation by delegator and operator

### Parameters for staking side-delegation

| **파라미터 이름**| **예시**      | **설명**                                        | **필수 여부** |
| ------------------ | ----------------- | ---------------------------------------------------- | ------------ |
| --chan-id          | Binance-Chain-XXX | 바이낸스 체인의 체인 ID                      | 필수          |
| --side-chain-id    | chapel            | 검증인이 속한 사이드 체인의 체인 ID | 필수          |

### 예시

* 메인넷

```bash
bnbcli staking side-delegation bnb1hz5sg3u0v4gq2veyw5355z7qx6y7uuqhcqre0d bva1hz5sg3u0v4gq2veyw5355z7qx6y7uuqhcuzf3f --chain-id=Binance-Chain-Tigris --side-chain-id bsc --home ~/home_cli
```


## 위임자 별로 사이드 체인 위임 쿼리하기

### 사이드 위임 스테이킹 파라미터

| **파라미터 이름**| **예시**      | **설명**                                        | **필수 여부** |
| ------------------ | ----------------- | ---------------------------------------------------- | ------------ |
| --chan-id          | Binance-Chain-XXX | 바이낸스 체인의 체인 ID                      | 필수          |
| --side-chain-id    | chapel            | 검증인이 속한 사이드 체인의 체인 ID | 필수          |

### 예시

* 메인넷

```bash
bnbcli staking side-delegations bnb1hz5sg3u0v4gq2veyw5355z7qx6y7uuqhcqre0d --side-chain-id bsc --node=0.0.0.0:26657 --chain-id=Binance-Chain-Tigris --trust-node
```

##  사이드 체인의 언본딩 위임 쿼리하기

### `staking side-unbonding-delegation` 파라미터

```bash
bnbcli staking side-unbonding-delegation [delegator-addr] [operator-addr] [flags]
```

| **파라미터 이름** | **예시**      | **설명**                                       | **필수 여부** |
| ------------------- | ----------------- | --------------------------------------------------- | ------------ |
| --chan-id           | Binance-Chain-XXX | 비콘 체인의 체인 ID                       | 필수          |
| --side-chain-id     | bsc/chapel            | 검증인이 소속된 사이드 체인의 체인 ID | 필수          |

### 예시

```bash
bnbcli staking  side-unbonding-delegation bnb1rtzy6szuyzcj4amfn6uarvne8a5epxrdklwhhj bva12hlquylu78cjylk5zshxpdj6hf3t0tahqmr98n --side-chain-id=bsc --chain-id=Binance-Chain-Tigris --home ~/home_cli
```


### 위임자 별 사이드 체인의 언본딩 위임 쿼리히기

#### `staking side-unbonding-delegations` 파라미터

**사용 예시**

```bash
bnbcli staking side-unbonding-delegations [delegator-addr] [flags]
```

| **파라미터 이름** | **예시**      | **설명**                                       | **필수 여부** |
| ------------------- | ----------------- | --------------------------------------------------- | ------------ |
| --chan-id           | Binance-Chain-XXX | 비콘 체인의 체인 ID                       | 필수          |
| --side-chain-id     | chapel            | 검증인이 소속된 사이드 체인의 체인 ID | 필수          |

### 예시

```bash
bnbcli staking  side-unbonding-delegations bnb1rtzy6szuyzcj4amfn6uarvne8a5epxrdklwhhj --side-chain-id=bsc --chain-id=Binance-Chain-Tigris --home ~/home_cli
```


##  검증인별 사이드 체인 언본딩 위임 쿼리하기

### `staking side-val-unbonding-delegations` 파라미터

**사용 예시**
```bash
bnbcli staking side-val-unbonding-delegation [operator-addr] [flags]
```

| **파라미터 이름** | **예시**      | **설명**                                       | **필수 여부** |
| ------------------- | ----------------- | --------------------------------------------------- | ------------ |
| --chan-id           | Binance-Chain-XXX | 비콘 체인의 체인 ID                       | 필수          |
| --side-chain-id     | bsc/chapel            | 검증인이 소속된 사이드 체인의 체인 ID | 필수          |

### 예시
```bash
bnbcli staking side-val-unbonding-delegations bva12hlquylu78cjylk5zshxpdj6hf3t0tahqmr98n --side-chain-id=bsc --chain-id=Binance-Chain-Tigris --home ~/home_cli
```

## 사이드 체인 재위임 조회

### `staking side-redelegation` 파라미터

**사용 예시:**

```bash
bnbcli staking side-redelegation [delegator-addr] [src-operator-addr] [dst-operator-addr] [flags]
```

| **파라미터 이름** | **예시**      | **설명**                                       | **필수 여부** |
| ------------------- | ----------------- | --------------------------------------------------- | ------------ |
| --chan-id           | Binance-Chain-XXX | 비콘 체인의 체인 ID                       | 필수          |
| --side-chain-id     | bsc/chapel            | 검증인이 소속된 사이드 체인의 체인 ID | 필수          |

### 예시

```bash
bnbcli staking  side-redelegation bnb1rtzy6szuyzcj4amfn6uarvne8a5epxrdklwhhj bva12hlquylu78cjylk5zshxpdj6hf3t0tahqmr98n  bva1hz5sg3u0v4gq2veyw5355z7qx6y7uuqhcuzf3f --side-chain-id=bsc --chain-id=Binance-Chain-Tigris --home ~/home_cli
```

### 위임인별 사이드 체인 재위임 쿼리하기

#### `staking side-redelegations` 파라미터

**사용 예시:**

```bash
bnbcli staking side-redelegations [delegator-addr] [flags]
```

| **파라미터 이름** | **예시**      | **설명**                                       | **필수 여부** |
| ------------------- | ----------------- | --------------------------------------------------- | ------------ |
| --chan-id           | Binance-Chain-XXX | 비콘 체인의 체인 ID                       | 필수          |
| --side-chain-id     | bsc/chapel            | 검증인이 소속된 사이드 체인의 체인 ID | 필수          |

### 예시

```bash
bnbcli staking side-redelegations bnb1rtzy6szuyzcj4amfn6uarvne8a5epxrdklwhhj --side-chain-id=bsc --chain-id=Binance-Chain-Tigris --home ~/home_cli
```

## 검증인별 사이드 체인 재위임 쿼리하기

### 스테이킹 side-val-redelegations 파라미터

**사용 예시**
```bash
bnbcli staking side-val-redelegations [operator-addr] [flags]
```
| **파라미터 이름** | **예시**      | **설명**                                       | **필수 여부** |
| ------------------- | ----------------- | --------------------------------------------------- | ------------ |
| --chan-id           | Binance-Chain-XXX | 비콘 체인의 체인 ID                       | 필수          |
| --side-chain-id     | bsc/chapel            | 검증인이 소속된 사이드 체인의 체인 ID | 필수         |

### 예시

```bash
bnbcli staking side-val-redelegations bva12hlquylu78cjylk5zshxpdj6hf3t0tahqmr98n --side-chain-id=bsc --chain-id=Binance-Chain-Tigris --home ~/home_cli
```


## 사이드 체인 스테이킹 풀 쿼리하기

### `staking side-pool` 파라미터

| **파라미터 이름** | **예시**      | **설명**                                       | **필수 여부** |
| ------------------- | ----------------- | --------------------------------------------------- | ------------ |
| --chan-id           | Binance-Chain-XXX | 비콘 체인의 체인 ID                       | 필수          |
| --side-chain-id     | bsc/chapel            | 검증인이 소속된 사이드 체인의 체인 ID | 필수          |


### 예시

```bash
bnbcli staking     side-pool --side-chain-id=bsc --chain-id=Binance-Chain-Tigris --home     ~/home_cli
```


##  사이드 체인의 최고 검증인 쿼리하기

### 스테이킹 side-top-validators 파라미터

| **파라미터 이름** | **예시**      | **설명**                                                | **필수 여부** |
| ------------------- | ----------------- | ------------------------------------------------------------ | ------------ |
| --chan-id           | Binance-Chain-XXX | 비콘 체인의 체인 ID                                | 필수          |
| --side-chain-id     | chapel            | 검증인이 소속된 사이드 체인의 체인 ID          | 필수          |
| --top               | 10                | (선택사항) 반한될 검증인의 수. 기본값은 검증인 최댓값으로 설정. | 선택사항       |

### 예시

```bash
bnbcli staking side-top-validators --top 10 --side-chain-id=bsc --chain-id=Binance-Chain-Tigris --home ~/home_cli
```

## 사이드 체인 검증인 수 조회

### 스테이킹 side-validators-count 파라미터

| **파라미터 이름**| **예시**     | **설명**                                                 | **필수 여부** |
| ------------------- | ----------------- | ------------------------------------------------------------ | ------------ |
| --chan-id           | Binance-Chain-XXX | 비콘 체인의 체인 ID                                | 필수          |
| --side-chain-id     | chapel            | 검증인이 소속된 사이드 체인의 체인 ID          | 필수          |
| --jail-involved     | true              | (선택사항) 참일 경우 투옥된 검증인들도 계산에 포함됨 | 선택사항       |

### 예시

```bash
bnbcli staking  side-validators-count --jail-involved --side-chain-id=bsc --chain-id=Binance-Chain-Tigris --home ~/home_cli
```