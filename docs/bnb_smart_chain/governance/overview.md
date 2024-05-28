# BSC Governance Overview
![governance](../img/Governance.png)

[BEP-297](https://github.com/bnb-chain/BEPs/pull/297) introduces the native governance module for BSC, drawing inspiration from the [OpenZeppelin Governor](https://docs.openzeppelin.com/contracts/4.x/governance).
Here are the key features of BSC Governance:

-  **Proposal and Voting Rights**: Staking credit holders can propose and vote on governance matters.
-  **Continuous Rewards**: Voters can keep earning staking rewards during the voting period.
-  **Flexible Delegation**: Users can delegate their voting rights, enabling others to participate in governance.
-  **Secure Execution**: Proposals undergo a time lock period before execution once passed.

## Workflow Overview

### Submit Proposal

-  **Initiation**: Any staking credit holder can submit a proposal following the [user guide](./user-guide.md).
-  **Details Required**: Proposer address, target addresses, values, function signatures, calldatas, and a comprehensive description.
-  **Requirements**: A minimum stake of 200 BNB and no pending proposals from the same delegator.

### Cast Vote

-  **Engagement**: Voters cast their votes through the `castVote` transaction on the `Governor` contract.
-  **Information Needed**: Voter address, proposal ID, and support value (True or False).
-  **Flexibility**: Voters can adjust their support value throughout the voting period, current set at **7 days**.
-  **Voting Power**: Voting power is the staking credit amount a voter holds when a proposal is submitted.

### Execute Proposal

-  **Execution Quorum**: The percentage of voted staking credit to total staking credit should be no less than the governance quorum, currently set at **10%**.
-  **Tally Threshold**: The voting power percentage for `Yes` should be no less than that for `No` and should meet the tally threshold, currently set at **50%**.
-  **Execution Timelock**: When a proposal meets the execution conditions, there is still a necessary delay before it can be triggered, currently set at **1 day**.

## Delegation of Voting Power 

Staking credit holders can delegate their voting power to participate in governance if they lack time or expertise.
Delegating to a trusted party like a validator or a professional service allows them to benefit from expertise and avoid losing rewards by not voting.