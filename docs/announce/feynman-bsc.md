# Feynman Upgrade of BSC

<div class="doc-announce-info">
    <span class="version-tag">Hardfork</span>
</div>

## Upgrade Timeline
The Haber upgrade will happen at:

- Testnet:  11th March 2024 at 6:00 UTC
- Mainnet:  18th April 2024 at 05:49 UTC

## Upgrade to BSC Node v1.3.13 Before Hardfork

Feyman upgrade is the most important milestone of [BNB Chain Fusion](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP333.md). 
The BNB Chain Fusion is a strategic shift to migrate the Beacon Chain’s functionalities to BNB Smart Chain (BSC) 
and retire Beacon Chain. This move aims to streamline the network, improve efficiency, reduce security risks, 
and align BNB Chain's architecture with the current technological demands and future growth. [BEP333](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP333.md) propose 
to securely and smoothly transit the BNB Beacon Chain and BNB Smart Chain (BSC) from a dual-chain structure 
into a single chain structure and thus decommission the Beacon Chain.

Due to Feyman's upgrade, it will have a significant impact on the BNB ecosystem. We welcome the community to submit issues on GitHub or Discord. 
Kindly remind that BNB Chain has a [bug bounty program](https://bugbounty.bnbchain.org/user.php/login/index.html) if anyone find any security issues.

## Key Highlight
BEP-294, BEP-297 and BEP-299 will be deployed in the BSC Feynman hard fork.

- BEP-294 will take effect immediately. Validators created on BSC will receive triple voting power when staking an equal amount of BNB. This encourages the transfer of voting power from the Beacon Chain to BSC.

- The BEP-297 governance functionality will not be activated immediately after the hardfork. It will only be automatically enabled once more than 10 million BNB are migrated to BSC.

- The smart contract of BEP-299 is not available as the merkel root in the smart contract is still empty at this time. Only after the Beacon Chain comes to a complete halt, the Token Migration feature will be initiated by setting the Merkle root for balance dump through governance.

- Cross-chain re-delegation, which allows users to un-delegate their stakes from Beacon Chain and then delegate them on BSC in one Beacon Chain transaction, will be enabled after governance opening the related cross-chain channel.




