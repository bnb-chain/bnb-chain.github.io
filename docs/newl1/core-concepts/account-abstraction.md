---
title: Native Account Abstraction - New L1
---

# Native Account Abstraction

New L1 has a native account-abstraction transaction: EIP-2718 envelope type `0x76`. One transaction can carry a batch of calls, be authorized by a passkey or a delegated key, and have its gas paid by someone else.

There is nothing to deploy or opt into. There is no bundler, no EntryPoint contract, and no smart-contract wallet; the rules below are enforced by every node. An ordinary account keeps its address and simply starts sending `0x76` transactions. Type `0x76` is valid from genesis, and standard transactions are unaffected.

## What It Gives You

- **Atomic batches.** 1–64 user calls in one transaction, one outer signature, one nonce, and one receipt. Either all user-call effects persist or none do.
- **Passkey signing.** P256 and WebAuthn let an account use an authenticator-bound key without exporting the private key. Standard secp256k1 signatures remain supported.
- **Delegated keys.** Authorize additional keys with a call scope, a spend limit, and an expiry: session keys for a game, a bot, or a team member.
- **Gas sponsorship.** Another account can pay, so a brand-new unfunded account can make its first transaction.

## Sending an AA Transaction

### Fields You Set

| Field | Meaning |
|---|---|
| `chain_id` | Replay protection. |
| `nonce_key` | Second nonce dimension. Must be `0` today. |
| `nonce` | The account's ordinary nonce. |
| `max_fee_per_gas`, `max_priority_fee_per_gas` | Standard EIP-1559 fee fields. The priority fee must not exceed the cap. |
| `gas_limit` | Covers the whole transaction. See [Gas](#gas). |
| `calls` | 1–64 ordered entries, each a target, a native value, and calldata. See [Contract creation](#contract-creation). |
| `access_list` | Standard EIP-2930 access list. |
| `valid_after`, `valid_before` | Optional validity window. See [Validity windows](#validity-windows). |
| `key_authorization` | Optional signed inline key grant, applied within this transaction. |
| `fee_payer_signature` | Optional sponsor signature. |
| `token_fee` | Optional `{token, recipient, amount}` repayment to the sponsor. Requires sponsorship. |

A single transaction may not exceed 128 KiB encoded.

### Signing

An AA has two distinct signing digests: the account signing hash and, when sponsored, the fee-payer hash. Both commit to the transaction body, including any `key_authorization` and `token_fee`. The account hash commits to the presence of a sponsor, but not the sponsor's signature bytes; the fee-payer hash binds the same body to the account being sponsored.

A straightforward gas-only workflow is:

1. Fill in the body. If the transaction is sponsored, decide that before computing the account hash.
2. Sponsored only: the fee payer signs the fee-payer hash and the client attaches the signature.
3. The account signs:
    - a root key signs the account signing hash directly, and the account is recovered or derived from the signature;
    - a delegated key signs `keccak256(0x04 || signing_hash || account)` instead, and the result is wrapped together with that account address. This prevents replay against another account on which the same key is authorized.
4. Encode with type `0x76` and submit.

Chronological order is not a consensus field. A token-fee workflow may instead compute the account hash with the sponsored-presence placeholder, obtain the account signature, and let the sponsor simulate, quote, and sign last. Changing whether the fee payer is present after the account signs invalidates the account signature.

### Submitting and Reading the Result

Submit with the ordinary `eth_sendRawTransaction`. Read the outcome with `eth_getTransactionReceipt`: the receipt has type `0x76`, and its status distinguishes a successful batch from a reverted one. `eth_getTransactionCount` is unchanged: an AA account has one ordinary nonce.

## Signature Schemes

| Scheme | Use | How the key is identified |
|---|---|---|
| secp256k1 | Ordinary account key | The usual address, recovered from the signature |
| P256 (secp256r1) | Passkey or secure-enclave key | Derived from the public key carried by the signature |
| WebAuthn | Browser or device passkey | Same derivation as P256; the signature is a WebAuthn assertion |

Any of the three can be a root key or a delegated key. P256 and WebAuthn signatures do not carry a recovery id, so the public key travels inside the signature.

!!! warning "Client-side rules that are consensus-enforced"
    Every node re-verifies these. A client that deviates receives a rejection or produces a transaction that cannot be imported.

    For P256, and for the inner signature of a WebAuthn assertion: the public key must be a valid curve point, and the `s` scalar must be low-s. Normalize before submitting, as high-s signatures are rejected. A P256 payload also carries `pre_hash`: set it to `false` when signing the effective digest directly, or `true` when the signing API applies SHA-256 first.

    For WebAuthn: the authenticator data must be exactly 37 bytes, so no extensions; at least one of the user-present or user-verified flags must be set; and the client data type must be `webauthn.get`. The unpadded base64url challenge must encode the effective digest: the account signing hash for a root signature, or `keccak256(0x04 || signing_hash || account)` for a delegated signature.

A passkey-rooted account cannot sign a legacy or EIP-1559 transaction; it can only act through `0x76`. The account may receive funds before its first outgoing transaction; sponsorship is required only while it lacks enough native balance to self-pay.

## Delegated Keys

Every AA transaction acts for exactly one account. Root, admin, and access are authorization levels for that account, not separate accounts.

| Authority | What it can do | Restrictions |
|---|---|---|
| Root key | The account's own key, and its address is the account. Deploys contracts and manages keys unconditionally. Cannot be revoked. | None |
| Admin key | Authorizes and revokes other delegated keys, including other admin keys. Cannot deploy contracts. Revocable. | Must be unrestricted: no scope, limit, or expiry |
| Access key | Ordinary delegated key, typically a session key. Cannot manage keys. Revocable. | Bound by its scope, spend limit, and expiry |

No delegated key can revoke root, so root always retains control. But an admin key can revoke every other delegated key, so a compromised one can lock an account out of its session keys. Issue them accordingly.

Keys are managed through the `AccountKeychain` precompile at `0x0000000000000000000000000000000000004000`, with a companion `SignatureVerifier` at `0x0000000000000000000000000000000000004001`.

### Authorizing a Key

Two paths are available:

| Path | How | Max scopes |
|---|---|---|
| Inline | Attach a signed key authorization to an AA. The authorization runs before the user calls. For authorize-and-use, root signs the grant and the newly authorized key signs the outer AA; an admin-signed grant requires that same admin to sign the outer AA. If a user call reverts, the grant reverts with the batch. | 32 |
| Direct call | Call `authorizeKey` as root or an admin. A secp256k1-rooted account can do this from a plain transaction. A passkey-rooted account must use `0x76`, either self-paid when funded or sponsored when unfunded. | 256 |

Either path allows at most 64 selectors per scope. Prefer inline authorize-and-use when a key's first action is known: splitting authorization and use across two transactions can fail if the first is reordered or reverts.

`authorizeKey` takes the key identifier, its signature scheme, an expiry in unix seconds (zero means never), the admin flag, the scope, and the spend limit.

### Scope, Limit, Expiry

**Scope.** Unscoped means any target and any calldata. Scoped restricts the key to a list of targets, each optionally narrowed to specific 4-byte selectors; a scoped key with an empty list can do nothing. Root bypasses scope entirely.

**Spend limit.** A cap on native outflow, counting the value moved by successful calls plus, when self-paying, `gas_limit × effective_gas_price`. Size the limit to cover the fee, not just the transfer. A zero period is a lifetime bucket; a non-zero period creates fixed-duration buckets anchored at authorization time. Sponsored gas never counts against the key.

**Revocation is permanent.** A revoked identifier can never be authorized again on that account. An identifier also cannot be re-authorized while its slot is occupied, including one that has expired but not been revoked; rotate to a fresh identifier.

### Reading Key State

Call [`newl1_getKey`](../developers/json_rpc/newl1-api-list.md#newl1_getkey) for a key's signature scheme, expiry, revoked and admin flags, scope flag, spend limit, period, and the amount consumed in the current period. A never-authorized key reports blank metadata; a revoked key reports its tombstone.

## Gas

!!! warning "You are charged the `gas_limit` you declare, not the gas you use"
    Unused gas is not refunded and post-execution storage refunds are void, for AA and standard user transactions alike. Blocks are packed by declared gas before execution, so receipts report gas used equal to the gas limit.

    **Over-estimating is not insurance, it is spend.** Size the limit tightly with `newl1_estimateGas`, which prices the declared transaction against the selected state. `eth_call` simulates the call result and `eth_estimateGas` estimates actual execution usage with the prepaid charge-by-limit behavior disabled.

An AA pays normal EVM gas for its calls plus a surcharge for the machinery it uses: about 5,000 for a P256 signature, 5,000 plus a per-byte cost for a WebAuthn assertion, 3,000 for a delegated-key check, and about 27,000 for an inline key authorization. A spend limit and a large scope cost more because the keychain precompile writes additional storage.

The declared limit must clear the intrinsic cost, AA surcharge, and EIP-7623 calldata floor, or the transaction is rejected at submission. No user transaction may declare more than 16,777,216 gas.

## Fee Sponsorship

A fee payer can cover another account's native gas. The account still advances its nonce and pays any native value moved by its calls.

- **Self-sponsorship is rejected.** The fee payer must be a different account.
- Admission requires the sponsor to cover the gas reservation and the account to cover the calls' total native value.
- Both signing hashes bind the sponsorship to the account and transaction body. See [Signing](#signing).

An optional `token_fee = {token, recipient, amount}` repays the sponsor on-chain. It is supported only on a root-signed, sponsored AA; `recipient` must be the recovered fee payer, `token` must be a contract, and `amount` must be non-zero. Both signatures commit to the payment, so no allowance or permit is required.

The token payment runs before the user calls and outside their atomic checkpoint. It therefore remains paid if a later user call reverts. If the token payment itself cannot complete, the user calls do not run; the transaction lands failed and the sponsor is still charged the declared gas limit. Sponsors should simulate before signing because admission does not project arbitrary ERC-20 balances.

## Validity Windows

The two optional bounds gate inclusion by block timestamp: `valid_after` is inclusive, `valid_before` is exclusive. A not-yet-valid transaction is held and promoted automatically when its window opens; an expired one is dropped.

Nodes also apply a local acceptance policy: `valid_after` may be at most 120 seconds in the future, and `valid_before` must be more than 3 seconds away, or the transaction is refused at submission.

## When Something Goes Wrong

There are two terminal on-chain outcomes to plan for.

**Rejected before inclusion.** You get an error or the transaction is dropped; no gas is charged and the nonce does not move. Examples include a bad signature, wrong chain id, malformed batch, `gas_limit` outside the allowed range, invalid acceptance window, self-sponsorship, or a delegated key already known to be revoked or out of scope.

**Included and failed.** If a user call reverts or runs out of gas, all user-call effects and any inline grant roll back, but the receipt reports failure, the declared `gas_limit` is charged, and the nonce advances. For a limited key, the self-paid gas fee counts against its limit while rolled-back call value does not. A successful transaction-level `token_fee` remains paid.

!!! tip "Passing submission does not guarantee success"
    Delegated-key permission is checked again at execution against state that may have shifted since submission. The key could be revoked or its limit consumed in between. Such a transaction lands as a failed receipt charging the full `gas_limit`, so do not assume a permission problem always fails for free.

## For Contracts and Indexers Receiving AA Calls

- **The account remains the execution identity.** `tx.origin` and each top-level user call's `msg.sender` are the account, not the delegated key or sponsor.
- **Receipts, logs, and block headers retain their standard shapes.** Transaction entries are tagged with type `0x76`; an indexer that decodes transaction bodies must add the `0x76` schema and its batch of calls, while a receipt/log-only indexer needs no special AA path.
- **A contract can see which key is acting.** The keychain precompile reports the key identifier that signed the current AA, where zero means root, and the account it acts for. The `SignatureVerifier` precompile can also verify a P256/WebAuthn signature or a keychain-wrapped signature from an active key.

## Contract Creation

CREATE is supported only when all of these are true: it is the first user call, the AA is root-signed and self-paid, and there is no inline `key_authorization`. A delegated-key CREATE, sponsored top-level CREATE, later CREATE, or CREATE combined with an inline grant is rejected.

## Limits

| Item | Value |
|---|---|
| Transaction type | `0x76` |
| Calls per batch | 1–64 |
| Max encoded size | 128 KiB |
| Max declared `gas_limit` | 16,777,216 |
| Scopes per authorization | 32 inline, 256 direct |
| Selectors per scope | 64 |
| `nonce_key` | must be `0` |
| Local `valid_after` / `valid_before` policy | at most 120 s ahead / more than 3 s away |
| Contract creation | first call, root-signed, self-paid, no inline grant |
| Unsupported Ethereum transaction types | EIP-4844 blobs, EIP-7702 set-code |
