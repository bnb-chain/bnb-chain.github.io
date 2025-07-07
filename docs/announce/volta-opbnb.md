# Volta Upgrade of opBNB

<div class="doc-announce-info">
    <span class="version-tag">Hardfork</span>
</div>


## Upgrade Timeline

The Volta upgrade will happen at:

- Testnet: Apr-02-2025 03:00 AM +UTC
- Mainnet: Apr-21-2025 03:00 AM +UTC

## Upgrade opBNB op-node to v0.5.3-hotfix and op-geth to v0.5.7 Before Hardfork

Releases:

- https://github.com/bnb-chain/opbnb/releases/tag/v0.5.3-hotfix
- https://github.com/bnb-chain/op-geth/releases/tag/v0.5.7

Docker Images

- ghcr.io/bnb-chain/op-node:v0.5.3-hotfix
- ghcr.io/bnb-chain/op-geth:v0.5.7
- ghcr.io/bnb-chain/op-batcher:v0.5.3-hotfix
- ghcr.io/bnb-chain/op-proposer:v0.5.3-hotfix

## Key Highlight: Shorten Block Interval

- [BEP-543](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-543.md): effectively reducing the block time from 1 second to an impressive 500 milliseconds. This enhancement significantly improves transaction efficiency and overall network performance, allowing for faster processing and a more seamless experience for users.