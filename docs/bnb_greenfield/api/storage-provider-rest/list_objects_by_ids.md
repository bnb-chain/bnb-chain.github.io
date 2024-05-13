---
title: List Objects By IDs
---

# ListObjectsByIDs

## RESTful API Description

This API is used to query a list of objects metadata info by object ids. This API only supports `path-style` requests.

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
| objects-query | string | objects-query is only used for routing location, and it does not need to pass any value |
| ids           | string | ids is a list of object ids with an upper limit of 100                                  |

## Request Syntax

```HTTP
GET / HTTP/1.1
Host: gnfd-testnet-sp*.bnbchain.org?objects-query&ids=1,2
Date: Fri, 31 March 2023 17:32:00 GMT
Content-Type: application/xml
Content-Length: length
```

## HTTP Response Header

The response returns the following HTTP headers.

| ParameterName | Type   | Description                 |
| ------------- | ------ | --------------------------- |
| Content-Type  | string | value is `application/xml` |

## HTTP Response Parameter

| ParameterName | Type  | Description                                        |
| ------------- | ----- | -------------------------------------------------- |
| objects       | array | objects defines the information of the object list |


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

### Example 1: a list of objects by object ids

```HTTP
GET /?objects-query&ids=1,2,3,4,5,333 HTTP/1.1
Host: gnfd-testnet-sp1.bnbchain.org
```

### Sample Response: Query a list of objects by object ids successfully

```HTTP
HTTP/1.1 200 OK
Date: Fri, 31 March 2023 17:32:10 GMT
<GfSpListObjectsByIDsResponse>
    <ObjectEntry>
        <Id>2</Id>
        <Value>
            <ObjectInfo>
                <Owner>0xB769053f37080e70EE8458B7d376cCD64C1d1eab</Owner>
                <Creator>0xB769053f37080e70EE8458B7d376cCD64C1d1eab</Creator>
                <BucketName>cwtmcrfqen</BucketName>
                <ObjectName>dq6knn/n/00ybg9</ObjectName>
                <Id>2</Id>
                <LocalVirtualGroupId>0</LocalVirtualGroupId>
                <PayloadSize>1067008</PayloadSize>
                <Visibility>3</Visibility>
                <ContentType>text/event-stream</ContentType>
                <CreateAt>1688364504</CreateAt>
                <ObjectStatus>1</ObjectStatus>
                <RedundancyType>0</RedundancyType>
                <SourceType>0</SourceType>
                <Checksums>0251d00d386672c15072a311b56881bd470e2bb435aa618ca457eb44456b5aa1</Checksums>
                <Checksums>0251d00d386672c15072a311b56881bd470e2bb435aa618ca457eb44456b5aa1</Checksums>
                <Checksums>0251d00d386672c15072a311b56881bd470e2bb435aa618ca457eb44456b5aa1</Checksums>
                <Checksums>0251d00d386672c15072a311b56881bd470e2bb435aa618ca457eb44456b5aa1</Checksums>
                <Checksums>0251d00d386672c15072a311b56881bd470e2bb435aa618ca457eb44456b5aa1</Checksums>
                <Checksums>0251d00d386672c15072a311b56881bd470e2bb435aa618ca457eb44456b5aa1</Checksums>
                <Checksums>0251d00d386672c15072a311b56881bd470e2bb435aa618ca457eb44456b5aa1</Checksums>
            </ObjectInfo>
            <LockedBalance>0x0000000000000000000000000000000000000000000000000000000000000000</LockedBalance>
            <Removed>false</Removed>
            <UpdateAt>0</UpdateAt>
            <DeleteAt>0</DeleteAt>
            <DeleteReason></DeleteReason>
            <Operator>0xB769053f37080e70EE8458B7d376cCD64C1d1eab</Operator>
            <CreateTxHash>0xfd58401fc320c183475b956056ced8ab6762c635e6841a36fd432ad190c70545</CreateTxHash>
            <UpdateTxHash>0xf92faafa57aebe2444df8715faece0fa8c2631381b2157875baaf52f63b3dff4</UpdateTxHash>
            <SealTxHash>0xf512b2a742ed4fcf6cecedbe058ebb07eceba390041948b04b2a82392801a9b5</SealTxHash>
        </Value>
    </ObjectEntry>
    <ObjectEntry>
        <Id>1</Id>
    </ObjectEntry>
</GfSpListObjectsByIDsResponse>
```
