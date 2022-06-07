# Binance DEX Trading Specification

## Orders

Orders are the requests for client to buy or sell tokens into other tokens on Binance DEX.
It is a standard type of Beacon Chain  transaction. Orders are composed of the below parameters.

0. Symbol Pairs: the list pair the order wants to trade.
1. Order Type: Binance DEX only accept LIMIT orders, which is adhering to SEC definitions of LIMIT orders
2. Price: price users would like to pay for the specified token quantity, presented as a float
number of quote currency. This must be rounded by tick size. Internally it can be multiplied by 1e8(10^8) in order to store as an integer
in the range of int64.
3. Quantity: number of tokens users want to buy or sell. That must be rounded by lot size. Internally it can be multiplied by
1e8(10^8) in order to store as an integer in the range of int64.
4. Side: buy or sell
5. Time: entry time of the order, which is the block number(height) the order gets booked in.
6. TimeInForce:

    * GTE: Good Till Expire. Order would stay effective until expire time. Order may expire in the UTC midnight after more than 259, 200 blocks, which is 72 hours in term of blocking time.
    * IOC: Immediate or Cancel. Orders would be executed as much as it can in the booking block
    round and then got canceled back if there is still quantity left.

Orders would be rejected when:

0. user address cannot be located with asset
1. Account does not possess enough token to buy or sell
2. Exchange is down or has problem to match it
3. The token is not listed against any base currencies
4. Other order parameters are not valid
5. Duplicated order ID

Orders may be canceled / expired back when:

1. IOC order not fully filled
2. Order expired
3. Exchange has problem to handle further with the orders

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

### Order Expire

Order would expire after 72 hours once it is booked on a block. A whole order book scan would happen every UTC mid-night to filter out all the expired orders. After the scan, all the expired orders would be removed from the order book, the locked quantity in the account would be unlocked. Before this action all the existing orders in the order book is subject to matching.

!!! Tip
        As discussed in [BEP-67](https://github.com/bnb-chain/BEPs/blob/master/BEP67.md), those orders in the best 500 price levels on both ask and bid side will be expired after **30 days** instead of 72 hours. Meanwhile, the expiration fee is unchanged. BEP67 is already implemented and has been activated after Testnet Nightingale Upgrade. Beacon Chain  Mainnet will be upgraded to support BEP-67 soon.

## Precision

All the numbers are limited to 8-digit decimals.

## Tick Size and Lot Size

Tick size stands for the smallest unit on price change, while lot size stands for the smallest
quantity change. Order price must be larger than and rounded to 1 tick size and order quantity
must be larger than and rounded to 1 lot size, otherwise orders would be rejected.

Tick size and lot size can be queried from DEX API, and they would be reviewed and changed
by DEX match engine automatically according to the trading price every UTC mid-night. Once
the tick size or/and lot size is changed, new orders must stick to the new values while the
existing orders on the order book can still be traded.

## Fees

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


### Current Fees Table on Mainnet

Fees are variable and may change over time as governance proposals are proposed and voted on. The current fees table for **Mainnet** as of **2021-03-21** is as follows:

Transaction Type | Pay in Non-BNB Asset | Pay in BNB | Exchange (DEX) Related
-- | -- | -- | --
New Order | 0 | 0 | Y
Cancel (No Fill) | Equivalent 0.00005 BNB | 0.00001 BNB | Y
Order Expire (No Fill) | Equivalent 0.00005 BNB | 0.00001 BNB | Y
IOC (No Fill) | Equivalent 0.00025 BNB | 0.000005 BNB | Y
Transfer | N/A | 0.000075 BNB | N
crossTransferOut| N/A | 0.000075 BNB | N
Multi-send | N/A | 0.00006 BNB | N
Issue Asset | N/A | 10 BNB |
Mint Asset | N/A | 0.002 BNB | N
Transfer ownership| N/A | 0.002 BNB | N
Burn Asset | N/A | 0.002 BNB | N
Freeze/Unfreeze Asset | N/A | 0.001 BNB | N
Lock/unlock/relock Asset | N/A | 0.002 BNB | N
List Asset | N/A | 200 BNB | N
Submit Proposal | N/A | 1 BNB | N
Deposit | N/A | 0.000125 BNB | N
Enable Memo Check | N/A | 0.2 BNB | N
Disable Memo Check | N/A | 0.2 BNB | N
HTLT | N/A | 0.000075 BNB | N
depositHTLT | N/A |  0.000075 BNB | N
claimHTLT | N/A |  0.000075 BNB | N
refundHTLT | N/A |  0.000075 BNB | N
refundHTLT | N/A |  0.000075 BNB | N
TinyIssueFee | N/A | 0.4 BNB | N
MiniIssueFee | N/A | 0.6 BNB | N
SetTokenUri | N/A| 0.000075 BNB | N
List BEP8 Token| N/A| 1 BNB | N
Create A New Smart Chain Validator | N/A |2 BNB |N
Edit Smart Chain Validator Information|N/A| 0.2 BNB |N
Delegate Smart Chain Validator |N/A| 0.0002 BNB |N
Redelegate Smart Chain Validator | N/A|0.0006 BNB |N
Undelegate Smart Chain Validator | N/A|0.0004 BNB |N
Unjail A Smart Chain Validator | N/A| 0.5 BNB | N
Submit Byzaitine Behavior Evidence of A Smart Chain Validator | N/A| 0.5 BNB| N
Submit Smart Chain Proposal | N/A| 1 BNB    | N
Smart Chain Proposal Deposit | N/A|0.00025 BNB | N
Smart Chain Proposal Vote   | N/A| 0 BNB   | N
Cross transfer out relayer reward  | N/A| 0.0004 BNB    | N


### Mainnet Fees API

View system fees updated in real time [here](https://dex.binance.org/api/v1/fees).


### Multi-send Fees
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
You will pay on mainnet/testnet

```
0.0003 BNB * 5 = 0.0015 BNB
```

### Trading Fees

Trading fees are subject to complex logic that may mean that individual trades are not charged exactly by the rates below, but between them instead; this is due to the block-based matching engine in use on the DEX.

The current fee for trades, applied on the settled amounts, is as follows:

Transaction Type | Pay in non-BNB Asset | Pay in BNB
-- | -- | --
Trade | 0.1% | 0.05%

Trading fee can be queried at [here](https://dex.binance.org/api/v1/fees?format=amino). It's under the "params/DexFeeParam/".  "FeeRate" and "FeeRateNative" are both under unit of 10^-6.

### Current Fees Table on Testnet

Fees are variable and may change over time as governance proposals are proposed and voted on. The current fees table for Testnet as of **2021-03-17** is as follows:


Transaction Type | Pay in Non-BNB Asset | Pay in BNB | Exchange (DEX) Related
-- | -- | -- | --
New Order | 0 | 0 | Y
Cancel (No Fill) | Equivalent 0.00005 BNB | 0.00001 BNB | Y
Order Expire (No Fill) | Equivalent 0.00005 BNB | 0.00001 BNB | Y
IOC (No Fill) | Equivalent 0.00025 BNB | 0.000005 BNB | Y
Transfer | N/A | 0.000075 BNB | N
crossTransferOut| N/A | 0.000075 BNB | N
Multi-send | N/A | 0.00006 BNB | N
Issue Asset | N/A | 10 BNB |
Mint Asset | N/A | 0.002 BNB | N
Transfer ownership| N/A | 0.002 BNB | N
Burn Asset | N/A | 0.002 BNB | N
Freeze/Unfreeze Asset | N/A | 0.001 BNB | N
Lock/unlock/relock Asset | N/A | 0.002 BNB | N
List Asset | N/A | 200 BNB | N
Submit Proposal | N/A | 1 BNB | N
Deposit | N/A | 0.000125 BNB | N
Enable Memo Check | N/A | 0.2 BNB | N
Disable Memo Check | N/A | 0.2 BNB | N
HTLT | N/A | 0.000075 BNB | N
depositHTLT | N/A |  0.000075 BNB | N
claimHTLT | N/A |  0.000075 BNB | N
refundHTLT | N/A |  0.000075 BNB | N
refundHTLT | N/A |  0.000075 BNB | N
TinyIssueFee | N/A | 0.4 BNB | N
MiniIssueFee | N/A | 0.6 BNB | N
SetTokenUri | N/A| 0.000075 BNB | N
List BEP8 Token| N/A| 1 BNB | N
Create A New Smart Chain Validator | N/A |2 BNB |N
Edit Smart Chain Validator Information|N/A| 0.2 BNB |N
Delegate Smart Chain Validator |N/A| 0.0002 BNB |N
Redelegate Smart Chain Validator | N/A|0.0006 BNB |N
Undelegate Smart Chain Validator | N/A|0.0004 BNB |N
Unjail A Smart Chain Validator | N/A| 0.5 BNB | N
Submit Byzaitine Behavior Evidence of A Smart Chain Validator | N/A| 0.5 BNB| N
Submit Smart Chain Proposal | N/A| 1 BNB    | N
Smart Chain Proposal Deposit | N/A|0.00025 BNB | N
Smart Chain Proposal Vote   | N/A| 0 BNB   | N
Cross transfer out relayer reward  | N/A| 0.0004 BNB    | N


### Testnet Fees API

View system fees updated in real time [here](https://testnet-dex.binance.org/api/v1/fees).

### Notes

- Trade fee is calculated based on trade notional value, while fees for other transactions are fixed.
It is free to send new GTE order, cancel a partially filled order, and you will not be charged a fee when the system expires a partially filled order (GTE or IOC).

- Non-Trade related transactions will be charged a fee when the transactions happen, and can only be paid in BNB. The transaction will be rejected if the address does not have enough BNB.

- Trade related transaction would be charged with fee when an order is filled, or canceled/expired/IOC-expired with no fills. If there is enough BNB to pay, BNB fee structure would be used, otherwise, non-BNB fee structure would be used to charged.
- If the whole order value and free balance for the receiving asset are not enough to pay the fee, all the receiving asset and its residual balance would be charged.
