---
title: Run Node - BNB Greenfield Node
order: 4
---

# Run Node

## Minimum System Requirements
The hardware must meet certain requirements to run a Full Node.

* Desktop or laptop hardware running recent versions of Mac OS X, or Linux.
* 1 TB of free disk space, accessible at a minimum read/write speed of 100 MB/s.
* 4 cores of CPU and 12 gigabytes of memory (RAM).
* A broadband Internet connection with upload/download speeds of at least 1 megabyte per second.

## Setting Up a New Node

!!! info
    Please check the [greenfield repo](https://github.com/bnb-chain/greenfield/releases/latest) for information, including the correct version of the binaries to use and details about the config file

1. You need to choose a home folder `$NODE_HOME` (i.e. ~/.gnfd) for Greenfield Chain. You can setup this by:

```
mkdir ~/.gnfd
mkdir ~/.gnfd/config
```
2. Download `app.toml`,  `config.toml` and `genesis.json` from `https://github.com/bnb-chain/greenfield/releases` and copy them into `$NODE_HOME/config`

=== "mainnet"

    ```bash
    wget  $(curl -s https://api.github.com/repos/bnb-chain/greenfield/releases/latest |grep browser_ |grep mainnet_config |cut -d\" -f4)
    unzip mainnet_config.zip
    cp mainnet_config/*  ~/.gnfd/config/
    ```
=== "testnet"

    ```bash
    wget  $(curl -s https://api.github.com/repos/bnb-chain/greenfield/releases/latest |grep browser_ |grep testnet_config |cut -d\" -f4)
    unzip testnet_config.zip
    cp testnet_config/*  ~/.gnfd/config/
    ```


You can edit this moniker later, in the `$NODE_HOME/config/config.toml` file:
```toml
# A custom human readable name for this node
moniker = "<your_custom_moniker>"
```

!!! note
    Monikers can contain only ASCII characters. Using Unicode characters will render your node unreachable.

Now your Full Node has been initialized.

4. Start your Full Node.

```shell
gnfd start
```

!!! note
    Alternatively, if you choose a different $NODE_HOME location and you are not using the suggested default `~/.gnfd`, you may start the full node by using below script, where $NODE_HOME is your selected directory.
    
    Example: If you set `/usr/local/gnfd` as your home directory. Run the Full Node with below command.
    
    ```shell
    gnfd start --home /usr/local/gnfd
    ```

### Additional Configuration
- Seed node: Your Full Node needs to know how to find peers in the blockchain network. You'll need to add healthy seed nodes to $NODE_HOME/config/config.toml. The recommended `config.toml` already contains links to some seed nodes.

- Service Port: RPC service listens on port `26657` and P2P service listens on port `26656` by default.
  Make sure these two ports are open before starting a full node, unless the full node has to listen on other ports.
- Store: All the state and block data will store under `$NODE_HOME/data`, do not delete or edit any of these files.

## Get Extra Information From Your Fullnode

If you have a Full Node running, then you can publish extra messages to local files.

##### Monitor Syncing Process

You can verify if state sync is done by `curl localhost:26657/status` several times and see whether `latest_block_height` is increasing in response.

```
"sync_info": {
  ...
  "latest_block_height": "280072",
  "latest_block_time": "2023-04-07T01:58:13.572249854Z",
  ...
}
```

## Prometheus Metrics

Prometheus is enabled on port `26660` by default, and the endpoint is `/metrics`.

## Tools

* [Explorer](https://greenfieldscan.com/)
