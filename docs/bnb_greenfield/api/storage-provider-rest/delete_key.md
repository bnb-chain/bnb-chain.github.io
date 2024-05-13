---
title: Delete User Account Key
---
# DeleteKey 


## RESTful API Description

This API is used to delete the current user account key records.

See [off-chain authentication specification](../../guide/storage-provider/modules/authenticator.md)

## HTTP Request Format

| Description | Definition                    |
| ----------- |-------------------------------|
| Host        | gnfd-testnet-sp*.bnbchain.org |
| Path        | /auth/delete_keys_v2           |
| Method      | POST                          |


## HTTP Request Header

| ParameterName                                                            | Type   | Required | Description                                                                                                                                                |
|--------------------------------------------------------------------------| ------ | -------- |------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Origin                                                                   | string | yes      | the origin value , which should be the same as app's domain                                                                                                |
| X-Gnfd-App-Domain                                                        | string | yes      | app domain for the account key                                                                                                                             |
| X-Gnfd-App-Reg-Public-Key                                                | string | yes      | the account key that SP should use to verify the signature                                                                                                 |
| X-Gnfd-Expiry-Timestamp                                                  | string | yes      | It defines the Expiry-Date is the ISO 8601 datetime string (e.g. 2021-09-30T16:25:24Z), indicating the expiry timestamp of signature in Authorization head |
| [Authorization](../storage-provider-rest/README.md#authorization-header) | string | yes      | see [Authorization Header](#authorization-header)                                                                                                          |

## HTTP Request Parameter

### Path Parameter

The request does not have a path parameter.

### Query Parameter

The request does not have a query parameter.

### Request Body

The request body need contains a list of public keys that need to be deleted. 
The keys must be use comma to separate.
E.g.  key_1,key_2,key_3


## Request Syntax

```HTTP
POST /auth/delete_keys_v2 HTTP/1.1
Host: BucketName.gnfd-testnet-sp*.bnbchain.org
Authorization: Authorization
x-gnfd-user-address: 0xA4cFe2dE3e45C043524aaC46fDdFb46311aF0af6
x-gnfd-app-domain: https://dcellar-qa.fe.nodereal.cc

key1,key2,key3
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

| ParameterName | Type    | Description                                                     |
| ------------- | ------- |-----------------------------------------------------------------|
| Result        | boolean | indicate if the user public keys are successfully deleted in SP |

## Response Syntax

```HTTP
HTTP/1.1 200
Content-Type: application/xml

XML Body
```

## Examples

### Example 1: delete keys for a new combination of user address and app domain

#### request

```HTTP
POST /auth/delete_keys_v2 HTTP/1.1
Host: gf-stagenet-sp-e.bk.nodereal.cc
x-gnfd-user-address: 0xA4cFe2dE3e45C043524aaC46fDdFb46311aF0af6
x-gnfd-app-domain: https://dcellar-qa.fe.nodereal.cc

key1,key2,key3
```


#### response

```xml
<DeleteUserPublicKeyV2Resp>
    <Result>true</Result>
</DeleteUserPublicKeyV2Resp>
```