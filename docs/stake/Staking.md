---
sidebar_label: Overview
sidebar_position: 2
hide_table_of_contents: false
---

# Staking

[BNB Smart Chain](https://community.binance.org/topic/2686) is an innovative solution to bring programmability and interoperability to [Beacon Chain](https://www.binance.org). BNB Smart Chain relies on a system of 21 validators with Proof of [Staked Authority (PoSA) consensus](./learn/consensus.md) that can support short block time and lower fees. The most bonded validator candidates of staking will become validators and produce blocks. The double-sign detection and other slashing logic guarantee security, stability, and chain finality.

Ideally, BNB Smart Chain should build such staking and reward logic into the blockchain, and automatically distribute rewards as the blocking happens. [Cosmos Hub](https://hub.cosmos.network/), who also build on top of Tendermint consensus like Beacon Chain, works in this way.

However, as BSC wants to remain compatible with Ethereum as much as possible. On the other side, Beacon Chain already has a staking module and could be extended to support both BC and BSC. In this way, all the staking related operations are recorded in BC. Once there are any changes about BSC's validator set or voting power, the new message will be transferred to BSC through cross-chain communication.

## Staking Economics

1. The staking token is **[BNB](https://www.binance.com/cn/trade/BNB_USDT)**, as it is a native token on both blockchains anyway
2. The staking, i.e. token bond and delegation actions and records for BSC, happens on BC.
3. The BSC validator set is determined by its staking and delegation logic, via a staking module built on BC for BSC, and propagated every day UTC 00:00 from BC to BSC via Cross-Chain communication.
4. The reward distribution happens on BC around every day UTC 00:00 after.

## Ranking Algorithm

Validators are ranked by their power and operator address. The more its delegation tokens, the higher ranking is. If two validators get the same amount of delegated tokens, validator with smaller address bytes has higher ranking.

## Reward Distrubution

Since BSC uses PoSA as its consensus engine, all the delegators of validators can receive some share of the validators’ reward. However, the rewards(fees) are collected on BSC while the staking info is stored on BC. So, the main idea is we transfer all the rewards from BSC to BC once every day and execute the distribution on BC.

### Main Workflow:
1. ValidatorSet is updated in BreatheBlock, the frequency is once a day. let’s assume it happens on day N.
2. The info of validator set changes of day N would be transmitted to BSCthrough interchain communication.
3. The validator set contract on BSC would receive and update the new validatorset. After that, it would trigger several interchain transfer to transfer the fees that every **previous validators** collected in this period to their addresses on BC. we can see that fees belongs to the validators of day N-1.
4. To make some room for the error handling, we distribute the fees of day N-1 in the next breathe block (day N+1).

### Details

1. even if validator set or any their voting powers are not changed on that day, we still transmit the validator set info to BSC.
2. the validator set contract maintains the history of the fees that every validators collected after the previous period(We define the **period** as the time between two contract calls of validator set changes). The actual fees are collected on the contract address.
3. the interchain transfer to send fees from the contract address to each validator’s distribution address on BC. Note the distribution address is **auto generated** on BC when handling the create-validator tx, so no private key is corresponded to that address and no one except the distribution module can move the tokens on that address. This address is displayed as **Distribution Addr** in validator info.
```bash
Validator
Fee Address: tbnb15mgzha93ny878kuvjl0pnqmjygwccdadpw5dxf
Operator Address: bva15mgzha93ny878kuvjl0pnqmjygwccdad08uecu
Validator Consensus Pubkey:
Jailed: false
Status: Bonded
Tokens: 5000000000000
Delegator Shares: 5000000000000
Description: {Elbrus "" www.binance.org This is Elbrus org on chapel network.}
Bond Height: 74158
Unbonding Height: 0
Minimum Unbonding Time: 1970-01-01 00:00:00 +0000 UTC
Commission: {rate: 75000000, maxRate: 90000000, maxChangeRate: 3000000, updateTime: 2020-05-22 12:24:19.478568234 +0000 UTC}
Distribution Addr: tbnb1srkkfjk8qctvvy4s3cllhpnkz9679jphr30t2c
Side Chain Id: chapel
Consensus Addr on Side Chain: 0xF474Cf03ccEfF28aBc65C9cbaE594F725c80e12d
Fee Addr on Side Chain: 0xe61a183325A18a173319dD8E19c8d069459E2175
```

4. we have a lower limit of the value of interchain transfer, at least the value can cover the transfer fee. Also, interchain transfer will only allow max 8 decimals for the amount. The tiny left part would be kept in the contract or put into the system reward pool.
5. the reward: (totalfees \* (1-commissionRate)) would be distributed in proportion to the delegations, the left part would be sent to the validator fee address.

### Error handling:

1. if the cross-chain transfer failed, the tokens would be sent back to a specified address(i.e. the  `SideFeeAddr` in the store section, validators can change this address via the EditValidator tx). After that, validators can manually deposit the tokens to its own `DistributionAddr` on BC via Transfer tx. We do not force the validator to do so, but it’s an indicator that can help delegators choose validators.

## Fee Table

Transaction Type  | Pay in BNB |
-- | -- |
Create A New Smart Chain Validator | 10 |
Edit Smart Chain Validator Information| 1 |
Delegate Smart Chain Validator | 0.001 |
Redelegate Smart Chain Validator | 0.003 |
Undelegate Smart Chain Validator | 0.002 |

