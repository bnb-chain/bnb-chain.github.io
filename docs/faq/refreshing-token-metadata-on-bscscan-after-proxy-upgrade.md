---
title: "Refreshing Token Metadata on BscScan After Proxy Upgrade - BSC FAQs"
---

### Refreshing Token Metadata on BscScan After Proxy Upgrade

### Problem
After upgrading a proxy contract's implementation, the BscScan Token Tracker (displaying the token name and symbol) might still show the metadata from the old implementation. This happens because BscScan often caches or "snapshots" token metadata when a contract is first identified.

### Solution

Follow these steps in order to refresh the metadata on BscScan (Mainnet or Testnet):

1. **Re-verify the Proxy Link**
   - Go to your proxy contract address on BscScan.
   - Navigate to the **Contract** tab.
   - Select **More Options** -> **Is this a proxy?**.
   - Click **Verify** (even if it was already verified). This often triggers BscScan to re-sync the metadata from the implementation.

2. **Verify the New Implementation Contract**
   - Ensure the new implementation contract is verified with its source code on BscScan. If the implementation code isn't visible, BscScan may fail to correctly pull values for the proxy.

3. **Check "Read as Proxy"**
   - On the proxy contract page, go to **Contract** -> **Read as Proxy**.
   - Verify if `name()` and `symbol()` return the updated values. If they do, the on-chain upgrade is successful, and the issue is purely BscScan's display cache.

4. **Submit a Token Update Request**
   - If the "Token Tracker" still shows the old metadata after a few hours despite the steps above, you must request a manual refresh.
   - Use the BscScan [Token Update](https://bscscan.com/contactus) form (or the [Testnet Contact Us](https://testnet.bscscan.com/contactus) page).
   - You will typically need to provide proof of ownership/authorization to update the token information in their database.

**Note:** On Testnet, BscScan may be less responsive to manual update requests. Pointing users to the **"Read as Proxy"** tab is the best way to prove the upgrade worked on-chain.
