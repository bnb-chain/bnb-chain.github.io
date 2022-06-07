---
sidebar_label: Node Maintenance
hide_table_of_contents: false
sidebar_position: 2
---
# Node Maintainence

### Peer Discovery
The bootstrap nodes will be enhanced in the short future. So far, a discovery http service will provide some stable public p2p peers for syncing. Please visit https://api.binance.org/v1/discovery/peers to get dynamic peer info. You can append the peer info to the `StaticNodes` in the config.toml to enhance the networking of the full nodes. To avoid crowded networking, the discovery service will change the peer info from time to time and try fetch new ones if the connected peers of full node are too few.

### Binary
All the clients are suggested to upgrade to the latest release. The [latest version](https://github.com/bnb-chain/bsc/releases/latest) is supposed to be more stable and get better performance.

### Storage
According to the test, the performance of a fullnode will degrade when the storage size exceeds 1.5T. We suggest the fullnode always keep light storage by pruning the storage. 

How to prune:

1. Stop the BSC node.
2. Run `nohup geth snapshot prune-state --datadir {the data dir of your bsc node} &`. It will take 3-5 hours to finish.
3. Start the node once it is done.

The maintainers should always have a few backup nodes.

The hardware is also important, **make sure the SSD meets: 2T GB of free disk space, solid-state drive(SSD), gp3, 8k IOPS, 250MB/S throughput, read latency <1ms**.

### Diff Sync
The diffsync protocol rolled out as a stable feature in release v1.1.5. Diff sync improves the syncing speed by 60%～70% approximately according to the test. All full nodes are suggested to enable it by adding `--diffsync` in the starting command.  

### Light Storage
When the node crashes or been force killed, the node will sync from a block that was a few minutes or a few hours ago. This is because the state in memory is not persisted into the database in real time, and the node needs to replay blocks from the last checkpoint once it start. The replaying time depends on the configuration `TrieTimeout` in the config.toml.  We suggest you raise it if you can tolerate with long replaying time, so the node can keep light storage.

## Upgrade Geth

Please read [this guide](upgrade-fullnode.md)