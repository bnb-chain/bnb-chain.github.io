---
title: Piece Store
---

# Piece Store

## Vision

Write once, run on every storage service.

## Goal

- Vendor-agnostic
- Production ready
- High performance
- High availability

## Overview

The core function of PieceStore module is to be compatible with multiple object storage or KV storage such as S3, GCS, Azure Blob, Minio, Ceph, IPFS, DiskFile, Memory, etc. Different SP can use different object storage without caring about the underlying implementation.

<div align="center"><img src="https://raw.githubusercontent.com/bnb-chain/greenfield-docs/main/static/asset/11-SP-Piecestore-Arch.jpg" width="600" height="100" /></div>

<div style={{textAlign:'center'}}><i>PieceStore Architecture</i></div>

[PieceStore code](https://github.com/bnb-chain/greenfield-storage-provider/tree/master/store/piecestore)

### API Interfaces

PieceStore provides encapsulating interfaces for upper-layer services to use. Now these APIs are called by local package functions. We provide two interfaces to visit PieceStore as follows:

```go
// PieceOp is the helper interface for piece key operator and piece size calculate.
type PieceOp interface {
    // SegmentPieceKey returns the segment piece key used as the key of store piece store.
    SegmentPieceKey(objectID uint64, segmentIdx uint32) string
    // ECPieceKey returns the ec piece key used as the key of store piece store.
    ECPieceKey(objectID uint64, segmentIdx, redundancyIdx uint32) string
    // ChallengePieceKey returns the  piece key used as the key of challenge piece key.
    // if replicateIdx < 0 , returns the SegmentPieceKey, otherwise returns the ECPieceKey.
    ChallengePieceKey(objectID uint64, segmentIdx uint32, redundancyIdx int32) string
    // MaxSegmentPieceSize returns the object max segment piece size by object payload size and
    // max segment size that comes from storage params.
    MaxSegmentPieceSize(payloadSize uint64, maxSegmentSize uint64) int64
    // SegmentPieceCount returns the segment piece count of object payload by object payload size
    // and max segment size that comes from storage params.
    SegmentPieceCount(payloadSize uint64, maxSegmentSize uint64) uint32
    // SegmentPieceSize returns the segment piece size of segment index by object payload size and
    // max segment size that comes from storage params.
    SegmentPieceSize(payloadSize uint64, segmentIdx uint32, maxSegmentSize uint64) int64
    // ECPieceSize returns the ec piece size of ec index, by object payload size, max segment
    // size and chunk number that ths last two params comes from storage params.
    ECPieceSize(payloadSize uint64, segmentIdx uint32, maxSegmentSize uint64, chunkNum uint32) int64
    // ParseSegmentIdx returns the segment index according to the segment piece key
    ParseSegmentIdx(segmentKey string) (uint32, error)
    // ParseChallengeIdx returns the segment index and EC piece index  according to the challenge piece key
    ParseChallengeIdx(challengeKey string) (uint32, int32, error)
}

// PieceStore is the interface to piece store that store the object payload data.
type PieceStore interface {
    // GetPiece returns the piece data from piece store by piece key.
    // the piece can segment or ec piece key.
    GetPiece(ctx context.Context, key string, offset, limit int64) ([]byte, error)
    // PutPiece puts the piece data to piece store, it can put segment
    // or ec piece data.
    PutPiece(ctx context.Context, key string, value []byte) error
    // DeletePiece deletes the piece data from piece store, it can delete
    // segment or ec piece data.
    DeletePiece(ctx context.Context, key string) error
}
```

PieceOp interface describes how you can combine segmentPieceKey or ECPieceKey and PieceSize or PieceCount info. PieceStore interface describes what operations lower layer provide to interact. You can overwrite all methods of these two interfaces to implement your own functions. In the future, upper-layer services could visit PieceStore through HTTP, RPC or P2P which is more decentralized.

### Sharding

PieceStore provides sharding function for data high availability. PieceStore uses `fnv` algorithm to shard piece data. If users want to use data sharding, you can configure `Shards = a(a is a number which 2 <= a <= 256)` in config.toml.

**Note** The current implementation of sharding can only be used for multiple buckets in one region. The support of multi-region would be added in the future which will be higher availability.

### Compatible With Multi Object Storage

PieceStore is vendor-agnostic, so it will be compatible with multi object storage. Now SP supports based storage such as `S3, MinIO, LDFS, OSS, DiskFile and Memory`.
Recommend using S3 or MinIO in production environment and [the releated config document is here](https://github.com/bnb-chain/greenfield-storage-provider/blob/master/store/piecestore/README.md). Users can experience PieceStore in local by DiskFile or Memory. The common interface is as follows:

```go
// ObjectStorage is a common interface that must be implemented if some users want to use an object
// storage (such as S3, Azure Blob, Minio, OSS, COS, etc)
type ObjectStorage interface {
    // String the description of an object storage
    String() string
    // CreateBucket create the bucket if not existed
    CreateBucket(ctx context.Context) error
    // GetObject gets data for the given object specified by key
    GetObject(ctx context.Context, key string, offset, limit int64) (io.ReadCloser, error)
    // PutObject puts data read from a reader to an object specified by key
    PutObject(ctx context.Context, key string, reader io.Reader) error
    // DeleteObject deletes an object
    DeleteObject(ctx context.Context, key string) error

    // HeadBucket determines if a bucket exists and have permission to access it
    HeadBucket(ctx context.Context) error
    // HeadObject returns some information about the object or an error if not found
    HeadObject(ctx context.Context, key string) (Object, error)
    // ListObjects lists returns a list of objects
    ListObjects(ctx context.Context, prefix, marker, delimiter string, limit int64) ([]Object, error)
    // ListAllObjects returns all the objects as a channel
    ListAllObjects(ctx context.Context, prefix, marker string) (<-chan Object, error)
}
```

If you want to use a new storage system, you can implement the methods of ObjectStorage interface. It's very convenient!

### Outlook

PieceStore provides some fundamental functions: wrapped API interfaces, sharding and compatible with multiple storage systems. However, there are more functions to be added in the future.

1. Data Cache

PieceStore is combined with object storage, cache is an important component for interacting efficiently between the local client and remote services. Read and write data can be loaded into cache in advance or asynchronously. Using caching technology can significantly reduce the latency of storage operations and increase data throughput compared to interact with remote services directly.

2. Data sync

PieceStore will provide data synchronization for conveniently transferring data between different storage systems or different regions. Therefore, different SPs can do geo-disaster recovery backup to ensure high availability of data.
