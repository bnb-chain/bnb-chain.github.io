---
title: Full Node - BSC Develop
---
# 1.Background


# 2.Run BSC Full Node By: Geth

## 2.1.Supported Platforms

We support running a full node on **Mac OS X**, **Linux**, and **Windows**.

## 2.2.Steps to Run a Fullnode

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
    # mainnet
    wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep mainnet |cut -d\" -f4)
    unzip mainnet.zip
    
    # testnet
    wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep testnet |cut -d\" -f4)
    unzip testnet.zip
    ```

3. Download snapshot
    Download latest chaindata snapshot from [here](https://github.com/bnb-chain/bsc-snapshots). Follow the guide to structure your files.

4. Start a full node
    ```
    ./geth --config ./config.toml --datadir <datadir>  --cache 8000
    ```

    !!! tip
        If you want high performance and care little about state consistency, you can run a fast node, which is a full node with the flag `--tries-verify-mode none` set.
        Check [here](fast_node.md) for full details on running a fast node.  
        ```
        ./geth --config ./config.toml --datadir <datadir>  --cache 8000 --tries-verify-mode none
        ```

5. Monitor node status

    You can monitor the log from **./<datadir>/bsc.log** by default. When your node has started syncing, you should be able to see the following output:
    
    ```
    t=2022-09-08T13:00:27+0000 lvl=info msg="Imported new chain segment"             blocks=1    txs=177   mgas=17.317   elapsed=31.131ms    mgasps=556.259  number=21,153,429 hash=0x42e6b54ba7106387f0650defc62c9ace3160b427702dab7bd1c5abb83a32d8db dirty="0.00 B"
    t=2022-09-08T13:00:29+0000 lvl=info msg="Imported new chain segment"             blocks=1    txs=251   mgas=39.638   elapsed=68.827ms    mgasps=575.900  number=21,153,430 hash=0xa3397b273b31b013e43487689782f20c03f47525b4cd4107c1715af45a88796e dirty="0.00 B"
    t=2022-09-08T13:00:33+0000 lvl=info msg="Imported new chain segment"             blocks=1    txs=197   mgas=19.364   elapsed=34.663ms    mgasps=558.632  number=21,153,431 hash=0x0c7872b698f28cb5c36a8a3e1e315b1d31bda6109b15467a9735a12380e2ad14 dirty="0.00 B"
    ```

### Sync From Genesis Block (Not Recommended)

!!! note
    To sync from genesis block, you would need a more powerful hardware. Server should at least have 40k IOPS and be at least an i3/i3en series server.


```bash
## start a full node
./geth --config ./config.toml --datadir <datadir>  --cache 8000
```

## 2.3.Sync Mode

There are two sync modes for running a full node: **snap** and **full** which can be specified by flag **--syncmode**.

The **snap** sync mode is used for initial sync, which will download the latest states rather than execute the blocks from the genesis. When the initial sync is done, it will switch to full sync automatically.

The **full** sync mode can also be used to do initial sync, which will execute all the blocks since genesis. But it is **not recommended**, since the amount of historical data is too large. Instead, you can download a snapshot from the [official repo](https://github.com/bnb-chain/bsc-snapshots) and start full sync from the snapshot.

If the flag **--syncmode** is not provided, the default sync mode will depend on the state of the data folder. It will be **snap** mode if you sync from genesis or **full** mode if you start from a snapshot.

### Full Sync with Greenfield Peer (Optional)

Opting for **full** sync mode means your node will only need block headers and bodies from other network peers. To expedite this process,
consider utilizing the `Greenfield Peer`.

This data seed, offered by Greenfield, allows for a more efficient synchronization.
Configure your BSC node to connect with the Greenfield Light Peer by modifying your configuration file settings.
For comprehensive instructions, see [Light Peer](../../../bnb-greenfield/for-developers/data-archive/light-peer.md).

## 2.4.Local Private Network
Please refer to [BSC-Deploy Tools](https://github.com/bnb-chain/node-deploy) to setup a local private network.

## 2.5.Node Maintenance
Please read [this guide](node_maintenance.md)

## 2.6.Upgrade Geth
Please read [this guide](upgrade_geth.md)

# 3.Run BSC Full Node By: Reth

BSC Reth is a cutting-edge Rust client developed in collaboration with Paradigm, designed to provide seamless support for BNB Smart Chain (BSC). It aims to enhance client diversity on the BNB Chain by offering a secure and efficient execution client.

## Hardware Specifications

To run BSC Reth effectively, ensure your system meets the following hardware requirements:

* CPU with 16+ cores
* 128GB RAM
* High-performance NVMe SSD with at least 4TB of free space for a full node and 8TB for an archive node
* Broadband internet connection with upload/download speeds of 25 MB/s

### Running BSC Reth

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
