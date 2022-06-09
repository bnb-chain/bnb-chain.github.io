---
sidebar_label: Getting Started
sidebar_position: 2
hide_table_of_contents: false
---

# Getting Started with BNB Application Side Chain (BAS)

## Why is BAS introduced?
To overcome network scalability problems of BSC in 2021, the BSC community has proposed the use of BAS in their [Outlook 2022](https://www.bnbchain.world/en/blog/bsc-2022-build-and-build/) paper. These sidechains can be designed for much higher throughput and lower (even zero) gas fees. We want to define a protocol for consensus management and messaging between BAS and BSC so that it is easier for developers to use a ready-made solution and it is easier for BSC to integrate with them. Briefly speaking, the typical usage of BAS is like that of the Ronin chain for the Axie Infinity on Ethereum. However, unlike Ronin, BAS is designed with better architecture and security in mind. The idea of BAS is to allow you to expand and reuse existing modules, and by using the architecture on smart contracts, painlessly modify existing contracts. 

## What is BAS?
BAS (BNB Application Side-Chain) is a framework for creating sidechains in the BSC (BNB Smart Chain) ecosystem. It is an infrastructure to help developers and node operators build and run their custom blockchains as their internal value system and for a massive number of users while still maintaining a close connection with the BSC. 
The main task of BAS is to facilitate any project developer to be able to deploy their blockchains with their unique specifications and validator set but still be connected to the BSC infrastructure. The validator set can run with fewer validators than BNB Chain, depending on the BAS deployer. These validators can be run by the application owners or any community stakeholders, bringing more flexibility and decentralization to BAS.
We can rightfully claim that BAS is a lightweight framework on which one can build simple but functional blockchain projects. Developers and teams can create simple blockchains with their own business rules and economies. Most importantly, they can extend the existing functionality of the BNB Chain (BSC). 

## Architecture
BAS is a modular framework for creating BSC-compatible sidechains. 
It defines requirements for integration with the BSC ecosystem and brings development-ready EVM-compatible features like staking, RPC-API, and smart contracts. Since BSC doesn’t rely on the BAS security model, there is no default embedded production-ready bridge solution between the BSC and BAS networks. Instead, BAS can provide protocols and standards for integrating third-party bridges that can be managed by the BAS validator set of other projects like Celer Network’s cBridge or Multichain.

Technically, BAS is a set of smart contracts written in any possible programming language. The contract executor itself can be anyone and work in any way; BAS does not require the use of any specific set of programming languages or API standards. 
In essence, BAS defines the primary structure and configuration of the blockchain, using special templates. A template is a ready-made blockchain solution that is already integrated into the BSC infrastructure. With this integration, developers automatically get access to such useful products as a ready-made staking system, block explorer, SDK, API gateways, interfaces for governance, etc. 
The current implementation of BAS is based on a modified version of BSC, but this is not the rule, BAS can technically run on top of any blockchain. In the future, the list of templates will be extended. For more details, please refer to [Ankr documentation](https://docs.ankr.com/bnb-application-sidechain/architecture).

## How to Launch a BAS?
To launch a BAS, follow these steps defined in [Ankr documentation](https://docs.ankr.com/bnb-application-sidechain/how-to-launch-a-bas). Celer has also provided a [testnet BAS bridge]( https://test-bas-bridge.celer.network/#/transfer).
If you want to set up your own testnet, you can reach [NodeReal Support](https://docs.google.com/forms/d/e/1FAIpQLSer9JzrvzVzkpm4NsHPM1QzNMMZTfchehnTOY8CSysI0RvVAQ/viewform) or [Ankr](https://docs.ankr.com/blockchain-apis/getting-support) to get professional support there. 

### Testnets
There are two testnets where you can try BAS. It already contains pre-deployed API gateways, block explorer, UI for the staking, and a faucet.
Ankr Testnet: [Ankr documentation](https://docs.ankr.com/bnb-application-sidechain/demo).
NodeReal Testnet: NodeReal [Testnet blog](https://medium.com/@NodeReal/build-your-gamefi-on-bas-aries-testnet-bf54dd99b959) and [documentation](https://docs.nodereal.io/nodereal/bas/wallet/use-metamask-for-bas).

## FAQ
For more questions, refer to [Ankr documentation](https://docs.ankr.com/bnb-application-sidechain/faq).

