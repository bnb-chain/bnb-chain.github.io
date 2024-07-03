---
title: Developer Tools - opBNB Develop
---

One of our main objectives is to expand the adoption and utility of opBNB as a high performance and low cost Layer 2 chain on the BNB Smart Chain. To achieve this goal, we have to ensure that our underlying technology is robust, scalable and user-friendly. That is why we are committed to developing and improving the core infrastructure and tools that support opBNB and its community of users, hosts and developers. Below are the ecosystem we are building for the opBNB.

# Summary 



| Categories          | Sub Categories        | Infrastructure and Toolings                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------- | --------------------- |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DAO Governance      | DAO Governance        | [XDao](https://www.xdao.app/204),[Snapshot](https://snapshot.org/#/?filter=networks&q=opbnb)                                                                                                                                                                                                                                                                                                                       |
| Node Providers      | Node Provider         | [NodeReal](https://nodereal.io/meganode)                                                                                                                                                                                                                                                                                                                                                                           |
| Explorer            | Explorer              | [NodeReal opBNB Scan](https://mainnet.opbnbscan.com), [BSCScan](https://opbnb.bscscan.com/)                                                                                                                                                                                                                                                                                                                        |
|                     | Developer Platforms   | [Truffle](https://trufflesuite.com/), [Foundry](https://book.getfoundry.sh/), [Hardhat](https://hardhat.org/), [Remix](https://remix.ethereum.org/)                                                                                                                                                                                                                                                                |
| Use Access Tooling  | Wallet                | [Binance Web3 Wallet](https://www.binance.com/en/web3wallet), [Metamask](https://metamask.io/), [TrustWallet](https://trustwallet.com/), [Particle Network](https://wallet.particle.network/), [Gem Wallet](https://gemwallet.com/), [OKX Wallet](https://www.okx.com/nl/web3), [MathWallet](https://mathwallet.org/en-us/),  [Sequence.build](https://sequence.build/landing), [Avatar](https://avatarwallet.io/) |
|                     | Bridges               | [opBNB Bridge](https://opbnb-bridge.bnbchain.org/deposit),[PolyHedra](https://zkbridge.com/), [rhino.fi](https://app.rhino.fi/bridge?token=BNB&chainOut=OPBNB&chain=BINANCE)                                                                                                                                                                                                                                       |
|                     | dApp Store            | [dApp Bay](https://dappbay.bnbchain.org/ranking/chain/opbnb)                                                                                                                                                                                                                                                                                                                                                       |
| Oracles             | Price Feeds, VRF      | [Binance Oracle](https://oracle.binance.com/), [Supra](https://supraoracles.com/)                                                                                                                                                                                                                                                                                                                                  |
| Storage             | Decentralized Storage | [BNB Greenfield](https://greenfield.bnbchain.org/en)                                                                                                                                                                                                                                                                                                                                                               |
| Security            |                       | [AvengerDAO](https://www.avengerdao.org/)                                                                                                                                                                                                                                                                                                                                                                          |
| Account Abstraction |                       | [Particle Network](https://wallet.particle.network/),[Biconomy](https://docs.biconomy.io/supportedchains/),[CyberConnect](https://cyberconnect.me/)                                                                                                                                                                                                                                                                |
| MultiSig            |                       | [BNBChain Multi-Sig Wallet](multisig-wallet.md)                                                                                                                                                                                                                                                                                                                                                                    |
| Data Analytics      |                       | [DefiLlama](https://defillama.com/chain/opBNB), [CoinGecko](https://www.coingecko.com/en/chains/opbnb), [DappBay](https://dappbay.bnbchain.org/ranking/chain/opbnb)                                                                                                                                                                                                                                                |
| Indexing            |                       | NodeReal’s opBNB Graph QL                                                                                                                                                                                                                                                                                                                                                                                          |
| NFT                 | NFT Marketplace       | [Element’s NFT Marketplace](https://element.market/opbnb)                                                                                                                                                                                                                                                                                                                                                          |



## Binance Exchange Support

Binance has supported deposit and withdrawal on **7th Nov, 2023**. The initial list is BNB, FDUSD, and USDT as a start. 

## Node Providers

Needless to mention that the stability of RPC nodes is crucial to any blockchain, in this instance BNB Chain has **NodeReal** who is one of opBNB early and core contributors to anchor this task. 

NodeReal RPC can be accessed through their [API marketplace](https://nodereal.io/api-marketplace/explore?chains=opbnb). For common/public nodes, communities can access[ BNB ChainList](https://www.bnbchainlist.org/). 

## Wallet

Crypto/Digital wallet serves as an entry point for users to access blockchain. opBNB have known wallets providing access to opBNB such as [Metamask and Trustwallet](../get-started/wallet-configuration.md), leading the front. 

On **Account Abstraction(AA)**, [CyberConnect](https://cyberconnect.me/), [Particle Network](https://wallet.particle.network/), [Biconomy](https://docs.biconomy.io/supportedchains/) has already integrated with opBNB. 

**MultiSig** wallet BNB Chain has provided its own [Safe Multi-Sig Wallet](multisig-wallet.md). 

## Wallet as a Service[WaaS]

Wallet-as-a-Service (WaaS) streamlines the integration of digital wallets into applications, allowing businesses to manage cryptocurrencies and tokens effortlessly. By handling the complexities of wallet infrastructure, WaaS enables a secure and user-friendly experience for managing digital assets, fostering wider blockchain adoption and enhancing operational efficiency.

Below wallet have supported Wallet-as-a-Service (WaaS) platforms on the BNB Smart Chain and opBNB, facilitating seamless integration of digital wallet functionalities into applications for managing opBNB and other assets.

| **Project Name** | **Main Website**          | **WaaS Document**                                 |
| ---------------- | ------------------------- | ------------------------------------------------- |
| Particle Network | https://particle.network/ | https://particle.network/wallet-introduction.html |
| Sequence.build   | https://sequence.xyz/     | https://sequence.build/landing                    |
| Avatar Wallet    | https://avatarwallet.io/  | https://docs.avatarwallet.io/docs/introduction    |

## Bridges

For bridges opBNB has its own default [bridge](https://opbnb-bridge.bnbchain.org/deposit), which is built mirroring OP Stack. This also means that it has the 7 days challenge period, similar to OP bridge, BASE bridge. But opBNB does have 3rd party bridge providers, such as [Polyhedra](https://zkbridge.com/opbnb) and [Rhino.Fi](https://app.rhino.fi/bridge?token=BNB&chainOut=OPBNB&chain=BINANCE) that provide shorter withdrawal periods. 

## Data Analytics

Several known industry platform already started supporting opBNB, i.e. [DefiLlama](https://defillama.com/chain/opBNB) , [CoinGecko](https://www.coingecko.com/en/chains/opbnb), [DappBay](https://dappbay.bnbchain.org/ranking/chain/opbnb). For listing on DappBay, projects can fill up this [form](https://dappbay.bnbchain.org/submit-dapp).

## Data Indexing

opBNB currently has NodeReal’s opBNB Graph QL as the initial support[**Beta Version**] as current players such as TheGraph have their pipeline full for the rest of the year. For projects needing such services, projects can liaise with NodeReal on specs, requirements. [[Process Link](https://docs.google.com/document/d/1R0RcHKU27lBPMaSmwhwijlXLTQhs0Haa9LtKsxJbeAc/edit)]

## DAO

Essential component as the BNB Chain moves towards decentralization. [XDao](https://www.xdao.app/204) and [Snapshot](https://snapshot.org/#/?filter=networks&q=opbnb) are now supporting opBNB. 


# For DeFi Specific

## Oracle

[Binance Oracle](https://oracle.binance.com/docs/) has started supporting opBNB since Day1. Feel free to reach Binance Oracle for product support and demo.

# For Game/Social Media

## VRF

[Binance Oracle](https://oracle.binance.com/docs/vrf/overview) has support for opBNB VRF. Feel free to reach Binance Oracle for product support and demo. 

## NFT Marketplace & Minting

[Element’s NFT Marketplace](https://element.market/opbnb) is already live on opBNB. Minting feature will be ready soon in Nov. 

