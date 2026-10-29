---
title: Network Information - New L1
---

# Network Information

| Name | Value |
|---|---|
| Network Name | &lt;TBD&gt; |
| Description | High-performance EVM Layer 1 in the BNB Chain ecosystem. |
| Gateway / RPC Endpoint | [https://newl1-devnet-rpc.bnbchain.org/](https://newl1-devnet-rpc.bnbchain.org/) |
| WebSocket Endpoint | `wss://newl1-devnet-rpc.bnbchain.org/ws` |
| Chain ID | 1105 (devnet) |
| Currency Symbol | BNB |
| Block Explorer | [newL1Trace](https://3c88a668d99f13eb2b89.com/) |
| Bridge | New L1 ↔ BSC bridge in development |

!!! note "Devnet stage"
    These endpoints and newL1Trace connect to the devnet, which is highly unstable and subject to breaking changes. Public testnet and mainnet have not launched, and no faucet is available yet. The values below reflect the current devnet client and may change.

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

Use the gateway / RPC endpoint above for HTTP JSON-RPC requests and the WebSocket endpoint for subscriptions. Use [newL1Trace](https://3c88a668d99f13eb2b89.com/) to inspect devnet blocks and transactions. For transports and the method set a node serves, see the [JSON-RPC Endpoint](../developers/json_rpc/json-rpc-endpoint.md).
