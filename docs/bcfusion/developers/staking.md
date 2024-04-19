[# Staking

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

## FAQs

### What are the functions/interfaces of each validator's credit contract?

For each validator, there is a credit contract which will be automatically deployed when it is created.
The credit contract is a BEP20 contract, and the ABI is the same
as [Stake Credit contract](https://github.com/bnb-chain/bsc-genesis-contract/blob/master/abi/stakecredit.abi).

Meanwhile, the conctract cannot be upgraded or changed by any validator operator.

### How to get the shares/BNB amount for a delegator?

For any specific validator, you can call the `balanceOf` function of the validator's creat contract to get the
delegator's shares. If you want to get the BNB amount instead of shares, you can use `getPooledBNB` function.

If you want to get the shares of all validators, you need to call the `balanceOf` function for each valiator and sum up
the results. Please refer to the following to see how to get the information of all validators, and use muticall to
improve the efficiency.

### How to calculte the BNB amount for a specific amount of shares?

The credit contract provides the `getPooledBNBByShares` function to calculate the BNB amount for some specific amount of
shares.

If you want to do the vice visa, you can use the `getSharesByPooledBNB` function to calculate the shares for some
specific BNB amount.

### How to calculte the APR/APY of a validator?

Please be noted that each validator will have its own APR/APY, and the staking system will auto compound the rewards.

The reward is distributed to each validator's BNB pool at 00:00:00 UTC time every day. To calculate the APR/APY of a
validator, you need to get the total pooled BNB amount and the crrospanding reward amount for the same day.

The `StakeHub` contract provides the `getValidatorTotalPooledBNBRecord(address,uint256)(uint256)`
and `getValidatorRewardRecord(address,uint256)(uint256)` for the purpose.

The following code shows how to get the total pooled BNB amount and the crrospanding reward amount for a given time:

```go
// example code, do not use it in production

// stakehub is the instance of StakeHub contract
stakeHub, _ := contracts.NewStakeHub(ethcommon.HexToAddress("0x0000000000000000000000000000000000002002"), client.GetEthClient())

// get how many blocks are in a day
interval, _ := stakeHub.BREATHEBLOCKINTERVAL(nil)

// get the block time of a given block
header, _ := p.client.GetBlockHeader(blockHeight)

// calculate the index paramter to call following functions
index := int64(header.Time) / interval.Int64()

// get the total pooled BNB amount and the crrospanding reward amount for the given validator and index
totalPooledBNB, _ := stakeHub.GetValidatorTotalPooledBNBRecord(nil, validatorOperatorAddress, index)
reward, _ := stakeHub.GetValidatorRewardRecord(nil, validatorOperatorAddress, index)
```

### How to get the unbonding delegations of a delegator, and his/her unbonding requests which can be claimed?

The `StakeHub` contract provides the `getUnbondingRequest` function to get the unbonding delegation count for a
delegator.
To review the details of a unbond request, you can call the `unbondRequest` function which a `index` parameter to
define which unbond request you are interested in.

To get the claimable unbonding requests, you can call the `claimableUnbondRequest` function to get the count of
claimable ones.

To get the locked BNBs for unbonding requests, you can use `lockedBNBs` function. It has the parameter `number` to
define the sum of first `number` unbonding requests' BNB locked in the delegator's unbond queue. You can set `number`
to `0` to get all the locked BNBs.

### How to get the reward of a delegator?

The contracts does not save the initial delegation amount of a delegator. So if you want to get the accumulated
reward you need to 1) track the initial delegation amount by yourself, 2) call `getPooledBNB` of the credit contract
of a validator, 3) do the math.

### How to get the total staking address of a validator?

The contract does not provide a function to get the total staking address of a validator.
You need a offchain service to index `Delegated`, `Redelegated`, `Undelegated` events to get what you want.

### How to get all validators' information?

The `StakeHub` contract provides the `getValidators` function to get all validators' information, including the
`operator` addresses and `credit contract` addresses.

If you want to get more information of a specific validator, please refer to the following functions:

* `getValidatorConsensusAddress`
* `getValidatorCreditContract`
* `getValidatorVoteAddress`
* `getValidatorBasicInfo`
* `getValidatorDescription`
* `getValidatorCommission`

## Contract ABI

For the full interfaces of `StakeHub`, please refer
to [the ABI file](https://github.com/bnb-chain/bsc-genesis-contract/blob/bc-fusion/abi/stakehub.abi).]()