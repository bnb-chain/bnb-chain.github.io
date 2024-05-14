
# Secure BSC Validator

Each BSC validator is encouraged to run its operations independently, as diverse setups increase the resilience of the network.
Due to the high amount invested by validators it is highly essential to protect them against different DoS and DDoS attacks.
In this section, we discuss the security mechanism adopted by BSC for its validators.

## Sentry Nodes (DDOS Protection)

Validators should ensure network resilience against denial of service attacks. One effective approach to reduce these risks
is by organizing their network in a sentry node architecture. Sentry nodes, easily deployed and capable of IP address
changes, operate in private IP space, shielding them from direct internet attacks. This setup guarantees that validator
block proposals and votes reliably reach the network.

To setup your sentry node architecture you can follow the instructions below:

### 1. Setup Nodes
Construct a private network and establish trusted connections between the validator node and its sentry nodes.
Refer to the [fullnode guide](fullnode.md) for setting up your validator and sentry nodes.
Avoid exposing your validator's RPC endpoints to the public network.

### 2. Add Peers
Connect individual sentry nodes' console, execute `admin.nodeInfo.enode` command. This will provide you with the enode information for each node, as illustrated below.

```
enode://f2da64f49c30a0038bba3391f40805d531510c473ec2bcc7c201631ba003c6f16fa09e03308e48f87d21c0fed1e4e0bc53428047f6dcf34da344d3f5bb69373b@[::]:30306?discport=0
```

>!!! Note:
**[::]** will be interpreted as the localhost (127.0.0.1) address. If your nodes are within a local network, ensure to inspect each host machine to determine its IP using the ifconfig command. However, if your peers are outside the local network, you must be aware of your external IP address to form the enode URL correctly.

Replace **[::]** with the correct node URL, copy the enode details, and add them to the `config.toml` file of the validator node like this:
```
# make node hidden
NoDiscovery = true
# connect exclusively to sentry
StaticNodes = ["enode://f2da64f49c30a0038bba3391f40805d531510c473ec2bcc7c201631ba003c6f16fa09e03308e48f87d21c0fed1e4e0bc53428047f6dcf34da344d3f5bb69373b@[10.1.1.1]:30306"]
```


### 3. Confirm Connections

Connect to the validator's console, run `admin.peers`, and you will see the details of the sentry nodes you added.

## Firewall Configuration

`Geth` utilizes different ports for various functions.

It utilizes a listener (TCP) port and a discovery (UDP) port for P2P connections, typically configured to 30303. Ensure this port is open.

The default JSON-RPC service port is TCP port 8545. To prevent unauthorized admin operations, refrain from exposing the JSON-RPC port externally.