---
title: Go SDK Example
---

# Quickstart


The Greenfield SDK for Go provides APIs and utilities that developers can use to build Go applications that use Greenfield services, such as data storage and permission management.

The SDK simplifies the process of programming directly with a web service interface. It takes care of many underlying details, including authentication, retrying requests, and managing errors.

This guide provides configuration information, sample code, and an introduction to the SDK utilities.

## Install


The Greenfield SDK for Go requires [Go 1.20 or later](https://go.dev/).You can view your current version of Go by running the go version command. For information about installing or upgrading your version of Go, see https://golang.org/doc/install.

To install the SDK and its dependencies, run the following Go command.

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

## Usage

Now we’re ready to connect to Greenfield testnet and interact with the Greenfield APIs. Let’s write a simple script to query the Greenfield version to verify if everything works as expected.

### Create client

Create a `main.go` file in your project and add the following code.

```go
package main

import (
	"context"
	"log"

	"github.com/bnb-chain/greenfield-go-sdk/client"
	"github.com/bnb-chain/greenfield-go-sdk/types"
)

const (
	privateKey  = ""
	
	// Mainnet Info
	rpcAddr     = "https://greenfield-chain.bnbchain.org:443"
	chainId     = "greenfield_1017-1"
	
	// Testnet Info
	// rpcAddr     = "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org:443"
	// chainId     = "greenfield_5600-1"
	
)

func main() {
	// import acccount
	account, err := types.NewAccountFromPrivateKey("test", privateKey)
	if err != nil {
		log.Fatalf("New account from private key error, %v", err)
	}

	// create client
	cli, err := client.New(chainId, rpcAddr, client.Option{DefaultAccount: account})
	if err != nil {
		log.Fatalf("unable to new greenfield client, %v", err)
	}
	ctx := context.Background()

	// get node info from RPC
	nodeInfo, versionInfo, err := cli.GetNodeInfo(ctx)
	if err != nil {
		log.Fatalf("unable to get node info, %v", err)
	}
	log.Printf("nodeInfo moniker: %s, go version: %s", nodeInfo.Moniker, versionInfo.GoVersion)

	// query latest block height
	height, err := cli.GetLatestBlockHeight(ctx)
	if err != nil {
		log.Fatalf("unable to get latest block height, %v", err)
	}

	log.Printf("Current block height: %d", height)
}
```

Run the following command in your project directory:

```bash
go run main.go
```

This will output something like:

```
2023/06/22 10:44:16 nodeInfo moniker: validator-a, go version: go version go1.20.4 linux/amd64
2023/06/22 10:44:16 Current block height: 817082
```

If everything is set up correctly, your code will be able to connect to the Greenfield node and return the chain data as shown above.

### Queries


In the previous step, we created a `main.go` file to demonstrate the basic steps to connect to the node and initialize a `Client` to query chain data. Next, let’s use some more functions.

#### 1. Get Current Chain Head

We can add the following code in`main.go`to query current head of the chain.

```go
  // query latest block height
  blockByHeight, err := cli.GetBlockByHeight(ctx,height)
	if err != nil {
		log.Fatalf("unable to get block by height, %v", err)
	}
	log.Printf("Current block height: %d", blockByHeight.GetHeader())
```

#### 2. Get Address Balance

With a given greenfield wallet address, you can query its balance by calling `GetAccountBalance` function.

```go
	// query current balance
	balance, err := cli.GetAccountBalance(ctx, account.GetAddress().String())
	if err != nil {
		log.Fatalf("unable to get balance, %v", err)
	}
	log.Printf("%s Current balance: %s", account.GetAddress().String(), balance.String())
```

#### 3. Query Storage Providers


In addition, the SDK provides support for querying the list of storage providers available and offers generic search capabilities for exploring metadata attributes.


```go
	cli, err := client.New(chainId, rpcAddr, client.Option{DefaultAccount: account})
	if err != nil {
		log.Fatalf("unable to new greenfield client, %v", err)
	}
	ctx := context.Background()

	// get storage providers list
	spLists, err := cli.ListStorageProviders(ctx, true)
	if err != nil {
		log.Fatalf("fail to list in service sps")
	}

```

#### 4. Query Storage Price

```go
	// choose the first sp to be the primary SP
	primarySP := spLists[0].GetOperatorAddress()

	// query price for storing data
	price, err := cli.GetStoragePrice(ctx,primarySP)
	if err != nil {
		log.Fatalf("fail to list in service sps")
	}

	log.Printf("Read Price is %s and Store price is %s \n",price.ReadPrice,price.StorePrice)

```

#### 5. Query Buckets

You can query the bucket info like this:

```go
	// head bucket
	bucketInfo, err := cli.HeadBucket(ctx, bucketName)
	handleErr(err, "HeadBucket")
	log.Println("bucket info:", bucketInfo.String())
```

#### 5. Query Objects

List all the objects under the same bucket

```go
    // list object
	objects, err := cli.ListObjects(ctx, bucketName, types.ListObjectsOptions{
		ShowRemovedObject: false, Delimiter: "", MaxKeys: 100, EndPointOptions: &types.EndPointOptions{
			Endpoint:  httpsAddr, // sp endpoint
			SPAddress: "",
		}})
	log.Println("list objects result:")
	for _, obj := range objects.Objects {
		i := obj.ObjectInfo
		log.Printf("object: %s, status: %s\n", i.ObjectName, i.ObjectStatus)
	}
```

Apart from the basic data queries shown above, there are many more features. Please see the[JSON-RPC API Reference](../api/endpoints.md)for all Greenfield API definitions.


### Transactions

#### 1. Manage Wallet

Greenfield wallets hold addresses that you can use to manage objects, sign transactions, and pay for gas fees. In this section, we will demonstrate different ways to manage your wallet.

* First, let’s make sure your connected node is running and the wallet address contains some testnet BNB.
* Create a new file called `account.go` in the same project as earlier. This is where we’ll write all out wallet-related code.
* In `account.go` import modules and initialize your private key or mnemonic phrase.

```go
	//import mnemonic
	account, err := types.NewAccountFromMnemonic("test", mnemonic)
	//import private key
	account, err := types.NewAccountFromPrivateKey("test", privateKey)
```

Let’s create a second wallet address so we can test transfers. The new address will be created locally and start with 0 token balance:

```go
	//create a differet account
	account2, _, err := types.NewAccount("test2")
```

Now, let’s try to transfer tBNB to this new address. Under the hood, this will create a transaction to transfer tBNB from`fromAddress`to`toAddress`, sign the transaction using SDK, and send the signed transaction to the Greenfield node.

```go
	// transfer token to acccount2
	transferTxHash, err := cli.Transfer(ctx, account2.GetAddress().String(), math.NewIntFromUint64(1000000000000000000), types2.TxOption{})
	if err != nil {
		log.Fatalf("unable to send, %v", err)
	}
	log.Printf("Transfer response: %s", transferTxHash)

	// wait for transaction hash
	waitForTx, err := cli.WaitForTx(ctx, transferTxHash)

	log.Printf("Wait for tx: %s", waitForTx.String())

	//verify account2's balance
	balance, err = cli.GetAccountBalance(ctx, account2.GetAddress().String())
```

Run the code to test the transfer of tBNB:

```go
	go run account.go
```

This will output something like:

```shell
raw_log: '[{"msg_index":0,"events":[{"type":"message","attributes":[{"key":"action","value":"/cosmos.bank.v1beta1.MsgSend"},{"key":"sender","value":"0x525482AB3922230e4D73079890dC905dCc3D37cd"},{"key":"module","value":"bank"}]},{"type":"coin_spent","attributes":[{"key":"spender","value":"0x525482AB3922230e4D73079890dC905dCc3D37cd"},{"key":"amount","value":"1BNB"}]},{"type":"coin_received","attributes":[{"key":"receiver","value":"0x78C3A3d10B1032bB2810366361dCE84E2e92eFCB"},{"key":"amount","value":"1BNB"}]},{"type":"transfer","attributes":[{"key":"recipient","value":"0x78C3A3d10B1032bB2810366361dCE84E2e92eFCB"},{"key":"sender","value":"0x525482AB3922230e4D73079890dC905dCc3D37cd"},{"key":"amount","value":"1BNB"}]},{"type":"message","attributes":[{"key":"sender","value":"0x525482AB3922230e4D73079890dC905dCc3D37cd"}]}]}]'
timestamp: "2023-06-22T20:02:19Z"
tx:
  '@type': /cosmos.tx.v1beta1.Tx
  auth_info:
    fee:
      amount:
      - amount: "6000000000000"
        denom: BNB
      gas_limit: "1200"
      granter: ""
      payer: ""
    signer_infos:
    - mode_info:
        single:
          mode: SIGN_MODE_EIP_712
      public_key:
        '@type': /cosmos.crypto.eth.ethsecp256k1.PubKey
        key: AirjhHwjRcZ34op5yCKHtDkn91RDgFOY8cJmbHH6Tmlu
      sequence: "12"
    tip: null
  body:
    extension_options: []
    memo: ""
    messages:
    - '@type': /cosmos.bank.v1beta1.MsgSend
      amount:
      - amount: "1"
        denom: BNB
      from_address: 0x525482AB3922230e4D73079890dC905dCc3D37cd
      to_address: 0x78C3A3d10B1032bB2810366361dCE84E2e92eFCB
    non_critical_extension_options: []
    timeout_height: "0"
  signatures:
  - FjUNT2dzpQZhCmVTLDGMEy1uR1NaNLeYjvqQiPr2xHM5xxeYP5Mic8CSxZtg3k4WHcAIEnQNcszqBi7fsgETagA=
txhash: DFC2CE0514FE334B5BCB6BC3EBCCCD7A6E16B4CAEDC4FFDBE3F2FA3B6E548E61
```

### Make A Storage Deal

Storing data is one of the most important features of Greenfield. In this section, we’ll walk through the end-to-end process of storing your data on the Greenfield network. We’ll start by importing your data, then make a storage deal with a storage provider, and finally wait for the deal to complete.

#### 1. Create a `storage.go` file

Create a `storage.go` file in yourdemoproject and add the following boilerplate code:

```go
func main() {

  // initialize account
  account, err := types.NewAccountFromPrivateKey("test", privateKey)
  log.Println("address info:", account)

  if err != nil {
	  log.Fatalf("New account from private key error, %v", err)
  }

  //initialize client
  cli, err := client.New(chainId, rpcAddr, client.Option{DefaultAccount: account})
  if err != nil {
	  log.Fatalf("unable to new greenfield client, %v", err)
  }
  ctx := context.Background()

  // 1. choose storage provider

  // 2. Create a bucket

  // 3. Upload your data and set a quota
}
```


#### 2. Choose SP

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

#### 3. Create Buckets

Bucket can be private or public. You can customize it with options.

*   VISIBILITY\_TYPE\_PUBLIC\_READ
*   VISIBILITY\_TYPE\_PRIVATE

```go
	chargedQuota := uint64(100)
	visibility := storageTypes.VISIBILITY_TYPE_PUBLIC_READ
	opts := types.CreateBucketOptions{Visibility: visibility, ChargedQuota: chargedQuota}
```

To understand how does `quota` work, read [this](https://docs.bnbchain.org/greenfield-docs/docs/guide/core-concept/billing-payment#storage-service-fee).



#### 4. Upload Objects

Objects can also be private or public.


Uploading objects is composed of two parts: `create` and `put`.

*   `CreateObject` gets an approval of creating an object and sends createObject txn to Greenfield network.
*   `PutObject` supports the second stage of uploading the object to bucket.

```go
    // create and put object
	txnHash, err := cli.CreateObject(ctx, bucketName, objectName, bytes.NewReader(buffer.Bytes()), types.CreateObjectOptions{})

	handleErr(err, "CreateObject")

	// Put your object
	err = cli.PutObject(ctx, bucketName, objectName, int64(buffer.Len()),
		bytes.NewReader(buffer.Bytes()), types.PutObjectOptions{TxnHash: txnHash})
	handleErr(err, "PutObject")

	log.Printf("object: %s has been uploaded to SP\n", objectName)

	//wait for SP to seal your object
	waitObjectSeal(cli, bucketName, objectName)
```

The primary SP syncs with secondary SPs to set up the data redundancy, and then it signs a "`Seal`" transaction with the finalized metadata for storage. If the primary SP determines that it doesn't want to store the file due to whatever reason, it can also "`SealReject`" the request.



### Object Management

#### 1. Read Object

You can call `GetObject` function to download data.

```go
	// get object
	reader, info, err := cli.GetObject(ctx, bucketName, objectName, types.GetObjectOption{})
	handleErr(err, "GetObject")
	log.Printf("get object %s successfully, size %d \n", info.ObjectName, info.Size)
	handleErr(err, "GetObject")
	objectBytes, err := io.ReadAll(reader)
	if !bytes.Equal(objectBytes, buffer.Bytes()) {
		handleErr(errors.New("download content not same"), "GetObject")
	}
```



#### 2. Update Object Visibility

You can call `UpdateObjectVisibility` to change object visibility

```go
	// update object visibility
	updateBucketTx, err := ccli.UpdateBucketVisibility(s.ClientContext, bucketName,
	storageTypes.VISIBILITY_TYPE_PRIVATE, types.UpdateVisibilityOption{})
```

#### 3. Delete Object

The function `DeleteObject` support deleting objects.

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

## Greenfield Client Documentation

### Usage

Import Greenfield Go SDK client package, client package provides a client for interacting with Greenfield blockchain and SPs.

```
    import "github.com/bnb-chain/greenfield-go-sdk/client"
```

Provide Greenfield blockchain RPC endpoint and chainID info, new a Greenfield Go SDK client instance to start the journey.

```go
func New(chainID string, endpoint string, option Option) (Client, error)
```

### API Documentation

The Greenfield Go SDK client wraps lots of APIs for interacting with Greenfield, including account, bank, storage, and 
permission APIs, etc. For more details, you can refer to [Greenfield Go SDK Docs](https://pkg.go.dev/github.com/bnb-chain/greenfield-go-sdk).

## Code Repository
- [Official Go implementation SDK](https://github.com/bnb-chain/greenfield-go-sdk)

## More info

* [Storage Module on Greenfield](https://github.com/bnb-chain/greenfield/blob/master/docs/modules/storage-module.md): The storage module on Greenfield Chain.
* [Storage Provider on Greenfield](https://github.com/bnb-chain/greenfield/blob/master/docs/modules/storage-provider.md): The storage provider on Greenfield Chain.
* [Data Availability Challenge](https://github.com/bnb-chain/greenfield/blob/master/docs/modules/data-availability-challenge.md): The correctness of payload be stored in SP.
* [Storage Provider Introduction](../guide/storage-provider/index.md): The Greenfield Storage Provider documents.
* [Storage Provider Compiling and Dependencies](../guide/storage-provider/run-book/compile-dependences.md): The detailed introduction to sp compiling and dependencies.
* [Run Local Storage Provider Network](../guide/storage-provider/run-book/run-local-SP-network.md): The introduction to run local SP env for testing.
* [Join SP Network](../guide/storage-provider/run-book/join-SP-network.md): The introduction to join SP network in testnet or mainnet
