---
title: Full Node - BSC Develop
---


## 1.About

Full node stores the full world state on disk and is capable of:

* handle new transactions and produce new blocks, can be used as a validator node.
* execute and validate newly received blocks.
* verify the states of every account, as it has the full world state.

Currently, there are 3 different clients to run a BSC full:

* Geth: https://github.com/bnb-chain/bsc
* Erigon: https://github.com/node-real/bsc-erigon

Only Geth will be covered in this page, as Erigon is mainly to support archive mode, pls refer [archive_node.md](./archive_node.md) for its usage.

!!! tip
    If you want high performance and care little about state consistency, you can run a fast node, which is a full node with the flag `--tries-verify-mode none` set.
    Check [here](fast_node.md) for full details on running a fast node.
    ```
    ./geth --config ./config.toml --datadir <datadir>  --cache 10000 --tries-verify-mode none
    ```
## 2.Run BSC Full Node: Geth

### 2.1.Supported Platforms

We support running a full node on **Mac OS X**, **Linux**, and **Windows**.

### 2.2.Steps
There are 2 approaches to setup a BSC full node from scratch:

- By Snapshot(Recommend): download the latest snapshot and sync based on it.

- From Genesis(Not Recommend): sync the whole BSC chain from genesis block.

!!! tip
    As of Nov-2024, the latest block height of BSC mainnet is over 40M, it would need a more powerful hardware and take a great of time to sync from genesis, so it is suggested to setup a BSC full node based the snapshot.

#### a.By Snapshot

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
    ## pls replace <datadir> with your local path to datadir.
    ./geth --config ./config.toml --datadir <datadir> --cache 10000 --rpc.allow-unprotected-txs --history.transactions 0
    ```

5. Monitor node status

    You can monitor the log from **./<datadir\>/bsc.log** by default. When your node has started syncing, you should be able to see the following output:
    
    ```
    t=2022-09-08T13:00:27+0000 lvl=info msg="Imported new chain segment"             blocks=1    txs=177   mgas=17.317   elapsed=31.131ms    mgasps=556.259  number=21,153,429 hash=0x42e6b54ba7106387f0650defc62c9ace3160b427702dab7bd1c5abb83a32d8db dirty="0.00 B"
    t=2022-09-08T13:00:29+0000 lvl=info msg="Imported new chain segment"             blocks=1    txs=251   mgas=39.638   elapsed=68.827ms    mgasps=575.900  number=21,153,430 hash=0xa3397b273b31b013e43487689782f20c03f47525b4cd4107c1715af45a88796e dirty="0.00 B"
    t=2022-09-08T13:00:33+0000 lvl=info msg="Imported new chain segment"             blocks=1    txs=197   mgas=19.364   elapsed=34.663ms    mgasps=558.632  number=21,153,431 hash=0x0c7872b698f28cb5c36a8a3e1e315b1d31bda6109b15467a9735a12380e2ad14 dirty="0.00 B"
    ```

#### b.From Genesis
```bash
## start a full node from genesis with by one command
## pls replace <datadir> with your local path to datadir.
./geth --config ./config.toml --datadir <datadir> --cache 10000 --rpc.allow-unprotected-txs --history.transactions 0
```

### 2.3.Sync Mode

There are two sync modes for running a full node: **snap** and **full** which can be specified by flag **--syncmode**.

The **snap** sync mode is used for initial sync, which will download the latest states rather than execute the blocks from the genesis. When the initial sync is done, it will switch to full sync automatically.

The **full** sync mode can also be used to do initial sync, which will execute all the blocks since genesis. But it is **not recommended**, since the amount of historical data is too large. Instead, you can download a snapshot from the [official repo](https://github.com/bnb-chain/bsc-snapshots) and start full sync from the snapshot.

If the flag **--syncmode** is not provided, the default sync mode will depend on the state of the data folder. It will be **snap** mode if you sync from genesis or **full** mode if you start from a snapshot.

### 2.4.Others
#### a.Greenfield Peers

Opting for **full** sync mode means your node will only need block headers and bodies from other network peers. To expedite this process, consider utilizing the `Greenfield Peer`.

This data seed, offered by Greenfield, allows for a more efficient synchronization.
Configure your BSC node to connect with the Greenfield Light Peer by modifying your configuration file settings.
For comprehensive instructions, see [Light Peer](../../../bnb-greenfield/for-developers/data-archive/light-peer.md).


#### b.Local Private Network
Please refer to [BSC-Deploy Tools](https://github.com/bnb-chain/node-deploy) to setup a local private network.

#### c.Node Maintenance
Please read [this guide](node_maintenance.md)

#### d.Upgrade Geth
Please read [this guide](upgrade_geth.md)
