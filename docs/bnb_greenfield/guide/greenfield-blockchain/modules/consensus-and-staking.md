---
title: Consensus and Staking
order: 6
---

# Consensus and Staking

The BNB Greenfield blockchain places a strong emphasis on network security, 
which is achieved through a Proof-of-Stake (PoS) consensus mechanism based on Tendermint. 
Validators play a crucial role in this process, with a new block being created every 
2 seconds by a group of elected validators. Notably, BNB serves as the staking token on this blockchain.

Upon genesis state, a set of validators will be established, with their staked BNB locked 
in the BNB Smart Chain (BSC) side. Other validators can apply to become part of 
the network by submitting a create-validator proposal. Should a validator fail to uphold 
their responsibilities, they can be impeached. If the impeach-validator proposal is approved, 
the validator is removed and jailed permanently.

It is important to note that validators are distinct from storage providers within the Greenfield 
ecosystem. While validators are responsible for generating blocks, ensuring data availability, 
and managing cross-chain communication, storage providers focus on storing data objects. 
Though their roles are closely related, there is no stringent binding relationship between the two.

Overall, the Greenfield blockchain's PoS consensus mechanism, Validator set, and impeachment 
process serve to maintain network security and ensure the integrity of the ecosystem. 
The separation of duties between validators and storage providers enables a more efficient 
and streamlined network architecture.

## Create Validator

To become a validator, a create-validator proposal should be submitted and adopted by the majority of the current validators.
Meanwhile, in the early stage, only self delegation is allowed, and in the further open delegation can be supported.
Here are the steps for becoming a new validator:

- Self delegator of the new validator grants the delegate authorization to the gov module account.

- The new validator should initiate a create-validator proposal.

- Wait for the current validators to vote on this proposal.

- Once the proposal is passed, the new validator would be created automatically.

## Edit Validator

There are several fields that validators can edit after they have been created. Including description, commission rate,
min-self-delegation, relayer address, and relayer bls public key. All these fields can be edited by submitting an
edit-validator transaction.

## Impeach Validator

If a validator behaves badly, anyone can submit a proposal to impeach the validator, and if the proposal is passed, the
validator would be jailed forever. Here are the steps for impeaching a validator:

- Initiate an impeach-validator proposal.

- Wait for the current validators to vote on this proposal.

- Once the proposal is passed, the validator would be jailed forever automatically,
  that means it can’t become an active validator anymore.

## Staking Reward Distribution

In the BNB Greenfield blockchain, validators receive rewards from transaction fees. 
To ensure fairness, the fee distribution module allocates these rewards to the validators' 
delegators in a proportional and transparent manner.

Rewards are calculated over specific periods, which are updated every time there is a change in 
a validator's delegation, such as when a new delegation is received. 
To determine the rewards for a validator during a particular period, 
their total rewards from the previous period are subtracted from the current total rewards.

When a validator is removed or requests a withdrawal, their commission 
is paid based on the accumulated fee amounts calculated and updated with 
each `BeginBlock` operation.

Delegators receive their rewards either when they change or remove their delegation, 
or when they request a withdrawal. Before distributing the rewards, any penalties imposed on 
the validator for that delegation period are taken into account.

The detailed fee distribution rules is [described here](https://github.com/bnb-chain/greenfield-cosmos-sdk/blob/master/docs/spec/fee_distribution/f1_fee_distr.pdf)