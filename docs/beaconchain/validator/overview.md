---
sidebar_label: Overview
sidebar_position: 1
hide_table_of_contents: false
---
# Overview

[BEP159](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP159.md) introduces a permissionless validator election mechanism
and brings the staking economy onto BNB Beacon Chain(BC).

Anyone can stake their BNB to become a validator candidate or delegate their BNB to the validator candidates they trust.
The validator set will be determined by the rank of the accumulated bonded tokens on validator candidates. The validators
will be responsible for producing new blocks, in return, they will get block rewards, and share the rewards with delegators.


## The Staking Mechanism

1. The staking mechanism is the same as the mechanism used by BNB Smart Chain(BSC). It enables all users on BC to get involved 
in securing the network by applying to be a validator or delegating their BNB to the validators they trust, and earning 
transaction fees for this. 
2. The validator set update and reward distribution happen on BC around UTC 00:00 every day(in 
the breath block).
3. Some portion of the BSC transaction fee will be distributed to BC validators, as incentives for them to secure the BSC network.

## Staking Operation
- BNB holders, including the validators, can put their tokens "bonded" into the stake. Token holders can delegate 
their tokens to any validator or validator candidate, to expect it can become an actual validator, and later they can 
choose a different validator or candidate to re-delegate their tokens.
- All validator candidates will be ranked by the accumulated number of bonded tokens on them, and the top ones will 
 become the real validators to propose blocks.
- Validators get their commission from the blocking reward to cover the cost of running high-quality nodes and 
  share the rest reward with their delegators.
- Validators can suffer from "Slashing", a punishment for their bad behaviors, such as double sign and/or unavailability.
- There is an "unbonding period" for validators and delegators so that the system makes sure the tokens remain 
bonded when bad behaviors are caught.

## Validator Set Update
- The validator set update will happen in the first block after UTC 00:00 (which is known as the breath block).
- The validators are elected according to the rank of accumulated staked BNB across a period(e.g. 30 days).

## Reward Distribution
- The staked BNB of validators will not only be from themselves but also the delegators.
- A portion of fees collected on BSC will be paid to BC validators for the cost of maintaining the BC network to enhance 
  BSC security. It will happen in the block reward distribution period. The initial ratio will be decided through governance.
- The block proposer and its delegators receive between 1% and 5% of block fee rewards. It includes 2 parts:
  - base: `fees * baseProposerReward`
  - bonus: `fees * bonusProposerReward * P`, where `P = (total number of validators with included precommits / total bonded validator number)`. 
    The more precommits the proposer includes, the larger `P` is. `P`  can never be larger than 1.00 
    (since only bonded validators can supply valid precommits) and is always larger than 2/3.
- Any remaining fees are distributed among all validators equally, including the proposer.
- The fees will be distributed and accumulated in the system-controlled addresses in every block. The FeeForAll part will go to a fixed address and the FeeForProposer part will go to a custody address which is derived from the proposer’s validator address. Nobody can spend money on the FeeForAll address and validators’ custody addresses. They can only be distributed to validators and delegators during the reward distribution period.
- To reduce the cost of frequent block reward distribution, the reward distribution to delegators will happen every day around UTC 00:00(in the breath block).
- The [BEP-128](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP128.md) introduced an optimized mechanism that distributes staking rewards in many consecutive blocks, to minimize the burden on the specific block. It's expected to use the same mechanism in BC reward distribution. The BC reward distribution will happen right after the BSC reward distribution.