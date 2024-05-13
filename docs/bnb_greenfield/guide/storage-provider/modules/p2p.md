---
title: P2P
---

# [Deprecated]P2P

P2P networks are decentralized, meaning participants communicate directly with one another on a relative “equal footing.” No central server or authority controls the network. P2P networks do not require a privileged set of “servers” that behave differently from their “clients,” as in the predominant client-server model.

P2P networks can take many forms, including file-sharing systems like BitTorrent, blockchain networks like Bitcoin and Ethereum, and decentralized communication standards like Matrix. These systems all have different challenges and tradeoffs, but they share the goal of improving upon the traditional client-server networking model.

GfSp uses [libp2p](https://github.com/libp2p/go-libp2p) to complete p2p functions. If you are interested in p2p, you can refer libp2p for more information.

SP abandoned the conventional p2p ping service, because the conventional ping service is managed and communicated in units of p2p nodes, without considering the fairness between SPs, the SP's p2p service is more inclined to synchronize messages to different SPs, instead of synchronous p2p nodes. For this purpose we have customized ping service.

The customized ping service implements dynamic update of p2p permanent nodes. As usual, permanent nodes should cover as many SPs as possible, which is more decentralized, eg: get replicate approval request needs at least 6 or more replies from different SPs but p2p node are offline and replacement, which is an inevitable problem, If nodes belonging to the same sp all fail and are replaced, then the sp will be unable to communicate, this requires dynamic updates permanent nodes.

The customized ping service also implements the pruning function of permanent nodes. For zombie nodes, pruning strategy takes into account the information of the SP dimension, and uses a very conservative pruning strategy. Nodes are only pruned if there are enough backups for one SP and multiple failed interactions, can try to keep each SP with enough nodes to try to connect, so that each sp has an equal opportunity to receive requests.

We define a p2p interface to let you customize your own functions:

``` go
// P2P is an abstract interface to the to do replicate piece approvals between SPs.
type P2P interface {
    Modular
    // HandleReplicatePieceApproval handles the asking replicate piece approval, it will
    // broadcast the approval to other SPs, waiting the responses. If up to min approved
    // number or max approved number before timeout, it will return the approvals.
    HandleReplicatePieceApproval(ctx context.Context, task task.ApprovalReplicatePieceTask, min, max int32,
        timeout int64) ([]task.ApprovalReplicatePieceTask, error)
    // HandleQueryBootstrap handles the query p2p node bootstrap node info.
    HandleQueryBootstrap(ctx context.Context) ([]string, error)
    // QueryTasks queries replicate piece approval tasks that running on p2p by task sub-key.
    QueryTasks(ctx context.Context, subKey task.TKey) ([]task.Task, error)
}
```

P2P interface inherits [Modular interface](./common/lifecycle_modular.md#modular-interface), so P2P module can be managed by lifecycle and resource manager.

In terms of the functions provided by P2P module, there are three methods: HandleReplicatePieceApproval, HandleQueryBootstrap and QueryTasks.

As we can see from the second parameter of `HandleReplicatePieceApproval` defined in `P2P` interface, there is a replicate piece approval task. It's also defined as an interface.

We can query UploadObject tasks that we care about by `QueryTasks` method through using subKey.

> Following the implementation of the SP Exit feature, the existing P2P module is currently inactive. Nevertheless, there remains a potential scenario where the P2P module could be reutilized at a later point in time.

## ApprovalReplicatePieceTask

ApprovalReplicatePieceTask is an abstract interface to record the ask replicate pieces to other SPs(as secondary SP for the object). It is initiated by the primary SP in the replicate pieces phase. Before the primary SP sends it to other SPs, the primary SP will sign the task, other SPs will verify it is sent by a legitimate SP. If other SPs approved the approval, they will SetExpiredHeight and signs the ApprovalReplicatePieceTask.

- [ApprovalReplicatePieceTask](./common/task.md#approvalreplicatepiecetask)
- [ApprovalTask](./common/task.md#approvaltask)
- [ObjectTask](./common/task.md#objecttask)

The corresponding protobuf definition is shown below:

- [GfSpReplicatePieceApprovalTask](./common/proto.md#gfspreplicatepieceapprovaltask-proto)
- [ObjectInfo](./common/proto.md#objectinfo-proto)
- [Params](./common/proto.md#params-proto)

## GfSp Framework P2P Code

P2P module code implementation: [P2P](https://github.com/bnb-chain/greenfield-storage-provider/tree/master/modular/p2p)
