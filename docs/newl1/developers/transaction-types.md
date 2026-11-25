---
title: Transaction Types - New L1
---

# Native Transaction Types

Standard Ethereum transactions (legacy, EIP-2930, EIP-1559) work exactly as you'd expect. On top of them New L1 adds two native EIP-2718 types of its own:

| Type | Name | Use it for |
|---|---|---|
| `0x76` | [Account abstraction](#0x76-account-abstraction) | Atomic call batches, session/admin keys, passkey signing, gas sponsorship |
| `0x77` | [Shielded transaction](#0x77-shielded-transaction) | Signed service batches and proof-funded exits |

Both are submitted through plain `eth_sendRawTransaction` and produce ordinary receipts (with `type` `0x76` / `0x77`). EIP-4844 (`0x03`) and EIP-7702 (`0x04`) are rejected. The two types above sit in a high, self-assigned range so a future upstream type can't collide with them.

!!! note "No SDK yet"
    This repository does not include a supported New L1 SDK or a versioned client codec for these transaction types. Use the codec and test vectors for the matching client release, and confirm that your SDK can submit the encoded raw transaction.

## `0x76` Account Abstraction

One transaction, signed by an account or by a delegated key, carrying a batch of calls. Full concept documentation: [Account Abstraction](../core-concepts/account-abstraction.md).

### Body

| Field | Notes |
|---|---|
| `chain_id` | Replay protection. |
| `nonce_key` | 2D-nonce lane. Must be `0` today. |
| `nonce` | Sequential within `nonce_key`. |
| `max_priority_fee_per_gas`, `max_fee_per_gas` | EIP-1559 fee caps. Priority fee must not exceed max fee. |
| `gas_limit` | For the whole batch, and what you're [charged](../get-started/migrate-from-bsc.md#you-pay-for-your-declared-gas-limit). |
| `calls` | 1–64 `{to, value, input}` entries, executed atomically. Only the first may be a `CREATE`, and only a root key may deploy. |
| `access_list` | EIP-2930. |
| `valid_after` / `valid_before` | Optional inclusion window, in block-timestamp seconds. |
| `key_authorization` | Optional inline key provisioning, atomic with its first use. |
| `fee_payer_signature` | Optional sponsor signature. |

### Signing

1. **Sponsor first, if any.** The fee payer signs `fee_payer_signature_hash(sender)`, a hash over the transaction body and the sender address, so a sponsorship can't be lifted onto a different sender. Self-sponsorship is rejected.
2. **Then the account.**
    - A root key signs the transaction's own signing hash directly.
    - A keychain key (admin or access) signs an account-bound hash instead: the signing hash re-hashed together with the account address, so a key's signature can't be replayed against another account. Secp256k1, P256, and WebAuthn signatures are all accepted.
3. Submit the EIP-2718 payload via `eth_sendRawTransaction`.

### Gotchas

- **`nonce_key` must be zero.** Parallel nonce lanes are reserved but not enabled.
- **One nonce per transaction.** An inline `key_authorization` is prepended as a call, so combining it with a `CREATE` in the same transaction is rejected. Do the authorization first, or deploy from a standalone transaction.
- **Session-key spend limits count gas.** It is counted at the declared gas limit, like everything else.
- **Key state is readable at any time** via [`newl1_getKey(account, keyId)`](./json_rpc/newl1-api-list.md#newl1_getkey). Keys can also be managed from an ordinary transaction by calling `authorizeKey` / `revokeKey` on the `AccountKeychain` precompile at `0x…4000`, so you don't need an AA transaction to bootstrap one.

## `0x77` Shielded Transaction

Two versioned envelopes reach [PrivacyPool](../core-concepts/privacy.md). Submit canonical bytes through `eth_sendRawTransaction`. The complete transaction, including ciphertexts and call context, must fit in 128 KiB.

| | V1 signed batch | V2 proof-funded EXIT |
|---|---|---|
| Wire format | `0x77` followed by RLP of `[1, chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gasLimit, pool, envelope, accessList, yParity, r, s]` | `0x77` followed by RLP of `[2, chainId, pool, envelope]` |
| Authorization | A public account signs the fee-paying transaction. The batch proof authorizes note spends. | The EXIT proof authorizes spending and funds the network fee. |
| Gas | The payer is charged the declared limit, including for a failed execution. | Pool policy fixes the gas and price. An invalid EXIT is rejected before inclusion. |
| RPC identity | `from` and `nonce` belong to the payer. | `from` is the last 20 bytes of the transaction hash and `nonce` displays zero. Neither identifies a paying account. |

For V1, pass an unsigned `privacyBatch` request to `newl1_estimateGas`, then sign with the chosen gas limit. For V2, call the pool's `quoteExit(bytes)` on the envelope. Submit to a node RPC. Direct TEE Gateway ingress rejects type `0x77`. Both versions expose `privacyVersion` and canonical `raw` in transaction queries and count toward General gas. To submit a service batch from an ordinary account, call `applyBatch(bytes)` on the pool. See [Privacy RPC](json_rpc/newl1-api-list.md#privacy-api).
