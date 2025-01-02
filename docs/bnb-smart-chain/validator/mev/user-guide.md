---
title: User Guide - BSC MEV
---


# User Guide

PBS(Proposer-Builder Separation) framework offers several advantages for BNB Chain users:

- Users are less likely to have their transactions front-run or sandwiched. 
- Increased competition among block builders can lead to more efficient markets and potentially lower gas prices. 
- Enhanced transaction privacy: Users' transactions are exposed to fewer parties before being included in a block. 
- Faster transaction processing: More efficient block construction can lead to quicker transaction confirmations.

## For Retail Traders 

When you trade on a decentralized exchange (DEX), you risk being targeted by bots that can front-run your trades, meaning they see your transaction in the public mempool and execute a similar trade first, profiting from the price change you were going to cause. This can result in you getting a worse price or even losing money. Private RPCs offer a solution to this problem. They route your transactions through a private mempool(Provided by builders), hiding them from bots. This means your trades are less likely to be front-run, and you're more likely to get the price you expect.

Some DEX protocols or builder providers are keen to provide free protection features. 

| Role                         | Status and Comments                                          |
| ---------------------------- | ------------------------------------------------------------ |
| Free Privacy Protecting RPCs | <ul><li>[Pancake Swap Private RPC](https://docs.pancakeswap.finance/products/pancakeswap-private-rpc)</li> <li>[48 Club Private RPC](https://docs.48.club/privacy-rpc)</li><li>[Merkle Free BSC Private RPC](https://merkle.io/free-bsc-rpc)</li></ul> |

Several wallets now offer built-in protection against malicious MEV (Miner Extractable Value) attacks, enhancing the security and fairness of users' transactions. This protection is often available as a feature that users can manually enable during their swap or trading activities.

**Wallets with Manual MEV Protection:**

- **Private Transaction Relays:** These relays hide transaction details from malicious actors, preventing them from front-running or sandwich attacking the user's trade.
- **Specialized Builders:** Some wallets utilize builders that prioritize user protection and fair ordering of transactions, minimizing the potential for MEV exploitation.

| Type   | Name           | Status    | How to enable                                                |
| ------ | -------------- | --------- | ------------------------------------------------------------ |
| Wallet | Trust Wallet   | Supported | [TrustWallet Swap MEV Protection](https://trustwallet.com/blog/introducing-mev-protection-secure-your-swaps-with-trust-wallet) |
| Wallet | Binance Web3 Wallet | Supported | [Binance Alpha tokens MEV Protection](https://www.binance.com/en/support/announcement/introducing-binance-alpha-discover-emerging-crypto-projects-c6499e95c15e408ca44ca5f6db975d4d) |
| Wallet | OKX Wallet     | Supported | [OKX Wallet Enable Swap MEV Protection](https://www.okx.com/help/okx-wallet-supports-flashbot-to-prevent-mev-attack) |
| Wallet | TokenPocket Wallet  | Supported | [TokenPocket Swap MEV Protection](https://help.tokenpocket.pro/en/security-knowledge/security-measure/mev-protection-tutorial) |


## For Professional Traders and Service Providers

While free private RPCs offer a good level of protection, you can opt for even stronger safeguards with premium private RPC services. These services often provide advanced features and dedicated infrastructure for enhanced security and performance.

| Role                                                         | Status and Comments                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 5 Builders (Private privacy protecting RPC service providers) | <ul><li>[BloxRoute](https://bloxroute.com/products/protected-transactions/)</li><li>[Blocksmith](https://docs.blocksmith.org/bsc-builder/private-rpc)</li><li>[Nodereal](https://docs.nodereal.io/reference/bsc-bundle-service-api#overview)</li><li>[Blockrazor](https://blockrazor.gitbook.io/blockrazor/mev-service/bsc)</li><li>[Puissant](https://docs.48.club/)</li></ul> |

There are two aspects that may impact the transaction inclusion speed. 

1. Validator Network: Providers with a larger network of integrated validators can often offer faster inclusion speeds. More validators mean more opportunities for your transaction to be picked up and added to a block.
2. Builder Usage: Higher usage of a builder's service generally leads to faster inclusion. Increased usage makes the builder's block proposals more valuable to validators, incentivizing them to prioritize those blocks.

You can view the latest MEV builder data (MEV_Blocks_by_Builders) from the [Dune dashboard](https://dune.com/bnbchain/bnb-smart-chain-mev-stats), and select the appropriate builders to broadcast transactions. The contacts of each builder are listed above in Table 1. 

You can check the number of validators integrated and the number of blocks of each builder, as mentioned above.

1. The more validators are integrated, the faster the builder can be. 
2. The more blocks that are produced, the faster the builder can be. 

![img](../../img/mev/mev-blocks-by-builders.png)

For those who are very sensitive to transaction confirmation time, to maximize the transaction speed, it is recommended to build a proxy to broadcast the transaction to multiple builders to **increase the transaction inclusion speed**. You need to build your own RPC proxy with multiple builder service providers. 

![img](../../img/mev/proxy.png)

A transaction proxy sample code is built by NodeReal, You can find it in the open-source git repo here https://github.com/node-real/private-tx-sender 

