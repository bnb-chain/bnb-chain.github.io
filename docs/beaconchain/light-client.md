# Run a Light Client to Join Beacon Chain 

Light client is a program that connects to a full node to help users access and interact with Beacon Chain 
in a secure and decentralized manner without having to sync the full blockchain.

## Light Client Versus Full Node

- Light client does not store blocks or states,this way it needs less disk space (50 megabytes will be enough).
- Light client does not join p2p network and it does not produce any network cost when it is idle. The network
overhead depends on how many requests the light client handles concurrently.
- Light client does not replay state of the chain so that there is not CPU cost when idle. The CPU cost also
depends on how many requests the light client handles concurrently.
- Light client is faster than a full node even if it lagged behind the core network for a few months. It only needs a few seconds
to catch up with core network.

## Platforms and System Requirement

### Platforms

We support running light client node on `Mac OS X`, `Windows` and `Linux`.<br/>
The light client will soon be open sourced, afterwards you can cross compile light client binary and run it on other platforms.

### Requirements
- 50 megabytes of free disk space.
- 2 CPU cores, 50 megabytes of memory (RAM).

## Run a light client node

Download:
```bash
git clone https://github.com/bnb-chain/node-binary.git
```

Go to directory according to the network you want to join in.<br/>
Replace the `network` variable with `testnet` or `prod` in the following command:

```bash
cd node-binary/lightd/{network}/{version}
```

Help info:

```
./lightd --help
This node will run a secure proxy to a binance rpc server.

All calls that can be tracked back to a block header by a proof
will be verified before passing them back to the caller. Other that
that it will present the same interface as a full binance node,
just with added trust and running locally.

Usage:
  lite [flags]

Flags:
      --cache-size int             Specify the memory trust store cache size (default 10)
      --chain-id string            Specify the Beacon Chain  ID (default "bnbchain")
  -h, --help                       help for lite
      --home-dir string            Specify the home directory (default ".binance-lite")
      --laddr string               Serve the proxy on the given address (default "tcp://localhost:27147")
      --max-open-connections int   Maximum number of simultaneous connections (including WebSocket). (default 900)
      --node string                Connect to a binance node at this address (default "tcp://localhost:27147")
```

You can specify all the parameters above.

Start the light client node according to the Platform. Replace the `platform` variable with `mac`, `windows` or `linux` in the following command:

```bash
./{{platform}}/lightd --chain-id "{chain-id}" --node tcp://{full node addr}:80 > node.log  &
```

There are two required parameters to start a light client node: `chain id` and `full node addr`.<br/>
The `chain id` of the network that you want join in.<br/>
You can find chain id at [genesis file in test network](https://https://github.com/bnb-chain/node-binary/blob/master/fullnode/testnet/0.5.8/config/genesis.json)
or [genesis file in prod network](https://github.com/bnb-chain/node-binary/blob/master/fullnode/prod/0.5.8/config/genesis.json).<br/>
The `full node addr` field can be an address of any full node that you have deployed.<br/>
You can refer to [Run a Beacon Chain  full node](fullnode.md) to get more details.<br/>

We supply a bunch of full nodes that you can connect to for both mainnet and testnet.<br/>
You cat get full nodes info through a simple python script(notice to replace domain according to different network):<br/>

```python
import requests, json
d = requests.get('https://dex.binance.org/api/v1/peers').text # replace dex.binance.org with testnet-dex.binance.org for testnet
l = json.loads(d)
seeds = ",".join([ (seed["id"]+"@"+seed["original_listen_addr"]) for seed in l if seed["accelerated"] == False])
print (seeds)
```

### Example for Mainnet:
```bash
./lightd --chain-id "Binance-Chain-Tigris" --node tcp://dataseed1.binance.org:80 > node.log  &
```

### Example for Testnet:
```bash
./lightd --chain-id "Binance-Chain-Ganges" --node tcp://data-seed-pre-0-s1.binance.org:80 > node.log  &
```


## Working with the light client

Light client has the same RPC interface as [rpc-api](api-reference/node-rpc.md).<br/>
The default port of light client is `27147`.
