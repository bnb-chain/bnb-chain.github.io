---
title: Metadata
---

# Metadata

Metadata service is to supply better query service for the Greenfield network. Users can interact with SP for some complex query services.
Some interfaces can be costly to implement on the chain or can cause significant latency.
Metadata service is designed to implement the corresponding interface under the chain and provide it to the SP to achieve high performance and low latency.
The events' data are optimally stored by the block syncer and provided to the metadata.
Also, it provides additional extensions such as Pagination, Sort Key, and filtering. etc.

## Role

Sync all the Greenfield chain data to the distributed stores, and offers the read RPC
requests for chain data(in addition to payload). SP service will query the info, E.g.
permission, ListBucket, ListObject, etc. It will reduce the pressure on the Greenfield chain.

## Scalability

At present, the main role of metadata is to provide better scalability, and two main points are considered in the process of interface development:

1. the creation of interfaces that are not currently supported on the chain
2. metadata can provide better performance and low latency interfaces compared to those on the chain

## Key Workflow

### Get User's Own Buckets

Metadata service Receives the GetUserBucketsRequest request from the Gateway that has been authenticated. The service
converts the data format inside BSDB to the response type of the corresponding interface, and 
returns GetUserBucketsResponse, which retrieves all bucket information from the BS DB.

## Message

```protobuf
// GetUserBucketsRequest is request type for the GetUserBuckets RPC method.
message GetUserBucketsRequest {
  // account_id is the account address of user
  string account_id = 1;
}
// GetUserBucketsResponse is response type for the GetUserBuckets RPC method.
message GetUserBucketsResponse {
  // buckets defines the list of bucket
  repeated Bucket buckets = 1;
}
```

### List Object By Bucket Name

Metadata Service receives the ListObjectsByBucketNameRequest request from Gateway that has been authenticated.
The service converts the data format inside BSDB to the response type of the corresponding interface, and
returns ListObjectsByBucketNameResponse, which retrieves all object information related to the bucket from the BS DB.

## Message

```protobuf
// ListObjectsByBucketNameRequest is request type for the ListObjectsByBucketName RPC method
message ListObjectsByBucketNameRequest {
  // bucket_name is the name of the bucket
  string bucket_name = 1;
  // account_id is the account address of user
  string account_id = 2;
}
// ListObjectsByBucketNameResponse is response type for the ListObjectsByBucketName RPC method.
message ListObjectsByBucketNameResponse {
  // objects defines the list of object
  repeated Object objects = 1;
}
```
