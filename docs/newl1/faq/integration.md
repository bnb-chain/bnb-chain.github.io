---
title: Integration FAQ - New L1
---

# Integration FAQ

Technical integration and partner-onboarding questions for application teams, infrastructure providers, traders, builders, and validators. For chain positioning, network status, assets, sponsorship basics, and privacy, start with the [General FAQ](./general.md).

!!! note "Devnet guidance · MEV, Multi-Lane and privacy updated 25 November 2026"
    Devnet behavior can change between releases. Planned and proposed capabilities are identified below. Confirm the client and service version before relying on release-specific behavior.

## Network access and partner onboarding

### How do we get endpoints, chain details, test tokens, and integration support?

Use [Network Information](../get-started/network-info.md) for the current HTTP and WebSocket endpoints, chain ID, explorer, and faucet availability.

For devnet BNB, bridge tBNB from BSC Testnet using the [Cross-Chain Bridge](../developers/cross-chain-bridge.md). Contact the BNB Chain Solutions Architecture (SA) team for integration support, the matching client version, and reset policy. See [General FAQ](./general.md#is-new-l1-live-on-mainnet) for network status and tentative launch targets.

### Can we run our own devnet node? Do we need a snapshot?

Self-run devnet nodes can be arranged with the engineering team. Request the matching client build, genesis and configuration, peer/bootstrap details, and sync instructions. Confirm whether a compatible snapshot is available or syncing from genesis is preferred. Mainnet node-access policy and a public snapshot service are not yet confirmed.

### Can partners obtain source-code access?

Read-only partner repository access is under internal review. It is not yet an automatic part of onboarding. Use the public technical documentation and request release-specific implementation references through your technical contact.

### Can we participate as a builder or validator?

Partners interested in either role should raise it with BNB Chain for technical onboarding. Operating a node, providing gateway services, and joining the validator set are separate roles. Requirements, selection arrangements, and commercial terms need to be confirmed for the relevant network stage; expressing interest does not reserve a seat.

## Bridging BNB

### How do I move BNB between BSC and New L1?

Call `transferOut` on the source chain's `TokenHub` with the recipient and a delivery fee, attaching the amount plus the fee as the transaction value. The BNB usually arrives in a few seconds as native BNB, with no wrapped token. On devnet the bridge connects to BSC Testnet, which is also how you get devnet BNB. Use testnet BNB (tBNB) only: the bridge contracts are unaudited and the devnet may be reset. See [Cross-Chain Bridge](../developers/cross-chain-bridge.md).

### My bridged BNB hasn't arrived. What should I check?

Check `terminalRecord(messageId)` on the destination `CrossChainHub`. If it records a successful delivery but the balance did not change, inspect the destination `TokenHub` events for that `messageId`: a large transfer may need `matureLockedCredit` after its lock, or a failed payout may need `withdraw` to collect the recipient's claim. If there is no record yet, the bridge may be paused, rate-limited, or waiting for source finality. A terminal record with `success = false` means governance declared the transfer failed and a refund follows on the source chain. See [Track a Transfer](../developers/cross-chain-bridge.md#track-a-transfer) and [Failures and Refunds](../developers/cross-chain-bridge.md#failures-and-refunds).

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

On devnet2, `eth_getTransactionReceipt` returns `-38004` when a transaction is ordered but not yet executed; retry while execution catches up. A `null` response means the hash is unknown to that endpoint and does not establish transaction failure. See [Transaction Lifecycle](../developers/transaction-lifecycle.md) and [Transaction Types](../developers/transaction-types.md).

## Fees, ordering, and account nonces

### Are fees charged on gas used or the declared gas limit?

For ordinary account transactions with a valid nonce and sufficient balance at execution, the charge is based on the declared gas limit, including when application execution reverts or runs out of gas. Unused gas does not reduce that charge. A larger limit also occupies more lane capacity. At the same effective gas price, declaring 200,000 gas costs twice as much as declaring 100,000, even if execution uses the same amount.

Rejection before inclusion does not charge gas. Execution-time invalidity has separate settlement rules: for example, an invalid nonce causes no charge, while insufficient balance can limit the amount collected. See [Async Execution](../core-concepts/async-execution.md#paying-for-block-space) and [AA failure handling](../core-concepts/account-abstraction.md#when-something-goes-wrong).

### How should quote publishers, routers, aggregators, and liquidation bots set gas limits?

Estimate against representative current state, test expensive execution branches, and use a workload-specific margin. This is integration guidance, not a fixed protocol formula. An oversized limit increases cost; an undersized limit can fail execution. Variable-path workloads need particular care.

Use `eth_estimateGas` for execution estimates and repeat testing after relevant state, contract, or client changes. For ordinary user transactions, receipt `gasUsed` normally reflects the declared limit rather than actual EVM consumption; execution-time invalidity has the [exceptions described above](#are-fees-charged-on-gas-used-or-the-declared-gas-limit). See [Migrating from BSC](../get-started/migrate-from-bsc.md#you-pay-for-your-declared-gas-limit).

### What priority fee should we set, and do lanes offer different prices?

There is no universal tip that guarantees low latency or inclusion. The current devnet's base fee is pinned to zero, so the effective price is `min(maxFeePerGas, maxPriorityFeePerGas)`; a zero tip is rejected. Operator admission floors, competition, and available capacity matter.

The lane registry configures minimum gas capacity. There is no lane-specific gas price. See [Multi-Lane](../core-concepts/multi-lane.md).

### Are transactions ordered by gas price, total fee, or arrival time?

Ordinary transactions are primarily ordered by effective gas price, subject to nonce and capacity constraints; increasing `gasLimit` alone does not improve rank. FIFO is not guaranteed. Higher fees cannot reorder already-emitted SubBlocks.

The Gateway compares bundles by their declared-gas-weighted effective tip, with arrival sequence and hash as tie-breakers. See [bundle admission and ordering](../core-concepts/mev.md#bundle-admission-and-ordering).

### Can one account send independent transactions concurrently using nonce_key?

An account's transactions still follow sequential nonce ordering. The `nonce_key` field is reserved for a second nonce dimension and must currently be zero; independent parallel nonce lanes are not enabled. Multiple transactions may be submitted, but later nonces remain dependent on earlier ones. No activation date for 2D nonces is committed.

## Reserved lanes and composability

### What does a dedicated lane guarantee?

A lane retains its minimum share even while idle. General traffic and each lane’s usage above its minimum compete for the public budget. Eligible transactions still need to fit and satisfy nonce and validity checks. See the [worked gas example](../core-concepts/multi-lane.md#guarantees).

### Who approves a lane, and how do we request reserved capacity?

Request entry routes, accepted transaction types, an administrator, and a minimum share through [governance](../governance/overview.md). At epoch rotation the client adopts the configuration from an executed ancestor. Read [`newl1_laneConfig`](../developers/json_rpc/newl1-api-list.md#newl1_laneconfig) to see what governs the next block.

### How is a transaction assigned to a lane? Does an indirect call qualify?

Ordinary calls match the outer transaction type and destination. Calling through an unmatched router leaves the transaction in General. Native AA checks every call and any fee token. Native privacy envelopes always use General. See [Lane assignment](../core-concepts/multi-lane.md#lane-assignment).

### Will lane transactions always be first in the block?

Builders may interleave lanes and General in a single ordered body. Validators check capacity across the complete block. Lane membership gives no position guarantee.

### What happens when a transaction exceeds the lane's remaining capacity?

It may use available public gas above its own minimum. If it still cannot fit, the packer leaves it in its original lane for a later attempt and can select smaller transactions from other senders.

### Can a transaction interact with applications in different lanes?

An empty access scope allows ordinary EVM interactions. With a configured scope, the client checks nested accesses against the permitted addresses and protocol exceptions. Escaping the scope reverts user writes and retains the gas charge. Inner calls never acquire another reservation.

## Routing, preconfirmation, and settlement

### Does no global mempool mean there are no pending transactions?

Nodes retain local transaction pools. Ordinary RPC traffic can use the Gateway or validator forwarding. A pending feed or transaction-status response describes only the queried node.

### When should an integration treat a transaction as settled?

For settlement that depends on execution success, require a successful receipt, wait until the transaction's block number is at or below `eth_blockNumber("finalized")`, and re-check that the canonical block hash matches its `blockHash`.

Track pre-confirmation, ordering, execution, and execution finality separately. Queueing and network delay affect latency, and an ordered transaction can still revert. Raw order finality is sufficient only for decisions that depend on order alone. See [Transaction Lifecycle](../developers/transaction-lifecycle.md#order-execute-and-finalize) and [Transaction Pre-confirmation](../core-concepts/tx-preconfirmation.md).

### What if a preconfirmation is withdrawn? Is there a break-rate target or compensation?

A signed Gateway prefix can differ from the block eventually sealed. Reconcile against canonical blocks after a stream interruption or validator fallback. The protocol provides no break-rate or compensation guarantee.

## MEV, searchers, and bundles

See [MEV and the TEE Gateway](../core-concepts/mev.md) for the client implementation. Endpoint availability and operator terms depend on the deployment.

### What is the TEE Gateway, and is it already part of the devnet?

The client implements an optional TEE Gateway for transaction ordering, bundles, and signed SubBlocks. The validator seals the final block. Check with the deployment operator for its enabled endpoint and eligible registered key.

### How can searchers or backrunners access order flow?

Subscribe to signed, published SubBlocks through the [Gateway stream](../core-concepts/tx-preconfirmation.md#how-to-subscribe). Unpublished private transactions stay inside the selected submission path.

### Will there be a 100 ms window to search for backruns?

The public TEE Gateway proposal describes a 100 ms opt-in delay window. This is a proposal, not a guaranteed window on the current devnet or a commitment for the first released service. Test searcher latency budgets against the deployed version; do not derive a search window from the roughly 20 ms SubBlock cadence.

### Are bundles supported, and can they change an earlier SubBlock's order?

Yes, the Gateway admits bundles after simulation and detection checks. It appends an admitted bundle as a contiguous ordered group. A successful simulation cannot guarantee the same outcome against the eventual execution state.

### Can a gateway operator run its own backrun strategy? Will independent searchers have equal access?

External searchers can submit bundles under the Gateway's published scoring and detection rules. An open-source built-in backrun strategy and explicit profit distribution are future work. The chain already distinguishes proved and local blocks for protocol fees. See [fee distribution and unproved blocks](../core-concepts/mev.md#fee-distribution-and-unproved-blocks).

### Does no global mempool or TEE ordering eliminate harmful MEV?

The Gateway screens individual bundles for sandwich patterns on configured V2/V3 pools. Its admission response reports coverage. Transactions across bundles or pools outside the configured set can escape detection. An RPC intermediary can also see any plaintext submitted through it.

### Who selects the gateway, and what happens if it fails?

The validator selects one eligible registered Gateway key for a specific slot. The on-chain registry records eligibility and the permit binds that proposer and key for the slot. If the candidate is invalid or unavailable, the validator can build locally after the original permit expires. Only ordinary node-RPC traffic can fall back to validator forwarding. Private submissions and bundles return an error.

## Grants and integration incentives

### Are grants or integration incentives guaranteed?

No. Discuss eligibility and terms with BD. Technical access, a lane request, or participation in a pilot does not imply a grant or commercial commitment.
