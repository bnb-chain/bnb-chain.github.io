---
title: Integration FAQ - New L1
---

# Integration FAQ

Technical integration and partner-onboarding questions for application teams, infrastructure providers, traders, builders, and validators. For chain positioning, network status, assets, sponsorship basics, and privacy, start with the [General FAQ](./general.md).

!!! note "Devnet guidance · Reviewed 5 November 2026"
    Devnet behavior can change between releases. Planned and proposed capabilities are identified below. Confirm the client and service version before relying on release-specific behavior.

## Network access and partner onboarding

### How do we get endpoints, chain details, test tokens, and integration support?

Use [Network Information](../get-started/network-info.md) for the current HTTP and WebSocket endpoints, chain ID, explorer, and faucet availability.

Contact the BNB Chain Solutions Architecture (SA) team for test tokens, integration support, the matching client version, and reset policy. See [General FAQ](./general.md#is-new-l1-live-on-mainnet) for network status and tentative launch targets.

### Can we run our own devnet node? Do we need a snapshot?

Self-run devnet nodes can be arranged with the engineering team. Request the matching client build, genesis and configuration, peer/bootstrap details, and sync instructions. Confirm whether a compatible snapshot is available or syncing from genesis is preferred. Mainnet node-access policy and a public snapshot service are not yet confirmed.

### Can partners obtain source-code access?

Read-only partner repository access is under internal review. It is not yet an automatic part of onboarding. Use the public technical documentation and request release-specific implementation references through your technical contact.

### Can we participate as a builder or validator?

Partners interested in either role should raise it with BNB Chain for technical onboarding. Operating a node, providing gateway services, and joining the validator set are separate roles. Requirements, selection arrangements, and commercial terms need to be confirmed for the relevant network stage; expressing interest does not reserve a seat.

## Contract, account, and tooling integration

### What differences should we test when migrating contracts and tooling?

Test declared-gas charging, block-number and timestamp assumptions, sequential nonces, delayed receipts, finality, and RPC differences. Native account abstraction uses type `0x76`; shielded transactions use type `0x77`. EIP-4844 and EIP-7702 transactions are not supported.

Execution-layer compatibility does not establish that every SDK, Ethereum RPC, or application assumption works unchanged. Start with [Migrating from BSC](../get-started/migrate-from-bsc.md) and the [Quick Guide](../developers/quick-guide.md), then test your actual integration.

### Do I need to use ERC-4337 tooling (bundlers, paymasters) for account abstraction?

No. New L1's account abstraction is native, enforced by consensus rather than by a deployed EntryPoint contract, so no bundler or paymaster contract is involved. Use the native `0x76` transaction format and its signing rules. For sponsorship and optional token repayment, see [Account Abstraction](../core-concepts/account-abstraction.md#fee-sponsorship).

### Why doesn't `eth_getProof` work?

New L1 commits state with a cumulative hash accumulator instead of a Merkle-Patricia trie, so there is no trie-based proof to serve. Proof-dependent integrations need a different design; do not assume an Ethereum proof-verification path will work. See [State DB](../core-concepts/state-db.md) and [RPC differences](../developers/json_rpc/newl1-api-list.md#divergences-from-geth).

### What changes should indexers and explorers expect?

Handle a transaction being ordered before its receipt is available, distinguish ordering finality from execution finality, and support the native transaction types you index. Paginate log queries to the endpoint's configured range.

For `eth_getTransactionReceipt`, `-38004` means ordered but not yet executed and should be retried; `null` means the hash is unknown to that endpoint, not proof of execution lag or transaction failure. See [Transaction Lifecycle](../developers/transaction-lifecycle.md) and [Transaction Types](../developers/transaction-types.md).

## Fees, ordering, and account nonces

### Are fees charged on gas used or the declared gas limit?

For ordinary account transactions with a valid nonce and sufficient balance at execution, the charge is based on the declared gas limit, including when application execution reverts or runs out of gas. Unused gas does not reduce that charge. A larger limit also occupies more lane capacity. At the same effective gas price, declaring 200,000 gas costs twice as much as declaring 100,000, even if execution uses the same amount.

Rejection before inclusion does not charge gas. Execution-time invalidity has separate settlement rules: for example, an invalid nonce causes no charge, while insufficient balance can limit the amount collected. See [Async Execution](../core-concepts/async-execution.md#paying-for-block-space) and [AA failure handling](../core-concepts/account-abstraction.md#when-something-goes-wrong).

### How should quote publishers, routers, aggregators, and liquidation bots set gas limits?

Estimate against representative current state, test expensive execution branches, and use a workload-specific margin. This is integration guidance, not a fixed protocol formula. An oversized limit increases cost; an undersized limit can fail execution. Variable-path workloads need particular care.

Use `eth_estimateGas` for execution estimates and repeat testing after relevant state, contract, or client changes. For ordinary user transactions, receipt `gasUsed` normally reflects the declared limit rather than actual EVM consumption; execution-time invalidity has the [exceptions described above](#are-fees-charged-on-gas-used-or-the-declared-gas-limit). See [Migrating from BSC](../get-started/migrate-from-bsc.md#you-pay-for-your-declared-gas-limit).

### What priority fee should we set, and do lanes offer different prices?

There is no universal tip that guarantees low latency or inclusion. The current devnet's base fee is pinned to zero, so the effective price is `min(maxFeePerGas, maxPriorityFeePerGas)`; a zero tip is rejected. Operator admission floors, competition, and available capacity matter.

Lane-specific minimum prices have been discussed, but a capacity reservation alone does not establish a separate fee entitlement. Confirm supported fee fields, active prices, and lane pricing for the target release. See [RPC fee behavior](../developers/json_rpc/newl1-api-list.md#divergences-from-geth).

### Are transactions ordered by gas price, total fee, or arrival time?

Ordinary transactions are primarily ordered by effective gas price, subject to nonce and capacity constraints; increasing `gasLimit` alone does not improve rank. FIFO is not guaranteed. Higher fees cannot reorder already-emitted SubBlocks.

Bundle scoring and tie-breaking belong to the enabled service's ruleset. Confirm them in its released specification rather than applying an unversioned draft formula to ordinary transactions or all MEV services.

### Can one account send independent transactions concurrently using nonce_key?

An account's transactions still follow sequential nonce ordering. The `nonce_key` field is reserved for a second nonce dimension and must currently be zero; independent parallel nonce lanes are not enabled. Multiple transactions may be submitted, but later nonces remain dependent on earlier ones. No activation date for 2D nonces is committed.

## Reserved lanes and composability

### What does a dedicated lane guarantee?

A lane reserves gas capacity for eligible traffic so unrelated demand cannot consume that reservation. It does not guarantee that a particular transaction is included, succeeds, or meets a latency deadline. Transactions within the lane still compete for its quota. Reserved-but-unused capacity can serve General traffic.

### Who approves a lane, and how do we request reserved capacity?

Identify the top-level destination addresses that need protection and request their registration in `LaneRegistry`, with an appropriate basis-point reservation, through [governance](../governance/overview.md). Registration and governed parameters require approval; a builder cannot override the adopted configuration.

Check the active configuration with [`newl1_laneConfig`](../developers/json_rpc/newl1-api-list.md#newl1_laneconfig). An inert configuration has no activated lanes. Approved changes use a lagged executed-state checkpoint, so do not assume same-block activation. Customization is limited to supported policies and parameters, not arbitrary ordering code. See [Multi-Lane](../core-concepts/multi-lane.md).

### How is a transaction assigned to a lane? Does an indirect call qualify?

The documented baseline uses the top-level destination address, not the function selector or the full inner call path. Calling a protected contract through an unregistered router does not inherit its reservation. Map the actual entry addresses and dependencies with engineering. Address-based routing also means different functions on the same entry address share its quota.

### Will lane transactions always be first in the block?

Do not infer first position or execution priority from a capacity reservation. The public [Multi-Lane reference](../core-concepts/multi-lane.md#guarantees) establishes reserved capacity, but does not specify a universal rule requiring dedicated-lane transactions to execute before General traffic. Confirm release-specific ordering and execution rules before relying on that behavior.

### What happens when a transaction exceeds the lane's remaining capacity?

A reservation does not guarantee that a particular transaction fits or is included in the same block. Do not assume automatic spillover into General or another dedicated lane. Confirm the target release's overflow and admission behavior with engineering, and size transactions against the active lane quota and per-transaction gas cap. Reserved-but-unused capacity serving General traffic is a separate rule; it does not establish the reverse fallback behavior.

### Can a transaction interact with applications in different lanes?

A transaction is assigned to one lane using its top-level destination; inner calls do not acquire additional lane reservations. That classification alone does not establish whether calls between particular applications are allowed or restricted. Confirm the supported call paths and any enforced restrictions with engineering rather than treating lane assignment as a blanket ban on contract-to-contract interaction. See [Lane Assignment](../core-concepts/multi-lane.md#lane-assignment).

## Routing, preconfirmation, and settlement

### Does no global mempool mean there are no pending transactions?

No. Gateways and producers retain local transaction pools. The submission node takes custody and forwards to upcoming producers instead of broadcasting every pending transaction across the network. A node's pending feed or transaction-status response is a local view, not a complete network-wide order-flow feed.

### When should an integration treat a transaction as settled?

For settlement that depends on execution success, require a successful receipt, wait until the transaction's block number is at or below `eth_blockNumber("finalized")`, and re-check that the canonical block hash matches its `blockHash`.

Track pre-confirmation, ordering, execution, and execution finality separately. Queueing and network delay affect latency, and an ordered transaction can still revert. Raw order finality is sufficient only for decisions that depend on order alone. See [Transaction Lifecycle](../developers/transaction-lifecycle.md#order-execute-and-finalize) and [Transaction Pre-confirmation](../core-concepts/tx-preconfirmation.md).

### What if a preconfirmation is withdrawn? Is there a break-rate target or compensation?

Handle aborted and superseded notifications and continue tracking the transaction. No numerical break-rate SLA or automatic compensation is committed here. The partner discussion describes governance and operator accountability rather than a current per-revocation economic penalty. Proposed incentives for TEE fallback are a separate mechanism.

## MEV, searchers, and bundles

The answers below distinguish the documented client from the public [TEE Gateway proposal](https://forum.bnbchain.org/t/introducing-newl1-mev-solution-tee-gateway/5589). The proposal describes a design, not the current devnet service specification.

### What is the TEE Gateway, and is it already part of the devnet?

The existing gateway routes transactions. The proposed TEE Gateway adds ordering inside a trusted execution environment, with software-identity checks and MEV controls. Validators retain consensus and final-block responsibility. The TEE framework is still under development; ordinary RPC access does not establish that TEE protection is active.

### How can searchers or backrunners access order flow?

Coordinate the endpoint and enabled service version with the integration team. The documented client provides ordered SubBlock subscriptions, not a global pending-transaction feed. The public TEE Gateway proposal also describes sender-authorized hints; those proposed services are not established by ordinary RPC access. Confirm supported feeds and disclosure rules for the service you connect to.

### Will there be a 100 ms window to search for backruns?

The public TEE Gateway proposal describes a 100 ms opt-in delay window. This is a proposal, not a guaranteed window on the current devnet or a commitment for the first released service. Test searcher latency budgets against the deployed version; do not derive a search window from the roughly 20 ms SubBlock cadence.

### Are bundles supported, and can they change an earlier SubBlock's order?

Bundle service is planned in the MEV rollout. Proposed bundles preserve an ordered, contiguous group and cannot rewrite an already-emitted SubBlock prefix. Inclusion, revert handling, expiry, simulation, and retry rules require the released service specification; simulation success alone does not guarantee execution success. See the [TEE Gateway proposal](https://forum.bnbchain.org/t/introducing-newl1-mev-solution-tee-gateway/5589), which is not a deployment statement.

### Can a gateway operator run its own backrun strategy? Will independent searchers have equal access?

The public TEE Gateway proposal prohibits ordering-operator self-dealing and hidden identity-based ordering advantages. A TEE by itself does not establish compliance with those rules or identical information, latency, or outcomes for every searcher. Verify the deployed service's admission, disclosure, strategy, and revenue-sharing rules rather than treating an operator's own backrun strategy as an approved entitlement.

### Does no global mempool or TEE ordering eliminate harmful MEV?

No blanket protection should be assumed. The TEE proposal aims to protect pre-order information and constrain harmful ordering; it does not prove that a deployed service blocks every sandwich strategy. Fallback behavior and any proxy in the submission path introduce additional trust assumptions. Confirm the protection mode and disclosure policy of the actual service.

### Who selects the gateway, and what happens if it fails?

The working design gives validators control over their gateway relationship and final-block production. Operator selection and commercial terms are arranged outside a per-SubBlock builder auction. Fallback is intended to preserve ordinary transaction processing, but protection and bundle availability may differ. The release must state which transactions can downgrade and which services pause.

## Grants and integration incentives

### Are grants or integration incentives guaranteed?

No. Discuss eligibility and terms with BD. Technical access, a lane request, or participation in a pilot does not imply a grant or commercial commitment.
