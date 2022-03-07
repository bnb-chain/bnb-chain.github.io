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

## Participate

There are different ways to participate in the network, from light nodes to full validators. Beacon Chain follows a philosophy of progressive decentralization. We envision a future where organizations and individuals can run validator nodes, and BNB can be staked to join governance.