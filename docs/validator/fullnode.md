---
sidebar_label: Running Full Node
hide_table_of_contents: false
sidebar_position: 2
---

# Steps to Run a Fullnode

### Sync From Snapshot (Recommended)

1. Download the pre-build binaries from [release page](https://github.com/binance-chain/bsc/releases/latest) or follow the instructions below:

```bash
# Linux
wget  https://github.com/binance-chain/bsc/releases/download/v1.1.5/geth_linux
# MacOS
wget  https://github.com/binance-chain/bsc/releases/download/v1.1.5/geth_mac
```

2. Download the config files

Download `genesis.json` and `config.toml` by:

```bash
wget https://github.com/binance-chain/bsc/releases/download/v1.1.5/mainnet.zip
unzip mainnet.zip
```

3. Download snapshot

Download latest snapshot from [Download site](https://github.com/binance-chain/bsc-snapshots)
Follow the guide to structure the files.

4. Start a full node
```
geth --config ./config.toml --datadir ./node --diffsync --cache 8000 --rpc.allow-unprotected-txs --txlookuplimit 0
```

### Sync From Genesis Block (Not Recommended)

1.Build from source code

Make sure that you have installed [Go 1.13+](https://golang.org/doc/install) and have added `GOPATH` to `PATH` environment variable

```bash
git clone https://github.com/binance-chain/bsc
# Enter the folder bsc was cloned into
cd bsc
# Compile and install bsc
make geth
```

or you can download the pre-build binaries from [release page](https://github.com/binance-chain/bsc/releases/latest) or follow the instructions below:

```bash
# Linux
wget  https://github.com/binance-chain/bsc/releases/download/v1.1.5/geth_linux
# MacOS
wget  https://github.com/binance-chain/bsc/releases/download/v1.1.5/geth_mac
```

2.Download the config files

Download `genesis.json` and `config.toml` by:

```bash
## mainet
wget https://github.com/binance-chain/bsc/releases/download/v1.1.5/mainnet.zip
unzip mainnet.zip

## testnet
wget https://github.com/binance-chain/bsc/releases/download/v1.1.5/testnet.zip
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


