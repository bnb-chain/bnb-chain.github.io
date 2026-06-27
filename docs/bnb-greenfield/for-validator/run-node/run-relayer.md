---
title: Run Relayer - BNB Greenfield Node
order: 5
---

# Run Relayer

This tutorial is for running relayers for Greenfield to BSC and opBNB. Please note that they are using the same binary,
but two individual processes which require different databases connected. Most configs for these two relayers are
the same, with a few differences which will be illustrated below.

## Prerequisites

### Recommended Hardware

The following lists the recommended hardware requirements:
- Hardware Requirements: Desktop or laptop hardware running recent versions of Mac OS X, or Linux.
- CPU: 4 cores
- RAM: 4 GB
- Relational database: Mysql

### Key Preparation
- Relayer private key: This is the account which is used to relay transaction between Greenfield and the BSC/opBNB. Ensures it has balance on both Blockchain networks.
- Bls private key: Used to create bls signature for cross-chain package.

These two keys refer to `validator_relayer` and `validator_bls` created in [become-validator](become-validator.md) step 2.

You can retrieve them with the following commands.
```bash
gnfd keys export validator_relayer --unarmored-hex --unsafe --keyring-backend test

gnfd keys export validator_bls --unarmored-hex --unsafe --keyring-backend test
```

## Prepare binary

Get the greenfield-relayer app by running the following command in your terminal:

```bash
git clone --branch "$(curl -s https://api.github.com/repos/bnb-chain/greenfield-relayer/releases/latest  | jq -r '.tag_name')" https://github.com/bnb-chain/greenfield-relayer.git
cd greenfield-relayer
```

## Config

Modify `config/config.json`. Or, you can create a new one and specify the config path by `--config-path` flag when start the relayer.

!!! info
    For Testnet config, refer to [Testnet configure](https://github.com/bnb-chain/bnb-chain-charts/blob/master/gnfd-relayer-testnet-values/values.yaml#L4). You can use it as a template for your Mainnet config by adapting a few changes as illustrated below.


1. Set relayer private key and bls private key import method (via file or aws secret) and keys, the block monitoring start heights.
   ```json
   "greenfield_config": {
     "key_type": "local_private_key", // or "aws_private_key" if you are using aws secret manager.
      ...
     "aws_bls_secret_name": "",
     "private_key": "your_private_key", // this is the relayer private key for relaying transaction.
     "bls_private_key": "your_private_key", // this is the bls key for signing crosschain package.
     "rpc_addrs": [
       "https://greenfield-chain.bnbchain.org:443"
      ]
     "chain_id": 1017,
      ...
     "start_height": 1,  // please change to the current block height of Greenfield network.
     "chain_id_string": "greenfield_1017-1"
   }, 
   "bsc_config": {
     "key_type": "local_private_key",  // or "aws_private_key" if you are using aws secret manager.
     ...
     "rpc_addrs": [
        "BSC_RPC"
     ],
     "private_key": "your_private_key", // same as the above one in greenfield_congfig.
     "gas_limit": 20000000,
     ...
     "start_height": 0,   // please change to the current block height of BSC network.
     "chain_id": 56  // 56 is BSC Mainnet chain id.
   }
   ```
   For setting up the relayer that crosschain to `opBNB`, modify the `bsc_config` as below.
   ```json
   "bsc_config": {
        "op_bnb": true, // this specifies that conifg is for opBNB crosschain.
        "key_type": "local_private_key",  // or "aws_private_key" if you are using aws secret manager.
        ...
        "rpc_addrs": [
           "opBNB_RPC"
        ],
        "private_key": "your_private_key", // same as the above one in greenfield_congfig.
        "gas_limit": 20000000,
        ...
        "start_height": 0,   // please change to the current block height of opBNB network.
        "chain_id": 204 // opBNB mainnet chain id
      }
   ```
   Note:
   Refer to [Greenfield Endpoints](../../for-developers/network-endpoint/endpoints.md) for Greenfield RPC address,
   [BSC Endpoints](https://docs.bscscan.com/misc-tools-and-utilities/public-rpc-nodes) for BSC RPC address, and use the appropriate ones based on your location,
   [opBNB Endpoints](../../../bnb-opbnb/get-started/network-info.md) for opBNB RPC address, and use the appropriate ones based on your location.
   You might encounter `Rate limit` issue for using official BSC/opBNB endpoints, we would highly recommend using 3rd Party RPCs, like the [NodeReal MegaNode](https://nodereal.io/meganode)

2. Config crossChain, greenfield light client and relayer hub smart contracts addresses, others can keep the default value, refer to this
   [contract-list](../../for-developers/cross-chain-integration/contract-list.md) to get addresses for Mainnet/Testnet.

    === "BSC-Mainnet"
    
        ``` json
        "relay_config": {
            ... 
            "cross_chain_contract_addr": "0x77e719b714be09F70D484AB81F70D02B0E182f7d",
            "greenfield_light_client_contract_addr": "0x433bB48Bd86c089375e53b2E2873A9C4bC0e986B",
            "relayer_hub_contract_addr": "0x31C477F05CE58bB81A9FB4b8c00560f1cBe185d1"
        }
        ```
    
    === "BSC-Testnet"
    
        ``` json
        "relay_config": {
          ... 
          "cross_chain_contract_addr": "0xa5B2c9194131A4E0BFaCbF9E5D6722c873159cb7",
          "greenfield_light_client_contract_addr": "0xa9249cefF9cBc9BAC0D9167b79123b6C7413F50a",
          "relayer_hub_contract_addr": "0x91cA83d95c8454277d1C297F78082B589e6E4Ea3"
        }
        ```
    
    === "opBNB-Mainnet"
    
        ``` json
        "relay_config": {
          ... 
          "cross_chain_contract_addr": "0x7E376AEFAF05E20e3eB5Ee5c08fE1B9832b175cE",
          "greenfield_light_client_contract_addr": "0xf51ba131716776685A805E8E4Ecc95be2f923B93",
          "relayer_hub_contract_addr": "0xEd873b460C53D22f0FF3fc511854d9b8b16C4aE2"
        }
        ```
    
    === "opBNB-Testnet"
    
        ``` json
        "relay_config": {
          ... 
          "cross_chain_contract_addr": "0xF0Bcf6E4F72bCB33b944275dd5c9d4540a259eB9",
          "greenfield_light_client_contract_addr": "0xc50791892F6528E42A58DD07869726079C71F3f2",
          "relayer_hub_contract_addr": "0x59ACcF658CC4589C3C41720fd48e869B97A748a1"
        }
        ```

3. Config the database settings.
    
    ```json
        "db_config": {
        "dialect": "mysql",
        "key_type": "local_private_key",
        "aws_region": "",
        "aws_secret_name": "",
        "password": "${pass}",
        "username": "${user}",
        "url": "tcp(${host})/greenfield-relayer?charset=utf8&parseTime=True&loc=Local",
        "max_idle_conns": 10,
        "max_open_conns": 100
        }
    ```
    Note: Please  replace `${pass}`, `${user}`, `${host}` with your Mysql instance credential and host. And use a distinct database other than `greenfield-relayer`, e.g. `greenfield-op-relayer` when running the
    Greenfield Relayer for crosschain to opBNB on the same DB instance.

## Build

Build the binary:


```shell
make build
```

Or Build docker image:

```shell
make build_docker
```

## Run

### Create DB Schema
Make sure the database instance is running.

Create schema by MySQL client:

```shell
CREATE SCHEMA IF NOT EXISTS `greenfield-relayer` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
```

### Start Relayer

```shell
./build/greenfield-relayer --config-type [local or aws] --config-path config_file_path  --aws-region [aws region or omit] --aws-secret-key [aws secret key for config or omit]
```

Example:
```shell
./build/greenfield-relayer --config-type local --config-path config/config.json
```

Run docker:
```shell
docker run -it -v /your/data/path:/greenfield-relayer -e CONFIG_TYPE="local" -e CONFIG_FILE_PATH=/your/config/file/path/in/container -d greenfield-relayer
```

Or you can deploy the greenfield relayer application using Helm Chart V3. Please refer to [relayer-readme](https://github.com/bnb-chain/greenfield/blob/master/deployment/helm/relayer-readme.md).
