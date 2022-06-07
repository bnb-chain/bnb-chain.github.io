# Offline

`bnbcli` support generating and signing all types of transactions offline, then broadcast them. This feature will let users generate and sign their transactions at an offline machine, then use another machine to broadcast it to the network

## Generate your unsigned transaction

First step is that you need to generate your unsigned transaction and save it in a file.

> Note: `--account-number` and `--node` is not mandatory in unsigned command

You can generate an unsigned transfer transaction on testnet:
```
./tbnbcli send --from <your-key-name> --account-number <your-sccount-number> --to <destination-address> --amount 200000000:BNB --chain-id Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 --generate-only --offline >> unsigned.json
```
You can generate an unsigned transfer transaction on mainnet:
```
./bnbcli send --from <your-key-name> --account-number <your-sccount-number> --to <destination-address> --amount 200000000:BNB --chain-id Binance-Chain-Tigris --node https://dataseed5.defibit.io:443 --generate-only --offline >> unsigned.json
```
Then, you can see that the signature of unsigned.json is empty.

## Sign your transaction

You can view the unsigned.json to verify that all the info about this transaction is correct. You need to get the account-number and sequence about your address here: https://docs.bnbchain.org/docs/beaconchain/develop/api-reference/dex-api/paths#apiv1accountaddress

You can sign an unsigned transfer transaction on testnet:
```
./tbnbcli sign unsigned.json --account-number <address-account-number> --sequence <address-sequence> --chain-id Binance-Chain-Ganges --offline --name <your-key-name> >> signed.json
```

You can sign an unsigned transfer transaction on mainnet:
```
./bnbcli sign unsigned.json --account-number <address-account-number> --sequence <address-sequence> --chain-id Binance-Chain-Tigris --offline --name <your-key-name> >> signed.json
```

You need to type in your password in this step

Then, you can see that the signature of signed.json is no longer empty.

## Broadcast Your Transaction

Please then copy your signed.json to a different server and broadcast this transaction.

You can broadcast your transaction on testnet:
```
./tbnbcli broadcast signed.json --node http://data-seed-pre-0-s3.binance.org:80
```
You can broadcast your transaction on mainnet:
```
./bnbcli broadcast signed.json --node https://dataseed5.defibit.io:443
```

You can find the list of nodes [here](develop/api-reference/cli.md#where-to-connect)

If the broadcast is successful, you will see the transaction hash in returned info. Please go and verify it in [Explorer](https://testnet-explorer.binance.org).