---
title: Primitive Interfaces

---

# Primitive Interfaces

This document give a detailed introduction of cross-chain primitives that have been defined on EVM-compatible chains to enable developers to manage greenfield resources on the EVM-compatible chains directly.

The [Greenfield-Contracts Repo](https://github.com/bnb-chain/greenfield-contracts) is the underlying backbone of the
cross chain communication protocol. It is responsible for implementing the core cross-chain communication functionality that enables seamless interaction between Greenfield and EVM-compatible chains, like BSC and opBNB. The library handles the complexities of cross-chain operations, ensuring secure and efficient communication.

During the development process, developers are most likely to interact with the following contracts: `CrossChain`, `BucketHub`, `ObjectHub` and `GroupHub`. 
They provide the following interfaces respectively:

**ICrossChain**

Additional fees need to be paid to the relayer during the cross-chain process, and the latest value can be obtained through the `CrossChain` contract.
   ```solidity
   interface ICrossChain {
       /** @dev Query relayFee and minAckRelayFee. 
        * @return relayFee, the fee required for the relayer to relay the package to GNFD.
        * @return minAckRelayFee, the minimum fee required for the relayer to circulate the ACK package to BSC.
        * The caller will need to pay no less than this [relayFee+minAckRelayFee] to send the cross-chain request.
        */
       function getRelayFees() external returns (uint256 relayFee, uint256 minAckRelayFee);
   
       /** @dev Query the latest callback gas price.
        * @return If the dapp contract has a callback function, the caller will need to pay extra [gas price * callback gas limit] fee 
        * when the caller send the initial cross-chain request.
        */
       function callbackGasPrice() external returns (uint256);
   }
   ```

**IGroupHub**

The `GroupHub` contract provides the following interfaces to manage Group on BSC/opBNB directly.

   ```solidity
   interface IGroupHub {
       /** 
        * @dev  Query the contract address of group NFT
        * @return The contract address of group token
        * Each group will be mapped as a NFT on BSC.
        * Group ID and NFT token ID are the same.
        */
       function ERC721Token() external view returns (address);
      /** 
        * @dev  Query the contract address of member NFT
        * @return The contract address of member token
        * The member inside a group  will be mapped as a ERC1155 token on BSC.
        * The ID of the ERC1155 token is same with the group ID.
        */
       function ERC1155Token() external view returns (address);

      /**
        * @dev create a group and send cross-chain request from BSC to GNFD
        *
        * @param creator The group's owner
        * @param name The group's name
        */
       function createGroup(address creator, string memory name) external payable returns (bool);
   
      /**
        * @dev create a group and send cross-chain request from BSC to GNFD.
        * Callback function will be called when the request is processed.
        *
        * @param creator The group's owner
        * @param name The group's name
        * @param callbackGasLimit The gas limit for callback function
        * @param extraData Extra data for callback function. The `appAddress` in `extraData` will be ignored.
        * It will be reset as the `msg.sender` all the time.
        */
       function createGroup(
           address creator,
           string memory name,
           uint256 callbackGasLimit,
           CmnStorage.ExtraData memory extraData
       ) external payable returns (bool);
   
       /**
        * @dev delete a group and send cross-chain request from BSC to GNFD
        *
        * @param id The group's id
        */
       function deleteGroup(uint256 id) external payable returns (bool);
   
       /**
        * @dev delete a group and send cross-chain request from BSC to GNFD
        * Callback function will be called when the request is processed.
        *
        * @param id The group's id
        * @param callbackGasLimit The gas limit for callback function
        * @param extraData Extra data for callback function. The `appAddress` in `extraData` will be ignored.
        * It will be reset as the `msg.sender` all the time.
        */
       function deleteGroup(uint256 id, uint256 callbackGasLimit, CmnStorage.ExtraData memory extraData) external payable returns (bool);

       /**
        * @dev update a group's member and send cross-chain request from BSC to GNFD
        *
        * @param synPkg Package containing information of the group to be updated
        */
       function updateGroup(GroupStorage.UpdateGroupSynPackage memory synPkg) external payable returns (bool);
   
       /**
        * @dev update a group's member and send cross-chain request from BSC to GNFD
        * Callback function will be called when the request is processed.
        *
        * @param synPkg Package containing information of the group to be updated
        * @param callbackGasLimit The gas limit for callback function
        * @param extraData Extra data for callback function. The `appAddress` in `extraData` will be ignored.
        * It will be reset as the `msg.sender` all the time.
        */
       function updateGroup(
           GroupStorage.UpdateGroupSynPackage memory synPkg,
           uint256 callbackGasLimit,
           CmnStorage.ExtraData memory extraData
       ) external payable returns (bool);
   }
   ```

**IBucketHub**

The `BucketHub` contract provides the following interfaces to manage bucket on EVM-compatible chains, like BSC and opBNB, directly.
   ```solidity
   interface IBucketHub {
      /** 
        * @dev  Query the contract address of bucket NFT
        * @return The contract address of bucket token
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
        * @param synPkg Package containing information of the bucket to be created
        * @param callbackGasLimit The gas limit for callback function
        * @param extraData Extra data for callback function. The `appAddress` in `extraData` will be ignored.
        * It will be reset as the `msg.sender` all the time.
        */
       function createBucket(
           BucketStorage.CreateBucketSynPackage memory synPkg,
           uint256 callbackGasLimit,
           CmnStorage.ExtraData memory extraData
       ) external payable returns (bool);

      /**
        * @dev delete a bucket and send cross-chain request from BSC to GNFD
        *
        * @param id The bucket's id
        */
       function deleteBucket(uint256 id) external payable returns (bool);

      /**
        * @dev delete a bucket and send cross-chain request from BSC to GNFD.
        * Callback function will be called when the request is processed.
        *
        * @param id The bucket's id
        * @param callbackGasLimit The gas limit for callback function
        * @param extraData Extra data for callback function. The `appAddress` in `extraData` will be ignored.
        * It will be reset as the `msg.sender` all the time.
        */
       function deleteBucket(uint256 id, uint256 callbackGasLimit, CmnStorage.ExtraData memory extraData) external payable returns (bool);
   }
   ```

**IObjectHub**

The `ObjectHub` contract provides the following interfaces to manage object on EVM-compatible chains, like BSC and opBNB, directly.

   ```solidity
   interface IObjectHub {
       /** 
        * @dev  Query the contract address of object NFT
        * @return The contract address of object token
        * Each object will be mapped as a NFT on BSC.
        * Object ID and NFT token ID are the same.
        */
       function ERC721Token() external view returns (address);

      /**
       * @dev delete a object and send cross-chain request from BSC to GNFD
       *
       * @param id, the Id of the object
       */
       function deleteObject(uint256 id) external payable returns (bool);
      /**
       * @dev delete a object and send cross-chain request from BSC to GNFD
       * Callback function will be called when the request is processed
       *
       * @param id, the Id of the object
       * @param callbackGasLimit The gas limit for callback function
       * @param extraData Extra data for callback function. The `appAddress` in `extraData` will be ignored.
       * It will be reset as the `msg.sender` all the time
       */
       function deleteObject(uint256 id, uint256 callbackGasLimit, CmnStorage.ExtraData memory extraData) external payable returns (bool);
   }
   ```

**IPermissionHub**

The `PermissionHub` contract provides the following interfaces to manage permission on EVM-compatible chains, like BSC and opBNB, directly.

   ```solidity
   interface IPermissionHub {
    /** 
     * @dev  Query the contract address of permission NFT
     * @return The contract address of permission token
     * Each permission policy will be mapped as a NFT on BSC.
     * Policy ID and NFT token ID are the same.
     */
    function ERC721Token() external view returns (address);

    /**
     * @dev delete a policy and send cross-chain request from BSC to GNFD
     *
     * @param id The policy id
     */
    function deletePolicy(uint256 id) external payable returns (bool);
    
    /**
     * @dev delete a policy and send cross-chain request from BSC to GNFD
     *
     * @param id The policy id
     * @param _extraData Extra data for callback function. The `appAddress` in `extraData` will be ignored.
     */
    function deletePolicy(uint256 id, PermissionStorage.ExtraData memory _extraData) external payable returns (bool);

    /**
     * @dev create a policy and send cross-chain request from BSC to GNFD
     *
     * @param data policy data encoded by protobuf
     * @param _extraData Extra data for callback function. The `appAddress` in `extraData` will be ignored.
     */
    function createPolicy(
        bytes calldata _data,
        PermissionStorage.ExtraData memory _extraData
    ) external payable returns (bool);

    /**
     * @dev create a policy and send cross-chain request from BSC to GNFD
     *
     * @param data policy data encoded by protobuf
     */
    function createPolicy(bytes calldata _data) external payable returns (bool);
   }
   ```

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
