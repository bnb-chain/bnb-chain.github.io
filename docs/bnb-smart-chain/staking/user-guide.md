---
title: User Guide - BSC Staking
---

# Manage Stakes with BNB Staking dApp

Leverage the BNB staking dApp for streamlined management of your stakes. This guide provides a step-by-step walkthrough for using the dApp on both BSC testnet and mainnet.

- **Testnet**: [https://testnet-staking.bnbchain.org/en/bnb-staking](https://testnet-staking.bnbchain.org/en/bnb-staking)
- **Mainnet**: [https://www.bnbchain.org/en/bnb-staking](https://www.bnbchain.org/en/bnb-staking)

## Connect Wallet

![](../img/staking/user-stake1.png){:style="width:400px"}

To interact with the dApp, first connect your web3 wallet. Currently, `TrustWallet` (mainnet only) and `MetaMask` are supported, along with any wallets compatible with `WalletConnect`.

## Delegate Stakes

1. Select a validator to delegate your stakes to. Detailed information about each validator is available on their respective pages.
2. Click the `Delegate` button to initiate a new delegation. 

    ![](../img/staking/user-stake2.png){:style="width:400px"}

3. Enter the amount of BNB you wish to delegate.

    ![](../img/staking/user-stake3.png){:style="width:400px"}

4. After confirming the delegation, your connected wallet will prompt you to sign the transaction. Successful transactions will be visible in the `My Staking` page, complete with transaction hash.

    ![](../img/staking/user-stake4.png){:style="width:400px"}

## Redelegate Stakes

On the `My Staking` page, you can manage your existing delegations.

>Note: A redelegation fee of 0.002% applies to discourage frequent switching between validators.

1. Click `Redelegate` to shift your stake to a different validator.

    ![](../img/staking/user-stake6.png){:style="width:400px"}

2. In the ensuing popup, select your new validator and specify the amount to redelegate. You can opt to move the entire amount or just a portion.

    ![](../img/staking/user-stake7.png){:style="width:400px"}

## Undelegate Stakes

To claim your stakes and rewards, you need to undelegate.

1. Click the `Undelegate` button next to the relevant delegation.

    ![](../img/staking/user-stake8.png){:style="width:400px"}

2. You can choose to undelegate the entire amount or a portion. Note that undelegated stakes are subject to a 7-day unbonding period before they are returned to your account.

    ![](../img/staking/user-stake9.png){:style="width:400px"}

## Claim Stakes

After the unbonding period, you can claim your stakes by clicking the `Claim` button.

![](../img/staking/user-stake10.png){:style="width:400px"}

## FAQs

### Which wallet can be used to delegate to validators?

Currently, `MetaMask` and `TrustWallet` are supported, along with any wallets compatible
with `WalletConnect`.

### Can I delegate/undelegate/redelegate/claim stakes on explorers?

If you want to do the aforementioned delegate/undelegate/redelegate/claim operations on BscScan or BscTrace, 
you should call the staking hub contract in the following URLs:
* [BscScan Stake Hub](https://bscscan.com/address/0x0000000000000000000000000000000000002002#writeContract)
* [BscTrace Stake Hub](https://bsctrace.com/address/0x0000000000000000000000000000000000002002?tab=Contract&p=1&view=contract_write)

### What is staking credit (stBNB)?

When you delegate BNB to a validator, you receive **staking credit tokens** as proof of your stake. Each validator issues its own unique credit token:

**Token Naming:**
- Name: `Stake{{validator moniker}}Credit`
- Symbol: `st{{validator moniker}}`
- Example: Staking with "BNB48Club" → receive "stBNB48Club"

**Key Properties:**

- ✅ Represents your staked BNB + accumulated rewards
- ✅ Auto-compounding: value increases as validators earn rewards
- ✅ Rewards automatically distributed when you undelegate
- ❌ Non-transferable between addresses
- ❌ Each validator's credit is unique and non-fungible

### How to calculate my staking balance?

Your staking credit value in BNB can be calculated using:

```
Your BNB Value = (stCreditAmount × totalPooledBNB) ÷ totalSupply()
```

**Where:**
- `stCreditAmount`: Your staking credit balance
- `totalPooledBNB`: Total BNB in validator's pool (stakes + rewards)
- `totalSupply()`: Total supply of the validator's staking credit

**Example:**

| Time | totalPooledBNB | totalSupply | Your stCredit | Your Value | Profit |
|------|----------------|-------------|---------------|------------|--------|
| Day 1 | 10,000 BNB | 10,000 | 100 | 100 BNB | - |
| Day 30 | 11,000 BNB | 10,000 | 100 | **110 BNB** | +10 BNB (10%) |

Your staking credit automatically appreciates as the validator earns block rewards!

### How to query total pooled BNB programmatically?

Use this JavaScript example to query a validator's total pooled BNB:

```javascript
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org');
const OPERATOR = '0x...'; // validator operator address

const hub = new ethers.Contract('0x0000000000000000000000000000000000002002',
  ['function getValidatorCreditContract(address) view returns (address)'], provider);

const creditAddr = await hub.getValidatorCreditContract(OPERATOR);
const credit = new ethers.Contract(creditAddr,
  ['function getPooledBNB(address) view returns (uint256)'], provider);

const bnb = await credit.getPooledBNB(OPERATOR);
console.log('Pooled BNB:', ethers.formatEther(bnb));
```