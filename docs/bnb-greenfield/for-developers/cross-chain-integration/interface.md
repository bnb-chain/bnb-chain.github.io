---
title: EVM Programmability - BNB Greenfield Cross Chain

---

# EVM Programmability

This document give a detailed introduction of cross-chain primitives that have been defined on EVM-compatible chains to 
enable developers to manage greenfield resources on the EVM-compatible chains directly.

The [Greenfield-Contracts Repo](https://github.com/bnb-chain/greenfield-contracts) is the underlying backbone of the
cross chain communication protocol. It is responsible for implementing the core cross-chain communication functionality that enables seamless interaction between Greenfield and EVM-compatible chains, like BSC and opBNB. 
The library handles the complexities of cross-chain operations, ensuring secure and efficient communication.

During the development process, developers are most likely to interact with the following contracts: `CrossChain`, `BucketHub`, `ObjectHub`, `GroupHub`, `PermissionHub`, `MultiMessage` and `GreenfieldExecutor`.

## Quick Glance

| Contract name      | Usage                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|--------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| TokenHub           | Use to transfer BNB from BSC to Greenfield                                                                                                                                                                                                                                                                                                                                                                                                |
| BucketHub          | Create/delete bucket                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ObjectHub          | Delete object                                                                                                                                                                                                                                                                                                                                                                                                                             |
| GroupHub           | Create/delete group, update group member                                                                                                                                                                                                                                                                                                                                                                                                  |
| PermissionHub      | The user can use Resource-Based Policy to grant permissions to other accounts. Any resources, such as buckets, objects and groups, can associate several policy. Only the resource owner can put a policy which associate to a resource he owned. 1. A policy associate to a bucket can allow grantee to operate the bucket or the specific objects. 2. A policy associate to a object/group can only allow to operator the object/group. |
| MultiMessage       | MultiMessage provides aggregation capabilities to support the atomicity of composite operations.                                                                                                                                                                                                                                                                                                                                          |
| GreenfieldExecutor | Most native operations can be achieved by GreenfieldExecutor, like create payment account, deposit to payment account, withdraw from payment account, migrate bucket, cancel migrate bucket, update bucket info, toggle SP as delegated agent, set bucket flow ratelimit, copy object, update object info, set tag.                                                                                                                       |

Refer to the [contract list](./contract-list.md) for detailed contract address on different network.


## CallBack Handling
dApps on EVM-compatible chains, i.e. smart contracts on BSC, are allowed to implement their own logic to handle ACK and FAIL_ACK packages.
The smart contracts can register callback functions to handle the ACK packages.
To avoid consuming too much gas in callbacks, a gas limitation estimation should be done by the smart contracts that register
the callbacks.

Errors and failures can occur during cross-chain communication. dApps on EVM-compatible chains can handle these by retrying the package with
a higher gas limit, skipping the package to tolerate failure, or upgrading their contract to handle corner cases.

The following are the interfaces for dapps to handle failures:

```solidity
 // retry the first failed package in the queue
 function retryPackage() external;
 // skip the first failed package in the queue
 function skipPackage() external;
```

## Permission Programmability 
Whether resources are created on BSC or mapped from Greenfield to BSC, such as Buckets, Objects, and Groups, by default, 
only the owner account of these resources can manage them. However, with proper authorization, 
other accounts or contracts can be allowed to operate on the owner's resources. 
We provide two methods of authorization:

### Role-based authorization
BucketHub, ObjectHub, and GroupHub all implement the following interface. Through the `grant` interface, 
other accounts can be granted the permission to create, delete, and update this type of resource for a certain period. 
This permission can also be revoked through the `revoke` interface.
```solidity
function grant(address account, uint32 acCode, uint256 expireTime) external {
 ...
}
function revoke(address account, uint32 acCode) external {
    ...
}
```
### NFT token authorization
Since BucketHub and ObjectHub implement the NFT721 standard, and GroupHub implements the ERC1155 standard, 
we use `approve` and `setApprovalForAll` to authorize specific resource Token IDs without restricting the types of operations, 
meaning both deletion and updating are allowed.

```solidity
function approve(address to, uint256 tokenId) public virtual {
    ...
}
function setApprovalForAll(address operator, bool approved) public virtual {
    ...
}
```

## Detailed Interface
They provide the following interfaces respectively:

**IGroupHub**

The `GroupHub` contract provides the following interfaces to manage Group on BSC/opBNB directly.

   ```solidity
   interface IGroupHub {
       /** 
        * @dev  Query the contract address of group NFT.
        * @return The contract address of group token.
        * Each group will be mapped as a NFT on BSC.
        * Group ID and NFT token ID are the same.
        */
       function ERC721Token() external view returns (address);
       /** 
        * @dev  Query the contract address of member NFT.
        * @return The contract address of member token.
        * The member inside a group  will be mapped as a ERC1155 token on BSC.
        * The ID of the ERC1155 token is same with the group ID.
        */
       function ERC1155Token() external view returns (address);

       /**
        * @dev create a group and send cross-chain request from BSC to GNFD.
        *
        * @param creator The group's owner.
        * @param name The group's name.
        */
       function createGroup(address creator, string memory name) external payable returns (bool);
   
       /**
        * @dev create a group and send cross-chain request from BSC to GNFD.
        * Callback function will be called when the request is processed.
        *
        * @param creator The group's owner.
        * @param name The group's name.
        * @param callbackGasLimit The gas limit for callback function.
        * @param extraData Extra data for callback function.
        */
       function createGroup(
           address creator,
           string memory name,
           uint256 callbackGasLimit,
           CmnStorage.ExtraData memory extraData
       ) external payable returns (bool);
   
       /**
        * @dev delete a group and send cross-chain request from BSC to GNFD.
        *
        * @param id The group's id.
        */
       function deleteGroup(uint256 id) external payable returns (bool);
   
       /**
        * @dev delete a group and send cross-chain request from BSC to GNFD.
        * Callback function will be called when the request is processed.
        *
        * @param id The group's id.
        * @param callbackGasLimit The gas limit for callback function.
        * @param extraData Extra data for callback function.
        */
       function deleteGroup(uint256 id, uint256 callbackGasLimit, CmnStorage.ExtraData memory extraData) external payable returns (bool);

       /**
        * @dev update a group's member and send cross-chain request from BSC to GNFD.
        *
        * @param synPkg Package containing information of the group to be updated.
        */
       function updateGroup(GroupStorage.UpdateGroupSynPackage memory synPkg) external payable returns (bool);
   
       /**
        * @dev update a group's member and send cross-chain request from BSC to GNFD.
        * Callback function will be called when the request is processed.
        *
        * @param synPkg Package containing information of the group to be updated.
        * @param callbackGasLimit The gas limit for callback function.
        * @param extraData Extra data for callback function.
        */
       function updateGroup(
           GroupStorage.UpdateGroupSynPackage memory synPkg,
           uint256 callbackGasLimit,
           CmnStorage.ExtraData memory extraData
       ) external payable returns (bool);

       /**
        * @dev Prepare the create group cross-chain msg data.
        * This function is used to assist with `MultiMessage`.
        *
        * @param sender The supposed msg sender of the cross-chain request.
        * @param owner The group's owner.
        * @param name The group's name.
        *
        * @return (ChannelID, MsgBytes, RelayerFee, AckRelayerFee, SenderAddress).
        */
       function prepareCreateGroup(
           address sender,
           address owner,
           string memory name
       ) external payable returns (uint8, bytes memory, uint256, uint256, address);

       /**
        * @dev Prepare the delete group cross-chain msg data.
        * This function is used to assist with `MultiMessage`.
        *
        * @param sender The supposed msg sender of the cross-chain request.
        * @param id The group's id.
        *
        * @return (ChannelID, MsgBytes, RelayerFee, AckRelayerFee, SenderAddress).
        */
       function prepareDeleteGroup(
           address sender,
           uint256 id
       ) external payable returns (uint8, bytes memory, uint256, uint256, address);

       /**
        * @dev Prepare the update group cross-chain msg data.
        * This function is used to assist with `MultiMessage`.
        *
        * @param sender The supposed msg sender of the cross-chain request.
        * @param synPkg Package containing information of the group to be updated.
        *
        * @return (ChannelID, MsgBytes, RelayerFee, AckRelayerFee, SenderAddress).
        */
       function prepareUpdateGroup(
           address sender,
           GroupStorage.UpdateGroupSynPackage memory synPkg
       ) external payable returns (uint8, bytes memory, uint256, uint256, address);
   }
   ```

**IBucketHub**

The `BucketHub` contract provides the following interfaces to manage bucket on EVM-compatible chains, like BSC and opBNB, directly.
   ```solidity
   interface IBucketHub {
       /** 
        * @dev  Query the contract address of bucket NFT.
        * @return The contract address of bucket token.
        * Each bucket will be mapped as a NFT on BSC.
        * Bucket ID and NFT token ID are the same.
        */
       function ERC721Token() external view returns (address);
   
       /**
        * @dev create a bucket and send cross-chain request from BSC to GNFD
        *
        * @param synPkg Package containing information of the bucket to be created
        */
       function createBucket(BucketStorage.CreateBucketSynPackage memory synPkg) external payable returns (bool);
   
       /**
        * @dev create a bucket and send cross-chain request from BSC to GNFD.
        * Callback function will be called when the request is processed.
        *
        * @param synPkg Package containing information of the bucket to be created.
        * @param callbackGasLimit The gas limit for callback function.
        * @param extraData Extra data for callback function.
        */
       function createBucket(
           BucketStorage.CreateBucketSynPackage memory synPkg,
           uint256 callbackGasLimit,
           CmnStorage.ExtraData memory extraData
       ) external payable returns (bool);

       /**
        * @dev delete a bucket and send cross-chain request from BSC to GNFD.
        *
        * @param id The bucket's id.
        */
       function deleteBucket(uint256 id) external payable returns (bool);

       /**
        * @dev delete a bucket and send cross-chain request from BSC to GNFD.
        * Callback function will be called when the request is processed.
        *
        * @param id The bucket's id.
        * @param callbackGasLimit The gas limit for callback function.
        * @param extraData Extra data for callback function.
        */
       function deleteBucket(uint256 id, uint256 callbackGasLimit, CmnStorage.ExtraData memory extraData) external payable returns (bool);

       /**
        * @dev Prepare the create bucket cross-chain msg data.
        * This function is used to assist with `MultiMessage`.
        *
        * @param sender The supposed msg sender of the cross-chain request.
        * @param synPkg Package containing information of the bucket to be created.
        *
        * @return (ChannelID, MsgBytes, RelayerFee, AckRelayerFee, SenderAddress).
        */
       function prepareCreateBucket(
           address sender,
           CreateBucketSynPackage memory synPkg
       ) external payable returns (uint8, bytes memory, uint256, uint256, address);
    
       /**
        * @dev Prepare the create bucket cross-chain msg data.
        * This function is used to assist with `MultiMessage`.
        *
        * @param sender The supposed msg sender of the cross-chain request.
        * @param synPkg Package containing information of the bucket to be created.
        * @param callbackGasLimit The gas limit for callback function
        * @param extraData Extra data for callback function.
        *
        * @return (ChannelID, MsgBytes, RelayerFee, AckRelayerFee, SenderAddress).
        */
       function prepareCreateBucket(
           address sender,
           CreateBucketSynPackage memory synPkg, 
           uint256 callbackGasLimit,
           CmnStorage.ExtraData memory extraData
       ) external payable returns (uint8, bytes memory, uint256, uint256, address);

       /**
        * @dev Prepare the delete bucket cross-chain msg data.
        * This function is used to assist with `MultiMessage`.
        *
        * @param sender The supposed msg sender of the cross-chain request.
        * @param id The bucket's id.
        *
        * @return (ChannelID, MsgBytes, RelayerFee, AckRelayerFee, SenderAddress).
        */
       function prepareDeleteBucket(
           address sender,
           uint256 id
       ) external payable returns (uint8, bytes memory, uint256, uint256, address);

       /**
        * @dev Prepare the delete bucket cross-chain msg data.
        * This function is used to assist with `MultiMessage`.
        *
        * @param sender The supposed msg sender of the cross-chain request.
        * @param id The bucket's id.
        * @param callbackGasLimit The gas limit for callback function
        * @param extraData Extra data for callback function.
        *
        * @return (ChannelID, MsgBytes, RelayerFee, AckRelayerFee, SenderAddress).
        */
       function prepareDeleteBucket(
           address sender,
           uint256 id,
           uint256 callbackGasLimit,
           ExtraData memory extraData
       ) external payable returns (uint8, bytes memory, uint256, uint256, address);
   }
   ```

**IObjectHub**

The `ObjectHub` contract provides the following interfaces to manage object on EVM-compatible chains, like BSC and opBNB, directly.

   ```solidity
   interface IObjectHub {
       /** 
        * @dev  Query the contract address of object NFT.
        * @return The contract address of object token.
        * Each object will be mapped as a NFT on BSC.
        * Object ID and NFT token ID are the same.
        */
       function ERC721Token() external view returns (address);

       /**
        * @dev delete a object and send cross-chain request from BSC to GNFD.
        *
        * @param id The object's id.
        */
       function deleteObject(uint256 id) external payable returns (bool);

       /**
        * @dev delete a object and send cross-chain request from BSC to GNFD.
        * Callback function will be called when the request is processed.
        *
        * @param id The object's id.
        * @param callbackGasLimit The gas limit for callback function.
        * @param extraData Extra data for callback function.
        */
       function deleteObject(uint256 id, uint256 callbackGasLimit, CmnStorage.ExtraData memory extraData) external payable returns (bool);
    
       /**
        * @dev Prepare the delete object cross-chain msg data.
        * This function is used to assist with `MultiMessage`.
        *
        * @param sender The supposed msg sender of the cross-chain request.
        * @param id The object's id.
        *
        * @return (ChannelID, MsgBytes, RelayerFee, AckRelayerFee, SenderAddress).
        */
       function prepareDeleteObject(
           address sender,
           uint256 id
       ) external payable returns (uint8, bytes memory, uint256, uint256, address);

       /**
        * @dev Prepare the delete object cross-chain msg data.
        * This function is used to assist with `MultiMessage`.
        *
        * @param sender The supposed msg sender of the cross-chain request.
        * @param id The object's id.
        * @param callbackGasLimit The gas limit for callback function
        * @param extraData Extra data for callback function.
        *
        * @return (ChannelID, MsgBytes, RelayerFee, AckRelayerFee, SenderAddress).
        */
       function prepareDeleteObject(
           address sender,
           uint256 id,
           uint256 callbackGasLimit,
           ExtraData memory extraData
       ) external payable returns (uint8, bytes memory, uint256, uint256, address);
   }
   ```

**IPermissionHub**

The `PermissionHub` contract provides the following interfaces to manage permission on EVM-compatible chains, like BSC and opBNB, directly.

   ```solidity
   interface IPermissionHub {
       /** 
        * @dev  Query the contract address of permission NFT.
        * @return The contract address of permission token.
        * Each permission policy will be mapped as a NFT on BSC.
        * Policy ID and NFT token ID are the same.
        */
       function ERC721Token() external view returns (address);

       /**
        * @dev delete a policy and send cross-chain request from BSC to GNFD.
        *
        * @param id The policy's id.
        */
       function deletePolicy(uint256 id) external payable returns (bool);
    
       /**
        * @dev delete a policy and send cross-chain request from BSC to GNFD.
        *
        * @param id The policy's id.
        * @param _extraData Extra data for callback function.
        */
       function deletePolicy(uint256 id, PermissionStorage.ExtraData memory _extraData) external payable returns (bool);

       /**
        * @dev create a policy and send cross-chain request from BSC to GNFD.
        *
        * @param data policy data encoded by protobuf.
        * @param _extraData Extra data for callback function.
        */
       function createPolicy(
           bytes calldata _data, 
           PermissionStorage.ExtraData memory _extraData
       ) external payable returns (bool);

       /**
        * @dev create a policy and send cross-chain request from BSC to GNFD.
        *
        * @param _data policy data encoded by protobuf.
        */
       function createPolicy(bytes calldata _data) external payable returns (bool);

       /**
        * @dev Prepare the create policy cross-chain msg data.
        * This function is used to assist with `MultiMessage`.
        *
        * @param sender The supposed msg sender of the cross-chain request.
        * @param _data policy data encoded by protobuf.
        *
        * @return (ChannelID, MsgBytes, RelayerFee, AckRelayerFee, SenderAddress).
        */
       function prepareCreatePolicy(
           address sender, 
           bytes calldata _data
       ) external payable returns (uint8, bytes memory, uint256, uint256, address);

       /**
        * @dev Prepare the create policy cross-chain msg data.
        * This function is used to assist with `MultiMessage`.
        *
        * @param sender The supposed msg sender of the cross-chain request.
        * @param _data policy data encoded by protobuf.
        * @param _extraData Extra data for callback function.
        *
        * @return (ChannelID, MsgBytes, RelayerFee, AckRelayerFee, SenderAddress).
        */
       function prepareCreatePolicy(
           address sender, 
           bytes calldata _data, 
           PermissionStorage.ExtraData memory _extraData
       ) external payable returns (uint8, bytes memory, uint256, uint256, address);

       /**
        * @dev Prepare the delete policy cross-chain msg data.
        * This function is used to assist with `MultiMessage`.
        *
        * @param sender The supposed msg sender of the cross-chain request.
        * @param id The policy's id.
        *
        * @return (ChannelID, MsgBytes, RelayerFee, AckRelayerFee, SenderAddress).
        */
       function prepareDeletePolicy(
           address sender, 
           uint256 id
       ) external payable returns (uint8, bytes memory, uint256, uint256, address);

       /**
        * @dev Prepare the delete policy cross-chain msg data.
        * This function is used to assist with `MultiMessage`.
        *
        * @param sender The supposed msg sender of the cross-chain request.
        * @param id The policy's id.
        * @param _extraData Extra data for callback function.
        *
        * @return (ChannelID, MsgBytes, RelayerFee, AckRelayerFee, SenderAddress).
        */
       function prepareDeletePolicy(
           address sender, 
           uint256 id, 
           PermissionStorage.ExtraData memory _extraData
       ) external payable returns (uint8, bytes memory, uint256, uint256, address);
   ```

**IMultiMessage**

`MultiMessage` provides aggregation capabilities to support the atomicity of composite operations. 

```solidity
interface IMultiMessage {
    function sendMessages(
        address[] calldata _targets,
        bytes[] calldata _data,
        uint256[] calldata _values
    ) external payable returns (bool);
}
```

**IGreenfieldExecutor**

Most native operations can be achieved by `GreenfieldExecutor`, like create payment account, deposit to payment account, withdraw from payment account, migrate bucket, cancel migrate bucket, update bucket info, toggle SP as delegated agent, set bucket flow ratelimit, copy object, update object info, set tag.                          

```solidity
interface IGreenfieldExecutor {
    function execute(uint8[] calldata _msgTypes, bytes[] calldata _msgBytes) external payable returns (bool);
}
```