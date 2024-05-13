---
title: Downloader
---

# Downloader

Downloader is responsible for downloading object data (including range download) and challenge piece. The workflow of Downloader users can refer [Downloader](../introduction/workflow.md#downloader). We currently abstract SP as the GfSp framework, which provides users with customizable capabilities to meet their specific requirements. Downloader module provides an abstract interface, which is called `Downloader`, as follows:

Downloader is an abstract interface to handle getting object requests from users' account, and getting challenge info requests from other components in the system.

```go
type Downloader interface {
    Modular
    // PreDownloadObject prepares to handle DownloadObject, it can do some checks
    // such as checking for duplicates, if limitation of SP has been reached, etc.
    PreDownloadObject(ctx context.Context, task task.DownloadObjectTask) error
    // HandleDownloadObjectTask handles the DownloadObject and get data from piece store.
    HandleDownloadObjectTask(ctx context.Context, task task.DownloadObjectTask) ([]byte, error)
    // PostDownloadObject is called after HandleDownloadObjectTask, it can recycle
    // resources, make statistics and do some other operations..
    PostDownloadObject(ctx context.Context, task task.DownloadObjectTask)

    // PreDownloadPiece prepares to handle DownloadPiece, it can do some checks such as check for duplicates,
    // if limitation of SP has been reached, etc.
    PreDownloadPiece(ctx context.Context, task task.DownloadPieceTask) error
    // HandleDownloadPieceTask handles the DownloadPiece and get data from piece store.
    HandleDownloadPieceTask(ctx context.Context, task task.DownloadPieceTask) ([]byte, error)
    // PostDownloadPiece is called after HandleDownloadPieceTask, it can recycle
    // resources, make statistics and do some other operations.
    PostDownloadPiece(ctx context.Context, task task.DownloadPieceTask)

    // PreChallengePiece prepares to handle ChallengePiece, it can do some checks
    // such as checking for duplicates, if limitation of SP has been reached, etc.
    PreChallengePiece(ctx context.Context, task task.ChallengePieceTask) error
    // HandleChallengePiece handles ChallengePiece, get piece data from piece store and get integrity hash from db.
    HandleChallengePiece(ctx context.Context, task task.ChallengePieceTask) ([]byte, [][]byte, []byte, error)
    // PostChallengePiece is called after HandleChallengePiece, it can recycle resources, make statistics
    // and do some other operations.
    PostChallengePiece(ctx context.Context, task task.ChallengePieceTask)
    // QueryTasks queries download/challenge tasks that running on downloader by task sub-key.
    QueryTasks(ctx context.Context, subKey task.TKey) ([]task.Task, error)
}
```

Downloader interface inherits [Modular interface](./common/lifecycle_modular.md#modular-interface), so Downloader module can be managed by lifecycle and resource manager. In terms of the functions provided by Downloader module, it can be divided into three parts: DownloadObject, DownloadPiece and ChallengePiece. They all have three methods: PreXXX, HanldeXXX and PostXXX. Therefore, you can rewrite these methods to meet your own requirements. As we can see from the second parameter of the methods defined in `Downloader` interface, DownloadObject is splitted into `DownloadObjectTask`, DownloadPiece is splitted into `DownloadPieceTask` and ChallengePiece is splitted into `ChallengePieceTask`. They are also defined as an interface. We can query DownloadObject, DownloadPiece and ChallengePiece tasks that we care about by `QueryTasks` method through using subKey.

## ObjectTask

DownloadObjectTask, DownloadPieceTask and ChallengePieceTask all inherits `ObjectTask` interface. ObjectTask associated with an object and storage params, and records the information of different stages of the object. Considering the change of storage params on the greenfield, the storage params of each object should be determined when it is created, and it should not be queried during the task flow, which is inefficient and error-prone.

ObjectTask interfaces definition is shown below:

- [ObjectTask](./common/task.md#objecttask)

You can overwrite all these methods in your own.

The corresponding protobuf definition is shown below:

- [ObjectInfo](./common/proto.md#objectinfo-proto)
- [Params](./common/proto.md#params-proto)

## DownloadObjectTask

DownloadObjectTask is an abstract interface to record the information for downloading pieces of object payload data. DownloadObjectTask inherits ObjectTask interface. DownloadObjectTask also defines seven methods to help query info or set data. You can overwrite all these methods in your own.

- [ObjectTask](./common/task.md#objecttask)
- [DownloadObjectTask](./common/task.md#downloadobjecttask)

You can overwrite all these methods in your own.

The corresponding protobuf definition is shown below:

- [GfSpDownloadObjectTask](./common/proto.md#gfspdownloadobjecttask-proto)
- [BucketInfo](./common/proto.md#bucketinfo-proto)

## DownloadPieceTask

DownloadPieceTask is an abstract interface to record the information for downloading piece data. DownloadPieceTask inherits ObjectTask interface. DownloadPieceTask also defines ten methods to help query info or set data. You can overwrite all these methods in your own.

- [ObjectTask](./common/task.md#objecttask)
- [DownloadPieceTask](./common/task.md#downloadpiecetask)

You can overwrite all these methods in your own.

The corresponding protobuf definition is shown below:

- [GfSpDownloadPieceTask](./common/proto.md#gfspdownloadpiecetask-proto)
- [BucketInfo](./common/proto.md#bucketinfo-proto)
- [ObjectInfo](./common/proto.md#objectinfo-proto)
- [Params](./common/proto.md#params-proto)

## ChallengePieceTask

It is always the first priority of any decentralized storage network to guarantee data integrity and availability. We use data challenge instead of storage proof to get better HA. There will be some data challenges to random pieces on greenfield chain continuously. And the SP, which stores the challenged piece, uses the challenge workflow to response. Each SP splits the object payload data to segments, and store segment data to piece store and store segment checksum to SP DB.

ChallengePieceTask is an abstract interface to record the information for get challenge piece info, the validator get challenge info to confirm whether the sp stores the user's data correctly.

- [ObjectTask](./common/task.md#objecttask)
- [ChallengePieceTask](./common/task.md#challengepiecetask)

ChallengePieceTask defines 15 methods to help query info or set data. You can overwrite all these methods in your own.

The corresponding protobuf definition is shown below:

- [GfSpChallengePieceTask](./common/proto.md#gfspchallengepiecetask-proto)
- [BucketInfo](./common/proto.md#bucketinfo-proto)
- [ObjectInfo](./common/proto.md#objectinfo-proto)
- [Params](./common/proto.md#params-proto)

## GfSp Framework Downloader Code

Downloader module code implementation: [Downloader](https://github.com/bnb-chain/greenfield-storage-provider/tree/master/modular/downloader)
