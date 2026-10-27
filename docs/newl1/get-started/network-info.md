---
title: Network Information - New L1
---

# Network Information

| Name | Value |
|---|---|
| Network Name | &lt;TBD&gt; |
| Description | High-performance EVM Layer 1 in the BNB Chain ecosystem. |
| RPC Endpoint | Not available yet |
| Chain ID | Not finalized yet |
| Currency Symbol | BNB |
| Block Explorer | Not available yet |
| Bridge | New L1 ↔ BSC bridge in development |

!!! note "Devnet stage"
    There is no public testnet or mainnet endpoint, faucet, or hosted explorer yet. The values below reflect the current devnet client and may change. Public network details will land on this page once they exist.

## Protocol Parameters

| Parameter | Value |
|---|---|
| Consensus | enhanced Parlia (turn rotation + BLS fast finality) |
| Block interval | 200 ms |
| Turn length (blocks per validator, per rotation) | 16 |
| EVM | Full Prague from genesis, no fork ramp |
| Base fee | Pinned to `0` (BEP-222), so the priority fee is the entire price |
| Fee model | Charged on the declared gas limit, not gas used ([details](./migrate-from-bsc.md#you-pay-for-your-declared-gas-limit)) |
| Per-transaction gas cap | 16,777,216 (BEP-652 / EIP-7825) |
| Block gas limit | 600,000,000 (devnet genesis) |

## Endpoints

Public endpoints, faucet, and explorer will be listed here once a network is deployed. For the method set a node serves, see the [JSON-RPC Endpoint](../developers/json_rpc/json-rpc-endpoint.md).
