# What is zkBNB?
The zkBNB is an infrastructure for developers that helps them to build large scale BSC-based apps with higher throughput and much lower or even zero transaction fees.

zkBNB is built on zk-Rollup architecture. zkBNB bundle (or "roll-up") hundreds of transactions off-chain and generates cryptographic proof. These proofs can come in the form of SNARKs (succinct non-interactive argument of knowledge) which can prove the validity of every single transaction in the Rollup Block.

## Problems zkBNB solves
Today BSC is experiencing network scalability problems and the core developer has proposed to use sidechains in their [Outlook 2022](https://forum.bnbchain.org/t/bsc-development-outlook-2022/44) paper to solve this problem because these sidechains can be designed for much higher throughput and lower gas fees.

The [BEP100](https://github.com/bnb-chain/BEPs/pull/132/files) propose a modular framework for creating BSC-compatible side chains and connect them by native relayer hub. The security of native relayer hub is guaranteed by the side chain.

According to [the analysis](https://blog.chainalysis.com/reports/cross-chain-bridge-hacks-2022/) of chainalysis, bridges are now a top target for the hackers and attacks on bridges account for 69% of total funds stolen in 2022. zkBNB can perfectly solve the problem! Thanks to zkSNARK proofs, zkBNB share the same security as BSC does.

## What are the key features of zkBNB?

BNB achieves the following goals:

- **L1 security:** The zkBNB share the same security as BSC does. Thanks to zkSNARK proofs, the security is guaranteed by cryptographic. Users do not have to trust any third parties or keep monitoring the Rollup blocks in order to prevent fraud.

- **L1<\>L2 Communication:** BNB, BEP20, BEP721 tokens can flow freely between BSC and zkBNB through our built-in bridging platform.

_(BEP721 token must be created in zkBNB in order to transfer from L1 to L2)_

- **Built-in NFT marketplace:** Users can launch their NFT collections to their communities safely and securely on zkBNB’s built-in marketplace and store them in IPFS or GreenField. zkBNB provides a set of powerful REST APIs. New developers operating in the space will no longer need to interact directly with smart contracts or worry about security. Rich Functions, such as supporting GreenField and supporting modifiable NFT.

- **Fast transaction speed and faster finality:** zkBNB puts up astonishing figures with an ability to support up to 4 billion addresses, 5k transactions per second (TPS), and minute level finality in the best case.

- **Low gas fee:** The gas token on the zkBNB can be either BEP20 or BNB.

- **"Full exit" on BSC:** At any time, a user can request an exit operation to withdraw funds. This means users can withdraw funds at any time within a few minutes. Even zkBNB stops running, user can still safely withdraw all assets. Each collection of NFTs will be withdrawn into a segregated smart contract.

_**Note:** Full Exit and Exodus Exit are two different types of functionalities on zkBNB. Full exit is just about user can click a button and withdraw all his assets in one go. Exodus exit is about in emergency situation, say the whole zkBNB is down, user can still withdraw all this assets._