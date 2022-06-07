#  Customized Scripts and Transfer Memo Validation

## Memo Validation
As explained in [BEP12](https://github.com/bnb-chain/BEPs/blob/master/BEP12.md), In some circumstances, users may want to specify additional functions or/and validations on some transactions. With BEP12, exchanges can reject deposits that have no valid digits-only memo.

## Enable account scripts for cross-chain transfer
[BEP12](https://github.com/bnb-chain/BEPs/blob/master/BEP12.md) was introduced to check whether the memo field of any transfer transaction is empty. Since [version 0.8.2](https://github.com/bnb-chain/node-binary/releases/tag/v0.8.2), the memo of cross-chain transfer is also checked. From now on, the deposit transaction without memo to exchanges be returned automatically.


## What is a customized script?

This script is aimed to ensure the transfer transactions have valid memo (if the receivers require this).
First, this script will check the following conditions:

The transaction type is sent.
The target address is the receiving address.
Then this script will ensure that the transaction memo is not empty and the memo only contains digital letters.

This is the pseudocode:
```
func memoValiation(addr, tx) error {
    if tx.Type != “send” {
        return nil
    }
    if ! isReceiver(tx, addr) {
        return nil
    }
    if  tx.memo.length == 0 {
        return err(“tx memo is empty”)
    }
    if  tx.memo.length > 100 {
        return err(“tx memo is too long”)
    }
    if !isAllDigital(tx.memo) {
        return err(“tx memo contains non digital character”)
    }
    return nil
}
```
### Fee

1 BNB will be charged on enabling  memo validation of transactions.

## Command Line

### Global Parameters

| **Field**    | **Type** | **Description**                                              |
| :------------ | :-------- | :------------------------------------------------------------ |
| from   | string  |Name of your key. |
| chain-id        | string   | Name of blockchain |
| node      | string   | url of the node|


###  Set-account-flags

This transaction is aimed to set account flags to any hex value.

### Parameters

| **Field**    | **Type** | **Description**                                              |
| :------------ | :-------- | :------------------------------------------------------------ |
| account-flags  | string   | account flags, must be hex encoding string with prefix 0x |

* Example on mainnet:

```
./bnbcli token account_flags set-account-flags --from <your-key-name> --account-flags 0x01  --chain-id Binance-Chain-Tigris --node  https://dataseed5.defibit.io:443 --trust-node
```


* Example on testnet:

```
./tbnbcli token account_flags set-account-flags --from <your-key-name> --account-flags 0x01 --chain-id Binance-Chain-Ganges --trust-node --node http://data-seed-pre-0-s3.binance.org:80
```

### Enable-memo-checker

This transaction is aimed to aimed to enable transfer memo checker scripts.


* Example on mainnet:

```
./bnbcli account_flags enable-memo-checker --chain-id Binance-Chain-Tigris --node  https://dataseed5.defibit.io:443 --trust-node
```

* Example on testnet:

```
./tbnbcli account_flags enable-memo-checker --chain-id Binance-Chain-Ganges --trust-node --node http://data-seed-pre-0-s3.binance.org:80
```

### Disable-memo-checker

This transaction is aimed to disable transfer memo checker.

* Example on mainnet:

```
./bnbcli account_flag disable-memo-checker --chain-id Binance-Chain-Tigris --node  https://dataseed5.defibit.io:443 --trust-node
```


* Example on testnet:

```
./tbnbcli account_flag disable-memo-checker --chain-id Binance-Chain-Ganges --trust-node --node http://data-seed-pre-0-s3.binance.org:80
```
