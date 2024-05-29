---
sidebar_label: BNB Token Model
---

# BNB Token Model

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

Refer to [cross chain model](../core-concept/cross-chain/programmability.md) to get more details about the mechanism.

## Genesis Setup

BNB is transferred from BSC to Greenfield as the first cross-chain action. The initial validator set and `storage provider` of Greenfield at the genesis will first lock a certain amount of BNB into the "Greenfield Token Hub" contract on BSC. This contract is used as part of the native bridge for BNB transferring after the genesis. These initial locked BNB will be used as the self-stake of `validators`, the deposit of `storage provider` and early days gas fees.

The initial BNB allocation on greenfield is around 500K BNB.

!!! tip
    No initial donors, foundation, or company will get funds in the genesis setup.
