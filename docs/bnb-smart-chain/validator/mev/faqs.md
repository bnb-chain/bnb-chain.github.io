---
title: FAQs - BSC MEV
---

# FAQs

### 1. Why is the MEV solution important for the BNB Chain ecosystem?

   BNB Chain's MEV solution leverages Proposer Builder Separation (PBS) 
   architecture to foster a more transparent and fair block space market. 
   Through PBS, users gain the power to select their preferred builder for transaction 
   submission, while MEV rewards are equitably distributed among searchers, validators, builders, and BNB stakers. 
   This approach promotes transparency, fairness, user choice, and network security. 
   By distributing rewards across various roles, BNB Chain encourages wider 
   participation and reduces the risk of centralization, to build a decentralized and inclusive blockchain ecosystem.


### 2. Do builders fetch the in-turn proposer's GasCeil to build block？

   Yes, you could using RPC mev_params to query validator's MEV information
   before building block, it can help to 1) calculate a valid header with gas no
   more than GasCeil; 2) calculate the left bidding time by
   BidSimulationLeftOver; 3) calculate suitable builderFee by
   validatorCommission.


### 3. How does the validator choose the best bid?

   The block reward is calculated as **gasFee**, the validator reward is
   calculated as **gasFee*commissionRate - builderFee**. Every
   time the validator receives a new bid, it will compare its reward with
   the existing best bid. If it has better block reward and validator
   reward, the new bid will go into simulation. If simulation succeeds
   before block sealing, it will be compared with local mined block reward.
   If the bid's block reward and validator reward are both superior to the
   local block, it will be sealed by the validator.


### 4. Who can become the builder?

   BNB Chain is a permission-less ecosystem, anyone who implements the standard 
   builder API could be the BNB Chain builder.

### 5. Where can I find the BNB Chain builders information? 
   You can find the BNB Chain builders through a public 
   [builder info repo](https://github.com/bnb-chain/bsc-mev-info/tree/main/mainnet/builders) 

### 6. How many validators have been integrated with the builders?
   You can find the validators that has implemented the PBS solution from 
   [validator info repo](https://github.com/bnb-chain/bsc-mev-info/tree/main/mainnet/validators)

### 7. Where can I find the BNB Chain MEV statistic dashboard? 
   You can view the MEV statistics 
   from [MEV Stats Dashboard](https://dune.com/bnbchain/bnb-smart-chain-mev-stats)



### 8. Why do I need a privacy-protecting RPC and How can I find the privacy-protecting RPC?

When you make transactions (like swap on DEX) through a private privacy-protecting RPC, your transactions will be sent to the builder`s private mempool. As attackers cannot see your transaction in a public mempool, the risk of being sandwiched will be mitigated. 

Usually, the DEX protocols or builder providers are keen to provide free MEV protection features, such as [Pancake Swap](https://docs.pancakeswap.finance/products/pancakeswap-private-rpc) and [48 Club](https://docs.48.club/privacy-rpc) You can find the details of the privacy-protecting RPCs through their [documentation. ](https://docs.pancakeswap.finance/products/pancakeswap-private-rpc)

| Role                         | Status and Comments                                          |
| ---------------------------- | ------------------------------------------------------------ |
| Free Privacy Protecting RPCs | <ul><li>[Pancake Swap Private RPC](https://docs.pancakeswap.finance/products/pancakeswap-private-rpc)</li> <li>[48 Club Private RPC](https://docs.48.club/privacy-rpc)</li></ul> |

Besides free privacy-protecting RPC, you can also purchase the premium private privacy-protecting RPC from the service providers below. However, these premium service providers may require you to build your own RPC proxy, as they typically do not provide the RPC URL that can be directly configured in your wallet. 

| Role                                                         | Status and Comments                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 5 Builders (Private privacy protecting RPC service providers) | <ul><li>[BloxRoute](https://bloxroute.com/products/protected-transactions/)</li><li>[Blocksmith](https://docs.blocksmith.org/bsc-builder/private-rpc)</li><li>[Nodereal](https://docs.nodereal.io/reference/bsc-bundle-service-api#overview)</li><li>[Blockrazor](https://blockrazor.gitbook.io/blockrazor/mev-service/bsc)</li><li>[Puissant](https://docs.48.club/)</li></ul> |

There are two aspects that may impact the transaction inclusion speed. 

1. Each builder has their own validator registered, **the more validators registered, the faster the transaction inclusion i**s. 
2. The more use from the builder, the faster the transaction is included on the chain. It is because of the increased usage, that the bundle built by the builder is more lucrative for validators and, therefore, faster to be picked up by the validators. 

You can view the latest MEV builder data (MEV_Blocks_by_Builders) from the [Dune dashboard](https://dune.com/bnbchain/bnb-smart-chain-mev-stats), and select the appropriate builders to broadcast transactions. The contacts of each builder are listed above in Table 1. 

You can check the number of validators integrated and the number of blocks of each builder, as mentioned above.

1. The more validators are integrated, the faster the builder can be. 
2. The more blocks that are produced, the faster the builder can be. 

![img](../../img/mev/mev-blocks-by-builders.png)

### 9. How can I increase the speed of the transaction inclusion if my transactions are very speed-sensitive?

To maximize the transaction speed, it is recommended to build a proxy to broadcast the transaction to multiple builders to **increase the transaction inclusion speed**. You need to build your own RPC proxy with multiple builder service providers. 

![img](../../img/mev/proxy.png)

A transaction proxy sample code is built by NodeReal, You can find it in the open-source git repo here https://github.com/node-real/private-tx-sender 
