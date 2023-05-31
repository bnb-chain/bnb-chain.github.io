---
sidebar_label: Run Validator
sidebar_position: 2
hide_table_of_contents: false
---
# Run Validator

## Validator Hardware Requirements

### 1. Mainnet
- VPS running recent versions of Mac OS X or Linux.
- **IMPORTANT** 2T GB of free disk space, solid-state drive(SSD), gp3, 8k IOPS, 250MB/S throughput, read latency <1ms (if start with snap/fast sync, it will need NVMe SSD)
- 16 cores of CPU and 64 gigabytes of memory (RAM)
- Suggest m5zn.3xlarge instance type on AWS, or c2-standard-16 on Google cloud.
- A broadband Internet connection with upload/download speeds of 10 megabyte per second

### 2. Testnet
- CPU: 4core, Intel(R) Xeon(R) Platinum 8175M CPU @ 2.50GHz
- Memory: 16 GB
- Disk: ~1.85 TB
- Network Bandwidth: Upto 25 Gbps
- EBS Bandwidth: Upto 9.5 Gbps

## Setting up Validator Node

### 1. Install BSC Fullnode

Follow the instructions [here to set up a full node](fullnode.md).

### 2. Start Validator Node

!!! Warning
	Please do not expose your RPC endpoints to public network.

```bash
## generate the consensus key and input the password
echo {your-password to the mining account} > password.txt
echo {your-password for the bls wallet} > blspassword.txt
geth --config ./config.toml --datadir ./node --syncmode snap -unlock {the address of your mining account} --password password.txt --blspassword blspassword.txt --mine --vote --allow-insecure-unlock --cache 18000
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

Please submit a Pull Request to this repo <https://github.com/bnb-chain/validator-directory>

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

