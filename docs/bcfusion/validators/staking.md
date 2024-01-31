# Staking

BNB smart chain (BSC) is a Proof-of-Staked-Authority (PoSA) blockchain, which means that staking is one of the most
important parts of the system. [BEP-294](https://github.com/bnb-chain/BEPs/pull/294) introduces the new native staking
mechanism after BNB chain fusion, which has several differences:

- Users are able to participate in staking on the BSC directly, without moving BNB to Beacon chain.
- Staking credit, as the proof of BNB staked to a specified validator, cannot be transferred. Different validators issue
  different staking credits.
- Staking reward will not be distributed automatically.

In this section, we will explain the basic concepts and operations of staking on the BSC.

## Validator Set

The validator set is the group of nodes that are responsible for validating transactions and producing blocks on the
BSC. The validator set is determined by the amount of staking credit each validator has, which reflects the amount of
BNB staked by the validator and its delegators. The top validators with the most staking credit are selected as the
active validator set, and they take turns to propose and vote on blocks. The rest of the validators are in the standby
validator set, and they can join the active validator set if their staking credit increases or if some active validators
drop out.

The validator set is updated every 24 hours, based on the latest staking information. Validators can join or leave the
validator set by creating or editing their validator information. Validators can also be removed from the validator set
by slashing, which is a penalty for misbehaving or being offline.

## Validator Operations

Validators are the nodes that run the BNB smart chain software and participate in the consensus process. Validators need
to have a minimum amount of BNB staked to their own validator address, and they can also accept delegations from other
BNB holders who want to stake with them. Validators earn rewards from the transaction fees, and
they share a portion of their rewards with their delegators.

### Create Validator

To create a validator, a BNB holder needs to send a `CreateValidator` transaction to the `StakeHub` contract,
which is a system contract and the address is `0x0000000000000000000000000000000000002002`,
with minimum amount of BNB that the validator needs to stake to their own validator
address (2000 BNB), specifying the following information:

- **Operator address**: The address of the validator, which will receive the staking credit and the rewards.
- **Consensus address**: The consensus address of the validator's node.
- **Vote Address**: The address for participating fast finality voting.
- **BLS Proof**: A BLS signature to prove that the validator owns the vote address.
- **Commission**: The commission rate defines the percentage of the rewards that the validator will keep for themselves,
  and the rest will be distributed to the delegators. It also contains the max commison rate, the max change rate during
  a predefined timespan for validator to set.
- **Description**: The optional information about the validator, such as moniker, identiy, website, etc.

The `CreateValidator` transaction will deduct the minimum self-delegation amount from the validator address and issue
the corresponding staking credit to the validator. The validator will then join the standby validator set, and wait for
the next validator set update to see if they can enter the active validator set.

### Edit Validator

A validator can edit their validator information by sending  `EditConsensusAddress`, `EditCommissionRate`,
`EditDescription`, `EditVoteAddress` transactions to the `StakeHub` contract, specifying the following information
accordingly:

- **New consensus address**: The new consensus address of the validator's node.
- **New commission**: The new percentage of the rewards that the validator will keep for themselves, which can
  only be increased within a maximum change rate limit.
- **New description**: The new information about the validator, such as moniker, identiy, website, etc.
- **New vote address**: The new vote address for participating fast finality.

These transactions will update the validator information on the BNB smart chain, and the changes will take
effect immediately. However, the new commission rate will only apply to the rewards earned after the transaction, and
the previous rewards will be distributed according to the previous commission rate.

## Delegator Operations

Delegators are the BNB holders who stake their BNB to a validator of their choice, and share the rewards and the risks
with the validator. Delegators can choose any validator from the active or the standby validator set, and they can
switch between validators at any time. Delegators can also undelegate their BNB from a validator, and claim their
rewards at any time.

### Delegate

To delegate BNB to a validator, a BNB holder needs to send a `Delegate` transaction to the `StakeHub` contract,
specifying
the following information:

- **Operator address**: The address of the validator, which will receive the BNB from the delegator.
- **Delegate Voting Power**: The flag to indicate whether the delegator would like to delegate his/her voting power
  to the validator for governance.

The `Delegate` transaction will deduct the amount of BNB from the delegator address and issue the corresponding staking
credit to the validator. The delegator will then share the rewards and the risks with the validator, according to the
commission rate and the slashing rate of the validator.

The credit tokens (or share) a delgator will get is calculated
as - `delegation amount` * `total supply of credit token` / `total pooled BNB`.
The `total pooled BNB` includes the delegation BNB and unclaimed reaward BNB of of the vlidator. It means that a
delegator will get credit tokens based on the ratio of his/her delegation BNB amount to the total staked and reward BNB.
When the validator gets block reward the `total pooled BNB` amount will increase, which means that when unbonding
the delegator will get his delegation, as well as reward BNB from the pool.

### Redelegate

To redelegate BNB from one validator to another, a delegator needs to send a `Redelegate` transaction to the `StakeHub`
contract, specifying the following information:

- **Source operator address**: The address of the source validator, which will send the BNB to the destination
  validator.
- **Destination operator address**: The address of the destination validator, which will receive the BNB from the
  source validator.
- **Amount**: The amount of BNB that the delegator wants to redelegate from the source validator to the destination
  validator.
- **Delegate Voting Power**: The flag to indicate whether the delegator would like to delegate his/her voting power
  to the destination validator for governance.

The `Redelegate` transaction will deduct the amount of staking credit from the source validator and issue the
corresponding staking credit to the destination validator. The delegator will then share the rewards and the risks with
the destination validator, according to the commission rate and the slashing rate of the destination validator.
The `Redelegate` transaction does not incur the unbonding period, but it will incur the redelegation fee,
which is designed to prevent delegators from frequently switching between validators to chase
the highest rewards or avoid the highest risks. The current fee rate is 2%.

### Undelegate

To undelegate BNB from a validator, a delegator needs to send an `Undelegate` transaction to the `StakeHub` contract,
specifying the following information:

- **Operator address**: The address of the validator, which will send the BNB to the delegator.
- **Amount**: The amount of BNB that the delegator wants to unstake from the validator.

The `Undelegate` transaction will deduct the amount of staking credit from the validator and return the corresponding
BNB to the delegator address. However, the BNB will be locked for a period of time, called the **unbonding period**,
before the delegator can use it. The unbonding period is currently set to 7 days, and it is designed to prevent
delegators from quickly withdrawing their BNB in case of a validator misbehavior or a network attack.

### Claim

To claim the unbond BNB and the rewards, a delegator should send a `Claim` transaction to the `StakeHub` contract,
specifying the following information:

- **Delegator address**: The BEP20 address of the delegator, which will receive the rewards from the validator.
- **Queued unbond number**: The number of unbond requests to be claimed, and 0 means claim BNB and rewards from
  all the unbond requests.

The `Claim` transaction will return the delegated BNB and rewards to the delegator. Be noted, a delegator can only get
the rewards after unbond. Before undelegation, the reward will be furthur staked to boost a delegator's income.

