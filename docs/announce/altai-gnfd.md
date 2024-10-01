# Altai Upgrade of Greenfield

<div class="doc-announce-info">
    <span class="version-tag">Hardfork</span>
</div>


## Upgrade Timeline

- Testnet: Sep 21th 2024 06:00:00 AM UTC Blockheight: 12,513,708

- Mainnet: Sep 23th 2024 06:00:00 AM UTC Blockheight: 11,917,971


For Validators: greenfield [v1.9.1](https://github.com/bnb-chain/greenfield/releases/tag/v1.9.1?ref=bnbchain.ghost.io)

For SP: no action needed.


## Hot Fix Release
Greenfield and the Metamask extension are facing compatibility issues, affecting some functionalities such as bucket creation on Dcellar.
This issue is occurring because the MetaMask Extension recently upgraded its middleware library to the latest version, 
implementing stricter EIP712 signature verification rules.

This release contains the hotfix to resolve this issue, all dapps that using the go-sdk and js-sdk is suggested to upgrade to the 
latest version.

- [Go-SDK v1.7.3](https://github.com/bnb-chain/greenfield-go-sdk/releases/tag/v1.7.3)
- [Js-SDK v2.2.0-alpha](https://github.com/bnb-chain/greenfield-js-sdk/releases/tag/%40bnb-chain%2Fgreenfield-js-sdk%402.2.0-alpha.0)

