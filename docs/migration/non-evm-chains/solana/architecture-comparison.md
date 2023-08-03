---
sidebar_label: Architecture
sidebar_position: 2
---

# BNB Chain and Solana Architecture Differences 

This document covers the architectural differences between BNB Chain and Solana blockchain, providing an overview to developers aiming to migrate their projects from Solana to BNB Chain ecosytem.

## Architectural and Technical Comparisons

Ethereum is considered the pioneer of blockchain platforms offering developers the option of developing decentralized applications (dApps) through the use of smart contracts. However, with obstacles like high gas cost and scalability issues, several other blockchain platforms offering better features to users have emerged. Amongst the most popular Layer-1 blockchains are BNB Chain and Solana.

BNB Chain has since garnered immense popularity and is now the largest smart contract-powered blockchain network as it provides users with speed, security, scalability, and innovative features. BNB Chain comprises two parts, the BNB Beacon Chain (BC) and the BNB Smart Chain (BSC). BSC offers dApp development, is Ethereum Virtual Machine (EVM) compatible and uses the EVM for smart contract execution. This means that all of the tools and infrastructure compatible with the Ethereum network can also be used with the BSC network. Also, porting projects onto BSC from other EVM-based chains is possible.

On the other hand, one of the most popular non-EVM-based blockchain networks is the Solana blockchain. By being non-EVM based, this means that Solana has its own set of token standards, dev tools, infrastructure, etc., for dApp development. This also means that the majority of the Ethereum-compliant tools and standards cannot be used on the Solana network. Solana initially gained good traction in the Web3 ecosystem, though it also faced incidents of non-availability, scalability, and security issues, leading some projects to consider other options available in the market such as BNB Chain.

In this article, we provide an overview of the architectural differences and other technicalities amongst the two blockchains BNB Chain and Solana. This will help developers understand any adaptations required if they need to migrate a project from Solana to BNB Chain.

## Overview

In this section, we provide an introductory overview of both of the blockchain giants, namely, BNB Chain and Solana.

### BNB Chain

The BNB Chain ecosystem comprises two blockchain giants, namely, BNB Beacon Chain (BC) and the BNB Smart Chain (BSC). The BNB Beacon Chain is responsible for the Governance of the BNB Chain (Staking, Voting). Whereas, the BNB Smart Chain (BSC) blockchain, founded in 2020, is EVM compatible and contains consensus layers and hubs to multi-chains. The BNB Token is the native cryptocurrency of the ecosystem that is used for both staking purposes as well as for payments of transactions over the network.

BSC runs parallel to the BNB Beacon Chain and is the EVM-compatible component of the BNBChain ecosystem, and offers smart contract functionality for creating dApps and other blockchain-based products. BSC gained real popularity in early 2021 because of its lower gas fees and faster finality as compared to Ethereum's high gas fees and scalability problems. BSC uses the Proof-of-Staked-Authority (PoSA) consensus algorithm i.e, it merges delegated Proof-of-Stake with Proof-of-Authority (PoA).

### Solana

Launched in 2017, like BSC, Solana is a Layer-1 blockchain platform with smart contract functionality for programmability purposes. The native cryptocurrency of Solana is SOL which, like BNB in BSC, is used for network validations and payment of fees. As compared to its main competitor, Ethereum, Solana has faster transaction times and lower costs. Solana attains consensus utilizing a Proof-of-Stake (PoS) mechanism, as well as a “Proof-of-History” (PoH) mechanism. Solana states that the merger of PoS and PoH improves scalability without deviating from decentralization and security.

## Architecture Overview

In this section, we provide a brief overview of the architecture of both BSC and the Solana blockchain network.

### BSC Architecture Overview

BNB Chain is an ecosystem comprising two major blockchains that serve different purposes, namely, BNB Beacon Chain (BC) and BNB Smart Chain (BSC). To deal with the increased transactions and DAU, the BNB Chain ecosystem has evolved to add more scaling solutions and now comprises the following components with different responsibilities and purposes.

- [**BNB Beacon Chain**](https://docs.bnbchain.org/docs/learn/beaconIntro) - BNB Chain Governance (Staking, Voting)
- [**BNB Smart Chain (BSC)**](https://docs.bnbchain.org/docs/learn/intro) - EVM compatible, consensus layers, and with hubs to multi-chains
- **BNB ZkRolllup**- ZkRollup solution to scale BSC as a super high-performance blockchain.

![image](https://user-images.githubusercontent.com/93580180/201682988-ca74e288-bf3b-4b31-ab2b-5e748342ef4b.png)

#### Design principles of BSC

- **Standalone Blockchain**: even though BSC runs in parallel to the BNB Beacon Chain, technically, it is a standalone blockchain. Most of the fundamental technical and business functions of BSC are self-contained, and it can run well even if the BC is stopped.
- **Ethereum Compatibility**: To take advantage of the relatively mature applications and community of Ethereum, BSC chooses to be compatible with the existing Ethereum mainnet. This means most of the Ethereum-based **dApps**, ecosystem components, and toolings work with BSC and require zero or minimum changes. Furthermore, BSC nodes require similar (or a bit higher) hardware specifications and skills to run and operate.
- **Staking Involved Consensus and Governance**: Staking-based consensus is more environmentally friendly and leaves more flexible options for community governance. Expectedly, this consensus enables better network performance over[ proof-of-work](https://en.wikipedia.org/wiki/Proof_of_work) blockchain systems, i.e., faster blocking time and higher transaction capacity.
- **Native Cross-Chain Communication**: both BC and BSC are implemented with native support for cross-chain communication among the two blockchains. The communication protocol is designed to be bi-directional, decentralized, and trustless. It concentrates on moving digital assets between BC and BSC, i.e.,[ BEP2](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP2.md) tokens, and eventually, any other BEP tokens introduced later.

![image](https://user-images.githubusercontent.com/93580180/201683059-ef7983fa-6828-4c66-a87c-bf62ba4456b9.png)

### Solana Architecture Overview

![image](https://user-images.githubusercontent.com/93580180/201683132-8302d96b-57be-4722-ac81-90c655b125fd.png)

[Image Source](https://www.immunebytes.com/blog/solanas-architecture-the-top-8-innovations-that-make-it-unique/)

In order to create a decentralized and permissionless network, the Solana ecosystem comprises 8 key technologies:

- [**Proof of History (POH)**](https://medium.com/solana-labs/proof-of-history-a-clock-for-blockchain-cf47a61a9274?source=post_page---------------------------) — a clock before consensus;
- [**Tower BFT**](https://medium.com/solana-labs/tower-bft-solanas-high-performance-implementation-of-pbft-464725911e79?source=post_page---------------------------) — a PoH-optimized version of PBFT;
- [**Turbine**](https://medium.com/solana-labs/turbine-solanas-block-propagation-protocol-solves-the-scalability-trilemma-2ddba46a51db?source=post_page---------------------------) — a block propagation protocol;
- [**Gulf Stream**](https://medium.com/solana-labs/gulf-stream-solanas-mempool-less-transaction-forwarding-protocol-d342e72186ad?source=post_page---------------------------) — Mempool-less transaction forwarding protocol;
- [**Sealevel**](https://medium.com/solana-labs/sealevel-parallel-processing-thousands-of-smart-contracts-d814b378192) — Parallel smart contracts run-time;
- **Pipelining** — a Transaction Processing Unit for validation optimization
- [**Cloudbreak**](https://medium.com/solana-labs/cloudbreak-solanas-horizontally-scaled-state-architecture-9a86679dcbb1?source=post_page---------------------------) — Horizontally-Scaled Accounts Database; and
- [**Archivers**](https://medium.com/solana-labs/announcing-the-solar-bridge-c90718a49fa2) — Distributed ledger storage

## Architectural Differences

In this section, we discuss and compare the differences in the architecture and underlying working mechanisms of both BSC and the Solana network.

- **Relation to Ethereum:** Both BSC and Solana are Layer-1 standalone blockchains and do not rely on or have any dependency on the Ethereum blockchain network.
- **EVM Compatibility:** BSC is designed to be completely EVM-compatible. Support for the EVM allows interoperability and portability between BSC and other EVM-compatible blockchains. Whereas, Solana is non-EVM compatible and is built on a tech stack that the team built from scratch, resulting in interoperability and portability issues.
- **Consensus Algorithm:** In terms of consensus algorithms, both BSC and Solana rely on PoS merged with other energy-efficient mechanisms. Both of the consensus mechanisms employed by either of the blockchains are to overcome Ethereum’s high gas fees and slower transactions.

  - **BSC:** the BSC network uses a merger of delegated PoS and Proof-of-Authority (PoA) termed the Proof-of-Staked-Authority (PoSA). Utilizing the PoSA consensus mechanism, BSC was initially launched with 21 validators. However, now BSC supports 50 validators, of which 29 are active validators, with plans to increase it to 41 in the near future. The top validator candidates with the most bonded stakes are chosen to be part of the subset of active validators and produce blocks. The double-sign detection and other slashing logic guarantee security, stability, and chain finality.

  - **Solana:** uses a combination of Proof-of-Stake (PoS) and Proof-of-History (PoH). Solana's PoS-based consensus mechanism termed Tower BFT leverages the network's PoH mechanism as a clock before consensus to reduce communication overhead and latency. PoH is a method of incorporating time itself into the blockchain.
  Every time a validator votes on a particular fork, voting is restricted to a fixed period of hashes known as the “slot”. Currently, one slot aims to have a duration of approximately 400 milliseconds (ms), i.e., 0.4 seconds. In reality, the block size varies between 800ms up to 2 seconds. During the block creation time, the network has a potential rollback point, but every subsequent vote doubles the amount of time that the network would have to stall before it can unroll that vote. In short, secondary votes make it much harder to undo the transactions executed in a particular slot. Therefore, a block with several votes has a greater chance of remaining a part of the chain permanently.
  As new blocks are added to the ledger, old blocks are increasingly likely to be confirmed because the number of slots old votes are committed to doubles every slot. Tower BTF offers finality once two-thirds of network validators have voted on some order of events. Once transactions are finalized, they can't be rolled back.

- **Validators:**
  Using the PoSA algorithm, BSC supports a set of up to 41 active validators today (. The top validator candidates with the most bonded stakes are chosen to be part of the subset of active validators and produce blocks. The double-sign detection and other slashing logic guarantee security, stability, and chain finality.

  The Solana mainnet operates in a delegated-Proof-of-Stake (dPoS) fashion. SOL holders can participate in the block production process and earn rewards by either becoming a validator through staking SOLs or by delegating their tokens. Any individual can become a validator on the network and contribute to the overall security of the protocol. There is no minimum staking requirement, although the leader selection process (which validator gets to propose the next block) is stake-weighted.

- **Scalability and Block Time:** BSC offers several different features, such as ZkRolls, etc., to overcome any scalability issues commonly faced by blockchain networks. The average block time of BSC is approximately 3 seconds even during periods with the highest congestion. Solana, on the other hand, offers an average block time of 0.610 seconds and allows 700 transactions per second. Nevertheless, this block time has faced consistency issues, and you are likely to face several slower block times. Notably, Solana has suffered several outages this year.

- **Transaction Speed and Fees:** Theoretically, Solana claims to have the power of processing over 60,000 TPS without relying on scaling solutions. However, this figure is hugely inflated when compared to other blockchains’ TPS figures. Solana’s TPS is measured by Block Explorers can be misleading — it counts internal consensus messages as transactions, which no other blockchain does. Roughly[ 80% of Solana’s throughput](https://dune.xyz/queries/396417/756581) is consensus messages.

- **User Activity:** based on user activity, BSC is the largest network with an all-time high daily active users (DAU) of 2.2M on Dec 2021. At the time of writing, the current value of DAU of BNB Smart Chain is 1.2M with daily network usage of approximately 13% with an average of TPS and more than 3.6B transactions, along with a [TVL of 6.14B](https://defillama.com/chain/BSC). On the other hand, there is no way officially stated the DAU number for Solana. However, you can get an estimated value from [Dune Dashboard](https://dune.com/danning.sui/Solana-User-Base), at the time of writing, Solana has approximately 124K DAU with a[ 1,784 TPS](https://explorer.solana.com/) and [TVL of 584M](https://defillama.com/chain/Solana), making TVL 10 times lower than on BSC Remember that Solana counts its vote transactions for calculating TPS value. As per The Block, the 7-day average for non-vote transactions on Solana is 24.8M, which as compared to BSC is far less.
  
- **Reliability:** Throughout this year, Solana displayed several reliability issues and outages. The network has suffered up to 10 partial or complete outages in 2022 and some slow block times. Whereas, BSC, on the other hand, it has never faced slow block times due to uncontrolled outages. BSC has rolled out several breakthrough features to further strengthen its scalability and reliability.

### Architectural differences that affect programmability

Other than the underlying working mechanism like consensus and security, architectural differences affect the way dApps are programmed on either of the blockchain networks.

In this section, we highlight some of these major differences that a web3 developer should be aware of when programming dApps on either of the blockchain networks.

  1. **Gas vs Rent:**
    On EVM-based blockchains, one of the major resources of concern is the Gas fees paid for transactions over the network. Gas is referred to as the cost required for performing a transaction on the network. As BSC is EVM-based, it follows the Gas system for payment of transactions and rewards to the validators. The exact price of the gas is determined by supply, demand, and network capacity at the time of the transaction. The gas fee is calculated using Gas Limit \* Gas Price per Unit. As of writing, BSC has an average gas limit of [~119M](https://bscscan.com/chart/gaslimit), an average gas price of [6.9870Gwei](https://bscscan.com/chart/gasprice), and an average daily gas used of [4331M](https://bscscan.com/chart/gasused).
    <br/>
    On the other hand, Solana does not have a Gas system, rather it follows a rent model. Every account includes metadata that specifies the runtime access permissions of the data. It also includes metadata regarding the lifetime of the data held in the account. Lifetime is expressed by a number of fractional native tokens called lamports. Accounts are held in validator memory and pay "rent" to stay there. Each validator periodically scans all accounts and collects the rent. Any account whose balance drops to zero lamports or required rent amount gets removed from the network in a process known as Garbage Collection. One important aspect to remember is that rent is different from transaction fees. Rent is paid (or held in an Account) to keep data stored on the Solana blockchain. Whereas transaction fees are paid to process instructions on the network.
    <br/>
    To prevent abuse of computational resources, each transaction on the Solana network is allocated a computing budget. The budget specifies the maximum number of computing units that a transaction can consume. Compute unit can be defined as the smallest unit of measure for the consumption of computational resources of the blockchain. The costs associated with different types of operations a transaction may perform and the operational bounds the transaction must adhere to are all specified by the compute budget. This budget is capped and leads to several issues for programmers who wish to develop more extensive features on the Solana network.

  2. **Storage**
  
     a. **Accounts**
      EVM-based blockchains have two types of accounts - Externally Owned Accounts (EOA) and Contract Accounts. EOAs can store asset balances and are capable of sending and receiving transactions. Contract accounts form the basis for on-chain smart contracts. Along with storing the EVM code, every contract account also has an associated storage map that is used for reading and writing arbitrary data. The EVM provides instructions for each contract to read and write to its own storage, but it is impossible to read from other contracts’ storage.

      Solana’s Sealevel (runtime component for smart-contract) also has two types of accounts: executable and non-executable accounts. Unlike the EVM, both of these accounts have the capability of storing data. Executable accounts are immutable in Sealevel and can either store their own executable byte code or a proxy address of an account that stores mutable executable byte code. Due to the immutable nature of the executable accounts, non-executable accounts are used for storing their application state.

      In the EVM, contracts can only read and write their own storage. On the other hand, in Sealevel, any account’s data can be read or written to by a contract. However, the runtime enforces that only an account’s “owner” is allowed to modify it. Changes by any other programs will be reverted and cause the transaction to fail.

     b. **Contract Storage**

      On the BSC blockchain, EVM is responsible for the execution of smart contracts. The contract state or memory is stored at the contract address. This storage resembles the array data structure of infinite length located at the contract’s address. The storage mechanism ensures no conflicts in storage locations and follows a set of rules. Using these rules, we can decode the state of any contract.

      As compared to BSC, data storage and management are much more complex on Solana. There are different account categories used for data storage on Solana:

      - **Program Accounts:** are accounts that store executable code, the equivalent to BSC’s smart contracts.
      - **Storage Accounts:** are used for storing the data connected to programs (smart contracts).
      - **Token Accounts:** are used for keeping track of an account balance of tokens and allow for transferring or receiving tokens between accounts.

      In the Solana blockchain, smart contracts are referred to as programs. Unlike BSC, there is a separation between the program and the data/state of the program. Both are assigned separate accounts but are connected. In BSC, a smart contract and its data are both located in one location on the blockchain. If you were to make a program that counted the number of token transfers that a program made, you would need to create the program to make the transfers as well as another account to store the count of transfers.

      ![image](https://user-images.githubusercontent.com/93580180/201683595-dc786a17-eebc-4d51-a51e-74988e2d0c91.png)
      
      [Image Source](https://solanacookbook.com/assets/account_example.5b70d95a.jpeg)

  3. **EVM Contracts vs Solana PDA**
     On BSC, smart contracts are EVM compatible. On EVM, smart contracts are stored on the contract accounts. A contract account is controlled by code executed by the EVM. Contract accounts have associated code and data storage, controlled by the code itself. The controlling behavior is defined in the smart contract stored in them. Creating a contract account has a cost due to network storage. A contract account can only send transactions in response to receiving a transaction. Transactions from an external account (user account) to a contract account can trigger code, which can execute many different actions.
     
     On the Solana blockchain, Program Derived Accounts (PDA) are referred to as the account whose owner is a program and are designed to be controlled by a specific program. With PDAs, programs can programmatically sign for certain addresses without needing a private key. These serve as the foundation for Cross-Program Invocation through which Solana-based apps are composable with one another.

  4. **Smart Contract Life cycle**
      On an EVM-based blockchain, like BSC, there are four phases involved in the life cycle of smart contracts.

      - Creation of the smart contract
      - Freezing of the smart contract
      - Execution of the smart contract
      - Finalization of the smart contract

      On BSC, Smart contracts are usually written in a high-level language, like Solidity. However, in order to run, they are compiled to the low-level bytecode compatible to run on the EVM. Once compiled, the bytecode is deployed on the BSC platform using a special contract creation transaction. Each contract is identified by a BSC contract address, which is derived from the contract creation transaction as a function of the originating account and nonce. The address of a contract can be used in a transaction as the recipient, sending funds to the contract, or calling one of the contract’s functions.

      In the case of Solana, on-chain programs are compiled via the [LLVM compiler infrastructure](https://llvm.org/) to an [Executable and Linkable Format (ELF) ](https://en.wikipedia.org/wiki/Executable_and_Linkable_Format)containing a variation of the [Berkeley Packet Filter (BPF)](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter) bytecode. Because Solana uses the LLVM compiler infrastructure, a program may be written in any programming language that can target the LLVM's BPF backend. Solana currently supports writing programs in Rust and C/C++. BPF provides an efficient [instruction set](https://github.com/iovisor/bpf-docs/blob/master/eBPF.md) that can be executed in an interpreted virtual machine or as efficient just-in-time compiled native instructions.

  5. **Interaction with Smart contracts**

      a. **Solana execution model vs EVM model:** EVM follows a stack-based model for the execution of transactions and smart contracts. On the other hand, Solana offers a parallel execution model. Its Sealevel runtime is a concurrent transaction processor. Transactions specify their data dependencies upfront and dynamic memory allocation is explicit. By separating program code from the state it operates on, the runtime is able to perform concurrent access. Transactions accessing only read-only accounts are executed in parallel whereas transactions accessing writable accounts are serialized. The runtime interacts with the program through an entry point with a well-defined interface. The data stored in an account is an opaque type, an array of bytes. The program has full control over its contents.

## Conclusion

With a multitude of blockchain platforms available for development in the Web3 domain, BNB Chain has emerged amongst the top ranks. BNB Chain offers developers speed, security, efficiency, and low cost with ensured scalability. In this article, we have provided a detailed comparison of the architecture of the BNB Smart Chain and the Solana network. This article is aimed at giving readers understand the differences in the underlying architecture.

