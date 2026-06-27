---
title: Interact with the Chain - BNB Greenfield
order: 1
---

# Interact with the Chain

There are multiple ways to interact with a node: using the CLI, using gRPC or using the REST endpoints.

!!! info
    Since Greenfield Blockchain is based on Cosmos, The majority of the content in this page is copied from the
    [Cosmos SDK](https://docs.cosmos.network/main/run-node/interact-node).

## Using the CLI

Now that your chain is running, it is time to try sending tokens from the first account you created to a second account. 
In a new terminal window, start by running the following query command:

```bash
gnfd query bank balances $MY_VALIDATOR_ADDRESS 
```

You should see the current balance of the account you created, equal to the original balance of `BNB` you granted it minus the amount 
you delegated via the `gentx`. Now, create a second account:

```bash
gnfd keys add recipient --keyring-backend test

# Put the generated address in a variable for later use.
RECIPIENT=$(gnfd keys show recipient -a --keyring-backend test)
```

The command above creates a local key-pair that is not yet registered on the chain. 
An account is created the first time it receives tokens from another account. Now, run the following command to send tokens to the `recipient` account:

```bash
gnfd tx bank send $MY_VALIDATOR_ADDRESS $RECIPIENT 1000000BNB  --keyring-backend test

# Check that the recipient account did receive the tokens.
gnfd query bank balances $RECIPIENT 
```

## Using gRPC

The Protobuf ecosystem developed tools for different use cases, including code-generation from `*.proto` files into 
various languages. These tools allow the building of clients easily. Often, the client connection (i.e. the transport) 
can be plugged and replaced very easily.

Since the code generation library largely depends on your own tech stack, we will only present three alternatives:

* `grpcurl` for generic debugging and testing,
* programmatically via Go,

### grpcurl

[grpcurl](https://github.com/fullstorydev/grpcurl) is like `curl` but for gRPC. It is also available as a Go library, 
but we will use it only as a CLI command for debugging and testing purposes. 
Follow the instructions in the previous link to install it.

Assuming you have a local node running (either a localnet, or connected a live network), you should be able to run the 
following command to list the Protobuf services available (you can replace `localhost:9000` by the gRPC server endpoint 
of another node, which is configured under the `grpc.address` field inside `app.toml`:

```bash
grpcurl -plaintext localhost:9090 list
```

You should see a list of gRPC services, like `cosmos.bank.v1beta1.Query`. This is called reflection, which is a 
Protobuf endpoint returning a description of all available endpoints. Each of these represents a different 
Protobuf service, and each service exposes multiple RPC methods you can query against.

In order to get a description of the service you can run the following command:

```bash
grpcurl \
    localhost:9090 \
    describe cosmos.bank.v1beta1.Query                  # Service we want to inspect
```

It's also possible to execute an RPC call to query the node for information:

```bash
grpcurl \
    -plaintext
    -d '{"address":"$MY_VALIDATOR"}' \
    localhost:9090 \
    cosmos.bank.v1beta1.Query/AllBalances
```

#### Query for historical state using grpcurl

You may also query for historical data by passing some [gRPC metadata](https://github.com/grpc/grpc-go/blob/master/Documentation/grpc-metadata.md) 
to the query: the `x-cosmos-block-height` metadata should contain the block to query. Using grpcurl as above, the command looks like:

```bash
grpcurl \
    -plaintext \
    -H "x-cosmos-block-height: 279256" \
    -d '{"address":"$MY_VALIDATOR"}' \
    localhost:9090 \
    cosmos.bank.v1beta1.Query/AllBalances
```

Assuming the state at that block has not yet been pruned by the node, this query should return a non-empty response.

### Programmatically via Go

The following snippet shows how to query the state using gRPC inside a Go program. The idea is to create a gRPC connection, 
and use the Protobuf-generated client code to query the gRPC server.

#### Install Greenfield GO-sdk

Refer to [Go-sdk doc](https://github.com/bnb-chain/greenfield-go-sdk) to install the latest dependency.


Init client without key manager, you should use it for only querying purpose.
```go
client := NewGreenfieldClient("localhost:9090", "greenfield_9000-121")

query := banktypes.QueryBalanceRequest{
    Address: "0x76d244CE05c3De4BbC6fDd7F56379B145709ade9",
    Denom:   "BNB",
}
res, err := client.BankQueryClient.Balance(context.Background(), &query)  
```

Init client with key manager, for signing and sending tx
```go
keyManager, _ := keys.NewPrivateKeyManager("ab463aca3d2965233da3d1d6108aa521274c5ddc2369ff72970a52a451863fbf")
gnfdClient := NewGreenfieldClient("localhost:9090", 
	                            "greenfield_9000-121",
	                            WithKeyManager(km),
                                    WithGrpcDialOption(grpc.WithTransportCredentials(insecure.NewCredentials()))
)
```


## Using the REST Endpoints

As described in the [gRPC guide](https://greenfield-chain.bnbchain.org/openapi), all gRPC services on the Cosmos SDK are made available for 
more convenient REST-based queries. The format of the URL path is based on the Protobuf service 
method's full-qualified name, but may contain small customizations so that final URLs look more idiomatic. 
For example, the REST endpoint for the `cosmos.bank.v1beta1.Query/AllBalances` method is `GET /cosmos/bank/v1beta1/balances/{address}`. 
Request arguments are passed as query parameters.

As a concrete example, the `curl` command to make balances request is:

```bash
curl \
    -X GET \
    -H "Content-Type: application/json" \
    http://localhost:1317/cosmos/bank/v1beta1/balances/$MY_VALIDATOR
```

Make sure to replace `localhost:1317` with the REST endpoint of your node, configured under the `api.address` field.

The list of all available REST endpoints is available as a Swagger specification file, it can be viewed at `localhost:1317/swagger`. 
Make sure that the `api.swagger` field is set to true in your `app.toml`.

### Query for historical state using REST

Querying for historical state is done using the HTTP header `x-cosmos-block-height`. For example, a curl command would look like:

```bash
curl \
    -X GET \
    -H "Content-Type: application/json" \
    -H "x-cosmos-block-height: 279256"
    http://localhost:1317/cosmos/bank/v1beta1/balances/$MY_VALIDATOR
```

Assuming the state at that block has not yet been pruned by the node, this query should return a non-empty response.
