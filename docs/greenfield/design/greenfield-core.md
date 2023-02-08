---
sidebar_label: BNB Greenfield Core
sidebar_position: 2
hide_table_of_contents: false
---
# BNB Greenfield Core

## The BNB Greenfield Blockchain

BNB Greenfield blockchain uses **Proof-of-Stake** based on
Tendermint-consensus for its own network security. Blocks are created every **2 seconds** on the BNB Greenfield chain by a group of validators.

BNB will be the gas and governance token on this blockchain. There is a native cross-chain bridge between the Greenfield blockchain and BSC. The initial BNB will be locked on BSC and re-minted on Greenfield. BNB and data operation primitives can flow between Greenfield and BSC.

Total circulation of BNB will stay unchanged as it is now but flow among
BNB Beacon Chain, BSC, and Greenfield.

The validator election and governance are based on a proposal-vote
mechanism, which is revised based on Cosmos SDK's governance module:
anyone can create and propose to become a validator, and the election
into the active set will be based on the stake ranking (initially new
validators may request the existing validator set's votes to be
qualified for election). As validators will host all the critical
metadata and respond to all data operation transactions, they should run
professionally in terms of performance and stability.

To facilitate cross-chain operation and convenient asset management, the
address format of the Greenfield blockchain will be fully compatible
with BSC (and Ethereum). It also accepts EIP712 transaction signing and
verification. These enable the existing wallet infrastructure to
interact with Greenfield at the beginning naturally.

## The Storage Providers, SPs

SPs play a different role from Greenfield validators, although the same
organizations or individuals can run both SPs and validators if they
follow all the rules and procedures to get elected.

SPs store the objects' real data, i.e. the payload data. Each SP runs its own object storage system. Similar to Amazon
S3 and other object store systems, the objects stored on SPs are immutable. The users may delete and re-create the
object (under the different ID, or under the same ID after certain publicly declared settings), but they cannot modify
it.

SPs have to register themselves first by depositing on the Greenfield
blockchain as their "**Service Stake**". Greenfield validators will go
through a dedicated governance procedure to vote for the SPs of their
election. SPs are encouraged to advertise their information and prove to
the community their capability, as SPs have to provide a professional
storage system with high-quality SLA.

SPs provide publicly accessible APIs for users to upload, download, and manage data. These APIs are very similar to Amazon S3 APIs so that existing developers may feel familiar enough to write code for it. Meanwhile, they provide each other REST APIs and form another
white-listed P2P network to communicate with each other to ensure data availability and redundancy. There will also be a P2P-based
upload/download network across SPs and user-end client software to
facilitate easy connections and fast data download, which is similar to
BitTorrent.

More SPs are welcome to ensure decentralization and data redundancy. But too many SPs may make SPs unable to make enough to sustain the business. Greenfield has an incentive design to make a proper number of SPs available. While SPs can choose to stay with the network or leave.

When the SPs join and leave the network, they have to follow a series of actions to ensure data redundancy for the users; otherwise, their "**Service Stake**" will be fined. This is achieved through the data availability challenge (described in detail in the [Technical Specifications Section](../tech-specs/ecosystem-players.md)) and validator governance votes.

## The Pair Synergy

Greenfield validators and SPs form a pair synergy to provide the whole storage service. Validators store the metadata and financial ledger with consensus, while SPs provide real data storage and downloading.
Validators have the motivation to ensure enough good SPs to provide
decent service, while users and SPs rely on a stable and decentralized Greenfield blockchain as a single source of truth on metadata.
