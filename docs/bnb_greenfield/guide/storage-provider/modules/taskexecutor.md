---
title: TaskExecutor
---

# TaskExecutor

Executor is the execution unit of SP background tasks. It is a resource consuming service, for which we introduce a resource manager, which will stop pulling(supported in the future) or accept tasks when the resource limit is reached.

TaskExecutor is an abstract interface to handle background tasks. It will ask tasks from manager modular, handle tasks and report the results or status to the manager modular. It can handle these tasks: ReplicatePieceTask, SealObjectTask, ReceivePieceTask, GCObjectTask, GCZombiePieceTask, GCMetaTask, MigrateGVGTask. Therefore, you can rewrite these methods to meet your own requirements.

```go
type TaskExecutor interface {
    Modular
    // AskTask asks the task by remaining limitation from manager module.
    AskTask(ctx context.Context) error
    // HandleReplicatePieceTask handles ReplicatePieceTask that is asked from manager module.
    HandleReplicatePieceTask(ctx context.Context, task task.ReplicatePieceTask)
    // HandleSealObjectTask handles SealObjectTask that is asked from manager module.
    HandleSealObjectTask(ctx context.Context, task task.SealObjectTask)
    // HandleReceivePieceTask handles the ReceivePieceTask that is asked from manager module.
    // It will confirm the piece data that is synced to secondary SP whether has been sealed.
    HandleReceivePieceTask(ctx context.Context, task task.ReceivePieceTask)
    // HandleGCObjectTask handles the GCObjectTask that is asked from manager module.
    HandleGCObjectTask(ctx context.Context, task task.GCObjectTask)
    // HandleGCZombiePieceTask handles the GCZombiePieceTask that is asked from manager module.
    HandleGCZombiePieceTask(ctx context.Context, task task.GCZombiePieceTask)
    // HandleGCMetaTask handles the GCMetaTask that is asked from manager module.
    HandleGCMetaTask(ctx context.Context, task task.GCMetaTask)
    // HandleMigrateGVGTask handles the MigrateGVGTask that is asked from manager module
    HandleMigrateGVGTask(ctx context.Context, gvgTask task.MigrateGVGTask)
    // ReportTask reports the results or status of running task to manager module.
    ReportTask(ctx context.Context, task task.Task) error
}
```

TaskExecutor interface inherits [Modular interface](./common/lifecycle_modular.md#modular-interface), so TaskExecutor module can be managed by lifecycle and resource manager.  As we can see from the second parameter of the methods defined in `TaskExecutor` interface, there are many tasks. They are also defined as an interface. We can report tasks of Executor to Manager module.

## GC

Garbage Collection(GC) is the background service running in SP, which is used to recycle the storage space of those deleted objects on the Greenfield chain. GC service is running in background periodically. It comprises below steps:

- When SP starting up, load the metadata "BlockNumberHandledByGC" stored in the local metadata database, which is used to record the block height handled by GC service;
- Check if the previous background GC tasks have finished; if not, continue the tasks based on the contexts stored in the local metadata database;
- Get the deleted object list from the metadata service based on block height, construct GC tasks and dispatch them to TaskNode service;
- Each TaskNode runs GC tasks to remove all the pieces of the deleted objects from piece store, updates local SP's metadata as well.

## AskTask

The second param of AskTask method is `Limit` interface:

- [Limit](./common/lifecycle_modular.md#limit)

## HandleReplicatePieceTask

The corresponding interfaces definition is shown below:

- [ReplicatePieceTask](./common/task.md#replicatepiecetask)

The corresponding `protobuf` definition is shown below:

- [GfSpReplicatePieceTask](./common/proto.md#gfspreplicatepiecetask-proto)
- [ObjectInfo](./common/proto.md#objectinfo-proto)
- [Params](./common/proto.md#params-proto)

## HandleSealObjectTask

The corresponding interfaces definition is shown below:

- [SealObjectTask](./common/task.md#sealobjecttask)

The corresponding `protobuf` definition is shown below:

- [GfSpSealObjectTask](./common/proto.md#gfspsealobjecttask-proto)
- [ObjectInfo](./common/proto.md#objectinfo-proto)
- [Params](./common/proto.md#params-proto)

## HandleReceivePieceTask

The corresponding interfaces definition is shown below:

- [ReceivePieceTask](./common/task.md#receivepiecetask)

The corresponding `protobuf` definition is shown below:

- [GfSpReceivePieceTask](./common/proto.md#gfspreceivepiecetask-proto)
- [ObjectInfo](./common/proto.md#objectinfo-proto)
- [Params](./common/proto.md#params-proto)

## HandleGCObjectTask

The corresponding interfaces definition is shown below:

- [GCObjectTask](./common/task.md#gcobjecttask)

The corresponding `protobuf` definition is shown below:

- [GfSpGCObjectTask](./common/proto.md#gfspgcobjecttask-proto)

## HandleGCZombiePieceTask

The corresponding interfaces definition is shown below:

- [GCZombiePieceTask](./common/task.md#gczombiepiecetask)

The corresponding `protobuf` definition is shown below:

- [GfSpGCZombiePieceTask](./common/proto.md#gfspgczombiepiecetask-proto)

## HandleGCMetaTask

The corresponding interfaces definition is shown below:

- [GCMetaTask](./common/task.md#gcmetatask)

The corresponding `protobuf` definition is shown below:

- [GfSpGCMetaTask](./common/proto.md#gfspgcmetatask-proto)

## HandleMigrateGVGTask

The corresponding interfaces definition is shown below:

- [MigrateGVGTask](./common/task.md#migrategvgtask)

The corresponding `protobuf` definition is shown below:

- [GfSpMigrateGVGTask](./common/proto.md#gfspmigrategvgtask-proto)

## GfSp Framework TaskExecutor Code

TaskExecutor module code implementation: [TaskExecutor](https://github.com/bnb-chain/greenfield-storage-provider/tree/master/modular/taskexecutor)
