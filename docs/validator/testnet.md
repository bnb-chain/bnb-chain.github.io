---
sidebar_label: Create a Validator on Testnet
sidebar_position: 2
hide_table_of_contents: false
---

# How to become a Validator Candidate

## Install Fullnode

Please follow this [guide](fullnode.md) to install bsc fullnode locally.

## Create an account

You need to create an account that represents a key pair first. Use the following command to create a new account and set a password for that account:
```bash
geth account new --datadir ./node
```

This command will return the public address and the path to your private key. BACKUP of keyfile is necessory!

If you already have an account, use the seed phrase to recover it:

```bash
geth account import --datadir ./node
```

### Get Testnet Funds from Faucet

Go to this faucet page: <https://testnet.binance.org/faucet-smart>

### Transfer BNB from BSC to BC

Please refer to this [guide](https://docs.bnbchain.org/docs/binance#transfer-testnet-bnb-from-bsc-to-bc) to transfer BNB with Binance Chain extension wallet.


### Become a Validator Candidate

You can use `tbnbcli` to [declare your candidacy](../stake/cli-commands.md) some of BNB to a validator

Go to [testnet explorer](https://testnet-explorer.binance.org/) to verify your transactions.

### Get Genesis File and Config file
```bash
wget --no-check-certificate  $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep testnet |cut -d\" -f4)
unzip testnet.zip
```

### Start Fullnode on BSC Testnet

Please run this command to run a fullnode as validator candidate

```bash
geth --datadir node init genesis.json
geth --config ./config.toml --datadir ./node --syncmode snap -unlock {validator-address} --mine --allow-insecure-unlock 
```

### Become a Validator Candidate of Testnet

You can use `tbnbcli` to [declare your candidacy](../stake/cli-commands.md) some of BNB to a validator

Go to [explorer](https://testnet-explorer.binance.org/) to verify your transactions.