---
sidebar_label: Storage Providers FAQs
hide_table_of_contents: false
---
# BNB Greenfield - Storage Providers FAQs

### What is Greenfield? 
Greenfield is a protocol that provides core primitives, enabling a programmable, trustless decentralised storage network, parallel and interchangeable to traditional cloud storage services.

### What is the connection between Validators and Storage Providers?
Greenfield Validators and Storage Providers (SP) form a pair synergy to provide the whole storage service, but are separated from each other. The Greenfield validators are responsible for generating Greenfield blocks, maintaining the Greenfield blockchain security, challenging the data availability, and maintaining cross-chain communication; while the Storage Providers are responsible for storing the data objects and responding to downloading requests. There is no strong binding relationship between them, although the same organization can play two roles at the same time. 

### What are the differences between Primary and Secondary Storage Providers?
Among the multiple SPs that one object is stored on, one SP will be the “Primary SP”, while the others are “Secondary SP”. Primary SP serves as a gateway for the users to access and manage their data - that is it should be used as the only SP to download the data. Users can change the primary SP for their objects later if they are not satisfied with their service. 

Secondary SPs are used for replication. One provider can serve multiple roles, both as Primary and as Secondary provider on different objects. Primary SP or the users will select a few secondary SPs to store these segment replicas using Erasure Coding. 

A single provider can serve multiple roles on different data objects. Once the primary provider exhausted their networking resources, they can use the remaining storage capacity to serve as secondary storage provider for other data objects - thus, increasing the hardware utilization and therefore overall return on the operation.
What are hardware requirements of running a storage provider? 
As Primary and Secondary SPs serve a different role in the Greenfield ecosystem, the requirement towards the used hardware is different.

Primary SP is mostly network bound, as it serves the main gateway for the user to download and upload data. As such, we recommend running network optimised servers. Directly facing internet (public IP, no NAT) 8 cores CPU 16GB of RAM 500 SSD storage.

On the contrary, Secondary SPs serve for the replication purposes and are mostly CPU bound. We recommend running CPU optimised servers. Directly facing internet (public IP, no NAT) 8 cores CPU 16GB of RAM 500 SSD storage.

Should the storage provider serve both as Primary and Secondary SP for different data objects, we recommend running CPU and network optimised servers.

### How do Storage Providers earn money with BNB Greenfield? 
- **Staking Reward:** Storage Providers will receive transaction fees as the staking reward. The rewards will be distributed passively. This is different from BNB Beacon Chain, where the system will distribute the rewards automatically. SPs can submit withdrawal requests to get all the up-to-date transaction rewards, and when SPs change commission rates or quit, all the transaction rewards that are not withdrawn will also be distributed.
- **Data Storage Fees:** Storage Providers will receive fees as per amount of actual data stored by them. The storage fees are distributed among Primary and Secondary storage providers, participating in the object replication. As Primary SP serves as a gateway for the download, it will receive much higher usage of the I/O operations. As such, the storage rewards are calculated with Primary SP receiving the majority of the storage fees.
- **Data Traffic Fees:** Storage Providers will receive fees as per amount of actual data served by them. The traffic fees are awarded only to the Primary storage provider, as it solely serves as the gateway for the users to access their data.
- **Force Settlement Rewards:** If the user's payment account is depleted and no more funds are supplied, once balance is under the forced settlement threshold, the account will be forcibly settled. All payment streams of the account will be closed and the account will be marked as out of balance. The download speed for all objects associated with the account or payment account will be downgraded. The objects will be deleted by the SPs if no fund is provided within the predefined threshold. 

The forced settlement will charge some fees, which is another incentive for users to replenish funds proactively. The fees will be distributed among the Primary and Secondary storage providers, in the ratio similar to the data storage fees.

### What happens if the user refuses or is unable to pay?
To store data in Greenfield, users must reserve the minimum BNB amount equal to fund storage for a configurable amount of time. There are two configurations in the system, ReserveTime and LiquidateTime - both can be updated by the community vote. Let's say 7 days and 1 day, and the user wants to store the data costing 1$ per day. In such a scenario, the user must reserve fees for 7 days in buffer balance - 7$.

If the user's payment account is depleted and no more funds are supplied, the objects will be deleted by the SPs if no fund is provided within the predefined threshold LiquidateTime - 1 day.

### Explain the Tokenomics of BNB Greenfield
BNB Greenfield uses BNB token as the utility token. There is a native cross-chain bridge between the Greenfield blockchain and BNB Smart Chain (BSC). The initial BNB will be locked on BSC and re-minted on Greenfield. BNB and data operation primitives can flow between Greenfield and BSC. Thus, total circulation of BNB will stay unchanged as it is now but flow among BNB Beacon Chain, BSC, and Greenfield.

One of the unique benefits of the BNB token is that it has limited supply, which means no one can create more BNB tokens, just to prop their balance sheet. Moreover, BNB token is also deflationary and is being periodically burned, or moved out of circulation, during the block creation of the BNB Smart Chain. Lastly, BNB token is used for all the projects within the BNB Chain ecosystem, including all the rollup and scaling solutions.

All these make BNB token extremely versatile, having no correlation with any specific domain, and ideal for financial project planning and COGS predictability.

### Don't see your question? 
We're working on expanding this FAQ with more content, including questions from the community and partners, so please watch this space! However, if you don't see your question, please ask in the [BNB forum](https://forum.bnbchain.org/), so you can get the answers you need and make us aware of new FAQ items.

