# Fjord Upgrade of opBNB

<div class="doc-announce-info">
    <span class="version-tag">Hardfork</span>
</div>


## Upgrade Timeline

The Fjord upgrade will happen at:

- Testnet: Sep-10-2024 06:00 AM +UTC
- Mainnet: Sep-24-2024 06:00 AM +UTC

## Upgrade opBNB op-node and op-geth to v0.5.0 Before Hardfork

Releases:

- https://github.com/bnb-chain/opbnb/releases/tag/v0.5.0
- https://github.com/bnb-chain/op-geth/releases/tag/v0.5.0

Docker Images

- ghcr.io/bnb-chain/op-node:v0.5.0
- ghcr.io/bnb-chain/op-geth:v0.5.0
- ghcr.io/bnb-chain/op-batcher:v0.5.0
- ghcr.io/bnb-chain/op-proposer:v0.5.0

## Key Highlight: L1 fee calculation changed

Fjord updates the L1 cost calculation function to use a FastLZ-based compression estimator. The L1 cost is computed as:

```
l1FeeScaled = l1BaseFeeScalar*l1BaseFee*16 + l1BlobFeeScalar*l1BlobBaseFee
estimatedSizeScaled = max(minTransactionSize * 1e6, intercept + fastlzCoef*fastlzSize)
l1Fee = estimatedSizeScaled * l1FeeScaled / 1e12
```

You can find the detailed explanation in the [spec](https://specs.optimism.io/protocol/fjord/exec-engine.html).

## User Facing Changes

* New flag `--wait-node-sync` added to op-batcher (default false), indicates if during startup, the batcher should wait for a recent batcher tx on L1 to finalize (via more block confirmations). This should help avoid duplicate batcher txs
* New flag `--wait-node-sync` added to op-proposer (default false), indicates if during startup, the proposer should wait for the rollup node to sync to the current L1 tip before proceeding with its driver loop
* New flag `--compression-algo` added to op-batcher (default zlib), user can choose brotli algo after Fjord fork
* New flag `--l1.rpc-max-cache-size` added to op-node (default 1000), so user can config the the maximum cache size of the L1 client

## Pull Requests

* Merge upstream v1.7.7 by @bnoieh in https://github.com/bnb-chain/opbnb/pull/216
* feat(op-node): Keep consistent status when meet an unexpected el sync by @krish-nr in https://github.com/bnb-chain/opbnb/pull/222
* feat(op-node): add l1 cache size config by @welkin22 in https://github.com/bnb-chain/opbnb/pull/225
* feat(op-chain-ops): add Wright fork config into genesis file generation code by @welkin22 in https://github.com/bnb-chain/opbnb/pull/226

