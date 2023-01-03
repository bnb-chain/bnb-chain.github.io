---
sidebar_label: Architecture
sidebar_position: 2
hide_table_of_contents: false
---
# Cross-Chain Communication

Cross-chain communication is the key foundation to allow the community to take advantage of the dual chain structure:
- users are free to create any tokenization, financial products, and digital assets on BSC or BC as they wish.
- the items on BSC can be manually and programmingly traded and circulated in a stable, high throughput, lighting fast and friendly environment of BC.
- users can operate these in one UI and tooling ecosystem.

## Architecture Diagram
![img](../../static/img/cross-transfer-architecture.png)

A native cross chain communication protocol is developed between BC (Beacon Chain) and BSC (BNB Smart Chain). It has the following key parts:

* [Build-in System Contract](system-contract.md)
* [Oracle on Beacon Chain](oracle-module.md)
* [BSC Relayer](bsc-relayer.md)
* [BSC Relayer Incentive Mechanism](incentives.md)
* [Oracle Relayer](oracle-relayer.md)

## BC to BSC Architecture

BC is a Tendermint-based, instant finality blockchain. Validators with at least ⅔\*N+1 of the total voting power will co-sign each block on the chain. So that it is practical to verify the block transactions and even the state value via **Block Header** and **Merkle Proof** verification. This has been researched and implemented as "**Light-Client Protocol**", which are intensively discussed in [the Ethereum](https://github.com/ethereum/wiki/wiki/Light-client-protocol) community, studied and implemented for [Cosmos inter-chain communication](https://github.com/cosmos/ics/blob/a4173c91560567bdb7cc9abee8e61256fc3725e9/spec/ics-007-tendermint-client/README.md).

BC-to-BSC communication will be verified in an "**on-chain light client**" implemented via BSC **Smart Contracts** (some of them may be **"pre-compiled"**). After some transactions and state change happen on BC, if a transaction is defined to trigger cross-chain communication,the Cross-chain "**package**" message will be created and **BSC Relayers** will pass and submit them onto BSC as data into the "build-in system contracts". The build-in system contracts will verify the package and execute the transactions if it passes the verification. The verification will be guaranteed with the below design:

1. BC blocking status will be synced to the light client contracts on BSC from time to time, via block header and pre-commits, for the below information:
    * block and app hash of BC that are signed by validators
    * current validatorset, and validator set update

2. the key-value from the blockchain state will be verified based on the Merkle Proof and information from above #1.

After confirming the key-value is accurate and trustful, the build-in system contracts will execute the actions corresponding to the cross-chain packages. Some examples of such packages that can be created for BC-to-BSC are:

1. Bind: bind the BEP2 tokens and BEP2E
2. Transfer: transfer tokens after binding, this means the circulation will decrease (be locked) from BC and appear in the target address balance on BSC
3. Error Handling: to handle any timeout/failure event for BSC-to-BC communication
4. Validatorset update of BSC

To ensure no duplication, proper message sequence and timely timeout, there is a "Channel" concept introduced on BC to manage any types of the communication.

For relayers, please also refer to the below "Relayers" section.

## BSC to BC Architecture

BSC uses Proof of Staked Authority consensus protocol, which has a chance to fork and requires confirmation of more blocks. One block only has the signature of one validator, so that it is not easy to rely on one block to verify data from BSC.

To take full advantage of validator quorum of BC, an idea similar to many [Bridge](https://github.com/poanetwork/poa-bridge) or Oracle blockchains is adopted:

1. The cross-chain communication requests from BSC will be submitted and executed onto BSC as transactions. The execution of the transanction wil emit `Events`, and such events can be observed and packaged in certain "**Oracle**" onto BC. Instead of Block Headers, Hash and Merkle Proof, this type of "Oracle" package directly contains the cross-chain information for actions, such as sender, receiver and amount for transfer.
2. To ensure the security of the Oracle, the validators of BC will form anothe quorum of "**Oracle Relayers**". Each validator of the BC should run a **dedicated process** as the Oracle Relayer. These Oracle Relayers will submit and  vote for the cross-chain communication package, like Oracle, onto BC,  using the same validator keys. Any package signed by more than ⅔\*N+1 Oracle Relayers’ voting power is as secure as any block signed by ⅔\*N+1 of     the same quorum of validators’ voting power.

By using the same validator quorum, it saves the light client code on BC and continuous block updates onto BC. Such Oracles also have Oracle IDs and types, to ensure sequencing and proper error handling.

## Timeout and Error Handling

There are scenarios that the cross-chain communication fails. For example, the relayed package cannot be executed on BSC due to some coding bug in the contracts. **Timeout and error handling logics are** used in such scenarios.

For the recognizable user and system errors or any expected exceptions, the two networks should heal themselves. For example, when BC to BSC transfer fails, BSC will issue a failure event and Oracle Relayers will execute a refund on BC; when BSC to BC transfer fails, BC will issue a refund package for Relayer to relay in order to unlock the fund.

However, unexpected error or exception may still happen on any step of the cross-chain communication. In such a case, the Relayers and Oracle Relayers will discover that the corresponding cross-chain channel is stuck in a particular sequence. After a Timeout period, the Relayers and Oracle Relayers can request a "SkipSequence" transaction, the stuck sequence will be marked as "Unexecutable". A corresponding alerts will be raised, and the community has to discuss how to handle this scenario, e.g. payback via the sponsor of the validators, or event clear the fund during next network upgrade.