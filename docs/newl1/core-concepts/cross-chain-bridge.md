---
title: Cross-Chain Bridge - New L1
---

# Cross-Chain Bridge

The native bridge moves BNB between BNB Smart Chain (BSC) and New L1 in both directions. It is a lock-and-release bridge: BNB locked in the bridge on one chain is paid out as native BNB from the bridge's reserve on the other. Neither chain mints BNB, and there is no wrapped token, so the total BNB across both chains stays the same.

To bridge BNB or integrate with the bridge, see [Using the Cross-Chain Bridge](../developers/cross-chain-bridge.md).

## Architecture

The bridge consists of the same three contracts on each chain and four groups of off-chain participants.

### Contracts

- **`TokenHub`** holds the chain's bridge reserve. It locks outgoing BNB, pays out incoming BNB, and enforces the transfer limits, the blacklist, and claims.
- **`CrossChainHub`** verifies the validator and guardian certificates on each batch of transfers, accepts each batch once, and records the outcome of every transfer.
- **`BridgeGovHub`** executes bridge governance and the emergency pause and freeze.

On New L1 these are [system contracts](../governance/system-contracts.md) deployed at genesis. On BSC they are upgradeable proxies.

### Participants

- **Validators.** The New L1 validators also sign for the bridge. Two-thirds of the validator set must sign every batch, using BLS keys. Both chains track the current validator set: New L1 updates its copy every epoch, and on BSC a validator mirror contract advances its copy from New L1 epoch headers. Each mirror update needs both the existing validators' finality votes and a guardian certificate.
- **Guardians.** A second, independent set of five signers. Three must sign every batch, using ECDSA keys. Guardians read each batch from the source chain themselves instead of trusting the validators. A guardian signs batches with an online key and governance actions with a separate, manually controlled key. Any single guardian can pause the bridge.
- **Relayers.** Every validator and guardian runs a relayer process. Relayers watch the source chain, exchange signatures over a peer-to-peer network, and assemble the two certificates for each batch. Submitting a batch to the destination chain is permissionless, so several relayers may submit the same one. The destination accepts each batch once and pays out each transfer at most once, so a duplicate submission only wastes gas. The relayer pays the destination gas, so the recipient never needs to act.
- **Recovery council.** Three cold keys, two of which must sign, for emergencies only. The council can freeze the bridge. Together with one of the other groups it can also replace a compromised guardian set (with the validators) or repair the BSC validator mirror (with the guardians).

## Transfer Lifecycle

1. **Lock.** The sender calls `transferOut` on the source `TokenHub`, which locks the BNB and emits a `TransferLocked` event carrying the transfer's `messageId`.
2. **Finalize.** The bridge acts only on finalized source blocks: fast finality on BSC, and execution finality on New L1 (see [Consensus](./consensus.md)).
3. **Attest.** The transfers locked in one source block form a batch. Validators and guardians each derive the batch from the source chain and sign its Merkle root.
4. **Accept.** A relayer submits the root with both certificates to the destination `CrossChainHub`. It verifies both certificates and accepts the batch.
5. **Execute.** A relayer submits the batch's transfers, which `CrossChainHub` checks against the accepted root. For each transfer, the destination `TokenHub` sends the BNB to the recipient with a 10,000 gas limit. If that fails, the amount is recorded as a claim that anyone can withdraw to the recipient.

A transfer usually completes within a few seconds, most of it spent waiting for the source chain to finalize.

## Safeguards

- **Two independent quorums.** Every transfer needs both the validator and the guardian certificate, so neither group can release funds on its own.
- **Reserve-backed payouts.** Each `TokenHub` pays out only from BNB locked on its own chain, so a forged release can never take more than that chain's reserve holds.
- **Release rate limit.** A token bucket caps how much BNB a chain releases over time, counting each transfer's amount plus its fee. Transfers beyond it wait until the bucket refills. They never fail.
- **Large-transfer lock.** A transfer at or above a threshold is held on the destination for a lock period before anyone can release it. During the lock, governance can void a forged transfer.
- **Per-transfer cap.** `transferOut` rejects any single transfer above a cap.
- **Pause.** Any single guardian can pause a chain's bridge. New transfers and deliveries on that chain stop, but claims and expired large-transfer locks can still be withdrawn. Lifting a pause takes a governance action and its delay.
- **Recovery freeze.** The validators, the guardians, or the recovery council can each freeze a chain's bridge on their own. A freeze also blocks withdrawals and large-transfer releases, and it stops the lock clock. Lifting it takes all three groups together.

Paused or frozen transfers are delayed, never lost.

## Governance

Bridge governance is separate from New L1's token-weighted [governance](../governance/overview.md). Routine bridge actions need certificates from both the validators and the guardians. These cover upgrades, rate limits and other parameters, blacklists, guardian and council rotation, lifting a pause, voiding a locked transfer, and refunds. An accepted action waits out a delay before anyone can execute it, and it can be cancelled during that delay.

The bridge never refunds on its own. If a transfer can never be delivered, for example because its recipient is blacklisted, validators and guardians declare it failed on the destination chain, which permanently blocks its delivery. They then release a refund on the source chain. The sender receives the amount plus half the delivery fee as a claim. A transfer can never be both delivered and refunded.

## Fees

The sender pays a delivery fee with each transfer. On delivery it is split 40% to the account that executed the delivery, 40% to the validators that signed, and 20% to the guardians that signed.
