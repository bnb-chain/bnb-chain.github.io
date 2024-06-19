# Haber Upgrade of opBNB

<div class="doc-announce-info">
    <span class="version-tag">Hardfork</span>
</div>


## Upgrade Timeline
The Haber upgrade will happen at:

- Testnet: May 30, 2024, at 6:00 AM UTC
- Mainnet: June 20th, 2024 08:00:00 AM UTC

## Upgrade to opBNB Node v0.4.2 Before Hardfork

op-node and op-geth need to be upgraded before the hardfork time. 

- https://github.com/bnb-chain/opbnb/releases/tag/v0.4.2

- https://github.com/bnb-chain/op-geth/releases/tag/v0.4.2


## Key Highlight: EIP 7212 - secp256r1 Curve Precompile

One of the significant enhancements in this release is the introduction of a precompile for the secp256r1 curve, as specified in [EIP 7212](https://github.com/ethereum/EIPs/pull/7212). This precompile allows for efficient elliptic curve operations, which is crucial for improving the performance and security of cryptographic applications on the blockchain.

## Key Highlight: [BEP 336](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-336.md) - Switch DA from calldata to blob of BSC
DA data will be submitted to the BSC network in blob format. Regular BSC nodes only retain blob data from the past 18 days. If you are syncing data from the genesis block or are more than 18 days behind the latest block, you will need to ensure that your configured L1 endpoint supports persisting blob data for a longer period of time. We will ensure that the Testnet snapshot provided by this snapshot repository is within the 18-day range, so you can also choose to use the snapshot to avoid relying on older blob data to start your new node.
