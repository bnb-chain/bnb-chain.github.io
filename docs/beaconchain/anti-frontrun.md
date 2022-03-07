# Anti Front-Running

Front-running means someone can get prior knowledge of transactions from other beneficial owners via technology or market advantage, so that they can influence the price beforehand and result in economic gain, which usually brings loss or cost to others. It is a daunting question asked to both centralized and other decentralized exchanges (DEX). Especially on some DEX, front-running actually happens quite often, e.g. via gas or timestamp manipulations, or slow matching.

There are several design points in Binance DEX that make front-running very difficult to execute.

## Fast Matching
Binance DEX matches orders in every block (with very fast block times). Fast matching leaves very little room for front-runner to react before the orders get executed properly. This is one of the fundamental parts of making front-running difficult, especially for normal market participants.

## Decentralized, Transparent Match Engine
It is very difficult to argue that the exchange itself is not front-running if it has a centralized matching engine. Binance DEX have decentralized matching engines running on every block producer and full node. This way everyone can replay the order match manually with the transactions in the latest block with the current order book and can see the order matching in real-time if they run a full node.

**_This makes wash trading easily observable!_**

## Periodic Auction Matching
Periodic auction matching per block lowers the importance of fast orders, i.e. fast orders do not benefit from high frequency trading behaviors even when being several hundreds of milliseconds faster (which is "really long time" for traditional exchanges).
Fast orders do not bring any advantage.

Periodic auction also adds a non-deterministic layer where no one can exactly know the next execution price unless he/she can exactly know all 3 things listed below:

1. the matching logic
2. the current order book and trade price from the last match
3. all incoming orders for the next block

1) and 2) may be visible to participants, especially for validators and others who closely watch the blockchain status, such as fast sync trading bots or full nodes.
But knowing 3) is very hard for normal market participant. Even if they run powerful `accelerated node`, they still cannot know all the incoming orders for the next block. Without this knowledge, even when someone can send orders faster, they cannot do effective front-running.

So with the above, the usual traders and even trading bots cannot do much to front-run others.

You might point out, that the validators have a chance to get information of 3) when they are "proposers" for the next block, i.e. they would "propose" what transactions to add for the next block. But the Binance Chain consensus model adds some additional randomness to make it more difficult:

Due to the fast matching, the bad validator have to prepare everything with earlier information in order to front-run the price. However, he cannot be too fast, because he cannot know the execution price of the last block until the last block is concluded, and the last execution price has direct impact on the execution price according to the match logic. Even more, any validator ahead of the bad validator's proposer turn can run into an issue and increase the consensus round, which would ask for re-arrangement on the proposing sequence. This makes it very hard to pre-determine the exact proposal sequence, making it so hard that the validator cannot be 100% sure when they can delay any other transactions and add their own transactions to the block earlier. Besides all of this, the bad validator cannot hold other transactions for too long: it either makes the bad behavior very observable on chain, or other validators would include the transactions anyway via P2P communication.

As a result, it is extremely hard to front-run anyone even while being a validator.

## Potential Improvement
With the above description, you can clearly see that chance of front-running others on Binance DEX is much lower than on centralized exchanges and most of decentralized ones. However, you may still argue that for a very powerful and sophisticated validator, there is still a slim chance to front-run client orders (if they can do every difficult step very fast).

In the future, deterministic randomness may be applied in selecting the next proposer among validators, and the match of orders proposed to block can be postponed into the next 2 block. These two enhancements can greatly destroy the prediction accuracy of trading price, which would push the chance of front-running to 0. The cost of this is some latency in matching.


