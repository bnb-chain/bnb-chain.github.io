# opBNB - High-performance layer 2 solution

The opBNB network is the Layer 2 scaling solution for the BNB Smart Chain powered by [bedrock version](https://community.optimism.io/docs/developers/bedrock/) of Optimism OP Stack. It works by offloading transaction processing and resource usage from the BNB Smart Chain, while still posting data to the underlying mainnet. Users interact with the opBNB network by depositing funds from BSC and using applications and contracts on opBNB. Sequencers then aggregate transactions, compute state transitions and submit them to the rollup contract on BSC. Provers generate cryptographic proofs that prove the validity of these state transitions, and Verifiers check the proofs to verify the opBNB state is correct. At its core, opBNB allows users to deposit and withdraw funds, use smart contracts, and view network data with high throughput and low fees. By leveraging Layer 2, opBNB is able to scale beyond the constraints of the BNB Smart Chain and provide an improved experience for users.

![image-20230621190244472](./img/opBNB-intro.png)

Besides the [differentiators of bedrock](https://docs.optimism.io/stack/differences), opBNB is the solution that we aim to provide the best optimistic solution on the BSC.

- Capacity can reach to > 100m gas per second, which is much higher than other layer 2 solutions on the Ethereum.
- Gas fee of transfer can reach as low as $0.001 on average.
- block time is 1 second.
