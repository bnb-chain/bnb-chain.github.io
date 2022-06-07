---
sidebar_label: Overview
sidebar_position: 2
hide_table_of_contents: false
---
# Overview

BNB Smart Chain is an innovative solution to bring programmability and interoperability to Beacon Chain. BNB Smart Chain relies on a system of 21 active validators with [Proof of Staked Authority (PoSA) consensus](https://github.com/bnb-chain/whitepaper/blob/master/WHITEPAPER.md#consensus-and-validator-quorum) that can support short block time and lower fees. The most bonded validator candidates of staking will become validators and produce blocks. The double-sign detection and other slashing logic guarantee security, stability, and chain finality.

Other than the 21 active validators, BSC will introduce more validators, e.g. another 20 inactive validators, into the validator set as backups, which will be called “Candidates”.

Candidates will produce blocks and charge gas fees in BSC mainnet, but in a much less chance than the official validator set of 21 elected. The unavailable candidates will be slashed as well though in a smaller size. A decent motivation is expected to be maintained so that the candidate validators are willing to ensure the quality and help secure BSC.

In an extreme case, if a majority of the active 21 validators get attacked and offline, Candidate Validators can report to Beacon Chain about the stale blocking, resume it and eventually propose a re-election of active validator set.

## What is Validator?

BNB Smart Chain relies on a set of validators who are responsible for committing new blocks in the blockchain. These validators participate in the consensus protocol by signing blocks that contain cryptographic signatures signed by each validator's private key.  The validator set is determined by a staking module built on Beacon Chain for BNB Smart Chain, and propagated every day UTC 00:00 from BC to BSC via Cross-Chain communication.


## Economics

Validator's rewards come from transaction fees and commission fees from delegators.

Let us also assume that the reward for a block is 100 BNB and that a certain validator has 20% of self-bonded BNB and sets its commission rate to 20%. These tokens do not go directly to the proposer. Instead, they are shared among validators and delegators.  These 100 BNB will be distributed according to each participant's stake:

```
Commission: 80*20%= 16 BNB
Validator gets: 100\*20% + Commission = 36 BNB
All delegators get: 100\*80% - Commission = 64 BNB
```

If validators double sign, are frequently offline, their staked BNB ( not including BNB of users that delegated to them) can be slashed. The penalty depends on the severity of the violation.

You can learn to see the revenue history from BitQuery's [chart](https://explorer.bitquery.io/bsc/miners) or a table of [BscScan](https://bscscan.com/validatorset)

## Risks for Validators

If you try to cheat the system, or act contrary to the specification, you will be liable to incur a penalty, known as **[slashing](bc-slashing.md)**.


### Potential Loss


#### Loss for Double-Sign Slash

Running your validator keys simultaneously on two or more machines will result in Double-Sign slashing.

Penalty for Double-Sign Slash:

1. 10000 staked BNB will be slashed for the validator.
2. The Double-Sign Jail time is 2^63-1 seconds, which means the candidate cannot become a validator anymore.

> Note: Rewards for submitting double-sign evidence: 1000BNB Anyone can submit a slashing request on BC with the evidence of Double Sign of BSC, which should contain the 2 block headers with the same height and parent block, sealed by the offending validator.


#### Loss for Offline Slash:


If a validator missed more than 50 blocks every 24h, the blocking reward for validator will not be relayed to BC for distribution but shared with other better validators. If it missed more than 150 blocks every 24h, then this will be propagated back to BC where another Slashing will happen

Penalty for Offline Slash:

1. 50 staked BNB will be slashed for the validator.
2. The Downtime Jail time is 2 days, which means the candidate can send a `unjail` transaction to become a candidate again.



#### Loss for Too Low self-delegation

Validator candidates must stake 10000BNB as self-delegation. If the self-delegation amount is lower, the Jail time is 1 day.
