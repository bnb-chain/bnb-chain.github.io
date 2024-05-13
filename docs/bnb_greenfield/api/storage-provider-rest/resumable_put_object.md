---
title: Resumable Put Object
---

# ResumablePutObject

## RESTful API Description

This API is used to upload an object to Greenfield SP. It serves for two types of upload, either a new object which is just created or to update an existing object.
And it supports both `virtual-hosted-style` and `path-style` requests.

## HTTP Request Format

| Desscription               | Definition                                |
| -------------------------- | ----------------------------------------- |
| Host(virtual-hosted-style) | BucketName.gnfd-testnet-sp*.bnbchain.org |
| Path(path-style)           | /ObjectName                               |
| Method                     | POST                                      |

## HTTP Request Header

| ParameterName                                   | Type   | Required | Description                                                                                        |
| ----------------------------------------------- | ------ | -------- | -------------------------------------------------------------------------------------------------- |
| [Authorization](README.md#authorization-header) | string | yes      | The authorization string of the HTTP request                                                       |
| Content-Type                                    | string | no       | The Content-Type representation header is used to indicate the original media type of the resource |
| Content-Length                                  | string | no       | The Content-Length header indicates the size of the message body, in bytes, sent to the recipient. |

`Content-Type` is determined by specific object, such as the content type of image could be image/jpeg.

## HTTP Request Parameter

### Path Parameter

The request does not have a path parameter.

### Query Parameter

| ParameterName | Type   | Required | Description                                                                                                                  |
| ------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| offset        | long   | no       | The offset of the chunk in the entire file, if the breakpoint is resumed, you can use the query interface to get the offset. |
| complete      | string | no       | True if the last piece, not false.                                                                                           |

### Request Body

The request body is a binary data that you want to store in Greenfield SP.

## Request Syntax

```HTTP
POST /${bucketName}/${objectName}?offset=${offset}&complete=${complete} HTTP/1.1
Host: $(host)
Content-Length: ${length}
Content-Type: ${contentType}
Content-MD5: ${md5}

<data of body>
```

## HTTP Response Header

The response returns the following HTTP headers.

| ParameterName     | Type   | Description                           |
| ----------------- | ------ | ------------------------------------- |
| X-Gnfd-Request-ID | string | defines trace id, trace request in sp |
| Etag              | string | Entity tag for the uploaded object    |

## HTTP Response Parameter

### Response Body

If the request is successful, the service sends back an HTTP 200 response.

If you failed to send request to get approval, you will get error response body in [XML](./sp_response.md#sp-error-response).

## Response Syntax

```HTTP
HTTP/1.1 200
X-Gnfd-Request-ID: RequestID
Etag: Etag
```

## Examples

The examples given all use virtual-hosted-style.

### Example 1: Upload an object

```HTTP
PUT /my-image.jpg HTTP/1.1
Host: myBucket.gnfd-testnet-sp*.bnbchain.org
url[/bucket/object?complete=false&offset=0]
Date: Fri, 31 March 2023 17:32:00 GMT
Authorization: authorization string
Content-Type: image/jpeg
Content-Length: 11434
X-Gnfd-Txn-Hash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
[11434 bytes of object data]
```

### Sample Response: Upload an object successfully

```HTTP
HTTP/1.1 200 OK
X-Gnfd-Request-ID: 4208447844380058399
Date: Fri, 31 March 2023 17:32:10 GMT
ETag: "1b2cf535f27731c974343645a3985328"
Content-Length: 11434
```

# DelegateResumablePutObject

## RESTful API Description

This API is used to delegate upload an object to Greenfield SP. It serves for two types of upload, either a new object which is just created or to update an existing object.
And it supports both `virtual-hosted-style` and `path-style` requests.

## HTTP Request Format

| Desscription               | Definition                                |
| -------------------------- | ----------------------------------------- |
| Host(virtual-hosted-style) | BucketName.gnfd-testnet-sp*.bnbchain.org |
| Path(path-style)           | /ObjectName                               |
| Method                     | POST                                      |

## HTTP Request Header

| ParameterName                                   | Type   | Required | Description                                                                                        |
| ----------------------------------------------- | ------ | -------- | -------------------------------------------------------------------------------------------------- |
| [Authorization](README.md#authorization-header) | string | yes      | The authorization string of the HTTP request                                                       |
| Content-Type                                    | string | no       | The Content-Type representation header is used to indicate the original media type of the resource |
| Content-Length                                  | string | no       | The Content-Length header indicates the size of the message body, in bytes, sent to the recipient. |

`Content-Type` is determined by specific object, such as the content type of image could be image/jpeg.

## HTTP Request Parameter

### Path Parameter

The request does not have a path parameter.

### Query Parameter

| ParameterName | Type   | Required | Description                                                                                                                  |
| ------------- | ------ |----------|------------------------------------------------------------------------------------------------------------------------------|
| offset        | long   | no       | The offset of the chunk in the entire file, if the breakpoint is resumed, you can use the query interface to get the offset. |
| complete      | string | no       | True if the last piece, not false.                                                                                           |
| delegate      | string | yes      | The identity of the delegate upload request                                                                                  |
| is_update     | bool   | no       | Whether to delegate the request for the update                                                                               |
| payload_size  | uint64 | yes      | the payload size of object                                                                                                   |
| visibility    | int    | no       | the visibility  of object                                                                                                    |

### Request Body

The request body is a binary data that you want to store in Greenfield SP.

## Request Syntax

```HTTP
POST /${bucketName}/${objectName}?delegate&&is_update=${is_update}&payload_size=${payload_size}&visibility=${visibility}&offset=${offset}&complete=${complete} HTTP/1.1
Host: $(host)
Content-Length: ${length}
Content-Type: ${contentType}
Content-MD5: ${md5}

<data of body>
```

## HTTP Response Header

The response returns the following HTTP headers.

| ParameterName     | Type   | Description                           |
| ----------------- | ------ | ------------------------------------- |
| X-Gnfd-Request-ID | string | defines trace id, trace request in sp |
| Etag              | string | Entity tag for the uploaded object    |

## HTTP Response Parameter

### Response Body

If the request is successful, the service sends back an HTTP 200 response.

If you failed to send request to get approval, you will get error response body in [XML](./sp_response.md#sp-error-response).

## Response Syntax

```HTTP
HTTP/1.1 200
X-Gnfd-Request-ID: RequestID
Etag: Etag
```

## Examples

The examples given all use virtual-hosted-style.

### Example 1: Upload an object

```HTTP
PUT /my-image.jpg HTTP/1.1
Host: myBucket.gnfd-testnet-sp*.bnbchain.org
url[/bucket/object?delegate&is_update=false&payload_size=1&visibility=1&complete=false&offset=0]
Date: Fri, 31 March 2023 17:32:00 GMT
Authorization: authorization string
Content-Type: image/jpeg
Content-Length: 11434
X-Gnfd-Txn-Hash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
[11434 bytes of object data]
```

### Sample Response: Upload an object successfully

```HTTP
HTTP/1.1 200 OK
X-Gnfd-Request-ID: 4208447844380058399
Date: Fri, 31 March 2023 17:32:10 GMT
ETag: "1b2cf535f27731c974343645a3985328"
Content-Length: 11434
```
