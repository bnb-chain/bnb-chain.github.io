# Validator Migration Guide

The introduction of [native staking](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP294.md) on the BNB Smart
Chain marks a significant milestone, enabling validators to be directly created and managed on the chain. Following the
Feynman hardfork, validators initially established on the BNB Beacon Chain are required to migrate to the BNB Smart
Chain to continue their operations.

This document outlines the available options for migrating your validator, ensuring a seamless transition to the new
infrastructure.

## Option 1: Using the Staking dApp

The Staking dApp offers a user-friendly interface for creating a new validator on the BNB Smart Chain. Follow the
detailed instructions in the [validator creation guide](creation.md) to set up your new validator. It's crucial to
populate the `Identity` field as specified in the guide to ensure a successful migration.

Once your new validator is active, inform your delegators about the migration. They will need to migrate their stakes to
your new validator to continue supporting you. For comprehensive details on stake migration, refer to
the [stake migration guide](../users/stake-migration.md).

## Option 2: Using the Migration Tool

For those who prefer command-line tools, the BNB Chain team has developed
a [migration tool](https://github.com/bnb-chain/bc-migration-tool). This tool is designed to facilitate the migration
process for validator operators. Follow the [provided steps](https://github.com/bnb-chain/bc-migration-tool) to use the
migration tool effectively.