---
title: Fast Node - BSC Develop
---

# Fast Node on BNB Smart Chain

## Note
**Fast Node does not generate Trie Data when syncing.  
Once the Fast Node is running, there is no way to switch back to Full Node.  
Need to re-download snapshot data to restore it to Full Node.**

## Fast Node Functions

* Stores the full blockchain history on disk and can answer the data request from the network.
* Receives and validates the new blocks and transactions.
* Verifies the states of every account.

## Steps to Run a Fast Node

### Download the pre-build binaries from [release page](https://github.com/bnb-chain/bsc/releases/latest) or follow the instructions below:

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

### Download the config files

Download **genesis.json** and **config.toml** by:

```bash
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep mainnet |cut -d\" -f4)
unzip mainnet.zip
```

### Download snapshot

Download latest chaindata snapshot from [here](https://github.com/bnb-chain/bsc-snapshots). Follow the guide to structure your files.

:::note
Your --datadir flag should point to the extracted chaindata folder path
:::

### Prune all trie data

Fast node does not need trie data anymore, prune the trie data by the following command.
```
./geth snapshot insecure-prune-all --datadir ./node  ./genesis.json
```

### Start Fast Node Without Snapshot Verification

```bash
## start a fast node
./geth --tries-verify-mode none --rpc.allow-unprotected-txs --cache 10000 --history.transactions 360000  --datadir <datadir> --http.corsdomain * --config ./config.toml
```
