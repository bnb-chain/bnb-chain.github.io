---
title: PropAMMs
description: An introduction to BAP-710 and the Unified PropAMM Relayer on BNB Chain.
---

# PropAMMs

A proprietary automated market maker (PropAMM) is a market-maker-operated pool that uses off-chain quotes to price trades. [BAP-710: Unified PropAMM Relayer](https://github.com/bnb-chain/BEPs/blob/master/BAPs/BAP-710.md) proposes a shared execution layer for PropAMMs on BNB Chain, combining a unified on-chain standard with a builder-neutral Relayer.

## How it works

1. **Makers send quotes** to the Relayer. Quote updates stay off-chain until a taker transaction needs them.
2. **Takers simulate and submit trades** through standard EVM JSON-RPC methods such as `eth_call` and `eth_sendRawTransaction`, using the Relayer endpoint.
3. **The Relayer builds atomic bundles** containing the required quote updates followed by the taker transaction, then sends them to connected builders for inclusion.

This approach reduces the need to publish continuous quote updates on-chain and lets takers access PropAMM liquidity without constructing bundles themselves. Transactions that cannot be bundled are sent to the builders alone and revertible, never to the public transaction pool.

## The on-chain standard

The **PropAMM Oracle** stores maker-published pricing state in a shared registry. The **PropAMM Pool Interface**, `IPropAMM`, exposes `isActive`, `getPairs`, `quote`, and `swap`, giving wallets, aggregators, and solvers a consistent integration surface. Makers retain control over their pricing strategies and pool logic.

## Deployment

The `PropAMM Console` is available at `https://propamm-console.bnbchain.org/`.

The `Relayer` is built on a BNB Chain full node and exposes HTTPS and WebSocket endpoints:

- **HTTPS:** `https://propamm.bnbchain.org`
- **WebSocket:** `wss://propamm.bnbchain.org`

The service is currently deployed only in the Asia Pacific (AP) region. Deployment will expand to Europe (EU) and the United States (US) soon.

## Learn more

- [BAP-710: Unified PropAMM Relayer](https://github.com/bnb-chain/BEPs/blob/master/BAPs/BAP-710.md) — motivation, architecture, and specification.
- [PropAMM Standard](https://github.com/bnb-chain/PropAMMStandard) — reference contracts, onboarding guides, Relayer API documentation, and runnable examples.
