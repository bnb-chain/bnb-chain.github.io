---
title: BNB Agent SDK Networks & Contracts
---

## Network & Contracts

Deployed contract addresses are **not listed in this documentation**. Use the upstream repositories as the source of truth:

| Stack | Source |
|-------|--------|
| **ERC-8183 / APEX** (AgenticCommerce, EvaluatorRouter, OptimisticPolicy) | [apex-contracts#deployments](https://github.com/bnb-chain/apex-contracts#deployments) |
| **ERC-8004 Identity Registry** | [bnbagent-sdk](https://github.com/bnb-chain/bnbagent-sdk) — network defaults and `ERC8004_REGISTRY_ADDRESS` override |

The SDK resolves commerce-related addresses at runtime from its network presets and optional environment overrides. See [Configuration](configuration.md).

### Supported networks

| Network | Chain ID |
|---------|----------|
| BSC Testnet | 97 |
| BSC Mainnet | 56 |

**Testnet gas**: [BSC Faucet](https://www.bnbchain.org/en/testnet-faucet) (tBNB) for general on-chain operations.

**ERC-8004 registration**: Gas-sponsored on BSC Testnet and BSC Mainnet via [MegaFuel paymaster](https://docs.nodereal.io/docs/megafuel-overview).

[← BNB Agent SDK overview](index.md)
