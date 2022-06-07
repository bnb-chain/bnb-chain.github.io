---
sidebar_label: Bind BEP2 and BEP20 Tokens
sidebar_position: 2
---

# Bind BEP2 and BEP20 Tokens

BSC and BC work together to ensure that one token can circulate in both formats with confirmed total supply and be used in different use cases. Token Binding can happen at any time after BEP2/BEP8 and BEP20 are ready. The token owners of either BEP2/BEP8 or BEP20 only need to complete the **Binding** process when a cross-chain feature is necessary.

You can use this [tool](https://github.com/bnb-chain/token-bind-tool).

## Issue BEP2 or BEP8 Token

Please refer to this [doc](tokens.md) to issue BEP2

Please refer to this [doc](beaconchain/learn/BEP8.md) to issue BEP8


**Example**
Let's issue a new BEP2 token `ABC`
```bash
## mainnet
bnbcli token issue --symbol ABC --token-name "ABC token" --mintable --total-supply 10000000000000000 --from owner --chain-id Binance-Chain-Tigris --node http://dataseed4.org:80

## testnet
tbnbcli token issue --symbol ABC --token-name "ABC token" --mintable --total-supply 10000000000000000 --from owner --chain-id Binance-Chain-Ganges --node http://data-seed-pre-0-s3.binance.org:80
```

## Deploy BEP20 Token
Please refer to this [doc](issue-BEP20.md)

The symbol of the BEP20 token must be exactly identical to the prefix of the bep2 token(case sensitive).

## Token Binding
### Send Bind Transaction
```bash
## mainnet
bnbcli bridge bind --symbol ABC-A64 --amount 6000000000000000 --expire-time 1597545851 --contract-decimals 18 --from owner --chain-id Binance-Chain-Tigris --contract-address 0xee3de9d0640ab4342bf83fe2897201543924a324 --node http://dataseed4.binance.org:80

## testnet
tbnbcli bridge bind --symbol ABC-A64 --amount 6000000000000000 --expire-time 1597545851 --contract-decimals 18 --from owner --chain-id Binance-Chain-Ganges --contract-address 0xee3de9d0640ab4342bf83fe2897201543924a324 --node http://data-seed-pre-0-s3.binance.org:80
```
The total supply of the ABC-A64 token is 100 million. The above bind transfer will transfer 60 million to a pure-code-controlled address. And then there are 40 million flowable tokens in BC. According to our bind mechanism, we have to lock 40 million token to **TokenManager** contract and leave 60 million flowable token on BSC. Thus the sum of flowable tokens on both chains is 100 million. Please remember that the amounts I mentioned above don’t include decimals.
### Approve Bind Request
1. Grant allowance:

    In [myetherwallet](wallet/myetherwallet.md), call the **approve** of the BEP20 to grant a 40 million allowance to TokenManager contract. The spender value should be `0x0000000000000000000000000000000000001008`, and the amount value should be 4e25. The transaction sender should be the BEP20 owner.

    ![img](https://lh6.googleusercontent.com/p-HctNRPwXg0VD1yfE3j4OJ3BrMHPZpiGGCtp7XUJX34z_LT53nvZqgTzY58Ab1EsybJipwjsnwL2uJ-CPH8gntDpcw7LW7aFPK1_KRxxnNq-xErwGpaPTlg5UbfKoVNjd4YT0xU)

2. Approve Bind

    In [myetherwallet](wallet/myetherwallet.md), call **approveBind** in **TokenManager** contract to approve the bind request from the BEP20 owner address.

    ![img](https://lh6.googleusercontent.com/nFIbDxpA8bTVYH0Rt4UD-SYYz62TmYKjOsgK1CXxFRHHJlz6gOyXnq5p3GesM_zrQES4ixmojvN_Srk4CIf1MPxBXbia-K2DNiL23Hao1HiUgdNe4S2BmPe6yn5XJz7ajlwVVCti)

    The value here should be no less than `miniRelayFee/1e18`. The initial `miniRelayFee` is 1e16. So `miniRelayFee/1e18` equals to `0.01`. Besides, `miniRelayFee` can be changed by on-chain governance

3. Confirm bind result on BC

    Wait for about 20 seconds and execute this command:
    ```bash
    ## mainnet
    bnbcli token info --symbol ABC-A64 --trust-node --node http://dataseed4.binance.org:80
    ## testnet
    tbnbcli token info --symbol ABC-A64 --trust-node --node http://data-seed-pre-0-s3.binance.org:80
    ```

    ```json
    {
      "type": "bnbchain/Token",
      "value": {
        "name": "ABC Token",
        "symbol": "ABC-A64",
        "original_symbol": "ABC",
        "total_supply": "100000000.00000000",
        "owner": "tbnb1l9ffdr8e2pk7h4agvhwcslh2urwpuhqm2u82hy",
        "mintable": false,
        "contract_address": "0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "contract_decimals": 18
      }
    }
    ```
    If the bind was successful, then in the above response, "contract_address" and "contract_decimals" should not be empty.




## Use Cases

### Case 1: Lock non-zero in bind transaction

Suppose you have 20 million on your treasure, you decide to lock some tokens via the bind tx:
1. Send bind transfer on BNB Chain and specify the 20 million as the lock amount.
2. Your BEP20 has 100 million supplies, you need to run the `approve` to grant allowance to the tokenHub contract, then you run `approveBind`, along these step, you don't have to specify how much exactly you need to transfer to the tokenHub contract, it will figure it out (here actually it is 80 million), as long as you `approve` it with enough amount.
3. If your `approveBind` runs successfully, the bind is done. Your 20 million treasures actually will be on your owner address on BSC, and this is your **CHOICE**.
4. After your bind, you can spend your 20 million whatever you want (including transferring back to BC), and for other holders of your token on BC, they can transfer their token to BSC at their own choice without your help or your permission.

### Case 2: Lock zero in bind transaction

Suppose you choose not to touch your 20 million in treasure at all:
1. When you have 20 million on your treasure, you can choose to lock ZERO when you run the bind tx.
2. Suppose Your BEP20 has 100 million supplies, you need to run the `approve` to grant 100 million allowance to the tokenHub contract, then you run `approveBind`.
3. If your approveBind runs successfully, the bind is done. Your 20 million treasures stay at BC in your treasure address, nothing happens to it, and this is your CHOICE. Meanwhile, on BSC, no one has any BEP20 tokens, except the tokenHub. However, because the bind is done, ANYONE, including yourself, can get BEP20 whenever they want by a simple cross-chain transfer.
