
# BSC Slashing Overview
Slashing is a component of on-chain governance that penalizes malicious or negative actions. Anyone can submit a slash transaction on BSC, which involves providing evidence and paying fees. Successful submissions yield significant rewards.
Currently, there are three types of slashable cases.

## Double Sign
It is quite a serious error and very likely a deliberate offense when a validator signs more than one block with the same height and parent block. The reference protocol implementation should already have logic to prevent this, so only the malicious code can trigger this. When Double Sign happens, the validator should be removed from the Validator Set right away.

Anyone can submit a slash transaction with the evidence of Double Sign to the BSC Slash Contract, which should contain the 2 block headers with the same height and parent block, sealed by the offending validator.
Upon receiving the evidence, the contract will verify its validity.

The validator will be removed from validator set, a predefined amount of BNB would be slashed from the self-delegated BNB of the validator.
Both validator and its delegators will not receive the staking rewards.
Part of the slashed BNB will be allocated to the submitter’s address, which is a reward and larger than the cost of submitting slash request transaction.
The rest of the slashed BNB will be allocated to the other validators’ credit addresses, and distributed to all delegators in the same way as blocking reward.

## Malicious Fast Finality Vote
It is quite a serious error and very likely a deliberate offense when a validator signs two fast finality votes with the same target height or the span of one vote including the span of another vote.
The reference protocol implementation should already have logic to prevent this, so only the malicious code can trigger this. 
When Malicious Vote happens, the validator should be removed from the Validator Set right away.

Anyone can submit slash transaction with the evidence of Malicious Vote to the BSC Slash Contract.
Evidence of malicious voting needs to be provided, which includes two conflicting votes and the voting key used for the signature.
Upon receiving the evidence, the contract will verify its validity.

The validator will be removed from the current set of validators, and the submitter will receive the reward from the system contract.
A predefined amount of BNB would be slashed from the self-delegated BNB of the validator.
Both validator and its delegators will not receive the staking rewards.
The slashed BNB will be allocated to the other validators’ credit addresses, and distributed to all delegators in the same way as blocking reward.

## Unavailability
The liveness of BSC relies on everyone in the Proof of Staked Authority validator set can produce blocks timely when it is their turn.
Validators can miss their turn due to any reason, especially problems in their hardware, software, configuration or network.
This instability of the operation will hurt the performance and introduce more indeterministic into the system.

There is an internal smart contract that records the missed blocking metrics of each validator.
If the metrics exceed the set threshold, the blocking reward for the validator will not be given to them but shared with other validators performing better.
This process aims to gradually remove poorly-operating validators from the set, reducing rewards for their delegators.

If the metrics stay above a higher threshold, the validator will be removed from rotation, and a set amount of BNB will be deducted from their self-delegated BNB.
This action results in both validators and delegators not receiving their staking rewards.

