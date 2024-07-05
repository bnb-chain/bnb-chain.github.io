---
title: Storage Provider Lifecycle - BNB Greenfield SP
order: 8
---

# Storage Provider Lifecycle

This document describes the entire lifecycle of a storage provider from joining the Greenfield Storage Network to exiting.

## Preparation

First, the storage provider needs to learn how to run and create a storage provider node, which requires several different user accounts and a unified external EndPoint.

- Follow Recommended Prerequisites to get ready
- Create the required accounts, E.g operator/fundig/seal/approval/gv/bls
- Run all services of Storage Provider

!!! note
    For more information, please see [Run Storage Provider](./run-book/run-SP-node.md)

## Proposal

The Storage Provider (SP) must initiate an on-chain proposal that outlines the Msg information to be automatically executed after receiving approval through the voting process. Specifically, the Msg in this case is `MsgCreateStorageProvider`. It's essential to ensure that the deposit tokens exceed the minimum deposit tokens specified on the chain.

Below are the required fields that need to be modified in the proposal:

- Addresses:
  - sp_address: The address of the storage provider that will be added to the network.
  - seal_address: The address used for sealing object
  - approval_address: The address responsible for approving bucket/object creation.
  - gc_address: The address for garbage collection.
  - maintenance_address: The address is used for testing while in maintenance mode.
- EndPoint: Details of the endpoint where the SP will serve data requests.
- Quota & Price:
  - read_price: The cost in Gwei per byte per second for read operations.
  - stora_price: The cost in Gwei per byte per second for data storage
  - free_read_quota: The default free read quota allocated to users (e.g., 10GB).
- Deposit for SP Staking:
  - The SP must stake at least 1000 BNB (Binance Coin) in the testnet as a commitment to providing storage services.
- Deposit for Proposal:
  - The proposal itself must have a deposit of at least 1 BNB in the testnet.

!!! note
    For more information, please see [Add Storage Provider to Greenfield Network](./run-book/join-SP-network.md)

Initiating this on-chain proposal with the necessary modifications and deposits is a crucial step for the SP to become an active participant in the Greenfield network, offering reliable and secure storage services to users. By complying with the proposal requirements, the SP can enhance its reputation and attract more users, contributing to the growth and success of the decentralized storage ecosystem.

## In Service

During the in-service status, Storage Providers (SPs) actively engage in the network's daily operations. They handle a variety of user requests, including data storage, retrieval, and other storage-related operations.

SPs assume a critical role in maintaining the availability, integrity, and confidentiality of the data they store. As gatekeepers of user access, they enforce proper authentication and authorization procedures to safeguard data from unauthorized access or tampering.

At this stage, SPs must create virtual groups within the Greenfield network to efficiently serve buckets and objects. These virtual groups, resembling disk sectors, allow SPs to manage data storage in a more organized and optimized manner. By associating objects with virtual groups, SPs can limit the range of secondary storage providers responsible for storing object replica data, which enhances data redundancy and resilience.

!!! note
    For more information, please see [Virtual Group](https://github.com/bnb-chain/greenfield/blob/doc-refactor/docs/modules/virtual-group.md#abstract)

Additionally, SPs are required to provide corresponding stakes for the amount of data they store. This staking mechanism further incentivizes SPs to offer reliable and high-quality services to users. By staking tokens or digital assets, SPs demonstrate their commitment to maintaining a robust and trustworthy network, aligning their interests with the overall security and success of the storage ecosystem.

Moreover, the creation of virtual groups and staking helps to disentangle the interdependency between buckets/objects and SPs. By doing so, SPs mitigate the need for an extensive volume of transactions when modifying on-chain BucketInfo and ObjectInfo during SP exits and bucket migrations. This leads to more efficient network management and smoother transitions during changes in the network's composition.

As SPs continue to serve user needs and actively participate in network operations, their reputation and service quality become paramount. A positive reputation score is crucial for attracting more users to store their data with a particular SP. Through continuous improvement and adaptation, SPs can enhance their services, increase storage capacity, and maintain a competitive edge in the dynamic decentralized storage market.

## In Maintenance

The maintenance mode for service providers (SPs) is a status in which SPs do not serve any create/upload requests from users. There are two circumstances in which an SP can be in maintenance mode:

1. When an SP joins the network after a proposal has passed, it will stay in `STATUS_IN_MAINTENANCE` until it sends a transaction
   including msg `MsgUpdateStorageProviderStatus` to Greenfield to change its status to `STATUS_IN_SERVICE`.
2. If an SP is already in service, it can send a transaction with msg `MsgUpdateStorageProviderStatus` to Greenfield and request a maintenance duration,
   if there are no restrictions violated, the SP is allowed to enter maintenance mode immediately.
!!! note  
    Note: The SP needs to send a transaction to Greenfield to update its status back `STATUS_IN_SERVICE` before its request duration ends, or Greenfield would do it mandatorily.

There are two restrictions that apply when an SP requests to be in maintenance. These restrictions work with the parameters `num_of_historical_blocks_for_maintenance_records`, `maintenance_duration_quota` and `num_of_lockup_blocks_for_maintenance`. Refer to [Params](https://github.com/bnb-chain/greenfield/blob/doc-refactor/docs/modules/storage-provider.md#params)

* The total maintenance duration for each SP, within the number of blocks defined by `num_of_historical_blocks_for_maintenance_records`, should not exceed the `maintenance_duration_quota`.
* An SP is not allowed to make two consecutive requests to `STATUS_IN_MAINTENANCE` within `num_of_lockup_blocks_for_maintenance`, even if there are enough quotas for it.

To ensure the quality of service provided, we strongly recommend that SPs conduct a self-test via the maintenance account before turning back to `STATUS_IN_SERVICE`. This includes creating buckets/objects to verify that all functionalities work as expected. For a detailed illustration on how to use SDK to create bucket/object, please refer to the [APIs and SDKs](../for-developers/apis-and-sdks/index.md).

## Exit

There are two types of exit based on the behavior and choices of the SP: Graceful Exit and Forced Exit.

### Graceful Exit
At some point, the SP may choose to voluntarily exit the Greenfield storage network for various reasons. 
Ensuring a graceful exit process is crucial to ensure a seamless transition of responsibilities and data to other SPs.
During the exit process, the SP must continue to fulfill user serve user querying requests, Once the exit process is 
successfully completed, the SP can retrieve all the staked BNB.

To execute a graceful exit, all its stored data need to be migrated to other successor SPs that are willing to take over.  
This data migration process involves recovering data from the exiting SP by successor SPs in a secure and efficient manner.
After the exit SP sending a `StorageProviderExit` transaction to the Greenfield Blockchain, its status will turn to `STATUS_GRACEFUL_EXITING`.
A successor SP can initiate the recovery process by first sending a `ReserveSwapIn` transaction to the Greenfield Blockchain, reserving the
exit SP's position in the respective Global Virtual Group (GVG) or GVG Family so that it will be allowed to recover data from other SPs.
Once the successor SP successfully takes over all data in a GVG or GVG Family, it will send a `CompleteSwapIn` transaction to the Greenfield Blockchain, 
confirming the completion of the data transfer process.

Greenfield Blockchain incorporates an effective consensus mechanism to facilitate and validate the graceful exit process. 
This mechanism ensures that the exit is carried out transparently, maintaining the network's integrity and preventing 
any disruptions or data loss during the transition.

To ensure the safe and reliable migration of data, frequent data challenges are applied to the SPs that take over the data. 
These challenges are designed to verify the integrity and consistency of the migrated data, reassuring users that their data remains secure and accessible.

### Forced Exit
An uncooperative SP no longer wishes to provide service and refuses to go through the standard graceful exit process. In such a case,
Greenfield governance will force the SP to exit, make it enter `STATUS_FORCED_EXITING`. The data recovery process for successor SP is the same as graceful exit mentioned above.
However, a forced exit SP will face penalties, and its staked BNB will be locked into the Payment module governance account, this payment account is used to receive forced settlement fee, and pay for potential debt from late forced settlement.

!!! note
    For more information, please see [SP exit](https://github.com/bnb-chain/greenfield/blob/doc-refactor/docs/modules/virtual-group.md#sp-exit-workflow)
