---
sidebar_label: Download Blockchain Snapshot
sidebar_position: 2
hide_table_of_contents: false
---

# Chaindata Snapshot 

For latest chaindata snapshots visit [here](https://github.com/bnb-chain/bsc-snapshots)

### For v1.1.0:

* [Latest Snapshot](https://github.com/bnb-chain/bsc-snapshots)

* [2021-05-15 snapshot](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/geth-20210515.zip?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1623905351&Signature=w1hPMeDxB68aJ2qUM74YbUufCPo%3D) (size 220GB)

checksum: 39e311c37a9844b4dd7fb218553cc99f

* [2021-05-13 snapshot](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/geth-20210513.zip?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1623567762&Signature=1SJt28tOgUCBdOg4Z7BcK0RkjpE%3D)(Size: 203G)

* [2021-05-02 snapshot](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/geth.zip?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1646568179&Signature=DaVl4clXyVS%2F65GEUHTqWOfD2DA%3D) (Size: 175G)

### For v1.0.7:

* [2021-04-15 snapshot](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/chaindata-2021-04-15.zip?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1644459350&Signature=a4vfmga8%2BRwNZl3boisIMEdSWbA%3D) (271 GB, md5sum 3ace16d3e2a52100025da387c73861a3f00de833)

* [2021-04-17  snapshot](https://binance-smart-chain-snapshot.s3.amazonaws.com/snap.tar.gz ) (260 GB, md5sum dd68c7fddaba42997eda013535a572cb)


March snapshot:  [download](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/chaindata_202103.zip?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1641450253&Signature=hOC8I8HSpCOytlYMVQwKRc5oUaI%3D) (146 GB, md5sum 74ada3bcd6a9d0f101501919f6cc8a534e9d796e)

February snapshot: [download](https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/chaindata_202102.zip?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1640142393&Signature=aIiUN%2BJLmFKXkAAc%2BE6xHCW3b14%3D) (87.4 GB, md5sum 6611dedde095ba9b72b50ebf6c35a8d7)


The following commands are step by step instructions for BSC node operators that can be used for two major use-cases:

1. Fixing nodes that are stuck or crashed;
2. Jumpstarting a newly setup validator node; avoid waiting some hours for synchronization

Basically, a compressed version of the last-known "good" chaindata is downloaded. Remove the node's old data and update it with the newly downloaded data. Finally, restart the sync-process from this known-good checkpoint.


Note: Ensure there is enough disk space for both the zip file AND its uncompressed contents. Double the space or more.

Download March Snapshot from CLI using wget

```
wget --no-check-certificate --no-proxy 'https://s3.ap-northeast-1.amazonaws.com/dex-bin.bnbstatic.com/s3-witness-data-download/chaindata_202103.zip?AWSAccessKeyId=AKIAYINE6SBQPUZDDRRO&Expires=1641450253&Signature=hOC8I8HSpCOytlYMVQwKRc5oUaI%3D'
```

> Tip: extract the data in the background

In case you can not wait for the extraction to finish, you can run it in the background

```
# Extract the data
nohup unzip  /NAME_OF_YOUR_HOME/node/geth/ -f chaindata_202102.zip &
# Start your node back
geth --config ./config.toml --datadir ./node --syncmode snap
```
