---
title: Storage Provider
order: 2
---

# Storage Provider

## Abstract

The storage providers (SP) are storage service infrastructures that organizations or individuals provide and the
corresponding roles they play. They use Greenfield as the ledger and the single source of truth. Each SP can and
will respond to users' requests to write (upload) and read (download) data, and serve as the gatekeeper for
user rights and authentications.

The SP module is responsible for managing and keeping storage providers in the network. This includes:

- **Metadata**: Basic information, such as address, tokens, and status, about each SP.
- **Deposit**: Aspiring SPs must stake tokens to guarantee their capacity to offer storage services.
- **Slash**: Stored data on an SP is occasionally challenged. If the challenge succeeds, the SP is penalized by losing some of its staked tokens.
- **Reputation**: We are implementing a reputation system to assess the quality of each SP's service. Users can select an SP based on its reputation score to store their data.
- **Exit**: SPs can leave voluntarily as long as they adhere to specific rules and recover their staked tokens. Greenfield may also force an SP to exit if it lacks sufficient staked tokens or its reputation score falls below the minimum requirements for an SP.

## Key Workflow

### Join the network

SPs have to register themselves first by depositing BNB tokens on the Greenfield blockchain as their "Service Stake". 
The validators will go through a dedicated governance procedure to vote for the SPs of their election. SPs are encouraged to
advertise their information and prove to the community their capability, as SPs have to provide a professional storage
system with high-quality SLA.

It will take several transactions to join the greenfield storage network for storage provider.

1. The funding account of SP should grant the governance module account to deduct tokens for staking;
2. The SP submit a `CreateStorageProvider` proposal to governance module;
3. Deposit enough BNB tokens for the proposal;
4. The validators should either vote `Pass` or `reject` for the proposal;
5. When more than half of the validators have voted, the storage provider will be automatically created on chain.
6. The SP status will be `STATUS_IN_MAINTENANCE` after created, it must send a transaction to update its status to `STATUS_IN_SERVICE` to activate itself.

### Leave the network

When the SPs join or leave the network, they have to follow a series of actions to ensure data redundancy for the
users; otherwise, their "Service Stake" will be fined. This is achieved through the data availability challenge and
validator governance votes.

For more information, please see [SP exit](../modules/virtual-group.md#sp-exit-workflow)

## State

### StorageProvider

The storage provider can be in one of these several statuses:

* `STATUS_IN_SERVICE`: The SP is in service. it can serve user's Create/Upload/Download request.
* `STATUS_IN_MAINTENANCE`: The SP is in maintenance. it can not serve user's Create/Upload request. It might be able to serve Download request.
* `STATUS_GRACEFUL_EXITING`: The SP is exiting gracefully. All the object stored in it will be shifted to another sp.

The storage providers metadata should be primarily stored and accessed by the `OperatorAddr`, an EIP712 account address
for the operator of the storage provider. Three additional indices are maintained per storage provider metadata in
order to fulfill required lookups for SealObject/Deposit/Slash/GetApproval.

* StorageProvider: `0x21 | OperatorAddr -> ProtocolBuffer(StorageProvider)`
* StorageProviderByFundingAddress: `0x22 | FundingAddress -> OperatorAddr`
* StorageProviderBySealAddress: `0x23 | SealAddress -> OperatorAddr`
* StorageProviderByApprovalAddress: `0x24 | ApprovalAddress -> OperatorAddr`

Each storage provider's state is stored in a `StorageProvider` struct.

```protobuf
// StorageProvider defines the meta info of storage provider
message StorageProvider {
  // // id is the identifier of the storage provider, used in virtual group
  uint32 id = 1;
  // operator_address defines the account address of the storage provider's operator; It also is the unique index key of sp.
  string operator_address = 2 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // funding_address defines one of the storage provider's accounts which is used to deposit and reward.
  string funding_address = 3 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // seal_address defines one of the storage provider's accounts which is used to SealObject
  string seal_address = 4 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // approval_address defines one of the storage provider's accounts which is used to approve use's migrateBucket request
  string approval_address = 5 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // gc_address defines one of the storage provider's accounts which is used for gc purpose.
  string gc_address = 6 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // maintenance_address defines one of the storage provider's accounts which is used for testing while in maintenance mode
  string maintenance_address = 7 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // total_deposit defines the number of tokens deposited by this storage provider for staking.
  string total_deposit = 8 [
    (cosmos_proto.scalar) = "cosmos.Int",
    (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Int",
    (gogoproto.nullable) = false
  ];
  // status defines the current service status of this storage provider
  Status status = 9;
  // endpoint define the storage provider's network service address
  string endpoint = 10;
  // description defines the description terms for the storage provider.
  Description description = 11 [(gogoproto.nullable) = false];
  // bls_key defines the bls pub key of the Storage provider for sealing object and completing migration
  bytes bls_key = 12;
}
```

### Params

Params is a module-wide configuration structure that stores system parameters
and defines overall functioning of the SP module.

```protobuf
// Params defines the parameters for the module.
message Params {
  option (gogoproto.equal) = true;
  option (gogoproto.goproto_stringer) = false;

  // deposit_denom defines the staking coin denomination.
  string deposit_denom = 1;
  // min_deposit defines the minimum deposit amount for storage providers.
  string min_deposit = 2 [
    (cosmos_proto.scalar) = "cosmos.Int",
    (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Int",
    (gogoproto.nullable) = false
  ];
  // the ratio of the store price of the secondary sp to the primary sp, the default value is 12%
  string secondary_sp_store_price_ratio = 3 [
    (cosmos_proto.scalar) = "cosmos.Dec",
    (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Dec",
    (gogoproto.nullable) = false
  ];
  // previous blocks that be traced back to for maintenance_records
  int64 num_of_historical_blocks_for_maintenance_records = 4 [(gogoproto.moretags) = "yaml:\"num_of_historical_blocks_for_maintenance_records\""];
  // the max duration that a SP can be in_maintenance within num_of_historical_blocks_for_maintenance_records
  int64 maintenance_duration_quota = 5 [(gogoproto.moretags) = "yaml:\"maintenance_duration_quota\""];
  // the number of blocks to be wait for sp to be in maintenance mode again if already requested
  int64 num_of_lockup_blocks_for_maintenance = 6 [(gogoproto.moretags) = "yaml:\"num_of_lockup_blocks_for_maintenance\""];
  // the time interval to update global storage price, if it is not set then the price will be updated at the first block of each natural month
  uint64 update_global_price_interval = 7 [(gogoproto.moretags) = "yaml:\"update_global_price_interval\""];
  // the days counting backwards from end of a month in which a sp cannot update its price
  uint32 update_price_disallowed_days = 8 [(gogoproto.moretags) = "yaml:\"update_price_disallowed_days\""];
}
```

### Deposit Pool

The SP module uses its module account to manage all the staking tokens deposited by storage providers.

## Message

### MsgCreateStorageProvider

A storage provider is created using the `MsgCreateProvider` messages.

```protobuf
message MsgCreateStorageProvider {
  option (cosmos.msg.v1.signer) = "creator";
  
  string creator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  Description description = 2 [(gogoproto.nullable) = false];
  string sp_address = 3 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  string funding_address = 4 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  string seal_address = 5 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  string approval_address = 6 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  string gc_address = 7 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  string maintenance_address = 8 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  string endpoint = 9;
  cosmos.base.v1beta1.Coin deposit = 10 [(gogoproto.nullable) = false];
  string read_price = 11 [
    (cosmos_proto.scalar) = "cosmos.Dec",
    (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Dec",
    (gogoproto.nullable) = false
  ];
  uint64 free_read_quota = 12;
  string store_price = 13 [
    (cosmos_proto.scalar) = "cosmos.Dec",
    (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Dec",
    (gogoproto.nullable) = false
  ];
  string bls_key = 14;
  string bls_proof = 15;
}
```

This message is expected to fail if:

* Another storage provider with this operator/seal/funding/approval address is already registered;
* The initial deposit tokens do not belong to the denomination that is specified as the deposit denomination of the SP module;
* The deposit tokens is insufficient.

### MsgEditStorageProvider

The metadata of a storage provider can be edited by using `MsgEditStorageProvider` messages.

```protobuf
// MsgEditStorageProvider defines a SDK message for editing an existed SP.
message MsgEditStorageProvider {
  option (cosmos.msg.v1.signer) = "sp_address";

  string sp_address = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  string endpoint = 2;
  Description description = 3 [(gogoproto.nullable) = false];
  string seal_address = 4 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  string approval_address = 5 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  string gc_address = 6 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  string maintenance_address = 7 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  string bls_key = 8;
  string bls_proof = 9;
}
```

This message is expected to fail if:

* The storage provider is not existed.
* The description fields are too large.
* The bls_proof verification failed.

### MsgDeposit

When the deposit tokens of a storage provider are insufficient, it can use `MsgDeposit` messages to resupply the
deposit tokens.

```protobuf
// MsgDeposit defines a SDK message to deposit token for SP.
message MsgDeposit {
  option (cosmos.msg.v1.signer) = "creator";

  // creator is the msg signer, it should be SP address or sp's fund address
  string creator = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // sp_address is the operator address of sp
  string sp_address = 2 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // deposit is a mount of token which used to deposit for SP
  cosmos.base.v1beta1.Coin deposit = 3 [(gogoproto.nullable) = false];
}
```

This message is expected to fail if:

* The storage provider doesn't exist;
* The tokens that are deposited do not belong to the denomination that is specified as the deposit denomination of the SP module.

### MsgUpdateStorageProviderStatus

```protobuf
// MsgUpdateStorageProviderStatus is used to update the status of a SP by itself
message MsgUpdateStorageProviderStatus {
  option (cosmos.msg.v1.signer) = "sp_address";
  string sp_address = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  Status status = 2;
  int64 duration = 3;
}
```

This message is expected to fail if:

* The storage provider doesn't exist;
* The status is not changed
* The restrictions violated

### UpdateSpStoragePrice

A storage provider can update its free read quote, suggested primary store price and read price. All SPs' suggested primary store and 
read prices will be used to generate the global primary/secondary store price and read price. 

```protobuf
// MsgUpdateSpStoragePrice defines a SDK message to update its prices of a SP.
message MsgUpdateSpStoragePrice {
  option (cosmos.msg.v1.signer) = "sp_address";

  // sp address
  string sp_address = 1 [(cosmos_proto.scalar) = "cosmos.AddressString"];
  // read price, in bnb wei per charge byte
  string read_price = 2 [
    (cosmos_proto.scalar) = "cosmos.Dec",
    (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Dec",
    (gogoproto.nullable) = false
  ];
  // free read quota, in byte
  uint64 free_read_quota = 3;
  // store price, in bnb wei per charge byte
  string store_price = 4 [
    (cosmos_proto.scalar) = "cosmos.Dec",
    (gogoproto.customtype) = "github.com/cosmos/cosmos-sdk/types.Dec",
    (gogoproto.nullable) = false
  ];
}
```

This message is expected to fail if:

* The storage provider doesn't exist;
* The storage provider tries to update its prices in the last `update_price_disallowed_days` (default value is 2) days.
