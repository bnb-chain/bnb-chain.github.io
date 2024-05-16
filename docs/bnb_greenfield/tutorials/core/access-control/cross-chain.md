---
title: Cross Chain Access Control by SDK
description: How to use the go-SDK library to transfer permission control over objects to the smart contract on BSC and allowing on-chain management.
keywords: [BNB Greenfield, Access control, Permission]
order: 2
---

# Cross Chain Access Control by SDK

In this tutorial we’ll use the go-SDK library to transfer control over objects to the smart contract on BSC and allowing on-chain management. Object mirroring enables greater flexibility and control over decentralized storage on BNB Greenfield to all dApps on BSC. It leverages the capabilities of the BSC and its smart contract functionality to provide enhanced functionality and interoperability between the two platforms.

## Prerequisites
Before getting started, you should be familiar with:

- [Greenfield basics](../../../guide/introduction/introduction.md)
- Greenfield command line [examples](https://github.com/bnb-chain/greenfield-cmd#examples)

## Cross Chain Mechanism
Cross-chain communication serves as the foundation for enabling the exchange of assets, data, and functionalities across disparate blockchains, facilitating a more connected and efficient decentralised ecosystem.

Cross-communication between BNB Greenfield and BSC stands apart from the approaches taken by Polkadot, Chainlink, and Cosmos in several significant aspects.


| **Cross chain communication features** | **BNB Greenfield/BSC**                     | **Cosmos/IBC**             | **Polkadot**                              | **Chainlink CCIP**                           |
| -------------------------------------- | ------------------------------------------ | -------------------------- | ----------------------------------------- | -------------------------------------------- |
| Bulk messaging                         | Custom and performant                      | General application        | General application                       | General application                          |
| Compatibility                          | Fully compatible with EVM and Ethereum L2s | Only Cosmos ecosystem      | Only Polkadot ecosystem                   | Specific implementations for each blockchain |
| Security Model                         | Own validators                             | Shared                     | Shared                                    | Own validators                               |
| Tokenomics                             | BNB                                        | ATOM                       | DOT                                       | LINK                                         |
| Address Scheme                         | Unified - same addresses                   | Can be different addresses | Can be different addresses                | Can be different addresses                   |
| Composability                          | Shared components with BNB Chain ecosystem | Implementation in progress | Shared components with Polkadot ecosystem | New implementation for each network          |

## Account Setup
### Create a Go Project
Let’s set up a Go project with the necessary dependencies.

### Init
```sh
$ mkdir ~/hellogreenfield
$ cd ~/hellogreenfield
$ go mod init hellogreenfield
```

### Add SDK Dependencies
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
### Install dependensies
```sh
go mod tidy
```

### Test a simple function

You can refer to the [overview](../../../tutorials/app/file-management/basic-file-management.md) to learn about how to create a simple `main.go`

If everything is set up correctly, your code will be able to connect to the Greenfield node and return the chain data as shown above.

### Account setup

```go
account, err := types.NewAccountFromPrivateKey("test", privateKey)
	if err != nil {
		log.Fatalf("New account from private key error, %v", err)
	}
	cli, err := client.New(chainId, rpcAddr, client.Option{DefaultAccount: account})
	if err != nil {
		log.Fatalf("unable to new greenfield client, %v", err)
	}
	ctx := context.Background()

```

## Create Buckets
Now, let's use the imported account to create a bucket.

In this example,

```go
	// get storage providers list
	spLists, err := cli.ListStorageProviders(ctx, true)
	if err != nil {
		log.Fatalf("fail to list in service sps")
	}
	// choose the first sp to be the primary SP
	primarySP := spLists[0].GetOperatorAddress()

	bucketName := storageTestUtil.GenRandomBucketName()

	txHash, err := cli.CreateBucket(ctx, bucketName, primarySP, types.CreateBucketOptions{})
	handleErr(err, "CreateBucket")
	log.Printf("create bucket %s on SP: %s successfully \n", bucketName, spLists[0].Endpoint)

	waitForTx, _ := cli.WaitForTx(ctx, txHash)
	log.Printf("Wait for tx: %s", waitForTx.TxResult.String())
```

The example return message is like the following:

```shell
2023/10/31 13:14:54 create bucket ylatitsb on SP: https://gnfd-testnet-sp1.bnbchain.org successfully
2023/10/31 13:14:54 Wait for tx: data:"\0225\n+/greenfield.storage.MsgCreateBucketResponse\022\006\n\0043175\032\010\000\000\000\000\000\000\201\006" log:"[{\"msg_index\":0,\"events\":[{\"type\":\"message\",\"attributes\":[{\"key\":\"action\",\"value\":\"/greenfield.storage.MsgCreateBucket\"},{\"key\":\"sender\",\"value\":\"0x525482AB3922230e4D73079890dC905dCc3D37cd\"},{\"key\":\"module\",\"value\":\"storage\"}]},{\"type\":\"greenfield.storage.EventCreateBucket\",\"attributes\":[{\"key\":\"bucket_id\",\"value\":\"\\\"3175\\\"\"},{\"key\":\"bucket_name\",\"value\":\"\\\"ylatitsb\\\"\"},{\"key\":\"charged_read_quota\",\"value\":\"\\\"0\\\"\"},{\"key\":\"create_at\",\"value\":\"\\\"1698779691\\\"\"},{\"key\":\"global_virtual_group_family_id\",\"value\":\"40\"},{\"key\":\"owner\",\"value\":\"\\\"0x525482AB3922230e4D73079890dC905dCc3D37cd\\\"\"},{\"key\":\"payment_address\",\"value\":\"\\\"0x525482AB3922230e4D73079890dC905dCc3D37cd\\\"\"},{\"key\":\"primary_sp_id\",\"value\":\"1\"},{\"key\":\"source_type\",\"value\":\"\\\"SOURCE_TYPE_ORIGIN\\\"\"},{\"key\":\"status\",\"value\":\"\\\"BUCKET_STATUS_CREATED\\\"\"},{\"key\":\"visibility\",\"value\":\"\\\"VISIBILITY_TYPE_PRIVATE\\\"\"}]}]}]" gas_wanted:2400 gas_used:2400 events:<type:"coin_spent" attributes:<key:"spender" value:"0x525482AB3922230e4D73079890dC905dCc3D37cd" index:true > attributes:<key:"amount" value:"12000000000000BNB" index:true > > events:<type:"coin_received" attributes:<key:"receiver" value:"0xf1829676DB577682E944fc3493d451B67Ff3E29F" index:true > attributes:<key:"amount" value:"12000000000000BNB" index:true > > events:<type:"transfer" attributes:<key:"recipient" value:"0xf1829676DB577682E944fc3493d451B67Ff3E29F" index:true > attributes:<key:"sender" value:"0x525482AB3922230e4D73079890dC905dCc3D37cd" index:true > attributes:<key:"amount" value:"12000000000000BNB" index:true > > events:<type:"message" attributes:<key:"sender" value:"0x525482AB3922230e4D73079890dC905dCc3D37cd" index:true > > events:<type:"tx" attributes:<key:"fee" value:"12000000000000BNB" index:true > attributes:<key:"fee_payer" value:"0x525482AB3922230e4D73079890dC905dCc3D37cd" index:true > > events:<type:"tx" attributes:<key:"acc_seq" value:"0x525482AB3922230e4D73079890dC905dCc3D37cd/70" index:true > > events:<type:"tx" attributes:<key:"signature" value:"aKL7wpB1b0107d1OleaHKKBw5mXUskggINbq7hsr90s6MzgV88DxjAGak37xz9V4LsoH0sr7saqBmBrE5MKJtgA=" index:true > > events:<type:"message" attributes:<key:"action" value:"/greenfield.storage.MsgCreateBucket" index:true > attributes:<key:"sender" value:"0x525482AB3922230e4D73079890dC905dCc3D37cd" index:true > attributes:<key:"module" value:"storage" index:true > > events:<type:"greenfield.storage.EventCreateBucket" attributes:<key:"bucket_id" value:"\"3175\"" index:true > attributes:<key:"bucket_name" value:"\"ylatitsb\"" index:true > attributes:<key:"charged_read_quota" value:"\"0\"" index:true > attributes:<key:"create_at" value:"\"1698779691\"" index:true > attributes:<key:"global_virtual_group_family_id" value:"40" index:true > attributes:<key:"owner" value:"\"0x525482AB3922230e4D73079890dC905dCc3D37cd\"" index:true > attributes:<key:"payment_address" value:"\"0x525482AB3922230e4D73079890dC905dCc3D37cd\"" index:true > attributes:<key:"primary_sp_id" value:"1" index:true > attributes:<key:"source_type" value:"\"SOURCE_TYPE_ORIGIN\"" index:true > attributes:<key:"status" value:"\"BUCKET_STATUS_CREATED\"" index:true > attributes:<key:"visibility" value:"\"VISIBILITY_TYPE_PRIVATE\"" index:true > >
```

* Query the bucket with `HeadBucket` function
```go
	// head bucket
	bucketInfo, err := cli.HeadBucket(ctx, bucketName)
	handleErr(err, "HeadBucket")
	log.Println("bucket info:", bucketInfo.String())
```
The example return message is like the following:
```shell
2023/10/31 13:14:54 bucket info: owner:"0x525482AB3922230e4D73079890dC905dCc3D37cd" bucket_name:"ylatitsb" visibility:VISIBILITY_TYPE_PRIVATE id:"3175" create_at:1698779691 payment_address:"0x525482AB3922230e4D73079890dC905dCc3D37cd" global_virtual_group_family_id:40
```
## Create Group
The next step is to create a group, whose member will receive `get object` access from the principla account.

```go
  // create group
  groupTx, err := cli.CreateGroup(ctx, groupName, types.CreateGroupOptions{})
  handleErr(err, "CreateGroup")
  _, err = cli.WaitForTx(ctx, groupTx)
  if err != nil {
    log.Fatalln("txn fail")
  }

  log.Printf("create group %s successfully \n", groupName)

  // head group info
  creator, err := cli.GetDefaultAccount()
  handleErr(err, "GetDefaultAccount")
  groupInfo, err := cli.HeadGroup(ctx, groupName, creator.GetAddress().String())
  handleErr(err, "HeadGroup")
  log.Println("head group info:", groupInfo.String())

  _, err = sdk.AccAddressFromHexUnsafe(memberAddress)
  if err != nil {
    log.Fatalln("the group member is invalid")
  }
  // add group member
  updateTx, err := cli.UpdateGroupMember(ctx, groupName, creator.GetAddress().String(), []string{memberAddress}, []string{},
    types.UpdateGroupMemberOption{})
  handleErr(err, "UpdateGroupMember")
  _, err = cli.WaitForTx(ctx, updateTx)
  if err != nil {
    log.Fatalln("txn fail")
  }

  log.Printf("add group member: %s to group: %s successfully \n", memberAddress, groupName)

  // head group member
  memIsExist := cli.HeadGroupMember(ctx, groupName, creator.GetAddress().String(), memberAddress)
  if !memIsExist {
    log.Fatalf("head group member %s fail \n", memberAddress)
  }

  log.Printf(" head member %s exist \n", memberAddress)
```

The result should look something similar to the following:
```shell
2023/10/31 09:34:54 create group sample-group successfully
2023/10/31 09:34:54 head group info: owner:"0x525482AB3922230e4D73079890dC905dCc3D37cd" group_name:"sample-group" id:"720"
2023/10/31 09:35:01 add group member: 0x843e77D639b6C382e91ef489881963209cB238E5 to group: sample-group successfully
2023/10/31 09:35:01  head member 0x843e77D639b6C382e91ef489881963209cB238E5 exist
```

## Create Policy
Now, you can let the principal grants the `get object`  access to this group
```go
// put bucket policy
	bucketActions := []permTypes.ActionType{
    	permTypes.ACTION_GET_OBJECT,
	}
	ctx := context.Background()
	statements := utils.NewStatement(bucketActions, permTypes.EFFECT_ALLOW, nil, types.NewStatementOptions{})

	policyTx, err := cli.PutBucketPolicy(ctx, bucketName, principalStr, []*permTypes.Statement{&statements},
		types.PutPolicyOption{})
	handleErr(err, "PutBucketPolicy")
	_, err = cli.WaitForTx(ctx, policyTx)
	if err != nil {
		log.Fatalln("txn fail")
	}
	log.Printf("put bucket %s policy sucessfully, principal is: %s.\n", bucketName, principal)
```

After you run the code, the result should look something similar to the following:

```shell
2023/10/31 10:46:55 put bucket sdkexamplebucket policy sucessfully, principal is:
2023/10/31 10:46:55 bucket: sdkexamplebucket policy info:id:"2358" principal:<type:PRINCIPAL_TYPE_GNFD_ACCOUNT value:"0x843e77D639b6C382e91ef489881963209cB238E5" > resource_type:RESOURCE_TYPE_BUCKET resource_id:"429" statements:<effect:EFFECT_ALLOW actions:ACTION_UPDATE_BUCKET_INFO actions:ACTION_DELETE_BUCKET actions:ACTION_DELETE_OBJECT actions:ACTION_GET_OBJECT >
```
You can also inspect using the block scanner, e.g. [https://greenfieldscan.com](https://greenfieldscan.com/).

## Mirror Group to BSC
In Greenfield, object mirroring refers to the process of transferring control over objects stored on BNB Greenfield to a smart contract on BNB Smart Chain (BSC)

This allows the object to be fully managed on-chain on BSC, meaning that users or other smart contracts can perform various operations and changes to the object through on-chain transactions.

During the mirroring process from BNB Greenfield to BSC, the content of the file itself is not copied. This means that neither the data nor the file metadata, which is stored on the BNB Greenfield blockchain, is transferred to BSC.


```go
	//head group
	groupInfo, err := cli.HeadGroup(ctx, groupName, creator.GetAddress().String())
  	handleErr(err, "HeadGroup")
  	log.Println("head group info:", groupInfo.String())

	// mirror bucket
	txResp, err := cli.MirrorGroup(ctx, sdk.ChainID(crossChainDestBsChainId), groupInfo.Id, groupName, gnfdSdkTypes.TxOption{})
	handleErr(err, "MirrorGroup")
	waitForTx, _ = cli.WaitForTx(ctx, txResp.TxHash)
	log.Printf("Wait for tx: %s", waitForTx.TxResult.String())
	log.Printf("successfully mirrored group wiht  id %s to BSC", groupInfo.Id)

```

```shell
2023/10/31 21:43:57 group: sdkexamplegroup policy info:id:"712" principal:<type:PRINCIPAL_TYPE_GNFD_ACCOUNT value:"0x843e77D639b6C382e91ef489881963209cB238E5" > resource_type:RESOURCE_TYPE_BUCKET resource_id:"429" statements:<effect:EFFECT_ALLOW actions:ACTION_GET_OBJECT >
2023/10/31 21:43:57 bucket info: owner:"0x525482AB3922230e4D73079890dC905dCc3D37cd" bucket_name:"ylatitsb" visibility:VISIBILITY_TYPE_PRIVATE id:"3175" create_at:1698779691 payment_address:"0x525482AB3922230e4D73079890dC905dCc3D37cd" global_virtual_group_family_id:40
```

You can also inspect using the block scanner, e.g. [https://greenfieldscan.com](https://greenfieldscan.com/).

## Access Control Management on BSC

Now you have mirrored your group to BSC and there is an ERCC-721 token minted. At present, the NFTs are not transferable. The group membership can be directly managed by smart contracts on BSC. These operations will directly affect the storage format, access permissions, and other aspects of the data on greenfield with the help of [Greenfield Contract](https://github.com/bnb-chain/greenfield-contracts/tree/master).

First, you have to install the dependencies and setup environment by following the [guides](https://github.com/bnb-chain/greenfield-contracts/tree/master#requirement).

Once it's all set, you can run the following script to add member to your group:

```
# set your private-key, operator address, group id, and member address
forge script foundry-scripts/GroupHub.s.sol:GroupHubScript \
--private-key ${your private key} \
--sig "addMember(address operator, uint256 groupId, address member)" \
${the owner of the group} ${your group id} ${the member address to add} \
-f https://data-seed-prebsc-1-s1.binance.org:8545/ \
--legacy --ffi --broadcast
```

## Conclusion

The Greenfield Blockchain provides a comprehensive set of resources that can be mirrored on the BNB Smart Chain (BSC). This includes buckets, objects, and groups, which can be stored and managed on the BSC as non-fungible tokens (NFTs) conforming to the ERC-721 standard. This integration between Greenfield Blockchain and BNB Smart Chain allows for greater flexibility and accessibility when it comes to accessing and manipulating data, ultimately leading to a more streamlined and efficient data management process.


### Source Code
* [Go-SDK](https://github.com/bnb-chain/greenfield-go-sdk/blob/master/examples/crosschain.go)
* [JS-SDK](https://github.com/bnb-chain/greenfield-js-sdk/blob/main/examples/nextjs/src/components/mirror/index.tsx)
* [Greenfield Contract Examples](https://github.com/bnb-chain/greenfield-contracts/tree/master/foundry-scripts/examples).
