---
title: List Payment Account Streams
---

# ListPaymentAccountStreams

## RESTful API Description

This API is used to list user bucket info by given payment account. This API only supports `path-style` requests.

## HTTP Request Format

| Description      | Definition                     |
| ---------------- | ------------------------------ |
| Host(path-style) | gnfd-testnet-sp*.bnbchain.org |
| Path(path-style) | /                              |
| Method           | GET                            |

## HTTP Request Header

## HTTP Request Parameter

### Path Parameter

The request does not have a path parameter.

### Query Parameter

| ParameterName   | Type    | Required | Description                                                                               |
| --------------- | ------- | -------- | ----------------------------------------------------------------------------------------- |
| payment-buckets | string  | yes      | payment-buckets is only used for routing location, and it does not need to pass any value |
| payment-account | string  | yes      | payment-account defines the payment account address                                       |

### Request Body

The request does not have a request body.

## Request Syntax

```HTTP
GET /?payment-buckets&payment-account=xxxx
Host: gnfd-testnet-sp*.bnbchain.org
```

## HTTP Response Header

The response returns the following HTTP headers.

| ParameterName | Type   | Description                 |
| ------------- | ------ | --------------------------- |
| Content-Type  | string | value is `application/xml`  |

## HTTP Response Parameter

| ParameterName  | Type                          | Description                                                   |
| -------------  | ----------------------------- | ------------------------------------------------------------- |
| Buckets        | [Buckets](#buckets)           | Buckets defines a list of buckets.                            |

### Buckets

| ParameterName  | Type                          | Description                                                   |
| -------------  | ----------------------------- | ------------------------------------------------------------- |
| BucketInfo     | [BucketInfo](#bucketinfo)     | BucketInfo defines the information of bucket                  |
| Removed        | bool                          | Removed defines the bucket is deleted or not.                 |
| DeleteAt       | int64                         | DeleteAt defines the block number when the bucket deleted.    |
| DeleteReason   | string                        | DeleteReason defines the deleted reason of bucket.            |
| Operator       | string                        | Operator defines the operator address of bucket.              |
| CreateTxHash   | string                        | CreateTxHash defines the creation transaction hash of bucket. |
| UpdateTxHash   | string                        | UpdateTxHash defines the update transaction hash of bucket.   |
| UpdateAt       | int64                         | UpdateAt defines the block number when the bucket update.     |
| UpdateTime     | int64                         | UpdateTime defines the timestamp when the bucket update.      |
| StorageSize    | uint64                        | StorageSize storage size of bucket.                           |


### BucketInfo

| ParameterName              | Type                              | Description                                                                                             |
| -------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Owner                      | string                            | Owner is the object owner                                                                               |
| BucketName                 | string                            | BucketName is the name of the bucket                                                                    |
| Visibility                 | [VisibilityType](#visibilitytype) | Visibility defines the highest permissions for bucket. When an bucket is public, everyone can access it |
| Id                         | Uint                              | Id is the unique identification for bucket                                                              |
| SourceType                 | [SourceType](#sourcetype)         | SourceType defines which chain the user should send the bucket management transactions to               |
| CreateAt                   | int64                             | CreateAt define the block timestamp when the bucket created                                             |
| PaymentAddress             | string                            | PaymentAddress is the address of the payment account                                                    |
| GlobalVirtualGroupFamilyId | uint32                            | GlobalVirtualGroupFamilyId defines the unique id of gvg family                                          |
| ChargedReadQuota           | uint64                            | ChargedReadQuota defines the traffic quota for read in bytes per month.                                 |
| BucketStatus               | [BucketStatus](#bucketstatus)     | BucketStatus define the status of the bucket                                                            |

### BucketStatus

| Value | Description                   |
| ----- | ----------------------------- |
| 0     | bucket status is created      |
| 1     | bucket status is discontinued |

### VisibilityType

| Value | Description                    |
| ----- | ------------------------------ |
| 0     | Visibility type is unspecified |
| 1     | Visibility type is public read |
| 2     | Visibility type is private     |
| 3     | Visibility type is inherit     |

### SourceType

| Value | Description                 |
| ----- | --------------------------- |
| 0     | SOURCE_TYPE_ORIGIN          |
| 1     | SOURCE_TYPE_BSC_CROSS_CHAIN |
| 2     | SOURCE_TYPE_MIRROR_PENDING  |


### Response Body

If the request is successful, the service sends back an HTTP 200 response.

If you failed to send request, you will get error response body in [XML](./sp_response.md#sp-error-response).

## Response Syntax

```HTTP
HTTP/1.1 200

XML Body
```

## Examples

The examples given all use path-style.

### Example 1: List user payment streams

GET /?read-quota&year-month=2023-03 HTTP/1.1
Host: myBucket.gnfd-testnet-sp1.bnbchain.org
Date: Fri, 31 March 2023 17:32:00 GMT
Authorization: authorization string

```HTTP
GET /?payment-buckets&payment-account=0xed7a8ebf8458980a62bb49f41a699d67bbab7dc3
Host: gnfd-testnet-sp1.bnbchain.org
Date: Fri, 31 March 2023 17:32:00 GMT
```

### Sample Response: list payment account streams successfully

```HTTP
HTTP/1.1 200 OK
X-Gnfd-Request-ID: 4208447844380058399
Date: Fri, 31 March 2023 17:32:10 GMT

<?xml version="1.0" encoding="UTF-8"?>
<GfSpListPaymentAccountStreamsResponse>
    <Buckets>
        <BucketInfo>
            <Owner>0xeD7A8EBF8458980A62Bb49f41a699d67bbaB7dc3</Owner>
            <BucketName>0x89a1cc91b642decbc4789474694c606e0e0c420b-202311</BucketName>
            <Visibility>2</Visibility>
            <Id>5102</Id>
            <SourceType>0</SourceType>
            <CreateAt>1701068019</CreateAt>
            <PaymentAddress>0xeD7A8EBF8458980A62Bb49f41a699d67bbaB7dc3</PaymentAddress>
            <GlobalVirtualGroupFamilyId>46</GlobalVirtualGroupFamilyId>
            <ChargedReadQuota>0</ChargedReadQuota>
            <BucketStatus>0</BucketStatus>
        </BucketInfo>
        <Removed>false</Removed>
        <DeleteAt>0</DeleteAt>
        <DeleteReason/>
        <Operator>0xeD7A8EBF8458980A62Bb49f41a699d67bbaB7dc3</Operator>
        <CreateTxHash>0xba80a606524d090cb9239be7ecc9dbe8e730f4cf93c1fc7a1f25e216582397ac</CreateTxHash>
        <UpdateTxHash>0xba80a606524d090cb9239be7ecc9dbe8e730f4cf93c1fc7a1f25e216582397ac</UpdateTxHash>
        <UpdateAt>2659742</UpdateAt>
        <UpdateTime>1701068019</UpdateTime>
        <StorageSize/>
    </Buckets>
    <Buckets>
        <BucketInfo>
            <Owner>0xeD7A8EBF8458980A62Bb49f41a699d67bbaB7dc3</Owner>
            <BucketName>0x03a42215dc678e65a145b3e18e84046a959dc11f-202311</BucketName>
            <Visibility>2</Visibility>
            <Id>5103</Id>
            <SourceType>0</SourceType>
            <CreateAt>1701068035</CreateAt>
            <PaymentAddress>0xeD7A8EBF8458980A62Bb49f41a699d67bbaB7dc3</PaymentAddress>
            <GlobalVirtualGroupFamilyId>4</GlobalVirtualGroupFamilyId>
            <ChargedReadQuota>0</ChargedReadQuota>
            <BucketStatus>0</BucketStatus>
        </BucketInfo>
        <Removed>false</Removed>
        <DeleteAt>0</DeleteAt>
        <DeleteReason/>
        <Operator>0xeD7A8EBF8458980A62Bb49f41a699d67bbaB7dc3</Operator>
        <CreateTxHash>0x9552ea6feb21e2476e2c93b990acc9e9157467675419c2a8217fd6a30ac7de61</CreateTxHash>
        <UpdateTxHash>0x9552ea6feb21e2476e2c93b990acc9e9157467675419c2a8217fd6a30ac7de61</UpdateTxHash>
        <UpdateAt>2659748</UpdateAt>
        <UpdateTime>1701068035</UpdateTime>
        <StorageSize/>
    </Buckets>
    <Buckets>
        <BucketInfo>
            <Owner>0xeD7A8EBF8458980A62Bb49f41a699d67bbaB7dc3</Owner>
            <BucketName>0x5ccf0f6b78a37ef4e2ccbc10d155c28fb8be9baf-202311</BucketName>
            <Visibility>2</Visibility>
            <Id>5104</Id>
            <SourceType>0</SourceType>
            <CreateAt>1701068058</CreateAt>
            <PaymentAddress>0xeD7A8EBF8458980A62Bb49f41a699d67bbaB7dc3</PaymentAddress>
            <GlobalVirtualGroupFamilyId>28</GlobalVirtualGroupFamilyId>
            <ChargedReadQuota>0</ChargedReadQuota>
            <BucketStatus>0</BucketStatus>
        </BucketInfo>
        <Removed>false</Removed>
        <DeleteAt>0</DeleteAt>
        <DeleteReason/>
        <Operator>0xeD7A8EBF8458980A62Bb49f41a699d67bbaB7dc3</Operator>
        <CreateTxHash>0xbb5d44facfd8930b97e2023758e479018fcf983d1c443102d8fa5db7fe2343ae</CreateTxHash>
        <UpdateTxHash>0xbb5d44facfd8930b97e2023758e479018fcf983d1c443102d8fa5db7fe2343ae</UpdateTxHash>
        <UpdateAt>2659757</UpdateAt>
        <UpdateTime>1701068058</UpdateTime>
        <StorageSize/>
    </Buckets>
    <Buckets>
        <BucketInfo>
            <Owner>0xeD7A8EBF8458980A62Bb49f41a699d67bbaB7dc3</Owner>
            <BucketName>0x08975d0afde4bc8be3501b517feec2d6c2b2bdaa-202311</BucketName>
            <Visibility>2</Visibility>
            <Id>5105</Id>
            <SourceType>0</SourceType>
            <CreateAt>1701068079</CreateAt>
            <PaymentAddress>0xeD7A8EBF8458980A62Bb49f41a699d67bbaB7dc3</PaymentAddress>
            <GlobalVirtualGroupFamilyId>20</GlobalVirtualGroupFamilyId>
            <ChargedReadQuota>0</ChargedReadQuota>
            <BucketStatus>0</BucketStatus>
        </BucketInfo>
        <Removed>false</Removed>
        <DeleteAt>0</DeleteAt>
        <DeleteReason/>
        <Operator>0xeD7A8EBF8458980A62Bb49f41a699d67bbaB7dc3</Operator>
        <CreateTxHash>0xf989c48bd8a2eda6ae802d79d25b9b0f0fbaeb43c0c15d5351f6064a59ba8c24</CreateTxHash>
        <UpdateTxHash>0xf989c48bd8a2eda6ae802d79d25b9b0f0fbaeb43c0c15d5351f6064a59ba8c24</UpdateTxHash>
        <UpdateAt>2659765</UpdateAt>
        <UpdateTime>1701068079</UpdateTime>
        <StorageSize/>
    </Buckets>
    <Buckets>
        <BucketInfo>
            <Owner>0xeD7A8EBF8458980A62Bb49f41a699d67bbaB7dc3</Owner>
            <BucketName>0xbb0cac4668d970db8b51b6c1f80e6627f2bd3c02-202311</BucketName>
            <Visibility>2</Visibility>
            <Id>5106</Id>
            <SourceType>0</SourceType>
            <CreateAt>1701068100</CreateAt>
            <PaymentAddress>0xeD7A8EBF8458980A62Bb49f41a699d67bbaB7dc3</PaymentAddress>
            <GlobalVirtualGroupFamilyId>32</GlobalVirtualGroupFamilyId>
            <ChargedReadQuota>0</ChargedReadQuota>
            <BucketStatus>0</BucketStatus>
        </BucketInfo>
        <Removed>false</Removed>
        <DeleteAt>0</DeleteAt>
        <DeleteReason/>
        <Operator>0xeD7A8EBF8458980A62Bb49f41a699d67bbaB7dc3</Operator>
        <CreateTxHash>0xe148d0a1befaba5672af750db7070412cfe1aa6e5a31af193606f2dedb12a8ec</CreateTxHash>
        <UpdateTxHash>0xe148d0a1befaba5672af750db7070412cfe1aa6e5a31af193606f2dedb12a8ec</UpdateTxHash>
        <UpdateAt>2659773</UpdateAt>
        <UpdateTime>1701068100</UpdateTime>
        <StorageSize/>
    </Buckets>
    <Buckets>
        <BucketInfo>
            <Owner>0xeD7A8EBF8458980A62Bb49f41a699d67bbaB7dc3</Owner>
            <BucketName>0x2a15da875b1ba0f82eb3a67ae027f5844915ba5a-202311</BucketName>
            <Visibility>2</Visibility>
            <Id>5107</Id>
            <SourceType>0</SourceType>
            <CreateAt>1701068121</CreateAt>
            <PaymentAddress>0xeD7A8EBF8458980A62Bb49f41a699d67bbaB7dc3</PaymentAddress>
            <GlobalVirtualGroupFamilyId>30</GlobalVirtualGroupFamilyId>
            <ChargedReadQuota>0</ChargedReadQuota>
            <BucketStatus>0</BucketStatus>
        </BucketInfo>
        <Removed>false</Removed>
        <DeleteAt>0</DeleteAt>
        <DeleteReason/>
        <Operator>0xeD7A8EBF8458980A62Bb49f41a699d67bbaB7dc3</Operator>
        <CreateTxHash>0x596fe73333ce932dcbb5412374c4825c49170f93ff3a15ba2b59aeb76fa0493a</CreateTxHash>
        <UpdateTxHash>0x596fe73333ce932dcbb5412374c4825c49170f93ff3a15ba2b59aeb76fa0493a</UpdateTxHash>
        <UpdateAt>2659781</UpdateAt>
        <UpdateTime>1701068121</UpdateTime>
        <StorageSize/>
    </Buckets>
    <Buckets>
        <BucketInfo>
            <Owner>0xeD7A8EBF8458980A62Bb49f41a699d67bbaB7dc3</Owner>
            <BucketName>0x5fff5a6c94b182fb965b40c7b9f30199b969ed2f-202311</BucketName>
            <Visibility>2</Visibility>
            <Id>5108</Id>
            <SourceType>0</SourceType>
            <CreateAt>1701068139</CreateAt>
            <PaymentAddress>0xeD7A8EBF8458980A62Bb49f41a699d67bbaB7dc3</PaymentAddress>
            <GlobalVirtualGroupFamilyId>9</GlobalVirtualGroupFamilyId>
            <ChargedReadQuota>0</ChargedReadQuota>
            <BucketStatus>0</BucketStatus>
        </BucketInfo>
        <Removed>false</Removed>
        <DeleteAt>0</DeleteAt>
        <DeleteReason/>
        <Operator>0xeD7A8EBF8458980A62Bb49f41a699d67bbaB7dc3</Operator>
        <CreateTxHash>0xc752451a8464b649854c55b669325ebdf7a5f1e238e98862f0d8806b4c68b952</CreateTxHash>
        <UpdateTxHash>0xc752451a8464b649854c55b669325ebdf7a5f1e238e98862f0d8806b4c68b952</UpdateTxHash>
        <UpdateAt>2659788</UpdateAt>
        <UpdateTime>1701068139</UpdateTime>
        <StorageSize/>
    </Buckets>
</GfSpListPaymentAccountStreamsResponse>
```
