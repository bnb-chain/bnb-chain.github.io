---
sidebar_label: BNB Smart Chain Full Node
hide_table_of_contents: false
sidebar_position: 2
---
# How to Run A Fullnode on BNB Smart Chain

## Fullnodes Functions

* Stores the full blockchain history on disk and can answer the data request from the network.
* Receives and validates the new blocks and transactions.
* Verifies the states of every account.

## Supported Platforms

We support running a full node on **Mac OS X**, **Linux**, and **Windows**.

## Suggested Requirements
- VPS running recent versions of Mac OS X, Linux, or Windows.
- **IMPORTANT** 2 TB of free disk space, solid-state drive(SSD), gp3, 8k IOPS, 250 MB/S throughput, read latency <1ms. (if node is started with snap sync, it will need NVMe SSD)
- 16 cores of CPU and 64 GB of memory (RAM)
- Suggest m5zn.3xlarge instance type on AWS, c2-standard-16 on Google cloud.
- A broadband Internet connection with upload/download speeds of 5 MB/S

## Steps to Run a Fullnode

### Sync From Snapshot (Recommended)

1. Download the pre-build binaries from the [release page](https://github.com/bnb-chain/bsc/releases/latest) or follow the instructions below

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

Download **genesis.json** and **config.toml** by:

```bash
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep mainnet |cut -d\" -f4)
unzip mainnet.zip
```

3. Download snapshot

Download latest chaindata snapshot from [here](https://github.com/bnb-chain/bsc-snapshots). Follow the guide to structure your files.

:::note
Your --datadir flag should point to the folder where the extracted snapshot data is. 
In our case, we created a new folder named node, and we moved the extracted snapshot data to this folder.

```
mv server/data-seed/geth/chaindata node/geth/chaindata
mv server/data-seed/geth/chaindata node/geth/triecache
```

:::

4. Start a full node
```
./geth --config ./config.toml --datadir ./node  --cache 8000 --rpc.allow-unprotected-txs --txlookuplimit 0
```

:::note
Make sure you use the version of geth you downloaded with wget above, and not your local installation of geth, which might be the wrong version.
:::

:::tip
It is recommended to run a fast node, which is a full node with the flag `--tries-verify-mode none` set if you want high performance and care little about state consistency.
Check [here](./BSC-fast-node.md) for full details on running a fast node.
```
./geth --config ./config.toml --datadir ./node  --cache 8000 --rpc.allow-unprotected-txs --txlookuplimit 0 --tries-verify-mode none
```
:::


5. Monitor node status

You can monitor the log from **./node/bsc.log** by default. When your node has started syncing, you should be able to see the following output:

```
t=2022-09-08T13:00:27+0000 lvl=info msg="Imported new chain segment"             blocks=1    txs=177   mgas=17.317   elapsed=31.131ms    mgasps=556.259  number=21,153,429 hash=0x42e6b54ba7106387f0650defc62c9ace3160b427702dab7bd1c5abb83a32d8db dirty="0.00 B"
t=2022-09-08T13:00:29+0000 lvl=info msg="Imported new chain segment"             blocks=1    txs=251   mgas=39.638   elapsed=68.827ms    mgasps=575.900  number=21,153,430 hash=0xa3397b273b31b013e43487689782f20c03f47525b4cd4107c1715af45a88796e dirty="0.00 B"
t=2022-09-08T13:00:33+0000 lvl=info msg="Imported new chain segment"             blocks=1    txs=197   mgas=19.364   elapsed=34.663ms    mgasps=558.632  number=21,153,431 hash=0x0c7872b698f28cb5c36a8a3e1e315b1d31bda6109b15467a9735a12380e2ad14 dirty="0.00 B"
```

### Sync From Genesis Block (Not Recommended)

:::note
To sync from genesis block, you would need a more powerful hardware. Server should at least have 40k IOPS and be at least an i3/i3en series server. 
:::

1. Write genesis state locally

```bash
./geth --datadir node init genesis.json
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

2. Start fullnode

```bash
## start a full node
./geth --config ./config.toml --datadir ./node  --cache 8000 --rpc.allow-unprotected-txs --txlookuplimit 0
```

## Sync Mode

There are two sync modes for running a full node: **snap** and **full** which can be specified by flag **--syncmode**.

The **snap** sync mode is used for initial sync, which will download the latest states rather than apply the blocks from the genesis. When the initial sync is done, it will switch to full sync automatically.

The **full** sync mode can also be used to do initial sync, which will apply all the blocks since genesis.

Since the amount of historical data is too large, the initial sync is **not recommended** for running a full node. Instead, you can download a snapshot from the official repo and start from the snapshot. Default value is **full** when you start geth with an existing data folder so there is no need to explicitly add it when syncing from snapshot.

## Local Private Network
Please refer to [BSC-Deploy Tools](https://github.com/bnb-chain/node-deploy) to setup a local private network.

## Node Maintenance
Please read [this guide](./validator/node-maintenance.md)

## Upgrade Geth
Please read [this guide](./validator/upgrade-fullnode.md)

