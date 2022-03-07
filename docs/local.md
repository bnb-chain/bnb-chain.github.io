---
sidebar_label: Local BNB Smart Chain Network
hide_table_of_contents: false
sidebar_position: 2
---

# Local BNB Smart Chain Network

See also : [https://github.com/ethereum/go-ethereum/wiki/Private-network](https://github.com/ethereum/go-ethereum/wiki/Private-network)


## Setting up your BSC Node(s)

### Pre-Requisites
#### Install Geth

Review the guide [here](validator/fullnode.md)

#### Create /projects

Create a `/projects` symbolic link
*(Note:  This step is simply so "/projects" can be used in all other commands, instead you could use full paths, or set an env var)*

```
$ mkdir <my projects folder>
$ sudo ln -s <my projects folder> /projects
```

###s Create local\_ethereum\_blockchain folder

```
$ mkdir /projects/local_ethereum_blockchain
```

### Create the genesis block config

Create this file :  `/projects/local_ethereum_blockchain/genesis.json`

With the following contents :

```
{
     "config": {
       "chainId": 1000,
       "homesteadBlock": 0,
       "eip155Block": 0,
       "eip158Block": 0
                },
     "nonce": "0x0000000000000061",
     "timestamp": "0x0",
     "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
     "gasLimit": "0x8000000",
     "difficulty": "0x100",
     "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
     "coinbase": "0x3333333333333333333333333333333333333333",
     "alloc": {}
}
```
([info about the genesis file](https://ethereum.stackexchange.com/a/2377/2040))

### Initialise an Ethereum node

```
$ geth --datadir /projects/local_ethereum_blockchain/node1 init /projects/local_ethereum_blockchain/genesis.json
```

### Start that Ethereum node

```
$ geth --datadir /projects/local_ethereum_blockchain/node1 --networkid 1000 console
```

### Initialise another Ethereum node

```
$ geth --datadir /projects/local_ethereum_blockchain/node-2 init /projects/local_ethereum_blockchain/genesis.json
```

### Start the 2nd Ethereum node

```
$ geth --datadir /projects/local_ethereum_blockchain/node-2 --port 30304 --nodiscover --networkid 1000 console
```

### Connect one node to the other

In one geth console :

```
> admin.nodeInfo.enode
```

In the other console :

```
> admin.addPeer( <the enode value from the first console> )
```


## Useful geth commands

### Node info

```
> admin.nodeInfo
```

### Peers

Show peers

```
> admin.peers
```

How many peers ?

```
> admin.peers.length
```

### Create an account

You need an account to do be able to do things like mining

```
> personal.newAccount()
```

*And make sure your remember/save the password!*

### Unlock account

Neccessary before some actions

```
> personal.unlockAccount( eth.accounts[0] )
```

### Start mining

```
> miner.start(1)
```

The first block may take a while to mine, allow a few minutes

### Stop mining

```
> miner.stop()
```

### Current block number

```
> eth.blockNumber
```

### Details of current block

```
> eth.getBlock( eth.blockNumber )
```


### Which node minded the last block

```
> eth.getBlock(eth.blockNumber).miner
```

### Account balance, in ether

```
> web3.fromWei(eth.getBalance(eth.accounts[0]))
```

### Transfer ether between accounts

First get the account numbers by doing

`> eth.accounts`

Then unlock the account you are sending from

`> personal.unlockAccount( <from account> )`

eg.

`> personal.unlockAccount(eth.accounts[0])`

Finally transfer 1 ether

```
> eth.sendTransaction({from: "<from account>", to: "<to account>", value: web3.toWei(1, "ether")})
```


### Exit

```
> exit
```

(This will also stop the node from running if it was started using `$ geth console` (as opposed to `$ geth attach`))



## Connect to other nodes on your network

1. Get the IP of the node : `$ ifconfig|grep netmask|awk '{print $2}'`

2. Get the enode of the node : `> admin.nodeInfo.enode`

3. REPLACE `[::]` in the enode string with the `[<ip address>]`

4. On your console `> admin.addPeer(< the enode string with the ip address in it>)`


