#  계정

새 주소가 자산을 받을 때마다 해당 트랜잭션은 그 주소의 계정을 만듭니다. 계정에는 그 주소가 보유한 모든 자산의 잔고를 포함하고 있습니다.

## 계정 잔고

각 자산의 잔고 (토큰의 양)는 3가지 부분으로 구성되어 있습니다:

- Available: 전송하거나 다른 자산을 교환(구매)할 수 있는 토큰의 양
- Locked: 미결 주문에 사용된 토큰의 양. 주문이 만료된 후 (성공, 취소나 기한이 만료될 시), 잠긴 양이 감소할 것입니다.
- Frozen: 동결 트랜잭션에 의해 동결된 토큰의 양.

계정 정보는 메인넷에서 다음 명령어를 통해 요청할 수 있습니다:

```
./bnbcli account <your-address> --chain-id Binance-Chain-Tigris --node https://dataseed5.defibit.io:443 --indent --trust-node
```

출력 예시:

참고로 양(amount)은 e^8 이 곱해져 표현되어 있습니다. (1은 소수점 8자리수를 의미합니다)

```
{"type":"bnbchain/Account","value":{"base":{"address":"tbnb1sylyjw032eajr9cyllp26n04300qzzre38qyv5","coins":[{"denom":"000-0E1","amount":"10530"},{"denom":"BNB","amount":"247349863800"},{"denom":"BTC.B-918","amount":"113218800"},{"denom":"COSMOS-587","amount":"50000101983748977"},{"denom":"EDU-DD0","amount":"139885964"},{"denom":"MFH-9B5","amount":"1258976083286"},{"denom":"NASC-137","amount":"0"},{"denom":"PPC-00A","amount":"205150260"},{"denom":"TGT-9FC","amount":"33251102828"},{"denom":"UCX-CC8","amount":"1398859649"},{"denom":"USDT.B-B7C","amount":"140456966268"},{"denom":"YLC-D8B","amount":"210572645"},{"denom":"ZZZ-21E","amount":"13988596"}],"public_key":{"type":"tendermint/PubKeySecp256k1","value":"AhOb3ZXecsIqwqKw+HhTscyi6K35xYpKaJx10yYwE0Qa"},"account_number":"406226","sequence":"29"},"name":"","frozen":null,"locked":[{"denom":"KOGE48-35D","amount":"10000000000"}]}}
```

결과를 통해 account_number가 406226이고 sequence가 29인 것을 볼 수 있습니다. 이는 이 계정의 중요한 정보입니다.

## 계정과 시퀸스 넘버
계정이 생성된 후 잔고를 제외하고 계정은 다음 계수를 갖고 있습니다:

- 계정 넘버(Account Number): 내부에서 사용하는 계정 식별자
- 시퀸스 넘버(Sequence Number): 지속적으로 변화하는 정수.

`시퀸스 넘버`는 비컨 체인이 리플레이 공격을 방지하는데 사용됩니다(코스모스 네트워크의 아이디어를 차용했으며, 취급 방법은 약간 다릅니다). 모든 트랜잭션은 계정의 최근 시퀸스 넘버에서 1을 증가시킨 새로운 시퀸스 수를 가져야 하며, 이 트랜잭션이 블록체인에 기록된 후에 시퀸스 수는 최근 처리된 트랜잭션의 스퀸스 넘버와 같도록 설정됩니다.

이 원리는 클라이언트들이 블록체인 API를 사용하여 읽거나 로컬에서 시퀸스 넘버를 세고 관리하도록 만듭니다. 보통 로컬에서 계속 시퀸스 넘버를 세면서 주기적으로 블록체인에 재동기화 하는 것을 권장하고 있습니다.