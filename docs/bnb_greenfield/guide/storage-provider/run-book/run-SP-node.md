---
title: Run SP Node
---

This guide helps you set up an SP Node. Once you set up the SP Node successfully, you can follow the [Join SP Network guide](./join-SP-network.md) to make it online.

- [Prerequisites](#prerequisites)
    - [Recommended Hardware](#recommended-hardware)
    - [Wallet Preparation](#wallet-preparation)
    - [Database Configuration](#database-configuration)
    - [PieceStore Configuration](#piecestore-configuration)
    - [Gateway Configuration](#gateway-configuration)
        - [1. Support both path-style and virtual-style routers in https certificates](#1-support-both-path-style-and-virtual-style-routers-in-https-certificates)
        - [2. CORS Configuration](#2-cors-configuration)
        - [3. Sample CORS Configuration for Nginx](#3-sample-cors-configuration-for-nginx)
        - [4. Other Q&A on Nginx config](#4-other-qa-on-nginx-config)
- [Create Storage Provider](#create-storage-provider)
    - [1. Compile SP](#1-compile-sp)
    - [2. SP Config](#2-sp-config)
        - [Generate config template](#generate-config-template)
        - [Write config](#write-config)
    - [3. Run SP](#3-run-sp)

## Prerequisites

### Recommended Hardware

The following lists the recommended hardware requirements:

- VPS running recent versions of Mac OS X, Linux, or Windows；
- 16 cores of CPU, 64 GB of memory(RAM);
- 1 Gbps network connection with upload/download speeds of 10MB/s+；
- At least 1 TB disk space for backend storage;
- 50GB+ SQL database;
- Piece Store: AWS S3, MinIO(Beta);
- 6 Greenfield accounts with enough BNB tokens.

!!! danger "IMPORTANT"
    Each storage provider will hold 7 different accounts serving different purposes

### Wallet Preparation

- `Operator Account`: Used to edit the information of the StorageProvider. Please make sure it has enough BNB to pay the gas fee of `EditStorageProvider` and `UpdateStorageProviderStatus` transactions.
- `Funding Account`: Used to deposit staking tokens and receive earnings. It is important to ensure that there is enough money in this account, and the SP must submit a deposit as a guarantee. At least `500+` BNB are required for staking. You should use this address to send `CreateStorageProvider` proposal on-chain. Besides the `500BNB` for staking, the funding address should have enough tokens for creating VGF to store more data, so we suggest depositing at least `510BNB` into this account.
- `Seal Account`: Used to seal the user's object. Please make sure it has enough BNB to pay the gas fee of `SealObject` transaction. We suggest depositing `10BNB` into this account.
- `Approval Account`: Used to approve user's requests. This account does not require holding BNB tokens.
- `GC Account`: It is a special address for sp and is used by sp to clean up local expired or unwanted storage. Please make sure it has enough BNB tokens because it's going to keep sending transactions up the chain.
- `Maintenance Account`: It is used for SP self-testing while in maintenance mode. This account for creating bucket and object will be allowed-listed by Chain while other users' create request will fail.
- `Bls Account`: Used to create bls signature when sealing objects to ensure integrity, it does not need to be deposited.

There are six accounts below, you can use the below command to generate these accounts:

```shell
./build/bin/gnfd keys add operator --keyring-backend os
./build/bin/gnfd keys add seal --keyring-backend os
./build/bin/gnfd keys add approval --keyring-backend os
./build/bin/gnfd keys add gc --keyring-backend os
./build/bin/gnfd keys add maintenance --keyring-backend os
./build/bin/gnfd keys add bls --keyring-backend os --algo eth_bls
```

and then export these private keys to prepare for SP deployment:

```shell
./build/bin/gnfd keys export operator --unarmored-hex --unsafe  --keyring-backend os
./build/bin/gnfd keys export seal --unarmored-hex --unsafe --keyring-backend os
./build/bin/gnfd keys export approval --unarmored-hex --unsafe --keyring-backend os
./build/bin/gnfd keys export gc --unarmored-hex --unsafe --keyring-backend os
./build/bin/gnfd keys export bls --unarmored-hex --unsafe --keyring-backend os
```

!!! danger "IMPORTANT"
    `FundingAddress` is used to deposit staking tokens and receive earnings. Therefore, users should prepare your own `FundingAddress` public key and private key. And keep private key of `FundingAddress` in cold wallet for safety!
    
    The private keys of `OperatorAddress`, `SealAddress`, `ApprovalAddress`, `GCAddress` and `BlsAddress` can be kept in hot wallet, because they are often used to send transactions.
    
    If you want to generate public key and private key of `FundingAddress` in `gnfd` binary file, you can execute the following commands:
    
    ```shell
    ./build/bin/gnfd keys add funding --keyring-backend os
    ./build/bin/gnfd keys export funding --unarmored-hex --unsafe  --keyring-backend os
    ```

maintenance account is not needed for SP deployment, but you should export it to conduct self-test:

```shell
./build/bin/gnfd keys export maintenance --unarmored-hex --unsafe --keyring-backend os
```

Please keep these seven private keys safe!

Moreover, obtain bls public key and generate bls proof to fill in the proposal of creating Storage Provider

`bls_pub_key`:

```shell
./build/bin/gnfd keys show bls --keyring-backend os --output json | jq -r '.pubkey_hex' 
```

`bls_proof`:

```shell
# Replace the ${bls_pub_key} with the above bls_pub_key to ensure sign the correct bls pub key!!!
./build/bin/gnfd keys sign "${bls_pub_key}" --from bls --keyring-backend os
```

### Database Configuration

You should create two databases: `${SpDB.Database}` and `${BsDB.Database}`. Both values can be found in [configuration file](./config.md).

!!! danger "IMPORTANT"
    `${BsDB.Database}` requires the **utf8mb4_unicode_ci** as the character set and collation.

The following example assumes `${SpDB.Database}` as `storage_provider_db` and `${BsDB.Database}` as `block_syncer`.

```shell
# login in mysql and create database
# the default encoding for the database should be utf8mb4_unicode_ci
mysql> CREATE DATABASE storage_provider_db;
mysql> CREATE DATABASE block_syncer CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
# check the database encoding format
mysql> show create database block_syncer;
```

This is the encoding we expect to see

| Database     | Create Database                                                                                       |
| ------------ | ----------------------------------------------------------------------------------------------------- |
| block_syncer | CREATE DATABASE `block_syncer` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_0900_ai_ci` */ |

### PieceStore Configuration

Please follow this [doc](./piece-store.md) to config your PieceStore.

### Gateway Configuration

#### 1. Support both path-style and virtual-style routers in https certificates

You need certificates for SP's exposed gateway service domain name and wildcard subdomain name of it, say you exposed your SP's gateway service on `https://my-sp1.mainnet.dummy-sp.io`, then you need SSL certificates for both `my-sp1.mainnet.dummy-sp.io` and `*.my-sp1.mainnet.dummy-sp.io`.
For instance, if you reqeust AWS ACM certificate, you could request with this:
![SP AWS ACM CERT](../../../static/asset/407-SP-AWS-ACM-Cert.png)

Also, route all traffic from both `my-sp1.mainnet.dummy-sp.io` and `*.my-sp1.mainnet.dummy-sp.io` to gateway service, for instance, if you use nginx for ingress control, then you'll need to configure rules look like the following:

```yaml
rules:
  - host: my-sp1.mainnet.dummy-sp.io
    http:
      paths:
        - backend:
            service:
              name: gateway # where your SP gateway service is internally, such a k8s service.
              port:
                number: 9033
          path: /
          pathType: ImplementationSpecific
  - host: '*.my-sp1.mainnet.dummy-sp.io'
    http:
      paths:
        - backend:
            service:
              name: gateway # the same with the above one.
              port:
                number: 9033
          path: /
          pathType: ImplementationSpecific
```

#### 2. CORS Configuration

When working with web applications (e.g. DCellar),  SPs need to allow CORS (Cross-Origin Resource Sharing) requests.
See: [CORS Errors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors)

If CORS is not configured properly, you may find the DCellar (or any other web applications which mean to interact with your SP) will report CORS errors, similar to below:

![CORS ERROR](../../../static/asset/405-cors-error.png)

Most people run their SP services behind the nginx or other similar reverse proxies. Usually the CORS settings should be configured in those reverse proxies.

We recommend SP with reverse proxy can return the following headers:

```shell
access-control-allow-headers: *
access-control-allow-methods: *
access-control-allow-origin: *
access-control-expose-headers: *
```

After you finish the configuration, you can verify if it works in DCellar.

1. Go to [https://dcellar.io](https://dcellar.io)
2. Press F12 to launch web developer tools and go to "Network" tab.
3. Connect your wallet
4. Find the "OPTIONS" request to your SP and check its status and response headers. If you see a similar result to the following screenshot, it means your CORS configuration is correct.
   ![CORRECT_CORS](../../../static/asset/406-correct-cors.png)

#### 3. Sample CORS Configuration for Nginx
Many storage providers (SPs) prefer to use nginx as their SP's reverse proxy server. It can also help handle CORS requests.

Below is a sample nginx config, which can return those expected http response headers about CORS, mentioned in [above section](#2-cors-configuration).
Please note that the nginx servers should explicitly return 204 as response code for http **OPTIONS** requests.

```config

server {
    listen 443;
    server_name example.com;

    # Cors Preflight methods needs additional options and different Return Code
    location / {
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' '*';
            add_header 'Access-Control-Allow-Headers' '*';
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Access-Control-Expose-Headers' '*';
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
        }

        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' '*';
        add_header 'Access-Control-Allow-Headers' '*';
        add_header 'Access-Control-Expose-Headers' '*';
        
        # Rest of your server configuration...
    }
}

```

#### 4. Other Q&A on Nginx config
We observed that some SPs use nginx as their reverse-proxy layer. In this section , we will list some known best practises on nginx config.

- proxy_pass and proxy_set_header

  If your nginx uses proxy_pass directive to pass a request to a proxied server (e.g. the SP gateway microservice), you need also use proxy_set_header to set the HOST header.
  Otherwise, the head of request passed to the SP gateway, will be parsed as 127.0.0.1. In this case, the SP gateway could not verify the signature of the user requests.

  ```config
  location / {
    proxy_pass http://127.0.0.1:9033
    proxy_set_header Host $host;
  }
  
  ```

## Create Storage Provider

### 1. Compile SP

Follow the [Compile SP](./compile-dependences.md#compile-sp) doc to compile the SP binary or you can download the binary from the [Greenfield Storage Provider Release](https://github.com/bnb-chain/greenfield-storage-provider/releases).

### 2. SP Config

#### Generate config template

```shell
cd greenfield-storage-provider/build

# dump default configuration
./gnfd-sp config.dump
```

#### Write config

You can learn about how to write your `config.toml` file [here](./config.md)

It's recommended to deploy Kubernetes cluster following this [guide](https://github.com/bnb-chain/greenfield-sp-deployment/blob/main/docs/README.md). The corresonding config file is [here](https://github.com/bnb-chain/greenfield-sp-deployment/blob/main/docs/k8s/aws/config.toml).

### 3. Run SP

```shell
# start sp
./gnfd-sp --config ${config_file_path}
```
