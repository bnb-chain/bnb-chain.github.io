---
sidebar_label: Development Tools
---
# Development Tools 

## JSON RPC Endpoints

### ChainID 
 0x75 in hex or 117 in decimal

### RPC Endpoints
 <https://bas-aries-public.nodereal.io/>

### Rate limit
The rate limit of the BAS endpoint on Testnet is 10K/5min.

### Starting HTTP JSON-RPC
You can start the HTTP JSON-RPC with the --rpc flag

```
## testnet
geth attach * https://bas-aries-public.nodereal.io
```

### JSON-RPC methods
Please refer to this wiki page or use Postman: <https://documenter.getpostman.com/view/4117254/ethereum-json-rpc/RVu7CT5J?version=latest>

## Smart Contracts

Smart contracts development with BAS enables you to build your smart contracts for any use, including cryptocurrency exchanges, smart contract-based dApps, Decentralized Finance, and more.
Smart contracts are programming logic that are executed automatically when a certain condition(s) are met. In BAS, smart contracts can be written in Solidity programming language.
Please refer to the [official documentation of Solidity](https://docs.soliditylang.org/) for any queries.


## IDE and Libraries

Multiple IDEs and libraries can be used for developing and deploying smart contracts.

- [Remix IDE](https://remix.ethereum.org/): powerful open-source tool that helps you write Solidity contracts straight from the browser. It is written in JavaScript and supports both usages in the browser, but runs locally and in a desktop version. Remix IDE has modules for testing, debugging, deploying smart contracts, and much more.

- [Truffle](https://www.trufflesuite.com/docs/teams/quickstart): development tool that allows users to compile, test, debug and deploy smart contracts.

- [Web3JS](https://web3js.readthedocs.io/en/v1.2.11/): collection of libraries that allow you to interact with a local or remote Ethereum node using HTTP, IPC, or WebSocket.

## Faucet
To get test ARS tokens, developers can use the [faucet](https://bas-aries-faucet.nodereal.io/).

## Explorer
View blocks and transactions on [BAS Aries Explorer](https://bas-aries-testnet-explorer.nodereal.io/).