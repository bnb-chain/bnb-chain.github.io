---
sidebar_label: Run Validator
sidebar_position: 3
hide_table_of_contents: false
---
# Run Validator

## Validator Hardware Requirements

* VPS running recent versions of Mac OS X or Linux.
* 2 TB of free disk space, accessible at a minimum read/write speed of 200 MB/s.
* 8 cores of CPU and 16 gigabytes of memory (RAM).
* Suggest m5.2xlarge instance type on AWS, or c2-standard-8 on Google cloud.
* A broadband Internet connection with upload/download speeds of at least 10 megabyte per second.

## Setting up Validator Node

### 1. Install Fullnode

Follow the instructions [here to set up a full node](../develop/node/join-mainnet.md).

### 2. Start Validator Node

Put `priv_validator_key.json`, which contains your validator key, into `config` directory. The file looks like this:
```json
{
  "address": "A3258DCBF45DCA0DF052981870F2D1441A36D145",
  "pub_key": {
    "type": "tendermint/PubKeyEd25519",
    "value": "AT/+aaL1eB0477Mud9JMm8Sh8BIvOYlPGC9KkIUmFaE="
  },
  "priv_key": {
    "type": "tendermint/PrivKeyEd25519",
    "value": "EVkqJO/jIXp3rkASXfh9YnyToYXRXhBr6g9cQVxPFnQBP/5povV4HTjvsy530kybxKHwEi85iU8YL0qQhSYVoQ=="
  }
}
```

Then start your node.

```shell
bnbchaind start &
```

:::note
Alternatively, if you choose a different $BNCHOME location and you are not using the suggested default `~/.bnbchaind`, you may start the full node by using below script, where $BNCHOME is your selected directory.

Example: If you set `/usr/local/beacon-chain` as your home directory. Run the Full Node with:

```shell
bnbchaind start --home /usr/local/beacon-chain &
```
:::

## Post Running

### 1. Monitor Node Status

You can check the overall status by accessing the following url.

```
curl localhost:26657/status
```

### 2. Change Keys

Your can stop your node, and replace `priv_validator_key.json` with a new one.

### 3. Stop Validating

After unbonding, your node will stop validating new blocks.

