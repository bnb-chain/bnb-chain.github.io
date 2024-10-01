---
title: Run BSC Validator - BNB Smart Chain
---

# Run BSC Validator

## Validator Hardware Requirements

### Mainnet

- VPS running recent versions of Mac OS X or Linux.
- **IMPORTANT** 3T GB of free disk space, solid-state drive(SSD), gp3, 8k IOPS, 500 MB/S throughput, read latency <1ms (if start with snap sync, it will need NVMe SSD).
- 16 cores of CPU and 64 gigabytes of memory (RAM).
- Suggest m5zn.3xlarge or r7iz.4xlarge instance type on AWS, or c2-standard-16 on Google cloud.
- A broadband Internet connection with upload/download speeds of 5 megabyte per second

### Testnet

- CPU: 4core, Intel(R) Xeon(R) Platinum 8175M CPU @ 2.50GHz
- Memory: 16 GB
- Disk: ~1.5 TB
- Network Bandwidth: Upto 25 Gbps
- EBS Bandwidth: Upto 9.5 Gbps

## Setup Validator Node

### 1. Install BSC Fullnode

Follow the instructions [here to set up a full node](../developers/node_operators/full_node.md).

### 2. Prepare Accounts

Two accounts require preparation before running a validator: the Consensus account and the BLS Vote account.
Ensure these accounts match the corresponding ones when creating a new validator.

#### Generate Consensus Address
To create a new mining consensus account, run this command and set a password for the account:

```shell
geth account new --datadir ${DATA_DIR}
```

-  `DATA_DIR`: Where your key store files are saved.

If you already have a consensus account, skip this step. Save the password in a file named password.txt:

```shell
echo {your-password for the consensus account} > password.txt
```

#### Generate BLS Vote Address

To set up a new BLS account, use this command:

```shell
geth bls account new --datadir ${DATA_DIR}
```

-  `DATA_DIR`: The directory to store your key store files.

If you already have a BLS vote key, you can create a BLS wallet and recover it with the keyfile using:

```shell
geth bls account import ${KEY_FILE} --datadir ${DATA_DIR}
```

To retrieve your bls address, run:

```shell
geth bls account list --datadir ${DATA_DIR}
```

Save the password in a file named blspassword.txt:

```shell
echo {your-password for the BLS wallet} > blspassword.txt
```

### 3. Start Validator Node

> Warning: Please do not expose your RPC endpoints to public network!

Start your validator using the command line below:

```bash
geth --config ./config.toml --datadir ./node --syncmode snap -unlock {accounts to sign txs, including your mining account at least} --miner.etherbase {the address of your mining account} --password password.txt --blspassword blspassword.txt --mine --vote --allow-insecure-unlock --cache 18000
```

## Post Running

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

Please submit a Pull Request to this repo <https://github.com/bnb-chain/bsc-validator-directory>

This repository is a place for validator candidates to give potential delegators a brief introduction about your team and infrastructure, and present your ecosystem contributions.

### 4. Stop Validating

You can stop mining new blocks by sending commands in **geth console**

Connect to your validator node with **geth attach ipc:path/to/geth.ipc**

```bash
miner.stop()
```

To resume validating,
```bash
miner.start()
```

## Some Tips & Tools
### 1.Run backup node
Backup node could help when your primary validator node encounters issues due to a variety of potential reasons, ensuring the continuity and reliability of your participation in the network.

### 2.Check your node’s stability
There is a javascript in BSC repo to dump the slash status of each validator.
```
cd <bsc>/cmd/jsutils
# 1.To dump the slashes of the lates block:
node getslashcount.js --Rpc https://bsc-mainnet.nodereal.io/v1/454e504917db4f82b756bd0cf6317dce

# 2.You may also specify the block number:
node getslashcount.js --Rpc https://bsc-mainnet.nodereal.io/v1/454e504917db4f82b756bd0cf6317dce --Num 39938351
```
If your validator operates smoothly, you should expect minimal or even no penalties, known as "slashes," on a daily basis. Generally speaking, if your validator incurs more than three slashes within a single day, it would be prudent to investigate the cause for this anomaly.

### 3.About maintenance mode
Should your validator incur 50 slashes, it will automatically transition into maintenance mode. It is imperative to promptly diagnose and rectify any issues with your node to prevent further penalties. Failure to do so may result in your node being placed in a more restrictive state, often referred to as "jail."

Upon successfully restoring your node's functionality, it is crucial to promptly [exit maintenance mode](https://github.com/bnb-chain/bsc/blob/master/docs/parlia/README-BEP-127.md#exit-maintenance) to resume normal operations and avoid any unnecessary downtime or penalties.
```
// note: replace "0x75B851a27D7101438F45fce31816501193239A83" with your validator's consensus address.
geth attach geth.ipc
web3.eth.sendTransaction({   from: "0x75B851a27D7101438F45fce31816501193239A83",   to: "0x0000000000000000000000000000000000001000",   data: "0x04c4fec6"})
```

### 4.Filter out peers by regex pattern
This functionality was introduced with version [1.4.6](https://github.com/bnb-chain/bsc/releases/tag/v1.4.6), primarily designed to identify and exclude peers that may present operational challenges, thereby preventing connections with them. For further details, please refer to this Pull Request: [PR#2404](https://github.com/bnb-chain/bsc/pull/2404).

Generally, this feature is not necessary for regular operation. However, in the event that a release contains critical bugs and an immediate upgrade of all nodes to a stable version is not feasible, this feature can be employed to disconnect from peers running the problematic versions. This serves as a temporary solution to mitigate the impact of the bugs until a comprehensive upgrade can be performed.

For example, if v1.4.9 has known issues, we wanna disconnect nodes of this version, you may update your `config.toml` and restart:
```
[Node.P2P]
PeerFilterPatterns = ["Geth/v1.4.9.*"]
```