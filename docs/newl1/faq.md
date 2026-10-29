---
title: FAQ - New L1
---

# FAQ

### Is New L1 EVM-compatible?

Yes, at the execution layer: revm semantics are a hard design invariant, so existing Solidity contracts and standard transaction flows work unmodified. 
The RPC surface above that has a few explicit differences (*no `eth_getProof`, no global mempool, no EIP-4844/EIP-7702 transactions*) that some wallets or infra tooling may need to account for. See [Overview](./overview.md) and [JSON-RPC Endpoint](./developers/json_rpc/json-rpc-endpoint.md).

### How is it different from BNB Smart Chain?

Same Parlia PoSA + BLS fast-finality consensus family, but with a faster block interval, decoupled ordering/execution, and several new protocol features not present on BSC: [native account abstraction](./core-concepts/account-abstraction.md), [transaction pre-confirmation](./core-concepts/tx-preconfirmation.md), [Multi-Lane](./core-concepts/multi-lane.md), and a native [shielded pool](./core-concepts/privacy.md). See [Overview](./overview.md) for the full comparison.

### Is New L1 live on mainnet?

Not yet. It is still under active development and currently runs as a multi-validator devnet. Hosted HTTP and WebSocket endpoints and the newL1Trace explorer are listed on [Network Information](./get-started/network-info.md). The devnet is highly unstable and subject to breaking changes; public testnet and mainnet have not launched.

### Do I need to use ERC-4337 tooling (bundlers, paymasters) for account abstraction?

No. New L1's account abstraction is native, enforced by consensus rather than by a deployed EntryPoint contract, so no bundler or paymaster contract is involved. See [Account Abstraction](./core-concepts/account-abstraction.md).

### Can I treat a pre-confirmed transaction as final?

No. Pre-confirmation is a fast (~20ms), best-effort signal that can still be revoked before the block finalizes. For anything irreversible, wait for `execution-finalized`. See [Transaction Pre-confirmation](./core-concepts/tx-preconfirmation.md).

### Is the shielded pool safe to use with real funds today?

Not yet. The circuits are unaudited, and the deployment runs on an imported trusted setup rather than a New L1 ceremony. Both are open items before mainnet. See the warning in [Privacy](./core-concepts/privacy.md).

### Why doesn't `eth_getProof` work?

New L1 commits state with a cumulative hash accumulator instead of a Merkle-Patricia trie, so there's no trie-based proof to serve. See [State DB](./core-concepts/state-db.md).

### How do I get my contract reserved capacity?

Register your contract's address in the `LaneRegistry` system contract with a basis-point gas reservation, via [governance](./governance/overview.md). See [Multi-Lane](./core-concepts/multi-lane.md).

### What asset is used for gas and staking?

BNB, as native token, bridged in from BNB Smart Chain. It is the same gas asset as BSC and opBNB.
