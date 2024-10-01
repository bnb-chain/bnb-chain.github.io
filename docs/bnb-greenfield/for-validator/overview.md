---
title: Overview - BNB Greenfield
order: 1
---
# Overview

## What is the Greenfield Blockchain

The **Greenfield blockchain** plays a pivotal role in the [Greenfield ecosystem](../introduction.md#ecosystem). 
It forms the core of the platform and is constructed on the **Cosmos/Tendermint** infrastructure. 
Within the Greenfield blockchain, there are two categories of states that exist **on-chain**: 

- Accounts and their BNB balance ledger.
- The metadata related to the object storage system, [Service Providers (SPs)](../storage-provider/overview.md), objects stored on this system, 
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


## Validator from Greenfield Blockchain
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