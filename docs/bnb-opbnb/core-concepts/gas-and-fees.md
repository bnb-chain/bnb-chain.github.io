# Gas and Fees

OpBNB is a Layer 2 scaling solution that aims to achieve higher throughput and lower cost for transactions on the BNB Smart Chain. The cost of opBNB transactions consists of two components: the Layer 2 gas fee and the Layer 1 gas fee. The Layer 2 gas fee reflects the computational complexity of the transaction. The Layer 1 gas fee covers the expense of submitting batches of transactions to the BSC for verification and finality.

**Gas price = base price + priority price**

**Layer 2 transaction cost = Layer 2 gas price x Layer 2 gas consumed + Layer 1 gas price x Layer 1 gas consumed.**

## Current configuration

| Name          | Floor Base Price | Minimum Priority Price |
| ------------- | ---------------- | ---------------------------- |
| opBNB Testnet | 8 wei (dynamic)  | 1001 wei                         |
| opBNB Mainnet | 8 wei (dynamic)  | 1001 wei                         |
| BSC Testnet   | 0                | 3                            |
| BSC Mainnet   | 0                | 3                            |

## What does this means

Please note the floor base price is the minimum base price opBNB can set, and according to the usage, the base price can fluctuate. For example, according to the current configuration, if the usage of a block reaches 50% of 100M gas, the base price will increase by 12.5%.

The minimum priority price is preconfigured, and users can give any priority price that is higher than this number. Usually users will get the estimate gas price by calling the API of “estimate gas price”. It is a recommended gas price according to the current average gas price of history blocks.

BNB Chain aims to reduce the transaction cost to the level that enable the mass adoption, for opBNB, the target of the transfer transaction is lower than $0.001.

## How opBNB keep reducing the cost of L2 transactions

1. **Enhanced Data Compression**: Implementing more advanced data compression algorithms to reduce the size of L2 transaction data before submitting it to L1.

2. **Efficient Transaction Batching**: Optimizing how transactions are batched together to maximize space efficiency and reduce costs per transaction.

3. **Data Availability Solutions**: Utilizing solutions like those in BNB Greenfield for offloading some data storage from the main chain, thereby reducing data costs.

4. **Zero-Knowledge Proofs**: Employing zero-knowledge proofs to validate transactions without disclosing full transaction data, thus minimizing L1 data load.

5. **Protocol-Level Optimizations**: Making improvements at the protocol level to reduce overhead in transaction processing on L2.

