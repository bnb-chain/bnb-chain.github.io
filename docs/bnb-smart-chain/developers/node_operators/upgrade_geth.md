---
title: Upgrade Geth - BSC Develop
---

# How to Upgrade Geth

Updating `geth` is as easy as it gets. You just need to download and install the newer version of `geth`, shutdown your node and restart with the new software. Geth will automatically use the data of your old node and sync the latest blocks that were mined since you shut down the old software.

### Step 1: Compile the New Version or download new pre-build binaries from release

```bash
git clone https://github.com/bnb-chain/bsc
# Enter the folder bsc was cloned into
cd bsc
# Compile and install bsc
make geth
```

```bash
# Download pre-build binaries

# Linux
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep geth_linux |cut -d\" -f4)
mv geth_linux geth
chmod -v u+x geth

# MacOS
wget   $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep geth_mac |cut -d\" -f4)
mv geth_mac geth
chmod -v u+x geth
make geth
```


### Step 2: Stop Geth

```

$ pid=`ps -ef | grep geth | grep -v grep | awk '{print $2}'`
$ kill  $pid

```


### Step 3: Restart
!!! note
    Make sure to use the same start-up command you used before the upgrade. So in this case we use the same command as in our [tutorial](full_node.md) 


```bash
./geth --config ./config.toml --datadir ./node --cache 10000 --rpc.allow-unprotected-txs --history.transactions 0
```
