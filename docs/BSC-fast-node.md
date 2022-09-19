---
sidebar_label: BNB Smart Chain Fast Node
hide_table_of_contents: false
sidebar_position: 2
---
# How to Run A Fast Node on BNB Smart Chain

## Fast Node Functions

* Stores the full blockchain history on disk and can answer the data request from the network.
* Receives and validates the new blocks and transactions.
* Verifies the states of every accounts.

## Suggested Requirements for Fast Node

- VPS running recent versions of Mac OS X or Linux.
- **IMPORTANT** 1T GB of free disk space, solid-state drive(SSD), gp3, 8k IOPS, 250MB/S throughput, read latency <1ms. (if start with snap/fast sync, it will need NVMe SSD)
- 16 cores of CPU and 64 gigabytes of memory (RAM).
- Suggest m5zn.3xlarge instance type on AWS, c2-standard-16 on Google cloud.
- A broadband Internet connection with upload/download speeds of 5 megabyte per second

## Settings

## Steps to Run a Fast Node

### Sync From Snapshot (Recommended)

1. Download the pre-build binaries from [release page](https://github.com/bnb-chain/bsc/releases/latest) or follow the instructions below:

```bash
# Linux
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep geth_linux |cut -d\" -f4)
# MacOS
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep geth_mac |cut -d\" -f4)
```

2. Download the config files

Download `genesis.json` and `config.toml` by:

```bash
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep mainnet |cut -d\" -f4)
unzip mainnet.zip
```

3. Download snapshot

  Download latest snapshot from [here](https://github.com/bnb-chain/bsc-snapshots).

  Follow the guide to structure the files.

4. Prune all trie data

Fast node does not need trie data anymore, prune the trie data by the following command.
```
./geth snapshot insecure-prune-all --datadir ./node  ./genesis.json
```

### Sync From Genesis Block (Not Recommended)

1.Build from source code

Make sure that you have installed [Go 1.13+](https://golang.org/doc/install) and have added `GOPATH` to `PATH` environment variable

```bash
git clone https://github.com/bnb-chain/bsc
# Enter the folder bsc was cloned into
cd bsc
# Compile and install bsc
make geth
```

or you can download the pre-build binaries from [release page](https://github.com/bnb-chain/bsc/releases/latest) or follow the instructions below:

```bash
# Linux
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep geth_linux |cut -d\" -f4)
# MacOS
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep geth_mac |cut -d\" -f4)
```

2.Download the config files

Download `genesis.json` and `config.toml` by:

```bash
## mainet
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep mainnet |cut -d\" -f4)
unzip mainnet.zip

## testnet
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep testnet |cut -d\" -f4)
unzip testnet.zip
```

3.Write genesis state locally

```bash
geth --datadir node init genesis.json
```

You could see the following output:

```
INFO [05-19|14:53:17.468] Allocated cache and file handles         database=/Users/huangsuyu/Downloads/bsc/node/geth/chaindata cache=16.00MiB handles=16
INFO [05-19|14:53:17.498] Writing custom genesis block
INFO [05-19|14:53:17.501] Persisted trie from memory database      nodes=21 size=56.84KiB time=357.915µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=-574.00B
INFO [05-19|14:53:17.502] Successfully wrote genesis state         database=chaindata hash=7d79cc…fb0d1e
INFO [05-19|14:53:17.503] Allocated cache and file handles         database=/Users/huangsuyu/Downloads/bsc/node/geth/lightchaindata cache=16.00MiB handles=16
INFO [05-19|14:53:17.524] Writing custom genesis block
INFO [05-19|14:53:17.525] Persisted trie from memory database      nodes=21 size=56.84KiB time=638.396µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=-574.00B
INFO [05-19|14:53:17.528] Successfully wrote genesis state         database=lightchaindata hash=7d79cc…fb0d1e
```

## Start Fast Node Without Snapshot Verification
1. Start your fast node without snapshot verification by verify nodes.

```bash
## start a fast node
geth --tries-verify-mode none --config ./config.toml --datadir ./node  --cache 8000 --rpc.allow-unprotected-txs --txlookuplimit 0
```

## Start Fast Node With Snapshot Verification
1. Add verifyNodes peers in config.toml.

```
[Node.P2P]
MaxPeers = 1350
NoDiscovery = false
BootstrapNodes = ["enode://...", "enode://...", ...]
VerifyNodes = ["enode://...", "enode://...", ...]
StaticNodes = ["enode://...", "enode://...", ...]
ListenAddr = ":30311"
EnableMsgEvents = false
```

2. Start your fast node with snapshot verification by verify nodes.

```bash
## start a fast node
geth --tries-verify-mode full --config ./config.toml --datadir ./node  --cache 8000 --rpc.allow-unprotected-txs --txlookuplimit 0
```

## Node Maintainence

### Peer Discovery
The bootstrap nodes will be enhanced in the short future. So far, a discovery http service will provide some stable public p2p peers for syncing. Please visit https://api.binance.org/v1/discovery/peers to get dynamic peer info. You can append the peer info to the `StaticNodes` in the config.toml to enhance the networking of the full nodes. To avoid crowded networking, the discovery service will change the peer info from time to time, try fetch new ones if the connected peers of full node are too few.

### Binary
All the clients are suggested to upgrade to the latest release. The [latest version](https://github.com/bnb-chain/bsc/releases/latest) is supposed to be more stable and get better performance.

## Upgrade Geth

Please read [this guide](./validator/upgrade-fullnode.md)
