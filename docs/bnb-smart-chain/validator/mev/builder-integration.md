---
title: Integration Guide for Builder - BSC MEV
---

# Integration Guide for Builder

The [Builder API Specification](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP322.md)
defines the standard interface that builders should implement, while the
specific implementation is left open to MEV API providers. The BNB Chain
community offers a simple [implementation example](https://github.com/bnb-chain/bsc-builder) for
reference.

## Customize Builder

Although the builder offers great flexibility, there are still some
essential standards that must be followed:

1.  The builder needs to set up a **builder account**, which is used to
     sign the block bid and receive fees. The builder can ask for a tip
     (builder fee) on the block that it sends to the sentry. If the
     block is finally selected, the **builder account** will receive
     the tip.

2.  The builder needs to implement the **mev_reportIssue** API to
     receive the errors report from validators.

3.  In order to prevent transaction leakage, the builder can only send
     block bids to the in-turn validator.

4.  At most 3 block bids are allowed to be sent at the same height from
     the same builder.

Here are some sentry APIs that may interest a builder:

1.  **mev_bestBidGasFee**. It will return the current most profitable
     reward that the validator received among all the blocks received
     from all builders. The reward is calculated as: **gasFee\*(1 -
     commissionRate) - tipToBuilder**. A builder may compare the
     **bestBidGasFee** with a local one and then decide to send the
     block bid or not.

2.  **mev_params.** It will return the
     **BidSimulationLeftOver**,**ValidatorCommission**, **GasCeil** and
     **BidFeeCeil** settings on the validator. If the current time is
     after **(except block time - BidSimulationLeftOver)**, then there
     is no need to send block bids any more; **ValidatorCommission**
     and **BidFeeCeil** helps the builder to build its fee charge
     strategy. The **GasCeil** helps a builder know when to stop adding
     more transactions.

Builders have the freedom to define various aspects like pricing models
for users, creating intuitive APIs, and define the bundle verification
rules.

## Setup with Example Builder

**Step 1: Find Validator Information**

For validators that open MEV integration, the public information is
shown at [bsc-mev-info](https://github.com/bnb-chain/bsc-mev-info).
Builders can also provide information here to the validator.

**Step 2: Set up Builder.**

The builder must sign the bid using an account, such as the etherbase
account specified in the config.toml file.

```toml
[Eth.Miner.Mev]
BuilderEnabled = true # open bid sending
BuilderAccount = "0x..." # builder address which signs bid, usually it is the same as etherbase address
```

Configure the validator node list, including the address of the
validator and the public URL. The public URL refers to the sentry
service.

```toml
[[Eth.Miner.Mev.Validators]]
Address = "0x23707D3D...6455B52B3"
URL = "https://bsc-fuji.io"

[[Eth.Miner.Mev.Validators]]
Address = "0x52825922...3A1A7A422"
URL = "http://bsc-mathwallet.io"
```

**Step 3: Publish information**

It is highly recommended to publish information in [bsc-mev-info](https://github.com/bnb-chain/bsc-mev-info).
