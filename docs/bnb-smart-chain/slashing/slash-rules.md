---
title: BSC Slash Rules - BSC Slashing
---

# BSC Slash Rules

Three types of malicious behaviors can lead to slashing on the BSC network.

## Double Sign

Anyone can submit a slash request with evidence of Double Sign. The evidence must adhere to the following rules:

* Two block headers have the same height and the same parent block hash
* Two block headers are sealed by the same validator
* Two signatures of these two blocks must not be the same
* The time of these two blocks must be within the validity of the evidence, which is 24 hours

If the evidence is valid:

1. **200BNB** would be slashed from the **self-delegated** BNB of the validator
2. The remaining slashed BNB will be allocated to the credit addresses of validators participating in the next distribution 
3. Set the validator `jailed` with a duration of **30 days**, and remove it from the active validator set


## Malicious Vote
Anyone can submit a slash request on BSC with the evidence of Malicious Vote. The evidence must adhere to the following rules:

* The target number voted by two votes lags behind the block header of the canonical chain by no more than 256
* The source numbers of the two votes are both smaller than their respective target numbers
* The source hash and target hash of the two votes are both not equal
* The target number of the two votes is the same or the span of one vote includes the span of the other vote
* The two votes are signed by the same voting key, and the verification of signatures are both passed
* The voting key used for signing is in the list sent by the last two breathe blocks

If the evidence is valid:

1. **200BNB** would be slashed from the **self-delegated** BNB of the validator
2. **5BNB** would allocate to the submitter from the system reward contract as a reward if the validator is active when the evidence submitted
3. The remaining slashed BNB will be allocated to the credit addresses of validators participating in the next distribution
4. Set the validator `jailed` with a duration of **30 days**, and remove it from the active validator set

## Unavailability

There is an internal smart contract that records the missed blocking metrics of each validator.

If a validator misses over 200 blocks(governable) in 24 hours, they will not receive the block reward; instead, it will be shared among other validators.

If a validator misses more than 600 blocks(governable) in 24 hours:

1. **10BNB**(governable) would be slashed from the  **self-delegated** BNB of the validator
2. The slashed BNB will be allocated to the credit addresses of validators participating in the next distribution
3. Set the validator `jailed` with a duration of **2 days**, and remove it from the active validator set