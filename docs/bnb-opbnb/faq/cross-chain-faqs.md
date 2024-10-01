---
title: Cross Chain - opBNB FAQs
---

### How does opBNB ensure data availability and security for off-chain transactions?

opBNB relies on a mechanism called "fraud proofs" to ensure data availability and security. Users can submit proofs on-chain that demonstrate any malicious behavior or incorrect transaction processing on the off-chain optimistic rollup. If a fraud proof is valid, the system can penalize the malicious actor and revert any incorrect state changes.

### Who is responsible for gathering and bundling off-chain transactions into bundles on opBNB network?

Sequencers are responsible for the aggregation of transactions, computation of the state transitions and submission of these to the rollup contract on BSC.

### What is the role of the aggregator in the opBNB network?

Aggregators are entities responsible for gathering and bundling off-chain transactions into batches. They play a crucial role in opBNB by forming these transaction batches and submitting them to the main BNB chain for validation. Aggregators also generate Merkle proofs for the data they submit, which are essential for the anchoring process.

### Can opBNB handle smart contracts and complex computations like the main BNB Chain?

The opBNB network is EVM compatible and works identically to BSC from a smart contract developer’s perspective. This means that developers can easily deploy their existing Ethereum or BSC smart contracts on opBNB with minimal changes.

### How does opBNB handle cross-contract interactions and composability?

Cross-contract interactions and composability are challenging aspects for optimistic rollups. While opBNB can facilitate cross-contract interactions, the limitations of off-chain processing mean that certain complex composability scenarios might be less efficient or not supported at all. Developers and projects using opBNB need to carefully consider these limitations when designing their applications.

### What happens if there's a dispute about an off-chain transaction's validity?

In the event of a dispute, a "challenge" period is initiated. During this period, anyone can
submit a fraud proof to challenge the validity of an off-chain transaction. If the fraud proof
is valid and proves that the transaction was incorrect or malicious, the transaction is
reverted on-chain, and the malicious actor might face penalties.

### Can smart contracts deployed on the main BNB Smart Chain interact seamlessly with applications on opBNB? If yes, how?

Yes, this is achieved through a set of smart contracts that enable the execution of transactions on the opBNB network. The main contract is the `batchInbox` contract, which receives batches of transactions from the Sequencer on L1.

### How to allow smart contract cross chain communication between L1 and L2?

Directly interacting with smart contract functions that exist on L2(opBNB) from L1(BSC), is not possible as all smart contracts on L2 are isolated from L1.

With that said, there is a way for developers to allow arbitrary message sending by writing their own contracts to build their required business logic. More details [here](https://community.optimism.io/docs/developers/bridge/messaging/#communication-basics-between-layers).

### Can I directly transfer assets between opBNB and Greenfield?

Currently, direct cross-chain transfers between opBNB and Greenfield are not supported. However, users can achieve cross-chain transfers between these two networks by conducting a two-step process through the BNB Smart Chain (BSC). This involves transferring assets from opBNB to BSC and then from BSC to Greenfield.
