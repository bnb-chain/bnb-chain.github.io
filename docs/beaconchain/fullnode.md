# Run Full Node to Join Beacon Chain 

A `full node` of Beacon Chain  is a `witness`, which observes the consensus messaging, downloads blocks from `data seed nodes` and executes business logic to achieve the consistent state as `validator node` (and other `full node`). Full nodes also help the network by accepting transactions from other nodes and then relaying them to the core Binance network.

## Supported Platforms

We support running a full node on `Mac OS X`, `Windows` and `Linux`.

## Minimum System Requirements

The hardware must meet certain requirements to run a full node.

- Desktop or laptop hardware running recent versions of Mac OS X, Windows, or Linux.
- 500 GB of free disk space, accessible at a minimum read/write speed of 100 MB/s.
- 4 cores of CPU and 8 gigabytes of memory (RAM).
- A broadband Internet connection with upload/download speeds of at least 1 megabyte per second
- Your full node has to run at least 4 hours per 24 hours in order to catch up with Beacon Chain 
More hours will be better, run your node continuously for best results.

## Steps to Run a Full Node

### Option One: Installation Script

We have a community-maintained installer script (`install.sh`) that takes care of chain directory setup. This uses the following defaults:

* Home folder in `~/.bnbchaind`
* Client executables stored in `/usr/local/bin` (i.e. `light` or `bnbchaind`)

```shell
# One-line install
sh <(wget -qO- https://raw.githubusercontent.com/binance-chain/node-binary/master/install.sh)
```

### Option Two: Manual Installation

We currently use this repo to store historical versions of the compiled `node-binaries`.

1. Install Git LFS

Git Large File Storage (LFS) replaces large files such as audio samples, videos, datasets, and graphics with text pointers inside Git, while storing the file contents on a remote server like GitHub.com or GitHub Enterprise.

Please go to <https://git-lfs.github.com/> and install `git lfs`.

2. Download Binary with Git LFS:

```bash
git lfs clone https://github.com/bnb-chain/node-binary.git
```

Please go to [changelog](https://github.com/bnb-chain/node-binary/blob/master/fullnode/Changelog.md) to get the information about the latest release of full node version.

Go to directory according to the network you want to join in.<br/>
Replace the `network` variable with `testnet` or `prod` in the following command:

```bash
cd node-binary/fullnode/{network}/{version}
```

1. Copy the executables (i.e.`bnbchaind` or `bnbcli`) to `/usr/local/bin`

### Initialize Home Folder

First you need to choose a home folder `$BNCHOME` (i.e. ~/.bnbchaind) for Beacon Chain .<br/>
You can setup this by:

```
mkdir ~/.bnbchaind
mkdir ~/.bnbchaind/config
```

### Setup Configuration

Put `app.toml`, `config.toml` and `genesis.json` from `node-binary/fullnode/{network}/{version}/config/` into `$BNCHOME/config`

### Add Seed Nodes

For a full node to function, it must connect to one or more known nodes to join Beacon Chain .<br/>
There are several famous `seed nodes` that offer known node addresses in the network to newly joined full nodes.<br/>
They are already in `node-binary/fullnode/{network}/{version}/config/config.toml` file.

You cat also get seeds info through a simple python script (replace domain name depending on which network you are using):

```python
import requests, json
d = requests.get('https://dex.binance.org/api/v1/peers').text # replace dex.binance.org with testnet-dex.binance.org for testnet
l = json.loads(d)
seeds = ",".join([ (seed["id"]+"@"+seed["original_listen_addr"]) for seed in l if seed["accelerated"] == False])
print (seeds)
```

If you want to add seed nodes, please feel free to edit the field `seeds` of `$BNCHOME/config/config.yaml` with returned seed node info from previous request.

### Config Syncing

Beacon Chain  is making blocks at a very fast pace and its block height is over 60 million. As a result, it will take a long time to **[fast-sync](#fast-sync)** (download all the blocks from genesis block). To decrease the waiting time, an innovative way of syncing a fullnode is introduced and it's called **[state-sync](#state-sync)**. **State Sync** is the default way of syncing in the published config files. If you need to switch to **Fast Sync**, you need to change the `config.toml` accordingly. You can read more in the following sections.

#### Additional Configuration

- Log: The log file is under `home`- the directory specified when starting `bnbchaind`.<br/>
The latest log file is `bnc.log`. The process will create a new log file every one hour.<br/>
To make sure you have sufficient disk space to keep the log files, we strongly recommend you to change the log location by changing `logFileRoot` option in `$BNCHOME/config/app.toml`.<br/>
- Service Port: RPC service listens on port `27147` and P2P service listens on port `27146` by default.<br/>
Make sure these two ports are open before starting a full node, unless the full node has to listen on other ports.
- Store: All the state and block data will store under `$BNCHOME/data`, do not delete or edit any of these files.

### Start your node

Start the full node according to the place of your executables.<br/>

```bash
bnbchaind start --home $BNCHOME&
```

Only after catching up with Beacon Chain , the fullnode can handle requests correctly.

#### Details on Sync Mode

There are three ways for you to get synced with other peers in blockchain network:

* Fast Sync
* State Sync
* Hot Sync

These methods can be used together.

##### Fast Sync
The default way for syncing with other data seed node is fast sync.<br/>
In fast sync, you need to download all the blocks from the genesis block and execute all the transaction in every block until it is synced with its peers.<br/>
The sync speed is about 20 blocks/s, which is slower than state sync.

Configuration is located in `$BNCHOME/config/config.toml`:

* `fast_sync` Must be set to `true`
* `state_sync_reactor` Can be set to `false` or `true`
* `state_sync` Can be set to `false` or `true`
* `state_sync_height` should be less than 0, like `-1`

##### State Sync

As explained in [BEP18](https://github.com/bnb-chain/BEPs/blob/master/BEP18.md), State sync will get the application state of your full node to be up to date without downloading all of the blocks.The sync speed is faster than fast sync.<br/>
Now you do not need to allocate more memories to your full node for this feature to work.

Configuration is located in `$BNCHOME/config/config.toml`:

* `state_sync_reactor` Must be set to `true`
* `recv_rate` Must set to `102428800`
* `ping_interval` Recommendation is set to `10m30s`
* `pong_timeout` Recommendation is set to `450s`
* `state_sync_height` Recommendation is set to `0`, so it allows to state sync from the peers's latest height. Please do not change the height to other number, unless you are doing some debug.

State sync can help fullnode in same status with other peers within short time (according to our test, a one month ~800M DB snapshot in Beacon Chain  testnet can be synced in around 45 minutes) so that you can receive latest blocks/transactions and query latest status of orderbook, account balances etc.. But state sync DOES NOT download historical blocks before state sync height, if you start your node with state sync and it synced at height 10000, then your local database would only have blocks after height 10000.

If full node has already started, suggested way is to delete the (after backup) `$BNCHOME/data` directory and `$BNCHOME/config/priv_validator_key.json` before enabling state sync.

State sync will run only once after you start your full node. Once state sync succeeds, later fullnode restart would not state sync anymore. But if you do want state sync again, you need to delete `$BNCHOME/data/STATESYNC.LOCK`.


If you turn on the `state_sync_reactor`, the snapshots of heights will be saved at `$HOME/data/snapshot/<height>` automatically. To save disk space, you can delete the directory or turn off the  `state_sync_reactor`.

##### Hot Sync

> Please note that this feature is still expreimental and is not recommended.

In Beacon Chain  network, almost every fullnode operator will first enable `state-sync` to get synced with peers. After downloading all the state machine changes, the fullnode will go back to `fast-sync` mode and eventually in `consensus` mode.  In fast-sync mode, the fullnode will have high delay because it needs to be aware of peers’ heights. It downloads all the blocks in parallel and verifying their commits. On the other hand, when a fullnode is under `consensus` state, it will consume a lot of bandwidth and CPU resources because it receives a lot of redundant messages for consensus engine and writes more WAL.
To increase the efficiency for fullnodes, the `hot-sync` protocol is introduced. A fullnode under `hot-sync` protocol will pull the blocks from its peers and it will subscribe these blocks in advance. It will skip the message for prevotes and only subscribe to maj23 precommit and block proposal messages. At the same time, it will put its peers in different buckets and subscribe to peers in active buckets. `Hot-Sync` can help fullnodes gossip blocks in low latency, while cost less network, memory, cpu and disk resources than Tendermint consensus protocol. Even cheap hardware can easily run a fullnode, and a  fullnode can connect with more peers than before by saving network and CPU resources.

The state transition of a hot sync reactor can be of three part:

```
                              Hot --> Consensus
                                 ^    ^
                                 |   /
                                 |  /
                                Mute
```
1. `Mute`: will only answer subscribe requests from others, will not sync from others or from consensus reactor. The Hot Sync reactor stays in `Mute` when it is fast syncing.
2. `Hot`:  handle subscribe requests from other peers as a publisher, also subscribe block messages from other peers as a subscriber. A non-validators will stay in `Hot` when the peer have catch up after fast syncing.
3. `Consensus`: handle subscribes requests from other peers as a publisher, but get block/commit message from consensus reactor. A sentry node should stay in `Consensus`. Or a non-validator should switch from `Hot` to `Consensus` when it become a validator.

Configuration is located in `$BNCHOME/config/config.toml`:

* `hot_sync_reactor` Must be set to `true`
* `hot_sync` Can be set to `false` or `true`
* `hot_sync_timeout` is the max wait time for subscribe a block. It only takes effect when hot_sync is true



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

If state sync did not succeed, please repeat deletion of `$BNCHOME/data` directory and `$BNCHOME/config/priv_validator_key.json` before starting full node next time in case of data inconsistency.

Once state sync succeeded, later full node restart would not state sync anymore (in case the local blocks are not continuous).<br/>
But if you do want state sync again (don't care that there are missing blocks between last stop and latest state sync snapshot) and you want to keep already synced blocks, you can just delete `$BNCHOME/data/STATESYNC.LOCK`.

For example, you start your full node at Jan 1st with state sync at height 10000 and after a while you shut it down at height 22000 on Feb 10th.<br/>
Now its Mar 1st, latest sync-able block height is 50000, you don't care blocks between 22000 and 50000, you can delete `$BNCHOME/data/STATESYNC.LOCK` before start your node.<br/>
Then the full node would continue state sync from height 50000.

Turning off `state_sync_reactor` and `state_sync` can save your memory after you successfully state synced.

## Upgrading Full Node

In most cases, download the new binary and replace it, then restart the full node.<br/>
In special cases, you may have to do extra steps for an incompatible version (hard fork).

## Monitoring

Prometheus is enabled on port `28660` by default, and the endpoint is `/metrics`.

## Get Extra Data From Your Full Node

Full node has the same RPC interface as the one listed here [rpc-api](api-reference/node-rpc.md)

If you want to get extra information about order book, balance changes or block fee changes from blocks, please refer to [getting extra data from fullnode](get-extra-data-from-fullnode.md).

## Common Issues and Solutions

Please refer to this [doc](fullnodeissue.md) to find answers to common issues.

