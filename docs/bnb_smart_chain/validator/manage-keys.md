# Key Management for BSC Validator

[BEP-294](https://github.com/bnb-chain/BEPs/pull/294) and [BEP-297](https://github.com/bnb-chain/BEPs/pull/297)
introduce the native staking and governance features for BNB Smart Chain (BSC). For a validator, when participating in
staking (e.g., creating a validator, self-delegating) and governance, there are several wallet keys that will be
involved. To help validators manage their keys and funds effectively and safely, the following practices are
recommended.

## Operator Key

The operator key is used for operating a validator, including creating a validator, editing the information of a
validator, and undelegating. When creating a validator, the operator key is also used for self-delegating with more than
2001 BNB. When interacting with the new BSC staking dApp, the operator key is mostly involved.

Be noted that the operator address can not be changed for a validator.

**Recommendation: Use a hardware wallet, a Safe wallet or an MPC wallet. There should be more
than 2001 BNB in the operator account when creating a new validator.**

## Staking Key

For a validator, it can also use another key, different from the operator key, to manage his/her delegation if needed.
Then, such a staking key will be used to delegate/undelegate/redelegate to different validators and claim rewards.
This key could be used frequently, depending on how a validator manages its delegations and rewards.

Be noted that this key is optional, depending on the needs of a validator.

**Recommendation: Use a hardware wallet, a Safe wallet or an MPC wallet.**

## Consensus Key

The consensus key is used for signing proposed blocks when mining blocks. No fund is needed for this account.

**Recommendation: Use a hot wallet so that it can be easily accessed by a validator node.**

## Fast Finality Vote Key

The fast finality vote key (BLS vote key) is used in
the [fast finality feature](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP126.md) for signing votes of recently
mined blocks. No fund is needed for this account.

**Recommendation: Use a hot wallet so that it can be easily accessed by a validator node.**

## Governance Vote Key

The [BEP-297](https://github.com/bnb-chain/BEPs/pull/297) introduces the native BSC staking feature.
A delegator (including validators for self-delegation) can delegate someone else to participate in governance on his/her
behalf. When there is governance delegation, the governance vote key will be used for casting votes to BSC proposals.
The related wallet should store some BNB for gas fees of the voting transaction.

Be noted that this key is optional, depending on the needs of a validator.

**Recommendation: Use a hardware wallet, a Safe wallet or an MPC wallet.**
