# 상장 트랜잭션

비컨 체인 상에서 [BEP2](https://github.com/bnb-chain/BEPs/blob/master/BEP2.md) 토큰으로 발행된 자산만이 상장될 수 있습니다. BEP2 토큰을 발행하는 방법은 [여기](tokens.md)에 있습니다. 만일 토큰의 상장 제인이 검증인들에 의해 통과되면, `list` 트랜잭션을 `expire-time`전에 전송해야 합니다.

## 상장 수수료
수수료는 토큰을 발행할 때, 제안을 생성할 때, 예치할 때와 상장할 때 청구됩니다. 금액은 [거래 세부 수수료 테이블](trading-spec.md)을 참고하면 됩니다.

## 트랜잭션 상장

### 제안 매개 변수
* `quote-asset-symbol`: 현재는, BNB 만 견적 자산(quote asset)으로 지원합니다.
* `init-price`: 자산의 초기 값으로, 소수점 값에 **1e8**이 곱해져 표현됩니다.
* `proposal-id`: 통과된 상장 제안의 고유 id값 입니다.
* `from`: 기초 자산의 발행인의 주소와 같아야 합니다


**mainnet** 예시:
```bash

$  ./bnbcli dex list -s AAA-254 --quote-asset-symbol BNB --from test \
--init-price 100000000 --proposal-id 15 --chain-id Binance-Chain-Tigris   --node  https://dataseed5.defibit.io:443  --json
{
   "Height":"282409",
   "TxHash":"77AE3D190F430FE6E4B1A9659BEBB3F022CF7631",
   "Response":{
      "log":"Msg 0: ",
      "tags":[
         {
            "key":"YWN0aW9u",
            "value":"ZGV4TGlzdA=="
         }
      ]
   }
}
```

**testnet** 예시:

```bash
$  ./tbnbcli dex list -s AAA-254 --quote-asset-symbol BNB --from test \
--init-price 100000000 --proposal-id 15 --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 --json
{
   "Height":"282409",
   "TxHash":"77AE3D190F430FE6E4B1A9659BEBB3F022CF7631",
   "Response":{
      "log":"Msg 0: ",
      "tags":[
         {
            "key":"YWN0aW9u",
            "value":"ZGV4TGlzdA=="
         }
      ]
   }
}
```

트랜잭션이 실행된 후, 새롭게 추가된 거래 쌍을 탐색기나 마켓 API에서 조회할 수 있습니다.


