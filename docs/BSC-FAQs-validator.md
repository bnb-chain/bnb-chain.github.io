---
sidebar_label: BSC Validator FAQs
hide_table_of_contents: false
sidebar_position: 2
---

# BNB Smart Chain Validator FAQs

### What is the role of BNB Smart Chain Validators?
It powers the blockchain network by processing transactions and signing blocks.

### What are the incentives to run a validator node?

Validators and delegators will earn rewards from transaction fees: dApp usages.

### When are rewards paid out?

The rewards will not be sent to validator right away, instead, they will be distributed and accumulated on a contract. The reward distribution happens on BC around every day UTC 00:00.

### What's the potential loss for validators?

Validators can suffer from “Slashing”, a punishment for their bad behaviors, such as double sign and/or instability. Such loss will not be shared by their delegators.
Slashing is a punitive function that is triggered by a validator ’s bad actions. Getting slashed is losing self delegation of a validator. Validators will be slashed for the actions below:

  * Going offline or unable to communicate with the network.
  
  * Double signing: If a validator node tries to split the network by signing two different blocks and broadcasting them, it will be removed from validator set definitely.

### What is the process of getting selected as a validator node on BSC?

On BNB Smart Chain (BSC) network, validators are responsible for securing the network by processing transactions and signing blocks. Validator nodes are incentivized in the form of transaction fees for their good behavior. Currently, there are 21 validators on the testnet and 56 validators on the mainnet. Validators are selected every 24 hours. Anyone can become a candidate for the validator. To become part of the selection process of validators, the nodes have to stake their BNB. Validators can self-delegate (self-bound) BNB to themselves and can also receive delegations from any other BNB holders. The minimum amount for self-delegation is **2000BNB**. Only the top 40 highest-stake nodes are chosen to be part of the validator set. Get more details [here](https://docs.bnbchain.org/docs/validator/overview.html).

### How is the bad or malicious behavior of the validator nodes controlled in the BSC?

One of the important on-chain governance implementations is the technique of “slashing” along with jailing. When jailed validator cannot participate in the consensus mechanism or earn rewards for set period of time. Slashing ensures that validators who act maliciously or show bad behavior are punished. Furthermore, it is designed to expose any attacker and make execution of their attempts extremely expensive. Anyone can submit BSC slash request. Even though BSC slash request requires slash evidence and transaction cost fees, huge reward is given in case the request is successful. To ensure that the delegators are not punished for the validator’s bad behavior, only the self-bonded BNB of the validator are slashed. Currently, slashing is applied on any node that processes an invalid transaction, performs double-signing or is unavailable for a defined period of time.

### What is 'self-delegation'? How can I increase my 'self-delegation'?

Self-delegation is delegation from a validator to themselves. This amount can be increases by sending a delegate transaction from your validator's operator address.

### What to do if one can’t run prune-state command In the event when running the geth snapshot `prune-state --datadir /chaindata` on geth 1.1.5 return the following error

~~~~
ERROR[11-02|06:02:55.001] Failed to open snapshot tree err="head doesn't
match snapshot: have 0x5c17a8fc0164dabedd446e954b64e8a54fc7c8b4fee1bbd707c3cc3ed1e45fff, want 0x431565cee8b7f3d7bbdde1265304fa4574dc3531e511e9ffe43ae79d28e431d6" head doesn't match snapshot: have 0x5c17a8fc0164dabedd446e954b64e8a54fc7c8b4fee1bbd707c3cc3ed1e45fff, want 0x431565cee8b7f3
~~~~

This error occurs due to data corruption. You can run geth snapshot verify-state to double confirm whether the data is correct. You can download the latest snapshot from https://github.com/bnb-chain/bsc-snapshots. By doing that, you don't have to prune-state in the future, save precious disk IO, it will help you keep up with syncing.

### What to do if Sync is slow on running the following command 

~~~~
*_start order: geth --config ./config.toml --datadir /data/server/data-seed/ --cache 20000 --rpc.allow-unprotected-txs --syncmode snap  --txlookuplimit 0_*
~~~~

Try pruning the state -- stop geth, then run geth --datadir=node - prune-state. Assuming that datadir is node, change that if it's elsewhere then restart after it's done. Follow https://github.com/bnb-chain/bsc/issues/502 to get more tips about how to maintain a synced node.

### How to start the geth node through snapshot to get node synced?

The two biggest bottlenecks are CPU and IOPS when syncing. Steps are as follows: 

  * Download the latest version of geth from the [official site](https://github.com/bnb-chain/bsc-snapshots) and make it executable, optionally move it `/usr/local/bin/geth`
  
  * Download mainnet.zip and unzip
  
  * Generate genesis using command below, will also create a mainnet folder for blockchain data ./geth_linux --datadir mainnet init genesis.json
  
  * Download the latest snapshot from [here](https://github.com/bnb-chain/bsc-snapshots)
   
  * Extract the snapshot
 
  * Move the snapshot data to mainnet folder

      `rm -rf mainnet/geth/chaindata`  

      
      `rm -rf mainnet/geth/triecache`  

      
      `mv server/data-seed/geth/chaindata mainnet/geth/chaindata`  

      
      `mv server/data-seed/geth/triecache mainnet/geth/triecache`  

[Optional] Open config.toml and delete the Node Log section, just useful for getting logs straight on the terminal or just use tail to look at the logs

[Optional] Create a service or use screen to run the command below, so it doesn't stop if you are using SSH.
Run screen then press enter, anytime you lose connection via ssh, run screen -r to get back the "screen/terminal" where geth was running Geth Command 

`geth --config ./config.toml –datadir ./mainnet --cache 100000 --rpc.allow-unprotected-txs --txlookuplimit 0 --http --maxpeers 100 –ws --syncmode=full --snapshot=false `

### Why is the tx from my dapp not visible on the bscscan even though its hash is generated?
Due to network congestion, it is possible for the tx to appear after a delay. Another possibility is that the number of pending txs have exceeded the size of the limited tx pool of the network and hence the txs have been dropped.

### Why some of the validators do not follow the GasPrice order, i.e. low GasPrice transactions are executed ahead of high GasPrice transactions within a block?

As GasPrice order is not part of the Parlia consensus, validators can sort the transaction with any order they want. Currently, it is the default behavior for validators to put high GasPrice transaction first. But if the validator thought it could get more rewards by arranging the transactions in different order, they could modify the code and no longer follow the default behavior. Most likely MEV related.
There is not much that chain dev team can help right now, except:
  - raise a new proposal to put the GasPrice order as part of the consensus and to discuss with the community.
  - notify the validators, hope the MEV solution could be updated to follow the GasPrice rule.  

Here is the reference of [Rationale](https://github.com/bnb-chain/bsc/issues/1947#issue-1962563416)
