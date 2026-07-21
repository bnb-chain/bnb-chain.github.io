# Pasteur Upgrade of BSC

<div class="doc-announce-info">
    <span class="version-tag">Hardfork</span>
</div>

## Upgrade Timeline
The Pasteur upgrade will happen at:

- Testnet:  2026-07-21 02:30:00 AM UTC
- Mainneg:  2026-08-25 02:30:00 AM UTC

## Upgrade to BSC Node v1.7.7 Before Hardfork
[v1.7.7](https://github.com/bnb-chain/bsc/releases/tag/v1.7.7) is a hard fork release for BSC Mainnet; the HF name is Pasteur. All BSC Mainnet nodes **must upgrade to v1.7.7 before the hard fork time**.

There are 3 BEPs in Pasteur, as listed in [BEP-673: Hardfork Meta-Pasteur](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-673.md):

- [BEP-682](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-682.md): Reject Duplicate Validators in CometBFT Light Block Validation
- [BEP-695](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-695.md): Staking and Governance Security Hardening
- [BEP-675](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-675.md): Builder-Proposed Block with Validator Blind Signing (no hard fork required; the `SendBidBlock` path is enabled after Pasteur activates and is controlled via RPC)

## Key Highlight

- BEP-682 extends the CometBFT light block validation precompile (`0x67`) to reject duplicate validators, closing a gap that could otherwise let a crafted validator set inflate voting power and bypass bridge signing thresholds.

- BEP-695 bundles three staking/governance hardening fixes: it revokes validator-admin authority from rotated (old) consensus keys, propagates slash eviction after a consensus key rotation, and rejects blacklisted voters on signature-based governance votes (`castVoteBySig` / `castVoteWithReasonAndParamsBySig`).

- BEP-675 does not require a hard fork by itself. The validator-side `SendBidBlock` path is only enabled after Pasteur activates, giving builders time to integrate before it is turned on via RPC.

## Upgrade Notice

Before upgrading, review the following deprecated flags and config fields and confirm their removal has no impact on your node:

- `--journalfile`: no longer has any effect, safe to remove
- `--miner.txgaslimit`: per-transaction gas limit is now enforced by EIP-7825; confirm this meets your requirements before removing
- `--enablebal`: no longer has any effect, safe to remove
- `--multidatabase`: removed, single-database mode is now the only option
- `--txpool.overflowpoolslots`: overflow pool is removed
- `--fake-beacon`, `--fake-beacon.addr`, `--fake-beacon.port`: removed
- `[Eth] EnableBAL` in config.toml: **must be removed before upgrading**, otherwise it will cause a startup error
- `[TxPool] OverflowPoolSlots` in config.toml: silently ignored, but recommended to remove

Once confirmed, a simple binary replacement is sufficient to upgrade.
