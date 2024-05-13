---
title: Simple Storage Service Model 
order: 5
---

# Simple Storage Service Model
Greenfield offers developers comparable API primitives and models to the AWS s3 cloud storage which 
is most utilized in Web2.

## Abstract
Below are the basic data models for Greenfield storage:

- Bucket
- Object
- Group
- Permission

These metadata are permanently stored in the Greenfield blockchain state.

## Models

### Bucket
In Greenfield, a bucket is a virtual container for storing objects. Users must assign each bucket a unique name that complies with DNS naming conventions, consisting of one or more labels separated by periods. It's crucial that the bucket name be globally unique within the Greenfield namespace to prevent two buckets from sharing the same name. 

Once a bucket has been created, objects can be uploaded to it using various methods such as the `gnfd` command line or the `SDKs`. 
Objects within a bucket can be organized and managed like folders (also called "prefixes"). 
Additionally, it's possible to assign a unique key (a string value) to each object within the bucket to distinguish it from other objects.

Every user account can create several buckets. The account will become the "owner" of the bucket.

Each bucket should be associated with its own Primary SP, and the payment accounts for Read and Store functions. The owner's
address will be the default payment account.

**Prototype definition of a bucket**

```protobuf
message BucketInfo {
  // owner is the account address of bucket creator, it is also the bucket owner.
  string owner = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // bucket_name is a globally unique name of bucket
  string bucket_name = 2;
  // visibility defines the highest permissions for bucket. When a bucket is public, everyone can get storage objects in it.
  VisibilityType visibility = 3;
  // id is the unique identification for bucket.
  string id = 4 [
    (cosmos_proto.scalar) = "cosmos.Uint",
    (gogoproto.customtype) = "Uint",
    (gogoproto.nullable) = false
  ];
  // source_type defines which chain the user should send the bucket management transactions to
  SourceType source_type = 5;
  // create_at define the block timestamp when the bucket created.
  int64 create_at = 6;
  // payment_address is the address of the payment account
  string payment_address = 7 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // primary_sp_address is the address of the primary sp. Objects belongs to this bucket will never
  // leave this SP, unless you explicitly shift them to another SP.
  string primary_sp_address = 8 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // charged_read_quota defines the traffic quota for read in bytes per month.
  // The available read data for each user is the sum of the free read data provided by SP and
  // the ChargeReadQuota specified here.
  uint64 charged_read_quota = 9;
  // billing info of the bucket
  BillingInfo billing_info = 10 [(gogoproto.nullable) = false];
}

// BillingInfo is the billing information of the bucket
message BillingInfo {
  // the time of the payment price, used to calculate the charge rate of the bucket
  int64 price_time = 1;
  // the total size of the objects in the bucket, used to calculate the charge rate of the bucket
  uint64 total_charge_size = 2;
  // secondary sp objects size statistics
  repeated SecondarySpObjectsSize secondary_sp_objects_size = 3 [(gogoproto.nullable) = false];
}
```

### Object

An object is a fundamental unit of storage in Greenfield, which represents a file consisting of data and its associated 
metadata. Each object is uniquely identified within a bucket by its object name (a string value). 
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

**Prototype definition of an object**

```protobuf

message ObjectInfo {
  string owner = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // bucket_name is the name of the bucket
  string bucket_name = 2;
  // object_name is the name of object
  string object_name = 3;
  // id is the unique identifier of object
  string id = 4 [
    (cosmos_proto.scalar) = "cosmos.Uint",
    (gogoproto.customtype) = "Uint",
    (gogoproto.nullable) = false
  ];
  // payloadSize is the total size of the object payload
  uint64 payload_size = 5;
  // visibility defines the highest permissions for object. When an object is public, everyone can access it.
  VisibilityType visibility = 6;
  // content_type define the format of the object which should be a standard MIME type.
  string content_type = 7;
  // create_at define the block timestamp when the object is created
  int64 create_at = 8;
  // object_status define the upload status of the object.
  ObjectStatus object_status = 9;
  // redundancy_type define the type of the redundancy which can be multi-replication or EC.
  RedundancyType redundancy_type = 10;
  // source_type define the source of the object.
  SourceType source_type = 11;
  // checksums define the root hash of the pieces which stored in a SP.
  // add omit tag to omit the field when converting to NFT metadata
  repeated bytes checksums = 12 [(gogoproto.moretags) = "traits:\"omit\""];
  // secondary_sp_addresses define the addresses of secondary_sps
  repeated string secondary_sp_addresses = 13 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}

```

### Group

A Group is a collection of accounts with the same permissions. The group name is not allowed to be duplicated under the
same user. However, a group can not create or own any resource. A group can not be a member of another group either.

A resource can only have a limited number of groups associated with it for permissions. This ensures that the on-chain
permission check can be finished within a constant time.

**Prototype definition of a group**

```protobuf
message GroupInfo {
  // owner is the owner of the group. It can not changed once it created.
  string owner = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // group_name is the name of group which is unique under an account.
  string group_name = 2;
  // source_type
  SourceType source_type = 3;
  // id is the unique identifier of group
  string id = 4 [
    (cosmos_proto.scalar) = "cosmos.Uint",
    (gogoproto.customtype) = "Uint",
    (gogoproto.nullable) = false
  ];
}

```
