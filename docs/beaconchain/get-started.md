# Get Started with Beacon Chain 

## Wallet

The easiest way to use Beacon Chain  is through a wallet with support for Beacon Chain  accounts and transfers.

For example, Binance provides a Web Wallet at [https://www.binance.org](https://www.binance.org)<br/>
Binance also provides Web Wallet for testnet at [https://testnet.binance.org](https://testnet.binance.org)<br/>
Both provide the functions below:

- Generating crypto keys and addresses, which serves as the base of a wallet
- Showing the balances of assets on the addresses
- Sending and receiving assets

Beacon Chain  Web Wallet also presents a trading UI similar to Binance.com, where you can examine market data and manage your orders to trade among the listed assets.<br/>
Learn about the list of wallet available [here](wallets.md).

## Chain Explorer
Chain Explorer provides a portal to explore blocks and transaction details.<br/>
On Beacon Chain  Explorer, you can also check different asset types, the distribution of their ownerships, and owners' transactions.

## REST API
There are [Accelerated Nodes](faq/faq.md#what-is-the-accelerated-node) which provide advanced API services for the public.<br/>
Here is a list of all the Rest API information Accelerated Node provides: [paths](./api-reference/dex-api/paths.md)

### Node RPC
There are data seed nodes in the network which allow users to perform low-level operations like executing ABCI queries, viewing network/consensus state or broadcasting a transaction.
If you run a full node by yourself, you can also use those RPC functions. Here is a list of all the Node RPC services it provides: [node-rpc](./api-reference/node-rpc.md)

## Advanced Ways To Use Blockchain
### Run your own full node

Please refer to this guide about [how to run your own node](fullnode.md).

### Run your own light client

Please refer to this guide about [how to run your own light client](light-client.md).

### Access via Node Command Line Interface (CLI)

A Command Line Interface is available for Linux and Mac platforms.<br/>
Please refer to the [CLI Reference](./api-reference/cli.md).

### Use SDKs

SDKs are also provided as a starting point for your apps.<br/>
There are two advanced SDK solutions for Beacon Chain : [Java](<https://github.com/bnb-chain/java-sdk>) and [Golang](<https://github.com/bnb-chain/go-sdk>).<br/>
Both solutions provide functions for:<br/>

* Create wallets and manage keys
* Encode/sign transactions and submit to Beacon Chain /DEX, including Transfer, New Order, Cancel Order, etc.
* Communicate with Beacon Chain /DEX Node RPC calls through public node RPC services or your own private full nodes

Please refer to specific SDK documentation for more information:

- [Go](https://github.com/bnb-chain/go-sdk)([Documentation](https://github.com/bnb-chain/go-sdk/wiki))
- [Java](https://github.com/bnb-chain/java-sdk)([Documentation](https://github.com/bnb-chain/java-sdk/wiki))
- [Javascript](https://github.com/bnb-chain/javascript-sdk) ([Documentation](https://github.com/bnb-chain/javascript-sdk/wiki))
- [C++](https://github.com/bnb-chain/cplusplus-sdk)([Documentation](https://github.com/bnb-chain/cplusplus-sdk/wiki))
- [C#](https://github.com/bnb-chain/csharp-sdk)([Documentation](https://github.com/bnb-chain/csharp-sdk))
- [Python](https://github.com/bnb-chain/python-sdk)([Documentation](https://python-bnb-chain.readthedocs.io/en/latest/bnb-chain.html#module-binance_chain))
- [Swift](https://github.com/bnb-chain/swift-sdk)([Documentation](https://github.com/bnb-chain/swift-sdk/blob/master/README.md))


## Blockchain Details
Please check the [technical details](index.md#technology-details) for more technical information.
