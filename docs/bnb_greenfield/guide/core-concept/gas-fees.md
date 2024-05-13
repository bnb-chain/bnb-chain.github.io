---
sidebar_label: Gas and Fees
order: 3
---

# Gas and Fees

This document describes how Greenfield charge fee to different transaction types and the token economics of BNB Greenfield.

## Introduction to `Gas` and `Fees`

In the Cosmos SDK, `gas` unit is designated to track resource consumption during execution.

On application-specific blockchains such as Greenfield, computational cost of storage is no 
longer the main factor in determining transaction fees, but rather, it is the incentive mechanism 
of Greenfield. For instance, creating and deleting a storage object use similar I/O and computational 
resources, but Greenfield encourages users to delete unused storage objects to optimize storage space, 
resulting in lower transaction fees.

**Greenfield Blockchain has taken a different approach from the gas meter design in Cosmos SDK. Instead, 
it has redesigned the gashub module to calculate gas consumption based on the type and content of the transaction, 
rather than just the consumption of storage and computational resources.**

Unlike networks like Ethereum, Greenfield transactions do not feature a gas price field. Instead, they consist of a fee
and a gas-wanted field. The gas price is inferred during the transaction pre-execution process by fee/gas-wanted,
and the transactions are queued based on the gas price, besides that the gas price should not be less than the minimum
gas price on Greenfield: 5gwei.

!!! warning
    **This means that Greenfield does not refund any excess gas fees to the transaction sender. 
    Therefore, when constructing transactions, it is important to exercise caution when specifying the fees.**

## GasHub

All transaction types need to register their gas calculation logic to gashub. Currently, four types of calculation logic 
are supported:

**MsgGasParams_FixedType**:
```go
type MsgGasParams_FixedType struct {
	FixedType *MsgGasParams_FixedGasParams 
}
```

**MsgGasParams_GrantType**:
```go
type MsgGasParams_GrantType struct {
	GrantType *MsgGasParams_DynamicGasParams 
}
```

**MsgGasParams_MultiSendType**:
```go
type MsgGasParams_MultiSendType struct {
	MultiSendType *MsgGasParams_DynamicGasParams 
}
```

**MsgGasParams_GrantAllowanceType**:
```go
type MsgGasParams_GrantAllowanceType struct {
	GrantAllowanceType *MsgGasParams_DynamicGasParams 
}
```

### Block Gas Meter

`ctx.BlockGasMeter()` serves as the gas meter designed to monitor and restrict gas consumption per block.

However, certain types of transactions may incur a high cost in Greenfield, leading to significant gas consumption. 
Consequently, Greenfield refrains from imposing any gas usage constraints on a block. Instead, Greenfield sets a block 
size limit, preventing blocks from exceeding 1MB in size and mitigating the risk of excessively large blocks.


!!! info
    There is no gas limitation of a block on Greenfield Blockchain.

## Fee Table

Please note that the gas fee can be updated through governance and may not be immediately reflected in this 
documentation.

| Msg Type                                    | Gas Used           | Gas Price | Expected Fee(assuming BNB $200) |
|---------------------------------------------|--------------------|-----------|---------------------------------|
| /cosmos.auth.v1beta1.MsgUpdateParams        | 0                  | 5 gwei    | $0.00000000                     |
| /cosmos.bank.v1beta1.MsgUpdateParams        | 0                  | 5 gwei    | $0.00000000                     |
| /cosmos.consensus.v1.MsgUpdateParams        | 0                  | 5 gwei    | $0.00000000                     |
| /cosmos.crisis.v1.MsgUpdateParams           | 0                  | 5 gwei    | $0.00000000                     |
| /cosmos.crosschain.v1.MsgUpdateParams       | 0                  | 5 gwei    | $0.00000000                     |
| /cosmos.crosschain.v1.MsgUpdateChannelPermissions | 0                  | 5 gwei    | $0.00000000                     |
| /cosmos.distribution.v1beta1.MsgUpdateParams | 0                  | 5 gwei    | $0.00000000                     |
| /cosmos.gashub.v1beta1.MsgUpdateParams      | 0                  | 5 gwei    | $0.00000000                     |
| /cosmos.gov.v1.MsgUpdateParams              | 0                  | 5 gwei    | $0.00000000                     |
| /cosmos.mint.v1beta1.MsgUpdateParams        | 0                  | 5 gwei    | $0.00000000                     |
| /cosmos.oracle.v1.MsgUpdateParams           | 0                  | 5 gwei    | $0.00000000                     |
| /cosmos.slashing.v1beta1.MsgUpdateParams    | 0                  | 5 gwei    | $0.00000000                     |
| /cosmos.staking.v1beta1.MsgUpdateParams     | 0                  | 5 gwei    | $0.00000000                     |
| /greenfield.bridge.MsgUpdateParams          | 0                  | 5 gwei    | $0.00000000                     |
| /greenfield.sp.MsgUpdateParams              | 0                  | 5 gwei    | $0.00000000                     |
| /greenfield.storage.MsgUpdateParams         | 0                  | 5 gwei    | $0.00000000                     |
| /greenfield.payment.MsgUpdateParams         | 0                  | 5 gwei    | $0.00000000                     |
| /greenfield.challenge.MsgUpdateParams       | 0                  | 5 gwei    | $0.00000000                     |
| /greenfield.permission.MsgUpdateParams      | 0                  | 5 gwei    | $0.00000000                     |
| /cosmos.authz.v1beta1.MsgExec               | 1200               | 5 gwei    | $0.00120000                     |
| /cosmos.authz.v1beta1.MsgRevoke             | 1200               | 5 gwei    | $0.00120000                     |
| /cosmos.bank.v1beta1.MsgSend                | 1200               | 5 gwei    | $0.00120000                     |
| /cosmos.distribution.v1beta1.MsgSetWithdrawAddress | 1200               | 5 gwei    | $0.00120000                     |
| /cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward | 1200               | 5 gwei    | $0.00120000                     |
| /cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission | 1200               | 5 gwei    | $0.00120000                     |
| /cosmos.feegrant.v1beta1.MsgRevokeAllowance | 1200               | 5 gwei    | $0.00120000                     |
| /cosmos.gov.v1.MsgDeposit                   | 1200               | 5 gwei    | $0.00120000                     |
| /cosmos.gov.v1.MsgSubmitProposal            | 2000000            | 5 gwei    | $2.00000000                     |
| /cosmos.gov.v1.MsgVote                      | 2000000            | 5 gwei    | $2.00000000                     |
| /cosmos.gov.v1.MsgVoteWeighted              | 2000000            | 5 gwei    | $2.00000000                     |
| /cosmos.oracle.v1.MsgClaim                  | 1000               | 5 gwei    | $0.00100000                     |
| /cosmos.slashing.v1beta1.MsgUnjail          | 1200               | 5 gwei    | $0.00120000                     |
| /cosmos.staking.v1beta1.MsgBeginRedelegate  | 1200               | 5 gwei    | $0.00120000                     |
| /cosmos.staking.v1beta1.MsgCancelUnbondingDelegation | 1200               | 5 gwei    | $0.00120000                     |
| /cosmos.staking.v1beta1.MsgCreateValidator  | 2000000            | 5 gwei    | $2.00000000                     |
| /cosmos.staking.v1beta1.MsgDelegate         | 1200               | 5 gwei    | $0.00120000                     |
| /cosmos.staking.v1beta1.MsgEditValidator    | 2000000            | 5 gwei    | $2.00000000                     |
| /cosmos.staking.v1beta1.MsgUndelegate       | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.bridge.MsgTransferOut           | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.sp.MsgCreateStorageProvider     | 2000000            | 5 gwei    | $2.00000000                     |
| /greenfield.sp.MsgDeposit                   | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.sp.MsgEditStorageProvider       | 2000000            | 5 gwei    | $2.00000000                     |
| /greenfield.sp.MsgUpdateSpStoragePrice      | 2000000            | 5 gwei    | $2.00000000                     |
| /greenfield.sp.MsgUpdateStorageProviderStatus | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.storage.MsgCreateBucket         | 2400               | 5 gwei    | $0.00240000                     |
| /greenfield.storage.MsgDeleteBucket         | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.storage.MsgMirrorBucket         | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.storage.MsgUpdateBucketInfo     | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.storage.MsgCreateObject         | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.storage.MsgSealObject           | 120                | 5 gwei    | $0.00012000                     |
| /greenfield.storage.MsgMirrorObject         | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.storage.MsgRejectSealObject     | 12000              | 5 gwei    | $0.01200000                     |
| /greenfield.storage.MsgDeleteObject         | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.storage.MsgCopyObject           | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.storage.MsgCancelCreateObject   | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.storage.MsgUpdateObjectInfo     | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.storage.MsgDiscontinueObject    | 2400               | 5 gwei    | $0.00240000                     |
| /greenfield.storage.MsgDiscontinueBucket    | 2400               | 5 gwei    | $0.00240000                     |
| /greenfield.storage.MsgCreateGroup          | 2400               | 5 gwei    | $0.00240000                     |
| /greenfield.storage.MsgDeleteGroup          | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.storage.MsgLeaveGroup           | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.storage.MsgUpdateGroupMember    | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.storage.MsgUpdateGroupExtra     | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.storage.MsgRenewGroupMember     | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.storage.MsgMirrorGroup          | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.storage.MsgPutPolicy            | 2400               | 5 gwei    | $0.00240000                     |
| /greenfield.storage.MsgDeletePolicy         | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.storage.MsgMigrateBucket        | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.storage.MsgCancelMigrateBucket  | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.storage.MsgCompleteMigrateBucket | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.payment.MsgCreatePaymentAccount | 200000             | 5 gwei    | $0.20000000                     |
| /greenfield.payment.MsgDeposit              | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.payment.MsgWithdraw             | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.payment.MsgDisableRefund        | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.challenge.MsgSubmit             | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.challenge.MsgAttest             | 100                | 5 gwei    | $0.00010000                     |
| /greenfield.virtualgroup.MsgCreateGlobalVirtualGroup | 1000000            | 5 gwei    | $1.00000000                     |
| /greenfield.virtualgroup.MsgDeleteGlobalVirtualGroup | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.virtualgroup.MsgDeposit         | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.virtualgroup.MsgWithdraw        | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.virtualgroup.MsgSettle          | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.virtualgroup.MsgSwapOut         | 24000              | 5 gwei    | $0.02400000                     |
| /greenfield.virtualgroup.MsgCompleteSwapOut | 24000              | 5 gwei    | $0.02400000                     |
| /greenfield.virtualgroup.MsgCancelSwapOut   | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.virtualgroup.MsgReserveSwapIn   | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.virtualgroup.MsgCancelSwapIn   | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.virtualgroup.MsgCompleteSwapIn   | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.virtualgroup.MsgStorageProviderExit | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.virtualgroup.MsgStorageProviderForcedExit | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.virtualgroup.MsgCompleteStorageProviderExit | 1200               | 5 gwei    | $0.00120000                     |
| /greenfield.virtualgroup.MsgUpdateParams    | 1200               | 5 gwei    | $0.00120000                     |
| cosmos.authz.v1beta1.MsgGrant              | 800 + 800 per item | 5 gwei    | $0.0008 per item                |
| cosmos.bank.v1beta1.MsgMultiSend           | 800 + 800 per item | 5 gwei    | $0.0008 per item                |
| cosmos.feegrant.v1beta1.MsgGrantAllowance  | 800 + 800 per item | 5 gwei    | $0.0008 per item                |

For more details, you can refer to [Greenfield Gas Params](https://greenfield-chain.bnbchain.org/cosmos/gashub/v1beta1/msg_gas_params).

## Usage of BNB Token on BNB Greenfield

**BNB** remains the main utility token on Greenfield. **BNB** can be transferred from BSC to Greenfield blockchain, and vice versa. It is used as:

- **Staking token**: This token allows user to self-delegate and delegate as stake, which can earn gas rewards but may result in slash for improper behavior.
- **Gas token**: This token is used to pay the gas to submit transactions on the Greenfield blockchain. This includes both Greenfield local transactions or cross-chain transactions between Greenfield and BSC. The fee is charged at the time of transaction submission and dispatched to Greenfield `validators`, and potentially to Greenfield `Storage Providers` for certain transactions. The fee distribution is done in-protocol and a protocol specification is [described here](https://github.com/bnb-chain/greenfield-cosmos-sdk/blob/master/docs/spec/fee_distribution/f1_fee_distr.pdf).
- **Storage service fee token**: This token is used to pay fees for object storage and download bandwidth data package. Fees are charged as time goes on and dispatched to Greenfield `Storage Providers`.
- **Governance token**: BNB holders may govern the Greenfield by voting on proposals with their staked BNB (not available at launch).

## Revenue Sharing

The main economic drive of Greenfield comes from their `storage providers` who charge users fees for their storage services.
Meanwhile, `validators` play a crucial role in supervising the network's security, maintaining stability and ensuring service quality.
While `validators` may earn transaction fees, this alone may not be enough to guarantee sufficient staking for network security.
Therefore, Greenfield has designed `validators` to receive a reasonable proportion of fees from the storage services they provide.
This approach ensures that users' data is not only stored but that the network is also safe and secure.

## Circulation Model

In Greenfield, there is no inflation of BNB because of its dual-chain structure. Instead, cross-chain transfers are used to allow BNB to flow bi-directionally between Greenfield and Smart Chain. As a result, the total circulation of BNB on Greenfield can fluctuate.

Greenfield use Lock/Unlock mechanism to ensure the total circulation of BNB on both chain is always less than the initial total supply:

1. The transfer-out blockchain will lock the amount from source owner addresses into a module account or smart contract.

2. The transfer-in blockchain will unlock the amount from module account or contract and send it to target addresses.

3. Both networks will never mint BNB.

Refer to [cross chain model](../core-concept/programmability.md) to get more details about the mechanism.

## Genesis Setup

BNB is transferred from BSC to Greenfield as the first cross-chain action. The initial validator set and `storage provider` of Greenfield at the genesis will first lock a certain amount of BNB into the "Greenfield Token Hub" contract on BSC. This contract is used as part of the native bridge for BNB transferring after the genesis. These initial locked BNB will be used as the self-stake of `validators`, the deposit of `storage provider` and early days gas fees.

The initial BNB allocation on greenfield is around 500K BNB.

!!! tip
    No initial donors, foundation, or company will get funds in the genesis setup.
    
    No token inflation.

