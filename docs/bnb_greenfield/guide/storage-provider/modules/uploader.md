---
title: Uploader
---

# Uploader

Uploader is responsible for receiving and cutting the object payload data into segments, then storing it into PieceStore, and notifying the downstream service to asynchronously replicate the object payload data that processed by EC algorithm to the secondary SP. The workflow of Uploader users can refer [Uploader](../introduction/workflow.md#uploader). We currently abstract SP as the GfSp framework, which provides users with customizable capabilities to meet their specific requirements. Uploader module provides an abstract interface, which is called `Uploader`, as follows:

Uploader is an abstract interface to handle putting object requests from users' account and store their payload data into primary SP piece store.

```go
type Uploader interface {
    Modular
    // PreUploadObject prepares to handle UploadObject, it can do some checks
    // such as checking for duplicates, if limitation of SP has been reached, etc.
    PreUploadObject(ctx context.Context, task task.UploadObjectTask) error
    // HandleUploadObjectTask handles the UploadObject, store payload data into piece store by data stream.
    HandleUploadObjectTask(ctx context.Context, task task.UploadObjectTask, stream io.Reader) error
    // PostUploadObject is called after HandleUploadObjectTask, it can recycle
    // resources, make statistics and do some other operations.
    PostUploadObject(ctx context.Context, task task.UploadObjectTask)
    
    // PreResumableUploadObject prepares to handle ResumableUploadObject, it can do some checks
    // such as checking for duplicates, if limitation of SP has been reached, etc.
    PreResumableUploadObject(ctx context.Context, task task.ResumableUploadObjectTask) error
    // HandleResumableUploadObjectTask handles the ResumableUploadObject, store payload data into piece store by data stream.
    HandleResumableUploadObjectTask(ctx context.Context, task task.ResumableUploadObjectTask, stream io.Reader) error
    // PostResumableUploadObject is called after HandleResumableUploadObjectTask, it can recycle
    // resources, statistics and other operations.
    PostResumableUploadObject(ctx context.Context, task task.ResumableUploadObjectTask)
    
    // QueryTasks queries upload object tasks that running on uploading by task sub-key.
    QueryTasks(ctx context.Context, subKey task.TKey) ([]task.Task, error)
}
```

Uploader interface inherits [Modular interface](./common/lifecycle_modular.md#modular-interface), so Uploader module can be managed by lifecycle and resource manager. In terms of the functions provided by Uploader module, there is only one part: just upload object. It has three methods: PreXXX, HanldeXXX and PostXXX. Therefore, you can rewrite these methods to meet your own requirements. As we can see from the second parameter of the methods defined in `Uploader` interface, uploadObject is split into `UploadObjectTask`. They are also defined as an interface. We can query UploadObject tasks that we care about by `QueryTasks` method through using subKey.

## UploadObjectTask

The corresponding interfaces definition is shown below:

- [ObjectTask](./common/task.md#objecttask)
- [UploadObjectTask](./common/task.md#uploadobjecttask)

ObjectTask inherits [Task interface](./common/task.md#task). UploadObjectTask also defines ten methods to help query info or set data. You can overwrite all these methods in your own.

The corresponding `protobuf` definition is shown below:

- [GfSpUploadObjectTask](./common/proto.md#gfspuploadobjecttask-proto)
- [ObjectInfo](./common/proto.md#objectinfo-proto)
- [Params](./common/proto.md#params-proto)

## ResumableUploadObjectTask

The corresponding interfaces definition is shown below:

- [ObjectTask](./common/task.md#objecttask)
- [ResumableUploadObjectTask](./common/task.md#resumableuploadobjecttask)

ObjectTask inherits [Task interface](./common/task.md#task). UploadObjectTask also defines ten methods to help query info or set data. You can overwrite all these methods in your own.

The corresponding `protobuf` definition is shown below:

- [GfSpResumableUploadObjectTask](./common/proto.md#gfspresumableuploadobjecttask-proto)
- [ObjectInfo](./common/proto.md#objectinfo-proto)
- [Params](./common/proto.md#params-proto)

## GfSp Framework Uploader Code

Uploader module code implementation: [Uploader](https://github.com/bnb-chain/greenfield-storage-provider/tree/master/modular/uploader)
