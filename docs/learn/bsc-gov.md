---
sidebar_label: Governance of BSC
sidebar_position: 2
hide_table_of_contents: false
---

# Governance of BSC

## Introduction

The BSC network is not only a Proof of Staked Authority blockchain network but also one that utilizes on-chain governance. Ideally, such governance logic should be built into the blockchain and automatically executed as the blocking happens. Cosmos Hub, which shares the same Tendermint consensus and libraries with BNB Beacon Chain, works in this way.
The BNB Beacon Chain has been preparing to enable governance logic since the design days. In order to keep the compatibility and reuse the good foundation of BC, the governance logic of BSC is implemented on BC.

What kind of changes are made via on-chain governance with BSC? Right now, there are many system parameters to control the behavior of the BSC, e.g. slash amount, cross-chain transfer fees. All these parameters will be determined by BSC Validator Set together through a proposal-vote process based on their staking. Such process will be carried on BC, and the new parameter values will be picked up by either the management module on BC or corresponding system contracts via a cross-chain communication. The proposals can be classified into two groups: 1. Param Change Proposal if the parameter takes effect on the BNB Beacon Chain; 2. Cross Param Change Proposal if the parameter takes effect on the BNB Smart Chain.

To understand process-wise how BSC governance works, it’s best to think of these network upgrades in the following stages which are enforced on the protocol level.

## Workflow
### Deposit Stage
Anyone can submit a proposal on the BNB Beacon Chain for others to view. The only cost associated with submitting a proposal is the transaction fee as little as 1 BNB. 
However, over the course of the voting period, a proposal must have at least 2000 BNB deposited to it in order for it to proceed to a vote. 
This period lasts at most 2 weeks, but if the minimum amount of 2000 BNB is reached sooner the proposal will pass to voting immediately. 
Currently, there is no penalty for delegators and validators who do not participate in governance, though there is a risk to individuals who deposit BNB to a proposal if the proposal does not pass the voting stage, 
in such case the deposited BNB will be distributed to the validator set.

### Voting Stage
The next stage in the governance process is the voting stage which lasts a customized period. Rather than depositing BNB, 
validator operators in this governance stage are actually voting Yes, No, or Abstain. 
If a proposal reaches quorum or the minimum threshold defined by the protocol it will pass to the next stage for tallying.

### Tallying & Execution Stage
After voting stage, the following condition will be taken into consideration to determine if it passes or not:

- Quorum: more than 50% of the total staked tokens at the end of the voting period need to have voted
- Threshold: More than 50% or a majority of the tokens that participated in the vote, excluding "Abstain" votes must have voted "Yes"
- Veto: Less than 33.4% of the tokens that participated in the vote, not counting "Abstain" votes, have vetoed the decision "No (With Veto)".

If any of these conditions are not met, the deposit associated with the denied proposal will not be refunded. These funds will be sent to the validator set.

Once a parameter change is voted on and passes all conditions, the upgrade will take effect automatically in the whole network. And this is how you would have seen the BSC evolve to the current version today!


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


##  Parameters that control the behavior of BSC

 There are many system parameters to control the behavior of the BSC:

- All these parameters of BSC system contracts is governable: slashing threshold, cross-chain transfer fees, relayer reward amount and so on.

- params of Staking/Slash/Oracle/IBC modules on BC

All these parameters will be determined by BSC Validator Set together through a proposal-vote process based on their staking. 
Such processes will be carried on BC, and the new parameter values will be picked up by corresponding system contracts via cross-chain communication when needed.

## Fee Table

| Transaction Type                   | Fee         | 
| -------------------------- |-------------|
| Submit Smart Chain Proposal | 1 BNBs      |
| Smart Chain Proposal Deposit        | 0.00025 BNB |
| Smart Chain Proposal Vote           | 0 BNB       |

## Commands

### Query side chain proposals

| **parameter name**  | **example**                                | **comments**                                         | **required** |
| ------------------- | ------------------------------------------ | ---------------------------------------------------- | ------------ |
| --chan-id           | Binance-Chain-XXX                          | the chain id of BNB Beacon Chain                       | Yes          |
| --side-chain-id     | chapel                                     | the id of side chain, default is native chain        | Yes          |
| --status            | passed                                     | filter proposals by proposal status, status: deposit_period/voting_period/passed/rejected | No          |
| --voter             | bnb1h9ymecpakr8p8lhchtah2xxx7x4xq099umclqu | filter by proposals voted on by voted                | No           |


```bash
## mainnet
./bnbcli gov  query-proposals --side-chain-id  bsc  --node http://dataseed2.defibit.io:80 --trust-node --chain-id Binance-Chain-Tigris

## testnet
./tbnbcli gov  query-proposals --side-chain-id  chapel --node http://data-seed-pre-1-s1.binance.org:80 --trust-node --chain-id Binance-Chain-Ganges
```

### Query side chain proposal

| **parameter name** | **example**                                | **comments**                                         | **required** |
| -------------------| ------------------------------------------ | ---------------------------------------------------- | ------------ |
| --chan-id          | Binance-Chain-XXX                          | the chain id of BNB Beacon Chain                       | Yes          |
| --side-chain-id    | chapel                                     | the id of side chain, default is native chain        | Yes          |
| --proposal-id      | 1                                          | proposalID of proposal being queried                 | Yes          |

```bash
## mainnet
./bnbcli gov  query-proposal  --proposal-id  1  --side-chain-id  bsc --node http://dataseed2.defibit.io:80 --trust-node --chain-id Binance-Chain-Tigris

## testnet
./tbnbcli gov  query-proposal  --proposal-id  1  --side-chain-id  chapel --trust-node --node http://data-seed-pre-1-s1.binance.org:80 --chain-id Binance-Chain-Ganges
```

### Query side chain parameters

| **parameter name** | **example**                                | **comments**                                         | **required** |
| -------------------| ------------------------------------------ | ---------------------------------------------------- | ------------ |
| --side-chain-id    | chapel                                     | the id of side chain, default is native chain        | Yes          |

```bash
## mainnet
 ./bnbcli params side-params --side-chain-id bsc  --trust-node --node http://dataseed2.defibit.io:80 

## testnet
 ./tbnbcli params side-params --side-chain-id chapel  --trust-node --node http://data-seed-pre-1-s1.binance.org:80
```

### Submit cross chain param change proposal

| **parameter name** | **example**                                                        | **comments**                                                              | **required** |
|:-------------------|:-------------------------------------------------------------------|:--------------------------------------------------------------------------|:-------------|
| --chan-id          | Binance-Chain-XXX                                                  | the chain id of BNB Beacon Chain                                            | Yes          |
| --side-chain-id    | chapel                                                             | the id of side chain, default is native chain                             | Yes          |
| --deposit          | 200000000000:BNB                                                   | deposit of proposal                                                       | Yes          |
| --from             | alice                                                              | Name or address of private key with which to sign                         | Yes          |
| --key              | felonyThreshold                                                    | the parameter name on the side chain                                      | Yes          |
| --target           | 0x0000000000000000000000000000000000001001                         | the address of the contract on side chain                                 | Yes          |
| --title            | "test csc change"                                                  | title of proposal                                                         | Yes          |
| --value            | 0x000000000000000000000000000000000000000000000000000000000000001b | the specified value of the parameter on side chain, should encoded in hex | Yes          |
| --voting-period    | 604800                                                             | voting period in seconds (default 604800)                                 | No           |

```bash
## mainet
./bnbcli params  submit-cscParam-change-proposal  --key "felonyThreshold" --value "0x000000000000000000000000000000000000000000000000000000000000001b"   --target 0x0000000000000000000000000000000000001001   --deposit 200000000000:BNB     --voting-period 100   --side-chain-id  bsc  --title "test csc change"  --from alice  --trust-node   --chain-id Binance-Chain-Tigris --node http://dataseed2.defibit.io:80 

## testnet
./tbnbcli params  submit-cscParam-change-proposal  --key "felonyThreshold" --value "0x000000000000000000000000000000000000000000000000000000000000001b"   --target 0x0000000000000000000000000000000000001001   --deposit 200000000000:BNB     --voting-period 100   --side-chain-id  chapel  --title "test csc change"  --from alice  --trust-node   --chain-id Binance-Chain-Ganges --node http://data-seed-pre-1-s1.binance.org:80
```

### Submit cross chain channel management proposal

| **parameter name** | **example**                                                        | **comments**                                                              | **required** |
|:-------------------|:-------------------------------------------------------------------|:--------------------------------------------------------------------------|:-------------|
| --chan-id          | Binance-Chain-XXX                                                  | the chain id of BNB Beacon Chain                                            | Yes          |
| --side-chain-id    | chapel                                                             | the id of side chain, default is native chain                             | Yes          |
| --deposit          | 200000000000:BNB                                                   | deposit of proposal                                                       | Yes          |
| --from             | alice                                                              | Name or address of private key with which to sign                         | Yes          |
| --channel-id       | 1                                                                  | the the channel id that want to manage                                    | Yes          |
| --enable           | true                                                               | enable the channel or not (default true)                                  | Yes          |
| --title            | "test csc change"                                                  | title of proposal                                                         | Yes          |
| --voting-period    | 604800                                                             | voting period in seconds (default 604800)                                 | No           |

```bash
## mainnet
./bnbcli side-chain  submit-channel-manage-proposal  --channel-id  2 --enable=true  --deposit 200000000000:BNB     --voting-period 100   --side-chain-id  bsc  --title "test csc change"  --from alice  --trust-node   --chain-id Binance-Chain-Tigris --node http://dataseed2.defibit.io:80 

## testnet
./tbnbcli side-chain  submit-channel-manage-proposal  --channel-id  2 --enable=true  --deposit 200000000000:BNB     --voting-period 100   --side-chain-id  chapel  --title "test csc change"  --from alice  --trust-node   --chain-id Binance-Chain-Ganges --node http://data-seed-pre-1-s1.binance.org:80
```

### Submit side chain module param change proposal

| **parameter name** | **example**                                                        | **comments**                                                              | **required** |
|:-------------------|:-------------------------------------------------------------------|:--------------------------------------------------------------------------|:-------------|
| --chan-id          | Binance-Chain-XXX                                                  | the chain id of BNB Beacon Chain                                            | Yes          |
| --side-chain-id    | chapel                                                             | the id of side chain, default is native chain                             | Yes          |
| --deposit          | 200000000000:BNB                                                   | deposit of proposal                                                       | Yes          |
| --from             | alice                                                              | Name or address of private key with which to sign                         | Yes          |
| --title            | "test csc change"                                                  | title of proposal                                                         | Yes          |
| --sc-param-file    | param.json                                                         | the file of Side Chain params (json format)                               | Yes          |
| --voting-period    | 604800                                                             | voting period in seconds (default 604800)                                 | No           |

```bash
## mainnet
./bnbcli params  submit-sc-change-proposal  --sc-param-file param.json  --deposit 200000000000:BNB  --voting-period 100   --side-chain-id  bsc  --title "test proposal"  --from delegator1  --trust-node  --chain-id Binance-Chain-Tigris --node http://dataseed2.defibit.io:80 

## testnet
./tbnbcli params  submit-sc-change-proposal  --sc-param-file param.json  --deposit 200000000000:BNB  --voting-period 100   --side-chain-id  chapel  --title "test proposal"  --from delegator1  --trust-node  --chain-id Binance-Chain-Ganges --node http://data-seed-pre-1-s1.binance.org:80
```

### Vote for side chain proposal

| **parameter name** | **example**                                | **comments**                                         | **required** |
| -------------------| ------------------------------------------ | ---------------------------------------------------- | ------------ |
| --chan-id          | Binance-Chain-XXX                          | the chain id of BNB Beacon Chain                       | Yes          |
| --side-chain-id    | chapel                                     | the id of side chain, default is native chain        | Yes          |
| --proposal-id      | 1                                          | proposalID of proposal being queried                 | Yes          |
| --option           | Yes                                        | vote option {yes, no, no_with_veto, abstain}         | Yes          |

```bash
## mainnet
 ./bnbcli gov vote --from alice   --side-chain-id  bsc    --proposal-id 1 --option Yes  --chain-id Binance-Chain-Tigris --node http://dataseed2.defibit.io:80 

## testnet
 ./tbnbcli gov vote --from alice   --side-chain-id  chapel    --proposal-id 1 --option Yes  --chain-id Binance-Chain-Ganges --node http://data-seed-pre-1-s1.binance.org:80
```

### Deposit for side chain proposal


| **parameter name** | **example**                                | **comments**                                         | **required** |
| -------------------| ------------------------------------------ | ---------------------------------------------------- | ------------ |
| --chan-id          | Binance-Chain-XXX                          | the chain id of BNB Beacon Chain                       | Yes          |
| --side-chain-id    | chapel                                     | the id of side chain, default is native chain        | Yes          |
| --proposal-id      | 1                                          | proposalID of proposal being queried                 | Yes          |
| --deposit          | Yes                                        | amount of deposit                                    | Yes          |

```bash
## mainnet
 ./bnbcli gov deposit --from alice   --side-chain-id  bsc    --proposal-id 1 --deposit 1000000000:BNB --chain-id Binance-Chain-Tigris --node http://data-seed-pre-1-s1.binance.org:80

## testnet
 ./tbnbcli gov deposit --from alice   --side-chain-id  chapel    --proposal-id 1 --deposit 1000000000:BNB --chain-id Binance-Chain-Ganges --node http://data-seed-pre-1-s1.binance.org:80
```
