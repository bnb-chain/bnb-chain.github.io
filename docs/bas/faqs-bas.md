---
sidebar_label: BAS FAQs
sidebar_position: 2
hide_table_of_contents: false
---
# BAS FAQs

### What is BAS? 
The BAS is an infrastructure introduced to help developers and node operators build and run their own blockchain as their internal value system for a massive number of users while still maintaining a close connection with the BNB Chain. Any project developer will be able to deploy their own BAS with its unique specifications and validator set. This validator set can run with fewer validators than BNB Chain, depending on the BAS deployer. These validators can be run by the application owners or any community stakeholders, bringing more flexibility and decentralization to BAS. The typical usage of BAS is like the Ronin chain for the Axie Infinity.

### Do projects need permissions to set up BAS? 
No, BAS is permissionless. We have 3–4 games in the test pilot stage right now. Nodereal and Ankr will help them build on BAS.

### What is the consensus mechanism for BAS? 
TL;DR: Think of it as a "mini BSC".

BAS uses BSC's Parlia consensus. Parlia is a Proof-of-Staked Authority (PoSA) consensus algorithm for BSC. It incorporates elements from both Proof-of-Stake and Proof-of-Authority. It is a BFT-like consensus where only one validator produces a block and to be sure of the correctness of this operation we must wait for the confirmation time, usually its 2/3*N+1, where N is active validators (15 blocks for the current configuration).

For more detail, read about Parlia on [BNB Chain docs](https://docs.bnbchain.org/docs/learn/consensus#consensus-protocol).

### I've heard about the hack on Ronin. How does BAS protect me from something like this?
The recent exploit discovered on Ronin illustrates the importance of having a diverse and decentralized group of validators and node operators serving the chain. Ankr will use its own token to help incentivize other node providers to support decentralization on BAS.

### What is the cost for projects to adopt BAS? 
Depends on whether the project wants to own its own BAS, or wants it as a PaaS service. 

NodeReal or Ankr will provide it as PaaS, which includes validators, networks, tools, RPC service, and explorer. All that will be provided as a package, and there will be a quotation for this service.

### Will BAS transactions and DAOs be counted towards BNB Chain? Should we account for these sidechain metrics and how?
They will not be counted. In the future, BSC should focus mainly on non-game metrics and liquidity, while games will be on BAS.

### When can projects start deploying on BAS? 
BAS Testnet will be out at the end of March 2022.

BAS Mainnet will be ready at least 2 months after that.

### Where can we find more docs for BAS for our developers to read through? 
Refer to [BAS Architecture](../bas/architecture/overview). 

Also, read [BNB Chain 2022: Build N’ Build](https://www.bnbchain.org/en/blog/bsc-2022-build-and-build/) and [BEP100 proposal for Binance Application Sidechain (BAS)](https://github.com/bnb-chain/BEPs/pull/132). 

### If developers have questions about BAS deployment, where can they ask them?
We will soon set up a Discord channel for questions and organize a Twitter space to share more details. 
For now, they can read [How to Launch a BAS](develop/BAS-Testnet/launch-bas.md).

### I have read the proposal and want to take the next step toward deployment. Whom can I talk to? 
For now, read [How to Launch a BAS](develop/BAS-Testnet/launch-bas.md). For other business and technical details, wait till the Discord channel for BAS is set up. You'll be able to ask your questions there.

### If a project already has its own private chain, what’s the process to integrate it as a BAS? And what does “integrate” mean? 
Such a project will have to implement BAS modules following our standards to align with our BAS framework. "Integrate" means to become a BAS-compatible blockchain that can use all the specter of BAS products.

### What’s the process to set up a BAS? How long does it take?
On average, it takes several hours to set up a BAS.

### How is the validator set and rules decided? Can the application decide on all the validators? 
We propose a very flexible configuration, based on the project parameters. The minimum is 3 validators.

### Are there prerequisites for a token to be used as a BAS sidechain token? 
There are no prerequisites. You can just issue a new token.

For example, Ankr will have its own BAS and use its own token. 

### What are the main differences, advantages, and disadvantages when we compare BAS with Avalanche Subnets? 
They are very similar. Where they differ is the consensus rules. 

### What maintenance is required for BAS operations? Do we maintain it or BNB Chain does it? 
If you build your own BAS, the maintenance is fully on you.

If you use it as a PaaS at Nodereal or Ankr, they will do the maintenance. They will also do all future upgrades, 24x7 SLA support, and so on.

### What's the expected technological advancement here? In other words, what's the positive-sum net value for users and developers?
With BAS, developers are able to set up and run a scalable blockchain solution, with smart contracts capability, in a very short time. They can also modify and upgrade their BAS using different modules or writing their own modules. Effectively, it means faster and simpler monetization and easier user attraction.

With BAS, users can gain access to new projects faster and use new exciting opportunities.