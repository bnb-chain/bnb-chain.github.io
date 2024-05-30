# FAQs

### 1. Do builders fetch the in-turn proposer's GasCeil to build block？

   Yes, you could using RPC mev_params to query validator's MEV information
   before building block, it can help to 1) calculate a valid header with gas no
   more than GasCeil; 2) calculate the left bidding time by
   BidSimulationLeftOver; 3) calculate suitable builderFee by
   validatorCommission.


### 2. How does the validator choose the best bid?

   The block reward is calculated as **gasFee**, the validator reward is
   calculated as **gasFee*commissionRate - builderFee**. Every
   time the validator receives a new bid, it will compare its reward with
   the existing best bid. If it has better block reward and validator
   reward, the new bid will go into simulation. If simulation succeeds
   before block sealing, it will be compared with local mined block reward.
   If the bid's block reward and validator reward are both superior to the
   local block, it will be sealed by the validator.


### 3. Who can become the builder?

   Anyone is allowed to become a builder.