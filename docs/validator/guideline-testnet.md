---
sidebar_label: Run Validator on Testnet
sidebar_position: 2
hide_table_of_contents: false
---
# How to join BNB Smart Chain Testnet as Validator?

### Before You Start

Before you start, make sure you meet the hardware requirements for the validators nodes.

#### Choose Your Validator hardware

- VPS running recent versions of Mac OS X or Linux.
- **IMPORTANT** 2T GB of free disk space, solid-state drive(SSD), gp3, 8k IOPS, 250MB/S throughput, read latency <1ms
- 16 cores of CPU and 48 gigabytes of memory (RAM)
- Suggest m5zn.3xlarge instance type on AWS, or c2-standard-8 on Google cloud.
- A broadband Internet connection with upload/download speeds of 10 megabyte per second

### Setup a Validator Node at Testnet

!!! Note
	If you are running a node in Testnet, 2CPU/8GB of RAM is sufficient.

**Install BSC Fullnode**

You can download the pre-build binaries from [release page](https://github.com/bnb-chain/bsc/releases/latest) or follow the instructions [here to set up a full node](fullnode.md).

**Download the config files**

Download `genesis.json` and `config.toml` by:
```bash
## testnet
wget --no-check-certificate  $(curl -s https://api.github.com/repos/bnb-chain/bsc/releases/latest |grep browser_ |grep testnet |cut -d\" -f4)
unzip testnet.zip
```

Launch your node and wait for it to get synced.

### Create Consensus Key

You need to create an account that represents a validator's consensus key. Use the following command to create a new account and set a password for that account:

```bash
geth account new --datadir ./node
```

### Start Validator Node

!!! Warning
	Please do not expose your RPC endpoints to the public network.

```bash
echo {your-password} > password.txt
geth --config ./config.toml --datadir ./node --syncmode snap -unlock {your-validator-address} --password password.txt  --mine  --allow-insecure-unlock --cache 18000
```

### Get Testnet Token from Faucet

You can get testnet BNB from <https://testnet.binance.org/faucet-smart>, but the BNB is on BNB Smart Chain.

Download `tbnbcli `from [GitHub](https://github.com/bnb-chain/node-binary/tree/master/cli/testnet/0.8.1). Use `tbnbcli` to create an account or recover an account.

You can follow the [guide](https://docs.bnbchain.org/docs/binance#transfer-testnet-bnb-from-bsc-to-bc) to transfer BNB from BSC testnet to BC testnet.

### Declare Your Candidacy

Use `tbnbcli` to create an account or recover an account, make sure the account get more than 10,000 BNB for Mainnet and 100 BNB for Testnet.

Before sending `create-validator` transaction, make sure your bsc validator have already catched up.

Example on testnet

```
tbnbcli staking bsc-create-validator \
--side-cons-addr {validator address} \
--side-fee-addr {wallet address on BSC} \
--address-delegator {wallet address on BC} \
--side-chain-id chapel \
--amount 10000000000:BNB \
--commission-rate {10000000 represent 10%} \
--commission-max-rate {20000000 represent 20%} \
--commission-max-change-rate {10000000 represent 1%} \
--moniker {validator name} \
--details {validator detailed description} \
--identity {keybase identity} \
--website {website for validator} \
--from {key name} \
--chain-id Binance-Chain-Ganges \
--node=http://data-seed-pre-1-s3.binance.org:80
```

Go to [explorer](https://explorer.bnbchain.org/) to verify your transactions.

Check your validator's status at this [page](https://testnet-staking.binance.org/en/staking)

## After Declaring Your Candidacy

### 1. Monitor node status

To get started quickly, run GethExporter in a Docker container.

```
docker run -it -d -p 9090:9090 \
  -e "GETH=http://mygethserverhere.com:8545" \
  hunterlong/gethexporter
```

![](https://grafana.com/api/dashboards/6976/images/4471/image)

### 2. Update validator profile

You can submit a PullRequest to this repository to update your information: <https://github.com/bnb-chain/validator-directory>
Reference: <https://grafana.com/grafana/dashboards/6976>


### 3. Publish Validator Information

Please submit a Pull Request to this repo <https://github.com/bnb-chain/validator-directory>

This repository is a place for validator candidates to give potential delegators a brief introduction about your team and infrastructure, and present your ecosystem contributions.

### 4. Stop Validating

You can stop mining new blocks by sending commands in `geth console`

Connect to your validator node with `geth attach ipc:path/to/geth.ipc`

```bash
miner.stop()
```

To resume validating,
```bash
miner.start()
```

