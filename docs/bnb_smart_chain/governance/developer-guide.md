# BSC Governance Developer Guide

This guide gives an overview of governance operations for BSC, such as creating proposals, casting votes, and executing them.

## Governance Contracts

The BSC governance facilitates decentralized decision-making within the BSC ecosystem, utilizing two primary
smart contracts: `GovToken` for governance token management and `Governor` for proposal management and voting.

- `GovToken`: Manages governance tokens, enabling holders to participate in governance decisions. It supports syncing
  token balances with staked assets and delegating voting rights. (Address: `0x0000000000000000000000000000000000002005`)

- `Governor`: Manages the creation, voting, and execution of governance proposals. It also ensures only eligible
  participants can propose changes and vote. (Address: `0x0000000000000000000000000000000000002004`)

## Create Proposal

To create a proposal, you need to call the `propose` function of `Governor` with the following parameters:

```solidity
function propose(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, string memory
    description) public returns (uint256 proposalId)
```

- `targets`: Contract addresses the proposal will interact with.
- `values`: BNB values (in wei) for each call.
- `calldatas`: Encoded function calls.
- `description`: Description of the proposal.

## Cast Vote

To cast a vote, you need to call the `castVote` function of `Governor` with the following parameters:

```solidity
function castVote(uint256 proposalId, uint8 support, string memory reason) public returns (uint256)
```

- `proposalId`: ID of the proposal.
- `support`: Vote choice (e.g., for, against, abstain).
- `reason`: (Optional) Reason for your vote.

## Check Proposal State

To get the state of a proposal, you need to call the `state` function of `Governor` with the following parameters:

```solidity
function state(uint256 proposalId) public view returns (ProposalState)
```

- `proposalId`: ID of the proposal.

## Queue Proposal

To schedules the proposal for execution, you need to call the `queue` function of `Governor` with the following
parameters:

```solidity
function queue(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash)
public returns (uint256 proposalId)
```

- `targets`: Contract addresses the proposal will interact with.
- `values`: Ether values (in wei) for each call.
- `calldatas`: Encoded function calls.
- `descriptionHash`: Hash of the description of the proposal.

## Execute Proposal

To apply the changes after the timelock delay, you need to call the `execute` function of `Governor` with the following
parameters:

```solidity
function execute(address[] memory targets, uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash)
public payable returns (uint256)
```

- `targets`: Contract addresses the proposal will interact with.
- `values`: Ether values (in wei) for each call.
- `calldatas`: Encoded function calls.
- `descriptionHash`: Hash of the description of the proposal.

## Delegate Vote

To delegate voting power to someoneles, you need to call the `delegateVote` function of `GovToken` with the following
parameters:

- **Delegator address**: The address of the delegator, who delegates their voting power to another address.
- **Delegatee address**: The address of the delegatee, who receives the voting power from the delegator and
  participates in governance on their behalf.

```solidity
function delegateVote(address delegator, address delegatee) external
```

- `delegator`: The address of the delegator, who delegates their voting power to another address.
- `delegatee`: The address of the delegatee, who receives the voting power from the delegator.

## Contract ABI

For the full interfaces of `Governor`, please refer
to [the ABI file](https://github.com/bnb-chain/bsc-genesis-contract/blob/bc-fusion/abi/Governor.abi).

For the full interfaces of `GovToken`, please refer
to [the ABI file](https://github.com/bnb-chain/bsc-genesis-contract/blob/bc-fusion/abi/govtoken.abi).