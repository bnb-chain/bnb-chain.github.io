---
title: Shielded Pool (Privacy) - New L1
---

# Shielded Pool: Native Transaction Privacy

New L1 includes a native shielded pool, a system contract that lets users deposit ("shield") funds, transact inside the pool with sender, recipient, and amount all hidden, and later withdraw ("unshield") back to a normal, transparent address. It sits alongside standard, fully transparent EVM transactions as an opt-in privacy layer, built from the established shielded-pool primitives (notes, commitments, nullifiers, zk-SNARKs).

!!! warning "Not yet audited or production-ready"
    The shielded pool is an early-phase feature. As detailed below, its zk-SNARKs trusted setup is currently an imported one rather than a ceremony New L1 ran, and the circuits are unaudited. Do not treat it as safe for real value.

## Why It Matters

In a normal transparent EVM transaction, `from`, `to`, `amount`, and asset are always public on-chain. A shielded-pool transaction instead uses zk-SNARKs to prove that it is valid (no funds created from nothing, no double-spend) without revealing which of the pool's notes were spent or where the value went. An observer only learns that some valid shielded-pool transaction occurred.

## Core Concepts

- **Note.** A private record of value: an owner commitment, amount, and asset, plus whether it's "open" (see below). Notes are the pool's unit of value, analogous to a UTXO.
- **Commitment.** A hash of a note's contents, inserted as a leaf into an append-only Merkle tree. Spending a note requires proving Merkle-tree membership without revealing which leaf it is.
- **Nullifier.** A value published when a note is spent, derived from the note and the owner's spend key, used to prevent double-spending. Every spend burns two: a spend has one or two real inputs, and an unused input slot burns an indistinguishable "phantom" nullifier instead, so the count never reveals how many real inputs a transfer had.
- **Split proof.** Every spend carries two PLONK proofs. The pool proof covers value conservation (inputs equal outputs plus anything leaving the pool), Merkle membership, nullifier derivation, and knowledge of the spend key. The auth proof covers an EIP-712 signature from the EOA whose public key is committed in the note being spent. Both must verify, and the note's own commitment is what binds them to each other.
- **Keys.** A single 32-byte seed derives a spend key (spend authority and nullifier derivation), a note-secret seed (per-note blinding, so notes to the same recipient are unlinkable to each other), and a view key (used only to detect and decrypt incoming notes). Your ordinary EOA key is reused as the authorization key and is never mixed into the seed.
- **Privacy address.** Your view public key. Registering on-chain (`registerPrivacyInfo`) publishes it alongside your spend-key hash and a commitment to your EOA public key, so senders can look you up and encrypt note data to you. This links an EOA to a privacy address; it does not link individual notes to one another.
- **Open note.** A note whose amount and asset are public (`isOpen=1`) while its owner stays private, produced by the atomic-call reshield path. Standard notes (`isOpen=0`) keep amount and asset hidden as well.

## Flows

- **Shield (deposit).** `privDeposit` is an ordinary EOA-signed call that locks funds into the pool and queues a note. No proof is required, and the depositing address, amount, and asset are public.
- **Shielded transfer.** A private transfer inside the pool. One or two notes are spent, always publishing two nullifiers, to produce up to three outputs (recipient note, change note, and a fee note), each encrypted to its recipient's view key. Nothing about the transfer itself is public, except the fee on the direct path below.
- **Unshield (withdraw).** The proof reveals the withdrawal amount, asset, and destination, since real funds are moving on-chain. The spend settles and escrows the payout first, and delivery to the normal address follows; a failed delivery is retryable, not a lost spend.
- **Atomic call.** Unshield into a public EVM call (a DEX swap, for example) and reshield the measured return into an open note. As with a withdrawal, the spend settles before the call runs: if the call reverts, the spend stands and the escrowed value stays retryable.

Two submission paths reach the same accounting logic:

| Path | How | Fee |
|---|---|---|
| Direct | a native [`0x77` shielded transaction](../developers/transaction-types.md#0x77-shielded-transaction) with no sender, no nonce, and no outer signature; the proofs are the authorization, and any validator or builder can include it | public `feePerGas × gasLimit`, unshielded to the protocol fee pool |
| Relayer | an ordinary signed transaction calling `transact` on the pool | a private fee note paid to the relayer, with amount and asset hidden |

Direct submission is the censorship-resistance backstop: no relayer to depend on, no relayer EOA to expose, and the sender needs no BNB of their own.

## How to Use It

1. Generate a privacy keypair with the `newl1-shield` CLI (`keygen`), supplying your EOA key so the authorization commitment is derived alongside it.
2. Register on-chain once (`registerPrivacyInfo`), so others can find you.
3. Shield funds: call `privDeposit` directly from your EOA.
4. Send privately: look up the recipient's registered view key, encrypt the outgoing note off-chain, sign the transaction intent as EIP-712 typed data (any `eth_signTypedData_v4` wallet works), and generate both proofs (`prove`).
5. Submit: broadcast a `0x77` transaction, or hand the call to a relayer.
6. Discover incoming funds: scan on-chain note ciphertexts and trial-decrypt them with your view key (`scan` / `wallet`). Discovery is immediate, though spendability lags (see below).
7. Unshield or combine with DeFi: `prove --flow withdraw`, or the atomic-call flow to unshield, execute a public call, and reshield.

The pool's on-chain address is `0x0000000000000000000000000000000000005000` and the ECDSA auth-proof verifier is at `0x0000000000000000000000000000000000005003`. Both are genesis predeploys, active from the first block with no hardfork gate. See [System Contracts](../governance/system-contracts.md).

## Current Status

- Native BNB only: the asset field is pinned to native, with no ERC-20/BEP-20 path.
- Deposit, withdraw, and private transfer, plus open notes and atomic EVM calls.
- Submission paths: native `0x77` direct submission, and `transact` called from an ordinary signed transaction by a relayer.
- An on-chain privacy registry for discovering recipients' view keys.
- Deferred, batched note insertion: new commitments are queued on spend and written into the Merkle tree by `deferBatchInsert`, which runs every 50 blocks (~10 seconds), keeping the dominant per-transaction cost off users. Proof verification and nullifier burn are never deferred. An incoming note is discoverable immediately but only spendable after the next insertion.
- A minimal pause mechanism that can only halt new deposits.

Not yet implemented: ERC-20/BEP-20 shielding, the reserved post-quantum authorization scheme, paymaster/ERC-4337 submission, per-asset compliance hooks (an interface seam only, with no verifier and no call site), recursive proof aggregation, and the richer multi-switch governance model.

## Security Assumptions

- **Trusted setup.** PLONK's structured reference string (SRS) is universal: one SRS serves every circuit up to its size bound. The current deployment imports an existing public SRS, which inherits that ceremony's honest-contributor assumption rather than establishing one here. A New L1 ceremony and a dedicated third-party circuit audit are both still open before mainnet.
- **What stays public even in "private" flows.** Deposits reveal sender, amount, and asset. Withdrawals reveal recipient, amount, and asset. Atomic calls reveal the unshielded amount, the call's target and calldata, and the reshielded amount. A `0x77` transaction's fee is public and always native BNB. Only a shielded-to-shielded transfer keeps sender, recipient, amount, and asset all hidden, and on the direct path even that leaves its fee public.
- **Registration links your EOA to your privacy address.** That is the accepted cost of reusing the EOA key for spend authorization. Individual notes sent to that address remain unlinkable to one another.
- **The `isOpen` flag is public per note.** Mixing open and standard notes without care can create identifiable patterns.
- **Some anonymity is set-based, not cryptographic.** For atomic calls and for the public `0x77` fee, what protects you is the set of other users doing the same kind of operation, not a hiding property of the proof.
- **No network-level anonymity.** The shielded pool hides on-chain data, not network metadata: IP and timing can still deanonymize you regardless of what is hidden on-chain. A relayer necessarily sees both, so it is a trusted party for metadata, even though the proof binding means it can neither move your funds nor redirect its own fee note.
- **Deposits can be paused, and nothing else.** `ShieldedPool` is immutable, with no admin, no proxy, and no upgrade path, and its only governed action is the deposit pause. No code path checks a pause flag on withdraw, transfer, or atomic call, so funds already in the pool cannot be frozen by governance.
