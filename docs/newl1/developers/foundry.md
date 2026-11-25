---
title: Using Foundry - New L1
---

# Using Foundry

Foundry (`forge`, `cast`, `anvil`) works against New L1's standard JSON-RPC. Reading state, fork tests, and `forge script` deployments behave as on other EVM chains. Foundry's local EVM doesn't model how New L1 executes and charges transactions, though, so a few things need configuring or behave differently. This page covers the Foundry-specific parts. For the general differences, see [Migrating from BSC](../get-started/migrate-from-bsc.md).

!!! note "Devnet stage"
    This page reflects the current devnet client and Foundry 1.8 and 1.9. Both may change.

## Configuration

```toml
# foundry.toml
[profile.default]
evm_version = "prague"
```

New L1 runs Prague rules. Recent Foundry versions compile and test for Osaka by default, so local tests can use features the chain doesn't have (see [EVM Differences](#evm-differences)).

```sh
RPC=https://newl1-devnet-rpc.bnbchain.org/

anvil --fork-url $RPC --hardfork prague
# In another terminal, mine one block before using the fork
cast rpc anvil_mine 0x1 --rpc-url http://127.0.0.1:8545

forge script script/Deploy.s.sol --rpc-url $RPC --broadcast --gas-estimate-multiplier 110
```

- `--hardfork prague` keeps the blocks anvil mines on top of the fork on the chain's rules.
- Mine one block before using the fork. Block headers don't include `excessBlobGas`, so calls on a fresh fork can fail with `Excess blob gas not set` until anvil mines its own block. On Foundry 1.8 this happens even with `--hardfork prague`. `forge test --fork-url` and `forge script` aren't affected.
- `--gas-estimate-multiplier 110` replaces Foundry's default of 130. See [Gas](#gas).
- Sign with `--private-key`, `--account`, or a hardware wallet. The RPC manages no accounts (`eth_accounts` is empty and `eth_sendTransaction` isn't served), so `--unlocked` doesn't work.
- Foundry doesn't know chain ID 1105 by name, so pass `--rpc-url` instead of a chain alias. Foundry also labels amounts as ETH. On New L1 they are BNB.

## Gas

New L1 charges every transaction its full declared gas limit with no refund, and the receipt's `gasUsed` equals that limit (see [You Pay for Your Declared Gas Limit](../get-started/migrate-from-bsc.md#you-pay-for-your-declared-gas-limit)). `eth_estimateGas` still reports the gas a call actually consumes. In Foundry this means:

- **Headroom is spent.** `forge script`'s default `--gas-estimate-multiplier 130` pays 30% over the estimate on every transaction, and `cast send --gas-limit N` pays exactly `N`.
- **Keep a small margin anyway.** Estimates run against executed state, which trails the newest ordered block by a few blocks, and a transaction that runs out of gas is still charged its full limit. 5–10% is a reasonable start when a call's gas doesn't depend on fast-changing state.
- **Storage refunds are never paid**, so refund-based gas optimizations save nothing.
- **Gas reports measure execution, not cost.** `forge test --gas-report` and `forge snapshot` report EVM gas, not what a transaction is charged on chain.
- **Per-transaction cap.** A transaction can declare at most 16,777,216 gas. Foundry's local test gas limit is far higher, so a large deployment can pass locally and be rejected on submission. With the default 130% multiplier, any estimate above about 12.9 million gas exceeds the cap.

## Fees

The base fee is always 0, so the priority fee is the entire gas price. Foundry estimates it from `eth_feeHistory`, which on lightly used blocks gives 1 wei. The default node configuration accepts 1 wei. If a node requires more, sends fail with `transaction underpriced`. In that case, set the price with `--priority-gas-price` (or `--legacy --gas-price`). `cast gas-price` returns a different suggestion from `eth_gasPrice`, currently 1 gwei.

## EVM Differences

- **Prague, not Osaka.** `CLZ` (EIP-7939) isn't activated. Executing it halts and consumes all gas given to the call, while the same code passes a local test compiled for Osaka. The P256VERIFY precompile at `0x100` (EIP-7951) doesn't exist, so libraries such as OpenZeppelin's `P256` fall back to a much more expensive Solidity implementation. `evm_version = "prague"` makes local tests match the chain.
- **`block.prevrandao` differs between fork tests and the chain.** On chain it returns the Parlia difficulty: `2` for an in-turn block, `1` for an out-of-turn one. Foundry's fork mode returns the block's `mixHash` instead, which on New L1 holds the timestamp's milliseconds. Never use it as a source of randomness.
- **`block.timestamp` repeats.** Timestamps are whole seconds and blocks are 200 ms apart, so about five consecutive blocks share one. The milliseconds are in the low 8 bytes of `mixHash`. Code that assumes timestamps strictly increase from block to block breaks.
- **No beacon roots.** The EIP-4788 beacon-roots contract (`0x000F3df6D732807Ef1319fB7B8bB8522d0Beac02`) isn't deployed, so a call to it returns no data.

### New L1 Precompiles

| Address | Purpose |
|---|---|
| `0x66` | BLS vote-key signature verification |
| `0x67` | Poseidon2 permutation |
| `0x68` | Double-sign evidence verification |
| `0x4000` | `AccountKeychain`, the [account abstraction](../core-concepts/account-abstraction.md) key registry |
| `0x4001` | `SignatureVerifier` |

Foundry's EVM has none of these, in fork mode too. A call to one reaches an empty account, "succeeds", and returns no data, so ABI decoding fails. Mock them in tests with `vm.mockCall` or `vm.etch`.

### Lanes

A transaction routed into a [lane](../core-concepts/multi-lane.md) may read and write only its lane's configured scope and its own sender, recipient, and fee payer. It may also read precompiles. If it touches anything else, it reverts with no revert data, it is charged its full gas limit, and all of its writes are dropped. Foundry can't simulate this, so test lane-routed contracts on the devnet. Transactions to addresses without a lane are unaffected. [`newl1_laneConfig`](./json_rpc/newl1-api-list.md#newl1_laneconfig) returns the current lanes and their scopes.

### System Transactions

After the user transactions, a block can run system transactions for slashing, fee deposits, finality rewards, validator-set updates, and shielded-pool inserts. A fork doesn't replay them, so fork tests involving `ValidatorSet`, `StakeHub`, or `ShieldedPool` can drift from the chain.

Fees never accrue to `block.coinbase`. They are collected at the system address and forwarded to `ValidatorSet` by a system transaction. Foundry's local EVM pays tips to the coinbase after each transaction instead.

## Transaction Types

- Foundry sends legacy (EIP-155), EIP-2930, and EIP-1559 transactions, which New L1 accepts. It can't build New L1's own [`0x76` and `0x77` transactions](./transaction-types.md).
- **EIP-7702 (`0x04`) is rejected.** `cast send --auth` fails with `unsupported transaction type 0x04`. Tests built on `vm.signDelegation` or `vm.attachDelegation` pass locally but can't be broadcast.
- **EIP-4844 (`0x03`) is rejected.** `cast send --blob` fails before sending, because the node doesn't serve `eth_blobBaseFee`.
- **Legacy transactions without a chain ID** (pre-EIP-155) are rejected.

## RPC Behavior

- **Nonces.** `eth_getTransactionCount` counts ordered transactions but not those still waiting in the pool, and `"pending"` returns the same as `"latest"`. Back-to-back `cast send --async` calls can therefore sign two transactions with the same nonce. The second is rejected with `replacement transaction underpriced`, `nonce N already occupied by pooled tx …`, or, once the first is in a block, `nonce too low`. If its tip is higher by at least 10% and at least 1 wei, it replaces the first instead, and the first never executes. Wait until each transaction is in a block (`cast tx` shows a `blockNumber`), or pass `--nonce`. `forge script` assigns nonces itself and isn't affected.
- **Receipts.** `eth_getTransactionReceipt` returns error `-38004`, not `null`, while the transaction's block is ordered but not yet executed. Foundry stops waiting when a receipt request returns an error, so `cast send` can exit with `-38004` even though the transaction was accepted and will execute. Run `cast receipt <TX_HASH>` again a moment later.
- **Log queries.** One `eth_getLogs` request may span at most 1,000 blocks (about 3.3 minutes) and return at most 10,000 logs and 8 MiB. Exceeding any of these fails with `-32005` instead of truncating. `cast logs` doesn't split a range for you, so query in chunks.
- **Unexecuted blocks.** A block that is ordered but not yet executed can still be fetched by explicit number, with `stateRoot`, `receiptsRoot`, `logsBloom`, and `gasUsed` set to `null`. `cast`, and anything else that decodes blocks with alloy, rejects such a block with `invalid type: null`. Block numbers from `eth_blockNumber` never hit this, but numbers from `newl1_subscribeNewHeads` or from a transaction's `blockNumber` can. The devnet genesis block also returns these fields as `null`, so `cast block 0` and `cast chain` fail the same way.
- **No state proofs.** `eth_getProof` fails with `-32004`, so `cast proof` doesn't work (see [State DB](../core-concepts/state-db.md)).

## Replays and Traces

- **`cast run` reports a gas mismatch whenever the gas limit exceeded the gas used**, because the receipt records the gas limit.
- **`0x76` transactions can't be replayed or traced.** `cast run` fails with `cannot convert unknown transaction type 0x76 to TxEnv`, and `debug_traceTransaction` doesn't support them either.
- **`cast run` also fails on any transaction preceded in its block by a `0x76` or `0x77` transaction**, because it replays those first. `--quick` skips them at the cost of an inexact starting state.
- **The devnet RPC serves the `debug` namespace** (`debug_traceTransaction`, `debug_traceCall`, `debug_traceBlockByNumber`, and others), so `cast run --debug-trace-transaction` shows the node's own trace, including for transactions preceded by `0x76` or `0x77` transactions. Traces report the gas a transaction actually consumed. A trace replays the whole block and stops after 5 seconds unless the `timeout` option asks for more, up to 30 seconds. Parity-style `trace_*` methods aren't served.

## Contract Verification

No contract verification service is available for the devnet yet, so `forge verify-contract` and `forge script --verify` can't be used.
