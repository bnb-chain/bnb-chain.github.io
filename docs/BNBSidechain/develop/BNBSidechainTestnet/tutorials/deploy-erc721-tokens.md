---
sidebar_label: Deploy NFT
---

# Deploy ERC-721 token

Deployment of ERC-20 token can be done through Remix IDE locally using truffle. As BNB Sidechain supports both EVM & Web3JS, it is compatible with Ethereum development toolsets. The Remix IDE is the easiest way to deploy the ERC-20 smart contract into a BNB Sidechain network.

To deploy an ERC-721 token using Remix IDE go to the [remix page](https://remix.ethereum.org/). 
In the deploy section, choose `Injected Web3` and make sure your MetaMask is connected to one of the BNB Sidechain networks. 
To get connected to the BNB Sidechain network, go to one of the BNB Sidechain devnet's staking pages, for example, https://staking.dev-01.bas.ankr.com/, and it will create a new MetaMask network automatically for you. 
You can also configure your MetaMask manually.

Use this snippet from the ERC-721 smart contract:

```
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyERC20Token is ERC20 {

    constructor() ERC20("My Test Token", "MTT") {
        _mint(msg.sender, 1000 ether);
    }
}
```

MetaData URI is a link (usually on ipfs) that returns a JSON object with information about your NFT token.

:::info
For more information on NFT (EIP-721) metadata, visit the [official EIP page](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md).
:::