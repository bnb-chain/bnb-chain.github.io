---
title: Reth Node - BSC Develop
---

# Reth Node for BSC

BSC Reth is a cutting-edge Rust client developed in collaboration with Paradigm, designed to provide seamless support for BNB Smart Chain (BSC). It aims to enhance client diversity on the BNB Chain by offering a secure and efficient execution client.

## Hardware Specifications

To run BSC Reth effectively, ensure your system meets the following hardware requirements:

* CPU with 16+ cores
* 128GB RAM
* High-performance NVMe SSD with at least 4TB of free space for a full node and 8TB for an archive node
* Broadband internet connection with upload/download speeds of 25 MB/s

## Running BSC Reth

1. Download source code and build binary.
```shell
git clone https://github.com/bnb-chain/reth.git
cd reth
make build-bsc
```

2. Start the reth node, it will run in archive mode by default. You can add the `--full` flag to start a full node.
```shell
# for mainnet
export network=bsc

# for testnet
# export network=bsc-testnet

./target/release/bsc-reth node \
    --datadir=./datadir \
    --chain=${network} \
    --http \
    --http.api="eth, net, txpool, web3, rpc" \
    --log.file.directory ./datadir/logs
```

3. Optionally, you can run the reth node with docker.
```shell
# for mainnet
export network=bsc

# for testnet
# export network=bsc-testnet

# check this for version of the docker image, https://github.com/bnb-chain/reth/pkgs/container/bsc-reth
export version=latest

# the directory where reth data will be stored
export data_dir=/xxx/xxx

docker run -d -p 8545:8545 -p 30303:30303 -p 30303:30303/udp -v ${data_dir}:/data \
    --name bsc-reth ghcr.io/bnb-chain/bsc-reth:${version} node \
    --datadir=/data \
    --chain=${network} \
    --http \
    --http.api="eth, net, txpool, web3, rpc" \
    --log.file.directory /data/logs
```

## Snapshot

To synchronize a BSC reth node from scratch to the current block height can be a time-consuming process.
As We benchmark [Reth(v1.0.0)](https://github.com/bnb-chain/reth/releases/tag/v1.0.0) on AWS [lm4gn.8xlarge](https://instances.vantage.sh/aws/ec2/im4gn.8xlarge)(32 core 128G) with 2 x 7500 NVMe SSD for BSC mainnet.
It may take approximately 30 days to sync the latest block on BSC mainnet for an archive node and 24 days for a full node.

Given the extended duration required for stage synchronization of the BSC network, the BNB Chain team is developing a segmented snapshot download solution, scheduled for release in the near future.
Currently, developers seeking to expedite the process can obtain archive node snapshots from [community-maintained repositories](https://github.com/fuzzland/snapshots).
These snapshots offer a faster alternative to syncing from genesis, allowing for quicker node setup and network participation.
