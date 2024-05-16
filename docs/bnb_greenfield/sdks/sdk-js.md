---
title: Javascript SDK Example
---

# Quickstart

The BNB Greenfield JavaScript SDK is designed for front-end environments and provides an API for interacting with BNB Greenfield decentralized storage. It offers a range of operations, including retrieving permission details, gas fees, etc. The SDK also includes a crypto component for signing transactions and sending them to BNB Greenfield.

However, it should be noted that this SDK does not include methods for interacting with BNB Smart Chain (BSC). For a comprehensive understanding of available operations, refer to the [API Reference](https://github.com/bnb-chain/greenfield-js-sdk).

## Install

```bash
npm install @bnb-chain/greenfield-js-sdk
```

## Usage

To utilize the SDK functionality, users need to instantiate a client object from the SDK. This client object serves as the interface to interact with BNB Greenfield and perform the desired operations.

### Create client

```js
import { Client } from '@bnb-chain/greenfield-js-sdk'

export const client = Client.create('https://gnfd-testnet-fullnode-tendermint-ap.bnbchain.org', '5600');
```

The SDK offers two types of operations - sending transactions to BNB Greenfield, allowing users to modify the state of the blockchain; the second type enables users to send queries and retrieve metadata information about objects stored on the blockchain. 

The SDK consists of two parts:

* Chain: https://docs.bnbchain.org/greenfield-docs/docs/api/blockchain-rest
* Storage Provider: https://docs.bnbchain.org/greenfield-docs/docs/api/storage-provider-rest

### Transactions

#### 1. Transaction construction

The SDK offers functionality for transferring tokens between accounts, providing a straightforward and convenient way to perform token transfers. With the SDK, users can easily initiate and execute token transfers within the desired accounts, streamlining the process of managing and exchanging tokens.

The SDK includes functionality for simulating and broadcasting transactions, allowing users to retrieve essential information related to gas fees, and sending the transaction over network.

```js
const { simulate, broadcast } = await client.account.transfer({
  fromAddress: address,
  toAddress: transferInfo.to,
  amount: [
    {
      denom: 'BNB',
      amount: ethers.utils.parseEther(transferInfo.amount).toString(),
    },
  ],
});
```

#### 2. Simulate Transactions
This function returns the estimated gas limit, gas price, and overall gas fee.

```js
// simulate tx
const simulateInfo = await simulate({
   denom: 'BNB',
});

```

Example output

```json
{
   "gasLimit":2400,
   "gasPrice":"5000000000",
   "gasFee":"0.000012"
}
```

#### 3. Broadcast Transactions

Use the API endpoint to send the transaction data to the blockchain network.

```js
// broadcast tx
// This includes details such as gas limit, gas price, and overall gas fee.
const broadcastRes = await broadcast({
  denom: 'BNB',
  gasLimit: Number(simulateInfo.gasLimit),
  gasPrice: simulateInfo.gasPrice,
  payer: address,
  granter: '',
});
```

#### NOTICE: Signature mode for `Broadcast`  

`broadcast` use `window.ethereum` as signature provider by default.

If you want to use others, you can set `signTypedDataCallback`:

```js
// TrustWallet
const broadcastRes = await broadcast({
  //...
  signTypedDataCallback: async (addr: string, message: string) => {
    return await window.trustwallet.request({
      method: 'eth_signTypedData_v4',
      params: [addr, message],
    });
  }
});
```

If you broadcast in Nodejs, you can broadcast a tx by `privateKey`:

```js
const broadcastRes = await broadcast({
  //...
  privateKey: '0x.......'
});
```

Example output after broadcast your transaction:

<details>
<summary> transaction result </summary>

```json
{
   "code":0,
   "height":449276,
   "txIndex":0,
   "events":[
      {
         "type":"coin_spent",
         "attributes":[
            "Array"
         ]
      },
      {
         "type":"coin_received",
         "attributes":[
            "Array"
         ]
      },
      {
         "type":"transfer",
         "attributes":[
            "Array"
         ]
      },
      {
         "type":"message",
         "attributes":[
            "Array"
         ]
      },
      {
         "type":"tx",
         "attributes":[
            "Array"
         ]
      },
      {
         "type":"tx",
         "attributes":[
            "Array"
         ]
      },
      {
         "type":"tx",
         "attributes":[
            "Array"
         ]
      },
      {
         "type":"message",
         "attributes":[
            "Array"
         ]
      },
      {
         "type":"coin_spent",
         "attributes":[
            "Array"
         ]
      },
      {
         "type":"coin_received",
         "attributes":[
            "Array"
         ]
      },
      {
         "type":"transfer",
         "attributes":[
            "Array"
         ]
      },
      {
         "type":"message",
         "attributes":[
            "Array"
         ]
      },
      {
         "type":"greenfield.payment.EventStreamRecordUpdate",
         "attributes":[
            "Array"
         ]
      },
      {
         "type":"greenfield.payment.EventStreamRecordUpdate",
         "attributes":[
            "Array"
         ]
      },
      {
         "type":"greenfield.payment.EventStreamRecordUpdate",
         "attributes":[
            "Array"
         ]
      },
      {
         "type":"greenfield.storage.EventCreateBucket",
         "attributes":[
            "Array"
         ]
      }
   ],
   "rawLog":"..",
   "transactionHash":"D304242145ED9B44F05431C3798B3273CF2A907E6AE1CA892759985C900D6E72",
   "gasUsed":2400,
   "gasWanted":2400
}
```

</details>

#### 4. Multi-Transactions

The SDK also provides support for bundling multiple operations into a single transaction, thereby reducing gas fees. This feature allows users to optimize their transactions by combining several operations together, minimizing the overall gas cost associated with executing them individually. By leveraging this functionality, users can effectively manage their gas fees and enhance the efficiency of their transactions within the blockchain network using the SDK.

```js
const createGroupTx = await client.group.createGroup(params);
const mirrorGroupTx = await client.crosschain.mirrorGroup({
   groupName,
   id,
   operator,
});

const principal = {
  type: PermissionTypes.PrincipalType.PRINCIPAL_TYPE_GNFD_GROUP,
  value: GRNToString(newGroupGRN(address as string, groupName)),
};

const statement: PermissionTypes.Statement = {
  effect: PermissionTypes.Effect.EFFECT_ALLOW,
  actions: [PermissionTypes.ActionType.ACTION_GET_OBJECT],
  resources: [
    GRNToString(
      type === 'Data'
        ? newObjectGRN(bucketName, name)
        : newObjectGRN(bucketName, '*'),
    ),
  ],
};

const policyTx = await client.object.putObjectPolicy(bucketName, name, {
  operator: address,
  statements: [statement],
  principal,
});

const { simulate, broadcast } = await multiTx([
  createGroupTx,
  mirrorGroupTx,
  policyTx,
]);
```

### Querying Metadata

* Account info

```js

const { client, selectSp, generateString } = require('./client');
const { ACCOUNT_ADDRESS, ACCOUNT_PRIVATEKEY } = require('./env');
const Long = require('long');

(async () => {
  // get account info
  const addrInfo = await client.account.getAccount(ACCOUNT_ADDRESS);

  console.log('address is', addrInfo);


})
```

Example output

```json
{
   "address":"0x525482AB3922230e4D73079890dC905dCc3D37cd",
   "pubKey":{
      "typeUrl":"/cosmos.crypto.eth.ethsecp256k1.PubKey",
      "value":"CiECKuOEfCNFxnfiinnIIoe0OSf3VEOAU5jxwmZscfpOaW4="
   },
   "accountNumber":"5012",
   "sequence":"9"
}
```

### Storage Provider Client

> https://docs.bnbchain.org/greenfield-docs/docs/api/storgae-provider-rest

In addition, the SDK provides support for querying the list of storage providers available and offers generic search capabilities for exploring metadata attributes.

SDK support two [authentication type](https://docs.bnbchain.org/greenfield-docs/docs/api/storage-provider-rest#authentication-type):

* ECDSA: It is usually used on Node.js (Because it need to use a private key)
* EDDSA: It is usually used in a browser

`getBucketReadQuota` as example:

```js
// generate seed:
const allSps = await getAllSps();
const offchainAuthRes = await client.offchainauth.genOffChainAuthKeyPairAndUpload(
  {
    sps: allSps,
    chainId: GREEN_CHAIN_ID,
    expirationMs: 5 * 24 * 60 * 60 * 1000,
    domain: window.location.origin,
    address: 'your address',
  },
  provider: 'wallet provider',
);

// request sp api
const bucketQuota = await client.bucket.getBucketReadQuota(
  {
    bucketName,
  },
  {
    type: 'EDDSA',
    seed: offchainAuthRes.seedString,
    domain: window.location.origin,
    address: 'your address',
  },
);
```

```js
// Node.js:
// request sp api
const bucketQuota = await client.bucket.getBucketReadQuota(
  {
    bucketName,
  },
  {
    type: 'ECDSA',
    privateKey: '0x....'
  },
);
```

Others functions:

#### List Storage Providers

```js
export const getSps = async () => {
  const sps = await client.sp.getStorageProviders();
  const finalSps = (sps ?? []).filter(
    (v: any) => v?.description?.moniker !== 'QATest',
  );

  return finalSps;
};
```

#### Search for objects

It's important to note that even if an object is set to private, its metadata remains publicly accessible. This metadata includes information such as file size, file type, and file name. 

```js
export const searchKey = async (key: string) => {
  try {
    return await client.sp.listGroup(key, `${DAPP_NAME}_`, {
      sourceType: 'SOURCE_TYPE_ORIGIN',
      limit: 1000,
      offset: 0,
    });
  } catch (e) {
    return [];
}
```

## Examples

Now let's make a complete example, includes:

1. create bucket
2. create object and upload it to the bucket
3. download the object

### Prepare

To begin, create an account and deposit tokens into it on Greenfield. Follow the instructions provided in [Token Transfer](../guide/getting-started/token-transfer.md). Please be aware that if your account does not have any BNB, the transaction will not be executed.

#### Choose Storage Provider

Storing data is one of the most important features of Greenfield. All storage-related apis require the [storage provider](../guide/storage-provider/introduction/index.md) to be chose.

```js title="select sp"
const spList = await client.sp.getStorageProviders();
const sp = {
   operatorAddress: spList[0].operatorAddress,
   endpoint: spList[0].endpoint,
};
```

#### ECDSA / OffChainAuth

[ECDSA](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/README.md#for-auth-type-gnfd1-ecdsa) require users to use private key for authentication.

[OffChainAuth](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/modules/authenticator.md) is used to authenticate yourself to the provider.

> Code can't access user's private key on browser, so we use `OffChainAuth` on browser and use `ECDSA` on Nodejs.

=== "Browser"
    
    ```js title="Browser"
    // MetaMask
    const provider = window.ethereum;
    
    const offchainAuthRes = await client.offchainauth.genOffChainAuthKeyPairAndUpload({
       sps: {
          address: sp.operatorAddress,
          endpoint: sp.endpoint,
       },
       chainId: '5600',
       expirationMs: 5 * 24 * 60 * 60 * 1000,
       domain: window.location.origin,
       // your wallet account
       address: '0x..',
    }, provider);
    ```

=== "Nodejs"
    
    !!! info
        Nodejs don't need offchainauth.
    
    ```js title="Nodejs"
    // your account
    const ACCOUNT_ADDRESS = '0x....'
    
    // your account's private key
    const ACCOUNT_PRIVATEKEY = '0x....'
    ```

### 1. Create Bucket

#### 1.1 construct create bucket tx

Bucket can be private or public, you can customize it with options (`visibility`):

* `VISIBILITY_TYPE_PUBLIC_READ`
* `VISIBILITY_TYPE_PRIVATE`


```js title="construct create bucket tx"
const createBucketTx = await client.bucket.createBucket(
  {
    bucketName: 'bucket_name',
    creator: address,
    visibility: VisibilityType.VISIBILITY_TYPE_PUBLIC_READ,
    chargedReadQuota: Long.fromString('0'),
    primarySpAddress: sp.operatorAddress,
    paymentAddress: address,
  }
);
```

#### 1.2 simulate create bucket tx

```js title="simulate create bucket tx"
const createBucketTxSimulateInfo = await createBucketTx.simulate({
   denom: 'BNB',
});
```

#### 1.3 broadcast create bucket tx

=== "Browser"
    
    ```js title="broadcast create bucket tx"
    const res = await createBucketTx.broadcast({
       denom: 'BNB',
       gasLimit: Number(simulateInfo?.gasLimit),
       gasPrice: simulateInfo?.gasPrice || '5000000000',
       payer: address,
       granter: '',
    });
    ```

=== "Nodejs"

    ```js title="broadcast create bucket tx"
    const res = await createBucketTx.broadcast({
       denom: 'BNB',
       gasLimit: Number(createBucketTxSimulateInfo?.gasLimit),
       gasPrice: createBucketTxSimulateInfo?.gasPrice || '5000000000',
       payer: ACCOUNT_ADDRESS,
       granter: '',
       // highlight-start
       privateKey: ACCOUNT_PRIVATEKEY,
       // highlight-end
    });
    ```

### 2. Create Object

#### 2.1 construct create object tx

Like the [visibility of bucket](#11-construct-create-bucket-tx), object also has a visibility:

* `VISIBILITY_TYPE_PUBLIC_READ`
* `VISIBILITY_TYPE_PRIVATE`

Getting file's checksum need [reed-solomon](https://github.com/bnb-chain/greenfield-js-sdk/tree/main/packages/reed-solomon):

=== "Browser"

    ```js
    import { ReedSolomon } from '@bnb-chain/reed-solomon';
    
    const rs = new ReedSolomon();
    
    // file is File type
    const fileBytes = await file.arrayBuffer();
    const expectCheckSums = rs.encode(new Uint8Array(fileBytes));
    ```

=== "Nodejs"

    ```js
    const fs = require('node:fs');
    const { NodeAdapterReedSolomon } = require('@bnb-chain/reed-solomon/node.adapter');
    
    const filePath = './CHANGELOG.md';
    const fileBuffer = fs.readFileSync(filePath);
    const rs = new NodeAdapterReedSolomon();
    const expectCheckSums = await rs.encodeInWorker(__filename, Uint8Array.from(fileBuffer));
    ```

```js
const createObjectTx = await client.object.createObject(
  {
    bucketName: 'bucket_name',
    objectName: 'object_name',
    // user's account address
    creator: '0x...',
    visibility: VisibilityType.VISIBILITY_TYPE_PRIVATE,
    contentType: 'json',
    redundancyType: RedundancyType.REDUNDANCY_EC_TYPE,
    payloadSize: Long.fromInt(13311),
    expectChecksums: expectCheckSums.map((x) => bytesFromBase64(x)),
  }
);
```

#### 2.2 simulate create object tx

```js
const createObjectTxSimulateInfo = await createObjectTx.simulate({
   denom: 'BNB',
});
```

#### 2.3 broadcast create object tx

=== "Browser"
    
    ```js
    const res = await createObjectTx.broadcast({
       denom: 'BNB',
       gasLimit: Number(simulateInfo?.gasLimit),
       gasPrice: simulateInfo?.gasPrice || '5000000000',
       payer: address,
       granter: '',
    });
    ```

=== "Nodejs"
    
    ```js
    const createObjectTxRes = await createObjectTx.broadcast({
       denom: 'BNB',
       gasLimit: Number(createObjectTxSimulateInfo?.gasLimit),
       gasPrice: createObjectTxSimulateInfo?.gasPrice || '5000000000',
       payer: ACCOUNT_ADDRESS,
       granter: '',
       // highlight-start
       privateKey: ACCOUNT_PRIVATEKEY,
       // highlight-end
    });
    ```

#### 2.4 upload object

=== "Browser"
    
    ```js
    const uploadRes = await client.object.uploadObject(
       {
          bucketName: createObjectInfo.bucketName,
          objectName: createObjectInfo.objectName,
          body: file,
          txnHash: txHash,
       },
       // highlight-start
       {
          type: 'EDDSA',
          domain: window.location.origin,
          seed: offChainData.seedString,
          address,
       },
       // highlight-end
    );
    ```

=== "Nodejs"
    
    ```js
    const uploadRes = await client.object.uploadObject(
       {
          bucketName: bucketName,
          objectName: objectName,
          body: createFile(filePath),
          txnHash: createObjectTxRes.transactionHash,
       },
       // highlight-start
       {
          type: 'ECDSA',
          privateKey: ACCOUNT_PRIVATEKEY,
       }
       // highlight-end
    );
    
    // convert buffer to file
    function createFile(path) {
      const stats = fs.statSync(path);
      const fileSize = stats.size;
    
      return {
        name: path,
        type: '',
        size: fileSize,
        content: fs.readFileSync(path),
      }
    }
    ```

### 3. Download Object

=== "Browser"

    ```js
    const res = await client.object.downloadFile(
       {
          bucketName: 'bucket_name',
          objectName: 'object_name',
       },
       // highlight-start
       {
          type: 'EDDSA',
          address,
          domain: window.location.origin,
          seed: offChainData.seedString,
       },
       // highlight-end
    );
    ```

=== "Nodejs"

    ```js
    const res = await client.object.getObject(
       {
          bucketName: 'bucket_name',
          objectName: 'object_name',
       },
       // highlight-start
       {
          type: 'ECDSA',
          privateKey: ACCOUNT_PRIVATEKEY,
       }
       // highlight-end
    );
    
    // res.body is Blob
    console.log('res', res)
    const buffer = Buffer.from([res.body]);
    fs.writeFileSync('your_output_file', buffer)
    ```


## Code Repository

- [Official JS implementation SDK](https://github.com/bnb-chain/greenfield-js-sdk)

## API Documentation

- [Greenfield JS SDK Docs](https://docs.bnbchain.org/greenfield-js-sdk/)