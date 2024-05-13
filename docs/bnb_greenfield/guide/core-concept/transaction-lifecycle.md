---
title: Transaction Lifecycle
order: 7
---

# Transaction Lifecycle

This document describes the lifecycle of a transaction from creation to the committed state changes.
The majority of this page is copied from the [Cosmos-sdk Docs](https://docs.cosmos.network/main/basics/tx-lifecycle).
Transaction definition is described in a [different doc](https://github.com/bnb-chain/greenfield-cosmos-sdk/blob/master/docs/core/transactions.md). 
The transaction will be referred to as `Tx`.

## Creation

### Transaction Creation

There are various ways to create transactions. 
While the command-line is a straightforward method to interact with an application, transactions can also be generated through a [gRPC or REST interface](../../api/blockchain-rest.md) or another entry point specified by the application developer. 
The interaction between the user and the application varies based on the web interface or wallet they use. 
For example, users can create `Tx` through platforms like [Lunie.io](https://lunie.io/#/) and sign them using a Ledger Nano S.

#### Transaction Creation via Command Line
One of the main application interfaces is the command-line interface. The transaction `Tx` can be created by the user 
inputting a command in the following format from the [command-line](../../api/blockchain-cli/README.md), providing the type of transaction 
in `[command]`, arguments in `[args]`, and configurations such as gas prices in `[flags]`:

```bash
gnfd tx [command] [args] [flags]
```

This command will automatically **create** the transaction, **sign** it using the account's private key, and **broadcast** 
it to the specified peer node.

There are several required and optional flags for transaction creation. The `--from` flag specifies which [account](accounts.md) 
the transaction is originating from. For example, if the transaction is sending coins, the funds will be drawn from the specified `from` address.

##### Gas and Fees

Additionally, there are several [flags](../../api/blockchain-cli/README.md) users can use to indicate how much they are willing to pay in [fees](gas-fees.md):

* `--gas` refers to how much [gas](gas-fees.md). Different from other cosmos blockchain where gas represents computational 
resources, on greenfield blockchain, the gas of a transaction is predefined. It is suggested to be estimated by providing `auto` 
as the value for `--gas`.
* `--gas-prices` specifies how much the user is willing to pay per unit of gas, which can be one or multiple denominations of tokens. 
For example, `--gas-prices=5000000000BNB` means the user is willing to pay 5Gwei BNB per unit of gas.
* `--fees` specifies how much in fees the user is willing to pay in total.
* `--timeout-height` specifies a block timeout height to prevent the tx from being committed past a certain height.

The ultimate value of the fees paid is equal to the gas multiplied by the gas prices. In other words, `fees = ceil(gas * gasPrices)`. 
Thus, since fees can be calculated using gas prices and vice versa, the users specify only one of the two.

Later, validators decide whether to include the transaction in their block by comparing the given or calculated 
`gas-prices` to their local `min-gas-prices`. `Tx` will be rejected if its `gas-prices` is not high enough, so users 
are incentive to pay more.

##### CLI Example

Users of the application `app` can enter the following command into their CLI to generate a transaction to send 
1000wei BNB from a `senderAddress` to a `recipientAddress`. 

```bash
gnfd tx send <recipientAddress> 1000BNB --from <senderAddress> --gas auto
```

## Add transactions to the Mempool

Each full-node (running Tendermint) that receives a `Tx` sends an [ABCI message](https://docs.tendermint.com/master/spec/abci/abci.html#messages),
`CheckTx`, to the application layer to check for validity, and receives an `abci.ResponseCheckTx`. 
If the `Tx` passes the checks, it will be added to the Mempool of each node. The [**Mempool**](https://docs.tendermint.com/master/tendermint-core/mempool/) 
is an in-memory pool of transactions that is unique to each node, and the transaction will remain pending until it is included in a block. 
honest nodes will discard `Tx` if it is found to be invalid. 
Prior to consensus, nodes continuously check incoming transactions and gossip them to their peers.

In this section, we will provide you with details on the functions that are used to add a transaction to the Mempool and how they work.

### Types of Checks

The full-nodes perform stateless, then stateful checks on `Tx` during the `CheckTx` ABCI function, with the goal to
identify and reject an invalid transaction as early on as possible to avoid wasted computation.

**_Stateless_** checks do not require nodes to access state - light clients or offline nodes can do
them - and are thus less computationally expensive. Stateless checks include making sure addresses
are not empty, enforcing non-negative numbers, and other logic specified in the definitions.

**_Stateful_** checks validated transactions and messages based on a committed state. 
Some examples of the checks that a transaction goes through include verifying that the necessary values are present and 
can be transacted, checking if the sender is authorized to transact or has the correct ownership, 
and ensuring that the address has sufficient funds.
At any given moment, full-nodes typically have multiple versions
of the application's internal state for different purposes. For example, nodes will execute state
changes while in the process of verifying transactions, but still need a copy of the last committed
state in order to answer queries - they should not respond using state with uncommitted changes.

In order to verify a `Tx`, full-nodes call the `CheckTx` ABCI function, which includes both _stateless_ and _stateful_
checks. Further validation happens later in the [`DeliverTx`](#delivertx) stage. `CheckTx` goes
through several steps, beginning with decoding `Tx`.

### Decoding the transactions

When a `Tx` is received by the application from the underlying consensus engine (e.g. Tendermint), it is still in 
its encoded `[]byte` form and needs to be unmarshalled in order to be processed. Then, 
the `runTx` function is executed in the `runTxModeCheck` mode. This mode runs all checks but 
exit before executing messages and writing state changes.

### Confirm the transactions messages (ValidateBasic)

Messages `sdk.Msg` are extracted from `Tx`. The `ValidateBasic` method of the `sdk.Msg` 
interface implemented by the module developer is run for each transaction.
To discard obviously invalid messages, the `BaseApp` type calls the `ValidateBasic` method very early in the 
processing of the message in the `CheckTx` and `DeliverTx` transactions.
`ValidateBasic` can include only **stateless** checks (checks that do not require access to the state).

### AnteHandler

After the `ValidateBasic` method have done the checking, the `AnteHandler`s are run. The `AnteHandler` is a set of 
modules that check transactions validity. Technically, they are optional, but in practice, 
they are very often present to perform signature verification, gas calculation, fee deduction and other 
core operations related to blockchain transactions.

A copy of the cached context is provided to the `AnteHandler`, which performs limited checks specified 
for the transaction type. Using a copy allows the `AnteHandler` to do stateful checks for `Tx` without 
modifying the last committed state, and revert to the original if the execution fails.

### Gas Payment Process

The `Context`, which keeps a `GasMeter` that will track how much gas has been used during the execution of `Tx`, 
is initialized. The user-provided amount of gas for the `Tx` is known as `GasWanted`. If the `GasConsumed` parameter, 
the amount of gas consumed during the execution, ever exceeds the `GasWanted` amount, the execution will stop and the changes 
made to the cached copy of the state won't be committed. Otherwise, the `CheckTx` ABCI function sets the amount of `GasUsed` 
at the same value as `GasConsumed` and returns it in the result. 
After calculating the gas and fee values, validator-nodes check that the user-specified 
`gas-prices` is greater than their locally defined `min-gas-prices`.

### Discard or Addition of transactions to Mempool

If the `Tx` fails at any point during `CheckTx`, it is discarded, and the transaction lifecycle ends at that point. Otherwise, if it passes `CheckTx` successfully, the default protocol is to relay it to peer
nodes and add it to the Mempool so that the `Tx` becomes a candidate to be included in the next block.

The **mempool** serves the purpose of keeping track of transactions seen by all full-nodes.
Full-nodes keep a **mempool cache** of the last `mempool.cache_size` transactions they have seen, as a first line of
defense to prevent replay attacks. Ideally, the `mempool.cache_size` is large enough to encompass all
the transactions in the full mempool. If the mempool cache is too small to keep track of all
the transactions, `CheckTx` is responsible for identifying and rejecting replayed transactions.

Currently existing preventative measures include fees and a `sequence` (nonce) counter to distinguish
replayed transactions from identical but valid ones. If an attacker tries to spam nodes with many
copies of a `Tx`, full-nodes keeping a mempool cache will reject identical copies instead of running
the `CheckTx` function on all of them. Even if the copies have incremented `sequence` numbers, attackers are
disincentivized by the need to pay fees.

Validator nodes keep a mempool to prevent replay attacks, just as full-nodes do, but also use it as
a pool of unconfirmed transactions in preparation of block inclusion. Note that even if a `Tx`
passes all checks at this stage, it is still possible to be found invalid later on, because
`CheckTx` does not fully validate the transaction (i.e. it does not actually execute the messages).

## Inclusion in a Block

Consensus occurs in **rounds**, during which validator nodes agree on which transactions to accept.
Each round begins with a proposer creating a block of the most
recent transactions and ends with [**validators**](../getting-started/ecosystem.md#validators), special full-nodes with voting power responsible
for consensus, agreeing to accept the block or go with a `nil` block instead. Validator nodes execute the consensus algorithm, the [Tendermint BFT](https://docs.tendermint.com/master/spec/consensus/consensus.html#terms), confirming the transactions using ABCI requests to the application, in order to come to this agreement.

The first step of consensus is the **block proposal**. One proposer amongst the validators is chosen by the consensus algorithm to create and propose a block - in order for a `Tx` to be included, it must be in this proposer's mempool.

## State Changes

The next step of the consensus is to execute the transactions to fully validate them. All full-nodes that receive a block proposal from the correct proposer execute the transactions by calling the ABCI functions
`BeginBlock`, `DeliverTx` for each transaction, and `EndBlock`. While each full-node runs everything locally, this process yields a single, unambiguous result, since the messages' state transitions are deterministic and transactions are explicitly ordered in the block proposal.

```text
		-----------------------
		|Receive Block Proposal|
		-----------------------
		          |
			  v
		-----------------------
		| BeginBlock	      |
		-----------------------
		          |
			  v
		-----------------------
		| DeliverTx(tx0)      |
		| DeliverTx(tx1)      |
		| DeliverTx(tx2)      |
		| DeliverTx(tx3)      |
		|	.	      |
		|	.	      |
		|	.	      |
		-----------------------
		          |
			  v
		-----------------------
		| EndBlock	      |
		-----------------------
		          |
			  v
		-----------------------
		| Consensus	      |
		-----------------------
		          |
			  v
		-----------------------
		| Commit	      |
		-----------------------
```

### DeliverTx ABCI function

The `DeliverTx` ABCI function, defined in the `BaseApp` type, does the bulk of the
state transitions: the function is executed for each transaction in the block in sequential order as committed
to during consensus. Under the hood, `DeliverTx` is almost identical to the `CheckTx` function but calls the
`runTx` function in the deliver mode instead of using the check mode.
Instead of using their `checkState`, full-nodes use `deliverState`:

* **Decoding:** Since `DeliverTx` is an ABCI call, the `Tx` is received in the encoded `[]byte` form.
  First, the nodes unmarshal the transaction using the `TxConfig` defined in the app. 
  Then, they call `runTx` in `runTxModeDeliver`, which is similar to `CheckTx` 
  but also executes and writes state changes.

* **Checks and AnteHandler:** Full-nodes call the `validateBasicMsgs` and the `AnteHandler` again. This second check
  happens because they may not have seen the same transactions during the addition to Mempool stage
  and a malicious proposer may have included invalid ones. One difference here is that the
  `AnteHandler` will not compare the `gas-prices` variable to the node's `min-gas-prices` variable since that value is local
  to each node - differing values across nodes would yield nondeterministic results.

* **`MsgServiceRouter`:** While `CheckTx` would have exited, `DeliverTx` continues to run
  the `runMsgs` function to fully execute each `Msg` service method within the transaction.
  Since the transaction may have messages from different modules, the `BaseApp` type needs to know which module
  to find the appropriate handler. This is achieved using the `BaseApp`'s `MsgServiceRouter` router so that it can be processed by 
  the module's Protobuf `Msg` service.

* **`Msg` service:** Protobuf `Msg` service is responsible for executing each message in the `Tx` and causes
  state transitions to persist in `deliverTxState`.

* **PostHandlers:** `PostHandler`s run after the execution of the message. If they fail, the state change of `runMsgs`, 
  as well of `PostHandlers` are both reverted.

* **Gas:** While a `Tx` is being delivered, a `GasMeter` is used to keep track of how much
  gas is being used; if execution completes, `GasUsed` is set and returned to the
  `abci.ResponseDeliverTx`. If execution halts because `BlockGasMeter` or `GasMeter` has run out or something else goes
  wrong, a deferred function at the end appropriately errors or panics.

If there are any failed state changes resulting from a `Tx` being invalid or `GasMeter` running out,
the transaction processing terminates and any state changes are reverted. Invalid transactions in a
block proposal cause validator nodes to reject the block and vote for a `nil` block instead.

### Commit the Block

The final step is for the nodes to commit the block and state changes. Validator nodes
perform the previous step of executing state transitions in order to validate the transactions,
then sign the block to confirm it. Full nodes that are not validators do not
participate in consensus - i.e. they cannot vote - but listen for votes to understand whether they should commit the state changes.

When they receive enough validator votes (2/3+ _precommits_ weighted by voting power), full nodes commit to a new block to be added to the blockchain and
finalize the state transitions in the application layer. A new state root is generated to serve as
a merkle proof for the state transitions. Applications use the `Commit`
ABCI method inherited from `Baseapp`; it syncs all the state transitions by
writing the `deliverState` into the application's internal state. As soon as the state changes are
committed, `checkState` start afresh from the most recently committed state and `deliverState`
resets to `nil` in order to be consistent and reflect the changes.

**Notes**: 
- Not all blocks have the same number of transactions, and it is possible for consensus to
result in a `nil` block or one with none at all. 
- In a public blockchain network, it is possible
for validators to be **byzantine**, or malicious, which may prevent a `Tx` from being committed in
the blockchain. Possible malicious behaviors include the proposer deciding to censor a `Tx` by
excluding it from the block or a validator voting against the block.

At this point, the transaction lifecycle of a `Tx` is over: nodes have verified its validity,
delivered it by executing its state changes, and committed those changes. The `Tx` itself,
in `[]byte` form, is stored in a block and appended to the blockchain.
