---
title: Get Approval
---

# GetApproval

## RESTful API Description

This API is used to sign an approval for migrating bucket action. And it only supports `path-style` requests.

## HTTP Request Format

This API only supports path-style requests.

| Description      | Definition                        |
| ---------------- | --------------------------------- |
| Host(path-style) | gnfd-testnet-sp*.bnbchain.org    |
| Path(path-style) | /greenfield/admin/v1/get-approval |
| Method           | GET                               |

## HTTP Request Header

| ParameterName                                                            | Type   | Required | Description                                  |
| ------------------------------------------------------------------------ | ------ | -------- | -------------------------------------------- |
| X-Gnfd-Unsigned-Msg                                                      | string | yes      | defines unsigned msg                         |
| [Authorization](../storage-provider-rest/README.md#authorization-header) | string | yes      | The authorization string of the HTTP request |

X-Gnfd-Unsigned-Msg header consists of [MsgMigrateBucket](#msgmigratebucket). You can read [Greenfield headers](../storage-provider-rest/README.md) to know how to marshal and unmarshal them.

### MsgMigrateBucket
| ParameterName        | Type                              | Description                                                                                                                                                                                                         |
| ---------------------| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Operator             | string                            | Operator defines the account address of the operator who initial the migrated bucket                                     |
| BucketName           | string                            | BucketName is a globally unique name of bucket.                                                                         |
| DstPrimarySpId       | uint32                            | DstPrimarySpId defines the destination SP for migration                                                                 |
| DstPrimarySpApproval | [Approval](#approval)             | DstPrimarySpApproval is the approval info of the primary SP which indicates that primary sp confirm the user's request. |

### Approval

| ParameterName | Type      | Description                               |
| ------------- | --------- | ----------------------------------------- |
| ExpiredHeight | integer   | ExpiredHeight is expired at which height. |
| Sig           | byteArray | Sig is signature                          |

### RedundancyType

| Value | Description                      |
| ----- | -------------------------------- |
| 0     | Redundancy type is replica type. |
| 1     | Redundancy type is ec type.      |

### VisibilityType

| Value | Description                     |
| ----- | ------------------------------- |
| 0     | Visibility type is unspecified. |
| 1     | Visibility type is public read. |
| 2     | Visibility type is private.     |
| 3     | Visibility type is inherit.     |

:::caution
If the bucket visibility is inherited, it's finally set to private. If the object Visibility is inherited, it's the same as bucket.
:::

## HTTP Request Parameter

### Path Parameter

The request does not have a path parameter.

### Query Parameter

| ParameterName | Type   | Required | Description                                             |
| ------------- | ------ | -------- | ------------------------------------------------------- |
| action        | string | yes      | The action of approval:`MigrateBucket`                  |

### Request Body

The request does not have a request body.

## Request Syntax

```HTTP
GET /greenfield/admin/v1/get-approval?action=action HTTP/1.1
Host: gnfd-testnet-sp*.bnbchain.org
Content-Type: ContentType
X-Gnfd-Unsigned-Msg: UnsignedMsg
Authorization: Authorization
```

## HTTP Response Header

The response returns the following HTTP headers.

| ParameterName                                                             | Type   | Description                           |
| ------------------------------------------------------------------------- | ------ | ------------------------------------- |
| X-Gnfd-Request-ID                                                         | string | defines trace id, trace request in sp |
| [X-Gnfd-Signed-Msg](../storage-provider-rest/README.md#x-gnfd-signed-msg) | string | defines signed msg                    |

## HTTP Response Parameter

### Response Body

If the request is successful, the service sends back an HTTP 200 response.

If you failed to send request to get approval, you will get error response body in [XML](./sp_response.md#sp-error-response).

## Response Syntax

```HTTP
HTTP/1.1 200
X-Gnfd-Request-ID: RequestID
X-Gnfd-Signed-Msg: SignedMsg
```

## Examples

The examples given all use path-style.

### Example 1: Migrate bucket

The following request sends `MigrateBucket` action to get approval.

```HTTP
GET /greenfield/admin/v1/get-approval?action=MigrateBucket HTTP/1.1
Host: gnfd-testnet-sp1.bnbchain.org
Date: Fri, 31 March 2023 17:32:00 GMT
X-Gnfd-Unsigned-Msg: unsigned msg string
Authorization: authorization string
```

### Sample Response: Migrate bucket successfully

```HTTP
HTTP/1.1 200 OK
X-Gnfd-Request-ID: 14779951378820359452
X-Gnfd-Signed-Msg: df5857b2ac67b491ba6d9c6632618be7fb22de13662356b593d74103408cf1af46eed90edaa77bdb65b12fc63ee3bec8314ad7bb0f3ae099ccf7dafe22abff2e01
```

## Example 2: Failed to migrate bucket

The following request sends `MigrateBucket` action to get approval.

```HTTP
GET /greenfield/admin/v1/get-approval?action=MigrateBucket HTTP/1.1
Host: gnfd-testnet-sp1.bnbchain.org
Date: Fri, 31 March 2023 17:32:00 GMT
X-Gnfd-Unsigned-Msg: unsigned msg string
Authorization: authorization string
```

## Sample Response: There is an internal error in SP server

```HTTP
HTTP/1.1 403 Forbidden

<Error>
    <Code>InvalidUnsignedMsg</Code>
    <Message>The uinsigned message is not valid for migrating bucket</Message>
    <RequestId>14379357152578345503</RequestId>
</Error>
```
