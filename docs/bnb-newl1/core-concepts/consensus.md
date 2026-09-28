---
title: Consensus - BNB NewL1
---

# Consensus: Parlia PoSA + BLS Fast Finality

BNB NewL1's consensus is derived from Parlia, the Proof-of-Staked-Authority protocol securing BNB Smart Chain. Parlia has run in production for years, through several rounds of block-time reduction, and already has the properties BNB NewL1's latency targets need. BNB NewL1 takes it with tuned parameters and a handful of deliberate divergences, stripped of BSC's accumulated hardfork gating: the chain runs one configuration from genesis, with no activation heights and no feature flags.

## Parameters

| Parameter | Value |
|---|---|
| Block interval | 200 ms |
| Finality | sub-second, via cross-block BLS votes |
| Epoch | 2,250 blocks (7.5 minutes) |
| Proposer turn length | 16 blocks |
| Validator set | up to 64 validators, PoSA |

## Block Production

Validators take turns proposing, rotating every 16 blocks in sorted order. If the in-turn proposer misses its slot, out-of-turn validators step in after a randomized backoff, with the delay schedule seeded deterministically so every node computes the same order. In-turn blocks carry more weight than out-of-turn blocks, so the chain converges back to the schedule as soon as the in-turn proposer returns.

## Fast Finality

Finality comes from a BLS vote overlay, the same construction BSC uses, with one property that matters more here than anywhere else: validators sign a block's ordering, not its execution result. That is what makes order-execution decoupling possible, and consensus never waits for the EVM.

The flow:

1. Each validator signs a vote for the head block on every canonical update.
2. The next proposer aggregates votes into a single BLS attestation once ⌈2N/3⌉ validators have signed, and embeds it in its block header. Finality proofs travel with the chain itself, so a node that has the headers has the proofs.
3. Justified and finalized heights are derived from the attestations using Casper-FFG rules: an attestation whose source and target are consecutive finalizes the source. There is no imperative "mark finalized" step anywhere: every node reads the same finality state out of the same chain.

In the common case a block is justified one block later and finalized two blocks later, roughly half a second at the 200 ms interval.

Finality also backstops [asynchronous execution](./async-execution.md): a validator abstains from voting on any block whose published `ExecutionCommitment` its own local execution disproves, so an incorrect execution result cannot gather the ⌈2N/3⌉ votes it needs to finalize.

## Validator Set

Validators stake BNB through the on-chain staking system (`StakeHub`, see [Governance](../governance/overview.md)). Elections run once per day at a designated block, ranking candidates by stake; epoch-boundary headers bind the elected set, and every node validates against the set the chain itself recorded.

Double-sign evidence is detected automatically and submitted on-chain for slashing; each validator also keeps a local journal that makes it refuse to sign conflicting votes or blocks in the first place.

## For Developers

- Validator admission and rotation are on-chain and queryable (see [`newl1_getValidatorSchedule`](../developers/json_rpc/newl1-api-list.md#newl1_getvalidatorschedule)).
- Block interval, turn length, and epoch length are chain parameters, not assumptions to hardcode into client code.
- For a bridge release or another action that depends on successful execution, wait until a later block records the result and finalizes, then verify the transaction receipt. Finality of transaction order alone does not confirm that execution succeeded. See [Transaction Pre-confirmation](./tx-preconfirmation.md) for the faster, best-effort signal available before finality.

## What's Next

Parlia is the current default rather than a permanent commitment. The properties BNB NewL1 actually depends on are a fixed 200 ms cadence, ordering-only votes, and sub-second finality. Any consensus that preserves those can slot in behind the same interfaces. Next-generation designs are under evaluation, in particular Minimmit, a minimal BFT protocol that reaches finality in fewer communication rounds, as a candidate for Consensus 2.0. The consensus layer sits behind narrow seams in the node architecture precisely so that this migration, if and when it comes, is a component swap rather than a rewrite.
