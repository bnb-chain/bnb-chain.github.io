# Task

Task is an abstract interface to describe the smallest unit of SP background service how to interact.

```go
type Task interface {
    // Key returns the uniquely identify of the task. It is recommended that each task
    // has its own prefix. In addition, it should also include the information of the
    // task's own identity.
    // For example:
    // 1. ApprovalTask maybe includes the bucket name and object name,
    // 2. ObjectTask maybe includes the object ID,
    // 3. GCTask maybe includes the timestamp.
    Key() TKey
    // Type returns the type of the task. A task has a unique type, such as
    // TypeTaskCreateBucketApproval, TypeTaskUpload etc. has the only one TType
    // definition.
    Type() TType
    // GetAddress returns the task runner address. there is only one runner at the
    // same time, which will assist in quickly locating the running node of the task.
    GetAddress() string
    // SetAddress sets the runner address to the task.
    SetAddress(string)
    // GetCreateTime returns the creation time of the task. The creation time used to
    // judge task execution time.
    GetCreateTime() int64
    // SetCreateTime sets the creation time of the task.
    SetCreateTime(int64)
    // GetUpdateTime returns the last updated time of the task. The updated time used
    // to determine whether the task is expired with the timeout.
    GetUpdateTime() int64
    // SetUpdateTime sets last updated time of the task. Any changes in task information
    // requires to set the update time.
    SetUpdateTime(int64)
    // GetTimeout returns the timeout of the task, the timeout is a duration, if update
    // time adds timeout lesser now stands the task is expired.
    GetTimeout() int64
    // SetTimeout sets timeout duration of the task.
    SetTimeout(int64)
    // ExceedTimeout returns an indicator whether timeout, if update time adds timeout
    // lesser now returns true, otherwise returns false.
    ExceedTimeout() bool
    // GetMaxRetry returns the max retry times of the task. Each type of task has a
    // fixed max retry times.
    GetMaxRetry() int64
    // SetMaxRetry sets the max retry times of the task.
    SetMaxRetry(int64)
    // GetRetry returns the retry counter of the task.
    GetRetry() int64
    // SetRetry sets the retry counter of the task.
    SetRetry(int)
    // IncRetry increases the retry counter of the task. Each task has the max retry
    // times, if retry counter exceed the max retry, the task should be canceled.
    IncRetry()
    // ExceedRetry returns an indicator whether retry counter greater that max retry.
    ExceedRetry() bool
    // Expired returns an indicator whether ExceedTimeout and ExceedRetry.
    Expired() bool
    // GetPriority returns the priority of the task. Each type of task has a fixed
    // priority. The higher the priority, the higher the urgency of the task, and
    // it will be executed first.
    GetPriority() TPriority
    // SetPriority sets the priority of the task. In most cases, the priority of the
    // task does not need to be set, because the priority of the task corresponds to
    // the task type one by one. Once the task type is determined, the priority is
    // determined. But some scenarios need to dynamically adjust the priority of the
    // task type, then this interface is needed.
    SetPriority(TPriority)
    // EstimateLimit returns estimated resource will be consumed. It is used for
    // application resources to the rcmgr and decide whether it can be executed
    // immediately.
    EstimateLimit() rcmgr.Limit
    // SetLogs sets the event logs to task
    SetLogs(logs string)
    // GetLogs returns the logs of task
    GetLogs() string
    // GetUserAddress returns the user account of downloading object.
    // It is used to record the read bucket information.
    GetUserAddress() string
    // SetUserAddress sets the user account of downloading object.
    SetUserAddress(string)
    // AppendLog appends the event log to task
    AppendLog(log string)
    // Info returns the task detail info for log and debug.
    Info() string
    // Error returns the task error. if the task is normal, returns nil.
    Error() error
    // SetError sets the error to task. Any errors that occur during task execution
    // will be logged through the SetError method.
    SetError(error)
}
```

## Task Type

There are three main types of task: `ApprovalTask`, `ObjectTask` and `GCTask`.

`ApprovalTask` is used to record approval information for users creating buckets and objects. Primary SP approval is required
before serving the bucket and object. If SP approves the message, it will sign the approval message. The greenfield will
verify the signature of the approval message to determine whether the SP accepts the bucket and object. When primary replicating
pieces to secondary SPs, the approval message is broadcast to other SPs. If they approve the message, the primary SP will
select some of them to replicate the pieces to. Before receiving the pieces, the selected SPs will verify the signature
of the approval message. `ApprovalTask` includes `ApprovalReplicatePieceTask`.

`ObjectTask` is associated with an object and records information about its different stages. This includes `UploadObjectTask`
which uploads the object payload data to the primary SP, `ReplicatePieceTask`, which replicates the object pieces to the
secondary SPs, and `ReceivePieceTask`, which is exclusive to the secondary SP and records information about receiving
the piece. The secondary SP uses this information to confirm whether the object was successfully sealed on greenfield,
ensuring a return of the secondary SP. SealObjectTask seals the object on Greenfield, while the DownloadObjectTask allows
the user to download part or all of the object payload data. ChallengePieceTask provides the validator with challenge piece
information, which they can use to challenge the SP if they suspect that the user's payload data was not stored correctly.

`GCTask` is an abstract interface that records information about garbage collection. This includes `GCObjectTask` which collects
piece store space by deleting payload data that has been deleted on the greenfield, `GCZombiePieceTask` which collects piece
store space by deleting zombie piece data that resulted from any exception where the piece data meta is not on Greenfield
chain, and `GCMetaTask` which collects the SP meta store space by deleting expired data.

### ApprovalTask

ApprovalTask is an abstract interface to record the ask approval information, the approval task timeliness uses the block height,
if reached expired height, the approval is invalid.

```go
type ApprovalTask interface {
    Task
    // GetExpiredHeight returns the expired height of the approval.
    GetExpiredHeight() uint64
    // SetExpiredHeight sets the expired height of the approval, when SP
    // approved the approval, it should set the expired height to stands
    // the approval timeliness. This is one of the ways SP prevents being
    // attacked.
    SetExpiredHeight(uint64)
}
```

#### ApprovalCreateBucketTask

ApprovalCreateBucketTask is an abstract interface to record the ask create bucket approval information. The user account will
create MsgCreateBucket, the SP should decide whether approved the request based on the MsgCreateBucket. If so, the sp will
SetExpiredHeight and signs MsgCreateBucket.

```go
type ApprovalCreateBucketTask interface {
    ApprovalTask
    // InitApprovalCreateBucketTask inits the ApprovalCreateBucketTask by
    // MsgCreateBucket and task priority. SP only fill the MsgCreateBucket's
    // PrimarySpApproval field, can not change other fields.
    InitApprovalCreateBucketTask(string, *storagetypes.MsgCreateBucket, TPriority)
    // GetCreateBucketInfo returns the user's MsgCreateBucket.
    GetCreateBucketInfo() *storagetypes.MsgCreateBucket
    // SetCreateBucketInfo sets the MsgCreateBucket. Should try to avoid calling
    // this method, it will change the approval information.
    SetCreateBucketInfo(*storagetypes.MsgCreateBucket)
}
```

### ApprovalMigrateBucketTask

ApprovalMigrateBucketTask is an abstract interface to record the ask migrate bucket approval information. The user account will
create MsgMigrateBucket, the SP should decide whether approved the request based on the MsgMigrateBucket. If so, the sp will
SetExpiredHeight and signs MsgCreateBucket.

```go
type ApprovalMigrateBucketTask interface {
    ApprovalTask
    // InitApprovalMigrateBucketTask inits the ApprovalMigrateBucketTask by
    // MsgCreateBucket and task priority. SP only fill the MsgCreateBucket's
    // PrimarySpApproval field, can not change other fields.
    InitApprovalMigrateBucketTask(*storagetypes.MsgMigrateBucket, TPriority)
    // GetMigrateBucketInfo returns the user's MsgCreateBucket.
    GetMigrateBucketInfo() *storagetypes.MsgMigrateBucket
    // SetMigrateBucketInfo sets the MsgCreateBucket. Should try to avoid calling
    // this method, it will change the approval information.
    SetMigrateBucketInfo(*storagetypes.MsgMigrateBucket)
}
```

#### ApprovalCreateObjectTask

ApprovalCreateObjectTask is an abstract interface to record the ask create object approval information. The user account will
create MsgCreateObject, the SP should decide whether approved the request based on the MsgCreateObject. If so, the sp will
SetExpiredHeight and signs MsgCreateObject.

```go
type ApprovalCreateObjectTask interface {
    ApprovalTask
    // InitApprovalCreateObjectTask inits the ApprovalCreateObjectTask by
    // MsgCreateObject and task priority. SP only fill the MsgCreateObject's
    // PrimarySpApproval field, can not change other fields.
    InitApprovalCreateObjectTask(*storagetypes.MsgCreateObject, TPriority)
    // GetCreateObjectInfo returns the user's MsgCreateObject.
    GetCreateObjectInfo() *storagetypes.MsgCreateObject
    // SetCreateObjectInfo sets the MsgCreateObject. Should try to avoid calling
    // this method, it will change the approval information.
    SetCreateObjectInfo(*storagetypes.MsgCreateObject)
}
```

#### ApprovalReplicatePieceTask

ApprovalReplicatePieceTask is an abstract interface to record the ask replicate pieces to other SPs(as secondary SP for the object).
It is initiated by the primary SP in the replicate pieces phase.  Before the primary SP sends it to other SPs, the primary
SP will sign the task, other SPs will verify it is sent by a legitimate SP. If other SPs approved the approval, they will
SetExpiredHeight and signs ApprovalReplicatePieceTask.

```go
type ApprovalReplicatePieceTask interface {
    ObjectTask
    ApprovalTask
    // InitApprovalReplicatePieceTask inits the ApprovalReplicatePieceTask by ObjectInfo,
    // storage params, task priority and primary operator address. the storage params
    // can affect the size of the data accepted by secondary SP, so this is a necessary
    // and cannot be changed parameter.
    InitApprovalReplicatePieceTask(object *storagetypes.ObjectInfo, params *storagetypes.Params, priority TPriority, askOpAddress string)
    // GetAskSpOperatorAddress returns the operator address of SP that initiated the ask
    // replicate piece approval request.
    GetAskSpOperatorAddress() string
    // SetAskSpOperatorAddress sets the operator address of SP that initiated the ask
    // replicate piece approval request. Should try to avoid calling this method,
    // it will change the approval information.
    SetAskSpOperatorAddress(string)
    // GetAskSignature returns the initiated signature of SP signature by its operator private key.
    GetAskSignature() []byte
    // SetAskSignature sets the initiated signature of SP by its operator private key.
    SetAskSignature([]byte)
    // GetApprovedSpOperatorAddress returns the approved operator address of SP.
    GetApprovedSpOperatorAddress() string
    // SetApprovedSpOperatorAddress sets the approved operator address of SP.
    SetApprovedSpOperatorAddress(string)
    // GetApprovedSignature returns the approved signature of SP.
    GetApprovedSignature() []byte
    // SetApprovedSignature sets the approved signature of SP.
    SetApprovedSignature([]byte)
    // GetApprovedSpEndpoint returns the approved endpoint of SP. It is used to replicate
    // pieces to secondary SP.
    GetApprovedSpEndpoint() string
    // SetApprovedSpEndpoint sets the approved endpoint of SP.
    SetApprovedSpEndpoint(string)
    // GetApprovedSpApprovalAddress returns the approved approval address of SP. It is
    // used to seal object on greenfield.
    GetApprovedSpApprovalAddress() string
    // SetApprovedSpApprovalAddress sets the approved approval address of SP.
    SetApprovedSpApprovalAddress(string)
    // GetSignBytes returns the bytes from the task for initiated and approved SPs
    // to sign.
    GetSignBytes() []byte
}
```

### ObjectTask

The ObjectTask associated with an object and storage params, and records the information of different stages of the object.
Considering the change of storage params on the greenfield, the storage params of each object should be determined when
it is created, and it should not be queried during the task flow, which is inefficient and error-prone.

```go
type ObjectTask interface {
    Task
    // GetObjectInfo returns the associated object.
    GetObjectInfo() *storagetypes.ObjectInfo
    // SetObjectInfo set the  associated object.
    SetObjectInfo(*storagetypes.ObjectInfo)
    // GetStorageParams returns the storage params.
    GetStorageParams() *storagetypes.Params
    // SetStorageParams sets the storage params.Should try to avoid calling this
    // method, it will change the task base information.
    // For example: it will change resource estimate for UploadObjectTask and so on.
    SetStorageParams(*storagetypes.Params)
}
```

#### UploadObjectTask

The UploadObjectTask is an abstract interface to record the information for uploading object payload data to the primary SP.

```go
type UploadObjectTask interface {
    ObjectTask
    // InitUploadObjectTask inits the UploadObjectTask by ObjectInfo and Params.
    InitUploadObjectTask(vgfID uint32, object *storagetypes.ObjectInfo, params *storagetypes.Params, timeout int64)
    // GetVirtualGroupFamilyId returns the object's virtual group family which is bind in bucket.
    GetVirtualGroupFamilyId() uint32
    // GetIsAgentUpload returns Whether the task is a agent upload
    GetIsAgentUpload() bool
}
```

### ResumableUploadObjectTask

The ResumableUploadObjectTask is an abstract interface to record the information for resumable uploading object payload data to the primary SP.

```go
type ResumableUploadObjectTask interface {
    ObjectTask
    // InitResumableUploadObjectTask inits the UploadObjectTask by ObjectInfo and Params.
    InitResumableUploadObjectTask(vgfID uint32, object *storagetypes.ObjectInfo, params *storagetypes.Params, timeout int64, complete bool, offset uint64)
    // GetVirtualGroupFamilyId returns the object's virtual group family which is bind in bucket.
    GetVirtualGroupFamilyId() uint32
    // GetResumeOffset return resumable offset user-supplied parameters
    GetResumeOffset() uint64
    // SetResumeOffset Set the `ResumeOffset` provided by the user for subsequent processing in the `HandleResumableUploadObjectTask`.
    SetResumeOffset(offset uint64)
    // GetCompleted The GetCompleted() function returns the value of completed set by the user in the request.
    // The completed parameter represents the last upload request in the resumable upload process,
    // after which integrity checks and replication procedures will be performed.
    GetCompleted() bool
    // SetCompleted sets the state from request in InitResumableUploadObjectTask
    SetCompleted(completed bool)
	// GetIsAgentUpload returns Whether the task is a agent upload
	GetIsAgentUpload() bool
}
```

#### ReplicatePieceTask

The ReplicatePieceTask is an abstract interface to record the information for replicating pieces of object payload data to secondary SPs.

```go
type ReplicatePieceTask interface {
    ObjectTask
    // InitReplicatePieceTask inits the ReplicatePieceTask by ObjectInfo, params,
    // task priority, timeout and max retry.
    InitReplicatePieceTask(object *storagetypes.ObjectInfo, params *storagetypes.Params, priority TPriority, timeout int64, retry int64)
    // GetSealed returns an indicator whether successful seal object on greenfield
    // after replicate pieces, it is an optimization method. ReplicatePieceTask and
    // SealObjectTask are combined. Otherwise, the two tasks will be completed in
    // two stages. If the combination is successful and the seal object is successful,
    // the number of SealObjectTask can be reduced, saving resource overhead.
    GetSealed() bool
    // SetSealed sets the state successful seal object after replicating piece.
    SetSealed(bool)
    // GetSecondaryAddresses returns the secondary SP's addresses. It is used to
    // generate MsgSealObject.
    GetSecondaryAddresses() []string
    // SetSecondaryAddresses sets the secondary SP's addresses.
    SetSecondaryAddresses([]string)
    // GetSecondarySignatures returns the secondary SP's signatures. It is used to
    // generate MsgSealObject.
    GetSecondarySignatures() [][]byte
    // SetSecondarySignatures sets the secondary SP's signatures.
    SetSecondarySignatures([][]byte)
    // GetGlobalVirtualGroupId returns the object's global virtual group id.
    GetGlobalVirtualGroupId() uint32
    // GetSecondaryEndpoints return the secondary sp domain.
    GetSecondaryEndpoints() []string
    // GetIsAgentUpload returns the task's isAgentUpload.
    GetIsAgentUpload() bool
}
```

#### ReceivePieceTask

The ReceivePieceTask is an abstract interface to record the information for receiving pieces of object payload data from primary
SP, it exists only in secondary SP.

```go
type ReceivePieceTask interface {
    ObjectTask
    // InitReceivePieceTask init the ReceivePieceTask.
    InitReceivePieceTask(vgfID uint32, object *storagetypes.ObjectInfo, params *storagetypes.Params, priority TPriority,
    segmentIdx uint32, redundancyIdx int32, pieceSize int64)
    // GetSegmentIdx returns the piece index. The piece index identifies the serial number
    // of segment of object payload data for object piece copy.
    GetSegmentIdx() uint32
    // SetSegmentIdx sets the segment index.
    SetSegmentIdx(uint32)
    // GetRedundancyIdx returns the redundancy index. The redundancy index identifies the
    // serial number of the secondary SP for object piece copy.
    GetRedundancyIdx() int32
    // SetRedundancyIdx sets the redundancy index.
    SetRedundancyIdx(int32)
    // GetPieceSize returns the received piece data size, it is used to resource estimate.
    GetPieceSize() int64
    // SetPieceSize sets the received piece data size.
    SetPieceSize(int64)
    // GetPieceChecksum returns the checksum of received piece data, it is used to check
    // the piece data is correct.
    GetPieceChecksum() []byte
    // SetPieceChecksum set the checksum of received piece data.
    SetPieceChecksum([]byte)
    // GetSignature returns the primary signature of SP, because the InitReceivePieceTask
    // will be transfer to secondary SP, It is necessary to prove that the task was
    // sent by a legitimate SP.
    GetSignature() []byte
    // SetSignature sets the primary signature of SP.
    SetSignature([]byte)
    // GetSignBytes returns the bytes from the task for primary SP to sign.
    GetSignBytes() []byte
    // GetSealed returns an indicator whether the object of receiving piece data is
    // sealed on greenfield, the secondary SP has an incentive to confirm that otherwise
    // it wastes its storage resources
    GetSealed() bool
    // SetSealed sets the object of receiving piece data whether is successfully sealed.
    SetSealed(bool)
    // GetFinished returns whether replicate piece is done
    GetFinished() bool
    // SetFinished sets finished field
    SetFinished(bool)
    // GetGlobalVirtualGroupId returns the object's global virtual group id.
    GetGlobalVirtualGroupId() uint32
    // SetGlobalVirtualGroupID sets the object's global virtual group id.
    SetGlobalVirtualGroupID(uint32)
    // GetBucketMigration returns whether receiver does bucket migration
    GetBucketMigration() bool
    // SetBucketMigration sets the bucket migration
    SetBucketMigration(bool)
    // GetIsAgentUpload return the task's is_agent_upload field
    GetIsAgentUpload() bool
}
```

#### SealObjectTask

The SealObjectTask is an abstract interface to  record the information for sealing object to the Greenfield chain.

```go
type SealObjectTask interface {
    ObjectTask
    // InitSealObjectTask inits the SealObjectTask.
    InitSealObjectTask(vgfID uint32, object *storagetypes.ObjectInfo, params *storagetypes.Params, priority TPriority, addresses []string,
    signatures [][]byte, timeout int64, retry int64)
    // GetSecondaryAddresses return the secondary SP's addresses.
    GetSecondaryAddresses() []string
    // GetSecondarySignatures return the secondary SP's signature, it is used to generate
    // MsgSealObject.
    GetSecondarySignatures() [][]byte
    // GetGlobalVirtualGroupId returns the object's global virtual group id.
    GetGlobalVirtualGroupId() uint32
}
```

#### DownloadObjectTask

The DownloadObjectTask is an abstract interface to record the information for downloading pieces of object payload data.

```go
type DownloadObjectTask interface {
    ObjectTask
    // InitDownloadObjectTask inits DownloadObjectTask.
    InitDownloadObjectTask(object *storagetypes.ObjectInfo, bucket *storagetypes.BucketInfo, params *storagetypes.Params,
    priority TPriority, userAddress string, low int64, high int64, timeout int64, retry int64)
    // GetBucketInfo returns the BucketInfo of the download object.
    // It is used to Query and calculate bucket read quota.
    GetBucketInfo() *storagetypes.BucketInfo
    // SetBucketInfo sets the BucketInfo of the download object.
    SetBucketInfo(*storagetypes.BucketInfo)
    // GetSize returns the download payload data size, high - low + 1.
    GetSize() int64
    // GetLow returns the start offset of download payload data.
    GetLow() int64
    // GetHigh returns the end offset of download payload data.
    GetHigh() int64
}
```

#### DownloadPieceTask

DownloadPieceTask is an abstract interface to record the information for downloading piece data.

```go
type DownloadPieceTask interface {
    ObjectTask
    // InitDownloadPieceTask inits DownloadPieceTask.
    InitDownloadPieceTask(object *storagetypes.ObjectInfo, bucket *storagetypes.BucketInfo, params *storagetypes.Params,
        priority TPriority, enableCheck bool, userAddress string, totalSize uint64, pieceKey string, pieceOffset uint64,
        pieceLength uint64, timeout int64, maxRetry int64)
    // GetBucketInfo returns the BucketInfo of the download object.
    // It is used to Query and calculate bucket read quota.
    GetBucketInfo() *storagetypes.BucketInfo
    // SetBucketInfo sets the BucketInfo of the download object.
    SetBucketInfo(*storagetypes.BucketInfo)
    // GetUserAddress returns the user account of downloading object.
    // It is used to record the read bucket information.
    GetUserAddress() string
    // SetUserAddress sets the user account of downloading object.
    SetUserAddress(string)
    // GetSize returns the download payload data size.
    GetSize() int64
    // GetEnableCheck returns enable_check flag.
    GetEnableCheck() bool
    // GetTotalSize returns total size.
    GetTotalSize() uint64
    // GetPieceKey returns piece key.
    GetPieceKey() string
    // GetPieceOffset returns piece offset.
    GetPieceOffset() uint64
    // GetPieceLength returns piece length.
    GetPieceLength() uint64
}
```

#### ChallengePieceTask

ChallengePieceTask is an abstract interface to record the information for get challenge piece info, the validator get challenge
info to confirm whether the sp stores the user's data correctly.

```go
type ChallengePieceTask interface {
    ObjectTask
    // InitChallengePieceTask inits InitChallengePieceTask.
    InitChallengePieceTask(object *storagetypes.ObjectInfo, bucket *storagetypes.BucketInfo, params *storagetypes.Params,
        priority TPriority, userAddress string, replicateIdx int32, segmentIdx uint32, timeout int64, retry int64)
    // GetBucketInfo returns the BucketInfo of challenging piece
    GetBucketInfo() *storagetypes.BucketInfo
    // SetBucketInfo sets the BucketInfo of challenging piece
    SetBucketInfo(*storagetypes.BucketInfo)
    // GetUserAddress returns the user account of challenging object.
    // It is used to record the read bucket information.
    GetUserAddress() string
    // SetUserAddress sets the user account of challenging object.
    SetUserAddress(string)
    // GetSegmentIdx returns the segment index of challenge piece.
    GetSegmentIdx() uint32
    // SetSegmentIdx sets the segment index of challenge piece.
    SetSegmentIdx(uint32)
    // GetRedundancyIdx returns the replicate index of challenge piece.
    GetRedundancyIdx() int32
    // SetRedundancyIdx sets the replicate index of challenge piece.
    SetRedundancyIdx(idx int32)
    // GetIntegrityHash returns the integrity hash of the object.
    GetIntegrityHash() []byte
    // SetIntegrityHash sets the integrity hash of the object.
    SetIntegrityHash([]byte)
    // GetPieceHash returns the hash of  challenge piece.
    GetPieceHash() [][]byte
    // SetPieceHash sets the hash of  challenge piece.
    SetPieceHash([][]byte)
    // GetPieceDataSize returns the data of challenge piece.
    GetPieceDataSize() int64
    // SetPieceDataSize sets the data of challenge piece.
    SetPieceDataSize(int64)
}
```

### GC Task

GCTask is an abstract interface to record the information of garbage collection.

```go
type GCTask interface {
    Task
}
```

#### GCObjectTask

The GCObjectTask is an abstract interface to record the information for collecting the piece store space by deleting object payload
data that the object has been deleted on Greenfield chain.

```go
type GCObjectTask interface {
    GCTask
    // InitGCObjectTask inits InitGCObjectTask.
    InitGCObjectTask(priority TPriority, start, end uint64, timeout int64)
    // SetStartBlockNumber sets start block number for collecting object.
    SetStartBlockNumber(uint64)
    // GetStartBlockNumber returns start block number for collecting object.
    GetStartBlockNumber() uint64
    // SetEndBlockNumber sets end block number for collecting object.
    SetEndBlockNumber(uint64)
    // GetEndBlockNumber returns end block number for collecting object.
    GetEndBlockNumber() uint64
    // SetCurrentBlockNumber sets the collecting block number.
    SetCurrentBlockNumber(uint64)
    // GetCurrentBlockNumber returns the collecting block number.
    GetCurrentBlockNumber() uint64
    // GetLastDeletedObjectId returns the last deleted ObjectID.
    GetLastDeletedObjectId() uint64
    // SetLastDeletedObjectId sets the last deleted ObjectID.
    SetLastDeletedObjectId(uint64)
    // GetGCObjectProgress returns the progress of collecting object, returns the
    // deleting block number and the last deleted object id.
    GetGCObjectProgress() (uint64, uint64)
    // SetGCObjectProgress sets the progress of collecting object, params stand
    // the deleting block number and the last deleted object id.
    SetGCObjectProgress(uint64, uint64)
}
```

#### GCZombiePieceTask

The GCZombiePieceTask is an abstract interface to record the information for collecting the piece store space by deleting zombie
pieces data that dues to any exception, the piece data meta is not on chain but the pieces has been store in piece store.

```go
type GCZombiePieceTask interface {
    GCTask
    // GetGCZombiePieceStatus returns the status of collecting zombie pieces, returns
    // the last deleted object id and the number that has been deleted.
    GetGCZombiePieceStatus() (uint64, uint64)
    // SetGCZombiePieceStatus sets the status of collecting zombie pieces, param
    // stands the last deleted object id and the has been deleted pieces number.
    SetGCZombiePieceStatus(uint64, uint64)
}
```

#### GCMetaTask

The GCMetaTask is an abstract interface to record the information for collecting the SP meta store space by deleting the expired data.

```go
type GCMetaTask interface {
    GCTask
    // GetGCMetaStatus returns the status of collecting metadata, returns the last
    // deleted object id and the number that has been deleted.
    GetGCMetaStatus() (uint64, uint64)
    // SetGCMetaStatus sets the status of collecting metadata, parma stands the last
    // deleted object id and the number that has been deleted.
    SetGCMetaStatus(uint64, uint64)
}
```

### RecoveryPieceTask

The RecoveryPieceTask is the interface to record the information for recovering

```go
type RecoveryPieceTask interface {
    ObjectTask
    // InitRecoverPieceTask inits the RecoveryPieceTask by ObjectInfo, params,
    // task priority, pieceIndex, timeout and max retry.
    InitRecoverPieceTask(object *storagetypes.ObjectInfo, params *storagetypes.Params,
        priority TPriority, pieceIdx uint32, ecIdx int32, pieceSize uint64, timeout int64, retry int64)

    // GetSegmentIdx return the segment index of recovery object segment
    GetSegmentIdx() uint32
    // GetEcIdx return the ec index of recovery ec chunk
    GetEcIdx() int32
    // GetSignature returns the primary SP's signature
    GetSignature() []byte
    // SetSignature sets the primary SP's signature.
    SetSignature([]byte)
    // GetSignBytes returns the bytes from the task for primary SP to sign.
    GetSignBytes() []byte
    GetRecovered() bool
    // SetRecoverDone set the recovery status as finish
    SetRecoverDone()
}
```

### MigrateGVGTask

MigrateGVGTask is an abstract interface to record migrate gvg information.

```go
type MigrateGVGTask interface {
    Task
    // InitMigrateGVGTask inits migrate gvg task by bucket id, gvg.
    InitMigrateGVGTask(priority TPriority, bucketID uint64, srcGvg *virtualgrouptypes.GlobalVirtualGroup,
        redundancyIndex int32, srcSP *sptypes.StorageProvider, timeout int64, retry int64)
    // GetSrcGvg returns the src global virtual group
    GetSrcGvg() *virtualgrouptypes.GlobalVirtualGroup
    // SetSrcGvg sets the src global virtual group
    SetSrcGvg(*virtualgrouptypes.GlobalVirtualGroup)
    // GetDestGvg returns the dest global virtual group
    GetDestGvg() *virtualgrouptypes.GlobalVirtualGroup
    // SetDestGvg sets the dest global virtual group
    SetDestGvg(*virtualgrouptypes.GlobalVirtualGroup)
    // GetSrcSp returns the src storage provider
    GetSrcSp() *sptypes.StorageProvider
    // SetSrcSp sets the src storage provider
    SetSrcSp(*sptypes.StorageProvider)
    // GetBucketID returns the bucketID
    GetBucketID() uint64
    // SetBucketID sets the bucketID
    SetBucketID(uint64)
    // GetRedundancyIdx returns the redundancy index
    GetRedundancyIdx() int32
    // SetRedundancyIdx sets the redundancy index
    SetRedundancyIdx(int32)
    // GetLastMigratedObjectID returns the last modified objectID
    GetLastMigratedObjectID() uint64
    // SetLastMigratedObjectID sets the last migrated objectID
    SetLastMigratedObjectID(uint64)
    // GetFinished returns the task whether finished
    GetFinished() bool
    // SetFinished sets the migrated gvg task status when finished
    SetFinished(bool)
}
```

## Task Type Definition

```go
// TType is enum type, it defines the type of task.
type TType int32

const (
    // TypeTaskUnknown defines the default task type.
    TypeTaskUnknown TType = iota
    // TypeTaskCreateBucketApproval defines the type of asking create bucket approval
    // to primary SP task
    TypeTaskCreateBucketApproval
    // TypeTaskCreateObjectApproval defines the type of asking create object approval
    // to primary SP task
    TypeTaskCreateObjectApproval
    // TypeTaskReplicatePieceApproval defines the type of asking create object approval
    // to secondary SP task
    TypeTaskReplicatePieceApproval
    // TypeTaskUpload defines the type of uploading object to primary SP task.
    TypeTaskUpload
    // TypeTaskReplicatePiece defines the type of replicating pieces to secondary SPs task.
    TypeTaskReplicatePiece
    // TypeTaskSealObject defines the type of sealing object to the chain task.
    TypeTaskSealObject
    // TypeTaskReceivePiece defines the type of receiving pieces for secondary SP task.
    TypeTaskReceivePiece
    // TypeTaskDownloadObject defines the type of downloading object task.
    TypeTaskDownloadObject
    // TypeTaskDownloadPiece defines the type of downloading piece task.
    TypeTaskDownloadPiece
    // TypeTaskChallengePiece defines the type of challenging piece task.
    TypeTaskChallengePiece
    // TypeTaskGCObject defines the type of collecting object payload data task.
    TypeTaskGCObject
    // TypeTaskGCZombiePiece defines the type of collecting zombie piece task.
    TypeTaskGCZombiePiece
    // TypeTaskGCMeta defines the type of collecting SP metadata task.
    TypeTaskGCMeta
)
```

## Task Priority

Each type of task has a priority, the range of priority is [0, 255], the higher the priority, the higher the urgency to
be executed, the greater the probability of being executed by priority scheduling.

```go
type TPriority uint8

const (
    // UnKnownTaskPriority defines the default task priority.
    UnKnownTaskPriority TPriority = 0
    // UnSchedulingPriority defines the task priority that should be never scheduled.
    UnSchedulingPriority TPriority = 0
    // MaxTaskPriority defines the max task priority.
    MaxTaskPriority TPriority = 255
    // DefaultLargerTaskPriority defines the larger task priority.
    DefaultLargerTaskPriority TPriority = 170
    // DefaultSmallerPriority defines the smaller task priority.
    DefaultSmallerPriority TPriority = 85
)
```

## Task Priority Level

Task priority is divided into three levels, TLowPriorityLevel, TMediumPriorityLevel, THighPriorityLevel. The TLowPriorityLevel
default priority range is [0, 85), The TMediumPriorityLevel default priority range is [85, 170), The THighPriorityLevel
default priority range is [170, 256). When allocating for task execution resources from ResourceManager, the resources
are allocated according to task priority level, but not task priority, because task priority up to 256 levels, the task priority
level make resource management easier.

```text
Example:
    the resource limit configuration of task execution node :
        [TasksHighPriority: 30, TasksMediumPriority: 20, TasksLowPriority: 2]
    the executor of the task can run 30 high level tasks at the same time that the
        task priority between [170, 255]
    the executor of the task can run 20 medium level tasks at the same time that the
        task priority between [85, 170)
    the executor of the task can run 2 medium level tasks at the same time that the
        task priority < 85
```

```go
type TPriorityLevel int32

const (
    // TLowPriorityLevel defines the low task priority level.
    TLowPriorityLevel TPriorityLevel = iota
    // TMediumPriorityLevel defines the medium task priority level.
    TMediumPriorityLevel
    // THighPriorityLevel defines the high task priority level.
    THighPriorityLevel
)
```

## Task Init

Each task needs to call its InitXXXTask method before use. This method requires passing in the necessary parameters of
each type of task. These parameters will not be changed in most cases and are necessary, such as task priority, timeout,
max retries, and necessary information for resource estimation.

Any changes to initialization parameters during task execution may cause unpredictable consequences. For example, changes
in parameters that affect resource estimation may cause OOM, etc.
