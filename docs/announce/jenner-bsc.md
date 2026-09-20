# Jenner Upgrade of BSC

<div class="doc-announce-info">
    <span class="version-tag">Hardfork</span>
</div>

## Upgrade Timeline
The Jenner upgrade is scheduled at:

- Testnet: Late October 2026 (exact time to be announced)
- Mainnet: Late November 2026 (exact time to be announced)

## Upgrade BSC Node Before Hardfork
The hard fork release for the Jenner upgrade has not been published yet; the release version and the exact fork times are still to be announced. All BSC nodes (both Testnet and Mainnet) **must upgrade to the hard fork release before the hard fork time**. Please follow the release notes for the specific version and timing once available.

There are 4 BEPs in Jenner:

- [BEP-702](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-702.md): Compliant Asset Standard on BNB Smart Chain
- [BEP-703](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-703.md): Payment Lane on BNB Smart Chain
- [BEP-706](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-706.md): Millisecond-Precision Block Timestamp Precompile
- [BEP-714](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-714.md): Reduce Initial Backoff Time to 1 Second

## Key Highlight

- BEP-702 introduces CAS20, a protocol-native fungible token standard for compliant assets (stablecoins and tokenized real-world assets), implemented as stateful precompiled contracts rather than deployed bytecode. Compliance controls — transfer policies backed by shared allow/blocklists, per-feature pause, and role-separated mint, burn and seizure — are built into the protocol.

- BEP-703 reserves a governable fraction (default 5%) of every block's gas as the Payment Lane, dedicated to payment transactions — bare BNB transfers and transactions to governance-listed payment contracts — so that payments remain includable even when the network is congested by general traffic.

- BEP-706 adds a precompile that exposes the block timestamp at millisecond precision to smart contracts, enabling on-chain applications that need sub-second timing on BSC's fast blocks.

- BEP-714 reduces the initial backup-validator waiting time from 2 seconds to 1 second, shortening the outage window when an in-turn validator misses its slot and improving overall network availability.

- BEP-675 Enhancements (no hard fork required): the same release ships several robustness improvements to builder-proposed blocks introduced in Pasteur: revoking a builder upon cross-validator bad block evidence, a gRPC `SendBidBlock` API, rejecting BidBlocks with a zero state root, and persisting BidBlock revocations across restarts, etc.

## Upgrade Notice

New flag introduced in this release (no hard fork required, related to the BEP-675 enhancements):

- `--mev.grpc.disable`: disables the BEP-675 BidBlock gRPC service (`BidBlockService`). The gRPC transport is enabled by default when MEV is on; set this flag to opt out. The service port defaults to `8552` (configurable via `[Miner.Mev] GRPCPort` in config.toml).

No flags or configuration fields are removed in this release. Once the hard fork release is published, a simple binary replacement is sufficient to upgrade; any further notices will be listed in the release notes.
