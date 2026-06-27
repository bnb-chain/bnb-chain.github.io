---
title: Deploy Piece Store - BNB Greenfield SP
---

Greenfield SP is a storage infrastructure for Greenfield decentralized storgage platform. Greenfield SP uses `PieceStore` to store users' payload data.

## PieceStore Config

When creating a PieceStore, there are the following options to configure underlying storage:

```toml
[PieceStore]
# required
Shards = 0

[PieceStore.Store]
# required
Storage = ''
# optional
BucketURL = ''
# optional
MaxRetries = 0
# optional
MinRetryDelay = 0
# optional
TLSInsecureSkipVerify = false
# required
IAMType = ''
```

- `Storage`: Specify the underlying storage to be used by PieceStore, e.g. `Storage = 's3'`.
- `BucketURL`: Specify the underlying storage access address, e.g. `BucketURL = 'https://mybucket.s3.us-ease-1.amazonaws.com'`. Safer way sets bucket url via environment variable, e.g. `export BUCKET_URL=https://mybucket.s3.us-ease-1.amazonaws.com`.
- `MaxRetries`: Specify the max retry count when there are something worong doing an operation on the underlying storage, e.g. `MaxRetries = 3`.
- `MinRetryDelay`: Specify the min retry delay when there are something worong doing an operation on the underlying storage, e.g. `MinRetryDelay = 10`.
- `TLSInsecureSkipVerify`: Specify whether you disable `HTTPS` when sending `HTTP` requests, e.g. `TLSInsecureSkipVerify = false`.
- `IAMType`: Specify which authentication you will use to access the uderlying storage, e.g. `IAMType = 'AKSK'`.

## Shards

When creating a PieceStore, multiple buckets can be defined as the underlying storgae through the `Shards` option. Based on the sharding, SP can distribute the files to multiple buckets according to the hashed value of the file name. Data sharding technology can distribute the load of concurrent writing of large-scale data to multiple buckets, thereby improving the writing performance.

The following are points to note when using the data sharding function:

- The `Shards` option accepts an integer between 0 and 256, indicating how many Buckets the files will be scattered into. The default value is 0, indicating that the data sharding function is not enabled.
- Only multiple buckets under the same object storage can be used.
- The integer wildcard `%d` needs to be used to specify the buckets, for example, `http://10.180.42.161:9000%d`. Buckets can be created automatically by SP when creating PieceStore.
- The data sharding is set at the time of creation and cannot be modified after creation. You cannot increase or decrease the number of buckets, nor cancel the shards function.

For example, the following config creates PieceStore with 5 shards.

```toml
[PieceStore]
Shards = 5

[PieceStore.Store]
Storage = 'minio'
BucketURL = 'http://10.180.42.161:9000/mybucket%d'
IAMType = 'AKSK'
```

After SP initialized through the above command, PieceStore will create 5 buckets named `mybucket0`, `mybucket1`, `mybucket2`, `mybucket3` and `mybucket4`.

## IAMType

PieceStore supports two authentication modes: `AKSK` and `SA`.

### AKSK

In `AKSK` mode, PieceStore will access object storage by using `AccessKeyID` and `AccessKeySecret`. If users use s3 as object storage, you can set `AWSAccessKey` and `AWS_SECRET_KEY` into environment variables which are more secure.

Permanent access credentials generally have two parts, Access Key, Secret Key, while temporary access credentials generally include three parts, Access Key, Secret Key and token, and temporary access credentials have an expiration time, usually between a few minutes and a few hours.

### SA

Service Account (abbreviated as SA) is a more secure way for object storage system to authenticate users. In this mode, you needn't to provide `AccessKeyID` and `AccessKeySecret`. If you deploy your SP in Kubernetes, we recommend you using SA to access object storage. AWS S3 can read this [documentation](https://docs.aws.amazon.com/eks/latest/userguide/service-accounts.html) to learn how to use SA. Alibaba Cloud OSS uses `OIDC` to visit OSS safely which users don't need to provide `AccessKeyID` and `AccessKeySecret`.

#### How to get temporary credentials

Different cloud vendors have different acquisition methods. Generally, the Access Key, Secret Key and ARN representing the permission boundary of the temporary access credential are required as parameters to request access to the STS server of the cloud service vendor to obtain the temporary access credential. This process can generally be simplified by the SDK provided by the cloud vendor. For example, Amazon S3 can refer to this [link](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_request.html) to obtain temporary credentials, and Alibaba Cloud OSS can refer to this [link](https://www.alibabacloud.com/help/en/object-storage-service/latest/use-a-temporary-credential-provided-by-sts-to-access-oss).

Temporary credentials are also set into environment variables such as s3 by `AWS_SESSION_TOKEN`, minio by `MINIO_SESSION_TOKEN` and so on. Due to there is an expiration time in temporary credentials, this is used in test mode.

## Supported Storage Type

PieceStore now supports the following storage system. If the listed storage systems don't conatin that you want to use, feel free to submit a requirement [issue](https://github.com/bnb-chain/greenfield-storage-provider/issues).

| Name                                    | value    |
| --------------------------------------- | -------- |
| [Amazon S3](#amazon-s3)                 | `s3`     |
| [Alibaba Cloud OSS](#alibaba-cloud-oss) | `oss`    |
| [Backblaze B2](#backblaze-b2)           | `b2`     |
| [MinIO](#minio)                         | `minio`  |
| [File](#file)                           | `file`   |
| [Memory](#memory)                       | `memory` |

### Amazon S3

S3 supports [two styles of endpoint URI](https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html): virtual hosted-style and path-style. The differences are:

- Virtual-hosted-style: `https://<bucket>.s3.<region>.amazonaws.com`
- Path-style: `https://s3.<region>.amazonaws.com/<bucket>`

The `<region>` should be replaced with specific region code, e.g. the region code of US East (N. Virginia) is `us-east-1`. All the available region codes can be found [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions). If you use s3 as the underlying storage, you can set `Storage = s3` in config.toml.

AWS S3 `AKSK` environment variables as follows:

```shell
// AWS_ACCESS_KEY defines env variable name for aws access key
export AWS_ACCESS_KEY="your_access_key"
// AWS_SECRET_KEY defines env variable name for aws secret key
export AWS_SECRET_KEY="your_secret_key"
// AWS_SESSION_TOKEN defines env variable name for aws session token, this is optional
export AWS_SESSION_TOKEN="your_session_token"
```

AWS S3 `SA` environment variables as follows:

```shell
// AWS_ROLE_ARN defines env variable for aws role arnv
export AWS_ROLE_ARN="your_role_arn"
// AWSSecretKey defines env variable name for aws web identity token file
export AWS_WEB_IDENTITY_TOKEN_FILE="your_web_identity_token_file"
```

!!! note
    If the S3 bucket has public access (anonymous access is supported), please set `export AWS_ACCESS_KEY="NoSignRequest"`.

### Alibaba Cloud OSS

Please follow this [document](https://www.alibabacloud.com/help/en/basics-for-beginners/latest/obtain-an-accesskey-pair) to learn how to get access key and secret key. Alibaba Cloud also supports using Security Token Service (STS) to authorize temporary access to OSS. If you use OSS as the underlying storage, you can set `Storage = oss` in config.toml.

Alibaba Cloud OSS `AKSK` environment variables as follows:

```shell
// ALIBABA_CLOUD_ACCESS_KEY defines env variable name for OSS access key
export ALIBABA_CLOUD_ACCESS_KEY="your_access_key"
// ALIBABA_CLOUD_SECRET_KEY defines env variable name for OSS secret key
export ALIBABA_CLOUD_SECRET_KEY="your_secret_key"
// ALIBABA_CLOUD_SESSION_TOKEN defines env variable name for OSS session token, this is optional
export ALIBABA_CLOUD_SESSION_TOKEN="your_session_token"
// ALIBABA_CLOUD_OSS_REGION defines env variable name for OSS region
export ALIBABA_CLOUD_OSS_REGION="oss_region"
```

Alibaba Cloud OSS `SA` environment variables as follows:

```shell
// ALIBABA_CLOUD_ROLE_ARN defines env variable for OSS role arnv
export ALIBABA_CLOUD_ROLE_ARN="your_role_arn"
// ALIBABA_CLOUD_OIDC_TOKEN_FILE defines env variable name for OSS oidc token file
export ALIBABA_CLOUD_OIDC_TOKEN_FILE="your_oidc_token_file"
// ALIBABA_CLOUD_OIDC_PROVIDER_ARN defines env variable for OSS oidc provider arn
export ALIBABA_CLOUD_OIDC_PROVIDER_ARN="your_oidc_provider_arn"
```

### Backblaze B2

To use Backblaze B2 as a storage system for Greenfield SP, you need to create [application key](https://www.backblaze.com/docs/cloud-storage-application-keys) firstly. Application Key ID and Application Key respectively corresponds to Access Key and Secret Key. If you use Backblaze B2 as the underlying storage, you can set `Storage = b2` in config.toml.

Backblaze B2 `AKSK` environment variables as follows:

```shell
// B2_ACCESS_KEY defines env variable name for b2 access key
export B2_ACCESS_KEY="your_access_key"
// B2_SECRET_KEY defines env variable name for b2 secret key
export B2_SECRET_KEY="your_secret_key"
// B2_SESSION_TOKEN defines env variable name for b2 session token
export B2_SESSION_TOKEN="your_session_token"
```

### MinIO

[MinIO](https://min.io/) is a high-performance, S3 compatible object store. You can visit the official website to learn how to deploy and maintain a MinIO cluster or you can purchase minio service. If you use MinIO as the underlying storage, you can set `Storage = minio` in config.toml.

MinIO `AKSK` environment variables as follows:

```shell
// MINIO_REGION defines env variable name for minio region
export MINIO_REGION="minio_region"
// MINIO_ACCESS_KEY defines env variable name for minio access key
export MINIO_ACCESS_KEY="your_access_key"
// MINIO_SECRET_KEY defines env variable name for minio secret key
export MINIO_SECRET_KEY="your_secret_key"
// MINIO_SESSION_TOKEN defines env variable name for minio session token, this is optional
export MINIO_SESSION_TOKEN="your_session_token"
```

### File

When running Greenfield SP in your local machine, you can use local disk to test SP basic functions. The default storage path for root user is `/var/piecestore` and `~/.piecestore/local` for ordinary users in Linux and macOS. In Windows system, the default path is `C:/piecestore/local`.

Local storage is usually only used to help users understand how Greenfield SP works and to give users an experience on the basic features of Greenfield SP. The created PieceStore storage can only be used on a single machine. This is not recommended in production environment.

### Memory

Memory type can be used to test all PieceStore interfaces in memory. It's convenient for unit test or e2e test.
