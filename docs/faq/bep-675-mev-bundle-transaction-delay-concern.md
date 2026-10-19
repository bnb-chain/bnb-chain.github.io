---
title: "BEP-675 MEV bundle transaction delay concern - BSC FAQs"
---

### BEP-675 MEV bundle transaction delay concern

### Problem
A BSC block may have unused space while some ordinary transactions remain pending. Can a late, high-value MEV bundle contribute to this under BEP-675?

### Explanation
BEP-675 introduces builder-proposed blocks with validator blind signing. Builders submit an executed BidBlock, including the state root, so validators do not repeat transaction execution before sealing. This gives builders more time to construct blocks.

A late bundle can still create a timing trade-off. If a builder switches to a new candidate block to include it, rebuilding the candidate and calculating its state root may leave less time to pack additional ordinary transactions.

However, a builder seeking to maximize revenue has an incentive to switch only when the new candidate is worth more than the previously built candidate, including the ordinary transactions already packed. Otherwise, it can submit the earlier candidate. A partially filled block therefore does not by itself demonstrate that ordinary transactions will remain delayed across successive blocks.

### Advice
- Check whether the behavior repeats across consecutive blocks and whether ordinary transaction inclusion times increase materially. Transactions deferred from one block may be included in later blocks.
- For a reproducible delay, provide transaction hashes, submission times, block numbers, gas fees, and any available builder or bundle timing evidence to support for investigation.
- Do not infer a network-wide delay or a guaranteed waiting time from a single partially filled block.

### Reference
[BEP-675: Builder-Proposed Block with Validator Blind Signing](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP-675.md)
