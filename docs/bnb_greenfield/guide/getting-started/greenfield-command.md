---
title: Greenfield Command
description: Guidelines for how to use Greenfield command line tool
order: 7
---

# Greenfield Command

[Greenfield Command](https://github.com/bnb-chain/greenfield-cmd) is a powerful command line for you to manage your resources on Greenfield and interact with Greenfield. 

## Command Tool Guide

This command tool supports basic storage functions, including creating buckets, uploading and downloading files, and deleting resources.
It also supports related operations such as groups, policies, banks, accounts and so on. To make the command display clearer, commands of different categories are implemented as subcommands of different categories. You can use "gnfd-cmd -h" to view the supported command categories.

The command tool supports the "--home" option to specify the path of the config file and the keystore,
the default path is a directory called ".gnfd-cmd" under the home directory of the system.
When running commands that interact with the greenfield, if there is no config/config.toml file under the path and the commands runs without "--config" flag, the tool will generate the config/config.toml file automatically which is consistent with the testnet configuration under the path.

Below is examples of the config file of Testnet and Mainnet. The rpcAddr and chainId should be consistent with the Greenfield network.
For Greenfield Mainnet, you can refer to [Greenfield Mainnet RPC Endpoints](../../api/endpoints.md).
The rpcAddr indicates the Tendermint RPC address with the port info.


The command has the ability to intelligently select the correct storage provider to respond to the request. The user only needs to set the storage provider operator-address if they want to create a bucket on a specific SP. For example, the user can run "gnfd-cmd storage put test gnfd://bucket1/object1" to upload a file to bucket1 and then run "gnfd-cmd storage put test gnfd://bucket2/object" to upload a file to bucket2, which is stored on another SP without changing the config.

## Basic Operations

### Account Operations

Before using the rich features of the command tool, you need to init account info and generate keystore by "account import" or "account new" command .
All the other commands need to load the keystore content before running.

The "import" command imports account info from private key file and generate a keystore by following four steps:

1. Export your private key from MetaMask and write it into a local file as plaintext (You can select "Account Details" from the dropdown menu of MetaMask.
   Click on the "Export Private Key" button at the bottom of the page.)
2. Generate a keystore by the "account import [keyfile]" command. Users need set the private key file path, which is created by step 1.
```shell
// import key and generate a keystore file 
gnfd-cmd account import key.txt
```
3. The terminal will prompt user to enter the password information. Users can also specify the password file path by using the "--passwordfile". Users are responsible for managing their password information.


The keystore will be generated in the path "keystore/keyfile" under the home directory of the system or the directory set by "-home".
And it is also the path to load keystore when running other commands.

4. Delete the private key file which is created in step 1. It is not needed after the keystore has been generated.

If the user has no private key to import, he can use "account new" create a new greenfield account and the keystore. After creating the account, the user needs to transfer token to the address of this account before using other commands to send transactions or use storage-related functions.
```shell
// new account and generate keystore key.json
gnfd-cmd account account new
```

To obtain the account and keystore info, users can use "account export" to print the private key info and "account ls" to display the accounts information.
```shell
// list the account info and keystore path
gnfd-cmd account ls

// display the encrypted keystore or the private key 
gnfd-cmd account export --unarmoredHex --unsafe
```

Users can create multiple accounts using the "account import" or "account new" command. You can use the "set-default" command to specify which account to use for running other commands by default. When executing commands using the default account, there is no need to specify the keystore. 
```shell
// set the default account.
gnfd-cmd account set-default [address]
```


### SP Operations

Before making a bucket and uploading files, we need to select a storage provider to store the files in the bucket. By executing the following command, we can obtain a list of storage providers on Greenfield.

```shell
$ gnfd-cmd sp ls
name     operator address                           endpoint                               status
bnbchain 0x231099e40E1f98879C4126ef35D82FF006F24fF2 https://greenfield-sp.bnbchain.org:443 IN_SERVICE
defibit  0x05b1d420DcAd3aB51EDDE809D90E6e47B8dC9880 https://greenfield-sp.defibit.io:443   IN_SERVICE
ninicoin 0x2901FDdEF924f077Ec6811A4a6a1CB0F13858e8f https://greenfield-sp.ninicoin.io:443  IN_SERVICE
nariox   0x88051F12AEaEC7d50058Fc20b275b388e15e2580 https://greenfield-sp.nariox.org:443   IN_SERVICE
lumibot  0x3131865C8B61Bcb045ed756FBe50862fc23aB873 https://greenfield-sp.lumibot.org:443  IN_SERVICE
voltbot  0x6651ED78A4058d8A93CA4979b7AD516D1C9010ac https://greenfield-sp.voltbot.io:443   IN_SERVICE
nodereal 0x03c0799AD70d19e723359E036a83E8f44f4B8Ba7 https://greenfield-sp.nodereal.io:443  IN_SERVICE
```
And the Users can obtain detailed information about a certain SP by "sp head" and "sp get-price" commands.
Here is an example of obtaining information about an SP with endpoint https://greenfield-sp.nodereal.io:443.
```shell
// get storage provider info
$ gnfd-cmd sp head  https://greenfield-sp.nodereal.io:443

// get quota and storage price info of storage provider:
$ gnfd-cmd sp get-price https://greenfield-sp.nodereal.io:443
get bucket read quota price: 0.1469890427  wei/byte
get bucket storage price: 0.02183945725  wei/byte
get bucket free quota: 1073741824
```

You can take note of the operator-address information for the storage provider to which is intended to be uploaded. This parameter will be required for making the bucket in the next step.


### Bucket Operation

You can run "./gnfd-cmd bucket -h " to get help of the bucket operations.

The below command can be used to create a new bucket called testbucket:

```shell
gnfd-cmd bucket create gnfd://testbucket
```

The command supports "-primarySP" flag to select the storage provider on which you want to create a bucket. The content of the flag should be the operator address of the storage provider. If this value is not set, the first SP in the storage provider list will be selected as the upload target by default.

The user can update the bucket meta by the "bucket update" command. It supports updating bucket visibility, charged quota, or payment address.

```shell
// update bucket charged quota 
gnfd-cmd bucket update --chargedQuota 50000 gnfd://testbucket
// update bucket visibility
gnfd-cmd bucket update --visibility=public-read gnfd://testbucket
```

The user can use list the buckets which belong to him with "bucket ls" commands.
```shell
 gnfd-cmd bucket ls
```

### Upload/Download Files

(1) put Object

The user can upload the local file to the bucket by the "object put" command. The following command example uploads an object named 'testobject' to the 'testbucket' bucket. The file payload for the upload is read from the local file indicated by 'file-path'.

```shell
gnfd-cmd object put --contentType "text/xml" file-path gnfd://testbucket/testobject
```

If the object name has not been set, the command will use the file name as object name. After the command is executed, it will send createObject txn to the chain and uploads the payload of the object to the storage provider.
The command will return after object completes sealing. Users can also choose to interrupt the sealing process, which does not affect the final completion of the object.
During the upload process, the terminal will print the upload progress and upload speed.

(2) download object

The user can download the object into the local file by the "object get" command. The following command example downloads 'testobject' from 'testbucket' to the local 'file-path' and prints the length of the downloaded file.
The filepath can be a specific file path, a directory path, or not set at all. If the file-path is not set, the command will download the content to a file with the same name as the object name in the current directory.
```shell
gnfd-cmd object get gnfd://testbucket/testobject file-path
```

After the command is executed, it will send a download request to the storage provider and download the object. The terminal will print the download progress and speed.

(3) list object and delete object

The user can use list the objects of the specific bucket with "object ls" command.
```shell
 gnfd-cmd object ls gnfd://testbucket
```
The user can delete the object with "object delete" command.
```shell
 gnfd-cmd object delete gnfd://testbucket/testobject 
```

### Group Operation

Users can run "./gnfd-cmd group -h " to get help of group operations.

The user can create a new group by the "group create" command. Note that this command can set the initialized group member through the --initMembers parameter. After the command executes successfully, the group ID and transaction hash information will be returned.

You can add or remove members from a group using the "group update" command. The user can use '--addMembers' to specify the addresses of the members to be added or '--removeMembers' to specify the addresses of the members to be removed.

```shell
// create group
gnfd-cmd group create gnfd://testGroup
// update member
gnfd-cmd group update --groupOwner 0x.. --addMembers 0x.. gnfd://testGroup
```

### Policy Operation
Users can run "./gnfd-cmd policy -h " to get help of permission operations.

Users can use the "policy put [RESOURCE-URL]" command to assign resource permissions to other accounts or groups (called principal), such as the permission to delete objects. 
After the command executes successfully, the object policy information of the principal will be returned. The principal is set by --groupId which indicates the group or --grantee which indicates the account.

The resource url can be the follow types:

1) "**grn:**b::bucket-name", it indicates the bucket policy

2) "**grn:**o::bucket-name/object-name", it indicates the object policy

3) "**grn:**g:owner-address:group-name", it indicates the group policy

```shell
// put object policy 
gnfd-cmd policy put --groupId 11 --actions get,delete grn:o::gnfd-bucket/gnfd-object

// put bucket policy
gnfd-cmd policy put --grantee 0x.. --actions delete  grn:b::gnfd-bucket
```

Users can also revoke permission by "policy delete" command
```shell
// delete the bucket policy from a group
gnfd-cmd policy delete --groupId 11  grn:b::gnfd-bucket

// delete the object policy from an grantee
gnfd-cmd policy delete --grantee 0..  grn:o::gnfd-bucket/gnfd-object
```

Users can list the policy of the grantee or group-id by "policy ls" command
```shell
// list policy info of a group
gnfd-cmd policy ls --groupId 11  grn:o::gnfd-bucket/gnfd-object
```

In addition to the basic commands mentioned above, the Greenfield Command also supports functions such as transferring tokens and payment account operations. You can find more examples in the readme file of [Greenfield Command](https://github.com/bnb-chain/greenfield-cmd).

