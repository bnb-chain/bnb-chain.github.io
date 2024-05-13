---
title: Receiver
---

# Receiver

Receiver is responsible for accepting piece data that replicated from primary SP. When receiving piece data from primary SP, piece data is transferred from Gateway and then use gRPC to receiver module.

Receiver is an abstract interface to receive the piece data from primary SP.

```go
type Receiver interface {
    Modular
    // HandleReceivePieceTask stores piece data into secondary SP.
    HandleReceivePieceTask(ctx context.Context, task task.ReceivePieceTask, data []byte) error
    // HandleDoneReceivePieceTask calculates the secondary bls signature of the object and sign it, returns to the primary
    // SP for sealed object.
    HandleDoneReceivePieceTask(ctx context.Context, task task.ReceivePieceTask) ([]byte, error)
    // QueryTasks queries replicate piece tasks that running on receiver by task sub-key.
    QueryTasks(ctx context.Context, subKey task.TKey) ([]task.Task, error)
}
```

Receiver interface inherits [Modular interface](./common/lifecycle_modular.md#modular-interface), so Receiver module can be managed by lifecycle and resource manager.

In terms of the functions provided by Receiver module, there is only one part: receive piece data. There are three methods in Receiver interface. Therefore, you can rewrite these methods to meet your own requirements.

As we can see from the second parameter of the methods defined in `Receiver` interface, ReceivePiece is split into `ReceivePieceTask`. They are also defined as an interface.

We can query ReceivePiece tasks that we care about by `QueryTasks` method through using subKey.

## ReceivePieceTask

The corresponding interfaces definition is shown below:

- [ReceivePieceTask](./common/task.md#receivepiecetask)
- [ObjectTask](./common/task.md#objecttask)

ObjectTask inherits [Task interface](./common/task.md#task). ReceivePieceTask also defines 14 methods to help query info or set data. You can overwrite all these methods in your own.

The corresponding `protobuf` definition is shown below:

- [GfSpReceivePieceTask](./common/proto.md#gfspreceivepiecetask-proto)
- [ObjectInfo](./common/proto.md#objectinfo-proto)
- [Params](./common/proto.md#params-proto)

## GfSp Framework Receiver Code

Receiver module code implementation: [Receiver](https://github.com/bnb-chain/greenfield-storage-provider/tree/master/modular/receiver)
