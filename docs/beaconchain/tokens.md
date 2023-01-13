# 자산 관리

## 소개
자산은 비컨 체인에서 `토큰`으로 저장되며, 아래와 같은 관리 작업이 가능합니다. 모든 자산은 [BEP2](https://github.com/bnb-chain/BEPs/blob/master/BEP2.md)로 컴파일 됩니다.

[수수료](trading-spec.md#fees)는 다음 작업이 수행되려면 BNB로 지불되어야 합니다. 메인넷과 테스트넷의 지불 수수료는 다르게 책정됩니다.

**참고:** 이 페이지에 있는 명령어 예시를 실행하기 전에, [bnbcli에 키를 생성하거나 추가](./keys.md)해야 합니다.

**추가:** bnbcli에 전달 된 `chain-id`와 `node` 매개 변수는 상이할 수 있습니다. 메인넷의 `chain-id`는 `Binance-Chain-Tigris`가 전달되고, 테스트넷 `chain-id`는 `Binance-Chain-Ganges`가 들어갑니다. 메인넷의 최신 엔드포인트 리스트를 찾으려면, [피어 리스트](https://dex.binance.org/api/v1/peers)를 참고하세요. 테스트넷의 최신 엔드포인트 리스트를 찾으려면, [피어 리스트](https://testnet-dex.binance.org/api/v1/peers).

## 발행

`발행`은 새로운 자산을 만들기 위해 사용되는 트랜잭션입니다. 누구나 수수료를 지불하면 새 토큰을 발행할 수 있습니다. 발행 후, 토큰은 발행인의 계좌에 자유 잔액으로 표시됩니다.

발행 트랜잭션은 다음을 포함합니다:

> 참고: [BEP87](https://github.com/bnb-chain/BEPs/pull/87)는 라그랑주(Lagrange) 업그레이드 이후 도입되었습니다. 최소 기호(minimal symbol)길이를 **2**로 변경합니다.

* Source Address(원본 주소): 트랜잭션의 발신자 주소가 토큰의 `owner`(소유자)가 되며, 생성된 모든 토큰은 이 계정에 존재합니다.
* Token Name(토큰 이름): "Binance Coin" 같이 공식 이름을 나타내며, 문자가 32개로 제한됩니다.
* Symbol(심볼): 토큰의 식별자로, 대소문자 구분 없이 알파벳과 숫자료 표현됩니다. "BNB"도 심볼 표현이며, 심볼의 길이는 2~8로 가집니다. <br/>
"B" 접미사 심볼은 다른 체인에 존재하는 토큰을 가져올 때 붙입니다.<br/>
심볼끼리 같으면, "-"와 뒤에 임의의 3 문자가 추가되어 고유성 제약을 회피합니다.<br/>
이 세 글자는 `발행` 트랜잭션의 트랜잭션 해시 맨 앞 세 글자로 사용됩니다.<br/>
예시: "NNB-B90". **BNB 만 이 접미사가 없습니다.**<br/>
* Total Supply(총 공급량): 소수점 부분에 **1e8**이 곱해져서 int64로 표현됩니다. 최대 총 공급량은 900억 입니다.
* Mintable(민팅 가능): 해당 토큰이 나중에 민팅 될 수 있는지를 표기합니다. 민팅 가능하게 만들 시 `--mintable`를 더해서 설정해야 하며, 누락된 경우는 기본적으로 민팅이 불가능하게 설정됩니다.

**mainnet** 예시:

```bash
# To issue a NNB mintable token with total-supply 1 billion on mainnet
> ./bnbcli token issue --token-name "new token" --total-supply 100000000000000000 --symbol NNB --mintable --from alice  --chain-id Binance-Chain-Tigris   --node  https://dataseed5.defibit.io:443 --trust-node
```
```bash
# To issue a NNB non-mintable token with total-supply 1 billion on mainnet
> ./bnbcli token issue --token-name "new token" --total-supply 100000000000000000 --symbol NNB --from alice  --chain-id Binance-Chain-Tigris   --node  https://dataseed5.defibit.io:443 --trust-node
```
**testnet** 예시:

```bash
# To issue a NNB mintable token with total-supply 1 billion on testnet
> ./tbnbcli token issue --token-name "new bnb" --total-supply 100000000000000000 --symbol NNB --mintable --from alice --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 --trust-node

Committed at block 1887 (tx hash: B90A055DDD570AE42A7050182993A0B4DBC81A0D, ... Issued NNB-B90...)
```

```bash
# To issue a NNB non-mintable token with total-supply 1 billion on testnet
> ./tbnbcli token issue --token-name "new bnb" --total-supply 100000000000000000 --symbol NNB --from alice --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 --trust-node

Committed at block 1887 (tx hash: B90A055DDD570AE42A7050182993A0B4DBC81A0D, ... Issued NNB-B90...)
```
## 민팅
"mintable"(발행 시 작성됩니다) 상태의 토큰이 이 함수를 사용할 수 있습니다. 소수 부분에 대해 **1e8**이 곱해져서 표현됩니다. 민팅 후 총 공급량은 여전히 900억개로 제한됩니다. 토큰의 `소유자(owner)` 만이 다음 트랜잭션을 이용할 수 있습니다.

**mainnet** 예시:

```bash
 > ./bnbcli token mint --amount 100000000000000000 --symbol NNB-B90 --from alice --chain-id Binance-Chain-Tigris   --node  https://dataseed5.defibit.io:443  --trust-node
```

**testnet** 예시:

```bash
 > ./tbnbcli token mint --amount 100000000000000000 --symbol NNB-B90 --from alice --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 --trust-node
```

## 소각
소각은 일정량의 토큰을 제거하며 운영자의 잔액에서 토큰의 양이 차감됩니다. 총 공급량은 동시에 업데이트 됩니다. 토큰의 소유주만이 소각할 수 있는 권한을 지니며, 소수 부분에 대해 **1e8**이 곱해져서 표현됩니다.

**mainnet** 예시:

```bash
 > ./bnbcli token burn --amount 100000000000000000 --symbol NNB-B90 --from alice --chain-id Binance-Chain-Tigris   --node  https://dataseed5.defibit.io:443  --trust-node
```

**testnet** 예시:

```bash
 > ./tbnbcli token burn --amount 100000000000000000 --symbol NNB-B90 --from alice --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 --trust-node
```

## 동결 및 동결 해제
동결(Freeze)는 정해진 양의 토큰을 "동결" 상태로 만들어서, 동결 해제 전까지 전송이나 주문을 할 수 없도록 만듭니다.

"free" 상태에서는 누구나 자신의 토큰을 동결하거나 해제할 수 있습니다. 양은 소수 부분에 대해 **1e8**이 곱해져서 표현됩니다.

**mainnet** 예시:

```bash
> ./bnbcli token freeze --amount 20000000000000000 --symbol NNB-B90 --from alice --chain-id Binance-Chain-Tigris   --node  https://dataseed5.defibit.io:443 --trust-node
```


```bash
> ./bnbcli token unfreeze --amount 20000000000000000 --symbol NNB-B90 --from alice --chain-id Binance-Chain-Tigris   --node  https://dataseed5.defibit.io:443  --trust-node
```

**testnet** 예시:

```bash
> ./tbnbcli token freeze --amount 20000000000000000 --symbol NNB-B90 --from alice --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 --trust-node
```

```bash
> ./tbnbcli token unfreeze --amount 20000000000000000 --symbol NNB-B90 --from alice --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 --trust-node
```

## 소유권 전송(TransferOwnership)

> 참고: [BEP82](https://github.com/binance-chain/BEPs/pull/82)는 새 트랜잭션 유형을 추가하기 위해 라그랑주(Lagrange) 업그레이드 이후 구현되었습니다.

**TransferOwnership** 트랜잭션은 **0.01 BNB**가 부과됩니다.


**mainnet** 예시:

```bash
./bnbcli token transfer-ownership --from  $current-owner --symbol $symbol --new-owner $new-owner  --chain-id Binance-Chain-Tigris   --node  https://dataseed5.defibit.io:443 --trust-node
```
**testnet** 예시:

```bash
./tbnbcli token transfer-ownership --from  $current-owner --symbol $symbol --new-owner $new-owner --chain-id Binance-Chain-Nile  --node=data-seed-pre-2-s1.binance.org:80--trust-node
```
