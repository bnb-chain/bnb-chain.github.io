# Slashing

## Slashing
Slashing is part of the on-chain governance, to ensure the malicious or negative behaviors are punished. BSC slash can be submitted by anyone. The transaction submission requires slash evidence and cost fees but also brings a larger reward when it is successful.

So far there are two slashable cases.

### Double Sign

Anyone can submit a slash request on BC with the evidence of Double Sign of BSC

#### Evidence Validation
* Two block headers have same height and same parent block hash
* Two block headers are sealed by the same validator
* Two signatures of these two blocks must not be the same
* The time of these two blocks must be within the validity of the evidence, which is 24 hours

If the evidence is valid:

1. 1000BNB would be slashed from the **self-delegated** BNB of the validator
2. If the self-delegator’s stake amount on the validator is less than 1000BNB, then the unbonding delegation balance would be slashed if it exists until totally 1000BNB slashed from self-delegator of the validator. However, if all the slashed BNB is less than 1000, all the remaining stake of the self-delegator will be slashed
3. 100 of slashed BNB would allocate to the submitter as a reward
4. The rest of slashed BNB will allocate to the custody addresses of which validators would take part in the next distribution. If no matched validators found, then the rest of slashed BNB will allocate to validators on BC as block fee
5. Set the validator ‘jailed’ with duration of 7 days, and remove it from validator set by an instance BSC validator set update Cross-Chain update


### Inavailability

There can be an internal smart contract responsible for recording the missed blocking metrics of each validator.

If a validator missed more than 50 blocks in 24h, the blocking reward for validator will not be relayed to BC for distribution but shared with other better validators. If it missed more than 150 blocks in 24h, then this will be propagated back to BC where another Slashing will happen:

1. 50BNB would be slashed from the  **self-delegated** BNB of the validator
2. If the self-delegator’s stake amount on the validator is less than 50BNB, then the unbonding delegation balance would be slashed if it exists until totally 50BNB slashed from self-delegator of the validator. However, if all the slashed BNB is less than 1000, all the remaining stake of the self-delegator will be slashed
3. 10 of slashed BNB would allocate to the validators on BC as block fee
4. The rest of slashed BNB will allocate to the custody addresses of which validators would take part in the next distribution. If no matched validators found, then the rest of slashed BNB will allocate to validators on BC as block fee
5. Set the validator ‘jailed’ with duration of 2 days, and remove it from validator set by an instance BSC validator set update Cross-Chain update

## Unjail
The malicious validators who are slashed by the previous cases will be set to `jailed` along with a duration setting as well due to the malicious or negative behaviors. We can set it to ‘unjailed’ by sending a side-unjail transaction if the validation passed.

When your validator is `unjailed` on BNB Chain, it must wait for the next UTC 0:00 to join validatorsest again.

### Transaction Validation
* validator address must not be empty
* side chain id exists
* self-delegation of the validator exists and the tokens of it must be greater than the min-self-delegation setting by *10000BNB*
* the validator is in ‘jailed’ now
* already passed the duration set when ‘jailed’ happened


## Fee Table

Transaction Type  | Pay in BNB |
-- | -- |
Unjail A Smart Chain Validator | 1 |
Submit Byzaitine Behavior Evidence of A Smart Chain Validator | 10 |


## Commands

### Download Binary

Please download `tbnbcli` binary from [here](https://github.com/bnb-chain/smart-chain-binary/tree/master/bc/cli)

### Submit BSC evidence

Slashing validators of BSC for the malicious behavior of **double-sign** by submitting evidence consisting of two block headers with same height but signed by one signer

#### Parameters for  slashing bsc-submit-evidence

| **parameter name** | **example**                                                  | **comments**                                                 | **required** |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------ |
| --chan-id          | Binance-Chain-Tigris                                          | the chain id of binance  chain                               | Yes          |
| --from             | bnb19awsmku5ch689lp0rj0c6su7x0n5wxhjm65hdd                   | Name or address of  private key with which to sign           | Yes          |
| --evidence         | [{"difficulty":"0x2","extraData":"0xd98301...},{"difficulty":"0x3","extraData":"0xd64372...}] | Evidence details,  including two bsc block headers with json format | Option       |
| --evidence-file    | /user/evidence.json                                          | File of evidence details,  if evidence-file is not empty, --evidence will be ignored | Option       |

#### Examples
* Mainnet

```bash
bnbcli slashing bsc-submit-evidence --from=bnb19awsmku5ch689lp0rj0c6su7x0n5wxhjm65hdd --evidence=[{"parentHash":"0x6116de25352c93149542e950162c7305f207bbc17b0eb725136b78c80aed79cc","sha3Uncles":"0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347","miner":"0x0000000000000000000000000000000000000000","stateRoot":"0xe7cb9d2fd449f7bd11126bff55266e7b74936f2f230e21d44d75c04b7780dfeb","transactionsRoot":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421","receiptsRoot":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421","logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","difficulty":"0x20000","number":"0x1","gasLimit":"0x47e7c4","gasUsed":"0x0","timestamp":"0x5eb2a363","extraData":"0x0000000000000000000000000000000000000000000000000000000000000000a2852203a9da8bb555ec98a78c66365437bb1dde6707a08032e9eb916a8a454e37a1fffeab272bcffc2fc1d82aee6f3124bbdc8ed884efcbadfb6ff862cf4c3801","mixHash":"0x0000000000000000000000000000000000000000000000000000000000000000","nonce":"0x0000000000000000","hash":"0xd977f1acfd035cf717193a9c3a2351cdccdc2ea0719aff871dade0e8daf8069d"},{"parentHash":"0x6116de25352c93149542e950162c7305f207bbc17b0eb725136b78c80aed79cc","sha3Uncles":"0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347","miner":"0x0000000000000000000000000000000000000000","stateRoot":"0xe7cb9d2fd449f7bd11126bff55266e7b74936f2f230e21d44d75c04b7780dfeb","transactionsRoot":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421","receiptsRoot":"0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421","logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","difficulty":"0x20000","number":"0x1","gasLimit":"0x47e7c4","gasUsed":"0x64","timestamp":"0x5eb2a363","extraData":"0x00000000000000000000000000000000000000000000000000000000000000005eab7a9bf40635d056ccab45ac0d8b4e99be4b4ed859e4246f651b95c0adaacc050760a0afc2d9383f821baab7f995cde07271f286c4805095b413e7ad69d9f401","mixHash":"0x0000000000000000000000000000000000000000000000000000000000000000","nonce":"0x0000000000000000","hash":"0x917c38a507c9807426fc9e3e9e8ded2db07c7f61070bd1c7b57b9df287e8f7b2"}]     --chain-id=test-chain-8d7sJz --home ~/home_cli
```


### Side chain Unjail

#### Parameters for slashing side-unjail

| **parameter name** | **example**                                | **comments**                                                 | **required** |
| ------------------ | ------------------------------------------ | ------------------------------------------------------------ | ------------ |
| --chan-id          | Binance-Chain-XXX                          | the chain id of binance  chain                               | Yes          |
| --from             | bnb19awsmku5ch689lp0rj0c6su7x0n5wxhjm65hdd | This address has to be  the operator address of the validator to be unjailed. Name or address of  private key with which to sign. | Yes          |
| --side-chain-id    | BSC-XXX                                    | chain-id of the side  chain the validator belongs to         | Yes          |



#### For example

* Mainnet

```bash
bnbcli slashing side-unjail --from bnb19awsmku5ch689lp0rj0c6su7x0n5wxhjm65hdd --side-chain-id=bsc --chain-id=test-chain-8d7sJz --home ~/home_cli
```

### Query side chain Signing Info

#### Parameters for slashing side-signing-info

| **parameter name** | **example**       | **comments**                                         | **required** |
| ------------------ | ----------------- | ---------------------------------------------------- | ------------ |
| --chan-id          | Binance-Chain-XXX | the chain id of binance  chain                       | Yes          |
| --side-chain-id    | BSC-XXX           | chain-id of the side  chain the validator belongs to | Yes          |

#### For example

* Mainnet
```bash
bnbcli slashing side-signing-info 0x625448c3f21AB4636bBCef84Baaf8D6cCdE13c3F --side-chain-id=bsc --chain-id=test-chain-8d7sJz --home ~/home_cli
```


###  Query side chain slash history

#### Parameters for slashing side-slash-history [validator-sideConsAddr]

| **parameter name**  | **example**       | **comments**                                         | **required** |
| ------------------- | ----------------- | ---------------------------------------------------- | ------------ |
| --chan-id           | Binance-Chain-XXX | the chain id of binance  chain                       | Yes          |
| --infraction-height | 100               | infraction height                                    | Yes          |
| --infraction-type   | DoubleSign        | infraction type, 'DoubleSign;Downtime'               | Yes          |
| --side-chain-id     | BSC-XXX           | chain-id of the side chain the validator belongs to  | Yes          |

#### For example

* Mainnet
```bash
bnbcli slashing side-slash-history 0x625448c3f21AB4636bBCef84Baaf8D6cCdE13c3F --infraction-height 100 --infraction-type DoubleSign --side-chain-id=bsc --chain-id=test-chain-8d7sJz --home ~/home_cli
```

### Query side chain slash histories

#### Parameters for slashing side-slash-histories

| **parameter name** | **example**       | **comments**                                         | **required** |
| ------------------ | ----------------- | ---------------------------------------------------- | ------------ |
| --chan-id          | Binance-Chain-XXX | the chain id of binance  chain                       | Yes          |
| --infraction-type  | DoubleSign        | infraction type, 'DoubleSign;Downtime'               | Option       |
| --side-chain-id    | BSC-XXX           | chain-id of the side chain the validator belongs to  | Yes          |

#### For example

* Mainnet
```bash
bnbcli slashing side-slash-histories 0x625448c3f21AB4636bBCef84Baaf8D6cCdE13c3F --infraction-type DoubleSign --side-chain-id=bsc --chain-id=test-chain-8d7sJz --home ~/home_cli
```


### Query all side chain slash histories(for internal)

#### Parameters for slashing side-all-slash-histories

| **parameter name** | **example**       | **comments**                                         | **required** |
| ------------------ | ----------------- | ---------------------------------------------------- | ------------ |
| --chan-id          | Binance-Chain-XXX | the chain id of BNB Chain                        | Yes          |
| --side-chain-id    | BSC-XXX           | chain-id of the side chain the validator belongs to  | Yes          |

#### For example

* Mainnet
```bash
bnbcli slashing side-all-slash-histories --side-chain-id=bsc --chain-id=test-chain-8d7sJz --home ~/home_cli
```


