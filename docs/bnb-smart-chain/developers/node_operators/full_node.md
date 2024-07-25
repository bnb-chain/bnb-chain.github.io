---
title: Full Node - BSC Develop
---

# How to Run A Fullnode on BNB Smart Chain

## Fullnodes Functions

* Stores the full blockchain history on disk and can answer the data request from the network.
* Receives and validates the new blocks and transactions.
* Verifies the states of every account.

## Supported Platforms

We support running a full node on **Mac OS X**, **Linux**, and **Windows**.

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
    # mainnet
    wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep mainnet |cut -d\" -f4)
    unzip mainnet.zip
    
    # testnet
    wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep testnet |cut -d\" -f4)
    unzip testnet.zip
    ```

3. Download snapshot
    Download latest chaindata snapshot from [here](https://github.com/bnb-chain/bsc-snapshots). Follow the guide to structure your files.

    !!! tip
        Your --datadir flag should point to the folder where the extracted snapshot data is. 
        In our case, we created a new folder named `node`, and we moved the extracted snapshot data to this folder.
        ```
        mv server/data-seed/geth/chaindata node/geth/chaindata
        mv server/data-seed/geth/chaindata node/geth/triecache
        ```

4. Start a full node
    ```
    ./geth --config ./config.toml --datadir ./node  --cache 8000 --rpc.allow-unprotected-txs --history.transactions 0
    ```

    !!! note
        Make sure you use the version of geth you downloaded with wget above, and not your local installation of geth, which might be the wrong version.
        For all geth nodes, DO NOT use `-pipecommit` flag

    !!! tip
        It is recommended to run a fast node, which is a full node with the flag `--tries-verify-mode none` set if you want high performance and care little about state consistency.
        Check [here](fast_node.md) for full details on running a fast node.  
        It will run with Hash-Base Storage Scheme by default
        ```
        ./geth --config ./config.toml --datadir ./node  --cache 8000 --rpc.allow-unprotected-txs --history.transactions 0 --tries-verify-mode none
        ```

        It will run with Path-Base Storage Scheme.  
        It will enable inline state prune, keeping the latest 90000 blocks' history state by default.
        ```
        ./geth --config ./config.toml --datadir ./node  --cache 8000 --rpc.allow-unprotected-txs --history.transactions 0 --tries-verify-mode none --state.scheme path
        ```


5. Monitor node status

    You can monitor the log from **./node/bsc.log** by default. When your node has started syncing, you should be able to see the following output:
    
    ```
    t=2022-09-08T13:00:27+0000 lvl=info msg="Imported new chain segment"             blocks=1    txs=177   mgas=17.317   elapsed=31.131ms    mgasps=556.259  number=21,153,429 hash=0x42e6b54ba7106387f0650defc62c9ace3160b427702dab7bd1c5abb83a32d8db dirty="0.00 B"
    t=2022-09-08T13:00:29+0000 lvl=info msg="Imported new chain segment"             blocks=1    txs=251   mgas=39.638   elapsed=68.827ms    mgasps=575.900  number=21,153,430 hash=0xa3397b273b31b013e43487689782f20c03f47525b4cd4107c1715af45a88796e dirty="0.00 B"
    t=2022-09-08T13:00:33+0000 lvl=info msg="Imported new chain segment"             blocks=1    txs=197   mgas=19.364   elapsed=34.663ms    mgasps=558.632  number=21,153,431 hash=0x0c7872b698f28cb5c36a8a3e1e315b1d31bda6109b15467a9735a12380e2ad14 dirty="0.00 B"
    ```

### Sync From Genesis Block (Not Recommended)

!!! caution
    It is recommended to use HBSS with level DB for archive node, PBSS for archive node is not supported yet.


!!! note
    To sync from genesis block, you would need a more powerful hardware. Server should at least have 40k IOPS and be at least an i3/i3en series server.


```bash
## start a full node
./geth --config ./config.toml --datadir ./node  --cache 8000 --rpc.allow-unprotected-txs --history.transactions 0
```

## Sync Mode

There are two sync modes for running a full node: **snap** and **full** which can be specified by flag **--syncmode**.

The **snap** sync mode is used for initial sync, which will download the latest states rather than execute the blocks from the genesis. When the initial sync is done, it will switch to full sync automatically.

The **full** sync mode can also be used to do initial sync, which will execute all the blocks since genesis. But it is **not recommended**, since the amount of historical data is too large. Instead, you can download a snapshot from the [official repo](https://github.com/bnb-chain/bsc-snapshots) and start full sync from the snapshot.

If the flag **--syncmode** is not provided, the default sync mode will depend on the state of the data folder. It will be **snap** mode if you sync from genesis or **full** mode if you start from a snapshot.

### Full Sync with Greenfield Peer (Optional)

Opting for **full** sync mode means your node will only need block headers and bodies from other network peers. To expedite this process,
consider utilizing the `Greenfield Peer`.

This data seed, offered by Greenfield, allows for a more efficient synchronization.
Configure your BSC node to connect with the Greenfield Peer by modifying your configuration file settings.
For comprehensive instructions, see [Greenfield Peer](../../../bnb-greenfield/for-developers/data-archive/greenfield-peer.md).

## Local Private Network
Please refer to [BSC-Deploy Tools](https://github.com/bnb-chain/node-deploy) to setup a local private network.

## Node Maintenance
Please read [this guide](node_maintenance.md)

## Upgrade Geth
Please read [this guide](upgrade_geth.md)

