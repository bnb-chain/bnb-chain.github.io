# Jenner Upgrade of BSC

<div class="doc-announce-info">
    <span class="version-tag">Hardfork</span>
</div>

## Upgrade Timeline
The Jenner upgrade is scheduled at:

- Testnet: 2026-10-29 02:30:00 AM UTC
- Mainnet: 2026-12-08 02:30:00 AM UTC

## Upgrade BSC Node Before Hardfork
The hard fork release for the Jenner upgrade is [v1.8.2](https://github.com/bnb-chain/bsc/releases/tag/v1.8.2) for BSC Mainnet. All BSC nodes (both Testnet and Mainnet) **must upgrade to the hard fork release before the hard fork time**.

There are 3 BEPs in Jenner:

- [BEP-702](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-702.md): Compliant Asset Standard on BNB Smart Chain
- [BEP-703](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-703.md): Payment Lane on BNB Smart Chain
- [BEP-706](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-706.md): Millisecond-Precision Block Timestamp Precompile

## Key Highlight

- BEP-702 introduces CAS20, a protocol-native fungible token standard for compliant assets (stablecoins and tokenized real-world assets), implemented as stateful precompiled contracts rather than deployed bytecode. Compliance controls — transfer policies backed by shared allow/blocklists, per-feature pause, and role-separated mint, burn and seizure — are built into the protocol.

- BEP-703 reserves a governable fraction (default 5%) of every block's gas as the Payment Lane, dedicated to payment transactions — bare BNB transfers and transactions to governance-listed payment contracts — so that payments remain includable even when the network is congested by general traffic.

- BEP-706 adds a precompile that exposes the block timestamp at millisecond precision to smart contracts, enabling on-chain applications that need sub-second timing on BSC's fast blocks.

- BEP-675 Enhancements (no hard fork required): the same release ships several robustness improvements to builder-proposed blocks introduced in Pasteur: revoking a builder upon cross-validator bad block evidence, a gRPC `SendBidBlock` API, rejecting BidBlocks with a zero state root, and persisting BidBlock revocations across restarts, etc.

## Upgrade Notice

New flag introduced in this release (no hard fork required, related to the BEP-675 enhancements):

- `--mev.grpc.disable`: disables the BEP-675 BidBlock gRPC service (`BidBlockService`). The gRPC transport is enabled by default when MEV is on; set this flag to opt out. The service port defaults to `8552` (configurable via `[Miner.Mev] GRPCPort` in config.toml).

No flags or configuration fields are removed in this release. A simple binary replacement is sufficient to upgrade; any further notices will be listed in the release notes.
