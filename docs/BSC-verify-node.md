---
sidebar_label: BNB Smart Chain Verify Node
hide_table_of_contents: false
sidebar_position: 2
---
# Verify Node on BNB Smart Chain

## Verify Node Functions

* Stores the full blockchain history on disk and can answer the data request from the network.
* Receives and validates the new blocks and transactions.
* Verifies the states of every account.
* Verifies the states of a Fast Node.

## Steps to Run a Verify Node

1. Download the pre-build binaries from [release page](https://github.com/bnb-chain/bsc/releases/latest) or follow the instructions below:

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
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep mainnet |cut -d\" -f4)
unzip mainnet.zip
```

3. Download snapshot

Download latest chaindata snapshot from [here](https://github.com/bnb-chain/bsc-snapshots). Follow the guide to structure your files.

:::note
Your --datadir flag should point to the extracted chaindata folder path
:::

4. Start verify node
```
./geth --config ./config.toml --datadir ./node --cache 8000 --rpc.allow-unprotected-txs --txlookuplimit 0 --enabletrustprotocol --disablesnapprotocol --disablediffprotocol
```

:::note
Make sure you use the version of geth you downloaded with wget above, and not your local installation of geth, which might be the wrong version.
:::
