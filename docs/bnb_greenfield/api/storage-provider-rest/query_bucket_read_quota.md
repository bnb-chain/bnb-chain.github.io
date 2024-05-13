---
title: Query Bucket Read Quota
---

# QueryBucketReadQuota

## RESTful API Description

This API is used to query bucket read quota. And it supports both `virtual-hosted-style` and `path-style` requests.

## HTTP Request Format

| Description                | Definition                                |
| -------------------------- | ----------------------------------------- |
| Host(virtual-hosted-style) | BucketName.gnfd-testnet-sp*.bnbchain.org |
| Path(virtual-hosted-style) | /                                         |
| Method                     | GET                                       |

You should set `BucketName` in url host to determine which bucket do you want to query.

## HTTP Request Header

| ParameterName                                                            | Type   | Required | Description                                  |
| ------------------------------------------------------------------------ | ------ | -------- | -------------------------------------------- |
| [Authorization](../storage-provider-rest/README.md#authorization-header) | string | yes      | The authorization string of the HTTP request |

## HTTP Request Parameter

### Path Parameter

None

### Query Parameter

| ParameterName | Type   | Required | Description                                                  |
| ------------- | ------ | -------- | ------------------------------------------------------------ |
| read-quota    | string | yes      | Read quota path                                              |
| year-month    | string | yes      | YearMonth is used to specify queried month, format "2023-03" |

### Request Body

None

## Request Syntax

```HTTP
GET /?read-quota&year-month=YearMonth HTTP/1.1
Host: BucketName.gnfd-testnet-sp*.bnbchain.org
Authorization: Authorization
```

## HTTP Response Header

The response returns the following HTTP headers.

| ParameterName     | Type   | Description                           |
| ----------------- | ------ | ------------------------------------- |
| X-Gnfd-Request-ID | string | defines trace id, trace request in sp |
| Content-Type      | string | value is `application/xml`            |

## HTTP Response Parameter

### Response Body

If the request is successful, the service sends back an HTTP 200 response.

| ParameterName            | Type    | Description                                                         |
|--------------------------|---------|---------------------------------------------------------------------|
| BucketName               | string  | bucket name                                                         |
| BucketID                 | string  | bucket id                                                           |
| ReadQuotaSize            | integer | ReadQuotaSize is the greenfield chain bucket info's read quota size |
| SPFreeReadQuotaSize      | integer | SPFreeReadQuotaSize is the sp default free quota                    |
| ReadConsumedSize         | integer | ReadConsumedSize is currently consumed size                         |
| FreeConsumedSize         | integer | ReadConsumedSize is the consumed free quota size                    |
| MonthlyFreeQuota         | integer | MonthlyFreeQuota is the monthly free quota                          |
| MonthlyQuotaConsumedSize | integer | MonthlyQuotaConsumedSize is the consumed monthly free quota size    |


If you failed to send request to get approval, you will get error response body in [XML](./sp_response.md#sp-error-response).

## Response Syntax

```HTTP
HTTP/1.1 200
X-Gnfd-Request-ID: RequestID

XML Body
```

## Examples

The examples given all use virtual-hosted-style.

### Example 1: Query a bucket read quota

```HTTP
GET /?read-quota&year-month=2023-03 HTTP/1.1
Host: myBucket.gnfd-testnet-sp1.bnbchain.org
Date: Fri, 31 March 2023 17:32:00 GMT
Authorization: authorization string
```

### Sample Response: Query a bucket read quota successfully

```HTTP
HTTP/1.1 200 OK
X-Gnfd-Request-ID: 4208447844380058399
Date: Fri, 31 March 2023 17:32:10 GMT

<?xml version="1.0" encoding="UTF-8"?>
<GetBucketReadQuotaResult>
    <BucketName>myBucket</BucketName>
    <BucketID>6u754</BucketID>
    <ReadQuotaSize>20</ReadQuotaSize>
    <SPFreeReadQuotaSize>10</SPFreeReadQuotaSize>
    <ReadConsumedSize>5</ReadConsumedSize>
    <FreeConsumedSize>5</FreeConsumedSize>
    <MonthlyFreeQuota>5</MonthlyFreeQuota>
    <MonthlyQuotaConsumedSize>5</MonthlyQuotaConsumedSize>
</GetBucketReadQuotaResult>
```
