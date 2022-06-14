---
sidebar_label: Upgrading Geth
hide_table_of_contents: false
sidebar_position: 2
---

# How to Upgrade Geth

Updating `geth` is as easy as it gets. You just need to download and install the newer version of `geth`, shutdown your node and restart with the new software. Geth will automatically use the data of your old node and sync the latest blocks that were mined since you shut down the old software.

## Step 1: Compile the New Version

```bash
git clone https://github.com/bnb-chain/bsc
# Enter the folder bsc was cloned into
cd bsc
# Comile and install bsc
make geth
```


## Step 2: Stop Geth

```

$ pid=`ps -ef | grep geth | grep -v grep | awk '{print $2}'`

$ kill  $pid

```


## Step 3: Restart



```bash
## start a full node
geth --config ./config.toml --datadir ./node --syncmode snap
```
