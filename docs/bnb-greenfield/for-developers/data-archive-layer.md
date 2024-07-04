---
title: Data Archive Layer
description: Learn about the Data Archive Layer on BNB Greenfield.
keywords: [ BNB Greenfield, NodeReal, Data Archive Layer ]
---

# What Is the Data Archive Layer?

Modular blockchains divide the core functions of a classic blockchain into distinct specialized layers. Data
availability layer is the essential component that ensures that transaction data included in each produced block is
accessible to every node in the network.

This layer essentially maintains the integrity and trust of the blockchain, allowing everyone to independently verify
the validity of transactions. The data availability layer guarantees access to newly created data, but it does not
provide access to the entire historical data. For example, EIP4844 and Celestica will discard blob data older than 18
days.

The data archive layer is an extension of the data availability layer, ensuring that all historical block data remains
publicly accessible after being archived.