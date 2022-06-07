---
sidebar_label: Cross Chain Transfer
hide_table_of_contents: false
sidebar_position: 2
---

# Cross-Chain Transfer

Cross-chain transfers only support bound BEP2 or BEP8 tokens on BC and BEP20 tokens on BSC.

## Verify Token Info

First, you should make sure that it's already bound. For example, you could see the binding info of **BNB**:

```shell
## mainnet
bnbcli token info --symbol BNB --trust-node --node http://dataseed4.binance.org:80

## testnet
tbnbcli token info --symbol BNB --trust-node --node http://data-seed-pre-0-s3.binance.org:80 
```

```json
{
  "type": "bnbchain/Token",
  "value": {
    "name": "BNB Chain Native Token",
    "symbol": "BNB",
    "original_symbol": "BNB",
    "total_supply": "200000000.00000000",
    "owner": "tbnb1l9ffdr8e2pk7h4agvhwcslh2urwpuhqm2u82hy",
    "mintable": false,
    "contract_address": "0x0000000000000000000000000000000000000000",
    "contract_decimals": 18
  }
}
```

As BNB is the native token on both chains, so we use `0x0000000000000000000000000000000000000000` as the corresponding contract address. Besides, on BSC, the native token decimals is 18, while the decimals on BC is 8. So if you transfer 1e8:BNB to BSC, the recipient balance will gain 1e18.


## Transfer BNB from BC to BSC

**Example:**

```shell
## mainnet
bnbcli bridge transfer-out --to 0xEe9546E92e6876EdF6a234eFFbD72d75360d91f0 --expire-time 1597543193 --chain-id Binance-Chain-Tigris --from owner --amount 100000000:BNB --node http://dataseed4.binance.org:80

## testnet
tbnbcli bridge transfer-out --to 0xEe9546E92e6876EdF6a234eFFbD72d75360d91f0 --expire-time 1597543193 --chain-id Binance-Chain-Ganges --from owner --amount 100000000:BNB --node http://data-seed-pre-0-s3.binance.org:80
```

Result:

```bash
Committed at block 465899 (tx hash: 68FFF82197E27A3EC14AFF8C99A035FA9CA7120312AA55E98D11DFC0F8D9F3B9, response: {Code:0 Data:[] Log:Msg 0:  Info: GasWanted:0 GasUsed:0 Events:[{Type: Attributes:[{Key:[84 114 97 110 115 102 101 114 79 117 116 83 101 113 117 101 110 99 101] Value:[49 49] XXX_NoUnkeyedLiteral:{} XXX_unrecognized:[] XXX_sizecache:0} {Key:[69 120 112 105 114 101 84 105 109 101] Value:[49 53 57 55 53 52 51 49 57 51] XXX_NoUnkeyedLiteral:{} XXX_unrecognized:[] XXX_sizecache:0} {Key:[97 99 116 105 111 110] Value:[99 114 111 115 115 84 114 97 110 115 102 101 114 79 117 116] XXX_NoUnkeyedLiteral:{} XXX_unrecognized:[] XXX_sizecache:0}] XXX_NoUnkeyedLiteral:{} XXX_unrecognized:[] XXX_sizecache:0}] Codespace: XXX_NoUnkeyedLiteral:{} XXX_unrecognized:[] XXX_sizecache:0})
```

## Transfer BNB from BSC to BC

### transferOut

Call **transferOut** of [TokenHub contract](https://raw.githubusercontent.com/bnb-chain/bsc-genesis-contract/master/abi/tokenhub.abi) in [MyEtherWallet](https://www.myetherwallet.com/):

![img](https://lh3.googleusercontent.com/q8-nnt12h8gvYyMe6iwLalwzY-1jHfQ11BsSyIz3qkQPCjp_-D-dIzPxZ-HuMJngCxTs7pt65-zSUIYImpsoO8bJ_QC_pyfPMu_2O7Lh65uDvVXrkhKqOakI070vKuEK3UNnlk8m)



| Parameter Name | Type    | Description                                                  |
| -------------- | ------- | ------------------------------------------------------------ |
| contractAddr   | address | for BNB, the value must be 0x0000000000000000000000000000000000000000 |
| recipient      | address | decode bech32 address, starting with `0x` . To transfer to hex string. This is an online tool to decode bech32: https://slowli.github.io/bech32-buffer/ |
| amount         | uint256 | The BNB decimals on  BSC is 18. If you want to transfer one BNB, then the value should be 1e18. Besides, the value must be N * 1e10 |
| expireTime     | uint256 | Timestamp, counted by  second                                |

The value here should follow this equation:

```
txValue = (amount + RelayFee)/1e18
```

`RelayFee` should be 0.01BNB and it can be updated by on-chain governance. For example, if you transfer 1BNB from BSC to BC, the value should be at least 1.01BNB.

After all the above parameters have been set to proper values, users can click the transact button to build transactions, and Metamask plugin will be ejected. Then users can click the confirm button in the Metamask to sign and broadcast transactions.


### batchTransferOutBNB

Call **batchTransferOutBNB** of TokenHub contract in MyEtherWallet:

![img](https://github.com/bnb-chain/docs-site/raw/master/docs/assets/batchTransferOutBNB.png)

| Parameter Name | Type      | Description                                                  |
| -------------- | --------- | ------------------------------------------------------------ |
| recipientAddrs | address[] | decode bech32 address  to hex string. This is a online too to decode bech32: https://slowli.github.io/bech32-buffer/0 |
| amounts        | uint256[] | amount for each  recipient, should be N * 1e10               |
| refundAddrs    | address[] | sender can specify  some address as the refund address if the cross chain transfer is failed. |
| expireTime     | uint256   | Timestamp, counted by  second                                |


The value here should follow this equation:

```
txValue = (sumOfAmounts + RelayFee * batchSize)/1e18
```

## Transfer BEP2 to BSC
Execute the following command to transfer ABC-A64 token to BSC:
```bash
## mainnet
bnbcli bridge transfer-out --to 0xEe9546E92e6876EdF6a234eFFbD72d75360d91f0 --expire-time 1597543193 --chain-id Binance-Chain-Tigris --from owner --amount 10000000000:ABC-A64 --node http://dataseed4.binance.org:80

## testnet
tbnbcli bridge transfer-out --to 0xEe9546E92e6876EdF6a234eFFbD72d75360d91f0 --expire-time 1597543193 --chain-id Binance-Chain-Ganges --from owner --amount 10000000000:ABC-A64 --node http://data-seed-pre-0-s3.binance.org:80
```
## Transfer BEP20 to BC
Before calling **transferOut** or **batchTransferOut**, users need to call **approve** method to grant enough allowance to TokenHub contract. For **transferOut** method, the allowance should equal the transfer amount. For **batchTransferOut**, the allowance should be the sum of the amount array.

### transferOut

![img](https://lh3.googleusercontent.com/q8-nnt12h8gvYyMe6iwLalwzY-1jHfQ11BsSyIz3qkQPCjp_-D-dIzPxZ-HuMJngCxTs7pt65-zSUIYImpsoO8bJ_QC_pyfPMu_2O7Lh65uDvVXrkhKqOakI070vKuEK3UNnlk8m)

| Parameter Name | Type    | Description                                                  |
| ------------   | ------- | ------------------------------------------------------------ |
| contractAddr   | address | BEP20 contract address                                       |
| recipient      | address | decode bech32 address  to hex string. This is a online too to decode bech32: https://slowli.github.io/bech32-buffer/ |
| amount         | uint256 | BEP20 token amount.  Here the decimals is 18, so the amount must be N * 1e10. |
| expireTime     | uint256 | Timestamp, counted by  second                                |

The value here should be RelayFee.

### Mint

If both the BEP20 token and BEP2 token are mintable, then token owners can still mint their tokens even after token binding. Besides, token owners need to ensure the total supply and the locked amount on both chains are still matched. Otherwise, users might can’t transfer their tokens to another chain.

#### Mint token on BC

1. Execute the following command to mint 10000 ABC-A64:
```bash
## mainnet
bnbcli token mint --symbol ABC-A64 --amount 1000000000000 --from owner --chain-id Binance-Chain-Tigris --node http://dataseed4.binance.org:80

## testnet
tbnbcli token mint --symbol ABC-A64 --amount 1000000000000 --from owner --chain-id Binance-Chain-Ganges --node http://data-seed-pre-0-s3.binance.org:80
```

2. Mint token on BSC and lock the new minted token:
* Call **mint** method of BEP20 contract, the mint amount should be 1e22.
* Transfer all minted ABC token to tokenHub contract: `0x0000000000000000000000000000000000001004`

#### Mint token on BSC

1. Call **mint** of BEP20 contract to mint 10000 ABC, the mint amount should be 1e22(18 decimals).
2. Mint token on BC and lock the new minted token:

* Execute the following command to mint 10000 ABC-A64:
```bash
## mainnet
bnbcli token mint --symbol ABC-A64 --amount 1000000000000 --from owner --chain-id Binance-Chain-Tigris --node http://dataseed4.binance.org:80

## testnet
tbnbcli token mint --symbol ABC-A64 --amount 1000000000000 --from owner --chain-id Binance-Chain-Ganges --node http://data-seed-pre-0-s3.binance.org:80
```
* Transfer all minted ABC-A64 token to the pure-code-controlled address: `tbnb1v8vkkymvhe2sf7gd2092ujc6hweta38xnc4wpr`(mainnet address: `bnb1v8vkkymvhe2sf7gd2092ujc6hweta38xadu2pj`)