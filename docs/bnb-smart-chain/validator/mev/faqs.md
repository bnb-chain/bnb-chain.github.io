# FAQs

### 1. Why is the MEV solution important for the BNBChain ecosystem?

   BNBChain's MEV solution leverages Proposer Builder Separation (PBS) 
   architecture to foster a more transparent and fair block space market. 
   Through PBS, users gain the power to select their preferred builder for transaction 
   submission, while MEV rewards are equitably distributed among searchers, validators, builders, and BNB stakers. 
   This approach promotes transparency, fairness, user choice, and network security. 
   By distributing rewards across various roles, BNBChain encourages wider 
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

   BNBChain is a permission-less ecosystem, anyone who implements the standard 
   builder API could be the BNBChain validator.

### 5. Where can I find the BNBChain builders information? 
   You can find the BNBChain builders through a public [builder info repo](https://github.com/bnb-chain/bsc-mev-info/tree/main/mainnet/builders)
   Besides the addresses and corresponding websites, you can also view the MEV statistics from [MEV Stats Dashboard](https://dune.com/bnbchain/bnb-smart-chain-mev-stats)

### 5. How many validators have been integrated with the builders?
   You can find the validators that has implemented the PBS solution from [validator info repo](https://github.com/bnb-chain/bsc-mev-info/tree/main/mainnet/validators)