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
