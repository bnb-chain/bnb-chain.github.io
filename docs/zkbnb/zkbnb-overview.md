---
sidebar_label: Overview
sidebar_position: 2
---
# ZkBNB - The Scaling breakthrough for BNB Chain

In the document we outline a high-level overview of the relevant features, before taking a look at the specific details of architecture, storage layout, tokenomics, etc.

## Introduction

Blockchain technology has been always under criticism for its scalability issues. With a tenfold increase in the total number of users and transactions, this problem became much more evident. Several solutions have been proposed to overcome this shortcoming which is the biggest hurdle in the path of mass adoption of blockchain. For example, Layer-1 solutions, such as Proof-of-Stake and Sharding, aim to improve performance by implementing changes to the Mainnet. As well as Layer-2 solutions, like rollups, increase the number of processed transactions by offloading transactions off of Mainnet (Layer-1) while still maintaining the same security measures and decentralization as the Mainnet.

Some of these solutions can be regarded as application-specific (e.g., channels), while others as general-purpose (e.g., side-chains). However, there was still a lack of a "global solution" that could work for every blockchain platform. This was until the introduction of the Zero-Knowledge Rollups (ZK Rollups), which are considered the ultimate Layer-2 solution for blockchain-related scalability problems.

As of writing, the total Daily Active Addresses (DAA) on BSC is around [815,620](https://ycharts.com/indicators/sources/bscscan), whereas the total number of transactions per day is ~[3.572M](https://ycharts.com/indicators/reports/binance_smart_chain_statistics). In not so distant past, on July 29th, 2021, the total network utilization of BSC saw the [highest peak of up to 90%](https://bscscan.com/chart/networkutilization), leading the core dev team to devise scalability solutions to overcome this issue. Harnessing the power of zkRollups, BNB Smart Chain has introduced ZkBNB, a breakthrough in the scalability solutions for blockchain technologies.

## What is ZkBNB?

ZkBNB is built on ZK (Zero Knowledge) Rollup architecture. ZK Rollups is a Layer-2 solution where all the computations and state changes are done off-chain, that is on a sidechain. In this architecture,  a summary of the changes along with some cryptographic proofs for proving the validity of these changes are posted to the Mainnet.

Like zkRollups, ZkBNB has the capability to bundle (or "roll-up") hundreds of transactions into a single batch (Rollup Block) off-chain and generate a cryptographic proof. These proofs can come in the form of [SNARKs (succinct non-interactive argument of knowledge)](https://cointelegraph.com/explained/zk-starks-vs-zk-snarks-explained), which can prove the validity of every single transaction in the Rollup Block. It ensures that all funds are held on the BSC, while computation and storage are performed on [BNB Sidechains)](https://docs.bnbchain.org/docs/BNBSidechain/overview/bs-overview) with less cost and fast speed. Furthermore, thanks to the use of zk-SNARK proofs, ZkBNB shares the same security as that of BNB Smart Chain.

## Why ZkBNB?

To resolve the network scalability problems faced by BSC, a new standard called BEP100 was proposed to introduce a modular framework for creating BSC-compatible sidechains. Sidechains are essentially separate blockchains that run independently of the main blockchain (BSC), but are, however, connected to the BSC Mainnet via a two-way bridge. BEP100 proposes for these sidechains  to connect to BSC by a native relayer hub, which will  result in an overall improvement in the performance of the network and provide much higher throughput and lower gas fees. Furthermore, the security of native relayer hub is guaranteed by the side chain. Nevertheless, bridges are now being considered as top targets for hackers as attacks on bridges account for 69% of total funds stolen in 2022. Therefore, there was a need to provide a solution that would not only overcome network scalability issues, but also help in secure communication of BSC and BSC-compatible sidechains. Thereforth, zkBNB, an architecture built on the [zero knowledge rollups, was introduced](https://ethereum.org/en/developers/docs/scaling/zk-rollups/).

## What features does ZkBNB offer?

Currently, ZkBNB implements the following features:

-   **Same Security as that of L1:** The ZkBNB shares the same security as BSC does. Due to the use of zkSNARK proofs, the security is guaranteed cryptographically. Users do not have to trust any third parties or keep monitoring the Rollup blocks in order to prevent frauds.
-   **Seamless L1-L2 Communication**: BNB and BEP20/BEP721/BEP1155 tokens created on BSC or ZkBNB can flow freely between BSC and ZkBNB.
-   **Built-in instant AMM (Automated Market Maker) swap:** ZkBNB allows digital assets to be traded without permission and automatically by using built-in liquidity pools.
-   **Built-in NFT marketplace:** Developers can build marketplaces for crypto collectibles and NFTs (non-fungible tokens) out of the box on ZkBNB.
-   **Fast transaction speed and faster finality:** With performance a key priority for BNB Smart Chain, zkBNB puts up astonishing figures with an ability to support 100 million addresses and handle up to 10 thousand transactions per second (TPS), which are unparallel figures in the blockchain industry.
-   ******Gas Tokens:** The gas token on the ZkBNB can be either BEP20 or BNB, with fees up to 10x lower****
-   **"Full exit" on BSC:** If a user feels that his transactions are censored by ZkBNB, at any time, they can request a "full exit" operation to withdraw funds. This means users can withdraw funds at any time.

## Who Will Benefit ZkBNB?

User experience has always been the top priority for the BNB Smart Chain. This is why ZkBNB was built with blockchain-based games and social media projects in mind.

In a nutshell, all the developers in the Web3 community can take advantage of the incredible features offered by ZkBNB. In particular, anyone looking to develop NFT dApps, can make the most of ZkBNB thanks to the built-in NFT marketplace and API services. These features make it simple to setup an 'out-of-the-box' marketplace for crypto collectibles and NFTs.

With ZkBNB, long delays pertaining to on-chain resolutions will be a thing of the past. As ZkBNB offers straightforward token operations out-of-the-box, developers can now efficiently transfer BNB and other digital tokens (BEP20/BEP721/BEP1155) seamlessly between BSC and ZkBNB. Resulting in faster execution of lengthy transaction lists while ensuring a seamless undisturbed experience.

Additionally, ZkBNB offers a set of robust REST API services, ensuring that developers with previously established gaming or content projects can launch their projects on Web3 quickly and seamlessly with ZkBNB.

Another distinguishing factor of ZkBNB is its ability to enhance the user experience by introducing a built-in naming service. This naming service offers legible names in transactions, even storing all user addresses and receiving crypto, tokens, or NFTs. This feature of human interaction, although simple, goes a long way to lending a sense of agency to a space that is looking to attract new users.

## Related Projects
- [ZkBNB Rollup Contracts](https://github.com/bnb-chain/zkbnb-contract).
- [ZkBNB Crypto](https://github.com/bnb-chain/zkbnb-crypto).
- [ZkBNB Eth RPC](https://github.com/bnb-chain/zkbnb-eth-rpc).
- [ZkBNB Go SDK](https://github.com/bnb-chain/zkbnb-go-sdk).

## Conclusion

BNB Chain's ZkBNB is an innovation targeted to have a significant impact on building large-scale BNB Smart Chain-based applications with guaranteed security and transaction speed, faster finality, and significantly reduced transaction fees. Its launch follows the launch of BNB sidechains earlier this year, a framework for creating sidechains within the BNB Chain ecosystem.

With the release of ZkBNB Testnet in November, the Mainnet is targeted to launch in Q1 of 2023. More about BNB Smart Chain innovative projects can be looked at [BNB Chain's 2022 roadmap](https://www.bnbchain.org/en/blog/bnb-chain-tech-roadmap-2022/).