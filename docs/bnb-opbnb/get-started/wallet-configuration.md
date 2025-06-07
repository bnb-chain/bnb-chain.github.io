---
title: Wallet Configuration - opBNB 
---


# Wallet configuration

You can use any Ethereum or BSC wallet with opBNB. For instance, I will show you how to set up Metamask and Trustwallet for opBNB.

To configure your wallet to work with opBNB, you will need to add both the BNB smart chain(Layer 1) and the opBNB network(Layer 2). Follow these steps:

1. Add the BNB smart chain to your wallet. This is the Layer 1 blockchain that opBNB is built on top of.

   *Testnet*

   - Network Name: BSC Testnet
   - RPC URL: [https://data-seed-prebsc-1-s1.bnbchain.org:8545](https://data-seed-prebsc-1-s3.bnbchain.org:8545/)
   - ChainID: 97
   - Symbol: tBNB
   - Explorer: [https://testnet.bscscan.com/](https://testnet.bscscan.com/)

   *Mainnet*

   - Network Name: BSC Mainnet
   - RPC URL: [https://bsc-dataseed.bnbchain.org](https://bsc-dataseed.bnbchain.org)
   - ChainID: 56
   - Symbol: BNB
   - Explorer: [https://bscscan.com/](https://bscscan.com/)

2. Add the opBNB network to your wallet.

   *Testnet*

   - Network Name: opBNB Testnet
   - RPC URL: [https://opbnb-testnet-rpc.bnbchain.org](https://opbnb-testnet-rpc.bnbchain.org)
   - ChainID: 5611
   - Symbol: tBNB
   - Explorer: [http://testnet.opbnbscan.com/](http://testnet.opbnbscan.com/)

   *Mainnet*

   - Network Name: opBNB Mainnet
   - RPC URL: [https://opbnb-mainnet-rpc.bnbchain.org ](https://opbnb-mainnet-rpc.bnbchain.org)
   - ChainID: 204
   - Symbol: BNB
   - Explorer: [http://opbnbscan.com/](http://opbnbscan.com/)

## References - How to configure Trustwallet or Metamask

[Trustwallet](https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph)

After you install the Trustwallet in your browser, you can go to settings->network.

![img](../img/add-bsc-trustwallet.png)


Select add custom network and enter the network information I mentioned above.

_[Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)_

After you install the metamask in your browser, you can go to settings -> networks -> add network page.

Select add manual network and enter the network information.

![img](../img/add-bsc-metamask.png)


*Depending on your location and preference, you can choose from a variety of RPC endpoints for BSC and opBNB. For more information about the endpoints and their features, please refer to the network information document that we have prepared for you. To ensure the best performance and user experience, you can test the latency of each endpoint before you configure it with your wallet.*
