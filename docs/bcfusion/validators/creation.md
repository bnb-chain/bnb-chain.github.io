import Validator1 from '../../assets/bcfusion/create-validator1.png';
import Validator2 from '../../assets/bcfusion/create-validator2.png';
import Validator3 from '../../assets/bcfusion/create-validator3.png';
import Validator4 from '../../assets/bcfusion/create-validator4.png';

# Validator Creation

If you are migrating old validators created on
the BNB Beacon Chain, please refer to [this document](migrations.md) for more information.

You can new the BNB staking dApp to create your validators.

BNB Staking dApp on testnet: https://testnet-staking.bnbchain.org/en/bnb-staking

BNB Staking dapp on mainnet: To be updated.

After opening the dapp, you can click the `Become a Validator` button to create a new validator.

The following information will be required in the `Create Validator` page.

## Basic Info

<img src={Validator1} width="400"/>

- **Validator Name**: The name of your validator.
- **Website**: Your website for sharing more information about your validator.
- **Description**: Description of your validator.

You can upload more information in the [BSC validator directory](https://github.com/bnb-chain/bsc-validator-directory).
After you uploading the avatar in the repo, it will be displayed in the staking dApp.

## Addresses

<img src={Validator2} width="400"/>

- **Consensus address**: The consensus address of the validator's node.
- **Vote Address**: The address for participating fast finality voting.
- **BLS Proof**: A BLS signature to prove that the validator owns the vote address.
- **Identity**: If you are f you are a old validator operator on the BC side, please make a validator mapping signature
  via the following steps.

### Create vote address & BLS proof

Please down load BSC geth binary here: https://github.com/bnb-chain/bsc/releases/tag/v1.3.10

Create a BLS account or import an existing BLS account you already have.

```shell
 geth bls account new
 geth bls account new
```

Then you can get your vote address by running the following command.

```shell
geth bls account list
```

An example address
is `b5fe571aa1b39e33c2735a184885f737a59ba689177f297cba67da94bea5c23dc71fd4deefe2c0d2d21851eb11081f69`.

Then you can get your bls proof by running the following command.

```shell
geth_macos bls account generate-proof --chain-id ${BSC_CHAIN_ID} ${OPEATOR_ADDRESS} ${VOTE_ADDRESS}
```

An example proof
is `0xaf762123d031984f5a7ae5d46b98208ca31293919570f51ae2f0a03069c5e8d6d47b775faba94d88dbbe591c51c537d718a743b9069e63b698ba1ae15d9f6bf7018684b0a860a46c812716117a59c364e841596c3f0a484ae40a1178130b76a5`.

- `BSC_CHAIN_ID`: 56 for BSC mainnet, and 97 for BSC testnet.
- `OPEATOR_ADDRESS`: The address of your account, which will be reconginzed as the operator of the new validator.
- `VOTE_ADDRESS`: The vote address created in the last step.

### Create indentity

Please down load BC client binary here: https://github.com/bnb-chain/node/releases/tag/v0.10.18

#### Local Key

```shell
${workspace}/bin/bnbcli \
  validator-ownership \
  sign-validator-ownership \
  --bsc-operator-address ${NEW_VALIDATOR_OPERATOR_ADDR_ON_BSC} \
  --from ${ACCOUNT_NAME} \
  --chain-id ${BC_CHAIN_ID} \
```

#### Ledger Key

```shell
${workspace}/bin/bnbcli \
  validator-ownership \
  sign-validator-ownership \
  --bsc-operator-address ${NEW_VALIDATOR_OPERATOR_ADDR_ON_BSC} \
  --from ${BSC_OPERATOR_NAME} \
  --chain-id ${CHAIN_ID} \
  --ledger
```

- `${workspace}/bin/bnbcli`: The path to the `bnbcli` binary executable. For testnnet, you should use `tbnbcli` instead.

- `--to ${NEW_VALIDATOR_OPERATOR_ADDR_ON_BSC}`: Specifies the BSC address to which the new validator operator address
  will be mapped.

- `--chain-id ${BC_CHAIN_ID}`: Specifies the chain ID for the BC(BNB beacon chain). By default, the mainnet chain ID
  is `Binance-Chain-Tigris`.

- `--from ${ACCOUNT_NAME}`: Specifies the account name from which the sign will be performed.

And you will get the output like this:

```
TX JSON: {"type":"auth/StdTx","value":{"msg":[{"type":"migrate/ValidatorOwnerShip","value":{"bsc_operator_address":"RXN7r5XZlaljqzp8msZvx6Y6124="}}],"signatures":[{"pub_key":{"type":"tendermint/PubKeySecp256k1","value":"Ahr+LlBMLgiUFkP75kIuJW1YHrsTy39GeOdV+IaTREDN"},"signature":"AL5mj52s0+tcdoEb6c6PAmqBixuv3XEmrLW3Y1kvUeYgG3RqVvWU/dIVcfxiHHwLGXlcn0X1v00jFrpLIsxtqA==","account_number":"0","sequence":"0"}],"memo":"","source":"0","data":null}}
Sign Message:  {"account_number":"0","chain_id":"Binance-GGG-Ganges","data":null,"memo":"","msgs":[{"bsc_operator_address":"0x45737baf95d995a963ab3a7c9ac66fc7a63ad76e"}],"sequence":"0","source":"0"}
Sign Message Hash:  0x8f7179e7969e497b5f3c006535e55c2fa5bea5d118a8008eddce3fccd1675673
Signature: 0x00be668f9dacd3eb5c76811be9ce8f026a818b1bafdd7126acb5b763592f51e6201b746a56f594fdd21571fc621c7c0b19795c9f45f5bf4d2316ba4b22cc6da8
PubKey: 0x021afe2e504c2e08941643fbe6422e256d581ebb13cb7f4678e755f886934440cd
```

The `Signature` is your `identity` for associating to the old validator created on the Beacon Chain.

## Commissions

<img src={Validator3} width="400"/>

- **Rate**: The commission rate of the validator.
- **Max Rate**: The maximum commission rate that the validator can set.
- **Max Change Rate**: The maximum rate change the validator can set to every epoch (1 day).

## Self-delegation

<img src={Validator4} width="400"/>

- **Self Delegate Amount**: The amnout to delegate when creating the validator. The minimal number to input is `2001` -
  for the minimal self delegation amount is 2000 BNB and extra 1 BNB for locking to a dead address.