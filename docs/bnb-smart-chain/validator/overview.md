---
title: BSC Validator Overview - BNB Smart Chain
---

# BSC Validator Overview

![validator](../img/Validator.png)

BNB Smart Chain(BSC) relies on a system of multiple validators with [Proof of Staked Authority (PoSA) consensus](https://github.com/bnb-chain/whitepaper/blob/master/WHITEPAPER.md#consensus-and-validator-quorum)
that can support short block time and lower fees. The most bonded validators in staking will have the opportunity to produce blocks.
The double-sign detection and other slashing logics ensure security, stability, and chain finality.

BSC conducts a daily election process post **00:00 UTC** to select the top **45** active validators based on their staking rankings for block production.
Among these, the **21** validators with the highest staked amounts are referred to as **Cabinets**, while the remaining **24** validators are known as **Candidates**.
The remaining inactive validators must wait for the next round of elections to become active validators before they can participate in block production.

In the set of **45** active validators, each epoch selects **18** validators from the **Cabinets** and **3** validators
from the **Candidates**, forming a group of **21** validators as the consensus validators set for the current epoch to
produce blocks. If a validator is elected as the consensus validator but fails to participate in produce blocks, it will
face slashing consequences.

**Cabinets** are more likely to be elected as consensus validators for block generation than **Candidates**, who have a slightly lower probability of being chosen for the same role.
However, whether it's **Cabinets** or **Candidates**, if they are not online when it's their turn to produce a block, they will be slashed.
This measure aims to encourage more validators to participate in the consensus, enhancing the decentralization and security of BSC.

## What is Validator?

Validators on the BSC are nodes responsible for producing blocks and securing the network through the [POSA consensus mechanism](https://github.com/bnb-chain/whitepaper/blob/master/WHITEPAPER.md#consensus-and-validator-quorum).
They participate in packaging transactions, creating and validating blocks to secure the BSC network, earning BNB tokens as rewards in exchange.
## Validator's Network Topology
![validator network topology](../img/validator-network-topology.png)
BSC validators are connected to each other based on the P2P network, they can be connected directly or indirectly. As a validator node, it can be run with 2 modes:
- Mode A(easy): Expose your validator's public IP directly, so it will join the P2P network directly. It can be connected to other validators or other full nodes. It is the simplest way and with high efficiency as it has less network hops, but it has some potential secure risk, as hacker could hack into your node if there is some security vulnerability.
- Mode B(secure): Hide your validator node behind 1 or more SentryNodes, which is just a normal BSC full node. The SentryNode serves as a bridge between the hidden validator node and public P2P network,
it mainly protects the validator from attacks like DDOS or some security flaws.

Both mode A and mode B are ok, if you have confidence with your node’s security, then mode A would have lower network latency.

## Economics

Validator's rewards come from transaction fees and commission fees from delegators.

Let us also assume that the reward for a block is 100 BNB and that a certain validator has **20%** of self-bonded BNB and sets its commission rate to **20%**. These tokens do not go directly to the proposer. Instead, they are shared among validators and delegators.  These **100 BNB** will be distributed according to each participant's stake:

```
Commission: 80*20%= 16 BNB
Validator gets: 100\*20% + Commission = 36 BNB
All delegators get: 100\*80% - Commission = 64 BNB
```

The rewards for motivating validators to vote for Fast Finality also comes from transaction fees. The specific rules can refer to [BEP126](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP126.md#43-reward)

If validators double sign, malicious vote or frequently offline, their staked BNB (not including BNB of users that delegated to them) can be slashed. The penalty depends on the severity of the violation.

You can learn to see the revenue history from BitQuery's [chart](https://explorer.bitquery.io/bsc/miners) or a table of [BscScan](https://bscscan.com/validatorset)

## Risks for Validators

If validators attempt to cheat the system or violate the specifications, they may incur a penalty known as **[slashing](../slashing/overview.md)**.

### Double Sign Slash

Running your validator keys simultaneously on two or more machines will result in Double-Sign slashing.
The penalty for double-sign slash:

1. **200 staked BNB** will be slashed for the validator.
2. The double sign jail time is **30 days**, preventing the malicious validator from participating in consensus until manual intervention is taken.

> Note:
> **Rewards for submitting double-sign evidence:** **5BNB**. 
> Anyone can submit a slashing request with the evidence of double sign, which should contain the **2 block headers** with the same height and parent block, sealed by the offending validator.


### Malicious Fast Finality Vote Slash

Running your validators with the same consensus keys and bls voting keys concurrently on two or more machines will result in malicious vote slash.
The penalty for malicious vote slash:

1. **200 staked BNB** will be slashed for the validator.
2. The malicious vote jail time is **30 days**, you can send an `unjail` transaction after the jail time to reactivate your validator.

> Note: **Rewards for submitting Malicious Vote evidence:** **5BNB**. Anyone can submit a slash request with the evidence of malicious vote on BSC, which should contain the **2 votes**, signed by the offending validator.


### Downtime Slash

If your validator misses over **50 blocks** in **24 hours**, the blocking reward won't be given to you but will be shared among other validators.
If your validator continues to miss more than **150 blocks** within **24 hours**, it will trigger the following penalty for being offline.

1. **10 staked BNB** will be slashed for the validator.
2. The offline jail time is **2 days**. This allows the validator to send an `unjail` transaction and resume as an active validator after 2 days.

### Low Self-Delegation Slash

Validators must stake a minimum of 2000 BNB for self-delegation. If the self-delegated amount is less, the penalty is 2 days of jail time.
