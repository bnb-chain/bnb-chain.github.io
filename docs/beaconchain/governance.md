# Governance

## Introduction

Beacon Chain has its own built-in module that lets BNB holders submit proposals for governance.
There are several kinds of proposals can be submitted to Beacon Chain for different purposes: 1) text proposals for signaling, 2) fee paramter change proposals, 3) list and delist proposals (which are no longer supported), and 4) [side chain proposals](https://docs.bnbchain.org/docs/learn/bsc-gov/#introduction).

In order for the proposal to be open for voting, it needs to come with a deposit that is greater than a parameter called `Deposit`. The deposit does not need to be provided entirety by the submitter.
If the initial proposer's deposit is not sufficient, the proposal enters the deposit period. Then, any BNB holder can increase the deposit by sending a deposit transaction.
The deposits are hold by [governance escrow account](https://docs.bnbchain.org/docs/beaconchain/learn/escrow-accounts#governance-module) during voting period, and will be refunded or burned later.
After deposit period, votes will be casted to decide whether to accept or reject the proposal.

## Parameters

### Global Parameters
* `min-deposit`: The threshold for submitting a proposal is **2000BNB**.
* `deposit_period`: This is a global parameter and the value for mainnet is two days and testnet is two week. It means the time to deposit enough BNB tokens is two days in mainnet and two weeks in testnet.
* `fee`: Checkout the fee of governance-related transactions [here](trading-spec.md)

### Proposal Parameters
* `deposit`: your input must be larger than `min-deposit`.
* `voting-period`: This is the time for validators to vote, your input in seconds, if you omit this field, the default voting period is one week.
* `expire-time`: This is the time for you to send list transaction if your proposal passed. This time cannot be earlier than current time.

## Workflow

Please refer to [this](https://docs.bnbchain.org/docs/learn/bsc-gov/#workflow) for the workflow of proposals.

## Fee Table

| Transaction Type | Fee          | 
|------------------|--------------|
| Submit Proposal  | 1 BNBs       |
| Proposal Deposit | 0.000125 BNB |
| Proposal Vote    | 0 BNB        |


## Commands

### Query proposals

| **parameter name** | **example**                                | **comments**                                                                              | **required** |
|--------------------|--------------------------------------------|-------------------------------------------------------------------------------------------|--------------|
| --chan-id          | Binance-Chain-XXX                          | the chain id of beacon chain                                                              | Yes          |
| --status           | passed                                     | filter proposals by proposal status, status: deposit_period/voting_period/passed/rejected | No           |
| --voter            | bnb1h9ymecpakr8p8lhchtah2xxx7x4xq099umclqu | filter by proposals voted on by voted                                                     | No           |


```bash
## mainnet
./bnbcli gov query-proposals --node http://dataseed2.defibit.io:80 --trust-node --chain-id Binance-Chain-Tigris

## testnet
./tbnbcli gov query-proposals --node http://data-seed-pre-1-s1.binance.org:80 --trust-node --chain-id Binance-Chain-Ganges
```

### Query proposal

| **parameter name** | **example**       | **comments**                         | **required** |
|--------------------|-------------------|--------------------------------------|--------------|
| --chan-id          | Binance-Chain-XXX | the chain id of beacon chain         | Yes          |
| --proposal-id      | 1                 | proposalID of proposal being queried | Yes          |

```bash
## mainnet
./bnbcli gov query-proposal --proposal-id 1 --node http://dataseed2.defibit.io:80 --trust-node --chain-id Binance-Chain-Tigris

## testnet
./tbnbcli gov query-proposal --proposal-id 1 --trust-node --node http://data-seed-pre-1-s1.binance.org:80 --chain-id Binance-Chain-Ganges
```

**Note:** Trying to query proposal that didn't enter the voting period will result in `error`.

```bash
$ ./bnbcli gov query-proposal --chain-id Binance-Chain-Tigris --node https://dataseed5.defibit.io:443 --proposal-id 2500
{
  "codespace": 5,
  "code": 1,
  "abci_code": 327681,
  "message": "Unknown proposal with id 2500"
}
```

### Query fee parameters

| **parameter name** | **example**       | **comments**                 | **required** |
|--------------------|-------------------|------------------------------|--------------|
| --chan-id          | Binance-Chain-XXX | the chain id of beacon chain | No           |

```bash
## mainnet
 ./bnbcli params show-fees --trust-node --node http://dataseed2.defibit.io:80 

## testnet
 ./tbnbcli params show-fees --trust-node --node http://data-seed-pre-1-s1.binance.org:80
```

### Submit a list proposal

Note: this kind of proposal is not supported on mainnet and testnnet now.


| **parameter name**   | **example**       | **comments**                                      | **required** |
|:---------------------|:------------------|:--------------------------------------------------|:-------------|
| --chan-id            | Binance-Chain-XXX | the chain id of beacon chain                      | Yes          |
| --deposit            | 200000000000:BNB  | deposit of proposal                               | Yes          |
| --from               | alice             | Name or address of private key with which to sign | Yes          |
| --title              | "list"            | title of proposal                                 | Yes          |
| --voting-period      | 604800            | voting period in seconds (default 604800)         | No           |
| --init-price         | 100000000         | init price, boosted by **1e8** for decimal part   | Yes          |
| --quote-asset-symbol | BNB               | the quote asset symbol                            | Yes          |
| --base-asset-symbol  | AAA-254           | the asset symbol you want to list                 | Yes          |

```shell
## mainnet
./bnbcli gov submit-list-proposal --from test --deposit 100000000000:BNB
--base-asset-symbol AAA-254 --quote-asset-symbol BNB --init-price 100000000 --title "list AAA-254/BNB"
--description "list AAA-254/BNB" --expire-time 1570665600 --chain-id Binance-Chain-Tigris --node https://dataseed5.defibit.io:443 --voting-period 604800 --json

## testnet
./tbnbcli gov submit-list-proposal --from test --deposit 200000000000:BNB
--base-asset-symbol AAA-254 --quote-asset-symbol BNB --init-price 100000000 --title "list AAA-254/BNB"
--description "list AAA-254/BNB" --expire-time 1570665600 --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80 --json --voting-period 604800
```

### Submit a delist proposal

Note: this kind of proposal is not supported on mainnet and testnnet now.


| **parameter name**   | **example**       | **comments**                                      | **required** |
|:---------------------|:------------------|:--------------------------------------------------|:-------------|
| --chan-id            | Binance-Chain-XXX | the chain id of beacon chain                      | Yes          |
| --deposit            | 200000000000:BNB  | deposit of proposal                               | Yes          |
| --from               | alice             | Name or address of private key with which to sign | Yes          |
| --title              | "list"            | title of proposal                                 | Yes          |
| --voting-period      | 604800            | voting period in seconds (default 604800)         | No           |
| --justification      | "no longer valid" | reason for proposal                               | Yes          |
| --quote-asset-symbol | BNB               | the quote asset symbol                            | Yes          |
| --base-asset-symbol  | AAA-254           | the asset symbol you want to list                 | Yes          |


```shell
# mainnet
./bnbcli gov submit-delist-proposal --title "delist EDD-0AC" --voting-period 7200 --deposit "200000000000:BNB" --justification " justification " --base-asset-symbol EDD-0AC --quote-asset-symbol BNB --from <your-key-name> --chain-id Binance-Chain-Tigris --node https://dataseed5.defibit.io:443 --trust-node

# testnet
./tbnbcli gov submit-delist-proposal --title "delist EDD-0AC" --voting-period 7200 --deposit "200000000000:BNB" --justification " justification " --base-asset-symbol EDD-0AC --quote-asset-symbol BNB --from <your-key-name> --chain-id Binance-Chain-Ganges --trust-node --node https://seed-pre-s3.binance.org:443
```

### Submit fee param change proposal

| **parameter name** | **example**           | **comments**                                      | **required** |
|:-------------------|:----------------------|:--------------------------------------------------|:-------------|
| --chan-id          | Binance-Chain-XXX     | the chain id of beacon chain                      | Yes          |
| --deposit          | 200000000000:BNB      | deposit of proposal                               | Yes          |
| --from             | alice                 | Name or address of private key with which to sign | Yes          |
| --title            | "test csc change"     | title of proposal                                 | Yes          |
| --fee-param-file   | param.json            | the file of fee params (json format)              | Yes          |
| --voting-period    | 604800                | voting period in seconds (default 604800)         | No           |

```bash
## mainnet
./bnbcli params  submit-fee-change-proposal --fee-param-file param.json --deposit 200000000000:BNB  --voting-period 100 --title "test proposal"  --from delegator1  --trust-node  --chain-id Binance-Chain-Tigris --node http://dataseed2.defibit.io:80 

## testnet
./tbnbcli params  submit-fee-change-proposal --fee-param-file param.json --deposit 200000000000:BNB  --voting-period 100 --title "test proposal"  --from delegator1  --trust-node  --chain-id Binance-Chain-Ganges --node http://data-seed-pre-1-s1.binance.org:80
```

### Vote for proposal

| **parameter name** | **example**       | **comments**                                 | **required** |
|--------------------|-------------------|----------------------------------------------|--------------|
| --chan-id          | Binance-Chain-XXX | the chain id of beacon chain                 | Yes          |
| --proposal-id      | 1                 | proposalID of proposal being queried         | Yes          |
| --option           | Yes               | vote option {yes, no, no_with_veto, abstain} | Yes          |

```bash
## mainnet
 ./bnbcli gov vote --from alice --proposal-id 1 --option Yes  --chain-id Binance-Chain-Tigris --node http://dataseed2.defibit.io:80 

## testnet
 ./tbnbcli gov vote --from alice --proposal-id 1 --option Yes  --chain-id Binance-Chain-Ganges --node http://data-seed-pre-1-s1.binance.org:80
```

### Deposit for proposal


| **parameter name** | **example**       | **comments**                         | **required** |
|--------------------|-------------------|--------------------------------------|--------------|
| --chan-id          | Binance-Chain-XXX | the chain id of beacon chain         | Yes          |
| --proposal-id      | 1                 | proposalID of proposal being queried | Yes          |
| --deposit          | Yes               | amount of deposit                    | Yes          |

```bash
## mainnet
 ./bnbcli gov deposit --from alice --proposal-id 1 --deposit 1000000000:BNB --chain-id Binance-Chain-Tigris --node http://data-seed-pre-1-s1.binance.org:80

## testnet
 ./tbnbcli gov deposit --from alice --proposal-id 1 --deposit 1000000000:BNB --chain-id Binance-Chain-Ganges --node http://data-seed-pre-1-s1.binance.org:80
```

### Query votes of proposal


| **parameter name** | **example**       | **comments**                         | **required** |
|--------------------|-------------------|--------------------------------------|--------------|
| --chan-id          | Binance-Chain-XXX | the chain id of beacon chain         | Yes          |
| --proposal-id      | 1                 | proposalID of proposal being queried | Yes          |

```bash
## mainnet
 ./bnbcli gov query-votes --proposal-id 1 --chain-id Binance-Chain-Tigris --node https://dataseed5.defibit.io:443

## testnet
 ./tbnbcli gov query-votes --proposal-id 1 --chain-id=Binance-Chain-Ganges --node=data-seed-pre-2-s1.binance.org:80
```