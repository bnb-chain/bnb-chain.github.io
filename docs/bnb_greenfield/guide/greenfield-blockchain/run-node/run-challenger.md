---
title: Run Challenger
order: 6
---

## Prerequisites

### Recommended Hardware

The following lists the recommended hardware requirements:
- Hardware Requirements: Desktop or laptop hardware running recent versions of Mac OS X, or Linux.
- CPU: 4 cores
- RAM: 4 GB
- Relational database: Mysql

### Key Preparation
- Challenger private key: Used to sign and approve transactions.
- Bls private key: Used to aggregate votes.

These two keys refer to `validator_challenger` and `validator_bls` created in [become-validator](../run-node/become-validator.md) step 2.

You can retrieve them with the following commands.
```bash
gnfd keys export validator_challenger --unarmored-hex --unsafe --keyring-backend test

gnfd keys export validator_bls --unarmored-hex --unsafe --keyring-backend test
```

## Prepare Binary

Get the greenfield-challenger app by running the following command in your terminal:

```bash
git clone --branch "$(curl -s https://api.github.com/repos/bnb-chain/greenfield-challenger/releases/latest  | jq -r '.tag_name')" https://github.com/bnb-chain/greenfield-challenger.git
cd greenfield-challenger
```

## Config

Modify `config/config.json`. Or, you can create a new one and specify the config path by `--config-path` flag when start the challenger.

!!! info
    Reference for a complete [config file](https://github.com/bnb-chain/bnb-chain-charts/blob/master/gnfd-challenger-testnet-values/values.yaml#L4)

1. Set your private key and bls key (via file or aws secret).

    ```
     "greenfield_config": {
       "key_type": "local_private_key" or "aws_private_key" depending on whether you are storing the keys on aws or locally in this json file
       "aws_region": set this if you chose "aws_private_key"
       "aws_secret_name": set this if you chose "aws_private_key"
       "aws_bls_secret_name": set this if you chose "aws_private_key"
       "private_key": set this if you chose "local_private_key"
       "bls_private_key": set this if you chose "local_private_key" 
        ...
     }
    ```

    !!! note
        The term `private_key` refers to the private key of the `validator_challenger` account, while `bls_private_key` refers
        to the private key of the `validator_bls` account. To obtain these private keys, you can follow the instructions
        provided in the [key preparation](#key-preparation) section.

2. Set your RPC Address and Chain ID 

    === "Mainnet"

        ```bash
        "greenfield_config": {
            rpcAddr = "https://greenfield-chain.bnbchain.org:443"
            chainId = "greenfield_1017-1"
        }
        ```

    === "Testnet"

        ```bash
        "greenfield_config": {
            rpcAddr = "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org:443"
            chainId = "greenfield_5600-1"
        }
        ```

3. Config your database settings.

    ```
    "db_config": {
        "dialect": "mysql",
        "db_path": "your_db_path"
        "key_type": "local_private_key" or "aws_private_key" depending on whether you are storing the keys on aws or locally in this json file
        "aws_region": set this if you chose "aws_private_key", else leave as ""
        "aws_secret_name": set this if you chose "aws_private_key", else leave as ""
        "username": set db username if you chose "local_private_key", else leave as ""
        "password": set db password if you chose "local_private_key", else leave as ""
        ...
    }
    ```

4. Config your internal sp config (for metrics purpose).

    ```
    "sp_config": {
        "internal_sp_endpoints": [] // list of internal sps' endpoints
    }
    ```

## Build

Build binary:

```shell
make build
```

Build docker image:

```shell
make build_docker
```

## Run

### Run MySQL in Docker(this can be skipped if you are using sqlite)

```shell
docker run --name gnfd-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql:5.7
```

### Create DB Schema

Create schema in MySQL client:

```sql
CREATE SCHEMA IF NOT EXISTS `challenger` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
```

### Start Challenger

```shell
./build/greenfield-challenger --config-type [local or aws] --config-path config_file_path  --aws-region [aws region or omit] --aws-secret-key [aws secret key for config or omit]
```

Example:
```shell
./build/greenfield-challenger --config-type local --config-path config/config.json
```

Run docker:
```shell
docker run -it -v /your/data/path:/greenfield-challenger -e CONFIG_TYPE="local" -e CONFIG_FILE_PATH=/your/config/file/path/in/container -d greenfield-challenger
```

Or you can deploy the greenfield challenger application using Helm Chart V3. Please refer to [challenger-readme](https://github.com/bnb-chain/greenfield/blob/master/deployment/helm/challenger-readme.md).