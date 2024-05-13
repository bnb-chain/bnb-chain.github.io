---
title: List Groups Members
---

# ListGroupsMembers

## RESTful API Description

This API is used to query a list of group members by a given group id. This API only supports `path-style` requests.

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

| ParameterName | Type    | Required | Description                                                                                                  |
|---------------|---------|----------|--------------------------------------------------------------------------------------------------------------|
| group-id      | integer | yes      | group-id defines the id of group                                                                             |
| group-members | string  | yes      | group-members is only used for routing location, and it does not need to pass any value                      |
| limit         | integer | no       | limit defines the maximum number of results that should be returned in response, default 50 and maximum 1000 |
| start-after   | string  | no       | start-after is used to input the user's account address for pagination purposes                              |


### Request Body

The request does not have a request body.

## Request Syntax

```HTTP
GET / HTTP/1.1
Host: gnfd-testnet-sp*.bnbchain.org/?group-members&group-id=2&limit=10
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

### Example 1: List Group Members By Group ID

```HTTP
GET /?group-members&group-id=2&limit=10 HTTP/1.1
Host: gnfd-testnet-sp1.bnbchain.org
Date: Fri, 31 March 2023 17:32:00 GMT
X-Gnfd-User-Address: user address string
```

### Sample Response: list group members successfully

```HTTP
HTTP/1.1 200 OK
X-Gnfd-Request-ID: 4208447844380058399
Date: Fri, 31 March 2023 17:32:10 GMT

<?xml version="1.0" encoding="UTF-8"?>
<GfSpGetGroupMembersResponse>
    <Groups>
        <Group>
            <Owner>0x501476714C5F9Ad1a63c7D360e0adCcd090fbdcC</Owner>
            <GroupName>6gycqw0</GroupName>
            <SourceType>0</SourceType>
            <Id>2</Id>
            <Extra></Extra>
        </Group>
        <AccountId>0x83bCec4f184eB9057007FE2634F77eA578819840</AccountId>
        <Operator>0x501476714C5F9Ad1a63c7D360e0adCcd090fbdcC</Operator>
        <CreateAt>7898</CreateAt>
        <CreateTime>1692278055</CreateTime>
        <UpdateAt>7898</UpdateAt>
        <UpdateTime>1692278055</UpdateTime>
        <Removed>false</Removed>
        <ExpirationTime>1692278065</ExpirationTime>
    </Groups>
    <Groups>
        <Group>
            <Owner>0x501476714C5F9Ad1a63c7D360e0adCcd090fbdcC</Owner>
            <GroupName>6gycqw0</GroupName>
            <SourceType>0</SourceType>
            <Id>2</Id>
            <Extra></Extra>
        </Group>
        <AccountId>0xEF3Ccaeb983c4c0ac51b9C691F2F4C2212d3843D</AccountId>
        <Operator>0x501476714C5F9Ad1a63c7D360e0adCcd090fbdcC</Operator>
        <CreateAt>7898</CreateAt>
        <CreateTime>1692278055</CreateTime>
        <UpdateAt>7904</UpdateAt>
        <UpdateTime>1692278069</UpdateTime>
        <Removed>false</Removed>
        <ExpirationTime>1692278080</ExpirationTime>
    </Groups>
</GfSpGetGroupMembersResponse>
```
