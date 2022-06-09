---
sidebar_label: Overview
sidebar_position: 2
hide_table_of_contents: false
---

# BAS Architecture

BAS is a modular framework for creating BSC-compatible sidechains. It defines requirements for integration with the BSC ecosystem and brings development-ready EVM-compatible features like staking, RPC-API, and smart contracts. Since BSC doesn’t rely on the BAS security model, there is no default embedded production-ready bridge solution between the BSC and BAS networks. Instead, BAS can provide protocols and standards for integrating third-party bridges that can be managed by the BAS validator set of other projects like AnySwap or Celer Network cBridge, of course, if they trust the BAS development team.

## BAS structure & integration

BAS specifies the primary structure and configuration of the blockchain, using special templates. A **template** is a ready-made blockchain solution that is **already integrated into the BSC infrastructure**. With this integration, developers automatically get access to products like a ready-made staking system, block explorer, SDK, API gateways, interfaces for governance, etc. 

After applying templates, BAS can be customized using programmable and configurable **modules**.

<p>
&nbsp;

![img](../../../static/img/assets/bas-architecture1.png)

</p>

## Modules

The main goal of BAS is to build such a multi-modular blockchain architecture that it is flexible, convenient, and easy to use.

As the current implementation of BAS is built on BSC, all existing modules are built into the system smart contracts and into the EVM machine. In the future, a system of modules will be created to allow you to develop a universal smart contract and a bus for interacting between modules and other parts. This all will make it possible to use such modules in any blockchain solution.

BAS brings with it programmable and configurable modules that can be used or modified by developers to reach their business goals, for example:
* Networking — for p2p communication between different BAS nodes.
* Blockchain & EVM — for block producing and EVM transaction execution, of course, each BAS can define their own runtime execution environment based, for example, on WebAssembly.
* Web3 API — for basic compatibility with Web3 ecosystem including MetaMask and other applications.
* Transaction Pool — for managing internal BAS policies for transaction filtering and for charging fees for the system operational.
* PoA & PoS Consensus — for users to be able to vote for the honest validators in the BAS network and guarantee the safeness of actions applied on the chain.
* Storage & State — for persisting local data.

Internally, BAS implements the following modules: Parlia consensus engine, staking pools, governance, dynamic runtime upgrades, reward management, manageable blockchain params, EVM hooks, and deployment proxy.

This modular architecture allows to re-use or enable/disable different modules. All modules are runtime-upgradable by on-chain governance.

## Repositories

Here is the list repositories provided by Ankr for development on BAS:
* [bas-genesis-config](https://github.com/Ankr-network/bas-genesis-config) — genesis smart contracts and scripts for building the genesis config.
* [bas-template-bsc](https://github.com/Ankr-network/bas-template-bsc) — BAS-compatible BSC-based template.
* [bas-javascript-monorepo](https://github.com/Ankr-network/bas-javascript-monorepo) — mono-repository with all frontend-related packages and SDKs.
* [bas-devnet-setup](https://github.com/Ankr-network/bas-devnet-setup) — scripts for running BAS devnet.
