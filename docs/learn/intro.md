---
sidebar_label: Introduction 
sidebar_position: 2
hide_table_of_contents: false
---

# Introduction

BNB Smart Chain is an innovative solution to bring programmability and interoperability to Beacon Chain. BNB Smart Chain relies on a system of 21 active validators with Proof of Staked Authority (PoSA) consensus that can support short block time and lower fees. The most bonded validator candidates of staking will become validators and produce blocks. The double-sign detection and other slashing logic guarantee security, stability, and chain finality. 
Other than the 21 active validators, BSC will introduce more validators, e.g. another 20 inactive validators, into the validator set as backups, which will be called “Candidates”.

Candidates will produce blocks and charge gas fees in BSC mainnet, but in a much less chance than the official validator set of 21 elected. The unavailable candidates will be slashed as well though in a smaller size. A decent motivation is expected to be maintained so that the candidate validators are willing to ensure the quality and help secure BSC.

In an extreme case, if a majority of the active 21 validators get attacked and offline, Candidate Validators can report to Beacon Chain about the stale blocking, resume it and eventually propose a re-election of the active validator set.

The BNB Smart Chain also supports EVM-compatible smart contracts and protocols. Cross-chain transfer and other communication are possible due to native support of interoperability. Binance DEX remains a liquid venue of the exchange of assets on both chains. This dual-chain architecture will be ideal for users to take advantage of the fast trading on one side and build their decentralized apps on the other side. The Binance Smart Chain will be:

* **A self-sovereign blockchain**: Provides security and safety with elected [validators](consensus.md).
* **EVM-compatible**: Supports all the existing Ethereum tooling along with faster finality and cheaper transaction fees.
* **Interoperable**: Comes with efficient native dual chain communication; Optimized for scaling high-performance dApps that require a fast and smooth user experience.
* **Distributed with on-chain governance**: Proof of Staked Authority (PoSA) brings in decentralization and community participants. As the native token, BNB will serve as both the gas of smart contract execution and tokens for staking.

<!--## Comparision Between Beacon Chain and BNB Smart Chain

|                   | Beacon Chain | BNB Smart Chain                    |
| ----------------- | ------------- | -------------------------------------- |
| Consensus         | DPoS          | PoSA                                   |
| No. of Validators | 11            | up to 41 (20 candidate block producers)|
| Mean Block Time   | <1s           | ~5s                                    |
| Programmability   | BEPs          | Support EVM-compatible smart contracts |
| Cross Chain       |[BEP3](https://github.com/bnb-chain/BEPs/blob/master/BEP3.md) introduces *Hash Timer Locked Contract functions* and further [mechanism](https://community.binance.org/topic/1892) to handle inter-blockchain tokens peg.    | BSC comes with efficient [native dual chain communication](cross-chain.md); Optimized for scaling high-performance dApps that require fast and smooth user experience.                    |
-->
## Ecosystem of cross-chains and multi-chains
The big lesson learned from BSC 2021 is that “one chain” cannot cover all angles. At the peak time, BSC had more than 2M daily active users (DAU), with a single GameFi reaching up to 1M DAU. This introduced significant challenges for both the network itself and its supporting infrastructure like RPC/API nodes. For dApps with massive user bases, multi-chains and cross-chain should be the solution.  

The BSC Core Team strongly believes in partition chains and a multi-chain future as it can sustain the ever-increasing demand for decentralized computing power and storage. This is consistent with many other blockchains in the industry, such as ETH2.0 and multi-chain strategies in Polkadot, Cosmos, and Avalanche.

The cross-shard and cross-chain/multi-chain interoperability will be the key topic of 2022. The BSC validators and developers community is dedicated to fulfilling BSC’s vision to operate at the crossroads of a decentralized blockchain future. Specifically, we aim to achieve this by implementing new technologies on BSC via BNB Sidechain and BSC Partition Chain (BPC) infrastructure layers.

![BSC 2022](/img/assets/BNBChain2022.jpg)

### BNB Sidechain
The BNB Sidechain is an infrastructure introduced to help developers and node operators build and run their own blockchain as their internal value system for a massive number of users while still maintaining a close connection with BSC. Any project developer will be able to deploy their own BNB Sidechain with its unique specifications and validator set. This validator set can run with fewer validators than BSC, depending on the BNB Sidechain deployer. These validators can be run by the application owners or any community stakeholders, bringing more flexibility and decentralization to BNB Sidechain. The typical usage of BNB Sidechain is like the Ronin chain for the Axie Infinity.  However, to minimize the potential risks of the side chain, a new protocol (including built-in asset types and cross-chain) should be introduced to ensure seamless liquidity between BNB Sidechain and BSC.

### BSC Partition Chain (BPC)
The BPC will introduce another subspace with a new validator set, a new computing engine, and a new ledger. Essentially it works as a “shard” or a “layer 2” to offload part of the data, computing, and transactions from the BSC Mainnet to other smaller parallel blockchains.

BPC will be a PoSA based blockchain like BSC. Anyone can become a validator for one or more particular BPC on Beacon Chain, which will serve as the beacon chain. The validators can call for delegation to be elected into the validator set of BPC. The election could work on the same principles as the validator elections on BSC – validators are elected every 24 hours based on their staking power (staked BNB).

Deployment of BPCs will decrease the number of data stored by dividing it across multiple BPC blockchains.


## Resources
[White Paper](https://github.com/bnb-chain/whitepaper/blob/master/WHITEPAPER.md)
