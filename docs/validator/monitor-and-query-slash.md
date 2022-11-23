# 슬래싱 이벤트 모니터링 및 조회하기

## 슬래싱 컨트랙트 모니터링하기

<https://bscscan.com/address/0x0000000000000000000000000000000000001001#events>에서 BSC 스캐너의 슬래싱 컨트랙트 이벤트 로그를 지속적으로 모니터링하는 것이 권장됩니다. 
컨트랙트를 보면서 30 이상인 슬래싱 인디케이터를 주시할 필요가 있습니다. 150을 넘는 경우 해당 검증인 컨트랙트는 투옥됩니다.

## 사이드 체인 서명 정보 조회하기

### 슬래싱 `side-signing-info` 파라미터

| **파라미터 이름** | **예시**       | **설명**                                         | **필수 여부** |
| ------------------ | ----------------- | ---------------------------------------------------- | ------------ |
| --chan-id          | Binance-Chain-XXX | BNB 체인의 체인 ID                       | 예          |
| --side-chain-id    | BSC-XXX           | 검증인이 속한 사이드 체인의 체인 ID | 예          |

#### 예시

```bash
bnbcli slashing side-signing-info 0x625448c3f21AB4636bBCef84Baaf8D6cCdE13c3F --side-chain-id=bsc --chain-id=test-chain-8d7sJz --home ~/home_cli
```
##  사이드 체인 슬래싱 내역 조회

### 슬래싱 `side-slash-history [validator-sideConsAddr]` 파라미터

| **파라미터 이름**  | **예시**       | **설명**                                         | **필수 여부** |
| ------------------- | ----------------- | ---------------------------------------------------- | ------------ |
| --chan-id           | Binance-Chain-XXX | BNB 체인의 체인 ID                       | 예          |
| --infraction-height | 100               | 위반 블록 높이                                  | 예          |
| --infraction-type   | DoubleSign        | 위반 타입, 'DoubleSign;Downtime'               | 예          |
| --side-chain-id     | BSC-XXX           | 검증인이 속한 사이드 체인의 체인 ID  | Yes          |

#### 예시

```bash
bnbcli slashing side-slash-history 0x625448c3f21AB4636bBCef84Baaf8D6cCdE13c3F --infraction-height 100 --infraction-type DoubleSign --side-chain-id=bsc --chain-id=test-chain-8d7sJz --home ~/home_cli
```

## 사이드 체인 슬래싱 내역 조회

### 슬래싱 `side-slash-histories` 파라미터

| **파라미터 이름** | **예시**       | **설명**                                         | **필수 여부** |
| ------------------ | ----------------- | ---------------------------------------------------- | ------------ |
| --chan-id          | Binance-Chain-XXX | BNB 체인의 체인 ID                        | 예          |
| --infraction-type  | DoubleSign        | (선택 사항) 위반 타입, 'DoubleSign;Downtime'               | 아니요       |
| --side-chain-id    | BSC-XXX           | 검증인이 속한 사이드 체인의 체인 ID  | Yes          |

#### 예시

```bash
bnbcli slashing side-slash-histories 0x625448c3f21AB4636bBCef84Baaf8D6cCdE13c3F --infraction-type DoubleSign --side-chain-id=bsc --chain-id=test-chain-8d7sJz --home ~/home_cli
```

## Query All Side Chain Slash Histories(for internal)

### 슬래싱 `side-all-slash-histories` 파라미터

| **파라미터 이름** | **예시**       | **설명**                                         | **필수 여부** |
| ------------------ | ----------------- | ---------------------------------------------------- | ------------ |
| --chan-id          | Binance-Chain-XXX | BNB 체인의 체인 ID                       | 예          |
| --side-chain-id    | BSC-XXX           | 검증인이 속한 사이드 체인의 체인 ID  | 예          |

#### 예시

```bash
bnbcli slashing side-all-slash-histories --side-chain-id=bsc --chain-id=test-chain-8d7sJz --home ~/home_cli
```
