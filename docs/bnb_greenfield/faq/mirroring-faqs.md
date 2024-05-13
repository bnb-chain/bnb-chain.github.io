---
title: Mirroring FAQ
description: A list of BNB Greenfield frequently asks questions about cross-chain resource mirroring.  
keywords: [BNB Greenfield Mirror, BNB Greenfield Access Control]
---

# Mirroring FAQ

### What is mirroring?
In the context of BNB Greenfield, object mirroring refers to the process of transferring control over objects stored on BNB Greenfield to a smart contract on BNB Smart Chain (BSC). When an object is mirrored, it means that the object can be managed through BSC by sending messages to Greenfield through a network of relayers, which facilitate communication and interaction between the two platforms. This allows the object to be fully managed on-chain on BSC, meaning that users or other smart contracts can perform various operations and changes to the object through on-chain transactions.

### Is the mirroring copy content of the file from Greenfield to BSC? What is the maximal filesize supported?
During the mirroring process from BNB Greenfield to BSC, the content of the file itself is not copied. This means that neither the data nor the file metadata, which is stored on the BNB Greenfield blockchain, is transferred to BSC. Consequently, there is no size limit imposed on the mirroring process since the actual file content is not duplicated.

### What can be achieved through mirroring?
Currently changing any metadata attributes of the object, which includes information about its properties, permissions, and other relevant attributes. For example, let's say a user wants to change the permission settings of a specific object stored on BNB Greenfield. They can initiate an on-chain transaction on BSC, either directly or through a smart contract, specifying the desired changes to the object's permissions. As part of this transaction, a message is propagated through the relayer network from BSC to BNB Greenfield. The relayers act as intermediaries, facilitating the communication between the two platforms. The message contains the information about the requested changes to the object's metadata, such as the updated permission settings. Upon receiving the message, BNB Greenfield processes the request and updates the metadata of the object accordingly. 

### What are the advantages of mirroring?
By transferring control over objects to the smart contract on BSC and allowing on-chain management, object mirroring enables greater flexibility and control over decentralized storage on BNB Greenfield to all dApps on BSC. It leverages the capabilities of the BSC and its smart contract functionality to provide enhanced functionality and interoperability between the two platforms.

### How mirroring is actually implemented on BSC?
Mirroring on BSC allows for the replication of resources from the Greenfield Blockchain to BSC as non-fungible tokens (NFTs). These resources include buckets, objects, and groups, which are represented as NFTs conforming to the ERC-721 standard. Additionally, the members within a group can be mirrored as ERC-1155 tokens, representing permissions.

Once mirrored on BSC, these resources can be managed directly by smart contracts on the BSC network. Any operations performed on BSC will impact the storage format, access permissions, and other aspects of the data on Greenfield, ensuring that changes made on BSC are reflected on Greenfield. Currently, the mirrored NFTs are not transferable, but the ability to transfer them will be introduced in the future.

### Is ownership of the object changed during mirroring?
Currently, the ownership of an object cannot be changed. The ownership of an object is initially set to the creator of the object and remains the same even after the object is mirrored to a smart contract on BSC. Mirroring does not alter the ownership of the object, and it cannot be set to the BSC smart contract or any other party. The object's ownership remains with its original creator throughout the mirroring process and subsequent interactions with the object on BSC.

### Are objects mirrored by default over to BSC?
Mirroring objects from BNB Greenfield to BSC is not done automatically with the creation of the object. Users have to manually trigger the mirroring process for selected objects, either at the bucket or object level, as it requires transaction gas. This allows users to have control over which objects are mirrored while being aware of the associated costs.

### Once the object is mirrored, can it still be managed by BNB Greenfield?
Once an object is mirrored from BNB Greenfield to BSC, it can only be managed on BSC and cannot be reverted or "un-mirrored" back to Greenfield for management through Greenfield. However, it is worth noting that the ability to "un-mirror" objects back to Greenfield may be introduced in future releases, providing the option to manage mirrored objects through Greenfield after being mirrored to BSC.

### How long the changes are propagated from mirrored BSC objects to actual change on BNB Greenfield?
The changes made to mirrored objects on BSC are propagated to BNB Greenfield once the corresponding transactions are finalized on both blockchains. BSC has a block finality of 3 seconds, while BNB Greenfield has a block finality of 2 seconds. As a result, the changes should be reflected within a maximum block finality of 3 seconds, which is the longer of the two block finality times.

### If the object is renamed, does the mirroring break and need to be “remirrored”?
Mirroring in BNB Greenfield is based on the unique object ID and is not influenced by changes to object metadata, including its name. Even if an object is renamed, the mirroring process remains intact, as it is unaffected by such metadata modifications.

### Can the mirrored object be migrated between storage providers?
The mirroring process in BNB Greenfield allows for object migration between storage providers because the object's data and metadata always reside on BNB Greenfield. As the data is not copied over to BSC, the mirroring remains unaffected. This means that migrating the actual content from one storage provider to another does not impact the mirroring process.

