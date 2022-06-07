#  Different Sync Types

There are three ways for you to get synced with other peers in blockchain network and these methods can be used together.

- Fast Sync
- State Sync
- Hot Sync

## Fast Sync

In fast sync, you need to download all the blocks from your peers and execute all the transactions in every block. The sync speed is about 20 blocks/sec, which is slower than state sync.

Configuration is located in `$BNCHOME/config/config.toml`:

- `fast_sync` Must be set to `true`
- `state_sync_reactor` Can be set to `false` or `true`
- `state_sync` Can be set to `false` or `true`

## State Sync

The default way to get newly joined Full Node syncing with other Full Node is `state sync`. Once your Full Node is synced to a snapshot, it will switch to `fast-sync` mode to catch up with its peers.

State sync can help fullnode in same status with other peers within short time (according to our test, a one month ~800M DB snapshot in Beacon Chain  testnet can be synced in around 45 minutes). As explained in [BEP18](https://github.com/bnb-chain/BEPs/blob/master/BEP18.md), State sync will get the application state of your full node to be up to date without downloading all of the blocks.The sync speed is faster than fast sync.
Now you do not need to allocate more memories to your full node for this feature to work.

Configuration is located in `$BNCHOME/config/config.toml`:

- `state_sync_reactor` Must be set to `true`
- `recv_rate` Must set to `102428800`
- `ping_interval` Recommendation is set to `10m30s`
- `pong_timeout` Recommendation is set to `450s`
- `state_sync_height` Recommendation is set to `0`, so it allows to state sync from the peers's latest height.

State sync can help you receive latest blocks/transactions and query latest status of orderbook, account balances etc.. But state sync **DOES NOT** download historical blocks before `state sync` height, if you start your node with state sync and it synced at height 10000, then your local database would only have blocks after height 10000.

### Switch From Fast Sync to State Sync

If full node has already started, suggested way is to delete the (after backup) `$BNCHOME/data` directory and `$BNCHOME/config/priv_validator_key.json` before enabling state sync.

If you turn on the `state_sync_reactor`, the snapshots of heights will be saved at `$HOME/data/snapshot/` automatically. To save disk space, you can delete the directory or turn off the `state_sync_reactor`.

### Recover From State Sync Failure

If state sync did not succeed, please repeat deletion of `$BNCHOME/data` directory and `$BNCHOME/config/priv_validator_key.json` before starting full node next time in case of data inconsistency.

### Skip Blocks in State Sync

Once state sync succeeded, later full node restart would not state sync anymore (in case the local blocks are not continuous).
But if you do want state sync again (don't care that there are missing blocks between last stop and latest state sync snapshot) and you want to keep already synced blocks, you can just delete `$BNCHOME/data/STATESYNC.LOCK`.

For example, you start your full node at Jan 1st with state sync at height 10000 and after a while you shut it down at height 22000 on Feb 10th. Now its Mar 1st, latest sync-able block height is 50000, you don't care blocks between 22000 and 50000, you can delete `$BNCHOME/data/STATESYNC.LOCK` before start your node. Then the full node would continue state sync from height 50000.

Turning off `state_sync_reactor` and `state_sync` can save your memory after you successfully state synced.

## Hot Sync

In Beacon Chain  network, almost every fullnode operator will first enable `state-sync` to get synced with peers. After downloading all the state machine changes, the fullnode will go back to `fast-sync` mode and eventually in `consensus` mode. In fast-sync mode, the fullnode will have high delay because it needs to be aware of peers’ heights. It downloads all the blocks in parallel and verifying their commits. On the other hand, when a fullnode is under `consensus` state, it will consume a lot of bandwidth and CPU resources because it receives a lot of redundant messages for consensus engine and writes more WAL. To increase the efficiency for fullnodes, the `hot-sync` protocol is introduced. A fullnode under `hot-sync` protocol will pull the blocks from its peers and it will subscribe these blocks in advance. It will skip the message for prevotes and only subscribe to maj23 precommit and block proposal messages. At the same time, it will put its peers in different buckets and subscribe to peers in active buckets. `Hot-Sync` can help fullnodes gossip blocks in low latency, while cost less network, memory, cpu and disk resources than Tendermint consensus protocol. Even cheap hardware can easily run a fullnode, and a fullnode can connect with more peers than before by saving network and CPU resources.

The state transition of a hot sync reactor can be of three part:

```
                              Hot --> Consensus
                                 ^    ^
                                 |   /
                                 |  /
                                Mute
```

1. `Mute`: will only answer subscribe requests from others, will not sync from others or from consensus reactor. The Hot Sync reactor stays in `Mute` when it is fast syncing.
2. `Hot`: handle subscribe requests from other peers as a publisher, also subscribe block messages from other peers as a subscriber. A non-validators will stay in `Hot` when the peer have catch up after fast syncing.
3. `Consensus`: handle subscribes requests from other peers as a publisher, but get block/commit message from consensus reactor. A sentry node should stay in `Consensus`. Or a non-validator should switch from `Hot` to `Consensus` when it become a validator.

Configuration is located in `$BNCHOME/config/config.toml`:

- `hot_sync_reactor` Must be set to `true`
- `hot_sync` Can be set to `false` or `true`
- `hot_sync_timeout` is the max wait time for subscribe a block. It only takes effect when hot_sync is true

