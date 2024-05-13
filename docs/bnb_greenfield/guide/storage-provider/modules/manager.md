---
title: Manager
---

# Manager

Manager is responsible for task scheduling such as dispatching tasks to Executor module, GC objects, GC zombie piece tasks, migrate object and so on. Therefore, Manager module is somewhat similar to daemon process to help do some works.

Manager is an abstract interface to do some internal service management, it is responsible for task scheduling and other management of SP.

## Overview

<div align="center"><img src="https://raw.githubusercontent.com/bnb-chain/greenfield-docs/main/static/asset/07-manager.jpg" width="500" height="100" /></div>

<div style={{textAlign:'center'}}><i>Manager Architecture</i></div>

We currently abstract SP as the GfSp framework, which provides users with customizable capabilities to meet their specific requirements. Manager module provides an abstract interface, which is called `Manager`, as follows:

```go
type Manager interface {
    Modular
    // DispatchTask dispatches the task to TaskExecutor module when it asks tasks.
    // It will consider task remaining resources when dispatching task.
    DispatchTask(ctx context.Context, limit rcmgr.Limit) (task.Task, error)
    // QueryTasks queries tasks that hold on manager by task sub-key.
    QueryTasks(ctx context.Context, subKey task.TKey) ([]task.Task, error)
    // QueryBucketMigrate queries tasks that hold on manager by task sub-key.
    QueryBucketMigrate(ctx context.Context) (*gfspserver.GfSpQueryBucketMigrateResponse, error)
    // QuerySpExit queries tasks that hold on manager by task sub-key.
    QuerySpExit(ctx context.Context) (*gfspserver.GfSpQuerySpExitResponse, error)
    // HandleCreateUploadObjectTask handles the CreateUploadObject request from Uploader, before Uploader handles
    // the users' UploadObject requests, it should send CreateUploadObject requests to Manager ask if it's ok.
    // Through this interface SP implements the global uploading object strategy.
    // For example: control the concurrency of global uploads, avoid repeated uploads, rate control, etc.
    HandleCreateUploadObjectTask(ctx context.Context, task task.UploadObjectTask) error
    // HandleDoneUploadObjectTask handles the result of uploading object payload data to primary, Manager should
    // generate ReplicatePieceTask for TaskExecutor to run.
    HandleDoneUploadObjectTask(ctx context.Context, task task.UploadObjectTask) error
    // HandleCreateResumableUploadObjectTask handles the CreateUploadObject request from
    // Uploader, before Uploader handles the user's UploadObject request, it should
    // send CreateUploadObject request to Manager ask if it's ok. Through this
    // interface that SP implements the global upload object strategy.
    HandleCreateResumableUploadObjectTask(ctx context.Context, task task.ResumableUploadObjectTask) error
    
    // HandleDoneResumableUploadObjectTask handles the result of resumable uploading object payload data to primary,
    // Manager should generate ReplicatePieceTask for TaskExecutor to run.
    HandleDoneResumableUploadObjectTask(ctx context.Context, task task.ResumableUploadObjectTask) error
    // HandleReplicatePieceTask handles the result of replicating piece data to secondary SPs,
    // the request comes from TaskExecutor.
    HandleReplicatePieceTask(ctx context.Context, task task.ReplicatePieceTask) error
    // HandleSealObjectTask handles the result of sealing object to the greenfield the request comes from TaskExecutor.
    HandleSealObjectTask(ctx context.Context, task task.SealObjectTask) error
    // HandleReceivePieceTask handles the result of receiving piece task, the request comes from Receiver that
    // reports have completed ReceivePieceTask to manager and TaskExecutor that the result of confirming whether
    // the object that is synced to secondary SP has been sealed.
    HandleReceivePieceTask(ctx context.Context, task task.ReceivePieceTask) error
    // HandleGCObjectTask handles GCObjectTask, the request comes from TaskExecutor.
    HandleGCObjectTask(ctx context.Context, task task.GCObjectTask) error
    // HandleGCZombiePieceTask handles GCZombiePieceTask, the request comes from TaskExecutor.
    HandleGCZombiePieceTask(ctx context.Context, task task.GCZombiePieceTask) error
    // HandleGCMetaTask handles GCMetaTask, the request comes from TaskExecutor.
    HandleGCMetaTask(ctx context.Context, task task.GCMetaTask) error
    // HandleDownloadObjectTask handles DownloadObjectTask, the request comes from Downloader.
    HandleDownloadObjectTask(ctx context.Context, task task.DownloadObjectTask) error
    // HandleChallengePieceTask handles ChallengePieceTask, the request comes from Downloader.
    HandleChallengePieceTask(ctx context.Context, task task.ChallengePieceTask) error
    // PickVirtualGroupFamily is used to pick vgf for the new bucket.
    PickVirtualGroupFamily(ctx context.Context, task task.ApprovalCreateBucketTask) (uint32, error)
    // HandleRecoverPieceTask handles the result of recovering piece task, the request comes from TaskExecutor.
    HandleRecoverPieceTask(ctx context.Context, task task.RecoveryPieceTask) error
    // NotifyMigrateSwapOut is used to notify dest sp migrate swap out.
    NotifyMigrateSwapOut(ctx context.Context, swapOut *virtualgrouptypes.MsgSwapOut) error
    // HandleMigrateGVGTask handles MigrateGVGTask, the request from TaskExecutor.
    HandleMigrateGVGTask(ctx context.Context, task task.MigrateGVGTask) error
}
```

Manager interface inherits [Modular interface](./common/lifecycle_modular.md#modular-interface), so Uploader module can be managed by lifecycle and resource manager.

In terms of the functions provided by Manager module, there are multiple handling tasks that do a lot of chores. In general, tasks handled by Manager module can be divided into `UploadObjectTask`, `ReplicatePieceTask`, `SealObjectTask`, `ReceivePieceTask`, `GCObjectTask`, `GCZombieTask`, `DownloadObjectTask`, `ChallengePieceTask` and `MigrateGVGTask`. In addition, it also provides `DispatchTask` and `QueryTasks`. The tasks handled by Executor module is dispatched from Manager module. We can query tasks that we care about by `QueryTasks` method through using subKey.

Manager module only schedules ReplicatePiece, SealObject, GCTask, MigrateTask which belong to background tasks. For front tasks, Manager module just responds and don't schedule them. As we can see from the second parameter of the methods defined in `Manager` interface, different is split into different tasks. They are also defined as an interface.

### Task Dispatcher

Manager module dispatches tasks to Executor. When dispatching tasks, Manager module should consider limiting resources to prevent resources from being exhausted. So the second param of DispatchTask functions is rcmgr.Limit that is an interface to alloc system resources. Limit is an interface that that specifies basic resource limits.

- [Limit](./common/lifecycle_modular.md#limit)

### Virtual Group Manager

The PutObject process uses the remaining space weight algorithm to pick a group in the virtual group manager for replicating data and completing the seal process.

### Bucket Migrate Scheduler

By subscribing to metadata events about bucket migration, a migration plan is generated internally, 
and the tasks contained in the migration plan are dispatched to the task dispatcher. Manage the lifecycle of the entire bucket migration plan.

### SP Exit Scheduler

By subscribing to metadata events about SP Exit, an exit plan is generated internally,
and the tasks contained in the exit plan are dispatched to the task dispatcher. Manage the lifecycle of the entire sp exit plan.

Stop Serving is the background service running in primary SP, which is used to activelydelete buckets stored by it.

**It only runs in testnet environment for remove historical data, and it will NOT run in mainnet.**

<div align="center"><img src="https://raw.githubusercontent.com/bnb-chain/greenfield-docs/main/static/asset/502-Stop-Serving-Workflow.png" width="1000" height="100" /></div>

<div style={{textAlign:'center'}}><i>Stop Serving Main Workflows</i></div>

Stop Serving is running in background periodically. The main workflows are as follows:

- When the SP starts up, it loads the "BucketKeepAliveDays" config to indicate how long a bucket will remain alive (7 days on testnet);
- Then it calls the metadata service to retrieve buckets created earlier than the specified number of days;
- Then it sends discontinue bucket transactions to the Greenfield chain, and the blockchain will emit discontinue bucket events;
- After a set amount of time (7 days on testnet), the discontinued buckets are deleted on the chain, and delete object and delete bucket events are emitted;
- Finally, the GC service recycles the storage space of the deleted objects and buckets.

This service is still under development and will be online soon.

## GfSp Framework Manager Code

Manager module code implementation: [Manager](https://github.com/bnb-chain/greenfield-storage-provider/tree/master/modular/manager)
