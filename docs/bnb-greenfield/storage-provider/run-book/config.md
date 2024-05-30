---
title: SP Config
---

## SP Config

This section gives you a complete config of SP. `./gnfd-sp config.dump` will generate a template config.toml.

```toml
# optional
Env = ''
# optional
AppID = ''
# optional
Server = []
# optional
GRPCAddress = ''

[SpDB]
# required
User = ''
# required
Passwd = ''
# required
Address = ''
# required
Database = ''
# optional
ConnMaxLifetime = 0
# optional
ConnMaxIdleTime = 0
# optional
MaxIdleConns = 0
# optional
MaxOpenConns = 0
# optional
EnableTracePutEvent = false

[BsDB]
# required
User = ''
# required
Passwd = ''
# required
Address = ''
# required
Database = ''
# optional
ConnMaxLifetime = 0
# optional
ConnMaxIdleTime = 0
# optional
MaxIdleConns = 0
# optional
MaxOpenConns = 0
# optional
EnableTracePutEvent = false

[PieceStore]
# required
Shards = 0

[PieceStore.Store]
# required
Storage = ''
# optional
BucketURL = ''
# optional
MaxRetries = 0
# optional
MinRetryDelay = 0
# optional
TLSInsecureSkipVerify = false
# required
IAMType = ''

[Chain]
# required
ChainID = ''
# required
ChainAddress = []
# optional
SealGasLimit = 0
# optional
SealFeeAmount = 0
# optional
RejectSealGasLimit = 0
# optional
RejectSealFeeAmount = 0
# optional
DiscontinueBucketGasLimit = 0
# optional
DiscontinueBucketFeeAmount = 0
# optional
CreateGlobalVirtualGroupGasLimit = 0
# optional
CreateGlobalVirtualGroupFeeAmount = 0
# optional
CompleteMigrateBucketGasLimit = 0
# optional
CompleteMigrateBucketFeeAmount = 0

[SpAccount]
# required
SpOperatorAddress = ''
# required
OperatorPrivateKey = ''
# optional
FundingPrivateKey = ''
# required
SealPrivateKey = ''
# required
ApprovalPrivateKey = ''
# required
GcPrivateKey = ''
# required
BlsPrivateKey = ''

[Endpoint]
# required
ApproverEndpoint = ''
# required
ManagerEndpoint = ''
# required
DownloaderEndpoint = ''
# required
ReceiverEndpoint = ''
# required
MetadataEndpoint = ''
# required
UploaderEndpoint = ''
# required
P2PEndpoint = ''
# required
SignerEndpoint = ''
# required
AuthenticatorEndpoint = ''

[Approval]
# optional
BucketApprovalTimeoutHeight = 0
# optional
ObjectApprovalTimeoutHeight = 0
# optional
ReplicatePieceTimeoutHeight = 0

[Bucket]
# optional
AccountBucketNumber = 0
# optional
MaxListReadQuotaNumber = 0
# optional
MaxPayloadSize = 0

[Gateway]
# required
DomainName = ''
# required
HTTPAddress = ''

[Executor]
# optional
MaxExecuteNumber = 0
# optional
AskTaskInterval = 0
# optional
AskReplicateApprovalTimeout = 0
# optional
AskReplicateApprovalExFactor = 0.0
# optional
ListenSealTimeoutHeight = 0
# optional
ListenSealRetryTimeout = 0
# optional
MaxListenSealRetry = 0
# optional
MaxObjectMigrationRetry = 0
# optional
ObjectMigrationRetryTimeout = 0
# optional
EnableSkipFailedToMigrateObject = false
# optional
BucketTrafficKeepTimeDay = 0
# optional
ReadRecordKeepTimeDay = 0
# optional
ReadRecordDeleteLimit = 0

[P2P]
# optional
P2PPrivateKey = ''
# optional
P2PAddress = ''
# optional
P2PAntAddress = ''
# optional
P2PBootstrap = []
# optional
P2PPingPeriod = 0

[Parallel]
# optional
GlobalCreateBucketApprovalParallel = 0
# optional
GlobalCreateObjectApprovalParallel = 0
# optional
GlobalMaxUploadingParallel = 0
# optional
GlobalUploadObjectParallel = 0
# optional
GlobalReplicatePieceParallel = 0
# optional
GlobalSealObjectParallel = 0
# optional
GlobalReceiveObjectParallel = 0
# optional
GlobalRecoveryPieceParallel = 0
# optional
GlobalMigrateGVGParallel = 0
# optional
GlobalBackupTaskParallel = 0
# optional
GlobalDownloadObjectTaskCacheSize = 0
# optional
GlobalChallengePieceTaskCacheSize = 0
# optional
GlobalSyncConsensusInfoInterval = 0
# optional
GlobalGCObjectParallel = 0
# optional
GlobalGCBucketMigrationParallel = 0
# optional
GlobalGCZombieParallel = 0
# optional
GlobalGCMetaParallel = 0
# optional
UploadObjectParallelPerNode = 0
# optional
ReceivePieceParallelPerNode = 0
# optional
DownloadObjectParallelPerNode = 0
# optional
ChallengePieceParallelPerNode = 0
# optional
AskReplicateApprovalParallelPerNode = 0
# optional
QuerySPParallelPerNode = 0
# required
DiscontinueBucketEnabled = false
# optional
DiscontinueBucketTimeInterval = 0
# required
DiscontinueBucketKeepAliveDays = 0
# optional
LoadReplicateTimeout = 0
# optional
LoadSealTimeout = 0

[Task]
# optional
UploadTaskSpeed = 0
# optional
DownloadTaskSpeed = 0
# optional
ReplicateTaskSpeed = 0
# optional
ReceiveTaskSpeed = 0
# optional
SealObjectTaskTimeout = 0
# optional
SealObjectTaskRetry = 0
# optional
ReplicateTaskRetry = 0
# optional
ReceiveConfirmTaskRetry = 0
# optional
GcObjectTaskTimeout = 0
# optional
GcZombieTaskTimeout = 0
# optional
GcMetaTaskTimeout = 0
# optional
GcObjectTaskRetry = 0
# optional
GcZombieTaskRetry = 0
# optional
GcMetaTaskRetry = 0

[Monitor]
# required
DisableMetrics = false
# required
DisablePProf = false
# required
DisableProbe = false
# required
MetricsHTTPAddress = ''
# required
PProfHTTPAddress = ''
# required
ProbeHTTPAddress = ''

# optional
[Rcmgr]
# optional
DisableRcmgr = false

[Log]
# optional
Level = ''
# optional
Path = ''

[BlockSyncer]
# required
Modules = ['epoch','bucket','object','payment','group','permission','storage_provider','prefix_tree','virtual_group','sp_exit_events','object_id_map','general']
# required
Workers = 0
# optional
BsDBWriteAddress = ''

[APIRateLimiter]
# every line should represent one entry of gateway route. The comment after each line must contain which route name it represents.
# Most of APIs has a qps number, offered by QA team.  That usually means the max qps for the whole 4 gateway cluster.
# How to setup the RateLimit value, it is a sophistcated question and need take a lot of factors into account.
# 1. For most query-APIs, we can setup a rate limit up to the 1/4 of max qps, as the config is for only one gateway instance.
# 2. Also we avoid to setup a too large or too small rate limit value.
# 3. For upload/download APIs, it is diffiult to use a rate limit as a protect mechanism for the servers. Because the performance of upload/download interactions usually dependens on how large the file is processed.
# 4. We tetatively setup 50~75 as the rate limit for the download/upload APIs and we can ajdust them once we have a better experience.
# 5. Currently, please only put one name inside the name list of PathPatttern

# optional
PathPattern = [
  {Key = "/auth/request_nonce", Method = "GET", Names = ["GetRequestNonce"]},
  {Key = "/auth/update_key", Method = "POST", Names = ["UpdateUserPublicKey"]},
  {Key = "/permission/.+/[^/]*/.+", Method = "GET", Names = ["VerifyPermission"]},
  {Key = "/greenfield/admin/v1/get-approval", Method = "GET", Names = ["GetApproval"]},
  {Key = "/greenfield/admin/v1/challenge", Method = "GET", Names = ["GetChallengeInfo"]},
  {Key = "/greenfield/admin/v2/challenge", Method = "GET", Names = ["GetChallengeInfo"]},
  {Key = "/greenfield/receiver/v1/replicate-piece", Method = "PUT", Names = ["ReplicateObjectPiece"]},
  {Key = "/greenfield/recovery/v1/get-piece", Method = "GET", Names = ["RecoveryPiece"]},
  {Key = "/greenfield/migrate/v1/notify-migrate-swap-out-task", Method = "POST", Names = ["NotifyMigrateSwapOut"]},
  {Key = "/greenfield/migrate/v1/migrate-piece", Method = "GET", Names = ["MigratePiece"]},
  {Key = "/greenfield/migrate/v1/migration-bucket-approval", Method = "GET", Names = ["MigrationBucketApproval"]},
  {Key = "/greenfield/migrate/v1/get-swap-out-approval", Method = "GET", Names = ["SwapOutApproval"]},
  {Key = "/download/[^/]*/.+", Method = "GET", Names = ["DownloadObjectByUniversalEndpoint"]},{Key = "/download", Method = "GET", Names = ["DownloadObjectByUniversalEndpoint"]},
  {Key = "/view/[^/]*/.+", Method = "GET", Names = ["ViewObjectByUniversalEndpoint"]},{Key = "/view", Method = "GET", Names = ["ViewObjectByUniversalEndpoint"]},
  {Key = "/status", Method = "GET", Names = ["GetStatus"]},
  {Key = "/.+/.+[?]offset.*", Method = "POST", Names = ["ResumablePutObject"]},
  {Key = "/.+/.+[?]upload-context.*", Method = "GET", Names = ["QueryResumeOffset"]},
  {Key = "/.+/.+[?]upload-progress.*", Method = "GET", Names = ["QueryUploadProgress"]},
  {Key = "/.+/.+[?]bucket-meta.*", Method = "GET", Names = ["GetBucketMeta"]},
  {Key = "/.+/.+[?]object-meta.*", Method = "GET", Names = ["GetObjectMeta"]},
  {Key = "/.+/.+[?]object-policies.*", Method = "GET", Names = ["ListObjectPolicies"]},
  {Key = "/.+[?]read-quota.*", Method = "GET", Names = ["GetBucketReadQuota"]},
  {Key = "/.+[?]list-read-quota.*", Method = "GET", Names = ["ListBucketReadRecord"]},
  {Key = "/[?].*group-query.*", Method = "GET", Names = ["GetGroupList"]},
  {Key = "/[?].*objects-query.*", Method = "GET", Names = ["ListObjectsByIDs"]},
  {Key = "/[?].*buckets-query.*", Method = "GET", Names = ["ListBucketsByIDs"]},
  {Key = "/[?].*verify-id.*", Method = "GET", Names = ["VerifyPermissionByID"]},
  {Key = "/[?].*user-groups.*", Method = "GET", Names = ["GetUserGroups"]},
  {Key = "/[?].*group-members.*", Method = "GET", Names = ["GetGroupMembers"]},
  {Key = "/[?].*owned-groups.*", Method = "GET", Names = ["GetUserOwnedGroups"]},

  {Key = "/.+/$", Method = "GET", Names = ["ListObjectsByBucket"]},
  {Key = "/.+/[?].*", Method = "GET", Names = ["ListObjectsByBucket"]},
  {Key = "/.+/.+", Method = "GET", Names = ["GetObject"]},
  {Key = "/.+/.+", Method = "PUT", Names = ["PutObject"]},
  {Key = "/$", Method = "GET", Names = ["GetUserBuckets"]},
  {Key = "/[?].*", Method = "GET", Names = ["GetUserBuckets"]},

]

NameToLimit = [
  {Name = "GetRequestNonce", RateLimit = 100, RatePeriod = 'S'}, # requestNonceRouterName 3000qps
  {Name = "UpdateUserPublicKey", RateLimit = 100, RatePeriod = 'S'}, # updateUserPublicKeyRouterName 4000qps
  {Name = "VerifyPermission", RateLimit = 100, RatePeriod = 'S'}, # verifyPermissionRouterName  1200qps
  {Name = "GetApproval", RateLimit = 35, RatePeriod = 'S'}, # approvalRouterName  150qps
  {Name = "GetChallengeInfo", RateLimit = 20, RatePeriod = 'S'}, # getChallengeInfoRouterName, no test data
  {Name = "ReplicateObjectPiece", RateLimit = 1000, RatePeriod = 'S'},  # replicateObjectPieceRouterName, no test data. Internal API among sps, no rate limit is needed.
  {Name = "RecoveryPiece", RateLimit = 1000, RatePeriod = 'S'}, # recoveryPieceRouterName, no test data. Internal API among sps, no rate limit is needed.
  {Name = "NotifyMigrateSwapOut", RateLimit = 10, RatePeriod = 'S'},  # notifyMigrateSwapOutRouterName, no test data. Internal API among sps, no rate limit is needed.
  {Name = "MigratePiece", RateLimit = 10, RatePeriod = 'S'}, # migratePieceRouterName, no test data
  {Name = "MigrationBucketApproval", RateLimit = 10, RatePeriod = 'S'}, # migrationBucketApprovalName, no test data
  {Name = "SwapOutApproval", RateLimit = 10, RatePeriod = 'S'}, # swapOutApprovalName, no test data
  {Name = "DownloadObjectByUniversalEndpoint", RateLimit = 50, RatePeriod = 'S'}, # downloadObjectByUniversalEndpointName, 50qps
  {Name = "ViewObjectByUniversalEndpoint", RateLimit = 50, RatePeriod = 'S'}, # viewObjectByUniversalEndpointName, 50qps
  {Name = "GetStatus", RateLimit = 200, RatePeriod = 'S'},# getStatusRouterName, 2000qps
  {Name = "ResumablePutObject", RateLimit = 30, RatePeriod = 'S'}, # resumablePutObjectRouterName , test data is same as putObject object 10qps
  {Name = "QueryResumeOffset", RateLimit = 30, RatePeriod = 'S'},  # queryResumeOffsetName, test data is same as putObject object 10qps
  {Name = "QueryUploadProgress", RateLimit = 50, RatePeriod = 'S'}, # queryUploadProgressRouterName, test data is same as putObject object 10qps
  {Name = "GetBucketMeta", RateLimit = 100, RatePeriod = 'S'}, # getBucketMetaRouterName, 400qps
  {Name = "GetObjectMeta", RateLimit = 100, RatePeriod = 'S'}, # getObjectMetaRouterName, 400qps
  {Name = "ListObjectPolicies", RateLimit = 200, RatePeriod = 'S'}, # listObjectPoliciesRouterName, 2000qps
  {Name = "GetBucketReadQuota", RateLimit = 200, RatePeriod = 'S'}, # getBucketReadQuotaRouterName
  {Name = "ListBucketReadRecord", RateLimit = 100, RatePeriod = 'S'}, # listBucketReadRecordRouterName
  {Name = "GetGroupList", RateLimit = 200, RatePeriod = 'S'}, # getGroupListRouterName， similar to getUserGroupsRouterName, 2000qps
  {Name = "ListObjectsByIDs", RateLimit = 200, RatePeriod = 'S'}, # listObjectsByIDsRouterName, 1200qps
  {Name = "ListBucketsByIDs", RateLimit = 200, RatePeriod = 'S'}, # listBucketsByIDsRouterName, 2000qps
  {Name = "VerifyPermissionByID", RateLimit = 200, RatePeriod = 'S'}, # verifyPermissionByIDRouterName, 1200qps
  {Name = "GetUserGroups", RateLimit = 200, RatePeriod = 'S'}, # getUserGroupsRouterName, 2000qps
  {Name = "GetGroupMembers", RateLimit = 200, RatePeriod = 'S'}, # getGroupMembersRouterName, 2000qps
  {Name = "GetUserOwnedGroups", RateLimit = 200, RatePeriod = 'S'}, # getUserOwnedGroupsRouterName, 2000qps

  {Name = "ListObjectsByBucket", RateLimit = 75, RatePeriod = 'S'}, # listObjectsByBucketRouterName, 300qps
  {Name = "GetObject", RateLimit = 75, RatePeriod = 'S'}, # getObjectRouterName, 100 qps
  {Name = "PutObject", RateLimit = 75, RatePeriod = 'S'}, # putObjectRouterName, 100 qps
  {Name = "GetUserBuckets", RateLimit = 75, RatePeriod = 'S'}] # getUserBucketsRouterName, 1000 qps

HostPattern = []

[Manager]
# optional
EnableLoadTask = false
# optional
EnableHealthyChecker = false
# optional
SubscribeSPExitEventIntervalMillisecond = 0
# optional
SubscribeSwapOutExitEventIntervalMillisecond = 0
# optional
SubscribeBucketMigrateEventIntervalMillisecond = 0
# optional
GVGPreferSPList = []
# optional
SPBlackList = []
# optional
EnableTaskRetryScheduler = false
# optional
RejectUnsealThresholdSecond = 0

[GC]
# optional
GCObjectTimeInterval = 0
# optional
GCObjectBlockInterval = 0
# optional
GCObjectSafeBlockDistance = 0
# optional
EnableGCZombie = false
# optional
GCZombieSafeObjectIDDistance = 0
# optional
GCZombiePieceTimeInterval = 0
# optional
GCZombiePieceObjectIDInterval = 0
# optional
EnableGCMeta = false
# optional
GCMetaTimeInterval = 0

[Quota]
# optional
MonthlyFreeQuota = 0
```

### App info

These fields are optional.

```shell
# optional
Env = ''
# optional
AppID = ''
# optional
Server = []
# optional
GRPCAddress = ''
```

### Database

To config `[SpDB]`, `[BsDB]`, you have to input the `user name`, `db password`,`db address`  and  `db name` in these fields.

### PieceStore

To config `[PieceStore]` and `[PieceStore.Store]`, you can read the details in this [doc](piece-store.md)

### Chain info

* `ChainID` of mainnet is `greenfield_1017-1` and testnet is `greenfield_5600-1`.
* `ChainAddress` is RPC endpoint of mainnet, you can find RPC info [here](../../for-developers/network-endpoint/endpoints.md)

### SpAccount

These private keys are generated during wallet setup.

### Endpoint

`[Endpoint]` specified the URL of different services.

For single-machine host (not recommended):

```toml
[Endpoint]
ApproverEndpoint = ''
ManagerEndpoint = ''
DownloaderEndpoint = ''
ReceiverEndpoint = ''
MetadataEndpoint = ''
UploaderEndpoint = ''
P2PEndpoint = ''
SignerEndpoint = ''
AuthenticatorEndpoint = ''
```

For K8S cluster:

```toml
[Endpoint]
ApproverEndpoint = 'manager:9333'
ManagerEndpoint = 'manager:9333'
DownloaderEndpoint = 'downloader:9333'
ReceiverEndpoint = 'receiver:9333'
MetadataEndpoint = 'metadata:9333'
UploaderEndpoint = 'uploader:9333'
P2PEndpoint = 'p2p:9333'
SignerEndpoint = 'signer:9333'
AuthenticatorEndpoint = 'localhost:9333'
```

### P2P

!!! note
    We don't use P2P service in mainnet and testnet, so users can ignore P2P items.

* `P2PPrivateKey` and `node_id` is generated by `./gnfd-sp p2p.create.key -n 1`
* `P2PAntAddress` is your load balance address. If you don't have a load balance address, you should have a public IP and use it in `P2PAddress`. It consists of `ip:port`.
* `P2PBootstrap` can be left empty.

### Gateway

```toml
[Gateway]
DomainName = 'region.sp-name.com'
```

The correct configuration should not include the protocol prefix `https://`.

### BlockSyncer

Here is block_syncer config. The configuration of BsDBWriteAddress can be the same as the BSDB.Address module here. To enhance performance, you can set up the write database address here and the corresponding read database address in BSDB.

```toml
Modules = ['epoch','bucket','object','payment','group','permission','storage_provider','prefix_tree', 'virtual_group','sp_exit_events','object_id_map','general']
Workers = 50
BsDBWriteAddress = 'localhost:3306'
```

### FundingPrivateKey

There is no need to write `FundingPrivateKey` in config.toml. It should be kept in cold wallet for safety.

### Rcmgr

ResourceManager manages resources within SP system, tracking and accounting for usage across the stack, from internal components to applications. It also allows for resource usage to be limited based on user-configurable policies. Config schema shows as below:

```proto
message GfSpLimit {
  int64 memory = 1;
  int32 tasks = 2;
  int32 tasks_high_priority = 3;
  int32 tasks_medium_priority = 4;
  int32 tasks_low_priority = 5;
  int32 fd = 6;
  int32 conns = 7;
  int32 conns_inbound = 8;
  int32 conns_outbound = 9;
}

message GfSpLimiter {
  GfSpLimit system = 1;
  GfSpLimit transient = 2;
  map<string, GfSpLimit> service_limit = 3;
}
```

### Quota

Here is quota config. The configuration of MonthlyFreeQuota define the free quota in each month.It will be reduced when the charge quota is exhausted.

```toml
[Quota]
MonthlyFreeQuota = 0
```

### SP Probe

It contains two probes: liveness and readiness probe. If users want to check SP whether is healthy and ready. Users can refer [Kubernetes docs](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/) to learn related concepts. About detailed SP probe info, users can refer [SP probe](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/core/prober/prober.go).

## SP Mainnet Recommended Config

This section shows the config of official in Greenfield, so users can add use similar config:

```toml
# optional
Env = "mainnet"
# optional
Server = []
# optional
GRPCAddress = '0.0.0.0:9333'

[SpDB]
# required
User = ''
# required
Passwd = ''
# required
Address = '{your_db_address}'
# required
Database = 'storage_provider_db'

[BsDB]
# required
User = ''
# required
Passwd = ''
# required
Address = '{your_db_address}'
# required
Database = 'block_syncer'

[PieceStore]
# required
Shards = 0

[PieceStore.Store]
# required
Storage = 's3'
# optional
BucketURL = '{your_bucker_url}'
# optional
MaxRetries = 5
# optional
MinRetryDelay = 0
# optional
TLSInsecureSkipVerify = false
# required
IAMType = 'SA'

[Chain]
# required
ChainID = 'greenfield_1017-1'
# required
ChainAddress = ['{your_fullnode_address}']

[SpAccount]
# required
SpOperatorAddress = '{your_operator_address}'
# required
# OperatorPrivateKey = ''
# required
# SealPrivateKey = ''
# required
# ApprovalPrivateKey = ''
# required
# GcPrivateKey = ''

[Endpoint]
# required
ApproverEndpoint = 'approver:9333'
# required
ManagerEndpoint = 'manager:9333'
# required
DownloaderEndpoint = 'downloader:9333'
# required
ReceiverEndpoint = 'receiver:9333'
# required
MetadataEndpoint = 'metadata:9333'
# required
UploaderEndpoint = 'uploader:9333'
# required
P2PEndpoint = 'p2p-service:9333'
# required
SignerEndpoint = 'signer:9333'
# required
AuthenticatorEndpoint = 'localhost:9333'

[Gateway]
# required
DomainName = '{your_domain_name}'
# required
HTTPAddress = '0.0.0.0:9033'

[P2P]
# optional
#P2PPrivateKey = ''
# optional
P2PAddress = '0.0.0.0:9933'
# optional
P2PAntAddress = ''
# optional
P2PBootstrap = []
# optional
# P2PPingPeriod = 0

[Parallel]
# optional
DiscontinueBucketEnabled = false
# optional
DiscontinueBucketKeepAliveDays = 365
# optional
GlobalMaxUploadingParallel = 3072
# optional
UploadObjectParallelPerNode = 100
# optional
ReceivePieceParallelPerNode = 1024
# optional
DownloadObjectParallelPerNode = 200
# optional
ChallengePieceParallelPerNode = 200
# optional
AskReplicateApprovalParallelPerNode = 10240
# optional
GlobalCreateBucketApprovalParallel = 1024
# optional
GlobalCreateObjectApprovalParallel = 1024
# optional
GlobalUploadObjectParallel = 1024
# optional
GlobalReplicatePieceParallel = 1024
# optional
GlobalSealObjectParallel = 1024
# optional
GlobalReceiveObjectParallel = 10240
# optional
GlobalBackupTaskParallel = 1024
# optional
GlobalRecoveryPieceParallel = 1024
# optional
GlobalGcObjectSafeBlockDistance = 64
# optional
GlobalMigrateGVGParallel = 10

[Monitor]
# required
DisableMetrics = false
# required
DisablePProf = false
# required
DisableProbe = false
# required
MetricsHTTPAddress = '0.0.0.0:24367'
# required
PProfHTTPAddress = '0.0.0.0:24368'
# required
ProbeHTTPAddress = '0.0.0.0:24369'

# optional
[Rcmgr]
# optional
DisableRcmgr = false
# optional
[Rcmgr.GfSpLimiter]
# optional
[Rcmgr.GfSpLimiter.System]
# optional
Memory = 4294967296
# optional
Tasks = 10240
# optional
TasksHighPriority = 128
# optional
TasksMediumPriority = 1024
# optional
TasksLowPriority = 16
# optional
Fd = 2147483647
# optional
Conns = 2147483647
# optional
ConnsInbound = 2147483647
# optional
ConnsOutbound = 2147483647

[BlockSyncer]
# required
Modules = ['epoch','bucket','object','payment','group','permission','storage_provider','prefix_tree','virtual_group','sp_exit_events','object_id_map','general']
# required
Workers = 50
# optional
BsDBWriteAddress = "{your_db_address}"

[APIRateLimiter]
# every line should represent one entry of gateway route. The comment after each line must contain which route name it represents.
# Most of APIs has a qps number, offered by QA team.  That usually means the max qps for the whole 4 gateway cluster.
# How to setup the RateLimit value, it is a sophistcated question and need take a lot of factors into account.
# 1. For most query-APIs, we can setup a rate limit up to the 1/4 of max qps, as the config is for only one gateway instance.
# 2. Also we avoid to setup a too large or too small rate limit value.
# 3. For upload/download APIs, it is diffiult to use a rate limit as a protect mechanism for the servers. Because the performance of upload/download interactions usually dependens on how large the file is processed.
# 4. We tetatively setup 50~75 as the rate limit for the download/upload APIs and we can ajdust them once we have a better experience.
# 5. Currently, please only put one name inside the name list of PathPatttern

# optional
PathPattern = [
    {Key = "/auth/request_nonce", Method = "GET", Names = ["GetRequestNonce"]},
    {Key = "/auth/update_key", Method = "POST", Names = ["UpdateUserPublicKey"]},
    {Key = "/permission/.+/[^/]*/.+", Method = "GET", Names = ["VerifyPermission"]},
    {Key = "/greenfield/admin/v1/get-approval", Method = "GET", Names = ["GetApproval"]},
    {Key = "/greenfield/admin/v1/challenge", Method = "GET", Names = ["GetChallengeInfo"]},
    {Key = "/greenfield/admin/v2/challenge", Method = "GET", Names = ["GetChallengeInfo"]},
    {Key = "/greenfield/receiver/v1/replicate-piece", Method = "PUT", Names = ["ReplicateObjectPiece"]},
    {Key = "/greenfield/recovery/v1/get-piece", Method = "GET", Names = ["RecoveryPiece"]},
    {Key = "/greenfield/migrate/v1/notify-migrate-swap-out-task", Method = "POST", Names = ["NotifyMigrateSwapOut"]},
    {Key = "/greenfield/migrate/v1/migrate-piece", Method = "GET", Names = ["MigratePiece"]},
    {Key = "/greenfield/migrate/v1/migration-bucket-approval", Method = "GET", Names = ["MigrationBucketApproval"]},
    {Key = "/greenfield/migrate/v1/get-swap-out-approval", Method = "GET", Names = ["SwapOutApproval"]},
    {Key = "/download/[^/]*/.+", Method = "GET", Names = ["DownloadObjectByUniversalEndpoint"]},{Key = "/download", Method = "GET", Names = ["DownloadObjectByUniversalEndpoint"]},
    {Key = "/view/[^/]*/.+", Method = "GET", Names = ["ViewObjectByUniversalEndpoint"]},{Key = "/view", Method = "GET", Names = ["ViewObjectByUniversalEndpoint"]},
    {Key = "/status", Method = "GET", Names = ["GetStatus"]},
    {Key = "/.+/.+[?]offset.*", Method = "POST", Names = ["ResumablePutObject"]},
    {Key = "/.+/.+[?]upload-context.*", Method = "GET", Names = ["QueryResumeOffset"]},
    {Key = "/.+/.+[?]upload-progress.*", Method = "GET", Names = ["QueryUploadProgress"]},
    {Key = "/.+/.+[?]bucket-meta.*", Method = "GET", Names = ["GetBucketMeta"]},
    {Key = "/.+/.+[?]object-meta.*", Method = "GET", Names = ["GetObjectMeta"]},
    {Key = "/.+/.+[?]object-policies.*", Method = "GET", Names = ["ListObjectPolicies"]},
    {Key = "/.+[?]read-quota.*", Method = "GET", Names = ["GetBucketReadQuota"]},
    {Key = "/.+[?]list-read-quota.*", Method = "GET", Names = ["ListBucketReadRecord"]},
    {Key = "/[?].*group-query.*", Method = "GET", Names = ["GetGroupList"]},
    {Key = "/[?].*objects-query.*", Method = "GET", Names = ["ListObjectsByIDs"]},
    {Key = "/[?].*buckets-query.*", Method = "GET", Names = ["ListBucketsByIDs"]},
    {Key = "/[?].*verify-id.*", Method = "GET", Names = ["VerifyPermissionByID"]},
    {Key = "/[?].*user-groups.*", Method = "GET", Names = ["GetUserGroups"]},
    {Key = "/[?].*group-members.*", Method = "GET", Names = ["GetGroupMembers"]},
    {Key = "/[?].*owned-groups.*", Method = "GET", Names = ["GetUserOwnedGroups"]},

    {Key = "/.+/$", Method = "GET", Names = ["ListObjectsByBucket"]},
    {Key = "/.+/.+", Method = "GET", Names = ["GetObject"]},
    {Key = "/.+/.+", Method = "PUT", Names = ["PutObject"]},
    {Key = "/$", Method = "GET", Names = ["GetUserBuckets"]},

]

NameToLimit = [
    {Name = "GetRequestNonce", RateLimit = 100, RatePeriod = 'S'}, # requestNonceRouterName 3000qps
    {Name = "UpdateUserPublicKey", RateLimit = 100, RatePeriod = 'S'}, # updateUserPublicKeyRouterName 4000qps
    {Name = "VerifyPermission", RateLimit = 100, RatePeriod = 'S'}, # verifyPermissionRouterName  1200qps
    {Name = "GetApproval", RateLimit = 35, RatePeriod = 'S'}, # approvalRouterName  150qps
    {Name = "GetChallengeInfo", RateLimit = 20, RatePeriod = 'S'}, # getChallengeInfoRouterName, no test data
    {Name = "ReplicateObjectPiece", RateLimit = 1000, RatePeriod = 'S'},  # replicateObjectPieceRouterName, no test data. Internal API among sps, no rate limit is needed.
    {Name = "RecoveryPiece", RateLimit = 1000, RatePeriod = 'S'}, # recoveryPieceRouterName, no test data. Internal API among sps, no rate limit is needed.
    {Name = "NotifyMigrateSwapOut", RateLimit = 10, RatePeriod = 'S'},  # notifyMigrateSwapOutRouterName, no test data. Internal API among sps, no rate limit is needed.
    {Name = "MigratePiece", RateLimit = 10, RatePeriod = 'S'}, # migratePieceRouterName, no test data
    {Name = "MigrationBucketApproval", RateLimit = 10, RatePeriod = 'S'}, # migrationBucketApprovalName, no test data
    {Name = "SwapOutApproval", RateLimit = 10, RatePeriod = 'S'}, # swapOutApprovalName, no test data
    {Name = "DownloadObjectByUniversalEndpoint", RateLimit = 50, RatePeriod = 'S'}, # downloadObjectByUniversalEndpointName, 50qps
    {Name = "ViewObjectByUniversalEndpoint", RateLimit = 50, RatePeriod = 'S'}, # viewObjectByUniversalEndpointName, 50qps
    {Name = "GetStatus", RateLimit = 200, RatePeriod = 'S'},# getStatusRouterName, 2000qps
    {Name = "ResumablePutObject", RateLimit = 30, RatePeriod = 'S'}, # resumablePutObjectRouterName , test data is same as putObject object 10qps
    {Name = "QueryResumeOffset", RateLimit = 30, RatePeriod = 'S'},  # queryResumeOffsetName, test data is same as putObject object 10qps
    {Name = "QueryUploadProgress", RateLimit = 50, RatePeriod = 'S'}, # queryUploadProgressRouterName, test data is same as putObject object 10qps
    {Name = "GetBucketMeta", RateLimit = 100, RatePeriod = 'S'}, # getBucketMetaRouterName, 400qps
    {Name = "GetObjectMeta", RateLimit = 100, RatePeriod = 'S'}, # getObjectMetaRouterName, 400qps
    {Name = "ListObjectPolicies", RateLimit = 200, RatePeriod = 'S'}, # listObjectPoliciesRouterName, 2000qps
    {Name = "GetBucketReadQuota", RateLimit = 200, RatePeriod = 'S'}, # getBucketReadQuotaRouterName
    {Name = "ListBucketReadRecord", RateLimit = 100, RatePeriod = 'S'}, # listBucketReadRecordRouterName
    {Name = "GetGroupList", RateLimit = 200, RatePeriod = 'S'}, # getGroupListRouterName， similar to getUserGroupsRouterName, 2000qps
    {Name = "ListObjectsByIDs", RateLimit = 200, RatePeriod = 'S'}, # listObjectsByIDsRouterName, 1200qps
    {Name = "ListBucketsByIDs", RateLimit = 200, RatePeriod = 'S'}, # listBucketsByIDsRouterName, 2000qps
    {Name = "VerifyPermissionByID", RateLimit = 200, RatePeriod = 'S'}, # verifyPermissionByIDRouterName, 1200qps
    {Name = "GetUserGroups", RateLimit = 200, RatePeriod = 'S'}, # getUserGroupsRouterName, 2000qps
    {Name = "GetGroupMembers", RateLimit = 200, RatePeriod = 'S'}, # getGroupMembersRouterName, 2000qps
    {Name = "GetUserOwnedGroups", RateLimit = 200, RatePeriod = 'S'}, # getUserOwnedGroupsRouterName, 2000qps

    {Name = "ListObjectsByBucket", RateLimit = 75, RatePeriod = 'S'}, # listObjectsByBucketRouterName, 300qps
    {Name = "GetObject", RateLimit = 75, RatePeriod = 'S'}, # getObjectRouterName, 100 qps
    {Name = "PutObject", RateLimit = 75, RatePeriod = 'S'}, # putObjectRouterName, 100 qps
    {Name = "GetUserBuckets", RateLimit = 75, RatePeriod = 'S'}] # getUserBucketsRouterName, 1000 qps

HostPattern = []

[Manager]
# optional
EnableLoadTask = true
# optional
GVGPreferSPList = [1,2,3,4,5,6,7]
# optional
EnableTaskRetryScheduler = true

[Executor]
# optional
ListenSealRetryTimeout = 30

[Quota]
MonthlyFreeQuota = 0
```
