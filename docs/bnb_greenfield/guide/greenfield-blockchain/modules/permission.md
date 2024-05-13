---
title: Permission
order: 4
---

# Permission

The permission module serves as the foundation for basic permission control management in the Greenfield Storage Network.

All data resources, such as objects, buckets, payment accounts, and groups, require specific permissions to be accessed. 
These authorizations dictate the actions that can be taken by each account.

**Note**: Groups are collections of accounts that share the same permissions, allowing them to be handled as a single entity.

Examples of permissions include:

* Put, List, Get, Delete, Copy, and Execute data objects;
* Create, Delete, and List buckets
* Create, Delete, ListMembers, Leave groups
* Create, Associate payment accounts
* Grant, Revoke the above permissions

These permissions are linked to both the data resources and the accounts or groups authorized to access them. 
The group definitions are publicly stored on the Greenfield blockchain, and are currently in plain text. 
However, a privacy mode utilizing Zero Knowledge Proof technology is planned for future implementation.

Notably, permission operations can be directly executed from BSC, whether through smart contracts or an EOA, further enhancing their convenience.

Overall, the interface semantics of the permission module are similar to S3.

## Concepts

### Terminology

- **Resources**: Buckets, objects, and groups are the primary resources within the Greenfield network that require 
permission authorization. These resources are identified through the Greenfield Resource Name (GRN) in policies.
- **Actions**: Each resource within Greenfield has a designated set of operations that can be performed on it. To specify which actions are allowed or denied, an action enum value must be provided.
- **Principals**: Accounts or groups that are granted permission to access specific resources and actions can be identified in the policy.
- **Statements**: Policies outline the specific details of permissions, including the Effect, ActionList, and Resources.
- **Effect**: The Effect sets the outcome when a user requests a particular action, and can be configured as either allow or deny.

### Resource

Greenfield utilizes resources, which are the main entities that can be manipulated. 
Buckets, objects, and groups are all considered resources, and each has its own set of subresources.

Bucket subresources consist of the following:

- **BucketInfo**: Allows for modification of specific fields in a bucket, such as `IsPublic`, `ReadQuota`, `paymentAccount`, etc;
- **Policy**: Stores permissions information for the bucket;
- **Objects**: Every object must be stored within a bucket;
- **Object ownership**: Newly uploaded objects are automatically transferred to the bucket owner, regardless of who uploaded them.


Object subresources consist of the following:

- **ObjectInfo**: Allows for modification of certain fields within an object, such as `IsPublic`, etc;
- **Policy**: Stores access permissions information for the object.

Group subresources consist of the following:

- **GroupInfo**: Allows for modification of specific fields within a group, such as members, user-meta, etc;
- **Policy**: Stores access permissions information for the group;
- **GroupMember**: Any account in Greenfield has the ability to join a group, but a group cannot become a member of another group; expiration time can be set for group membership if the member is expired the permission will be revoked.

### Ownership

The resources owner refers to the account that creates the resource. By default, only the resource owner has the permission
to access its resources.

- The resource creator owns the resource.
- Each resource only has one owner and the ownership cannot be transferred once the resource is created.
- There are features that allow an account to "approve" another account to create and upload objects to be owned by the approver, as long as it is within limits.
- The owner or payment account of the owner pays for the resource.


### Definitions

- **Ownership Permission**: By default, the owner has all permissions on the resource.
- **Public or Private Permission**: By default, the resource is private, only the owner can access the resource. If a resource is public, anyone can access it.
- **Shared Permission**: These permissions are managed by the permission module. It usually manages who has permission for which resources.

There are two types of shared permissions: Single Account Permission and Group Permission, which are stored in 
different formats in the blockchain state.

### Revoke

Users can assign one or more permissions as needed. However, when a resource is deleted, its associated permissions 
should also be removed, even if the user does not initiate the deletion – this can be managed through clean-up mechanisms. 
If too many accounts have permission to delete an object, the processing time required may become excessively lengthy for 
a single transaction to handle.

### Examples

Let's say Greenfield has two accounts, Bob(0x1110) and Alice(0x1111). A basic example scenario would be:

* Bob uploaded a picture named `avatar.jpg` into a bucket named "profile";
* Bob grants the `GetObject` action permission for the object `avatar.jpg` to Alice, it will store a `key 0x11 | ResourceID(
profile_avatar.jpg) | Address(Alice)` into a permission state tree;
* when Alice wants to read the `avatar.jpg`, the SP should check the Greenfield blockchain that whether the `key Prefix(
ObjectPermission) | ResourceID(profile_avatar.jpg) | Address(Alice)` existed in the permission state tree, and whether
the action list contains GetObject.

Let's move on to more complex scenarios:

* Bob created a bucket named "profile";
* Bob grants the `PutObject` action permission for the bucket "profile" to Alice, the key `0x10 | ResourceID(profile) |
Address(Alice)` will be put into the permission state tree;
* When Alice wants to upload an object named `avatar.jpg` into the bucket profile, it creates a `PutObject` transaction and
will be executed on the chain;
* The Greenfield blockchain needs to confirm that Alice has permission to operate, so it checks whether the key `0x10 |
ResourceID(profile) | Address(Alice)` existed in the permission state tree and got the permission information if it
existed;
* If the permission info shows that Alice has the `PutObject` action permission of the bucket profile, then she can do
`PutObject` operation.

Another more complex scenario that contains groups:

* Bob creates a group named "Games", and creates a bucket named "profile".
* Bob adds Alice to the Games group, the `key 0x12 | ResourceID(Games) | Address(Alice)` will be put into the permission
state tree
* Bob put a picture `avatar.jpg` to the bucket profile and grants the `CopyObject` action permission to the group Games
* When Alice wants to copy the object avatar.jpg . First, Greenfield blockchain checks whether she has permission via the
`key 0x11 | ResourceID(avatar.jpg) | Address(Alice)`; if it is a miss, Greenfield will iterate all groups that the object
`avatar.jpg `associates and check whether Alice is a member of one of these groups by checking, e.g. if the 
`key 0x21 | ResourceID(group, e.g. Games)` existed, then iterate the `permissionInfo` map, and determine if Alice is in a group which
has the permission to do `CopyObject` operation via the key `0x12| ResourceID(Games) | Address(Alice)`

## State

The permission module keeps state of the following primary objects:

1. `Policy`: The owner account of the resource grant its specify permission to another account;
2. `PolicyGroup`: A limited list of `Policy`, and each `Policy` items defines the owner account of the resource grant
   its specify permission to a group.

These primary objects should be primarily stored and accessed by the `ID` which is an auto-incremented sequence. An
additional indices are maintained per primary objects in order to compatibility with the S3 object storage.

* BucketPolicyForAccount: `0x11 | BigEndian(BucketID) | AccAddress -> BigEndian(PolicyID)`
* ObjectPolicyForAccount: `0x12 | BigEndian(ObjectID) | AccAddress -> BigEndian(PolicyID)`
* GroupPolicyForAccount: `0x13 | BigEndian(GroupID) | AccAddress -> BigEndian(PolicyID)`
* BucketPolicyForGroup: `0x21 | BigEndian(BucketID) -> ProtoBuf(PolicyGroup)`
* ObjectPolicyForGroup: `0x22 | BigEndian(ObjectID) -> ProtoBuf(PolicyGroup)`
* PolicyByID: `0x31 | BigEndian(PolicyID) -> ProtoBuf(Policy)`

### Policy

```protobuf
message Policy {
  string id = 1 [
    (cosmos_proto.scalar) = "cosmos.Uint",
    (gogoproto.customtype) = "Uint",
    (gogoproto.nullable) = false
  ];
  permission.Principal principal = 2;
  resource.ResourceType resource_type = 3;
  string resource_id = 4 [
    (cosmos_proto.scalar) = "cosmos.Uint",
    (gogoproto.customtype) = "Uint",
    (gogoproto.nullable) = false
  ];
  repeated permission.Statement statements = 5;
  permission.Statement member_statement = 6;
}
```

### PolicyGroup

Each resource can only grant permissions to a limited number of groups and limited number is defined
by `MaximumGroupNum` in module params.

```protobuf
message PolicyGroup {
  message Item {
    string policy_id = 1 [
      (cosmos_proto.scalar) = "cosmos.Uint",
      (gogoproto.customtype) = "Uint",
      (gogoproto.nullable) = false
    ];
    string group_id = 2 [
      (cosmos_proto.scalar) = "cosmos.Uint",
      (gogoproto.customtype) = "Uint",
      (gogoproto.nullable) = false
    ];
  }
  repeated Item items = 1;
}
```

### params

```protobuf
// Params defines the parameters for the module.
message Params {
  option (gogoproto.goproto_stringer) = false;

  uint64 maximum_statements_num = 1;
  uint64 maximum_group_num = 2;
}
```

## Message

> Notice: Permission-related messages are defined in the storage module

### PutPolicy

Used to create a policy for a resource.

```protobuf
message MsgPutPolicy {
  option (cosmos.msg.v1.signer) = "operator";

  // operator defines the granter who grant the permission to another principal
  string operator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];

  // Principal define the roles that can be grant permissions to. Currently, it can be account or group.
  permission.Principal principal = 2;

  // resource define a greenfield standard resource name that can be generated by GRN structure
  string resource = 3;

  // statements define a list of individual statement which describe the detail rules of policy
  repeated permission.Statement statements = 4;

   // expiration_time defines the whole expiration time of all the statements.
   // Notices: Its priority is higher than the expiration time inside the Statement
   google.protobuf.Timestamp expiration_time = 5 [
      (gogoproto.stdtime) = true,
      (gogoproto.nullable) = true
   ];
}
```

### DeletePolicy

Used to delete the policy that is associated with an account, group, and resource.

```protobuf
message MsgDeletePolicy {
  option (cosmos.msg.v1.signer) = "operator";

  // operator defines the granter who grant the permission to another principal
  string operator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];

  // Principal define the roles that can be grant permissions to. Currently, it can be account or group.
  permission.Principal principal = 2;

  // resource define a greenfield standard resource name that can be generated by GRN structure
  string resource = 3;
}
```
