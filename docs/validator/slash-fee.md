---
sidebar_label: Slashing Fee
hide_table_of_contents: false
sidebar_position: 2
---

# Slashing Fee and Evidence Validation

## Double Sign

Anyone can submit a slash request on BC with the evidence of Double Sign of BSC

### Evidence Validation
* Two block headers have the same height and the same parent block hash
* Two block headers are sealed by the same validator
* Two signatures of these two blocks must not be the same
* The time of these two blocks must be within the validity of the evidence, which is 24 hours

If the evidence is valid:

1. **10,000BNB** would be slashed from the **self-delegated** BNB of the validator
2. If the self-delegator’s stake amount on the validator is less than 10,000BNB, then the unbonded delegation balance would be slashed if it exists until totally 10,000BNB slashed from the self-delegator of the validator. However, if all the slashed BNB is less than 10,000, all the remaining stake of the self-delegator will be slashed
3. **1000** of slashed BNB would allocate to the submitter as a reward
4. The rest of slashed BNB will allocate to the custody addresses of which validators would take part in the next distribution. If no matched validators found, then the rest of slashed BNB will allocate to validators on BC as block fee
5. Set the validator ‘jailed’ with a duration of 292 years, and remove it from validator set by an instance BSC validator set update Cross-Chain update


## Malicious Vote
Only relayers can submit a slash request on BSC with the evidence of Malicious Vote of BSC for now. Open access to anyone is planned.
* The target number voted by two votes lags behind the block header of the canonical chain by no more than 256
* The source numbers of the two votes are both smaller than their respective target numbers
* The source hash and target hash of the two votes are both not equal
* The target number of the two votes is the same or the span of one vote includes the span of the other vote
* The two votes are signed by the same voting key, and the verification of signatures are both passed
* The voting key used for signing is in the list sent by the last two breathe blocks

If the evidence is valid:

1. **10,000BNB** would be slashed from the **self-delegated** BNB of the validator
2. If the self-delegator’s stake amount on the validator is less than 10,000BNB, then the unbonded delegation balance would be slashed if it exists until totally 10,000BNB slashed from the self-delegator of the validator. However, if all the slashed BNB is less than 10,000, all the remaining stake of the self-delegator will be slashed
3. **50BNB** would allocate to the submitter from the systemreward contract as a reward if the validator is active when the evidence submitted
4. The slashed BNB will allocate to the custody addresses of which validators would take part in the next distribution. If no matched validators found, then the slashed BNB will allocate to validators on BC as block fee
5. Set the validator ‘jailed’ with a duration of 292 years, and remove it from validator set by an instance BSC validator set update Cross-Chain update


## Unavailability

There can be an internal smart contract responsible for recording the missed blocking metrics of each validator.

If a validator missed more than 50 blocks in 24h, the blocking reward for the validator will not be relayed to BC for distribution but shared with other better validators. If it missed more than 150 blocks in 24h, then this will be propagated back to BC where another Slashing will happen:

1. **50BNB** would be slashed from the  **self-delegated** BNB of the validator
2. If the self-delegator’s stake amount on the validator is less than 50BNB, then the unbonded delegation balance would be slashed if it exists until totally **50BNB** slashed from self-delegator of the validator. However, if all the slashed BNB is less than 50, all the remaining stake of the self-delegator will be slashed
3. **10** of slashed BNB would allocate to the validators on BC as block fee
4. The rest of slashed BNB will allocate to the custody addresses of which validators would take part in the next distribution. If no matched validators found, then the rest of slashed BNB will allocate to validators on BC as block fee
5. Set the validator ‘jailed’ with a duration of 2 days, and remove it from validator set by an instance BSC validator set update Cross-Chain update

