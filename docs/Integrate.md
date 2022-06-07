---
sidebar_label: Integration
sidebar_position: 2
hide_table_of_contents: false
---

## Public Services
There are public nodes running by BNB Chain community which will allow you to interact with the blockchain.

### REST API
[Accelerated nodes](https://docs.bnbchain.org/docs/beaconchain/faq/faq#what-is-the-accelerated-node) provide advanced API services for the public.<br/>
The list of all the Rest API information available on accelerated node can be found: [here](api-reference/dex-api/paths.md)

### Node RPC
There are multiple data seed nodes in the network which allow users to  perform low-level operations like executing ABCI queries, broadcasting a transaction or viewing network/consensus state.<br/>
If you run a full node by yourself, you can also use those RPC functions.<br/>
List of all endpoints Node RPC service provides can be found: [here](api-reference/node-rpc.md)

## Running a Full Node
Running a full node requires considerable computational/bandwidth resources.<br/>
Please refer to this guide about [how to run your own node](validator/fullnode.md).

## Access via Node Command Line Interface (CLI)
Command Line Interface is currently available for Linux, Mac and Windows.<br/>
Please refer to the [CLI Reference](api-reference/cli.md).

## SDKs
There are multiple advanced SDK solutions available for BNB Chain. The majority of SDKs provide simplified functions to:

- Create wallets and manage keys
- Encode/sign transactions and submit to Beacon Chain/DEX, including Transfer, New Order, Cancel Order, etc.
- Communicate with Beacon Chain/DEX via Node RPC calls through public node RPC services or your own private full nodes

List of currently available SDKs and their respective documentations:

- [Go](https://github.com/bnb-chain/go-sdk) - [Documentation](https://github.com/bnb-chain/go-sdk/wiki)
- [Java](https://github.com/bnb-chain/java-sdk) - [Documentation](https://github.com/bnb-chain/java-sdk/wiki)
- [JavaScript](https://github.com/bnb-chain/javascript-sdk) - [Documentation](https://github.com/bnb-chain/javascript-sdk/wiki)
- [C++](https://github.com/bnb-chain/cplusplus-sdk) - [Documentation](https://github.com/bnb-chain/cplusplus-sdk/wiki)
- [C#](https://github.com/bnb-chain/csharp-sdk) - [Documentation](https://github.com/bnb-chain/csharp-sdk)
- [Python](https://github.com/bnb-chain/python-sdk) - [Documentation](https://python-bnb-chain.readthedocs.io/en/latest/bnb-chain.html#module-binance_chain)
- [Swift](https://github.com/bnb-chain/swift-sdk) - [Documentation](https://github.com/bnb-chain/swift-sdk/blob/master/README.md)

## Important: Ensuring Transaction Finality

If you intend to add "deposit" and "withdrawal" functionalities to your implementation, it is important that you ensure that transactions are final before the backend system credits or deducts funds from a user account.

In brief, transactions pass through several [phases](https://tendermint.com/docs/spec/abci/abci.html#overview) before they are finalised and included in a block.

The status "code" recorded for each of these phases can differ, so be sure to check that it is `0` (meaning success) for each of them. A non-zero "code" indicates that there was a problem with the transaction during processing.

For example, [this transaction](https://explorer.binance.org/tx/F296E84917A92FC4876AFE77DE662CC9417F9D6F2EB8ED1AD723A5433EBB8362) was invalid because the order was already canceled. You can query that the code for this transaction is `405`.
```json
{
code: 393621,
hash: "F296E84917A92FC4876AFE77DE662CC9417F9D6F2EB8ED1AD723A5433EBB8362",
height: "30771453",
log: "{"codespace":6,"code":405,"abci_code":393621,"message":"Failed to find order [E0B781A5DA419E0E596D13FE8A06BF5F9CE9C37D-19450]"}",
ok: false,
tx: {
type: "auth/StdTx",
value: {
data: null,
memo: "",
msg: [
{
type: "dex/CancelOrder",
value: {
refid: "E0B781A5DA419E0E596D13FE8A06BF5F9CE9C37D-19450",
sender: "bnb1uzmcrfw6gx0quktdz0lg5p4lt7wwnsmat6ksd6",
symbol: "BNB_TUSDB-888"
}
}
],
signatures: [
{
account_number: "153135",
pub_key: {
type: "tendermint/PubKeySecp256k1",
value: "AzWMnQAwvCP9mbpNyaGuOtNVum1ktvlBb+XFy8D50xmh"
},
sequence: "19452",
signature: "y2FTS4rAqWvDmNWLxsOg+8vrz9XZ4gDXs/tGh/psnQwRMQBtw1x1a2TSCgc0G4qbvh0YICe5ZvJFRNvg/zGG7w=="
}
],
source: "889"
}
}
}
```

The two phases we should be concerned about are `CheckTx` and `DeliverTx`.

We recommend that you broadcast your transactions via [REST API](#rest-api) or, if you wish to run a [Full Node](#full-node), [Node RPC](#node-rpc) via the `BroadcastTxSync` command.

While there is an RPC command called `BroadcastTxCommit` which will wait for both `CheckTx` and `DeliverTx` and return with codes for both and a block height, it is unfortunately [not recommended for use in production](https://github.com/tendermint/tendermint/blob/e3a97b09814bf9289e8c10420af38ce369160752/rpc/core/mempool.go#L154).

Instead, there are two ways that you can go about checking the status of your transaction after you have broadcasted it.

If you haven't received anything after a couple of blocks, resend the transaction. If the same happens again, send it to some other node. This is safe to do so long as you are broadcasting the *same* transaction. Transactions are unique in the blockchain and you cannot spend the coins twice by retrying the send of the same data.

### The Recommended Way (via WebSocket)

If you want to be sure that the transaction is included in a block, you can subscribe for the result using JSONRPC via a websocket. See [Subscribing to Events via WebSocket](https://docs.bnbchain.org/docs/beaconchain/develop/api-reference/node-rpc#631-subscribe).

### The Alternative Way (via RPC Polling)

Some of the SDKs do not yet support WebSocket subscriptions for RPC queries, so this may be the preferable option in some use cases.

You can use the `Tx` RPC method to query for the transaction and get its block height. Here is an example using the JavaScript SDK:

```js
> rpc.tx({
  hash: Buffer.from('B2EF71DAEB86385E64F6C0B923636ADE5510B3C34C07D19EE5A114FC9075273D', 'hex'),
  prove:false
}).then(x => console.log('',x))
{
  hash: 'B2EF71DAEB86385E64F6C0B923636ADE5510B3C34C07D19EE5A114FC9075273D',
  height: '30261607',
  index: 0,
  tx_result: { log: 'Msg 0: ', tags: [ [Object], [Object], [Object] ] },
  tx: '0AHwYl3uCkwqLIf6CiIKFLjeOPB9sCxE5v+lpkRhnPu+K1ahEgoKA0JOQhCMy5ZfEiIKFI6nDX0uqKFLorM9GNXfvW+uCm6oEgoKA0JOQhCMy5ZfEnEKJuta6YchA6Xy63LJBSKNsW1nkGMbPyvWl7VDeD/lVByJrtnB3v1kEkA243QKSCn5GxFSTFbh6EA8ZuqdO+0UTR8+Vq7CDikOzCIpuRo95Ww7zak0qXRmL3/shGkwHcvB4l9ofF61mSQgGKfQCSDDARoJMTAxNzg5MTEz'
}
```

If the Transaction does not yet exist in the blockchain, this attempt will return with an error.

You should check for an absent "code" field in the `tx_result`: this indicates a code of `0`. You could also perform further checks on the `log` to make sure that it matches the expected value.
