# Greenfield SP RESTful APIs

## Authorization header

`Authortization` header is an array which contains four parts: authentication type, encryption algorithm type, signed message and signature. The following will be explained separately.

### Authentication type

Authentication type represents which authentication mode the users want to use. Now there are three supported authentication modes: `GNFD1-ECDSA`, `GNFD1-ETH-PERSONAL_SIGN`, `GNFD2-EDDSA`.

`GNFD1-ECDSA` require users to use `private key` for authentication. This mode is used in `greenfield-go-sdk`. We recommend users using this mode when calling Greenfield SP RESTful APIs.

`GNFD1-ETH-PERSONAL_SIGN` is used for verify wallet personal signature from a certain dapp website, which is not able to access users' `private key` but can interact with users by using wallets. This mode is currently only used to register the following `GNFD2-EDDSA` user public key, from web apps to SP servers.

`GNFD2-EDDSA` Once the dapp and user set up the "off chain auth" user account key in SPs (see [details](../../guide/storage-provider/modules/authenticator.md)) , users can communicate with SP without needing to make any explicit signature for most interactions (e.g. download private files, get SP approvals when create objects/buckets)

### Encryption algorithm type
For `GNFD1-ECDSA` auth type, Greenfield SP RESTful APIs use `ECDSA-secp256k1` to sign `SignedMsg` field to get `Signature` field. Users can refer the following library to generate `Signature` field:

- [secp256k1](https://github.com/cosmos/cosmos-sdk/tree/main/crypto/keys/secp256k1)

For `GNFD2-EDDSA` auth type, Greenfield SP RESTful APIs use `Edwards-curve Digital Signature Algorithm` to sign `SignedMsg` field to get `Signature` field.
The EdDSA elliptic curve is Ed25519. 
Users can refer the following library to generate `Signature` field:

- [greenfield go sdk] https://github.com/bnb-chain/greenfield-go-sdk/blob/a21d3b5eb75a211266105ea78ad1c76fcdc87c4d/client/api_off_chain_auth.go#L37-L41
- [greenfield js sdk] https://github.com/bnb-chain/greenfield-js-sdk/blob/9d4463b2b0d845c56ce2093eab15c15fb2ba4787/packages/js-sdk/src/clients/spclient/auth.ts#L69-L70

### The step of generating authorization header
1. Add a `X-Gnfd-Expiry-Timestamp` header into request, to define the expiry timestamp for the generated signature in the authorization headers.
   It defines the Expiry-Date is the ISO 8601 datetime string (e.g. 2021-09-30T16:25:24Z), used to register the EDDSA public key. This expiry date should be future timestamp but within **7 days** since now.

   See example code at:
   https://github.com/bnb-chain/greenfield-go-sdk/blob/e6b5db6bf98e6b9b6a7a20be39d6342381a9ccd4/client/api_client.go#L426-L430

2. Create a canonical request
Create a canonical request by concatenating the following strings, separated by newline characters. This helps ensure that the signature that you calculate and the signature that Greenfield SP calculates can match.

   ```shell
   HTTPMethod
   CanonicalUri
   CanonicalQueryString
   CanonicalHeaders
   SignedHeaders
   ```
   - HTTPMethod: The HTTP method.
   - CanonicalUri: The URI-encoded version of the absolute path component URL (everything between the host and the question mark character (?) that starts the query string parameters). If the absolute path is empty, use a forward slash character `/`.
   - CanonicalQueryString – The URL-encoded query string parameters, separated by ampersands (&). Percent-encode reserved characters, including the space character. Encode names and values separately. If there are empty parameters, append the equals sign to the parameter name before encoding. After encoding, sort the parameters alphabetically by key name. If there is no query string, use an empty string `""`.
   - CanonicalHeaders – The request headers, that will be signed, and their values, separated by newline characters. Header names must use lowercase characters, must appear in alphabetical order, and must be followed by a colon `:`. For the values, trim any leading or trailing spaces, convert sequential spaces to a single space, and separate the values for a multi-value header using commas. You must include the host header (HTTP/1.1) or any x-gnfd-* headers in the signature. You can optionally include other standard headers in the signature, such as content-type.
   - SignedHeaders – The list of headers that you included in CanonicalHeaders, separated by semicolons `;`. This indicates which headers are part of the signing process. Header names must use lowercase characters and must appear in alphabetical order.

   See example code at:
   https://github.com/bnb-chain/greenfield-common/blob/8bcfd1ccaf6a8ffc3404abc48260d1f4c7f436b2/go/http/gen_sign_str.go#L75-L86

3. Create a hash of the canonical request
The hash of the canonical request is a slice of byte. Second use `Keccak256` algorithm to get Keccak256 hash.

   See example code at:
   https://github.com/bnb-chain/greenfield-common/blob/8bcfd1ccaf6a8ffc3404abc48260d1f4c7f436b2/go/http/gen_sign_str.go#L100-L102

4. Calculate the signature
After you create the string to sign, you are ready to calculate the signature for the authentication information that you'll add to your request. Use your private key, [secp256k1](https://github.com/cosmos/cosmos-sdk/tree/main/crypto/keys/secp256k1) to generate Signature.And you should convert this to lowercase hexadecimal characters.

   SP verifies the Authorization signature content to obtain the sender's address and check the sender's permission.
   - For auth type `GNFD1-ECDSA`  
   [Ethereum-secp256k1](https://github.com/ethereum/go-ethereum/tree/master/crypto/secp256k1) lib provides two functions: RecoverPubkey and VerifySignature that helps recover user address and whether data has been tampered with.

   - For auth type `GNFD2-EDDSA`  
   [noble-ed25519](https://github.com/paulmillr/noble-ed25519?tab=readme-ov-file#usage) lib provides a sign/verify functions that helps check if users' signature matches their public key registered in SP previously.

### Authorization header example
#### For auth type `GNFD1-ECDSA`
```shell
Authorization = auth_type + "," + Signature
string-to-sign = crypto.Keccak256(canonical)
Signature = privateKey.secp256k1-Sign(string-to-sign)
Authorization: GNFD1-ECDSA, Signature=53e2f098411c5df46b71111337a5cf48bf254ba4a8516996445626619c4f10ac57a5ba081154272ed9e0334a338db39bf74f6de0f3c252fd27890fb81cffd29d00
X-Gnfd-Expiry-Timestamp: 2023-10-18T03:20:04Z
```

#### For auth type `GNFD2-EDDSA`
```shell
Authorization = auth_type + "," + Signature
string-to-sign = crypto.Keccak256(canonical)
Signature = privateKey.EdDSA-Sign(string-to-sign)
Authorization: GNFD2-EDDSA, Signature=9dac5eeaca7fb65265528773e11819cb9980cd9be68eebe8a10dea643f265c8302887f014eb78c3249c05d1038e81f93b4253a298cd9edf18982345c394ba9fb
X-Gnfd-Expiry-Timestamp: 2023-10-18T03:20:04Z
```


### Code examples in Greenfield Go SDK

The Greenfield JS/Go SDK  includes source code on GitHub that shows how to sign Greenfield SP API requests.

- JS SDK
  - [MsgToSign](https://github.com/bnb-chain/greenfield-js-sdk/blob/9d4463b2b0d845c56ce2093eab15c15fb2ba4787/packages/js-sdk/src/clients/spclient/auth.ts#L63)
  - [SignRequest](https://github.com/bnb-chain/greenfield-js-sdk/blob/9d4463b2b0d845c56ce2093eab15c15fb2ba4787/packages/js-sdk/src/clients/spclient/auth.ts#L69C1-L70C1)

- GO SDK
  - [MsgToSign](https://github.com/bnb-chain/greenfield-common/blob/eb2f0efea22882dee610bd3b06589ed0e50fb8ce/go/http/gen_sign_str.go#L91-L94)
  - [SignRequest](https://github.com/bnb-chain/greenfield-go-sdk/blob/a21d3b5eb75a211266105ea78ad1c76fcdc87c4d/client/api_client.go#L676-L685)
  

## X-Gnfd-Unsigned-Msg header

### CreateBucket approval

When users send a `CreateBucket approval` request, the request data is encoded in X-Gnfd-Unsigned-Msg header. CreateBucket approval contains [7 fields](./get_approval.md#msgcreatebucket). Users should provide the creator address, bucketName and primary SP address. The other fields is optional. Users should verify the content of `CreateBucket approval` request. MsgCreateBucket encodes in `protobuf json` format and converts to lowercase hexadecimal characters.

### CreateBucket approval unsigned msg example

```shell
# Suppose the user wants to make a create bucket request as follows:
creator = "0x14539343413EB47899B0935287ab1111Df891d04"
bucketName = "gnfd1"
visibility = "VISIBILITY_TYPE_PRIVATE"
paymentAddress = "0x8e424c6Db42Ad9A5d91b24e20b5f603eC70abbA3"
primarySpAddress = "0x21c6ff21DD7012DE1CCf9055f2eB234A44a1d3fB"
expiredHeight = 0
sig = nil
chargedReadQuota = 64

# Use protobuf json marshal to get json string, the result is:
{
    "bucket_name": "gnfd1",
    "charged_read_quota": "64",
    "creator": "0x14539343413EB47899B0935287ab1111Df891d04",
    "payment_address": "0x8e424c6Db42Ad9A5d91b24e20b5f603eC70abbA3",
    "primary_sp_address": "0x21c6ff21DD7012DE1CCf9055f2eB234A44a1d3fB",
    "primary_sp_approval": {
        "expired_height": "0",
        "sig": null
    },
    "visibility": "VISIBILITY_TYPE_PRIVATE"
}

# Users should convert json string to byte array. Then convert byte array to get lowercase hexadecimal string result and the result will be put into X-Gnfd-Unsigned-Msg header.
X-Gnfd-Unsigned-Msg: 7b226275636b65745f6e616d65223a22676e666431222c22636861726765645f726561645f71756f7461223a223634222c2263726561746f72223a22307831343533393334333431334542343738393942303933353238376162313131314466383931643034222c227061796d656e745f61646472657373223a22307838653432346336446234324164394135643931623234653230623566363033654337306162624133222c227072696d6172795f73705f61646472657373223a22307832316336666632314444373031324445314343663930353566326542323334413434613164336642222c227072696d6172795f73705f617070726f76616c223a7b22657870697265645f686569676874223a2230222c22736967223a6e756c6c7d2c227669736962696c697479223a225649534942494c4954595f545950455f50524956415445227d
```

### CreateBucket code examples in Greenfield Go SDK

- [CreateBucket](https://github.com/bnb-chain/greenfield-go-sdk/blob/develop/client/api_bucket.go#LL113)
- [GetCreateBucketApproval](https://github.com/bnb-chain/greenfield-go-sdk/blob/develop/client/api_bucket.go#L64)

### CreateObject approval

When users send a `CreateObject approval` request, the request data is encoded in X-Gnfd-Unsigned-Msg header. CreateObject approval contains [10 fields](./get_approval.md#msgcreateobject). Users should provide the creator address, bucketName, objectName and payload data. The other fields is optional. Users should verify the content of `CreateObject approval` request. MsgCreateObject encodes in protobuf json format and converts to lowercase hexadecimal characters.

- [CreateObject](https://github.com/bnb-chain/greenfield-go-sdk/blob/develop/client/api_object.go#L98)
- [GetCreateObjectApproval](https://github.com/bnb-chain/greenfield-go-sdk/blob/develop/client/api_object.go#L526)

### CreateObject approval unsigned msg example

```shell
# Suppose the user wants to make a create object request as follows:
creator = "0x14539343413EB47899B0935287ab1111Df891d04"
bucketName = "gnfd1"
objectName = "myobject"
payloadSize = 2048
visibility = "VISIBILITY_TYPE_PRIVATE"
contentType = "image/jpeg"
expiredHeight = 0
sig = nil
expectChecksums = ["/v6ljJzIDPXduF53SkOdi8bt7GK73pVTDwq4N8qwbo8=", "BCp9ZKWB7y7pg/IQWIAcw1ZjtwXmxV9i+o4PGOzHCYk=", "TJ/iTQh4vyxmW8Ovpcr8ake9L0zm6GrTObhOKhgG+vY=", "QW7N9tm0i+ZajFEHIwSRbkUyq7BltN/WNCvGdzNec+Q=", "GKjb5A/cXxNx7L/c9P+xjfBXfZ1J6rffla3mdVy3Piw=", "oc09LXqM8jZcIEqFyxrFBD6qO5yNGGRvLntN01U753g=", "R4/dCYCqjlIdjmvaou1lGCIL245jsmlWWAG2qREa01M="]
expectSecondarySpAddresses = ["0xf040BaaD4966842dAF83a536048a25Cf8eFF9ea0", "0xC117E319CE0C54C1C5F0e3E59B6647c5a5F0c3a8", "0x6dE810250b34059657e2C820D675232a9D884659", "0xca807A58caF20B6a4E3eDa3531788179E5bc816b", "0x20Bb76D063a6d2B18B6DaBb2aC985234a4B9eDe0", "0xa35eD99A0b4D26Bf7F74DC9D81FbfAB6A7f103Df"]

# Users should convert json string to byte array. Then convert byte array to get lowercase hexadecimal string result and the result will be put into X-Gnfd-Unsigned-Msg header.
{
    "bucket_name": "gnfd1",
    "content_type": "image/jpeg",
    "creator": "0x14539343413EB47899B0935287ab1111Df891d04",
    "expect_checksums": ["/v6ljJzIDPXduF53SkOdi8bt7GK73pVTDwq4N8qwbo8=", "BCp9ZKWB7y7pg/IQWIAcw1ZjtwXmxV9i+o4PGOzHCYk=", "TJ/iTQh4vyxmW8Ovpcr8ake9L0zm6GrTObhOKhgG+vY=", "QW7N9tm0i+ZajFEHIwSRbkUyq7BltN/WNCvGdzNec+Q=", "GKjb5A/cXxNx7L/c9P+xjfBXfZ1J6rffla3mdVy3Piw=", "oc09LXqM8jZcIEqFyxrFBD6qO5yNGGRvLntN01U753g=", "R4/dCYCqjlIdjmvaou1lGCIL245jsmlWWAG2qREa01M="],
    "expect_secondary_sp_addresses": ["0xf040BaaD4966842dAF83a536048a25Cf8eFF9ea0", "0xC117E319CE0C54C1C5F0e3E59B6647c5a5F0c3a8", "0x6dE810250b34059657e2C820D675232a9D884659", "0xca807A58caF20B6a4E3eDa3531788179E5bc816b", "0x20Bb76D063a6d2B18B6DaBb2aC985234a4B9eDe0", "0xa35eD99A0b4D26Bf7F74DC9D81FbfAB6A7f103Df"],
    "object_name": "myobject",
    "payload_size": "2048",
    "primary_sp_approval": {
        "expired_height": "0",
        "sig": null
    },
    "redundancy_type": "REDUNDANCY_EC_TYPE",
    "visibility": "VISIBILITY_TYPE_PRIVATE"
}

X-Gnfd-Unsigned-Msg: 7b226275636b65745f6e616d65223a22676e666431222c22636f6e74656e745f74797065223a22696d6167652f6a706567222c2263726561746f72223a22307831343533393334333431334542343738393942303933353238376162313131314466383931643034222c226578706563745f636865636b73756d73223a5b222f76366c6a4a7a494450586475463533536b4f646938627437474b3733705654447771344e387177626f383d222c22424370395a4b574237793770672f49515749416377315a6a7477586d785639692b6f3450474f7a4843596b3d222c22544a2f69545168347679786d57384f7670637238616b65394c307a6d364772544f62684f4b6867472b76593d222c225157374e39746d30692b5a616a46454849775352626b55797137426c744e2f574e437647647a4e65632b513d222c22474b6a6235412f6358784e78374c2f6339502b786a664258665a314a367266666c61336d645679335069773d222c226f6330394c58714d386a5a634945714679787246424436714f35794e474752764c6e744e303155373533673d222c2252342f64435943716a6c49646a6d76616f75316c4743494c3234356a736d6c57574147327152456130314d3d225d2c226578706563745f7365636f6e646172795f73705f616464726573736573223a5b22307866303430426161443439363638343264414638336135333630343861323543663865464639656130222c22307843313137453331394345304335344331433546306533453539423636343763356135463063336138222c22307836644538313032353062333430353936353765324338323044363735323332613944383834363539222c22307863613830374135386361463230423661344533654461333533313738383137394535626338313662222c22307832304262373644303633613664324231384236446142623261433938353233346134423965446530222c22307861333565443939413062344432364266374637344443394438314662664142364137663130334466225d2c226f626a6563745f6e616d65223a22e4b8ade69687222c227061796c6f61645f73697a65223a2232303438222c227072696d6172795f73705f617070726f76616c223a7b22657870697265645f686569676874223a2230222c22736967223a6e756c6c7d2c22726564756e64616e63795f74797065223a22524544554e44414e43595f45435f54595045222c227669736962696c697479223a225649534942494c4954595f545950455f50524956415445227d
```

## X-Gnfd-Signed-Msg

X-Gnfd-Signed-Msg is a HTTP response header. SP server will add approval signature to data parsed from `X-Gnfd-Unsigned-Msg`. Users should use hex decode to decode it into byte array. Then use protobuf json unmarshal byte array. Finnaly broadcast txn to Greenfield chain.

### CreateBucket approval signed msg example

```shell
# Suppose users get the following signed msg
X-Gnfd-Signed-Msg: 7b226275636b65745f6e616d65223a22676e666431222c22636861726765645f726561645f71756f7461223a223634222c2263726561746f72223a22307831343533393334333431334542343738393942303933353238376162313131314466383931643034222c227061796d656e745f61646472657373223a22307838653432346336446234324164394135643931623234653230623566363033654337306162624133222c227072696d6172795f73705f61646472657373223a22307832316336666632314444373031324445314343663930353566326542323334413434613164336642222c227072696d6172795f73705f617070726f76616c223a7b22657870697265645f686569676874223a2230222c22736967223a6e756c6c7d2c227669736962696c697479223a225649534942494c4954595f38238c8121223189231812

# use protobuf json unmarshal in string format
{
    "bucket_name": "gnfd1",
    "charged_read_quota": "64",
    "creator": "0x14539343413EB47899B0935287ab1111Df891d04",
    "payment_address": "0x8e424c6Db42Ad9A5d91b24e20b5f603eC70abbA3",
    "primary_sp_address": "0x21c6ff21DD7012DE1CCf9055f2eB234A44a1d3fB",
    "primary_sp_approval": {
        "expired_height": "100060",
        "sig": "MTI4OTIzODNoZGo="
    },
    "visibility": "VISIBILITY_TYPE_PRIVATE"
}
```

### CreateObject approval signed msg example

```shell
# Suppose users get the following signed msg
X-Gnfd-Signed-Msg: 7b226275636b65745f6e616d65223a22676e666431222c22636f6e74656e745f74797065223a22696d6167652f6a706567222c2263726561746f72223a22307831343533393334333431334542343738393942303933353238376162313131314466383931643034222c226578706563745f636865636b73756d73223a5b222f76366c6a4a7a494450586475463533536b4f646938627437474b3733705654447771344e387177626f383d222c22424370395a4b574237793770672f49515749416377315a6a7477586d785639692b6f3450474f7a4843596b3d222c22544a2f69545168347679786d57384f7670637238616b65394c307a6d364772544f62684f4b6867472b76593d222c225157374e39746d30692b5a616a46454849775352626b55797137426c744e2f574e437647647a4e65632b513d222c22474b6a6235412f6358784e78374c2f6339502b786a664258665a314a367266666c61336d645679335069773d222c226f6330394c58714d386a5a634945714679787246424436714f35794e474752764c6e744e303155373533673d222c2252342f64435943716a6c49646a6d76616f75316c4743494c3234356a736d6c57574147327152456130314d3d225d2c226578706563745f7365636f6e646172795f73705f616464726573736573223a5b22307866303430426161443439363638343264414638336135333630343861323543663865464639656130222c22307843313137453331394345304335344331433546306533453539423636343763356135463063336138222c22307836644538313032353062333430353936353765324338323044363735323332613944383834363539222c22307863613830374135386361463230423661344533654461333533313738383137394535626338313662222c22307832304262373644303633613664324231384236446142623261433938353233346134423965446530222c22307861333565443939413062344432364266374637344443394438314662664142364137663130334466225d2c226f626a6563745f6e616d65223a22e4b8ade69687222c227061796c6f61645f73697a65223a2232303438222c227072696d6172795f73705f617070726f76616c223a7b226372723392882393932392a3292323939120210b

# use protobuf json unmarshal in string format
{
    "bucket_name": "gnfd1",
    "content_type": "image/jpeg",
    "creator": "0x14539343413EB47899B0935287ab1111Df891d04",
    "expect_checksums": ["/v6ljJzIDPXduF53SkOdi8bt7GK73pVTDwq4N8qwbo8=", "BCp9ZKWB7y7pg/IQWIAcw1ZjtwXmxV9i+o4PGOzHCYk=", "TJ/iTQh4vyxmW8Ovpcr8ake9L0zm6GrTObhOKhgG+vY=", "QW7N9tm0i+ZajFEHIwSRbkUyq7BltN/WNCvGdzNec+Q=", "GKjb5A/cXxNx7L/c9P+xjfBXfZ1J6rffla3mdVy3Piw=", "oc09LXqM8jZcIEqFyxrFBD6qO5yNGGRvLntN01U753g=", "R4/dCYCqjlIdjmvaou1lGCIL245jsmlWWAG2qREa01M="],
    "expect_secondary_sp_addresses": ["0xf040BaaD4966842dAF83a536048a25Cf8eFF9ea0", "0xC117E319CE0C54C1C5F0e3E59B6647c5a5F0c3a8", "0x6dE810250b34059657e2C820D675232a9D884659", "0xca807A58caF20B6a4E3eDa3531788179E5bc816b", "0x20Bb76D063a6d2B18B6DaBb2aC985234a4B9eDe0", "0xa35eD99A0b4D26Bf7F74DC9D81FbfAB6A7f103Df"],
    "object_name": "myobject",
    "payload_size": "2048",
    "primary_sp_approval": {
        "expired_height": "300451",
        "sig": "dXd1dzI4MzIyMzgz"
    },
    "redundancy_type": "REDUNDANCY_EC_TYPE",
    "visibility": "VISIBILITY_TYPE_PRIVATE"
}
```

## Virtual-hosted-style requests

Greenfield SP supports both virtual-hosted-style and path-style URI. It's like AWS S3 so you can easily use Greenfield SP RESTful APIs.

In a virtual-hosted–style URI, the bucket name is part of the domain name in the URL. Greenfield SP virtual-hosted–style URLs use the following format:

```shell
https://BucketName.gnfd-testnet-sp*.bnbchain.org/key-name
```

In this example, `EXAMPLE-BUCKET` is the bucket name and `sp.pdf` is the key name:

```shell
https://EXAMPLE-BUCKET.gnfd-testnet-sp*.bnbchain.org/sp.pdf
```

## Path-style requests

In Greenfield SP, path-style URLs use the following format:

```shell
https://gnfd-testnet-sp*.bnbchain.org/bucket-name/key-name
```

For example, if you create a bucket named `EXAMPLE-BUCKET`, and you want to access the `sp.pdf` object in that bucket, you can use the following path-style URL:

```shell
https://gnfd-testnet-sp*.bnbchain.org/EXAMPLE-BUCKET/sp.pdf
```
