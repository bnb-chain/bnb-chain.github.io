---
title: Verify Permission
---

# Verify Permission

## RESTful API Description

This API is used to Verify the input account’s permission to input items. This API only supports `path-style` requests.

## HTTP Request Format

| Description      | Definition                            |
| ---------------- | ------------------------------------- |
| Host(path-style) | gnfd-testnet-sp*.bnbchain.org        |
| Path(path-style) | /permission/:operator/:bucket/:action |
| Method           | GET                                   |

## HTTP Request Header

## HTTP Request Parameter

### Path Parameter

| ParameterName | Type              | Required | Description                                                                 |
| ------------- | ----------------- | -------- | --------------------------------------------------------------------------- |
| operator      | string            | yes      | operator defines the address of operator                                    |
| bucket        | string            | yes      | bucket defines the name of bucket                                           |
| action        | [Action](#action) | yes      | action defines the operations you can execute in greenfield storage network |

### Query Parameter

| ParameterName | Type   | Required | Description                       |
| ------------- | ------ | -------- | --------------------------------- |
| object        | string | no       | object defines the name of object |

### Request Body

The request does not have a request body.

## Request Syntax

```HTTP
GET / HTTP/1.1
Host: gnfd-testnet-sp*.bnbchain.org/permission/:operator/:bucket/:action?object=object
```

## HTTP Response Header

The response returns the following HTTP headers.

| ParameterName | Type   | Description                 |
| ------------- | ------ | --------------------------- |
| Content-Type  | string | value is `application/xml`  |

## HTTP Response Parameter

| ParameterName | Type              | Description                                                                                                         |
| ------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| effect        | [Effect](#effect) | effect defines the effect of the operation permission, include EFFECT_UNSPECIFIED(0)/EFFECT_ALLOW(1)/EFFECT_DENY(2) |

### Effect

| Value | Description        |
| ----- | ------------------ |
| 0     | EFFECT_UNSPECIFIED |
| 1     | EFFECT_ALLOW       |
| 2     | EFFECT_DENY        |

### Action

| Value | Description                |
| ----- | -------------------------- |
| 0     | ACTION_UNSPECIFIED         |
| 1     | ACTION_UPDATE_BUCKET_INFO  |
| 2     | ACTION_DELETE_BUCKET       |
| 3     | ACTION_CREATE_OBJECT       |
| 4     | ACTION_DELETE_OBJECT       |
| 5     | ACTION_COPY_OBJECT         |
| 6     | ACTION_GET_OBJECT          |
| 7     | ACTION_EXECUTE_OBJECT      |
| 8     | ACTION_LIST_OBJECT         |
| 9     | ACTION_UPDATE_GROUP_MEMBER |
| 10    | ACTION_DELETE_GROUP        |
| 11    | ACTION_UPDATE_OBJECT_INFO  |
| 12    | ACTION_UPDATE_GROUP_EXTRA  |
| 99    | ACTION_TYPE_ALL            |

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

### Example 1: Verify permission

```HTTP
GET / HTTP/1.1
Host: gnfd-testnet-sp1.bnbchain.org/permission/0x9d90A123c3A559a295fa99cCbC82b5ad2C33196B/asnnv/6?object=obgeio5g3y
Date: Fri, 31 March 2023 17:32:00 GMT
```

### Sample Response: Verify permission successfully

```HTTP
HTTP/1.1 200 OK
X-Gnfd-Request-ID: 4208447844380058399
Date: Fri, 31 March 2023 17:32:10 GMT

<?xml version="1.0" encoding="UTF-8"?>
<QueryVerifyPermissionResponse>
    <Effect>2</Effect>
</QueryVerifyPermissionResponse>
```
