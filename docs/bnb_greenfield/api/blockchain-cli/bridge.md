---
title: Cross Chain Transfer
order: 5
---
# Cross Chain Transfer

## Abstract
The bridge module is responsible for handling the BNB transfers between Greenfield and BSC.

Users can transfer BNB to BSC via gnfd command, and query the relayer fee for the cross-chain transfers.

## Quick Start

### Query Relayer Fee

For cross-chain transaction, some amount of fee will be paid to cross-chain relayers.

To query the fees, please use the following command.

```shell
gnfd q bridge params --node ${node} 
```

${node} is the rpc address of a Greenfield node.

=== "Mainnet"
    ```shell
    node = "https://greenfield-chain.bnbchain.org:443"
    ```

=== "Testnet"
    ```shell
    node = "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org:443"
    ```


### Transfer from Greenfield to BSC

To transfer funds from Greenfield to BSC, you can use the following command:

```shell
gnfd tx bridge transfer-out ${key} ${receiver} ${coins} --home ~/.gnfd --node ${node}  -y
```

${key} is the name of local key.

${coins} defines the coins you want to transfer, for example, `500000000000000000000BNB`.

${receiver} defines the address on BSC, which will receive the funds.


## Detailed CLI

A user can query and interact with the `bridge` module using the CLI.

### Query

The `query` commands allow users to query the params of the `bridge` module.

```sh
gnfd query bridge --help
```

#### params

The `params` command allows users to query the params of the `bridge` module.

```sh
gnfd query bridge params [flags]
```

Example:

```sh
gnfd query bridge params --node https://greenfield-chain.bnbchain.org:443
```

Example Output:

```yml
params:
  transfer_out_ack_relayer_fee: "0"
  transfer_out_relayer_fee: "1"
```

### Transactions

The `tx` commands allow users to interact with the `bridge` module.

```sh
gnfd tx bridge --help
```

#### transfer-out

The `transfer-out` command allows users to send funds between accounts from Greenfield to BSC.

```sh
gnfd tx bridge transfer-out [from_key_or_address] [to_address] [amount] [flags]
```

Example:

```sh
gnfd tx bridge transfer-out alice 0x32Ff14Fa1547314b95991976DB432F9Aa648A423 500000000000000000000BNB --home ~/.gnfd --node https://greenfield-chain.bnbchain.org:443  -y
```