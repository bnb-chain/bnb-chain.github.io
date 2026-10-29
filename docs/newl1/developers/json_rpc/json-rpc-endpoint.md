---
title: JSON-RPC Endpoint - New L1
---

# JSON-RPC Endpoint

JSON-RPC endpoints refer to the network location where a program sends its RPC requests to access node data. Once you connect an application to an RPC endpoint, you can read chain state, submit transactions, and subscribe to live events. This section lists the endpoints for connecting to New L1 and explains how its API surface differs from a standard Ethereum client.

## RPC Endpoints for New L1

| Transport | Devnet endpoint |
|---|---|
| HTTP (gateway / RPC) | [https://newl1-devnet-rpc.bnbchain.org/](https://newl1-devnet-rpc.bnbchain.org/) |
| WebSocket | `wss://newl1-devnet-rpc.bnbchain.org/ws` |

!!! note "Devnet stage"
    These endpoints serve the devnet, which is highly unstable and subject to breaking changes. Public testnet and mainnet have not launched. See [Network Information](../../get-started/network-info.md) for network parameters and the newL1Trace explorer.

## Transports

HTTP and WebSocket serve the same method set, with one exception: subscriptions are WebSocket-only. A node operator enables or disables each transport with `--http.addr` / `--ws.addr` (passing `none` disables it).

```bash
# HTTP
RPC=https://newl1-devnet-rpc.bnbchain.org/
curl -X POST "$RPC" -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

## JSON-RPC API List

New L1 is EVM-compatible and strives to be as compatible as possible with the Go-Ethereum API. It also has features of its own (decoupled ordering and execution, transaction pre-confirmation, native account abstraction, Multi-Lane reserved capacity, and a shielded pool) that need their own APIs under a `newl1_*` namespace.

### Geth (Go-Ethereum) API

The standard `eth_*`, `net_*`, and `web3_*` methods behave as in Geth, so existing tooling (ethers.js, viem, web3.py, wallets, explorers) connects without modification. If you're looking for detailed usage of a standard method, you'll most likely find the answer here:

[Geth JSON-RPC API documentation](https://geth.ethereum.org/docs/interacting-with-geth/rpc)

Exceptions and incompatibilities are listed in [Divergences from Geth](newl1-api-list.md#divergences-from-geth). The short version: no `eth_getProof`, no public mempool introspection, no EIP-4844/EIP-7702 transactions, and receipts that report the declared gas limit rather than gas consumed.

### Block Tags

Because ordering and execution are decoupled, the node tracks two heights and `latest` resolves to the executed one. There are no custom tag strings on the wire, but the standard tags do not mean quite what they mean on a synchronous chain, and two extra error codes distinguish "not executed yet" from "no such block". See [Block Tags and the Two Tips](newl1-api-list.md#block-tags-and-the-two-tips).

### Pre-confirmation

A validator-signed, sub-block-level signal that the current block producer has committed to including a transaction, available roughly 20 ms after submission, well before the block itself. It is advisory and revocable; see [Pre-confirmation API](newl1-api-list.md#pre-confirmation-api).

### Account Abstraction

Delegated-key state for the native `0x76` transaction type (session keys, admin keys, passkey signers, spend limits) is readable on chain. See [Account Abstraction API](newl1-api-list.md#account-abstraction-api).

### Multi-Lane

The live, governance-resolved reserved-capacity configuration: [Multi-Lane API](newl1-api-list.md#multi-lane-api).

### Transaction Pool and System Transactions

Pool-plane transaction status, a per-sender debug snapshot, and the receipts for system transactions that never appear in a block's transaction list: [Transaction Pool API](newl1-api-list.md#transaction-pool-api) and [System Transaction API](newl1-api-list.md#system-transaction-api).

### Finality and Other BSC-Compatible APIs

New L1 keeps Parlia's BLS fast finality, and serves the `parlia_*` snapshot methods plus the explicit-finality and batch-receipt methods BSC tooling expects: [Finality API](newl1-api-list.md#finality-api) and [Others](newl1-api-list.md#others).
