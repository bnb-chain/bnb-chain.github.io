---
sidebar_label: Storage MetaData Models
sidebar_position: 2
hide_table_of_contents: false
---

# Storage MetaData Models

The basic data models for Greenfield storage are:

- [Bucket](#bucket)
- [Object](#object)
- [Group](#group)
- [Permission](#permission)

These metadata are stored as blockchain state into the persistent
storage of the Greenfield blockchain.

## Bucket

Bucket is the unit to group storage "**objects**". BucketName has to be
globally unique. Every user account can create a bucket. The account
will become the "**owner**" of the bucket.

Each bucket should be associated with its own Primary SP, and the payment accounts for Read and Store. The owner's address will be the default payment account.

## Object

Object is the basic unit to store data on Greenfield. The metadata for
the object will be stored on the Greenfield blockchain:

  - name and ID
  - owner
  - bucket that hosts it
  - size and timestamps
  - content type
  - checkSums for the storage pieces
  - storage status
  - associated SP information

Object metadata is stored with the bucket name as the prefix of the key.
It is possible to iterate through all objects under the same bucket, but
it may be a heavy-lifting job for a large bucket with lots of objects.

## Group

A Group is a collection of accounts with the same permissions. The group
name is not allowed to be duplicated under the same user. However, a
group **can not create or own** any resource. A group **can not be a
member** of another group either.

A resource can only have a limited number of groups associated with it
for permissions. This ensures that the on-chain permission check can be
finished within a constant time.

## Permission

Bucket, object, group are all resources (payment account is another type
of resource but is covered in the payment section later). Each resource
has a unique ID and the Permission Module uses these IDs to control how
the resources can be accessed.

### Ownership

The resources owner refers to the account that creates the resource. By
default, only the resource owner has permission to access its resources.

* The resource creator owns the resource.
* Each resource only has one owner and the ownership cannot be transferred once the resource is created.
* There are features that allow an address to "approve" another address to create and upload objects to be owned by the approver's address, as long as it is within limits.
* The owner or payment account of the owner pays for the resource.

### Permission Definitions

* **Ownership Permission:** By default, the owner has all permissions to the resource.

* **Public or Private Permission:** By default, the resource is ***private***, only the owner can access the resource. If a resource is ***public***, anyone can access it.

* **Shared Permission:** These permissions are managed by the permission module. It usually manages who has permission for which resources.

There are two types of permissions: **Single User Permission** and **Group User Permission**, which are stored in different formats in the blockchain state.

##### Single User Permission

- Bucket: `0x10 | ResouceID(Bucket) | Address(Grantee) ➝ Protobuf(PermissionInfo)`
- Object: `0x11 | ResouceID(Object) | Address(Grantee) ➝ Protobuf(PermissionInfo)`
- Group: `0x12 | ResouceID(Group) | Address(Grantee) ➝ Protobuf(PermissionInfo)`

```go
type permissionInfo struct {
  ActionList     []Action  // [GetObject,PutObject...]
  resourceList   []string  // optional，For prefix resource.
  Allow          Effect    // optional, For some scenarios where some permissions need to be prohibited
}
```

#### Group User Permission

- Bucket: `0x20 | ResouceID(Bucket)  ➝ Protobuf(GroupPermissionInfo)`
- Object: `0x21 | ResouceID(Object)  ➝ Protobuf(GroupPermissionInfo)`
- Group: `0x22 | ResouceID(Group)  ➝ Protobuf(GroupPermissionInfo)`

```go
type GroupPermissionInfo map[uint32]permissionInfo // groupID ➝ permissionInfo mapping, mapsize limit to 20?
```

### Permission Removal

Users can actively remove one or more permissions. However, when a
resource is deleted, its associated permissions should also be deleted,
perhaps not by the user taking the initiative to delete it, but by other
clean-up mechanisms. Because if too many accounts have permission to the
deleting object, it takes too much time to process within one
transaction handling.

### Examples

Typical permissions for the resources are listed below.

| Permission Type | Bucket                                     | Object                                | Group                                        |
| --------------- | ------------------------------------------ | ------------------------------------- | -------------------------------------------- |
| Write           | ✅ Allow PutObject                          | ❌                                     | ✅ Allow AddMember                            |
| Read            | ✅ Allow ListObject                         | ✅ Allow GetObject                     | ✅ Allow ListMember As a member of this group |
| Full Control    | ✅ Allow Put/ListObject, Allow DeleteBucket | ✅ Allow GetObject, Allow DeleteObject | ✅ Allow DeleteMember, Allow ListMember       |
| Execute         | ❌                                          | ✅ Allow Execute                       | ❌                                            |



Let's say Greenfield has two accounts, _Bob(0x1110)_ and _Alice(0x1111)_. A basic example scenario would be:

* Bob uploaded a picture named avatar.jpg into a bucket named "profile";

* Bob grants the GetObject action permission for the object avatar.jpg to Alice, it will store a key `0x11 | ResourceID(profile_avatar.jpg) | Address(Alice)` into a permission state tree.

* when Alice wants to read the avatar.jpg, the SP should check the Greenfield blockchain that whether the key `Prefix(ObjectPermission) | ResourceID(profile_avatar.jpg) | Address(Alice)` existed in the permission state tree, and whether the action list contains GetObject.

Let's move on to more complex scenarios:

* Bob created a bucket named "profile"
* Bob grants the PutObject action permission for the bucket "profile"
  to Alice, the key `0x10 | ResourceID(profile) | Address(Alice)`
  will be put into the permission state tree.
* When Alice wants to upload an object named `avatar.jpg` into the
  bucket profile, it creates a PutObject transaction and will be
  executed on the chain.
* The Greenfield blockchain needs to confirm that Alice has permission
  to operate, so it checks whether the key `0x10 |
  ResourceID(profile) | Address(Alice)` existed in the permission
  state tree and got the permission information if it existed.
* If the permission info shows that Alice has the `PutObject` action
  permission of the bucket profile, then she can do `PutObject` operation.

Another more complex scenario that contains groups:

* Bob creates a group named "**Games**", and creates a bucket named "**profile**".
* Bob adds Alice to the Games group, the key `0x12 | ResourceID(Games)
  | Address(Alice)` will be put into the permission state tree
* Bob put a picture `avatar.jpg` to the bucket `profile `and grants the
  `CopyObject` action permission to the group Games
* When Alice wants to copy the object `avatar.jpg`, First, Greenfield
  blockchain checks whether she has permission via the key `0x11 |
  ResourceID(avatar.jpg) | Address(Alice)`; if it is a miss,
  Greenfield will iterate all groups that the object `avatar.jpg`
  associates and check whether Alice is a member of one of these
  groups by checking, e.g. if the key `0x21 | ResourceID(group, e.g.
  Games)` existed, then iterate the `permissionInfo` map, and determine if Alice is in a group which has the permission to do `CopyObject` operation via the key `0x12| ResourceID(Games) | Address(Alice)`

