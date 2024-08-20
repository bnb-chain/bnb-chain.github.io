# Wright Upgrade of opBNB

<div class="doc-announce-info">
    <span class="version-tag">Hardfork</span>
</div>


## Upgrade Timeline
The Wright upgrade will happen at:

- Testnet: August 15 2024, 06:00:00 AM UTC
- Mainnet: August 27 2024 06:00:00 AM UTC

## Upgrade opBNB op-geth to v0.4.5 Before Hardfork

op-geth need to be upgraded before the hardfork time. 

- https://github.com/bnb-chain/op-geth/releases/tag/v0.4.5

op-node upgrade is optional but recommended.

- https://github.com/bnb-chain/opbnb/releases/tag/v0.4.4

## Key Highlight: [gasless feature support](https://github.com/bnb-chain/op-geth/pull/130)

To support gasless transactions on opBNB, the following features have been introduced:

- The base fee is set to 0.
- The bundle feature is supported.
- When the gas price is set to 0, the L1 fee will also be set to 0.

Combined with these features and a sponsor (paymaster), users can send transactions without holding BNB to pay gas fees.
