---
sidebar_label: BSC Tokens FAQs
hide_table_of_contents: false
sidebar_position: 2
---

# Tokens in Binance Chain and Binance Smart Chain

## What role does BNB play in securing Binance Smart Chain?

BNB is the token used to prevent `nothing-at-stake` problem.

## What are tokens on Binance Smart Chain?

BNB is the native token for BSC, and pegged BEP2 tokens on BSC is called BEP20.

## What is BEP2?

A simple token protocol for easy management of asset on Binance chain <https://github.com/binance-chain/BEPs/blob/master/BEP2.md>

BNB is BEP2

## What is BEP20?

A token protocol on BSC which is compatible with BEP2 and [ERC20](https://eips.ethereum.org/EIPS/eip-20). It extends ERC20 and contains more interfaces, such as `getOwner` and `decimals`.


Read the full proposal here: <https://github.com/binance-chain/BEPs/blob/master/BEP20.md>

## What is BEP8?

It is proposed to accommodate the small or micro projects, intellectual properties, and other small token economies. Similar to SME board in the traditional stock markets, BEP8 tokens markets will increase the liquidity of utility tokens of startups or Intellectual Property (IP) tokens by removing the capital requirements for listing. Besides, any BEP8 token issuer can choose to directly list against BNB and BUSD without the voting process of validators.

Details:

* [BEP8 Proposal](https://github.com/binance-chain/BEPs/blob/master/BEP8.md)
* [Commandline Instructions](bep8.md)

## How to issue BEP2 tokens?

Please follow the guide [here](https://community.binance.org/topic/2487/)

## How to issue BEP20 tokens?

Please follow the guide [here](issue-BEP20.md)

## How can I stake my BNB?

Please follow the guide [here](del-guide.md)

## How many tokens are required to stake BNB?

The [minimum delegated amount](validator/Parameters.md) is **1BNB**.

## Which wallets can be used to stake BNB?

You can use:

* [command line tool](https://github.com/binance-chain/node/releases/tag/v0.8.1)
* [Binance Chain extension wallet](wallet/binance.md)
* [Math Wallet](http://blog.mathwallet.xyz/?p=3890)

## Where can I find out more about staking economics and rewards?

You can read details in White Paper: <https://github.com/binance-chain/whitepaper/blob/master/WHITEPAPER.md#rewarding>

## Where do network rewards come from?

Validators and delegators will earn rewards from the following sources:

* Calling smart contracts on BSC is metered by gas.
* Rewards for running a BSC Relayer if validators have one

## Which wallets can I use to store BNB?

You can see the list [here](Wallet.md)