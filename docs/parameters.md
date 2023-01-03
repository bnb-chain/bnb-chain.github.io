---
sidebar_label: BSC Staking Parameters FAQs
hide_table_of_contents: true
sidebar_position: 2
---

# BNB Smart Chain Staking Parameters

### Staking Token

- **BNB**

### Max Validator Count

- **11** validators on Testnet
- **21** validators on Mainnet

### Validator Candidate

#### Mainnet

* **Minimiun Self-delegate Amount**: 10000BNB on Mainnet .
* **Claim reward frequency**: everyday at 0:00 UTC
* **Unbonding Period**: 7 days

#### Testnet

* **Minimiun Self-delegate Amount**: 100BNB on testnet.
* **Claim reward frequency**: every 2 hours
* **Unbonding Period**: 4 hours

### Delegator

#### Mainnet

* **Redelegate frequency**: 7 days

#### Testnet

* **Redelegate frequency**: 4 hours

### Slashing

#### Mainnet

* **Double-Sign Slash**: 10000BNB
    * **_Details_**: Anyone can submit a slashing request on BC with the evidence of Double Sign of BSC, which should contain the 2 block headers with the same height and parent block, sealed by the offending validator.
* **Offline Slash**: 50BNB
    * **_Details_**: If a validator missed more than 50 blocks every 24h, the blocking reward for validator will not be relayed to BC for distribution but shared with other better validators. If it missed more than 150 blocks every 24h, then this will be propagated back to BC where another Slashing will happen
* **Rewards for submitting double-sign evidence**: 1000BNB
* **Double-Sign Jail time**: 2^63-1 seconds
* **Downtime Jail time**: 2 days
* **Too Low self-delegation Jail time**: 1 day

#### Testnet

* **Double-Sign Slash**: 10000BNB
    * **_Details_**: Anyone can submit a slashing request on BC with the evidence of Double Sign of BSC, which should contain the 2 block headers with the same height and parent block, sealed by the offending validator.
* **Offline Slash**: 30BNB
    * **_Details_**: If a validator missed more than 50 blocks every 24h, the blocking reward for validator will not be relayed to BC for distribution but shared with other better validators. If it missed more than 150 blocks every 24h, then this will be propagated back to BC where another Slashing will happen
* **Rewards for submitting double-sign evidence**: 1000BNB
* **Double-Sign Jail time**: 2^63-1 seconds
* **Downtime Jail time**: 4h
* **Too Low self-delegation Jail time**: 4h


