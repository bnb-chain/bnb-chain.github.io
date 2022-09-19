---
sidebar_label: BNB Smart Chain Full Node
hide_table_of_contents: false
sidebar_position: 2
---
# How to Run A Fullnode on BNB Smart Chain

## Fullnodes Functions

* Stores the full blockchain history on disk and can answer the data request from the network.
* Receives and validates the new blocks and transactions.
* Verifies the states of every accounts.

## Supported Platforms

We support running a full node on `Mac OS X`and `Linux`.

## Suggested Requirements

### Fullnode
- VPS running recent versions of Mac OS X or Linux.
- **IMPORTANT** 2T GB of free disk space, solid-state drive(SSD), gp3, 8k IOPS, 250MB/S throughput, read latency <1ms. (if start with snap/fast sync, it will need NVMe SSD)
- 16 cores of CPU and 64 gigabytes of memory (RAM).
- Suggest m5zn.3xlarge instance type on AWS, c2-standard-16 on Google cloud.
- A broadband Internet connection with upload/download speeds of 5 megabyte per second

### Validator
- VPS running recent versions of Mac OS X or Linux.
- **IMPORTANT** 2T GB of free disk space, solid-state drive(SSD), gp3, 8k IOPS, 250MB/S throughput, read latency <1ms
- 16 cores of CPU and 64 gigabytes of memory (RAM)
- Suggest m5zn.3xlarge instance type on AWS, or c2-standard-16 on Google cloud.
- A broadband Internet connection with upload/download speeds of 10 megabyte per second

## Settings

### Common Problems With Connectivity

Sometimes you just can’t get synced. The most common reasons are as follows:

* You have started `geth` without the discovery protocol, you can set the `--nodiscover` parameter to `False`. You only want this if you are running full node with fixed nodes.

- Update `BootstrapNodes`

```
BootstrapNodes = ["enode://1cc4534b14cfe351ab740a1418ab944a234ca2f702915eadb7e558a02010cb7c5a8c295a3b56bcefa7701c07752acd5539cb13df2aab8ae2d98934d712611443@52.71.43.172:30311","enode://28b1d16562dac280dacaaf45d54516b85bc6c994252a9825c5cc4e080d3e53446d05f63ba495ea7d44d6c316b54cd92b245c5c328c37da24605c4a93a0d099c4@34.246.65.14:30311","enode://5a7b996048d1b0a07683a949662c87c09b55247ce774aeee10bb886892e586e3c604564393292e38ef43c023ee9981e1f8b335766ec4f0f256e57f8640b079d5@35.73.137.11:30311"]
```

- Add `Static nodes`

Geth also supports a feature called static nodes if you have certain peers you always want to connect to. Static nodes are re-connected on disconnects. You can configure permanent static nodes by putting something like the following into `<datadir>/geth/static-nodes.json`:

```
[
  "enode://pubkey@ip:port",
  "enode://cfc556867894dc84707c2ce6290740d6ba112b279217e6db420f215397492a91ef76bbfe18ebd349a09b37fc8bfef5740d2d2335838e063094d5b63c3fd20d8f@34.197.85.99:30311",
  "enode://7cf68af17a83f925f34eeced2a139b1d11bac03fd2635707e459a821965b5e6016021a43379f24dc428ebcb84b8fb377517dee6ae484cd276a2f9360dac9c183@52.86.7.102:30311",
  "enode://b2ed83944f4c0e18d6b2f5f6c2e86b0320c10b8a96f897a535b43f25dc625ae739f449765ad86f38a393472638fcef69f30d7af53b02c3545722b1dd6f18f606@34.194.252.9:30311",
  "enode://42deadff5ff5d97ea4245128952335969fafea6c4ddd05146b3cac125099e1b2d1ea42c8d02c11ee8b5272a75d4f4b9f51a99244fd6daf1c6a1d5017242a3d43@101.36.120.67:30311",
  "enode://905f585c09b8eed66afdf8a99acdab7487185357f33d5c9fe40332e4aa4a661382b159ffb300b20fbc12e81505505944ac3bfc7e6673b352d01e09f2df8af5bc@152.32.131.34:30311",
  "enode://e585bafb7ab5a187534d69e84531165e5d4b0ee4f76b21641fe778c53770cd72e1850d44b48ad00c08ca4dc860cd5c5afa04b23a5061303f61d2658b1c48b9b2@152.32.132.171:30311",
  "enode://8fb5dd1259e0672efb8c141434bf0c24c73b338f7c2da15efc2def7403b952d453814230eeb97f555aaed46ee0b0b6e2a8568b518f88bd328729031746114dd2@3.0.236.154:30311",
  "enode://8fb5dd1259e0672efb8c141434bf0c24c73b338f7c2da15efc2def7403b952d453814230eeb97f555aaed46ee0b0b6e2a8568b518f88bd328729031746114dd2@3.0.236.154:30311"
]
```

You can also add static nodes at runtime via the js console using admin.addPeer():

```
admin.addPeer( "enode://8fb5dd1259e0672efb8c141434bf0c24c73b338f7c2da15efc2def7403b952d453814230eeb97f555aaed46ee0b0b6e2a8568b518f88bd328729031746114dd2@3.0.236.154:30311"
)
```

- Add `Trusted nodes`

Geth supports trusted nodes that are always allowed to reconnect, even if the peer limit is reached. They can be added permanently via a config file `<datadir>/geth/trusted-nodes.json` or temporary via RPC call.

## Chaindata Snapshot

Please download the chain data [snapshot](./snapshot) and extract to your home folder to speed up

```
## Extract the data
unzip geth.zip -d /NAME_OF_YOUR_HOME/node &
```

### Sync Mode

* Fast Sync

The **default** sync mode. Synchronizes a full node doing a fast synchronization by downloading the entire state database, requesting the headers first, and filling in block bodies and receipts afterward. Once the fast sync reaches the best block of the BNB Smart Chain network, it switches to full sync mode.

* Full Sync

Synchronizes a full node starting at genesis, verifying all blocks and executing all transactions. This mode is a bit slower than the fast sync mode but comes with increased security.


## Steps to Run a Fullnode

### Sync From Snapshot (Recommended)

1. Download the pre-build binaries from [release page](https://github.com/bnb-chain/bsc/releases/latest) or follow the instructions below:

```bash
# Linux
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep geth_linux |cut -d\" -f4)
mv geth_linux geth

# MacOS
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep geth_mac |cut -d\" -f4)
mv geth_mac geth
```

2. Download the config files

Download `genesis.json` and `config.toml` by:

```bash
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep mainnet |cut -d\" -f4)
unzip mainnet.zip
```

3. Download snapshot

Download latest snapshot from [Download site](https://github.com/bnb-chain/bsc-snapshots)
Follow the guide to structure the files.

4. Start a full node
```
./geth --config ./config.toml --datadir ./node --diffsync --cache 8000 --rpc.allow-unprotected-txs --txlookuplimit 0
```

Note: Make sure you use the version of geth you downloaded with wget above, and not your local installation of geth, which might be the wrong version.

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

4.Start your fullnode


!!! Note
    BREAKING CHANGE: Non-EIP155 transactions (i.e. transactions which are not replay-protected) are now rejected by the RPC API. You can disable this restriction using the --rpc.allow-unprotected-txs command-line flag.

```bash
## start a full node
geth --config ./config.toml --datadir ./node  --cache 8000 --rpc.allow-unprotected-txs --txlookuplimit 0
```


Start a validator node

```bash
## generate the consensus key and input the password
geth account new --datadir ./node
echo {your-password} > password.txt
geth --config ./config.toml --datadir ./node --syncmode snap -unlock {your-validator-address} --password password.txt  --mine  --allow-insecure-unlock  --cache 8000
```

!!! Note
	Because the default value of `TrieTimeout` in config.toml is large, it means `geth` will not persist state into database until reach this time threshold, if the node has been force shutdown, it will start syncing from last state which may take long time. The recommended setting for valiidators is `TrieTimeout = 100000000000`

5.Monitor node status

you can monitor the log from `/node/bsc.log` by default.

## Node Maintainence

### Peer Discovery
The bootstrap nodes will be enhanced in the short future. So far, a discovery http service will provide some stable public p2p peers for syncing. Please visit https://api.binance.org/v1/discovery/peers to get dynamic peer info. You can append the peer info to the `StaticNodes` in the config.toml to enhance the networking of the full nodes. To avoid crowded networking, the discovery service will change the peer info from time to time, try fetch new ones if the connected peers of full node are too few.

### Binary
All the clients are suggested to upgrade to the latest release. The [latest version](https://github.com/bnb-chain/bsc/releases/latest) is supposed to be more stable and get better performance.

### Storage
According to the test, the performance of a fullnode will degrade when the storage size exceeds 1.5T. We suggest the fullnode always keep light storage by pruning the storage. 

How to prune:

1. Stop the BSC node.
2. Run `nohup geth snapshot prune-state --datadir {the data dir of your bsc node} &`. It will take 3-5 hours to finish.
3. Start the node once it is done.

The maintainers should always have a few backup nodes.

The hardware is also important, **make sure the SSD meets: 2T GB of free disk space, solid-state drive(SSD), gp3, 8k IOPS, 250MB/S throughput, read latency <1ms**.

### Diff Sync
The diffsync protocol rolled out as a stable feature in release v1.1.5. Diff sync improves the syncing speed by 60%～70% approximately according to the test. All full nodes are suggested to enable it by adding `--diffsync` in the starting command.  

### Light Storage
When the node crashes or been force killed, the node will sync from a block that was a few minutes or a few hours ago. This is because the state in memory is not persisted into the database in real time, and the node needs to replay blocks from the last checkpoint once it start. The replaying time dependents on the configuration `TrieTimeout` in the config.toml.  We suggest you raise it if you can tolerate with long replaying time, so the node can keep light storage.

## Upgrade Geth

Please read [this guide](./upgrade-fullnode.md)

