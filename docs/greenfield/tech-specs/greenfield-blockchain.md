---
sidebar_label: Greenfield Blockchain
sidebar_position: 2
hide_table_of_contents: false
---

# Greenfield Blockchain

As an independent blockchain, Greenfield blockchain is built on Cosmos
SDK and the Tendermint library. It runs in a similar fashion as other
PoS blockchains that are based on the same framework.

## Token Economics

BNB remains the main utility token on Greenfield.

BNB can be transferred from BSC to Greenfield blockchain, and vice
versa. It will be used to:

**1.** Self-delegate and delegate as stake, which can earn gas rewards and may suffer slash for improper behaviors.

**2.** Pay the gas to submit transactions on the Greenfield blockchain, which includes Greenfield local transactions or cross-chain transactions between Greenfield and BSC. This is charged at the time of transaction submission and dispatched to Greenfield validators, and potentially Greenfield Storage Providers for some transactions.

**3.** Pay fees for the object storage and download bandwidth data package. This is charged as time goes and dispatched to Greenfield Storage Providers.

## Consensus and Validator Election

As Proof-of-Stake is adopted in Greenfield, there will be a founding
validator set in the genesis state. These validators deposit their BNBs
on a BSC smart contract, which would be locked as their stakes. The new
validator can be voted by the majority of the current validators to join
in and gets elected as the active validator based on its delegation
size. Here are the steps for becoming a new validator:

**1.** Self-delegator grants delegate authorization to the gov module account. Delegate authorization allows the grantee to execute MsgDelegate for the granter.

**2.** Initiate a proposal to become a validator.

**3.** Wait for the current validators to vote on this proposal.

**4.** Once the proposal has passed, the new validator will be created automatically.

A validator may not always be a member of the active validator set,
which will propose and produce blocks. Only the ones elected by the rank
of delegation size will be the active validators. The election happens
every block. The maximum number of active validators is fixed and governed by the existing validators.

It should be highlighted that the Greenfield validators are separated
from the Greenfield Storage Providers. The Greenfield validators are
responsible for generating Greenfield blocks, maintaining the Greenfield
blockchain security, challenging the data availability, and maintaining
cross-chain communication; while the Storage Providers are responsible
for storing the data objects and responding to downloading requests.
There is no strong binding relationship between them, although the same
organization can play two roles at the same time.

### Governance Transactions

### Create and Edit Validator

To become a validator, the runner must grant the delegate authorization to the gov module account with enough BNB, and then a proposal should be
submitted to get votes from the existing validators. After the proposal is passed, the self-delegation would be done by the gov module, and the validator would be created automatically. The self delegation is required, and open delegation from other delegators will also be supported later.

The validator creation logic should be changed later to reduce the
concern of Cartels.

**Message MsgCreateValidator:**

```go
type MsgCreateValidator struct {
    Description       Description
    Commission        CommissionRates
    MinSelfDelegation github_com_cosmos_cosmos_sdk_types.Int
    DelegatorAddress  string
    ValidatorAddress  string
    Pubkey            *types.Any
    Value             types.Coin
    From              string
    RelayerAddress    string
    RelayerBlsKey     string
}
```

A validator can edit its description and commission by submitting an
"**Edit Validator**" transaction. The `CommissionRate` will be verified as a
proper number.

**Message MsgEditValidator:**

```go
type MsgEditValidator struct {
    Description       Description
    ValidatorAddress  string
    CommissionRate    *github_com_cosmos_cosmos_sdk_types.Dec
    MinSelfDelegation *github_com_cosmos_cosmos_sdk_types.Int
    RelayerAddress    string
    RelayerBlsKey     string
}
```

### Staking Reward Distribution

Validators will receive transaction fees as the staking reward. The
rewards will be distributed passively. This is different from BNB Beacon
Chain, where the system will distribute the rewards automatically.
Validators can submit withdrawal requests to get all the up-to-date
transaction rewards, and when validators change commission rates or
quit, all the transaction rewards that are not withdrawn will also be
distributed.

### Create Storage Provider

To become a storage provider, the runner should submit a proposal, and the current active validators can vote on this proposal. Once the proposal is passed, the new storage provider will be created automatically.

Greenfield separates the roles of validator and storage providers.
Although it is natural for the validators to maintain a meaningful and
healthy number of storage providers, there should still be incentives
for the validators to manage a reasonable number of SPs. Validators
will get more data challenge rewards if there are more storage
providers. The payment flow that is used for data challenge rewards
would be like this:

```
$$ data challenge reserves = (1 - \frac{1}{SP Number + 1}) * Maximum Percent $$

```

Data availability challenge will be covered in the later section.

### Remove Storage Provider

Anyone can submit a proposal to remove a storage provider for the
storage provider doesn't provide a good service or prefers to stop
service. The current active validators can vote on this proposal. Once this proposal is passed, the SP will be restricted from accepting new object-storing requests, but still has the obligation to serve query requests. Other SPs or the data owners should start requesting to move the data off this "to-be-removed" SP. The "to-be-removed" SP has to facilitate the data moving so that it can get the full deposit back and avoid further slash.
Actually, even if it chooses to not cooperate, the data can be recovered from the other SPs. After all the data has been migrated, this "to-be-removed" SP can withdraw all its deposit, and this SP would be removed.

