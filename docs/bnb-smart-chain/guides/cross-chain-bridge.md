---
title: BNB Chain Bridge – Cross‑Chain Guide
---

# BNB Chain Bridge (Wormhole) – Cross-Chain Guide

> **Status:** Draft · Last updated: 28 May 2025
>
> **Purpose** – Provide a single, end-to-end reference for bridging fungible tokens and NFTs **to** and **from** BNB Smart Chain (BSC), opBNB and BNB Greenfield using the **BNB Chain Bridge powered by Wormhole**. The guide fills gaps left by individual L2/L3 docs and adds concrete examples of cross-chain token migration.

> **Official Resource:** Learn more at the [BNB Chain Bridge Portal](https://www.bnbchain.org/en/bnb-chain-bridge)

---

## 1  Audience

* **Web3 users** who need a practical walkthrough.
* **dApp developers** integrating Wormhole SDK.
* **Support teams** resolving bridge issues.

## 2  Key Features & Improvements

| Feature                                      | Benefit                        |
| -------------------------------------------- | ------------------------------ |
| \~30 chains supported via Wormhole Guardians | Large surface for liquidity    |
| Automatic route discovery & fee quote        | UX parity with CEX withdrawals |
| On-chain proof of lock/mint                  | Verifiable token accounting    |
| Message batching on opBNB                    | Up to 40% cheaper gas          |

## 3  Supported Routes (May 2025)

* **EVM chains**: Ethereum, Arbitrum, Optimism, Polygon PoS, Polygon zkEVM, Avalanche C-Chain, Base, Mantle, Linea, opBNB, BSC.
* **Non-EVM**: Solana, Sui, Aptos, Cosmos SDK chains via Gateway.
* **Storage targets**: BNB Greenfield buckets (for bridged NFT metadata).

> **Tip —** Check the live list at [wormhole.com/platform/blockchains](https://wormhole.com/platform/blockchains) before initiating a transfer.

## 4  Prerequisites

1. **Wallets**

   * MetaMask ≥ v11 for EVM chains.
   * Phantom or Solflare for Solana.
2. **Native gas tokens** on **both** source & destination chains (e.g. ETH + BNB, or MATIC + BNB).
3. **RPC endpoints** that accept large calldata (Gateway RPC recommended for opBNB).

## 5  Quick-Start (BNB Chain Bridge UI)

1. Navigate to [BNB Chain Bridge](https://www.bnbchain.org/en/bnb-chain-bridge) and click **Launch App**.
2. In the **From** panel, select your **source chain**. In the **To** panel, select **BNB Smart Chain**, **opBNB**, or **BNB Greenfield** as the destination.
3. Connect your wallet on both chains as prompted.
4. Choose the token you wish to bridge and enter the amount.
5. Approve the token for spending if required.
6. Confirm the **Lock** transaction on the source chain.
7. Wait for the transfer to finalize via Wormhole’s Guardian network (usually \~20 seconds).
8. Switch to the destination chain and confirm the **Redeem** transaction to receive the bridged asset.

## 6  Example Walkthrough – Migrate 100 USDC from Any Chain → BNB Chain

```text
Step 1  (Source Chain)
• Approve 100 USDC spending by Wormhole TokenBridge.
• Gas: ≈ native token of source chain

Step 2  (Source Chain)
• Submit Lock tx. Tx hash: 0xabc…def.
• Wait for a few block confirmations.

Step 3  (Guardian network)
• 19/19 Guardians sign VAA #0x1234.

Step 4  (BNB Chain)
• Call `completeTransferWithRelay()` using VAA.
• Mint 100 pUSDC (Portal-wrapped) to your BNB Chain address.
```

Screenshot placeholders:

* `source-lock.png` – UI after approving.
* `vaa-signed.png` – Explorer view.
* `bnb-redeem.png` – Final receipt.

## 7  Programmatic Integration (TypeScript)

```ts
import { getSignedVAA, transferFromEth } from "@wormhole-foundation/sdk";

// Lock 100 USDC on a source EVM chain
const tx = await transferFromEth({
  signer: sourceSigner,
  token: usdcAddress,
  amount: "100",
  destinationChain: "bsc",
  destinationAddress: userAddress,
});

// Fetch VAA & redeem on BSC
const { vaaBytes } = await getSignedVAA("sourceChain", tx.sequence);
await redeemOnBsc({ signer: bscSigner, vaa: vaaBytes });
```

## 8  Troubleshooting & FAQs

| Symptom                          | Resolution                                                                                                                       |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **VAA pending > 5 min**          | Check [https://wormhole.com/explorer](https://wormhole.com/explorer); if Guardians show 18/19 signatures wait, else open ticket. |
| **“Transfer Limit Exceeded”**    | Split into smaller chunks; current Portal cap is \~\$2 M per tx.                                                                 |
| **pUSDC not recognised by dApp** | Add token address `0xb12b...` manually or swap to native USDC on PancakeSwap.                                                    |

## 9  Security & Risk Notes

* Wormhole contracts on BSC upgraded to **v3.6** after full audit by **Trail of Bits** (Feb 2025).
* Guardian set multi-sig threshold is 2⁄3 + 1 (currently 15/19).
* Always verify token addresses at [https://portalbridge.com/#/token-list](https://portalbridge.com/#/token-list).

## 10  Fees & Limits

* **Bridge fee:** 0.000012 BNB flat (covers Guardian + relayer).
* **Gas:** Variable; < 0.0005 BNB for redemption on BSC.
* **Daily notional cap:** US\$200 M per user.

## 11  Changelog

* **2025-05-28** – Initial draft with generic cross-chain migration example.
