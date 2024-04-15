# Validator Migration Guide

The introduction of [native staking](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP294.md) on the BNB Smart
Chain marks a significant milestone, enabling validators to be directly created and managed on the chain. Following the
Feynman hardfork, validators initially established on the BNB Beacon Chain are required to migrate to the BNB Smart
Chain to continue their operations.

To migrate your validator, you can take the following steps:

1. Create a new validator

The Staking dApp offers a user-friendly interface for creating a new validator on the BNB Smart Chain. Follow the
detailed instructions in the [validator creation guide](creation.md) to set up your new validator. It's crucial to
populate the `Identity` field as specified in the guide to ensure a successful migration.

2. Migrate stakes to the new validator

Once your new validator is active, inform your delegators about the migration. They will need to migrate their stakes to
your new validator to continue supporting you. For comprehensive details on stake migration, refer to
the [stake migration guide](../users/stake-migration.md).