---
title: SP Common Issues
---

This is a list of solutions to common SP deployment issues

## On-chain Proposal

### 1. Why send tx failed?

* Reason 1: The gnfd binary doesn't match, you should use the [latest version](https://github.com/bnb-chain/greenfield/releases/latest)
* Reason 2: The chain ID doesn't match, you should specify the chain ID correctly. For Greenfield `mainnet` you should add `--chain-id "greenfield_1017-1"`; for Greenfield `testnet`, you should add `--chain-id "greenfield_5600-1"`.

### 2. Why is Proposal Rejected?

If your proposal received less than 2/3 of `yes` votes from validators, your propoosal will be rejected.

### 3. Why is Proposal Failed

To query the failed reason, run the following command:

```shell
#  Greenfield Mainnet
./gnfd query gov proposal <proposal-id> --node https://greenfield-chain-us.bnbchain.org:443

# Greenfield Testnet
./gnfd q gov proposal <proposal-id> --node https://gnfd-testnet-fullnode-tendermint-ap.bnbchain.org:443
```

If you see the following message:

```shell
failed_reason: 'spendable balance 999009992000000000000BNB is smaller than 1000000000000000000000BNB:
```

It means the proposal initiator should be the funding address, and it should have balance of **1k BNB** as deposit, according to above error msg.

Please note the initial deposit requirement varies on different environments. 
see [funding-address](join-SP-network.md#funding-address)

## SP Node Issues

### 1. Address Not Found Issue

#### Description

After starting SP binary, see the following error:

```shell
rpc error: code = NotFound desc = rpc error: code = NotFound desc = account 0x12334567890 not found: key not found"
```

#### Root Cause

It's not possiible to find information about a newly created address on chain.

#### Solution

Before starting your SP, transfer BNB to all of your 5 addresses.

### 2. Database Configuration Issue

#### Description

After starting SP binary, see the following error:

```shell
Table "block_syncer.master_db" does not exist
Failed to get db config from config file
```

#### Root Cause

Data source name(dsn) is not set in `config.toml`.

#### Solution

```shell
[BlockSyncer]
Modules = ['epoch','bucket','object','payment','group','permission','storage_provider','prefix_tree', 'virtual_group','sp_exit_events','object_id_map','general']
Dsn = [BsDB_User]:[BsDB_Passwd]@tcp([BsDB_Address])/[BsDB_Database?parseTime=true&multiStatements=true&loc=Local&interpolateParams=true
```

### 3. Object Sealed State Issue

#### Description

After uploading a file, you see an error message:

```shell
Message: object has not been sealed state
```

From SP log, you see the following:

```shell
{"t":"2023-07-10T11:34:50.856+0800","l":"error","caller":"gfspapp/sign_server.go:42","msg":"failed to seal object","error":"code_space:\"signer\" http_status_code:400 inner_code:120002 description:\"failed to broadcast seal object tx, error: failed to broadcast tx, resp code: 13\" "}
```

#### Root Cause

`SealAddress` does not have enough BNB to sign seal transactions

#### Solution

Transfer BNB to `SealAddress`.

### 4. P2P Issue

#### Description

After starging SP binary, you see an error message:

```shell
failed to parse address 'k8s-gftestne-p2pexter-bc25ac70bc-a31e9596d87054c3.elb.us-east-1.amazonaws.com:9933' domain
```

#### Root Cause

SP is trying to get connected with invalid SP URL in P2P network

#### Solution

Update [P2P] setting in `config.toml`:

```shell
[P2P]
# p2p node msg Secp256k1 encryption key, it is different from other SP's addresses
P2PPrivateKey = '${p2p_private_key}'
P2PAddress = '0.0.0.0:9933'
P2PAntAddress = '${load_balance_doamin:port}'
P2PBootstrap = []
P2PPingPeriod = 0
```

`P2PAntAddress` is your load balance address. If you don't have a load balance address, you should have a public IP and use it in `P2PAddress`.
`P2PBootstrap` is not used anymore, you can leave this field empty.

### 5.MinIO Authentication Issue

#### Description

Cannot config Minio as storage

```shell
{"t":"2023-07-17T18:05:40.245+0800","l":"debug","caller":"storage/object_storage.go:15","msg":"created minio storage at endpoint http://172.17.0.2:9000/hashquark"}
Jul 17 18:05:41 10-7-46-85 gnfd-sp[18585]: {"t":"2023-07-17T18:05:40.245+0800","l":"info","caller":"storage/minio.go:37","msg":"new minio store succeeds","bucket":"hashquark"}
Jul 17 18:07:01 10-7-46-85 gnfd-sp[18585]: {"t":"2023-07-17T18:07:00.893+0800","l":"error","caller":"storage/s3.go:147","msg":"S3 failed to head bucket","error":"NoCredentialProviders: no valid providers in chain. Deprecated.\n\tFor verbose messaging see aws.Config.CredentialsChainVerboseErrors"}
Jul 17 18:07:01 10-7-46-85 gnfd-sp[18585]: {"t":"2023-07-17T18:07:00.893+0800","l":"error","caller":"piece/piece_store.go:88","msg":"failed to head bucket","error":"NoCredentialProviders: no valid providers in chain. Deprecated.\n\tFor verbose messaging see aws.Config.CredentialsChainVerboseErrors"}
Jul 17 18:07:01 10-7-46-85 gnfd-sp[18585]: {"t":"2023-07-17T18:07:00.893+0800","l":"error","caller":"piece/piece_store.go:77","msg":"failed to check bucket due to storage is not configured rightly ","error":"deny access bucket","object":"minio://hashquark/"}
Jul 17 18:07:01 10-7-46-85 gnfd-sp[18585]: {"t":"2023-07-17T18:07:00.893+0800","l":"error","caller":"piece/piece_store.go:21","msg":"failed to create storage","error":"deny access bucket"}
```

#### Root Cause

This is a MinIO authentication

#### Solution

You can refer [here](./piece-store.md#minio).

### 6. SP Standard Test Issue

#### Description

```html
2023/07/26 19:06:03.543395 [INFO] GID 41, Uploading file - object: 2q4l5v4v3z, bucket: sc1bw
default error msg : <html>
<head><title>413 Request Entity Too Large</title></head>
<body>
<center><h1>413 Request Entity Too Large</h1></center>
<hr><center>nginx/1.18.0 (Ubuntu)</center>
</body>
</html>
{"level":"error","time":"2023-07-26T13:06:03-06:00","message":"do API error, url: https://sc1bw.gnfd-testnet-sp.epotter-qa.io/2q4l5v4v3z, err: statusCode 413 : code : unknown error  request-id  (Message: <html>\r\n<head><title>413 Request Entity Too Large</title></head>\r\n<body>\r\n<center><h1>413 Request Entity Too Large</h1></center>\r\n<hr><center>nginx/1.18.0 (Ubuntu)</center>\r\n</body>\r\n</html>)"}
2023/07/26 19:06:03.543395 [INFO] GID 41, Uploading file - object: 2q4l5v4v3z, bucket: sc1bw
default error msg : <html>
<head><title>413 Request Entity Too Large</title></head>
<body>
<center><h1>413 Request Entity Too Large</h1></center>
<hr><center>nginx/1.18.0 (Ubuntu)</center>
</body>
</html>
{"level":"error","time":"2023-07-26T13:06:03-06:00","message":"do API error, url: https://sc1bw.gnfd-testnet-sp.epotter-qa.io/2q4l5v4v3z, err: statusCode 413 : code : unknown error  request-id  (Message: <html>\r\n<head><title>413 Request Entity Too Large</title></head>\r\n<body>\r\n<center><h1>413 Request Entity Too Large</h1></center>\r\n<hr><center>nginx/1.18.0 (Ubuntu)</center>\r\n</body>\r\n</html>)"}
```

#### Root Cause

Nginx does not support large file

#### Solution

Enlarge `proxy-boody-size`

## DCellar Integration Issues

### 1. No 'Access-Control-Allow-Origin' header is present on the requested resource

Error:

```shell
Access to XMLHttpRequest at 'https://fbgtest.gnfd-testnet-sp.fbgx.ai/?read-quota&year-month=2023-07' from origin 'https://dcellar.io' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

#### Solution

Add these headers

```http
Access-Control-Allow-Credentials:
true
Access-Control-Allow-Headers:
Access-Control-Allow-Headers: DNT,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-MD5,Range,Authorization,X-Gnfd-Content-Sha256,X-Gnfd-Unsigned-Msg,X-Gnfd-Txn-Hash,Date,X-Gnfd-Object-ID,X-Gnfd-Resource,X-Gnfd-Piece-Index,X-Gnfd-Redundancy-Index,Address,X-Gnfd-User-Address,X-Gnfd-App-Domain,X-Gnfd-App-Reg-Nonce,X-Gnfd-Date,X-Gnfd-App-Reg-Public-Key,X-Gnfd-App-Reg-Expiry-Date,X-Gnfd-Expiry-Timestamp
Access-Control-Allow-Methods:
GET, PUT, POST, DELETE, PATCH, OPTIONS
Access-Control-Allow-Origin:
*
Access-Control-Expose-Headers:
*, X-Gnfd-Request-ID,X-Gnfd-Signed-Msg,X-Gnfd-Object-ID,X-Gnfd-Integrity-Hash,X-Gnfd-Piece-Hash
Access-Control-Max-Age:
1728000
```

### 2. when an OPTION request is made, I get OPTIONS 405 (Method Not Allowed) error

#### Root cause

The 405 Method Not Allowed error occurs when the web server is configured in a way that does not allow you to perform a specific action for a particular URL. It’s an HTTP response status code that indicates that the request method is known by the server but is not supported by the target resource.The 405 Method Not Allowed error occurs when the web server is configured in a way that does not allow you to perform a specific action for a particular URL. It’s an HTTP response status code that indicates that the request method is known by the server but is not supported by the target resource.

#### Solution

Your application is likely running on a server using one of these three popular webserver software: Apache, nginx, or Cloudflare. Check your configuration files for your web server software for unintentional redirect or request handling instructions.
