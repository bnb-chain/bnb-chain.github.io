---
title: Signer
---

# Signer

Signer uses the SP's private keys to sign the message, the messages to form a transaction and sign the transaction to broadcast it to Greenfield BlockChain, or the messages exchanged between SPs.

Signer is an abstract interface to handle the signature of SP and on greenfield chain operator. It holds all private keys of one SP. Considering the SP account's sequence number, it must be a singleton.

```go
type Signer interface {
    Modular
    // SignCreateBucketApproval signs the MsgCreateBucket for asking create bucket approval.
    SignCreateBucketApproval(ctx context.Context, bucket *storagetypes.MsgCreateBucket) ([]byte, error)
    // SignMigrateBucketApproval signs the MsgMigrateBucket for asking migrate bucket approval
    SignMigrateBucketApproval(ctx context.Context, bucket *storagetypes.MsgMigrateBucket) ([]byte, error)
    // SignCreateObjectApproval signs the MsgCreateObject for asking create object approval.
    SignCreateObjectApproval(ctx context.Context, task *storagetypes.MsgCreateObject) ([]byte, error)
    // SignReplicatePieceApproval signs the ApprovalReplicatePieceTask for asking replicate pieces to secondary SPs.
    SignReplicatePieceApproval(ctx context.Context, task task.ApprovalReplicatePieceTask) ([]byte, error)
    // SignReceivePieceTask signs the ReceivePieceTask for replicating pieces data between SPs.
    SignReceivePieceTask(ctx context.Context, task task.ReceivePieceTask) ([]byte, error)
    // SignSecondarySealBls signs the secondary bls for sealing object.
    SignSecondarySealBls(ctx context.Context, objectID uint64, gvgId uint32, hash [][]byte) ([]byte, error)
    // SignRecoveryPieceTask signs the RecoveryPieceTask for recovering piece data
    SignRecoveryPieceTask(ctx context.Context, task task.RecoveryPieceTask) ([]byte, error)
    // SignP2PPingMsg signs the ping msg for p2p node probing.
    SignP2PPingMsg(ctx context.Context, ping *gfspp2p.GfSpPing) ([]byte, error)
    // SignP2PPongMsg signs the pong msg for p2p to response ping msg.
    SignP2PPongMsg(ctx context.Context, pong *gfspp2p.GfSpPong) ([]byte, error)
    // SealObject signs the MsgSealObject and broadcast the tx to greenfield.
    SealObject(ctx context.Context, object *storagetypes.MsgSealObject) (string, error)
    // RejectUnSealObject signs the MsgRejectSealObject and broadcast the tx to greenfield.
    RejectUnSealObject(ctx context.Context, object *storagetypes.MsgRejectSealObject) (string, error)
    // DiscontinueBucket signs the MsgDiscontinueBucket and broadcast the tx to greenfield.
    DiscontinueBucket(ctx context.Context, bucket *storagetypes.MsgDiscontinueBucket) (string, error)
    // CreateGlobalVirtualGroup signs the MsgCreateGlobalVirtualGroup and broadcast the tx to greenfield.
    CreateGlobalVirtualGroup(ctx context.Context, gvg *virtualgrouptypes.MsgCreateGlobalVirtualGroup) error
    // SignMigratePiece signs the GfSpMigratePieceTask for migrating piece
    SignMigratePiece(ctx context.Context, task *gfsptask.GfSpMigratePieceTask) ([]byte, error)
    // CompleteMigrateBucket signs the MsgCompleteMigrateBucket and broadcast the tx to greenfield.
    CompleteMigrateBucket(ctx context.Context, migrateBucket *storagetypes.MsgCompleteMigrateBucket) (string, error)
    // SignSecondarySPMigrationBucket signs secondary sp bls for bucket migration
    SignSecondarySPMigrationBucket(ctx context.Context, signDoc *storagetypes.SecondarySpMigrationBucketSignDoc) ([]byte, error)
    // SwapOut signs the MsgSwapOut and broadcast the tx to greenfield.
    SwapOut(ctx context.Context, swapOut *virtualgrouptypes.MsgSwapOut) (string, error)
    // SignSwapOut signs the MsgSwapOut for asking swap out approval.
    SignSwapOut(ctx context.Context, swapOut *virtualgrouptypes.MsgSwapOut) ([]byte, error)
    // CompleteSwapOut signs the MsgCompleteSwapOut and broadcast the tx to greenfield.
    CompleteSwapOut(ctx context.Context, completeSwapOut *virtualgrouptypes.MsgCompleteSwapOut) (string, error)
    // SPExit signs the MsgStorageProviderExit and broadcast the tx to greenfield.
    SPExit(ctx context.Context, spExit *virtualgrouptypes.MsgStorageProviderExit) (string, error)
    // CompleteSPExit signs the MsgCompleteStorageProviderExit and broadcast the tx to greenfield.
    CompleteSPExit(ctx context.Context, completeSPExit *virtualgrouptypes.MsgCompleteStorageProviderExit) (string, error)
    // UpdateSPPrice signs the MsgUpdateSpStoragePrice and  broadcast the tx to greenfield.
    UpdateSPPrice(ctx context.Context, price *sptypes.MsgUpdateSpStoragePrice) (string, error)
}
```

Signer interface inherits [Modular interface](./common/lifecycle_modular.md#modular-interface), so Signer module can be managed by lifecycle and resource manager.

In terms of the functions provided by Signer module, there are ten methods. You can rewrite these methods to meet your own requirements.

## SignReplicatePieceApproval

The second params of SignReplicatePieceApproval is a task interface, the corresponding interface definition is shown below:

- [ApprovalReplicatePieceTask](./common/task.md#approvalreplicatepiecetask)

The corresponding `protobuf` definition is shown below:

- [GfSpReplicatePieceApprovalTask](./common/proto.md#gfspreplicatepieceapprovaltask-proto)

## SignReceivePieceTask

The second params of SignReceivePieceTask is a task interface, the corresponding interface definition is shown below:

- [ReceivePieceTask](./common/task.md#approvalreplicatepiecetask)

The corresponding `protobuf` definition is shown below:

- [GfSpReceivePieceTask](./common/proto.md#gfspreceivepiecetask-proto)

## SignP2PPingMsg

The corresponding `protobuf` definition is shown below:

- [GfSpPing](./common/proto.md#gfspping-proto)

## SignP2PPongMsg

The corresponding `protobuf` definition is shown below:

- [GfSpPong](./common/proto.md#gfsppong-proto)

## SealObject

The corresponding `protobuf` definition is shown below:

- [MsgSealObject](./common/proto.md#msgsealobject)

## RejectUnSealObject

The corresponding `protobuf` definition is shown below:

- [MsgRejectSealObject](./common/proto.md#msgrejectsealobject-proto)

## DiscontinueBucket

The corresponding `protobuf` definition is shown below:

- [MsgDiscontinueBucket](./common/proto.md#msgdiscontinuebucket)

## CreateGlobalVirtualGroup

The corresponding `protobuf` definition is shown below:

- [MsgCreateGlobalVirtualGroup](./common/proto.md#msgcreateglobalvirtualgroup)

## CompleteMigrateBucket

The corresponding `protobuf` definition is shown below:

- [MsgCompleteMigrateBucket](./common/proto.md#msgcompletemigratebucket)

## UpdateSPPrice

The corresponding `protobuf` definition is shown below:

- [MsgUpdateSpStoragePrice](./common/proto.md#msgupdatespstorageprice)

## SwapOut

The corresponding `protobuf` definition is shown below:

- [MsgSwapOut](./common/proto.md#msgswapout)

## CompleteSwapOut

The corresponding `protobuf` definition is shown below:

- [MsgCompleteSwapOut](./common/proto.md#msgcompleteswapout)

## SPExit

The corresponding `protobuf` definition is shown below:

- [MsgStorageProviderExit](./common/proto.md#msgstorageproviderexit)

## CompleteSPExit

The corresponding `protobuf` definition is shown below:

- [MsgCompleteStorageProviderExit](./common/proto.md#msgcompletestorageproviderexit)

## GfSp Framework Signer Code

Signer module code implementation: [Signer](https://github.com/bnb-chain/greenfield-storage-provider/tree/master/modular/signer)
