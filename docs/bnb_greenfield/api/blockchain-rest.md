---
title: Blockchain API
icon: generic
order: 1
---
# Blockchain API

This document presents an overview of all the endpoints a node exposes: gRPC, REST as well as some other endpoints.

!!! info
    Since Greenfield Blockchain is based on Cosmos, The majority of the content in this page is copied from the
    [Cosmos SDK](https://docs.cosmos.network/main/core/grpc_rest).

## An Overview of All the Endpoints

Each node exposes the following endpoints for users to interact with a node, each endpoint is served on a different port.
Details on how to configure each endpoint is provided in the endpoint's own section.

* the gRPC server (default port: `9090`),
* the REST server (default port: `1317`),
* the Tendermint RPC endpoint (default port: `26657`).

!!! tip
    The node also exposes some other endpoints, such as the Tendermint P2P endpoint, or the
    [Prometheus endpoint](https://docs.tendermint.com/main/tendermint-core/metrics.html#list-of-available-metrics),
    which are not directly related to the Cosmos SDK. Please refer to the
    [Tendermint documentation](https://docs.tendermint.com/main/tendermint-core/using-tendermint.html#configuration)
    for more information about these endpoints.

## gRPC Server （Deprecated）

In the Greenfield, Protobuf is the main encoding library. This brings a wide range of Protobuf-based tools that can be
plugged. One such tool is [gRPC](https://grpc.io), a modern open-source high performance RPC framework that has
decent client support in several languages.

The `grpc.Server` is a concrete gRPC server, which spawns and serves all gRPC query requests and a broadcast transaction
request. This server can be configured inside `~/.gnfd/config/app.toml`:

* `grpc.enable = true|false` field defines if the gRPC server should be enabled. Defaults to `true`.
* `grpc.address = {string}` field defines the address (really, the port, since the host should be kept at `0.0.0.0`)
  the server should bind to. Defaults to `0.0.0.0:9090`.

!!! tip
    `~/.gnfd` is the directory where the node's configuration and databases are stored.

Once the gRPC server is started, you can send requests to it using a gRPC client. Some examples are given in our
[Interact with the Node](../guide/greenfield-blockchain/run-node/interact-node.md#using-grpc) tutorial.

## REST Server

Greenfield supports REST routes via gRPC-gateway.

All routes are configured under the following fields in `~/.gnfd/config/app.toml`:

* `api.enable = true|false` field defines if the REST server should be enabled. Defaults to `false`.
* `api.address = {string}` field defines the address (really, the port, since the host should be kept at `0.0.0.0`) the
  server should bind to. Defaults to `tcp://0.0.0.0:1317`.
* some additional API configuration options are defined in `~/.gnfd/config/app.toml`, along with comments,
  please refer to that file directly.

### Swagger

A [Swagger](https://swagger.io/) (or OpenAPIv2) specification file is exposed under the `/swagger` route on the API server.
Swagger is an open specification describing the API endpoints a server serves, including description, input arguments,
return types and much more about each endpoint.

Enabling the `/swagger` endpoint is configurable inside `~/.gnfd/config/app.toml` via the `api.swagger` field, which is set to true by default.


## Tendermint RPC

Independently of the Cosmos SDK, Tendermint also exposes an RPC server. This RPC server can be configured by tuning
parameters under the `rpc` table in the `~/.gnfd/config/config.toml`, the default listening address is `tcp://0.0.0.0:26657`.
An OpenAPI specification of all Tendermint RPC endpoints is available [here](https://docs.tendermint.com/master/rpc/).

Some Tendermint RPC endpoints are directly related to the Cosmos SDK:

* `/abci_query`: this endpoint will query the application for state. As the `path` parameter, you can send the following strings:
    * any Protobuf fully-qualified service method, such as `/cosmos.bank.v1beta1.QueryAllBalances`. The `data` field should then include the method's request parameter(s) encoded as bytes using Protobuf.
    * `/app/simulate`: this will simulate a transaction, and return some information such as gas used.
    * `/app/version`: this will return the application's version.
    * `/store/{path}`: this will query the store directly.
    * `/p2p/filter/addr/{port}`: this will return a filtered list of the node's P2P peers by address port.
    * `/p2p/filter/id/{id}`: this will return a filtered list of the node's P2P peers by ID.
* `/broadcast_tx_{aync,async,commit}`: these 3 endpoint will broadcast a transaction to other peers. CLI, gRPC and REST expose a way to broadcast transactions, but they all use these 3 Tendermint RPCs under the hood.

## Comparison Table

| Name             | Advantages                                                                                                                                                              | Disadvantages                                                                                                  |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| gRPC（Deprecated） | - can use code-generated stubs in various languages<br/>- supports streaming and bidirectional communication (HTTP2)<br/>- small wire binary sizes, faster transmission | - based on HTTP2, not available in browsers<br/>- learning curve (mostly due to Protobuf)                      |
| REST             | - ubiquitous<br/>- client libraries in all languages, faster implementation<br/>                                                                                        | - only supports unary request-response communication (HTTP1.1)<br/>- bigger over-the-wire message sizes (JSON) |
| Tendermint RPC   | - easy to use                                                                                                                                                           | - bigger over-the-wire message sizes (JSON)                                                                    |

