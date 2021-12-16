---
sidebar_label: BSC General FAQs
sidebar_position: 2
---
# Binance Smart Chain

## What is Binance Smart Chain?

Binance Smart Chain brings EVM-compatible programmability and native cross-chain communication with Binance Chain using an innovative consensus of Proof of Staked Authority(PoSA).

## Why is Binance Smart Chain designed as a separate chain from Binance Chain?

The execution of a Smart Contract may slow down the exchange function and add non-deterministic factors to trading. Even if that compromise could be tolerated, it might be a straightforward idea to introduce a new Virtual Machine specification based on Tendermint, based on the current underlying consensus protocol and major RPC implementation of Binance Chain. But all these will increase the learning requirements for all existing dApp communities, and will not be very welcomed.

## Where will the published whitepaper be found?

<https://binance.org/whitepaper.pdf> and also <https://github.com/binance-chain/whitepaper>, where feedback is more than welcome.

## Where can I take a look at Binance Smart Chain code? Is there a GitHub repository?

The codebase of BSC is open-sourced here:

* <https://github.com/binance-chain/bsc>
* <https://github.com/binance-chain/bsc-relayer>
* <https://github.com/binance-chain/bsc-relayer-config>
* <https://github.com/binance-chain/bsc-genesis-contract>
* <https://github.com/binance-chain/bsc-double-sign-sdk>
* <https://github.com/binance-chain/oracle-relayer>

## Where can I find some support?

* Technical talk and support running our software: Telegram <https://t.me/joinchat/IuVfSlYWC5seijz6a0Bjww>
* Bugs or technical contributions: GitHub
* General discussion regarding our blockchain: Telegram <https://t.me/BinanceDEXchange>

## Which are Binance Smart Chain's official channels for communication and information?

* Binance DEX announcements: <https://t.me/Binance_DEX_Announcement>
* Twitter: <https://twitter.com/binancechain>
* Binance Chain Forum: <https://community.binance.org>

## Wallet support for Binance Smart Chain

  - [Binance Extension Wallet ](wallet/binance.md)
  - [MetaMask](wallet/metamask.md)
  - [Math Wallet](wallet/math.md)
  - [Arkane](wallet/arkane.md)
  - [Ledger](wallet/ledger.md)
  - [MEW](wallet/myetherwallet.md)

##  How to recover if you choose the wrong network type?

Please read this [guide](./wallet/withdraw-en.md)

清阅读以下[说明](./wallet/withdraw-cn.md)

## How does Binance Smart Chain work? What is the architecture and consensus used?

Binance Smart Chain relies on a system of 21 validators with Proof of Staked Authority (PoSA) consensus that can support short block time and lower fees.

There will be fewer validators on Binance Smart Chain testnet.

## Can you tell more about Proof of Staked Authority(PoSA)? What is it?

PoSA is a combination of PoA and PoS. Blocks are produced by a limited set of validators, they are elected in and out based on a staking based governance. Validators take turns to produce blocks in a PoA manner

## What are the benefits for developers to build on Binance Smart chain?

* EVM-compatible: Binance Smart Chain supports all the existing Ethereum tooling
Fast block time, cheaper cost
* Native cross-chain trasfer & communication: Binance DEX remains a liquid venue of exchange of assets on Binance Chain and Binance Smart Chain"

## What are the benefits for developers to build on Binance chain?

Binance Chain opens the gate for users to take advantage of the fast transferring and trading

## How many assets are issued on Binance chain?

There are already [140 assets](https://explorer.binance.org/assets/bep2) on Binance Chain

The introduction of [BEP8](https://github.com/binance-chain/BEPs/blob/master/BEP8.md) is an innovative way for tokenization of properties

## What make Binance Smart Chain different?

Key Innovations:

* Proof-of-staked-authority Consensus

* Native Cross-Chain Communication

* Expand the use cases of BNB token

## Binance Smart Chain is EVM-compatible. What does that mean?

EVM means Ethereum Virtual Machine. Any smart-contract written to run in EVM can be easily ported to Binance Smart Chain.

## Can developers make hybrid Dapps using both Binance Chain and Binance Smart Chain in one single Dapp?

Yes, with the help of native cross-chain functions

## How to query the current system parameters

```
bnbcli  params side-params  --side-chain-id=bsc   --node  http://dataseed4.binance.org:80   --chain-id=Binance-Chain-Tigris --trust-node --output=json
```

* minimum self-delegated amount: **10000BNB**

* minimium delegate amount: **1BNB**

* Unbonding time: 7 days

* offline Unjail fee:  1BNB

* offline jail time: 2 day

* offline slashing amount: 50BNB

* Double-sign slashing amount: 10000BNB

* Cross-chain relay fee: 0.004 BNB


