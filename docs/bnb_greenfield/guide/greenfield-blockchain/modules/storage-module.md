---
title: Storage Module
order: 1
---

# Storage Module

## Concepts

### Bucket

A bucket serves as a logical container for storing objects in Greenfield. Each bucket is assigned a unique name by the user at the time of creation. It's essential that bucket names be globally unique within the Greenfield namespace to avoid duplication of names. Additionally, bucket names must conform to DNS naming conventions, consisting of one or more labels separated by periods.

Objects can be uploaded to a bucket using various methods, such as the gnfd cmd or SDKs, after the bucket has been created. Objects within a bucket can be organized and managed like folders, also referred to as "prefixes". Besides, each object is assigned a unique key (a string value) to identify it within the bucket.

Each user account can create multiple buckets, with the account owning each created bucket. Every bucket should have its Primary SP associated with it, along with payment accounts for Read and Store. The owner's address will be the default payment account.

### Object

An object represents a fundamental unit of storage in Greenfield, consisting of both data and associated metadata. Each object has a unique name (a string value) within a bucket, identifying it.

Although objects are primarily used to store files in Greenfield, they can contain any data type, including text, images, videos, and program binaries. Users can upload, download, copy, or move objects using various methods such as the gnfd cmd and SDKs.

Objects in Greenfield have several critical features, including their name and ID, owner, hosting bucket, size and timestamps, content type, checkSums for storage pieces, storage status, and associated SP information. Object metadata is stored using the bucket name as its prefix, allowing iteration through all objects within the same bucket. However, doing so for a large bucket with numerous objects may require considerable effort.

Objects in Greenfield have several important characteristics, including:
- name and ID
- owner
- bucket that hosts it
- size and timestamps
- content type
- checkSums for the storage pieces
- storage status
- associated SP information
- tags

## Group

A Group is a collection of accounts that share the same permissions. The group name cannot be duplicated under the same user. However, a group cannot create or own any resources, nor can it be a member of another group.

To ensure that the on-chain permission check can be completed within a constant time, only a limited number of groups can be associated with a resource for permissions.

## State

The storage module keeps state of the following primary objects:

* BucketInfo

https://github.com/bnb-chain/greenfield/blob/v1.0.0/proto/greenfield/storage/types.proto#L14C1-L41C2

* ObjectInfo:

https://github.com/bnb-chain/greenfield/blob/v1.0.0/proto/greenfield/storage/types.proto#L54C4-L87

* GroupInfo

https://github.com/bnb-chain/greenfield/blob/v1.0.0/proto/greenfield/storage/types.proto#L89-L104

The primary objects are intended to be stored and accessed mainly using the auto-incremented sequence `ID`. 
However, additional indices are also maintained for each primary object to ensure compatibility with the S3 object storage.

* BucketInfo: `0x11 | hash(bucketName) -> BigEndian(bucketId)`
* ObjectInfo: `0x12 | hash(bucketName)_hash(objectName) -> BigEndian(objectId)`
* GroupInfo: `0x13 | OwnerAddr_hash(groupName) -> BigEndian(groupId)`

* BucketInfoById: `0x21 | BigEndian(bucketId) -> ProtoBuf(BucketInfo)`
* ObjectInfoById: `0x22 | BigEndian(objectId) -> ProtoBuf(ObjectInfo)`
* GroupInfoById: `0x23 | BigEndian(groupId) -> ProtoBuf(GroupInfo)`

### Params

The storage module contains the following parameters,
they can be updated with governance.

| name                      | default value | meaning                                                                                                                                                                              |
|---------------------------|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| MaxSegmentSize            | 16M           | The maximum size of the segment. The payload data of an object will split into several segment. Only the size of the last segment can be less than MaxSegmentSize, others is equals. |
| RedundantDataChunkNum     | 4             | The number of the data chunks in Erasure-Code algorithm.                                                                                                                             |
| RedundantParityChunkNum   | 2             | The number of the parity chunks in Erasure-Code algorithm.                                                                                                                           |
| MaxPayloadSize            | 32G           | The maximum size of the payload data that allowed in greenfield storage network.                                                                                                     |
| MinChargeSize             | 128KB         | The minimum charge size of the payload, objects smaller than this size will be charged as this size                                                                                  |
| MaxBucketsPerAccount      | 100           | The maximum number of buckets that can be created per account                                                                                                                        |

## Messages

In this section, we'll list out the various messages that are associated with storage modules.

### MsgCreateBucket

Used to create a new bucket. Buckets are used to contain storage objects.

```protobuf
message MsgCreateBucket {
  option (cosmos.msg.v1.signer) = "creator";

  // creator defines the account address of bucket creator, it is also the bucket owner.
  string creator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // bucket_name defines a globally unique name of bucket
  string bucket_name = 2;
  // visibility means the bucket is private or public. if private, only bucket owner or grantee can read it,
  // otherwise every greenfield user can read it.
  VisibilityType visibility = 3;
  // payment_address defines an account address specified by bucket owner to pay the read fee. Default: creator
  string payment_address = 4 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // primary_sp_address defines the address of primary sp.
  string primary_sp_address = 5 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // primary_sp_approval defines the approval info of the primary SP which indicates that primary sp confirm the user's request.
  common.Approval primary_sp_approval = 6;
  // charged_read_quota defines the read data that users are charged for, measured in bytes.
  // The available read data for each user is the sum of the free read data provided by SP and
  // the ChargeReadQuota specified here.
  uint64 charged_read_quota = 7;
}
```

### MsgDeleteBucket

Used to delete an existing bucket. It is important to note that you cannot delete a non-empty bucket.

```protobuf
message MsgDeleteBucket {
  option (cosmos.msg.v1.signer) = "operator";

  // creator defines the account address of the grantee who has the DeleteBucket permission of the bucket to be deleted.
  string operator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // bucket_name defines the name of the bucket to be deleted.
  string bucket_name = 2;
}
```

### MsgUpdateBucketInfo

Used to update the information in a bucket.

```protobuf
message MsgUpdateBucketInfo {
  option (cosmos.msg.v1.signer) = "operator";

  // operator defines the account address of the operator
  string operator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // bucket_name defines the name of bucket which you'll update
  string bucket_name = 2;
  // charged_read_quota defines the traffic quota that you read from primary sp
  // if read_quota is nil, it means don't change the read_quota
  common.UInt64Value charged_read_quota = 3;
  // payment_address defines the account address of the payment account
  // if payment_address is empty, it means don't change the payment_address
  string payment_address = 4 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // visibility means the bucket is private or public. if private, only bucket owner or grantee can read it,
  // otherwise every greenfield user can read it.
  VisibilityType visibility = 5;
}
```

### MsgCreateObject

Used to create an initial object under a bucket.

```protobuf
message MsgCreateObject {
  option (cosmos.msg.v1.signer) = "creator";

  // creator defines the account address of object uploader
  string creator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // bucket_name defines the name of the bucket where the object is stored.
  string bucket_name = 2;
  // object_name defines the name of object
  string object_name = 3;
  // payload_size defines size of the object's payload
  uint64 payload_size = 4;
  // visibility means the object is private or public. if private, only object owner or grantee can access it,
  // otherwise every greenfield user can access it.
  VisibilityType visibility = 5;
  // content_type defines a standard MIME type describing the format of the object.
  string content_type = 6;
  // primary_sp_approval defines the approval info of the primary SP which indicates that primary sp confirm the user's request.
  Approval primary_sp_approval = 7;
  // expect_checksums defines a list of hashes which was generate by redundancy algorithm.
  repeated bytes expect_checksums = 8;
  // redundancy_type can be ec or replica
  RedundancyType redundancy_type = 9;
}
```
### MsgDeleteObject

Used to delete object that is no longer useful, the deleted storage object is not recoverable.

```protobuf
message MsgDeleteObject {
  option (cosmos.msg.v1.signer) = "operator";

  // operator defines the account address of the operator who has the DeleteObject permission of the object to be deleted.
  string operator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // bucket_name defines the name of the bucket where the object which to be deleted is stored.
  string bucket_name = 2;
  // object_name defines the name of the object which to be deleted.
  string object_name = 3;
}

```
### MsgSealObject

With this message, Storage providers seal an object once the underlying files are well saved by both primary and second SPs.

```protobuf
message MsgSealObject {
  option (cosmos.msg.v1.signer) = "operator";

  // operator defines the account address of primary SP
  string operator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // bucket_name defines the name of the bucket where the object is stored.
  string bucket_name = 2;
  // object_name defines the name of object to be sealed.
  string object_name = 3;
  // global_virtual_group_id defines the id of global virtual group
  uint32 global_virtual_group_id = 4;
  // secondary_sp_bls_agg_signatures defines the aggregate bls signature of the secondary sp that can
  // acknowledge that the payload data has received and stored.
  bytes secondary_sp_bls_agg_signatures = 5;
}
```
### MsgCopyObject

Used to send a copy of an object to another user.

```protobuf
message MsgCopyObject {
  option (cosmos.msg.v1.signer) = "operator";

  // operator defines the account address of the operator who has the CopyObject permission.
  string operator = 1;
  // src_bucket_name defines the name of the bucket where the object to be copied is located
  string src_bucket_name = 2;
  // dst_bucket_name defines the name of the bucket where the object is copied to.
  string dst_bucket_name = 3;
  // src_object_name defines the name of the object which to be copied
  string src_object_name = 4;
  // dst_object_name defines the name of the object which is copied to
  string dst_object_name = 5;
  // primary_sp_approval defines the approval info of the primary SP which indicates that primary sp confirm the user's request.
  common.Approval dst_primary_sp_approval = 6;
}
```
### MsgRejectSealObject

A storage provider may reject to seal an object if it refuses to, or be unable to do so due to unexpected errors.

```protobuf
message MsgRejectSealObject {
  option (cosmos.msg.v1.signer) = "operator";

  // operator defines the account address of the object owner
  string operator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // bucket_name defines the name of the bucket where the object is stored.
  string bucket_name = 2;
  // object_name defines the name of unsealed object to be reject.
  string object_name = 3;
}
```
### MsgCancelCreateObject

The users are able to cancel an initial object before it is sealed with this message.

```protobuf
message MsgCancelCreateObject {
  option (cosmos.msg.v1.signer) = "operator";

  // operator defines the account address of the operator
  string operator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // bucket_name defines the name of the bucket
  string bucket_name = 2;
  // object_name defines the name of the object
  string object_name = 3;
}
```
### MsgCreateGroup

Used to create a new group.

```protobuf
message MsgCreateGroup {
  option (cosmos.msg.v1.signer) = "creator";

  // owner defines the account address of group owner who create the group
  string creator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // group_name defines the name of the group. it's not globally unique.
  string group_name = 2;
  // extra defines extra info for the group
  string extra = 3;
}
```
### MsgDeleteGroup

Used to delete a group that is no longer used. Please note that the underlying members are not deleted yet.

```protobuf
message MsgDeleteGroup {
  option (cosmos.msg.v1.signer) = "operator";

  // operator defines the account address of the operator who has the DeleteGroup permission of the group to be deleted.
  string operator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // group_name defines the name of the group which to be deleted
  string group_name = 2;
}

```
### MsgLeaveGroup

A group member can choose to leave a group by sending this message. 

```protobuf
message MsgLeaveGroup {
  option (cosmos.msg.v1.signer) = "member";

  // member defines the account address of the member who want to leave the group
  string member = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // group_owner defines the owner of the group you want to leave
  string group_owner = 2 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // group_name defines the name of the group you want to leave
  string group_name = 3;
}
```

### MsgMirrorObject

Mirror an object to the destination chain as NFT.

```protobuf
message MsgMirrorObject {
  option (cosmos.msg.v1.signer) = "operator";

  // operator defines the account address of the object owner.
  string operator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // id defines the unique u256 for object.
  string id = 2 [
    (cosmos_proto.scalar) = "cosmos.Uint",
    (gogoproto.customtype) = "Uint",
    (gogoproto.nullable) = false
  ];
  // bucket_name defines the name of the bucket where the object is stored
  string bucket_name = 3;
  // object_name defines the name of object
  string object_name = 4;
  // destination chain id
  uint32 dest_chain_id = 5;
}
```

### MsgMirrorBucket

Mirror a bucket to the destination chain as NFT.

```protobuf
message MsgMirrorBucket {
  option (cosmos.msg.v1.signer) = "operator";

  // operator defines the account address of the bucket owner.
  string operator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // id defines the unique u256 for bucket.
  string id = 2 [
    (cosmos_proto.scalar) = "cosmos.Uint",
    (gogoproto.customtype) = "Uint",
    (gogoproto.nullable) = false
  ];
  // bucket_name defines a globally unique name of bucket
  string bucket_name = 3;
  // destination chain id
  uint32 dest_chain_id = 4;
}
```

### MsgMirrorGroup

Mirror a group to the destination chain as NFT.

```protobuf
message MsgMirrorGroup {
  option (cosmos.msg.v1.signer) = "operator";

  // operator defines the account address of the group owner.
  string operator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // id defines the unique u256 for group.
  string id = 2 [
    (cosmos_proto.scalar) = "cosmos.Uint",
    (gogoproto.customtype) = "Uint",
    (gogoproto.nullable) = false
  ];
  // group_name defines the name of the group
  string group_name = 3;
  // destination chain id
  uint32 dest_chain_id = 4;
}
```

### MsgMigrateBucket

Migrate a bucket to another primary SP.

```protobuf
message MsgMigrateBucket {
  option (cosmos.msg.v1.signer) = "operator";

  // operator defines the account address of the operator who initial the migrate bucket
  string operator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // bucket_name defines the name of the bucket that need to be migrated
  string bucket_name = 2;
  // dst_primary_sp_id defines the destination SP for migration
  uint32 dst_primary_sp_id = 3;
  // dst_primary_sp_approval defines the approval of destination sp
  common.Approval dst_primary_sp_approval = 4;
}
```

### MsgCancelMigrateBucket

Cancel an existing bucket migration.

```protobuf
message MsgCancelMigrateBucket {
  option (cosmos.msg.v1.signer) = "operator";

  // operator defines the account address of the msg operator.
  // Only the user can send this transaction to cancel the migrate bucket
  string operator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // bucket_name defines the name of the bucket that need to be migrated
  string bucket_name = 2;
}
```
### MsgSetTag

Used to update the tags of a resource. The old tags will be overwritten directly. 

```protobuf
message MsgSetTag {
  option (cosmos.msg.v1.signer) = "operator";

  // operator defines the operator who adds the tags
  string operator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // resource defines a greenfield standard resource name that can be generated by GRN structure
  string resource = 2;
  // tags defines a list of tags which will be set to the resource
  ResourceTags tags = 3;
}
```

### MsgUpdateObjectContent

Used to update an existing object content

```protobuf
message MsgUpdateObjectContent {
  option (cosmos.msg.v1.signer) = "operator";

  // operator defines the account address of the operator, either the object owner or the updater with granted permission.
  string operator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // bucket_name defines the name of the bucket where the object is stored.
  string bucket_name = 2;
  // object_name defines the name of object
  string object_name = 3;
  // payload_size defines size of the object's payload
  uint64 payload_size = 4;
  // content_type defines a standard MIME type describing the format of the object.
  string content_type = 5;
  // expect_checksums defines a list of hashes which was generate by redundancy algorithm.
  repeated bytes expect_checksums = 6;
}
```

### MsgCancelUpdateObjectContent

Used to cancel the update on an existing object

```protobuf
message MsgCancelUpdateObjectContent {
  option (cosmos.msg.v1.signer) = "operator";

  // operator defines the account address of the operator, either the object owner or the updater with granted permission.
  string operator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // bucket_name defines the name of the bucket
  string bucket_name = 2;
  // object_name defines the name of the object
  string object_name = 3;
}
```