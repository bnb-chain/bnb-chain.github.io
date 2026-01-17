---
title: Hardware Requirements - opBNB Develop
---

# Hardware Requirements

Setting up a node in the BNB Chain ecosystem requires understanding hardware requirements. The Minimum Hardware Requirement ensures efficient management of average transaction volumes, while the Recommended Hardware Requirement caters to high performance, capable of processing up to 100 million gas per second and handling 1k QPS (Query Per Second), ideal for heavy transaction loads or peak efficiency.

## Processor

CPU Type: Intel Xeon Scalable processors (Ice Lake) or newer 

**op-node:**  

- Minimum: 4 cores
- Recommended: 8 cores or more

**op-geth:** 

- Minimum: 12 cores
- Recommended: 16 cores or more

## Memory

**op-node:**  

- Minimum: 4 GB
- Recommended: 16 GB

**op-geth:** 

- Minimum: 10 GB
- Recommended: 32 GB

## Storage

**op-node:**  

- No additional permanent storage required

**op-geth:** 

- Requires 3000 IOPS or above
- 1TB or more for extended transaction history

## Network

- Stable network with 125MB/s or higher bandwidth

# Running Your Own opBNB Node

- Local development node setup: [Running a Local Development Environment](../advanced/local-dev-env.md)
- Mainnet/testnet node setup: [Running a Local Node](../advanced/local-node.md)
- Smart Contract Verification: [opBNBScan Verify with Hardhat & Truffle](../advanced/verify-on-opbnbscan.md)

# Performance Stability Optimization

**L1 RPC Configuration:**

Configure multiple L1 RPC endpoints for op-node setups on L2 solutions like opBNB to ensure synchronization with the L1 chain, security, data integrity, and reduced risk of single point of failure.

For example:
```bash
  export L1_RPC1=https://bsc-dataseed.bnbchain.org
  export L1_RPC2=https://bsc-dataseed2.bnbchain.org
  --l1=rpc1,rpc2…
```
Optimize L1 receipt retrieval performance

- **op-node:** `--l1.rpckind=bsc_fullnode`


**L2 Sync Mode Settings:**

- **op-geth:** `--gcmode=archive`
- **op-node:** `--l2.engine-sync=true`

# Node Health Monitoring

## Import JSON Model

Monitor your node's health by importing the [rpc_nodes.json](./rpc_nodes.json) model.

## Important Metrics

- **chain_head_header:** Indicates the current unsafe block number of the node. A non-increasing number suggests syncing issues; a decreasing number indicates reorgs.
- **rpc_duration_all:** Histogram of RPC server request durations.
- **rpc_requests:** Total requests to the RPC server.
- **p2p_peers:** Number of peers connected to op-geth. Essential for syncing through the engine. If zero, the op-geth cannot sync.
- **op_node_default_peer_count:** Number of peers connected to op-node. Without peers, the op-node cannot sync unsafe blocks, leading to lag behind the sequencer due to reliance on L1 syncing.

---
