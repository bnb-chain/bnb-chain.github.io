---
title: Protocol FAQs - opBNB FAQs
---

### How does opBNB achieve high performance and cheap gas fees?

opBNB testnet enhances the performance of the "Execution Layer" and the "Derivation Layer" of the OP Stack as highlighted in [OP Stack landscape](https://stack.optimism.io/docs/understand/landscape/?ref=binance.ghost.io#existing-landscape).

### How do you expect the TPS of the opBNB?

The TPS of opBNB can be estimated to be around **4,761** transactions per second based on the calculations. This is significantly higher than Ethereum's current TPS and can enable more frequent daily transactions.

### What impact opBNB can bring to web3 games? 

Performance is important for games because gamers expect a highly responsive experience. Any lag, delay or choppiness can hamper enjoyment and immersion in the game. For blockchain games, fast transaction speeds and throughput are crucial to enable a seamless user experience. Gamers expect in-game assets and currencies to be transferred instantly, so the underlying blockchain network must be high performance

### What is the difference between opBNB and other Optimism based layer 2 solution, like Base?
opBNB is the first layer 2 optimistic rollup on BSC, and BSC layer 1 cost is much lower than ETH, so the cost of layer 2 on BSC will give application developers a more affordable solution. Another difference is the opBNB will include the performance optimization techniques that have been used in BSC to have a much better performance.

### We already have the zkBNB as a scaling solution, why opBNB is needed? 
zkBNB is not EVM-comptatible, which means it is more suitable for NFT and token transactions, not for generic dApps. opBNB`s programmability is to support applications that need more flexibility.

### Is opBNB connected to the superchain or is unrelated? Can opBNB be considered as just optimistic rollups on the BNB Smart Chain?

opBNB can be considered as just rollups on BSC, not superchain. Please check
[this](https://bnbchain.org/en/blog/opbnb-high-performance-and-low-cost-layer-2-based-
on-optimism-op-stack/) blog for more details. We may expand opBNB to superchain or
L3 in the future.

### What are the differences between opBNB, the OP Stack, and Arbitrum Orbit? What are the pros and cons of these different tech stacks?

Check [this](https://bnbchain.org/en/blog/opbnb-high-performance-and-low-cost-layer-2-based-
on-optimism-op-stack/) blog for more details on the differences between opBNB, the OP
Stack, and Arbitrum Orbit.

### Why OP Stack is used for the implementation of opBNB instead of zkEVM?

OP Stack is a reliable and robust solution that has been verified through rigorous testing.
OP Stack is designed with modularity in mind, allowing it to support multiple clients and
different data access layers without affecting other parts of the code. opBNB leverages
OP Stack as a solid foundation to explore various ways to lower the cost and enhance
the user experience.

### Are transactions nonce-order enforced?

Yes, on opBNB transactions, nonce-order enforced.

### How does opBNB prevent front-running and other transaction-related attacks?

Front-running and other transaction-related attacks are challenges faced by many
blockchain systems. opBNB uses mechanisms like transaction ordering and
timestamping to mitigate these attacks. Aggregators are incentivized to order
transactions fairly and not prioritize their own transactions, reducing the potential for
front-running.

### Can I run my own validator or aggregator node on the opBNB network?

The opBNB network currently does not support running validator or aggregator nodes by
individual users. However, we are working on this feature and plan to release it in the future.
Please keep following opBNB for the latest updates.

### How does opBNB handle reentrancy attacks within its optimistic rollup framework?

opBNB employs a combination of security measures, including strict transaction ordering
and careful state management, to prevent reentrancy attacks. By enforcing a controlled
and deterministic execution order, reentrancy attacks are mitigated.

### What's the mechanism for preventing long-range attacks on the opBNB network?

opBNB implements a checkpointing mechanism that anchors its state onto the main
BNB chain. This helps prevent long-range attacks by ensuring that the latest valid state
is preserved on-chain, making any attempted reorganizations infeasible.

### How does opBNB ensure the ordering of transactions in a decentralized manner without central coordination?

The opBNB team is responsible for operating the sequencer, which ensures the correct
order of transactions on the network. The sequencer is a centralized component that
provides a reliable and efficient service for the users.

### How does opBNB handle disputes arising from cases where the fraud proof itself is malicious or incorrect?

opBNB employs a challenge mechanism to resolve disputes. If a malicious fraud proof is
submitted, honest participants can submit counter-fraud proofs to correct the situation.
The challenge period provides time for these proofs to be evaluated.

### What is the challenge period on opBNB?

During the challenge period, any participant on the blockchain can raise challenges against the validity of the transactions or the execution results provided by the L2 sequencer. This mechanism is crucial for ensuring the integrity and correctness of the L2 execution.

### What is the difference between validity proof and fraud proof?

The validity proof is efficient at verifying, verifiers just need to check the “proof” once and
confirm the correctness, but the disadvantage is that it is hard to generate the proof,
both in algorithm and in efficiency. A popular validity proof solution is zero knowledge
proof. On the other hand, the fraud proof is efficient at execution since it doesn’t
generate any proof at execution time, but the shorthand is that a specific time window
must be established for participants to challenge the correctness of the L2 state, which
will highly affect the finality of the L2 results.

### What is the duration of the challenge period?

The challenge window is shorter on the testnet of opBNB, so you can test the withdrawal
process faster. On the mainnet of opBNB, the challenge window will be 7 days long.
21. What are the penalties for dishonest sequencers?
In case a sequencer is proven to be dishonest or provides incorrect execution results,
penalties are applied. The sequencer's bond may be slashed as a form of punishment.
Additionally, the state roots from the problematic transaction onwards will be erased and
re-computed to ensure accuracy.

### How to check if a smart contract is verified on opBNB using an API GET request?
With the [API key](https://nodereal.io/meganode) and smart contract address, you can retrieve the contract's verification status, source code & ABI.

- For opBNB mainnet, https://open-platform.nodereal.io/{{yourAPIkey}}/op-bnb-mainnet/contract/?action=getsourcecode&address={{contract address}}.
- For opBNB testnet, https://open-platform.nodereal.io/{{yourAPIkey}}/op-bnb-testnet/contract/?action=getsourcecode&address={{contract address}}.

### How to get the finalized block height on opBNB and why is it always hundreds blocks behind the latest?
The difference between latest and finalized by more than 200 blocks is expected. This is the concept in the OP design. The latest is defined as the latest unsafe block. The finalized means that the L2 block has been committed to L1 and the corresponding L1 block is finalized (by fast finality or natural finality).

