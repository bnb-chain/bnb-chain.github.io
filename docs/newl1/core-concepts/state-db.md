---
title: State DB - New L1
---

# State DB

New L1 keeps world state in a flat key-value store and commits it with a cumulative lattice hash (LtHash): every live account and storage slot is hashed into a fixed-size vector, and the commitment is the sum of them all. The header still carries a 32-byte `state_root`, so nothing about the field's shape changes. What changes is how that value is produced, what it costs to produce, and what can be proven from it.

The property that shapes everything downstream is that the commitment is updated rather than rebuilt: changing one account costs the same whether the chain holds a thousand accounts or a billion, and the changes in a block can be folded in from any thread, in any order. That is what lets the commitment ride along with [async execution](./async-execution.md) instead of competing with it for the execution budget.

| | |
|---|---|
| Committed entries | Accounts (`nonce`, `balance`, `code_hash`) and non-zero storage slots |
| Entry hash | `BLAKE3` in extendable-output mode → 2048 bytes = 1024 × `u16` |
| Accumulator | Element-wise wrapping `u16` sum of all live entry hashes (2 KB) |
| Header `state_root` | `BLAKE3(accumulator)` → 32 bytes |
| Cost of one state change | O(1), independent of state size |
| Canonical on-disk state | Plain (un-hashed) keys |

## How the Commitment Works

### Entries

Every live piece of state is one entry, encoded with a frozen, consensus-critical layout:

| Entry | Key | Value |
|---|---|---|
| Account | `0x00 ‖ address` (21 B) | `nonce` (8 B LE) ‖ `balance` (32 B LE) ‖ `code_hash` (32 B) |
| Storage slot | `0x01 ‖ address ‖ slot` (53 B) | `value` (32 B BE) |

Three encoding decisions are load-bearing:

- **The leading kind byte is domain separation, not decoration.** Without it, an attacker could choose a 53-byte storage key that re-encodes the bytes of a 21-byte account key, and produce two different states with the same commitment.
- **Bytecode is committed by hash, not by content.** Only `code_hash` is part of an account entry; the code itself is stored content-addressed alongside, so identical bytecode deployed a thousand times is stored once and still commits distinctly per account.
- **A slot holding zero is not an entry.** The EVM cannot distinguish an unset slot from an explicitly-zeroed one, so committing them separately would let the same observable state have two different commitments.

### From Entry to Accumulator

Each entry is hashed as `BLAKE3(domain_tag ‖ 0x00 ‖ key ‖ 0x00 ‖ value)` in extendable-output mode and read out as 1024 little-endian `u16` elements. That vector is the entry's lattice hash. The domain tag and the null separators are part of chain identity: they make it impossible for a different `(domain, key, value)` triple to concatenate into the same input.

The world accumulator is the element-wise wrapping `u16` sum of the lattice hashes of every live entry. Empty state is the all-zero vector. Three properties follow:

- **Homomorphic.** Adding an entry is wrapping addition (`mix_in`); removing it is wrapping subtraction (`mix_out`). They are exact inverses, so updating one entry is `mix_out(old) + mix_in(new)`, which is O(1) regardless of how large the state is. It is also reversible: a change can be backed out exactly, given the entry it came from.
- **Commutative.** The order in which a block's state changes are folded in does not affect the result, so a block's diff can be hashed in parallel shards and reduced without locks, which is what keeps the commitment out of the way of parallel execution.
- **Bit-identical everywhere.** Plain `wrapping_add`/`wrapping_sub` over `[u16; 1024]`, with no SIMD intrinsics, no floating point, and no architecture-dependent behavior. Every validator on every platform computes the same bytes, which is a hard requirement for something consensus votes on.

Security rests on the Short Integer Solution problem: forging a second state set with the same accumulator means finding a short lattice vector that sums to zero. The 1024 × `u16` dimension targets ~128-bit security, following Bellare–Micciancio (1997) and the same construction Solana adopted in SIMD-0215.

### The Header Field

The 2048-byte accumulator is compressed to the header's 32-byte `state_root` as `BLAKE3(accumulator_bytes)`. Nodes keep the full accumulator; the chain publishes its digest, so the header stays the same size and shape as any EVM chain's.

### Applying a Block

Execution hands the accumulator a diff, never a full state scan. When the EVM finishes a block, its post-execution bundle is projected into three kinds of change (account created or updated, account deleted, storage slot written), and each one folds into the parent block's accumulator. The result is the block's post-state commitment, published in its [`ExecutionCommitment`](./async-execution.md#how-it-works).

Because the accumulator is bit-identical only when its inputs are, the projection has to be exact about cases where "changed" is subtle:

- **No-op writes are skipped.** A storage write whose old and new value are equal contributes nothing; folding it in as a change would be harmless arithmetically but is skipped so the work scales with real changes.
- **`SELFDESTRUCT` under EIP-6780 only removes accounts created in the same transaction.** Their pre-state storage is empty by construction, so there are no stale slot entries to subtract. A `SELFDESTRUCT` against a pre-existing contract zeroes its balance and leaves the account in place, which is an ordinary account update.
- **EIP-161 empty-account cleanup** deletes an account that has no storage, so a single account-entry subtraction is the whole change.

### Genesis

The genesis accumulator is folded over the chainspec's `alloc` under the same rules (every listed account included unconditionally, zero-valued slots excluded), and its digest becomes the genesis header's `state_root`. There is no fork-activation gate: the chain has used one commitment scheme since block 0.

## Forks, Reorgs, and Restarts

Accumulators are tracked per block hash, not per height. A node keeps the accumulators for the last 256 blocks in memory, so competing branches each carry their own state commitment simultaneously.

This makes reorg handling structural rather than expensive. Switching to a sibling branch is a map lookup of that branch's parent accumulator, not a state rewind and re-hash; and because `mix_in` and `mix_out` are exact inverses, backing out a block's changes is subtraction rather than recomputation. Below that window, only finalized accumulators matter, and those are on disk.

Two guards are worth knowing about if you run a node:

- **Genesis mismatch is fatal at boot.** If the accumulator stored in the datadir disagrees with the one computed from the chainspec (an operator pointing an existing datadir at a different chain, or an edited `alloc`), the node refuses to start rather than silently forking its view from its peers.
- **Restart replays a short window.** On boot the node reseeds from the persisted finalized tip and re-executes the trailing persisted blocks, so it needs those blocks' parent accumulators retained; the restored window is sized to the maximum execution lag.

## Why Cumulative Matters for Validation

Because the accumulator is a running sum over all live state, it is not a per-block checksum: every block's commitment depends on all state that came before it. A single divergent entry anywhere poisons that block's commitment and every descendant's, and no subsequent block can quietly repair it.

That is what makes [execution-result disputes decidable](./async-execution.md#correctness-enforcement) in a chain where validators vote on ordering rather than on someone else's execution result: a validator that executes a block locally and computes a different accumulator abstains, and a wrong result can never gather the vote quorum it needs to finalize. Divergence detection itself is a 32-byte comparison, with no tree walk and no per-account reconciliation, and it happens within a bounded number of blocks.

## Storage Layout

The commitment is defined over plain keys, so plain state rather than keccak-hashed state is the canonical on-disk representation. Hashing the keys would discard the address preimages, and those preimages are what state sync serves and what an audit re-derives the accumulator from: any node can walk its own plain state, recompute the accumulator from scratch, and compare it against what the chain published.

State is split across three stores, each matched to its write pattern:

| Store | Holds | Why |
|---|---|---|
| MDBX | Plain account and storage state, LtHash accumulators, consensus snapshots | Canonical state; transactional reads on the execution path |
| Static files | Headers, transactions, receipts, senders, account/storage changesets | Append-only, sequential writes with no index to maintain |
| RocksDB | History indices, transaction-hash lookup | Random-keyed writes that degrade a B-tree over time; an LSM absorbs them |

Finalized accumulators are archived one 2 KB row per block, written in the same transaction as the block, its receipts, and its state, which is roughly 0.9 GB per day at a 200 ms block interval. They are archive data on the same footing as receipts and state history, and are retained in full today; pruning them on the same retention distance as receipts is a scheduled follow-up.

## What Changes

**If you write contracts or dApps, nothing changes.** Contracts, opcodes, gas costs, and ordinary state reads (`eth_getBalance`, `eth_getStorageAt`, `eth_call`) behave exactly as on any EVM chain, and `stateRoot` is still a 32-byte field on the header.

**If you build bridges, light clients, or anything proof-based, `eth_getProof` always rejects with `-32004`.** The commitment is a sum, not a tree, so there is no inclusion path to hand over as a proof: it can attest that a whole state is what it claims to be, but not that one account belongs to it. Until an accumulator-native inclusion proof ships, verification has to rest on the chain's [BLS finality votes](./consensus.md) and full-node responses rather than on a self-verifying state proof.

**If you run infrastructure, two operational differences matter:**

- **Snap sync does not exist.** It replicates a hashed state tree, and there isn't one to replicate. New nodes backfill over the chain's own P2P protocol; a checkpoint-accumulator state sync is planned to replace it.
- **Whole-state debug reads reject with `-32004`:** `debug_dumpBlock`, `debug_accountRange`, `debug_storageRangeAt`, `debug_stateSize`, `debug_intermediateRoots`. They fail with an explicit "not supported here" rather than `-32601`, so clients don't waste a retry against another endpoint. Per-block and per-account reads are unaffected.

See [JSON-RPC Endpoint](../developers/json_rpc/json-rpc-endpoint.md) for the complete RPC-surface differences.
