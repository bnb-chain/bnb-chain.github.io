---
sidebar_label: Parlia Consensus Engine
sidebar_position: 2
hide_table_of_contents: false
---

# Parlia Consensus Engine

Although Proof-of-Work (PoW) has been recognized as a practical mechanism to implement a decentralized network, it is not friendly to the environment and also requires a large size of participants to maintain the security.

Ethereum and some other blockchain networks, such as [MATIC Bor](https://github.com/maticnetwork/bor), [TOMOChain](https://tomochain.com/), [GoChain](https://gochain.io/), [xDAI](https://xdai.io/), do use [Proof-of-Authority(PoA)](https://en.wikipedia.org/wiki/Proof_of_authority) or its variants in different scenarios, including both testnet and mainnet. PoA provides some defense to 51% attack, with improved efficiency and tolerance to certain levels of Byzantine players (malicious or hacked). It serves as an easy choice to pick as the fundamentals.

Meanwhile, the PoA protocol is most criticized for being not as decentralized as PoW, as the validators, i.e. the nodes that take turns to produce blocks, have all the authorities and are prone to corruption and security attacks. Other blockchains, such as EOS and Lisk both, introduce different types of [Delegated Proof of Stake (DPoS)](https://en.bitcoinwiki.org/wiki/DPoS) to allow the token holders to vote and elect the validator set. It increases the decentralization and favors community governance.

BSC here proposes to combine DPoS and PoA for consensus, so that:

1. Blocks are produced by a limited set of validators
2. Validators take turns to produce blocks in a PoA manner, similar to [Ethereum's Clique](https://eips.ethereum.org/EIPS/eip-225) consensus design
3. Validator set are elected in and out based on a staking based governance

The consensus protocol of BSC fulfills the following goals:
1. Short Blocking time, 3 seconds on mainnet.
2. It requires quite short time to confirm the finality of transactions, around 6s for mainnet.
3. There is no inflation of native token: BNB, the block reward is collected from transaction fees, and it will be paid in BNB.
4. It is 100% compatible with Ethereum system.
5. It allows modern proof-of-stake blockchain network governance.

The implement of the consensus engine is named as Parlia.

In addtion, Feyman hardfork has been enabled on BSC mainnet. The BNB Beacon related logic will be totally dropped in a few months, so it will be ignored in the following doc.

## Validator Quorum
In the genesis stage, a few trusted nodes will run as the initial Validator Set. After the blocking starts, anyone can compete to join as candidates to elect as a validator. The staking status decides the top 45 most staked nodes to be the next validator set, and such an election will repeat every 24 hours.

BNB is the token used to stake for BSC.

Upon a new validator set elected, validators will update the validator set after an **epoch period**, i.e. a predefined number of blocking time. For example, if BSC produces a block every 3 seconds, and the epoch period is 200 blocks, then the current validator set will check and update the validator set for the next epoch in 600 seconds (10 minutes). 21 validators will be selected from the validator set to produce blocks every epoch.

## Differences with clique

**Parlia** is similar to [clique](https://ethereum-magicians.org/t/eip-225-clique-proof-of-authority-consensus-protocol/1853). This doc will focus more on the difference and ignore the common details.

### Light Client Security
Validators set changes take place at the (epoch+N/2) blocks. (N is the size of validatorset before epoch block). Considering the security of light client, we delay N/2 block to let validatorSet change take place.

Every epoch block, validator will query the validatorset from contract and fill it in the extra_data field of block header. Full node will verify it against the validatorset in contract. A light client will use it as the validatorSet for next epoch blocks, however, it can not verify it against contract, it have to believe the signer of the epoch block. If the signer of the epoch block write a wrong extra_data, the light client may just go to a wrong chain. If we delay N/2 block to let validatorSet change take place, the wrong
epoch block won’t get another N/2 subsequent blocks that signed by other validators, so that the light client are free of such attack.

### System Transaction
The consensus engine may invoke system contracts, such transactions are called system transactions. System transactions is signed by the the validator who is producing the block. For the witness node, will generate the system transactions(without signature) according to its intrinsic logic and compare them with the system transactions in the block before applying them.

### Enforce Backoff
In Clique consensus protocol, out-of-turn validators have to wait a randomized amount of time before sealing the block. It is implemented in the client-side node software and works with the assumption that validators would run the canonical version.
However, given that validators would be economically incentivized to seal blocks as soon as possible, it would be possible that the validators would run a modified version of the node software to ignore such a delay. To prevent validator rushing to seal a block, every out-turn validator will get a specified time slot to seal the block. Any block with a earlier blocking time produced by an out-turn validator will be discarded by other witness node.

## Liveness and Security
Given there are more than ½\*N+1 validators are honest, PoA based networks usually work securely and properly. However, there are still cases where certain amount Byzantine validators may still manage to attack the network, e.g. through the [Clone Attack](https://arxiv.org/pdf/1902.10244.pdf). BSC does introduce Slashing logic to penalize Byzantine validators for double signing or inavailability. This Slashing logic will expose the malicious validators in a very short time and make the "Clone Attack" very hard or extremely non-beneficial to execute.

## Fast Finality
The `Fast Finality` is a major advantage of Parlia.

Finality is critical for blockchain security, once the block is finalized, it wouldn’t be reverted anymore. The fast finality feature is very useful, the users can make sure they get the accurate information from the latest finalized block, then they can decide what to do next instantly. More details of design, please to refer [BEP-126](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP126.md)

Without Fast Finality, BSC users are encouraged to wait until receiving blocks sealed by more than ⅔*N+1 different validators. With 21 validators, if the block time is 3 seconds, the ⅔\*N+1 different validator seals will need a time period of (⅔\*21+1)\*3 = 45 seconds.

After Fast Finality applied, the chain will be finalized within two blocks if ⅔*N or more validators vote normally.