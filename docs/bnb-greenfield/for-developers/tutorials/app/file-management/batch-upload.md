---
title: Dataset Batch operations - BNB Greenfield File Management
order: 2
---

# How does batch object uploading work in Greenfield?

In `Greenfield`, uploading an object to a bucket is a two-stage process. First, a transaction including the object metadata 
needs to be broadcasted to the Greenfield Chain and confirmed. After confirmation, PUT the object to a Greenfield Storage 
Provider. In the first stage, every transaction needs to be signed by the primary key(also known as `account`, refer to
[accounts](../../../../core-concept/accounts.md) for more details). And if you are accessing `Greenfield` via front-end app and connecting
wallet like Metamask(or other compatible wallets), you will be asked for approval to sign the transaction.

For people who may have encountered the need to upload large amounts of objets, while uploading objects to `Greenfield` individually 
can be a time-consuming and tedious process, because they have to repeatedly approve wallet's pop-up requests to send transactions, 
batch uploading can be a quick and efficient solution to this problem.

## Ways to Perform Batch Uploading

We would introduce two ways to achive the purpose of batch uploading:
### Multi-Message. 
`Greenfield` supports supports embedding multiple messages in a single transaction. You can create a transaction with 
multiple `MsgCreateObject` messages and broadcast it to the Greenfield Chain. Once the object metadata is confirmed on-chain, 
you can start PUTting the objects to the Storage Provider. However, please note that this approach may not be suitable 
for very large batches due to transaction size limitations in Greenfield.

### Temporary Account. 
Create a temporary account at runtime and grant it full permissions to create objects on behalf of your primary account. 
In this approach, your primary account only needs to send a transaction to Greenfield to grant permissions to the temporary 
account. For each object to be uploaded, the temporary account will be used to broadcast the transaction to the Greenfield Chain. 
There is no further interaction required from the primary account. Please note, the temporary account does not need to be deposited.

### Bundle Service
Storing small files in Greenfield is inefficient due to the metadata stored on the blockchain being larger than the files themselves. This leads to higher costs for users. Additionally, Greenfield Blockchain has a capacity limit for processing files simultaneously.

To address this issue, we have proposed [BEP-323: Bundle Format For Greenfield](https://github.com/bnb-chain/BEPs/pull/323). This repository contains the Golang version of the bundle format, which guides users on aggregating objects into a bundle and parsing a bundled object into separate objects.



## Temporary Account Showcase

To demonstrate the batch uploading process using the Temporary Account approach, an example is provided using the `Greenfield-go-sdk`. 
The example includes steps to create a bucket for object storage, generate a temporary account, grant permissions to the 
temporary account, and create and PUT objects.

### Create a bucket for object storage.

Before we get started, we would need to create a bucket to hold objects using the primary account. This requires broadcasting 
a transaction to `Greenfield`. The code below shows how to fill in the `CreateBucket` request with the bucket name and 
selected Storage Provider that will serve our bucket, after the transaction is sent, you might want to check the bucket's
existence to confirm its creation.

```go
primaryAccount, _ := types.NewAccountFromPrivateKey("primaryAccount", privateKey)
cli, _ := client.New(chainId, rpcAddr, client.Option{DefaultAccount: primaryAccount})
ctx := context.Background()
// get storage providers list
isInService := true
spLists, _ := cli.ListStorageProviders(ctx, isInService)
// choose the first sp to be the primary SP, you are free to choose any other one
primarySP := spLists[0].GetOperatorAddress()
// sends a request to Greenfield to create a bucket.
cli.CreateBucket(ctx, "yourBucketName", primarySP, types.CreateBucketOptions{})
// wait for confirmation
time.Sleep(3 * time.Second)
// get bucket meta data from Greenfield
bucketInfo, _ := cli.HeadBucket(ctx, "yourBucketName")
```

### Temporary account generation

Once the bucket is created, we can start generating the temporary account. A private key is 32 bytes represented as a 
64 hexadecimal character string. We can create any random 64 hexadecimal character string to form a private key.
However, in that case, we won't be able to recover it and reuse in the future. So, it is more preferred to use a designed 
payload to generate the private key. In the code snippet below, we concatenate a `signPayload` by string "payload" and 
the account sequence, We then use the signature signed by our primary account to form a newly created private key. 
The `signPayload` acts like a password. No matter what manipulation is applied to the `signPayload` to generate the signature, 
as long as we remember the `signPayload`, we can always retrieve the private key by applying the same manipulation again. 
The example shown here is just one way to get the signature and used for new temporary priavte key, but you are free to 
use any other algorithm.

```go
// generate the temp account using user's primary account signing on payload decided by user, here we add the account nonce to be part of sign payload
signPayload := fmt.Sprintf("payload%d", primaryAccount.GetSequence())
tempAcct, _ := genTemporaryAccount(primaryAccount, signPayload)
tempAcctAddr, _ := tempAcct.GetAddress().Marshal()
```
```go
// genTemporaryAccount generates a temporary account, the signPayload is to be signed by user's own private key(Primary account),
// and the signature is used to generate the temporary account's private key.
// User can reconvert account with the signPayload at any time
func genTemporaryAccount(acct *types.Account, signPayload string) (*types.Account, error) {
    signBz := []byte(signPayload)
    sig, err := acct.Sign(tmhash.Sum(signBz))
    if err != nil {
    return nil, err
    }
    if len(sig) < privateKeyLength {
    return nil, fmt.Errorf("required signature lenght is no less than %d, cur lenght %d", privateKeyLength, len(sig))
    }
    return types.NewAccountFromPrivateKey("temp", hex.EncodeToString(sig[:privateKeyLength]))
}
```

### Grant temporary account permissions

To entitle the temporary account to create objects on behalf of the primary account, two types of permissions are 
required. Both need to be granted by the primary account:
- Grant the creating object permission in the bucket. `Policy` defines that the operation that can be enforced on a resource by an account or a group. Refer to [permission](https://github.com/bnb-chain/greenfield/blob/master/docs/modules/permission.md) to get more details
- Grant an allowance so that the gas fee will be deducted from the primary account, and the primary account will be the owner of objects. 

Again, we would need to broadcast transaction including these two types of granting messages to `Greenfield` using the primary account. 

```go
// Grant the temporary account creating objects permission in the primary account's bucket
statement := &permTypes.Statement{
    Actions: []permTypes.ActionType{permTypes.ACTION_CREATE_OBJECT},
    Effect:  permTypes.EFFECT_ALLOW,
}
msgPutPolicy := storageTypes.NewMsgPutPolicy(primaryAccount.GetAddress(), gnfdTypes.NewBucketGRN("yourBucketName").String(), 
	permTypes.NewPrincipalWithAccount(tempAcct.GetAddress()), []*permTypes.Statement{statement}, nil)

// Grant allowance to the temporary account to broadcast the expected transaction type
allowedMsg := make([]string, 0)
allowedMsg = append(allowedMsg, "/greenfield.storage.MsgCreateObject")
allowance, _ := feegrant.NewAllowedMsgAllowance(&feegrant.BasicAllowance{}, allowedMsg)
msgGrantAllowance, _ := feegrant.NewMsgGrantAllowance(allowance, primaryAccount.GetAddress(), tempAcct.GetAddress())

// Broadcast the transaction to Greenfield
cli.BroadcastTx(ctx, []sdk.Msg{msgGrantAllowance, msgPutPolicy}, types.TxOption{})

// Wait for a block and confirm that permissions are granted
```

### Create object meta and put object

Finally, you can create the object metadata and put the object using the temporary account:
```go
// Switch to use the temporary account
cli.SetDefaultAccount(tempAcct)
// Define the primary account as the granter
txOpt := types.TxOption{FeeGranter: primaryAccount.GetAddress()}
// create object content
var buffer bytes.Buffer
line := `0123456789`
for i := 0; i < 100; i++ {
    buffer.WriteString(fmt.Sprintf("%s", line))
}
// Create the object meta on Greenfield Chain
cli.CreateObject(ctx, "yourBucketName", "yourObjectName", bytes.NewReader(buffer.Bytes()), types.CreateObjectOptions{TxOpts: &txOpt})
// Wait for a block, once the meta is created on the chain, upload the object to the Greenfield Storage Provider
time.Sleep(3 * time.Second)
// Upload the object to Greenfield Storage Provider
cli.PutObject(ctx, "yourBucketName", "yourObjectName", int64(buffer.Len()), bytes.NewReader(buffer.Bytes()), types.PutObjectOptions{})
```

## Bundle Service Example
Here is the guide for how to aggregate batch objects as a bundle, and how to parse a bundled object. As for how to interact with Greenfield, you should refer to 【Greenfield GO SDK](https://github.com/bnb-chain/greenfield-go-sdk).

### Aggregate various objects as bundle
Follow the steps below to aggregate multiple objects into a single bundle.

1. Use the `NewBundle `function to create an empty bundle.

```go
// Assemble above two objects into a bundle object
    bundle, err := bundle.NewBundle()
    handleErr(err, "NewBundle")
```

2. Use the bundle's `AppendObject` method to add objects to the bundle individually.
```go
    _, err = bundle.AppendObject("object1", bytes.NewReader(buffer1.Bytes()), nil)
    handleErr(err, "AppendObject")
    _, err = bundle.AppendObject("object2", bytes.NewReader(buffer2.Bytes()), nil)
    handleErr(err, "AppendObject")
```

3. Use the bundle's `FinalizeBundle` method to seal the bundle, preventing any further objects from being added.
```go
    bundledObject, totalSize, err := bundle.FinalizeBundle()
    handleErr(err, "FinalizeBundle")
```

4. To release resources after use, utilize the Close method of the bundle.
```go
 defer bundle.Close()
```

Full example [here](https://github.com/bnb-chain/greenfield-bundle-sdk/blob/master/examples/upload_bundle.go)

### Extract objects from bundled object
Follow the steps below to extract various objects from a bundle.

1. Open the bundled object as a bundle instance using `NewBundleFromFile`.
```go
// Extract objects from bundled object
    bundle, err := bundle.NewBundleFromFile(bundleFile.Name())
    handleErr(err, "NewBundleFromFile")
```
2. Retrieve all the objects' meta within the bundle using the bundle's `GetBundleObjectsMeta` method.
```go
// Extract objects from bundled object
    objMeta, err := bundle.GetBundleObjectsMeta(bundleFile.Name())
    handleErr(err, "GetBundleObjectsMeta")
```
3. Access various objects one by one using the bundle's `GetObject` method.
```go
    obj1, size, err := bundle.GetObject("object1")
    if err != nil || obj1 == nil || size != singleObjectSize {
        handleErr(fmt.Errorf("parse object1 in bundled object failed: %v", err), "GetObject")
    }
    obj2, size, err := bundle.GetObject("object2")
    if err != nil || obj2 == nil || size != singleObjectSize {
        handleErr(fmt.Errorf("parse object2 in bundled object failed: %v", err), "GetObject")
    }
```

4. To release resources after use, utilize the Close method of the bundle.
```go
 defer bundle.Close()
```

Full example [here](https://github.com/bnb-chain/greenfield-bundle-sdk/blob/master/examples/download_bundle.go)
