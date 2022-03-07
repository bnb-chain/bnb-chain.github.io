# What exactly is Binance DEX matching logic?

Binance DEX uses periodic auction to match all available orders. Maker/Taker concepts are introduced to enhance the current periodic auction match algorithm. The match is still executed only once in each block while the execution prices may vary for maker and taker orders.


## Match Candidates

Orders meet any of the below conditions would be considered as the candidates of next match round:

- New orders that come in just now and get confirmed by being accepted into the latest block
- Existing orders that come in the past blocks before the latest, and have not been filled or expired

## Match Time

Candidates would be matched right after one block is committed. Each block has one round of match.

## Match Logic

The below matching logic would be applied on every listed token pairs.

- The match only happens when the best bid and ask prices are 'crossed', i.e. best bid > best ask.

- There would be only 1 price selected in one match round as the best prices among all the fillable
orders, to show the fairness.

- All the orders would be matched first by the price aggressiveness and then block height that they get accepted.

## Conclude Execution Price

The execution price would be selected as the below logic, in order to:

- Maximize the execution quantity
- Execute all orders or at least all orders on one side that are fillable against the selected price.
- Indicate the market pressure from either buy or sell and also consider to limit the max price movement. Let’s call this concluded price P.

Please check [this article](match-examples.md) with detailed examples for this if you are interested.

## Order Matches
After the execution price is concluded. Order match would happen in sequence of the price and time, i.e.

- Orders with best bid price would match with order with best ask price;
- If the orders on one price cannot be fully filled by the opposite orders:
for the orders with the same price, the orders from the earlier blocks would be selected and filled first
- If the orders have the same price and block height, and cannot be fully filled, the execution
would be allocated to each order in proportion to their quantity (floored if the number has a partial lot).
If the allocation cannot be accurately divided, a deterministic algorithm would guarantee that no consistent
bias to any orders.

After the execution price `P` is concluded, buy orders with price equal to or larger than `P`, and sell orders with price equal to or less than `P` will match. For the orders that come into match in the new block, the trades will be allocated according to the below principles:

- All new incoming buy orders into this current block (called "new orders" in this context) will get executed with the same price, so do all the sell orders; so that there is no chance for front-running on the same side.
- All the executed price will honor the order limit price;
- All the executed price for the new orders will be equal to or better than the concluded auction price `P`, so no front-running from the opposite side.

For other orders that have arrived in the previous blocks, they will join match together with the new orders from the new block, and be considered as "Maker" role. The detailed explanation of `Maker/Taker` is as below:

### Definition of Maker and Taker

Among all the orders to be allocated, between buy and sell sides, this specification defines four concepts.

| Name        | Definition                           |
| ----------- | ------------------------------------ |
| Maker Order | order from the previous blocks       |
| Taker Order | new incoming order in the current block   |
| Maker Side  | buy or sell side which has maker orders. May also have taker orders.  |
| Taker Side  | buy or sell side which only has taker orders. |

In each round of match, for all the orders that can be filled with the concluded price `P`, the algorithm ensures only one of the below two circumstances can happen,

1. Both buy and sell side are `Taker Side`, when there is no leftover orders from all the previous blocks;

2. One side is `Maker Side` that has orders from previous blocks (and may/may not have orders from this current block),  and the other is `Taker Side` that only has orders from this current block.


### Execution Pricing
Among all the orders to be allocated,

1. For maker side:

    * all the maker orders are executed at their limit price
    * all the taker orders on the maker side are executed at the concluded price `P`

2. For taker side, all the orders are executed at the average execution price from the above #1

If no maker side in this match, all the orders are executed at price `P`.
