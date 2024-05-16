---
title: Release Notes
#icon: proposal
#dir:
#  order: 7
#order: 7
---

# Release Notes
## Greenfield v1.7.0 - Erdos Upgrade
BNB Greenfield v1.7.0 introduces the Erdos Hardfork, which includes the following major features:
- Add new cross-chain channel `ExecutorChannel` and corresponding cross-app `ExecutorApp`. See https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-363.md
- Add multi-message support for greenfield crosschain app. See https://github.com/bnb-chain/greenfield-cosmos-sdk/pull/417
- Implement storage fee paymaster. See https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-362.md

## Greenfield v1.6.0 - Serengeti Upgrade
BNB Greenfield v1.6.0 introduces the Serengeti Hardfork, which includes the following major features:
- Primary Storage Provider acts as the upload agent for object creation and update on Greenfield. See https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-364.md
- Streamline off-chain authentication on Greenfield: it introduces GNFD2-EDDSA, a simplified off-chain authentication signature verification method. It streamlines the authentication process, reducing developer integration complexity and improving user interaction. See https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-346.md
- SP Free Monthly Quota: To further incentivize users to utilize Greenfield and simplify the process of purchasing read quota, SPs can offer a certain amount of free data to each Bucket every month.

Greenfield v1.6.0 also includes several optimization features and bug fixes. For more details about this release, please
refer to [Greenfield Blockchain](https://github.com/bnb-chain/greenfield/releases/tag/v1.6.0) and [Greenfield SP](https://github.com/bnb-chain/greenfield-storage-provider/releases/tag/v1.6.0).

## Greenfield v1.5.0 - Pawnee Upgrade
BNB Greenfield v1.5.0 introduces the Pawnee Hardfork, which includes the following major feature:
- Support Greenfield Atomic Object Update: Previously, users face the inconvenience of having to delete and recreate objects in Greenfield in order to replace their content. 
   v1.5.0 offer a more efficient and seamless object update process. See https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-366.md

Greenfield v1.5.0 also includes several optimization features and bug fixes. For more details about this release, please
refer to [Greenfield Blockchain](https://github.com/bnb-chain/greenfield/releases/tag/v1.5.0) and [Greenfield SP](https://github.com/bnb-chain/greenfield-storage-provider/releases/tag/v1.5.0).

## Greenfield v1.4.0 - Ural Upgrade
BNB Greenfield v1.4.0 introduces the Ural Hardfork, which includes the following features:
1. Support setting resource tags by accounts with permission: Previously, only the owner of a resource could set tags.
   However, in certain scenarios, users may desire other authorized accounts to be able to set tags on behalf of the owner.

2. Support bucket migration: In Greenfield, each bucket is associated with a primary SP. If a user is dissatisfied with
   the service from their current primary SP, they have the option to migrate their bucket to another SP.

Greenfield v1.4.0 also includes several optimization features and bug fixes. For more details about this release, please
refer to [Greenfield Blockchain](https://github.com/bnb-chain/greenfield/releases/tag/v1.4.0) and [Greenfield SP](https://github.com/bnb-chain/greenfield-storage-provider/releases/tag/v1.4.0).

## Greenfield v1.3.0 - Hulunbeier Upgrade
BNB Greenfield v1.3.0 introduces the Hulunbeier Hardfork, which includes the following features:
1. Cross-chain permission module: With this new feature, users can now grant permissions from the BSC/opBNB side. This
   enhancement provides greater programmability and flexibility. For more details, please refer to [here](https://github.com/bnb-chain/BEPs/pull/334).

2. Support the exit of SP: With this new feature, SPs on Greenfield can now exit without any restrictions. For more
   details, please refer to [here](https://github.com/bnb-chain/BEPs/pull/338).

Greenfield v1.3.0 also includes several optimization features and bug fixes. For more details about this release, please
refer to [Greenfield Blockchain](https://github.com/bnb-chain/greenfield/releases/tag/v1.3.0) and [Greenfield SP](https://github.com/bnb-chain/greenfield-storage-provider/releases/tag/v1.3.0).

## Greenfield v1.2.0 - Manchurian Upgrade
BNB Greenfield v1.2.0 introduces the Manchurian Hardfork, which includes the following features:

1. Support setting tags for buckets, objects, and groups. We encourage the community to create an indexing service for tags to enhance
query capabilities. For additional information, please visit [here](https://github.com/bnb-chain/community-contributions/blob/main/bnb-greenfield-wishlist-corechain.md#challenge-greenfield-tagging-and-indexing-service).

2. Users can query object before the object is sealed. Currently, users have to wait for an object to be sealed before
they can download the object. However, sealing the object requires coordination among SPs. If some SPs are temporarily
unavailable, it can affect the sealing process and consequently impact user access. In this version, the Primary SP will
make every effort to ensure successful sealing of the file on the blockchain. Until then, users can access the object in
advance. It is important to note that there is still a small probability that the file may fail to seal, in which case
the SP will reject it and users will need to handle such exceptional situations.

Greenfield v1.2.0 also includes several optimization features and bug fixes. For more details about this release, please
refer to [Greenfield Blockchain](https://github.com/bnb-chain/greenfield/releases/tag/v1.2.0) and [Greenfield SP](https://github.com/bnb-chain/greenfield-storage-provider/releases/tag/v1.2.0).

## Greenfield v1.1.0 - Pampas Upgrade
BNB Greenfield v1.1.0 introduces the Pampas Hardfork, which enables cross-chain resource interoperability between
Greenfield and opBNB. With this upgrade, developers can now control resources on Greenfield by writing applications on
opBNB. This cross-chain programmability is similar to the interoperability between BSC and Greenfield. However, compared
to BSC, opBNB offers cheaper gas fees and faster cross-chain finality. It's important to note that the cross-chain
access between Greenfield and opBNB is limited to storage resources (bucket, object, group) and does not support the
transfer of BNB tokens between these two chains.

To facilitate cross-chain accessibility between Greenfield and opBNB, validators need to upgrade their relayers running
between Greenfield and BSC to [Relayer v1.1.1](https://github.com/bnb-chain/greenfield-relayer/releases/tag/v1.1.1) before
the Pampas Hardfork. Additionally, they should deploy an additional relayer for Greenfield and opBNB, following the
instructions in the [Run Relayer](../guide/greenfield-blockchain/run-node/run-relayer.md).

Furthermore, in version v1.1.0, we have temporarily disabled the SP Exit and Bucket Migration processes due to their
complexity and the difficulty in ensuring stability. We are working on optimizing these features and will introduce a
more efficient and robust solution in the next version.

Greenfield v1.1.0 also includes several optimization features and bug fixes. For more details about this release, please
refer to [Greenfield Blockchain](https://github.com/bnb-chain/greenfield/releases/tag/v1.1.0) and [Greenfield SP](https://github.com/bnb-chain/greenfield-storage-provider/releases/tag/v1.1.0).

## Greenfield v1.0.0 - Initial version for Mainnet
This is the official version released for Greenfield Mainnet, which includes most of the features that have been
thoroughly tested during the Testnet phase. You can refer to our [Feature Lists](./features.md).

Currently, we need to conduct more testing and make improvements on the Testnet for the complexity of SP Exit and
Bucket Migration. We plan to enable these two features on the Mainnet in the near future.

Please refer to [Greenfield Blockchain](https://github.com/bnb-chain/greenfield/releases/tag/v1.0.0) and
[Greenfield SP](https://github.com/bnb-chain/greenfield-storage-provider/releases/tag/v1.0.0) for more details about the release.

## Greenfield v0.2.6 - Final release before mainnet
[v0.2.6](https://github.com/bnb-chain/greenfield/releases/tag/v0.2.6) This is the final version before the mainnet launch, 
which mainly includes bug fixes and security enhancement.
- Change few events the blockchain and enhance the parameter verification.
- Refactor the code for getObject and Universal apis.
- Strength the authentication and verification processes between storage providers.
- Fix the vulnerability of not comparing the chain hash when uploading data.
- Fix few bugs, like panic, memory leakage on storage provider.
- Addressed several security vulnerabilities in the smart contract.

## Greenfield v0.2.5 - Testnet Nagqu Upgrade

BNB Greenfield is undergoing Nagqu upgrade for the testnet version to [v0.2.5](https://github.com/bnb-chain/greenfield/releases/tag/v0.2.5). 
The Nagqu upgrade took place at block height 471350, estimated to be on Sep 15th at 
03:20 AM considering the current block generation rate.

*Please be aware that the upcoming hardfork will not impact your account balance on Greenfield. 
All buckets and objects stored on the Greenfield Testnet before will remain accessible.*

This version has undergone comprehensive security enhancements as the final hardfork version prior to the mainnet launch. This mainly includes:
- The Greenfield resource mirror smart contracts apply more stringent parameter checks.
- Preventing funds in payment accounts from being permanently trapped in the Cosmos Bank module through intelligent detection.
- Introducing timer-lock mechanism: funds exceeding 100 BNB will be subject to a one-day lock-up period upon withdrawal from the payment account.
- Enhance authentication logic between storage providers.


To enhance the user experience, the developer community is introducing new features and improvements.
- Introduce the official native SDK for Ali Oss-based SP to enhance stability.
- Improve the performance and stability of SP processing for file uploads. The standard specifications of SP allow for the stable processing of 10 files per second with a size of 1M.
- Optimize user read traffic billing based on actual usage rather than download count.
- Command line optimization, like support folder upload.


For other detailed features, bug fixes, and refactoring, please refer to the changelog in [Greenfield Blockchain](https://github.com/bnb-chain/greenfield/blob/master/CHANGELOG.md) 
and [Greenfield SP](https://github.com/bnb-chain/greenfield/blob/master/CHANGELOG.md) repo.


## Greenfield v0.2.4 - Testnet Maintenance Upgrade Reset.

Greenfield v0.2.4 - Testnet Maintenance Upgrade Reset.[](#greenfield-v023---testnet-maintenance-upgrade-reset)

On August 31st, we reset the Greenfield Testnet and upgrade the Greenfield version to [v0.2.4](https://github.com/bnb-chain/greenfield/tree/v0.2.4). Here are key changes to note.

**Greenfield Blockchain Changelog**

- [#408](https://github.com/bnb-chain/greenfield/pull/408) This refactors the payment system to streamline billing calculations and simplifies billing with a consistent pricing model and periodic updates:
  - **Global Price**: Introduces a single global storage price, a median of individual storage prices, for both read and store operations.
  - **Updates**: This global price is updated every 30 days to reflect changes in storage costs.
  - **Billing**: Bucket fees, including read and store costs, are now based on this global price.
- [#411](https://github.com/bnb-chain/greenfield/pull/411) Add RemoveExpiredPolicies to remove expired data from kvstore. This new feature will reduce blockchain data size.
- [#413](https://github.com/bnb-chain/greenfield/pull/413) Implement cross-chain mechanism between opBNB and BNB Greenfield
- [#415](https://github.com/bnb-chain/greenfield/pull/415) Enable plain store for full node
- [#420](https://github.com/bnb-chain/greenfield/pull/420) Skip signature verification on genesis block
- [#374](https://github.com/bnb-chain/greenfield/pull/374) Group member expiration
- [#390](https://github.com/bnb-chain/greenfield/pull/390) Add a flag to enable/disable heavy queries and refactor APIs
- [#399](https://github.com/bnb-chain/greenfield/pull/399) Add new query APIs for querying storage group and group members
- [#403](https://github.com/bnb-chain/greenfield/pull/403) Introduce Storage Provider maintenance mode

**Greenfield Storage Provider changelog**

- [#989](https://github.com/bnb-chain/greenfield-storage-provider/pull/989) Implement Group APIs
- [#1008](https://github.com/bnb-chain/greenfield-storage-provider/pull/1008) Change auth api response from JSON to XML
- [#1010](https://github.com/bnb-chain/greenfield-storage-provider/pull/1010) Add real-time mode to blocksyncer
- [#1015](https://github.com/bnb-chain/greenfield-storage-provider/pull/1015) Add new API to retrieve groups where the user is the owner
- [#1012](https://github.com/bnb-chain/greenfield-storage-provider/pull/1012) Enhance error handling to deliver meaningful and informative update messages.
- [#1025](https://github.com/bnb-chain/greenfield-storage-provider/pull/1025) Change Metadata API response from JSON to XML
- [#857](https://github.com/bnb-chain/greenfield-storage-provider/pull/857) Implement validation for virtual group families to handle bucket creation requests through RPC calls to the chain, followed by SP-driven family selection using the designated strategy.
- [#985](https://github.com/bnb-chain/greenfield-storage-provider/pull/985) Implement Time Ticker for BlockSyncer
- [#981](https://github.com/bnb-chain/greenfield-storage-provider/pull/981) Add transaction confirmation function and support virtual group retry
- [#968](https://github.com/bnb-chain/greenfield-storage-provider/pull/968) Support bucket migration verification when loading from db

## Greenfield v0.2.3 - Testnet Maintenance Upgrade Reset.

On August 3rd, we reset the Greenfield Testnet and upgrade the Greenfield version to [v0.2.3](https://github.com/bnb-chain/greenfield/tree/v0.2.3). Here are key changes to note.

**Greenfield Blockchain Changelog**

- [#328](https://github.com/bnb-chain/greenfield/pull/328) Significant model adjustments in the latest version. New concepts such as Virtual Group, Family, etc., has been introduced, to make bucket migration and storage provider exit more lightweight and reduces the storage of chain metadata. More details can be found here.
- [#287](https://github.com/bnb-chain/greenfield/pull/287), [#288](https://github.com/bnb-chain/greenfield/pull/288), [#315](https://github.com/bnb-chain/greenfield/pull/315) Improvement in payment module. A new algorithm to get the secondary SP price is introduced to avoid unfair competition; Changing the frequency of reading quota is limited to avoid some issues with charging; More payment APIs are available for frontend use.
- [#323](https://github.com/bnb-chain/greenfield/pull/323) A chain-based reconciliation module was introduced to ensure global security at the level of funds.
- [#328](https://github.com/bnb-chain/greenfield/pull/328) More lightweight object-sealing transactions are achieved by introducing the BLS signature mechanism.
- [#368](https://github.com/bnb-chain/greenfield/pull/368) In order to reduce the losses caused by software instability during the initial SP run, the amount of BNB slashed by the storage provider will be strictly limited within a certain period of time.
- [#346](https://github.com/bnb-chain/greenfield/pull/346),[ #292](https://github.com/bnb-chain/greenfield/pull/292) SDK enhancement. The ordinary RPC requests can be sent via websocket through the Gnfd full node, even if a complex balancer is used, the request always being serviced by the same full node; Custom http client with different settings is allowed to initialize a client;
- [#290](https://github.com/bnb-chain/greenfield/pull/290) The encoding format of cross-chain communication has been changed from RLP to ABI in order to save on gas usage.
- [#370](https://github.com/bnb-chain/greenfield/pull/370), [#326](https://github.com/bnb-chain/greenfield/pull/326), [#312](https://github.com/bnb-chain/greenfield/pull/312), [#279](https://github.com/bnb-chain/greenfield/pull/279) Security enhancement, such as preventing replay attacks and rogue key attacks in BLS signatures, calculation accuracy errors, etc.

**Greenfield Storage Provider changelog**

- [#480](https://github.com/bnb-chain/greenfield-storage-provider/pull/480) Support resumable upload for big files. The resumable upload can bring these advantages for big files, including a: Quick recovery from any network issues, b: Pause and resume object uploads.
- [#638](https://github.com/bnb-chain/greenfield-storage-provider/pull/638) Support data recovery. Including a: recovering segments data when downloading object finds the wrong data, b: supporting recovery in client, c: recovery segment (for primary SP) or EC piece (for secondary SP) if challenge misses the data d: cmd "recovery.object" to recovery lost object for the primary SP or secondary SP.
- [#681](https://github.com/bnb-chain/greenfield-storage-provider/pull/681), [#735](https://github.com/bnb-chain/greenfield-storage-provider/pull/735), [#797](https://github.com/bnb-chain/greenfield-storage-provider/pull/797) Support using Alicloud OSS as the underlying storage of SP.
- [#699](https://github.com/bnb-chain/greenfield-storage-provider/pull/699) Support sharding of large-capacity data tables to provide stronger service capabilities.
- [#795](https://github.com/bnb-chain/greenfield-storage-provider/pull/795) Significant model adjustments in the latest version. New concepts such as Virtual Group, Family, etc., have been introduced. Complete the original process adaptation.
- [#824](https://github.com/bnb-chain/greenfield-storage-provider/pull/824) Based on the Virtual Group model, it supports Bucket migration and SP exit. Users can complete bucket migration as needed, and SP owners can also complete withdrawal according to actual conditions.
- [#412](https://github.com/bnb-chain/greenfield-storage-provider/pull/412), [#851](https://github.com/bnb-chain/greenfield-storage-provider/pull/851), [#814](https://github.com/bnb-chain/greenfield-storage-provider/pull/814) Support more powerful metadata query capabilities, such as getting single bucket/object, query SP Info, etc.
- [#834](https://github.com/bnb-chain/greenfield-storage-provider/pull/834) Remove v2 authorization.

## Greenfield v0.2.2 - Testnet Maintenance Upgrade Reset.

On June 25th, we reset the Greenfield Testnet and upgrade the Greenfield version to v0.2.2. Here are key changes to note.

🔸All buckets/objects previously stored on Greenfield Testnet will be cleared and won't be available for query anymore. Friendly reminder: Please do not save important data on the testnet. The team will periodically delete outdated data.

🔸All account balances will also be reset. However, accounts with a balance under 10 tBNBs can look forward to an airdrop after the reset. For new users, Greenfield will not provide redundant faucets any longer, please get the test BNB from the official faucet [discord channel](https://discord.gg/bnbchain) and use [Dcellar](https://dcellar.io/) to convert it to the BNB on Greenfield.

Greenfield v0.2.2 - Maintenance Release🎉

The [Greenfield Blockchain v0.2.2](https://github.com/bnb-chain/greenfield/releases/tag/v0.2.2) and [Storage Provider v0.2.2](https://github.com/bnb-chain/greenfield-storage-provider/releases/tag/v0.2.2) introduces several enhancement exciting features. Let's take a look at these:

### Enhancement and Feature List 📝
* [#249](https://github.com/bnb-chain/greenfield/pull/249) This feature will support multiple messages in a transaction using `EIP712 `sign approach. Allowing multiple messages will provide a better user experience for dApp users.
* [#250](https://github.com/bnb-chain/greenfield/pull/250) This feature allows mirroring bucket/object/group by using `id` or `name`. By using name, we can package some messages in a single tx, e.g., `CreateBucket`  `MirrorBucket` in one tx.
* [#268](https://github.com/bnb-chain/greenfield/pull/268) This feature records the challenge attestation results for the recent challenges.
* [#276](https://github.com/bnb-chain/greenfield/pull/276) This feature support adding keyManager into txOpt, so that allow large batch of transactions sent by a single client.
* [#502](https://github.com/bnb-chain/greenfield-storage-provider/pull/502) This feature allow SP to use B2 as its underlying storage.
* [#512](https://github.com/bnb-chain/greenfield-storage-provider/pull/512) This feature enables universal endpoint for private object.
* [SP Standard Framework](../guide/storage-provider/standard.md) This document outlines the updated implementation of the SP standard and establishes a clear set of guidelines that encompass the SP API, protocols, and performance indicators. Community developers are able to customize their own SP functions in a flexible manner that adheres to the established standard. 

For other small features, bug fixes, and refactoring, please refer to the changelog in the release.


## Greenfield v0.2.1 - Mekong Testnet reset.

On May 25th, we reset the Greenfield Testnet and upgrade the Greenfield version to v0.2.1. We're excited to introduce this as the Mekong Testnet. Here are key changes to note.

🔸The Greenfield BSC Testnet (Chain ID: 5601) will be discontinued. Instead, we'll deploy the Greenfield Cross-Chain contracts on the BSC Chapel Testnet (Chain ID: 97).  This means you can fully utilize all the infrastructure of the current BSC Chapel Testnet, such as bscscan, tenderly, theGraph, and so on. BNB and Greenfield resources can still flow freely between Greenfield testnet and BSC testnet.

🔸The Greenfield Blockchain gRPC Endpoint will no longer be provided. The ETH-API endpoint has now been integrated with the Tendermint endpoint. All you need is the Tendermint endpoint for the Greenfield Blockchain. Please use [Chainlist](https://www.bnbchainlist.org/) to quickly add BSC Testnet and Greenfield Mekong Testnet.

🔸All buckets/objects previously stored on Greenfield Testnet will be cleared and won't be available for query anymore. Friendly reminder: Please do not save important data on the testnet. The team will periodically delete outdated data.

🔸All account balances will also be reset. However, accounts with a balance under 10 tBNBs can look forward to an airdrop after the reset. For new users, Greenfield will not provide redundant faucets any longer, please get the test BNB from the official faucet [discord channel](https://discord.gg/bnbchain) and use [Dcellar](https://dcellar.io/) to convert it to the BNB on Greenfield.

🔸As this is a breaking upgrade, the team will update the document as soon as possible the maintenance is done.

Greenfield v0.2.1 - Release for Mekong Testnet 🎉

The [Greenfield Blockchain v0.2.1](https://github.com/bnb-chain/greenfield/releases/tag/v0.2.0) and [Storage Provider v0.2.1](https://github.com/bnb-chain/greenfield-storage-provider/releases/tag/v0.2.1) introduces several enhancement exciting features. Let's take a look at these:

### Enhancement and Feature List 📝
- Bump cosmos-sdk core to version v0.47.2. Cosmos-sdk v0.47.x and v0.46.x have significant differences in consensus engine, ABCI, encoding, dependency injection, and other aspects. Greenfield hopes to update to this version this morning to avoid future upgrade difficulties.
- [Challenge Verifier](https://greenfield.bnbchain.org/docs/guide/introduction/ecosystem.html#challenge-verifier) is introduced in  Mekong Testnet. By using Challenge Verifier, the network can ensure that only reliable and trustworthy storage providers are allowed to participate, protecting the network from any potential data loss, corruption, or low-quality service.
- Discontinue object and stale permission GC is introduced in v0.2.1. These two features allow for a lighter blockchain state and allow SPs on the testnet to periodically clean up data to maintain long-term operation even without incentives.
- Support for more diverse methods of file searches, such as listing objects by prefix or by folder.
- Implemented a garbage collection module for the storage provider, reducing the operating costs of the storage provider.

## Greenfield v0.1.2 - The maintenance testnet release.

[Greenfield Blockchain v0.1.2](https://github.com/bnb-chain/greenfield/releases/tag/v0.1.2) and
[Storage Provider v0.1.2](https://github.com/bnb-chain/greenfield-storage-provider/releases/tag/v0.1.2)
was a regular maintenance testnet version of BNB Greenfield. This version fixed several bugs from the
previous version and introduced some features.

### Bugfix List
- Modification of Storage Fee Destination: Previously, storage fees were directed to the SP operator address.
 This has been adjusted to the funding address, ensuring smoother transactions and fee collection.
- Default SP Price Adjustment: To better reflect actual prices, the default prices in create_sp.json and payment.
 Param have been modified to align more closely with the current market rates.
- Fixing List Group Error: A crucial fix has been made to the listGroup function to adapt it to the new indexing
 structure of the group, which uses two levels of indexing.
- Fixing CLI Bugs: We have addressed some command usage issues, such as those relating to update-group-member and
 put-policy, and improved the description of some commands.

### Feature List
- Off-Chain-Auth Solution:  Implementing an off-chain-auth solution, which includes APIs for "request nonce",
 "update user key", and "verify off chain auth sig". This will greatly improve the user experience for Dapp users,
 eliminating the need for repetitive wallet popups for signatures.
- Path-style API and Upload Progress API: Introducing support for the path-style API and a new query upload progress API.
- Seal Object Metrics and Code Refinement: The TaskNode service now includes seal object metrics. We have also refined
 the replicate task and added some DB logs.
- Verify Permission API: The new verify permission API replaces the current chain interface, improving overall
 performance and reducing latency.
- Block Syncer TXHash & Juno Version Update: Updating the block syncer to add txhash info when exporting events.
 Additionally, updating the Juno version to support the new "stop serving" feature and included the SP module and GC function.
- Metadata Block Syncer Schema Update & ListExpiredBucketsBySp: Updating the block syncer schema according to changes
 on the chain and events. Also introducing a new method, ListExpiredBucketsBySp, to support GC operations within SP.

## Greenfield v0.1.0 - The initial testnet release.

[Greenfield Blockchain v0.1.0](https://github.com/bnb-chain/greenfield/releases/tag/v0.1.0) and
[Storage Provider v0.1.0](https://github.com/bnb-chain/greenfield-storage-provider/releases/tag/v0.1.0)
was the first testnet version of BNB Greenfield. It represented a fundamental implementation of the 
[Greenfield Whitepaper](https://github.com/bnb-chain/greenfield-whitepaper). 

This version contained a variety of functions, including payment, storage, storage provider, 
cross-chain, challenge, staking, and governance. It is an important milestone for BNB Greenfield, 
implementing many core functions and laying the foundation for future development and improvement.

### Features List

#### Account && Balance && Transaction

- Users can create accounts and transfer BNB through Metamask or other EVM compatible wallets.
- Users can grant permission to other users to spend their BNB as transaction fees.

#### Storage
- Users can create and manage group, bucket, and object on Greenfield.
- Users can upload files onto Greenfield in a decentralized way and download them anytime.
- Users can upload private files onto Greenfield safely.
- Users can grant permission to other users to access their files.
- Users can grant permission to other users to manage their resources, including group, bucket, and object.
- Users can pay for storage fees using BNB in a streaming manner.
- If the storage provider provides poor service, users can challenge them.

#### Native Cross Chain Communication

- User can transfer BNB between BSC and Greenfield.
- User can mirror Group, Bucket, Object to BSC as NFT.
- User can manage Group, Bucket, Object on BSC through smart contract directly.
- BSC developer can easily integrate Greenfield into their dApp through [SDK](https://github.com/bnb-chain/greenfield-contracts-sdk). 

#### Storage Provider

- Storage Provider can register and update their information.
- Storage Provider can update the storage price.
- Storage Provider can garbage collect stale storage data on Testnet.

#### Validator and Staking

- User can stake BNB to become a validator.
- Validator update their information.
- Validator can get part of revenue from storage fees.
- Validator can take part in the governance of Greenfield.
