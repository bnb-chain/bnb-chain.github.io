---
title: List User Payment Accounts
---

# ListUserPaymentAccounts

## RESTful API Description

This API is used to list user payment info. This API only supports `path-style` requests.

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

| ParameterName   | Type    | Required | Description                                                                             |
| --------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| user-payments   | string  | yes      | user-payments is only used for routing location, and it does not need to pass any value |

### Request Body

The request does not have a request body.

## Request Syntax

```HTTP
GET / HTTP/1.1
Host: gnfd-testnet-sp*.bnbchain.org/?user-payments
X-Gnfd-User-Address: Address
```

## HTTP Response Header

The response returns the following HTTP headers.

| ParameterName | Type   | Description                 |
| ------------- | ------ | --------------------------- |
| Content-Type  | string | value is `application/xml`  |

## HTTP Response Parameter

| ParameterName   | Type                               | Description                                                     |
| --------------- | ---------------------------------- | --------------------------------------------------------------- |
| PaymentAccounts | [PaymentAccounts](#paymentaccounts)| payment account defines payment account info                    |
| StreamRecord    | [StreamRecord](#streamrecord)      | stream record defines stream payment record of a stream account |

### PaymentAccounts

| ParameterName  | Type                              | Description                                                                                                                        |
| -------------- | -------| -----------------------------------------------------------------|
| Owner          | string | Owner defines the owner of this payment account                  |
| Address        | string | Address defines the address of payment account                   |
| Refundable     | bool   | Refundable defines the payment account is refundable or not      |
| UpdateAt       | int64  | UpdateAt defines the update block height of this payment account |
| UpdateTime     | int64  | UpdateTime  defines the update time of this payment account      |

### StreamRecord

| ParameterName     | Type                                        | Description                                                                                                             |
| ----------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Account           | string                                      | Account is the account address                                                                                          |
| CrudTimestamp     | int64                                       | CrudTimestamp defines latest update timestamp of the stream record                                                      |
| NetflowRate       | big.Int                                     | NetflowRate defines the per-second rate that an account's balance is changing.                                          |
| StaticBalance     | big.Int                                     | StaticBalance defines the balance of the stream account at the latest CRUD timestamp                                    |
| BufferBalance     | big.Int                                     | BufferBalance defines reserved balance of the stream account                                                            |
| LockBalance       | big.Int                                     | LockBalance defines the locked balance of the stream account after it puts a new object and before the object is sealed |
| Status            | [StreamAccountStatus](#streamaccountstatus) | Status defines the status of the stream account                                                                         |
| SettleTimestamp   | int64                                       | SettleTimestamp defines the unix timestamp when the stream account will be settled                                      |
| OutFlowCount      | uint64                                      | OutFlowCount defines the count of its out flows                                                                         |
| FrozenNetflowRate | big.Int                                     | FrozenNetflowRate defines the frozen netflow rate, which is used when resuming stream account                           |

### StreamAccountStatus

| Value | Description                                                                |
| ----- | -------------------------------------------------------------------------- |
| 0     | STREAM_ACCOUNT_STATUS_ACTIVE defines the active status of a stream account |
| 1     | STREAM_ACCOUNT_STATUS_FROZEN defines the frozen status of a stream account |

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

### Example 1: List user payment accounts

```HTTP
GET / HTTP/1.1
Host: gnfd-testnet-sp1.bnbchain.org/?user-payments
Date: Fri, 31 March 2023 17:32:00 GMT
X-Gnfd-User-Address: user address string
```

### Sample Response: Query a user's buckets successfully

```HTTP
HTTP/1.1 200 OK
X-Gnfd-Request-ID: 4208447844380058399
Date: Fri, 31 March 2023 17:32:10 GMT

<?xml version="1.0" encoding="UTF-8"?>
<GfSpListUserPaymentAccountsResponse>
    <PaymentAccounts>
        <PaymentAccount>
            <Address>0x6663bf6b1330AA214cD3d6C224f3d0396758A45a</Address>
            <Owner>0x84A0d38d64498414B14cD979159D57557345Cd8B</Owner>
            <Refundable>true</Refundable>
            <UpdateAt>405149</UpdateAt>
            <UpdateTime>1693376984</UpdateTime>
        </PaymentAccount>
        <StreamRecord>
            <Account>0x0000000000000000000000000000000000000000</Account>
            <CrudTimestamp>0</CrudTimestamp>
            <NetflowRate>0</NetflowRate>
            <StaticBalance>0</StaticBalance>
            <BufferBalance>0</BufferBalance>
            <LockBalance>0</LockBalance>
            <Status>0</Status>
            <SettleTimestamp>0</SettleTimestamp>
            <OutFlowCount>0</OutFlowCount>
            <FrozenNetflowRate>0</FrozenNetflowRate>
        </StreamRecord>
    </PaymentAccounts>
</GfSpListUserPaymentAccountsResponse>
```
