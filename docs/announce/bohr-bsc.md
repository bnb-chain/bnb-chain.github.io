# Bohr Upgrade of BSC

<div class="doc-announce-info">
    <span class="version-tag">Hardfork</span>
</div>

## Upgrade Timeline
The Bohr upgrade will happen at:

- Testnet:  2024-08-20 01:23:16 AM UTC
- Mainnet:  It is not determined yet, target Later Sep 2024

## Upgrade BSC Testnet Nodes to v1.4.13 Before Hardfork
Release [v1.4.13](https://github.com/bnb-chain/bsc/releases/tag/v1.4.13) is a hard fork release for BSC Testnet, the HF name is: [Bohr](https://forum.bnbchain.org/t/bnb-chain-roadmap-mainnet/936#p-1418-h-6bohr-wip-27)

There are 4 BEPs in Bohr:

- BEP-341: Validators can produce consecutive blocks
- BEP-402: Complete missing fields in Block Header to generate Signature
- BEP-404: Clear Miner History when Switching Validators Set
- BEP-410: Add Agent for Validators

## Key Highlight: [BEP-341: Validators can produce consecutive blocks](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-341.md)
Among these BEPs, BEP-341 holds the most significance as it proposes a change to the block production protocol. However, BEP-341 will only come into effect after the affirmative outcome of a governance vote.

## Key Highlight: [BEP-402: Complete missing fields in Block Header to generate Signature](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-402.md)
BEP-402 updates the block header signature logic, please pay special attention if your product involves the logic of block header verification.
