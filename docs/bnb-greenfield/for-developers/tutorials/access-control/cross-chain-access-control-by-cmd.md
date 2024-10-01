---
title: Cross Chain Access Control by CMD - BNB Greenfield Access Control
description: How to use BSC smart contract as a simple howcase of cross chain program-ability of Greenfield..
keywords: [BNB Greenfield, Access control, Permission]
order: 1
---

# Cross Chain Access Control by CMD

In this guide, we will walk you through the process of data permission management using the BSC smart contract as a simple howcase of cross chain program-ability of Greenfield.

## Prerequisites

Before starting, make sure you have the following tools installed:

- [gnfd-cmd](https://github.com/bnb-chain/greenfield-cmd)
- [gnfd-contract](https://github.com/bnb-chain/greenfield-contracts)

Please follow the readme of the above two repositories to install the tools and configure the environment.

Ensure you get an account that get funds on both BSC and Greenfield network.

### Steps

In the following example, Account A(0x0fEd1aDD48b497d619EF50160f9135c6E221D5F0, stored in `keyA.json`) will grant Account B(0x3bD70E10D71C6E882E3C1809d26a310d793646eB, stored in `keyB.json`)
the access to his private file through BSC contract.

Besides, you can save the password to a file and use `-p` to specify the password file. For example, `gnfd-cmd -p password.txt ...`.

Before starting, please make sure you created related accounts by `gnfd-cmd account import` or  `gnfd-cmd account new` and have the config.toml file in the current directory.
Please note that the account should have enough balance before sending transactions to greenfield.

The content of the `config.toml` is as follows:

=== "Mainnet"

    ```
    rpcAddr = "https://greenfield-chain.bnbchain.org:443"
    chainId = "greenfield_1017-1"
    ```

=== "Testnet"

    ```
    rpcAddr = "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org:443"
    chainId = "greenfield_5600-1"
    ```

1. Prepare environment

	```shell
	$ export AccountA=0x0fEd1aDD48b497d619EF50160f9135c6E221D5F0
	$ export AccountB=0x3bD70E10D71C6E882E3C1809d26a310d793646eB
	```

2. Create a temporary file `story.txt`

	```shell
	$ echo "this is a fun story" > story.txt 
	```

3. Create a bucket named `funbucket`.

	```shell
	$ gnfd-cmd -c config.toml -k keyA.json -p password.txt bucket create gnfd://funbucket
	```

4. Create a private object named `story.txt` in the bucket `funbucket`.

	```shell
	$ gnfd-cmd -c config.toml -k keyA.json -p password.txt object put --contentType "text/xml" --visibility private ./story.txt  gnfd://funbucket/story.txt
	```

5. Create a group named `fungroup`.

	```shell
	$ gnfd-cmd -c config.toml -k keyA.json -p password.txt group create fungroup
	create group: fungroup succ, txn hash:17B6AE2C8D30B6D6EEABEE81DB8B37CF735655E9087CB02DC98EFF1DCA9FBE3A, group id: 136 
	```

	The console will return the id of the group, which is `136` in this case.

6. Bind the group `fungroup` to the object `story.txt`.

	```shell
	## Example, replace the ${GroupId} with the group id you get in the previous step
	$ export GroupId=136
	$ gnfd-cmd -c config.toml -k keyA.json -p password.txt policy put --groupId ${GroupId} --actions get grn:o::funbucket/story.txt   
	```

7. Mirror the group to BSC network.

	```shell
	## Example, replace the ${GroupId} with the group id you get in the previous step
	## 97 is the chainId of BSC testnet
	## 56 is the chainId of BSC mainnet

	$ export ChainId=56
	$ gnfd-cmd -c config.toml -k keyA.json -p password.txt group mirror --destChainId ${GroupId} --id ${GroupId} 
	```

8. Try to access the file through AccountB.
    
	```shell
	## Example
	$ gnfd-cmd -c config.toml -k keyA.json -p password.txt group head-member --groupOwner ${AccountA}  ${AccountB}  fungroup
	the user does not exist in the group
	$ gnfd-cmd -c config.toml -k keyB.json -p password.txt object get gnfd://funbucket/story.txt ./story-copy.txt
	run command error: statusCode 403 : code : AccessDenied  (Message: Access Denied)
	```

	It turns out that AccountB is not permitted to access the file, which is expected.

9. Clone the [gnfd-contract](https://github.com/bnb-chain/greenfield-contracts) repository and install the dependencies.

10. Grant the access to Account B through the contract.

	=== "Mainnet"
		```sh
		export RPC_MAIN=https://bsc-dataseed.bnbchain.org
		$ forge script foundry-scripts/GroupHub.s.sol:GroupHubScript \
		--sig "addMember(address operator, uint256 groupId, address member)" \
		${AccountA} ${GroupId} ${AccountB} \
		-f $RPC_MAIN \
		--private-key 148748590a8b83dxxxxxxxxxxxxxxxxx \
		--legacy \
		--broadcast		
		```

	=== "Testnet"
		```sh
		export RPC_TEST=https://bsc-testnet-dataseed.bnbchain.org
		$ forge script foundry-scripts/GroupHub.s.sol:GroupHubScript \
		--sig "addMember(address operator, uint256 groupId, address member)" \
		${AccountA} ${GroupId} ${AccountB} \
		-f $RPC_TEST\
		--private-key 148748590a8b83dxxxxxxxxxxxxxxxxx \
		--legacy \
		--broadcast
		```

10.  Wait 30 seconds, and try to access the file through AccountB again.
	```shell
	## Example
	$ gnfd-cmd -c config.toml -k keyA.json -p password.txt group head-member --groupOwner ${AccountA}  ${AccountB} fungroup
	the user is a member of the group
	$ gnfd-cmd -c config.toml -k keyB.json -p password.txt object get gnfd://funbucket/story.txt 
	download object story.txt successfully, the file path is ./story-copy.txt, content length:20
	```
