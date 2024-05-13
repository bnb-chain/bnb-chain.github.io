---
title: List Groups By IDs
---

# ListGroupsByIDs

## RESTful API Description

This API is used to query a list of group metadata info by group ids. This API only supports `path-style` requests.

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

| ParameterName | Type   | Description                                                                            |
| ------------- | ------ | -------------------------------------------------------------------------------------- |
| groups-query  | string | groups-query is only used for routing location, and it does not need to pass any value |
| ids           | string | ids is a list of group ids with an upper limit of 100                                  |

## Request Syntax

```HTTP
GET / HTTP/1.1
Host: gnfd-testnet-sp*.bnbchain.org?groups-query&ids=1,2
Date: Fri, 31 March 2023 17:32:00 GMT
```

## HTTP Response Header

The response returns the following HTTP headers.

| ParameterName | Type   | Description                 |
| ------------- | ------ | --------------------------- |
| Content-Type  | string | value is `application/xml`  |

## HTTP Response Parameter

| ParameterName | Type  | Description                                         |
| ------------- | ----- | --------------------------------------------------- |
| GroupEntry    | Map   | GroupEntry defines the information of the group map |

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

### Example 1: a list of groups by group ids

```HTTP
GET /?groups-query&ids=1,2,333 HTTP/1.1
Host: gnfd-testnet-sp1.bnbchain.org
Date: Fri, 31 March 2023 17:32:00 GMT
```

### Sample Response: Query a list of groups by group ids successfully

```HTTP
HTTP/1.1 200 OK
X-Gnfd-Request-ID: 4208447844380058399
Date: Fri, 31 March 2023 17:32:10 GMT

<?xml version="1.0" encoding="UTF-8"?>
<GfSpListGroupsByIDsResponse>
    <GroupEntry>
        <Id>333</Id>
        <Value>
            <Group>
                <Owner>0x853e215E614A79e4674AbA0C1bB0b0d53AE29418</Owner>
                <GroupName>ho5fuia</GroupName>
                <SourceType>0</SourceType>
                <Id>333</Id>
                <Extra></Extra>
            </Group>
            <Operator>0x0000000000000000000000000000000000000000</Operator>
            <CreateAt>701242</CreateAt>
            <CreateTime>1694091719</CreateTime>
            <UpdateAt>701242</UpdateAt>
            <UpdateTime>1694091719</UpdateTime>
            <NumberOfMembers>0</NumberOfMembers>
            <Removed>false</Removed>
        </Value>
    </GroupEntry>
    <GroupEntry>
        <Id>2</Id>
    </GroupEntry>
    <GroupEntry>
        <Id>1</Id>
        <Value>
            <Group>
                <Owner>0x886EDBbe3A955AB3126A4cCB9C37f56A4e0429f7</Owner>
                <GroupName>wk05g1x</GroupName>
                <SourceType>0</SourceType>
                <Id>1</Id>
                <Extra></Extra>
            </Group>
            <Operator>0x0000000000000000000000000000000000000000</Operator>
            <CreateAt>68433</CreateAt>
            <CreateTime>1692582613</CreateTime>
            <UpdateAt>68433</UpdateAt>
            <UpdateTime>1692582613</UpdateTime>
            <NumberOfMembers>0</NumberOfMembers>
            <Removed>false</Removed>
        </Value>
    </GroupEntry>
</GfSpListGroupsByIDsResponse>
```
