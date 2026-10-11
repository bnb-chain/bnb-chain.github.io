---
title: opBNB Deployment Configuration Reference
---

# opBNB Deployment Configuration Reference

Use this example and field reference when [creating your own opBNB rollup testnet](run-your-own-l2-with-opbnb.md).
Complete the build, account setup, and network configuration steps in that tutorial
before deploying contracts. Replace example addresses and values with your deployment settings.

## Deploy config example

```bash

{
    "l1ChainID": 97,
    "l2ChainID": 4274,
    "l2BlockTime": 1,
    "maxSequencerDrift": 600,
    "sequencerWindowSize": 57600,
    "channelTimeout": 1200,
    "p2pSequencerAddress": "0x3224F068Fd97D2d4a91800D450EE19bfBCD6B6Ee",
    "batchInboxAddress": "0xff00000000000000000000000000000000004274",
    "batchSenderAddress": "0xB6e487a3cEcDe5e0E1793C98c2de1999a1319A2b",
    "cliqueSignerAddress": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "l1UseClique": false,
    "l1StartingBlockTag": "0x304dee2",
    "l2OutputOracleSubmissionInterval": 3600,
    "l2OutputOracleStartingBlockNumber": 0,
    "l2OutputOracleStartingTimestamp": 1745389366,
    "l2OutputOracleProposer": "0x254811af494550Ee5e0945C23EC5E4E17c9dF1bC",
    "l2OutputOracleChallenger": "0x5E8fe030B465b448a78bA5Ef3c674Da25fDf67f5",
    "l2GenesisBlockGasLimit": "0x5f5e100",
    "l1BlockTime": 3,
    "baseFeeVaultMinimumWithdrawalAmount": "0x8ac7230489e80000",
    "l1FeeVaultMinimumWithdrawalAmount": "0x8ac7230489e80000",
    "sequencerFeeVaultMinimumWithdrawalAmount": "0x8ac7230489e80000",
    "baseFeeVaultWithdrawalNetwork": 0,
    "l1FeeVaultWithdrawalNetwork": 0,
    "sequencerFeeVaultWithdrawalNetwork": 0,
    "proxyAdminOwner": "0x5E8fe030B465b448a78bA5Ef3c674Da25fDf67f5",
    "baseFeeVaultRecipient": "0x5E8fe030B465b448a78bA5Ef3c674Da25fDf67f5",
    "l1FeeVaultRecipient": "0x5E8fe030B465b448a78bA5Ef3c674Da25fDf67f5",
    "sequencerFeeVaultRecipient": "0x5E8fe030B465b448a78bA5Ef3c674Da25fDf67f5",
    "finalSystemOwner": "0x5E8fe030B465b448a78bA5Ef3c674Da25fDf67f5",
    "superchainConfigGuardian": "0x5E8fe030B465b448a78bA5Ef3c674Da25fDf67f5",
    "finalizationPeriodSeconds": 3,
    "fundDevAccounts": true,
    "l2GenesisBlockBaseFeePerGas": "0x5F5E100",
    "gasPriceOracleOverhead": 2100,
    "gasPriceOracleScalar": 1000000,
    "gasPriceOracleBaseFeeScalar": 1368,
    "gasPriceOracleBlobBaseFeeScalar": 810949,
    "enableGovernance": false,
    "governanceTokenSymbol": "OPBNB",
    "governanceTokenName": "OPBNB",
    "governanceTokenOwner": "0x5E8fe030B465b448a78bA5Ef3c674Da25fDf67f5",
    "eip1559Denominator": 8,
    "eip1559DenominatorCanyon": 8,
     "eip1559Elasticity": 2,
    "l1GenesisBlockTimestamp": "0x68088736",
    "l2GenesisRegolithTimeOffset": "0x0",
    "l2GenesisDeltaTimeOffset": "0x0",
    "l2GenesisCanyonTimeOffset": "0x0",
    "systemConfigStartBlock": 0,
    "requiredProtocolVersion": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "recommendedProtocolVersion": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "faultGameAbsolutePrestate": "0x03c7ae758795765c6664a5d39bf63841c71ff191e9189522bad8ebff5d4eca98",
    "faultGameMaxDepth": 50,
    "faultGameClockExtension": 0,
    "faultGameMaxClockDuration": 1200,
    "faultGameGenesisBlock": 0,
    "faultGameGenesisOutputRoot": "0xDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEF",
    "faultGameSplitDepth": 14,
    "faultGameWithdrawalDelay": 604800,
    "preimageOracleMinProposalSize": 10000,
    "preimageOracleChallengePeriod": 120,
    "proofMaturityDelaySeconds": 12,
    "disputeGameFinalityDelaySeconds": 6,
    "respectedGameType": 254,
    "useFaultProofs": false,
    "usePlasma": false,
    "daCommitmentType": "KeccakCommitment",
    "daChallengeWindow": 160,
    "daResolveWindow": 160,
    "daBondSize": 1000000,
    "daResolverRefundPercentage": 0,
    "fermat": 0,
    "L2GenesisEcotoneTimeOffset": "0x0",
    "l2GenesisFjordTimeOffset": "0x0",
    "snowTimeOffset": "0x0",
    "haberTimeOffset": "0x0",
    "wrightTimeOffset": "0x0"
}

```



## Configuration fields

### Chain Configuration

| **Item**                | **Type**    | **Description**                       | **中文补充描述**           | **Default Value** |
| ----------------------- | ----------- | ------------------------------------- | -------------------------- | ----------------- |
| Chain ID                | number      | Chain id                              | 链id                       |                   |
| Gas limit               | number      | The maximum gas usage of the block    | 区块最大gas使用量          | 100M              |
| Public RPC              | url         | Rpc domain name                       | 公开的Rpc 域名             |                   |
| Internal RPC            | URL         | URL                                   | 内部使用的RPC域名          |                   |
| l2BlockTime             | number      | L2 block time                         | l2 区块时间                | 0.5 second        |
| Withdraw time           | Time period | Withdraw challenge period             | Withdraw的挑战期           | 7 days            |
| Batcher Commit interval | Time period | Batcher interval for submitting data  | Batcher 提交数据的最大间隔 | 1 mins            |
| ProposerCommit interval | Time period | Proposer interval for submitting data | Proposer 提交数据的间隔    | 1 hour            |

### Gas fee Configuration

| **Item**    | **Type** | **Description**                                              | **中文补充描述**                                             | **Default Value** |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ----------------- |
| l1FeeScalar | number   | Gas fee to be Submitted to layer 1, can be configured by Layer 2 operators, which will decide whether layer 2 is profitable | 提交给 Layer 1 的 Gas 费用，可由 Layer 2 运营商配置，这将决定 Layer 2 是否盈利 | 1000000           |

### Governance Configuration

| **Item**                 | **Type**               | **Description**                                              | **中文补充描述**                                             | **Default Value**    |
| ------------------------ | ---------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------- |
| Support Governance Token | bool                   | Whether need to support Governance Token                     | 是否需要支持Governance Token                                 | false                |
| Governance Token Symbol  | String                 | Symbol for the token deployed by default to each OP Stack chain. | 默认部署到每个 OP BNB 链的代币符号。                         |                      |
| Governance Token Name    | Governance Token Owner | L2 Address                                                   | Address that will own the token contract deployed by default to every OP Stack based chain.Multisig address supported | 管理Governance Token |

### Custom Gas Token Configuration

| **Item**         | **Type**   | **Description**                                              | **中文补充描述**                            | **Default Value** |
| ---------------- | ---------- | ------------------------------------------------------------ | ------------------------------------------- | ----------------- |
| Token Name       | String     | Token name                                                   | Token 名称                                  |                   |
| Symbol           | String     | The symbol for the token is deployed by default.             | Token 符号                                  |                   |
| Decimal          | Number     | decimal                                                      | 小数位                                      | 18                |
| Total Supply     | Number     | Total supply                                                 | 总供应量                                    | 100,000,000       |
| Token Owner      | L2 Address | L2 Address that holds all the minted token Multisig address supported | 用于持有发行出来的token可以准备一个多签地址 |                   |
| Token icon image |            |                                                              |                                             |                   |

### Address Configuration

1） System Admin L1 Address multisig wallet address is needed

2) Proposer Challenger L1 Address  Reuse System Admin L1 Address

| Item                  | Type       | Description                                                  | 中文补充描述                                                 | Value        |
| --------------------- | ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------ |
| System Admin          | L1 Address | Address that will own all ownable contracts on L1 once the deployment is finished, including the ProxyAdmin contract. aka finalSystemOwner. | 管理l1的合约                                                 | 使用多签地址 |
| L2 Proxy Admin        | L2 Address | Address that will own the ProxyAdmin contract on L2. The L2 ProxyAdmin contract owns all of the Proxy contracts for every predeployed contract in the range 0x42...0000 to 0x42..2048. This makes predeployed contracts easily upgradeable. aka proxyAdminOwner. | 管理l2的合约可以使用多签地址                                 | 使用多签地址 |
| Base Fee Recipient    | L1 Address | L1 address that the base fees from all transactions on the L2 can be withdrawn to. aka baseFeeVaultRecipient. | Base fee的收款账户                                           |              |
| Tip Fee Recipient     | L1 Address | L1 address that the tip fees from all transactions on the L2 can be withdrawn to. aka sequencerFeeVaultRecipient. | 矿工费收款账户                                               |              |
| L1 Data Fee Recipient | L1 Address | L1 address that the L1 data fees from all transactions on the L2 can be withdrawn to. aka l1FeeVaultRecipient. | 数据由l2提交到l1的收费，这笔收费接受的账户                   |              |
| Proposer Challenger   | L1 Address | Address that is allowed to challenge output proposals submitted to the L2OutputOracle. aka l2OutputOracleChallenger. | 可以删除withdraw index可以使用多签，例如NR占有2/5席位，可以直接操作 |              |
| portalGuardian        | L1 Address | Address that has the ability to pause and unpause withdrawals | 可以停止withdraw *(和**Challenger共用一个地址**)*            |              |
