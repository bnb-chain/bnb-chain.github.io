---
title: Block Syncer
---

# Block Syncer

BlockSyncer is a component that synchronizes on-chain data to off-chain data. It provides data support for query functions in Metadata service. Unlike other services, blocksyncer does not provide grpc service. Metadata service relies on its database (BS DB) to provide query services.

## Role

Real-time synchronization of on-chain data to off-chain.
Transform some complex data structures on the chain into entities in a relational database for easy query and filtering.
Compared with on-chain access, it can provide better performance. It also provides enhanced query capabilities, such as collection queries within a certain block range or time range.
