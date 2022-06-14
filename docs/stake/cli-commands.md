
# CLI Commands

In order to run the CLI commands related to staking and delegation, it important to first download the `bnbcli` and   `tbnbcli` binaries.
### Download Binaries
### For Mainnet
Please download `bnbcli` binary from [here](https://github.com/bnb-chain/node-binary/tree/master/cli/prod)

### For Testnet
Please download `tbnbcli` binary from [here](https://github.com/bnb-chain/node-binary/tree/master/cli/testnet)

## Create BSC Validator

### Parameters for `bsc-create-validator`

| **Parameter Name**          | **Example**                        | **Explanation**                                                  | **Required** |
| ---------------------------- | ------------------------------------ | ------------------------------------------------------------ | ------------ |
| --chan-id                    | Binance-Chain-XXX                    | the chain id of binance  chain                               | Yes          |
| --from                       | bnb1xxx/tbnb1xxx                     | address of private key  with which to sign this tx, also be used as the validator operator address | Yes          |
| --address-delegator          | bnb1xxx/tbnb1xxx                     | optional, bech32 address  of the self-delegator. if not provided, --from address will be used as  self-delegator. | No           |
| --amount                     | 2000000000000:BNB  (means 20000 BNB) | self-delegation amount,  it has 8 decimal places             | Yes          |
| --moniker                    | myval1                               | validator name                                               | Yes          |
| --identity                   | xxx                                  | optional identity  signature (ex. UPort or Keybase)          | No           |
| --website                    | www.example.com                      | optional website                                             | No           |
| --details                    | some details                         | optional details                                             | No           |
| --commission-rate            | 80000000(that means 0.8  or 80%)     | The initial commission  rate percentage, it has 8 decimal places. | Yes          |
| --commission-max-rate        | 95000000  (0.95 or 95%)              | The maximum commission  rate percentage, it has 8 decimal places. You can not update this rate.| Yes          |
| --commission-max-change-rate | 3000000   (0.03 or 3%)               | The maximum commission  change rate percentage (per day). You can not update this rate.     | Yes          |
| --side-chain-id              | chapel                               | chain-id of the side  chain the validator belongs to         | Yes          |
| --side-cons-addr             | 0x1234abcd                           | consensus address of the  validator on side chain, please use hex format prefixed with 0x | Yes          |
| --side-fee-addr              | 0xabcd1234                           | address that validator  collects fee rewards on side chain, please use hex format prefixed with 0x. | Yes          |
| --home                       | /path/to/cli_home                    | home directory of bnbcli  data and config, default to “~/.bnbcli” | No           |

Some address parameters we need to highlight here:

| Field Name | Usage |
| ------------- | ------------------------------------------------------------ |
| DelegatorAddr | Self  delegator address. For BC, this address also used to collect fees. |
| ValidatorAddr | validator  operator’s address, used in governance ops like voting. |
| SideConsAddr  | block  producer’s address on side chain, i.e. consensus address. BC has another  parameter named `PubKey`, here SideConsAddr replaced that for BSC.  Only  BSC validators need this parameter. |
| SideFeeAddr   | fees  are collected in this address on BSC,   Only  BSC validators need this parameter. Due to different token units, there are some BNB left as dust when sending block rewards from BNB Smart Chain to Beacon Chain. Those BNB will be sent to fee address.|


### Examples Showing Usage of `bsc-create-validator`

#### If you want to create a validator with the same operator address and self-delegator address, you only need one signature for this transaction.

```bash
## mainnet
bnbcli staking bsc-create-validator --chain-id Binance-Chain-Tigris --from bnb1tfh30c67mkzfz06as2hk0756mgdx8mgypu7ajl --amount 1000000000000:BNB --moniker bsc_v1 --identity "xxx" --website "[www.example.](http://www.binance.org)com" --details "bsc validator node 1" --commission-rate 80000000 --commission-max-rate 95000000 --commission-max-change-rate 3000000 --side-chain-id bsc --side-cons-addr 0x9B24Ee0BfBf708b541fB65b6087D6e991a0D11A8 --side-fee-addr 0x5885d2A27Bd4c6D111B83Bc3fC359eD951E8E6F8 --home ~/home_cli

## testnet
tbnbcli staking bsc-create-validator --chain-id Binance-Chain-Ganges --from tbnb1tfh30c67mkzfz06as2hk0756mgdx8mgypu7ajl --amount 2000000000000:BNB --moniker bsc_v1 --identity "xxx" --website "[www.example.](http://www.binance.org)com" --details "bsc validator node 1" --commission-rate 80000000 --commission-max-rate 95000000 --commission-max-change-rate 3000000 --side-chain-id chapel --side-cons-addr 0x9B24Ee0BfBf708b541fB65b6087D6e991a0D11A8 --side-fee-addr 0x5885d2A27Bd4c6D111B83Bc3fC359eD951E8E6F8 --home ~/home_cli
```

#### If you want a separated self-delegator address, both `self-delegator` and `validator operator` need to sign this transaction.
Here we need to use another two commands to support multiple signatures.

a. Use the following commands appended with a parameter ``**--generate-only**`` and save the result to a json file which would be used to be signed.

```bash
## mainnet
bnbcli staking bsc-create-validator --chain-id Binance-Chain-Tigris --from {validator-operator-address}  --address-delegator {delegator-address} --amount 5000000000000:BNB --moniker bsc_v1 --identity "xxx" --website "www.example.com" --details "bsc validator node 1" --commission-rate 80000000 --commission-max-rate 95000000 --commission-max-change-rate 3000000 --side-chain-id bsc --side-cons-addr 0x9B24Ee0BfBf708b541fB65b6087D6e991a0D11A8 --side-fee-addr 0x5885d2A27Bd4c6D111B83Bc3fC359eD951E8E6F8 --home ~/home_cli --generate-only > unsigned.json

## testnet
tbnbcli staking bsc-create-validator --chain-id Binance-Chain-Ganges --from {validator-operator-address}  --address-delegator {delegator-address} --amount 5000000000000:BNB --moniker bsc_v1 --identity "xxx" --website "www.example.com" --details "bsc validator node 1" --commission-rate 80000000 --commission-max-rate 95000000 --commission-max-change-rate 3000000 --side-chain-id chapel --side-cons-addr 0x9B24Ee0BfBf708b541fB65b6087D6e991a0D11A8 --side-fee-addr 0x5885d2A27Bd4c6D111B83Bc3fC359eD951E8E6F8 --home ~/home_cli --generate-only > unsigned.json
```

b. both validator operator(--from) and self-delegator(--address-delegator) use ``**bnbcli sign**`` command to sign the file from a).

**Delegator** address need to sign `unsigned.json` first

* Online Mode

```bash
## mainnet
./bnbcli sign unsigned.json --from {delegator-address} --node dataseed4.binance.org:80 --chain-id Binance-Chain-Tigris >> delegator-signed.json

## testnet
./tbnbcli sign unsigned.json --from {delegator-address} --node data-seed-pre-0-s3.binance.org:80 --chain-id Binance-Chain-Ganges >> delegator-signed.json
```

* Offline Mode

```bash
## mainnet
./bnbcli sign unsigned.json --account-number <delegator-account-number> --sequence <address-sequence> --chain-id Binance-Chain-Tigris --offline --name {delegator-address} >> delegator-signed.json

## testnet
./tbnbcli sign unsigned.json --account-number <delegator-account-number> --sequence <address-sequence> --chain-id Binance-Chain-Ganges --offline --name {delegator-address} >> delegator-signed.json
```

Then, **validator** operator addres will sign it later.

* Online Mode

```bash
## mainnet
./bnbcli sign delegator-signed.json --from {validator-address} --node dataseed4.binance.org:80 --chain-id Binance-Chain-Tigris >> both-signed.json

## testnet
./tbnbcli sign delegator-signed.json --from {validator-address} --node data-seed-pre-0-s3.binance.org:80 --chain-id Binance-Chain-Ganges >> both-signed.json
```

* Offline Mode

```bash
## mainnet
./bnbcli sign delegator-signed.json --account-number <validator-account-number> --sequence <address-sequence> --chain-id Binance-Chain-Tigris --offline --name {validator-address} >> both-signed.json

## testnet
./tbnbcli sign delegator-signed.json --account-number <validator-account-number> --sequence <address-sequence> --chain-id Binance-Chain-Ganges --offline --name {validator-address} >> both-signed.json
```

c. Use ``**bnbcli broadcast**`` to send the transaction from above to the blockchain nodes.

```bash
## mainnet
./bnbcli broadcast both-signed.json  --node dataseed4.binance.org:80 --chain-id Binance-Chain-Tigris

## testnet
./tbnbcli broadcast both-signed.json  --node data-seed-pre-0-s3.binance.org:80 --chain-id Binance-Chain-Ganges
```

Verify your transaction in [mainnet-explorer](https://explorer.binance.org/) or [testnet-explorer](https://testnet-explorer.binance.org/)

## Edit BSC Validator

### Parameters for `bsc-edit-validator`

| **Parameter Name**| **Example**                     | **Explanation**                                                 | **Required** |
| ------------------ | -------------------------------- | ------------------------------------------------------------ | ------------ |
| --chan-id          | Binance-Chain-XXX                | the chain id of binance  chain                               | Yes          |
| --from             | bnb1xxx/tbnb1xxx                 | address of private key  with which to sign this tx, that also indicate the validator that you want to  edit. | Yes          |
| --side-chain-id    | chapel                           | chain-id of the side  chain the validator belongs to         | Yes          |
| --moniker          | myval1                           | validator name (default  "[do-not-modify]")                  | No           |
| --identity         | xxx                              | optional identity  signature (ex. UPort or Keybase) (default "[do-not-modify]") | No           |
| --website          | www.example.com                  | optional website (default  "[do-not-modify]")                | No           |
| --details          | some details                     | optional details (default  "[do-not-modify]")                | No           |
| --commission-rate  | 80000000(that means 0.8  or 80%) | The new commission rate  percentage                          | No           |
| --side-fee-addr    | 0xabcd1234                       | address that validator  collects fee rewards on side chain, please use hex format prefixed with 0x. | No           |


### Examples

```bash
## mainnet
bnbcli staking bsc-edit-validator --chain-id Binance-Chain-Tigris --side-chain-id bsc --moniker bsc_v1_new --from bnb1tfh30c67mkzfz06as2hk0756mgdx8mgypu7ajl --home ~/home_cli

##testnet
bash tbnbcli staking bsc-edit-validator --chain-id Binance-Chain-Ganges --side-chain-id chapel --moniker bsc_v1_new --from bnb1tfh30c67mkzfz06as2hk0756mgdx8mgypu7ajl --home ~/home_cli
```

## Delegate BNB

### Parameters for `staking bsc-delegate`

| **Parameter Name**| **Example**             | **Explanation**                                                 | **Required** |
| ------------------ | ------------------------ | ------------------------------------------------------------ | ------------ |
| --chan-id          | Binance-Chain-XXX        | the chain id of binance  chain                               | Yes          |
| --from             | bnb1xxx/tbnb1xxx         | address of private key  with which to sign this tx, that is also the delegator address | Yes          |
| --side-chain-id    | chapel                   | chain-id of the side  chain the validator belongs to         | Yes          |
| --validator        | bva1xxx                  | bech32 address of the  validator, starts with “bva”          | Yes          |
| --amount           | 1000000000:BNB  (10 BNB) | delegation amount, it has  8 decimal places                  | Yes          |


### Example

```bash
## mainnet
bnbcli staking bsc-delegate --chain-id Binance-Chain-Tigris --side-chain-id bsc --from bnb1tfh30c67mkzfz06as2hk0756mgdx8mgypu7ajl --validator bva1tfh30c67mkzfz06as2hk0756mgdx8mgypqldvm --amount 1000000000:BNB --home ~/home_cli

## testnet
tbnbcli staking bsc-delegate --chain-id Binance-Chain-Ganges --side-chain-id chapel --from tbnb1tfh30c67mkzfz06as2hk0756mgdx8mgypu7ajl --validator bva1tfh30c67mkzfz06as2hk0756mgdx8mgypqldvm --amount 1000000000:BNB --home ~/home_cli
```


## Redelegate BNB

### Parameters for `staking bsc-redelegate`

| **Parameter Name**     | **Example**             | **Explanation**                                                 | **Required** |
| ----------------------- | ------------------------ | ------------------------------------------------------------ | ------------ |
| --chan-id               | Binance-Chain-XXX        | the chain id of binance  chain                               | Yes          |
| --from                  | bnb1xxx/tbnb1xxx         | address of private key  with which to sign this tx, that is also the delegator address | Yes          |
| --side-chain-id         | chapel                   | chain-id of the side  chain the validator belongs to         | Yes          |
| --addr-validator-source | bva1xxx                  | bech32 address of the  source validator, starts with “bva”   | Yes          |
| --addr-validator-dest   | bva1yyy                  | bech32 address of the  destination validator, starts with “bva” | Yes          |
| --amount                | 1000000000:BNB  (10 BNB) | delegation amount, it has  8 decimal places                  | Yes          |

###s Example

```bash
## mainnet
bnbcli staking bsc-redelegate --chain-id Binance-Chain-Tigris --side-chain-id bsc --from bnb1tfh30c67mkzfz06as2hk0756mgdx8mgypu7ajl --addr-validator-source bva1tfh30c67mkzfz06as2hk0756mgdx8mgypqldvm --addr-validator-dest bva1jam9wn8drs97mskmwg7jwm09kuy5yjumvvx6r2 --amount1000000000:BNB --home ~/home_cli


### testnet

tbnbcli staking bsc-redelegate --chain-id Binance-Chain-Ganges --side-chain-id chapel --from tbnb1tfh30c67mkzfz06as2hk0756mgdx8mgypu7ajl --addr-validator-source bva1tfh30c67mkzfz06as2hk0756mgdx8mgypqldvm --addr-validator-dest bva1jam9wn8drs97mskmwg7jwm09kuy5yjumvvx6r2 --amount1000000000:BNB --home ~/home_cli
```


## Undelegate BNB

### Parameters for `staking bsc-unbond`

| **Parameter Name**| **Example**             | **Explanation**                                                 | **Required** |
| ------------------ | ------------------------ | ------------------------------------------------------------ | ------------ |
| --chan-id          | Binance-Chain-XXX        | the chain id of binance  chain                               | Yes          |
| --from             | bnb1xxx/tbnb1xxx         | address of private key  with which to sign this tx, that is also the delegator address | Yes          |
| --side-chain-id    | chapel                   | chain-id of the side  chain the validator belongs to         | Yes          |
| --validator        | bva1xxx                  | bech32 address of the  validator, starts with “bva”          | Yes          |
| --amount           | 1000000000:BNB  (10 BNB) | delegation amount, it has  8 decimal places                  | Yes          |

### Example

* Mainnet

```bash
bnbcli staking bsc-unbond --chain-id Binance-Chain-Ganges --side-chain-id chapel --from bnb1tfh30c67mkzfz06as2hk0756mgdx8mgypu7ajl --validator bva1tfh30c67mkzfz06as2hk0756mgdx8mgypqldvm --amount 1000000000:BNB --home ~/home_cli
```


## Query side chain vaildator by operator

### Parameters for `staking side-validator`

| **Parameter Name**| **Example**      | **Explanation**                                        | **required** |
| ------------------ | ----------------- | ---------------------------------------------------- | ------------ |
| --chan-id          | Binance-Chain-XXX | the chain id of binance  chain                       | Yes          |
| --side-chain-id    | chapel            | chain-id of the side  chain the validator belongs to | Yes          |

### Example

* Mainnet

```bash
bnbcli staking side-validator bva1hz5sg3u0v4gq2veyw5355z7qx6y7uuqhcuzf3f  --side-chain-id bsc --chain-id=Binance-Chain-Tigris --home ~/home_cli
```

## Query side chain delegation by delegator and operator

### Parameters for staking side-delegation

| **Parameter Name**| **Example**      | **Explanation**                                        | **required** |
| ------------------ | ----------------- | ---------------------------------------------------- | ------------ |
| --chan-id          | Binance-Chain-XXX | the chain id of binance  chain                       | Yes          |
| --side-chain-id    | chapel            | chain-id of the side  chain the validator belongs to | Yes          |

### Example

* Mainnet

```bash
bnbcli staking side-delegation bnb1hz5sg3u0v4gq2veyw5355z7qx6y7uuqhcqre0d bva1hz5sg3u0v4gq2veyw5355z7qx6y7uuqhcuzf3f --chain-id=Binance-Chain-Tigris --side-chain-id bsc --home ~/home_cli
```


## Query side chain delegations by delegator

### Parameters for staking side-delegations

| **Parameter Name**| **Example**      | **Explanation**                                        | **required** |
| ------------------ | ----------------- | ---------------------------------------------------- | ------------ |
| --chan-id          | Binance-Chain-XXX | the chain id of binance  chain                       | Yes          |
| --side-chain-id    | chapel            | chain-id of the side  chain the validator belongs to | Yes          |

### Example

* Mainnet

```bash
bnbcli staking side-delegations bnb1hz5sg3u0v4gq2veyw5355z7qx6y7uuqhcqre0d --side-chain-id bsc --node=0.0.0.0:26657 --chain-id=Binance-Chain-Tigris --trust-node
```

##  Query side chain unbonding delegation

### Parameters for `staking side-unbonding-delegation`

```bash
bnbcli staking side-unbonding-delegation [delegator-addr] [operator-addr] [flags]
```

| **parameter  name** | **Example**      | **Explanation**                                       | **required** |
| ------------------- | ----------------- | --------------------------------------------------- | ------------ |
| --chan-id           | Binance-Chain-XXX | the chain id of Beacon Chain                       | Yes          |
| --side-chain-id     | bsc/chapel            | chain-id of the side chain the validator belongs to | Yes          |

### Example

```bash
bnbcli staking  side-unbonding-delegation bnb1rtzy6szuyzcj4amfn6uarvne8a5epxrdklwhhj bva12hlquylu78cjylk5zshxpdj6hf3t0tahqmr98n --side-chain-id=bsc --chain-id=Binance-Chain-Tigris --home ~/home_cli
```


### Query side chain unbonding delegations by delegator

#### Parameters for staking side-unbonding-delegations

**Usage:**

```bash
bnbcli staking side-unbonding-delegations [delegator-addr] [flags]
```

| **parameter  name** | **Example**      | **Explanation**                                       | **required** |
| ------------------- | ----------------- | --------------------------------------------------- | ------------ |
| --chan-id           | Binance-Chain-XXX | the chain id of Beacon Chain                       | Yes          |
| --side-chain-id     | chapel            | chain-id of the side chain the validator belongs to | Yes          |

### Example

```bash
bnbcli staking  side-unbonding-delegations bnb1rtzy6szuyzcj4amfn6uarvne8a5epxrdklwhhj --side-chain-id=bsc --chain-id=Binance-Chain-Tigris --home ~/home_cli
```


##  Query side chain unbonding delegations by validator

### Parameters for `staking side-val-unbonding-delegations`

**Usage:**
```bash
bnbcli staking side-val-unbonding-delegation [operator-addr] [flags]
```

| **parameter  name** | **Example**      | **Explanation**                                       | **required** |
| ------------------- | ----------------- | --------------------------------------------------- | ------------ |
| --chan-id           | Binance-Chain-XXX | the chain id of Beacon Chain                       | Yes          |
| --side-chain-id     | bsc/chapel            | chain-id of the side chain the validator belongs to | Yes          |

### Example
```bash
bnbcli staking side-val-unbonding-delegations bva12hlquylu78cjylk5zshxpdj6hf3t0tahqmr98n --side-chain-id=bsc --chain-id=Binance-Chain-Tigris --home ~/home_cli
```

## Query side chain re-delegation

### Parameters for `staking side-redelegation`

**Usage:**

```bash
bnbcli staking side-redelegation [delegator-addr] [src-operator-addr] [dst-operator-addr] [flags]
```

| **parameter  name** | **Example**      | **Explanation**                                       | **required** |
| ------------------- | ----------------- | --------------------------------------------------- | ------------ |
| --chan-id           | Binance-Chain-XXX | the chain id of Beacon Chain                       | Yes          |
| --side-chain-id     | bsc/chapel            | chain-id of the side chain the validator belongs to | Yes          |

### Example

```bash
bnbcli staking  side-redelegation bnb1rtzy6szuyzcj4amfn6uarvne8a5epxrdklwhhj bva12hlquylu78cjylk5zshxpdj6hf3t0tahqmr98n  bva1hz5sg3u0v4gq2veyw5355z7qx6y7uuqhcuzf3f --side-chain-id=bsc --chain-id=Binance-Chain-Tigris --home ~/home_cli
```

### Query side chain re-delegations by delegator

#### Parameters for `staking side-redelegations`

**Usage:**

```bash
bnbcli staking side-redelegations [delegator-addr] [flags]
```

| **parameter  name** | **Example**      | **Explanation**                                       | **required** |
| ------------------- | ----------------- | --------------------------------------------------- | ------------ |
| --chan-id           | Binance-Chain-XXX | the chain id of Beacon Chain                       | Yes          |
| --side-chain-id     | bsc/chapel            | chain-id of the side chain the validator belongs to | Yes          |

### Example

```bash
bnbcli staking side-redelegations bnb1rtzy6szuyzcj4amfn6uarvne8a5epxrdklwhhj --side-chain-id=bsc --chain-id=Binance-Chain-Tigris --home ~/home_cli
```

## Query side chain re-delegations by validator

### Parameters for staking side-val-redelegations

**Usage:**
```bash
bnbcli staking side-val-redelegations [operator-addr] [flags]
```
| **parameter  name** | **Example**      | **Explanation**                                       | **required** |
| ------------------- | ----------------- | --------------------------------------------------- | ------------ |
| --chan-id           | Binance-Chain-XXX | the chain id of Beacon Chain                       | Yes          |
| --side-chain-id     | bsc/chapel            | chain-id of the side chain the validator belongs to | Yes          |

### Example

```bash
bnbcli staking side-val-redelegations bva12hlquylu78cjylk5zshxpdj6hf3t0tahqmr98n --side-chain-id=bsc --chain-id=Binance-Chain-Tigris --home ~/home_cli
```


## Query side chain staking pool

### Parameters for `staking side-pool`

| **parameter  name** | **Example**      | **Explanation**                                       | **required** |
| ------------------- | ----------------- | --------------------------------------------------- | ------------ |
| --chan-id           | Binance-Chain-XXX | the chain id of Beacon Chain                       | Yes          |
| --side-chain-id     | bsc/chapel            | chain-id of the side chain the validator belongs to | Yes          |


### Example

```bash
bnbcli staking     side-pool --side-chain-id=bsc --chain-id=Binance-Chain-Tigris --home     ~/home_cli
```


##  Query side chain top validators

### Parameters for  staking side-top-validators

| **parameter  name** | **Example**      | **Explanation**                                                | **required** |
| ------------------- | ----------------- | ------------------------------------------------------------ | ------------ |
| --chan-id           | Binance-Chain-XXX | the chain id of Beacon Chain                                | Yes          |
| --side-chain-id     | chapel            | chain-id of the side chain the validator belongs to          | Yes          |
| --top               | 10                | number of validators to be returned. set as maximum number of  validators  by default | Option       |

### Example

```bash
bnbcli staking side-top-validators --top 10 --side-chain-id=bsc --chain-id=Binance-Chain-Tigris --home ~/home_cli
```

## Query side chain validators count

### Parameters for staking side-validators-count

| **Parameter Name**| **Example**     | **Explanation**                                                 | **Required** |
| ------------------- | ----------------- | ------------------------------------------------------------ | ------------ |
| --chan-id           | Binance-Chain-XXX | the chain id of Beacon Chain                                | Yes          |
| --side-chain-id     | chapel            | chain-id of the side chain the validator belongs to          | Yes          |
| --jail-involved     | true              | if true, meaning that the jailed validators will be involved to count | Option       |

### Example

```bash
bnbcli staking  side-validators-count --jail-involved --side-chain-id=bsc --chain-id=Binance-Chain-Tigris --home ~/home_cli
```