# Staking

This guide provides an overview of the key operations of staking, including creating validators,
editing validator information, and performing delegation operations.
For the general introduction of staking, please refer to [Staking Mechanism](../validators/staking.md).

## Contract

The BSC staking mainly uses the smart contracts `StakeHub` for validator management and delegation management.

- `StakeHub`: Manages validator creations, user delegations, and executs penalty for validator slash.
  (Address: `0x0000000000000000000000000000000000002002`)

## Creating a Validator

To create a validator, use the `createValidator` function with the following parameters:

```solidity
  function createValidator(
    address consensusAddress,
    bytes calldata voteAddress,
    bytes calldata blsProof,
    Commission calldata commission,
    Description calldata description
) external payable
```

- `consensusAddress`: The consensus address of the validator.
- `voteAddress`: The vote address of the validator.
- `blsProof`: The BLS signature as proof of the vote address.
- `commission`: The commission structure, including rate, maxRate, and maxChangeRate.
- `description`: The description of the validator, including moniker, identity, website, and details.

**Note**: Creating a validator requires locking 1 BNB, and the transaction must be sent with a sufficient BNB amount to
cover this lock amount plus any self-delegation, in total 2001BNB.

## Editing Validator Information

### Edit Consensus Address

To change the consensus address of a validator, use the `editConsensusAddress` function with the following paramters:

```solidity
function editConsensusAddress(address newConsensusAddress) external
```

- `newConsensusAddress`: The new consensus address of the validator.

### Edit Commission Rate

To update the commission rate of a validator, use the `editCommissionRate` function with the following paramters:

```solidity
function editCommissionRate(uint64 newCommissionRate) external
```

- `newCommissionRate`: The new commission structure, including rate, maxRate, and maxChangeRate.

### Edit Description

To update the description of a validator, use the `editDescription` function with the following parameters:

```solidity
function editDescription(Description memory newDescription) external
```

- `newDescription`: The new description of the validator, including moniker, identity, website, and details.

### Edit Vote Address

To change the vote address of a validator, use the `editVoteAddress` function with the following parameters:

```solidity
function editVoteAddress(bytes calldata newVoteAddress, bytes calldata blsProof) external
```

- `newVoteAddress`: The new vote address of the validator.
- `blsProof`: The BLS signature as proof of the vote address.

## Delegation Operations

### Delegate

To delegate BNB to a validator, call the `delegate` function with the following parameters:

```solidity
function delegate(address operatorAddress, bool delegateVotePower) external payable
```

- `operatorAddress`: The operator address of the validator.
- `delegateVotePower`: The flag to indicate whether the delegator would like to delegate his/her voting power
  to the validator for governance.

### Undelegate

To undelegate BNB from a validator, use the `undelegate` function with the following parameters:

```solidity
function undelegate(address operatorAddress, uint256 shares) external
```

- `operatorAddress`: The operator address of the validator.
- `shares`: The amount of shares to undelegate from the validator.

### Redelegate

To redelegate BNB from one validator to another, use the `redelegate` function with the following parameters:

```solidity
function redelegate(address srcValidator, address dstValidator, uint256 shares, bool delegateVotePower) external
```

- `srcValidator`: The operator address of the source validator to redelegate from.
- `dstValidator`: The operator address of the destination validator to redelegate to.
- `delegateVotePower`: The flag to indicate whether the delegator would like to delegate his/her voting power
  to the destination validator for governance.

## Claim

To claim undelegated BNB after the unbonding period, use the `claim` function for a single request or `claimBatch` for
multiple requests:

```solidity
function claim(address operatorAddress, uint256 requestNumber) external
```

- `operatorAddress`: The operator address of the validator.
- `requestNumber`: The number of unbonding requests to claim from. `0` means claiming from all unbonding requests.

```solidity
function claimBatch(address[] calldata operatorAddresses, uint256[] calldata requestNumbers) external
```

- `operatorAddress`: The operator addresses of the validatores.
- `requestNumber`: The numbers of unbonding requests to claim from the validators.

## Contract ABI

For the full interfaces of `StakeHub`, please refer
to [the ABI file](https://github.com/bnb-chain/bsc-genesis-contract/blob/bc-fusion/abi/stakehub.abi).