---
sidebar_label: Cross-Chain Models
sidebar_position: 2
hide_table_of_contents: false
---

# Cross-Chain Models

The Cross-chain framework has been introduced in the [Design Section](../design/design-principles.md). Here more
details about the communication layer and economics will be explained.

## Communication Channels and Packages

### Vote Poll

A new P2P communication across the cross-chain relayers will be
introduced, called "**Vote Poll**". This Vote Poll will gossip about the
signed votes within the network. To avoid message flooding, all the
signed votes will expire after a fixed time. The Greenfield relayers can
either put votes to or fetch votes from the poll and assemble it as
cross-chain package transactions.

### Channel and Sequence

To allow multiplexing and replay attack resistance, "**Channel**" and
"**Sequence**" concepts are introduced to manage any type of communication.
Following is an example definition:

```go
type Package struct {
    PackType     uint8 // SYN, ACK or FAIL_ACK
    SrcChainId   uint16
    DstChainId   uint16
    Sequence     int64
    ChannelId    uint16
    Payload      []byte
    BLSSignature sdk.Sig
    BLSBits      sdk.Bits // indicate the signer of the package
}
```

The packages in the same channel must be processed in sequence, while
they can be processed in parallel if they belong to different channels.

The operation messages on different Greenfield resources are mapped to
different channels. For example, buckets and storage objects belong to
different channels.

### Reliability Protocol

Here a protocol is defined to ensure reliable stream delivery of data
between BSC and Greenfield.

The protocol must recover the scenarios when the cross-chain data is
damaged, duplicated, or delivered out of order by the relayers. It
assigns a sequence number to each package and requires a positive
acknowledgment (ACK) from the target chain. Here there are three kinds
of packages:

   **1.** **SYN:** the initial cross-chain packages started by either users or dApps.

   **2.** **ACK:** the positive acknowledgment sent by the resource layer of the target chain.

   **3.** **FAIL_ACK:** the negative acknowledgment sent by the communication layer of the target chain, usually caused by damaged data or protocol inconsistency triggered by the edge case.

Each communication package must start with `SYN` and end with `ACK` or
`FAIL_ACK`. The handler code and contracts on each side must handle these
primitives.

### Validator Update

With an aggregatable multi-signature scheme, e.g. BLS, the cross-chain
can be quite light-weighted. However sufficient data must be appended
onto the package to indicate the validators who sign the events, this
can be achieved by combining a bitmap and a validator set on-chain.
However the Greenfield validator set is volatile, Greenfield validators
have to sync the information to BSC once there is an update about the
Greenfield validator set. This is implemented by building a Greenfield
light client on BSC, which is similar to the light client implemented
for BNB Beacon Chain on BSC.

## Economic

The Greenfield relayers play an important role in relaying inter-chain
packages. A proper incentive is required to keep relayers making their
long-term contribution.

### Fee and Reward of Cross-Chain Packages

Both `SYN` and `ACK/FAIL_ACK` packages cost gas to relay, the users (or
smart contracts) will need to pay the fee to cover both of them when
they start the SYN cross-chain packages.

To encourage Greenfield relayers to sign cross-chain packages:

   **1.** The package deliverer will get a fixed ratio of the relay fee as a reward.

   **2.** The rest relay fee will be distributed equally among those who sign the vote.

### Race to Deliver Cross-Chain Packages

There are multiple Greenfield relayers, and they may compete to submit
the aggregated multi-signed packages onto the Greenfield blockchain and
BSC. To avoid racing transactions caused by the competition, which
wastes gas, the relayers are rotated to relay transactions, e.g. taking
shifts every 10 minutes. Each cross-chain package gets a timestamp, if
it is not relayed within a limited delay when the designated relayer
doesn't perform the duty, any other Greenfield relayers are allowed to
relay such a package.

### Callbacks and Limited Gas

BSC dApps, i.e. smart contracts on BSC, are allowed to implement their
own logic to handle `ACK` or `FAIL_ACK` packages. The smart contracts can register callback functions to handle the `ACK` packages. As it is
impossible for the cross-chain infrastructure to predict the gas
consumption of the callback, a gas limitation estimate should be defined
from the smart contracts that register the callbacks.

For any cross-chain packages that start from BSC, the smart contract
needs to specify the gas limitation for the `ACK` or `FAIL_ACK` package, the relayer fee is prepaid accordingly on BSC. Relayers may refund the excessive fees later.

### Cross-Chain Infrastructure Contracts on BSC

The cross-chain logic is also implemented on Greenfield as smart
contracts. But these contracts will not be implemented on BSC as the
genesis contract anymore, but just upgradeable contracts. The upgrade
will be controlled by the agreement of the Greenfield validators through
a governance process. The design can take full advantage of normal
contracts, such as working around the 24k size limitation by delegating
different logic to different implementation contracts.

## Error and Failure Handling

There are errors and failures that can happen during cross-chain
communication.

One type of error is from the cross-chain protocol itself and is marked
by "**FAIL_ACK**". This means the protocol itself meets some fatal errors, and it cannot complete the cross-chain package transport even before it touches the layer above the communication layer. It is usually caused by system bugs that result in data corruption or inconsistency.

The other type is the error above the communication layer, for example,
the errors triggered by improper logic or bugs in the resource mirror
layer or the application layer. Such cases should still return "ACK" at
the communication layer, but the ACK package should contain enough
information for the resource mirror layer or the application layer to
recover to the original state.

![cross-chain-error-and-failure-handling](../../../static/img/assets/greenfield/22.3-Error-and-Failure-Handling.jpg)

<div align="center"><i>Cross-chain Error and Failure Handling</i></div>

When Greenfield emits an `ACK` or `FAIL_ACK` package, the registered
callbacks of BSC dApps (i.e. the smart contracts) will be called up to
handle the package, but these functions may fail to handle the
`ACK/FAIL_ACK` packages due to the bugs or exceptions in the callbacks,
these packages will be put under in another queue that belongs to the
BSC dApps.

The corresponding BSC dApps can retry the package, e.g. with a higher
gas limit, or just skip the package to tolerate failure, or even upgrade
its contract to handle corner cases. The BSC dApps can not start new
cross-chain packages if there are any pending failed packages in their
queue. It asks the BSC dApps must handle the failed packages in
sequence.

The communication layer can catch any exception thrown by the resource mirror layer or application layer, so that package delivery won't be blocked by any customized applications.
