---
title: Scaled UI Amount (ERC-8056)
---

# Scaled UI Amount (ERC-8056)

Some ERC-20 tokens on BNB Smart Chain implement **ERC-8056 (Scaled UI Amount)**. The standard adds an on-chain **UI multiplier** that converts raw token balances into the share count users should see, so corporate actions like stock splits, reverse splits, and dividends can be reflected **without minting, burning, or migrating tokens**.

If your app displays `balanceOf()` directly, users will see wrong balances and prices whenever the multiplier changes.

## What is the UI multiplier?

The UI multiplier is a single scalar stored on the token contract. It translates raw on-chain amounts into UI display amounts.

**Example — 2-for-1 stock split**

| | Before split | After split |
|---|-------------|-------------|
| Raw on-chain balance | 100 tokens | 100 tokens (unchanged) |
| UI multiplier | `1.0` (`1e18`) | `2.0` (`2e18`) |
| UI display amount | 100 shares | 200 shares |
| UI price per share | $50.00 | $25.00 |
| Total value | $5,000 | $5,000 |

No tokens move. Only the multiplier changes — and every balance, transfer amount, and price you show should scale with it.

## Core formulas

The multiplier is always **18-decimal fixed point** (`1e18` = 1.0). Apply it after standard ERC-20 decimal adjustment.

| Term | Definition |
|------|------------|
| **Raw amount** | What `balanceOf()` returns (`uint256`) |
| **UI multiplier** | Returned by `uiMultiplier()` — `1e18` = 1.0, `2e18` = 2.0 |
| **UI amount** | What users should see — `rawAmount × uiMultiplier / 1e18` |
| **UI price** | Price per share. CEX Spot already quotes UI price; convert raw-denominated feeds with `rawPrice × 1e18 / uiMultiplier` |

```
UI amount = rawAmount × uiMultiplier / 1e18
UI price  = rawPrice × 1e18 / uiMultiplier   ← only for raw-denominated price sources
```

Prefer the on-chain helpers `toUIAmount()` and `fromUIAmount()` over manual arithmetic — they match contract rounding.

## Contract interface

```solidity
interface IScaledUIAmount {
    event UIMultiplierUpdated(
        uint256 oldMultiplier,
        uint256 newMultiplier,
        uint256 setAtTimestamp,
        uint256 effectiveAtTimestamp
    );

    function uiMultiplier() external view returns (uint256);
    function toUIAmount(uint256 rawAmount) external view returns (uint256);
    function fromUIAmount(uint256 uiAmount) external view returns (uint256);
    function balanceOfUI(address account) external view returns (uint256);
    function setUIMultiplier(uint256 newMultiplier, uint256 effectiveAtTimestamp) external;
}
```

| Function | Use it for |
|----------|------------|
| `balanceOfUI(address)` | Primary balance display |
| `toUIAmount(rawAmount)` | Transfer history, supply, any raw → UI conversion |
| `fromUIAmount(uiAmount)` | User input → `transfer()` / `approve()` params |
| `uiMultiplier()` | Price conversion, multiplier badges, caching |

Detect ERC-8056 tokens with ERC-165 `supportsInterface()` using the interface ID from [EIP-8056](https://eips.ethereum.org/EIPS/eip-8056), or maintain a curated allowlist of known compliant contracts.

## Scheduled multiplier changes

Issuers can announce a future multiplier via `setUIMultiplier(newMultiplier, effectiveAtTimestamp)`. The `UIMultiplierUpdated` event fires immediately, but all view functions keep using the **old** multiplier until `block.timestamp >= effectiveAtTimestamp`.

When a future `effectiveAtTimestamp` is detected, show a notice to users and refresh cached values once the effective time passes. Do not apply the new multiplier early.

## Integration checklist

| Surface | Display to user | On-chain |
|---------|-----------------|----------|
| Balance | `balanceOfUI(address)` | `balanceOf(address)` |
| Send amount | User enters UI amount | `fromUIAmount()` → `transfer()` |
| Transfer history | `toUIAmount(rawTransferAmount)` | Raw `Transfer` event amount |
| Price | CEX Spot price (already UI) or convert raw feeds | — |
| Total supply | `toUIAmount(totalSupply())` | `totalSupply()` |

---

## Documentation

| Guide | Description |
|-------|-------------|
| [Demo](demo.md) | Detect ERC-8056, show the correct balance, convert a send amount, and react to multiplier changes |

[← Developer Kit overview](../index.md)
