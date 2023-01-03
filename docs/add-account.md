---
sidebar_label: Add Account
hide_table_of_contents: false
sidebar_position: 2
---

# How does Add Account Work

## BIP39
[Bitcoin Improvement Proposal (BIP) 39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) defines a formula for the generation of a mnemonic sentence (also referred to as mnemonic words, seed phrase, recovery phrase, etc.) the generation of a seed from that mnemonic sentence. The seed pharse is used to produce your private and public keys.

## BIP32
[BIP 32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) is a specification for creating [Hierarchical Deterministic wallets](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki). They are wallets that from a root can generate multiple "child" private keys in a deterministic way. You only need to remember the "path" of the child key.For example hardware wallets use them from a single root you can generate separate keys for Bitcoin (with path m/44'/0'/0'/0) and Ethereum (path m/44'/60'/0'/0).

## Add Account in Binance Extension Wallet
BNB Chain extension wallet would use a similar way to generate keys as Ethereum, i.e. derive the private key using BIP32/BIP44 with HD prefix as "44'/60'/", which is the same as Ethereum's derivation path.

![img](https://camo.githubusercontent.com/27efab81cd5ca43ba036a29bc4e2dfdfda88cac69de2880385335d0a4234619a/68747470733a2f2f6c68332e676f6f676c6575736572636f6e74656e742e636f6d2f73506b703861503069334161766e6176506255473459777a6666324649694c724f754b7372636a34706365687a39414c716f7553705f61715f54315354485953324d43414e6145776367687135795076376f4a78414f39476d4d5869666d7a3936514a2d4457496350337063432d786355736d317a3763416f31456e4b5f54707a5f31646b643742)


Whenever you click on “**Add Account**”, your seed is extended at the end by a counter value which makes it possible to automatically derive an unlimited number of new addresses in your extension wallet.