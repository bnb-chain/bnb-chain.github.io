---
title: BNB Chain Bridge – Cross‑Chain Guide
---

## 1  Audience

* **Web3 users** who need a practical walkthrough.
* **dApp developers** integrating Wormhole SDK.
* **Support teams** resolving bridge issues.

## 2  Key Features & Improvements

| Feature                                      | Benefit                        |
| -------------------------------------------- | ------------------------------ |
| \~30 chains supported via Wormhole Guardians | Large surface for liquidity    |
| Automatic route discovery & fee quote        | UX parity with CEX withdrawals |
| On‑chain proof of lock/mint                  | Verifiable token accounting    |
| Message batching on opBNB                    | Up to 40% cheaper gas          |

## 3  Supported Routes (May 2025)

* **EVM chains**: Ethereum, Arbitrum, Optimism, Polygon PoS, Polygon zkEVM, Avalanche C‑Chain, Base, Mantle, Linea, opBNB, BSC.
* **Non‑EVM**: Solana, Sui, Aptos, Cosmos SDK chains via Gateway.
* **Storage targets**: BNB Greenfield buckets (for bridged NFT metadata).

> **Tip —** Check the live list at [wormhole.com/platform/blockchains](https://wormhole.com/platform/blockchains) before initiating a transfer.

## 4  Prerequisites

1. **Wallets**

   * MetaMask ≥ v11 for EVM chains.
   * Phantom or Solflare for Solana.
2. **Native gas tokens** on **both** source & destination (e.g. MATIC + BNB).
3. **RPC endpoints** that accept large calldata (Gateway RPC recommended for opBNB).

## 5  Quick‑Start (Portal UI)

1. Navigate to [https://portalbridge.com](https://portalbridge.com) and click **Connect Wallet**.
2. In the **From** panel select **Polygon PoS**. In **To** pick **BNB Smart Chain**.
3. Choose a supported token (e.g. **USDC**). Enter the amount.
4. The bridge quotes fees & relayer costs; review and approve ERC‑20 spend.
5. Confirm the **Lock** transaction on Polygon. Wait for the Wormhole **VAA** to be signed (≃ 20 s).
6. Switch network → BSC when prompted and sign the **Mint/Redeem** tx.
7. You now hold **USDC (Portal)** on BSC; swap 1:1 to native USDC via PancakeSwap if needed.

## 6  Example Walkthrough – Migrate 100 USDC from Polygon → BNB Chain

```text
Step 1  (Polygon)
• Approve 100 USDC spending by Portal TokenBridge.
• Gas: ≈ 0.0008 MATIC (US$ 0.01)

Step 2  (Polygon)
• Submit Lock tx. Tx hash: 0xabc…def.
• Wait for 2 block confirmations (≈ 5 s).

Step 3  (Guardian network)
• 19/19 Guardians sign VAA #0x1234.

Step 4  (BSC)
• Call `completeTransferWithRelay()` using VAA.
• Mint 100 pUSDC (Portal‑wrapped) to your BSC address.
```

Screenshot placeholders:

* `polygon-lock.png` – UI after approving.
* `vaa-signed.png` – Explorer view.
* `bsc-redeem.png` – Final receipt.

## 7  Programmatic Integration (TypeScript)

```ts
import { getSignedVAA, transferFromEth } from "@wormhole-foundation/sdk";

// Lock 100 USDC on Polygon
const tx = await transferFromEth({
  signer: polygonSigner,
  token: usdcAddress,
  amount: "100",
  destinationChain: "bsc",
  destinationAddress: userAddress,
});

// Fetch VAA & redeem on BSC
const { vaaBytes } = await getSignedVAA("polygon", tx.sequence);
await redeemOnBsc({ signer: bscSigner, vaa: vaaBytes });
```

## 8  Troubleshooting & FAQs

| Symptom                          | Resolution                                                                                                                       |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **VAA pending > 5 min**          | Check [https://wormhole.com/explorer](https://wormhole.com/explorer); if Guardians show 18/19 signatures wait, else open ticket. |
| **“Transfer Limit Exceeded”**    | Split into smaller chunks; current Portal cap is \~\$2 M per tx.                                                                 |
| **pUSDC not recognised by dApp** | Add token address `0xb12b...` manually or swap to native USDC on PancakeSwap.                                                    |

## 9  Security & Risk Notes

* Wormhole contracts on BSC upgraded to **v3.6** after full audit by **Trail of Bits** (Feb 2025).
* Guardian set multi‑sig threshold is 2⁄3 + 1 (currently 15/19).
* Always verify token addresses at [https://portalbridge.com/#/token-list](https://portalbridge.com/#/token-list).

## 10  Fees & Limits

* **Bridge fee:** 0.000012 BNB flat (covers Guardian + relayer).
* **Gas:** Variable; < 0.0005 BNB for redemption on BSC.
* **Daily notional cap:** US\$200 M per user.

## 11  Changelog

* **2025‑05‑28** – Initial draft.
