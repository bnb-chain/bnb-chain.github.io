# Data Service Quality Standard

## Abstract

BNB Greenfield is a decentralized storage network comprising two layers: blockchain and storage providers(SPs). The BNB Greenfield blockchain maintains ledgers for users and records storage metadata as common blockchain state data. SPs refer to storage service infrastructures provided by organizations or individuals. 

This standard aims to ensure SPs on Greenfield can provide enterprise-level, secure, reliable, and high-quality storage infrastructure and services to users. SPs that fail to meet the standards may have their eligibility and access revoked from the network.

The standards consist of two parts:

* Minimum service quality standards. The minimum service quality for SPs on various metrics on the mainnet, as well as the preferred requirements.
* Storage provider protocols. The API and P2P protocol interfaces that SPs must implement.

In addition to these standards, this document will introduce an official implementation of the SP protocols. Community developers are welcome to:

* directly use the official implementation, which currently supports Kubernetes deployment and AWS S3, OSS, MinIO, B2, Ali Lindorm as the underlying storage.
* extend the official implementation. The official solution has initially achieved modularity. SP developers can replace modules as needed.
* refer to the SP protocol documentation to customize their own solutions.

## Minimum Service Quality Standards

### Capacity

* `2M/s uplink bandwidth`: This is the minimum bandwidth requirement for SP nodes in uploading files. SP nodes must be able to stably upload files at a rate of at least 2 megabits per second.
* `20M/s downlink bandwidth`: This is the minimum bandwidth requirement for SP nodes in querying files. SP nodes must be able to provide 20M/s of download bandwidth.
* 2 files/s. This is the minimum requirement for SP nodes in file upload capability. SP nodes must be able to stably upload at least 2 files per second, the size of each test file can be 1M.
* `1PB storage capacity`: Because the SP needs to run several microservices, these computing resources will generate inevitable fixed costs. If the SP only provides a very small amount of storage capacity, it is difficult for the corresponding profits to cover these fixed costs. We hope that SP's storage capacity is unlimited.

### Availability

* `99.9% SLA`: The SLA here means the uptime of the SP API.
* `99.99% data durability`: Data durability refers to the ability to preserve and maintain data over time. It is a measure of how permanent and invulnerable the data is to loss or change. If the data durability of each SP can meet this standard, then the data stored using erasure coding and distributed across different SPs will have higher data durability guarantees.

Greenfield will punish unavailable or poor quality SPs through challenge mechanisms. SPs with SLA below 99.9% or data durability below 99.99% are likely to be phased out. 

In the early stages of Greenfield, to encourage more inexperienced SPs to participate, Greenfield will apply a relatively relaxed slash mechanism to protect SPs from slashing more than 1 BNB within one hour.

### Scalability(better to have)

We encourage SPs to dynamically scale up capacity on the basis of providing minimum capacity to avoid being unable to provide services due to sudden traffic and being slashed. The scaling strategy is related to the computing resource platform chosen by the SP. We do not make specific requirements in this regard.

## Storage Provider Protocols

### HTTP RESTful API Specification

Supporting the Greenfield Network API is essential for storage providers. It allows users and developers to interact and integrate with each SP node through a unified interface without having to adapt to custom interfaces from different SP nodes, greatly simplifying the user experience and development difficulty. The API includes functions to retrieve storage space information, upload and download files, and manage permissions.

SP nodes can implement compatibility with the network API based on their own technology. Developers can refer to the Greenfield Network's open API documentation for interfacing development.

### Universal Endpoint

All storage objects in the Greenfield Network can be identified and accessed through a universal resource identifier (URI). When creating a storage object, the SP node needs to assign it a unique URI according to the network rules and support using that URI to retrieve the object.

The detailed spec is defined [here](https://github.com/bnb-chain/greenfield-whitepaper/blob/main/part3.md#231-universal-endpoint).

### Auth Methods

Permission management and authentication mechanisms are essential for a decentralized storage network, ensuring that only authorized users can access specific storage objects. The Greenfield Network defines standard permission divisions and authorization processes, requiring SP nodes to implement detailed permission control and user authentication accordingly. SP should achieve following three authentication at least:

* `GNFD1-ECDSA`
It requires users to use a private key to sign for authentication.
* `GNFD2-EDDSA`
It is used for web-based applications and users to store the “off chain auth” EdDSA account key in SPs. Users can communicate with the SP without explicit signature for most interactions.
* `GNFD1-ETH-PERSONAL_SIGN`
It is only used to verify wallet personal signature when registering EdDSA account key in SP from a web application (e.g. [https://dcellar.io](https://dcellar.io)).

## Open source Implementation

The open source storage provider framework implements the Greenfield storage provider API and protocol specifications. It provides standardized interfaces and abstractions for SP node developers, greatly reducing the difficulty of setting up a storage provider. Developers can quickly build SP based on this framework and conduct secondary development according to their business needs. This helps cultivate the developer ecosystem of the Greenfield Network and encourages more technical teams to join the construction of the Greenfield Network. Refer to the [GitHub repo](https://github.com/bnb-chain/greenfield-storage-provider) for more details.

### Interfaces

* [Consensus](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/core/consensus/consensus.go): is an interface to query greenfield consensus data. the consensus data can come from validator, fullnode, or other off-chain data service
* [ResourManager](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/core/rcmgr/README.md): ResourceManager is an interface to the resource management subsystem. The ResourceManager tracks and accounts for resource usage in the stack, from the internals to the application, and provides a mechanism to limit resource usage according to a user configurable policy.
* [PieceStore](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/core/piecestore/piecestore.go): PieceStore defines the interfaces to the piece store that store the object payload data.
* [PieceOp](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/core/piecestore/piecestore.go): PieceOp is a helper interface for piece key operator and piece size calculation.
* [SPDB](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/core/spdb/spdb.go): SPDB is an interface to record the SP metadata.
* [BSDB](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/store/bsdb/database.go): BSDB is an interface to record the greenfield chain metadata.
* [TaskQueue](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/core/taskqueue/README.md): Task is an interface to the smallest unit of SP background service interaction. Task scheduling and execution are directly related to the order of task arrival, so task queue is a relatively important basic interface used by all modules inside SP.

### Modules

* [Approver](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/core/module/README.md) : Approver is a module to handle approval requests, such as MigrateBucketApproval.
* [Authorizer](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/core/module/README.md): Authorizer is a module to authority verification.
* [Downloader](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/core/module/README.md): Downloader is a module to handle download requests from users, and get challenge info requests from other components in the system.
* [TaskExecutor](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/core/module/README.md): TaskExecutor is a module to handle background task, it will ask task from Manager modular, handle the tasks and report the results or status to the manager module includes: `ReplicatePieceTask`, `SealObjectTask`, `ReceivePieceTask`, `GCObjectTask`, `GCZombiePieceTask`, `GCMetaTask`.
* [Manager](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/core/module/README.md): Manager is a module responsible for task scheduling and other management of SP.
* [P2P](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/core/module/README.md): P2P is a module to the interaction of control information between Sps, handles the replicate piece approval, it will broadcast the approval to other SPs, wait the responses, if up to min approved number or max approved number before timeout, will return the approvals.
* [Receiver](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/core/module/README.md): Receiver is a module to receive the piece data from primary SP, calculates the integrity hash of the piece data and sign it, returns to the primary SP for sealing objects on greenfield.
* [Signer](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/core/module/README.md): Signer is a module to handle the SP's sign and on greenfield chain operators. It holds SP all private keys. Considering the sp account's sequence number, it must be a singleton.
* [Uploader](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/core/module/README.md): Uploader is a module to handle upload requests from users, and store it in primary SP's piece store.

### Minimal Hardware Requirement

* Recommend kubernetes or kubernetes compatible platforms.
* More than 10 virtual machines, 4 core 8G spec.
* 50GB+ SQL database.
* 1 GBbps network connection.

### Secondary Development Examples

Customize interface

```go
// new your own CustomizedPieceStore instance that implement the PieceStore interface
pieceStore := NewCustomizedPieceStore(...)

// new GfSp framework app
gfsp, err := NewGfSpBaseApp(GfSpConfig, CustomizePieceStore(pieceStore))
if err != nil {
    return err
}

gfsp.Start(ctx)

// the GfSp framework will replace the default PieceStore with CustomizedPieceStore
```

Customize module

```go
// new your own CustomizedApprover instance that implement the Approver interface
// NewCustomizedApprover must be func type: 
// func(app *GfSpBaseApp, cfg *gfspconfig.GfSpConfig) (coremodule.Modular, error)
approver := NewCustomizedApprover(GfSpBaseApp, GfSpConfig)

// the Special Modular name is Predefined
gfspapp.RegisterModularInfo(model.ApprovalModularName, model.ApprovalModularDescription, approver)

// new GfSp framework app
gfsp, err := NewGfSpBaseApp(GfSpConfig, CustomizeApprover(approver))
if err != nil {
    return err
}

gfsp.Start(ctx)
// the GfSp framework will replace the default Approver with Customized Approver
```

## Documents

* [Greenfield Whitepaper](https://github.com/bnb-chain/greenfield-whitepaper): The official Greenfield Whitepaper.
* [Greenfield](../../guide/introduction): The Greenfield documents.
* [Storage Module on Greenfield](https://github.com/bnb-chain/greenfield/blob/master/docs/modules/storage-module.md): The storage module on Greenfield Chain.
* [Storage Provider on Greenfield](https://github.com/bnb-chain/greenfield/blob/master/docs/modules/storage-provider.md): The storage provider on Greenfield Chain.
* [Data Availability Challenge](https://github.com/bnb-chain/greenfield/blob/master/docs/modules/data-availability-challenge.md): The correctness of payload be stored in SP.
* [Storage Provider Introduction](../storage-provider/index.md): The Greenfield Storage Provider documents.
* [Storage Provider Compiling and Dependencies](../storage-provider/run-book/compile-dependences.md): The detailed introduction to sp compiling and dependencies.
* [Run Local Storage Provider Network](../storage-provider/run-book/run-local-SP-network.md): The introduction to run local SP env for testing.
* [Join SP Network](../storage-provider/run-book/join-SP-network.md): The introduction to join SP network in testnet or mainnet
