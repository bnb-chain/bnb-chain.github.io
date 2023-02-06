---
sidebar_label: Validators FAQs
hide_table_of_contents: false
---
# BNB Greenfield - Validators FAQs

### What is Greenfield? 
Greenfield is a protocol that provides core primitives, enabling a programmable, trustless decentralised storage network, parallel and interchangeable to traditional cloud storage services.

### What is the connection between validators and Storage Providers?
Greenfield validators and Storage Providers (SP) form a pair synergy to provide the whole storage service, but are separated from each other. The Greenfield validators are responsible for generating Greenfield blocks, maintaining the Greenfield blockchain security, challenging the data availability, and maintaining cross-chain communication; while the Storage Providers are responsible for storing the data objects and responding to downloading requests. There is no strong binding relationship between them, although the same organization can play two roles at the same time.

Although validators can potentially maintain a meaningful and healthy number of storage providers, there is enough incentive for the validators to manage a reasonable number of non-affiliated SPs.

### What consensus mechanism does BNB Greenfield have?
As Proof-of-Stake is adopted in Greenfield, there will be a founding validator set in the genesis state. Validators can self-bond, meaning they can delegate BNB to themselves, and they can also receive delegations from any other BNB holders. These bonded BNB acts as collateral and cause each delegate, including validators, to have “skin in the game” so to speak. If any equivocation or byzantine behavior by a validator were to be committed, the validator would be slashed a predefined amount of bonded stake. The minimum self-delegated amount is 2,000 BNB. These validators deposit their BNBs on a BSC smart contract, which would be locked as their stakes. The new validator can be voted by the majority of the current validators to join in and gets elected as the active validator based on its delegation size.

### What are hardware requirements of running a validator node? 
Processing transactions is mostly CPU bound. However BNB Greenfield validators also have the responsibility to perform data availability challenges across the SPs.
Therefore we recommend running CPU optimized servers. Directly facing internet (public IP, no NAT) 8 cores CPU 16GB of RAM 500 SSD storage"

### How do validators earn money with BNB Greenfield? 

- **Staking Reward:** Validators will receive transaction fees as the staking reward. The rewards will be distributed passively. This is different from BNB Beacon Chain, where the system will distribute the rewards automatically. Validators can submit withdrawal requests to get all the up-to-date transaction rewards, and when validators change commission rates or quit, all the transaction rewards that are not withdrawn will also be distributed.
- **Relayer Reward:** Greenfield validators also have the obligation to run the relayer system for cross-chain communication with BSC. The package deliverer will get a fixed ratio of the relay fee as a reward. There are multiple Greenfield relayers and they may compete to submit the aggregated multi-signed packages onto the Greenfield blockchain and BSC. To avoid racing transactions caused by the competition, which wastes gas, the relayers are rotated to relay transactions, e.g. taking shifts every 10 minutes.
- **Block Building Reward:** Every transaction in BNB Greenfield requires gas fees to be paid by the user and distributed among the Greenfield validators to write the metadata on-chain.
- **Data Challenge Reward:** The Greenfield validators have the responsibility to verify the data availability from the SPs. They form a voting committee to execute this task by the incentive of fees and potential fines (slashes) on SPs.

### Explain the Tokenomics of BNB Greenfield
BNB Greenfield uses BNB token as the utility token. There is a native cross-chain bridge between the Greenfield blockchain and BNB Smart Chain (BSC). The initial BNB will be locked on BSC and re-minted on Greenfield. BNB and data operation primitives can flow between Greenfield and BSC. Thus, total circulation of BNB will stay unchanged as it is now but flow among BNB Beacon Chain, BSC, and Greenfield.

One of the unique benefits of the BNB token is that it has limited supply, which means no one can create more BNB tokens, just to prop their balance sheet. Moreover, BNB token is also deflationary and is being periodically burned, or moved out of circulation, during the block creation of the BNB Smart Chain. Lastly, BNB token is used for all the projects within the BNB Chain ecosystem, including all the rollup and scaling solutions.

All these make BNB token extremely versatile, having no correlation with any specific domain, and ideal for financial project planning and COGS predictability.

### Don't see your question? 
We're working on expanding this FAQ with more content, including questions from the community and partners, so please watch this space! However, if you don't see your question, please ask in the [BNB forum](https://forum.bnbchain.org/), so you can get the answers you need and make us aware of new FAQ items.

