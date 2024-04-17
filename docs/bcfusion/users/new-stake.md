import Stake1 from '../../assets/bcfusion/user-stake1.png';
import Stake2 from '../../assets/bcfusion/user-stake2.png';
import Stake3 from '../../assets/bcfusion/user-stake3.png';
import Stake4 from '../../assets/bcfusion/user-stake4.png';
import Stake5 from '../../assets/bcfusion/user-stake5.png';
import Stake6 from '../../assets/bcfusion/user-stake6.png';
import Stake7 from '../../assets/bcfusion/user-stake7.png';
import Stake8 from '../../assets/bcfusion/user-stake8.png';
import Stake9 from '../../assets/bcfusion/user-stake9.png';
import Stake10 from '../../assets/bcfusion/user-stake10.png';

# Managing New Stakes with BNB Staking dApp

Leverage the BNB staking dApp for streamlined management of your stakes. This guide provides a step-by-step walkthrough for using the dApp on both testnet and mainnet.

- **Testnet**: [https://testnet-staking.bnbchain.org/en/bnb-staking](https://testnet-staking.bnbchain.org/en/bnb-staking)
- **Mainnet**: [https://www.bnbchain.org/en/bnb-staking](https://www.bnbchain.org/en/bnb-staking)

## Connecting Your Wallet

<img src={Stake1} width="400"/>

To interact with the dApp, first connect your web3 wallet. Currently, `TrustWallet` (mainnet only) and `MetaMask` are supported, along with any wallets compatible with `WalletConnect`.

## Delegating Stakes

1. Select a validator to delegate your stakes to. Detailed information about each validator is available on their respective pages.
2. Click the `Delegate` button to initiate a new delegation.

<img src={Stake2} width="400"/>

3. Enter the amount of BNB you wish to delegate.

<img src={Stake3} width="400"/>

4. After confirming the delegation, your connected wallet will prompt you to sign the transaction. Successful transactions will be visible in the `My Staking` page, complete with transaction hash.

<img src={Stake4} width="400"/>

# Redelegating Stakes

Within the `My Staking` page, you can manage your current delegations.

- Click `Redelegate` to shift your stake to a different validator. 

Note: A redelegation fee of 0.002% applies to discourage frequent switching between validators.

<img src={Stake6} width="400"/>

- In the ensuing popup, select your new validator and specify the amount to redelegate. You can opt to move the entire amount or just a portion.

<img src={Stake7} width="400"/>

# Undelegating Stakes

To undelegate:

1. Click the `Undelegate` button next to the relevant delegation.

<img src={Stake8} width="400"/>

2. You can choose to undelegate the entire amount or a portion. Note that undelegated stakes are subject to a 7-day unbonding period before they are returned to your account.

<img src={Stake9} width="400"/>

# Claiming Stakes

After the unbonding period, you can claim your stakes by clicking the `Claim` button.

<img src={Stake10} width="400"/>