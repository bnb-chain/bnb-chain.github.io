---
title: Cross Chain Program FAQ - BNB Greenfield Cross Chain Integration
description: A list of BNB Greenfield frequently asks questions about cross-chain program  
keywords: [BNB Greenfield Cross Chain, BNB Greenfield Access Control]
---

# Cross Chain Program FAQ

### What are the advantages of mirroring?
By transferring control over objects to the smart contract on BSC and allowing on-chain management, object mirroring enables greater flexibility and control over decentralized storage on BNB Greenfield to all dApps on BSC. It leverages the capabilities of the BSC and its smart contract functionality to provide enhanced functionality and interoperability between the two platforms.

### How mirroring is actually implemented on BSC?
Mirroring on BSC allows for the replication of resources from the Greenfield Blockchain to BSC as non-fungible tokens (NFTs). These resources include buckets, objects, and groups, which are represented as NFTs conforming to the ERC-721 standard. Additionally, the members within a group can be mirrored as ERC-1155 tokens, representing permissions.

Once mirrored on BSC, these resources can be managed directly by smart contracts on the BSC network. Any operations performed on BSC will impact the storage format, access permissions, and other aspects of the data on Greenfield, ensuring that changes made on BSC are reflected on Greenfield. Currently, the mirrored NFTs are not transferable, but the ability to transfer them will be introduced in the future.

### Are objects mirrored by default over to BSC?
Mirroring objects from BNB Greenfield to BSC is not done automatically with the creation of the object. Users have to manually trigger the mirroring process for selected objects, either at the bucket or object level, as it requires transaction gas. This allows users to have control over which objects are mirrored while being aware of the associated costs.

### How long the changes are propagated from mirrored BSC objects to actual change on BNB Greenfield?
The changes made to mirrored objects on BSC are propagated to BNB Greenfield once the corresponding transactions are finalized on both blockchains. BSC has a block finality of 3 seconds, while BNB Greenfield has a block finality of 2 seconds. As a result, the changes should be reflected within a maximum block finality of 3 seconds, which is the longer of the two block finality times.

### If the object is renamed, does the mirroring break and need to be “remirrored”?
Mirroring in BNB Greenfield is based on the unique object ID and is not influenced by changes to object metadata, including its name. Even if an object is renamed, the mirroring process remains intact, as it is unaffected by such metadata modifications.

### Can the mirrored object be migrated between storage providers?
The mirroring process in BNB Greenfield allows for object migration between storage providers because the object's data and metadata always reside on BNB Greenfield. As the data is not copied over to BSC, the mirroring remains unaffected. This means that migrating the actual content from one storage provider to another does not impact the mirroring process.

