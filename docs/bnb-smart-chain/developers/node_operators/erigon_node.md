---
title: Erigon Node - BSC Develop
---

# Erigon Node for BSC

Bsc Erigon is a support by node-real, which is a fork of Erigon. It aim to be the best archive node.

## Hardware Specifications

To run BSC Erigon effectively, ensure your system meets the following hardware requirements:

* 64GB RAM (More ram will have higher performance)
* SSD or NVMe. With at least 5TB for an archive node and 700 GB for a fast-node. 

## Running BSC Erigon

1. Download source code and build binary.
```shell
# Build by self
git clone https://github.com/node-real/bsc-erigon.git
cd bsc-erigon
make erigon

# Download docker image
docker pull ghcr.io/node-real/bsc-erigon:${latest_version}
```

2. Start the erigon node, it will run in archive mode by default, to sync from scratch need about 3 days. 
```shell
# Define 6 flags to avoid conflicts: --datadir --port --http.port --authrpc.port --torrent.port --private.api.addr. Example of multiple chains on the same machine:
# mainnet
./build/bin/erigon --datadir="<your_mainnet_data_path>" --chain=bsc --port=30303 --http.port=8545 --authrpc.port=8551 --torrent.port=42069 --private.api.addr=127.0.0.1:9090 --http --ws --http.api=eth,debug,net,trace,web3,erigon,bsc


# sepolia
./build/bin/erigon --datadir="<your_sepolia_data_path>" --chain=chapel --port=30304 --http.port=8546 --authrpc.port=8552 --torrent.port=42068 --private.api.addr=127.0.0.1:9091 --http --ws --http.api=eth,debug,net,trace,web3,erigon,bsc
```

3. Start a minimal size of bsc erigon node(Not archive). You can add the `--prune.mode=minimal` flag to start a fast node. It will keep 3 days state and block data, support debug_trace* 3day's history. If you run fast-node and don't want spend days to sync. You can obtain fast node snapshots from [community-maintained repositories](https://github.com/48Club/bsc-snapshots). 

