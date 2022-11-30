# 바이낸스 DEX 거래 규격

## 주문

주문은 클라이언트가 토큰을 바이낸스 DEX에서 구매/판매하여 다른 토큰과 거래하는 요청입니다.
비컨 체인 트랜잭션의 표준 유형으로, 다음과 같은 매개 변수로 이루어져 있습니다.

0. Symbol Pairs(심볼 쌍): the list pair the order wants to trade.
1. Order Type(주문 타입): Binance DEX 는 제한 주문만 가능합니다. SEC에서 정의한 제한 주문(LIMIT orders) 개념에 의거한 
2. Price(가격): price users would like to pay for the specified token quantity, presented as a float
number of quote currency. This must be rounded by tick size. Internally it can be multiplied by 1e8(10^8) in order to store as an integer
in the range of int64.
3. Quantity(양): number of tokens users want to buy or sell. That must be rounded by lot size. Internally it can be multiplied by
1e8(10^8) in order to store as an integer in the range of int64.
4. Side(구매/판매): buy or sell
5. Time(시간): entry time of the order, which is the block number(height) the order gets booked in.
6. TimeInForce(시간 제한):

    * GTE: Good Till Expire. Order would stay effective until expire time. Order may expire in the UTC midnight after more than 259, 200 blocks, which is 72 hours in term of blocking time.
    * IOC: Immediate or Cancel. Orders would be executed as much as it can in the booking block
    round and then got canceled back if there is still quantity left.

주문이 기각되는 경우:

0. 유저 주소는 자산과 함께 위치하지 않습니다
1. 계정이 구매/판매를 위한 토큰을 충분히 보유하지 않는 경우
2. 거래소가 다운되거나 매칭에 문제가 있는 경우
3. 토큰이 기초 자산에 대해 상장되어 있지 않은 경우
4. 다른 주문 매개 변수가 유효하지 않을 때
5. 주문 ID가 중복되었을 때

주문이 취소/만료되는 경우:

1. IOC 주문이 order not fully filled
2. 주문이 만료될 때
3. 거래소에서 주문 추가로 처리시 문제가 발생할 때

After orders are received by any blockchain node, the node would try to submit the order transaction
onto a block with consensus. After the order is accepted in an block, 2 things would happen,

1. the assets that may transfer with the order would be locked and cannot be transferred;
2. the Binance DEX would try to match the order against any existing orders or new orders from the same block.

If the order can match with any opposite side, the trade would be generated and the assets would be
transferred. The fully filled orders would be removed from the order book, while the unfilled or
partially filled GTE would stay on the order book until it is filled by others; unfilled or
partially filled IOC order would be canceled.

### Order Lifecycle

Valid orders sent to the matching engine are confirmed immediately and are in the **Ack** state andinvalid orders will be **FailedMatching** state. GTE and IOC orders have different lifecycle.

For IOC order, if an IOC order executes against another order immediately as a whole, the order is considered **FullyFill**. An IOC order can execute in part and ends in **IocExpire** state. If no part of the IOC order is filled, will be considered **IocNoFill**.

For GTE order, if a GTE order can execute against another order as a whole, the order is considered **FullyFill**. Any part of the order not filled immediately, will be considered open. Orders will stay in the open until it's canceled or subsequently filled by new orders. Canceled GTE orders are in the **Canceled** state. Orders that are no longer eligible for matching are in the **Expired** state.

### 주문 만료

Order would expire after 72 hours once it is booked on a block. A whole order book scan would happen every UTC mid-night to filter out all the expired orders. After the scan, all the expired orders would be removed from the order book, the locked quantity in the account would be unlocked. Before this action all the existing orders in the order book is subject to matching.

!!! Tip
        As discussed in [BEP-67](https://github.com/bnb-chain/BEPs/blob/master/BEP67.md), those orders in the best 500 price levels on both ask and bid side will be expired after **30 days** instead of 72 hours. Meanwhile, the expiration fee is unchanged. BEP67 is already implemented and has been activated after Testnet Nightingale Upgrade. Beacon Chain  Mainnet will be upgraded to support BEP-67 soon.

## Precision

All the numbers are limited to 8-digit decimals.

## 틱(tick) 크기와 로트(lot) 크기

Tick size stands for the smallest unit on price change, while lot size stands for the smallest
quantity change. Order price must be larger than and rounded to 1 tick size and order quantity
must be larger than and rounded to 1 lot size, otherwise orders would be rejected.

Tick size and lot size can be queried from DEX API, and they would be reviewed and changed
by DEX match engine automatically according to the trading price every UTC mid-night. Once
the tick size or/and lot size is changed, new orders must stick to the new values while the
existing orders on the order book can still be traded.

## 수수료

5가지 종류의 주문 작업이 존재하며, 각 아래 표와 같이 구체적인 수수료 계산 논리와 수령 시기를 가지고 있다.
We have five kinds of order operations, each kind has its specific fee calculation logic and collection timing as the table described below.

| Operation    |  Calculation  |  Collection Timing |
|:------------- |:------- |:------- |
| Place order | free | - |
| Cancel order| fixed fees | when the `Cancel` transaction executes |
| Order expire| fixed fees if fully expired, otherwise free| when the scheduled order expiration happenes |
| IOC order cancel| fixed fees if fully canceled, otherwise free| when the IOC order is not fully filled |
| Order execution | rate based fees | when the order matched |

BNB is the priority in the fee collection and has some discounts.

DEX would always calculate and collect the fees based on the latest balance and in the best interest of users.


### 메인넷의 현재 수수료 표

수수료는 변수이며 거버넌스 제안 및 투표에 의해 변경될 수 있습니다. 해당 수수료 표는 **2021-03-21** 메인넷 기준입니다:

트랜잭션 유형 | BNB 아닌 자산으로 결제 | BNB로 결제 | Exchange (DEX) 관련
-- | -- | -- | --
새 주문 | 0 | 0 | Y
취소 (No Fill) | Equivalent 0.00005 BNB | 0.00001 BNB | Y
Order Expire (No Fill) | Equivalent 0.00005 BNB | 0.00001 BNB | Y
IOC (No Fill) | Equivalent 0.00025 BNB | 0.000005 BNB | Y
전송 | N/A | 0.000075 BNB | N
crossTransferOut(크로스 전송)| N/A | 0.000075 BNB | N
Multi-send(다중 전송) | N/A | 0.00006 BNB | N
자산 발행 | N/A | 10 BNB |
자산 민팅 | N/A | 0.002 BNB | N
소유권 이전 | N/A | 0.002 BNB | N
자산 소각 | N/A | 0.002 BNB | N
자산 동결/해제 | N/A | 0.001 BNB | N
자산 잠금/해제/다시 잠금 | N/A | 0.002 BNB | N
자산 상장 | N/A | 200 BNB | N
Submit Proposal | N/A | 1 BNB | N
예치 | N/A | 0.000125 BNB | N
메모 체크 활성화 | N/A | 0.2 BNB | N
메모 체크 비활성화 | N/A | 0.2 BNB | N
HTLT | N/A | 0.000075 BNB | N
depositHTLT | N/A |  0.000075 BNB | N
claimHTLT | N/A |  0.000075 BNB | N
refundHTLT | N/A |  0.000075 BNB | N
refundHTLT | N/A |  0.000075 BNB | N
TinyIssueFee | N/A | 0.4 BNB | N
MiniIssueFee | N/A | 0.6 BNB | N
SetTokenUri | N/A| 0.000075 BNB | N
BEP8 토큰 상장 | N/A| 1 BNB | N
새로운 스마트 체인 검증인 생성 | N/A |2 BNB |N
스마트 체인 검증인 정보 수정 |N/A| 0.2 BNB |N
스마트 체인 검증인 위임 |N/A| 0.0002 BNB |N
스마트 체인 검증인 재위임 | N/A|0.0006 BNB |N
스마트 체인 검증인 위임 해제 | N/A|0.0004 BNB |N
스마트 체인 검증인 탈옥 | N/A| 0.5 BNB | N
스마트 체인 검증인 비잔틴 행동 증거 제출 | N/A| 0.5 BNB| N
스마트 체인 제안 제출 | N/A | 1 BNB    | N
스마트 체인 제안 예치 | N/A |0.00025 BNB | N
스마트 체인 제안 투표  | N/A | 0 BNB   | N
크로스 외부 전송 릴레이어 보상 | N/A | 0.0004 BNB    | N


### 메인넷 수수료 API

실시간으로 업데이트되는 시스템 수수료를 [여기](https://dex.binance.org/api/v1/fees)에서 확인하세요.


### 다중 전송 수수료
`bnbcli`  offers you a multi-send command to transfer multiple tokens to multiple people. 20% discount is available for `multi-send` transactions. For now, `multi-send` transaction will send some tokens from one address to multiple output addresses. If the count of output address is bigger than the threshold, currently it's 2, then the total transaction fee is  0.0003 BNB per token per address.
For example, if you send 3 ABC token,1 SAT token and 1 ABC to 3 different addresses.

```json
[
   {
      "to":"bnb1g5p04snezgpky203fq6da9qyjsy2k9kzr5yuhl",
      "amount":"100000000:BNB,100000000:ABC"
   },
   {
      "to":"bnb1l86xty0m55ryct9pnypz6chvtsmpyewmhrqwxw",
      "amount":"100000000:BNB"
   },
   {
      "to":"bnb1l86xty0maxdgst9pnypz6chvtsmpydkjflfioe",
      "amount":"100000000:BNB,100000000:SAT"
   }
]
```
다중 전송에 대해 메인넷/테스트넷에서 수수료를 지불합니다

```
0.0003 BNB * 5 = 0.0015 BNB
```

### 거래 수수료

거래 수수료는 복잡한 로직으로 작동하여 are subject to complex logic that may mean that individual trades are not charged exactly by the rates below, but between them instead; this is due to the block-based matching engine in use on the DEX.

핸제 거래 수수료는 다음과 같습니다:

트랜잭션 유형 | BNB 아닌 자산으로 결제 | BNB로 결제
-- | -- | --
거래 | 0.1% | 0.05%

거래수수료는 [여기](https://dex.binance.org/api/v1/fees?format=amino)에서 쿼리할 수 있습니다. "params/DexFeeParam/" 아래에 존재하며, "FeeRate"와 "FeeRateNative"는 10^-6 단위를 표현합니다.

### 테스트넷의 현재 수수료 표

수수료는 변수이며 거버넌스 제안 및 투표에 의해 변경될 수 있습니다. 해당 수수료 표는 **2021-03-17** 테스트넷 기준입니다:


트랜잭션 유형 | BNB 아닌 자산으로 결제 | BNB로 결제 | Exchange (DEX) 관련
-- | -- | -- | --
새 주문 | 0 | 0 | Y
취소 (No Fill) | 0.00005 BNB 환산 | 0.00001 BNB | Y
주문 만료 (No Fill) | 0.00005 BNB 환산 | 0.00001 BNB | Y
IOC (No Fill) | 0.00025 BNB 환산 | 0.000005 BNB | Y
전송 | N/A | 0.000075 BNB | N
crossTransferOut(크로스 전송) | N/A | 0.000075 BNB | N
Multi-send(다중 전송) | N/A | 0.00006 BNB | N
자산 발행 | N/A | 10 BNB |
자산 민팅 | N/A | 0.002 BNB | N
소유권 이전 | N/A | 0.002 BNB | N
자산 소간 | N/A | 0.002 BNB | N
자산 동결/해제 | N/A | 0.001 BNB | N
자산 잠금/해제/다시 잠금 | N/A | 0.002 BNB | N
자산 상장 | N/A | 200 BNB | N
제안 제출 | N/A | 1 BNB | N
예치 | N/A | 0.000125 BNB | N
메모 체크 활성화 | N/A | 0.2 BNB | N
메모 체크 비활성화 | N/A | 0.2 BNB | N
HTLT | N/A | 0.000075 BNB | N
depositHTLT | N/A |  0.000075 BNB | N
claimHTLT | N/A |  0.000075 BNB | N
refundHTLT | N/A |  0.000075 BNB | N
refundHTLT | N/A |  0.000075 BNB | N
TinyIssueFee | N/A | 0.4 BNB | N
MiniIssueFee | N/A | 0.6 BNB | N
SetTokenUri | N/A| 0.000075 BNB | N
BEP8 토큰 상장 | N/A| 1 BNB | N
새로운 스마트 체인 검증인 생성 | N/A |2 BNB |N
스마트 체인 검증인 정보 수정 | N/A | 0.2 BNB |N
스마트 체인 검증인 위임 | N/A | 0.0002 BNB |N
스마트 체인 검증인 재위임 | N/A |0.0006 BNB |N
스마트 체인 검증인 위임 해제 | N/A|0.0004 BNB |N
스마트 체인 검증인 탈옥 | N/A| 0.5 BNB | N
스마트 체인 검증인 비잔틴 행동 증거 제출 | N/A | 0.5 BNB| N
스마트 체인 제안 제출 | N/A | 1 BNB    | N
스마트 체인 제안 예치 | N/A |0.00025 BNB | N
스마트 체인 제안 투표   | N/A | 0 BNB   | N
크로스 외부 전송 릴레이어 보상  | N/A | 0.0004 BNB    | N


### 테스트넷 수수료 API

실시간으로 업데이트되는 시스템 수수료를 [여기](https://testnet-dex.binance.org/api/v1/fees)에서 확인하세요.

### 참고

- 거래 수수료의 경우 암묵적으로 결정되며, 다른 트랜잭션의 수수료들은 고정입니다.
It is free to send 새로운 GTE 주문을 보내거나, 일부 체결된 주문을 취소할 때 시스템이 일부 체결 주문(GTE나 IOC)을 만료시킬 때 수수료가 청구되지 않습니다.

- 거래와 관련 없는 트랜잭션이 발생하면 수수료를 지불해야 하며, BNB로만 결제할 수 있습니다. 트랜잭션은 충분한 BNB가 없으면 거절됩니다.

- 거래 관련 트랜잭션은 주문이 체결 되거나 부분 체결 없이 취소/만료/IOC-만료될 때 수수료가 청구됩니다. 지불하기 위한 BNB가 충분하다면, BNB 수수료 구조가 사용되고, 아니면 BNB아닌 수수료 구조를 사용하여 청구합니다.
- 모든 주문 값과 자유 잔고애 수수료를 지급하기 위한 금액이 부족할 때, 들어오는 모든 자산 및 잔여 잔액이 청구됩니다.
