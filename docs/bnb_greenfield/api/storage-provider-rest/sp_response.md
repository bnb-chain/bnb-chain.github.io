---
title: SP Response
---

# SP Response

If you invoke SP RESTful APIs successfully, you will get a XML represented response:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<GetBucketReadQuotaResult>
    <BucketName>myBucket</BucketName>
    <BucketID>6u754</BucketID>
    <ReadQuotaSize>20</ReadQuotaSize>
    <SPFreeReadQuotaSize>10</SPFreeReadQuotaSize>
    <ReadConsumedSize>5</ReadConsumedSize>
</GetBucketReadQuotaResult>
```

## SP Error Response

When an error occurs, the header information contains the following:

```shell
Content-Type: application/xml
```

An appropriate 3xx, 4xx, or 5xx HTTP status code

The body of the response also contains information about the error. The following sample error response shows the structure of response elements common to all REST error responses.

| ParameterName | Type      | Description                                                                                                                                                                                                                                                             | Ancestor |
| ------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| Error         | Container | Container for all error elements.                                                                                                                                                                                                                                       | None     |
| Code          | integer   | The error code is an integer that uniquely identifies an error condition. It is meant to be read and understood by programs that detect and handle errors by type.  code                                                                                                |          |
| Message       | string    | The error message contains a generic description of the error condition in English. It is intended for a human audience. Simple programs display the message directly to the end user if they encounter an error condition they don't know how or don't care to handle. | Error    |
| RequestId     | string    | ID of the request associated with the error.                                                                                                                                                                                                                            | Error    |

## Error Response Sample

```xml
<Error>
    <Code>10002</Code>
    <Message>account buckets exceed the limit</Message>
    <RequestId>14379357152578345503</RequestId>
</Error>
```
## List of Error Codes

This list shows the error codes which returns for http display, and inner code that are unique for each error with description.

| Http Status Code | Error Code | Module                 | Description                                                                                                                                                            |
|------------------|------------|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 400              | 10001      | Approver               | OoooH.... request lost                                                                                                                                                 |
| 406              | 10002      | Approver               | account buckets exceed the limit                                                                                                                                       |
| 400              | 20001      | Authenticator          | unsupported auth op type                                                                                                                                               |
| 400              | 20002      | Authenticator          | mismatched primary sp                                                                                                                                                  |
| 400              | 20003      | Authenticator          | object has not been created state                                                                                                                                      |
| 400              | 20004      | Authenticator          | object has not been sealed state                                                                                                                                       |
| 400              | 20005      | Authenticator          | payment account is not active                                                                                                                                          |
| 400              | 20006      | Authenticator          | the user address format is invalid                                                                                                                                     |
| 404              | 20007      | Authenticator          | no such bucket                                                                                                                                                         |
| 404              | 20008      | Authenticator          | no such object                                                                                                                                                         |
| 400              | 20009      | Authenticator          | repeated bucket                                                                                                                                                        |
| 400              | 20010      | Authenticator          | repeated object                                                                                                                                                        |
| 400              | 20011      | Authenticator          | no permission                                                                                                                                                          |
| 400              | 20012      | Authenticator          | bad signature                                                                                                                                                          |
| 400              | 20013      | Authenticator          | signed msg must be formatted as ${actionContent}_${expiredTimestamp}                                                                                                   |
| 400              | 20014      | Authenticator          | expiredTimestamp in signed msg must be a unix epoch time in milliseconds                                                                                               |
| 400              | 20015      | Authenticator          | user public key is expired                                                                                                                                             |
| 400              | 30001      | Downloader             | OoooH.... request lost                                                                                                                                                 |
| 400              | 30002      | Downloader             | object unsealed                                                                                                                                                        |
| 400              | 30003      | Downloader             | get piece request exceed                                                                                                                                               |
| 406              | 30004      | Downloader             | bucket quota overflow                                                                                                                                                  |
| 400              | 30005      | Downloader             | request params invalid                                                                                                                                                 |
| 400              | 30006      | Downloader             | request params invalid, no such piece                                                                                                                                  |
| 400              | 30007      | Downloader             | invalid key format                                                                                                                                                     |
| 406              | 30008      | Downloader             | stream account has been frozen                                                                                                                                         |
| 400              | 40001      | Executor               | OoooH.... request lost                                                                                                                                                 |
| 404              | 40002      | Executor               | insufficient approvals from p2p                                                                                                                                        |
| 500              | 40003      | Executor               | seal object on chain failed                                                                                                                                            |
| 404              | 40004      | Executor               | approvals exhausted                                                                                                                                                    |
| 406              | 40005      | Executor               | secondary integrity hash verification failed                                                                                                                           |
| 406              | 40006      | Executor               | secondary sp mismatch                                                                                                                                                  |
| 406              | 40007      | Executor               | replicate idx out of bounds                                                                                                                                            |
| 500              | 45202      | Executor               | recovery only support EC redundancy type                                                                                                                               |
| 500              | 45203      | Executor               | failed to get enough piece data to recovery                                                                                                                            |
| 500              | 45204      | Executor               | EC decode error                                                                                                                                                        |
| 500              | 45206      | Executor               | recovery checksum not correct                                                                                                                                          |
| 500              | 45207      | Executor               | get secondary piece data length error                                                                                                                                  |
| 406              | 45208      | Executor               | primary sp endpoint not found when recovering                                                                                                                          |
| 406              | 45209      | Executor               | recovery piece index invalid                                                                                                                                           |
| 500              | 45210      | Executor               | migrate piece checksum is not correct                                                                                                                                  |
| 500              | 45212      | Executor               | invalid redundancy index                                                                                                                                               |
| 500              | 45213      | Executor               | failed to set object integrity into spdb                                                                                                                               |
| 500              | 45214      | Executor               | invalid piece checksum length                                                                                                                                          |
| 400              | 50001      | Gateway                | unsupported sign type                                                                                                                                                  |
| 400              | 50002      | Gateway                | authorization header format error                                                                                                                                      |
| 400              | 50003      | Gateway                | request is tampered                                                                                                                                                    |
| 401              | 50004      | Gateway                | no permission                                                                                                                                                          |
| 400              | 50005      | Gateway                | gnfd msg encoding error                                                                                                                                                |
| 400              | 50006      | Gateway                | gnfd msg validate error                                                                                                                                                |
| 200              | 50007      | Gateway                | approval request is refuse                                                                                                                                             |
| 404              | 50008      | Gateway                | unsupported request type                                                                                                                                               |
| 400              | 50009      | Gateway                | invalid request header                                                                                                                                                 |
| 400              | 50010      | Gateway                | invalid request params for query                                                                                                                                       |
| 400              | 50012      | Gateway                | invalid range params                                                                                                                                                   |
| 400              | 50013      | Gateway                | stream exception                                                                                                                                                       |
| 406              | 50014      | Gateway                | mismatch sp                                                                                                                                                            |
| 406              | 50015      | Gateway                | signature verification failed                                                                                                                                          |
| 403              | 50016      | Gateway                | invalid payload                                                                                                                                                        |
| 400              | 50017      | Gateway                | The X-Gnfd-App-Domain header is incorrect.                                                                                                                             |
| 400              | 50018      | Gateway                | The X-Gnfd-App-Reg-Public-Key header is incorrect.                                                                                                                     |
| 400              | 50019      | Gateway                | The X-Gnfd-App-Reg-Nonce header is incorrect.                                                                                                                          |
| 400              | 50020      | Gateway                | The signed message in Authorization does not match the content in headers.                                                                                             |
| 400              | 50021      | Gateway                | The SP addr in the signed message in Authorization is not for the this SP.                                                                                             |
| 400              | 50040      | Gateway                | The SP Nonce in the signed message in Authorization is not for the this SP.                                                                                            |
| 400              | 50037      | Gateway                | The domain in the signed message in Authorization does not match this website.                                                                                         |
| 400              | 50038      | Gateway                | The expiry time in signed message in Authorization does not match the expiry time in the header X-Gnfd-Expiry-Timestamp.                                               |
| 400              | 50039      | Gateway                | The public key in signed message in Authorization does not match the expiry time in the header X-Gnfd-App-Reg-Public-Key.                                              |
| 400              | 50022      | Gateway                | The signed message in Authorization does not match the template.                                                                                                       |
| 400              | 50023      | Gateway                | The X-Gnfd-Expiry-Timestamp header is incorrect. The expiry date is expected to be within 604800 seconds and formatted in RFC3339, e.g. 2006-01-02T15:04:05Z07:00 .    |
| 400              | 50024      | Gateway                | The X-Gnfd-Expiry-Timestamp parameter is incorrect. The expiry date is expected to be within 604800 seconds and formatted in RFC3339, e.g. 2006-01-02T15:04:05Z07:00 . |
| 404              | 50025      | Gateway                | no such object                                                                                                                                                         |
| 403              | 50026      | Gateway                | Forbidden to access                                                                                                                                                    |
| 400              | 50027      | Gateway                | invalid complete                                                                                                                                                       |
| 400              | 50028      | Gateway                | invalid offset                                                                                                                                                         |
| 403              | 50029      | Gateway                | sp is not in service status                                                                                                                                            |
| 400              | 50030      | Gateway                | The SP is not the correct SP to recovery                                                                                                                               |
| 400              | 50031      | Gateway                | The redundancy type of the recovering piece is not EC                                                                                                                  |
| 500              | 50032      | Gateway                | System busy, try to request later                                                                                                                                      |
| 500              | 50035      | Gateway                | invalid redundancy index                                                                                                                                               |
| 403              | 50036      | Gateway                | bucket is not in service status                                                                                                                                        |
| 400              | 60001      | Manager                | OoooH... request lost                                                                                                                                                  |
| 406              | 60002      | Manager                | request repeated                                                                                                                                                       |
| 406              | 60003      | Manager                | OoooH... request exceed, try again later                                                                                                                               |
| 400              | 60004      | Manager                | task canceled                                                                                                                                                          |
| 404              | 60005      | Manager                | future support                                                                                                                                                         |
| 406              | 60006      | Manager                | failed to notify swap out start                                                                                                                                        |
| 400              | 70001      | P2P                    | request repeated                                                                                                                                                       |
| 404              | 70002      | P2P                    | insufficient approvals as secondary sp                                                                                                                                 |
| 400              | 80001      | Receiver               | OoooH... request lost, try again later                                                                                                                                 |
| 406              | 80002      | Receiver               | request repeated                                                                                                                                                       |
| 403              | 80003      | Receiver               | replicate piece unfinished                                                                                                                                             |
| 406              | 80004      | Receiver               | verify data checksum failed                                                                                                                                            |
| 400              | 90001      | Metadata               | OoooH... request lost, try again later                                                                                                                                 |
| 406              | 90002      | Metadata               | request exceed                                                                                                                                                         |
| 404              | 90003      | Metadata               | no uploading record                                                                                                                                                    |
| 404              | 90004      | Metadata               | no such sp                                                                                                                                                             |
| 400              | 90005      | Metadata               | request block height exceed latest height                                                                                                                              |
| 400              | 98002      | Metadata               | stream closed abnormally                                                                                                                                               |
| 400              | 98101      | Metadata               | response type mismatch                                                                                                                                                 |
| 400              | 98093      | Metadata               | no such object from metadata                                                                                                                                           |
| 400              | 110001     | Uploader               | OoooH... request lost, try again later                                                                                                                                 |
| 403              | 110002     | Uploader               | object not created state                                                                                                                                               |
| 406              | 110003     | Uploader               | put object request repeated                                                                                                                                            |
| 406              | 110004     | Uploader               | invalid payload data integrity hash                                                                                                                                    |
| 400              | 110005     | Uploader               | upload payload data stream exception                                                                                                                                   |
| 400              | 120001     | Signer                 | sign message with private key failed                                                                                                                                   |
| 400              | 120002     | Signer                 | send sealObject msg failed                                                                                                                                             |
| 400              | 120003     | Signer                 | send rejectUnSealObject msg failed                                                                                                                                     |
| 400              | 120004     | Signer                 | send discontinueBucket msg failed                                                                                                                                      |
| 400              | 120005     | Signer                 | sign or tx msg pointer dangling                                                                                                                                        |
| 400              | 120006     | Signer                 | send create gvg msg failed                                                                                                                                             |
| 400              | 120007     | Signer                 | send complete migrate bucket failed                                                                                                                                    |
| 400              | 120008     | Signer                 | send swap out failed                                                                                                                                                   |
| 400              | 120009     | Signer                 | send complete swap out failed                                                                                                                                          |
| 400              | 120010     | Signer                 | send sp exit failed                                                                                                                                                    |
| 400              | 120011     | Signer                 | send complete sp exit failed                                                                                                                                           |
| 400              | 120012     | Signer                 | send update sp price failed                                                                                                                                            |
| 400              | 500001     | Base-Gnfd              | no such bucket                                                                                                                                                         |
| 400              | 500002     | Base-Gnfd              | seal failed                                                                                                                                                            |
| 400              | 500003     | Base-Gnfd              | reject unseal failed                                                                                                                                                   |
| 500              | 540001     | Base-Gfspvgmgr         | failed to pick virtual group family, need creating global virtual group                                                                                                |
| 500              | 540002     | Base-Gfspvgmgr         | failed to pick global virtual group, need staking more storage size                                                                                                    |
| 500              | 540003     | Base-Gfspvgmgr         | metadata is staled, need forcing refresh metadata                                                                                                                      |
| 500              | 540004     | Base-Gfspvgmgr         | failed to pick dest sp                                                                                                                                                 |
| 400              | 970001     | Base-Gfsptqueue        | request repeated                                                                                                                                                       |
| 400              | 970002     | Base-Gfsptqueue        | request exceed limit                                                                                                                                                   |
| 400              | 990101     | Base-Gfspapp-Approve   | OoooH... request lost                                                                                                                                                  |
| 400              | 990102     | Base-Gfspapp-Approve   | server overload, try again later                                                                                                                                       |
| 400              | 990301     | Base-Gfspapp-Downloade | OoooH... request lost                                                                                                                                                  |
| 400              | 990302     | Base-Gfspapp-Downloade | server overload, try again later                                                                                                                                       |
| 400              | 990601     | Base-Gfspapp-Manage    | OoooH... request lost                                                                                                                                                  |
| 404              | 990602     | Base-Gfspapp-Manage    | unsupported task type                                                                                                                                                  |
| 404              | 990603     | Base-Gfspapp-Manage    | no task to dispatch below the require limits                                                                                                                           |
| 400              | 990701     | Base-Gfspapp-P2P       | OoooH... request lost                                                                                                                                                  |
| 404              | 995301     | Base-Gfspapp-Rcmgr     | future support                                                                                                                                                         |
| 400              | 990801     | Base-Gfspapp-Receive   | OoooH... request lost                                                                                                                                                  |
| 400              | 990802     | Base-Gfspapp-Receive   | server overload, try again later                                                                                                                                       |
| 400              | 991001     | Base-Gfspapp-Sign      | OoooH... request lost                                                                                                                                                  |
| 400              | 991101     | Base-Gfspapp-Upload    | OoooH... request lost                                                                                                                                                  |
| 400              | 991102     | Base-Gfspapp-Upload    | server overload, try again later                                                                                                                                       |
| 400              | 991103     | Base-Gfspapp-Upload    | stream closed abnormally                                                                                                                                               |                                                                                                                                                                   

## Rate limit response
If your request exceed the rate limit, the server will return a 429 http code with no detailed description as of now.