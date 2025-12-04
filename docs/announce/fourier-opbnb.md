# Fourier Upgrade of opBNB

<div class="doc-announce-info">
    <span class="version-tag">Hardfork</span>
</div>


## Upgrade Timeline

The Fourier upgrade will happen at:

- Testnet: Nov-06-2025 03:00:00 AM +UTC
- Mainnet: Jan-07-2026 03:00:00 AM +UTC

## Upgrade opBNB op-node to v0.5.5 and op-geth to v0.5.9 Before Hardfork

Releases:

- [https://github.com/bnb-chain/opbnb/releases/tag/v0.5.4](https://github.com/bnb-chain/opbnb/releases/tag/v0.5.5)
- [https://github.com/bnb-chain/op-geth/releases/tag/v0.5.8](https://github.com/bnb-chain/op-geth/releases/tag/v0.5.9)

Docker Images

- ghcr.io/bnb-chain/op-node:v0.5.5
- ghcr.io/bnb-chain/op-geth:v0.5.9
- ghcr.io/bnb-chain/op-batcher:v0.5.5
- ghcr.io/bnb-chain/op-proposer:v0.5.5

## Key Highlight: Shorten Block Interval

- [PR#305](https://github.com/bnb-chain/opbnb/pull/305): effectively reducing the block time from 500 milliseconds to an impressive 250 milliseconds.
