---
title: Run Local Network
order: 2
---

# Run Local Network
This guide helps you create a local Greenfield Blockchain network for testing and other development-related purposes.

## Prerequisites

A computer running a Unix-like operating system (e.g., macOS, Linux)
Basic familiarity with the command line
Step 1: Install dependencies

The first step is to install the necessary dependencies, which include `Golang`, `Git`. Here are the steps to install them:

- Install `Golang` by following the instructions for your operating system on the [official Golang website](https://golang.org/dl/).
- Install `Git` by following the instructions for your operating system on the [official Git website](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

Build the Greenfield CLI tools by running the following command in your terminal:

```bash
git clone --branch "$(curl -s https://api.github.com/repos/bnb-chain/greenfield/releases/latest  | jq -r '.tag_name')" https://github.com/bnb-chain/greenfield.git
cd greenfield
make build
```

## Quickly Setup a Local Cluster Network
1. Start
```bash
SIZE=3 # The number of nodes in the cluster.
bash ./deployment/localup/localup.sh all ${SIZE}
```

2. Stop
```bash
bash ./deployment/localup/localup.sh stop
```

3. Send Tx
```bash
./build/bin/gnfd tx bank send validator0 0x32Ff14Fa1547314b95991976DB432F9Aa648A423 500000000000000000000BNB --home ./deployment/localup/.local/validator0 --keyring-backend test --node http://localhost:26750 -b block
```

4. Restart the chain without state initialization
```bash
bash ./deployment/localup/localup.sh stop
bash ./deployment/localup/localup.sh start ${SIZE}
```

## Quickly Setup Fullnode
1. Start
```bash
SIZE=3 # The number of nodes in the cluster.
bash ./deployment/localup/localup_fullnode.sh all ${SIZE}
```

2. Stop
```bash
bash ./deployment/localup/localup_fullnode.sh stop
```


## Reference
The Greenfield chain is built using the `cosmos-sdk` and `Tendermint` core. There are various official configuration documents that can be referred to. These include:

1. [Greenfield deployment](https://github.com/bnb-chain/greenfield/tree/master/deployment)
2. [Tendermint Docs](https://docs.tendermint.com/master/nodes/configuration.html)