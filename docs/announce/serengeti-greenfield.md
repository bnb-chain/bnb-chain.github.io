# Sereengeti Upgrade of Greenfield

<div class="doc-announce-info">
    <span class="version-tag">Hardfork</span>
    <span class="announce-date">2024 May 24</span>
</div>


## Upgrade Timeline

- Testnet: May 16th at 07:00 AM UTC Blockheight: 8,285,529

- Mainnet: May 29th at 07:00 AM UTC Blockheight: 7,861,456

## Validators and SPs should complete upgrading to the latest version before hardfork: 

For Validators: greenfield [v1.7.1](https://github.com/bnb-chain/greenfield/releases/tag/v1.7.1?ref=bnbchain.ghost.io) 

For SPs: greenfield-storage-provider [v1.7.1](https://github.com/bnb-chain/greenfield-storage-provider/releases/tag/v1.7.1?ref=bnbchain.ghost.io)

## New features introduced: 

- Add new cross-chain channel `ExecutorChannel` and corresponding cross-app `ExecutorApp` 
- Implement storage fee paymaster 
- New API to query the recommended virtual group family id for creating bucket  


Reference: https://www.bnbchain.org/en/blog/bnb-greenfield-erdos-hardfork