---
title: BSC Erigon Node Deployment Guide
---

# BSC Erigon Node Deployment Guide

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
