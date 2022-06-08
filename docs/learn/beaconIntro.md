---
sidebar_label: Introduction
sidebar_position: 2
---
# Introduction

[Beacon Chain](https://www.binance.org) is a blockchain developed by [Binance](https://www.binance.com) and its community that implements a vision of a decentralized exchange (DEX) for digital assets.

At the heart of Beacon Chain is a highly performant [matching engine](../beaconchain/learn/matching-engine.md) built on [distributed consensus](../beaconchain/learn/architecture.md) that aims to replicate the <1 second trading efficiency of current centralized exchanges.

Beacon Chain transactions burns BNB (the native token of the Binance ecosystem), according to a fee schedule.

Beacon Chain also includes efforts to implement [listing assets from other chains](../beaconchain/atomic-swap.md), and cryptographic primitives such as [threshold signatures](../beaconchain/learn/threshold-signature-scheme.md).

## Functionality

Beacon Chain has the basic features of most blockchains:

- Sending and receiving BNB and digital assets
- Issuing new digital assets (we have a standard called BEP-2)
- Mint/burn, freeze/unfreeze, lock/unlock of digital assets

It has DEX and trading-specific functionality:

- Propose exchange listing for trading pairs
- Creating maker/taker orders for traders
- Listing assets from other chains using atomic swaps (BEP-3)

Beacon Chain also implements new features, such as

- Threshold Signatures (an alternative to multisig)
- Smart Contracts sidechain (in-progress)

## Technology Details
Continue reading below if you are interested in what is happening under the hood!

- [Beacon Chain  as a Block Chain](../beaconchain/blockchain.md): about consensus, software stack, network layout and roles.
- [Connect to Beacon Chain ](../beaconchain/chain-access.md): how to connect to Beacon Chain  and DEX via different ways.
- [Run a Beacon Chain  full node](../beaconchain/fullnode.md): how to run a full node and become part of the p2p network of Beacon Chain .
- [Run a Beacon Chain  light client](../beaconchain/light-client.md): how to run a light client.
- [Beacon Chain  Governance](../beaconchain/governance.md): about proposal, vote, and join as a validator.


## Participate

There are different ways to participate in the network, from light nodes to full validators. Beacon Chain follows a philosophy of progressive decentralization. We envision a future where organizations and individuals can run validator nodes, and BNB can be staked to join governance.