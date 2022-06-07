# Command Line Interface (CLI)

Beacon Chain CLI is one of several ways to interact with Beacon Chain.

Beacon Chain CLI can be used as a local wallet, you can manage your keys via Binance CLI. You can add a new
key or restore your key from mnemonic words. And you can list your keys and show specified key info.

With Beacon Chain CLI, you can send transactions to Beacon Chain, like placing an order, transferring tokens,
issuing tokens and so on. Actually you can do almost everything you can do with Beacon Chain web wallet. What is
more, you can propose to list trading pairs and join chain governance.

In addition, you can do some simple queries through CLI. For example, you can query your account's
balance, transaction detail by transaction hash and etc.

## Where can I download the Beacon Chain CLI?

You can download Beacon Chain CLI releases here: [https://github.com/bnb-chain/node-binary](https://github.com/bnb-chain/node-binary/tree/master/cli)
```
git clone https://github.com/bnb-chain/node-binary.git
```
You can choose to download the version for testnet or mainnet. Replace the network var with `testnet` or` prod` in the following command:
```
cd node-binary/cli/{network}/{version}
```
### CLI installation

Once you have downloaded the binary for your platform, you may drop it into any folder you like. Open a terminal window or `cmd.exe` in that folder, and then follow the examples on the documentation site.

For mainnet:

```bash
$  ./bnbcli
```

On Windows you would most likely use this instead:

```bash
C:\> bnbcli.exe
```

For testnet:
```bash
$  ./tbnbcli
```

On Windows you would most likely use this instead:

```bash
C:\> tbnbcli.exe
```


## Where to connect

You can manage your keys locally without connecting to any node. But if you want to interact with Beacon Chain, you need to connect to one of Beacon Chain full nodes.

You can run your own full node, which may automatically connect to Beacon Chain, and you can run your CLI there with your own full node. In the mean time, you can connect to any full nodes provided by other people.

You could query this API for a list of full node on mainnet: <https://dex.binance.org/api/v1/peers>.

For testnet, visit  <https://testnet-dex.binance.org/api/v1/peers>.

Full nodes will be denoted as the format of `ip:port`, you could use `access_addr` as your peer to get connected, such as `https://dataseed4.defibit.io:443`

Please note that there are two types of nodes that offer RPC services. Some support TLS and others don't.

## Which Chain-ID to use

`chain-id` is an important field to fill for every transaction sent from `bnbcli`. The` chain-id` for mainnet is `Binance-Chain-Tigris`, and is `Binance-Chain-Ganges` for testnet. Please choose the correct one in your case.
## Which Private Key To Use

There are two ways for you to sign transaction：

* Use Local Keystore File

This is the default way to sign transactions with `bnbcli`. It will use the encrypted  keystore files saved at bnbcli home. You need to specify which key to decrypt with `--from`.

* Use Private Key in Hardware Wallet

First, you must add `--ledger` when creating a new address. For example,
```
bnbcli keys add test --ledger --index 0 --account 0
```
Then,  the private key file in ledger will be used to generate a new address.

You could also specify `--account` and `--index` to generate more addresses. After the generation, you could use Ledger for signing.

When you use the address to sign transactions, `bnbcli` will send transactions to Ledger and get signatures. Then `bnbcli` build the signed transactions and boardcast them to full nodes.

## Key manager

Here we support two types of key: local key and leder key

### Local key
* Create a local key
```
bnbcli keys add test_key
```
The newly created local key will be encrypted and saved to the local keystore.
* Sign transaction with a local key
```
bnbcli send --chain-id=<chain-id> --from=test_key --amount=100:BNB --to=<address>
```
For instance, if you want to send a token transfer transaction, you can use the above command. The flag `--from` is used to specify which key should be used to sign the transaction.

###  Ledger key
* Create a local key

Before creating a new ledger key, make sure you have performed these steps:
1. Ledger device is installed binance ledger app and the version should be later or equal to **v1.1.3**.
2. Connect your ledger device to your machine and input pin code to unlock it.
3. Open the binance ledger app on your ledger device.
```
bnbcli keys add test_ledger_key --ledger
```
Execute the above command to create a ledger key. The private key is only stored in your ledger device. And your local key store will save the corresponding publick key and address.
```
bnbcli keys add test_ledger_key_new --ledger --index 0 --account 0
```
You can also specify --account and --index to generate more keys.

* Sign transaction with a ledger key

Taking transfer transaction for example, please follow these steps:
1. Execute command in your console:
```
bnbcli send --chain-id=<chain-id> --from=test_ledger_key --amount=100:BNB --to=<address>
```
2. Your console will print some message like this:
```
Please confirm if address displayed on ledger is identical to bnb15339dcwlq5nza4atfmqxfx6mhamywz35evruva (yes/no)?
```
3. User can click confirm button on ledger device and input yes to continue following steps.
4. Then user can preview the transaction data on ledger screen.
5. After going through all transaction data, user can select `sign transaction` or` reject`.
6. After user selects `sign transaction`, `bnbcli` will get the signature and broadcast the signed transaction to blockchain nodes.

## How to use

When you have downloaded Beacon Chain CLI, you can use `help` subcommand to see all the available commands:

```bash
$  ./bnbcli help
BNBChain light-client

Usage:
  bnbcli [command]

Available Commands:
  init        Initialize light client
  status      Query remote node for status

  txs         Search for all transactions that match the given tags.
  tx          Matches this txhash over all committed blocks

  account     Query account balance
  send        Create and sign a send tx
  transfer

  api-server  Start the API server daemon
  keys        Add or view local private keys

  version     Print the app version
  token       issue or view tokens
  dex         dex commands
  gov         gov commands
  help        Help about any command

Flags:
  -e, --encoding string   Binary encoding (hex|b64|btc) (default "hex")
  -h, --help              help for bnbcli
      --home string       directory for config and data (default "/root/.bnbcli")
  -o, --output string     Output format (text|json) (default "text")
      --trace             print out full stack trace on errors

Use "bnbcli [command] --help" for more information about a command.
```

**Note**:there is one special flag `--trust-node` of most subcommands, if not enabled which is by default the CLI
will take an extra 2-4 seconds to verify blockchain proof at current height. You can enable that flag if the peer is trustful so that most commands will accomplish in 500 milliseconds. If your node cannot prove the transaction, there will be the following notice:
```
Create verifier failed: Commit: Response error: RPC error -32603 - Internal error: runtime error: invalid memory address or nil pointer dereference
Please check network connection and verify the address of the node to connect to
```
To solve this issue, you need to set `--trust-node` to `true`



## CLI Reference

For detailed usage, you can refer to:

- [transfer](../../transfer.md)
- [trade](../../trade.md)
- [issue](../../tokens.md)
- [governance](../../governance.md)
- [list](../../list.md)
- [keys](../../keys.md)
- [offline](../../offline.md)
- [timelock](../../timelock.md)
- [memo validation](../../memo-validation.md)
- [staking](../../learn/bc-staking.md)
- [slashing](../../learn/bc-slashing.md)
- [bridge](../../learn/bc-bridge.md)
- [Binance Smart Chain Governance](../../learn/bsc-gov.md)



## Use CLI for Different Blockchains

`bnbcli` will save data about validatorset changes at home of `bnbcli`. If you want to use `bnbcli` for different blockchains, for example, you want to change from testnet to mainnet, the data will be stale. In order to switch between blockchains, you need clean the data folder with `rm -rf ~/.bnbcli/.bnblite/`  or create a new home folder for bnbcli with `--home` flag.
If you forget to specify a different home folder path, then you will not be able to make queries with `bnbcli`.

The same logic applies to `tbnbcli`.
