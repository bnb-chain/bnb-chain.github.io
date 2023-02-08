---
sidebar_label: Storage Transactions
sidebar_position: 2
hide_table_of_contents: false
---
# Storage Transactions

The Greenfield blockchain supports a series of transactions to create,
update, and delete the Greenfield resources.

The bucket and object creation transactions have to interact with the
SPs to ensure they are ready, while group and permission-related
operations do not require that.

The users should always create a bucket before they can store any
objects.

Greenfield bucket name follows the same naming specification as AWS S3
bucket name. It must be globally unique.

The CreateBucket transaction must have the below information:

  * `Sender`, which can be derived from the transaction signer
  * `Bucket name`
  * The `ID` of the SP that the bucket and all objects under this bucket will use as the Primary SP

There is a corresponding `DeleteBucket` transaction. It requires that all the objects under the bucket must be deleted first. As described in the earlier section, the bucket owner can delete any object under his/her bucket.

Object creation is described in [Design Section](../design/design-principles.md). There is a corresponding `DeleteObject` transaction. The deletion will tell Greenfield to refund the reserved fees and reduce the payment stream.

There are group `creation`, `deletion`, and `member management` transactions.

There are transactions about permission creation and deletion, as they
are the cornerstone functionality for the economy.

More worthy of highlighting, all of these transactions can be triggered
via cross-chain infrastructure from BSC smart contracts and EOAs.

There are a few transactions about changing the Primary SP of users'
buckets. It will be asynchronous as the action may take some time based
on the number and size of the objects in the bucket. The bucket needs to
be "**Sealed**" again by the new Primary SP.
