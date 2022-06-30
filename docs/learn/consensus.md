---
sidebar_label: Consensus Engine
sidebar_position: 2
hide_table_of_contents: false
---

# Consensus Engine of BNB Smart Chain

## Abstract
We target to design the consensus engine of BSC(BNB Smart Chain) to achieve the following goals:

1. Wait for a few blocks to confirm (should be less than Ethereum 1.0), better no fork in most cases.
2. Blocking time should be shorter than Ethereum 1.0, i.e. 5 seconds or less.
3. No inflation, the block reward is transaction gas fees.
4. As much as compatible as Ethereum.
5. With staking and governance as powerful as cosmos.


[Geth](https://github.com/ethereum/go-ethereum/wiki/geth) implements two kinds of consensus engines: ethash(based on PoW) and [clique](https://ethereum-magicians.org/t/eip-225-clique-proof-of-authority-consensus-protocol/1853)(based on PoA). Ethash is not a fit option for BSC because BSC gives up PoW. Clique has a shorter blocking time and is invulnerable to 51% attack while doing as little to the core data structure as possible to preserve existing Ethereum client compatibility. The shortcoming of PoA is centralization, and the lack of meaningful staking and governance capability on-chain.  On the other hand, the Beacon Chain is built on Cosmos which does have a deployed staking and governance mechanism. Thus here we try to propose a consensus engine that:

* Beacon Chain does the staking and governance parts for BSC.
* ValidatorSet change, double sign slash of BSC is updated through interchain communication.
* Consensus engine of BSC keeps as simple as clique.

We investigated some popular implementations of PoA consensus and found out that [Bor](https://blog.polygon.technology/heimdall-and-bor/) follows a similar design as above. We will borrow a few parts from Bor and propose a new consensus engine to achieve all these goals.

## Infrastructure Components

1. **Beacon Chain**. It is responsible for holding the staking function to determine validators of BSC through an independent election, and the election workflow are performed via staking procedure.
2. **BSC validators**. Validators are responsible for validating transactions and generating blocks, ensuring the network’s security and the consistency of the ledger. In return, they receive rewards from the gas consumption of transactions.
3. **Staking dApps on BSC(also named as system contract)**. There are several genesis contracts to help implement staking on BSC. Six classification groups of them:
    - **Light client contract**. It is a watcher of distributed consensus process implemented by contract that only validates the consensus algorithm of Beacon Chain.
    - **Cross Chain Contract**. It is the cross chain communication layer. It will verify the sequence and merkle proof of a cross chain package.
    - **BSCValidatorSet contract**. It is a watcher of validators change of BSC on Beacon Chain. It will apply the validator set change for BSC. It also stores rewarded gas fee of blocking for validators, and distribute revenue to validators when receiving cross chain package of validatorSet change.
    - **System Reward contract**. The incentive mechanism for relayers to maintain system contracts. They will get rewards from system reward contract.
    - **Liveness Slash Contract**. The liveness of BSC relies on validator set can produce blocks timely when it is their turn. Validators can miss their turns due to any reason. This instability of the operation will hurt the performance of the network and introduce more non-deterministic into the system. This contract responsible for recording the missed blocking metrics of each validator. Once the metrics are above the predefined threshold, the blocking reward for validator will not be relayed to BC for distribution but shared with other better validators.
    - **Other contracts**. The BSC may take advantage of powerful governance of Beacon Chain, for example, propose to change a parameter of system contracts.

Staking and Governance on Beacon Chain is at a higher layer upon consensus. As for Relayer, it is a standalone process and is open about how to implement it. The detail of them will not be included in this doc.

This doc only focus on the **BSC validators** and **Staking dApps** on BSC parts which are more closely to consensus engine.

## System Reward Distribution
The system reward structure in BSC is highly configurable. We may adjust the parameters through governance.

The rewards comes from transaction fees, rewards are distributed based on several(configurable) rules:
1. Validator that generate the block will receives 15/16 of the gas fee.
2. System reward contract receive 1/16 of the gas fee.

If the balance of System reward contract is above 100BNB, will not distribute any BNB to it.
The coming section will explain how these contracts distributing reward.

## Staking dApps on BSC

### [BSCValidatorSet contract](https://bscscan.com/address/0x0000000000000000000000000000000000001000)
It is a watcher of validators change of BSC on Beacon Chain. It implement the following interfaces:

- **handleSynPackage(uint8, bytes calldata msgBytes)**

**Conditions**:
        1. Message sender must CrossChainContract.

**Action**:
        1. if the first byte of msgBytes is 0x00, do Actions validators update;
        2. if the first byte of msgBytes is 0x01, do Actions jail.

**Actions jail**:
        1. mark the validator as jailed.

**Actions validators update**:

        1. Do distribue the revenue of validators:
        if the revenue is large than 0.1 BNB, will do cross chain transfer to its account on BC, otherwise will transfer to its address on BSC.
        2. Update the latest validatorSet.
        3. Clean the metrics record on slash contract.

**CurrentValidator() returns ([]address)**

    returns the the consensus address of not jailed validators.

**deposit(address valAddr) external**

**Conditions**:

        1. The message sender must be the coinbase
        2. Can only call once in one block.

**Actions**:

        1. Increase the revenue of the validator.

### [System Reward contract](https://bscscan.com/address/0x0000000000000000000000000000000000001002)
For now, only **Cross Chain contract** is permitted to call system reward contract. It implement the following interfaces:

- **claimRewards(address payable to, uint256 amount) external**

    **Conditions**:

        1. The message sender must in permission list.
        2. The amount should be no more than 1 BNB

    **Actions**:

        1. Transfer amount of BNB to specified address

### [Liveness Slash contract](https://bscscan.com/address/0x0000000000000000000000000000000000001001)
If a validator failed to produce a block, will record it and finally slash it. It implement the following interfaces:

- **Slash(validator address) external**

    **Conditions**:

        1. The message sender must in coinbase.
        2. can only call once in one block.

    **Actions**:

        1. increase the missing blocks metrics of the validator by one.
        2. if the missing blocks metrics is times of 50, will call misdemeanor func of BSCValidatorSet contract to trigger a misdemeanor event and distribute the revenue of the validator to others.
        3. if the missing blocks metrics is times of 150, will call felony func of BSCValidatorSet contract to trigger a felony event, not only distribute the revenue of the validator to others, but also kick the validator out of validatorset.


## Consensus Protocol

The implement of the consensus engine is named as **Parlia** which is similar to [clique](https://ethereum-magicians.org/t/eip-225-clique-proof-of-authority-consensus-protocol/1853). This doc will focus more on the difference and ignore the common details.

Before introducing, we would like to clarify some terms:

1. Epoch block. Consensus engine will update validatorSet from BSCValidatorSet contract periodly.  For now the period is 200 blocks, a block is called epoch block if the height of it is times of 200.
2. Snapshot.  Snapshot is an assistant object that help to store the validators and recent signers of blocks.


### Key features

#### Light Client Security
Validators set changes take place at the (epoch+N/2) blocks. (N is the size of validatorset before epoch block). Considering the security of light client, we delay N/2 block to let validatorSet change take place.

Every epoch block, validator will query the validatorset from contract and fill it in the extra_data field of block header. Full node will verify it against the validatorset in contract. A light client will use it as the validatorSet for next epoch blocks, however, it can not verify it against contract, it have to believe the signer of the epoch block. If the signer of the epoch block write a wrong extra_data, the light client may just go to a wrong chain. If we delay N/2 block to let validatorSet change take place, the wrong
epoch block won’t get another N/2 subsequent blocks that signed by other validators, so that the light client are free of such attack.

#### System Transaction
The consensus engine may invoke system contracts, such transactions are called system transactions. System transactions is signed by the the validator who is producing the block. For the witness node, will generate the system transactions(without signature) according to its intrinsic logic and compare them with the system transactions in the block before applying them.

#### Enforce Backoff
In Clique consensus protocol, out-of-turn validators have to wait a randomized amount of time before sealing the block. It is implemented in the client-side node software and works with the assumption that validators would run the canonical version.
However, given that validators would be economically incentivized to seal blocks as soon as possible, it would be possible that the validators would run a modified version of the node software to ignore such a delay. To prevent validator rushing to seal a block, every out-turn validator will get a specified time slot to seal the block. Any block with a earlier blocking time produced by a out-turn validator will be discarded by other witness node.

### How to Produce a New Block

#### Step 1: Prepare
A validator node prepares the block header of next block.

* Load snapshot from cache or database,
* If (height % epoch)==0, should fetch ValidatorSet from `BSCValidatorSet` [contract](https://bscscan.com/address/0x0000000000000000000000000000000000001000).
*  Every epoch block, will store validators set message in `extraData` field of block header to facilitate the implement of light client.
* The coinbase is the address of the validator

#### Step2: Finalize And Assemble

* If the validator is not the in turn validator, will call liveness slash contract to slash the expected validator and generate a slashing transaction.
* If there is gas-fee in the block, will distribute **1/16** to system reward contract, the rest go to validator contract.

#### Step3: Seal
The final step before a validator broadcast the new block.

* Sign all things in block header and append the signature to extraData.
* If it is out of turn for validators to sign blocks, an honest validator it will wait for a random reasonable time.

### How to Validate/Replay a block

#### Step1: Verify Header
Verify the block header when receiving a new block.

* Verify the signature of the coinbase is in `extraData` of the `blockheader`
* Compare the block time of the `blockHeader` and the expected block time that the signer suppose to use, will deny a `blockerHeader` that is smaller than expected. It helps to prevent a selfish validator from rushing to seal a block.
* The `coinbase` should be the signer and the difficulty should be expected value.

#### Step2: Finalize

* If it is an epoch block, a validator node will fetch validatorSet from BSCValidatorSet and compare it with extra_data.
* If the block is not generate by inturn validatorvalidaror, will call slash contract.
if there is gas-fee in the block, will distribute 1/16 to system reward contract, the rest go to validator contract.
* The transaction generated by the consensus engine must be the same as the tx in block.

### Signature
The signature of the coinbase is in extraData of the blockheader, the structure of extraData is:
epoch block. 32 bytes of extraVanity + N*{20 bytes of validator address} + 65 bytes of signature.
none epoch block. 32 bytes of extraVanity + 65 bytes of signature.
The signed content is the `Keccak256` of RLP encoded of the block header.


### Security and Finality
Given there are more than 1/2\*N+1 validators are honest, PoA based networks usually work securely and properly. However, there are still cases where certain amount Byzantine validators may still manage to attack the network, e.g. through the “Clone Attack”. To secure as much as BC, BSC users are encouraged to wait until receiving blocks sealed by more than 2/3\*N+1 different validators. In that way, the BSC can be trusted at a similar security level to BC and can tolerate less than 1/3\*N Byzantine validators.

With 21 validators, if the block time is 5 seconds, the 2/3\*N+1 different validator seals will need a time period of (2/3\*21+1)\*5 = 75 seconds. Any critical applications for BSC may have to wait for 2/3\*N+1 to ensure a relatively secure finality. However, besides such an arrangement, BSC does introduce Slashing logic to penalize Byzantine validators for double signing or instability. This Slashing logic will expose the malicious validators in a very short time and make the [Clone Attack](https://arxiv.org/pdf/1902.10244.pdf) very hard or extremely non-economic to execute. With this enhancement, 1/2\*N+1 or even fewer blocks are enough as confirmation for most transactions.

### Potential Issue

#### Extending the ruling of the current validator set via temporary censorship
If the transaction that updates the validator is sent to the BSC right on the epoch period, then it is possible for the in-turn validator to censor the transaction and not change the set of validators for that epoch. While a transaction cannot be forever censored without the help of other n/2 validators, by this it can extend the time of the current validator set and gain some rewards. In general, the probability of this scheme can increase by colluding with other validators. It is relatively benign issue that a block may be approximately 5 secs and one epoch being 240 blocks, i.e. 20 mins so the validators could only be extended for another 20 mins.
