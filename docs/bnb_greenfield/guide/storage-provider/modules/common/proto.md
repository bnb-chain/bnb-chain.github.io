# Proto Definition

GfSp framework uses protobuf to define structured data which is language-neutral, platform-neutral and extensible mechanism for serializing data. This section will display used protobuf definition in GfSp code.

## GfSpTask Proto

Tasks in GfSp uses proto to describe themselves.

```proto
message GfSpTask {
  string address = 1;
  int64 create_time = 2;
  int64 update_time = 3;
  int64 timeout = 4;
  int32 task_priority = 5;
  int64 retry = 6;
  int64 max_retry = 7;
  string user_address = 8;
  string logs = 9;
  base.types.gfsperrors.GfSpError err = 10;
}
```

### GfSpCreateBucketApprovalTask Proto

```proto
message GfSpCreateBucketApprovalTask {
  GfSpTask task = 1;
  greenfield.storage.MsgCreateBucket create_bucket_info = 2;
}
```

### GfSpMigrateBucketApprovalTask Proto


```proto
message GfSpMigrateBucketApprovalTask {
  GfSpTask task = 1;
  greenfield.storage.MsgMigrateBucket migrate_bucket_info = 2;
}
```

### GfSpCreateObjectApprovalTask Proto

```proto
message GfSpCreateObjectApprovalTask {
  GfSpTask task = 1;
  greenfield.storage.MsgCreateObject create_object_info = 2;
}
```

### GfSpDelegateCreateObjectApprovalTask Proto

```proto
message GfSpDelegateCreateObjectApprovalTask {
  GfSpTask task = 1;
  greenfield.storage.MsgDelegateCreateObject delegate_create_object = 2;
  bytes fingerprint = 3;
}
```

### GfSpReplicatePieceApprovalTask Proto

```proto
message GfSpReplicatePieceApprovalTask {
  GfSpTask task = 1;
  greenfield.storage.ObjectInfo object_info = 2;
  greenfield.storage.Params storage_params = 3;
  string ask_sp_operator_address = 4;
  bytes ask_signature = 5;
  string approved_sp_endpoint = 6;
  string approved_sp_operator_address = 7;
  bytes approved_signature = 8;
  string approved_sp_approval_address = 9;
  uint64 expired_height = 10;
}
```

### GfSpUploadObjectTask Proto

```proto
message GfSpUploadObjectTask {
  GfSpTask task = 1;
  uint32 virtual_group_family_id = 2;
  greenfield.storage.ObjectInfo object_info = 3;
  greenfield.storage.Params storage_params = 4;
  bool is_agent_upload = 5;
}
```

### GfSpResumableUploadObjectTask Proto

```proto
message GfSpResumableUploadObjectTask {
  GfSpTask task = 1;
  greenfield.storage.ObjectInfo object_info = 2;
  greenfield.storage.Params storage_params = 3;
  uint64 offset = 4;
  uint64 length = 5;
  bool completed = 6;
  uint32 virtual_group_family_id = 7;
  bool is_agent_upload = 8;
}
```

### GfSpReplicatePieceTask Proto

```proto
message GfSpReplicatePieceTask {
  GfSpTask task = 1;
  greenfield.storage.ObjectInfo object_info = 2;
  greenfield.storage.Params storage_params = 3;
  repeated string secondary_addresses = 4;
  repeated bytes secondary_signatures = 5;
  bool sealed = 6;
  uint32 global_virtual_group_id = 7;
  repeated string secondary_endpoints = 8;
  int32 not_available_sp_idx = 9;
  bool is_agent_upload_task = 10;
}
```

### GfSpRecoverPieceTask Proto

```proto
message GfSpRecoverPieceTask {
  GfSpTask task = 1;
  greenfield.storage.ObjectInfo object_info = 2;
  greenfield.storage.Params storage_params = 3;
  uint32 segment_idx = 5;
  int32 ec_idx = 6;
  uint64 piece_size = 7;
  bytes signature = 8;
  bool recovered = 9;
  bool finished = 10;
  uint32 global_virtual_group_id = 11;
  bool bucket_migration = 12;
  bool is_agent_upload_task = 13;
}
```

### GfSpReceivePieceTask Proto

```proto
message GfSpReceivePieceTask {
  GfSpTask task = 1;
  greenfield.storage.ObjectInfo object_info = 2;
  greenfield.storage.Params storage_params = 3;
  uint32 segment_idx = 4;
  int32 redundancy_idx = 5;
  int64 piece_size = 6;
  bytes piece_checksum = 7;
  bytes signature = 8;
  bool sealed = 9;
  bool finished = 10;
  uint32 global_virtual_group_id = 11;
  bool bucket_migration = 12;
}
```

### GfSpSealObjectTask Proto

```proto
message GfSpSealObjectTask {
  GfSpTask task = 1;
  greenfield.storage.ObjectInfo object_info = 2;
  greenfield.storage.Params storage_params = 3;
  repeated string secondary_addresses = 4;
  repeated bytes secondary_signatures = 5;
  uint32 global_virtual_group_id = 6;
  repeated string secondary_endpoints = 7;
  bool is_agent_upload_task = 8;
}
```

### GfSpDownloadObjectTask Proto

```proto
message GfSpDownloadObjectTask {
  GfSpTask task = 1;
  greenfield.storage.ObjectInfo object_info = 2;
  greenfield.storage.BucketInfo bucket_info = 3;
  greenfield.storage.Params storage_params = 4;
  int64 low = 5;
  int64 high = 6;
}
```

### GfSpDownloadPieceTask Proto

```proto
message GfSpDownloadPieceTask {
  GfSpTask task = 1;
  greenfield.storage.ObjectInfo object_info = 2;
  greenfield.storage.BucketInfo bucket_info = 3;
  greenfield.storage.Params storage_params = 4;
  bool enable_check = 5; // check read quota, only in first piece
  uint64 total_size = 6;
  string piece_key = 7;
  uint64 piece_offset = 8;
  uint64 piece_length = 9;
}
```

### GfSpChallengePieceTask Proto

```proto
message GfSpChallengePieceTask {
  GfSpTask task = 1;
  greenfield.storage.ObjectInfo object_info = 2;
  greenfield.storage.BucketInfo bucket_info = 3;
  greenfield.storage.Params storage_params = 4;
  uint32 segment_idx = 5;
  int32 redundancy_idx = 6;
  bytes integrity_hash = 7;
  repeated bytes piece_hash = 8;
  int64 piece_data_size = 9;
}
```

### GfSpGCObjectTask Proto

```proto
message GfSpGCObjectTask {
  GfSpTask task = 1;
  uint64 start_block_number = 2;
  uint64 end_block_number = 3;
  uint64 current_block_number = 4;
  uint64 last_deleted_object_id = 5;
  bool running = 6;
}
```

### GfSpGCZombiePieceTask Proto

```proto
message GfSpGCZombiePieceTask {
  GfSpTask task = 1;
  uint64 object_id = 2;
  uint64 delete_count = 3;
  bool running = 4;
}
```

### GfSpGCMetaTask Proto

```proto
message GfSpGCMetaTask {
  GfSpTask task = 1;
  uint64 current_idx = 2;
  uint64 delete_count = 3;
  bool running = 4;
}
```

### GfSpMigrateGVGTask Proto

```proto
message GfSpMigrateGVGTask {
  GfSpTask task = 1;
  uint64 bucket_id = 2;
  greenfield.virtualgroup.GlobalVirtualGroup src_gvg = 3;
  greenfield.virtualgroup.GlobalVirtualGroup dest_gvg = 4;
  int32 redundancy_idx = 5;
  greenfield.sp.StorageProvider src_sp = 6;
  uint64 last_migrated_object_id = 7;
  bool finished = 8;
}
```

### GfSpMigratePieceTask Proto

```proto
message GfSpMigratePieceTask {
  GfSpTask task = 1;
  greenfield.storage.ObjectInfo object_info = 2;
  greenfield.storage.Params storage_params = 3;
  string src_sp_endpoint = 4;
  uint32 segment_idx = 5;
  int32 redundancy_idx = 6;
  bytes signature = 7;
}
```

## Greenfield Proto

Some structured data used in GfSp is deinfed in Greenfield chain repo, we display them as follows.

### MsgCreateBucket Proto

```proto
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

### MsgMigrateBucket Proto

```proto
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

### MsgCreateObject Proto

```proto
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
  common.Approval primary_sp_approval = 7;

  // expect_checksums defines a list of hashes which was generate by redundancy algorithm.
  repeated bytes expect_checksums = 8;

  // redundancy_type can be ec or replica
  RedundancyType redundancy_type = 9;
}
```

### BucketInfo Proto

```proto
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
  // global_virtual_group_family_id defines the unique id of gvg family
  uint32 global_virtual_group_family_id = 8;
  // charged_read_quota defines the traffic quota for read in bytes per month.
  // The available read data for each user is the sum of the free read data provided by SP and
  // the ChargeReadQuota specified here.
  uint64 charged_read_quota = 9;
  // bucket_status define the status of the bucket.
  BucketStatus bucket_status = 10;
}
```

### ObjectInfo Proto

```proto
message ObjectInfo {
  // owner is the object owner
  string owner = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // creator is the address of the uploader, it always be same as owner address
  string creator = 2 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // bucket_name is the name of the bucket
  string bucket_name = 3;
  // object_name is the name of object
  string object_name = 4;
  // id is the unique identifier of object
  string id = 5 [
    (cosmos_proto.scalar) = "cosmos.Uint",
    (gogoproto.customtype) = "Uint",
    (gogoproto.nullable) = false
  ];
  uint32 local_virtual_group_id = 6;
  // payloadSize is the total size of the object payload
  uint64 payload_size = 7;
  // visibility defines the highest permissions for object. When an object is public, everyone can access it.
  VisibilityType visibility = 8;
  // content_type define the format of the object which should be a standard MIME type.
  string content_type = 9;
  // create_at define the block timestamp when the object is created
  int64 create_at = 10;
  // object_status define the upload status of the object.
  ObjectStatus object_status = 11;
  // redundancy_type define the type of the redundancy which can be multi-replication or EC.
  RedundancyType redundancy_type = 12;
  // source_type define the source of the object.
  SourceType source_type = 13;
  // checksums define the root hash of the pieces which stored in a SP.
  // add omit tag to omit the field when converting to NFT metadata
  repeated bytes checksums = 14 [(gogoproto.moretags) = "traits:\"omit\""];
}
```

### Params Proto

Params defines the parameters for the module.

```proto
message Params {
  option (gogoproto.goproto_stringer) = false;
  VersionedParams versioned_params = 1 [(gogoproto.nullable) = false];

  // max_payload_size is the maximum size of the payload, default: 2G
  uint64 max_payload_size = 2;
  // relayer fee for the mirror bucket tx
  string mirror_bucket_relayer_fee = 3;
  // relayer fee for the ACK or FAIL_ACK package of the mirror bucket tx
  string mirror_bucket_ack_relayer_fee = 4;
  // relayer fee for the mirror object tx
  string mirror_object_relayer_fee = 5;
  // Relayer fee for the ACK or FAIL_ACK package of the mirror object tx
  string mirror_object_ack_relayer_fee = 6;
  // relayer fee for the mirror object tx
  string mirror_group_relayer_fee = 7;
  // Relayer fee for the ACK or FAIL_ACK package of the mirror object tx
  string mirror_group_ack_relayer_fee = 8;
  // The maximum number of buckets that can be created per account
  uint32 max_buckets_per_account = 9;
  // The window to count the discontinued objects or buckets
  uint64 discontinue_counting_window = 10;
  // The max objects can be requested in a window
  uint64 discontinue_object_max = 11;
  // The max buckets can be requested in a window
  uint64 discontinue_bucket_max = 12;
  // The object will be deleted after the confirm period in seconds
  int64 discontinue_confirm_period = 13;
  // The max delete objects in each end block
  uint64 discontinue_deletion_max = 14;
  // The max number for deleting policy in each end block
  uint64 stale_policy_cleanup_max = 15;
}
```

### GfSpPing Proto

Ping defines the heartbeat request between p2p nodes.

```proto
message GfSpPing {
  // sp_operator_address define sp operator public key
  string sp_operator_address = 1;
  // signature define the signature of sp sign the msg
  bytes signature = 2;
}
```

### GfSpPong Proto

Pong defines the heartbeat response between p2p nodes.

```proto
message GfSpPong {
  // nodes define the
  repeated GfSpNode nodes = 1;
  // sp_operator_address define sp operator public key
  string sp_operator_address = 2;
  // signature define the signature of sp sign the msg
  bytes signature = 3;
}

// Node defines the p2p node info
message GfSpNode {
  // node_id defines the node id
  string node_id = 1;
  // multi_addr define the node multi addr
  repeated string multi_addr = 2;
}
```

### MsgSealObject

```proto
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

### MsgRejectSealObject Proto

```proto
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

### MsgDiscontinueBucket

```proto
message MsgDiscontinueBucket {
  option (cosmos.msg.v1.signer) = "operator";

  // operator is the sp who wants to stop serving the bucket.
  string operator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // bucket_name defines the name of the bucket where the object which to be discontinued is stored.
  string bucket_name = 2;
  // the reason for the request.
  string reason = 3;
}
```

### MsgCreateGlobalVirtualGroup

```proto
message MsgCreateGlobalVirtualGroup {
  option (cosmos.msg.v1.signer) = "storage_provider";

  // storage_provider defines the operator account address of the storage provider who create the global virtual group.
  string storage_provider = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // family_id is the identifier for the virtual group's family.
  uint32 family_id = 2;
  // secondary_sp_id is a list of secondary storage provider IDs associated with the virtual group.
  repeated uint32 secondary_sp_ids = 3;
  // total_deposit is the total deposit amount required for the virtual group.
  // The tokens needs deposited and the size of storage are correlated.
  cosmos.base.v1beta1.Coin deposit = 4 [(gogoproto.nullable) = false];
}
```

### MsgCompleteMigrateBucket

```proto
message MsgCompleteMigrateBucket {
  option (cosmos.msg.v1.signer) = "operator";

  // operator defines the account address of the msg operator.
  // The CompleteMigrateBucket transaction must be initiated by the destination SP of the migration
  string operator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // bucket_name defines the name of the bucket that need to be migrated
  string bucket_name = 2;
  // global_virtual_group_family_id defines the family id which the bucket migrate to
  uint32 global_virtual_group_family_id = 3;
  // gvg_mappings defines the src and dst gvg mapping relationships which the bucket migrate to
  repeated GVGMapping gvg_mappings = 4;
}
```

### MsgUpdateSpStoragePrice

```proto
message MsgUpdateSpStoragePrice {
  option (cosmos.msg.v1.signer) = "sp_address";

  // sp address
  string sp_address = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // read price, in bnb wei per charge byte
  string read_price = 2 [
    (cosmos_proto.scalar) = "cosmos.Dec",
    (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Dec",
    (gogoproto.nullable) = false
  ];
  // free read quota, in byte
  uint64 free_read_quota = 3;
  // store price, in bnb wei per charge byte
  string store_price = 4 [
    (cosmos_proto.scalar) = "cosmos.Dec",
    (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Dec",
    (gogoproto.nullable) = false
  ];
}
```

### MsgSwapOut

```proto
message MsgSwapOut {
  option (cosmos.msg.v1.signer) = "storage_provider";

  // storage_provider defines the operator account address of the storage provider who want to swap out from the global virtual group.
  string storage_provider = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // virtual_group_family_id is the identifier of the virtual group family.
  // if it set to non-zero, it represents that the operator swap out as the primary storage provider
  // it it set to zero, it represents that the operator swap out as the secondary storage provider.
  uint32 global_virtual_group_family_id = 2;
  // global_virtual_group_ids is a list of global virtual group IDs associated with the swap out.
  // It allows to be empty only when the operator is the primary storage provider.
  repeated uint32 global_virtual_group_ids = 3;
  // successor_sp_id is the unique id of the successor storage provider.
  uint32 successor_sp_id = 4;
  // approval includes an expiration time and a signature.
  // The fields to be signed with contains the necessary information of the successor.
  common.Approval successor_sp_approval = 5;
}
```

### MsgCompleteSwapOut

```proto
message MsgCompleteSwapOut {
  option (cosmos.msg.v1.signer) = "storage_provider";

  // storage_provider defines the operator account address of the storage provider who complete swap out task.
  string storage_provider = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // virtual_group_family_id is the identifier of the virtual group family.
  // if it set to non-zero, it represents that the operator swap out as the primary storage provider
  // it it set to zero, it represents that the operator swap out as the secondary storage provider.
  uint32 global_virtual_group_family_id = 2;
  // global_virtual_group_ids is a list of global virtual group IDs associated with the swap out.
  // It allows to be empty only when the operator is the primary storage provider.
  repeated uint32 global_virtual_group_ids = 3;
}
```

### MsgStorageProviderExit

```proto
message MsgStorageProviderExit {
  option (cosmos.msg.v1.signer) = "storage_provider";

  // storage_provider defines the operator account address of the storage provider who want to exit from the greenfield storage network.
  string storage_provider = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}
```

### MsgCompleteStorageProviderExit

```proto
message MsgCompleteStorageProviderExit {
  option (cosmos.msg.v1.signer) = "storage_provider";

  // storage_provider defines the operator account address of the storage provider who want to exit from the greenfield storage network.
  string storage_provider = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
}
```
