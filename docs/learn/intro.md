---
sidebar_label: Introduction 
sidebar_position: 2
hide_table_of_contents: false
---

# Introduction

BNB Smart Chain is an innovative solution to bring programmability and interoperability to BNB Beacon Chain. BNB Smart Chain relies on a system of 56 validators with Proof of Staked Authority (PoSA) consensus that can support short block time and lower fees. The most bonded validator candidates of staking will become validators and produce blocks. The double-sign detection, malicious vote detection and other slashing logic guarantee security, stability, and chain finality. 
Other than the 40 active validators, BSC will introduce more validators, e.g. another 16 inactive validators, into the validator set as backups, which will be called "Candidates".

Candidates will produce blocks and charge gas fees in BSC mainnet, but in a much less chance than the official validator set of 40 elected. The unavailable candidates will be slashed as well though in a smaller size. A decent motivation is expected to be maintained so that the candidate validators are willing to ensure the quality and help secure BSC.

In an extreme case, if a majority of the active 40 validators get attacked and offline, Candidate Validators can report to BNB Beacon Chain about the stale blocking, resume it and eventually propose a re-election of the active validator set.

The BNB Smart Chain also supports EVM-compatible smart contracts and protocols. Cross-chain transfer and other communication are possible due to native support of interoperability. The BNB Smart Chain will be:

* **A self-sovereign blockchain**: Provides security and safety with elected [validators](consensus.md).
* **EVM-compatible**: Supports all the existing Ethereum tooling along with faster finality and cheaper transaction fees.
* **Fast Finality**: Finalizes the chain within two blocks in most cases.
* **Interoperable**: Comes with efficient native dual chain communication; Optimized for scaling high-performance dApps that require a fast and smooth user experience.
* **Distributed with on-chain governance**: Proof of Staked Authority (PoSA) brings in decentralization and community participants. As the native token, BNB will serve as both the gas of smart contract execution and tokens for staking.

## Proof of Staked Authority
Although Proof-of-Work (PoW) has been recognized as a practical mechanism to implement a decentralized network, it is not friendly to the environment and also requires a large size of participants to maintain the security.

Ethereum and some other blockchain networks, such as [MATIC Bor](https://github.com/maticnetwork/bor), [TOMOChain](https://tomochain.com/), [GoChain](https://gochain.io/), [xDAI](https://xdai.io/), do use [Proof-of-Authority(PoA)](https://en.wikipedia.org/wiki/Proof_of_authority) or its variants in different scenarios, including both testnet and mainnet. PoA provides some defense to 51% attack, with improved efficiency and tolerance to certain levels of Byzantine players (malicious or hacked). It serves as an easy choice to pick as the fundamentals.

Meanwhile, the PoA protocol is most criticized for being not as decentralized as PoW, as the validators, i.e. the nodes that take turns to produce blocks, have all the authorities and are prone to corruption and security attacks. Other blockchains, such as EOS and Lisk both, introduce different types of [Delegated Proof of Stake (DPoS)](https://en.bitcoinwiki.org/wiki/DPoS) to allow the token holders to vote and elect the validator set. It increases the decentralization and favors community governance.

BSC here proposes to combine DPoS and PoA for consensus, so that:

1. Blocks are produced by a limited set of validators
2. Validators take turns to produce blocks in a PoA manner, similar to [Ethereum's Clique](https://eips.ethereum.org/EIPS/eip-225) consensus design
3. Validator set are elected in and out based on a staking based governance

Fast finalization can greatly improve user experience. The `Fast Finality` feature will be enabled upon the coming Plato upgrade. This will be a major advantage of BSC, and many dapps will benefit from it.

The consensus protocol of BSC fulfills the following goals:

1. Short Blocking time, 3 seconds on mainnet.
2. It requires quite short time to confirm the finality of transactions, around 6s for mainnet after the coming Plato upgrade.
3. There is no inflation of native token: BNB, the block reward is collected from transaction fees, and it will be paid in BNB.
4. It is 100% compatible with Ethereum system .
5. It allows modern proof-of-stake blockchain network governance.

## Security
Given there are more than ½\*N+1 validators are honest, PoA based networks usually work securely and properly. However, there are still cases where certain amount Byzantine validators may still manage to attack the network, e.g. through the [Clone Attack](https://arxiv.org/pdf/1902.10244.pdf). BSC does introduce Slashing logic to penalize Byzantine validators for double signing or inavailability. This Slashing logic will expose the malicious validators in a very short time and make the "Clone Attack" very hard or extremely non-beneficial to execute.

## Fast Finality
Finality is critical for blockchain security, once the block is finalized, it wouldn’t be reverted anymore. The fast finality feature is very useful, the users can make sure they get the accurate information from the latest finalized block, then they can decide what to do next instantly. More details of design, please to refer [BEP-126](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP126.md)

Before the coming Plato upgrade,to secure as much as BC, BSC users are encouraged to wait until receiving blocks sealed by more than ⅔*N+1 different validators. In that way, the BSC can be trusted at a similar security level to BC and can tolerate less than ⅓\*N Byzantine validators.With 21 validators, if the block time is 3 seconds, the ⅔\*N+1 different validator seals will need a time period of (⅔\*21+1)\*3 = 45 seconds. Any critical applications for BSC may have to wait for ⅔\*N+1 to ensure a relatively secure finality. With above enhancement by slashing mechanism, ½\*N+1 or even fewer blocks are enough as confirmation for most transactions.

After the coming Plato upgrade, the feature `Fast Finality` will be enabled. The chain will be finalized within two blocks if ⅔*N or more validators vote normally, otherwise the chain has a fixed number of blocks to reach probabilistic finality as before.

## Reward
All the BSC validators in the current validator set will be rewarded with transaction fees in BNB. As BNB is not an inflationary token, there will be no mining rewards as what Bitcoin and Ethereum network generate, and the gas fee is the major reward for validators. After the coming Plato upgrade, part of the fees collected will be used as reward for finality voting. As BNB is also utility tokens with other use cases, delegators and validators will still enjoy other benefits of holding BNB.

The reward for validators is the fees collected from transactions in each block. Validators can decide how much to give back to the delegators who stake their BNB to them, in order to attract more staking. Every validator will take turns to produce the blocks in the same probability (if they stick to 100% liveness), thus, in the long run, all the stable validators may get a similar size of the reward. Meanwhile, the stakes on each validator may be different, so this brings a counter-intuitive situation that more users trust and delegate to one validator, they potentially get less reward. So rational delegators will tend to delegate to the one with fewer stakes as long as the validator is still trustful (insecure validator may bring slashable risk). In the end, the stakes on all the validators will have less variation. This will actually prevent the stake concentration and "winner wins forever" problem seen on some other networks.

## Token Economy
BC and BSC share the same token universe for BNB and BEP2 tokens. This defines:

1. The same token can circulate on both networks, and flow between them bi-directionally via a cross-chain communication mechanism.
2. The total circulation of the same token should be managed across the two networks, i.e. the total effective supply of a token should be the sum of the token’s total effective supply on both BSC and BC.
3. The tokens can be initially created on BSC in a similar format as ERC20 token standard, or on BC as a BEP2, then created on the other. There are native ways on both networks to link the two and secure the total supply of the token.

## Cross-Chain Transfer and Communication
Cross-chain communication is the key foundation to allow the community to take advantage of the dual chain structure:

1. users are free to create any tokenization, financial products, and digital assets on BSC or BC as they wish
2. the items on BSC can be manually and programmingly traded and circulated in a stable, high throughput, lighting fast and friendly environment of BC
3. users can operate these in one UI and tooling ecosystem.

## Staking and Governance
Proof of Staked Authority brings in decentralization and community involvement. Its core logic can be summarized as the below. You may see similar ideas from other networks, especially Cosmos and EOS.

1. Token holders, including the validators, can put their tokens "bonded" into the stake. Token holders can delegate their tokens onto any validator or validator candidate, to expect it can become an actual validator, and later they can choose a different validator or candidate to re-delegate their tokens1.
2. All validator candidates will be ranked by the number of bonded tokens on them, and the top ones will become the real validators.
3. Validators can share (part of) their blocking reward with their delegators.
4. Validators can suffer from "Slashing", a punishment for their bad behaviors, such as double sign and/or instability.
5. There is an "unbonding period" for validators and delegators so that the system makes sure the tokens remain bonded when bad behaviors are caught, the responsible will get slashed during this period.

