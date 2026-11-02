---
title: Using the Cross-Chain Bridge - New L1
---

# Using the Cross-Chain Bridge

The native bridge moves BNB between BNB Smart Chain (BSC) and New L1 in both directions. BNB locked on one chain arrives as native BNB on the other, with no wrapped token. On devnet the bridge connects New L1 to BSC Testnet, and bridging tBNB from BSC Testnet is how you get BNB on the New L1 devnet.

!!! warning "Devnet stage"
    Use testnet BNB (tBNB) only. The bridge contracts have not been audited, and the devnet may be reset. The limits and delays on this page are devnet values and are deliberately small. Public networks will use different values.

## Overview

You lock BNB in the source chain's `TokenHub`. Once the source block is final, the New L1 validators and the guardians both attest the transfer, and a relayer delivers it to the destination chain, where `TokenHub` pays the recipient from its reserve. A transfer usually completes within a few seconds. The relayer pays the destination gas, so the recipient doesn't need to hold BNB or do anything.

For the design, including the roles of validators, guardians, relayers, and the recovery council, see [Cross-Chain Bridge](../core-concepts/cross-chain-bridge.md).

## Contracts

| Contract | Role | New L1 devnet (chain ID 1105) | BSC Testnet (chain ID 97) |
|---|---|---|---|
| `TokenHub` | Custody: locks outgoing BNB and pays out incoming BNB. **This is the contract users call.** | `0x0000000000000000000000000000000000001004` | `0xBfe025E8d71CeFeAA3921e89960A26F33B1594AF` |
| `CrossChainHub` | Verifies certificates and records the outcome of each transfer | `0x0000000000000000000000000000000000002000` | `0x2E7004b6dF81650e48d74233923627b4308ad6C5` |
| `BridgeGovHub` | Bridge governance, pause, and freeze | `0x0000000000000000000000000000000000002007` | `0xEB13090dB3CdB2440bA490DA44AF3aE113Cad1a3` |

On New L1 these contracts are genesis predeploys (see [System Contracts](../governance/system-contracts.md)). On BSC they are upgradeable proxies named `NewL1TokenHub`, `NewL1CrossChainHub`, and `NewL1BridgeGovHub`. Both chains expose the same user-facing functions.

## Bridge BNB

### Before You Start

- Hold enough BNB on the source chain for the amount, the delivery fee, and gas for the source transaction. To get tBNB on BSC Testnet, use the [BSC faucet](../../bnb-smart-chain/developers/faucet.md).
- Decide on the recipient address on the destination chain. It doesn't need to hold any BNB.
- Optionally, call `paused()` and `frozen()` on both chains' `TokenHub`. If the source chain is paused, `transferOut` reverts. If the destination is paused, delivery waits until it is unpaused.

### Send a Transfer

Call `transferOut(address recipient, uint128 deliveryFee)` on the source chain's `TokenHub`, with the amount plus the fee as the transaction value:

- `recipient`: the address that receives the BNB on the destination chain.
- `deliveryFee`: in wei, no less than `minDeliveryFee()` and no more than `maxDeliveryFee()`.
- Transaction value: the amount to deliver **plus** `deliveryFee`. The recipient receives the value minus `deliveryFee`.

The examples use Foundry's `cast` to deliver 1 BNB with a 0.0003 BNB fee. Add your usual signing option, such as `--account` or `--ledger`.

=== "BSC Testnet → New L1"

    ```sh
    RPC=https://bsc-testnet-dataseed.bnbchain.org
    TOKEN_HUB=0xBfe025E8d71CeFeAA3921e89960A26F33B1594AF
    RECIPIENT=0xYourAddressOnNewL1

    # Current minimum delivery fee in wei (300000000000000 = 0.0003 BNB)
    cast call $TOKEN_HUB "minDeliveryFee()(uint128)" --rpc-url $RPC

    # Value = 1 BNB to deliver + 0.0003 BNB fee
    cast send $TOKEN_HUB "transferOut(address,uint128)" $RECIPIENT 0.0003ether \
      --value 1.0003ether --rpc-url $RPC
    ```

=== "New L1 → BSC Testnet"

    ```sh
    RPC=https://newl1-devnet-rpc.bnbchain.org/
    TOKEN_HUB=0x0000000000000000000000000000000000001004
    RECIPIENT=0xYourAddressOnBSC

    # Current minimum delivery fee in wei (300000000000000 = 0.0003 BNB)
    cast call $TOKEN_HUB "minDeliveryFee()(uint128)" --rpc-url $RPC

    # Value = 1 BNB to deliver + 0.0003 BNB fee
    cast send $TOKEN_HUB "transferOut(address,uint128)" $RECIPIENT 0.0003ether \
      --value 1.0003ether --rpc-url $RPC
    ```

    New L1 charges for the [declared gas limit](../get-started/migrate-from-bsc.md#you-pay-for-your-declared-gas-limit), so don't pad the gas estimate.

`transferOut` reverts and locks nothing if any of its checks fail: a fee outside the bounds, an amount above the per-transfer cap, a paused or frozen bridge, a blacklisted sender or recipient, or the zero address as recipient.

### Track a Transfer

1. **Find the `messageId`.** `transferOut` emits it as the first indexed topic of the `TransferLocked` event in your transaction receipt. On [BscScan Testnet](https://testnet.bscscan.com/) it appears in the transaction's logs. With `cast`, on either chain:

    ```sh
    cast receipt <TX_HASH> --rpc-url $RPC --json | jq -r '.logs[]
      | select(.topics[0] == "0x177324ae85361dbd3f63aab4130d0954c6bff770d4664ac9ea69a0d839802678")
      | .topics[1]'
    ```

2. **Check the destination.** Call `terminalRecord(messageId)` on the destination chain's `CrossChainHub`. This example checks a transfer to New L1:

    ```sh
    cast call 0x0000000000000000000000000000000000002000 \
      "terminalRecord(bytes32)(bool,(bool,bool,address,uint128,address,bool))" <MESSAGE_ID> \
      --rpc-url https://newl1-devnet-rpc.bnbchain.org/
    ```

    The first value stays `false` until the destination records an outcome. After that it is `true`, followed by `(present, success, recipient, creditedAmount, deliveredBy, …)`. `success = true` means the transfer was delivered.

A delivered transfer is not always in the recipient's balance yet. In the delivery transaction, the destination `TokenHub` emits one of these events:

| Event | Meaning | What to do |
|---|---|---|
| `CreditDelivered` | The BNB was sent to the recipient. | Nothing. The transfer is complete. |
| `CreditLocked` | The amount is at or above the large-transfer threshold and is held until the lock ends. | Call `matureLockedCredit` after the lock ends. See [Large Transfers](#large-transfers). |
| `ClaimCredited` | Sending to the recipient failed, so the amount was recorded as a claim. | Call `withdraw`. See [Claims](#claims). |

### Large Transfers

If the amount is at or above `LARGE_TRANSFER_THRESHOLD()` (10 BNB on devnet), the destination holds it for `LARGE_TRANSFER_LOCK()` seconds (10 seconds on devnet) instead of paying it out right away. During the lock, governance can cancel a forged transfer before anyone is paid. Expect a much longer lock on public networks: the design requires at least 48 hours there.

**Relayers don't release locked transfers.** After the lock ends, someone has to call `matureLockedCredit(messageId)` on the destination `TokenHub`. Anyone can call it, and the BNB always goes to the transfer's recipient, never to the caller.

```sh
# Seconds left on the lock; 0 means it can be released
cast call $TOKEN_HUB "lockRemaining(bytes32)(uint256)" <MESSAGE_ID> --rpc-url $RPC

# Send the BNB to the recipient
cast send $TOKEN_HUB "matureLockedCredit(bytes32)" <MESSAGE_ID> --rpc-url $RPC
```

Here `$TOKEN_HUB` and `$RPC` refer to the destination chain. The lock clock stops while the bridge is frozen.

### Claims

The destination sends BNB to the recipient with a 10,000 gas limit. If the recipient is a contract that needs more gas than that to receive BNB, or that rejects it, the amount is recorded as a claim for the recipient instead. Refunds are also paid as claims.

To pay out a claim, call `withdraw(account)` on the `TokenHub` that holds it. Anyone can call it, and it always pays the account's full claim to that account. `claim(account)` returns the current balance.

```sh
cast call $TOKEN_HUB "claim(address)(bool,(bool,uint128))" <ACCOUNT> --rpc-url $RPC
cast send $TOKEN_HUB "withdraw(address)" <ACCOUNT> --rpc-url $RPC
```

`withdraw` forwards all available gas. If the account can't receive BNB at all, `withdraw` reverts and the claim stays where it is.

## Fees

| Cost | Who pays | Amount |
|---|---|---|
| Delivery fee | Sender, as part of the `transferOut` value | Between `minDeliveryFee()` and `maxDeliveryFee()`, both adjustable by governance. Devnet: 0.0003 BNB minimum, 1 BNB maximum |
| Source chain gas | Sender | Gas for the `transferOut` transaction |
| Destination delivery gas | Relayer | Nothing for the recipient |

The delivery fee is shared among the executor of the delivery and the signing validators and guardians (see [Fees](../core-concepts/cross-chain-bridge.md#fees)). The current relayers deliver every batch no matter what fee it carries, so paying more than the minimum doesn't speed up delivery.

Releasing a large transfer and withdrawing a claim are separate destination-chain transactions, paid for by whoever sends them.

## Limits and Parameters

Both chains currently use the values below. You can read the live values from the `TokenHub` on either chain.

| Parameter | Getter | Devnet value | Effect |
|---|---|---|---|
| Minimum delivery fee | `minDeliveryFee()` | 0.0003 BNB | `transferOut` reverts below it |
| Maximum delivery fee | `maxDeliveryFee()` | 1 BNB | `transferOut` reverts above it |
| Per-transfer cap | `PER_TRANSFER_CAP()` | 100 BNB | `transferOut` reverts if the amount, excluding the fee, is larger |
| Large-transfer threshold | `LARGE_TRANSFER_THRESHOLD()` | 10 BNB | Amounts at or above it are locked on the destination |
| Large-transfer lock | `LARGE_TRANSFER_LOCK()` | 10 seconds | How long a large transfer stays locked |
| Release rate limit | `releaseLimitCapacity()`, `releaseCapacity()` (currently available) | 200 BNB, refilling continuously over 30 seconds | Caps how much the destination releases, counting amount plus fee. Transfers beyond it wait |
| Recipient gas | `PUSH_GAS_LIMIT()` | 10,000 | Gas forwarded when BNB is sent to the recipient |

The rate limit only delays transfers. A transfer that doesn't fit now is delivered once the limit refills. The rate limit never makes it fail or triggers a refund.

## Before You Bridge

- **Native BNB only.** The bridge doesn't carry BEP-20 tokens. Tokens sent to a bridge contract are not bridged, and there's no way to recover them.
- **Always call `transferOut`.** A plain BNB transfer to `TokenHub` reverts. On New L1, a reverted transaction still costs its declared gas.
- **Check the recipient.** BNB arrives at the exact address you pass as `recipient`, on the destination chain. An EOA key controls the same address on both chains. A smart-contract wallet, such as a multisig, may not exist at that address on the other chain, or the address may belong to someone else there. Only bridge to an address you control on the destination chain.
- **Contracts must accept BNB.** A contract recipient needs a `receive` or payable fallback function. If receiving uses more than 10,000 gas, the BNB becomes a [claim](#claims). If the contract can't accept BNB at all, the funds can't be paid out. The same applies to a contract that calls `transferOut`: a refund goes back to it as the sender.
- **Transfers can't be cancelled.** A locked transfer is either delivered or, through governance, refunded. Transfers don't expire.
- **Pauses and freezes.** When a chain's bridge is paused, `transferOut` reverts on that chain and deliveries to that chain wait. Claims and expired large-transfer locks can still be withdrawn. A freeze, the emergency stop, also blocks withdrawals and large-transfer releases until it is cleared. In both cases, transfers that are already locked wait. They are never lost.
- **Blacklists.** Each chain's bridge governance can blacklist addresses. A blacklisted sender or recipient can't use `transferOut`. A transfer whose sender or recipient is blacklisted after it was locked waits on the destination until the address is removed or governance refunds the transfer.
- **Transfers are public.** The sender, recipient, and amount are visible on both chains. Bridging doesn't go through the [shielded pool](../core-concepts/privacy.md).
- **BSC finality.** If BSC fast finality stalls, the bridge waits for BSC's slower natural finality instead, which adds about a minute and a half to transfers from BSC.

## Failures and Refunds

The bridge never refunds on its own. No timeout, error, or amount of elapsed time turns a locked transfer into a refund. A slow transfer (paused, rate-limited, or waiting for finality) is delivered once the cause clears.

If a transfer can never be delivered, for example because its recipient is blacklisted, validators and guardians can declare it failed on the destination chain and release a refund on the source chain (see [Governance](../core-concepts/cross-chain-bridge.md#governance)). The original sender is credited with the amount plus half the delivery fee, as a [claim](#claims) on the source chain. To collect it, call `withdraw(sender)`. A transfer can never be both delivered and refunded.

## Interface

The functions and events for sending, tracking, and completing a transfer:

```solidity
interface ITokenHub {
    struct Claim { bool present; uint128 amount; }

    function transferOut(address recipient, uint128 deliveryFee) external payable returns (bytes32 messageId);
    function matureLockedCredit(bytes32 messageId) external returns (uint128 amount);
    function withdraw(address account) external returns (uint128 amount);

    function minDeliveryFee() external view returns (uint128);
    function maxDeliveryFee() external view returns (uint128);
    function lockRemaining(bytes32 messageId) external view returns (uint256); // reverts if nothing is locked
    function claim(address account) external view returns (bool present, Claim memory record);
    function paused() external view returns (bool);
    function frozen() external view returns (bool);

    event TransferLocked(
        bytes32 indexed messageId, address indexed sender, address indexed recipient,
        uint128 principal, uint128 deliveryFee, uint64 sourceNonce, bytes32 payloadHash
    );
    event CreditDelivered(bytes32 indexed messageId, address indexed recipient, uint128 amount);
    event CreditLocked(bytes32 indexed messageId, address indexed recipient, uint128 amount, uint64 lockedAt);
    event ClaimCredited(address indexed account, uint128 amount, uint128 newTotal);
}

interface ICrossChainHub {
    struct TerminalRecord {
        bool present;
        bool success;
        address recipient;
        uint128 creditedAmount;
        address deliveredBy;
        bool countedTowardRange;
    }

    function terminalRecord(bytes32 messageId) external view returns (bool present, TerminalRecord memory record);
}
```

- `transferOut` returns the `messageId`, so a contract that bridges can store it without parsing logs.
- A terminal record with `present = true` and `success = false` means governance declared the transfer failed, and a refund follows on the source chain.
- Before treating a delivery as irreversible, wait until the destination block that contains it is finalized. On New L1, use the `finalized` block tag (see [Consensus](../core-concepts/consensus.md)).
