---
sidebar_label: Scenarios for Slashing
hide_table_of_contents: false
sidebar_position: 2
---

# Scenarios for Slashing and Jail

### Double Signing

Double signing refers to an event when the validator node proposes two different blocks at the same block height. The validator will be removed from the validator set, if they try signing two different blocks and broadcasting them. For BSC slash request on double signing, the supporting evidence should indicate two block headers having the same block height and the same parent block hash sealed by the same validator. The time of these two blocks must be within the validity of the evidence, which is 24 hours. Rewards for successful submission of double-sign evidence is 100 BNB. In the event evidence and slash request is valid, the validators will face a slashing of **_10,000 BNB_** from their self-delegated BNB and will be 'jailed' for a time period of 292 years.

### Unavailability/Downtime

The slash fee for a validator being offline is self-delegated **_50 BNB_** along with jail time of 2 days. If a validator missed 150 blocks (157.5 minutes of downtime) within 24 hours. In this case, the validator will lose its reward and be kicked out of the validator set immediately.

### Self‐bond Below Minimum

Validators will be jailed for 1 day if their self‐bond falls below **_10,000 BNB_**.

