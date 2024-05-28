# BNB Smart Chain (BSC) Node Configuration: Best Practices

## Hardware Specifications

To ensure optimal performance and reliability, it is crucial to select the appropriate node type based on your specific requirements for transaction processing and state querying on the BNB Smart Chain.

### Fast Node (Recommended Configuration)
For users requiring access to the latest world state in a lightweight mode, the fast node is the ideal choice. It demands less from your system’s CPU and disk space.
- **Processor**: Minimum 16-core CPU.
- **Memory**: At least 32 GB RAM.
- **Storage**: Solid State Drive (SSD) with a minimum capacity of 2TB.
- **Network**: Stable and high-speed internet connection, minimum 5 MBps.

### Archive Node
For comprehensive access to the entire historical world state of the BSC mainnet, consider deploying an Archive Node. Detailed instructions are available at [BSC Erigon GitHub repository](https://github.com/node-real/bsc-erigon).
- **Processor**: Minimum 16-core CPU.
- **Memory**: At least 128 GB RAM.
- **Storage**: SSD with a minimum capacity of 10TB (NVME SSDs are recommended for optimal performance).
- **Network**: Stable and high-speed internet connection, minimum 5 MBps.

### Full Node
To obtain the latest world state and verify the validity of the state or to generate data proofs, a standard Full Node is suitable.
- **Processor**: Minimum 16-core CPU.
- **Memory**: At least 64 GB RAM.
- **Storage**: Solid State Drive (SSD) with a minimum capacity of 3TB.
- **Network**: Stable and high-speed internet connection, minimum 5 MBps.

## Peers Configuration

### Mainnet
- There is no need to specify static nodes, only Bootnodes are required for mainnet which are already configured in the code. Also, Make sure to use the config.toml file from the latest release. For more details, Please refer this [blog](https://forum.bnbchain.org/t/try-bootnodes-after-bsc-release-v1-2-12/1998#h-32to-join-the-network-with-bootnodes-5).

### Testnet
- Testnet still need to configure the StaticNodes manually and hence, the StaticNodes list is contained in the latest release's config.toml. For eg: For geth v1.3.7, the updated config.toml with static nodes can be looked over here: [geth v1.3.7 testnet config](https://github.com/bnb-chain/bsc/releases/download/v1.3.7/testnet.zip)

## Clarification of the snapshots
As BSC will mainly support [PBSS & PebbleDB](https://forum.bnbchain.org/t/faq-pbss-pebbledb/2260), we will only cover snapshots of PBSS&PebbleDB and ignore snapshot of HashBased&LevelDB here. Please refer to this [reference](https://github.com/bnb-chain/bsc-snapshots/issues/349).

## Troubleshooting for no peers in testnet 

- Check for configuration issues like wrong chain id, wrong config file/dir.
- Make sure to update the config.toml file as per the latest release
- Don't use bootnodes on testnet, it's not required.
- Deleting the `geth/nodes` and `geth/nodekey` file/dir might help
- Re-download the snapshot and try again.  

Reference over [here](https://github.com/bnb-chain/bsc/issues/2164#issuecomment-1897980997)

## Monitoring Metrics and Alerts

To maintain node health and performance, monitor the following key metrics:

- **Transaction Pool Alert**: Triggered when the transaction pool exceeds 5000 transactions.
- **Block Import Time Alert**: Activated if block import time exceeds 3 seconds.
- **RPC Latency Alert**: Initiated when RPC latency surpasses 100ms.

## Performance Optimization

BSC nodes offer configurable cache settings to enhance performance. It is advisable to allocate approximately one-third of the physical memory to the cache. For example, with 64GB of physical memory, the cache setting can be configured as:
```
--cache 20000
```

## Keep Track of Syncing Speed

```
t=2021-05-13T17:17:17+0800 lvl=info msg="Imported new chain segment"             blocks=11  txs=3701  mgas=482.461  elapsed=8.075s    mgasps=59.744  number=7,355,800 hash=0x84e085b1cd5b1ad4f9a954e2f660704c8375a80f04326395536eedf83363942f age=12h38m32s dirty="583.73 MiB"
t=2021-05-13T17:17:20+0800 lvl=info msg="Deep froze chain segment"               blocks=117 elapsed=263.497ms number=7,265,806 hash=0x7602f6b960b4092d39ff49781c64404a047e2c78bc166f071ee8714020c39b2e
t=2021-05-13T17:17:25+0800 lvl=info msg="Imported new chain segment"             blocks=17  txs=5025  mgas=740.885  elapsed=8.125s    mgasps=91.177  number=7,355,817 hash=0xde7a2a76ff7b38414acf3b360bb427d2d0b7dd1f8fe2afe2ffd59d64b237a81b age=12h37m49s dirty="594.65 MiB"
t=2021-05-13T17:17:33+0800 lvl=info msg="Imported new chain segment"             blocks=18  txs=5108  mgas=748.016  elapsed=8.354s    mgasps=89.535  number=7,355,835 hash=0x757c476f9fe30fc6ef001fb4a03fa991843cf3ed271f21cfc01a9bba5e5eff98 age=12h37m3s  dirty="604.39 MiB"
t=2021-05-13T17:17:42+0800 lvl=info msg="Imported new chain segment"             blocks=18  txs=5612  mgas=799.778  elapsed=8.260s    mgasps=96.815  number=7,355,853 hash=0x73e87742ef4405ffefec987fc4b8b19e69c54b8f914c27ea69a502fae4d735e0 age=12h36m18s dirty="613.03 MiB"
```

Your syncing speed is **mgasps**. The value should be around 100.
If you are syncing slowly, please check the speed of your disk.

## Use Chaindata Snapshot

Please download the chain data [snapshot](https://github.com/bnb-chain/bsc-snapshots) and extract to your home folder to speed up

## Store Your BNB with a Hardware Wallet

The most valuable assets of a validator are two keys: one for signing transactions and another for signing blocks


## Securing Your Full Node RPC from Hackers

Please do not expose your RPC endpoints to public network.


## Account Private keys

To protect your BNB, do not share your 24 words with anyone. The only person who should ever need to know them is you. In short, HSMs are affordable, performant and portable pieces of hardware that help to securely generate, store and manage your private keys. Malware attacks and remote extraction of private keys are much more difficult when an HSM is configured properly.

## Software Vulnerabilities

To protect your BNB, you should only download software directly from official sources, and make sure that you're always using the latest, most secure version


## Running Server as a Daemon
It is important to keep **geth** running at all times. There are several ways to achieve this, and the simplest solution we recommend is to register **geth**  as a systemd service so that it will automatically get started upon system reboots and other events.


## Set up a Backup Node
* Run validator node in archive mode
* Shut down nodes gracefully
* Active monitoring with tools

## Steps to Run a Backup Node
1. Install the latest version of geth
2. Sync to the latest height using fast sync mode. You can either download the latest snapshot or start fast sync
once your node is fully synced
3. Shut down your node gracefully kill -HUP $(pgrep geth)
4. Restart your node.

### Why Node will be Offline for a While After Restart? or What will Happen If the Client is Force Killed?

After running (synchronized) for a long period of time and being abruptly terminated, only archived nodes are expected to quickly re-synchronize upon restart.

Steps to reproduce:

* Run the node synchronized for a period of time.
* Abruptly kill the node (kill -9 or system crash).
* Restart the node, observe where it resynchronizes from block height 1 hour ago.


**Reasons**

If Geth crashes (or is not shut down gracefully), the recent state held in memory is lost and needs to be regenerated. It takes Geth a long time to restore the states.

The root reason is that **geth** does flush the state trie periodically. The period is defined as **trieTimeout** in **config.toml**.


## How to Upgrade a Backup Node to Become a Validator Node?

You can stop mining new blocks by sending commands in **geth console**

Connect to your validator node with **geth attach ipc:path/to/geth.ipc**

```bash
miner.stop()
```

Then, let backup node resume validating ,
```bash
miner.start()
```
## Securing the Validators

Each validator candidate is encouraged to run its operations independently, as diverse setups increase the resilience of the network. Due to the high amount invested by validators it is highly essential to protect them against different DoS and DDoS attacks. In this section, we disscuss the security mechanism adopted by BSC for its validators.

### Sentry Nodes (DDOS Protection)

Validators are responsible for ensuring that the network can sustain denial of service attacks. One recommended way to mitigate these risks is for validators to carefully structure their network topology in a so-called sentry node architecture.
Sentry nodes can be quickly spun up or change their IP addresses. Because the links to the sentry nodes are in private IP space, an internet based attacked cannot disturb them directly. This will ensure validator block proposals and votes always make it to the rest of the network.

To setup your sentry node architecture you can follow the instructions below:

1. Build a private network and setup trusted private connections between the validator node and its sentry

Please do not expose your validator fullnode RPC endpoints to the public network.

Install your [fullnode](full_node.md)

2. Set sentry as peers for the validator node

In the console of the sentry node, run **admin.nodeInfo.enode** You should get something similar to this.

```
enode://f2da64f49c30a0038bba3391f40805d531510c473ec2bcc7c201631ba003c6f16fa09e03308e48f87d21c0fed1e4e0bc53428047f6dcf34da344d3f5bb69373b@[::]:30306?discport=0
```

!!! Note:
	[::] will be parsed as localhost (127.0.0.1). If your nodes are on a local network check each individual host machine and find your IP with ifconfig
	If your peers are not on the local network, you need to know your external IP address (use a service) to construct the enode URL.
	Copy this value and in the console of the first node run,

Update **config.toml** file of validator node

```
# make node invisible
NoDiscovery = true
# connect only to sentry
StaticNodes = ["enode://f2da64f49c30a0038bba3391f40805d531510c473ec2bcc7c201631ba003c6f16fa09e03308e48f87d21c0fed1e4e0bc53428047f6dcf34da344d3f5bb69373b@[10.1.1.1]:30306"]
```
This will return true if successful, but that doesn’t mean the node was added successfully.


To confirm run **admin.peers** and you should see the details of the node you just added.


That way your validator node will try to peer with your provided sentry nodes only.


3. Confirm the connection

To confirm run **admin.peers** and you should see the details of the node you just added.


![img](https://lh3.googleusercontent.com/w6notWcdyEXayM592WuI5xcpysFqgkwwBSX3sBZFIc34SHrKewZYlNMBMyGBPs375ez78i4gZmbnMyMn3Ry5s6Z6qTejatPYdDXL67moRhGmAQsjNNVF0CRZz10yznx13U34fKSc)

### Firewall Configuration

**geth** uses several TCP ports for different purposes.

**geth** use a listener (TCP) port and a discovery (UDP) port, both on 30303 by default.

If you need to run JSON-RPC, you'll also need TCP port 8545. Note that JSON-RPC port should not be opened to the outside world, because from there you can do admin operations.

