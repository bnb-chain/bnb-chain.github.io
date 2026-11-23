---
title: Scaled UI Amount Demo
---

# Demo — UI multiplier in four steps

This walkthrough covers what almost every app needs for ERC-8056 tokens: detect the standard, show the correct balance, convert user input for a transfer, and react when the multiplier changes.

Uses **ethers v6** against any BSC JSON-RPC endpoint. Set `tokenContract` and `holder` to your target ERC-8056 contract and account.

## Prerequisites

```bash
npm install ethers
```

```javascript
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("<your-bsc-rpc-url>");
const tokenContract = "<erc-8056-contract>"; // from your allowlist or config
const holder = "<holder-account>";
```

## 1. Detect ERC-8056

```javascript
const IScaledUIAmountABI = [
  "function uiMultiplier() view returns (uint256)",
  "function balanceOfUI(address) view returns (uint256)",
  "function toUIAmount(uint256) view returns (uint256)",
  "function fromUIAmount(uint256) view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function supportsInterface(bytes4) view returns (bool)",
  "event UIMultiplierUpdated(uint256,uint256,uint256,uint256)",
];

const token = new ethers.Contract(tokenContract, IScaledUIAmountABI, provider);

// Interface ID is defined in EIP-8056 — load from your config or standard constants
const erc8056InterfaceId = "<eip-8056-interface-id>";
const isScaledUIAmount = await token.supportsInterface(erc8056InterfaceId);

if (!isScaledUIAmount) {
  throw new Error("Contract does not implement ERC-8056");
}
```

!!! tip "Production detection"
    Many integrators maintain a curated allowlist of compliant contracts and fall back to `supportsInterface()` for unknown tokens. See [EIP-8056](https://eips.ethereum.org/EIPS/eip-8056) for the canonical interface ID.

## 2. Show the correct balance

Use `balanceOfUI()` — not `balanceOf()` — for display.

```javascript
const decimals = await token.decimals();
const uiBalanceRaw = await token.balanceOfUI(holder);
const uiBalance = Number(uiBalanceRaw) / 10 ** Number(decimals);

const rawBalance = await token.balanceOf(holder);
const multiplier = Number(await token.uiMultiplier()) / 1e18;

console.log(`UI balance:   ${uiBalance} shares`);
console.log(`Raw balance:  ${Number(rawBalance) / 10 ** Number(decimals)} units`);
console.log(`Multiplier:   ${multiplier}x`);
```

With a `2.0x` multiplier, a holder with `100` raw units sees `200` shares — total economic value unchanged.

## 3. Convert a send amount

Users think in UI amounts (shares). Convert back to raw before calling `transfer()`.

```javascript
const sharesToSend = "200"; // user enters 200 shares
const uiAmountScaled = ethers.parseUnits(sharesToSend, decimals);
const rawAmount = await token.fromUIAmount(uiAmountScaled); // e.g. 100_000_000 raw (if multiplier = 2.0x)

console.log(`Sending ${sharesToSend} shares → ${rawAmount} raw units on-chain`);
// await token.connect(signer).transfer(recipient, rawAmount);
```

On the confirmation screen, show the UI amount the user entered — not the raw value.

## 4. React to multiplier changes

Listen for `UIMultiplierUpdated`. If `effectiveAtTimestamp` is in the future, the change is scheduled — keep using the old multiplier until it activates.

```javascript
token.on(
  "UIMultiplierUpdated",
  (oldMultiplier, newMultiplier, setAtTimestamp, effectiveAtTimestamp) => {
    const oldMult = Number(oldMultiplier) / 1e18;
    const newMult = Number(newMultiplier) / 1e18;
    const nowSec = Math.floor(Date.now() / 1000);

    console.log(`Multiplier change announced at ${setAtTimestamp}`);
    console.log(`Old: ${oldMult}x → New: ${newMult}x`);
    console.log(`Takes effect at: ${effectiveAtTimestamp}`);

    if (Number(effectiveAtTimestamp) > nowSec) {
      // Scheduled — old multiplier still active; show a notice to users
      console.log("Corporate action scheduled — balances will adjust at effective time.");
    } else {
      // Immediate — refresh cached multiplier and re-fetch balances
      refreshBalances(tokenContract);
    }
  }
);

async function refreshBalances(contract) {
  const t = new ethers.Contract(contract, IScaledUIAmountABI, provider);
  const multiplier = Number(await t.uiMultiplier()) / 1e18;
  console.log(`Current UI multiplier: ${multiplier}x`);
}
```

## Common pitfalls

| Pitfall | Fix |
|---------|-----|
| Showing `balanceOf()` as the primary balance | Use `balanceOfUI()` or `toUIAmount(balanceOf())` |
| Passing UI amounts to `transfer()` | Always `fromUIAmount()` first — ERC-20 functions use raw amounts |
| Applying a new multiplier before `effectiveAtTimestamp` | Old multiplier stays active until the effective time |
| Manual `raw × multiplier / 1e18` math | Prefer `toUIAmount()` / `fromUIAmount()` to match contract rounding |

## Next steps

For per-audience integration (wallets, explorers, DEX RFQ, lending/collateral) and guidance on splits vs. dividends, see the [ERC-8056 overview](index.md) or contact the token issuer for the full Partner Integration Guide.

[← Scaled UI Amount overview](index.md) · [Developer Kit overview](../index.md)
