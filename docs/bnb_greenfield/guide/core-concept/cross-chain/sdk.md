# Smart Contract SDK

The [Smart Contract SDK](https://github.com/bnb-chain/greenfield-contracts-sdk),
designed to facilitate the development of community-driven projects. The SDK serves as an upper layer wrapper for the
[Greenfield-Contracts](https://github.com/bnb-chain/greenfield-contracts) library, which implements the cross-chain
communication functionality. By providing a user-friendly interface to the underlying interface, the SDK simplifies the
development process and enables developers to create and manage a variety of greenfield resources, like bucket,
group, and object on EVM-compatible chains, like BSC and opBNB, through smart contract directly.

The SDK is organized into four primary parts: `BaseApp`, `BucketApp`, `ObjectApp`, and `GroupApp`.
These components serve as the building blocks for developers. The `BaseApp` serves as the foundation for the other three
components, providing common functions required by the `BucketApp`, `ObjectApp`, and `GroupApp`.

The `BucketApp` is responsible for managing bucket-related operations, while the `ObjectApp` handles object-related actions.
The `GroupApp`, being the most complex of the four, is designed to handle group-related operations.

Each of these components is equipped with unique functions and virtual functions that can be implemented to suit specific project needs.

### Components

1. **BaseApp:** Contains common functions used by the other components, as well as three virtual functions that need to be implemented for specific project requirements.
2. **BucketApp:** A specialized module designed to handle bucket-related operations, such as creating and deleting buckets, and processing bucket resource calls.
3. **ObjectApp:** A specialized module focused on object-related operations, specifically object deletion since creating objects from EVM-compatible chains is not supported.
4. **GroupApp:** A more complex module that handles group-related operations, such as creating, deleting, and updating groups, and managing group resource calls.

### BaseApp

The BaseApp contains common functions that are shared by BucketApp, ObjectApp, and GroupApp.
These functions are essential for setting up and managing the environment for cross-chain operations.
The BaseApp provides the following core functions:

1. `_getTotalFee():` This function returns the total value required to send a cross-chain package.
2. `Setters:` There are several setters available for configuring various aspects of the smart contract, such as:
   - `callbackGasLimit`: Sets the gas limit for the callback function.
   - `refundAddress`: Sets the address to which refunds should be sent.
   - `failureHandleStrategy`: Sets the strategy for handling failures during the execution of the smart contract.

In addition to these functions, BaseApp provides three virtual functions:

1. `greenfieldCall(uint32 status, uint8 resourceType, uint8 operationType, uint256 resourceId, bytes calldata callbackData):`
   This function is a callback hook designed to handle cross-chain response. It is a virtual function that needs to be
   implemented by developers to define custom behaviors for different types of resources and operation types.
   This function is triggered when a cross-chain operation is completed on greenfield side and return a package to EVM-compatible chains,
   allowing developers to execute specific actions or update states in response to the completion of an operation.
   If the developers don’t need callback, this function(as well as other callback related functions) can be undefined.
2. `retryPackage(uint8 resourceType):` This function handles the retry mechanism for a package, based on its resource
   type. Developers should implement this function to define the behavior when a package needs to be retried.
3. `skipPackage(uint8 resourceType):` This function allows for skipping a package, based on its resource type.
   Developers should implement this function to define the behavior when a package needs to be skipped.

By implementing these virtual functions, developers can customize the behavior of their smart contracts to meet their
specific requirements. With the BaseApp component, developers have a solid foundation on which to build their smart
contract applications using `BucketApp`, `ObjectApp`, and `GroupApp`.

### BucketApp

The BucketApp component is a specialized module designed to handle bucket-related operations in the smart contract SDK.
This component offers a range of functions to create, delete, and manage buckets, as well as to route and handle
various bucket resource operations. Below, we provide a detailed overview of the functions included in the BucketApp:

1. `_bucketGreenfieldCall(uint32 status, uint8 operationType, uint256 resourceId, bytes calldata callbackData)`: This function serves as a router for bucket resource callback. It processes and directs the call based on the provided parameters.
2. `_retryBucketPackage()`: This function retries a failed bucket resource package.
3. `_skipBucketPackage()`: This function skips a failed bucket resource package.
4. `_createBucket(address _creator, string memory _name, BucketStorage.BucketVisibilityType _visibility, address _paymentAddress, address _spAddress, uint256 _expireHeight, bytes calldata _sig, uint64 _chargedReadQuota)`: This function sends a create bucket cross-chain request to greenfield without a callback. It takes various parameters, such as creator, name, visibility type, charged read quota, service provider address, expire height, and signature.
5. `_createBucket(address _creator, string memory _name, BucketStorage.BucketVisibilityType _visibility, address _paymentAddress, address _spAddress, uint256 _expireHeight, bytes calldata _sig, uint64 _chargedReadQuota, address _refundAddress, PackageQueue.FailureHandleStrategy _failureHandleStrategy, bytes memory _callbackData, uint256 _callbackGasLimit)`: This function sends a create bucket cross-chain request to greenfield with a callback. It takes the same parameters as the previous function, along with some additional parameters for the callback.
6. `_deleteBucket(uint256 _tokenId)`: This function sends a delete bucket cross-chain request to greenfield without a callback, using the provided token ID.
7. `_deleteBucket(uint256 _tokenId, address _refundAddress, PackageQueue.FailureHandleStrategy _failureHandleStrategy, bytes memory _callbackData, uint256 _callbackGasLimit)`: This function sends a delete bucket cross-chain request to greenfield with a callback, using the provided token ID and callback data.

In addition to these functions, the BucketApp provides two virtual functions:

1. `_createBucketCallback(uint32 _status, uint256 _tokenId, bytes memory _callbackData)`: Developers can implement this function to define the behavior for the create bucket callback. The function receives the status, token ID, and callback data as parameters.
2. `_deleteBucketCallback(uint32 _status, uint256 _tokenId, bytes memory _callbackData)`: Developers can implement this function to define the behavior for the delete bucket callback. The function receives the status, token ID, and callback data as parameters.

By implementing these virtual functions, developers can tailor the BucketApp component to suit their specific bucket-related operations and handle the corresponding callbacks as needed.

### ObjectApp

The ObjectApp component is a specialized module designed to handle object-related operations in the smart contract SDK.
This component offers a range of functions to manage objects and process object resource operations. However, please
note that creating objects from EVM-compatible chains is currently not supported. Below, we provide a detailed overview of the functions
included in the ObjectApp:

1. `_objectGreenfieldCall(uint32 status, uint8 operationType, uint256 resourceId, bytes calldata callbackData)`: This function serves as a router for object resource callback. It processes and directs the call based on the provided parameters.
2. `_retryObjectPackage()`: This function retries a failed object resource package.
3. `_skipObjectPackage()`: This function skips a failed object resource package.
4. `_deleteObject(uint256 _tokenId)`: This function deletes an object using the provided token ID. As creating objects from EVM-compatible chains is not supported, the ObjectApp focuses on deletion operations.
5. `_deleteObject(uint256 _tokenId, address _refundAddress, PackageQueue.FailureHandleStrategy _failureHandleStrategy, bytes memory _callbackData, uint256 _callbackGasLimit)`: This function deletes an object with a callback, using the provided token ID and callback data.

In addition to these functions, the ObjectApp provides one virtual function:

1. `_deleteObjectCallback(uint32 _status, uint256 _tokenId, bytes memory _callbackData)`: Developers need to implement
   this function to define the behavior for the delete object callback. The function receives the status, token ID,
   and callback data as parameters.

By implementing this virtual function, developers can customize the ObjectApp component to handle object deletion
operations and manage the corresponding callbacks as needed.

### GroupApp

The GroupApp component is a specialized module designed to handle group-related operations in the smart contract SDK.
This component is more complex compared to the BucketApp and ObjectApp, as it offers a range of functions to create,
delete, update, and manage groups. Below, we provide a detailed overview of the functions included in the GroupApp:

1. `_groupGreenfieldCall(uint32 status, uint8 operationType, uint256 resourceId, bytes calldata callbackData)`: This function serves as a router for group resource callback. It processes and directs the call based on the provided parameters.
2. `_retryGroupPackage()`: This function retries a failed group resource package.
3. `_skipGroupPackage()`: This function skips a failed group resource package.
4. `_createGroup(address _owner, string memory _groupName)`: This function creates a new group with the provided owner address and group name.
5. `_createGroup(address _refundAddress, PackageQueue.FailureHandleStrategy _failureHandleStrategy, address _owner, string memory _groupName, bytes memory _callbackData, uint256 _callbackGasLimit)`: This function creates a new group with a callback, using the provided owner address, group name, and callback data.
6. `_deleteGroup(uint256 _tokenId)`: This function deletes a group using the provided token ID.
7. `_deleteGroup(uint256 _tokenId, address _refundAddress, PackageQueue.FailureHandleStrategy _failureHandleStrategy, bytes memory _callbackData, uint256 _callbackGasLimit)`: This function deletes a group with a callback, using the provided token ID and callback data.
8. `_updateGroup(address _owner, uint256 _tokenId, uint8 _opType, address[] memory _members, uint64[] memory _expiration)`: This function updates a group based on the provided owner address, token ID, operation type, and an array of member addresses.
9. `_updateGroup(address _owner, uint256 _tokenId, uint8 _opType, address[] memory _members, uint64[] memory _expiration, address _refundAddress, PackageQueue.FailureHandleStrategy _failureHandleStrategy, bytes memory _callbackData, uint256 _callbackGasLimit)`: This function updates a group with a callback, using the provided owner address, token ID, operation type, an array of member addresses, and callback data.

In addition to these functions, the GroupApp provides three virtual functions:

1. `_createGroupCallback(uint32 _status, uint256 _tokenId, bytes memory _callbackData)`: Developers need to implement this function to define the behavior for the create group callback. The function receives the status, token ID, and callback data as parameters.
2. `_deleteGroupCallback(uint32 _status, uint256 _tokenId, bytes memory _callbackData)`: Developers need to implement this function to define the behavior for the delete group callback. The function receives the status, token ID, and callback data as parameters.
3. `_updateGroupCallback(uint32 _status, uint256 _tokenId, bytes memory _callbackData)`: Developers need to implement this function to define the behavior for the update group callback. The function receives the status, token ID, and callback data as parameters.

By implementing these virtual functions, developers can customize the GroupApp component to suit their specific
group-related operations and handle the corresponding callbacks as needed.
