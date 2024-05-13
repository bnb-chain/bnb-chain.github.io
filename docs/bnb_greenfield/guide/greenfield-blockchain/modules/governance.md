---
title: Governance
order: 7
---

# Governance

:::info
Since Greenfield Governance is derived from Cosmos, The majority of the content in this page is copied from the
[Cosmos SDK](hhttps://hub.cosmos.network/main/governance/process.html).
:::

The Greenfield BlockChain utilizes on-chain governance, which achieved by steps listed below:

- **Proposal submission**: Proposal is submitted to the blockchain with a deposit;
- **Vote**: Once deposit reaches threshold `MinDeposit`, proposal is confirmed and vote opens. Bonded BNB holders can vote on the proposal;
- **Execution**: After voting period, the votes are tallied and if proposal `passed`, the messages in the proposal will be executed.

There are various types of proposals. This includes, but is not limited to:
- Proposals for creating and editing validators, staking rewards distribution, details as described in [staking module](consensus-and-staking.md);
- Proposals for creating and removing storage provider which specified in [storage provider module](storage-provider.md);
- Parameters change proposal for `Greenfield` modules;
- Parameters change proposals for `BSC` smart contracts;
- `BSC` smart contracts upgrade proposals.


## Governance Parameters
- **Minimum deposit**: The threshold for transiting a proposal from deposit period to vote period;
- **Maximum deposit period**: The most lasting time for depositing a proposal. If it reaches `min_deposit`, this period ends immediately;
- **Voting period**: The time lasted for validators and delegators to vote on a proposal;
- **Quorum**: Minimum proportion of participating voting power, measured by number of bonded BNB tokens;
- **Pass threshold**: Minimum proportion of `Yes` votes (excluding Abstain votes), measured by number of bonded BNB;
- **Veto threshold**: Maximum proportion of `NoWithVeto` (counts as No but also adds a Veto vote).

## Submit proposal:

In `Greenfield`, any account can submit proposals by sending `MsgSubmitProposal` transaction.

## Deposit:

Proposals must be submitted with a deposit in `BNB` defined by the `MinDeposit` param, the deposit is required as spam 
protection. Any BNB holder can contribute to this deposit to support proposal, the submitter is not mandatory to provide 
the deposit itself, thought it is usually filled by proposal maker. To transit a newly created proposal into active status, 
`MinDeposit` need to be met, otherwise proposal will stay inactive. Once deposit end time comes, the proposal will be 
destroyed and all deposits will be burned. For 
proposals which deposits reaches minimum threshold, status turn into active and `voting period` starts.

## Voting period:

All bonded BNB holders get the right to vote on proposals with one of following options:

- `Yes`: Approval of the proposal in its current form;
- `No`: Disapproval of the proposal in its current form;
- `NoWithVeto`: Which indicates a proposal either (1) spam (2) infringes on minority interests (3) violates rules of engagement;
- `Abstain`: The voter wishes to contribute to quorum without voting for or against a proposal.

Voters may change their vote at any time before voting period ends. Be aware that voting power is measured in terms 
of bonded BNB, and delegators inherit the vote of validators they are delegated to. If a delegator votes after their validator, 
the delegator's vote will override the validator's vote.

## Tally

Following requirements need to be met for a proposal to be accepted by the end of voting period:

- **Quorum**: A minimal of 33.40% of total bonded BNB(voting power) need to be participated in the vote;
- **Threshold**: `Yes` votes should be more than 50% excluding `Abstain` votes;
- **Veto**: `NoWithVeto` votes is less than 33.40%, including Abstain votes.

If a proposal is approved or rejected without `NoWithVeto`, deposit will be refunded to depositor. In the case where
`NoWithVeto` exceed 33.40% , deposits will be burned and proposal information will be removed from state.

Validators not in the active set can cast a vote, but their voting power (including their delegators) 
will not count toward the vote if they are not in the active set when the voting period ends. That means that if BNB 
is delegated to a validator that is jailed, tombstone, or outside the active set at the time that the voting period 
ends, that BNB's stake-weight will not count in the vote.


