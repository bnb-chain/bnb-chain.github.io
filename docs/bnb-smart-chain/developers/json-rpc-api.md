---
title: JSON-RPC API - BSC Develop
---

BSC (BNB Smart Chain) is EVM-compatible and strives to be as compatible as possible with the Go-Ethereum API. However, BSC also has unique features, such as faster finality and the storage of blob data on the execution layer, which require their own specialized APIs.

## Geth(Go-Ethereum) API

BSC is nearly fully compatible with the Geth APIs. Any exceptions or incompatibilities are explicitly listed. If you're looking for detailed usage of a specific API, you will most likely find the answer in the following link:

[Geth JSON-RPC API documentation](https://geth.ethereum.org/docs/interacting-with-geth/rpc).

## Finality

Ethereum's PoS consensus protocol, known as "Gasper," is built on LMD-GHOST (a fork choice rule) and Casper FFG (a finality gadget). Similarly, BSC's consensus protocol, called "Parlia," is constructed on top of a difficulty-based fork choice mechanism with FFG, as described in [BEP-126]((https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP126.md)). To further enhance BSC's throughput, validators are allowed to produce multiple consecutive blocks, as explained in [BEP-341](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-341.md). These differences result in BSC having a unique finality process compared to Ethereum. For more details, please refer to the the following doc:

[BSC Finality API](./json_rpc_apis/finality-api.md).