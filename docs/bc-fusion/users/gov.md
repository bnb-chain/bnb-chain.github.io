
# Governance with Tally

This document provides a guide on how to participate in governance on the BNB Smart Chain (BSC) using Tally. It
covers the process of delegating voting power, creating proposals, voting on proposals, and executing proposals.

BNB Chain DAOs are created on Tally both for the mainnet and testnet.

* Testnet: [https://www.tally.xyz/gov/bnb-chain-testnet](https://www.tally.xyz/gov/bnb-chain-testnet)
* Mainnet: [https://www.tally.xyz/gov/bnb-chain](https://www.tally.xyz/gov/bnb-chain)

## Parameters

There are several parameters which will affect the governance process on the BSC.
Especially, the governance process on the BSC only enabled after enough voting power is migrated from the Beacon Chain
to the BSC (i.e., the `startGovThreshold` parameter).

| Parameter               | Description                                                                      | Mainnet Value | Testnet Value |
|-------------------------|----------------------------------------------------------------------------------|---------------|---------------|
| votingDelay             | a fixed duration  after which users can vote to a proposal                       | 0 hour        | 0 hour        |
| votingPeriod            | the voting period before tally                                                   | 7 days        | 1 day         |
| proposalThreshold       | a fixed amount of gov BNB needed for a proposal                                  | 200 govBNB    | 100 govBNB    |
| quorumNumberRator       | the percentage of the total voting power required to produce a final vote result | 10%           | 10%           |
| startGovThreshold       | the total supply of gov token to enable the gov function                         | 10M BNB       | 10M BNB       |
| minPeriodAfterTheQuorum | the time to add for voting when a proposal reaches quorum                        | 1 day         | 1 hour        |
| timerlockDelay          | the timer locker duration to execute a proposal                                  | 1 day         | 6 hours       |

## Governance Process Guide

You need to connect to your Web3 wallet (e.g., TrustWallet, BEW, Metamask) for the following operations.

### Delegate Voting Power

After you have delegated your BNB to a BSC validator, you can start participating in the BSC governance.
To participate in BSC governance, you first need to delegate your voting power to someone or yourself if you wish to
vote directly.

![](../../assets/bcfusion/tally1.png){:style="width:800px"}

You can click the `My voting power` button on the top right corner of the screen to delegate your voting power.

![](../../assets/bcfusion/tally2.png){:style="width:800px"}

You can delegate your voting power to yourself if you want to vote/create proposals directly, or to others if you want
him/her to vote/create proposals on your behalf.

![](../../assets/bcfusion/tally3.png){:style="width:800px"}

If you delegate the voting power to yourself, you will see the current number of your voting power to participate in the governance.

### Create Proposals

If you have sufficient voting power (i.e., greater than the `proposalThreshold`), you can create proposals on the BSC
network. Be noted that a user can only has one proposal in active/pending state at a time to prevent spamming.

To create a proposal, click on the "Create new proposal" button on the top right corner of the screen.

![](../../assets/bcfusion/tally11.png){:style="width:800px"}

After you have created a proposal, you can add a title, description, and a list of actions for the proposal.

![](../../assets/bcfusion/tally4.png){:style="width:800px"}

A text proposal only requires a title and a description, and it will not be executed by the network for there is no action.

![](../../assets/bcfusion/tally5.png){:style="width:800px"}

To add an action, click on the "Add action" button, and fill in the details of the action.

- `Target Contract Address`: The contract address to be called by the proposal.
- `ABI File`: The ABI file of the contract. You can upload the ABI file manually if the ABI file is not correctly
  detected.
- `Conctract Method`: The method of the contract to be called.
- `Calldata`: The input data for the contract method. Which is optional.

After you input all the details, click on the "Publish" will publish your proposal.

![](../../assets/bcfusion/tally6.png){:style="width:800px"}

You can also cancel a proposal by clicking on the "Cancel proposal" button.

### Vote on Proposals

Once a proposal is live (i.e., after the `votingDelay` and before the `votingPeriod`), you can cast your vote to
support or oppose the proposal. To vote on a proposal, click on the "Vote on chain" button.

![](../../assets/bcfusion/tally7.png){:style="width:800px"}

You can cast `For`, or `Against`, or `Abstain` votes to the proposal.

![](../../assets/bcfusion/tally8.png){:style="width:800px"}

### Execute Proposals

If a proposal reaches the quorum (i.e., reaches the `quorumNumberRator` of the total voting power) and it passes
(i.e., more than 50% of the voted voting power supports the proposal), it can be executed by the network.

To execute a proposal, fistly the proposal needs to be queued by clicking the `Queue` button.

![](../../assets/bcfusion/tally9.png){:style="width:800px"}

After the proposal is queued and exceeds the timelock duration (i.e, the `timerlockDelay` duration),
it can be executed by anyone by clicking the `Execute` button.

![](../../assets/bcfusion/tally10.png){:style="width:800px"}

### More References

- [Delegations on Tally](https://docs.tally.xyz/knowledge-base/delegations-on-tally)
- [Proposals on Tally](https://docs.tally.xyz/knowledge-base/proposals)
