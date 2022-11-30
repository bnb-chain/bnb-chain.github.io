---
sidebar_label: BEP8 Token Protocol
hide_table_of_contents: false
sidebar_position: 2
---

# 소개

현재 바이낸스 DEX에 BEP2 토큰을 발행하려면 1500BNB가 소요되는데, 이는 작지만 유망한 프로젝트들에게 장벽으로 작용합니다. [BEP8](https://github.com/bnb-chain/BEPs/blob/master/BEP8.md)에 나와있는 것처럼, BEP8 토큰은 소규모 프로젝트나 지적 재산권 및 기타 소규모 토큰 경제를 사용하는 프로젝트들의 포괄적인 토큰 거래를 위해 구축되었습니다.

네트워크의 제한된 사용량에 따라, BEP8 토큰의 발행 및 상장 비용은 다양한 규모로 최소화 됩니다. 거기에 BEP8 토큰 발행인은 검증인의 투표 절차를 걸치지 않고 BNB와 BUSD 거래쌍을 직접 상장할 수 있습니다. BEP8의 스테이블 코인 쌍은 사용자 편의성을 증대시키며 BEP8 쌍들끼리 교환이 가능해질 것입니다.

기존 주식 시장의 SME 보드와 비슷하게, BEP8 토큰 시장은 상장을 위한 자본 요건을 없애 스타트업의 유틸리티 토큰이나 지적 재산권(IP) 토큰의 유동성을 높일 것입니다. 이것의 좋은 예시 중 하나가 오픈 소스 라이센스 모델입니다. 소프트웨어 개발자는 BEP8 토큰을 발행하여 그의 작업과 연결할 수 있습니다. 발행한 토큰은 그의 작업에 대한 라이센스 비용을 충당하는데 사용될 수 있습니다.

## 토큰 관리

### 발행

`발행`은 새로운 자산을 생성하기 위한 트랜잭션입니다. 누구나 수수료를 지불하면 새로운 토큰을 발행할 수 있습니다. 발행 후, 발행인 계정에 있는 토큰은 자유 잔액으로 표시됩니다.

발행 트랜잭션은 다음을 포함합니다:

* Symbol: 길이 3에서 8사이의 숫자나 대소문자 구분 없는 알파벳으로 자산을 표현한 문자열. 심볼은 알고리즘에 의해 자동으로 생성된 접미사가 존재하는데, 이는 발행 트랜잭션 해시의 첫 3바이트와 문자 "M"입니다.
* TokenURI: 토큰의 고유한 리소스 식별자 URI(Uniform Resource Identifier) 이며, 기입은 선택 사항입니다. URI는 "Mini-BEP2 Metadata JSON Schema"를 준수하는 JSON 파일을 가리킬 수 있습니다. 스키마 또한 선택 사항입니다.
* TokenType: `tiny token`은 **1**로 `Mini token`은 **2**로 표현합니다. tiny token의 총 공급 범위는 [1-10000]이며 mini token은 [1-100만]입니다. Mini-token은 상장 시 tiny-token보다 가격이 더 많이 듭니다.
* TotalSupply: 토큰의 총 공급량은 소수 8자리까지 표현할 수 있으며 int64 형태로 저장하기 위해 1e8이 곱해서 나타냅니다. 곱하기 전 나타나는 양은 공급 범위의 상항을 초과하면 안 됩니다.
* Owner: 토큰의 초기 발행인을 나타내며, 발행인의 BNB 잔고가 발행 수수료보다 커야 합니다.
* Mintable: 토큰이 초기 민팅 이후 추가 민팅(증가)이 가능한지 나타내며, `--mintable` 은 발행량이 증가할 수 있다는 것을 나타냅니다.

#### 명령어

**mainnet** 예시:

```bash
./bnbcli token issue-tiny --home $home -s $symbol --token-name $token_name -n 10000 --mintable --from $from --token-uri http://www.example.com --chain-id Binance-Chain-Tigris   --node  https://dataseed5.defibit.io:443 --trust-node
```

```bash
./bnbcli token issue-mini --home $home -s $symbol --token-name $token_name -n 1000000 --mintable --from $from --token-uri http://www.example.com --chain-id Binance-Chain-Tigris   --node  https://dataseed5.defibit.io:443 --trust-node
```

### 전송

트랜잭션 종류, 메세지 구조와 트랜잭션 과정은 BEP2 토큰과 동일하지만, Mini-BEP2는 전송 금액이 1보다 크거나 같아야 합니다. 아니면 계정에 있는 자유 Mini-BEP2 토큰 전체를 보내야 합니다.

#### 명령어

**mainnet** 예시:
```bash
./bnbcli send --from $from-key-alias --to to-address --amount 200000000:mini-token-symbol --chain-id Binance-Chain-Tigris --node  https://dataseed5.defibit.io:443 --json
```

### 동결(Freeze)

트랜잭션 종류, 메세지 구조와 트랜잭션 과정은 BEP2 토큰과 동일하지만, Mini-BEP2는 금액이 1보다 크거나 같거나, 자유 계정 잔고와 같아야 합니다.

#### 명령어

**mainnet** 예시:

```bash
./bnbcli token freeze --amount 200000000 --symbol $mini-token-symbol --from alice --chain-id Binance-Chain-Tigris   --node  https://dataseed5.defibit.io:443 --trust-node
```

### 동결 해제

트랜잭션 종류, 메세지 구조와 트랜잭션 과정은 BEP2 토큰과 동일하지만, Mini-BEP2는 금액이 1보다 크거나 같거나, 동결된 계정 잔고와 같아야 합니다.

#### 명령어

**mainnet** 예시:

```bash
./bnbcli token unfreeze --amount 200000000 --symbol $mini-token-symbol --from alice --chain-id Binance-Chain-Tigris   --node  https://dataseed5.defibit.io:443  --trust-node
```

### 민팅

트랜잭션 종류, 메세지 구조와 트랜잭션 과정은 BEP2 토큰과 동일하지만, Mini-BEP2는 민팅 금액이 1보다 크거나 같아야 합니다.

#### 명령어

**mainnet** 예시:

```bash
./bnbcli token mint --amount 10000000000 --symbol $mini-token-symbol --from alice --chain-id Binance-Chain-Tigris   --node  https://dataseed5.defibit.io:443  --trust-node
```

### 소각

트랜잭션 종류, 메세지 구조와 트랜잭션 과정은 BEP2 토큰과 동일합니다. BEP2 소각과 Mini-BEP2 소각의 다른 저점은 소각량이 1보다 크거나 같은 경우나, 자유 계정 잔고와 같아야 합니다.

#### 명령어

**mainnet** 예시:

```bash
./bnbcli token burn --amount 100000000000 --symbol $mini-token-symbol --from alice --chain-id Binance-Chain-Tigris   --node  https://dataseed5.defibit.io:443  --trust-node
```


### 토큰 URI 설정하기

SetURI 트랜잭션은 `TokenURI`의 값을 바꾸기 위해 설계되었습니다. **토큰 발행인**만이 이 트랜잭션을 보낼 수 있습니다. URI는 "Mini-BEP2 Metadata JSON Schema"를 준수하는 JSON 파일을 가리킬 수 있습니다.

```json

{
  "name": "Mini Token Metadata",
  "description": "Metadata description for the Mini Token",
  "external_url": "https://example.com/token",
  "image": "https://example.com/token/1.png",
  "attributes": [
    {
      "name": "custom field",
      "value": "custom value"
    },
    ...
  ]
}
```

#### 명령어

**mainnet** 예시:

```bash
./bnbcli token set-uri-mini --symbol $mini-token-symbol --token-uri http://www.efg.com --from alice --chain-id Binance-Chain-Tigris   --node  https://dataseed5.defibit.io:443  --trust-node
```

### 바이낸스 DEX에 BEP8 토큰 상장

BEP2 토큰 상장과 다른 과정을 거칩니다. BEP8 토큰 발행자는 Mini-BEP2 토큰을 비컨 체인 검증인 동의 없이 상장할 수 있습니다. BEP8 토큰은 BNB나 BUSD쌍으로만 상장될 수 있으며 BEP8 토큰을 인용 부호(quote symbol)로 상장할 수 없습니다.

**다음은 트랜잭션에 필요한 매개 변수입니다:**

| **Field**    | **타입** | **설명**                                              |
| :------------ | :-------- | :------------------------------------------------------------ |
| base-asset-symbol | string | 상장할 Mini BEP2 토큰 |
|quote-asset-symbol| string|BNB와 BUSD만 인용 자산(quote asset)으로 지원합니다|
|init-price|int64|자산의 초기값, 1e8 곱해져서 표시|
|from|Bech32_address|기초 자산의 발행 주소|

#### 명령어

```bash
./bnbcli dex list-mini -s=$mini-token-symbol --quote-asset-symbol=BNB --init-price=1000000000 --from=alice --chain-id Binance-Chain-Tigris   --node  https://dataseed5.defibit.io:443  --trust-node
```

## BEP8 토큰 거래 쌍 매칭

BEP8 거래 쌍은 BEP2 쌍보다 제안 및 상장 가격이 저렴하여 더 많을 수 있습니다. 다만 이들은 제한된 네트워크 자원만 사용하도록 설계되어, 바이낸스 DEX 매치 엔진은 BEP8 쌍에 고정된 자원만 할당할 것입니다. 따라서 BEP2 토큰과는 다르게, BEP8 거래 쌍은 모든 블록에서 매칭되지 않으며, 16블록 내 1번 이상 매칭 되는 것만 보장됩니다.

### 주문하기

Mini-BEP2 토큰의 최소 주문량은 **1**보다 같거나 커야 한다. 여기서 1은 내부적으로 1e8이 곱해져 있어 소수점 8자리 수를 의미한다. 유일하게 예외인 경우는 사용자가 자신의 계정에 있는 자유 BEP 토큰 전체를 파는 경우입니다.

### 상장 폐지
Mini-BEP2 토큰 쌍의 상장 폐지는 BEP2와 같습니다. 해당 절차는 비컨 체인 검증인의 동의가 필요합니다.

## 테스트넷 수수료 표

API URL: <https://testnet-dex.binance.org/api/v1/fees?format=amino>

트랜잭션 종류  | BNB로 결제 |
-- | -- |
TinyIssueFee | 2 |
MiniIssueFee | 3 |
SetUri| 0.000375 |
BEP8 상장| 8 |

