---
title: Partner FAQ - New L1
---

# Partner FAQ

Integration questions for application, infrastructure, trading, builder, and validator partners. For general compatibility questions, see the [General FAQ](./faq.md).

!!! note "Devnet status · Updated 2 November 2026"
    Devnet behavior can change between releases. Planned and proposed capabilities are identified below; roadmap dates are tentative.

## Network access and launch

### What can partners test now, and when are testnet and mainnet expected?

Partners can connect to the hosted devnet using the details below. Public testnet is tentatively targeted for Q1 2027 and mainnet for H2 2027. These are planning targets, subject to testing and release readiness.

### How do we get endpoints, chain details, test tokens, and integration support?

Use these devnet connection details:

- Gateway / HTTP RPC: [https://newl1-devnet-rpc.bnbchain.org/](https://newl1-devnet-rpc.bnbchain.org/)
- WebSocket: `wss://newl1-devnet-rpc.bnbchain.org/ws`
- Chain ID: 1105 (devnet)
- Block explorer: [newL1Trace](https://3c88a668d99f13eb2b89.com/)

Public testnet and mainnet are not live. The devnet is unstable and subject to breaking changes. Contact the BNB Chain SA team for test tokens, integration support, the current network version, and reset policy; no public faucet is available yet. See [Network Information](./get-started/network-info.md) for current details.

### Can we run our own devnet node? Do we need a snapshot?

Self-run devnet nodes can be arranged with the engineering team. Request the matching client build, genesis and configuration, peer/bootstrap details, and sync instructions. Confirm whether a compatible snapshot is available or syncing from genesis is preferred. Mainnet node-access policy and a public snapshot service are not yet confirmed.

### Can partners obtain source-code access?

Read-only partner repository access is under internal review. It is not yet an automatic part of onboarding. Use the public technical documentation and request release-specific implementation references through your technical contact.

### Can we participate as a builder or validator?

Partners interested in either role should raise it with BNB Chain for technical onboarding. Operating a node, providing gateway services, and joining the validator set are separate roles. Requirements, selection arrangements, and commercial terms need to be confirmed for the relevant network stage; expressing interest does not reserve a seat.

Reference: [Network Information](./get-started/network-info.md)

## Compatibility, assets, and privacy

### Does New L1 replace BSC, and is there a new native token?

No. BSC remains the broad-base network. Partners should evaluate New L1 for workloads that benefit from its ordering, capacity, account, or privacy features. BNB is the native gas asset; there is no separate native economic token.

### Will our existing contracts and tooling work?

Existing Solidity contracts and supported Ethereum transaction types are the starting point. Test the integration around declared-gas charging, delayed receipts, finality, and RPC differences. Native account abstraction uses type `0x76`; shielded transactions use type `0x77`. EVM compatibility does not make every Ethereum RPC or transaction type available.

### Can users transact without holding BNB?

Native fee sponsorship lets another account pay the network fee. A sponsor may separately offer token repayment where supported. The underlying network gas remains denominated in BNB; stablecoin repayment should not be described as native stablecoin gas.

### Is private order flow the same as private on-chain transactions?

No. Proposed TEE ordering protects transaction information before ordering. The optional shielded pool serves a different purpose: hiding supported on-chain transaction information. Integrating one does not automatically provide the other, and ordinary public contract interactions remain public.

### What changes should indexers and explorers expect?

Handle a transaction being ordered before its receipt is available, distinguish ordering finality from execution finality, and support the native transaction types you index. Paginate log queries to the endpoint's configured range. A missing receipt immediately after ordering does not by itself mean the transaction failed.

References: [Compatibility FAQ](./faq.md) · [Native Account Abstraction](./core-concepts/account-abstraction.md) · [Transaction Types](./developers/transaction-types.md)

## Fees, ordering, and account nonces

### Are fees charged on gas used or the declared gas limit?

For ordinary included account transactions, the charge is based on the declared gas limit, including when application execution fails. Unused gas does not reduce the charge. A larger limit also occupies more lane capacity. For example, at the same effective gas price, declaring 200,000 gas costs twice as much as declaring 100,000, even if execution uses the same amount.

### How should quote publishers, routers, aggregators, and liquidation bots set gas limits?

Estimate against representative current state, test expensive execution branches, and use a workload-specific margin. This is integration guidance, not a fixed protocol formula. An oversized limit increases cost; an undersized limit can fail execution. Variable-path workloads need particular care. Use `eth_estimateGas` for execution estimates and repeat testing after relevant state, contract, or client changes; receipt `gasUsed` reflects the declared limit rather than actual execution consumption.

### What priority fee should we set, and do lanes offer different prices?

There is no published universal tip that guarantees low latency or inclusion. Operator admission floors, competition, and available capacity matter. The partner discussion describes governance-approved lane-specific minimum prices; the exact fee fields and active values must be checked for the target release. A lower lane floor is not an unconditional zero-fee entitlement.

### Are transactions ordered by gas price, total fee, or arrival time?

Ordinary transactions are primarily ordered by gas price, subject to nonce and capacity constraints; increasing `gasLimit` alone does not improve rank. FIFO is not guaranteed. The proposed MEV Stage 1 scores bundles by their gas-limit-weighted average tip and breaks equal scores by the ordering unit's hash. Those are proposed service rules, not a universal live guarantee. Higher fees cannot reorder already-emitted SubBlocks.

### Can one account send independent transactions concurrently using nonce_key?

An account's transactions still follow sequential nonce ordering. The `nonce_key` field is reserved for a second nonce dimension and must currently be zero; independent parallel nonce lanes are not enabled. Multiple transactions may be submitted, but later nonces remain dependent on earlier ones. No activation date for 2D nonces is committed.

References: [Migration Guide](./get-started/migrate-from-bsc.md) · [Transaction Types](./developers/transaction-types.md)

## Reserved lanes and composability

### What does a dedicated lane guarantee?

A lane reserves gas capacity for eligible traffic so unrelated demand cannot consume that reservation. It does not guarantee that a particular transaction is included, succeeds, or meets a latency deadline. Transactions within the lane still compete for its quota. Reserved-but-unused capacity can serve General traffic.

### Who approves a lane, and can a builder change its rules?

Lane registration and governed parameters require governance approval. Execution and packing must respect the adopted configuration. Customization means choosing supported policies and parameters; it should not be interpreted as permission to upload arbitrary ordering code or for a builder to override consensus rules.

### How is a transaction assigned to a lane? Does an indirect call qualify?

The documented baseline uses the top-level destination address, not the function selector or the full inner call path. Calling a protected contract through an unregistered router does not inherit its reservation. Map the actual entry addresses and dependencies with engineering. Address-based routing also means different functions on the same entry address share its quota.

### Will lane transactions always be first in the block?

Ordering and execution are separate: lane transactions may appear anywhere in the ordered block, but they must execute before General-lane transactions. This execution priority is enforced at the protocol level.

### What happens when a transaction exceeds the lane's remaining capacity?

It can fall back to General and compete with other transactions on fees and available space. Same-block inclusion is not guaranteed; it may wait for a later block. Do not assume automatic reassignment to another dedicated lane. A transaction must still satisfy the applicable admission and size limits.

### Can a transaction interact with applications in different lanes?

No. Each lane has independent admission standards. A transaction can only be packaged and executed in one lane; it cannot span multiple lanes.

Reference: [Multi-Lane](./core-concepts/multi-lane.md)

## Routing, preconfirmation, and settlement

### Does no global mempool mean there are no pending transactions?

No. Gateways and producers retain local transaction pools. The submission node takes custody and forwards to upcoming producers instead of broadcasting every pending transaction across the network. A node's pending feed or transaction-status response is a local view, not a complete network-wide order-flow feed.

### Does a roughly 20 ms SubBlock mean guaranteed confirmation or execution?

No. It is an early, revocable ordering/inclusion signal. Queueing and network delay affect end-to-end latency, and a transaction can still revert when executed. Track preconfirmation, ordering, the execution receipt, and execution finality separately. Use a successful finalized execution result for settlement or other irreversible actions.

### What if a preconfirmation is withdrawn? Is there a break-rate target or compensation?

Handle aborted and superseded notifications and continue tracking the transaction. No numerical break-rate SLA or automatic compensation is committed here. The partner discussion describes governance and operator accountability rather than a current per-revocation economic penalty. Proposed incentives for TEE fallback are a separate mechanism.

References: [Transaction Lifecycle](./developers/transaction-lifecycle.md) · [Transaction Pre-confirmation](./core-concepts/tx-preconfirmation.md)

## MEV, searchers, and bundles

### What is the TEE Gateway, and is it already part of the devnet?

The existing gateway routes transactions. The proposed TEE Gateway adds ordering inside a trusted execution environment, with software-identity checks and MEV controls. Validators retain consensus and final-block responsibility. The TEE framework is still under development; ordinary RPC access does not establish that TEE protection is active.

### How can searchers or backrunners access order flow?

Coordinate the endpoint and enabled service version with the integration team. The first-stage MEV draft uses ordered SubBlock subscriptions, with opportunities submitted to a later, unfrozen SubBlock. It does not provide a global pending-transaction feed. Hints, disclosure policies, and an auction window are later design work, not baseline access entitlements.

### Will there be a 100 ms window to search for backruns?

A 100 ms candidate window has been discussed but is not committed for the first stage. Searcher latency budgets must be tested against the deployed service. Do not infer a guaranteed search window from the roughly 20 ms SubBlock cadence.

### Are bundles supported, and can they change an earlier SubBlock's order?

Bundle service is planned in the MEV rollout. The first-stage draft treats a bundle as an ordered, contiguous group and preserves frozen SubBlock order. A later bundle cannot pay to insert before or rewrite that prefix. Inclusion, revert handling, expiry, simulation, and retry rules require the released service specification; simulation success alone does not guarantee execution success.

### Can a gateway operator run its own backrun strategy? Will independent searchers have equal access?

Builder-integrated backruns remain possible in the current working discussion. Do not assume that running inside a TEE prevents this or gives all searchers identical information and latency. Admission rules, strategy constraints, information access, and revenue-sharing arrangements are still being specified. The design goal is transparent MEV rules; equal outcomes are not guaranteed.

### Does no global mempool or TEE ordering eliminate harmful MEV?

No blanket protection should be assumed. The TEE proposal aims to protect pre-order information and constrain harmful ordering, but transaction-disclosure rules are still evolving. First-stage bundle filtering has limited coverage; it is not proof that all sandwich strategies are blocked. Fallback and any proxy in the submission path introduce additional trust assumptions.

### Who selects the gateway, and what happens if it fails?

The working design gives validators control over their gateway relationship and final-block production. Operator selection and commercial terms are arranged outside a per-SubBlock builder auction. Fallback is intended to preserve ordinary transaction processing, but protection and bundle availability may differ. The release must state which transactions can downgrade and which services pause.

Reference: [TEE Gateway proposal (design proposal; not a deployment statement)](https://forum.bnbchain.org/t/introducing-newl1-mev-solution-tee-gateway/5589)

## Grants and integration incentives

### Are grants or integration incentives guaranteed?

No. Discuss eligibility and terms with BD. Technical access, a lane request, or participation in a pilot does not imply a grant or commercial commitment.
