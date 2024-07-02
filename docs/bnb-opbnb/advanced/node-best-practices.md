---
title: Best Practices - opBNB Node Configuration
---

# Best Practices for opBNB Node Configuration
## Selecting the Appropriate Mode and Storage Scheme

opBNB accommodates various node modes: Full, Fast, and Archive.
Two storage schemes are available: HBSS (Hash-Based Scheme Storage) and PBSS (Path-Based Scheme Storage).

The principal distinctions between them lie in their methods of preserving history trie data.

The Merkle Patricia Trie (MPT), an advanced data structure, is adept at storing and retrieving key-value pairs with efficiency. It amalgamates the principles of a Patricia trie and a Merkle tree to forge a secure and immutable representation of data within the Ethereum Virtual Machine (EVM).

The MPT endows the following capabilities:

- Access to historical data: Enables retrieval of an account's balance at a specified block height, simulation of calls, and debugging of traces at particular block heights, among others.
- Verification of Inclusion and Exclusion:
The MPT facilitates proofs of both inclusion and exclusion of key-value pairs, a pivotal feature for transaction verification and blockchain integrity maintenance.

Nevertheless, the preservation of entire history trie data on disk can demand substantial resources and may be superfluous for certain applications. opBNB introduces diverse node modes and storage schemes to accommodate a range of requirements.

The variances between the modes and storage schemes are encapsulated as follows:

- Archive node mode conserves the complete history trie data. Full node mode archives recent trie data (128 blocks), whereas the fast node mode retains only the current state, excluding trie data.
    - Functions such as block, transaction, receipt, and log retrieval are supported across all node modes. Since block data is preserved in the block database, it remains unaffected by the trie data storage scheme.
    - The capability to access historical state data varies by node mode. Archive nodes support comprehensive historical state data retrieval, whereas full and fast nodes facilitate access to recent 128 blocks' state data.
    - Trie data-dependent functions like `eth_getProof`, `eth_getStorageAt`, etc., are fully supported by Archive nodes. Full nodes offer queries for recent 128 blocks, whereas fast nodes lack this support.
    - Specifically, given that the transfer from Layer 2 to Layer 1 necessitates `eth_getProof` data corresponding to the most recent root hash height, we have implemented certain enhancements within the full node configuration to facilitate `eth_getProof` for the latest root hash height, irrespective of it surpassing the 128-block threshold. Should you require the utilization of your personal node for the assembly of withdrawal proof, the full node mode is at your disposal.
- PBSS archives trie nodes on disk utilizing encoded paths and specific key prefixes as keys. This method permits PBSS's Merkle Patricia Trie (MPT) to supersede older data due to the shared key between the account trie and storage trie, enabling **online pruning** and significantly **diminishing data redundancy**.
    - Archive node mode is only compatible with HBSS, whereas Full and Fast node modes support both HBSS and PBSS.
    - For further details, please consult the [PBSS document](./run-with-pebbledb-and-pbss.md).

Comparative Analysis of Node Modes and Storage Schemes:

| **Mode**                       | **Full Node (PBSS)** | **Full Node (HBSS)** | **Fast Node**                                            | **Archive Node** |
|--------------------------------|----------------------|----------------------|----------------------------------------------------------|------------------|
| **Preserve Trie Nodes**        | Latest 128 blocks    | Latest 128 blocks    | None                                                     | All              |
| **Disk Consumption**           | Moderate-Low         | Moderate-High        | Lowest                                                   | Highest          |
|**Auto Prune History Trie Data**| Yes                  | No                   | Not Applicable                                           | Not Applicable   |
| **Performance**                | Moderate-High        | Moderate-Low         | Highest                                                  | Lowest           |
| **Security**                   | High                 | High                 | Lower than others since it doesn't verify the state root | High             |

### Fast Node

For most applications, operating a fast node is advisable. This mode maintains only the current state, sans trie data, making it suitable for tasks such as querying the current state and processing transactions.

To activate the fast node, include `--allow-insecure-no-tries` in the `op-geth` startup command.

```
 ./geth --config ./config.toml --datadir ./node --syncmode full  --allow-insecure-no-tries
```

To prune the MPT state (e.g., when transitioning from a full to a fast node), prune the node as follows:

```
./geth snapshot insecure-prune-all --datadir ./datadir ./genesis.json
```


*Fast Node does not generate Trie Data when syncing.
Once the Fast Node is running, there is no way to switch back to Full Node.
Need to re-download snapshot data to restore it to Full Node.*

For implementation details and further information, refer to [the PR](https://github.com/bnb-chain/op-geth/pull/75).

### Full Node

Operating a full node is recommended if you require:

- Enhanced security and reliability assurances. The full node meticulously executes and locally verifies all blocks.
- The facility to query trie data of the most recent 128 blocks, such as retrieving an account's balance at a specific block height, simulating calls, and debugging traces.

To enable the full node, set the `--syncmode full` flag in the `geth` command.

It is particularly advised to operate a full node with PBSS and pebble to minimize data redundancy and enhance performance.

```
--state.scheme path --db.engine pebble
```

For comprehensive details, consult the [PBSS document](./run-with-pebbledb-and-pbss.md).

### Archive Node(with op-reth)

The Archive node mode archives the entirety of history trie data.
This mode is apt for scenarios necessitating access to the complete history trie data, such as block explorers and analytics.

The current volume of history trie data approximates 3TB (as of the end of April, 2024).
Significant performance issues may arise in the op-geth implementation when managing extensive history trie data.
Therefore, it is recommended to operate the archive node in conjunction with op-reth.

Below is an exemplary command for initiating the archive node with op-reth:

```
export L2_RPC=https://opbnb-mainnet-rpc.bnbchain.org

op-reth node \
    --datadir /server/datadir \
    --chain opbnb-mainnet \
    --rollup.sequencer-http ${L2_RPC} \
    --authrpc.addr "0.0.0.0" \
    --authrpc.port 8551 \
    --authrpc.jwtsecret /server/datadir/jwt.txt \
    --http \
    --http.addr "0.0.0.0" \
    --http.port 8545 \
    --ws \
    --ws.addr "0.0.0.0" \
    --ws.port 8545 \
    --builder.gaslimit 150000000 \
    --nat any
```

For further particulars, visit the [op-reth GitHub repository](https://github.com/bnb-chain/reth).

## Snapshots

The latest snapshot data is accessible via the [opbnb-snapshot](https://github.com/bnb-chain/opbnb-snapshot) repository.

Employing snapshot data can drastically curtail the time required for node synchronization.

## Performance Optimization

In order to enhance the performance of `op-geth`, it is crucial to configure the cache settings appropriately. Allocating approximately one-third of the physical memory to the cache is advisable. For instance, if the system has 64GB of physical memory, the cache setting can be configured as:

```
--cache 20000
```

This allocation ensures that the cache is optimized for efficient use of system resources, ultimately leading to improved performance of `op-geth`.

## Running Server as a Daemon

To ensure continuous operation, it is important to keep `op-node` and `op-geth` running at all times. One of the simplest and recommended solutions is to register them as systemd service. By doing so, they will automatically start upon system reboots and other relevant events, ensuring seamless operation without manual intervention.

## Security

### Securing Your Full Node RPC from Hackers

It is imperative to safeguard your Full Node RPC endpoints from unauthorized access. Exposing RPC endpoints to the public network can pose security risks, making it essential to restrict access and implement appropriate security measures to prevent unauthorized intrusion.

### Software Vulnerabilities

To ensure the security of your node and assets, it is crucial to download software only from official sources. Additionally, it is important to consistently update the software to the latest, most secure version available. By adhering to these practices, you can mitigate the risk of potential vulnerabilities and safeguard your node and assets from security threats.

## FAQ

### Why does my node experience offline status or block height lag after an abrupt termination?

After running a synchronized node for an extended period of time, abruptly terminating the node(op-geth process) can result in a period of offline status upon restart. Specifically, only archived nodes are expected to quickly re-synchronize after such an event.

The reason for this behavior lies in the nature of Geth's functionality. When Geth experiences a crash or is not shut down gracefully, the recent state that was held in memory is lost and must be regenerated. As a result, it can take Geth a considerable amount of time to restore these states.

The root cause of this prolonged restoration process can be attributed to the fact that Geth does flush the state trie periodically. The frequency of this flushing is defined by the trieTimeout parameter in the configuration file (config.toml). This periodic flushing is intended to maintain consistency and integrity within the node's state, but it also contributes to the time required for state regeneration in the event of an abrupt shutdown.
