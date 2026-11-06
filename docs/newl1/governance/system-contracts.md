---
title: System Contracts - New L1
---

# System Contracts

New L1 predeploys a set of system contracts at genesis, at fixed addresses, covering staking, governance, the native BSC bridge, and the chain's own novel features (Multi-Lane, the shielded pool, and account abstraction). Most of the staking/governance contracts reuse BNB Smart Chain's audited bytecode directly; the rest are new to New L1.

| Contract | Address | Responsibility |
|---|---|---|
| `ValidatorSet` | `0x0000000000000000000000000000000000001000` | The active validator roster that consensus reads each epoch. |
| `SlashIndicator` | `0x0000000000000000000000000000000000001001` | Records downtime/missed-block behavior and drives slashing. |
| `SystemReward` | `0x0000000000000000000000000000000000001002` | Holds and distributes block rewards. |
| `TokenHub` | `0x0000000000000000000000000000000000001004` | [Bridge](../core-concepts/cross-chain-bridge.md) custody: locks outgoing BNB and pays out incoming BNB. Users call `transferOut` here. |
| `GovHub` | `0x0000000000000000000000000000000000001007` | The single entry point governed contracts accept parameter changes from. |
| `CrossChainHub` | `0x0000000000000000000000000000000000002000` | [Bridge](../core-concepts/cross-chain-bridge.md) hub: verifies validator and guardian certificates and records the outcome of each transfer. |
| `StakeHub` | `0x0000000000000000000000000000000000002002` | Core staking hub: validator registration, delegation, and election bookkeeping. |
| `StakeCredit` | `0x0000000000000000000000000000000000002003` | Per-validator share-pool implementation (one proxy deployed per validator). |
| `Governor` | `0x0000000000000000000000000000000000002004` | Governance proposal lifecycle: propose, vote, determine success. |
| `GovToken` | `0x0000000000000000000000000000000000002005` | govBNB, the non-transferable voting-power token, minted 1:1 by `StakeHub`. |
| `Timelock` | `0x0000000000000000000000000000000000002006` | Enforces the mandatory delay between a passed vote and execution. |
| `BridgeGovHub` | `0x0000000000000000000000000000000000002007` | [Bridge](../core-concepts/cross-chain-bridge.md) governance, pause, and freeze. |
| `LaneRegistry` | `0x0000000000000000000000000000000000003000` | [Multi-Lane](../core-concepts/multi-lane.md) quotas and address routing. |
| `AccountKeychain` (precompile) | `0x0000000000000000000000000000000000004000` | [Account abstraction](../core-concepts/account-abstraction.md) key registry for authorizing, revoking, and reading delegated keys. |
| `SignatureVerifier` (precompile) | `0x0000000000000000000000000000000000004001` | Verifies AA signatures (secp256k1 / P256 / WebAuthn) on behalf of the AA pipeline. |
| `ShieldedPool` | `0x0000000000000000000000000000000000005000` | [Privacy](../core-concepts/privacy.md) system contract covering deposit, withdraw, transfer, and atomic-call, with an embedded zk-proof verifier. |
| `ShieldedAuthVerifier` | `0x0000000000000000000000000000000000005003` | Auth-proof verifier used by the shielded pool. |

## Notes

- `ValidatorSet`, `SlashIndicator`, `SystemReward`, `StakeHub`, `StakeCredit`, `GovToken`, `Governor`, and `Timelock` are the staking/governance stack carried over from BNB Smart Chain, kept at the same addresses so their embedded bytecode's internal cross-references remain valid. `Governor`/`Timelock` are recompiled with New L1's own governance-timing constants (voting period, proposal threshold, timelock delay), which are still devnet-only values and not finalized for a public network.
- `TokenHub`, `CrossChainHub`, and `BridgeGovHub` are the New L1 side of the native BSC bridge. `TokenHub` and `CrossChainHub` sit at the addresses BSC uses for its own `TokenHub` and `CrossChain` contracts, but run new bridge code. All three are initialized at genesis. Bridge governance runs through validator and guardian quorums and a recovery council, not through the token-weighted `Governor` flow.
- The bridge contracts, `LaneRegistry`, `AccountKeychain`/`SignatureVerifier`, and `ShieldedPool`/`ShieldedAuthVerifier` are New L1–original, with no BNB Smart Chain equivalent.
- `AccountKeychain` and `SignatureVerifier` are enshrined precompiles (Rust logic compiled directly into the EVM's precompile map) rather than deployed bytecode, which is why they sit in their own reserved address band separate from the deployed system contracts above.
