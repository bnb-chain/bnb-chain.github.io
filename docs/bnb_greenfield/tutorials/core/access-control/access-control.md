---
title: Native Access Control
description: How to use Greenfield Go-SDK library to manage your buckets and objects permission.
keywords: [BNB Greenfield, Access control, Permission]
order: 2
---

# Native Access Control

In this tutorial we’ll use the go-SDK library to manage your buckets and objects.

## Prerequisites
Before getting started, you should be familiar with:
* [Greenfield basics](/docs/guide/introduction/overview.md)
* Greenfield command line [examples](https://github.com/bnb-chain/greenfield-cmd#examples)

Also, make sure you have the following dependencies installed with the latest version:
* Go version above 1.20

## Access Control Features

| **Principal**   | **Effect** | **Actions**                                                 | **Resources** | **Duration** |
| --------------- | ---------- | ----------------------------------------------------------- | ------------- | ------------ |
| Accounts/Groups | Allow/Deny | UpdateBucketInfo, DeleteBucket, etc                    | Bucket        |              |
| Accounts/Groups | Allow/Deny | CreateObject,DeleteObject,CopyObject,GetObject,ExecuteObject, etc | Object        |              |
| Accounts/Groups | Allow/Deny | UpdateGroupMember,DeleteGroup, etc                           | Group         |              |


## Setup
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

You can refer to the [overview](/docs/tutorials/app/file-management/basic-file-management) to learn about how to create a simple `main.go`

If everything is set up correctly, your code will be able to connect to the Greenfield node and return the chain data as shown above.


## Account Setup

You have to prepare two accounts, one is the `principal`, which acts like an admimistrator and a member, which will receive the access to view/update objects.

```go
	account, err := types.NewAccountFromPrivateKey("test", privateKey)
	if err != nil {
		log.Fatalf("New account from private key error, %v", err)
	}
	cli, err := client.New(chainId, rpcAddr, client.Option{DefaultAccount: account})
	if err != nil {
		log.Fatalf("unable to new greenfield client, %v", err)
	}
```
## Create Group
The next step is to create a group, whose member will receive access from the principla account.

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
Now, you can let the principal grants the `delete bucket`, `update bucket`, `delete object`, `update object`  access to this group
```go
// put bucket policy
	bucketActions := []permTypes.ActionType{
		permTypes.ACTION_UPDATE_BUCKET_INFO,
		permTypes.ACTION_DELETE_BUCKET,
		permTypes.ACTION_DELETE_OBJECT,
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

#### Verify Policy
Here is an example to verify the policy metadata onchain:
```go
// get bucket policy
  policyInfo, err := cli.GetBucketPolicy(ctx, bucketName, memberAddress)
  handleErr(err, "GetBucketPolicy")
  log.Printf("bucket: %s policy info:%s\n", bucketName, policyInfo.String())

  // verify permission
  effect, err := cli.IsBucketPermissionAllowed(ctx, memberAddress, bucketName, permTypes.ACTION_DELETE_BUCKET)
  handleErr(err, "IsBucketPermissionAllowed")

  if effect != permTypes.EFFECT_ALLOW {
    log.Fatalln("permission not allowed to:", principalStr)
  }
```

If the policy is recorded as expected, you will not see any error.

## Delete Policy
Here is an example to delete your bucket policy.


The `principalStr` can be generated by `NewPrincipalWithAccount` or `NewPrincipalWithGroupId` method.

```go
	// delete bucket policy
	policyTx, err = cli.DeleteBucketPolicy(ctx, bucketName, principalStr, types.DeletePolicyOption{})
	handleErr(err, "DeleteBucketPolicy")
	_, err = cli.WaitForTx(ctx, policyTx)
	if err != nil {
		log.Fatalln("txn fail")
	}
```

### Source Code
* [Go-SDK](https://github.com/bnb-chain/greenfield-go-sdk/blob/master/examples/permission.go)
* [JS-SDK](https://github.com/bnb-chain/greenfield-js-sdk/blob/main/examples/nodejs/cases/policy.js)
