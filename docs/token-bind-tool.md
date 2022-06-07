---
sidebar_label: Bind Token Tool
hide_table_of_contents: false
sidebar_position: 2
---

# token-bind-tool

Tool to bind BEP2 tokens and BEP20 tokens. please refer to [document](https://docs.bnbchain.org/docs/bind-tokens) for detail bind mechanism. Github repo for bind token tool [here](https://github.com/bnb-chain/token-bind-tool.git).

## Compile

Compile token bind tool:
```shell script
make build
```

## Preparation for binding tokens

1. Generate temp account (Deploy contract on BNB Smart Chain):
    ```shell script
    ./build/token-bind-tool initKey --network-type {testnet/mainnet}
    ```
    Example response:
    ```text
    Temp account: 0xde9Aa1d632b48d881B50528FC524C88474Ec8809, Explorer url: https://bscscan.com/address/0xde9Aa1d632b48d881B50528FC524C88474Ec8809
    ```
   
2. Transfer 1 BNB to the temp account.
   
   2.1 Cross chain transfer
   ```shell script
    bnbcli bridge transfer-out --expire-time `expr $(date +%s) + 3600` \
    --chain-id Binance-Chain-Tigris --from {keyName} --node http://dataseed4.binance.org:80 \
    --to {temp account address} --amount 100000000:BNB
    ```
   Example command:
   ```shell script
   bnbcli bridge transfer-out --expire-time `expr $(date +%s) + 3600` \
   --chain-id Binance-Chain-Tigris --from bep2TokenIssuer --node http://dataseed4.binance.org:80 \
   --to 0xde9Aa1d632b48d881B50528FC524C88474Ec8809 --amount 100000000:BNB
   ```
   
   2.2 You can also transfer BNB from other BNB Smart Chain account with [Metamask](https://docs.binance.org/smart-chain/wallet/metamask.html).

## Bind BEP2 token with BEP20 token

### Case 1

Suppose you have already issued a BEP2 token, and you want to deploy a BEP20 token and bind it with existing BEP2 token:

1. Import bep2 token owner key(Send bind transaction on Beacon Chain):

    1.1 From ledger: connect ledger to your computer and open Beacon Chain App
    ```shell script
    bnbcli keys add bep2TokenIssuer --ledger --index {your ledger key index}
    ```
    1.2 From mnemonic:
    ```shell script
    bnbcli keys add bep2TokenIssuer --recover
    ```

2. Prepare BEP20 contract code

    2.1 You can refer to [BEP20 Template](https://github.com/bnb-chain/bsc-genesis-contract/blob/master/contracts/bep20_template/BEP20Token.template) and modify it according to your own requirements.
        
    **NOTE 1:** Ensure the BEP20 symbol is identical to the prefix of a BEP2 token symbol. Suppose a BEP2 token symbol is `ABC-123`, then the BEP20 symbol must be `ABC`.
    
    **NOTE 2:** Ensure the total supply equals to the BEP2 token total supply. As we know, the decimals of BEP2 tokens are 8, if the BEP20 decimal is 18, then the BEP20 total supply must be `BEP2_total_supply*10^10`.

    **NOTE 3:** If your BEP2 token is mintable, then you'd better implement `mint` in BEP20 contract. Otherwise, you'd better remove `mint` in BEP20 contract.
   
    2.2 Compile your contract with [Remix](https://remix.ethereum.org) and get contract byte code:
    ![img](https://github.com/bnb-chain/token-bind-tool/blob/master/pictures/compile.png?raw=true)
    
3. Edit `script/contract.json` to add contract byte code:

    ```json
    {
      "contract_data": ""
    }
    ```
    Fill contract byte code to `contract_data`

4. Deploy contract, bind and transfer ownership:

    ```shell script
    ./script/bind.sh {mainnet/testnet} {bep2TokenIssuerKeyName} {password, for ledger key, use empty string: ""} {peggyAmount} {bep2 token symbol} {token owner} {path to bnbcli or tbnbcli}
    ```

    Example command:
    ```shell script
    ./script/bind.sh testnet bep2TokenIssuer "12345678" 0 ABC-D9B 0xaa25Aa7a19f9c426E07dee59b12f944f4d9f1DD3 $HOME/go/bin/tbnbcli
    ```

### Case 2

Suppose you have already issued BEP2 token, deployed BEP20 contract and sent bind transaction, now you just want to approve bind from your Ledger device:

1. Connect ledger to your machine and open Ethereum app.
2. Execute this command to approve bind:
```shell script
./build/token-bind-tool approveBindFromLedger --bep2-symbol {bep2 symbol} --bep20-contract-addr {bep20 contract address} \
--ledger-account-index {ledger key index} --peggy-amount {peggy amount} --network-type {mainnet/testnet}
```

### Case 3

Suppose you just want to deploy a BEP20 contract and transfer all token and ownership to your owner account, then you can try this command:
```shell script
./build/token-bind-tool deployBEP20ContractTransferTotalSupplyAndOwnership --bep20-owner {bep20 owner} \
--config-path {contract byte code path, refer to `script/contract.json`} --network-type {mainnet/testnet}
```

## Refund rest BNB on temp account

```shell script
./build/token-bind-tool refundRestBNB --network-type {mainnet/testnet} --recipient {bsc account}
```