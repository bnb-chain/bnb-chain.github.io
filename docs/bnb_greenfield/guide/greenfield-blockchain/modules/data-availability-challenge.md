---
title: Data Availability Challenge
order: 8
---

# Data Availability Challenge

Data availability refers to the correct storage and accessibility of data on storage providers for users.
To determine if a specific data segment or piece is correctly stored on a designated storage provider,
a challenge module is employed. The challenge comprises three steps:

1. The validator requests the data piece and local manifest of the object from the challenged storage provider.
   If the expected piece is not obtained, it is considered unavailable.
2. The validator computes the hash of the local manifest and compares it with the global manifest recorded in the
   object's metadata. If they differ, the piece is considered unavailable.
3. The validator computes the hash of the challenged data piece and compares it with the data recorded in the local
   manifest. If they differ, the piece is considered unavailable.

The validator collects challenge signatures and if more than two-thirds of validators vote the same result,
those signatures are aggregated to create a data challenge attestation. This attestation is then submitted on-chain
via a transaction that awards the first submitter. Subsequent submissions of the same attestation will fail verification.
Only the validators whose votes were included in the attestation are rewarded, therefore, some validators who voted but
were not included will not be rewarded for the data availability challenge.

## Workflow

![Data Availability Challenge Workflow](https://raw.githubusercontent.com/bnb-chain/greenfield-whitepaper/main/assets/19.2%20Data%20Availability%20Challenge.jpg)

<div style={{textAlign:'center'}}><i>Data Availability Challenge Workflow</i></div>

The Workflow for the Data Availability Challenge is as Follows:

1. Any user can submit a transaction to challenge the availability of data. The related information will be recorded
   temporarily on-chain and also be included in typed events once the transaction is executed.
2. At the end block phase of each block, a random algorithm is used to generate data availability challenge events by
   default. All challenge information will be stored until confirmed or expired.
3. The off-chain data availability detection module tracks on-chain challenge information and initiates off-chain detection.
4. The validator uses their BLS private key to sign a data challenge vote that includes block header, data challenge information, and the result.
5. The validator collates data challenge votes, aggregates the signatures, and creates a data challenge attestation.
6. Once 2/3 validators have reached an agreement, the validator submits the attestation.
7. The data challenge attestation transaction is executed, and the attestation is verified, and the challenge storage is cleared.
   Malicious nodes are penalized, and rewards are distributed. A cooling-off period is implemented to avoid repeated attacks.
8. During the cooling-off period, the validator can regain, recover, or shift the data.
   Once the cooling-off period expires, the data can be challenged again. If the data is still unavailable, the validator will be penalized once more.

## Create Challenge

There are two ways to trigger challenges.

### Submitted Challenges

Anyone can send `MsgSubmit` messages to trigger data availability challenges, if he/she finds that the data is not
available or incorrect stored. When submitting the challenge, user can choose the segment/piece of an object to
challenge or let the blockchain randomly selects a segment/piece to challenge.
The submitter will be called as challenger, and will be rewarded if the challenge
succeeds later.

### Random Challenges

In each block, challenges will be automatically created, to challenge different objects which are stored on different 
storage providers. The count of random challenges in each block is governed, and can be changed by submitting proposals.
To support randomness, a *RANDAO* mechanism is introduced in Greenfield blockchain. For more information about *RANDAO*,
please refer to the following section.

## Attest Challenge

Each validator will listen to the events of challenge creations, and vote the challenge by using its own BLS key.
When there are more than 2/3 votes are collected, an attestation message `MsgAttest` will be submitted to slash the 
challenged storage provider. And the voted validators, the attestation submitter, and the challenger (if there is) will 
be rewarded accordingly.


## Challenge Heartbeat

To indicate the off-chain challenge detect module is running correctly, validators have to vote and submit 
`MsgHeartbeat` messages periodically to the blockchain. During processing this kind of messages, the income for securing 
stored objects will be transferred from payment account to distribution account,
and income can be withdrawn by validators and their delegators later.

## Challenge Events

The following events are introduced for data availability challenge. For the detailed definition, please refer
to [this](https://github.com/bnb-chain/greenfield/blob/master/proto/greenfield/challenge/events.proto).

### Start Event

This kind of events indicates that a data availability challenge is triggered on-chain. The off-chain module should
monitor the events, asking the according storage prover for data, compute hashes and do the comparison, and submit
an attestation if needed.

### Complete Event

When an attestation is received and accepted, then this kind of events will be emitted. In the events, the slash
and rewards amounts are also recorded.

### Heartbeat Event

Heartbeat only includes the necessary information for liveness-check purpose. 

## RANDAO

To support random challenges, a RANDAO mechanism is introduced like the following.
Overall, the idea is very similar to the RANDAO in Ethereum beacon chain, you can refer to
[here](https://eth2book.info/altair/part2/building_blocks/randomness) for more information.

When proposing a new block, the proposer, i.e. a validator, needs to sign the current block number to get 
a `randao reveal`, and mixes the reveal into randao result `randao mix` by using `xor` operation. 
The other validators will verify the `randao reveal` and `randao mix` by following steps: 
1. The signature is verified using the proposer's public key. It means that the proposer has almost no choice 
about what it contributes to the RANDAO. It either contributes the correct signature over the block number, 
or it gives up the right for proposing the current block. If the validator does propose the current block, 
it still cannot predict the reveal from other validators, and even be slashed for stopping proposing blocks.
2. The `randao mix` is correctly updated by using `xor` operation.


The implementation is conducted in Tendermint layer - a new field called `randao_mix` is added into block header.
Greenfield blockchain then uses the field as a seed to randomly pick objects and storage providers to challenge 
in each block.