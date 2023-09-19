---
sidebar_label: Create Validator
sidebar_position: 2
hide_table_of_contents: false
---
# Create Validator

## Requirements and Responsibility

To become a validator, you'll need to

1. Send a create-validator-open transaction to declare the candidacy. The minimal self-delegation asset amount is 10000 BNB.
2. Make users delegate on your validator. All the validators will be ranked by their accumulated BNB stake amount. 
There is an on-chain parameter `MaxValidators`. Only the validator candidates whose rank meets the requirement can be elected.
3. Run a full node to help produce blocks on BC.


## Become a Validator Candidate

You will need [BNB Beacon Chain CLI](../develop/api-reference/cli.md) for the commands.

### Step1: Generate Consensus Key
Use the command below to generate a consensus key. It will be used in the full node to sign the consensus message if the validator gets bonded.

```shell
$ bnbcli utils gen-consensus-key
The consensus key has been generated and saved to ./priv_validator_key.json successfully
The consensus pubkey is bcap1zcjduepqg6glk780f4ynvjjk82drnycty7zjl0uz79a6h2depnhavshvg39sm0c5tl
```

### Step2: Send Create Validator Transaction
Create or recover an account, make sure the account gets more than 10000 BNB.

```shell
$ bnbcli keys add your_key_name

$ bnbcli keys add your_key_name --recover
```

Send create-validator-open transaction to declare the candidacy.
```shell
# Command for create validator on mainnet  
$ bnbcli staking create-validator-open \  
--address-delegator {wallet address on BC} \
--amount 10000000000:BNB \  
--pubkey {the concensus pubkey created in step 1} \
--commission-rate {10000000 represent 10%} \  
--commission-max-rate {20000000 represent 20%} \  
--commission-max-change-rate {5000000 represent 5%} \  
--moniker {validator name} \
--details {validator detailed description} \  
--identity {keybase identity} \  
--website {website for validator} \  
--from {key name} \  
--chain-id Binance-Chain-Tigris \  
--node https://dataseed5.defibit.io:443  

# Query validators
./bnbcli staking  validators --chain-id Binance-Chain-Tigris    --node https://dataseed5.defibit.io:443
  
# Command for create validator on testnet  
$ tbnbcli staking create-validator-open \  
--address-delegator {wallet address on BC} \  
--amount 10000000000:BNB \
--pubkey {the concensus pubkey created in step 1} \
--commission-rate {10000000 represent 10%} \  
--commission-max-rate {20000000 represent 20%} \  
--commission-max-change-rate {1000000 represent 1%} \  
--moniker {validator name} \  
--details {validator detailed description} \  
--identity {keybase identity} \  
--website {website for validator} \  
--from {key name} \  
--chain-id Binance-Chain-Ganges \  
--node=http://data-seed-pre-2-s1.bnbchain.org:80

## Query validators on testnet
./tbnbcli staking  validators  --chain-id Binance-Chain-Ganges  --node=http://data-seed-pre-2-s1.bnbchain.org:80
```
