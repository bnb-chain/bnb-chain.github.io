---
sidebar_label: Sync Token Supply
hide_table_of_contents: false
sidebar_position: 2
---

# Sync BEP2 and BEP20 Token Supply

## Prerequisite

This BEP20 token is [mirrored](mirror.md) to a BEP2 token.

## Motivation

For a BEP20 token which has been mirrored to BC, anyone can call the `sync` method to balance the total supply on BC and BSC. Thus, the total supply among two Blockchains will remain the same.

## What happens under the hood

- Verify there is already mirrored
- Check the total supply and token symbol is valid
- Send a cross-chain package to modify a BEP2 token total supply on Binance Chain

After syncing, the total supply on BC and BSC are the same.

## Fee Table

| Fee Name    | Pay in BNB |
| ----------- | ---------------------------- |
| syncFee     | it's 0.002BNB on mainnet now |
| relayFee    | it's 0.002BNB on mainnet now |

Both `syncFee` and `relayFee` can be changed by on-chain governance

To query `syncFee` from system contract;

- Call `Tokenmanager` [Contract](https://testnet.bscscan.com/address/0x0000000000000000000000000000000000001008#writeContract) with the latest [ABI](https://github.com/bnb-chain/bsc-genesis-contract/blob/master/abi/tokenmanager.abi )

- Query `syncFee` function

Fee= result/1e18

To query `relayFee` from system contract;

- Call `TokenHub` [Contract](https://testnet.bscscan.com/address/0x0000000000000000000000000000000000001008#writeContract) with the latest [ABI](https://github.com/bnb-chain/bsc-genesis-contract/blob/master/abi/tokenhub.abi )

- Query `getMiniRelayFee` function

Fee= result/1e18

## Mirror With MyEtherWallet

- Call `Tokenmanager` Contract

Use the latest [ABI](https://github.com/bnb-chain/bsc-genesis-contract/blob/master/abi/tokenmanager.abi )

![img](https://lh5.googleusercontent.com/SYyvWVcLHELSE72JSXqBwMJB6Y50jMz5HgH6irmCbyxGwr-W_Hz-vbm4IqWXAqE2hvCAXaqNKfs28ZhGFtMrMrDgWvDfEkHPunnSuxSKPpLBtuxmiX-b5yRjfczENJxKDrqSAYWy)

- Select `sync` function and fill-in with your BEP20 address

The value here should be no less than  `syncFee`+ `relayFee`.

Time stamp should be greater than `unix_timestamp(now())`. The difference should be between 120 and 86400. It's recommended to use `unix_timestamp(now())+1000`

![img](https://lh5.googleusercontent.com/EIgRKIBY8unMsuSBa88jY_EXdJeO1WtaXTQLV905AZmPJDsN72chHcPZrDEWOeD8m1a1awEwP43Uh0eFURLXSKQvnfc3J9YzWLYuBvAeVwIwicKfLUZlCkvkR0NdWxkYWAQKa3Ii)

All set!