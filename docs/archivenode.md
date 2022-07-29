---
sidebar_label: BNB Smart Chain Archive Node
hide_table_of_contents: false
sidebar_position: 2
---
# How to Run a Archive Node on BNB Smart Chain

## What is archive node?

Simply speaking, an archive node is a full node running with an additional special option, "--gcmode archive". It stores all the historical data of the blockchain starting from the genesis block. As compared to a typical full node that just holds all the state change data for some latest blocks, an archive node always stores them for each block.

## Why is an archive node important?

Developers are limited to querying the limited recent blocks to check the balance of an address and the state of a smart contract with a full node. It is hard to get all what they want as the blockchain is moving forward at the same time, while they can query any block at a specific point in time with an archive node.
Archive nodes are used by various applications on the blockchain for challenging use cases, including but not limited to the followings:
* Automatic trading system needs historical data to optimize trading model
* Verification modules need state data to verify transactions in time
* Analytical tools need full historical data to do data analysis
* Exchange in some wallets depends on archive node for fast and efficient transfers

## Suggested Requirements

Running an archive node will take a high cost as it includes all the block and state change data. First of all it needs the disk with sufficient capacity; besides this, the CPU and disk performance should be good enough to catch up with the latest block height.

## How to run an archive node for BSC mainnet?

### 1. Run with a Geth client

#### 1.1 Run one segment archive node with a snapshot
A segment archive node is a node which has all the data from one starting block height to one ending block height, such as [19000000, latest]. To create such one archive node, you need a snapshot with starting block number, less than 19000000.

You can get snapshot from BNB Chain official documentation:
- [BNB Chain Chaindata Snapshot](https://docs.bnbchain.org/docs/validator/snapshot)
- [BNB Chain Snapshot Repo](https://github.com/binance-chain/bsc-snapshots).

* Command to run:

```
./geth --config local_config_dir/config.toml --datadir local_data_dir --pprof.addr 0.0.0.0 --rpc.allow-unprotected-txs --rpccorsdomain * --light.serve 50 --cache 5000 --metrics --snapshot=true --rangelimit --gcmode archive --txlookuplimit 0 --syncmode full --pprof
```

#### 1.2 Build one full archive node with segmented archive nodes

Instead of putting all archive data on a single Geth instance, it is suggested to create multiple segment instances, each of them only serving part of the chain. To get better performance, it is suggested that each segment's size is better to control under 4TB. There will be about 35TB data in all(up to June, 2022). For all BSC snapshots you can refer to [Free public Binance Smart Chain Archive Snapshot](https://github.com/allada/bsc-archive-snapshot). The owner has put all BSC archive snapshots on S3. As described this path is public but is configured as requester-pays. This means you'll need an AWS account in order to download them. After having all the segments, you need one proxy to dispatch the requests to the right segment. And thanks the owner, one proxy was also implemented. Please follow the owner's guide to build.

### 2. Run with an Erigon client

[Erigon](https://github.com/ledgerwatch/erigon) has supported BSC mainnet. You can also refer to [Free public Binance Smart Chain Archive Snapshot](https://github.com/allada/bsc-archive-snapshot) for the guide to run a BSC archive node with an Erigon client. The owner has switched to using an Erigon client for a BSC archive node recently. You can dowload the archive snapshot which is a tarball from aws s3. The s3 path is "s3://public-blockchain-snapshots/bsc/erigon-latest.tar.zstd". This path is public, but is configured as requester-pays. Also this means you'll need an AWS account in order to download it.

* Command to download to local dir:

```
aws s3 cp --request-payer=requester  "s3://public-blockchain-snapshots/bsc/erigon-latest.tar.zstd"   local_data_dir

tar --use-compress-program=unzstd -xvf erigon-latest.tar.zstd
```

* Command to run:

```
./erigon --chain=bsc --datadir  local_data_dir
```

The known Issue with an Erigon client is that it does not really keep up with the latest blocks as mentioned in the Github. If you want to keep up with the latest blocks it is suggested to run a BSC archive node with high performance disk such as NVME, or run a BSC full node with a Geth client at the same time which  means you need one proxy that will ask Erigon if it has the block height and if not forward it to the Geth client.

## Comparison between Geth and Erigon

* **Data size**

  Up to now(June, 2022), the whole data size is about 35TB with Geth client while it is about 6TB with Erigon client, much smaller.

* **Maturity**

  Erigon is new and not yet battle tested while Geth has been running a long  time, more stable. Archive nodes with Geth client can support all RPC APIs while some of them are not supported well by Erigon client such as eth_getProof.

* **Complexity**

  It is easier to run one BSC archive node with an Erigon client than that with a Geth client. And it is nearly the same complexity if you want to keep up the latest blocks with a Erigon archive node & a Geth full node at the same time.

All in all, people can choose one of the methods above to run a BSC archive node based on their own requirements.
