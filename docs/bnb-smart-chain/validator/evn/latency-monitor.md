---
title: Network Monitoring - BSC EVN
---

# Network Monitoring

In EVN, special metrics are provided to observe the message delay indicators of the EVN network and help analyze the causes of delay.

## Peer Latency

Peer Latency, it observes the message latency with remote peers, calculated by `RoundTripTime/2`.

```bash
# Grafana query statement
p2p_peers_latency{quantile="$quantile", job=~"$jobs"}
```

Suggesting to monitor message delay under quantile=0.95.

If the latency is too high under quantile=0.95, you need to optimize the network provider or connect to better static nodes to improve it.

### The latency of each peer

You can also query Peer Latency with this command:

```bash
./bsc attach --exec "admin.peers" ./geth.ipc | grep -E "enode|latency"
```

The command will output the transient latency value, you can observe the latency of each node and analyze the slow nodes.

## Core Message Latency

These metrics represent the delay of the consensus core process, suggesting to monitor message delay under quantile=0.95.

```bash
# Grafana query statement
# Delay relative to Header.MilliTimestamp when sending blocks
chain_delay_block_send{quantile="$quantile", job=~"$jobs"}

# Delay relative to Header.MilliTimestamp when starting to import blocks
chain_delay_block_insert{quantile="$quantile", job=~"$jobs"}

# Delay relative to Header.MilliTimestamp when receiving majority votes
chain_delay_vote_majority{quantile="$quantile", job=~"$jobs"}

# Time relative to Header.MilliTimestamp when starting mining
chain_delay_block_mining{quantile="$quantile", job=~"$jobs"}
```

`chain_delay_block_insert` and `chain_delay_vote_majority` can help you troubleshoot the latency of receiving blocks or voting, and optimize in combination with Peer Latency.

`chain_delay_block_send` and `chain_delay_block_mining` are related to validator mining and determine whether blocks are generated normally.

## Recent Blocks

Query the core process timestamp of the recent blocks. These are millisecond timestamps. 

```bash
# Grafana query statement
report_blocks{job=~"$jobs"}
```

This list can be used to troubleshoot problems and conduct detailed analysis of the performance of a certain validator.