---
title: Ecosystem
description: An explaination of BNB Greenfield ecosystem, including the contributions and responsibilities of each group involved.  
keywords: [BNB Greenfield ecosystem, validators, storage providers, dapps, challengers, verifiers]
order: 2
---

# Ecosystem
From Storage Providers and BNB staker to developers, there are a variety of individuals and entities that play a critical role in the growth and success of Greenfield. We'll dive into the unique contributions and responsibilities of each group, and explore how they work together to shape the future of Greenfield.

## Greenfield Actors

### Validators

The Greenfield blockchain operates as a Proof-of-Stake (PoS) blockchain and has its own set of validators chosen through an election process based on PoS logic.

The Validators have a vital responsibility of ensuring the security of the Greenfield blockchain. They are actively involved in the governance and staking of the blockchain, and their role is similar to other PoS blockchain networks. Additionally, they form a peer-to-peer network that plays a crucial role in the overall functioning of the blockchain.

In addition to their governance responsibilities, validators also accept and process transactions, which enables users to operate on the objects stored on the Greenfield blockchain. They are responsible for maintaining the metadata of Greenfield and ensure that the blockchain state acts as a control panel for both Storage Providers (SPs) and users.
Both parties rely on the validators to accurately update and utilize this state in order to operate, store, and access their object storage.

### Storage Providers (SPs)
Storage Providers (SPs) are a crucial part of the Greenfield blockchain. They offer storage service infrastructures to individuals and organizations. Using the Greenfield blockchain as the ledger and single source of truth, SPs maintain secure and reliable storage.

Each Service Provider (SP) is accountable for handling user requests to upload and download data. They act as gatekeepers for user rights and authentications, which makes them integral in ensuring the security and accessibility of user data at all times.

For more information about the storage providers, have a look at the [Storage Provider's page](../greenfield-blockchain/modules/storage-provider.md).

## Greenfield Features

### dApps
Greenfield dApps are applications that leverage the unique features of the Greenfield blockchain to solve various problems for their users. These dApps are designed to utilize Greenfield storage and related economic traits, providing a reliable and secure platform for creating and managing data.

Users can interact with the BNB Greenfield Core Infrastructure through the use of BNB Greenfield dApps, which are decentralized applications that enable seamless interaction with the Greenfield ecosystem. Furthermore, the Greenfield blockchain provides an intuitive smart contract library on the cross-chain facility, making it easy for dApp developers to integrate these features into their applications. This user-friendly approach allows developers to efficiently build and deploy dApps that can solve real-world problems.

### Relayers
The Greenfield Relayer is a powerful bi-directional relaying service designed to facilitate seamless communication between Greenfield and BSC. It can only be operated by Greenfield validators and functions as a standalone process.

This innovative system independently monitors and tracks cross-chain events that take place on both the Greenfield and BSC networks, storing this data securely in a database. When an event is confirmed, the relayer generates a Boneh–Lynn–Shacham (BLS) signed message that is then shared through the P2P network on the Greenfield network, known as "the vote".

As more votes are collected, the Greenfield Relayer assembles the necessary cross-chain package transaction and submits it to either the BSC or Greenfield network. This streamlined process ensures that communication between the two networks is efficient and error-free.

### Challenge Verifier
Challenge Verifier is an off-chain service that verifies data availability, data integrity and service quality by monitoring storage provider’s activities. This mechanism works by penalizing and gradually eliminating storage providers with poor service quality, in order to ensure the good performance and reliability of the entire network.

To elaborate, Challenge Verifier constantly checks the storage providers in the network by tasking them with challenges to prove their reliability. The challenges may include storing specific pieces of data or responding to requests within a certain time limit. Providers that fail these challenges will be punished by slash their staked BNB.

By using Challenge Verifier, the network can ensure that only reliable and trustworthy storage providers are allowed to participate, protecting the network from any potential data loss, corruption, or low-quality service. Additionally, Challenge Verifier creates a competitive environment for storage providers, motivating them to continuously improve their services to avoid penalties and stay in the network.

Challenge Verifier can only be operated by Greenfield validators right now, and will open to public in the future.

## How to Participate in the Ecosystem
- [Become A Validator](../../api/blockchain-cli/validator-staking.md): validators secure the Greenfield by validating and relaying transactions,
  proposing, verifying and finalizing blocks.
- [Become A Storage Provider](../../api/blockchain-cli/storage-provider.md): SPs store the objects' real data, i.e. the payload data. and get paid
  by providing storage services.
- [Control Your Data](../../api/blockchain-cli/storage.md): store and manage your data in a decentralized way, control and own it all by yourself.