---
title: Greenfield SDK
---

# Greenfield SDK

Client libraries for [BNB Greenfield](https://greenfield.bnbchain.org/) decentralized storage: buckets, objects, permissions, and cross-chain integration.

| Language | Repository | API reference |
|----------|------------|---------------|
| **Go** | [greenfield-go-sdk](https://github.com/bnb-chain/greenfield-go-sdk) | [pkg.go.dev](https://pkg.go.dev/github.com/bnb-chain/greenfield-go-sdk) |
| **JavaScript** | [greenfield-js-sdk](https://github.com/bnb-chain/greenfield-js-sdk) | [JS SDK docs](https://docs.bnbchain.org/greenfield-js-sdk/) |

[← Developer Kit overview](../index.md)

---

=== "Go"

    # Quickstart


    The Greenfield SDK for Go provides APIs and utilities that developers can use to build Go applications that use Greenfield services, such as data storage and permission management.

    The SDK simplifies the process of programming directly with a web service interface. It takes care of many underlying details, including authentication, retrying requests, and managing errors.

    This guide provides configuration information, sample code, and an introduction to the SDK utilities.

    ## Install


    The Greenfield SDK for Go requires [Go 1.20 or later](https://go.dev/). You can view your current version of Go by running the go version command. For information about installing or upgrading your version of Go, see [https://golang.org/doc/install](https://golang.org/doc/install).

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

    Apart from the basic data queries shown above, there are many more features. Please see the [JSON-RPC API Reference](../../bnb-greenfield/for-developers/network-endpoint/endpoints.md) for all Greenfield API definitions.


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
    raw_log: '[{"msg_index":0,"events":[{"type":"message","attributes":[{"key":"action","value":"/cosmos.bank.v1beta1.MsgSend"},{"key":"sender","value":"<sender-address>"},{"key":"module","value":"bank"}]},{"type":"coin_spent","attributes":[{"key":"spender","value":"<sender-address>"},{"key":"amount","value":"1BNB"}]},{"type":"coin_received","attributes":[{"key":"receiver","value":"<receiver-address>"},{"key":"amount","value":"1BNB"}]},{"type":"transfer","attributes":[{"key":"recipient","value":"<receiver-address>"},{"key":"sender","value":"<sender-address>"},{"key":"amount","value":"1BNB"}]},{"type":"message","attributes":[{"key":"sender","value":"<sender-address>"}]}]}]'
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
          from_address: <sender-address>
          to_address: <receiver-address>
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

    To understand how does `quota` work, read [this](../../bnb-greenfield/core-concept/billing-payment.md#storage-service-fee).



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
    * [Storage Provider Introduction](../../bnb-greenfield/storage-provider/overview.md): The Greenfield Storage Provider documents.
    * [Storage Provider Compiling and Dependencies](../../bnb-greenfield/storage-provider/run-book/compile-dependences.md): The detailed introduction to sp compiling and dependencies.
    * [Run Local Storage Provider Network](../../bnb-greenfield/storage-provider/run-book/run-local-SP-network.md): The introduction to run local SP env for testing.
    * [Join SP Network](../../bnb-greenfield/storage-provider/run-book/join-SP-network.md): The introduction to join SP network in testnet or mainnet

=== "JavaScript"

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

    * Chain: [Greenfield Chain API](https://github.com/bnb-chain/greenfield/tree/master/docs/greenfield-api)
    * Storage Provider: [Greenfield Storage Provider API](https://github.com/bnb-chain/greenfield-storage-provider/tree/master/docs/storage-provider-rest-api)

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
      privateKey: '<hex-private-key>'
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
       "address":"<sender-address>",
       "pubKey":{
          "typeUrl":"/cosmos.crypto.eth.ethsecp256k1.PubKey",
          "value":"CiECKuOEfCNFxnfiinnIIoe0OSf3VEOAU5jxwmZscfpOaW4="
       },
       "accountNumber":"5012",
       "sequence":"9"
    }
    ```

    ### Storage Provider Client

    > [https://github.com/bnb-chain/greenfield-storage-provider/tree/master/docs/storage-provider-rest-api](https://github.com/bnb-chain/greenfield-storage-provider/tree/master/docs/storage-provider-rest-api)

    In addition, the SDK provides support for querying the list of storage providers available and offers generic search capabilities for exploring metadata attributes.

    SDK support two [authentication type](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/README.md#authentication-type):

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
        privateKey: '<hex-private-key>'
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

    To begin, create an account and deposit tokens into it on Greenfield. Follow the instructions provided in [Token Transfer](../../bnb-greenfield/getting-started/token-transfer.md). Please be aware that if your account does not have any BNB, the transaction will not be executed.

    #### Choose Storage Provider

    Storing data is one of the most important features of Greenfield. All storage-related apis require the [storage provider](../../bnb-greenfield/storage-provider/overview.md) to be chose.

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
           address: '<wallet-address>',
        }, provider);
        ```

    === "Nodejs"
        
        !!! info
            Nodejs don't need offchainauth.
        
        ```js title="Nodejs"
        // your account
        const ACCOUNT_ADDRESS = '<wallet-address>'
        
        // your account's private key
        const ACCOUNT_PRIVATEKEY = '<hex-private-key>'
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
        creator: '<wallet-address>',
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
