---
title: Payment
Order: 6
---

# Payment

## Abstract

The payment module is responsible for the payment of the greenfield network. It is mainly used to manage the payment account of the user, and the payment account is used to pay the storage fee. The payment module also provides the function of automatic settlement of the user's payment account.

You can refer to the [billing and payment section](../../guide/greenfield-blockchain/modules/billing-and-payment.md) for more details.

## Quick Start

### Create Payment Account

To create a new payment account, `create-payment-account` can be used.

```shell
gnfd tx payment create-payment-account --from ${key} --node ${node} -y
```

${key} is the name of local key.

${node} is the rpc address of a Greenfield node.

=== "Mainnet"
    ```shell
    node = "https://greenfield-chain.bnbchain.org:443"
    ```

=== "Testnet"
    ```shell
    node = "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org:443"
    ```

### Query Payment Account

After the payment account is created, you can query all your payment accounts via the following command:

```shell
gnfd q payment get-payment-accounts-by-owner ${owner} --node ${node}
```
${owner} is the owner address you want to query, usually it is the address derived from your key.

To query the details of a payment account, the following command can be executed.

```shell
gnfd q payment show-payment-account ${payment_account_addr} --node ${node}
```
${payment_account_addr} is the address of the payment account you want to query.

### Deposit to Payment Account

To deposit to a payment amount, the amount should be provided as the following command.

```shell
gnfd tx payment deposit ${payment_account_addr} ${amount} --from ${key} --node ${node} -y
```

${amount} defines the BNB amount you want to deposit, e.g., `1000000000000000000`.

### Withdraw from Payment Account

To withdraw from a payment amount, the following command can be used.

```shell
gnfd tx payment withdraw ${payment_account_addr} ${amount} --from ${key} --node ${node} -y
```

${amount} defines the BNB amount you want to withdraw, e.g., `1000000000000000000`.

### Disable Refundable

After disabling withdrawal of payment account, which cannot be reverted, the owner cannot withdraw from the payment account. 

```shell
gnfd tx payment disable-refund ${payment_account_addr} --from ${key} -y
```

## Detailed CLI

A user can query and interact with the `payment` module using the CLI.

### Query

The `query` commands allow users to query `payment` state.

#### params

The `params` command allows users to query the params of the `payment` module.

```sh
gnfd query payment params [flags]
```

Example:

```sh
gnfd query payment params --node https://greenfield-chain.bnbchain.org:443
```

#### show-payment-account

The `show-payment-account` get the payment account by its address.

```shell
gnfd query payment show-payment-account [addr] [flags]
```

Example:

```shell
$ gnfd q payment show-payment-account 0x169FFd6893aB4A0f8105BA749A0614cB69a18884
payment_account:
addr: 0x169FFd6893aB4A0f8105BA749A0614cB69a18884
owner: 0x71A3c4521B66da275fb514dd3156fa699B54A341
refundable: true
```

#### show-payment-account-count

The command `show-payment-account-count` returns the count of payment accounts of a user. 

```shell
gnfd query payment show-payment-account-count [owner] [flags]
```

Example:

```shell
$ gnfd q payment show-payment-account-count 0x3bA598a3d809702dB4cA8610e14cBAF83908861d
payment_account_count:
count: "1"
owner: 0x3bA598a3d809702dB4cA8610e14cBAF83908861d
```

#### show-stream-record

The command `show-stream-record` returns the status and balances of a payment account.

```shell
gnfd query payment show-stream-record [account] [flags]
```

Example:

```shell
$ gnfd q payment show-stream-record 0x0B14B50E07934d9360152CACbd3397fDf9A13be0
stream_record:
account: 0x0B14B50E07934d9360152CACbd3397fDf9A13be0
buffer_balance: "0"
crud_timestamp: "1680231986"
lock_balance: "4620383649780"
netflow_rate: "0"
out_flows: []
settle_timestamp: "0"
static_balance: "0"
status: STREAM_ACCOUNT_STATUS_ACTIVE
```

#### get-payment-accounts-by-owner

The command `get-payment-accounts-by-owner` returns all payment accounts of a user.

```shell
gnfd query payment get-payment-accounts-by-owner [owner] [flags]
```

Example:

```shell
$ gnfd q payment get-payment-accounts-by-owner 0x0Efc1c24294053a178531CA9EbCD12dC98708953
paymentAccounts:
- 0x9B946d99F4AFB629D6c872CE9027f12Cb8cF0772
```

#### dynamic-balance

The command `dynamic-balance` shows the dynamic balance of a payment account.

```shell
gnfd query payment dynamic-balance [account] [flags]
```

Example:

```shell
$ gnfd query payment dynamic-balance 0xeb359a735eb2c5e50716bdc0ebdac3a901ffb5b8
available_balance: "492302404780385092"
bank_balance: "492302404615058500"
change_rate: "-318"
current_timestamp: "1697011881"
dynamic_balance: "164544312"
locked_fee: "6675734620800"
stream_record:
  account: 0xEb359A735eB2c5E50716bdC0EBdAC3A901ffB5b8
  buffer_balance: "192326400"
  crud_timestamp: "1697009421"
  frozen_netflow_rate: "0"
  lock_balance: "6675542294400"
  netflow_rate: "-318"
  out_flow_count: "4"
  settle_timestamp: "1698090915"
  static_balance: "165326592"
  status: STREAM_ACCOUNT_STATUS_ACTIVE
```

### Transactions

The `tx` commands allow users to interact with the `payment` module.

#### create-payment-account

The `create-payment-account` command allows users to create a new payment account

```shell
gnfd tx payment create-payment-account [flags]
```

Example:

```shell
# create payment account
$ gnfd tx payment create-payment-account --from validator0

# check the created payment account
$ gnfd q payment get-payment-accounts-by-owner 0x0Efc1c24294053a178531CA9EbCD12dC98708953
paymentAccounts:
- 0x9B946d99F4AFB629D6c872CE9027f12Cb8cF0772
```

#### deposit

The `deposit` command is used to deposit to a payment account.

```shell
gnfd tx payment deposit [to] [amount] [flags]
```

Example:

```shell
# deposit 100000000 BNB wei to the payment account
$ gnfd tx payment deposit 0x9B946d99F4AFB629D6c872CE9027f12Cb8cF0772 100000000 --from validator0

# check the payment account, the static_balance should be 100000000
$ gnfd q payment show-stream-record 0x9B946d99F4AFB629D6c872CE9027f12Cb8cF0772
stream_record:
  account: 0x9B946d99F4AFB629D6c872CE9027f12Cb8cF0772
  buffer_balance: "0"
  crud_timestamp: "1680497254"
  lock_balance: "0"
  netflow_rate: "0"
  out_flows: []
  settle_timestamp: "0"
  static_balance: "100000000"
  status: STREAM_ACCOUNT_STATUS_ACTIVE
```

#### withdraw

The `withdraw` command is used to deposit to a payment account.

```shell
gnfd tx payment withdraw [from] [amount] [flags]
```

Example:

```shell
# withdraw from the payment account
$ gnfd tx payment withdraw 0x9B946d99F4AFB629D6c872CE9027f12Cb8cF0772 100 --from validator0

# check the payment account, the static_balance should be 99999900 now
$ gnfd q payment show-stream-record 0x9B946d99F4AFB629D6c872CE9027f12Cb8cF0772
stream_record:
  account: 0x9B946d99F4AFB629D6c872CE9027f12Cb8cF0772
  buffer_balance: "0"
  crud_timestamp: "1680497338"
  lock_balance: "0"
  netflow_rate: "0"
  out_flows: []
  settle_timestamp: "0"
  static_balance: "99999900"
  status: STREAM_ACCOUNT_STATUS_ACTIVE
```

#### disable-refund

The `disable-refund` command is used to disable withdraw of a payment account.

```shell
gnfd tx payment disable-refund [addr] [flags]
```

Example:

```shell
# check the payment account refundable status
$ gnfd q payment show-payment-account 0x9B946d99F4AFB629D6c872CE9027f12Cb8cF0772
payment_account:
  addr: 0x9B946d99F4AFB629D6c872CE9027f12Cb8cF0772
  owner: 0x0Efc1c24294053a178531CA9EbCD12dC98708953
  refundable: true

# disable refund
$ gnfd tx payment disable-refund 0x9B946d99F4AFB629D6c872CE9027f12Cb8cF0772 --from validator0

# check the payment account refundable status again, it should be false now
$ gnfd q payment show-payment-account 0x9B946d99F4AFB629D6c872CE9027f12Cb8cF0772
payment_account:
  addr: 0x9B946d99F4AFB629D6c872CE9027f12Cb8cF0772
  owner: 0x0Efc1c24294053a178531CA9EbCD12dC98708953
  refundable: false
```
