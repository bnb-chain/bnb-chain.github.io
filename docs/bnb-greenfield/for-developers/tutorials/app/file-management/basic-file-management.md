---
title: Simple Tool for File Management - BNB Greenfield File Management
order: 1
---

# Building File Management Tool with Greenfield SDK

Several Chain API libraries are available. These libraries manage the low-level logic of connecting to Greenfield node, making requests, and handing the responses.
* [go-sdk](https://github.com/bnb-chain/greenfield-go-sdk)
* [js-sdk](https://github.com/bnb-chain/greenfield-js-sdk)

In this tutorial we’ll use the go-SDK library to interact with testnet.

## Prerequisites
Before getting started, you should be familiar with:
* [Greenfield basics](../../../../introduction.md)
* Greenfield command line [examples](https://github.com/bnb-chain/greenfield-cmd#examples)

Also, make sure you have the following dependencies installed with the latest version:
* Go version above 1.20

## Go-SDK Features
* **basic.go** includes the basic functions to fetch the blockchain info.
* **storage.go** includes the most storage functions such as creating a bucket, uploading files, downloading files, heading, and deleting resources.
* **group.go** includes group-related functions such as creating a group and updating group member.
* **payment.go** includes the payment-related functions to a management payment account.
* **crosschain.go** includes the cross-chain-related functions to transfer or mirror resources to BSC.

## Setup
### Create a Go Project
Let’s set up a Go project with the necessary dependencies.

Init
```sh
$ mkdir ~/hellogreenfield
$ cd ~/hellogreenfield
$ go mod init hellogreenfield
```

Add SDK Dependencies
```sh
$ go get github.com/bnb-chain/greenfield-go-sdk
```

Edit go.mod to replace dependencies
```sh
replace (
    cosmossdk.io/api => github.com/bnb-chain/greenfield-cosmos-sdk/api v0.0.0-20230425074444-eb5869b05fe9
    cosmossdk.io/math => github.com/bnb-chain/greenfield-cosmos-sdk/math v0.0.0-20230425074444-eb5869b05fe9
    github.com/cometbft/cometbft => github.com/bnb-chain/greenfield-cometbft v0.0.2
    github.com/cometbft/cometbft-db => github.com/bnb-chain/greenfield-cometbft-db v0.8.1-alpha.1
    github.com/cosmos/cosmos-sdk => github.com/bnb-chain/greenfield-cosmos-sdk v0.2.3
    github.com/cosmos/iavl => github.com/bnb-chain/greenfield-iavl v0.20.1-alpha.1
    github.com/syndtr/goleveldb => github.com/syndtr/goleveldb v1.0.1-0.20210819022825-2ae1ddf74ef7
)
```

Install dependensies
```sh
go mod tidy
```

### Test a simple function
Now we’re ready to connect to Greenfield testnet and interact with the storage provider APIs. Let’s write a simple script to query the Greenfield version to verify if everything works as expected.

Create a ```main.go``` file in your project and add the following code.
```go
package main

import (
  "context"
  "log"

  "github.com/bnb-chain/greenfield-go-sdk/client"
  "github.com/bnb-chain/greenfield-go-sdk/types"
)

const (
  rpcAddr    = "https://greenfield-chain.bnbchain.org:443"
  chainId    = "greenfield_1017-1"
  /*testnet
  rpcAddr    = "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org:443"
  chainId    = "greenfield_5600-1"
  */
  privateKey = ""
)

func main() {
  account, err := types.NewAccountFromPrivateKey("test", privateKey)
  if err != nil {
    log.Fatalf("New account from private key error, %v", err)
  }

  cli, err := client.New(chainId, rpcAddr, client.Option{DefaultAccount: account})
  if err != nil {
    log.Fatalf("unable to new greenfield client, %v", err)
  }

  ctx := context.Background()
  nodeInfo, versionInfo, err := cli.GetNodeInfo(ctx)
  if err != nil {
    log.Fatalf("unable to get node info, %v", err)
  }

  log.Printf("nodeInfo moniker: %s, go version: %s", nodeInfo.Moniker, versionInfo.GoVersion)
  latestBlock, err := cli.GetLatestBlock(ctx)
  if err != nil {
    log.Fatalf("unable to get latest block, %v", err)
  }
  log.Printf("latestBlock header: %s", latestBlock.Header)

  heightBefore := latestBlock.Header.Height
  log.Printf("Wait for block height: %d", heightBefore)
  err = cli.WaitForBlockHeight(ctx, heightBefore+10)
  if err != nil {
    log.Fatalf("unable to wait for block height, %v", err)
  }
  height, err := cli.GetLatestBlockHeight(ctx)
  if err != nil {
    log.Fatalf("unable to get latest block height, %v", err)
  }

  log.Printf("Current block height: %d", height)
}
```

Run the following command in your project directory:
```
go run main.go
```
This will output something like:
```
2023/09/12 22:18:10 nodeInfo moniker: fullnode, go version: go version go1.20.7 linux/amd64
2023/09/12 22:18:10 latestBlock header: {{%!s(uint64=11) %!s(uint64=0)} greenfield_5600-1 %!s(int64=401149) 2023-09-13 04:18:05.661693468 +0000 UTC
{
    "header": {
      "version": {
        "block": "11",
        "app": "0"
      },
      "chain_id": "greenfield_5600-1",
      "height": "401149",
      "time": "2023-09-13T04:18:05.661693468Z",
      "last_block_id": {
        "hash": "KenBGYDrtA7Bnyy6j3R3d16GWuHnIl5gJW0J3kmM4r8=",
        "part_set_header": {
          "total": 1,
          "hash": "W6nmeVJEhHinvI4I6HBsU/A87Zma8DVVvddBATJdctE="
        }
      },
      "last_commit_hash": "/G92Jzr8fPpqKY89F3xa3dytOF8a2HLvqCrccm9scXM=",
      "data_hash": "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
      "validators_hash": "FykCd/548F1J28ssZr71B1805hzxENaQvexsW/Dxo3E=",
      "next_validators_hash": "FykCd/548F1J28ssZr71B1805hzxENaQvexsW/Dxo3E=",
      "consensus_hash": "FgA8CM0pWCco2OYq8pA9tuklVX8bmHmMV2Ssdj31W4E=",
      "app_hash": "wv+XqXhJBQPYpat/Obaj00u86KfJ8le4LIIFFAgqVmA=",
      "last_results_hash": "f6XeDeH8QasoTSGpSJL0r2WGE4MlrXOVt0cE3bIQE8I=",
      "evidence_hash": "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
      "proposer_address": "KhlQ9bz1O8iaWZnqKe36m3IpcP4=",
      "randao_mix": "/6zQmCJztTeqZIRHe/pXxhgSbfwDLE85awoa4c8sShUUwGGLqFyshMag63MTB7JC2fAsUqPg1ryALY+uQNZ3Bw=="
    }
}
2023/09/12 22:18:10 Wait for block height: 401149
2023/09/12 22:18:34 Current block height: 401159
```
If everything is set up correctly, your code will be able to connect to the Greenfield node and return the chain data as shown above.

## Get Chain Data
In the previous step, we created a ```main.go``` file to demonstrate the basic steps to connect to the node and initialize a ```Client``` to query chain data. Next, let’s use some more functions.
Get current chain head:
We can add the following code in main.go to query current head of the chain.

```go
  blockByHeight, err := cli.GetBlockByHeight(ctx, height)
  if err != nil {
  	log.Fatalf("unable to get block by height, %v", err)
  }
  log.Printf("Current block height: %d", blockByHeight.Header)
```

##  Get Address balance
With a given greenfield wallet address, you can query its balance by calling ```GetAccountBalance``` function.
```go
  balance, err := cli.GetAccountBalance(ctx, account.GetAddress().String())
  if err != nil {
    log.Fatalf("unable to get balance, %v", err)
  }
  log.Printf("%s Current balance: %s", account.GetAddress().String(), balance.String())
```

Apart from the basic data queries shown above, there are many more features. Please see the [JSON-RPC API Reference](../../../network-endpoint/endpoints.md) for all Greenfield API definitions.

## Manage Wallet
Greenfield wallets hold addresses that you can use to manage objects, sign transactions, and pay for gas fees. In this section, we will demonstrate different ways to manage your wallet.
1. First, let’s make sure your connected node is running and the wallet address contains some testnet BNB.
2. Create a new file called ```account.go``` in the same project as earlier. This is where we’ll write all out wallet-related code.
3. In ```account.go``` import modules and initialize your private key or mnemonic phrase.

```go
  //import mnemonic
  account, err := types.NewAccountFromMnemonic("test", mnemonic)
  //import private key
  account, err := types.NewAccountFromPrivateKey("test", privateKey)
```

Let’s create a second wallet address so we can test transfers. The new address will be created locally and start with 0 token balance:
```go
  account2, _, err := types.NewAccount("test2")
```

Now, let’s try to transfer tBNB to this new address. Under the hood, this will create a transaction to transfer tBNB from fromAddress to toAddress, sign the transaction using SDK, and send the signed transaction to the Greenfield node.
```go
    transferTxHash, err := cli.Transfer(ctx, account2.GetAddress().String(), math.NewIntFromUint64(10000000000), types2.TxOption{})
   if err != nil {
    log.Fatalf("unable to send, %v", err)
   }
   log.Printf("Transfer response: %s", transferTxHash)

   waitForTx, err := cli.WaitForTx(ctx, transferTxHash)

   log.Printf("Wair for tx: %s", waitForTx.TxResult.String())

   balance, err = cli.GetAccountBalance(ctx, account2.GetAddress().String())
 ```

Run the code to test the transfer of tBNB:
```sh
go run account.go
```

This will output something like:
```
2023/09/07 11:18:51 Wair for tx: data:"\022&\n$/cosmos.bank.v1beta1.MsgSendResponse\032\010\000\000\000\000\000\000\372\235" log:"[{\"msg_index\":0,\"events\":[{\"type\":\"message\",\"attributes\":[{\"key\":\"action\",\"value\":\"/cosmos.bank.v1beta1.MsgSend\"},{\"key\":\"sender\",\"value\":\"0x525482AB3922230e4D73079890dC905dCc3D37cd\"},{\"key\":\"module\",\"value\":\"bank\"}]},{\"type\":\"coin_spent\",\"attributes\":[{\"key\":\"spender\",\"value\":\"0x525482AB3922230e4D73079890dC905dCc3D37cd\"},{\"key\":\"amount\",\"value\":\"10000000000BNB\"}]},{\"type\":\"coin_received\",\"attributes\":[{\"key\":\"receiver\",\"value\":\"0x525482AB3922230e4D73079890dC905dCc3D37cd\"},{\"key\":\"amount\",\"value\":\"10000000000BNB\"}]},{\"type\":\"transfer\",\"attributes\":[{\"key\":\"recipient\",\"value\":\"0x525482AB3922230e4D73079890dC905dCc3D37cd\"},{\"key\":\"sender\",\"value\":\"0x525482AB3922230e4D73079890dC905dCc3D37cd\"},{\"key\":\"amount\",\"value\":\"10000000000BNB\"}]},{\"type\":\"message\",\"attributes\":[{\"key\":\"sender\",\"value\":\"0x525482AB3922230e4D73079890dC905dCc3D37cd\"}]}]}]" gas_wanted:1200 gas_used:1200 events:<type:"coin_spent" attributes:<key:"spender" value:"0x525482AB3922230e4D73079890dC905dCc3D37cd" index:true > attributes:<key:"amount" value:"6000000000000BNB" index:true > > events:<type:"coin_received" attributes:<key:"receiver" value:"0xf1829676DB577682E944fc3493d451B67Ff3E29F" index:true > attributes:<key:"amount" value:"6000000000000BNB" index:true > > events:<type:"transfer" attributes:<key:"recipient" value:"0xf1829676DB577682E944fc3493d451B67Ff3E29F" index:true > attributes:<key:"sender" value:"0x525482AB3922230e4D73079890dC905dCc3D37cd" index:true > attributes:<key:"amount" value:"6000000000000BNB" index:true > > events:<type:"message" attributes:<key:"sender" value:"0x525482AB3922230e4D73079890dC905dCc3D37cd" index:true > > events:<type:"tx" attributes:<key:"fee" value:"6000000000000BNB" index:true > attributes:<key:"fee_payer" value:"0x525482AB3922230e4D73079890dC905dCc3D37cd" index:true > > events:<type:"tx" attributes:<key:"acc_seq" value:"0x525482AB3922230e4D73079890dC905dCc3D37cd/0" index:true > > events:<type:"tx" attributes:<key:"signature" value:"plUsfX6lsI0PLjPfFRY7RvYafQ9GK4gAh3pZHddcMdsR9wJRgKUVJ/JDy4HrIEI+qYHP1bGUOxWExmsVdab0xwE=" index:true > > events:<type:"message" attributes:<key:"action" value:"/cosmos.bank.v1beta1.MsgSend" index:true > attributes:<key:"sender" value:"0x525482AB3922230e4D73079890dC905dCc3D37cd" index:true > attributes:<key:"module" value:"bank" index:true > > events:<type:"coin_spent" attributes:<key:"spender" value:"0x525482AB3922230e4D73079890dC905dCc3D37cd" index:true > attributes:<key:"amount" value:"10000000000BNB" index:true > > events:<type:"coin_received" attributes:<key:"receiver" value:"0x525482AB3922230e4D73079890dC905dCc3D37cd" index:true > attributes:<key:"amount" value:"10000000000BNB" index:true > > events:<type:"transfer" attributes:<key:"recipient" value:"0x525482AB3922230e4D73079890dC905dCc3D37cd" index:true > attributes:<key:"sender" value:"0x525482AB3922230e4D73079890dC905dCc3D37cd" index:true > attributes:<key:"amount" value:"10000000000BNB" index:true > > events:<type:"message" attributes:<key:"sender" value:"0x525482AB3922230e4D73079890dC905dCc3D37cd" index:true > >
```

## Make a storage deal
Storing data is one of the most important features of Greenfield. In this section, we’ll walk through the end-to-end process of storing your data on the Greenfield network. We’ll start by importing your data, then make a storage deal with a storage provider, and finally wait for the deal to complete.

### 1. Create a main file
Create a ```storage.go``` file in your demo project and add the following boilerplate code:
```go
func main() {​
  // initialize account
  account, err := types.NewAccountFromPrivateKey("test", privateKey)
  log.Println("address info:", account)​
  if err != nil {
    log.Fatalf("New account from private key error, %v", err)
  }

  //initialize client
  cli, err := client.New(chainId, rpcAddr, client.Option {DefaultAccount: account})
  if err != nil {
    log.Fatalf("unable to new greenfield client, %v", err)
  }

  ctx := context.Background()​

  // 1. choose storage provider
  // 2. Create a bucket
  // 3. Upload your data and set a quota      ​
}
```

### 2. Choose your own SP
You can query the list of SP.
```go
  // get storage providers list
  spLists, err := cli.ListStorageProviders(ctx, true)
  if err != nil {
    log.Fatalf("fail to list in service sps")
  }

  //choose the first sp to be the primary SP
  primarySP := spLists[0].GetOperatorAddress()
```

### 3. Create your bucket
Bucket can be private or public. You can customize it with options.
* VISIBILITY_TYPE_PUBLIC_READ
* VISIBILITY_TYPE_PRIVATE
```go
  chargedQuota := uint64(10000000)
  visibility := storageTypes.VISIBILITY_TYPE_PUBLIC_READ
  opts := types.CreateBucketOptions{Visibility: visibility, ChargedQuota: chargedQuota}

  bucketTx, err := cli.CreateBucket(ctx, bucketName, primarySP, opts)
  if err != nil {
    log.Fatalf("unable to send, %v", err)
  }
  log.Printf("Create bucket response: %s", bucketTx)
```
To understand how does `quota` work, read [this doc](../../../../core-concept/billing-payment.md#storage-service-fee).

### 4. Upload your object
Objects can also be private or public.
Uploading objects is composed of two parts: create and put.
* ```CreateObject``` gets an approval of creating an object and sends createObject txn to Greenfield network.
* ```PutObject``` supports the second stage of uploading the object to bucket.

```go
  // create and put object
  var buffer bytes.Buffer
  line := `0123456789`
  for i := 0; i < objectSize/10; i++ {
    buffer.WriteString(fmt.Sprintf("%s", line))
  }

  txnHash, err := cli.CreateObject(ctx, bucketName, objectName, bytes.NewReader(buffer.Bytes()), types.CreateObjectOptions{})

  handleErr(err, "CreateObject")

  err = cli.PutObject(ctx, bucketName, objectName, int64(buffer.Len()),
    bytes.NewReader(buffer.Bytes()), types.PutObjectOptions{TxnHash: txnHash})
  handleErr(err, "PutObject")

  log.Printf("object: %s has been uploaded to SP\n", objectName)

  waitObjectSeal(cli, bucketName, objectName)
```

```go
  func waitObjectSeal(cli client.Client, bucketName, objectName string) {
    ctx := context.Background()
    // wait for the object to be sealed
    timeout := time.After(15 * time.Second)
    ticker := time.NewTicker(2 * time.Second)

    for {
      select {
      case <-timeout:
        err := errors.New("object not sealed after 15 seconds")
        handleErr(err, "HeadObject")
      case <-ticker.C:
        objectDetail, err := cli.HeadObject(ctx, bucketName, objectName)
        handleErr(err, "HeadObject")
        if objectDetail.ObjectInfo.GetObjectStatus().String() == "OBJECT_STATUS_SEALED" {
          ticker.Stop()
          fmt.Printf("put object %s successfully \n", objectName)
          return
        }
      }
    }
  }
```

The primary SP syncs with secondary SPs to set up the data redundancy, and then it signs a `Seal` transaction with the finalized metadata for storage. If the primary SP determines that it doesn't want to store the file due to whatever reason, it can also "SealReject" the request.

### 5. Object management

#### 5.1 Read object
You can call ```GetObject``` function to download data.
```go
  // get object
  reader, info, err := cli.GetObject(ctx, bucketName, objectName, types.GetObjectOptions{})
  handleErr(err, "GetObject")
  log.Printf("get object %s successfully, size %d \n", info.ObjectName, info.Size)
  handleErr(err, "GetObject")
  objectBytes, err := io.ReadAll(reader)
  fmt.Printf("Read data: %s\n", string(objectBytes))

```

#### 5.2 Update object visibility
* You can call ```UpdateBucketVisibility``` to change bucket visibility
* You can call ```UpdateObjectVisibility``` to change object visibility

```go
  //update bucket visibility
  updateBucketTx, err := cli.UpdateBucketVisibility(ctx, bucketName,
              storageTypes.VISIBILITY_TYPE_PRIVATE, types.UpdateVisibilityOption{})

  resp, err := cli.WaitForTx(ctx, updateBucketTx)
  fmt.Printf("Update response: %s\n", resp)
  handleErr(err, "UpdateBucketVisibility")

  // Update object visibility
  updateObjectTx, err := cli.UpdateObjectVisibility(ctx, bucketName,objectName,
              storageTypes.VISIBILITY_TYPE_PRIVATE, types.UpdateObjectOption{})

  resp, err := cli.WaitForTx(ctx, updateObjectTx)
  fmt.Printf("Update response: %s\n", resp)
  handleErr(err, "UpdateObjectVisibility")
 ```

#### 5.3 Delete object
The function DeleteObject support deleting objects.
```go
  // delete object
  delTx, err := cli.DeleteObject(ctx, bucketName, objectName, types.DeleteObjectOption{})
  handleErr(err, "DeleteObject")
  _, err = cli.WaitForTx(ctx, delTx)
  if err != nil {
    log.Fatalln("txn fail")
  }
  log.Printf("object: %s has been deleted\n", objectName)
```

## Conclusion
Congratulations on making it all the way through this tutorial! In this tutorial, we learned the basics of interacting with the Greenfield network using SDK library.

### Source Code
* [Go-SDK](https://github.com/bnb-chain/greenfield-go-sdk/blob/master/examples/storage.go)
* [JS-SDK](https://github.com/bnb-chain/greenfield-js-sdk/blob/main/examples/nodejs/storage.js)
