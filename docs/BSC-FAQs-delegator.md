---
sidebar_label: BSC Delegator FAQs
hide_table_of_contents: false
sidebar_position: 2
---

# BNB Smart Chain Delegator

### What's the role of a delegator?

A delegator can delegate its BNB to a chosen validator to participate the consensus and earn rewards. Staking BNB directly contributes to the security of the entire network.

### How to delegate my BNB?

Please read the guide [here](del-guide.md)

You can use:

* [Binance Extension Wallet](binance.md)
* [Math Wallet](http://blog.mathwallet.xyz/?p=3890)
* [Trust Wallet](https://community.trustwallet.com/t/bnb-staking-with-trust-wallet/113243)
* [Command Line Tool](https://github.com/bnb-chain/node/releases/tag/v0.8.1)

### How to undelegate my BNB?

Delegates and validators themselves may choose to unbond their BNB for a variety of reasons. It is important to note that these BNB are subject to what is known as the **UnbondingTime**, an on-chain parameterized period of time upon which all delegates, including validators, must wait for their BNB to become fully unbonded. In addition, these BNB are still subject to be potentially slashed upon commitment of any byzantine behavior. The **UnbondingTime** ensures a variety of security measures in the network, such as accounting for network synchrony assumptions, providing a lower bound for the length of a [long-range attack](https://cosmos.network/docs/spec/ibc/references.html#3) and solving the “nothing-at-stake” problem.

The current  **UnbondingTime**  in BNB Smart Chain mainnet is **7 days**.

### How to redelegate my BNB?

Redelegations between a unique delegator, source validator, and destination validator can only happen once every **UnbondingTime**

### How many tokens are required to stake BNB?

The [minimum delegated amount](parameters.md) is **1BNB**.

### How to claim my rewards?

The rewards will be distributed to every delegators from `bscvalidator` [smart contract](https://bscscan.com/address/0x0000000000000000000000000000000000001000) everyday.

You can read about the details [here](stake/Staking.md) and about staking cli commands [here](stake/cli-commands.md)

### When can I receive my staking rewards?

Since validatorset info is updated every day UTC 00:00, to make some room for the error handling, we distribute the fees of day N-1 in the next breathe block (day N+1). Thus, after you sent delegate transaction, you will receive your first staking rewards at the second UTC 00:00. Afterwards, you will receive your rewards everyday at UTC 00:00.

### When can I receive my undelegated BNB?
Since Unbonding Period is 7 days. Thus, after you sent undelegate transaction, your staked BNB will not  receive any rewards since the next UTC 00:00. After 7 days start from the next UTC 00:00, you will receive your BNB .

### When can I redelegate my staked BNB?
You can choose to move your staked BNB to a different validator by sending a redelegate transaction. For example, you can redelegate from validator A to validator B.  Your BNB are still staked, and you can receive rewards from validator B since next 00:00 UTC

Redelegations between a unique delegator, source validator, and destination validator can only happen once every 7 days

### What is the potential loss for delegators?
The only risk for delegators is the loss of rewards when their staked validator is slashed. Their staked BNB will not be impacted.

### Can a validator run away with their delegators' BNB?
By delegating to a validator, a user delegates voting power.  This does not mean that the validator has custody of their delegators' BNB. By no means can a validator run away with its delegator's funds.

### Can I receive my staking rewards if my chosen validator is inactive?
No, you cannot.

### When can I receive my unstaked BNB? 
After you sent `undelegate` transaction, you have to wait 7 days. This period starts at UTC 00:00 next day.

### What is APR? 
Annual Percentage Rate (APR) is the annual rate of interest paid to delegators net of commission. The calculation is based on the income of this validator 2 days ago. It is not compounded and updated every 24 hours. 



