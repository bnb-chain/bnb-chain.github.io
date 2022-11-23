---
sidebar_label: Governance of BSC
sidebar_position: 2
hide_table_of_contents: false
---

# BSC 거버넌스

## 동기

BSC의 동작을 제어하는 많은 시스템 파라미터가 있습니다.

- BSC 시스템 컨트랙트의 모든 파라미터는 유연해야 합니다. 즉, 슬래싱 임계값, 체인 간 전송 수수료, 릴레이어 보상 금액 등입니다.

- BC에서 스테이킹/슬래시/오라클 모듈의 파라미터 등이 있습니다.

이 모든 파라미터들은 BSC 검증인 집단에 의해 스테이킹 기반 제안-투표 프로세스를 통해 결정됩니다. 이러한 프로세스는 BC에서 수행될 것이며, 필요한 경우 크로스 체인 통신을 통해 해당 시스템 컨트랙트에 의해 새로운 파라미터 값이 선택됩니다.

## 디자인 원칙

**BC**

- 코드베이스 재사용: 제안과 투표의 구조와 로직의 대부분을 재사용합니다.

- 크로스 체인 패키지를 한 번에 사용 가능: 크로스 체인 패키지는 제안이 통과되면 사용 가능합니다.

- 네이티브 파라미터 변경은 breath 블록에서 이루어집니다. BC에서 스테이킹/슬래싱/오라클 모듈의 파라미터 변경은 제안이 통과된 후 breath 블록에서 발생합니다.

**BSC**

- 균일한 인터페이스: 이러한 파라미터에 관심이 있는 컨트랙트들은 동일한 인터페이스만 구현하면 됩니다.

- 확장 가능: 새 시스템 컨트랙트를 추가할 때 다른 컨트랙트를 수정할 필요가 없습니다.

- 실패 허용: 검증자는 잘못된 제안을 건너뛰기 위해 투표할 수 있습니다.

- 멀티플렉싱입: 지금은 파라미터 거버넌스만 있지만, 미래에는 더 많은 거버넌스 기능이 있을 것입니다.

## 워크플로우

![img](../../static/img/gov-workflow.png)

## 컨트랙트 인터페이스

파라미터 변경 이벤트를 구독하려는 모든 컨트랙트에서 다음 인터페이스를 구현해야 합니다. **function updateParam(string key, bytes calldata value) external**

인터페이스 내부에서 다음과 같은 검사를 수행해야 합니다.

- 메시지 보낸 사람은 거버넌스 컨트랙트여야 합니다.
- 값의 기본 검사입니다. (길이, 값 범위)

구현 예시:

```
modifier onlyGov() {
    require(msg.sender == GOV_CONTRACT_ADDR, "the msg sender must be the gov contract");
    _;
}

function updateParam(string key, bytes calldata value) external onlyGov{
    if (key == "relayerReward"){
        require(value.length == 32, "the length of value is not 32 when update relayer_reward param");
        uint256 memory paramValue = TypesToBytes.ToUint256(0, value);
        require(paramValue >= MIN_RELAYER_REWARD, "the relayerReward is smaller than the minimum value");
        require(paramValue <= MAX_RELAYER_REWARD, "the relayerReward is bigger than the maximal value");
        relayerReward = paramValue；
    }else{
        require(false, "receive unknown param");
    }
}
```

## 거버넌스 컨트랙트
크로스 체인 컨트랙트 인터페이스를 구현합니다: **handlePackage(bytes calldata msgBytes, bytes calldata proof, uint64 height, uint64 packageSequence)**

다음 단계를 수행하십시오.
- 기본 검사. 시퀀스 검사, 릴레이어 송신인 검사, 블록 헤더 동기화 검사, 머클 증명 검사.
- msgBytes의 첫 번째 바이트에 따라 msg type을 확인합니다. 현재로서는 param change msg type만 지원됩니다. msg 바이트를 확인하고 파싱합니다.
- 고정 가스를 사용하여 대상 컨트랙트의 updateParam 인터페이스를 호출합니다. 모든 예외를 포착하고 필요한 경우 실패 이벤트를 발생시키지만, 프로세스는 계속 진행되도록 합니다.
- 릴레이어에 대한 보상을 받고 시퀀스를 늘립니다.


##  BSC의 동작을 제어하는 파라미터

 BSC의 동작을 제어하는 많은 시스템 파라미터가 있습니다.

- BSC 시스템 컨트랙트의 모든 파라미터는 유연해야 합니다. 즉, 슬래싱 임계값, 체인 간 전송 수수료, 릴레이어 보상 금액 등이 있습니다.

- BC에서 스테이킹/슬래시/오라클/IBC 모듈의 파라미터 등도 있습니다.

이 모든 매개 변수는 BSC 검증인 집단에 의해 스테이킹 기반 제안-투표 프로세스를 통해 결정됩니다. 이러한 프로세스는 BC에서 수행되며, 새로운 파라미터 값은 필요할 시 크로스 체인 통신을 통해 해당 시스템 컨트랙트에 의해 의해 선택될 것입니다.


## Fee Table

| 트랜잭션 타입                   | 수수료         | 수수료 대상                    |
| -------------------------- | ----------- | ---------------------------- |
| 스마트 체인 제안 제출(Submit Smart Chain Proposal) | 10 BNBs     | 제안자                     |
| 스마트 체인 제안 예치(Smart Chain Proposal Deposit)        | 0.00125 BNB | 제안자                     |
| 스마트 체인 제안 투표(Smart Chain Proposal Vote)           | 1 BNB       | 제안자                     |
| 릴레이어 보상(Relayer reward)           | 0.001 BNB    | 시스템 보상 풀 |

### 글로벌 파라미터

* `min-deposit`: 메인넷에서 제안을 제출을 위한 최소값은 **1000BNB**이며, 테스트넷에서는 **2000BNB**입니다.


## 명령어

### 사이드 체인 제안 쿼리

| **parameter name**  | **example**                                | **comments**                                         | **required** |
| ------------------- | ------------------------------------------ | ---------------------------------------------------- | ------------ |
| --chan-id           | Binance-Chain-XXX                          | 바이낸스 체인의 체인 ID                       | Yes          |
| --side-chain-id     | chapel                                     | 사이드 체인의 ID, 기본값은 네이티브 체인        | Yes          |
| --status            | passed                                     | 제안 상태에 따라 제안 필터링: deposit_period/voting_period/passed/rejected | No          |
| --voter             | bnb1h9ymecpakr8p8lhchtah2xxx7x4xq099umclqu | 투표자에 따라 제안 필터링              | No           |


```bash
## mainnet
./bnbcli gov  query-proposals --side-chain-id  bsc --trust-node --chain-id Binance-Chain-Tigris

## testnet
./tbnbcli gov  query-proposals --side-chain-id  chapel --trust-node --chain-id Binance-Chain-Ganges
```

### 사이드 체인 제안 쿼리

| **파라미터 이름** | **예시**                                | **설명**                                         | **필수 여부** |         
| -------------------| ------------------------------------------ | ---------------------------------------------------- | ------------ |
| --chan-id          | Binance-Chain-XXX                          | 바이낸스 체인의 체인 ID                       | Yes          |
| --side-chain-id    | chapel                                     | 사이드 체인의 ID, 기본값은 네이티브 체인        | Yes          |
| --proposal-id      | 1                                          | 쿼리되고 있는 제안의 ID                 | Yes          |

```bash
## mainnet
./bnbcli gov  query-proposal  --proposal-id  1  --side-chain-id  bsc --trust-node --chain-id Binance-Chain-Tigris

## testnet
./tbnbcli gov  query-proposal  --proposal-id  1  --side-chain-id  chapel --trust-node --chain-id Binance-Chain-Ganges
```

### 사이드 체인 파라미터 쿼리

| **파라미터 이름** | **예시**                                | **설명**                                         | **필수 여부** |         
| -------------------| ------------------------------------------ | ---------------------------------------------------- | ------------ |
| --side-chain-id    | chapel                                     | 사이드 체인의 ID, 기본값은 네이티브 체인        | Yes          |

```bash
## mainnet
 ./bnbcli params side-params --side-chain-id bsc  --trust-node

## testnet
 ./tbnbcli params side-params --side-chain-id chapel  --trust-node
```

### 크로스 체인 파라미터 변경 제안 제출

| **파라미터 이름** | **예시**                                                        | **설명**                                                              | **필수 여부** |
|:-------------------|:-------------------------------------------------------------------|:--------------------------------------------------------------------------|:-------------|
| --chan-id          | Binance-Chain-XXX                                                  | 바이낸스 체인의 체인 ID                                            | Yes          |
| --side-chain-id    | chapel                                                             | 사이드 체인의 ID, 기본값은 네이티브 체인                             | Yes          |
| --deposit          | 200000000000:BNB                                                   | 제안의 예치금                                                       | Yes          |
| --from             | alice                                                              | 서명할 개인키 이름 또는 주소                         | Yes          |
| --key              | felonyThreshold                                                    | 사이드 체인에서 파라미터 이름                                      | Yes          |
| --target           | 0x0000000000000000000000000000000000001001                         | 사이드 체인에서 컨트랙트 주소                                 | Yes          |
| --title            | "test csc change"                                                  | 제안의 제목                                                         | Yes          |
| --value            | 0x000000000000000000000000000000000000000000000000000000000000001b | 사이드 체인에서 파라미터의 구체적인 값, hex로 인코딩되어야 함 | Yes          |
| --voting-period    | 604800                                                             | 초 단위 투표 기간 (기본값: 604800)                                 | No           |

```bash
## mainet
./bnbcli params  submit-bscParam-change-proposal  --key "felonyThreshold" --value "0x000000000000000000000000000000000000000000000000000000000000001b"   --target 0x0000000000000000000000000000000000001001   --deposit 200000000000:BNB     --voting-period 100   --side-chain-id  bsc  --title "test csc change"  --from alice  --trust-node   --chain-id Binance-Chain-Tigris

## testnet
./tbnbcli params  submit-bscParam-change-proposal  --key "felonyThreshold" --value "0x000000000000000000000000000000000000000000000000000000000000001b"   --target 0x0000000000000000000000000000000000001001   --deposit 200000000000:BNB     --voting-period 100   --side-chain-id  chapel  --title "test csc change"  --from alice  --trust-node   --chain-id Binance-Chain-Ganges
```

### 크로스 체인 채널 관리 제안 제출

| **파라미터 이름** | **예시**                                                        | **설명**                                                              | **필수 여부** |
|:-------------------|:-------------------------------------------------------------------|:--------------------------------------------------------------------------|:-------------|
| --chan-id          | Binance-Chain-XXX                                                  | 바이낸스 체인의 체인 ID                                            | Yes          |
| --side-chain-id    | chapel                                                             | 사이드 체인의 ID, 기본값은 네이티브 체인                             | Yes          |
| --deposit          | 200000000000:BNB                                                   | 제안의 예치금                                                       | Yes          |
| --from             | alice                                                              | 서명할 개인키 이름 또는 주소                         | Yes          |
| --channel-id       | 1                                                                  | 관리하고 싶은 채널 ID                                    | Yes          |
| --enable           | true                                                               | 채널 활성화 여부 (기본값은 참)                                  | Yes          |
| --title            | "test csc change"                                                  | 제안의 제목                                                         | Yes          |
| --voting-period    | 604800                                                             | 초 단위 투표 기간 (기본값: 604800)                                 | No           |

```bash
## mainnet
./bnbcli side-chain  submit-channel-manage-proposal  --channel-id  2 --enable=true  --deposit 200000000000:BNB     --voting-period 100   --side-chain-id  bsc  --title "test csc change"  --from alice  --trust-node   --chain-id Binance-Chain-Tigris

## testnet
./tbnbcli side-chain  submit-channel-manage-proposal  --channel-id  2 --enable=true  --deposit 200000000000:BNB     --voting-period 100   --side-chain-id  chapel  --title "test csc change"  --from alice  --trust-node   --chain-id Binance-Chain-Ganges
```

### 사이드 체인 모듈 파라미터 변경 제안 제출

| **파라미터 이름** | **예시**                                                        | **설명**                                                              | **필수 여부** |
|:-------------------|:-------------------------------------------------------------------|:--------------------------------------------------------------------------|:-------------|
| --chan-id          | Binance-Chain-XXX                                                  | 바이낸스 체인의 체인 ID
| --side-chain-id    | chapel                                                             | 사이드 체인의 ID, 기본값은 네이티브 체인                             | Yes          |
| --deposit          | 200000000000:BNB                                                   | 제안의 예치금                                                       | Yes          |
| --from             | alice                                                              | 서명할 개인키 이름 또는 주소                         | Yes          |
| --title            | "test csc change"                                                  | 제안의 제목                                                         | Yes          |
| --sc-param-file    | param.json                                                         | the file of Side Chain params (json format)                               | Yes          |
| --voting-period    | 604800                                                             | 초 단위 투표 기간 (기본값: 604800)                                 | No           |

```bash
## mainnet
./bnbcli params  submit-sc-change-proposal  --sc-param-file param.json  --deposit 200000000000:BNB  --voting-period 100   --side-chain-id  bsc  --title "test proposal"  --from delegator1  --trust-node  --chain-id Binance-Chain-Tigris

## testnet
./tbnbcli params  submit-sc-change-proposal  --sc-param-file param.json  --deposit 200000000000:BNB  --voting-period 100   --side-chain-id  chapel  --title "test proposal"  --from delegator1  --trust-node  --chain-id Binance-Chain-Ganges
```

### 사이드 체인 제안 투표

| **파라미터 이름** | **예시**                                | **설명**                                         | **필수 여부** |         
| -------------------| ------------------------------------------ | ---------------------------------------------------- | ------------ |
| --chan-id          | Binance-Chain-XXX                          | 바이낸스 체인의 체인 ID                       | Yes          |
| --side-chain-id    | chapel                                     | 사이드 체인의 ID, 기본값은 네이티브 체인        | Yes          |
| --proposal-id      | 1                                          | 쿼리되고 있는 제안의 ID                 | Yes          |
| --option           | Yes                                        | 투표 옵션 {yes, no, no_with_veto, abstain}         | Yes          |

```bash
## mainnet
 ./bnbcli gov vote --from alice   --side-chain-id  bsc    --proposal-id 1 --option Yes  --chain-id Binance-Chain-Tigris

## testnet
 ./tbnbcli gov vote --from alice   --side-chain-id  chapel    --proposal-id 1 --option Yes  --chain-id Binance-Chain-Ganges
```

### 사이드 체인 제안의 예치금


| **파라미터 이름** | **예시**                                | **설명**                                         | **필수 여부** |         
| -------------------| ------------------------------------------ | ---------------------------------------------------- | ------------ |
| --chan-id          | Binance-Chain-XXX                          | 바이낸스 체인의 체인 ID                       | Yes          |
| --side-chain-id    | chapel                                     | 사이드 체인의 ID, 기본값은 네이티브 체인        | Yes          |
| --proposal-id      | 1                                          | 쿼리되고 있는 제안의 ID                 | Yes          |
| --deposit          | Yes                                        | 예치된 금액                                    | Yes          |

```bash
## mainnet
 ./bnbcli gov deposit --from alice   --side-chain-id  bsc    --proposal-id 1 --deposit 1000000000:BNB --chain-id Binance-Chain-Tigris

## testnet
 ./tbnbcli gov deposit --from alice   --side-chain-id  chapel    --proposal-id 1 --deposit 1000000000:BNB --chain-id Binance-Chain-Ganges
```
