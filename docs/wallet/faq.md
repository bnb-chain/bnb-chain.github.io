# Binance Extension Wallet FAQ

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