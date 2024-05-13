---
title: List Objects By Bucket
---

# ListObjectsByBucket

## RESTful API Description

This API is used to query a bucket's all objects metadata info. And it supports both `virtual-hosted-style` and `path-style` requests.

## HTTP Request Format

| Description                | Definition                                |
| -------------------------- | ----------------------------------------- |
| Host(virtual-hosted-style) | BucketName.gnfd-testnet-sp*.bnbchain.org |
| Path(virtual-hosted-style) | /                                         |
| Method                     | GET                                       |

You should set `BucketName` in url host to list objects of the bucket.

## HTTP Request Header

## HTTP Request Parameter

### Path Parameter

The request does not have a path parameter.

### Query Parameter

| ParameterName      | Type    | Required | Description                                                                                                                                                                   |
| ------------------ | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| max-keys           | integer | no       | max-keys defines the maximum number of keys returned to the response body, the biggest number is 1000.If not specified, the default value is 50.                              |
| prefix             | string  | no       | prefix limits the response to keys that begin with the specified prefix                                                                                                       |
| continuation-token | string  | no       | continuation-token is the token returned from a previous list objects request to indicate where in the list of objects to resume the listing. This is used for pagination.    |
| start-after        | string  | no       | start-after defines the starting object name for the listing of objects                                                                                                       |
| delimiter          | string  | no       | delimiter is a character you use to group keys, currently only '/' is supported.If the parameter is not passed, it will return the data that has not been removed by default. |

### Request Body

The request does not have a request body.

## Request Syntax

```HTTP
GET / HTTP/1.1
Host: BucketName.gnfd-testnet-sp*.bnbchain.org
```

## HTTP Response Header

The response returns the following HTTP headers.

| ParameterName | Type   | Description                 |
| ------------- | ------ | --------------------------- |
| Content-Type  | string | value is `application/xml`  |

## HTTP Response Parameter

| ParameterName           | Type    | Description                                                                                                                                                    |
| ----------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| objects                 | array   | objects defines the list of object                                                                                                                             |
| key_count               | integer | key_count is the number of keys returned with this request                                                                                                     |
| max_keys                | integer | max_keys sets the maximum number of keys returned in the response                                                                                              |
| is_truncated            | boolean | is_truncated set to false if all of the results were returned. set to true if more keys are available to return                                                |
| next_continuation_token | string  | next_continuation_token is sent when is_truncated is true, which means there are more keys in the bucket that can be listed                                    |
| name                    | string  | name of the bucket                                                                                                                                             |
| prefix                  | string  | prefix is the prefix used during the query                                                                                                                     |
| delimiter               | string  | delimiter is the delimiter used during the query                                                                                                               |
| common_prefixes         | array   | common_prefixes a list of strings representing common prefixes. common_prefixes are those parts of object key names that fall between the specified delimiters |
| continuation_token      | integer | continuationToken is the continuation token used during the query                                                                                              |

### Response Body

If the request is successful, the service sends back an HTTP 200 response.

If you failed to send request, you will get error response body in [XML](./sp_response.md#sp-error-response).

## Response Syntax

```HTTP
HTTP/1.1 200

XML Body
```

## Examples

The examples given all use virtual-hosted-style.

### Example 1: Query a bucket's objects

```HTTP
GET /?max-keys=5&continuation-token=Y2NjYy8=&prefix=t3&delimiter=/&include-removed=false HTTP/1.1
Host: myBucket.gnfd-testnet-sp1.bnbchain.org
Date: Fri, 31 March 2023 17:32:00 GMT
```

### Sample Response: Query a bucket's objects

```HTTP
HTTP/1.1 200 OK
X-Gnfd-Request-ID: 4208447844380058399
Date: Fri, 31 March 2023 17:32:10 GMT

<?xml version="1.0" encoding="UTF-8"?>
<GfSpListObjectsByBucketNameResponse>
    <Objects>
        <ObjectInfo>
            <Owner>0xBC212bF5d6004311E350a531A1946D572C4d85E4</Owner>
            <Creator>0xBC212bF5d6004311E350a531A1946D572C4d85E4</Creator>
            <BucketName>j6it2</BucketName>
            <ObjectName>t3gge9tjua</ObjectName>
            <Id>2</Id>
            <LocalVirtualGroupId>1</LocalVirtualGroupId>
            <PayloadSize>268435468</PayloadSize>
            <Visibility>3</Visibility>
            <ContentType>application/octet-stream</ContentType>
            <CreateAt>1692278050</CreateAt>
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
        <UpdateAt>7921</UpdateAt>
        <DeleteAt>0</DeleteAt>
        <DeleteReason></DeleteReason>
        <Operator>0x22868A6787234AA8E6e2dd0256dEed484215C985</Operator>
        <CreateTxHash>0x9f49161886abd35ce78638381a0ee07097e445d248b9ae450d2fbdc7abc1b374</CreateTxHash>
        <UpdateTxHash>0xdeec4af5881bffb9dd03d50010292c6c709636b596800500bf9dfa307bf296b4</UpdateTxHash>
        <SealTxHash>0xdeec4af5881bffb9dd03d50010292c6c709636b596800500bf9dfa307bf296b4</SealTxHash>
    </Objects>
    <KeyCount>1</KeyCount>
    <MaxKeys>5</MaxKeys>
    <IsTruncated>false</IsTruncated>
    <NextContinuationToken></NextContinuationToken>
    <Name>j6it2</Name>
    <Prefix>t3</Prefix>
    <Delimiter>/</Delimiter>
    <CommonPrefixes>cccc/</CommonPrefixes>
    <CommonPrefixes>notice/</CommonPrefixes>
    <CommonPrefixes>number/</CommonPrefixes>  
    <ContinuationToken>Y2NjYy8=</ContinuationToken>
</GfSpListObjectsByBucketNameResponse>
```
