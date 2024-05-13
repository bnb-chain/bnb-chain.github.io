---
title: Get Object Meta
---

# GetObjectMeta

## RESTful API Description

This API is used to get object meta by object and bucket name. And it supports both `virtual-hosted-style` and `path-style` requests.

## HTTP Request Format

| Description                | Definition                                |
| -------------------------- | ----------------------------------------- |
| Host(virtual-hosted-style) | BucketName.gnfd-testnet-sp*.bnbchain.org |
| Path(virtual-hosted-style) | /:object                                  |
| Method                     | GET                                       |

## HTTP Request Header

## HTTP Request Parameter

### Path Parameter

| ParameterName | Type   | Description                       |
| ------------- | ------ | --------------------------------- |
| object        | string | object defines the name of object |

### Query Parameter

| ParameterName | Type   | Description                                                                           |
| ------------- | ------ | ------------------------------------------------------------------------------------- |
| object-meta   | string | object-meta is only used for routing location, and it does not need to pass any value |

### Request Body

The request does not have a request body.

## Request Syntax

```HTTP
GET /ObjectName?object-meta HTTP/1.1
Host: BucketName.gnfd-testnet-sp*.bnbchain.org
```

## HTTP Response Header

| ParameterName | Type   | Description                 |
| ------------- | ------ | --------------------------- |
| Content-Type  | string | value is `application/xml`  |

## HTTP Response Parameter

| ParameterName | Type              | Description                    |
| ------------- | ----------------- | ------------------------------ |
| object        | [Object](#object) | object defines the object meta |

### Object

| ParameterName  | Type                              | Description                                                                                                                        |
| -------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Owner          | string                            | Owner is the object owner                                                                                                          |
| Creator        | string                            | Creator is the address of the uploader, it always be same as owner address                                                         |
| BucketName     | string                            | BucketName is the name of the bucket                                                                                               |
| ObjectName     | string                            | ObjectName is the name of object                                                                                                   |
| Id             | Uint                              | Id is the unique identifier of object                                                                                              |
| PayloadSize    | uint64                            | PayloadSize is the total size of the object payload                                                                                |
| Visibility     | [VisibilityType](#visibilitytype) | Visibility defines the highest permissions for object. When an object is public, everyone can access it                            |
| ContentType    | string                            | ContentType defines the format of the object which should be a standard MIME type.                                                 |
| CreateAt       | int64                             | CreateAt defines the block timestamp when the object is created                                                                    |
| ObjectStatus   | [ObjectStatus](#objectstatus)     | ObjectStatus defines the upload status of the object                                                                               |
| RedundancyType | [RedundancyType](#redundancytype) | RedundancyType defines the type of the redundancy which can be multi-replication or EC                                             |
| SourceType     | [SourceType](#sourceType)         | SourceType defines the source of the object                                                                                        |
| Checksums      | [][]byte                          | Checksums defines the root hash of the pieces which stored in a SP. add omit tag to omit the field when converting to NFT metadata |

### RedundancyType

| Value | Description                     |
| ----- | ------------------------------- |
| 0     | Redundancy type is replica type |
| 1     | Redundancy type is ec type      |

### ObjectStatus

| Value | Description                   |
| ----- | ----------------------------- |
| 0     | object status is created      |
| 1     | object status is sealed       |
| 2     | object status is discontinued |

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
X-Gnfd-Request-ID: RequestID

Body
```

## Examples

The examples given all use virtual-hosted-style.

### Example 1: Get Object Meta

```HTTP
GET /brwdhocykj?object-meta HTTP/1.1
Host: rmr9e.gnfd-testnet-sp1.bnbchain.org
Date: Fri, 31 March 2023 17:32:00 GMT
```

### Sample Response: Get Object Meta successfully

```HTTP
HTTP/1.1 200 OK
X-Gnfd-Request-ID: 4208447844380058399
Date: Fri, 31 March 2023 17:32:10 GMT

<?xml version="1.0" encoding="UTF-8"?>
<GfSpGetObjectMetaResponse>
    <Object>
        <ObjectInfo>
            <Owner>0x79a8BFff674FBD60a2fb2945D634419efb4c7F12</Owner>
            <Creator>0x79a8BFff674FBD60a2fb2945D634419efb4c7F12</Creator>
            <BucketName>rmr9e</BucketName>
            <ObjectName>brwdhocykj</ObjectName>
            <Id>7</Id>
            <LocalVirtualGroupId>1</LocalVirtualGroupId>
            <PayloadSize>268435468</PayloadSize>
            <Visibility>3</Visibility>
            <ContentType>application/octet-stream</ContentType>
            <CreateAt>1692278052</CreateAt>
            <ObjectStatus>1</ObjectStatus>
            <RedundancyType>0</RedundancyType>
            <SourceType>0</SourceType>
            <Checksums>f803f1a72b179111f3bea2203695d1bacefec4ef546d4cdc90f5c252bcc6f827</Checksums>
            <Checksums>d7dca9013758e3e20e448eead58d2eb075cfd2af6c8781b650a6dbd1b6e49481</Checksums>
            <Checksums>d7dca9013758e3e20e448eead58d2eb075cfd2af6c8781b650a6dbd1b6e49481</Checksums>
            <Checksums>d7dca9013758e3e20e448eead58d2eb075cfd2af6c8781b650a6dbd1b6e49481</Checksums>
            <Checksums>d7dca9013758e3e20e448eead58d2eb075cfd2af6c8781b650a6dbd1b6e49481</Checksums>
            <Checksums>d7dca9013758e3e20e448eead58d2eb075cfd2af6c8781b650a6dbd1b6e49481</Checksums>
            <Checksums>d7dca9013758e3e20e448eead58d2eb075cfd2af6c8781b650a6dbd1b6e49481</Checksums>
        </ObjectInfo>
        <LockedBalance>0x0000000000000000000000000000000000000000000000000000000000000000</LockedBalance>
        <Removed>false</Removed>
        <UpdateAt>0</UpdateAt>
        <DeleteAt>0</DeleteAt>
        <DeleteReason></DeleteReason>
        <Operator>0xb79FD3b1c2DaCe732beEd95c8bC2209e05106f69</Operator>
        <CreateTxHash>0x6106badbda97180c507fd4bc2b39971b1c9a6db2a8d5fda38291de6c6ac968cc</CreateTxHash>
        <UpdateTxHash>0x6c526780cefb958bf39936510ec16556fe720dd04713f5baf89232b5361bfec2</UpdateTxHash>
        <SealTxHash>0x6c526780cefb958bf39936510ec16556fe720dd04713f5baf89232b5361bfec2</SealTxHash>
    </Object>
</GfSpGetObjectMetaResponse>
```
