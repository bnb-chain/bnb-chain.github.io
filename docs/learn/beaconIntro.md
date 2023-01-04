---
sidebar_label: Introduction
sidebar_position: 2
---
# Introduction

[Beacon Chain](https://www.bnbchain.org) is a blockchain developed its community that implements the staking and governance layer of BNB ecosystem. 
As a beacon chain, it has a flexible set of native assets and pluggable modules for governance, staking and etc. 
It uses Tendermint for consensus and app logic is built upon Cosmos SDK. It targets fast block times, a native dApp layer and multi-token support with no smart contract VM.

Beacon Chain implement following features now:

- Sending and receiving BNB and digital assets
- Issuing new digital assets (we have a standard called BEP-2 and BEP-8)
- Mint/burn, freeze/unfreeze, lock/unlock of digital assets
- Goverenance for beacon chain and side chains
- Staking of side chains
- Cross chain transfers and communications
- Smart contract sidechain (in-progress)

Beacon Chain also includes efforts to implement [listing assets from other chains](../beaconchain/atomic-swap.md), and cryptographic primitives such as [threshold signatures](../beaconchain/learn/threshold-signature-scheme.md).


## BFT Consensus

[Tendermint Core](https://tendermint.com/core/), which is a Byzantine fault-tolerant (BFT) consensus engine, is adopted in Beacon Chain. 
It is robust against double-spend attacks and is tolerant against a set of up to ⅓ (~33%) Byzantine actors in the network. 

In the protocol, validators take turns proposing blocks of transactions and voting on them.
Two stages of voting are required to successfully commit a block, i.e., pre-vote and pre-commit.
A block is committed when more than 2/3 of validators pre-commit for the same block in the same round.
A block may fail to be committed, e.g., the current proposer may be offline, or the network may be slow, in which case the protocol moves to the next round, and a new validator gets to propose a block for that height. 

Currently, there are **11** validators in BNB Beacon Chain mainnet, and more participants can join as validators after the launch of [BEP159](https://github.com/bnb-chain/BEPs/blob/master/BEP159.md).

## Native Token

BNB is the native token for both BNB Beacon Chain and BNB Smart Chain. On Beacon Chain
- BNB is used as the token for staking and goverenance
- transactions fees are paied in BNB
- transactions burns BNB, according to a fee schedule
- there is a native support for cross chain transfers of BNB between Beacon Chain and side chains.


## Security and Finality

As mentioned earlier, Tendermint Core is robust against double-spend attacks and is tolerant against a set of up to ⅓ Byzantine actors in the network.
Furthermore, Cosmos SDK will also halt if the validators can't come to consensus on a single block to avoid a fork and related attacks.

Beacon Chain guarantees finality on transactions, which means that once agreement is found upon a block, the block becomes final and transactions within that block cannot be reverted.
In summary, **one block finality** is achieved on Beacon Chain, and it usually takes less than **a second**.


## Governance

Beacon Chain implements a powerful and complex module to govern itself and related side chains (e.g., BSC). 
Users can submit different kinds of proposals for signaling, changing consensus parameters on chains, for example, text proposals, fee parameter change proposals, staking parameter change proposals, and so on.
For each on-chain proposal, there are deposit period for depositing BNB and voting period for voters to make votes. 
Once the proposal passes, it will make effect on Beacon Chain and side chains via cross chain communications. 


## Participate

There are different ways to participate in the network, from light nodes to full validators. Beacon Chain follows a philosophy of progressive decentralization. We envision a future where organizations and individuals can run validator nodes, and BNB can be staked to join governance.