---
title: SPDB
---

# SPDB

SP(Storage Provider Database) store needs to implement SPDB interface. SQL database is used by default.
The following mainly introduces the data schemas corresponding to several core interfaces.

```go
// SPDB contains all the methods required by sql database
type SPDB interface {
    UploadObjectProgressDB
    GCObjectProgressDB
    SignatureDB
    TrafficDB
    OffChainAuthKeyDB
    MigrateDB
}
```

## UploadObjectProgressDB

UploadObjectProgressDB interface which records upload object related progress(including foreground and background) and state. You can overwrite all these methods to meet your requirements.

```go
type UploadObjectProgressDB interface {
    // InsertUploadProgress inserts a new upload object progress.
	InsertUploadProgress(objectID uint64, isAgentUpload bool) error
    // DeleteUploadProgress deletes the upload object progress.
    DeleteUploadProgress(objectID uint64) error
    // UpdateUploadProgress updates the upload object progress state.
    UpdateUploadProgress(uploadMeta *UploadObjectMeta) error
    // GetUploadState queries the task state by object id.
    GetUploadState(objectID uint64) (storetypes.TaskState, string, error)
    // GetUploadMetasToReplicate queries the latest upload_done/replicate_doing object to continue replicate.
    // It is only used in startup.
    GetUploadMetasToReplicate(limit int, timeout int64) ([]*UploadObjectMeta, error)
    // GetUploadMetasToSeal queries the latest replicate_done/seal_doing object to continue seal.
    // It is only used in startup.
    GetUploadMetasToSeal(limit int, timeout int64) ([]*UploadObjectMeta, error)
    // InsertPutEvent inserts a new upload event progress.
    InsertPutEvent(task coretask.Task) error
}

// UploadObjectMeta defines the upload object state and related seal info, etc.
type UploadObjectMeta struct {
    ObjectID             uint64
    TaskState            storetypes.TaskState
    GlobalVirtualGroupID uint32
    SecondaryEndpoints   []string
    SecondarySignatures  [][]byte
    ErrorDescription     string
    CreateTimeStampSecond int64
    IsAgentUpload         bool
}
```

TaskState is defined in protobuf enum:

```proto
enum TaskState {
  TASK_STATE_INIT_UNSPECIFIED = 0;

  TASK_STATE_UPLOAD_OBJECT_DOING = 1;
  TASK_STATE_UPLOAD_OBJECT_DONE = 2;
  TASK_STATE_UPLOAD_OBJECT_ERROR = 3;

  TASK_STATE_ALLOC_SECONDARY_DOING = 4;
  TASK_STATE_ALLOC_SECONDARY_DONE = 5;
  TASK_STATE_ALLOC_SECONDARY_ERROR = 6;

  TASK_STATE_REPLICATE_OBJECT_DOING = 7;
  TASK_STATE_REPLICATE_OBJECT_DONE = 8;
  TASK_STATE_REPLICATE_OBJECT_ERROR = 9;

  TASK_STATE_SIGN_OBJECT_DOING = 10;
  TASK_STATE_SIGN_OBJECT_DONE = 11;
  TASK_STATE_SIGN_OBJECT_ERROR = 12;

  TASK_STATE_SEAL_OBJECT_DOING = 13;
  TASK_STATE_SEAL_OBJECT_DONE = 14;
  TASK_STATE_SEAL_OBJECT_ERROR = 15;

  TASK_STATE_OBJECT_DISCONTINUED = 16;
}
```

## GCObjectProgressDB

GCObjectProgressDB interface which records gc object related progress. You can overwrite all these methods to meet your requirements.

```go
type GCObjectProgressDB interface {
    // InsertGCObjectProgress inserts a new gc object progress.
    InsertGCObjectProgress(taskKey string, gcMeta *GCObjectMeta) error
    // DeleteGCObjectProgress deletes the gc object progress.
    DeleteGCObjectProgress(taskKey string) error
    // UpdateGCObjectProgress updates the gc object progress.
    UpdateGCObjectProgress(gcMeta *GCObjectMeta) error
    // GetGCMetasToGC queries the latest gc meta to continue gc.
    // It is only used in startup.
    GetGCMetasToGC(limit int) ([]*GCObjectMeta, error)
}

// GCObjectMeta defines the gc object range progress info.
type GCObjectMeta struct {
    TaskKey             string
    StartBlockHeight    uint64
    EndBlockHeight      uint64
    CurrentBlockHeight  uint64
    LastDeletedObjectID uint64
}
```

## SignatureDB

SignatureDB abstract object integrity interface. You can overwrite all these methods to meet your requirements.

```go
type SignatureDB interface {
    /*
        Object Signature is used to get challenge info.
    */
    // GetObjectIntegrity gets integrity meta info by object id and redundancy index.
    GetObjectIntegrity(objectID uint64, redundancyIndex int32) (*IntegrityMeta, error)
    // SetObjectIntegrity sets(maybe overwrite) integrity hash info to db.
    SetObjectIntegrity(integrity *IntegrityMeta) error
    // DeleteObjectIntegrity deletes the integrity hash.
    DeleteObjectIntegrity(objectID uint64, redundancyIndex int32) error
    // UpdateIntegrityChecksum update IntegrityMetaTable's integrity checksum
    UpdateIntegrityChecksum(integrity *IntegrityMeta) error
    // UpdatePieceChecksum if the IntegrityMetaTable already exists, it will be appended to the existing PieceChecksumList.
	UpdatePieceChecksum(objectID uint64, redundancyIndex int32, checksum []byte, dataLength uint64) error
    /*
        Piece Signature is used to help replicate object's piece data to secondary sps, which is temporary.
    */
    // SetReplicatePieceChecksum sets(maybe overwrite) the piece hash.
    SetReplicatePieceChecksum(objectID uint64, segmentIdx uint32, redundancyIdx int32, checksum []byte) error
    // GetAllReplicatePieceChecksum gets all piece hashes.
    GetAllReplicatePieceChecksum(objectID uint64, redundancyIdx int32, pieceCount uint32) ([][]byte, error)
    // DeleteAllReplicatePieceChecksum deletes all piece hashes.
    DeleteAllReplicatePieceChecksum(objectID uint64, redundancyIdx int32, pieceCount uint32) error
    // DeleteReplicatePieceChecksumsByObjectID deletes all piece hashes for a given object, called by primary SP to clear delegated upload object meta.
    DeleteReplicatePieceChecksumsByObjectID(objectID uint64) error
}

// IntegrityMeta defines the payload integrity hash and piece checksum with objectID.
type IntegrityMeta struct {
    ObjectID          uint64
    RedundancyIndex   int32
    IntegrityChecksum []byte
    PieceChecksumList [][]byte
	ObjectSize        uint64
}
```

## TrafficDB

TrafficDB defines a series of traffic interfaces. You can overwrite all these methods to meet your requirements.

```go
type TrafficDB interface {
    // CheckQuotaAndAddReadRecord get the traffic info from db, update the quota meta and check
    // whether the added traffic record exceeds the quota, if it exceeds the quota,
    // it will return error, Otherwise, add a record and return nil.
    CheckQuotaAndAddReadRecord(record *ReadRecord, quota *BucketQuota) error
    // InitBucketTraffic init the traffic info
    InitBucketTraffic(bucketID uint64, bucketName string, quota *BucketQuota) error
    // GetBucketTraffic return bucket traffic info,
    // notice maybe return (nil, nil) while there is no bucket traffic.
    GetBucketTraffic(bucketID uint64) (*BucketTraffic, error)
    // GetReadRecord return record list by time range.
    GetReadRecord(timeRange *TrafficTimeRange) ([]*ReadRecord, error)
    // GetBucketReadRecord return bucket record list by time range.
    GetBucketReadRecord(bucketID uint64, timeRange *TrafficTimeRange) ([]*ReadRecord, error)
    // GetObjectReadRecord return object record list by time range.
    GetObjectReadRecord(objectID uint64, timeRange *TrafficTimeRange) ([]*ReadRecord, error)
    // GetUserReadRecord return user record list by time range.
    GetUserReadRecord(userAddress string, timeRange *TrafficTimeRange) ([]*ReadRecord, error)
}

// ReadRecord defines a read request record, will decrease the bucket read quota.
type ReadRecord struct {
    BucketID        uint64
    ObjectID        uint64
    UserAddress     string
    BucketName      string
    ObjectName      string
    ReadSize        uint64
    ReadTimestampUs int64
}

// BucketQuota defines read quota of a bucket.
type BucketQuota struct {
    ChargedQuotaSize uint64 // the charged quota of bucket on greenfield chain meta
    FreeQuotaSize    uint64 // the free quota of SP on greenfield chain
}

// BucketTraffic is record traffic by year and month.
type BucketTraffic struct {
    BucketID                     uint64
    BucketName                   string
    ReadConsumedSize             uint64
    FreeQuotaSize                uint64 // the total free quota size of SP price meta
    FreeQuotaConsumedSize        uint64 // the consumed free quota size
    ChargedQuotaSize             uint64 // the total charged quota of bucket
    MonthlyFreeQuotaConsumedSize uint64 // indicates the consumed monthly free quota size of this month
    MonthlyQuotaSize             uint64 // indicate the remained monthly free quota
    ModifyTime                   int64
}

// TrafficTimeRange is used by query, return records in [StartTimestampUs, EndTimestampUs).
type TrafficTimeRange struct {
    StartTimestampUs int64
    EndTimestampUs   int64
    LimitNum         int // is unlimited if LimitNum <= 0.
}
```

## OffChainAuthKeyDB

OffChainAuthKeyDB defines authentication operations in SpDB. You can overwrite all these methods to meet your requirements.

```go
type OffChainAuthKeyDB interface {
    GetAuthKey(userAddress string, domain string) (*OffChainAuthKey, error)
    UpdateAuthKey(userAddress string, domain string, oldNonce int32, newNonce int32, newPublicKey string, newExpiryDate time.Time) error
    InsertAuthKey(newRecord *OffChainAuthKey) error
}

// OffChainAuthKey contains some info about authentication
type OffChainAuthKey struct {
    UserAddress string
    Domain      string

    CurrentNonce     int32
    CurrentPublicKey string
    NextNonce        int32
    ExpiryDate       time.Time

    CreatedTime  time.Time
    ModifiedTime time.Time
}
```

## MigrateDB

MigrateDB is used to support sp exit and bucket migrate.

```go
type MigrateDB interface {
    // UpdateSPExitSubscribeProgress includes insert and update.
    UpdateSPExitSubscribeProgress(blockHeight uint64) error
    // QuerySPExitSubscribeProgress returns blockHeight which is called at startup.
    QuerySPExitSubscribeProgress() (uint64, error)
    // UpdateSwapOutSubscribeProgress includes insert and update.
    UpdateSwapOutSubscribeProgress(blockHeight uint64) error
    // QuerySwapOutSubscribeProgress returns blockHeight which is called at startup.
    QuerySwapOutSubscribeProgress() (uint64, error)
    // UpdateBucketMigrateSubscribeProgress includes insert and update.
    UpdateBucketMigrateSubscribeProgress(blockHeight uint64) error
    // QueryBucketMigrateSubscribeProgress returns blockHeight which is called at startup.
    QueryBucketMigrateSubscribeProgress() (uint64, error)

    // InsertSwapOutUnit is used to insert a swap out unit.
    InsertSwapOutUnit(meta *SwapOutMeta) error
    // UpdateSwapOutUnitCompletedGVGList is used to record dest swap out progress, manager restart can load it.
    UpdateSwapOutUnitCompletedGVGList(swapOutKey string, completedGVGList []uint32) error
    // QuerySwapOutUnitInSrcSP is used to rebuild swap out plan at startup.
    QuerySwapOutUnitInSrcSP(swapOutKey string) (*SwapOutMeta, error)
    // ListDestSPSwapOutUnits is used to rebuild swap out plan at startup.
    ListDestSPSwapOutUnits() ([]*SwapOutMeta, error)

    // InsertMigrateGVGUnit inserts a new gvg migrate unit.
    InsertMigrateGVGUnit(meta *MigrateGVGUnitMeta) error
    // DeleteMigrateGVGUnit deletes the gvg migrate unit.
    DeleteMigrateGVGUnit(meta *MigrateGVGUnitMeta) error

    // UpdateMigrateGVGUnitStatus updates gvg unit status.
    UpdateMigrateGVGUnitStatus(migrateKey string, migrateStatus int) error
    // UpdateMigrateGVGUnitLastMigrateObjectID updates gvg unit LastMigrateObjectID.
    UpdateMigrateGVGUnitLastMigrateObjectID(migrateKey string, lastMigrateObjectID uint64) error

    // QueryMigrateGVGUnit returns the gvg migrate unit info.
    QueryMigrateGVGUnit(migrateKey string) (*MigrateGVGUnitMeta, error)
    // ListMigrateGVGUnitsByBucketID is used to load at dest sp startup(bucket migrate).
    ListMigrateGVGUnitsByBucketID(bucketID uint64) ([]*MigrateGVGUnitMeta, error)
}

type SwapOutMeta struct {
    SwapOutKey    string // as primary key
    IsDestSP      bool
    SwapOutMsg    *virtualgrouptypes.MsgSwapOut
    CompletedGVGs []uint32
}

type MigrateGVGUnitMeta struct {
    MigrateGVGKey        string // as primary key
    SwapOutKey           string
    GlobalVirtualGroupID uint32 // is used by sp exit/bucket migrate
    VirtualGroupFamilyID uint32 // is used by sp exit
    RedundancyIndex      int32  // is used by sp exit
    BucketID             uint64 // is used by bucket migrate
    SrcSPID              uint32
    DestSPID             uint32
    LastMigratedObjectID uint64
    MigrateStatus        int // scheduler assign unit status.
}
```
