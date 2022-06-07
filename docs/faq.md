---
sidebar_label: BNB Extension Wallet FAQs
hide_table_of_contents: false
sidebar_position: 2
---

# BNB Extension Wallet FAQs

## How to stay safe

Wallets are a bit of a shift in thinking. Financial freedom and the ability to access and use funds anywhere comes with a bit of responsibility – there’s no customer support in crypto.


## Take responsibility for your own funds

Centralized exchanges will link your wallet to a username and password that you can recover in a traditional way. Just remember you’re trusting that exchange with custody over your funds. If that company is attacked or folds, your funds are at risk.


## Write down your seed phrase

Wallets will often give you a seed phrase that you must write down somewhere safe. This is the only way you’ll be able to recover your wallet.

Here's an example:
```
there aeroplane curve vent formation doge possible product distinct under spirit lamp
```
Don’t store it on a computer. Write it down and keep it safe.


## Do Your Own Research

If you use a web wallet, bookmark the site to protect yourself against phishing scams.

Remember transactions can’t be reversed and wallets can’t be easily recovered so take care.

## Tokens not visible after withdrawing from Binance


Many users who interact with a centralized exchange like Binance eventually want to withdraw to a wallet that they fully control, like MetaMask. So once you've used their withdraw form, what could be scarier than not seeing your tokens?

First, you'll need to use the MetaMask add Custom Network feature to add the Beacon Chain or BNB Smart Chain's RPC URLs endpoints to your MetaMask.

Once you've added the Beacon Chain or the BNB Smart Chain to your MetaMask, you will be able to select different networks to view the assets (you may need to add Custom Tokens too) held by your selected account on that network.


## How Much BNB You Need To Send Tokens

if you try to send tokens without having any BNB in your account you will be told you have insufficient funds. This means you do not have enough BNB in your account to cover the cost of gas. Each transaction (including token and contract transactions) require gas and that gas is paid in BNB. You can think of this like a transaction fee.

You can remedy this by sending 0.001 BNB to that account in order to be able to make the transaction.

A standard Ether transfer TX will be 21000 gas & a gas price of 15 Gwei.
With tokens, the amount of gas is typically  gas, so the total TX fee increases to 0.002 BNB - 0.003 BNB.


## Current Gas Price

```
curl --location --request POST 'https://bsc-dataseed2.binance.org' \
--header 'Content-Type: application/json' \
--data-raw '{"jsonrpc":"2.0", "id":1, "method":"eth_gasPrice", "params": []}'
```

## How to Reveal Your Seed Phrase
When dealing with cryptocurrencies or crypto assets like BNB or BUSD, it is important to always be aware of and have your private keys, seed phrases and passwords backed up in case the unexpected occurs.


## Backing Up When Installing
When you create a new Binance Extension Wallet account, you are given your 12 word seed phrase is the most important bit of information for you to record and keep safe when managing your extension account.

You can write your seed phrase down on a piece of paper, store it on a flash drive or we also make it optional to download a file containing this information.

![img](https://lh3.googleusercontent.com/n2FtIpBGm0rfQC1WHDUbL44LhT6VVizzV4uBhzOkFCblCIXFdOISvy-OzCF5rEeU6q0suuW8Z6noqgYWW5_u8AU7mjat3ayEzU031SLjULoFSh0pdQOO_spRwGfqBEbSl8TIVOfa)


## Backing Up After You Install Binance Extension Wallet
If for some reason you forgot to record your 12 word seed phrase or you lost the original copy, you can reveal your seed phrase so you can back it up again.

**Select Dropdown Menu (on top-right corner) --> Manage Accounts**

![img](https://lh4.googleusercontent.com/ZXAj9X9TFTunfCJfZjHoJQm9eQZxog61rmZ0zWL4AbQlwhQRe0qj74bHvhnarwHobVbRgaBIKyyDPxQZx4acgAeFPaWN6tloNIiIuRMmDUw2mniafpqfc5RS59Nic-_KXVL64sC6)

**click on Download button**

![img](https://lh5.googleusercontent.com/2t3UwpFojwMSh4_stRc9wdaOdbm2UqmtYxVL2SdLVfiCSoqF2gcOhHl3Qys6pZXJFG_7CsK2IkFOEdgpuSTiHR1_OOEi0pF_uy3nvsLhibC0vxQjGXLI0aV5gcdts3pML4xmNc4y)

**Enter your password to reveal your seed words.**

![img](https://lh5.googleusercontent.com/9WatFdbEVc8A92-6g5zfaHQRZgqrce1EPEQMdpWnHYyEwab9iZqcwz02cal5om_97oni1fSdh-dTJHHqsVqD74K3umO2SlGl3F9f9vQDSeUF4r0fnLOQbMiHdNSwhgbN33Nmg_U2)

## How to Reset My Password or Import an Account

When resetting your password for your Binance Extension wallet, you will need your 12 or 24 word seed phrase. If you do not already have your seed phrase saved someplace safe, please make sure to read [How to Reveal Your Seed Phrase](#how-to-reveal-your-seed-phrase).

**Before trying these steps, confirm that you have your seed phrase with you as you will not be able to reset your password otherwise and will risk becoming locked out of your wallet.**

1. If your wallet is currently unlocked, please lock your wallet first.
2. Click Import **Import seed phrase**

![img](https://camo.githubusercontent.com/9fe8761262f1dd77f01a336ae2356e74c15e3552d78be82d761461ade1107f4b/68747470733a2f2f6c68352e676f6f676c6575736572636f6e74656e742e636f6d2f6350443644303336504f69315f794a5f394a4334656d305a6b37476758645a72373236754d706348626d6649476e666179767865465042455932695076733858325a6d5365345f54574f495f3958644e4a786f65496d3641467a6235395643315735344950357945794d4a4e65764d534a62457955377846423149734b51754352443262334f3576)

3. Enter your seed phrase in the "Seed  Phrase" text box
4. Enter your new password
5. Retype your password to confirm it was written correctly
6. Click **Reset** 

![img](https://lh6.googleusercontent.com/ZeM4cYV3rirCo91zw3OVMYRqqpwqIsrWhPnv-t3sL7YhpD0M_DNQ4QQH-Rw8WmapLrX2OzwETLKcEwKA-Rakjuhlnoy7S707Yt8Y0nUC5OKjg04ADgM2bLSb-1f3GZvUxdkj-BuI)
