#  Accounts

Whenever a new address receives an asset, the corresponding transaction would create an Account for that address, which contains balances across all assets that are owned on this address.

## Account Balance

The balance (the amount of tokens) of each asset is composed of 3 different parts:

- Available: the amount of tokens that can be transferred, and spent to swap (buy) other assets
- Locked: the amount of tokens that has been used in any outstanding orders. Once the order terminates (either filled, canceled or expired), the locked amount will decrease.
- Frozen: the amount of tokens that has been frozen via Freeze transactions.

You can query the account info with the following command on mainnet:

```
./bnbcli account <your-address> --chain-id Binance-Chain-Tigris --node https://dataseed5.defibit.io:443 --indent --trust-node
```

Example output:

Please note that the amount is boosted by e^8 for the decimal part.

```
{"type":"bnbchain/Account","value":{"base":{"address":"tbnb1sylyjw032eajr9cyllp26n04300qzzre38qyv5","coins":[{"denom":"000-0E1","amount":"10530"},{"denom":"BNB","amount":"247349863800"},{"denom":"BTC.B-918","amount":"113218800"},{"denom":"COSMOS-587","amount":"50000101983748977"},{"denom":"EDU-DD0","amount":"139885964"},{"denom":"MFH-9B5","amount":"1258976083286"},{"denom":"NASC-137","amount":"0"},{"denom":"PPC-00A","amount":"205150260"},{"denom":"TGT-9FC","amount":"33251102828"},{"denom":"UCX-CC8","amount":"1398859649"},{"denom":"USDT.B-B7C","amount":"140456966268"},{"denom":"YLC-D8B","amount":"210572645"},{"denom":"ZZZ-21E","amount":"13988596"}],"public_key":{"type":"tendermint/PubKeySecp256k1","value":"AhOb3ZXecsIqwqKw+HhTscyi6K35xYpKaJx10yYwE0Qa"},"account_number":"406226","sequence":"29"},"name":"","frozen":null,"locked":[{"denom":"KOGE48-35D","amount":"10000000000"}]}}
```

From the output you can see that this account account_number is 406226 and its sequence is 29. This is the important information about this account.

## Account and Sequence Number
After Account is created, besides the balances, Account also contains:

- Account Number: an internal identifier for the account
- Sequence Number: an ever-changing integer.

The `Sequence Number` is the way how Beacon Chain  prevents Replay Attack (the idea is borrowed from Cosmos network, but varies a bit in handling). Every transaction should have a new Sequence Number increased by 1 from the current latest sequence number of the Account, and after this transaction is recorded on the blockchain, the Sequence Number will be set to the same number as the one of latest transaction.

This logic forces the client to be aware of the current Sequence Number, either by reading from the blockchain via API, or keep the counting locally by themselves. The recommended way is to keep counting locally and re-synchronize from the blockchain periodically.
