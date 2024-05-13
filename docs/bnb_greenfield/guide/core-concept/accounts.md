---
title: Accounts
description: Greenfield defines its account in the same format as BSC and Ethereum.
keywords: [BNB Greenfield address, BNB Greenfield signature]
order: 1
---

# Accounts
Each Greenfield user has their own address as the identifier for his/her account.
The addresses can create objects to store on Greenfield, bear and manage
the permissions, and pay fees.

Greenfield defines its account in the same format as BSC and Ethereum.
It starts with ECDSA secp256k1 curve for keys and is compliant with
[EIP84](https://github.com/ethereum/EIPs/issues/84) for
full [BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
paths. The root HD path for Greenfield-based accounts is
m/44'/60'/0'/0. In the readable presentation, a Greenfield address is
a 42-character hexadecimal string derived from the last 20 bytes of the
public key of the controlling account with 0x as the prefix.

With this compatible address scheme, the users can reuse existing
accounts and infrastructure from BSC on Greenfield. For example, they
can use TrustWallet and Metamask (or other compatible wallets) to
deposit their BNB from BSC to Greenfield and interact with dApps on
Greenfield. It is also easy to identify the same owner by referring to
the same addresses on both BSC and Greenfield.

## User Balance

The account can hold a balance of BNB. These BNBs can be used to
participate in staking, pay for gas fees of Greenfield transactions, and
pay for Greenfield services.

This balance can be added via native BNB transfer on Greenfield, or
cross-chain transfer between Greenfield and BSC.

## Account Definition

In the Greenfield, an **account** designates a pair of `PubKey` and `PrivKey`. 
The `PubKey` can be derived to generate various `Addresses`, which are used to identify users (among other parties) in 
the application.

## Signatures

The principal way of authenticating a user is done using [digital signatures](https://en.wikipedia.org/wiki/Digital_signature). 
Users sign transactions using their own private key. Signature verification is done with the associated public key. 
For on-chain signature verification purposes, we store the public key in an `Account` object (alongside other data required 
for a proper transaction validation).

In the node, all data is stored using [Protocol Buffers](https://protobuf.dev/) serialization.

Greenfield only supports [secp256k1](https://en.bitcoin.it/wiki/Secp256k1) key schemes for creating digital signatures:

|             | Address length in bytes | Public key length in bytes | Used for transaction authentication | Used for consensus (Tendermint) |
| :---------: | :---------------------: | :------------------------: | :---------------------------------: | :-----------------------------: |
| `secp256k1` |           20            |             33             |                 yes                 |               no                |

## Addresses

`Addresses` and `PubKey`s are both public information that identifies actors in the application. `Account` is used to 
store authentication information. The basic account implementation is provided by a `BaseAccount` object.

To identify users, Greenfield uses the variable `AccAddress`. The address format follows [ERC-55](https://eips.ethereum.org/EIPS/eip-55).