---
title: Geth P2P Sync - opBNB Develop
---
# Geth P2P Sync Feature

We're excited to introduce a new feature in this release: The Geth P2P Sync Feature. This feature significantly enhances the speed of block data synchronization by leveraging peer-to-peer syncing among geth nodes, as opposed to the previous method of deriving transactions from L1 for each synchronization.

## Benefits of Geth P2P Sync Feature

The Geth P2P Sync Feature greatly accelerates block data synchronization. Our tests on the testnet have shown impressive results:

*   In `full` mode, the sync time has been reduced from the previous 7 days to approximately 15 hours.
*   In `snap` mode, syncing can be accomplished in about 1 hour.

These improvements can save considerable time and resources, thus improving the overall performance of your operations.

## Configurations for Geth P2P Sync Feature

### New Configurations (op-node)

*   `l2.engine-sync=true`
*   `l2.skip-sync-start-check = true`

The above settings are essential for enabling the Geth P2P Sync Feature. Please ensure that these settings are correctly configured in your op-node.

### Existing Configurations (op-geth)

*   `syncmode=snap/full`
*   `bootnodes=${bootnode_addr}`

You can select either of the two options for the `syncmode`:

1. `full` (Recommended): This mode performs a full sync and executes each block. The sync time has been significantly reduced with the new Geth P2P Sync Feature, taking about 15 hours on the testnet (latest height: 10 million).
2. `snap`: This mode performs a snapshot sync, which does not execute transactions but still maintains data completeness. This mode is recommended when your P2P peer nodes are trustworthy. The sync time is about 1 hour on the testnet.

For the `bootnodes` configuration, you can use the following geth bootnode nodes:

* Testnet
    *   `enr:-KO4QKFOBDW--pF4pFwv3Al_jiLOITj_Y5mr1Ajyy2yxHpFtNcBfkZEkvWUxAKXQjWALZEFxYHooU88JClyzA00e8YeGAYtBOOZig2V0aMfGhE0ZYGqAgmlkgnY0gmlwhDREiqaJc2VjcDI1NmsxoQM8pC_6wwTr5N2Q-yXQ1KGKsgz9i9EPLk8Ata65pUyYG4RzbmFwwIN0Y3CCdl-DdWRwgnZf`
    *   `enr:-KO4QFJc0KR09ye818GT2kyN9y6BAGjhz77sYimxn85jJf2hOrNqg4X0b0EsS-_ssdkzVpavqh6oMX7W5Y81xMRuEayGAYtBSiK9g2V0aMfGhE0ZYGqAgmlkgnY0gmlwhANzx96Jc2VjcDI1NmsxoQPwA1XHfWGd4umIt7j3Fc7hKq_35izIWT_9yiN_tX8lR4RzbmFwwIN0Y3CCdl-DdWRwgnZf`
* Mainnet
    * `enr:-KO4QHs5qh_kPFcjMgqkuN9dbxXT4C5Cjad4SAheaUxveCbJQ3XdeMMDHeHilHyqisyYQAByfdhzyKAdUp2SvyzWeBqGAYvRDf80g2V0aMfGhHFtSjqAgmlkgnY0gmlwhDaykUmJc2VjcDI1NmsxoQJUevTL3hJwj21IT2GC6VaNqVQEsJFPtNtO-ld5QTNCfIRzbmFwwIN0Y3CCdl-DdWRwgnZf`
    * `enr:-KO4QKIByq-YMjs6IL2YCNZEmlo3dKWNOy4B6sdqE3gjOrXeKdNbwZZGK_JzT1epqCFs3mujjg2vO1lrZLzLy4Rl7PyGAYvRA8bEg2V0aMfGhHFtSjqAgmlkgnY0gmlwhDbjSM6Jc2VjcDI1NmsxoQNQhJ5pqCPnTbK92gEc2F98y-u1OgZVAI1Msx-UiHezY4RzbmFwwIN0Y3CCdl-DdWRwgnZf`
  
Ensure the above configurations are correctly set up to fully benefit from the new Geth P2P Sync Feature in this release. We hope you find this feature advantageous. Your feedback is always welcome.
