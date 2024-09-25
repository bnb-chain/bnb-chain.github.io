---
title: Archive Node - BSC Develop
---


# How to Run an Archive Node on BNB Smart Chain

## What is an archive node?

Simply speaking, an archive node is a full node running with an additional special option, `--gcmode archive`. It stores all the historical data of the blockchain starting from the genesis block. As compared to a typical full node that just holds all the state change data for some latest blocks, an archive node always stores them for each block.

## Why is an archive node important?

Developers are limited to querying the limited recent blocks to check the balance of an address and the state of a smart contract with a full node. It is hard to get all what they want as the blockchain is moving forward at the same time, while they can query any block at a specific point in time with an archive node.
Archive nodes are used by various applications on the blockchain for challenging use cases, including but not limited to the followings:

- Automatic trading system needs historical data to optimize trading model
- Verification modules need state data to verify transactions in time
- Analytical tools need full historical data to do data analysis
- Exchange in some wallets depends on archive node for fast and efficient transfers

## Suggested Requirements

Running an archive node will take a high cost as it includes all the block and state change data. First of all it needs the disk with sufficient capacity; besides this, the CPU and disk performance should be good enough to catch up with the latest block height. You can refer to the [suggested hardware requirements](https://github.com/node-real/bsc-erigon?tab=readme-ov-file#system-requirements).

## How to run an archive node for BSC mainnet?

### Run with an Erigon client

[Erigon](https://github.com/node-real/bsc-erigon) now supports the BSC mainnet. The latest version allows you to sync an archive node from scratch in just 3 days, using 4.3 TB of disk space. You can use Erigon to operate an archive node; for more information, please refer to the [Erigon Node](./erigon_node.md).


### Run with a Reth client

[Reth](https://github.com/bnb-chain/reth) now supports the BSC network and demonstrates superior performance compared to Geth and Erigon in recent benchmark tests. You can utilize reth to operate an archive node; for more information, refer to [Reth Node](./reth_node.md).

