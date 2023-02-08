---
sidebar_label: Architecture
sidebar_position: 2
hide_table_of_contents: false
---

# The Architecture in General

![Greenfield-Economy-General-Architecture](../../../static/img/assets/greenfield/3-Greenfield-Economy-General-Architecture.png)
<div align="center"><i>Greenfield Economy General Architecture</i></div>

The ecosystem of Greenfield is a "**trinity**" as shown in the above figure.

## Greenfield Core

BNB Greenfield Core is the new system infrastructure described in depth in this paper. It is the center of the new ecosystem of data. It has two layers.

**1.** A new storage-oriented blockchain, and

**2.** A network composed of "storage providers".

The BNB Greenfield blockchain maintains the ledger for the users and the storage metadata as the common blockchain state data. It has BNB, transferred from BNB Smart Chain, as its native token for gas and governance. BNB Greenfield blockchain also has its own staking logic for governance.

Storage Providers (SP) are storage service infrastructures that
organizations or individuals provide and the corresponding roles they play. They use Greenfield as the ledger and the single source of truth. Each SP can and will respond to users' requests to write (upload) and read (download) data, and serve as the gatekeeper for user rights and authentications.

Initially, a number of validators, run either by the BNB community or SPs, go through the genesis to launch BNB Greenfield, while a few SPs will also launch the corresponding storage infrastructure and register themselves onto the Greenfield blockchain. SPs form another P2P network to provide the full feature set to applications and users to create, store, read, and trade data while using Greenfield blockchain as the metadata and ledger layer.

![BNB-Greenfield-Core](../../../static/img/assets/greenfield/3.2-BNB-Greenfield-Core.jpg)

<div align="center"><i>BNB Greenfield Core</i></div>

BNB Greenfield blockchain and the SPs together comprise the center of this new economy, which is actually a decentralized, object storage system (with EVM connectivity as explained later).

In contrast to the centralized alternative, this object storage system
manages its data in two collaborative parts, on-chain, and off-chain.

The Greenfield blockchain contains two categories of states "on-chain":

**1.** Accounts and their BNB balance ledger

**2.** The metadata of the object storage system and SPs, the metadata of the objects stored on this storage system, and the permission and billing information associated with this storage system.

Greenfield blockchain transactions can change the above states. These states and the transactions comprise the major economic data of BNB Greenfield.

While the metadata is stored on-chain, the object storage system stores all the object content data (the payload) off-chain, more precisely, on SPs' off-chain systems in a decentralized and redundant way.

When users want to create and use the data on Greenfield, they may
interact with the BNB Greenfield Core Infrastructure via BNB Greenfield dApps (decentralized applications).

## BNB Greenfield dApps

BNB Greenfield dApps are new types of decentralized applications. They
can be the client toolings that facilitate users to interact with the decentralized storage system, Greenfield Core Infra; or applications that bring real values to users' real life by using Greenfield systems as their infrastructure. These applications will use blockchain addresses as user identifiers and interact with features and smart contracts on the Greenfield blockchain, Greenfield SPs, and BSC.

There are data endpoints, transaction interfaces, P2P networks, and
corresponding SDKs to help developers to build BNB Greenfield dApps.

BNB Greenfield dApps should be part of the establishment of BNB Chain infrastructure built mostly by the community and ecosystem partners.

They can be decentralized or centralized as they prefer.

The section [Showcases in Labs](../use-cases/decentralized-storage.md) shows considerations through a list of BNB Greenfield dApp
showcases.

## The Cross-Chain with BSC

There is a native cross-chain bridge between BSC and BNB Greenfield
blockchain. While the data can be created and read more cheaply on
Greenfield Core Infra, the relevant data operation can be transferred to
BSC and integrated with smart contract systems there, such as DeFi, to create new business models.

## The Trinity

From the viewpoint of BNB Greenfield dApps, these applications can help users to create, read, and execute data on the BNB Greenfield,
Greenfield SPs, and BSC, and serve a purpose to users' needs.

From the viewpoint of BNB Greenfield Core Infrastructure, they accept requests and observations from the Greenfield dApps on behalf of the users, and also instructions from BSC to operate together for different business scenarios.

From the viewpoint of BSC, they can accept transferred data assets from BNB Greenfield, and provide more business scenarios via smart contracts to new types of Greenfield dApps.

The users can interact with all parts of the trinity for different
purposes directly or/and indirectly.
