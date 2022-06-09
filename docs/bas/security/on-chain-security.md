---
sidebar_label: On-chain Security
---

# On-chain security

Everything that goes on BAS is controlled by the governance model: from the blockchain consensus, change proposals, and staking.

## Governance

On-chain governance helps solve important consensus questions, such as runtime upgrades, increasing the validator set, or adjusting blockchain parameters.
By voting for honest validators, users also distribute the voting power between validators in the on-chain governance.

## Change proposals 

Users are able to propose changes, including changes in governance. 
Each proposal is reviewed and voted for by other BAS users.
Only after reaching the quorum, a governance proposal can be applied.

Here is the list of available proposals:
* Add or remove a validator from the validator set
* Manage blockchain parameters:
  * Number of active validators 
  * Epoch block interval
  * Misdemeanor threshold
  * Felony threshold
  * Validator jail epoch duration
  * Undelegate period during which no claiming funds are available
  * Minimum validator stake amount
  * Minimum stake amount
* Upgrade existing runtime or deploy new system smart contracts


## Staking

We want BAS to be as decentralized as possible, so while validators in the network produce blocks, other validators verify these blocks.

Validators are incentivized to perform by positive and negative factors.

Validators that optimize their environment get bigger rewards and lower commission rates. 
In turn, they are elected by the users more often.

However, if a validator is underperforming, it gains fewer staking rewards, and users vote for it less often.
And if a validator misses a block, it can be punished or even slashed and jailed for 1 week for bad performance.

Besides these factors, validators in the BAS network are also incentivized in the following ways:
* Well-configured network allows to get them more transactions in the pool and, as a result, increases APY.
* Better CPU makes it possible to include more transactions in blocks.
* Each missed block causes a reward miss, and transactions in it go to the next validator.
* Recurring block misses can lead to the validator being punished and losing rewards for 1 epoch, which is usually 1 day.
* Underperforming validators go to jail for 1 week and lose 1/4 of their monthly rewards.
* Non-valid or malicious blocks are rejected by honest validators, which indirectly causes bad validators to miss the reward.

