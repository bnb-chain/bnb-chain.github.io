biggy---
title: Quick Guide - opBNB
description: Quick guide for opBNB developers. You will understand what you need to build your project.
keywords: [opBNB development]
order: 8
---

If you're a developer seeking to build on opBNB, you've come to the right place.
This document provides all the information you need to develop opBNB applications.

## Getting Started 

The opBNB network is the Layer 2 scaling solution for the BNB Smart Chain(BSC) powered by [OP Stack](https://docs.optimism.io/).

If you are brand new to opBNB, you can try start with the guide on [creating a fullstack dapp](../advanced/full-stack-dapp.md) on opBNB.
It will familiarize you with the basic steps of deploying a smart contract on opBNB and interacting with it from a dapp.

opBNB is [EVM equivalent](https://web.archive.org/web/20231127160757/https://medium.com/ethereum-optimism/introducing-evm-equivalence-5c2021deb306) so you can feel confident that your existing Ethereum smart contract skills will transfer seamlessly to opBNB.
There are a few small differences between Ethereum and opBNB, so make sure to be aware of them. You can refer to the [optimism documentation](https://docs.optimism.io/chain/differences) for more information.

## Connecting

Here are some resources to help you get connected to the opBNB network:

- [Network Information and RPC Providers](../get-started/network-info.md)
- [Wallet Configuration](../get-started/wallet-configuration.md)

## Get Tokens

opBNB is a Layer 2 on BSC, so tokens can be moved between the two chains using bridges.
For the testnet, you can use the faucet to obtain some test tokens on BSC and then bridge them to opBNB using the official bridge.
For the mainnet, you can bridge tokens from BSC to opBNB using various bridges, or you can withdraw tokens directly from a centralized exchange (CEX) which supports opBNB network(e.g. Binance).

- [opBNB Testnet Faucet](./network-faucet.md)
- bridges
    - [opBNB Official bridge](https://opbnb-bridge.bnbchain.org)
    - [zkBridge](https://www.zkbridge.com/opbnb/token)
    - [rhino.fi](https://app.rhino.fi/bridge?token=BNB&chainOut=OPBNB&chain=BINANCE)
- If you need to bridge tokens that are not supported by the bridges and CEXs yet, you can deploy your own L2 mirror token contract on opBNB and bridge them according to [this guide](../developers/bep20-crosschain.md).

## Cross-Chain Interoperability

To build cross-chain applications between BSC and opBNB, you should understand how cross-chain message passing works.
You can refer to the [sending data between L1 and L2](https://docs.optimism.io/builders/app-developers/bridging/messaging) guide for more information.

## Developer Tools

- Explorer
    - [NodeReal opBNB Scan](https://mainnet.opbnbscan.com)
    - [BSCScan](https://opbnb.bscscan.com/)
- SDK. If you are only using the SDK for Ethereum-compatible functions, then all Ethereum SDKs should work with opBNB. If you want to use opBNB-specific functions, it's recommended to use [op-viem with OP Stack Extensions](https://viem.sh/op-stack).
    - [ethers.js](https://docs.ethers.io)
    - [web3.js](https://web3js.readthedocs.io)
    - [viem](https://viem.sh/)
- Tools
    - [Remix](https://remix.ethereum.org)
    - [Hardhat](https://hardhat.org)
    - [Foundry](https://book.getfoundry.sh/)
- [BNB Chain Multi-Sig Wallet](./multisig-wallet.md)
- Wallets
    - [Binance Web3 Wallet](https://www.binance.com/en/web3wallet)
    - [Metamask](https://metamask.io/)
    - [TrustWallet](https://trustwallet.com/)
    - [Particle Network](https://wallet.particle.network/)
    - [Gem Wallet](https://gemwallet.com/)
    - [OKX Wallet](https://www.okx.com/nl/web3)
    - [MathWallet](https://mathwallet.org/en-us/)
    - [Sequence.build](https://sequence.build/landing)
    - [Avatar](https://avatarwallet.io/)
- Oracle
    - [Binance Oracle](https://oracle.binance.com/docs/)
- Account Abstraction
    - [Particle Network](https://wallet.particle.network/)
    - [Biconomy](https://docs.biconomy.io/supportedchains/)
    - [CyberConnect](https://cyberconnect.me/) 
- Storage
    - [BNB Greenfield](https://greenfield.bnbchain.org/en)
- Data Analytics
    - [DefiLlama](https://defillama.com/chain/opBNB)
    - [CoinGecko](https://www.coingecko.com/en/chains/opbnb)
    - [DappBay](https://dappbay.bnbchain.org/ranking/chain/opbnb) 

For more tools and details, you can refer to [this doc](./developer-tools.md).
