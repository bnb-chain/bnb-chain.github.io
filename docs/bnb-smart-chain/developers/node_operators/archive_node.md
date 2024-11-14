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



---
title: BSC Erigon Node Deployment Guide
---

### BSC Erigon Node Deployment

BSC Erigon, maintained by the Node Real team, is a fork of Erigon aimed at becoming the premier archive node implementation for the BSC network.

## Hardware Requirements

To ensure optimal performance of your BSC Erigon node, we recommend the following hardware specifications:

* RAM: 64GB or more (higher RAM correlates with better performance)
* Storage: SSD or NVMe
    - Archive Node: Minimum 5TB
    - Fast Node: Minimum 700GB

## BSC Erigon Node Deployment Steps

### 1. Obtain the Erigon Binary

Option 1: Build from source
```shell
git clone https://github.com/node-real/bsc-erigon.git
cd bsc-erigon
make erigon
```
Option 2: Use Docker image
```shell
docker pull ghcr.io/node-real/bsc-erigon:${latest_version}
```
### 2. Launch the Erigon Node
By default, the node will run in archive mode. Syncing from scratch typically takes about 3 days.
```shell
./build/bin/erigon \
--datadir="<your_data_directory_path>" \
--chain=bsc \
--port=30303 \
--http.port=8545 \
--authrpc.port=8551 \
--torrent.port=42069 \
--private.api.addr=127.0.0.1:9090 \
--http --ws \
--http.api=eth,debug,net,trace,web3,erigon,bsc
```
**Note**: To avoid port conflicts, specify different ports for each chain if running multiple instances.

### 3. Running a Fast Node (Non-Archive Mode)
   Add the --prune.mode=minimal flag to start a fast node. This mode retains only the last 3 days of state and block data, supporting debug_trace* operations for the past 3 days.

If you prefer not to spend days syncing, you can obtain fast node snapshots from [community-maintained repositories](https://github.com/48Club/bsc-snapshots).

By following these steps, you can flexibly deploy either a full BSC Erigon node or a fast node based on your requirements. Whichever option you choose, BSC Erigon will provide you with an efficient and reliable node service.
