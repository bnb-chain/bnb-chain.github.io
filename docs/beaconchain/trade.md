# Trade

Binance DEX is the native marketplace which allows you to exchange digital assets issued and listed on it. The matching happens within the blockchain nodes and all of the transactions are recorded on-chain, therefore forming a complete, auditable ledger of activity. The following commands are available for trading:

## Place Order
You could place a new order with the following command on testnet:

```
$ tbnbcli dex order  --symbol ZEBRA-16D_BNB  --side 1 --price 1000000 --qty 1000 --from guest --chain-id Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 -t gte
```

You will be able to place order on mainnet by replaceing `chain-id` and `node`.

Example on **mainnet**:

```
$ bnbcli dex order  --symbol ZEBRA-16D_BNB  --side 1 --price 1000000 --qty 1000 --from guest  --chain-id Binance-Chain-Tigris   --node  https://dataseed5.defibit.io:443  -t gte
```

For `side`, you need to put 1 as buy or 2 as sell.

Please note that the quantity should be rounded to `lotSize`. Otherwise your order could be invalid.
The returned output is the following:

```
Committed at block 1616083 (tx hash: C550F348B3A62880062F9DCF67794F08889234D0360B26CF31E68F8D3105C58F, response: {Code:0 Data:[123 34 111 114 100 101 114 95 105 100 34 58 34 56 49 51 69 52 57 51 57 70 49 53 54 55 66 50 49 57 55 48 52 70 70 67 50 65 68 52 68 70 53 56 66 68 69 48 49 48 56 55 57 45 51 48 34 125] Log:Msg 0:  Info: GasWanted:0 GasUsed:0 Tags:[{Key:[97 99 116 105 111 110] Value:[111 114 100 101 114 78 101 119] XXX_NoUnkeyedLiteral:{} XXX_unrecognized:[] XXX_sizecache:0}] Codespace: XXX_NoUnkeyedLiteral:{} XXX_unrecognized:[] XXX_sizecache:0})
Msg [NewOrderMsg{Sender: 813E4939F1567B219704FFC2AD4DF58BDE010879, Id: 813E4939F1567B219704FFC2AD4DF58BDE010879-30, Symbol: ZEBRA-16D_BNB}] was sent.
```
The order id is needed if you want to cancel this order later.

## Cancel Order
To cancel an order, you could use the following command to cencel order on testnet:

```
tbnbcli dex cancel --symbol ZEBRA-16D_BNB   --chain-id Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 --refid  813E4939F1567B219704FFC2AD4DF58BDE010879-30 --from guest
```
Please note that `refid` is what you got from `order` command.

Example on **mainnet**:

```
bnbcli dex cancel --symbol ZEBRA-16D_BNB   --chain-id Binance-Chain-Tigris   --node  https://dataseed5.defibit.io:443 --refid  813E4939F1567B219704FFC2AD4DF58BDE010879-30 --from guest
```

## View Orders

To verify that your commands are executed as expected, you could query the orderbook of testnet.

```
tbnbcli dex show -l ZEBRA-16D_BNB   --chain-id Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80
```
Example output is the following:
```
         SellQty|       SellPrice|        BuyPrice|          BuyQty
     58.14066000|      0.01400000|      0.00100000| 522278.22159000
 674664.35943000|      0.01500000|      0.00000000|      0.00000000
 291157.71192000|      0.01800000|      0.00000000|      0.00000000
    229.20432000|      0.01900000|      0.00000000|      0.00000000
 292616.45027000|      0.02000000|      0.00000000|      0.00000000
 694954.49683000|      0.03000000|      0.00000000|      0.00000000
 279267.00000000|      0.04000000|      0.00000000|      0.00000000
 271236.08958000|      0.04500000|      0.00000000|      0.00000000
 108472.66524300|      0.05000000|      0.00000000|      0.00000000
 155000.00000000|      0.06000000|      0.00000000|      0.00000000
 105028.64699000|      0.07000000|      0.00000000|      0.00000000
 100000.00000000|      0.08000000|      0.00000000|      0.00000000
 263025.58796000|      0.08500000|      0.00000000|      0.00000000
1500427.52685800|      0.09000000|      0.00000000|      0.00000000
2027178.06520900|      0.10000000|      0.00000000|      0.00000000
    114.58796000|      0.17500000|      0.00000000|      0.00000000
  15305.95524500|      0.20000000|      0.00000000|      0.00000000
  10283.97968700|      0.30000000|      0.00000000|      0.00000000
```

Example on **mainnet**:

```
bnbcli dex show -l ZEBRA-16D_BNB    --chain-id Binance-Chain-Tigris   --node  https://dataseed5.defibit.io:443
```
