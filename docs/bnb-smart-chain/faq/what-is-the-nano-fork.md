---
title: Nano Hard Fork - BSC FAQs
---

* NanoHardFork
* NanoBlackList
* BSC security
* Cross-chain bridge exploit
* Light client precompile

---

## Summary

The **Nano** hard fork is an emergency security upgrade to **BNB Smart Chain (BSC)**, activated at block **23,482,428** on **7 Oct 2022**. It disables two light‑client precompile contracts that were exploited in a cross‑chain bridge attack and permanently blacklists the attacker accounts.

## Motivation

On 6 Oct 2022, an exploit targeting the cross‑chain bridge’s precompile contracts enabled unauthorized minting on BSC. Rapid network intervention was required to protect user funds and ecosystem stability.

The fork aims to:

* Stop the ongoing exploit by freezing the malicious accounts.
* Suspend the vulnerable precompile contracts until a full fix can be deployed.
* Restore trust in BSC’s bridge infrastructure.

## Scope of Change

| Module           | File                                                       | Key changes                                                                                                                                        |
| ---------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| EVM precompiles  | `core/vm/contracts.go`, `core/vm/contracts_lightclient.go` | Added `tmHeaderValidateNano` and `iavlMerkleProofValidateNano` implementations that immediately return `suspend`, replacing the exploitable logic. |
| Chain parameters | `params/config.go`                                         | Sets `NanoBlock` to `23482428`, defining the exact activation height for mainnet.                                                                  |
| Blacklist        | `core/types/blacklist.go`                                  | Introduces `NanoBlackList` constant with attacker addresses.                                                                                       |

### Blacklisted Accounts

* `0x489A8756C18C0b8B24EC2a2b9FF3D4d447F79BEc`
* `0xFd6042Df3D74ce9959922FeC559d7995F3933c55`

### Affected Precompile Addresses

* **0x64** – Tendermint header validation (`tmHeaderValidateNano`)
* **0x65** – IAVL Merkle proof validation (`iavlMerkleProofValidateNano`)

*Both now revert with `suspend`.*

## Activation Timeline

| Network | Block / Timestamp                     | Client version (minimum)         |
| ------- | ------------------------------------- | -------------------------------- |
| Mainnet | #23,482,428 (≈ 07 Oct 2022 06:49 UTC) | `bsc` `v1.1.17-7329454` or later |
| Testnet | —                                     | Same tag                         |

> **Tip:** Upgrade at least one hour in advance to avoid unexpected consensus divergence.

## Upgrade Instructions

1. **Stop** the validator/full node.
2. **Backup** `chaindata` and configuration files.
3. **Download** the release tag that contains commit `7329454`.
4. **Replace** the binary (`bsc`, `geth`, or Docker image).
5. **Restart** the node.
6. **Verify** with `bsc version` — the commit hash should match `73294549626feeba3a3b37cd0dcd07cd714b9771`.

## Compatibility Notes

* No changes to JSON‑RPC APIs or consensus rules outside the disabled precompiles.
* Applications that rely on the light‑client precompiles will receive a revert until a future patch re‑enables them.

## Frequently Asked Questions

**What happens to blacklisted accounts?**
Transactions from addresses in `NanoBlackList` are rejected at state validation; balances remain frozen.

**Is there any action required for normal users?**
No wallet updates are needed; only node operators must upgrade.

**When will the precompiles be re‑enabled?**
After the underlying vulnerability is fully fixed and audited, a follow‑up fork will restore functionality.

## References

* PR [#1109 “nanofork: add black list account”](https://github.com/bnb-chain/bsc/pull/1109)
* Commit [`7329454`](https://github.com/bnb-chain/bsc/commit/73294549626feeba3a3b37cd0dcd07cd714b9771)
