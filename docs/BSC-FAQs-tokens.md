---
sidebar_label: BSC Tokens FAQs
hide_table_of_contents: false
sidebar_position: 2
---

# Tokens in Beacon Chain and BNB Smart Chain 

## What role does BNB play in securing BNB Smart Chain ?

BNB is the token used to prevent `nothing-at-stake` problem.

## What are tokens on BNB Smart Chain ?

BNB is the native token for BSC, and pegged BEP2 tokens on BSC is called BEP20.

## What is BEP2?

A simple token protocol for easy management of asset on Beacon Chain  <https://github.com/bnb-chain/BEPs/blob/master/BEP2.md>

BNB is BEP2

## What is BEP20?

A token protocol on BSC which is compatible with BEP2 and [ERC20](https://eips.ethereum.org/EIPS/eip-20). It extends ERC20 and contains more interfaces, such as `getOwner` and `decimals`.


Read the full proposal here: <https://github.com/bnb-chain/BEPs/blob/master/BEP20.md>

## What is BEP8?

It is proposed to accommodate the small or micro projects, intellectual properties, and other small token economies. Similar to SME board in the traditional stock markets, BEP8 tokens markets will increase the liquidity of utility tokens of startups or Intellectual Property (IP) tokens by removing the capital requirements for listing. Besides, any BEP8 token issuer can choose to directly list against BNB and BUSD without the voting process of validators.

Details:

* [BEP8 Proposal](https://github.com/bnb-chain/BEPs/blob/master/BEP8.md)
* [Commandline Instructions](beaconchain/learn/BEP8.md)

## How to issue BEP2 tokens?

Please follow the guide [here](https://community.binance.org/topic/2487/)

## How to issue BEP20 tokens?

Please follow the guide [here](issue-BEP20.md)

## How can I stake my BNB?

Please follow the guide [here](del-guide.md)

## How many tokens are required to stake BNB?

The [minimum delegated amount](parameters.md) is **1BNB**.

## Which wallets can be used to stake BNB?

You can use:

* [command line tool](https://github.com/bnb-chain/node/releases/tag/v0.8.1)
* [Binance Extension Wallet](wallet/binance.md)
* [Math Wallet](http://blog.mathwallet.xyz/?p=3890)

## Where can I find out more about staking economics and rewards?

You can read details in White Paper: <https://github.com/bnb-chain/whitepaper/blob/master/WHITEPAPER.md#rewarding>

## Where do network rewards come from?

Validators and delegators will earn rewards from the following sources:

* Calling smart contracts on BSC is metered by gas.
* Rewards for running a BSC Relayer if validators have one

## Which wallets can I use to store BNB?

You can see the list [here](Wallet.md)

## How to track Cross-chain transfer tx From BSC to BC?

1. Get Cross-chain transfer tx hash of Binance Smart Chain

For example:  https://bscscan.com/tx/0xb6b941a3d44fec69902ea632eb96c6ffa51b3098576629c26ab34ce10deaf357 

Please make sure the “Transaction Action” is “Transfer out”

The transfer amount is denoted in the  “value” field. 

![img](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/67013598745/original/zeVlALl0chXv_LpHGv0OmGqH8eudFy0utg.png?1622611333)

2. Get Destination Address

The “Cross Chain Package” is linked to BNB chain explorer

![img](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/67013598743/original/-2gMcowNwo2VQNEAatHSzYBrlSfp0vsbxQ.png?1622611332)

For example: https://api.binance.org/cross_chain/v1/tx/0xb6b941a3d44fec69902ea632eb96c6ffa51b3098576629c26ab34ce10deaf357 


If "has_refund" is false, it means this transaction is successful. 

The corresponding transaction hash on Binance chain is “cross_chain_tx_hash"

The tokens were sent to “receiverAddresses”. 

![img](https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/67013598744/original/yma7MlpuPQljanX3WFerZNukdQEPOiuy_A.png?1622611332)



