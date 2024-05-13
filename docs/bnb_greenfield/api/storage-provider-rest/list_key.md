---
title: List User Account Keys
---

# ListKey

## RESTful API Description

This API is used to list the registered EdDSA public key records (account keys) for a given user account .

See [off-chain authentication specification](../../guide/storage-provider/modules/authenticator.md)

## HTTP Request Format

| Description | Definition                    |
| ----------- |-------------------------------|
| Host        | gnfd-testnet-sp*.bnbchain.org |
| Path        | /auth/keys_v2                 |
| Method      | GET                           |


## HTTP Request Header

| ParameterName           | Type   | Required | Description                                        |
|-------------------------| ------ | -------- |----------------------------------------------------|
| Origin                  | string | yes      | the origin value , which should be the same as app's domain |
| X-Gnfd-App-Domain       | string | yes      | app domain for the account key                     |
| X-Gnfd-User-Address     | string | yes      | the user address                                   |

### Authorization Header
No Authorization header is needed


## Request Syntax

```HTTP
GET /auth/keys_v2 HTTP/1.1
x-Gnfd-User-Address: UserAddress
X-Gnfd-App-Domain: AppDomain
```

### Response Header

The response returns the following HTTP headers.

| ParameterName | Type   | Description                |
| ------------- | ------ |----------------------------|
| Content-Type  | string | value is `application/xml` |

## HTTP Response Parameter

### Response Body

If the request is successful, the service sends back an HTTP 200 response.

The following data is returned in XML format by the service.

| ParameterName           | Type  | Description                             |
|-------------------------|-------|-----------------------------------------|
| ListUserPublicKeyV2Resp | array | the list of keys returned for the query |

## Response Syntax

```HTTP
HTTP/1.1 200
Content-Type: application/xml

XML Body
```

## Examples

### Example 1: List keys for a new combination of user address and app domain

#### request

```HTTP
GET /auth/keys_v2 HTTP/1.1
Host: 127.0.0.1:9133
x-gnfd-user-address: 0xA4cFe2dE3e45C043524aaC46fDdFb46311aF0af6
x-gnfd-app-domain: https://dcellar-qa.fe.nodereal.cc
```

#### response

```xml
<ListUserPublicKeyV2Resp>
    <Result>key_1</Result>
    <Result>key_2</Result>
</ListUserPublicKeyV2Resp>
```