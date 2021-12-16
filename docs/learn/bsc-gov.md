---
sidebar_label: Governance of BSC
sidebar_position: 2
hide_table_of_contents: false
---

# Governance of BSC

## Motivation

There are many system parameters to control the behavior of the BSC:

- All these parameters of BSC system contracts should be flexible: slashing threshold, cross-chain transfer fees, relayer reward amount and so on.

- params of Staking/Slash/Oracle modules on BC

All these parameters will be determined by BSC Validator Set together through a proposal-vote process based on their staking. Such the process will be carried on BC, and the new parameter values will be picked up by corresponding system contracts via cross-chain communication if needed.

## Design Principles

**For BC:**

- Codebase reuse: Reuse most of the structure of proposal and vote, and the logic about propose and vote.

- Cross chain package Available at once: The cross-chain package should be available once the proposal passed.

- Native params change take place at breath block: The param change of Staking/Slash/Oracle modules on BC take place at breath block after the proposal passed.

**For BSC:**

- Uniform interface. The contracts who are interested in these parameters only need to implement the same interface.

- Extensible. When adding a new system contract, there is no need to modify any other contracts.

- Failure toleration. Validators could vote to skip false proposals and go on.

- Multiplexing. Now we have only parameters gov, but in the future, there will be more governance functions.

## Workflow

![img](../../static/img/gov-workflow.png)

## Contract Interface

Every contract that wants to subscribe param change event, should implement the following interface: **function updateParam(string key, bytes calldata value) external**

Some following check must be done inside the interface:

- The msg sender must be the gov contract.
- Basic check of value. (length, value range)

An example implementation:

```
modifier onlyGov() {
    require(msg.sender == GOV_CONTRACT_ADDR, "the msg sender must be the gov contract");
    _;
}

function updateParam(string key, bytes calldata value) external onlyGov{
    if (key == "relayerReward"){
        require(value.length == 32, "the length of value is not 32 when update relayer_reward param");
        uint256 memory paramValue = TypesToBytes.ToUint256(0, value);
        require(paramValue >= MIN_RELAYER_REWARD, "the relayerReward is smaller than the minimum value");
        require(paramValue <= MAX_RELAYER_REWARD, "the relayerReward is bigger than the maximal value");
        relayerReward = paramValue；
    }else{
        require(false, "receive unknown param");
    }
}
```

## Gov Contract
Implement the cross chain contract interface: **handlePackage(bytes calldata msgBytes, bytes calldata proof, uint64 height, uint64 packageSequence)**

And do following step:
- Basic check. Sequence check, Relayer sender check, block header sync check, merkel proof check.
- Check the msg type according to the first byte of msgBytes, only param change msg type supported for now. Check and parse the msg bytes.
- Use a fixed gas to invoke the  updateParam interface of target contract. Catch any exception and emit fail event if necessary, but let the process go on.
- Claim reward for the relayer and increase sequence.


## Workflow

 Please read this [doc](../learn/bsc-gov-workflow.md) to learn how to send transactions on Binance Chain 