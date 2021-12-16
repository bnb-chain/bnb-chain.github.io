# Introduction

Currently, users can't perform any actions with Binance Bridge unless their wallets are connected. This widget is meant to be used client-side to improve the flow of connecting wallets.


## Connect

You should see a connection request from Binance Bridge. Click on the Connect button to accept it.

![img](https://lh3.googleusercontent.com/BUHkPydTlqrvXGrcc0uTmf_JItIBC0EKEjpOjZJQjhevnuDDLff-Dv37TTBG-r1vo4Icwth-p3um5FUIkElbuOmDj7hsk7ypEJkn9yx_HBvLMaTjtlN909R_VEjXK74TTMZ7UdtZ)

**Base URL**

<https://www.binance.org/en/bridge?wallet=$wallet_name>

* Supported wallet name in desktop browser: metamask, binanceWallet.

* Supported wallet name in mobile app browser: metamask


Example request

```
https://www.binance.org/en/bridge?wallet=metamask
```

This URL support both MathWallet and MetaMask. Open the link in the wallet browser.

Note: please make sure the wallet is connected to Binance Smart Chain mainnet.


