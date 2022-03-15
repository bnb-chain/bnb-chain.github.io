# Monitoring and Querying Slashing Events

## Monitoring Slash Contract

As best practice, it is advisable to  keep monitoring the event log of the slash contract on the BSC scanner at 
<https://bscscan.com/address/0x0000000000000000000000000000000000001001#events>. Additionally, you can also check the slash indicator by reading the contract and pay attention to those above 30. Once it exceeds 150, the validator contract will be jailed.

## Query Side Chain Signing Info

### Parameters for Slashing `side-signing-info`

| **parameter name** | **example**       | **comments**                                         | **required** |
| ------------------ | ----------------- | ---------------------------------------------------- | ------------ |
| --chan-id          | Binance-Chain-XXX | the chain id of bnb chain                       | Yes          |
| --side-chain-id    | BSC-XXX           | chain-id of the side  chain the validator belongs to | Yes          |

#### Example

```bash
bnbcli slashing side-signing-info 0x625448c3f21AB4636bBCef84Baaf8D6cCdE13c3F --side-chain-id=bsc --chain-id=test-chain-8d7sJz --home ~/home_cli
```
##  Query Side Chain Slash History

### Parameters for Slashing `side-slash-history [validator-sideConsAddr]`

| **parameter name**  | **example**       | **comments**                                         | **required** |
| ------------------- | ----------------- | ---------------------------------------------------- | ------------ |
| --chan-id           | Binance-Chain-XXX | the chain id of bnb chain                       | Yes          |
| --infraction-height | 100               | infraction height                                    | Yes          |
| --infraction-type   | DoubleSign        | infraction type, 'DoubleSign;Downtime'               | Yes          |
| --side-chain-id     | BSC-XXX           | chain-id of the side chain the validator belongs to  | Yes          |

#### Example

```bash
bnbcli slashing side-slash-history 0x625448c3f21AB4636bBCef84Baaf8D6cCdE13c3F --infraction-height 100 --infraction-type DoubleSign --side-chain-id=bsc --chain-id=test-chain-8d7sJz --home ~/home_cli
```

## Query Side Chain Slash Histories

### Parameters for Slashing `side-slash-histories`

| **parameter name** | **example**       | **comments**                                         | **required** |
| ------------------ | ----------------- | ---------------------------------------------------- | ------------ |
| --chan-id          | Binance-Chain-XXX | the chain id of bnb chain                       | Yes          |
| --infraction-type  | DoubleSign        | infraction type, 'DoubleSign;Downtime'               | Option       |
| --side-chain-id    | BSC-XXX           | chain-id of the side chain the validator belongs to  | Yes          |

#### Example

```bash
bnbcli slashing side-slash-histories 0x625448c3f21AB4636bBCef84Baaf8D6cCdE13c3F --infraction-type DoubleSign --side-chain-id=bsc --chain-id=test-chain-8d7sJz --home ~/home_cli
```

## Query All Side Chain Slash Histories(for internal)

### Parameters for Slashing `side-all-slash-histories`

| **parameter name** | **example**       | **comments**                                         | **required** |
| ------------------ | ----------------- | ---------------------------------------------------- | ------------ |
| --chan-id          | Binance-Chain-XXX | the chain id of bnb chain                        | Yes          |
| --side-chain-id    | BSC-XXX           | chain-id of the side chain the validator belongs to  | Yes          |

#### Example

```bash
bnbcli slashing side-all-slash-histories --side-chain-id=bsc --chain-id=test-chain-8d7sJz --home ~/home_cli
```
