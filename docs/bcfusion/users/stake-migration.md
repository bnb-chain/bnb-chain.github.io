import Migrate1 from '../../assets/bcfusion/stake-migration1.png';
import Migrate2 from '../../assets/bcfusion/stake-migration2.png';
import Migrate3 from '../../assets/bcfusion/stake-migration3.png';
import Migrate4 from '../../assets/bcfusion/stake-migration4.png';


# Stake Migration

The BNB Chain community recently introduced [BEP333: BNB Chain Fusion](https://github.com/bnb-chain/BEPs/pull/333).
This BEP aims to retire the BNB Beacon Chain from the BNB Chain ecosystem.
Specifically, the [native staking](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP294.md)
will be introduced on the BNB Smart Chain.
After the [Feynman Hardfork](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP294.md), users can migrate their
previous existing delegations to the new native staking system via two options:

* Cross Chain Redelegation
* Undelegation, Cross Chain Transfer, New Delegation

## Cross Chain Redelegation

Cross chain redelegation allow users to migrate their delegations to BSC as delegations to native BSC validators,
facilitaling users for easier migration compared to the second option.
Therefore this is the recommended way for stake migration.

### Steps

#### Step 1: Find your delegations

Go to the staking website and connect to your web3 wallet.

Mainnet Staking Website: [https://staking.bnbchain.org/en/staking](https://staking.bnbchain.org/en/staking)

Testnet Staking
Website: [https://testnet-staking.bnbchain.org/en/staking](https://testnet-staking.bnbchain.org/en/staking)

For testnet, you
can [BNB Chain Wallet](https://chromewebstore.google.com/detail/bnb-chain-wallet/fhbohimaelbohpjbbldcngcnapndodjp) to
connect.

For mainnet, you can use BEW or [Trust](https://trustwallet.com/browser-extension) to connect.

<img src={Migrate1} width="400"/>

Open `My Staking` page, Then you can find you existing delegations as the following.

<img src={Migrate2} width="400"/>

#### Step 2:  Choose the native BSC validators to migrate to.

Choose one delegation and click `Migrate to BSC` button. The following window will be poped up for choosing
which BSC valiadtor you want to migrate to.

<img src={Migrate3} width="400"/>

The window mainly contains the following fields:

* The validator to migrate to: if the validator operator of the old delegation already creates a new validator on BSC,
  this field will be set to the new validator. You can also choose another validator you want to delegate to.
* The BSC delegator address: the address will be used as the owner for you to manage staking on the BSC. Please double
  confirm the address is correct to avoid funding lost.

#### Setp 3: Sign the migrate transaction.

Finally, you can sign the transaction and migration will be started.

<img src={Migrate4} width="400"/>

If the migration goes well, you will find the delegation in the new staking dApp. If the migration fails, the fund will
be returned to your Beacon Chain, and you can check it in your free balance.

## Undelegation, Cross Chain Transfer, New Delegation

The second option needs the delegator to 1) do undelegation on the Beacon Chain, wait the unboinding period, 2) cross
chain transfer BNB to the BSC, and 3) stake in the new staking dApp. It needs more time and transaction fee, therefore
it is not recommended.

### Steps

#### Step 1: Find your delegations

You can find your delegations as the steps in the option 1.

#### Step 2: Undelegate

Then you can undelegate your delegations by click `Undelegate` button and send the transaction to the Beacon Chain.

After the unbonding period (7 days in mainnet), the stake be returned to your Beacon Chain account.

#### Step 3: Cross chain transfer

You can use BEW or Trust to cross chain transfer your BNB from the Beacon Chain to the BSC.

#### Step 4: Delegate to new validators

Finnally, you can delegate to the new BSC valdiators using the new staking dApp.
