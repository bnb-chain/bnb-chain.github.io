---
id: matching-engine
title: Matching Engine
---

Binance DEX is the native marketplace on Beacon Chain , allowing you to exchange digital assets issued and listed on it.
The matching happens within the blockchain nodes and all of the transactions are recorded on-chain, therefore forming a complete, auditable ledger of activity.

> ATTENTION: The match logic on DEX is quite different from normal centralized exchange.
> Please go over the trading and match spec below to get the best interests for your orders.

- Order Types

Binance DEX only accept LIMIT orders, which is adhering to SEC definitions of LIMIT orders

- TimeInForce:

      	* GTE: Good Till Expire. Order would stay effective until expire time. Order may expire in the UTC midnight after more than 259, 200 blocks, which is 72 hours in term of blocking time.
      	* IOC: Immediate or Cancel. Orders would be executed as much as it can in the booking block round and then got canceled back if there is still quantity left.

- Match Logic

Binance DEX uses periodic auction to match all available orders. Maker/Taker concepts are introduced to enhance the current periodic auction match algorithm. The match is still executed only once in each block while the execution prices may vary for maker and taker orders.

- Anti-front-running

Front-running means someone can get prior knowledge of transactions from other beneficial owners via technology or market advantage, so that they can influence the price beforehand and result in economic gain, which usually brings loss or cost to others. It is a daunting question asked to both centralized and other decentralized exchanges (DEX). Especially on some DEX, front-running actually happens quite often, e.g. via gas or timestamp manipulations, or slow matching.

There are several design points in Binance DEX that make front-running very difficult to execute.
