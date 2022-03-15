---
sidebar_label: Ledger Hardware Wallet
hide_table_of_contents: false
---

# Ledger Hardware Wallet

BNB and coins on BNB Smart Chain are supported by the Ledger Nano S hardware wallet. The following describes how to use Ledger Nano S to connect to BSC

## Requirements
* A Ledger Nano S hardware wallet with the latest firmware.
* The latest version of Ethereum app installed
* An internet connection and an available USB port. Use an adapter for USB-C ports
* U2F compatible browsers: Google Chrome, Opera, FireFox, Brave

## App Installation Instructions

!!! Tip
		The existing Ethereum App is compatible with BNB Smart Chain

1) Plug in and unlock your Ledger device, open Ledger Live on your computer, then open the "Manager" panel.

![img](https://lh4.googleusercontent.com/3IYxS3SPr--yBE7OSuw-i7BkKNk7WR_3PxOdq2PMx_xZl3prBrslPvFbUTEY9keZ-g1XOV4WTpJ_9wM32mPVQ_gNh8A5lSigGb1qRTgkOz6wlZa9LzTjBl0QMCVv5LIouGcJOwwn)

2) Within the "Manager" pane, type in "Ethereum" in the search field. Locate "Ethereum", then click on "Install". (Note: Do not use the "Binance Chain" App)

![img](https://lh5.googleusercontent.com/q2SEjHGNgiCZMMdvZ3dvH96o67MqPm4Otj70XGnmsmZT3NekLUXo-FlJlnBpuIPiZRnCstEgOYq3Vmip0gMd7tD7gV_J4oECFBKDYmSe1Euph3ST1e5TeRrZyqZWL_AEAiL3aVer)

![img](https://lh5.googleusercontent.com/FYp-dbx_njGFbP3LqSDGYBIqubv5VEU2n-eLJTqxdtRctpWLNnDpZdN48rGNogCQTC5LgwACaA9eP2_FAwzEMWNQxvxct7AHS3lcojJf8qsbvB_rRMaGrb1-YAO0LYgF0A83fjqY)

3) The Ethereum app will now install on your Ledger device.

![img](https://lh5.googleusercontent.com/1lT0rjEpawrZO6TkthQCCCQMs5CHH44iKDhZTJr6_VAOGsftEuJIih6d_-1VWq5DHET9yfn-FgiIA87tZ-zxl4RJPn8kpVWCK7ZHrccJBXeTjlzIfqg5CwGzoESQR3s8yUhVHbmX)

## Enabling contract data for BEP20 

!!! Tip
		 Please ensure your enabled contract data before transfering BEP20 tokens 
If you want to send BEP-20 tokens, you need to activate contract data on your device. Otherwise, invalid status `6a80` is returned.

Steps: 

- Connect and unlock your Ledger device.
- Open the Ethereum application.
- Press the right button to navigate to Settings. Then press both buttons to validate.
- In the Contract data settings, press both buttons to allow contract data in transactions. 
- The device displays Allowed. 

## Connect with MetaMask

BNB Smart Chain is compatible with MetaMask. Users can use MetaMask as a bridge between Ledger Nano S and BNB Smart Chain to make transactions to the BNB Smart Chain testnet.

1) Connect [MetaMask](./metamask.md) to BSC Testnet by following this guide to add a custom network

 * Testnet
    * [RPC URLs](./../rpc.md)
    * ChainID: 0x61 (97 in decimal)
    * Symbol: BNB
    * [Block Explorer](https://testnet.bscscan.com)

 * Mainnet
    * [RPC URLs](./../rpc.md)
    * ChainID: 0x38 (56 in decimal)
    * Symbol: BNB
    * [Block Explorer](https://bscscan.com)

### Unlock your Metamask

<img src="https://lh5.googleusercontent.com/EpbHPRV-ycTSYYNdDi67wqB5GKpiYUj4AOSLr0dTNV3vbTBP377YM75f5iYFeKzHu_6ykJr7UEZ81xds2czCXe4qOtBgekIJGdAwdnh_UGPggujVHxHHrTqHTLgmgLh0HFgiAJgp" alt="img"style={{zoom:"33%"}} />

### Click on “Connect Hardware Wallet”

<img src="https://lh6.googleusercontent.com/1gb3-LE3KVM-rnFBHr3MMrdYrtsknZ3LqRFOanx_LHPyi6wTFpi7qwyIfH0ftwrE8zTN0ossizTk7ddBBGLod-r3JR948XgSFJuIDGzXvMUh-Wp4jLrGdmVGcadhynrv-YFdPuNd" alt="img"style={{zoom:"33%"}} />

### Choose “Ledger”

<img src="https://lh5.googleusercontent.com/TCPL_nMhLOTeS1TGRULD_4mMXVx_EhlVqOopfizYK8TiMVQXd0CxDwuefnuAoq_x2ESislvm3z-XZLStw_GJ4pOS1kxSjUZU4-SbZitGrIrFvVbCoVd1qzanzjRBiCTw-hb00f57" alt="img"style={{zoom:"33%"}} />

### Choose your address

![img](https://lh3.googleusercontent.com/FlMY9pjEboYDskkLYu2tZ3QZL6RAaTD-gOUGrSV5F53uFRqVfzvo7znZL_EqU117enWTFaC_1Zx26b-BEneX9ivxo2_-1xjBSBZ-uHZlp0ySTZJ4Rgd5SLhpRP2WZLv7jDZc9Oek)

You should see a new account

<img src="https://lh5.googleusercontent.com/7Uo7dvi4PVqPiYnVcUEFkVsGNemyIgB0hAq2y244NhM_pNXVwFZi9zU1aYwmqf1koc-bC3BLthA-phkKD8_hr1hd9RkxTCJohbmwTcJiHscPOCzVn5O-Xs6Z2-ci17pVr2Lj1ljr" alt="img"style={{zoom:"33%"}} />

### Please read this [doc](metamask.md) to learn about how to interact with blockchain.

With Ledger, you need to approve your transaction in your device.

### Initiate a transfer transaction, then click on next

<img src="https://lh4.googleusercontent.com/vuylKsIqqTMl1SORH1gd7QbAiL6fywTwIOT40asaYjDnYAArTL7cZZon3ozzSylgqwmySun-pBEq__jVaML-Y_mEu5kaSuoZM5i2d7M9utoCCtUmQogW2vQ4wY7GRjN-ACu4Yqxc" alt="img"style={{zoom:"33%"}} />

### Review the transaction details, then confirm the same info on Ledger device

<img src="https://lh5.googleusercontent.com/hICFx-MRkPsAHGtEuSNh5tGAZheKNrm3YjVmw-QcLVV90910YwxccP9bBpH7_o2VBDcYwZ8skZkgLdG5jATXgUhK035urAnr8aUzSexrdqHfi1CXnk3LjPx8dpcE668qzDoHLQEc" alt="img"style={{zoom:"33%"}} />

### You can view the transaction info and confirm it on Ledger:

<img src="https://lh5.googleusercontent.com/x2hiegyGjwWzUkWJ1NknXw7TiWyhJ1M-FT1-2nzfSxHVcYF48AjE73vcEpiSsKiriZTYtOq_l6_SjrWFuNNzbhRDX6vN5sCfQA9vtGLqtJotmS6j5CTOrPK6YGUw2gmfY8HUo6iK" alt="img"style={{zoom:"33%"}} />

11) Once the transaction is ready to get signed, your Ledger device will display this screen. Click on both buttons for broadcasting this transaction.

<img src="https://lh5.googleusercontent.com/8QvlXBQst1p87Y8Ot1PHHnsxN0DjsdRuJeD03uLR9WPtChcuhVbbZ6xmB_e27LL2F7zIgdcK84mL6qzOJEl-HDpeGIndH91t1Mb9B6_Ix9OqlFdzVbSKiR-Nv1m-Dv4ggtVOY3Tk" alt="img" style={{zoom:"33%"}} />

12) Track the transaction status in “Activity” tab

<img src="https://lh4.googleusercontent.com/ejb2jVBsYnFHctelQtR9gS36Z96td60sQ1yVFYdSbLr_jCTkyv2Im2P1wkHxS3JGAYHRXQTiac3FO9dUH1GX0eKHG1Vwk764tSMERGza_vmQcxxm32S66-kFi18wTifSrF-uD9tL" alt="img"style={{zoom:"33%"}} />


## FAQ

1. Fail to tranfer BEP20 tokens

Error message:

```
 '{"value":{"code":-32603,"message":"Error: TransportStatusError: Ledger device: Invalid data received (0x6a80)"}}'
```
You need to follow the steps mentioned above to enable contract data. 

