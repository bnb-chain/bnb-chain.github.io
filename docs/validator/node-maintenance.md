---
sidebar_label: Node Maintenance
hide_table_of_contents: false
sidebar_position: 2
---
# Node Maintainence

### Peer Discovery
The bootstrap nodes will be enhanced in the short future. In the meantime, a discovery http service will provide some stable public p2p peers for syncing. Please visit https://api.binance.org/v1/discovery/peers to get a list of dynamic peers. You can append this peer list to the `StaticNodes` in the config.toml to enhance the networking of your full node. To avoid crowding the network, the discovery service will change the peer list from time to time. You should to try fetch new peers if the connected peers of your full node are too few and update your config.toml again. 

### Binary
All the clients are suggested to upgrade to the latest release. The [latest version](https://github.com/bnb-chain/bsc/releases/latest) is supposed to be more stable and has better performance.

### Storage

#### prune-state

According to the test, the performance of a full node will degrade when the storage size exceeds 1.5 TB. We suggest that the fullnode always keep light storage by pruning the storage. 

How to prune:

1. Stop the BSC node.
2. Run `nohup geth snapshot prune-state --datadir {the data dir of your bsc node} &`. It will take 3-5 hours to finish.
3. Start the node once it is done.

The maintainers should always have a few backup nodes in case one of the nodes is getting pruned.
The hardware is also important, **make sure the SSD meets: 2 TB of free disk space, solid-state drive(SSD), gp3, 8k IOPS, 250MB/S throughput, read latency <1ms**.


#### prunceancient

Ancient data is block data that is already considered immutable. This is determined by a threshold which is currently set at 90000. This means that blocks older than 90000 are considered ancient data. We recommend the `--prunceancient` flag to users who don't care about the ancient data. This is also advised for users who want to save disk space since this will only keep data for the latest 90000 blocks.  Note that once this flag is turned on, the ancient data will not be recovered again and you cannot go back running your node without this flag in the start-up command. 

How to use the flag:

`./geth --tries-verify-mode none --config /server/config.toml --datadir /server/node --cache 8000 --rpc.allow-unprotected-txs --txlookuplimit 0 --pruneancient=true --syncmode=full`


#### prune-block

A new offline feature introduced in [v1.1.8](https://github.com/bnb-chain/bsc/releases/tag/v1.1.8) to prune undesired ancient block data. It will discard block, receipt, and header in the ancient database to save space.

How to prune:

1. Stop the BSC Node.
2. Run `./geth snapshot prune-block --datadir /server/node --datadir.ancient ./chaindata/ancient --block-amount-reserved 1024`

`block-amount-reserved` is the number of ancient data blocks that you want to keep after pruning. 

### Light Storage
When the node crashes or been force killed, the node will sync from a block that was a few minutes or a few hours ago. This is because the state in memory is not persisted into the database in real time, and the node needs to replay blocks from the last checkpoint once it start. The replaying time depends on the configuration `TrieTimeout` in the config.toml.  We suggest you raise it if you can tolerate with long replaying time, so the node can keep light storage.

## Upgrade Geth

Please read [this guide](upgrade-fullnode.md)