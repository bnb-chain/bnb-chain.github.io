---
title: opBNB Metrics - opBNB Core Concepts
---

# opBNB Metrics

Compared with other L2 solutions on the Ethereum, like **OP Mainnet** and **Arbitrum**, **opBNB** has lower gas fee, and higher block gas limit, which means the gas fee will be more stable when traffic of Layer 2 increases. I listed the Ethereum EIP-1559 parameters as a reference. Arbitrum gas mechanism is based on the ArbOS, it is not applicable here.

**Gas Parameter Differences**

| **Parameter**                         | **opBNB value**     | **Optimism value** |
|---------------------------------------|---------------------|--------------------|
| Block gas limit                       | **100,000,000 gas** | 30,000,000 gas     |
| Block gas target                      | **50,000,000 gas**  | 5,000,000 gas      |
| EIP-1559 elasticity multiplier        | 2                   | 6                  |
| EIP-1559 denominator                  | 8                   | 50                 |
| Maximum base fee increase (per block) | 12.5%               | 10%                |
| Maximum base fee decrease (per block) | 12.5%               | 2%                 |

**Metrics Differences**

|                        | **opBNB**             | **Optimism** | **Arbitrum** |
|------------------------|-----------------------|--------------|--------------|
| **Gas Token**          | BNB                   | ETH          | ETH          |
| **VM**                 | EVM                   | EVM          | EVM          |
| **Gas Fee**            | **$0.001**            | $0.05        | $0.1         |
| **Block Gas Limit**    | **100M(150M 2024Q1)** | 30M          | 32M          |
| **Block time**         | **1s**                | 2s           | 0.25s(Min)   |
| **Withdraw/ Finality** | 7 days                | 7 days       | 7 days       |
| **TPS (Transfer)**     | **4500+**             | 700+         | 4000+        |

OP Stack has some minor differences, so does opBNB. I just listed the differences here for your reference, for details you can refer to the [OP Stack documents](https://stack.optimism.io/docs/releases/bedrock/differences/#opcode-differences).

Our goal is to provide a scaling solution for network congestion problems for highly active applications on the BSC, such as DeFi, NFTs and gaming. opBNB is based on OP Stack and with optimizations of the mining process and the cache data access to achieve a capacity of 100M gas per second, which is much higher than BSC. 

|                      | **opBNB**  | **BSC**                                             | **Ethereum** |
|----------------------|------------|-----------------------------------------------------|--------------|
| **Gas Token**        | BNB        | BNB                                                 | ETH          |
| **VM**               | EVM        | EVM                                                 | EVM          |
| **Gas Price Model**  | EIP-1559   | [Gas Price Auction](https://bscscan.com/gastracker) | EIP-1559     |
| **Block Gas Limit**  | **100M**   | [140M](https://www.bscscan.com/chart/gaslimit)      | 30M          |
| **Block time**       | **1s**     | 3s                                                  | 12s          |
| **Transaction Cost** | **$0.001** | $0.03                                               | $1           |



*Unlike opBNB and OP Mainnet, which have fixed blocktimes, Arbitrum has a variable blocktime that depends on the number and gas of transactions in a block. The more transactions and gas a block contains, the longer it takes to mine. The minimum blocktime on Arbitrum is 0.25 seconds, which means that the fastest block can be mined in a quarter of a second.*

