# Join Testnet

!!! Tip
    See the [node-binary repo](https://github.com/bnb-chain/node-binary/blob/master/README.md) for information on the mainnet, including the correct version of the binaries to use and details about the genesis file.

!!! warning
    You need to install [bnbchaind](install.md) before you go further

## Minimum System Requirements
The hardware must meet certain requirements to run a Full Node.

* Desktop or laptop hardware running recent versions of Mac OS X, Windows, or Linux.
* 500 GB of free disk space, accessible at a minimum read/write speed of 100 MB/s.
* 4 cores of CPU and 8 gigabytes of memory (RAM).
* A broadband Internet connection with upload/download speeds of at least 1 megabyte per second
* Your full node has to run at least 4 hours per 24 hours in order to catch up with Beacon Chain  More hours will be better, run your node continuously for best results.

## Setting Up a New Node

> You can skip this part if you have executed the install script.

First you need to choose a home folder `$BNCHOME` (i.e. ~/.bnbchaind) for Beacon Chain .
You can setup this by:

```
mkdir ~/.bnbchaind
mkdir ~/.bnbchaind/config
```
Then, download `app.toml` and `config.toml` from `node-binary/fullnode/{network}/{version}/config/` into `$BNCHOME/config`

You can edit this moniker later, in the ~/.gaiad/config/config.toml file:
```toml
# A custom human readable name for this node
moniker = "<your_custom_moniker>"
```

> Note Monikers can contain only ASCII characters. Using Unicode characters will render your node unreachable. :::


Now your Full Node has been initialized!

## Genesis & Seeds

### Download the Genesis File

Fetch the testnet's genesis.json file into node-binary's config directory.
```
cd -p $HOME/.bnbchaind/config
wget https://raw.githubusercontent.com/bnb-chain/node-binary/master/fullnode/testnet/0.6.3-hotfix/config/genesis.json
```
Note we use the latest directory in the node-binary repo which contains details for the testnet like the latest version and the genesis file.

::: tip If you want to understand genesis file, click [here](../../learn/genesis.md) :::

To verify the correctness of the configuration run:
```shell
bnbchaind start &
```

If you encounter any issue when runing a Full Node, you should read the FAQ provided here.


### Add Seed Nodes
Your Full Node needs to know how to find peers in the blockchain network. You'll need to add healthy seed nodes to $HOME/.bnbchain/config/config.toml. The recommended `config.toml` already contains links to some seed nodes.

If those seeds aren't working, you can find more seeds and persistent peers in the HTTP API endpoints: https://testnet-dex.binance.org/api/v1/peers

#### Additional Configuration
- Sync type: by default, new nodes will sync with `state-sync` mode. To change sync mode, read the instructions [here](synctypes.md)
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
