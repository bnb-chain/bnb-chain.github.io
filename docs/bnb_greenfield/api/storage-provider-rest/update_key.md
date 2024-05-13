---
title: Update User Account Key
---

# UpdateKey 

## RESTful API Description

This API is used to update the current user account key record.

See [off-chain authentication specification](../../guide/storage-provider/modules/authenticator.md)

## HTTP Request Format

| Description | Definition                    |
| ----------- |-------------------------------|
| Host        | gnfd-testnet-sp*.bnbchain.org |
| Path        | /auth/update_key_v2           |
| Method      | POST                          |

## HTTP Request Header

| ParameterName             | Type   | Required | Description                                                                                                                                                                                                 |
|---------------------------| ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Origin                    | string | yes      | the origin value , which should be the same as app's domain                                                                                                                                                 |
| X-Gnfd-App-Domain         | string | yes      | app domain for the account key                                                                                                                                                                              |
| X-Gnfd-App-Reg-Public-Key | string | yes      | the account key needed to update                                                                                                                                                                            |
| X-Gnfd-Expiry-Timestamp   | string | yes      | It defines the Expiry-Date is the ISO 8601 datetime string (e.g. 2021-09-30T16:25:24Z), used to register the EDDSA public key. This expire date should be future timestamp but within **7 days** since now. |
| Authorization             | string | yes      | see [Authorization Header](#authorization-header)                                                                                                                                                           |

### Authorization Header

The Authorization Header could be composed of 3 parts.

#### Auth type

Update_key API expects `GNFD1-ETH-PERSONAL_SIGN` as [authentication type](README.md#authentication-type) in HTTP Authorization header.

#### SignedMsg

Application needs to popup wallet to let users sign for a text, which includes user's `EdDSA public key`, `Expiration Time` for SPs and other related information, so that users can understand what they sign for.

The text message to be signed by users can be formalized by following template:

```js
var app_domain = "https://greenfield.dapp.cc"
var account_address = "0x3d0a49B091ABF8940AD742c0139416cEB30CdEe0"
var public_key = "4db642fe6bc2ceda2e002feb8d78dfbcb2879d8fe28e84e02b7a940bc0440083"
var issue_time = "2023-04-28T16:25:24Z"
var expiry_time = "2023-04-28T16:25:24Z"
var sp_addr1 = "0x70d1983A9A76C8d5d80c4cC13A801dc570890819"   // SP operator address
var sp_name1 = "SP_001" // SP name, can be found in https://greenfieldscan.com

var sp_addr2 = "0x20Bb76D063a6d2B18B6DaBb2aC985234a4B9eDe0"   // SP operator address
var sp_name2 = "SP_002" // SP name, can be found in https://greenfieldscan.com

var unSignedMsgTemplate = 
`${app_domain} wants you to sign in with your BNB Greenfield account:
${account_address}

Register your identity public key ${public_key}

URI: ${app_domain}
Version: 1
Chain ID: 5600
Issued At: ${issue_time}
Expiration Time: ${expiry_time}

// You can append single or multiple SP information under Resources section

```

#### Signature

The Signature is calculated by wallet after users sign with above `SignedMsg` in their wallet.
e.g. `0x8663c48cfecb611d64540d3b653f51ef226f3f674e2c390ea9ca45746b22a4f839a15576b5b4cc1051183ae9b69ac54160dc3241bbe99c695a52fe25eaf2f8c01b`

#### Example

Below is an example:

```HTTP
Authorization: GNFD1-ETH-PERSONAL_SIGN,SignedMsg=https://greenfield.dapp.cc wants you to sign in with your BNB Greenfield account:\n0x3d0a49B091ABF8940AD742c0139416cEB30CdEe0\n\nRegister your identity public key 4db642fe6bc2ceda2e002feb8d78dfbcb2879d8fe28e84e02b7a940bc0440083\n\nURI: https://greenfield.dapp.cc\nVersion: 1\nChain ID: 5600\nIssued At: 2023-04-24T16:25:24Z\nExpiration Time: 2023-04-28T16:25:24Z
```

## HTTP Request Parameter

### Path Parameter

The request does not have a path parameter.

### Query Parameter

The request does not have a query parameter.
### Request Body

The request does not have a request body.

## Request Syntax

```HTTP
POST /auth/update_key HTTP/1.1
Host: gnfd-testnet-sp*.bnbchain.org
Origin: Origin
x-Gnfd-User-Address: UserAddress
X-Gnfd-App-Domain: AppDomain
X-Gnfd-App-Reg-Public-Key: PublicKey
X-Gnfd-Expiry-Timestamp: ExpiryDate
Authorization: AuthorizationString
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

| ParameterName | Type    | Description                                                   |
| ------------- | ------- |---------------------------------------------------------------|
| Result        | boolean | indicate if the user public key is successfully updated in SP |

## Response Syntax

```HTTP
HTTP/1.1 200
Content-Type: application/xml

XML Body
```

## Examples

### Example 1: Update key for a new combination of user address and app domain

#### request

```HTTP
POST /auth/update_key HTTP/1.1
Host: gf-stagenet-sp-e.bk.nodereal.cc
Origin: https://greenfield.dapp.cc
X-Gnfd-App-Domain: https://greenfield.dapp.cc
x-Gnfd-User-Address: 0x3d0a49B091ABF8940AD742c0139416cEB30CdEe0
X-Gnfd-App-Reg-Public-Key: 4db642fe6bc2ceda2e002feb8d78dfbcb2879d8fe28e84e02b7a940bc0440083
X-Gnfd-Expiry-Timestamp: 2023-04-28T16:25:24Z
Authorization: GNFD1-ETH-PERSONAL_SIGN,SignedMsg=https://greenfield.dapp.cc wants you to sign in with your BNB Greenfield account:\n0x3d0a49B091ABF8940AD742c0139416cEB30CdEe0\n\nRegister your identity public key 4db642fe6bc2ceda2e002feb8d78dfbcb2879d8fe28e84e02b7a940bc0440083\n\nURI: https://greenfield.dapp.cc\nVersion: 1\nChain ID: 5600\nIssued At: 2023-04-24T16:25:24Z\nExpiration Time: 2023-04-28T16:25:24Z
```

#### response

```xml
<UpdateUserPublicKeyV2Resp>
    <result>true</result>
</UpdateUserPublicKeyV2Resp>
```
