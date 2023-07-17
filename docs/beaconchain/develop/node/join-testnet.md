# Join Testnet

:::tip
See the [node repo](https://github.com/bnb-chain/node) for information on the mainnet, 
including the correct version of the binaries to use and details about the genesis file
:::

:::note
You need to install [bnbchaind](install.md) before you go further
:::

## Minimum System Requirements
The hardware must meet certain requirements to run a Full Node.

* Desktop or laptop hardware running recent versions of Mac OS X, Windows, or Linux.
* 1 TB of free disk space, accessible at a minimum read/write speed of 100 MB/s.
* 4 cores of CPU and 8 gigabytes of memory (RAM).
* A broadband Internet connection with upload/download speeds of at least 1 megabyte per second.

## Setting Up a New Node

1. You need to choose a home folder `$BNCHOME` (i.e. ~/.bnbchaind) for BNB Beacon Chain. You can setup this by:

```
mkdir ~/.bnbchaind
mkdir ~/.bnbchaind/config
```
2. Download `app.toml`,  `config.toml` and `genesis.json` from `https://github.com/bnb-chain/node/releases` and copy them into `$BNCHOME/config`

```
wget   $(curl -s https://api.github.com/repos/bnb-chain/node/releases/latest |grep browser_ |grep testnet_config |cut -d\" -f4)
unzip testnet_config.zip
```


You can edit this moniker later, in the ~/.bnbchaind/config/config.toml file:
```toml
# A custom human readable name for this node
moniker = "<your_custom_moniker>"
```

:::note
Monikers can contain only ASCII characters. Using Unicode characters will render your node unreachable. 
:::

Now your Full Node has been initialized.

3. The `genesis.json` file will be downloaded along with the other config files in step #2.

:::tip 
If you want to understand genesis file, click [here](../../learn/genesis.md)
:::

4. Start your Full Node.

```shell
bnbchaind start &
```

:::note
Alternatively, if you choose a different $BNCHOME location and you are not using the suggested default `~/.bnbchaind`, you may start the full node by using below script, where $BNCHOME is your selected directory. 


Example: If you set `/usr/local/beaconchain-testnet` as your home directory. Run the Full Node with below command.

```shell
bnbchaind start --home /usr/local/beaconchain-testnet &
```
:::

If you encounter any issue when running a Full Node, you should read the FAQ provided here.


### Additional Configuration
- Seed node: Your Full Node needs to know how to find peers in the blockchain network. You'll need to add healthy seed nodes to $BNCHOME/config/config.toml. The recommended `config.toml` already contains links to some seed nodes.
If those seeds aren't working, you can find more seeds and persistent peers in the HTTP API endpoints: https://testnet-dex.bnbchain.org/api/v1/peers
- Sync type: By default, new nodes will sync with `state-sync` mode. To change sync mode, read the instructions [here](synctypes.md)
- Log: The log file is under `home`- the directory specified when starting `bnbchaind`.
  The latest log file is `bnc.log`. The process will create a new log file every one hour.
  To make sure you have sufficient disk space to keep the log files, we strongly recommend you to change the log location by changing `logFileRoot` option in `$BNCHOME/config/app.toml`.
- Service Port: RPC service listens on port `27147` and P2P service listens on port `27146` by default.
  Make sure these two ports are open before starting a full node, unless the full node has to listen on other ports.
- Store: All the state and block data will store under `$BNCHOME/data`, do not delete or edit any of these files.

## Get Extra Information From Your Fullnode

If you have a Full Node running, then you can publish extra messages to local files.

##### Monitor Syncing Process

You can verify if state sync is done by `curl localhost:27147/status` several times and see whether `latest_block_height` is increasing in response.

```
"sync_info": {
  ...
  "latest_block_height": "878092",
  "latest_block_time": "2019-04-15T00:01:22.610803768Z",
  ...
}
```

## Prometheus Metrics

Prometheus is enabled on port `28660` by default, and the endpoint is `/metrics`.

## Testnet Tools

* [Explorer](https://testnet-explorer.bnbchain.org/)