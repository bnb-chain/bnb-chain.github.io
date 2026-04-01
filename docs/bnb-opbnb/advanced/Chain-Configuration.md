---
title: Chain Configuration - opBNB
---

# Chain Configuration Reference

This page describes the configuration parameters used when setting up your own opBNB L2 chain.
These values are set in the `deploy-config/getting-started.json` file inside the
[contracts-bedrock package](https://github.com/bnb-chain/opbnb/tree/develop/packages/contracts-bedrock).

## Core Chain Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `l1ChainID` | number | Chain ID of the L1 network (e.g., `97` for BSC testnet, `56` for BSC mainnet) |
| `l2ChainID` | number | Chain ID for your L2 opBNB network |
| `l2BlockTime` | number | Block time in seconds for the L2 network (default: `1`) |
| `maxSequencerDrift` | number | Maximum number of seconds the sequencer is allowed to be ahead of L1 (default: `600`) |
| `sequencerWindowSize` | number | Maximum number of L1 blocks the sequencer can wait before submitting a batch (default: `57600`) |
| `channelTimeout` | number | Number of L1 blocks before a channel is considered timed out (default: `1200`) |

## Sequencer and Batcher Addresses

| Parameter | Type | Description |
|-----------|------|-------------|
| `p2pSequencerAddress` | address | Address of the sequencer used in P2P authentication (`$GS_SEQUENCER_ADDRESS`) |
| `batchInboxAddress` | address | Address of the batch inbox contract on L1 |
| `batchSenderAddress` | address | Address that sends batches to L1 (`$GS_BATCHER_ADDRESS`) |

## Genesis and Startup Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `l1StartingBlockTag` | hex | The L1 block tag at which the L2 chain starts |
| `l2OutputOracleSubmissionInterval` | number | How often (in L2 blocks) output roots are submitted to L1 (recommended: `3600`) |
| `l2OutputOracleStartingBlockNumber` | number | L2 block number for the first submitted output root (default: `0`) |
| `l2OutputOracleStartingTimestamp` | number | Unix timestamp corresponding to `l2OutputOracleStartingBlockNumber` |
| `l2OutputOracleProposer` | address | Address allowed to submit output proposals (`$GS_PROPOSER_ADDRESS`) |
| `l2OutputOracleChallenger` | address | Address allowed to challenge output proposals (`$GS_ADMIN_ADDRESS`) |
| `l2GenesisBlockBaseFeePerGas` | hex | Initial base fee per gas on the L2 genesis block |
| `l2GenesisBlockGasLimit` | hex | Gas limit for the L2 genesis block (default: `0x5f5e100`) |
| `l1BlockTime` | number | Expected block time of the L1 network in seconds (default: `3` for BSC) |
| `l1GenesisBlockTimestamp` | hex | Timestamp of the L1 genesis block |

## Fee Vault Configuration

| Parameter | Type | Description |
|-----------|------|-------------|
| `baseFeeVaultRecipient` | address | Address receiving base fee vault withdrawals |
| `l1FeeVaultRecipient` | address | Address receiving L1 fee vault withdrawals |
| `sequencerFeeVaultRecipient` | address | Address receiving sequencer fee vault withdrawals |
| `baseFeeVaultMinimumWithdrawalAmount` | hex | Minimum amount (in wei) before a withdrawal from the base fee vault is triggered |
| `l1FeeVaultMinimumWithdrawalAmount` | hex | Minimum amount (in wei) before a withdrawal from the L1 fee vault is triggered |
| `sequencerFeeVaultMinimumWithdrawalAmount` | hex | Minimum amount (in wei) before a withdrawal from the sequencer fee vault is triggered |
| `baseFeeVaultWithdrawalNetwork` | number | Network (`0` = L1, `1` = L2) for base fee vault withdrawals |
| `l1FeeVaultWithdrawalNetwork` | number | Network for L1 fee vault withdrawals |
| `sequencerFeeVaultWithdrawalNetwork` | number | Network for sequencer fee vault withdrawals |

## Ownership and Admin

| Parameter | Type | Description |
|-----------|------|-------------|
| `proxyAdminOwner` | address | Address that owns the ProxyAdmin contract (`$GS_ADMIN_ADDRESS`) |
| `finalSystemOwner` | address | Address that owns the final system configuration (`$GS_ADMIN_ADDRESS`) |
| `superchainConfigGuardian` | address | Address that can pause the superchain (`$GS_ADMIN_ADDRESS`) |
| `finalizationPeriodSeconds` | number | Time (in seconds) after which a proposed output root is considered finalized |

## Gas Price Oracle

| Parameter | Type | Description |
|-----------|------|-------------|
| `gasPriceOracleOverhead` | number | Fixed overhead used to calculate the L1 data fee |
| `gasPriceOracleScalar` | number | Scalar used to calculate the L1 data fee |
| `gasPriceOracleBaseFeeScalar` | number | Scalar applied to the base fee component of the L1 data fee |
| `gasPriceOracleBlobBaseFeeScalar` | number | Scalar applied to the blob base fee component of the L1 data fee |
| `eip1559Denominator` | number | EIP-1559 base fee denominator |
| `eip1559DenominatorCanyon` | number | EIP-1559 base fee denominator after the Canyon upgrade |
| `eip1559Elasticity` | number | EIP-1559 elasticity multiplier |

## Governance Token (Optional)

| Parameter | Type | Description |
|-----------|------|-------------|
| `enableGovernance` | boolean | Whether to deploy a governance token contract |
| `governanceTokenSymbol` | string | Symbol for the governance token |
| `governanceTokenName` | string | Name for the governance token |
| `governanceTokenOwner` | address | Address that owns the governance token contract |

## Fault Proof Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `useFaultProofs` | boolean | Whether to use fault proofs (default: `false`) |
| `faultGameAbsolutePrestate` | hex | Absolute prestate hash for the fault game |
| `faultGameMaxDepth` | number | Maximum depth of the fault game bisection tree |
| `faultGameMaxClockDuration` | number | Maximum clock duration for a fault game (in seconds) |
| `faultGameSplitDepth` | number | Depth at which the execution trace bisection game splits from the block bisection game |
| `faultGameWithdrawalDelay` | number | Delay (in seconds) before a withdrawal from a resolved fault game can be made |
| `proofMaturityDelaySeconds` | number | Delay (in seconds) before a proof is considered mature |
| `disputeGameFinalityDelaySeconds` | number | Delay (in seconds) before a dispute game result is considered final |

## Upgrade Time Offsets

These hex-encoded offsets define when each network upgrade takes effect relative to the genesis block timestamp.
Set to `"0x0"` to activate at genesis.

| Parameter | Description |
|-----------|-------------|
| `l2GenesisRegolithTimeOffset` | Regolith upgrade activation offset |
| `l2GenesisDeltaTimeOffset` | Delta upgrade activation offset |
| `l2GenesisCanyonTimeOffset` | Canyon upgrade activation offset |
| `L2GenesisEcotoneTimeOffset` | Ecotone upgrade activation offset |
| `l2GenesisFjordTimeOffset` | Fjord upgrade activation offset |
| `snowTimeOffset` | Snow upgrade activation offset |
| `haberTimeOffset` | Haber upgrade activation offset |
| `wrightTimeOffset` | Wright upgrade activation offset |

## Miscellaneous

| Parameter | Type | Description |
|-----------|------|-------------|
| `fundDevAccounts` | boolean | Whether to pre-fund well-known development accounts on L2 genesis |
| `systemConfigStartBlock` | number | L1 block number at which the SystemConfig contract starts accepting messages |
| `requiredProtocolVersion` | hex | Minimum required protocol version |
| `recommendedProtocolVersion` | hex | Recommended protocol version |

For a complete working example, see the configuration template in
[Run Your Own L2 with opBNB](./run-your-own-l2-with-opbnb.md#configure-your-network).
