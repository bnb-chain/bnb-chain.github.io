---
title: List User Owned Groups
---

# ListUserOwnedGroups

## RESTful API Description

This API is used to retrieve groups where the user is the owner. This API only supports `path-style` requests.

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

| ParameterName | Type    | Required | Description                                                                                                  |
|---------------|---------|----------|--------------------------------------------------------------------------------------------------------------|
| owned-groups  | string  | yes      | user-groups is only used for routing location, and it does not need to pass any value                        |
| limit         | integer | no       | limit defines the maximum number of results that should be returned in response, default 50 and maximum 1000 |
| start-after   | string  | no       | start-after is used to input the group id for pagination purposes                                            |


### Request Body

The request does not have a request body.

## Request Syntax

```HTTP
GET / HTTP/1.1
Host: gnfd-testnet-sp*.bnbchain.org/?owned-groups&start-after=15&limit=1
```

## HTTP Response Header

The response returns the following HTTP headers.

| ParameterName | Type   | Description                 |
| ------------- | ------ | --------------------------- |
| Content-Type  | string | value is `application/xml`  |

## HTTP Response Parameter

| ParameterName | Type  | Description                                      |
| ------------- | ----- | ------------------------------------------------ |
| groups        | array | groups defines the information of the group list |

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

### Example 1: List User Owned Groups

```HTTP
GET /?owned-groups&start-after=1&limit=5 HTTP/1.1
Host: gnfd-testnet-sp1.bnbchain.org
Date: Fri, 31 March 2023 17:32:00 GMT
X-Gnfd-User-Address: user address string
```

### Sample Response: List user groups successfully

```HTTP
HTTP/1.1 200 OK
X-Gnfd-Request-ID: 4208447844380058399
Date: Fri, 31 March 2023 17:32:10 GMT

<?xml version="1.0" encoding="UTF-8"?>
<GfSpGetUserOwnedGroupsResponse>
    <Groups>
        <Group>
            <Owner>0xc3108C8021f85337c71cD267aF2349F1a5638D4B</Owner>
            <GroupName>test-groupxx1</GroupName>
            <SourceType>0</SourceType>
            <Id>10</Id>
            <Extra></Extra>
        </Group>
        <AccountId>0x0000000000000000000000000000000000000000</AccountId>
        <Operator>0x0000000000000000000000000000000000000000</Operator>
        <CreateAt>28749</CreateAt>
        <CreateTime>1692326553</CreateTime>
        <UpdateAt>28749</UpdateAt>
        <UpdateTime>1692326553</UpdateTime>
        <Removed>false</Removed>
        <ExpirationTime>0</ExpirationTime>
    </Groups>
    <Groups>
        <Group>
            <Owner>0xc3108C8021f85337c71cD267aF2349F1a5638D4B</Owner>
            <GroupName>test-groupxx2</GroupName>
            <SourceType>0</SourceType>
            <Id>11</Id>
            <Extra></Extra>
        </Group>
        <AccountId>0x0000000000000000000000000000000000000000</AccountId>
        <Operator>0x0000000000000000000000000000000000000000</Operator>
        <CreateAt>28798</CreateAt>
        <CreateTime>1692326668</CreateTime>
        <UpdateAt>28798</UpdateAt>
        <UpdateTime>1692326668</UpdateTime>
        <Removed>false</Removed>
        <ExpirationTime>0</ExpirationTime>
    </Groups>
</GfSpGetUserOwnedGroupsResponse>
```
