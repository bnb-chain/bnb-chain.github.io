---
title: Governance - New L1
---

# Governance

New L1 controls protocol parameters through fully on-chain, token-weighted governance, running the same Compound/OpenZeppelin `Governor` + `Timelock` engine as BNB Smart Chain. There is no admin key or externally-owned account that can bypass this process: every governed contract only accepts changes routed through the governance flow.

## What's Governable

Protocol and system parameters: staking and slashing constants, and New L1–specific configuration such as the [Multi-Lane](../core-concepts/multi-lane.md) quotas in `LaneRegistry`. Validator-set membership itself is not a governance vote; it's decided automatically by a stake-weighted election that runs once per day (see below), while the parameters that shape staking and elections are governable.

## Voting Power

1. Stake bridged BNB with `StakeHub`.
2. Staking mints govBNB 1:1 against staked value, a non-transferable `ERC20Votes` token that exists purely as a voting ledger.
3. govBNB only counts as active voting power once delegated, either to yourself or to a validator. Holding undelegated govBNB carries zero voting weight.

## Lifecycle

1. **Propose.** A proposer with enough delegated govBNB to clear the proposal threshold submits a proposal targeting `GovHub.updateParam(key, value, target)`. Multiple parameter changes can be bundled atomically into a single proposal.
2. **Vote.** govBNB holders cast votes during the voting period.
3. **Quorum.** The proposal succeeds once quorum is reached and the voting period ends.
4. **Queue.** A succeeded proposal is queued on the `Timelock` contract.
5. **Timelock delay.** A mandatory minimum delay must elapse before the change can execute, giving the community time to react to a passed but not-yet-active change.
6. **Execute.** The `Timelock` calls `GovHub.updateParam`, which forwards `updateParam(key, value)` to the target system contract.

Two access-control gates make this the only path to change anything governed: every governed target only accepts calls from `GovHub`, and `GovHub` only accepts calls from the `Timelock`.

!!! note
    Some parameters (for example, [Multi-Lane](../core-concepts/multi-lane.md) quota changes) take effect only after an additional short activation delay on top of the timelock delay, since node clients read that configuration from a slightly-lagged executed-state checkpoint rather than the very latest block.

## How to Participate

- **Delegate or stake.** Bridge BNB to New L1, then call `StakeHub.delegate(validatorOperator, delegateVotePower=true)`, which also mints govBNB automatically.
- **Become a validator.** Register via `StakeHub.createValidator`, which verifies your BLS vote key.
- **Vote.** Delegate your govBNB, to yourself or to a validator, then cast votes on active proposals through the `Governor` contract.
- **Propose.** Hold or have delegated enough govBNB to clear the proposal threshold, then submit a proposal via `Governor.propose`.

`Governor` and `Timelock` are compiled from the same OpenZeppelin/Compound contracts BSC uses (with New L1's own timing constants), so tooling built against a standard OZ Governor interface, Tally for example, should work without changes. This manual hasn't independently verified any specific third-party tool against a live deployment.

## Validator-Set Rotation

Validator-set membership updates automatically (see [Consensus](../core-concepts/consensus.md)): an election runs once per day at a designated block, reading the top validators by voting power from `StakeHub` and updating the active validator set on-chain, which the next epoch-boundary header then binds. No separate governance proposal is required for this routine rotation.

See [System Contracts](./system-contracts.md) for the full list of contracts involved and their addresses.
