---
sidebar_label: Getting Started
sidebar_position: 2
hide_table_of_contents: false
---

# Getting Started with BNB Sidechain

## Why is BNB Sidechain introduced?
To overcome network scalability problems of BSC in 2021, the BSC community has proposed the use of BNB Sidechain in their [Outlook 2022](https://www.bnbchain.world/en/blog/bsc-2022-build-and-build/) paper. These sidechains can be designed for much higher throughput and lower (even zero) gas fees. We want to define a protocol for consensus management and messaging between BNB Sidechain and BSC so that it is easier for developers to use a ready-made solution and it is easier for BSC to integrate with them. Briefly speaking, the typical usage of BNB Sidechain is like that of the Ronin chain for the Axie Infinity on Ethereum. However, unlike Ronin, BNB Sidechain is designed with better architecture and security in mind. The idea of BNB Sidechain is to allow you to expand and reuse existing modules, and by using the architecture on smart contracts, painlessly modify existing contracts. 

## What is BNB Sidechain?
BNB Sidechain is a framework for creating sidechains in the BSC (BNB Smart Chain) ecosystem. It is an infrastructure to help developers and node operators build and run their custom blockchains as their internal value system and for a massive number of users while still maintaining a close connection with the BSC. 
The main task of BNB Sidechain is to facilitate any project developer to be able to deploy their blockchains with their unique specifications and validator set but still be connected to the BSC infrastructure. The validator set can run with fewer validators than BNB Chain, depending on the BNB Sidechain deployer. These validators can be run by the application owners or any community stakeholders, bringing more flexibility and decentralization to BNB Sidechain.
We can rightfully claim that BNB Sidechain is a lightweight framework on which one can build simple but functional blockchain projects. Developers and teams can create simple blockchains with their own business rules and economies. Most importantly, they can extend the existing functionality of the BNB Chain (BSC). 

## Architecture
BNB Sidechain is a modular framework for creating BSC-compatible sidechains. 
It defines requirements for integration with the BSC ecosystem and brings development-ready EVM-compatible features like staking, RPC-API, and smart contracts. Since BSC doesn’t rely on the BNB Sidechain security model, there is no default embedded production-ready bridge solution between the BSC and BNB Sidechain networks. Instead, BNB Sidechain can provide protocols and standards for integrating third-party bridges like Celer Network’s cBridge or Multichain.

Technically, BNB Sidechain is a set of smart contracts that can be written in any compatible programming language. The contract executor itself can be anyone and work in any way; BNB Sidechain does not require the use of any specific set of programming languages or API standards. 
In essence, BNB Sidechain defines the primary structure and configuration of the blockchain, using special templates. A template is a ready-made blockchain solution that is already integrated into the BSC infrastructure. With this integration, developers automatically get access to useful products as a ready-made solution such as staking system, block explorer, RPC gateways, interfaces for governance, cross-chain bridges, etc. 
The current implementation of BNB Sidechain is based on a modified version of BSC, but this is not the rule, BNB Sidechain can technically run on top of any blockchain. In the future, the list of templates will be extended. 

## Launch a BNB Sidechain
If you want to set up your own testnet, follow the steps defined [here](https://www.ankr.com/docs/build-blockchain/bas/overview). Celer has also provided a testnet BNB Sidechain [bridge](https://test-bas-bridge.celer.network/#/transfer) for use with BNB Sidechain.

If you want to leverage third party services, you can reach [NodeReal Support](https://nodereal.io/semita) or [Ankr](https://docs.ankr.com/blockchain-apis/getting-support) to get professional support there. 

### Testnets
There are two testnets where you can try BNB Sidechain. It already contains pre-deployed API gateways, block explorer, UI for the staking, and a faucet.

* Ankr BNB Sidechain Testnet: [Ankr documentation](https://docs.ankr.com/bnb-application-sidechain/demo).

* NodeReal Aries Testnet: 
  * NodeReal Testnet blog: <https://blog.nodereal.io/en/build-your-gamefi-on-bas-aries-testnet/>
  * Documentation: <https://docs.nodereal.io/nodereal/bas/build-on-bas>.

## FAQ
For more questions, refer to the [FAQs](../faqs-bas.md) section.

