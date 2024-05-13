---
title: BSDB
---

# BS DB(Block Syncer Database)

BS (Block Syncer Database) store needs to implement BSDB interface. SQL database is used by default.
The following mainly introduces the data schemas corresponding to several core interfaces.

```go
// BSDB contains all the methods required by block syncer database
type BSDB interface {
    Metadata
}
```

## Block Syncer

Block Syncer retrieves the historical data on the chain, optimizes the storage, and re-structures it according to the different event data types.

### Object Table

An object represents a fundamental unit of storage in Greenfield, BSDB object table consists of only associated metadata synced from chain side.

Below is the schema of `Object`:

```go
// Object is the structure for user object
type Object struct {
    // ID defines db auto_increment id of object
    ID uint64 `gorm:"id"`
    // Creator defines the account address of object creator
    Creator common.Address `gorm:"creator_address"`
    // Owner defines the account address of object owner
    Owner common.Address `gorm:"column:owner_address"`
    // BucketName is the name of the bucket
    BucketName string `gorm:"bucket_name"`
    // ObjectName is the name of object
    ObjectName string `gorm:"object_name"`
    // ObjectID is the unique identifier of object
    ObjectID common.Hash `gorm:"object_id"`
    // BucketID is the unique identifier of bucket
    BucketID common.Hash `gorm:"bucket_id"`
    // PayloadSize is the total size of the object payload
    PayloadSize uint64 `gorm:"payload_size"`
    // Visibility defines the highest permissions for bucket. When a bucket is public, everyone can get storage obj
    Visibility string `gorm:"visibility"`
    // ContentType defines the format of the object which should be a standard MIME type
    ContentType string `gorm:"content_type"`
    // CreateAt defines the block number when the object created
    CreateAt int64 `gorm:"create_at"`
    // CreateTime defines the timestamp when the object created
    CreateTime int64 `gorm:"create_time"`
    // ObjectStatus defines the upload status of the object.
    ObjectStatus string `gorm:"column:status"`
    // RedundancyType defines the type of the redundancy which can be multi-replication or EC
    RedundancyType string `gorm:"redundancy_type"`
    // SourceType defines the source of the object.
    SourceType string `gorm:"source_type"`
    // CheckSums defines the root hash of the pieces which stored in an SP
    Checksums pq.ByteaArray `gorm:"check_sums;type:text"`
    // SecondarySpAddresses defines the addresses of secondary_sps
    SecondarySpAddresses pq.StringArray `gorm:"secondary_sp_addresses;type:text"`
    // LockedBalance defines locked balance of object
    LockedBalance common.Hash `gorm:"locked_balance"`
    // Removed defines the object is deleted or not
    Removed bool `gorm:"removed"`
    // UpdateTime defines the time when the object updated
    UpdateTime int64 `gorm:"update_time"`
    // UpdateAt defines the block number when the object updated
    UpdateAt int64 `gorm:"update_at"`
}
```

Below is the enum of `Visibility, RedundancyType, ObjectStatus and SourceType`:

```protobuf
// VisibilityType is the resources public status.
enum VisibilityType {
  VISIBILITY_TYPE_UNSPECIFIED = 0;
  VISIBILITY_TYPE_PUBLIC_READ = 1;
  VISIBILITY_TYPE_PRIVATE = 2;
  // If the bucket Visibility is inherit, it's finally set to private. If the object Visibility is inherit, it's the same as bucket.
  VISIBILITY_TYPE_INHERIT = 3;
}
// RedundancyType represents the redundancy algorithm type for object data,
// which can be either multi-replica or erasure coding.
enum RedundancyType {
  REDUNDANCY_EC_TYPE = 0;
  REDUNDANCY_REPLICA_TYPE = 1;
}
// ObjectStatus represents the creation status of an object. After a user successfully
// sends a CreateObject transaction onto the chain, the status is set to 'Created'.
// After the Primary Service Provider successfully sends a Seal Object transaction onto
// the chain, the status is set to 'Sealed'.
enum ObjectStatus {
  OBJECT_STATUS_CREATED = 0;
  OBJECT_STATUS_SEALED = 1;
}
// SourceType represents the source of resource creation, which can
// from Greenfield native or from a cross-chain transfer from BSC
enum SourceType {
  SOURCE_TYPE_ORIGIN = 0;
  SOURCE_TYPE_BSC_CROSS_CHAIN = 1;
  SOURCE_TYPE_MIRROR_PENDING = 2;
}
```

### Bucket Table

A bucket serves as a logical container for storing objects in Greenfield.
The Bucket table describes the db structure of bucket, and it provides additional storage information compared to the schema on the chain side. e.g. Removed defines the bucket is deleted or not

Below is the schema of `Bucket`:

```go
// Bucket is the structure for user bucket
type Bucket struct {
    // ID defines db auto_increment id of bucket
    ID uint64 `gorm:"id"`
    // Owner is the account address of bucket creator, it is also the bucket owner.
    Owner common.Address `gorm:"column:owner_address"`
    // BucketName is a globally unique name of bucket
    BucketName string `gorm:"bucket_name"`
    // Visibility defines the highest permissions for bucket. When a bucket is public, everyone can get storage obj
    Visibility string `gorm:"visibility"`
    // ID is the unique identification for bucket.
    BucketID common.Hash `gorm:"bucket_id"`
    // SourceType defines which chain the user should send the bucket management transactions to
    SourceType string `gorm:"source_type"`
    // CreateAt defines the block number when the bucket created.
    CreateAt int64 `gorm:"create_at"`
    // CreateTime defines the timestamp when the bucket created
    CreateTime int64 `gorm:"create_time"`
    // PaymentAddress is the address of the payment account
    PaymentAddress common.Address `gorm:"payment_address"`
    // PrimarySpAddress is the address of the primary sp. Objects belong to this bucket will never
    // leave this SP, unless you explicitly shift them to another SP.
    PrimarySpAddress common.Address `gorm:"primary_sp_address"`
    // ReadQuota defines the traffic quota for read
    ChargedReadQuota uint64 `gorm:"charged_read_quota"`
    // PaymentPriceTime defines price time of payment
    PaymentPriceTime int64 `gorm:"payment_price_time"`
    // Removed defines the bucket is deleted or not
    Removed bool `gorm:"removed"`
}
```

the enum of `Visibility and SourceType` are the same as above

### Epoch Table

The Epoch table describes the latest progress of block event information.

Below is the schema of `Epoch`:

```go
// Epoch stores current information of the latest block
type Epoch struct {
  // OneRowID defines if the table only has one row
  OneRowID bool `gorm:"one_row_id;not null;default:true;primaryKey"`
  // BlockHeight defines the latest block number
  BlockHeight int64 `gorm:"block_height;type:bigint(64)"`
  // BlockHash defines the latest block hash
  BlockHash common.Hash `gorm:"block_hash;type:BINARY(32)"`
  // UpdateTime defines the update time of the latest block
  UpdateTime int64 `gorm:"update_time;type:bigint(64)"`
}
```

### StreamRecord Table

The StreamRecord table describes the stream payment record of a stream account.

Below is the schema of `StreamRecord`:

```go
type StreamRecord struct {
    // ID defines db auto_increment id of stream record
    ID uint64 `gorm:"id"`
    // Account defines the account address
    Account common.Address `gorm:"account"`
    // CrudTimestamp defines the latest update timestamp of the stream record
    CrudTimestamp int64 `gorm:"crud_timestamp"`
    // NetflowRate defines the per-second rate that an account's balance is changing.
    // It is the sum of the account's inbound and outbound flow rates.
    NetflowRate *common.Big `gorm:"netflow_rate"`
    // StaticBalance defines the balance of the stream account at the latest CRUD timestamp.
    StaticBalance *common.Big `gorm:"static_balance"`
    // BufferBalance defines reserved balance of the stream account
    // If the netflow rate is negative, the reserved balance is `netflow_rate * reserve_time`
    BufferBalance *common.Big `gorm:"buffer_balance"`
    // LockBalance defines the locked balance of the stream account after it puts a new object and before the object is sealed
    LockBalance *common.Big `gorm:"lock_balance"`
    // Status defines the status of the stream account
    Status string `gorm:"status"`
    // SettleTimestamp defines the unix timestamp when the stream account will be settled
    SettleTimestamp int64 `gorm:"column:settle_timestamp"`
    // OutFlows defines the accumulated outflow rates of the stream account
    OutFlows []byte `gorm:"out_flows;type:longblob"`
}
```
