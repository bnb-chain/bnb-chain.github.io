---
title: "Which reth-bsc version should node operators use? - BSC FAQs"
---

### Which reth-bsc version should node operators use?

As of November 13, 2026, the recommended version for BSC mainnet and testnet reth-bsc operators is **v0.1.4-hotfix**. Upgrade as soon as possible and restart the node. This release fixes an upstream issue that could produce an incorrect state root in the legacy calculation path. The fix does not require a database migration or a hardfork.

Check the [latest releases and upgrade instructions](https://github.com/bnb-chain/reth-bsc/releases) for newer versions, and see the [v0.1.4-hotfix release notes](https://github.com/bnb-chain/reth-bsc/releases/tag/v0.1.4-hotfix) for details.

---

Applies to: reth-bsc nodes
