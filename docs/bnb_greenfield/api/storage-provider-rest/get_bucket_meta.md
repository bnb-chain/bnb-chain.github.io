---
title: Get Bucket Meta
---

# GetBucketMeta

## RESTful API Description

This API is used to get bucket meta by bucket name. And it supports both `virtual-hosted-style` and `path-style` requests.

## HTTP Request Format

| Description                | Definition                                |
| -------------------------- | ----------------------------------------- |
| Host(virtual-hosted-style) | BucketName.gnfd-testnet-sp*.bnbchain.org |
| Path(virtual-hosted-style) |                                           |
| Method                     | GET                                       |

## HTTP Request Header

## HTTP Request Parameter

### Path Parameter

### Query Parameter

| ParameterName | Type   | Description                                                                           |
| ------------- | ------ | ------------------------------------------------------------------------------------- |
| bucket-meta   | string | bucket-meta is only used for routing location, and it does not need to pass any value |

### Request Body

The request does not have a request body.

## Request Syntax

```HTTP
GET /?bucket-meta HTTP/1.1
Host: BucketName.gnfd-testnet-sp*.bnbchain.org
```

## HTTP Response Header

| ParameterName | Type   | Description                 |
| ------------- | ------ | --------------------------- |
| Content-Type  | string | value is `application/xml`  |

## HTTP Response Parameter

| ParameterName | Type                          | Description                                                         |
| ------------- | ----------------------------- | ------------------------------------------------------------------- |
| bucket        | [Bucket](#bucket)             | bucket defines the bucket meta                                      |
| stream_record | [StreamRecord](#streamrecord) | stream_record defines the stream payment record of a stream account |

### Bucket

| ParameterName    | Type                              | Description                                                                                                                                                                                                       |
| ---------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Owner            | string                            | Owner is the object owner                                                                                                                                                                                         |
| BucketName       | string                            | BucketName is the name of the bucket                                                                                                                                                                              |
| Visibility       | [VisibilityType](#visibilitytype) | Visibility defines the highest permissions for bucket. When an bucket is public, everyone can access it                                                                                                           |
| Id               | Uint                              | Id is the unique identification for bucket                                                                                                                                                                        |
| SourceType       | [SourceType](#sourcetype)         | SourceType defines which chain the user should send the bucket management transactions to                                                                                                                         |
| CreateAt         | int64                             | CreateAt define the block timestamp when the bucket created                                                                                                                                                       |
| PrimarySPAddress | string                            | PrimarySPAddress is the unique address of the primary sp                                                                                                                                                          |
| PaymentAddress   | string                            | payment_address is the address of the payment account                                                                                                                                                             |
| ChargedReadQuota | uint64                            | ChargedReadQuota defines the traffic quota for read in bytes per month.                                                                                                                                           |
| BucketStatus     | [BucketStatus](#bucketstatus)     | BucketStatus define the status of the bucket                                                                                                                                                                      |
| Vgf              | [Vgf](#vgf)                       | Vgf define the global virtual group family info of bucket                                                                                                                                                         |
| StorageSize      | string                            | StorageSize defines the storage size of bucket                                                                                                                                                                    |
| OffChainStatus   | int32                             | OffChainStatus defines the status of a bucket in the off-chain storage.It is used to track the current state of the bucket with respect to off-chain operations,1 means 0001 -> OffChainStatusIsLimited is true.  |

### StreamRecord

| ParameterName     | Type                                        | Description                                                                                                             |
| ----------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Account           | string                                      | Account is the account address                                                                                          |
| CrudTimestamp     | int64                                       | CrudTimestamp defines latest update timestamp of the stream record                                                      |
| NetflowRate       | big.Int                                     | NetflowRate defines the per-second rate that an account's balance is changing.                                          |
| StaticBalance     | big.Int                                     | StaticBalance defines the balance of the stream account at the latest CRUD timestamp                                    |
| BufferBalance     | big.Int                                     | BufferBalance defines reserved balance of the stream account                                                            |
| LockBalance       | big.Int                                     | LockBalance defines the locked balance of the stream account after it puts a new object and before the object is sealed |
| Status            | [StreamAccountStatus](#streamaccountstatus) | Status defines the status of the stream account                                                                         |
| SettleTimestamp   | int64                                       | SettleTimestamp defines the unix timestamp when the stream account will be settled                                      |
| OutFlowCount      | uint64                                      | OutFlowCount defines the count of its out flows                                                                         |
| FrozenNetflowRate | big.Int                                     | FrozenNetflowRate defines the frozen netflow rate, which is used when resuming stream account                           |

### BucketStatus

| Value | Description                   |
| ----- | ----------------------------- |
| 0     | bucket status is created      |
| 1     | bucket status is discontinued |

### StreamAccountStatus

| Value | Description                                                                |
| ----- | -------------------------------------------------------------------------- |
| 0     | STREAM_ACCOUNT_STATUS_ACTIVE defines the active status of a stream account |
| 1     | STREAM_ACCOUNT_STATUS_FROZEN defines the frozen status of a stream account |

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

### Vgf
| ParameterName         | Type                                        | Description                                                                                                             |
| --------------------- | ------ | --------------------------------------------------------------------------------------------- |
| Id                    | uint32 | Id is the vgf id                                                                              |
| PrimarySpId           | uint32 | PrimarySpId is the primary sp id of vgf                                                       |
| VirtualPaymentAddress | string | VirtualPaymentAddress is the payment address associated with the global virtual group family. |

### Response Body

If the request is successful, the service sends back an HTTP 200 response.

If you failed to send request, you will get error response body in [XML](./sp_response.md#sp-error-response).

## Response Syntax

```HTTP
HTTP/1.1 200
X-Gnfd-Request-ID: RequestID

Body
```

## Examples

The examples given all use virtual-hosted-style.

### Example 1: Get Bucket Meta

```HTTP
GET /?bucket-meta HTTP/1.1
Host: j6it2.gnfd-testnet-sp1.bnbchain.org
Date: Fri, 31 March 2023 17:32:00 GMT
```

### Sample Response: Get Object Meta successfully

```HTTP
HTTP/1.1 200 OK
X-Gnfd-Request-ID: 4208447844380058399
Date: Fri, 31 March 2023 17:32:10 GMT

<?xml version="1.0" encoding="UTF-8"?>
<GfSpGetBucketMetaResponse>
    <Bucket>
        <BucketInfo>
            <Owner>0xb81c15fdd770684cD59C4Ae9E83E28E34019561E</Owner>
            <BucketName>duc19</BucketName>
            <Visibility>2</Visibility>
            <Id>2692561</Id>
            <SourceType>0</SourceType>
            <CreateAt>1695106708</CreateAt>
            <PaymentAddress>0xb81c15fdd770684cD59C4Ae9E83E28E34019561E</PaymentAddress>
            <GlobalVirtualGroupFamilyId>13</GlobalVirtualGroupFamilyId>
            <ChargedReadQuota>0</ChargedReadQuota>
            <BucketStatus>0</BucketStatus>
        </BucketInfo>
        <Removed>false</Removed>
        <DeleteAt>0</DeleteAt>
        <DeleteReason></DeleteReason>
        <Operator>0xb81c15fdd770684cD59C4Ae9E83E28E34019561E</Operator>
        <CreateTxHash>0x868a3c3432e2f86958cef0efddf4e8c3f630b542719a7fec575ca671ab5a1b61</CreateTxHash>
        <UpdateTxHash>0x868a3c3432e2f86958cef0efddf4e8c3f630b542719a7fec575ca671ab5a1b61</UpdateTxHash>
        <UpdateAt>1201393</UpdateAt>
        <UpdateTime>1695106708</UpdateTime>
        <Vgf>
            <Id>13</Id>
            <PrimarySpId>1</PrimarySpId>
            <VirtualPaymentAddress>0x26281179b8885F21f95b0a246c8AD70957A95A23</VirtualPaymentAddress>
        </Vgf>
        <StorageSize>2386542</StorageSize>
        <OffChainStatus>1</OffChainStatus>
    </Bucket>
    <StreamRecord>
        <Account>0xBC212bF5d6004311E350a531A1946D572C4d85E4</Account>
        <CrudTimestamp>1692366686</CrudTimestamp>
        <NetflowRate>-11191795</NetflowRate>
        <StaticBalance>0</StaticBalance>
        <BufferBalance>174054795840000</BufferBalance>
        <LockBalance>0</LockBalance>
        <Status>0</Status>
        <SettleTimestamp>1707832286</SettleTimestamp>
        <OutFlowCount>0</OutFlowCount>
        <FrozenNetflowRate>0</FrozenNetflowRate>
    </StreamRecord>
</GfSpGetBucketMetaResponse>
```
