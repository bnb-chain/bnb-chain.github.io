---
title: On-chain Governance
order: 7
---
# On-chain Governance

## Abstract

In Greenfield, users can submit proposals for on-chain governance. 
These proposals can include updates to blockchain parameters or cross-chain configurations, 
or execution of some messages (e.g., create storage provider). 
Once a proposal is submitted, it must be accompanied by a deposit that exceeds 
the `Min Deposit` parameter (which is 1 BNB on the mainnet).
If the deposit is not met, the proposal will not be open for voting. 
However, the submitter is not required to provide the deposit in its entirety. 
Other users can contribute to the deposit, and if the total deposit exceeds the Min Deposit parameter, 
the proposal will be open for voting. Then, the proposal will be voted on whether to accept or reject it.

## Quick Start

#### Query a Proposal

With the id of a proposal, you can query the details of id by the following command:

```shell
gnfd query gov proposal ${proposal_id} --node ${node}
```

${proposal_id} specifies the id of the proposal you want to query.

${node} is the rpc address of a Greenfield node.

=== "Mainnet"
    ```shell
    node = "https://greenfield-chain.bnbchain.org:443"
    ```

=== "Testnet"
    ```shell
    node = "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org:443"
    ```


#### Submit a Proposal

To submit a proposal, you can use:

```shell
gnfd tx gov submit-proposal ${proposal_file} --from ${key}  --home ~/.gnfd --node ${node} -y
```

The proposal you want to execute, e.g., a blockchain message, is defined by the content of ${proposal_file}.

Please refer to [submit proposal](#submit-a-proposal) for some examples.

#### Deposit

Once the proposal is submitted, anyone can deposit to it before expiration.

```shell
gnfd tx gov deposit ${proposal_id} ${coins} --from ${key} --node ${node} -y
```

${coins} defines the coins you want to deposit to the proposal, for example `100000BNB`.

#### Vote

To vote a proposal, the following command can be used:

```shell
gnfd tx gov vote ${proposal_id} ${option} --from ${key} --home ~./gnfd --node ${node} -y
```

${option} defines whether you want to vote `yes`, `no`, `no_with_veto`, or `abstain`.


## Detailed CLI

### Query

The CLI `query` commands allow users to query `gov` state.

```sh
gnfd query gov help
```
#### deposit

The `deposit` command allows users to query a deposit for a given proposal from a given depositor.

```sh
$  gnfd query gov deposit [proposal-id] [depositer-addr] [flags]
```

Example:

```bash
gnfd query gov deposit 4 0x50508768BD41e5CD4A82A0fBc38C14d3bEA45A78 
```

Example Output:

```bash
amount:
- amount: "200"
  denom: BNB
depositor: 0x50508768BD41e5CD4A82A0fBc38C14d3bEA45A78
proposal_id: "4"
```

#### deposits

The `deposits` command allows users to query all deposits for a given proposal.

```bash
gnfd query gov deposits [proposal-id] [flags]
```

Example:

```bash
gnfd query gov deposits 4
```

Example Output:

```bash
deposits:
- amount:
  - amount: "200"
    denom: BNB
  depositor: 0x50508768BD41e5CD4A82A0fBc38C14d3bEA45A78
  proposal_id: "4"
pagination:
  next_key: null
  total: "0"
```

#### param

The `param` command allows users to query a given parameter for the `gov` module.

```bash
gnfd query gov param [param-type] [flags]
```

Example:

```bash
gnfd query gov param deposit
```

Example Output:

```bash
max_deposit_period: "300000000000"
min_deposit:
- amount: "1000000000000000000"
  denom: BNB
```

#### params

The `params` command allows users to query all parameters for the `gov` module.

```bash
gnfd query gov params [flags]
```

Example:

```bash
gnfd query gov params
```

Example Output:

```bash
deposit_params:
  max_deposit_period: "300000000000"
  min_deposit:
  - amount: "1000000000000000000"
    denom: BNB
tally_params:
  quorum: "0.334000000000000000"
  threshold: "0.500000000000000000"
  veto_threshold: "0.334000000000000000"
voting_params:
  voting_period: "300000000000"
```

#### proposal

The `proposal` command allows users to query a given proposal.

```bash
gnfd query gov proposal [proposal-id] [flags]
```

Example:

```bash
gnfd query gov proposal 6
```

Example Output:

```bash
deposit_end_time: "2023-02-21T11:30:01.519490Z"
final_tally_result:
  abstain_count: "0"
  no_count: "0"
  no_with_veto_count: "0"
  yes_count: "10000000000000000000000000"
id: "6"
messages:
- '@type': /cosmos.gov.v1.MsgExecLegacyContent
  authority: 0x7b5Fe22B5446f7C62Ea27B8BD71CeF94e03f3dF2
  content:
    '@type': /cosmos.params.v1beta1.ParameterChangeProposal
    changes:
    - key: RelayerTimeout
      subspace: oracle
      value: '"100"'
    description: change
    title: test change params
metadata: ""
status: PROPOSAL_STATUS_PASSED
submit_time: "2023-02-21T11:25:01.519490Z"
total_deposit:
- amount: "1000000000000000200"
  denom: BNB
voting_end_time: "2023-02-21T11:30:36.733936Z"
voting_start_time: "2023-02-21T11:25:36.733936Z"
```

#### proposals

The `proposals` command allows users to query all proposals with optional filters.

```bash
gnfd query gov proposals [flags]
```

Example:

```bash
gnfd query gov proposals
```

Example Output:

```bash
pagination:
  next_key: null
  total: "0"
proposals:
- deposit_end_time: "2023-02-21T10:43:28.710910Z"
  final_tally_result:
    abstain_count: "0"
    no_count: "0"
    no_with_veto_count: "0"
    yes_count: "10000000000000000000000000"
  id: "1"
  messages:
  - '@type': /bnbchain.greenfield.sp.MsgCreateStorageProvider
    approval_address: 0x7aFEf7876FE8bf0b805d8dF9d6bE0dD1CD798E29
    creator: 0x7b5Fe22B5446f7C62Ea27B8BD71CeF94e03f3dF2
    deposit:
      amount: "10000000000000000000000"
      denom: BNB
    description:
      details: ""
      identity: ""
      moniker: sp0
      security_contact: ""
      website: ""
    endpoint: sp0.greenfield.io
    funding_address: 0x0ffF366CccF2FD21445ACe1f19d316951F4144CC
    seal_address: 0x7Bc6Eb822b7B8419037cce5F4Cb50209Dfc7CDbD
    sp_address: 0xba73b99Bfba6B3df6398c7c4C2c916A28c26d100
  metadata: 4pIMOgIGx1vZGU=
  status: PROPOSAL_STATUS_PASSED
  submit_time: "2023-02-21T10:38:28.710910Z"
  total_deposit:
  - amount: "2000000000000000000"
    denom: BNB
  voting_end_time: "2023-02-21T10:43:28.710910Z"
  voting_start_time: "2023-02-21T10:38:28.710910Z"
- deposit_end_time: "2023-02-21T10:43:58.917763Z"
  final_tally_result:
    abstain_count: "0"
    no_count: "0"
    no_with_veto_count: "0"
    yes_count: "10000000000000000000000000"
  id: "2"
  messages:
  - '@type': /bnbchain.greenfield.sp.MsgCreateStorageProvider
    approval_address: 0x3CE5E18B05Fd349801DBa9e98E0aB694E2B8C985
    creator: 0x7b5Fe22B5446f7C62Ea27B8BD71CeF94e03f3dF2
    deposit:
      amount: "10000000000000000000000"
      denom: BNB
    description:
      details: ""
      identity: ""
      moniker: sp1
      security_contact: ""
      website: ""
    endpoint: sp1.greenfield.io
    funding_address: 0xa2D705f57D4c50F5c7694590187A62171a149836
    seal_address: 0x53ADC854036F14E0bb989F4Ba3104d66A95FB7C4
    sp_address: 0x93B6cFf6EdB72Fd15ff32DAbC6cd6F9b17C51bd8
  metadata: 4pIMOgIGx1vZGU=
  status: PROPOSAL_STATUS_PASSED
  submit_time: "2023-02-21T10:38:58.917763Z"
  total_deposit:
  - amount: "2000000000000000000"
    denom: BNB
  voting_end_time: "2023-02-21T10:43:58.917763Z"
  voting_start_time: "2023-02-21T10:38:58.917763Z"
- deposit_end_time: "2023-02-21T10:44:29.103061Z"
  final_tally_result:
    abstain_count: "0"
    no_count: "0"
    no_with_veto_count: "0"
    yes_count: "10000000000000000000000000"
  id: "3"
  messages:
  - '@type': /bnbchain.greenfield.sp.MsgCreateStorageProvider
    approval_address: 0x8AFa83E423fb3C0D1ED30761730b742963897C8c
    creator: 0x7b5Fe22B5446f7C62Ea27B8BD71CeF94e03f3dF2
    deposit:
      amount: "10000000000000000000000"
      denom: BNB
    description:
      details: ""
      identity: ""
      moniker: sp2
      security_contact: ""
      website: ""
    endpoint: sp2.greenfield.io
    funding_address: 0xf54B0622BbA7eE596E688A0a993267583078327f
    seal_address: 0xb6eCa481Cb3C1861aD9f4D65F5a014aAcD0ebbc5
    sp_address: 0xc52E29c12a16f9CC37Ef1728C05b0129187564d2
  metadata: 4pIMOgIGx1vZGU=
  status: PROPOSAL_STATUS_PASSED
  submit_time: "2023-02-21T10:39:29.103061Z"
  total_deposit:
  - amount: "2000000000000000000"
    denom: BNB
  voting_end_time: "2023-02-21T10:44:29.103061Z"
  voting_start_time: "2023-02-21T10:39:29.103061Z"
- deposit_end_time: "2023-02-21T11:30:01.519490Z"
  final_tally_result:
    abstain_count: "0"
    no_count: "0"
    no_with_veto_count: "0"
    yes_count: "10000000000000000000000000"
  id: "6"
  messages:
  - '@type': /cosmos.gov.v1.MsgExecLegacyContent
    authority: 0x7b5Fe22B5446f7C62Ea27B8BD71CeF94e03f3dF2
    content:
      '@type': /cosmos.params.v1beta1.ParameterChangeProposal
      changes:
      - key: RelayerTimeout
        subspace: oracle
        value: '"100"'
      description: change
      title: test change params
  metadata: ""
  status: PROPOSAL_STATUS_PASSED
  submit_time: "2023-02-21T11:25:01.519490Z"
  total_deposit:
  - amount: "1000000000000000200"
    denom: BNB
  voting_end_time: "2023-02-21T11:30:36.733936Z"
  voting_start_time: "2023-02-21T11:25:36.733936Z"
```

#### proposer

The `proposer` command allows users to query the proposer for a given proposal.

```bash
gnfd query gov proposer [proposal-id] [flags]
```

Example:

```bash
gnfd query gov proposer 1
```

Example Output:

```bash
proposal_id: "6"
proposer: 0x50508768BD41e5CD4A82A0fBc38C14d3bEA45A78
```

#### tally

The `tally` command allows users to query the tally of a given proposal vote.

```bash
gnfd query gov tally [proposal-id] [flags]
```

Example:

```bash
gnfd query gov tally 1
```

Example Output:

```bash
abstain_count: "0"
no_count: "0"
no_with_veto_count: "0"
yes_count: "10000000000000000000000000"
```

#### vote

The `vote` command allows users to query a vote for a given proposal.

```bash
gnfd query gov vote [proposal-id] [voter-addr] [flags]
```

Example:

```bash
gnfd query gov vote 7 0x8313D43DdA0958e11Fb8840DC75540d0755859F3
```

Example Output:

```bash
metadata: ""
options:
- option: VOTE_OPTION_YES
  weight: "1.000000000000000000"
proposal_id: "7"
voter: 0x8313D43DdA0958e11Fb8840DC75540d0755859F3
```

#### votes

The `votes` command allows users to query all votes for a given proposal.

```bash
gnfd query gov votes [proposal-id] [flags]
```

Example:

```bash
gnfd query gov votes 7
```

Example Output:

```bash
pagination:
  next_key: null
  total: "0"
votes:
- metadata: ""
  options:
  - option: VOTE_OPTION_YES
    weight: "1.000000000000000000"
  proposal_id: "7"
  voter: 0x8313D43DdA0958e11Fb8840DC75540d0755859F3
```

### Transactions

The `tx` commands allow users to interact with the `gov` module.

```bash
gnfd tx gov --help
```

#### deposit

The `deposit` command allows users to deposit tokens for a given proposal.

```bash
gnfd tx gov deposit [proposal-id] [deposit] [flags]
```

Example:

```bash
gnfd tx gov deposit 1 1000000000000000000BNB --from 0x50508768BD41e5CD4A82A0fBc38C14d3bEA45A78
```

#### draft-proposal

The `draft-proposal` creates a draft for any type of proposal.

```bash
gnfd tx gov draft-proposal
```

#### submit-proposal

The `submit-proposal` submits a governance proposal along with messages and metadata defined in json file

```bash
gnfd tx gov submit-proposal [path-to-proposal-json] [flags]
```

Example:

##### Greenfield module parameter change proposal

```bash
gnfd tx gov submit-proposal /path/to/proposal.json --from 0x2737dca53A25120358f4811c762f71712eF23aFE
```

```json

{
  "messages": [
    {
      "@type": "/cosmos.gov.v1.MsgExecLegacyContent",
      "content": {
        "@type": "/cosmos.params.v1beta1.ParameterChangeProposal",
        "title": "Oracle params change",
        "description": "Change",
        "changes": [
          {
            "subspace": "oracle",
            "key": "RelayerTimeout",
            "value": "\"100\""
          }
        ]
      },
      "authority": "0x7b5Fe22B5446f7C62Ea27B8BD71CeF94e03f3dF2"
    }
  ],
  "metadata": "4pIMOgIGx1vZGU=",
  "deposit": "1000000000000000000BNB"
}
```

##### BSC smart contract parameter change proposal

```json
{
  "messages": [
    {
      "@type": "/cosmos.gov.v1.MsgExecLegacyContent",
      "content": {
        "@type": "/cosmos.params.v1beta1.ParameterChangeProposal",
        "title": "BSC smart contract parameter change",
        "description": "change contract parameter",
        "changes": [
          {
            "subspace": "BSC",
            "key": "batchSizeForOracle",
            "value": "0000000000000000000000000000000000000000000000000000000000000033"
          }
        ],
        "cross_chain": true,
        "addresses": ["0x6c615C766EE6b7e69275b0D070eF50acc93ab880"]
      },
      "authority": "0x7b5Fe22B5446f7C62Ea27B8BD71CeF94e03f3dF2"
    }
  ],
  "metadata": "4pIMOgIGx1vZGU=",
  "deposit": "1000000000000000000BNB"
}
```


##### BSC smart contract upgrade proposal

```json
{
  "messages": [
    {
      "@type": "/cosmos.gov.v1.MsgExecLegacyContent",
      "content": {
        "@type": "/cosmos.params.v1beta1.ParameterChangeProposal",
        "title": "upgrade GovHub and CrossChain",
        "description": "upgrade GovHub and CrossChain",
        "changes": [
          {
            "subspace": "BSC",
            "key": "upgrade",
            "value": "0x8f86403A4DE0BB5791fa46B8e795C547942fE4Cf"
          },
          {
            "subspace": "BSC",
            "key": "upgrade",
            "value": "0x9d4454B023096f34B160D6B654540c56A1F81688"
          }
        ],
        "cross_chain": true,
        "addresses": [
          "0x6c615C766EE6b7e69275b0D070eF50acc93ab880",
          "0x04ED4ad3cDe36FE8ba944E3D6CFC54f7Fe6c3C72"
        ]
      },
      "authority": "0x7b5Fe22B5446f7C62Ea27B8BD71CeF94e03f3dF2"
    }
  ],
  "metadata": "4pIMOgIGx1vZGU=",
  "deposit": "1000000000000000000BNB"
}
```

#### vote

The `vote` command allows users to submit a vote for a given proposal.

```shell
gnfd tx gov vote [command] [flags]
```

Example:

```shell
gnfd tx gov vote 1 yes --from 0x50508768BD41e5CD4A82A0fBc38C14d3bEA45A78
```