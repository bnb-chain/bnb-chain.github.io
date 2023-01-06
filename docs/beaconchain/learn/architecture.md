# Architecture

BNB Beacon Chain is a multi-modular blockchain with excellent native support for account management, asset management, cross chain, goverenance and so on.
It is esay to extend to support different initiatives of BNB ecosystem.
Beacon Chain uses [Tendermint](https://github.com/tendermint/tendermint) BFT consensus, and a dedicated application layer, which is built with Cosmos SDK, runs upon it. 
A simplified overview of the application's architecture might look something like this:

```
+------------+---------------------+
| RPC API        | Web API         |
+------------------------+---------+
| Staking | Salshing | Cross Chain |
+------------------------+---------+
| Asset Management | Match Engine  |
+----------------------------------+
| Account Management | Governance  |---------> crypto and blockchain governance
+----------------------------------+
| State Caching and Persisence     +-+
+----------------------------------+ |
| Consensus Protocol               | |
+----------------------------------+ |-----> revised Tendermint
| P2P Protocol                     | |
+----------------------------------+ |
| Networking    |  Database        +-+
+----------------------------------+

```

For more information about Tendermint, please have a look at the [Tendermint Core](https://tendermint.com/core/).
For more information about Cosmos SDK, please have a look at the [Cosmos Intro](https://v1.cosmos.network/intro).

## Modules

BNB Beacon Chain implements a multi-modular blockchain architecture which is easy to extend and use, and also provides the basic functionalities for side chains and other chains to build upon it.
Here are the main moudles:

- Asset - A fruitful set of features are implemented for asset management, for example, users can issue, mint/burn, freeze/unfreeze, lock/unlock BEP2 and BEP8 tokens.

- Governance - Beacon Chain supports on-chain governance of beacon chain and side chains. Holders of the native token (i.e., BNB) can submit proposals and vote on proposals to apply different kinds of changes on chains.

- Staking - With this moudle, BNB holders can become validators and can delegate tokens to validators, ultimately determining the effective validator sets for beacon chain and side chains (e.g., BSC).

- Distribution - Beacon Chain will actively distribute rewards between validators and delegators, for both Beacon Chain itself and its side chains.

- Cross Chain - Beacon Chain supports the cross chain transfers of native tokens. Cross chain communication is also built in, to support different kinds of usage scenarios.

- Slashing - Slashing module will disincentivize any bad actor by penalizing them. 

- Params - A globally available parameter store is provided by Beacon Chain. These parameters affects the excution of Beacon Chain itself and its side chains, and can be changed by goverenance.

- APIs - RPC, HTTP, and Websocket APIs are provided for interacting with blockchains and the related services. Developers can use these APIs to build their Web3 applications, wallets, data services and so on.