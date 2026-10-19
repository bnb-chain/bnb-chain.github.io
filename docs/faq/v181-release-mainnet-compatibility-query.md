---
title: "v1.8.1 Release Mainnet Compatibility Query - BSC FAQs"
---

### v1.8.1 Release Mainnet Compatibility Query

### Question
Is the v1.8.1 release safe to deploy on the mainnet?

### Answer
No, the **v1.8.1 release is for the Chapel testnet only**. It should not be deployed to the BSC mainnet.

The v1.8.1 release contains the hardfork configuration specifically for the Chapel testnet. It does not include a scheduled activation block for the mainnet. A separate version for the mainnet hardfork will be released after the testnet hardfork is successfully completed and verified.

**Guidelines for Node Operators:**
* **Verify Compatibility:** Always check the release notes on the official repository. Releases for testnets are often tagged or described as such and lack mainnet activation schedules.
* **Production Deployment:** Only deploy versions that explicitly list a mainnet hardfork block number in their release announcement or configuration.
* **Wait for Updates:** If you are running a mainnet node, wait for the next official release (e.g., v1.8.2) designated for the mainnet upgrade.

---

Applies to: v1.8.1
