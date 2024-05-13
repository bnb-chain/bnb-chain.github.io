---
title: List Buckets By IDs
---

# ListBucketsByIDs

## RESTful API Description

This API is used to query a list of buckets metadata info by buckets ids. This API only supports `path-style` requests.

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

| ParameterName | Type   | Description                                                                             |
| ------------- | ------ | --------------------------------------------------------------------------------------- |
| buckets-query | string | buckets-query is only used for routing location, and it does not need to pass any value |
| ids           | string | ids is a list of bucket ids with an upper limit of 100                                  |

## Request Syntax

```HTTP
GET / HTTP/1.1
Host: gnfd-testnet-sp*.bnbchain.org?buckets-query&ids=1,2
Date: Fri, 31 March 2023 17:32:00 GMT
```

## HTTP Response Header

The response returns the following HTTP headers.

| ParameterName | Type   | Description                 |
| ------------- | ------ | --------------------------- |
| Content-Type  | string | value is `application/xml`  |

## HTTP Response Parameter

| ParameterName | Type  | Description                                        |
| ------------- | ----- | -------------------------------------------------- |
| buckets       | array | buckets defines the information of the bucket list |

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

### Example 1: a list of buckets by bucket ids

```HTTP
GET /?buckets-query&ids=1,2,333 HTTP/1.1
Host: gnfd-testnet-sp1.bnbchain.org
Date: Fri, 31 March 2023 17:32:00 GMT
```

### Sample Response: Query a list of buckets by bucket ids successfully

```HTTP
HTTP/1.1 200 OK
X-Gnfd-Request-ID: 4208447844380058399
Date: Fri, 31 March 2023 17:32:10 GMT

<?xml version="1.0" encoding="UTF-8"?>
<GfSpListBucketsByIDsResponse>
    <BucketEntry>
        <Id>1</Id>
    </BucketEntry>
    <BucketEntry>
        <Id>2</Id>
        <Value>
            <BucketInfo>
                <Owner>0xBC212bF5d6004311E350a531A1946D572C4d85E4</Owner>
                <BucketName>j6it2</BucketName>
                <Visibility>2</Visibility>
                <Id>2</Id>
                <SourceType>0</SourceType>
                <CreateAt>1692278045</CreateAt>
                <PaymentAddress>0xBC212bF5d6004311E350a531A1946D572C4d85E4</PaymentAddress>
                <GlobalVirtualGroupFamilyId>1</GlobalVirtualGroupFamilyId>
                <ChargedReadQuota>0</ChargedReadQuota>
                <BucketStatus>1</BucketStatus>
            </BucketInfo>
            <Removed>false</Removed>
            <DeleteAt>1693055775</DeleteAt>
            <DeleteReason>testnet cleanup</DeleteReason>
            <Operator>0xBC212bF5d6004311E350a531A1946D572C4d85E4</Operator>
            <CreateTxHash>0x8284859bf59b0fbde5a4836b0ffb1449fece0167ccd774782c37e4ed10af9047</CreateTxHash>
            <UpdateTxHash>0x2a1c313dec9196b07cef8008f0e0e614c804a0c28dc08c9d78648afac1908bce</UpdateTxHash>
            <UpdateAt>82179</UpdateAt>
            <UpdateTime>1692450975</UpdateTime>
            <StorageSize>2386542</StorageSize>
            <OffChainStatus>1</OffChainStatus>
        </Value>
    </BucketEntry>
    <BucketEntry>
        <Id>333</Id>
    </BucketEntry>
</GfSpListBucketsByIDsResponse>
```
