---
sidebar_label: Getting Started
---
# Getting Started
This document serves as a starting point for new users to the BNB Chain ecosystem. General knowledge of cryptocurrency is assumed, and in particular familiarity with the Ethereum ecosystem. If you don't understand something right away, that's OK. Search for an answer online, and if you don't find it, ask on our [Discord](http://discord.com/invite/bnbchain). 

## What can users do with BNB Smart Chain (BSC)?
BNB Smart Chain (BSC) is the blockchain component of the BNB Chain ecosystem that is equipped with the smart contract functionality and compatibility with the Ethereum Virtual Machine (EVM) and is used for developing various kinds of decentralized applications. The design goal of BSC was to leave the high throughput of BNB Beacon Chain intact while introducing smart contracts into the BNB Chain ecosystem. Being EVM-compatible, other than easy portability, BSC enjoys support of the rich universe of [Ethereum](https://academy.binance.com/en/articles/what-is-ethereum) tools and dApps

### Tokenization
On the BNB Smart Chain, users can: 
- Send and receive [BNB](bnb-chain-wallet.md#transfer-testnet-bnb-from-bsc-to-bc), [BEP2 tokens](./wallet/bnb-chain-wallet.md#swap-testnet-bep2-token-to-its-bep20-equivalent) and other supported token standards cross-chain.
- [Stake your BNB](wallet/staking.md) to earn some block rewards.
- Issue Fungible tokens like [BEP20 Tokens](./BEP20.md) to digitalize assets.
- Issue [Non-Fungible Tokens (NFTs)](./ERC721.md).
- Extensive support of [Cross-Chain Bridges](./learn/cross-chain-bridges.md) for cross-chain transfers of tokens.

### BNB Token and Fees
BNB is the cryptocurrency coin that powers the BNB Chain ecosystem. As one of the world's most popular utility tokens, not only can you trade BNB like any other cryptocurrency, you can also use BNB in a wide range of applications and use cases. 

Although initially based on the Ethereum network, the ERC-20 BNB tokens were later swapped with [BEP-2](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP2.md) BNB at a 1:1 ratio. The BEP-2 BNB is the native coin of the BNB Beacon Chain, and the mainnet.

In 2020, the BNB Smart Chain (BSC) was launched. BSC is a blockchain network that runs in parallel with the BNB Beacon Chain. This means that BNB can be found in three different forms:

- BNB BEP-2 on the BNB Beacon Chain.
- BNB BEP-20 on the BNB Smart Chain.
- BNB ERC-20 on the Ethereum network.

### How to Buy BNB Tokens
As all fees on BNB Chain are paid in BNB, therefore, in order to interact with the BNB Smart Chain network you will need to have some BNB tokens. 
- BNB tokens can also be received for usage on testnet through the **[Testnet Faucet](https://testnet.bnbchain.org/faucet-smart)**.
- Refer [here](wallets/wallet-tutorial-overview) for tutorials on different wallets for use with BNB Chain to send/receive/purchase BNB Tokens.

### Extensive Support of Wallets
For a list of tutorials on how to use other supported wallets with BNB Smart Chain, refer [here](wallets/wallet-tutorial-overview.md).

### Using Blockchain Explorers
Explore the transaction history, blocks on the chain check different asset types, the distribution of their ownerships, and owners' transactions, etc. via the use of explorers. Refer [here](./BSCexplorers.md) for a complete list.

### Building dApps
BSC empowers developers to build dApps of different kinds. Below is a list of tutorials on how to develop smart contracts using IDEs
- Using [ChainIDE](./chainide.md).
- Using [RemixIDE](./remix-new.md).
- Using [Truffle](./truffle-new.md).
- Using [HardHat](./hardhat-new.md).
- Using [Replit](./replit.md).

- Verify Your Smart Contract using [BscScan](./verify.md).
- [Develop wallets](wallet/wallet_api.md) and tools to help users use DApps.

### Migrate your dApps to BSC
- Migrate your existing dApps from other blockchains to BSC
  - From [Solana](./migration/non-evm-chains/solana/architecture-comparison.md).
  - From [Polygon](./migration/evm-chains/chain-comparison.md)

### Node RPC
There are data seed nodes in the network which allow users to perform low-level operations like executing ABCI queries, viewing network/consensus state or broadcasting a transaction.
If you run a full node by yourself, you can also use RPC functions. For a list of all the Node RPC services for BNB Beacon Chain refer [here](beaconchain/develop/api-reference/node-rpc.md) and for BNB Smart Chain refer [here](rpc.md).
