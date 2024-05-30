---
title: Blockchain Command Line
index: true
dir:
  order: 4
---

# Blockchain Command-Line Interface

!!! info
    Since Greenfield Command Line interface is derived from Cosmos, The majority of the content in this page is copied from the [Cosmos SDK](https://docs.cosmos.network/main/core/cli).


There is no set way to create a CLI, but Greenfield typically use the [Cobra Library](https://github.com/spf13/cobra). 
Building a CLI with Cobra entails defining commands, arguments, and flags. Commands understand the 
actions users wish to take, such as `tx` for creating a transaction and `query` for querying the application. 
Each command can also have nested subcommands, necessary for naming the specific transaction type. 
Users also supply **Arguments**, such as account numbers to send coins to, and flags to modify various 
aspects of the commands, such as gas prices or which node to broadcast to.

### Transaction Command
Here is an example of a command a user might enter to interact with `gnfd` in order to send some tokens:

```bash
gnfd tx bank send $MY_ADDRESS $RECIPIENT 1000BNB --gas auto
```

The first four strings specify the command:

* The subcommand `tx`, which contains all commands that let users create transactions.
* The subcommand `bank` to indicate which module to route the command to `x/bank` module in this case.
* The type of transaction `send`.

The next two strings are arguments: the `from_address` the user wishes to send from, the `to_address` of the recipient, 
and the `amount` they want to send. Finally, the last few strings of the command are optional flags to indicate 
how much the user is willing to pay in fees.

### Transaction Data
Greenfield utilizes the EIP712 transaction format. To view the transaction data, you can use the `print-eip712-msg-type` flag.
Below is an example of how to display the transaction data of sending tokens.

```shell
gnfd tx bank send $MY_ADDRESS $RECIPIENT 1000BNB --print-eip712-msg-type
```

From the output, we can obtain the following three fields:

1. **EIP712MessageType**: This field represents the EIP712 messages format of the transaction.
```json
{
  "Coin": [
    {
      "name": "amount",
      "type": "uint256"
    },
    {
      "name": "denom",
      "type": "string"
    }
  ],
  "EIP712Domain": [
    {
      "name": "chainId",
      "type": "uint256"
    },
    {
      "name": "name",
      "type": "string"
    },
    {
      "name": "salt",
      "type": "string"
    },
    {
      "name": "verifyingContract",
      "type": "string"
    },
    {
      "name": "version",
      "type": "string"
    }
  ],
  "Fee": [
    {
      "name": "amount",
      "type": "Coin[]"
    },
    {
      "name": "gas_limit",
      "type": "uint256"
    },
    {
      "name": "granter",
      "type": "string"
    },
    {
      "name": "payer",
      "type": "string"
    }
  ],
  "Msg1": [
    {
      "name": "amount",
      "type": "TypeMsg1Amount[]"
    },
    {
      "name": "from_address",
      "type": "string"
    },
    {
      "name": "to_address",
      "type": "string"
    },
    {
      "name": "type",
      "type": "string"
    }
  ],
  "Tx": [
    {
      "name": "account_number",
      "type": "uint256"
    },
    {
      "name": "chain_id",
      "type": "uint256"
    },
    {
      "name": "fee",
      "type": "Fee"
    },
    {
      "name": "memo",
      "type": "string"
    },
    {
      "name": "msg1",
      "type": "Msg1"
    },
    {
      "name": "sequence",
      "type": "uint256"
    },
    {
      "name": "timeout_height",
      "type": "uint256"
    }
  ],
  "TypeMsg1Amount": [
    {
      "name": "amount",
      "type": "string"
    },
    {
      "name": "denom",
      "type": "string"
    }
  ]
}
```

2. **MessageData**: This field represents the messages data of the transaction, displayed in a readable format.
```json
{
  "msg1": {
    "amount": [
      {
        "amount": "1000",
        "denom": "BNB"
      }
    ],
    "from_address": "0x0aA5170C854AA093e1c32F15285dE4Bf7f6802Ce",
    "to_address": "0x2123B607e1b9E8Ae65FbE12585C1bE6838Bb32C7",
    "type": "/cosmos.bank.v1beta1.MsgSend"
  }
}
```

3. **TxRawBytes**: This field represents the encoded byte array of the transaction.
```json
0a88010a85010a1c2f636f736d6f732e62616e6b2e763162657461312e4d736753656e6412650a2a307830614135313730433835344141303933653163333246313532383564453442663766363830324365122a3078323132334236303765316239453841653635466245313235383543316245363833384262333243371a0b0a03424e4212043130303012021200
```

Once you have obtained these three fields of the transaction, you can use `gnfd-tx-sender` to send the transaction
instead of using a command. Here are the steps:

1. Visit the [gnfd-tx-sender](https://gnfd-tx-sender.nodereal.io/) website.
2. Connect your wallet and switch to the correct network.
3. Navigate to the `Custom Tx` page and fill in the aforementioned three fields accordingly.
4. Click the `Submit` button and sign in the wallet when prompted.
5. Wait for confirmation.

### Query Commands

Queries are objects that allow users to retrieve information about the application's state. 

This `queryCommand` function adds all the queries available to end-users for the application. This typically includes:

* **QueryTx** and/or other transaction query commands from the `auth` module which allow the user to search for a transaction by inputting its hash, a list of tags, or a block height. These queries allow users to see if transactions have been included in a block.
* **Account command** from the `auth` module, which displays the state (e.g. account balance) of an account given an address.
* **Validator command** from the Cosmos SDK rpc client tools, which displays the validator set of a given height.
* **Block command** from the Cosmos SDK rpc client tools, which displays the block data for a given height.
* **All module query commands the application is dependent on,

Here is an example of a `queryCommand`:

```shell
## query the metadata of BNB
gnfd q bank denom-metadata --node https://greenfield-chain.bnbchain.org:443
```

## Environment variables

Each flag is bound to its respective named environment variable. Then name of the environment variable consist of two parts 
- capital case `basename` followed by flag name of the flag. `-` must be substituted with `_`. 
- For example flag `--home` for application with basename `GNFD` is bound to `GNFD_HOME`. It allows reducing 
the amount of flags typed for routine operations. For example instead of:

```sh
gnfd --home=./ --node=<node address> --chain-id="greenfield_1017-1" tx ... --from=<key name>
```

this will be more convenient:

```sh
# define env variables in .env, .envrc etc
GNFD_HOME=<path to home>
GNFD_NODE=<node address>
GNFD_CHAIN_ID="greenfield_1017-1"
GNFD_KEYRING_BACKEND="file"

# and later just use
gnfd tx ... --from=<key name>
```
