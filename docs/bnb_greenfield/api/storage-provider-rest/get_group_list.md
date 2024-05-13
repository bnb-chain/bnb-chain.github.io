---
title: List Groups By Name And Prefix
---

# ListGroupsByNameAndPrefix

## RESTful API Description

This API is used to query a list of group by given prefix/name/source-type. This API only supports `path-style` requests.

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

| ParameterName | Type    | Required | Description                                                                                                                                                                                                                                |
| ------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| group-query   | string  | yes      | group-query is only used for routing location, and it does not need to pass any value                                                                                                                                                      |
| name          | string  | yes      | name defines the name to be searched in the group records                                                                                                                                                                                  |
| prefix        | string  | yes      | prefix the prefix of the group name,    if you search with 'app%coin', the system will return groups that start with 'app' and have 'coin' anywhere in the rest of the string, like 'applicationcoin', 'app_bitcoin', 'app123coinabc', etc |
| source-type   | string  | no       | source-type must in SOURCE_TYPE_ORIGIN SOURCE_TYPE_BSC_CROSS_CHAIN SOURCE_TYPE_MIRROR_PENDING                                                                                                                                              |
| limit         | integer | no       | limit defines the maximum number of results that should be returned in response, default 50 and maximum 1000                                                                                                                               |
| offset        | integer | no       | offset defines the position in the list from where to start returning results, default 0 and maximum 100000                                                                                                                                |

### Request Body

The request does not have a request body.

## Request Syntax

```HTTP
GET / HTTP/1.1
Host: gnfd-testnet-sp*.bnbchain.org
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
| count         | array | count defines the total groups amount            |

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

### Example 1: List Groups By Name And Prefix

```HTTP
GET /?group-query&source-type=SOURCE_TYPE_ORIGIN&limit=10&offset=100&name=e&prefix=t HTTP/1.1
Host: gnfd-testnet-sp1.bnbchain.org
Date: Fri, 31 March 2023 17:32:00 GMT
X-Gnfd-User-Address: user address string
```

### Sample Response: Get Group lists successfully

```HTTP
HTTP/1.1 200 OK
X-Gnfd-Request-ID: 4208447844380058399
Date: Fri, 31 March 2023 17:32:10 GMT

<?xml version="1.0" encoding="UTF-8"?>
<GfSpGetGroupListResponse>
    <Groups>
        <Group>
            <Owner>0xc3108C8021f85337c71cD267aF2349F1a5638D4B</Owner>
            <GroupName>test-groupxx1</GroupName>
            <SourceType>0</SourceType>
            <Id>10</Id>
            <Extra></Extra>
        </Group>
        <Operator>0x0000000000000000000000000000000000000000</Operator>
        <CreateAt>28749</CreateAt>
        <CreateTime>1692326553</CreateTime>
        <UpdateAt>28749</UpdateAt>
        <UpdateTime>1692326553</UpdateTime>
        <Removed>false</Removed>
    </Groups>
    <Groups>
        <Group>
            <Owner>0xc3108C8021f85337c71cD267aF2349F1a5638D4B</Owner>
            <GroupName>test-groupxx2</GroupName>
            <SourceType>0</SourceType>
            <Id>11</Id>
            <Extra></Extra>
        </Group>
        <Operator>0x0000000000000000000000000000000000000000</Operator>
        <CreateAt>28798</CreateAt>
        <CreateTime>1692326668</CreateTime>
        <UpdateAt>28798</UpdateAt>
        <UpdateTime>1692326668</UpdateTime>
        <Removed>false</Removed>
    </Groups>
    <Groups>
        <Group>
            <Owner>0x6633Ae37f10991Da203978642004234e011CbfcC</Owner>
            <GroupName>test-groupxj1</GroupName>
            <SourceType>0</SourceType>
            <Id>13</Id>
            <Extra></Extra>
        </Group>
        <Operator>0x0000000000000000000000000000000000000000</Operator>
        <CreateAt>32457</CreateAt>
        <CreateTime>1692335183</CreateTime>
        <UpdateAt>32457</UpdateAt>
        <UpdateTime>1692335183</UpdateTime>
        <Removed>false</Removed>
    </Groups>
    <Groups>
        <Group>
            <Owner>0x6633Ae37f10991Da203978642004234e011CbfcC</Owner>
            <GroupName>test-groupxj2</GroupName>
            <SourceType>0</SourceType>
            <Id>14</Id>
            <Extra></Extra>
        </Group>
        <Operator>0x0000000000000000000000000000000000000000</Operator>
        <CreateAt>32477</CreateAt>
        <CreateTime>1692335229</CreateTime>
        <UpdateAt>32672</UpdateAt>
        <UpdateTime>1692335683</UpdateTime>
        <Removed>false</Removed>
    </Groups>
    <Groups>
        <Group>
            <Owner>0x6633Ae37f10991Da203978642004234e011CbfcC</Owner>
            <GroupName>test-groupxj3</GroupName>
            <SourceType>0</SourceType>
            <Id>15</Id>
            <Extra></Extra>
        </Group>
        <Operator>0x0000000000000000000000000000000000000000</Operator>
        <CreateAt>32511</CreateAt>
        <CreateTime>1692335309</CreateTime>
        <UpdateAt>32677</UpdateAt>
        <UpdateTime>1692335695</UpdateTime>
        <Removed>false</Removed>
    </Groups>
    <Groups>
        <Group>
            <Owner>0x6633Ae37f10991Da203978642004234e011CbfcC</Owner>
            <GroupName>test-groupxj4</GroupName>
            <SourceType>0</SourceType>
            <Id>16</Id>
            <Extra></Extra>
        </Group>
        <Operator>0x0000000000000000000000000000000000000000</Operator>
        <CreateAt>32514</CreateAt>
        <CreateTime>1692335316</CreateTime>
        <UpdateAt>32514</UpdateAt>
        <UpdateTime>1692335316</UpdateTime>
        <Removed>false</Removed>
    </Groups>
    <Groups>
        <Group>
            <Owner>0x6633Ae37f10991Da203978642004234e011CbfcC</Owner>
            <GroupName>test-groupxj5</GroupName>
            <SourceType>0</SourceType>
            <Id>17</Id>
            <Extra></Extra>
        </Group>
        <Operator>0x0000000000000000000000000000000000000000</Operator>
        <CreateAt>32517</CreateAt>
        <CreateTime>1692335323</CreateTime>
        <UpdateAt>32517</UpdateAt>
        <UpdateTime>1692335323</UpdateTime>
        <Removed>false</Removed>
    </Groups>
    <Count>7</Count>
</GfSpGetGroupListResponse>
```
