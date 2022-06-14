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

### What's on-chain governance proposal?

The proposal will decide: slash amount, cross-chain transfer fees.

### How to join testnet as a validator?

  1. Choose your own server/PC.
  2. Install software.
  3. Create a wallet and get some BNB.
  4. Run your fullnode and keep it synced.
  5. Stake your BNB on BC, the top 21 most staked nodes to be the validator set.

### How to join mainnet as a validator? 

  1.  Choose your own server/PC
  2. Install software
  3. Create a wallet and get some BNB
  4. Run your fullnode and keep it synced
  5. Stake your BNB on BC, the top 21 most staked nodes to be the validator set"

### What are hardware requirements of running a validator node?

Processing transactions is mostly CPU bound. Therefore we recommend running CPU optimized servers.

 * Directly facing internet (public IP, no NAT)
 
 * 8 cores CPU
 
 * 16GB of RAM
 
 * 500 SSD storage"

### How many BNB are required to create a validator?

Validators can self-bond, meaning they can delegate BNB to themselves, and they can also receive delegations from any other BNB holders. These bonded BNB acts as collateral and cause each delegate, including validators, to have “skin in the game” so to speak. If any equivocation or byzantine behavior by a validator were to be committed, the validator and its delegates would be slashed a predefined amount of bonded stake. The minimum self-delegated amount is 10000BNB.

### When are rewards paid out?

The rewards will not be sent to validator right away, instead, they will be distributed and accumulated on a contract. The reward distribution happens on BC around every day UTC 00:00.

### What's the potential loss for validators?

Validators can suffer from “Slashing”, a punishment for their bad behaviors, such as double sign and/or instability. Such loss will not be shared by their delegators.
Slashing is a punitive function that is triggered by a validator ’s bad actions. Getting slashed is losing self delegation of a validator. Validators will be slashed for the actions below:

  * Going offline or unable to communicate with the network.
  
  * Double signing: If a validator node tries to split the network by signing two different blocks and broadcasting them, it will be removed from validator set definitely.

### What is the process of getting selected as a validator node on BSC?

On BNB Smart Chain  (BSC) network, validators are responsible for securing the network by processing transactions and signing blocks. Validator nodes are incentivized in the form of transaction fees for their good behavior. Currently, there are 11 validators on the testnest and 21 validators on the mainnet. Validators are selected every 24 hours. Anyone can become a candidate for the validator. To become part of the selection process of validators, the nodes have to stake their BNB. Validators can self-delegate (self-bound) BNB to themselves and can also receive delegations from any other BNB holders. The minimum amount for self-delegation is **10000BNB**. Only the top 21 highest-stake nodes are chosen to be part of the validator set. Get more details [here](https://docs.bnbchain.org/docs/validator/overview.html).

### How is the bad or malicious behavior of the validator nodes controlled in the BSC?

One of the important on-chain governance implementations is the technique of “slashing” along with jailing. When jailed validator cannot participate in the consensus mechanism or earn rewards for set period of time. Slashing ensures that validators who act maliciously or show bad behavior are punished. Furthermore, it is designed to expose any attacker and make execution of their attempts extremely expensive. Anyone can submit BSC slash request. Even though BSC slash request requires slash evidence and transaction cost fees, huge reward is given in case the request is successful. To ensure that the delegators are not punished for the validator’s bad behavior, only the self-bonded BNB of the validator are slashed. Currently, slashing is applied on any node that processes an invalid transaction, performs double-signing or is unavailable for a defined period of time.

### What are the two slashable cases?

The validators are slashed in cases of self-bound less than the required minimum, double singing, and unavailability. 

*_Double Signing:_* refers to an event when a validator node proposes two different blocks at the same block height. A validator will be removed from the validator set definitely, if they try signing two different blocks and broadcasting them. For a BSC slash request for double signing the supporting evidence should indicate two block headers having same block height and same parent block hash sealed by the same validator. Two signatures of these two blocks must not be the same. The time of these two blocks must be within the validity of the evidence, which is 24 hours. Rewards for submitting double-sign evidence is **1000BNB**. In case the provided evidence are valid, the validators face a slashing of **10000BNB** from their self-delegated BNB and will be ‘jailed’ for a time period of 7 days.

*_Unavailability/ Downtime in a 24 hour period:_* the slash fee for a validator being offline is self-delegated **50BNB** accompanied with a jail time of 2 days. If a validator misses at least 50 blocks (~52 minutes of downtime) during 24 hours, they will not be able to receive any rewards during that period of time.
Instead their reward will be distributed amongst other better performing validators of the set. Another case of unavailability is when a validator misses over 150 blocks (~157.5 minutes of downtime) during 24 hours. In this case, the validator will not receive reward instead it will be propagated back to BC. 

*_Self‐bond below minimum:_* Validators are jailed for 1 day if their self‐bond falls below **10000BNB**.

### What is the minimum amount for self-delegation to avoid being jailed?

The [minimum self-delegated amount](parameters.md) is **10000BNB**.

### What is the unbounding time period?

Unbonding time: 7 days

### What is the unjail fees for a validator jailed for being offline? What is the offline jail time period? 

offline Unjail fee: 1BNB 

offline Jailed time: 2 days. A validator can only unjail 2 days later after it has been jailed

### What is the slashing amount charged to the validators for being offline and double signing?

offline slashing amount: 50BNB 

Double-sign slashing amount: 10000BNB

### Where can you monitor the slash contract?

The slash contract can be monitored on the BSC scanner on the following link

https://bscscan.com/address/0x0000000000000000000000000000000000001001#events

### Does an inactive validator receive any rewards?

No, they will not.

### Can I receive my staking rewards if my chosen validator is inactive?

No, you cannot.

### When can I receive my unstaked BNB?

After you sent `undelegate` transaction, you have to wait 7 days. This period starts at UTC 00:00 next day.

### How to get un-jailed?
Validator nodes that have been jailed due to their malicious or bad behavior can be set to ‘unjailed’ by sending a side-unjail transaction if the validation passed. Furthermore, when unjailed, to join the validator set again, the validator must wait for the next UTC 0:00. The fees to un-jail a smart contract validator is **1BNB**. Whereas, the fee for submitting a byzantine behavior evidence of a validator is **10BNB**.

_Example:_

~~~~
bnbcli slashing side-unjail --side-chain-id=bsc –node http://dataseed4.binance.org:80 --chain-id=Binance-Chain-Tigris --trust-node --output=json  --from {the address of the validaator operator}
~~~~

### What is 'self-delegation'? How can I increase my 'self-delegation'?

Self-delegation is delegation from a validator to themselves. This amount can be increases by sending a delegate transaction from your validator's operator address.

### What is the command to prune?

  * Stop the node gracefully
  
  * Run `nohup geth snapshot prune-state --datadir {the data dir of your bsc node} &`
  
  * Wait for 5-6 hours to finish, it depends on the size of current storage

### What to do if one can’t run prune-state command In the event when running the geth snapshot `prune-state --datadir /chaindata` on geth 1.1.5 return the following error

~~~~
ERROR[11-02|06:02:55.001] Failed to open snapshot tree err="head doesn't
match snapshot: have 0x5c17a8fc0164dabedd446e954b64e8a54fc7c8b4fee1bbd707c3cc3ed1e45fff, want 0x431565cee8b7f3d7bbdde1265304fa4574dc3531e511e9ffe43ae79d28e431d6" head doesn't match snapshot: have 0x5c17a8fc0164dabedd446e954b64e8a54fc7c8b4fee1bbd707c3cc3ed1e45fff, want 0x431565cee8b7f3
~~~~

This error occurs due to data corruption. You can run geth snapshot verify-state to double confirm whether the data is correct. You can download the latest snapshot from https://github.com/bnb-chain/bsc-snapshots. By doing that, you don't have to prune-state in the future, save precious disk IO, it will help you keep up with syncing.

### What to do if Sync is slow on running the following command 

~~~~
*_start order: geth --config ./config.toml --datadir /data/server/data-seed/ --cache 20000 --rpc.allow-unprotected-txs --syncmode snap –diffsync --txlookuplimit 0_*
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

`geth --config ./config.toml –datadir ./mainnet --cache 100000 --rpc.allow-unprotected-txs --txlookuplimit 0 --http --maxpeers 100 –ws --syncmode=full --snapshot=false –diffsync`

### What are the few adjustments that can help resolve sync issues?

  * Keep maxpeers at around 30. Either Too large or too less is not suggested
  
  * Enable snapshot, snapshot is another format of state world, it is designed to improve the performance. You can always set it to true.
  
  * Upgrade to 1.1.5 and diffsync is enabled
  
  * Try to reduce amount of peers to 30-50 (more peers need more resources) and make sure you're connected to enough peers with net.peerCount
  
  * Upgrade your hardware, especially Disk and CPU resources.

### Why is the tx from my dapp not visible on the bscscan even though its hash is generated?
Due to network congestion, it is possible for the tx to appear after a delay. Another possibility is that the number of pending txs have exceeded the size of the limited tx pool of the network and hence the txs have been dropped.

### What is the best course of actions to make sure the slash indicator for a validator contract doesn’t exceed beyond 150 and getting jailed?
  * Pruning  is the top choice.
  
  * Use better CPU, currently we suggest m5zn.3xlarge, it is 3.2G Hz frequency.
  
  * IOPS above 10000 is good enough.
  
  * Running 2-3 backup nodes please.
  
  * NVMe disk is better than SSD

### Can the location of the validator nodes be considered as playing factor in performance? Is there any way to get the enode or ips of the validator nodes?
The validators are usually running in a private network making it hard to connect or trace their location. Furthermore, it is suggested by community developers that EU is considered a better location in terms of performance.
