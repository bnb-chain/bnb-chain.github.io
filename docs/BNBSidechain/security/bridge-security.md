---
sidebar_label: Bridge Security
---
# Bridge Security 

cBridge introduces the best-in-class cross-chain token bridging experience for BNB Sidechain. cBridge for bridging assets from BNB Sidechain to BSC and vice-versa can be accessed [here](https://test-bas-bridge.celer.network/#/transfer) 

Time and again several news headlines have resurfaced about the compromise and hacking of different cross-chain bridges resulting in a loss of million of dollars. The development teams at BNB Chain and Celer understand the importance for our community, users, and developers to have a clear understanding of the security models of the Celer Inter-chain Message Framework (Celer IM). 

Different from existing interoperability solutions, Celer has two different security models, an [optimistic-rollup](https://cbridge-docs.celer.network/introduction/cbridge-security#optimistic-rollup-style-security-model) inspired model and an L1-PoS-blockchain security model. Each of these comes with different delay and security assumptions tradeoffs that developers and users can freely choose from or set. The security model is highly flexible and even for a single application, developers can choose to build a hybrid model based on the “value” or “significance” of every cross-chain message.

Celer cBridge, an asset bridge built on top of Celer IM, supports a [hybrid model](https://cbridge-docs.celer.network/introduction/cbridge-security#hybrid-model-is-available) so that the various tradeoffs can be dynamically chosen by the connecting chain based on the cross-chain transfer amount, token and source/destination chain. 

:::info
For more details on the security of the Celer cBridge, refer to [Celer's official documentation](https://cbridge-docs.celer.network/introduction/cbridge-security).
:::
