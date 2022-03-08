---
sidebar_label: Getting Started
hide_table_of_contents: false
---

# Getting Started
The purpose of this tutorial is to give a general overview of BNB Chain and to serve as a starting point for new users to the BNB Chain ecosystem. General knowledge of cryptocurrency is assumed, and in particular familiarity with the Ethereum ecosystem. If you don't understand something right away, that's OK. Search for an answer online, and if you don't find it, ask on our [Discord](http://discord.com/invite/binancesmartchain).

We recommend reading this document entirely before using BNB Chain so that you can avoid common pitfalls and problems that new users run into. There are many multiple components of the BNB Chain, so it's best to get a full picture of things before diving in to save yourself confusion. 

You can find a general overview of BNB Chain [here](bnbIntro). It will be useful in understanding similarities and differences between BNB Chain and other platforms.

## BNB Chain: Beacon Chain and BNB Smart Chain
BNB Chain is composed of two blockchains - Beacon Chain (BC) and BNB Smart Chain (BSC). The [Beacon Chain](learn/beaconIntro.md) is the blockchain component that is responsible for the governance of the BNB Chain and manages staking and voting on the BNB Chain. Whereas, the [BNB Smart Chain](learn/intro.md) is the blokchain component that is EVM compatible, consensus layers, and with hubs to multi-chains.

### What can you do with Beacon Chain(BC)?

### What can you do with BNB Smart Chain (BSC)?

## BNB Token and Fees
BNB is the cryptocurrency coin that powers the BNB Chain ecosystem. As one of the world's most popular utility tokens, not only can you trade BNB like any other cryptocurrency, you can also use BNB in a wide range of applications and use cases. 

Although initially based on the Ethereum network, the ERC-20 BNB tokens were later swapped with [BEP-2](https://academy.binance.com/en/glossary/bep-2) BNB at a 1:1 ratio. The BEP-2 BNB is the native coin of the Beacon Chain, and the mainnet.
In 2020, the BNB Smart Chain (BSC) was launched. BSC is a blockchain network that runs in parallel with the BNB Beacon Chain. This means that BNB can be found in three different forms:

- BNB BEP-2 on the BNB Beacon Chain.
- BNB BEP-20 on the BNB Smart Chain.
- BNB ERC-20 on the Ethereum network.

## How to Buy BNB Tokens
As all fees on BNB Chain are paid in BNB, therefore, in order to interact with the BNB Chain network you will need to have some BNB tokens. 
- BNB tokens can also be received for usage on testnet through the [testnet faucet](https://testnet.binance.org/faucet-smart).
- The BNB tokens for usage on mainnet are available for purchase on multiple leading exchanges and wallets as explained [here](#wallet). You can also refer [here][wallets/wallet-tutorial-overview] for tutorials on ho to use different wallets for use with BNB Chain to send/receive/purchase BNB Tokens.

## Wallet
The easiest way to use BNB Beacon and BNB Smart Chain is through a wallet with support for accounts and transfers on these chains.

BNB Chain provides a Web Wallet at [https://www.bnbchain.world/en](https://www.bnbchain.world/en). BNB Chain also provides Web Wallet for testnet at [https://testnet.binance.org](https://testnet.binance.org). Both provide the functions described below:

- Generating crypto keys and addresses, which serves as the base of a wallet
- Showing the balances of assets on the addresses
- Sending and receiving assets

Binance Web Wallet also presents a trading UI, where you can examine market data and manage your orders to trade among the listed assets. Learn about the list of wallets available [here](Wallet.md).

## Chain Explorer
Chain Explorer provides a portal to explore blocks and transaction details. On [Beacon Chain Explorer](https://explorer.binance.org/) and [BNB Smart Chain Explorer](https://bscscan.com/), you can also check different asset types, the distribution of their ownerships, and owners' transactions.

## REST API
There are [Accelerated Nodes](beaconchain/develop/node/nodetypes.md) which provide advanced API services for the public. Here is a list of all the Rest API information Accelerated Node provides: [paths](api-reference/dex-api/paths.md). For information regarding RPC Endpoints for BSC, refer [here](rpc.md).

### Node RPC
There are data seed nodes in the network which allow users to perform low-level operations like executing ABCI queries, viewing network/consensus state or broadcasting a transaction.
If you run a full node by yourself, you can also use those RPC functions. Here is a list of all the Node RPC services it provides: for Beacon Chain refer [here](api-reference/node-rpc.md) and for BNB Smart Chain refer [here](rpc.md).

## Advanced Ways To Use BNB Chain
### Run your own full node

Please refer to this guide about how to run your own full node on [Beacon Chain](beaconchain/fullnode.md) and [BNB Smart Chain](validator/fullnode.md).

### Run your own Light Client

Please refer to this guide about [how to run your own light client on Beacon Chain](beaconchain/light-client.md).

### Access via Node Command Line Interface (CLI)

A Command Line Interface is available for Linux and Mac platforms. Please refer to the [CLI Reference](api-reference/cli.md).

### Use SDKs

SDKs are also provided as a starting point for your apps.

There are two advanced SDK solutions for Beacon chain: [Java](<https://github.com/binance-chain/java-sdk>) and [Golang](<https://github.com/binance-chain/go-sdk>).

Both solutions provide functions for:

* Create wallets and manage keys
* Encode/sign transactions and submit to Binance Chain/DEX, including Transfer, New Order, Cancel Order, etc.
* Communicate with Binance Chain/DEX Node RPC calls through public node RPC services or your own private full nodes

Please refer to specific SDK documentation for more information:

- [Go](https://github.com/binance-chain/go-sdk)([Documentation](https://github.com/binance-chain/go-sdk/wiki))
- [Java](https://github.com/binance-chain/java-sdk)([Documentation](https://github.com/binance-chain/java-sdk/wiki))
- [Javascript](https://github.com/binance-chain/javascript-sdk) ([Documentation](https://github.com/binance-chain/javascript-sdk/wiki))
- [C++](https://github.com/binance-chain/cplusplus-sdk)([Documentation](https://github.com/binance-chain/cplusplus-sdk/wiki))
- [C#](https://github.com/binance-chain/csharp-sdk)([Documentation](https://github.com/binance-chain/csharp-sdk))
- [Python](https://github.com/binance-chain/python-sdk)([Documentation](https://python-binance-chain.readthedocs.io/en/latest/binance-chain.html#module-binance_chain))
- [Swift](https://github.com/binance-chain/swift-sdk)([Documentation](https://github.com/binance-chain/swift-sdk/blob/master/README.md))


## Blockchain Details
Please check the [technical details](beaconchain/index.md#technology-details) for more technical information.
