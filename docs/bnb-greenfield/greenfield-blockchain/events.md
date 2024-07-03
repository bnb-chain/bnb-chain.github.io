---
title: Blockchain Events - BNB Greenfield
#icon: actions
order: 2
---

# Blockchain Events

There are two categories of events in the cosmos-sdk documentation:

1. Old modules may not have typed events, which means their events are listed in a 
Markdown document under the module's spec folder.

2. New modules introduced in the cosmos-sdk or developed by the Greenfield team emit typed events, 
  which are defined in a protobuf file. Therefore, for these modules, we can refer directly to their protobuf file.

Here are the events grouped by modules that are emitted by the Greenfield blockchain:

* [Authz](https://github.com/bnb-chain/gnfd-cosmos-sdk/blob/master/proto/cosmos/authz/v1beta1/event.proto): module to grant or revoke privileges to an account;

* [Bank](https://github.com/bnb-chain/gnfd-cosmos-sdk/blob/master/x/bank/spec/04_events.md): module to transfer, delegate, mint or burn tokens;

* [Bridge](https://github.com/bnb-chain/greenfield/blob/master/proto/greenfield/bridge/event.proto): module to make cross chain transfers between the Greenfield blockchain and the BSC;

* [Challenge](https://github.com/bnb-chain/greenfield/blob/master/proto/greenfield/challenge/events.proto): module to generate and attest challenges;

* [Distribution](https://github.com/bnb-chain/gnfd-cosmos-sdk/blob/master/x/distribution/spec/06_events.md): module to withdraw addresses, delegator rewards or validator commissions;

* [Feegrant](https://github.com/bnb-chain/gnfd-cosmos-sdk/blob/master/x/feegrant/spec/04_events.md): module to manage allowances;

* [Gov](https://github.com/bnb-chain/gnfd-cosmos-sdk/blob/master/x/gov/spec/04_events.md): module to submit proposal or vote for proposals;

* [Oracle](https://github.com/bnb-chain/gnfd-cosmos-sdk/blob/master/proto/cosmos/oracle/v1/event.proto): module to claim cross chain packages;

* [Payment](https://github.com/bnb-chain/greenfield/blob/master/proto/greenfield/payment/events.proto): module to manage the streaming payment; 

* [Slashing](https://github.com/bnb-chain/gnfd-cosmos-sdk/blob/master/x/slashing/spec/06_events.md): module to penalize users of the chain;

* [Storage Provider](https://github.com/bnb-chain/greenfield/blob/develop/proto/greenfield/sp/events.proto): module to manage storage providers;

* [Storage](https://github.com/bnb-chain/greenfield/blob/master/proto/greenfield/storage/events.proto): module to manage buckets, objects or groups;

* [Staking](https://github.com/bnb-chain/gnfd-cosmos-sdk/blob/master/x/staking/spec/07_events.md): module to delegate.


This [ADR](https://github.com/bnb-chain/greenfield-cosmos-sdk/blob/master/docs/architecture/adr-032-typed-events.md) also 
proposes adding affordances to emit and consume these events. For developers, they will only need to write `EventHandlers`
which define the actions they desire to take.
