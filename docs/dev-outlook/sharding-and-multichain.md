---
sidebar_label: Sharding and Multi-chain
sidebar_position: 2
---
# Sharding and Multi-chain
The BNB community has never believed in the “one-chain-fits-all” theory. As the decentralized computing infrastructure, the blockchain will bear the same principle of diversification among generalization and specialization. Also the blockchain is a computing resource, which is scarce as other resources. No users will expect their favorite games and/or social media applications to contend computing resources from their financial ledger and business transactions, let alone they expect all these applications to charge the same price.

The team strongly believe sharding and multiple blockchain are the future for the non-stop increasing demand for decentralized computing power and storage. The cross-shard and cross-chain communication will be the key topic. Here 2 types of sub-chains are discussed below, which are both initial proposals and call for comments.

## BNB Sidechain
BNB Sidechain is an infrastructure introduced to help developers and practitioners to build and run their own blockchain as their internal value system for a massive user application, while still maintaining a close connection with BSC.

The “massive user application” here means a sustainable dApp with 1 million daily active users (DAU). dApps with such size are expected to have an obviously endogenous economic and social ecosystem, and can run on a standalone base system. The typical types of such applications that have been seen so far are GameFi and SocialFi.

From technical perspective, BNB Sidechain is defined as:

1. The sidechain runs as a PoS network, separately and independently from BSC, i.e. all BNB Sidechains will keep running even if BSC is down.
2. The sidechain is fueled by its dedicated own application token as gas.
3. The application gas token and its relevant tokens can easily go onramp to / offramp from BSC, without additional trust setup or key management.
4. No BSC tokens, including BNB and BEP20 issued on BSC, should be transferred onto BNB Sidechain under the same security model as BNB Sidechains’ own tokens. It is encouraged that all tokens should be traded on BSC for better liquidity and security setup.
5. Potential shorter blocking time than BSC.
   
A typical BNB Sidechain will be a fork of BSC, which still runs an EVM compatible, PoSA based network. It can get all the features BSC has and continuously inherit all the performance enhancements.

### BNB Sidechain Infra
In large chance, BNB Sidechain runs with a smaller validator set than BSC, as the application owners decide. These validators can be run by the application owners or any stakeholders of their community. As the main assets on the BNB Sidechain are the application-centric, the community and the developers of the application should work well as/with these validators to protect the security of the BNB Sidechain. Staking is also supported by BNB Sidechain. The staking and validator election logic will be handled by system contracts, which will rebase every N epochs.

Community infrastructure providers can help with the basic setup on:

1. RPC API and archive nodes
2. Simple blockchain explorer solution

### BSC/BNB Sidechain Cross-chain
One of the most common growth paths of BNB Sidechain is a big game studio invests its next masterpiece of high potential with the blockchain base; while the other can be a good GameFi dApp got a large amount of users from BSC and wants to expand with larger capacity, cheaper fees and tighter control on the model. The two paths both need a place to dispatch their tokens and trade their assets with the potential users base, and BSC can naturally be the one. So cross-chain asset flow is a must-have requirement.

However, as the security of the BNB Sidechain is guaranteed by PoS validators elected via the designated way that application owners specify, it may not be the same level as BSC itself. So the cross-chain asset flow should focus on the assets that application owners can/should endorse.

The new asset type for such flow should be defined by new BEPs and deployed by application owners. Let it be BEP120 in this document.

The cross-chain communication for BEP120 token transferring will be built-in based on the above and below descriptions:

1. The BEP120 tokens can be created on both BNB Sidechain and BSC, and binded via cross-chain package.;
2. Smart contracts will work on BNB Sidechain and BSC to handle the binding between BNB Sidechain to BSC and also serve as vaults to lock the local assets on BNB Sidechain in order to mint the corresponding on BSC;
3. BNB Sidechain validators should run Relayers, which may be built-in to the side chain tool set. The relayers will submit transactions with the cross-chain package and attestations onto BSC and BNB Sidechain, where smart contracts will handle the cross-chain package after verifying the attestations. Particularly, if BNB Sidechain is BSC fork, the relayers can use validator consensus key to attest the cross-chain package, while the contract on BSC can verify the attestment and also potential validator set change messages.
   
If BNB Sidechain supports EVM, the openness and programmability can enable the applications to create more evolvable capability. While the interaction of the local assets with BSC assets are encouraged to happen on BSC, BSC can help BNB Sidechain in the below aspects:

1. Platform to distribute the applications, either through IDO or airdrop to attract users
2. Reuse the existing DeFi lego to centralize token liquidity
3. Channel to connect with other cross-chain bridges and centralized exchanges

## ZkRollup - A Trustless Scaling Solution
   
ZkRollup is a trustless and scaling solution for BNB Smart Chain. ZkRollup is built on ZK Rollup architecture. ZkBAS bundle (or “roll-up”) hundreds of transactions off-chain and generates cryptographic proof. These proofs can come in the form of SNARKs (succinct non-interactive argument of knowledge) which can prove the validity of every single transaction in the Rollup Block. It means all funds are held on the BSC, while computation and storage are performed on BNB Sidechain with less cost and fast speed.

ZkRollup achieves the following goals:

* No sacrificing on decentralization or security; 
* The ZkRollup share the same security as BSC does. Thanks to zkSNARK proofs, the security is guaranteed by cryptographic. Users do not have to trust any third parties or keep monitoring the Rollup blocks in order to prevent fraud.
* Fast transaction speed, faster finality, much lower gas fee.
* BNB, and BEP20/BEP721/BEP1155 created on BSC or ZkRollup can flow freely between BSC and ZkRollup.
* The gas token on the zkBAS can be either BEP20 or BNB. 
* Users can trigger a “full exit” on BSC. The user can request this operation to withdraw funds if he thinks that his transactions are censored by ZkRollup.
* Built-in instant AMM swap.
* Built-in NFT marketplace.

## BSC Partition Chain (BPC)
A BPC introduces another sub space with a new validator set, a new computing engine, and a new ledger. Essentially it works as a “shard” or a “layer 2” to off load part of the data, computing and transactions from BSC.

As indicated in the name, while BSC serves the major financial related dApps, BPC presents an additional partition to accommodate more generic applications which expects more on-chain transactions for intensive user interactions and require less gas fees.

BPC will support almost all the functionality of BSC:

1. It will use BNB as the gas and for the staking
2. It will have similar infrastructure such as RPC full node, archive node and blockchain explorer as BSC;
3. All tokens, including BNB and BEP20, can bind and flow freely between BSC and BPC natively.
   
BPC starts with a fork of the BSC code base, assembled as a PoSA blockchain. Anyone can create themselves as a validator for one or more particular BPC on Binance Chain, which serves as the “beacon chain” here. The validators can call for delegation in order to be elected into the validator set of BPC. The election can work in the similar way as BSC and refreshes every 24 hours.

On day 1, there may be only one BPC established, as the pioneer and experiment for the technology. There can be more BPC’ as the network develops. Also as different services can be moved around different servers, new technologies should be developed to allow dApps to move around BSC and BPCs in the future days.

### BPC Security
BPC’ security will be first guaranteed by the validator set of BPC. The individual unstable or/and malicious validators will be marked and slashed eventually, which follows the same logic as the current BSC. Furthermore, as BPC usually gets staked with less BNB, its security will be guaranteed by another layer of attestation and validation. The goal is to detect the scenarios that majority of the BPC active validators are not trustful and recreate the network with other candidate validators. A proposal is discussed in the later sections.

### BSC/BPC Cross-chain
It is considered that there will be no direct cross-chain communication among multiple BPC, or multiple BNB Sidechain, or between BPC and BNB Sidechain. These communications will have to go through BSC. The major reason for this is more from a token economy point of view. It is expected that BSC will be specialized for DeFi related applications and exercise the network effect by concentrating all the liquidity.

The cross-chain package between BPC and BSC will be wrapped as special transactions, and will focus on token assets, literally BNB, BEP20 tokens and NFTs, instead of any type of state data change. The cross-chain token actions usually have two types. One is “bind”, which will peg the token on the local blockchain to the same token on the other blockchain; the other is “transfer”, which will move the token asset between the two blockchain, literally lock/burn the amount of tokens on the source blockchain and release/mint the same amount of tokens on the target blockchain.

As the tokens on BSC, which usually has high stake, flow onto BPC, which usually has less stake, an attestation and verification logic should be there to justify to both sides about the transfer.

### Beacon Chain Attestation
Binance Chain serves the validator set update for both BSC and BPC via cross-chain package. Its validator set should be credible and further enhanced to be so, which may be discussed and evolved in another track.

If the validator set updates are credible, the messages co-signed by more than ⅔ of the validators of Binance Chain should be credible too. This makes Binance Chain (BC) de facto the Beacon Chain for BSC and BPC.

In such a sense, BC validators can attest the security of BPC. All the validators should have the responsibility to monitor BPC, attest the blocks and store the canonical chain onto BC for others’ reference.

Besides, BC validators can also attest the cross-chain communication between BSC and BPC.

For BSC to BPC bind/transfer:

1. A system smart contract call will be triggered to burn/lock the asset on BSC and emit the event;
2. The BC validators should attest a cross-chain package for this transfer, and submit as a transaction onto BPC after the containing block of BSC is finalized.
3. BPC executes the transaction, and the smart contracts verify the attestation and mint/release token out.

For BPC to BSC bind/transfer:

1. A system smart contract call will be triggered to burn/lock the asset on BPC and emit the event;
2. The BC validators should attest a cross-chain package for this transfer, and submit as a transaction onto BSC after the containing block of BPC is finalized.
3. BSC executes the transaction, and the smart contracts verify the attestation and mint/release token out.

BC attesters will share the fees for cross-chain communication. These fees will become part of the income of BC validators, which should be further subject to delegation distribution and also BNB burn on BC.
