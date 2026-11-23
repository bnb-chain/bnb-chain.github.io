---
title: General FAQ - New L1
---

# General FAQ

Start here for chain positioning, network status, assets, and basic guarantees. For onboarding and technical implementation, see the [Integration FAQ](./integration.md).

### Is New L1 EVM-compatible?

Yes, at the execution layer. Existing Solidity bytecode uses compatible EVM semantics, but integrations must account for differences in fees, transaction timing, and RPC support. See the [migration checklist](./integration.md#what-differences-should-we-test-when-migrating-contracts-and-tooling).

### How is it different from BNB Smart Chain?

New L1 uses the same Parlia PoSA and BLS fast-finality consensus family, with a faster block interval, decoupled ordering and execution, and features including [native account abstraction](../core-concepts/account-abstraction.md), [transaction pre-confirmation](../core-concepts/tx-preconfirmation.md), [Multi-Lane](../core-concepts/multi-lane.md), and an optional [shielded pool](../core-concepts/privacy.md).

It complements BSC, which remains the broad-base network. There is no general requirement for existing BSC applications to migrate. See [Overview](../overview.md).

### Is New L1 live on mainnet?

Not yet. New L1 currently runs as a multi-validator devnet that is unstable and subject to breaking changes. Public testnet and mainnet have not launched. The partner-facing planning targets dated 2 November 2026 are Q1 2027 for public testnet and H2 2027 for mainnet, subject to testing and release readiness; these are not committed launch dates.

Use [Network Information](../get-started/network-info.md) for current network details and the [Integration FAQ](./integration.md#how-do-we-get-endpoints-chain-details-test-tokens-and-integration-support) for onboarding.

### What asset is used for gas and staking?

BNB is the native asset; there is no separate native economic token. The devnet bridge connects New L1 to BSC Testnet. Use testnet BNB (tBNB) only: the bridge contracts are unaudited and the devnet may be reset. Public testnet and mainnet have not launched. See [Role of BNB](../overview.md#role-of-bnb) and the [Integration FAQ](./integration.md#how-do-i-move-bnb-between-bsc-and-new-l1) for bridge instructions.

### Can users transact without holding BNB?

Native fee sponsorship lets another account pay the network fee. A sponsor may separately offer token repayment where supported, while network gas remains denominated in BNB. This does not make stablecoins a native gas asset. See [Fee Sponsorship](../core-concepts/account-abstraction.md#fee-sponsorship) for supported transactions and conditions.

### Is private order flow the same as private on-chain transactions?

No. Proposed TEE ordering protects transaction information before ordering. The optional shielded pool hides supported on-chain transaction information. Integrating one does not automatically provide the other, and ordinary public contract interactions remain public. Deposits, withdrawals, atomic calls, and direct-submission fees have disclosure limits described in [Privacy](../core-concepts/privacy.md#security-assumptions).

### Can I treat a pre-confirmed transaction as final?

No. A roughly 20 ms pre-confirmation is revocable and does not establish execution success. For irreversible actions, wait for a successful, execution-finalized result; see [integration settlement checks](./integration.md#when-should-an-integration-treat-a-transaction-as-settled).

### Is the shielded pool safe to use with real funds today?

Not yet. The circuits are unaudited, and the deployment uses an imported trusted setup rather than a New L1 ceremony. Do not treat it as safe for real value. See [Privacy](../core-concepts/privacy.md).

## Integration topics

- [Account-abstraction tooling](./integration.md#do-i-need-to-use-erc-4337-tooling-bundlers-paymasters-for-account-abstraction)
- [Why `eth_getProof` is unavailable](./integration.md#why-doesnt-eth_getproof-work)
- [Requesting reserved lane capacity](./integration.md#who-approves-a-lane-and-how-do-we-request-reserved-capacity)
