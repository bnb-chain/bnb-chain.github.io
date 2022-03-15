---
id: genesis
title: Genesis File
---

This document explains how the genesis file of the Beacon Chain  mainnet is structured. It also explains how you can build a genesis file for your own testnet.

Note that you can generate a default genesis file for your own testnet by running the following command:

```
bnbchaind init  --chain-id
```

The genesis file is stored in `~/.bnbchaind/config/genesis.json`.

## What is a Genesis File

A genesis file is a JSON file which defines the initial state of your blockchain. It can be seen as height `0` of your blockchain. The first block, at height `1`, will reference the genesis file as its parent.

The state defined in the genesis file contains all the necessary information, like initial token allocation, genesis time, default parameters, and more. Let us break down these information.

### Genesis Time and Chain_id

The `genesis_time` is defined at the top of the genesis file. It is a `UTC` timestamp which specifies when the blockchain is due to start. At this time, genesis validators are supposed to come online and start participating in the consensus process. The blockchain starts when more than 2/3rd of the genesis validators (weighted by voting power) are online.

```
"genesis_time": "2019-04-18T05:59:26.228734998Z"
```

The `chain_id` is a unique identifier for your chain. It helps differentiate between different chains using the same version of the software.
```
"chain_id": "Binance-Chain-Tigris",
```
## Consensus Parameters

Next, the genesis file defines consensus parameters. Consensus parameters regroup all the parameters that are related to the consensus layer, which is `Tendermint` in the case of `Beacon Chain `. Let us look at these parameters:

- block_size
  - `max_bytes`: Maximum number of bytes per block is 1048576.
  - `max_gas`: Gas limit per block. As gas is not used to calculate transaction fees at the moment. The limit. is set to `-1`.

- evidence
  - `max_age`: An evidence is a proof that a validator signed two different blocks at the same height (and round). This is an explicitly malicious behaviour that is punished at the state-machine level. The `max_age` defines the maximum number of **blocks** after which an evidence is not valid anymore.

- validator
  - `pub_key_types`: Currently only `ed25519` is accepted for validators.

```json
consensus_params: {
	block_size: {
		max_bytes: "1048576",
		max_gas: "-1"
		},
	evidence: {
		max_age: "100000"
	},
	validator: {
		pub_key_types: [
			"ed25519"
			]
		}
},
```

## Application State

The application state defines the initial state of the state-machine.

### Genesis Accounts

In this section, initial allocation of tokens is defined. It is possible to add accounts manually by directly editing the genesis file, but it is also possible to edit the balance after genesis file is created.

This command creates an item in the `accounts` list, under the `app_state` section. In this section, you can see the three different address of all **11** validators.

```json
[
  {
  name: "Aconcagua",
  address: "bnb1y888axmhzz6yjj464syfy68mkhzy9phlv8fzac",
  consensus_addr: ""
  },
  {
  name: "Aconcagua",
  address: "bnb1kdx4xkktr35j2mpxncvtsshswj5gq577me7lx4",
  consensus_addr: "A71E5CD078B8C5C7B1AF88BCE84DD70B0557D93E"
  },
```

Let us break down the list:

- The first address `bnb1y888axmhzz6yjj464syfy68mkhzy9phlv8fzac`. At genesis block, according to `gentx` info, same amount of staking tokens will be allocated to this address. It is also used to receive rewards after chain launched.
- The second address`bnb1kdx4xkktr35j2mpxncvtsshswj5gq577me7lx4`is used for governance
- `consensus_addr`is used for signing new blocks

### Token

The `tokens` module handles tokens. It contains the information of Beacon Chain  native token `BNB`
```
name: "Beacon Chain  Native Token",
symbol: "BNB",
total_supply: "20000000000000000",
owner: "bnb1ultyhpw2p2ktvr68swz56570lgj2rdsadq3ym2",
mintable: false
```

### Staking

The `staking` module handles the bulk of the Proof-of-Stake logic of the state-machine. This section should look like the following:
```
stake: {
pool: {
loose_tokens: "20000000000000000",
bonded_tokens: "0"
},
params: {
unbonding_time: "604800000000000",
max_validators: 21,
bond_denom: "BNB"
},
validators: null,
bonds: null
},
```

Let us break down the parameters:

- pool
  - `not_bonded_tokens`: Defines the amount of tokens not bonded (i.e. delegated) in genesis. Generally, it equals the total supply of the staking token, it's shifted by 8 digits for representing decimals.
  - `bonded_tokens`: Amount of bonded tokens in genesis. Generally `0`.
- params
  - `unbonding_time`: Time in **nanosecond** it takes for tokens to complete unbonding.
  - `max_validators`: Maximum number of active validators.
  - `bond_denom`: Denomination of the staking token.

- `validators`: List of last known validators. Generally `null` in genesis (except if genesis was generated using a previous state).

- `bonds`: List of last known delegation. Generally `null` in genesis (except if genesis was generated using a previous state).




### Governance

The `gov` module handles all governance-related transactions. The initial state of the `gov` section looks like the following:

```
gov: {
  starting_proposalID: "1",
  deposit_params: {
    min_deposit: [
      {
      denom: "BNB",
      amount: "100000000000"
      }
      ],
    max_deposit_period: "172800000000000"
    },
  tally_params: {
  quorum: "50000000",
  threshold: "50000000",
  veto: "33400000"
  }
},
```

Let us break down the parameters:

- `starting_proposal_id`: This parameter defines the ID of the first proposal. Each proposal is identified by a unique ID.
- deposit_params
  - `min_deposit`: The minimum deposit required for the proposal to enter `Voting Period`.
  - `max_deposit_period`: The maximum period (in **nanoseconds**) after which it is not possible to deposit on the proposal anymore.
- tally_params
  - `quorum`: Minimum percentage of bonded staking tokens that needs to vote for the result to be valid.
  - `threshold`: Minimum percentage of votes that need to be `YES` for the result to be valid.
  - `veto`: Maximum percentage `NO_WITH_VETO` votes for the result to be valid.

### Genesis Transactions

A `gentx` is a transaction that bonds staking token present in the genesis file under `accounts` to a validator, essentially creating a validator at genesis. The chain will start as soon as more than 2/3rds of the validators (weighted by voting power) that are the recipient of a valid `gentx` come online after `genesis_time`.

A `gentx` can be added manually to the genesis file

```
{
type: "auth/StdTx",
value: {
msg: [
{
type: "cosmos-sdk/MsgCreateValidatorProposal",
value: {
MsgCreateValidator: {
Description: {
moniker: "Aconcagua",
identity: "",
website: "",
details: ""
},
Commission: {
rate: "0",
max_rate: "0",
max_change_rate: "0"
},
delegator_address: "bnb1y888axmhzz6yjj464syfy68mkhzy9phlv8fzac",
validator_address: "bva1kdx4xkktr35j2mpxncvtsshswj5gq577m9l0c3",
pubkey: {
type: "tendermint/PubKeyEd25519",
value: "Xj/NowvRnUXEtzaI2jXn2h/OfGhZssHyDtUgLSQUTj4="
},
delegation: {
denom: "BNB",
amount: "1000000000000"
}
},
proposal_id: "0"
}
}
],
signatures: [
{
pub_key: {
type: "tendermint/PubKeySecp256k1",
value: "AoeLfC96urAqZtAxg7cCSXh/+tRxGMthLbvXFu/w9nO0"
},
signature: "b0wYwS7fJcpg0TerEoH22T1CqcZMc3NHm0BusK/+LPMPtqHQuOkbIlPUM12r1iXJjKZhPM/ItFveKIo1oFtfUg==",
account_number: "0",
sequence: "0"
},
{
pub_key: {
type: "tendermint/PubKeySecp256k1",
value: "AreZUwAj6OlZI+xHZm66K4Nj5G/eNei768x77fdFz1fc"
},
signature: "GefEmRyOFk5jGpIZnaGNAOubzPn+wedg62mf8m8yV5cWK7+SByBCcCTHQ+7kB+mkMjOR1AIuXC7Xfou5Q/QhgQ==",
account_number: "0",
sequence: "0"
}
],
memo: "",
source: "0",
data: null
}
},
```

A `gentx` is just a signed message that validator signed to agree to be validators. Let us break down the parameters:

- Signature related info
	- `pub_key`: pubkey is used for verifying signature
	- `signature`: the signature from validator
	- `account_number`: Unique identifier for the account. It is generated the first time a transaction including this account is included in a block. In gentx, they are all 0
	- `sequence`: This number is used to count the number of transactions sent by this account. It is incremented each time a transaction is included in a block, and used to prevent replay attacks. Initial value is 0.
	- `memo`, `source` and `data` are all customized details regarding this transaction
- `Delegation info`
	- `moniker`: the name of validator
	- `delegator_address`: this is the address that is listed in `app_state` section
	- `validator_address`: this is the validator pubkey in `bech32` encoding with prefix of `bva`
	- delegation: this is the delegation amount. It's shifted by 8 digits for representing decimals.