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
