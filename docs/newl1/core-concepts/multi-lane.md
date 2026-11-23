---
title: Multi-Lane - New L1
---

# Multi-Lane

Multi-Lane reserves guaranteed gas capacity inside every block for specific latency-sensitive transaction classes, called lanes, so a burst of unrelated traffic can't crowd them out. It's a New L1–specific mechanism with no equivalent on BNB Smart Chain.

## Guarantees

Multi-Lane is a capacity guarantee, not an inclusion guarantee:

- A lane's reserved gas share can never be exceeded by other traffic.
- When eligible transactions for that lane are available, its reserved share is preserved for them.
- Multi-Lane does not guarantee that any specific transaction gets included, and it does not provide first-in-first-out fairness within a lane. Ordering within a lane still follows normal fee-priority rules.

## Lane Assignment

Lane classification is deterministic and address-based:

- Every transaction whose destination (`to`) address is a registered contract is routed to that contract's configured lane.
- Unregistered addresses and contract-creation transactions fall into the default, uncapped lane.
- There is no calldata- or function-selector-level routing. A lane protects an address, not a use case: any transaction sent to a registered address shares that address's lane quota, whether or not it's the kind of traffic the lane was reserved for.

## Quota Configuration

Lane-to-address mappings and reserved shares live in the on-chain `LaneRegistry` contract (address `0x0000000000000000000000000000000000003000`), which is governed, so changes go through the same [governance process](../governance/overview.md) as any other protocol parameter.

- Each protected lane reserves a basis-point share of the block gas limit (for example, a lane configured at 1,500 bps receives 15% of the block's gas limit).
- The default lane absorbs whatever capacity is left over, including any reserved-but-unused capacity from other lanes in that block.
- Lane occupancy is currently measured by each transaction's declared gas limit, not its actual gas used, a consequence of blocks being ordered before they're executed (see [Consensus](./consensus.md)). A transaction can therefore occupy more of a lane's quota than it ultimately consumes.

## Timing Caveat

Lane configuration is read from a fixed, slightly-lagged checkpoint of executed state rather than the very latest block. A governance-approved change to lane quotas therefore takes effect after a short delay (on the order of the execution lag), not on the very next block. Don't assume same-block activation when testing a quota change.

You can read the live, governance-resolved lane configuration via the [`newl1_laneConfig`](../developers/json_rpc/newl1-api-list.md#newl1_laneconfig) RPC method.

## For Developers

If your protocol has latency-sensitive transaction flow (e.g. an AMM's swap path, a lending protocol's liquidation calls) that you want protected from unrelated congestion, the practical path is:

1. Identify the contract address(es) that should receive lane protection.
2. Propose (or request) registration of that address in `LaneRegistry` with an appropriate basis-point reservation via [governance](../governance/overview.md).
3. Protection is per-address, not per-function: anything sent to that address consumes the same reserved quota.
