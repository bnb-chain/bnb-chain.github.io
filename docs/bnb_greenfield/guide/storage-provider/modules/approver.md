# Approver

Approver module is used to handle approval requests including `MigrateBucketApproval` . The workflow of Approver users can refer [GetApproval](../introduction/workflow.md#get-approval). We currently abstract SP as the GfSp framework, which provides users with customizable capabilities to meet their specific requirements. Approver module provides an abstract interface, which is called `Approver`, as follows:

Approver is an abstract interface to handle ask approval requests.

```go
type Approver interface {
    Modular
    // PreCreateBucketApproval prepares to handle CreateBucketApproval, it can do some checks such as checking for duplicates, if limitation of SP has been reached, etc.
    PreCreateBucketApproval(ctx context.Context, task task.ApprovalCreateBucketTask) error
    // HandleCreateBucketApprovalTask handles the CreateBucketApproval, it can set expired height, sign the MsgCreateBucket and so on.
    HandleCreateBucketApprovalTask(ctx context.Context, task task.ApprovalCreateBucketTask) (bool, error)
    // PostCreateBucketApproval is called after HandleCreateBucketApprovalTask, it can recycle resources, make statistics and do some other operations.
    PostCreateBucketApproval(ctx context.Context, task task.ApprovalCreateBucketTask)

    // PreMigrateBucketApproval prepares to handle MigrateBucketApproval, it can do some
    // checks such as checking for duplicates, if limitation of SP has been reached, etc.
    PreMigrateBucketApproval(ctx context.Context, task task.ApprovalMigrateBucketTask) error
    // HandleMigrateBucketApprovalTask handles the MigrateBucketApproval, it can set expired height, sign the MsgMigrateBucket and so on.
    HandleMigrateBucketApprovalTask(ctx context.Context, task task.ApprovalMigrateBucketTask) (bool, error)
    // PostMigrateBucketApproval is called after HandleMigrateBucketApprovalTask, it can recycle resources, make statistics
    // and do some other operations.
    PostMigrateBucketApproval(ctx context.Context, task task.ApprovalMigrateBucketTask)

    // PreCreateObjectApproval prepares to handle CreateObjectApproval, it can do some checks such as check for duplicates, if limitation of SP has been reached, etc.
    PreCreateObjectApproval(ctx context.Context, task task.ApprovalCreateObjectTask) error
    // HandleCreateObjectApprovalTask handles the CreateObjectApproval, it can set expired height, sign the MsgCreateObject and so on.
    HandleCreateObjectApprovalTask(ctx context.Context, task task.ApprovalCreateObjectTask) (bool, error)
    // PostCreateObjectApproval is called after HandleCreateObjectApprovalTask, it can recycle resources, make statistics and do some other operations.
    PostCreateObjectApproval(ctx context.Context, task task.ApprovalCreateObjectTask)
    // QueryTasks queries tasks that running on approver by task sub-key.
    QueryTasks(ctx context.Context, subKey task.TKey) ([]task.Task, error)
}
```

Approver interface inherits [Modular interface](./common/lifecycle_modular.md#modular-interface), so Approver module can be managed by lifecycle and resource manager.

The functionality of the Approver module is primarily centered around the MigrateBucketApproval process. This process encompasses three distinct phases, each managed by a dedicated method: PreXXX for preliminary actions, HandleXXX for core processing, and PostXXX for follow-up operations. Users have the flexibility to customize these methods to align with their specific needs, enabling a tailored approach to the migration process.

The second parameter in PreMigrateBucketApproval(ctx context.Context, task task.ApprovalMigrateBucketTask), which is ApprovalMigrateBucketTask, is also an interface. This design facilitates future customization by the user.

We can query ApprovalMigrateBucket task that we care about by `QueryTasks` method through using subKey.

## ApprovalMigrateBucketTask

ApprovalTask is used to record approval information for users creating buckets and objects. Primary SP approval is required before serving the bucket and object. If the SP approves the message, it will sign the approval message. The greenfield will verify the signature of the approval message to determine whether the SP accepts the bucket and object. ApprovalTask includes `ApprovalMigrateBucketTask`.

The corresponding interfaces definition is shown below:

- [ApprovalTask](./common/task.md#approvaltask)
- [ApprovalMigrateBucketTask](./common/task.md#approvalmigratebuckettask)

ApprovalTask interface inherits [Task interface](./common/task.md#task), it describes what operations does a Task have. You can overwrite all these methods in your own.

The corresponding `protobuf` definition is shown below:

- [GfSpMigrateBucketApprovalTask](./common/proto.md#gfspmigratebucketapprovaltask-proto)
- [MsgMigrateBucket](./common/proto.md#msgmigratebucket-proto)

## GfSp Framework Approver Code

Approver module code implementation: [Approver](https://github.com/bnb-chain/greenfield-storage-provider/tree/master/modular/approver)
