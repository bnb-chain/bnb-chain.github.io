---
title: Get User Buckets
---

# GetUserBuckets

## RESTful API Description

This API is used to query a user's own buckets metadata info. This API only supports `path-style` requests.

## HTTP Request Format

| Description      | Definition                     |
| ---------------- | ------------------------------ |
| Host(path-style) | gnfd-testnet-sp*.bnbchain.org |
| Path(path-style) | /                              |
| Method           | GET                            |

## HTTP Request Header

| ParameterName       | Type   | Required | Description         |
| ------------------- | ------ | -------- | ------------------- |
| X-Gnfd-User-Address | string | yes      | The address of user |

## HTTP Request Parameter

### Path Parameter

The request does not have a path parameter.

### Query Parameter

| ParameterName   | Type    | Required | Description                                                                                                                                                                                       |
| --------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| include-removed | boolean | no       | include-removed determines whether to include buckets that have been marked as removed in the list. If the parameter is not passed, it will return the data that has not been removed by default. |

### Request Body

The request does not have a request body.

## Request Syntax

```HTTP
GET / HTTP/1.1
Host: gnfd-testnet-sp*.bnbchain.org
X-Gnfd-User-Address: Address
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

### Example 1: Query a user's buckets

```HTTP
GET / HTTP/1.1
Host: gnfd-testnet-sp1.bnbchain.org?include-removed=false
Date: Fri, 31 March 2023 17:32:00 GMT
X-Gnfd-User-Address: user address string
```

### Sample Response: Query a user's buckets successfully

```HTTP
HTTP/1.1 200 OK
X-Gnfd-Request-ID: 4208447844380058399
Date: Fri, 31 March 2023 17:32:10 GMT

<GfSpGetUserBucketsResponse>
    <Buckets>
        <BucketInfo>
            <Owner>0xb81c15fdd770684cD59C4Ae9E83E28E34019561E</Owner>
            <BucketName>5tsq2</BucketName>
            <Visibility>1</Visibility>
            <Id>2692673</Id>
            <SourceType>0</SourceType>
            <CreateAt>1695123881</CreateAt>
            <PaymentAddress>0xb81c15fdd770684cD59C4Ae9E83E28E34019561E</PaymentAddress>
            <GlobalVirtualGroupFamilyId>214</GlobalVirtualGroupFamilyId>
            <ChargedReadQuota>0</ChargedReadQuota>
            <BucketStatus>0</BucketStatus>
        </BucketInfo>
        <Removed>false</Removed>
        <DeleteAt>0</DeleteAt>
        <DeleteReason></DeleteReason>
        <Operator>0xb81c15fdd770684cD59C4Ae9E83E28E34019561E</Operator>
        <CreateTxHash>0x6604e8f0384c211fe66f7bb99c7fd3754a167b045e640e611bc3139112b58f2d</CreateTxHash>
        <UpdateTxHash>0x662de1d5d281d76e8f4b9e92cc48d0cc48b99bf55758b0fc61d26f5079198bcf</UpdateTxHash>
        <UpdateAt>1209879</UpdateAt>
        <UpdateTime>1695123885</UpdateTime>
        <Vgf>
            <Id>214</Id>
            <PrimarySpId>3</PrimarySpId>
            <VirtualPaymentAddress>0x25f7c6161eEFFCA4A69059FdC022AC36cE9Bf3C8</VirtualPaymentAddress>
        </Vgf>
        <StorageSize>111111</StorageSize>
        <OffChainStatus>1</OffChainStatus>
    </Buckets>
    <Buckets>
        <BucketInfo>
            <Owner>0xb81c15fdd770684cD59C4Ae9E83E28E34019561E</Owner>
            <BucketName>oz60t</BucketName>
            <Visibility>1</Visibility>
            <Id>2692670</Id>
            <SourceType>0</SourceType>
            <CreateAt>1695123858</CreateAt>
            <PaymentAddress>0xb81c15fdd770684cD59C4Ae9E83E28E34019561E</PaymentAddress>
            <GlobalVirtualGroupFamilyId>214</GlobalVirtualGroupFamilyId>
            <ChargedReadQuota>0</ChargedReadQuota>
            <BucketStatus>0</BucketStatus>
        </BucketInfo>
        <Removed>false</Removed>
        <DeleteAt>0</DeleteAt>
        <DeleteReason></DeleteReason>
        <Operator>0xb81c15fdd770684cD59C4Ae9E83E28E34019561E</Operator>
        <CreateTxHash>0x0e954e633d7edfb2c8cbd677e15a516cb4351d21ced41db0ea2e708a61e7f061</CreateTxHash>
        <UpdateTxHash>0x2e2d6c0342de2cad7d35821a08a52e75dfa0146dbe0db1156a09f34d7a60cfaa</UpdateTxHash>
        <UpdateAt>1209873</UpdateAt>
        <UpdateTime>1695123872</UpdateTime>
        <Vgf>
            <Id>214</Id>
            <PrimarySpId>3</PrimarySpId>
            <VirtualPaymentAddress>0x25f7c6161eEFFCA4A69059FdC022AC36cE9Bf3C8</VirtualPaymentAddress>
        </Vgf>
        <StorageSize>2386542</StorageSize>
    </Buckets>
    <Buckets>
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
        <StorageSize>32179842</StorageSize>
    </Buckets>
    <Buckets>
        <BucketInfo>
            <Owner>0xb81c15fdd770684cD59C4Ae9E83E28E34019561E</Owner>
            <BucketName>uyo9o</BucketName>
            <Visibility>2</Visibility>
            <Id>2692560</Id>
            <SourceType>0</SourceType>
            <CreateAt>1695106683</CreateAt>
            <PaymentAddress>0xb81c15fdd770684cD59C4Ae9E83E28E34019561E</PaymentAddress>
            <GlobalVirtualGroupFamilyId>13</GlobalVirtualGroupFamilyId>
            <ChargedReadQuota>0</ChargedReadQuota>
            <BucketStatus>0</BucketStatus>
        </BucketInfo>
        <Removed>false</Removed>
        <DeleteAt>0</DeleteAt>
        <DeleteReason></DeleteReason>
        <Operator>0xb81c15fdd770684cD59C4Ae9E83E28E34019561E</Operator>
        <CreateTxHash>0x5d1605529a24aaf1205e4a2f42aee44d1d58c8b38f782687b375b7fcccfef770</CreateTxHash>
        <UpdateTxHash>0x5d1605529a24aaf1205e4a2f42aee44d1d58c8b38f782687b375b7fcccfef770</UpdateTxHash>
        <UpdateAt>1201381</UpdateAt>
        <UpdateTime>1695106683</UpdateTime>
        <Vgf>
            <Id>13</Id>
            <PrimarySpId>1</PrimarySpId>
            <VirtualPaymentAddress>0x26281179b8885F21f95b0a246c8AD70957A95A23</VirtualPaymentAddress>
        </Vgf>
        <StorageSize>12332122</StorageSize>
    </Buckets>
</GfSpGetUserBucketsResponse>
```
