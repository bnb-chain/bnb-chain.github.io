---
title: Tokens Not Showing in Wallet - BSC FAQs
---

### I can’t see my tokens in my wallet after a transfer or airdrop. What’s going on?

This is a common situation and it can happen for various reasons — wrong network selected, token not added manually, unsupported token types, or the token hasn't been distributed yet.

---

### Common Real User Queries This FAQ Addresses

- **"I transferred USDT from Binance to my Phantom wallet, Binance says it’s done but I didn’t receive anything on Phantom."**
- **"My NFTs are displayed on BscScan as BEP-20 instead of BEP-721, so they don’t show up in Trust Wallet."**
- **"After bridging Aqualis Token from Ethereum to BSC via deBridge, it hasn’t appeared on the BNB Chain Bridge UI."**
---

### Step 1: Check the Transaction

1. Go to [BscScan](https://bscscan.com).
2. Enter your wallet address or transaction hash.
3. Confirm the following:
   - The transaction was **successful**
   - The token was sent to the correct **address**
   - The token exists on the **correct network**

---

### Step 2: Are You on the Right Network?

In your wallet (MetaMask, Trust Wallet, etc.):

- Ensure you’ve selected the same network the token was sent on.
  - For example, a token sent on **BNB Smart Chain** won’t show up under **Ethereum Mainnet** or **opBNB**.

If needed, add the network manually:
- For BSC:  
  RPC URL: `https://bsc-dataseed.binance.org/`  
  Chain ID: `56`  
- For opBNB:  
  RPC URL: `https://opbnb-mainnet-rpc.bnbchain.org/`  
  Chain ID: `204`

---

### Step 3: Manually Add the Token

Sometimes tokens won’t show until you manually import them.

1. Go to [BscScan](https://bscscan.com).
2. Search for your token (e.g., USDT, KILO).
3. Copy the **token contract address**.
4. In your wallet:
   - Click “Add Token” (MetaMask) or “Import Token” (Trust Wallet).
   - Paste the contract address and confirm the token symbol and decimals.
5. Your balance should now appear.

---

### Step 4: Token Not Distributed Yet?

Some airdrops or reward tokens may show as “pending” — especially in early-phase campaigns. If this applies to your token:

- Check the project’s **official announcement** or status page.
- Look for a **distribution timeline** or claim instructions.
- If tokens are marked as "pending" in Binance Web3 Wallet or event dashboard, you might just need to wait.

---

### Step 5: NFT Not Displaying?

- If your NFT shows on BscScan but not in your wallet:
  - Make sure your wallet supports the token **standard** (e.g., BEP-721, not BEP-20).
  - Try viewing your NFT on an NFT-specific platform or switch to a wallet with NFT support.

---

### Step 6: Bridged Tokens Not Appearing?

Tokens bridged using services like deBridge or LayerZero might not display until the final transaction is confirmed on both networks.

- Revisit the bridge UI and check the status.
- Manually add the token if needed.
- Be patient — bridging can take a few minutes or longer, depending on the network load.

---

### Frequently Asked Questions

**Q: What if I used the wrong wallet type or chain?**  
A: The token is likely still there — just on a different chain or wallet interface. Try switching networks or importing the token.

**Q: I see my tokens on BscScan, why don’t they show in my wallet?**  
A: You likely need to **manually add the token contract** in your wallet.

**Q: Is it dangerous to add a token manually?**  
A: No — as long as you use the official contract address from a trusted source like BscScan or the project team.

---

### Still Need Help?

If you're still having trouble, [open a support ticket on our Discord](https://discord.com/invite/bnbchain) and share the following details:

- Your **wallet address**
- The **transaction hash (TxID)**
- The **token name** and **network**
- A short explanation of the issue

We’ll do our best to assist you directly.
