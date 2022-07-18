---
sidebar_label: Scaling
sidebar_position: 2
---

# Scaling 

## BSC Throughput Boost

Though many have challenged that BSC chose to scale up the capacity by shorter block time and larger block gas limit. There is strong faith that there is still room to improve the capacity of the current PoSA based BSC.

Based on the past research and investigation, storage has been commonly considered as the major bottleneck. The 17TB data of a BSC archive node / 2TB for a full node on one machine is not sustainable. As a result, storage optimization is the main focus as well.

![storage-stats](https://global.discourse-cdn.com/standard11/uploads/binancesmartchain1/original/1X/d177780f6baa8cfe6c6b5761b08b980d51cabcee.jpeg)

## Erigon Based BSC Client or Another Storage Model
[Erigon](https://github.com/ledgerwatch/erigon), a.k.a the previous “turbo-geth”, has been striving hard to improve the storage system of Ethereum/Geth in the past 3 years and now blossomed into beta status. Its new storage model with the new database, MPT generation methodology and staged sync has been proven to run much more efficiently than Geth for the large storage. Creating a BSC client based on Erigon will certainly improve the efficiency of the BSC archive node by reducing the storage size and improving the sync time.

[Ankr is already contributing to the task](https://github.com/bnb-chain/bsc-erigon). The full node binary is ready to run while the validator mode is being worked on.

Besides the instant benefits, the new storage model of Erigon may also set a better cornerstone for the other storage related optimizations.

One shortcoming of Erigon is that it doesn’t support Snapshot Sync yet, which is a must for BSC node runners. The BSC community will work with Erigon to overcome this in 2022.

## Distributed Node
For high performance computing, it is almost impossible to only rely on one node nowadays. The principle of BSC is to allow the node runners to use multiple servers with common hardware specs to support the network, instead of one “bare-metal” super machine.

Running different functions of a blockchain client on different processes or machines are not new. Erigon proposes to run the RPC function in a standalone process on the same or different machine. The Merge of ETH 2.0 will also decompose the consensus and execution layers onto different client softwares.

A typical blockchain client comprises many functionalities, P2P networking, consensus, RPC service, execution layer etc. Even zooming in these parts, e.g. the execution layer, is composed of many steps, such as the computing of transactions, the state persistence and the generation of different MPT(Merkle Patricia Trie) roots. Decoupling the functions onto different processes and machines can take advantage of the better computing and storage capacity. Some community members have started [some trials](https://github.com/binance-chain/bsc/pull/640). However, distributing the node also poses great challenges, especially on synchronization between the distributed sub-nodes without losing the blockchain network security, i.e. the full node operators can easily run the suite of processes to keep the network running with the same level of security but much more capacity.

A straightforward approach may be to arrange the tasks in a “synchronized, distributed, assembly line” (SDAL), due to the sequential characteristics of the blockchain. Some change may be required on the consensus logic to make this type optimization easier. This is also discussed in other blockchains that break sequencing, execution and storage (settlement) into different components.

## Ephemeral Client and Hot/Cold Data Segregation
One foreseeable problem of the current public blockchain is that it stores ALL the data FOREVER. It is very likely that only 20% of the state in the EVM blockchain is still useful, while 80% may not be used much anymore. BSC has more than 121 million unique addresses in Dec. 2021, while daily active addresses are only over 2 million. Many data were created on the blockchain for just one time use and the creators do not bother with calling the SELF DESTRUCT instruction. But the data will be there forever, and accumulated only to break the bones of the archive node.

Ideally there should be an “Ephemeral Client”, which is a mode between a “full node” and a “light client”:

Ephemeral Client starts with a much smaller snapshot of the blockchain, which only contains state of the accounts and contracts that are active in the past 2 weeks or 1 months, with only recent block bodies, headers and receipts, with all other data excluded;
The excluded accounts and contracts will only be presented as intermediate node of MPT, so that they can still be used to calculate the new MPT;
Ephemeral Client can work in a similar way as a full node, in the sense that it will execute all the transactions and verify all the data. It should load the excluded data during the execution from another full node or the Portal Network, or even pre-load the excluded data based on the transactions in the mempool.
Apparently sometimes the ephemeral clients may run slower than a full node, but it is a trade-off to make it much easier to run, and run faster.

Deriving from this concept, it is natural to consider separating the hot data from the cold data, which has been a classic technique used in the computing industry. If the EVM blockchain is considered as a “world computer”, the memory of the node should be the registers, while the storage can be the RAM (yes, with MPT used in a similar way as ECC in RAM). RAM has never been big enough, so that the data has to be swapped out onto local or/and remote disks. The EVM blockchain needs such “local or/and remote disks” too.

This is not an easy problem to solve:
    1. Data location is not part of the consensus. It may be easy to mark the data as “swap-out” or “offline” and reach the consensus, but the more important issue is to reach the implicit consensus that “my proposed block has some transactions that swap in data from the offline mode”. The short blocking time may not be enough from other validators to respond.
    2. Some contracts may have a very big storage, which is a great help to swap it out, but very challenging to swap it in as a whole back to “online”.
One potential solution may be:
    1. Swap the data out by the unit of account and contract when they have not been changed for a long time, and put this as an transaction to get consensus;
    2. Swap in data by a deterministic set size, which may not be as large as the whole contract data.
    3. The swapped-in data can be passed in as extra calldata on the block, and the other validators can execute the transactions and verify the data as a “stateless client” if they cannot load the data in time.
    4. The transaction senders will pay extra gas to run any transaction that requires swapping in the data.
A new data layer may emerge due to the requirement to store the cold data.

## EVM Parallelization
Running transactions in parallel for Ethereum has been studied for several years. Solana goes with a native design to enable this as much as possible so that it can take advantage of the powerful GPU.

Based on the analytics of BSC data, the CPU has not been the No.1 bottleneck but the storage is. Even though the EVM parallelization will take better usage of multiple cores of the modern CPUs, the primary goal is to increase the parallelism of storage operation to maximize the SSD usage (even the SATA ones).

In order to maintain backwards compatibility and not change the account structures as Solana does, the most straightforward method is heuristic based, i.e. try-and-rerun-the-failed. The full nodes can do some preprocessing to categorize the transactions in the blocks and mempool into different concurrent workers before actually running them. A lower level instrument monitor will be planted at the storage level, if the race condition is detected, and relevant transactions will be put back into the main worker to rerun in order to generate the correct state. Block producers may even place some hints for others to run the blocks in the most efficient way via the P2P network, though the hint itself is not part of the block.

Besides the parallelization within one block, BSC inherits one limit from Ethereum that the block proposer has to wait until it applies all the previous blocks before it can execute any transactions in its block to propose at its turn. If the previous block proposers send the block late, or the blocks are delayed due to slow network etc, the proposer may not have enough time to execute enough transactions into their blocks and have to propose an empty block or even miss its turn. Tendermint is a good example that solves the above issue. The block proposer on Tendermint network only needs to assemble the block without executing them. How to control the gas used within one block without executing transactions is a difficult topic on the EVM network.

How to run transactions in parallel even among different blocks will be very rewarding here, but it will be very difficult as well.

## EVM JIT Compilation
Using JIT compilation in EVM was [proposed](https://github.com/ethereum/evmjit) and [discussed](https://ethresear.ch/t/evm-performance/2791) in the early days of Ethereum. When popular dApps dominate the network, such as OpenSea and Uniswap on Ethereum, and PancakeSwap on BSC, and one GameFi dApp had a few million transactions per day, the idea is fascinating that these applications can be compiled into native instructions and able to run faster. This benefits even the compilation is not done “just-in-time” but offline.

However, this is a very challenging feature because it touches the very low level of EVM and can be quite prone to error and security issues. Here is just a placeholder for the talented developers to conquer in the later stage.
