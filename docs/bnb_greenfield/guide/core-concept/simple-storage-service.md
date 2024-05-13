---
title: Simple Storage Service
order: 5
---

# Simple Storage Service

Greenfield Simple Storage Service offers developers comparable API primitives and storage models to the AWS S3 cloud storage which is most utilized in Web2. 

## Features

### Storage Management

Greenfield has storage management features thart you can use to manage your resources, such as buckets, objects and groups. All the metadata of the resources are on-chain and can be only changed through transactions onto the greenfield blockchain. 

* Basic Operations - Create, Delete, Update, Delete, Get and List for buckets, objects and groups
* Miragte Bucket(**WIP**) - Users can easily migrate bucket to other Primary Storage Provider (PrimarySP) through a single transaction. For more information, please see [Bucket Migration](../greenfield-blockchain//modules/virtual-group.md#bucket-migration-workflow)

for more informations, see [Storage Module Design](../greenfield-blockchain/modules/storage-module.md).
  
### Permission Management

Greenfield Providers features for managing permissions to your buckets and objects. By default, Greenfield buckets and the objects in them are private. You only has the permissions to the resources you create. To grant granular resource permissions that support your specific use case of your resources, you can use the following features:

* Ownership - The bucket owner take ownership of every objects in his bucket.
* Public Access - If the bucket or object set to public, every one can access it but not modify it.
* Resource-Based Policy - The owner can configure resource-based permissions for his buckets and the objects in them.

for more information, see [Permission Module Design](../greenfield-blockchain/modules/permission.md).

## Keys

### Bucket
In Greenfield, a bucket is a virtual container for storing objects. Users must assign each bucket a unique name that
complies with DNS naming conventions, consisting of one or more labels separated by periods. It's crucial that the bucket
name be globally unique within the Greenfield namespace to prevent two buckets from sharing the same name. Here are the
bucket name rules for Greenfield:

* The bucket name should be between 3 (minimum) and 63 (maximum) characters in length.
* The bucket name should only include lowercase letters, numbers, dots (.), and hyphens (-).
* The bucket name should start and end with a letter or number.
* The bucket name should not have two consecutive periods.
* The bucket name should not be in the format of an IP address (e.g., 192.168.5.4).

Once a bucket has been created, objects can be uploaded to it using various methods such as the `gnfd` command line or the `SDKs`. 
Objects within a bucket can be organized and managed like folders (also called "prefixes"). 
Additionally, it's possible to assign a unique key (a string value) to each object within the bucket to distinguish it from other objects.

Every user account can create several buckets. The account will become the "owner" of the bucket.

Each bucket should be associated with its own Primary SP, and the payment accounts for Read and Store functions. The owner's
address will be the default payment account.

### Object

An object is a fundamental unit of storage in Greenfield, which represents a file consisting of data and its associated 
metadata. Each object is uniquely identified within a bucket by its object name (a string value). Here are the object
name rules for Greenfield:

* The object name should be between 1 (minimum) and 1024 (maximum) characters in length.
* The object name should only include UTF-8 characters.
* The object name should not include "./", "../", "//", "..", or "\\".
* The object name should not be "/".
* The object name should be free of patterns that could be exploited for SQL injection attacks.

While objects are commonly used to store files, they can contain any type of data, including text, 
images, videos, and program binaries.

Users can upload objects to Greenfield using various methods, including the `gnfd` command line and `SDKs`. They can also download, 
copy, or move objects in a similar way.

Objects in Greenfield have several important characteristics, including:
- name and ID
- owner
- bucket that hosts it
- size and timestamps
- content type
- checkSums for the storage pieces
- storage status
- associated SP information

Object metadata is stored with the bucket name as the prefix of the key. It is possible to iterate through all
objects under the same bucket, but it may be a heavy-lifting job for a large bucket with lots of objects.

### Group

A Group is a collection of accounts with the same permissions. Here are the group name rules for Greenfield:

* The group name should be between 3 (minimum) and 64 (maximum) characters in length.
* The group name should only include UTF-8 characters.

The group name is not allowed to be duplicated under the same user. However, a group can not create or own any resource.
A group can not be a member of another group either.

A resource can only have a limited number of groups associated with it for permissions. This ensures that the on-chain
permission check can be finished within a constant time.

### Group Member

A Group Member is an account that is associated with a group. A group member can be added to multiple groups.
Group Member has a expiration time which is set by the group owner. After the expiration time, the group member will still in the group, but the permission will be revoked.

### Resource-Based Policy

The user can use Resource-Based Policy to grant permissions to other accounts. Any resources, such as buckets, objects and groups, can associate several policy. Only the resource owner can put a policy which associate to a resource he owned. 

- A policy associate to a bucket can allow grantee to operate the bucket or the specific objects.
- A policy associate to a object/group can only allow to operator the object/group.

In the reousrce-based policy, the user can use wildcard characters Greenfield Resource Names(GRNS) and other values to grant permission to a subset of objects. For Example, the user can only allow the grantee to access to the objects that begin with a common prefix or end with a given extension, such as `.html`.


## Life Cycle
To store your data in Greenfield, the user should work with resources known as buckets and objects. A bucket is a container for objects, and an object is a file along with any metadata that describes that file.

To store an object in Greenfield, the user creates a bucket and then uploads the object to that bucket. Once the object is in the bucket, it can be opened, downloaded, and moved. When the user no longer needs an object or a bucket, they can clean up their resources.

### Bucket

- Create: Users send `CreateBucket` transactions to the blockchain, and the corresponding metadata will be created on the chain.
- Update: Users can modify Bucket-related metadata, such as payment accounts and quotas, by sending the `UpdateBucketInfo` transaction to the blockchain.
- Delete: Users send `DeleteBucket` transactions to the blockchain to delete the bucket, but they need to ensure that all objects in the bucket have been deleted.
- Migration: Users send `MigrateBucket ` transactions to the blockchain to migrate the bucket, and the corresponding bucket will be moved to the dest sp.

### Object

* Create: Users send `CreateObject` transactions to the blockchain, and the corresponding metadata will be created on the chain. The object is in the Created state.
* CancelCreate: Users send `CancelCreateObject` transactions to the blockchain to cancel the object, and the corresponding metadata will be deleted on the chain.
* Update: Users can modify Object-related metadata, such as visibility, by sending the `UpdateObjectInfo` transaction to the blockchain.
* Put: Users can use the `PutObject RESTful API` to interact with the SP and upload data to the primary SP.
* Seal: After the PrimarySP and secondary SPs store user data, the PrimarySP will send a `SealObject` transaction to the blockchain, and the status of the object will be updated to Sealed, indicating that the object has been successfully uploaded and can be accessed externally.
* RejectSeal: The PrimarySP can reject sealing the object for any reason by sending `RejectSealObject` transactions to the blockchain, and the corresponding metadata will be deleted on the chain.