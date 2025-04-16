---
title: Recovering Tokens Sent to the Wrong Chain or Address - BSC FAQs
---

### I accidentally sent my tokens to the wrong blockchain or wallet address. Can I recover them?

This is a common issue, and recovery depends entirely on **whether you control the private key** of the address where the tokens were sent.

---

### Step 1: Do You Control the Recipient Address?

Ask yourself the following:

- **Did you send tokens to an address you personally own (e.g., another one of your wallets)?**
  - If yes: Continue to recovery steps.
- **Did you send tokens to an exchange address or someone else’s wallet?**
  - If no private key access: You’ll need to **contact the owner/platform**. Recovery depends on their policies.

---

### Step 2: If You **Do Not Own** the Address

Unfortunately, there is no way to retrieve the tokens unless the recipient is willing to send them back. Here’s what you can try:

1. **Contact the exchange or platform** (if it’s a known wallet).
2. **Share transaction details** (TxID, address, token name, network used).
3. **Explain the mistake** and request a manual recovery.

> *Note: Not all platforms offer recovery services, and many will decline if the token was sent via an unsupported network.*

---

### Step 3: If You **Do Own** the Recipient Address

You can attempt token recovery using one of the following methods:

#### A. Sent Tokens to the Wrong Chain (e.g., BSC → opBNB or vice versa)

1. Open your wallet app (e.g. Trust Wallet).
2. Switch to the **network where the tokens were mistakenly sent** (e.g., opBNB).
3. If the token isn’t visible, **manually add the token** using its contract address.
4. You should now see the tokens in your wallet on the correct chain context.

> *You have not lost the tokens — they are just on a different network!*

#### B. Sent Tokens to a Different Address You Control

1. Open the wallet app (MetaMask, Trust Wallet, etc.).
2. Import the address using the **private key or recovery phrase**.
3. Switch to the correct network (e.g., BNB Smart Chain).
4. Manually add the token contract if needed.
5. Once confirmed, you can send the tokens back to your main wallet.

---

### How to Manually Add a Token in MetaMask or Trust Wallet

You’ll need the token’s contract address on the network in question.

1. Visit a blockchain explorer like [BscScan](https://bscscan.com).
2. Search for the token name (e.g., NEXO, USDT).
3. Copy the contract address.
4. In your wallet, select **“Add Token”** and paste the contract address.
5. Confirm the token appears and balance is shown.

---

### Frequently Asked Questions

**Q: What if I sent tokens from Binance to MetaMask using the wrong network?**  
A: If you own the receiving address (MetaMask), follow the steps to switch to the network you used. If not, you’ll need Binance’s help.

**Q: I used the wrong network and the tokens aren’t showing — are they lost?**  
A: Not necessarily. Tokens are still on the blockchain, just under a different network context.

**Q: Is it safe to import private keys into another wallet?**  
A: Yes — **as long as you trust the app** and never share the key publicly. Always back it up securely offline.

---

### Still Need Help?

If you’re still stuck, please reach out via by [opening a ticket on discord](https://discord.com/invite/bnbchain). Please include the following:

- The **transaction hash (TxID)**
- The **sending and receiving addresses**
- The **network used**
- The **token name**

We’ll help guide you through the best next steps.
