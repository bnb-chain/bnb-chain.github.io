# Governance

[BEP-297](https://github.com/bnb-chain/BEPs/pull/297) introduces the native governance module for BNB smart chain after
BNB chain fusion. The governance module is derived
from [OpenZeppelin Governor](https://docs.openzeppelin.com/contracts/4.x/governance), with the following
features:

- Any staking credit holder is allowed to propose and vote.
- Voters can continue to earn staking rewards during the voting period.
- Users can delegate someone else to participate in governance on their behalf.
- A time lock period is introduced before the proposal is executed.
- If the proposal is rejected, the proposer does not incur any financial losses.

## Workflow

The workflow of the governance module consists of three stages: submit proposal, cast vote, and execute proposal. Each
stage has its own requirements and parameters, which can be configured by the BNB smart chain governance parameters.

### Submit Proposal

To submit a proposal, a staking credit holder needs to send a `propose` transaction to the `Governor` contract,
which is a system contract and the address is `0x0000000000000000000000000000000000002004`,
specifying the following information:

- **Proposer address**: The address of the proposer, who initiates the proposal and pays the proposal fee.
- **Targets**: The list of addresses of the contracts or accounts that the proposal wants to interact with.
- **Values**: The list of amounts of BNB or other tokens that the proposal wants to transfer to the targets.
- **Signatures**: The list of function signatures of the contracts that the proposal wants to call on the targets.
- **Calldatas**: The list of encoded arguments of the functions that the proposal wants to call on the targets.
- **Description**: The description of the proposal, which provides more details and rationale for the proposal.

A delegator should delegate more the 200 staked BNB as the minimal requirement for submitting a proposal.
Meanwhile, a delegator can only submit a new propopal if there is no pending proposal created by him/her.
The `propose` transaction will create a new proposal on the BNB smart chain. 
The proposal will have a unique proposal ID, and a proposal status of `Pending`. The proposal will then
enter the voting period, which is the time window for the staking credit holders to cast their votes on the proposal.

### Cast Vote

To cast a vote on a proposal, a staking credit holder needs to send a `castVote` transaction to the `Governor` contract,
specifying the following information:

- **Voter address**: The address of the voter, who casts the vote on the proposal. The voter address can be the
  same as the staking credit holder address, or a different address that is delegated by the staking credit holder to
  participate in governance on their behalf.
- **Proposal ID**: The ID of the proposal, which identifies the proposal that the voter wants to vote on.
- **Support**: The boolean value of the vote, which indicates the voter's preference on the proposal. `True` means that
  the voter supports the proposal, and `False` means that the voter opposes the proposal.

The `castVote` transaction will record the support value and the voting power of the voter on the BNB smart chain. The
voting power is the amount of staking credit that the voter has at the time of the vote. The voting power can change due
to staking operations, such as delegate, undelegate, or redelegate, but the support value will remain the same. The
voter can change their support value at any time during the voting period, by sending another `castVote` transaction
with a different support value.

After submitting a proposal, the staking credit holders can cast their votes on the proposal until the voting period
ends. The voting period is one of the BNB smart chain governance parameters, and it is currently set to 7 days.

### Execute Proposal

To execute a proposal, anyone can send an `execute` transaction to the `Governor` contract, specifying the following
information:

- **Proposal ID**: The ID of the proposal, which identifies the proposal that wants to be executed.

The `execute` transaction will check the proposal status and the voting results on the BNB smart chain, and determine
whether the proposal can be executed or not. The proposal can be executed if the following conditions are met:

- The proposal status is `Pending`, which means that the proposal has not been executed or expired yet.
- The voting period is over, which means that the time window for casting votes on the proposal has ended.
- The proposal has reached the quorum, which means that the total voting power of the voters who cast `True` or `False`
  votes is greater than or equal to a certain percentage of the total staking credit on the BNB smart chain. The quorum
  is one of the BNB smart chain governance parameters, and it is currently set to 10%.
- The proposal has reached the threshold, which means that the voting power of the voters who cast `True` votes is
  greater than or equal to a certain percentage of the voting power of the voters who cast `True` or `False` votes.

Once the voting period is over, the proposal can be executed if it meets the required conditions. However, the proposal
cannot be executed immediately, as there is a time lock period before the proposal is executed. The time lock period is
another BNB smart chain governance parameter, and it is currently set to 1 day. The time lock period is designed to
prevent sudden and irreversible changes on the BNB smart chain, and to give the stakeholders a chance to react or
prepare for the proposal execution.

## Voting Power Delegation

In addition to casting votes, the staking credit holders can also delegate their voting power to someone else to
participate in governance on their behalf. This can be useful for staking credit holders who do not have the time,
interest, or expertise to follow and vote on the proposals, but still want to have a say in the governance process. By
delegating their voting power to a trusted party, such as a validator, a friend, or a professional service, they can
benefit from their knowledge and experience, and also avoid the risk of losing their staking rewards due to abstaining
from voting.

To delegate their voting power, a staking credit holder needs to send a `delegateVote` transaction to the `GovToekn` 
contract, which is a system contract and the address is `0x0000000000000000000000000000000000002005`, 
specifying the following information:

- **Delegator address**: The address of the delegator, who delegates their voting power to another address.
- **Delegatee address**: The address of the delegatee, who receives the voting power from the delegator and
  participates in governance on their behalf.

The `delegateVote` transaction will record the delegation relationship and the voting power of the delegator on
the BNB smart chain. The voting power is the amount of staking credit that the delegator has at the time of the
delegation. The voting power can change due to staking operations, such as delegate, undelegate, or redelegate, but the
delegation relationship will remain the same. The delegator can change their delegatee address at any time, by sending
another `delegateVote` transaction with a different delegatee address.