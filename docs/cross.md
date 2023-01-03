---
sidebar_label: BSC Cross-chain Communication FAQs
hide_table_of_contents: false
sidebar_position: 2
---

# Cross-chain Communication

### How much is cross-chain transfer fee?

The total cost of transfer from BC to BSC is composed of 2 parts:

* Fee for executing `bridge transfer-out` transaction is 0.004BNB, pay validators on Beacon Chain

* Fee for BSC-relayers 0.004BNB. it will cover the fees of calling TokenHub Contract on BSC.

The total cost of transfer from BSC to BC is composed of 2 parts:

* Fee for Oracle-relayers 0.004BNB, pay for BSC relayers

* Call TokenHub Contract: You need to pay BNB for calling smart-contract on BSC, this transaction is metered by gas, which is a global parameter. At the moment, you need to pay about 0.0005BNB ~ 0.0015BNB.

### What's is a BSC relayer?

BSC relayer monitors cross chain packages on Beacon Chain, builds and broadcasts transactions to BSC to deliver these packages, which is the key of cross chain communication from Beacon Chain to BSC.

### What's is an Oracle relayer?

Oracle Relayer watches the state change of Binance Smart Chain. Once it catches Cross-Chain Communication Events, it will submit to vote for the requests. After Oracle Relayers from ⅔ of the voting power of BC validators vote for the changes, the cross-chain actions will be performed. Only validators of Beacon Chain are eligible to run Oracle relayers.

### What's an oracle?

In blockchain network, an oracle refers to the element that connects smart contracts with data from the outside world. In the network of Binance Smart Chain, the execution of the transanction wil emit Events, and such events can be packaged and relayed onto BC. In this way, BC will get updates about changes of BSC.

### Which wallet support cross-chain transfer?

You need to use [MyEtherWallet](wallet/myetherwallet.md)to call contracts and use Beacon Chain commandline client: `bnbcli`/ `tbnbcli` for complementary commands

Please refer to this [guide](cross-chain-transfer.md) for details

### How to send cross-chain transfer?

You can use [BInance Extension Wallet](wallet/binance.md) or

use [Trust wallet](https://community.trustwallet.com/t/how-to-send-and-receive-bnb-on-smart-chain/67430)