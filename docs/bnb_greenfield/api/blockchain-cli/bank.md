---
title: Account Balance
order: 2
category:
  - cli
---


# Account Balance

## Abstract
The bank module is responsible for handling BNB transfers between
accounts and module accounts.

In addition, the bank module tracks and provides query support for the total
supply of BNB in the application.

## Quick Start

### Query Balances

To query the balances of an account, you can use the following command.

```shell
gnfd q bank balances ${receiver} --node ${node} 
```

You can specify any valid address you want to query via ${receiver}.


${node} is the rpc address of a Greenfield node.


=== "Mainnet"
    ```shell
    node = "https://greenfield-chain.bnbchain.org:443"
    ```

=== "Testnet"
    ```shell
    node = "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org:443"
    ```

### Send

To transfer some coins you can use `send` command.
```shell
gnfd tx bank send ${key} ${receiver} ${coins} --home ~/.gnfd --node ${node}  -y
```

${key} is the name of local key.

${coins} defines the coins you want to transfer, for example, `500000000000000000000BNB`.

### Multi-send

Sometimes, you may want to transfer tokens to multiple people. `multi-send` command can be used for the purpose.

```shell
gnfd tx bank multi-send ${key} ${receiver1} ${receiver2} ${coins} --home ~/.gnfd --node ${node}  -y
```

## Detailed CLI

A user can query and interact with the `bank` module using the CLI.

### Query

The `query` commands allow users to query `bank` state.

```sh
gnfd query bank --help
```

#### balances

The `balances` command allows users to query account balances by address.

```sh
gnfd query bank balances [address] [flags]
```

Example:

```sh
gnfd query bank balances 0x73a4Cf67b46D7E4efbb95Fc6F59D64129299c2E3
```

Example Output:

```yml
balances:
- amount: "10000000000000000000000"
  denom: BNB
pagination:
  next_key: null
  total: "0"
```

#### denom-metadata

The `denom-metadata` command allows users to query metadata for coin denominations. A user can query metadata for a single denomination using the `--denom` flag or all denominations without it.

```sh
gnfd query bank denom-metadata [flags]
```

Example:

```sh
gnfd query bank denom-metadata --denom BNB
```

Example Output:

```yml
metadata:
  base: BNB
  denom_units:
    - aliases:
        - wei
      denom: BNB
      exponent: 0
  description: The native staking token of the Greenfield.
  display: BNB
  name: ""
  symbol: ""
  uri: ""
  uri_hash: ""
```

#### total

The `total` command allows users to query the total supply of coins. A user can query the total supply for a single coin using the `--denom` flag or all coins without it.

```sh
gnfd query bank total [flags]
```

Example:

```sh
gnfd query bank total --denom BNB
```

Example Output:

```yml
amount: "1000000000000000800000000000"
denom: BNB
```

### Transactions

The `tx` commands allow users to interact with the `bank` module.

```sh
gnfd tx bank --help
```

#### send

The `send` command allows users to send funds from one account to another.

```sh
gnfd tx bank send [from_key_or_address] [to_address] [amount] [flags]
```

Example:

```sh
gnfd tx bank send addr1.. addr2.. 100000000000000000000BNB
```