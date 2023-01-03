---
sidebar_label: Overview
hide_table_of_contents: false
sidebar_position: 2
---

# Overview
Slashing is part of the on-chain governance, to ensure the malicious or negative behaviors are punished. BSC slash can be submitted by anyone. The transaction submission requires slash evidence and cost fees but also brings a larger reward when it is successful.

So far there are two slashable cases.

## Double Sign
It is quite a serious error and very likely deliberate offense when a validator signs more than one block with the same height and parent block. The reference protocol implementation should already have logic to prevent this, so only the malicious code can trigger this. When Double Sign happens, the validator should be removed from the Validator Set right away.

Anyone can submit a slash request on BC with the evidence of Double Sign of BSC, which should contain the 2 block headers with the same height and parent block, sealed by the offending validator. Upon receiving the evidence, if the BC verifies it to be valid:

The validator will be removed from validator set by an instance BSC validator set update Cross-Chain update;
A predefined amount of BNB would be slashed from the self-delegated BNB of the validator; Both validator and its delegators will not receive the staking rewards.
Part of the slashed BNB will allocate to the submitter’s address, which is a reward and larger than the cost of submitting slash request transaction
The rest of the slashed BNB will allocate to the other validators’ custody addresses, and distributed to all delegators in the same way as blocking reward.

## Inavailability
The liveness of BSC relies on everyone in the Proof of Staked Authority validator set can produce blocks timely when it is their turn. Validators can miss their turn due to any reason, especially problems in their hardware, software, configuration or network. This instability of the operation will hurt the performance and introduce more indeterministic into the system.

There can be an internal smart contract responsible for recording the missed blocking metrics of each validator. Once the metrics are above the predefined threshold, the blocking reward for validator will not be relayed to BC for distribution but shared with other better validators. In such a way, the poorly-operating validator should be gradually voted out of the validator set as their delegators will receive less or none reward. If the metrics remain above another higher level of threshold, the validator will be dropped from the rotation, and this will be propagated back to BC, then a predefined amount of BNB would be slashed from the self-delegated BNB of the validator. Both validators and delegators will not receive their staking rewards.

