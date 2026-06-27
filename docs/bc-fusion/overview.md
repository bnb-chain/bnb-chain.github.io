---
title: Overview - BC Fusion
---


# Overview

BNB Beacon Chain is a blockchain developed by the BNB Chain community that implements a vision of a decentralized
exchange (DEX) for digital assets. Besides this, Beacon Chain and BSC is a dual-chain structure: Beacon Chain helps to
enhance the security of BSC as a staking and governance layer. With the rise of various other forms of Dex, order-book
based decentralized exchange was decommissioned
in [BEP151](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP151.md). With the quick evolution of BSC, the Beacon
Chain has become a burden. The cross-chain bridge that connects the two chains slows down the development iteration and
always exposes BNB to a certain level of security vulnerabilities. It's time to take a step further and migrate the
functionality of Beacon Chain to BSC, **allowing Beacon Chain to retire**.

![img](../assets/bcfusion/phases.png)

There will be several pahses to retrie Beacon Chain:

- **First Sunset Fork** - Some types of Beacon chain transactions will be disabled, for example, TimeLockMsg,
  TimeRelockMsg,
  FreezeMsg, IssueMsg, MintMsg, IssueMiniMsg, HTLTMsg, DepositHTLTMsg, MsgCreateValidatorOpen,
  MsgCreateSideChainValidator, MsgCreateSideChainValidatorWithVoteAddr, MsgEditSideChainValidatorWithVoteAddr,
  MsgSideChainDelegate, MsgSideChainReDelegate. 
- **BSC Feynman Hardfork** - Native validators and staking, native goverenance will be enabled on BNB Smart Chain.
  The BSC validators/delegators can start migrations after the Feynman upgrade.
- **Second Sunset Fork** - More Beacon chain transactions will be disabled, for example,MsgSideChainSubmitProposal. All
  TimeLock and AtomicSwap will automatically be refunded to the user's
  wallet. All the BSC delegation will be undelegated automatically. (Estimated time on mainnet: 2024 Jul)
- **Final Sunset Fork** - Cross-chain communication between the Beacon Chain and BSC will be completely stopped. (
  Estimated time on mainnet: 2024 Aug)
- **Post BC Fusion** - Beacon Chain will be dumped and and a merkle tree will be generated for recover the assets, which
  are binded to BSC however not transffered to BSC yet.

All stakholders (e.g., token holders/owners, validators, project owners) should pay attention BNB Chain blog for
releated annonuncements and take actions proactively.

For more information about BNB Chain fusion, please refer
to [BEP-333](https://github.com/bnb-chain/BEPs/pull/333?ref=bnbchain.ghost.io).

For the roadmap and milestons of BNB Chain fusion, please refer
to [the blog](https://www.bnbchain.org/en/blog/bnb-chain-fusion-roadmap).

