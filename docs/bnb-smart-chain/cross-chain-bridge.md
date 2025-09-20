---
title: BNB Chain Bridge – Cross‑Chain Guide
---

# BNB Chain Cross-Chain Bridge Guide

> **Status:** Draft · Last updated: 4 Jun 2025
---

## 1  Who Is This Guide For?

* 🧑‍💻 **Users** who want to transfer tokens in and out of BNB Chain from other chains like **Ethereum** or **Solana**.
* 🛠️ **Developers** who want to integrate a cross-chain bridge widget on their website using BNB Chain's **Canonical Bridge**.

## 2  Why This Guide Matters

Many users don’t realize that cross-chain transfers are possible or easy. BNB Chain offers a bridge aggregator that shows the **best route** for moving assets between chains using one of our **six route providers**:

**Supported Route Providers**:

* Stargate
* Celer
* deBridge
* Meson
* LayerZero
* Mayan

> ✅ We help users **see available routes** for transferring assets **into or out of BNB Chain**, but we **do not operate the routes or control token availability**.

## 3  How to Use the BNB Chain Bridge (User Guide)

### Step-by-Step

1. Visit [bnbchain.org/en/bnb-chain-bridge](https://www.bnbchain.org/en/bnb-chain-bridge).
2. Choose your **source chain** (e.g. Ethereum) and **destination chain** (e.g. BNB Chain).
3. Connect your wallet to source chain.
4. Choose a token to bridge and enter the amount.
5. The bridge tool will display **available routes** based on your token and chains.
6. Click **Send** (or **Approve** if required).
7. Wait for the transaction to complete. You’ll receive your tokens on the destination chain.

## 4  Understanding Bridge Aggregation

BNB Chain’s bridge tool is an **aggregator**. It finds available routes from partner bridge providers but:

* ❌ We do not custody tokens.
* ❌ We cannot add tokens ourselves.
* ✅ We simplify access and offer visibility into supported routes.

You can use the bridge for **all directions** – not just from BNB Chain to others, but also from Ethereum, Solana, and other supported chains **to BNB Chain**.

## 5  Developer Guide: Integrate the Canonical Bridge Widget

To integrate the same aggregator bridge experience in your own dApp or website:

### 📦 Canonical Bridge Repository

GitHub: [github.com/bnb-chain/canonical-bridge](https://github.com/bnb-chain/canonical-bridge)

### Features

* Embed cross-chain bridging into any website.
* Supports the same 6 route providers.
* React component + config options.
* Supports custom networks, tokens, style.
* Supports other chain to other chain transfer (e.g. Ethereum to Base)

### Use Cases

* DeFi dApps
* Wallet UIs
* NFT platforms offering cross-chain support

## 6  FAQs

| Question                                | Answer                                                                                  |
| --------------------------------------- | --------------------------------------------------------------------------------------- |
| I don’t see my token listed?            | Route providers decide which tokens they support. You can contact them directly.        |
| Is this a bridge just for BNB Chain?    | No — it supports **all chains** connected via our 6 providers.                      |
| Can I use this from Solana to Ethereum? | Yes, as long as a route provider supports it. (Only available in Canonical Bridge Widget)                                           |
| Can I embed this bridge in my dApp?     | Yes — use the [Canonical Bridge widget](https://github.com/bnb-chain/canonical-bridge). |

## 7  Final Notes

* Users should always verify token addresses and routes.
* For token support, contact the respective bridge provider.
* BNB Chain simplifies access to existing infrastructure — we aggregate, not operate.

## 8  Changelog

* **2025-05-28** – Initial draft of user + developer combined guide.
