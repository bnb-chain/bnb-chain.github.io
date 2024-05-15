# SP Workflow

This section will combine all the current and existing workflows of SP to help you understand how SP works and how internal state flows.

## Get Approval

[GetApproval](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/get_approval.md) API includes actions: `MigrateBucket`. If the request is successful, you can then send a MigrateBucket approval request. This action is used to determine whether SP is willing to serve the request. SP may reject users with a bad reputation or specific objects or buckets. SP approves the request by signing a message for the action and responding to the users. By default, SP will serve the request, but it can refuse if it chooses to do so. Each SP can customize its own strategy for accepting or rejecting requests.

The flow chart is shown below:

<div align="center"><img src="https://raw.githubusercontent.com/bnb-chain/greenfield-docs/main/static/asset/07-get_approval.jpg" width="1000" height="100" /></div>

- Gateway receives GetApproval requests from the request originator.
- Gateway verifies the signature of request to ensure that the request has not been tampered with.
- Gateway invokes Authenticator to check the authorization to ensure the corresponding account is existed.
- Gateway invokes Approver to fills the MigrateBucket message timeout field and dispatches the request to Signer service.
- Gets Signature from Signer, fills the message's approval signature field, and returns to the request originator.

**Note**

If users send multiple `MigrateBucket` approval requests in a short period of time, SP will provide the same results due to an expired blockchain height that is set to prevent repeated requests, such as DDoS attacks.

See request and response details for this API: [GetApproval](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/get_approval.md).

Users do not need to ask approval to update existing objects, they can directly send the `MsgUpdateObjectContent` to Greenfield Chain.

## Create Bucket
<div align="center"><img src="https://raw.githubusercontent.com/bnb-chain/greenfield-docs/main/static/asset/07-create_bucket_object.png" /></div>

The `Create Bucket` operation initiates a request through the Go SDK. It then queries the greenfield-chain interface to obtain an optimal Global Virtual Group Family ID. This ID is used to request the creation of a bucket on the greenfield chain.

Service Providers periodically refresh and monitor all SPs within the Global Virtual Group Family to check if there is available storage space within the Global Virtual Groups (GVG). If no space is available, they request the greenfield chain to create a new GVG. This update is to provide an available VGF for the `Create Bucket` operation to select from.

## Create Object

After creating a bucket, the user sends a create object request through the Go SDK, selecting the corresponding bucket name. This object is then sent as a transaction to Greenfield. After waiting for the object to reach the status of OBJECT_STATUS_CREATED, the object is successfully created.

## Upload Object

For new object, after successfully creating on Greenfield chain.

you can upload an object to SP. For updating an existing object, you can upload directly once confirmed the `MsgUpdateObjectContent` tx on Greenfield chain.

This API involves two steps: first, users manually upload an object to PrimarySP; second, after a successful upload to PrimarySP, the object is automatically replicated to secondarySP to ensure data reliability.

Upload to PrimarySP flow chart is shown below:

<div align="center"><img src="https://raw.githubusercontent.com/bnb-chain/greenfield-docs/main/static/asset/08-put_object.jpg" width="1000" height="100" /></div>

### [Gateway](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/modules/gateway.md)

- Gateway receives PutObject requests from client.
- Gateway verifies the signature of request to ensure that the request has not been tampered with.
- Gateway invokes Authenticator to check the authorization to ensure the corresponding account has permissions on resources.
- Dispatches the request to Uploader module.

### [Uploader](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/modules/uploader.md)

- Uploader accepts object data in a streaming format and divides it into segments based on the `MaxSegmentSize`, which is determined by consensus in the Greenfield chain. The segmented data is then stored in the PieceStore.
- Uploader creates a TaskContext with an initial state of `INIT_UNSPECIFIED`. Upon beginning the upload of segments, the TaskContext's state transitions to `UPLOAD_OBJECT_DOING`. Once all segments have been uploaded, the TaskContext's state changes to `UPLOAD_OBJECT_DONE`. In the event of any abnormal situations during the upload, the TaskContext's state will change to `UPLOAD_OBJECT_ERROR`.
- After uploading all segments, insert segments data checksums and root checksum into the SP DB.
- Uploader creates an upload object task for Manager and returns a success message to the client indicating that the put object request is successful.

### [TaskExecutor](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/modules/taskexecutor.md)

Replicate to SecondarySP flow chart is shown below:

<div align="center"><img src="https://raw.githubusercontent.com/bnb-chain/greenfield-docs/main/static/asset/09-replicate_object.jpg" width="1000" height="100" /></div>

- Executor fetch ReplicatePieceTask from the Manager which help pick a proper virtual group.
- The object data is asynchronously replicated to virtual group secondary SPs.
- TaskExecutor retrieves segments from the PieceStore in parallel and uses `Erasure Coding(EC)` to compute a data redundancy solution for these segments, generating the corresponding EC pieces. The EC pieces are then organized into six replicate data groups, with each group containing several EC pieces based on the Redundancy policy.
- Then sends the replicate data groups in streaming to the selected secondary SPs in parallel.
- The TaskContext's secondary SP information is updated once the replication of a secondary SP is completed. The TaskContext's state changes from `REPLICATE_OBJECT_DOING` to `REPLICATE_OBJECT_DONE` only after all secondary SPs have completed replication.

### [Receiver](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/modules/receiver.md)

- Receiver checks whether the SecondarySP approval is self-signed and has timed out. If either of these conditions is true, the system returns a `SIGNATURE_ERROR` to TaskExecutor.
- Receiver works in secondary SP, receives EC pieces that belong to the same replicate data group, and uploads the EC pieces to the secondary SP PieceStore.
- Computes the EC pieces integrity checksum, sign the integrity checksum by SP's approval private key, then returns these to TaskExecutor.

### [TaskExecutor](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/modules/taskexecutor.md)

- Receives the response from secondary SPs' Receiver, and unsigned the signature to compare with the secondary SP's approval public key.
- Sends the MsgSealObject to the Signer for signing the seal object transaction and broadcasting to the Greenfield chain with the secondary SPs' integrity hash and signature. The state of the TaskContext turns to `SIGN_OBJECT_DOING` from `REPLICATE_OBJECT_DONE`. If Signer succeeds to broadcast the SealObjectTX, changes `SEAL_OBJECT_TX_DOING` state immediately into `SIGN_OBJECT_DONE` state.
- Monitor the execution results of seal object transaction on the Greenfield chain to determine whether the seal is successful. If so, the TaskContext state is changed into `SEAL_OBJECT_DONE` state.

See request and response details for this API: [PutObject](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/put_object.md).

## Download Object

Users can download an object from PrimarySP. The flow chart is shown below:

<div align="center"><img src="https://raw.githubusercontent.com/bnb-chain/greenfield-docs/main/static/asset/10-get_object.jpg" width="1000" height="100" /></div>

### [Gateway](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/modules/gateway.md)

- Receives the GetObject request from the client.
- Verifies the signature of request to ensure that the request has not been tampered with.
- Checks the authorization to ensure the corresponding account has permissions on resources.
- Checks the object state and payment account state to ensure the object is uploaded in the primary SP, and the payment account is active.
- Dispatches the request to Downloader.

### [Downloader](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/modules/downloader.md)

- Receives the GetObject request from the Gateway service.
- Check whether the read traffic exceeds the quota.
    * If exceeds the quota, the Downloader refuses to serve and returns a not-enough-quota error to the Gateway.
    * If the quota is sufficient, Downloader inserts read record into the SP traffic-db.
- Downloader splits the GetObject request into GetPiece requests (which support range reads) to retrieve the corresponding piece payload data. Downloader then streams the object payload data back to the Gateway.

See request and response details for this API: [GetObject](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/storage-provider-rest-api/get_object.md).

## QueryMeta

Users maybe want to query some metadata about buckets, objects, bucket read quota or bucket read records from SP. SP provides related APIs about querying metadata. The flow chart is shown below:

<div align="center"><img src="https://raw.githubusercontent.com/bnb-chain/greenfield-docs/main/static/asset/11-query_meta.jpg" width="800" height="100" /></div>

### [Gateway](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/modules/gateway.md)

- Receives the QueryMeta request from the client.
- Verifies the signature of request to ensure that the request has not been tampered with.
- Checks the authorization to ensure the corresponding account has permissions on resources.
- Dispatches the request to Metadata.

### Metadata

- Metadata receives the QueryMeta request from Gateway.
- Metadata queries bucket or object from SP DB or BS DB.

## Get Challenge Piece Info

Ensuring data integrity and availability is always the top priority for any decentralized storage network. To achieve better high availability (HA), we use data challenges instead of storage proofs. The system continuously issues data challenges to random pieces on the greenfield chain, and SP that stores the challenged piece responds using the challenge workflow. Each SP splits the object payload data into segments, stores the segment data in the PieceStore, and stores the segment checksum in SP DB.

The flow chart is shown below:

<div align="center"><img src="https://raw.githubusercontent.com/bnb-chain/greenfield-docs/main/static/asset/12-challenge.jpg" width="1000" height="100" /></div>

### [Gateway](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/modules/gateway.md)

- Receives the Challenge request from the client.
- Verifies the signature of request to ensure that the request has not been tampered with.
- Checks the authorization to ensure the corresponding account has permissions on resources.
- Dispatches the request to Downloader.

### [Downloader](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/docs/modules/downloader.md)

- Downloader receives the Challenge request from Gateway.
- Returns all segment data checksums and challenge segment data payload to Gateway.
    * Retrieve all segment data checksums from the SP DB.
    * Get the challenge segment data from PieceStore.

## GC Object

GC is used to delete objects whose metadata on Greenfield chain has already been deleted, reducing the cost of each SP and data size in Greenfield chain. This function is automatically executed in Manager daemon mode.

The flow chart is shown below:

<div align="center"><img src="https://raw.githubusercontent.com/bnb-chain/greenfield-docs/main/static/asset/13-gc_object.jpg" width="800" height="100" /></div>

- Manager dispatches GCObjectTask to TaskExecutor.
- TaskExecutor send requests to Metadata to query deleted objects in order.
- TaskExecutor delete payload data which is stored in PieceStore.

## GC ZombiePiece

GC ZombiePiece is an abstract interface to record the information for collecting the piece store space by deleting zombie pieces data that dues to any exception, the piece data meta is not on chain but the pieces have been stored in piece store, or the piece should not be stored on the correct SP node. This function is automatically executed in Manager daemon mode.

The flow chart is shown below:

![gc-zombie-flow](../../../static/asset/13-gc-zombie.png)

<div style={{textAlign:'center'}}><i>GC ZombiePiece</i></div>

- Manager dispatches GCZombiePieceTask to TaskExecutor.
- TaskExecutor send requests to SPDB to query integrity meta in order.
- TaskExecutor determines whether a piece is a ZombiePiece based on the IntegrityMeta table. Scans all IntegrityMeta within the current object ID range specified in GCZombiePieceTask (StartObjectId, EndObjectId).
- TaskExecutor determines whether a piece is a ZombiePiece based on the PieceHash table. Scans all PieceHash within the current object ID range specified in GCZombiePieceTask (StartObjectId, EndObjectId).
- TaskExecutor delete payload data which is stored in PieceStore.

## GC Meta

GCMetaTask is an abstract interface to record the information for collecting the SP meta store space by deleting the expired data. This function is automatically executed in Manager daemon mode.

The flow chart is shown below:

![gc-meta-flow](../../../static/asset/13-gc-meta.png)

<div style={{textAlign:'center'}}><i>GC Meta</i></div>

- Manager dispatches GCMetaTask to TaskExecutor, triggered by gcMetaTicker.
- TaskExecutor send requests to SPDB to delete entries from BucketTraffic using SpDBImpl::DeleteAllBucketTrafficExpired for expired BucketTrafficTable.
- TaskExecutor send requests to SPDB to delete entries from ReadRecord using SpDBImpl::DeleteAllReadRecordExpired for expired ReadRecord table.

## GC stale version object 

GC StaleVersion is used to gc stale version of object data in piece store and metadata in DB when the object update is performed.
The flow chart is shown below:

![gc-stale-object-flow](../../../static/asset/gc-stale-object.png)

<div style={{textAlign:'center'}}><i>GC StaleVersion</i></div>

- Manager dispatches GCStaleVersionObjectTask to TaskExecutor.
- TaskExecutor validate if the object data and meta is stale, and do the clean up in piece store and DB.
- 
## Migrate Bucket

Bucket user can select primary sp freely and use the migration bucket to migrate the sp service when they feel that the SP service quality is poor.

The flow chart is shown below:

<div align="center"><img src="https://raw.githubusercontent.com/bnb-chain/greenfield-docs/main/static/asset/14-bucket_migrate.jpg" width="1000" height="100" /></div>

- The bucket user should ask new primary sp for migration bucket, and get the approval of the new primary SP.
- The bucket user submits a MigrationBucket transaction with the approval of the new primary SP.
- The dest sp subscribes event from chain, and produce migrate execute plan.
- The dest sp executor fetch migrate gvg task to execute, and period report progress.
- The dest sp sends the complete tx if all the gvg task are completed in execute plan.

## SP Exit

Greenfield allows for the participation of SPs and also allows them to exit according to their wishes.

The flow chart is shown below:

<div align="center"><img src="https://raw.githubusercontent.com/bnb-chain/greenfield-docs/main/static/asset/14-sp_exit.jpg" width="1000" height="100" /></div>

- The src sp self applying for exit by sending the StorageProviderExit transaction to the blockchain.
- The src sp subscribes event from chain, and produce exit execute plan.
- The src sp dispatches swap out info dest sp.
- The dest sp produces gvg migrate task by swap out unit.
- The dest sp executor fetch migrate gvg task to execute, and period report progress.
- The dest sp sends the complete swap out tx if all the gvg task are completed in swap out.
- The src sp sends the complete sp exit tx if all the swap out are completed.
