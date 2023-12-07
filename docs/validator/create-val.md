---
sidebar_label: Create Validator
sidebar_position: 2
hide_table_of_contents: false
---

# Create Validator

## Create a mining account

You need to create an account that represents a key pair first. Use the following command to create a new account and set a password for that account:
```bash
geth account new --datadir ./node
```

This command will return the public address and the path to your private key. BACKUP of the keyfile is necessary!

If you already have an account, use the seed phrase to recover it:

```bash
geth account import --datadir ./node
```

## Create a voting key
You are incentivized to set a voting key which will be used for fast finality voting. Voters will receive due rewards.
```bash
geth bls account new --datadir ./node
```

This command will create a bls wallet and generate a voting key. During the process, you will need to set the wallet password to encrypt the voting key. The wallet password is required when running the validator. Do not disclose the voting key, otherwise it may be used for malicious voting!

If you already have a voting key, create a bls wallet and use the keyfile to recover it:
```bash
geth bls wallet create --datadir ./node
geth bls account import <keyfile> --datadir ./node
```

### Become a Validator Candidate
You need use **bnbcli** binary to send **create-validator** transaction, thus to declare the candidacy.

Use **bnbcli** to create an account or recover an account, make sure the account get more than 10000 BNB.


```
## Command for create validator on mainnet
bnbcli staking bsc-create-validator \
--side-cons-addr {mining account} \
--side-vote-addr {validator vote pub key} \
--bls-wallet {path to bls wallet} \
--side-fee-addr {wallet address on BSC} \
--address-delegator {wallet address on BC} \
--side-chain-id bsc \
--amount 2000000000:BNB \
--commission-rate {10000000 represent 10%} \
--commission-max-rate {20000000 represent 20%} \
--commission-max-change-rate {500000000 represent 5%} \
--moniker {validator name} \
--details {validator detailed description} \
--identity {keybase identity} \
--website {website for validator} \
--from {key name} \
--chain-id Binance-Chain-Tigris \
--node https://dataseed5.defibit.io:443

## Command for create validator on testnet
tbnbcli staking bsc-create-validator \
--side-cons-addr {mining account} \
--side-vote-addr {validator vote pub key} \
--bls-wallet {path to bls wallet} \
--side-fee-addr {wallet address on BSC} \
--address-delegator {wallet address on BC} \
--side-chain-id chapel \
--amount 1000000000:BNB \
--commission-rate {10000000 represent 10%} \
--commission-max-rate {20000000 represent 20%} \
--commission-max-change-rate {10000000 represent 1%} \
--moniker {validator name} \
--details {validator detailed description} \
--identity {keybase identity} \
--website {website for validator} \
--from {key name} \
--chain-id Binance-Chain-Ganges \
--node=http://data-seed-pre-1-s3.bnbchain.org:80
```

Please ensure that the newly created mining account
in the above step is assigned as the **side-cons-addr**.

Go to [explorer](https://explorer.bnbchain.org/) to verify your transactions.

### Running a Validator
Refer to [Running as Validator](run-val) to start a real running validator. 