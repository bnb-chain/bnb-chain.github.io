---
title: Paymaster-API - BSC Paymaster
---

# Paymaster API Spec

To facilitate widespread adoption and ensure interoperability across diverse wallet implementations, it is crucial to establish a standardized set of interface specifications for paymasters. This standardization will enable wallet developers to integrate gas sponsorship features efficiently and consistently, regardless of the specific paymaster service they choose to utilize.

## API Spec

Paymaster needs to implement a JSON-RPC API called `pm_isSponsorable`, so that it can return sponsor and policy information to wallets. Paymaster also needs to implement `eth_sendRawTransaction` JSON-RPC API. The detailed API Specs are defined as below:

### pm\_isSponsorable

**Request Parameters**

*   `jsonrpc`: The JSON-RPC protocol version ("2.0").
*   `id`: A unique identifier for the request (1 in this example).
*   `method`: The method name to be invoked ("pm\_isSponsorable").
*   `params`: An array containing a single object with the following fields:
    *   `to`: The recipient address of the transaction.
    *   `from`: The sender address of the transaction.
    *   `value`: The value of the transaction in hexadecimal.
    *   `data`: Additional data for the transaction in hexadecimal.
    *   `gas`: The gas limit of the transaction in hexadecimal.

**Example:**

```plain
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "pm_isSponsorable",
  "params": [
    {
      "to": "0x...", // an address
      "from": "0x...", // an address"value": "0xa1",
      "data": "0x",
      "value": "0x1b4",
      "gas" : "0x101b4"
    }
  ]
}
```

**Response Fields**

*   `jsonrpc`: The JSON-RPC protocol version ("2.0").
*   `id`: The unique identifier for the request (1 in this example).
*   `result`: An object containing the sponsorship policy details:
    *   (Required) `Sponsorable`: A boolean indicating whether the transaction is sponsorable (true or false).
    *   (Required) `SponsorPolicy`:. The name of the sponsor policy.

**Example:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "Sponsorable": true,
    "SponsorPolicy": "a sample policy name"
  }
}
```

###   

### eth\_sendrawtransaction

The `eth_sendrawtransaction` API implemented by the Paymaster should follow this [Ethereum API Spec](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction). The client can create a new message call transaction or a contract creation for signed transactions via `eth_sendrawtransaction` API.

**Request Parameters**

The `params` should contain the signed transaction data.

**Example:**

```plain
{
   "jsonrpc": "2.0",
   "id": 1,
   "method": "eth_sendRawTransaction",
   "params": [
 "0x02f86a6102850df8475800850df84758000a94cd9c02358c223a3e788c0b9d94b98d434c7aa0f18080c080a0bcb0e8ffa344e4b855c6e13ee9e4e5d22cff6ad8bd1145a93b93c5d332100c2ca03765236eba5fbb357e35014fd19ba4b3c6b87f3793bd14dddf7913fc8dcc88bf"
   ]
}
```

**Response Fields**

DATA, 32 Bytes - the transaction hash.

**Example:**

```json
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```