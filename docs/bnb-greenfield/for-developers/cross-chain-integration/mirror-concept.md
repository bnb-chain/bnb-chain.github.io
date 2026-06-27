---
title: Resource Mirroring - BNB Greenfield Cross Chain
---
# Resource Mirroring

# Overview

The Greenfield Blockchain provides a comprehensive set of resources that can be mirrored on the EVM-compatible chains, like BSC and opBNB.
This includes buckets, objects, and groups, which can be stored and managed on the EVM-compatible chains as non-fungible tokens (NFTs)
conforming to the ERC-721 standard.

A bucket is a logical container for storing objects in Greenfield. An object, on the other hand, is a fundamental unit
of storage in Greenfield that represents a file consisting of data and its associated metadata.
Lastly, a group is a collection of accounts with the same permissions.

These resources can be mirrored on the EVM-compatible chains as ERC-721 NFTs, along with the members within a group, which represent
permissions to specify resources, that can be mirrored as ERC-1155 token. At present, the NFTs are not transferable,
but the transferability feature will be added in the near future.

Once these resources are mirrored on EVM-compatible chains, they can be directly managed by smart contracts on EVM-compatible chains.
These operations will directly affect the storage format, access permissions, and other aspects of the data on greenfield.
In other words, any changes made to the decentralized application on EVM-compatible chains will also reflect changes on Greenfield.
This integration between Greenfield Blockchain and BNB Smart Chain/opBNB allows for greater flexibility and accessibility
when it comes to accessing and manipulating data, ultimately leading to a more streamlined and efficient
data management process.

## How to Mirror
Mirroring objects from BNB Greenfield to BSC is not done automatically with the creation of the resource. 
Users have to manually trigger the mirroring process for selected objects, either at the bucket or object level or group,
as it requires transaction gas. This allows users to have control over which objects are mirrored while being 
aware of the associated costs.

- [Resources Mirroring with CLI](../../for-developers/cross-chain-integration/mirror.md)
- [Resource Mirroring with SDK](https://github.com/bnb-chain/greenfield-go-sdk/blob/master/examples/crosschain.go)

The changes made to mirrored objects on BSC are propagated to BNB Greenfield once the corresponding transactions are 
finalized on both blockchains. BSC has a block finality of 3 seconds, while BNB Greenfield has a block finality of 2 seconds. 
As a result, the changes should be reflected within a maximum block finality of 3 seconds, which is the 
longer of the two block finality times.

Once an object is mirrored from BNB Greenfield to BSC, it can only be managed on BSC and cannot be reverted 
or "un-mirrored" back to Greenfield for management through Greenfield. However, it is worth noting that the ability to "un-mirror"
objects back to Greenfield may be introduced in future releases, providing the option to manage mirrored 
objects through Greenfield after being mirrored to BSC.

## What can be achieved through mirroring
Currently changing any metadata attributes of the object, which includes information about its properties, 
permissions, and other relevant attributes. For example, let’s say a user wants to change the permission settings of a 
specific object stored on BNB Greenfield. They can initiate an on-chain transaction on BSC, either directly or through 
a smart contract, specifying the desired changes to the object’s permissions. As part of this transaction, a message 
is propagated through the relayer network from BSC to BNB Greenfield. The relayers act as intermediaries, facilitating 
the communication between the two platforms. The message contains the information about the requested changes to the 
object’s metadata, such as the updated permission settings. Upon receiving the message, BNB Greenfield processes the request 
and updates the metadata of the object accordingly.

During the mirroring process from BNB Greenfield to BSC, the content of the file itself is not copied. 
This means that neither the data nor the file metadata, which is stored on the BNB Greenfield blockchain, 
is transferred to BSC. Consequently, there is no size limit imposed on the mirroring process since the actual 
file content is not duplicated. The ownership of the resource is changed too during the mirroring process.





