---
title: Overview
order: 1
---
# Overview

## What is the Greenfield Blockchain

The **Greenfield blockchain** plays a pivotal role in the [Greenfield ecosystem](../introduction/introduction.md#ecosystem). 
It forms the core of the platform and is constructed on the **Cosmos/Tendermint** infrastructure. 
Within the Greenfield blockchain, there are two categories of states that exist **on-chain**: 
- Accounts and their BNB balance ledger.
- The metadata related to the object storage system, [Service Providers (SPs)](../storage-provider/introduction/overview.md), objects stored on this system, 
and permission and billing information associated with this storage.

Transactions conducted on the Greenfield blockchain can alter the aforementioned states. These states and transactions 
make up the majority of the BNB Greenfield economic data.

## How Greenfield Blockchain Works
The **Greenfield Blockchain** utilizes the [Tendermint consensus](https://tutorials.cosmos.network/) mechanism, 
implementing a [Proof-of-Stake](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/) approach to ensure network security. 
Validator election and governance are managed through a [proposal-vote mechanism](https://github.com/bnb-chain/greenfield/blob/doc-refactor/docs/modules/governance.md), following 
the governance module of Cosmos SDK. Greenfield's validators produce blocks every **2 seconds**.

As for the blockchain's native token, **BNB** serves as both gas and governance token. The initial BNB is locked on BNB 
Smart Chain (BSC) and subsequently re-minted on Greenfield. Cross-chain communication enables smooth flow of BNB and 
data operation primitives between Greenfield and BSC. The total circulation of BNB remains unaffected and will 
continue moving along the BNB Beacon Chain, BSC, and Greenfield.

!!! tip
    [Here is a good reading](https://docs.tendermint.com/v0.34/introduction/what-is-tendermint.html) about the working 
    principles of an application chain built on Tendermint.

## Why Greenfield Blockchain

### Core of Greenfield Blockchain
The **Greenfield Blockchain**'s core revolves around data and includes several key aspects:

- **Decentralized storage of data**: Any individual or organization can register as a storage provider on the Greenfield 
blockchain. As a distributed ledger, Greenfield records the distribution of data stored on multiple storage 
providers and coordinates data backup and recovery.
- **Data ownership**: Greenfield empowers users with comprehensive data ownership management functions. Users can grant 
   access, modify, create, delete, and execute permissions for their data to individuals or groups. On Greenfield, 
   users can exercise complete control over their own data.
- **Data assetization**: All data and access permissions on Greenfield can be presented as NFT assets on the BNB 
   Smart Chain network. Users' operations on these NFT assets, like minting or burning, will ultimately transform into 
    changes in their data permissions on Greenfield through cross-chain technology. These NFT assets follow the 
    [ERC721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/) and [ERC1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/) 
    standards, maximizing the reuse of existing NFT browsers and markets on BSC.
- **Programmable data ownership**: Users have the flexibility to program their data ownership rules on Greenfield, 
    making it highly customizable as per individual requirements.
- **Flow of data value**: Data assetization on BSC promotes the flow of data value through various decentralized applications (dapps).

### Validator from Greenfield Blockchain
The validators of the Greenfield Blockchain are integral to the network's security and reliability. 
  However, their responsibilities extend well beyond that:

1. Validators are tasked with achieving consensus on cross-chain events and relaying cross-chain packets 
   to both Greenfield and BNB Smart Chain. This ensures that cross-chain transactions are executed quickly, 
   securely, and with minimal cost.

2. Validators play a key role in ensuring the integrity and availability of data provided by 
   service providers (SPs). By challenging the data availability of SPs in a specific or random manner, 
   validators can weed out malicious actors and those who provide subpar services. 
    Punishing such actors through appropriate measures - such as slashing their stake, for example - helps 
    to ensure the quality and reliability of services in the Greenfield ecosystem.

3. Validators also have a say in the governance of the network. They vote on issues related to the future development 
   of Greenfield's ecosystem and adjust various network parameters as necessary. 
   This ensures that the network remains healthy and sustainable over time, 
   while accommodating the changing needs and demands of its users.

## Get Started with Greenfield Blockchain
- [Quick start with Greenfield Blockchain](run-node/interact-node.md)
- [Learn more about the ecosystem players of Greenfield](../introduction/introduction.md#ecosystem)
- [Learn more about the module design of Greenfield Blockchain](https://github.com/bnb-chain/greenfield/blob/doc-refactor/docs/modules/storage-module.md)
