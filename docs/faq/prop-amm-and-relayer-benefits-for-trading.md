---
title: "Prop AMM and Relayer Benefits for Trading - BSC FAQs"
---

### Prop AMM and Relayer Benefits for Trading

### Question
What are the benefits of connecting Proprietary Automated Market Makers (Prop AMMs) to a relayer for trading?

### Answer
Connecting Prop AMMs to a relayer provides significant advantages for market makers and traders, particularly in high-frequency or meme token trading environments:

*   **Gas Savings on Off-Chain Quotes**: Quotes remain off-chain until a swap is executed. This means market makers do not incur gas costs for quotes that are not matched or filled, drastically reducing overhead.
*   **Optimized Block Ordering**: The setup allows for ordering updates and quotes before the swap is finalized in the block, providing better execution control and protection against certain MEV strategies.

This architecture is designed to improve efficiency and reduce the cost of liquidity provision on the BNB Smart Chain.
