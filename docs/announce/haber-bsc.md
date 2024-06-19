# Haber Upgrade of BSC

<div class="doc-announce-info">
    <span class="version-tag">Hardfork</span>
</div>

## Upgrade Timeline
The Haber upgrade will happen at:

- Testnet:  2024-05-29 06:07:00 AM UTC
- Mainnet:  2024-06-20 06:05:00 AM UTC

## Upgrade to BSC Node v1.4.8 Before Hardfork
Release [v1.4.8](https://github.com/bnb-chain/bsc/releases/tag/v1.4.8) is a cut-in **hard fork release for BSC Testnet and Mainnet**, the HF name is: [Haber](https://forum.bnbchain.org/t/bnb-chain-roadmap-mainnet/936#h-4haber-wip-25), it only supports one BEP: [BEP-381: Precompile for secp256r1 Curve Support](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-381.md)

## Key Highlight: EIP 7212 - secp256r1 Curve Precompile
BSC would use address 0x100 as secp256r1 pre-compile contract, which is same as other major chains to make it easier for developers.
Developers may refer this code on how to use this pre-compile contract: https://github.com/getclave/clave-contracts/blob/master/contracts/helpers/VerifierCaller.sol
, which is same as other major chains to make it easier for developers.

## Key Highlight: [BEP 336](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-336.md) - Enable Blob Carrying Transaction for BSC
Introduce a new transaction format for “blob-carrying transactions” which contain a large amount of data that cannot be accessed by EVM execution, but whose commitment can be accessed. The format is intended to be fully compatible with the format that will be used in full sharding. 






