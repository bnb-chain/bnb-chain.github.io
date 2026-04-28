# Mendel Upgrade of BSC

<div class="doc-announce-info">
    <span class="version-tag">Hardfork</span>
</div>

## Upgrade Timeline

- **Testnet:** 2026-03-24 02:30:00 AM UTC — enabled
- **Mainnet:** 2026-04-28 02:30:00 AM UTC — enabled

The Mendel upgrade bundles nine BEPs, all listed in the meta-BEP:

- [BEP-658: Hardfork Meta-Osaka/Mendel](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-658.md)

### Notable: BEP-652 — Transaction Gas Limit Cap

[BEP-652](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-652.md) implements [EIP-7825](https://eips.ethereum.org/EIPS/eip-7825), enforcing a mandatory protocol-level cap on individual transaction gas at **16,777,216 gas (2^24)**. Transactions exceeding this limit will be rejected during validation.