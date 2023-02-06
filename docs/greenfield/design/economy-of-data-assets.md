---
sidebar_label: Economy of Data Assets
sidebar_position: 2
hide_table_of_contents: false
---

# Economy of Data Assets

The real power of the Greenfield ecosystem lies in that the platform is not only designed to store the data, but also to support the creation of value based on the data assets and its related economy.

The asset traits of the data are firstly established on the permissions, e.g. the permission to read the data. When this right is disconnected from the data itself, they become tradable assets and enlarge the value of the data. This can be amplified when the data itself can be executable (a new type of "**Smart Code**"), interact with each other, and generate new data. This creates a lot of room to imagine building a new, data-intensive, trustless computing environment.

Secondly, the data permissions can be transferred cross-chain onto BSC and become digital assets there. This creates a variety of possibilities to integrate these assets with the existing DeFi protocols and models on BSC.

This gets even further enhanced by the smart contracts on BSC, which
enjoy the same address format as accounts on the Greenfield blockchain and can be the owners of the data objects and inherit different permissions. This will unleash many new business opportunities based on the data and its operations.

## Cross-Chain with BSC

The cross-chain model expects to achieve the following goals:

* **Integratable with the existing systems:** try to reuse the current infrastructure and dApps as much as possible, such as NFT Marketplace, data indexing, and blockchain explorers.
  
* **Programmable:** dApps can define how they want to wrap the assets from Greenfield.
  
* **Secure and recoverable**.

The native cross-chain bridge is maintained and secured by the
validators of Greenfield, via a new relayer system based on an
aggregated multisig scheme (more details in the later sections).
Greenfield validators will run the relayers to facilitate the high
bandwidth and fast bridge.

BNB will be transferred from BSC to Greenfield as the first cross-chain action. The initial validator set of Greenfield at the genesis will first lock a certain amount of BNB into the "Greenfield Token Hub" contract on BSC. This contract will also be used as part of the native bridge for BNB transferring after the genesis. These initial locked BNB will be used as the self-stake of validators and early days gas fees.

## Framework

![cross-chain-architecture](../../../static/img/assets/greenfield/7.1-Cross-chain-Architecture.jpg)
<div align="center"><i>Cross-chain Architecture</i></div>

The bottom layer is a cross-chain **Communication Layer**, which focuses on primitive communication package handling and verification. The middle layer implements the **Resource Mirror**. It is responsible for managing the resource assets that are defined on Greenfield but mirrored onto BSC. The top layer is the **Application Layer**, which are the smart contracts implemented by community developers on BSC to operate the mirrored resource entities with their primitives; Greenfield does not have such an application layer since itself does not provide programmability yet. The real dApps will have some part in this Application Layer and alsointeract with Greenfield Core and all sorts of supporting infrastructures.

Because of the asymmetric framework, BSC focuses more on the
application/control plane, while Greenfield is the data plane. To avoid state racing, the following rules are introduced:

* Any resources that are initiated to create by BSC can only be controlled by BSC.
* Any resources that are controlled by BSC can not transfer control rights to Greenfield.
* Any resources that are controlled by Greenfield can transfer control rights to BSC.

## Communication Layer

The communication layer is composed of a set of **Greenfield Relayers**:

- Each validator should run a relayer. Each relayer possesses a BLS private key, with the address of the key stored on-chain as part of the validator's mandatory information.

- The relayer watches all cross-chain events happen on BSC and the Greenfield blockchain independently. After enough blocks of confirmation to reach finality, the relayer will sign a message by the BLS key to confirm the events, and broadcast the signing attestment, which is called "the vote", through a p2p network to
other relayers.

- Once enough votes from the relayer are collected, the relayer will
assemble a cross-chain package transaction and submit it to BSC or Greenfield network.

## Resource Mirror Layer

### Resource Entity Mirror

The purposes of almost all the cross-chain packages are to change the state of the resource entities on the Greenfield blockchain. Thus the below resource entities should be able to be mirrored on BSC:

**1.** Account

**2.** BNB

**3.** Bucket

**4.** Object

**5.** Group

The account mapping is natural: as BSC and Greenfield use the same
address scheme. The same address values on both sides mean the same
account. They do not require an actual mirror.

BNB is a natively pegged token from the genesis of Greenfield. The
"**Token Hub**" contract is a smart contract built on BSC to ensure
that Greenfield cannot inflate BNB and secure the total circulation of BNB.

Bucket, Object, and Group are mirrored onto BSC as NFTs of a new BEP
revised from the ERC-721 standard. These NFTs have corresponding
metadata information for the resources. The ownerships of the NFTs on BSC stand for the ownerships of these resources on Greenfield. As these ownerships are not transferable on Greenfield, these NFTs are not transferable on BSC.

### Cross-Chain Operating Primitives

A few series of cross-chain primitives are defined for dApps to call to operate on these resource entities.

It is worth highlighting that smart contracts can call these primitives in a similar way as EOAs.

**Accounts:**
* Create payment accounts on BSC

**BNB:**
* transfer bidirectionally between BSC and Greenfield among accounts (including even payment accounts)

**Bucket:**
* Create a bucket on BSC
* Mirror bucket from Greenfield to BSC

**Object:**
* Mirror object from Greenfield to BSC
* Create an object on BSC
* Grant/revoke permissions of objects on BSC to accounts/groups
* Copy objects on BSC
* Kick off the execution of an object on BSC
* Associate buckets to payment accounts on BSC

**Group:**
* Mirror group from Greenfield to BSC
* Create a group on BSC
* Change group members on BSC
* Leave a group on BSC

Once these primitives are called by EOA or smart contracts, the
predefined events will be emitted. Greenfield Relayers should pick up these events and relay them over to Greenfield and BSC. As the change will happen asynchronously, there will be specific cross-chain packages for acknowledgments or errors, which can trigger a callback. The caller of the primitives should pay the fees upfront for cross-chain operations and also for the potential callback. More details are discussed in the [Technical Specifications](../tech-specs/ecosystem-players.md).

