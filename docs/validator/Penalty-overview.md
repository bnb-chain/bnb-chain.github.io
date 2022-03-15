---
sidebar_label: Slashing and Jail
hide_table_of_contents: false
sidebar_position: 2
---

# Penalty for Bad Behaviour by Validators

On the BNB Smart Chain (BSC) network, validators are responsible for securing the network by processing transactions and signing blocks. Validator nodes are incentivized in the form of transaction fees for their good behavior. Currently, there are 8 validators on the testnest and 21 active and 20 candidate validators on the mainnet. Validators are selected every 24 hours making the network highly decentralized. Anyone can become a candidate for the validator. To become part of the selection process of validators, the nodes have to stake their BNB. Validators can self-delegate (self-bound) BNB to themselves and can also receive delegations from any other BNB holders. The minimum amount for self-delegation is 10,000 BNB. Only the top 21 highest-staked nodes are chosen to be part of the validator set. To make sure that validators do not abuse the power entrusted to them, BSC has on-chain slashing mechanism to monitor their behavior. 

## Slashing and Jail

BSC introduces Slashing logic to penalize Byzantine validators for double signing or inavailability. The slashed validator will eventually be jailed. Validators who are in jail status cannot participate in the consensus mechanism or earn rewards during that period of time. Slashing ensures that validators who act maliciously or show bad behavior are not rewarded. Furthermore, it is designed to expose attackers and make execution attempts extremely expensive. BSC slash requests can be submitted by any public users. All BSC slash requests require slash evidence and transaction cost fees, and rewards will be given to successful slash requests. To ensure that the delegators are not punished for the validator's bad behavior, only self-bonded BNB of the validator are slashed. Currently, slashing is applied on any node that processes any invalid transaction, double-signing or unavailable for a defined period of time. The consensus mechanism will automatically accuse the offline validator within its block by generating a slash transaction, the other fullnode will verify the correctness of the slash transaction to avoid abusing.

