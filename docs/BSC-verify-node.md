---
sidebar_label: BNB Smart Chain Verify Node
hide_table_of_contents: false
sidebar_position: 2
---
# How to Run A Verify Node on BNB Smart Chain

## Verify Node Functions

* Stores the full blockchain history on disk and can answer the data request from the network.
* Receives and validates the new blocks and transactions.
* Verifies the states of every account.
* Verifies the states of a Fast Node.

## Suggested Requirements for Verify Node

- VPS running recent versions of Mac OS X, Linux, or Windows.
- **IMPORTANT**  2 TB of free disk space, solid-state drive(SSD), gp3, 8k IOPS, 250 MB/S throughput, read latency <1ms
- 16 cores of CPU and 64 GB of memory (RAM)
- Suggest m5zn.3xlarge instance type on AWS, or c2-standard-16 on Google cloud.
- A broadband Internet connection with upload/download speeds of 10 MB/S

## Steps to Run a Verify Node

### Sync From Snapshot (Recommended)

1. Download the pre-build binaries from [release page](https://github.com/bnb-chain/bsc/releases/latest) or follow the instructions below:

```bash
# Linux
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep geth_linux |cut -d\" -f4)
mv geth_linux geth
chmod -v u+x geth

# MacOS
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep geth_mac |cut -d\" -f4)
mv geth_mac geth
chmod -v u+x geth
```

2. Download the config files

Download `genesis.json` and `config.toml` by:

```bash
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep mainnet |cut -d\" -f4)
unzip mainnet.zip
```

3. Download snapshot

Download latest chaindata snapshot from [here](https://github.com/bnb-chain/bsc-snapshots). Follow the guide to structure your files.

:::note
Your --datadir flag should point to the extracted chaindata folder path
:::

4. Start a full node
```
geth --config ./config.toml --datadir ./node --diffsync --cache 8000 --rpc.allow-unprotected-txs --txlookuplimit 0
```

:::note
Make sure you use the version of geth you downloaded with wget above, and not your local installation of geth, which might be the wrong version.
:::

### Sync From Genesis Block (Not Recommended)

1.Build from source code

Make sure that you have installed [Go 1.17.13+](https://golang.org/doc/install) and have added `GOPATH` to `PATH` environment variable

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
mv geth_linux geth
chmod -v u+x geth

# MacOS
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep geth_mac |cut -d\" -f4)
mv geth_mac geth
chmod -v u+x geth
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

4.Start your verify node


!!! Note
    BREAKING CHANGE: Non-EIP155 transactions (i.e. transactions which are not replay-protected) are now rejected by the RPC API. You can disable this restriction using the --rpc.allow-unprotected-txs command-line flag.

```bash
## start a verify node
geth --enabletrustprotocol --persistdiff --diffblock 1000000000 --config ./config.toml --datadir ./node --cache 8000 --rpc.allow-unprotected-txs --txlookuplimit 0
```

## Node Maintenance
Please read [this guide](./validator/node-maintenance.md)

## Upgrade Geth
Please read [this guide](./validator/upgrade-fullnode.md)
