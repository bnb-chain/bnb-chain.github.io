# Resource Mirroring

# Overview

!!! tip

    #### Pre-requisite Readings
    
    * [Native cross chain Resource Mirror](../../greenfield-blockchain/modules/cross-chain.md#resource-mirror-layer)


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
This integration between Greenfield Blockchain and BNB Smart Chain allows for greater flexibility and accessibility
when it comes to accessing and manipulating data, ultimately leading to a more streamlined and efficient
data management process.

More details are discussed in [Mirroring FAQ](../../../faq/mirroring-faqs.md).




