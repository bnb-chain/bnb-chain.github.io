---
title: List Object Policies
---

#  ListObjectPolicies

## RESTful API Description

This API is used to list object policies by specific action type. And it supports both `virtual-hosted-style` and `path-style` requests.

## HTTP Request Format

| Description                | Definition                                |
| -------------------------- | ----------------------------------------- |
| Host(virtual-hosted-style) | BucketName.gnfd-testnet-sp*.bnbchain.org |
| Path(virtual-hosted-style) | /:object                                  |
| Method                     | GET                                       |

## HTTP Request Header

## HTTP Request Parameter

### Path Parameter

| ParameterName | Type   | Description                       |
| ------------- | ------ | --------------------------------- |
| object        | string | object defines the name of object.|

### Query Parameter

| ParameterName   | Type               | Required | Description                                                                                                                                                                          |
| --------------- | ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| object-policies | string             | yes      | object-policies is only used for routing location, and it does not need to pass any value.                                                                                           |
| limit           | string             | no       | limit  determines the number of policies data records to be returned. If the limit is set to 0, it will default to 50. If the limit exceeds 1000, only 1000 records will be returned.|
| start-after     | string             | no       | start-after is used to input the policy id for pagination purposes.                                                                                                                  |
| action-type     | [ActionType](#actiontype)  | yes      | action-type defines the requested action type of permission.                                                                                                                         |

### Request Body

The request does not have a request body.

## Request Syntax

```HTTP
GET / HTTP/1.1
Host: gnfd-testnet-sp*.bnbchain.org/?object-policies
```

## HTTP Response Header

The response returns the following HTTP headers.

| ParameterName | Type   | Description                 |
| ------------- | ------ | --------------------------- |
| Content-Type  | string | value is `application/xml`  |

## HTTP Response Parameter

| ParameterName   | Type                               | Description                                                     |
| --------------- | ---------------------------------- | --------------------------------------------------------------- |
| Policies        | [Policies](#policies)              | policies defines object policies info.                          |

### ActionType

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

### Policies

| ParameterName  | Type                              | Description                                                                                                                    |
| -------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| PrincipalType  | [PrincipalType](#principaltype)    | PrincipalType refers to the identity type of system users or entities.                                                         |
| PrincipalValue | string                            | PrincipalValue defines the value of principal.                                                                                 |
| ResourceType   | [ResourceType](#resourcetype)      | ResourceType defines the type of resource that grants permission for.                                                          |
| ResourceId     | string                            | ResourceId defines the bucket/object/group id of the resource that grants permission for.                                      |
| CreateTimestamp| uint64                            | CreateTimestamp defines the create time of permission.                                                                         |
| UpdateTimestamp| uint64                            | UpdateTimestamp defines the update time of permission.                                                                         |
| ExpirationTime | uint64                            | ExpirationTime defines the expiration time of permission. if it is 0, which means there is no expiration time for this policy. |

### PrincipalType

| Value | Description                |
| ----- | -------------------------- |
| 0     | PRINCIPAL_TYPE_UNSPECIFIED |
| 1     | PRINCIPAL_TYPE_GNFD_ACCOUNT|
| 2     | PRINCIPAL_TYPE_GNFD_GROUP  |

### ResourceType

| Value | Description                |
| ----- | -------------------------- |
| 0     | RESOURCE_TYPE_UNSPECIFIED  |
| 1     | RESOURCE_TYPE_BUCKET       |
| 2     | RESOURCE_TYPE_OBJECT       |
| 3     | RESOURCE_TYPE_GROUP        |

### Response Body

If the request is successful, the service sends back an HTTP 200 response.

If you failed to send request, you will get error response body in [XML](./sp_response.md#sp-error-response).

## Response Syntax

```HTTP
HTTP/1.1 200

XML Body
```

## Examples

### Example 1: List Object Policies

```HTTP
GET / HTTP/1.1
Host: rzigw.gnfd-testnet-sp1.bnbchain.org/2g36fzmd65?object-policies&limit=10&action-type=6
Date: Fri, 31 March 2023 17:32:00 GMT
```

### Sample Response: Query the object policies successfully

```HTTP
HTTP/1.1 200 OK
X-Gnfd-Request-ID: 4208447844380058399
Date: Fri, 31 March 2023 17:32:10 GMT

<?xml version="1.0" encoding="UTF-8"?>
<GfSpListObjectPoliciesResponse>
    <Policies>
        <PrincipalType>1</PrincipalType>
        <PrincipalValue>0xF79056FBaa7345052F25c3a7618D0AA41CA472A2</PrincipalValue>
        <ResourceType>2</ResourceType>
        <ResourceId>0x0000000000000000000000000000000000000000000000000000000000459eaf</ResourceId>
        <CreateTimestamp>1701144192</CreateTimestamp>
        <UpdateTimestamp>0</UpdateTimestamp>
        <ExpirationTime>1717128173</ExpirationTime>
    </Policies>
</GfSpListObjectPoliciesResponse>
```
