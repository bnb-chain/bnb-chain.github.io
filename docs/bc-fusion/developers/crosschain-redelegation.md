# Crosschain Redelegation

To migrate the existing delegation from BNB Beacon chain (the old BSC staking) to the new BNB smart chain native
staking, crosschain redelegation can be used.
A user can submit a message called `MsgSideChainStakeMigration` to the Beacon chain. Underlying, it will unbound
the delegation immediately on BC (without waiting unbond period), sends a cross-chain transaction to BSC to delegate
to a native BSC validator.

The definition of `MsgSideChainStakeMigration` is as below.

```go
type MsgSideChainStakeMigration struct {
    ValidatorSrcAddr sdk.ValAddress        `json:"validator_src_addr"`
    ValidatorDstAddr sdk.SmartChainAddress `json:"validator_dst_addr"`
    DelegatorAddr    sdk.SmartChainAddress `json:"delegator_addr"`
    RefundAddr       sdk.AccAddress        `json:"refund_addr"`
    Amount           sdk.Coin              `json:"amount"`
}
```

- `ValidatorSrcAddr`: validator address on the BC (bech32 format)
- `ValidatorDstAddr`: new validator operator address on the BSC (eth format)
- `DelegatorAddr`: delegation beneficiary address on the BSC (eth format)
- `RefundAddr`: delegator (message sender) address on the BC (bech32 format)
- `Amount`: the BNB amount for redelgation (decimal 8)

**Be noted**: please make sure input the `DelegatorAddr` correctly, otherwise you will lose the fund permanently.

For more details, please refer to the codes:
https://github.com/bnb-chain/bnc-cosmos-sdk/blob/bc-fusion/x/stake/types/stake_migration.go#L29

