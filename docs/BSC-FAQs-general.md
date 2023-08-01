---
sidebar_label: BSC General FAQs
hide_table_of_contents: false
sidebar_position: 2
---

# BNB Smart Chain  FAQs

### Where can I find BNB Smart Chain code? Is there a GitHub repository?

The codebase of BSC is open-sourced here:

* <https://github.com/bnb-chain/bsc>
* <https://github.com/bnb-chain/bsc-relayer>
* <https://github.com/bnb-chain/bsc-relayer-config>
* <https://github.com/bnb-chain/bsc-genesis-contract>
* <https://github.com/bnb-chain/bsc-double-sign-sdk>
* <https://github.com/bnb-chain/oracle-relayer>

### What are BNB Smart Chain's official communication channels?

* Telegram: <http://t.me/bnbchain> or <https://t.me/BNBchaincommunity>
* Discord: <https://discord.com/invite/bnbchain>
* Twitter: <https://twitter.com/bnbchain>
* BNB Chain Forum: <https://forum.bnbchain.org/>


### Wallet support for BNB Smart Chain 

  - [Binance Extension Wallet](wallet/bnb-chain-wallet.md)
  - [MetaMask](wallet/metamask.md)
  - [Math Wallet](wallet/math.md)
  - [Arkane](wallet/arkane.md)
  - [Ledger](wallet/ledger.md)
  - [MEW](wallet/myetherwallet.md)
  - [Trust Wallet](wallet/trustwallet.md)
  - [SafePal](https://blog.safepal.io/pre-announcement-trade-on-dex-with-safepal/)
  - [TokenPocket](https://tokenpocket-gm.medium.com/defi-with-tokenpocket-how-to-use-binance-smart-chain-swap-with-tokenpocket-e76d6cd7986)

### What are the benefits for developers to build on BNB Smart Chain?

* **EVM-compatible:** BNB Smart Chain  supports all the existing Ethereum tooling

* **Fast Finality:** Fast block time

* **Cheaper Cost**

* **Native cross-chain transfer & communication** 

### BNB Smart Chain is EVM-compatible. What does that mean?

EVM means Ethereum Virtual Machine. Any smart contract written to run in EVM can be easily ported to BNB Smart Chain.

### How to query the current system parameters

```
bnbcli  params side-params  --side-chain-id=bsc   --node  http://dataseed4.bnbchain.org:80   --chain-id=Binance-Chain-Tigris --trust-node --output=json
```

* minimum self-delegated amount: **2000BNB**

* minimium delegate amount: **1BNB**

* Unbonding time: 7 days

* offline Unjail fee:  1BNB

* offline jail time: 2 day

* offline slashing amount: 50BNB

* Double-sign slashing amount: 10000BNB

* Cross-chain relay fee: 0.004 BNB

### Which dApps are deployed on BSC?
Refer to [here](https://bnbproject.org/) to learn about the different projects deployed on BSC.

### What to do if I transferred funds to the exchange wallet but the exchange doesn't support the BSC chain?

Please be careful while doing transactions to other exchanges to check if they support or accept deposits through BSC or not. The confirmed transaction on the blockchain cannot be reverted as we also don't have any access to the wallet address.

### What to do in case of a wrong network withdrawal issue?

Please try to use the wallet app which supports both BSC and ETH networks in it. So that you can access any network with the same address and transfer your funds out of the wrong network.

### What to do in case of a Missing memo or wrong memo?
Please try to contact the support of the receiver address to help with the deposit. If it's an exchange wallet address then contact them with the correct memo.

### How to connect Metamask to BNB Smart Chain?
Please refer [here](wallet/metamask.md)

### How can I report a scam/rug pull?

If you meet any potential Scams, Phishing, Rug Pulls, and Hacks, please report through this portal - [Coinholmes](https://forms.coinholmes.com)

Coinholmes.com is supported by the Peckshield team (A professional security company)

### How to apply for Pioneer Burn Refunding?

The [self-service window](https://www.binance.com/en/my/wallet/uncredited_deposit/form?&coin=&network=&amount=&txId=tx) for [BNB Pioneer Burn Program](https://www.binance.com/en/support/announcement/7bcf4da5671d44a0a5118c2277773bb4) is now live. Eligible users who lose tokens as part of mistakes they made while making transactions on BNB Smart Chain can access this page and fill in the application form. We will investigate your case and help retrieve the assets if your case is qualified for the Program. 

