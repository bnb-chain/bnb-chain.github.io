API Server
========

API server daemon

> Before starting `api-server`, please make sure that you have created an address locally. Otherwise, your will see the following error:

```
panic: stat /Users/user/.bnbcli/keys/keys.db: no such file or directory

goroutine 1 [running]:
github.com/binance-chain/node/plugins/api.newServer(0xc000c12230, 0xc0000a96d0, 0x4e3e600, 0xc0001a0ec0, 0x4e10180, 0xc000010010, 0x0, 0x7ffeefbff802, 0x27, 0x0, ...)
/Users/b/Documents/go/src/github.com/binance-chain/node/plugins/api/server.go:39 +0x28b
github.com/binance-chain/node/plugins/api.ServeCommand.func1(0xc000c27d40, 0xc000c12690, 0x0, 0x7, 0x0, 0x0)
/Users/b/Documents/go/src/github.com/binance-chain/node/plugins/api/cli.go:34 +0x1b3
github.com/binance-chain/node/vendor/github.com/spf13/cobra.(*Command).execute(0xc000c27d40, 0xc000c12620, 0x7, 0x7, 0xc000c27d40, 0xc000c12620)
/Users/b/Documents/go/src/github.com/binance-chain/node/vendor/github.com/spf13/cobra/command.go:698 +0x431
github.com/binance-chain/node/vendor/github.com/spf13/cobra.(*Command).ExecuteC(0x55f9fc0, 0x48110ef, 0x55f9fc0, 0x4b81beb)
/Users/b/Documents/go/src/github.com/binance-chain/node/vendor/github.com/spf13/cobra/command.go:783 +0x29f
github.com/binance-chain/node/vendor/github.com/spf13/cobra.(*Command).Execute(...)
```

Start the API server according to the Platform.

Replace the `platform` variable with `mac`, `windows` or `linux` in the following command:

```bash
./{{platform}}/bnbcli api-server --chain-id "{chain-id}" --node tcp://{full node addr}:80 --laddr localhost:8080
```

### Example for Mainnet:

```bash
./bnbcli api-server --chain-id "Binance-Chain-Tigris" --node tcp://dataseed1.binance.org:80 --laddr tcp://127.0.0.1:8080 --trust-node
```

### Example for Testnet:

```bash
./tbnbcli api-server --chain-id "Binance-Chain-Ganges" --node tcp://data-seed-pre-0-s1.binance.org:80 --laddr tcp://127.0.0.1:8080 --trust-node
```

### /version
---
##### ***GET***
**Summary:** Get the blockchain version.

**Description:** Get the blockchain version of the fullnode you connect with.

**Example**

```
http://localhost:8080/version
```

### /api/v1/account/{address}
---
##### ***GET***
**Summary:** Get an account.

**Description:** Gets account metadata for an address.

**Example for mainnet**
```
http://localhost:8080/api/v1/account/bnb1g9rzc0e2jf8ef3qp9ax8h0pmpmvjzwmtwqmzfj
```

**Example for testnet:**
```
http://localhost:8080/api/v1/account/tbnb1ke87gxdtsk32kuaqxj6skhhmn79ma89cx2ep4g
```

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| address | path | The account address to query | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [Account](#account) |
| 500 | Bad Request | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |


### /api/v1/tokens
---
##### ***GET***
**Summary:** Get tokens list.

**Description:** Gets a list of tokens that have been issued.

**Example for mainnet**
```
http://localhost:8080/api/v1/tokens
```

**Example for testnet:**

```
http://localhost:8080/api/v1/tokens
```

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| limit | query | default 100; max 1000. | No | integer |
| offset | query | start with 0; default 0. | No | integer |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [ [Token](#token) ] |
| 500 | Bad Request | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |

### /api/v1/tokens/{symbol}
---
##### ***GET***
**Summary:** Get information for a token.

**Description:** Get information for a token.

**Example for mainnet**
```
http://localhost:8080/api/v1/tokens/SPNDB-916
```

**Example for testnet:**

```
http://localhost:8080/api/v1/tokens/TEST-599
```


**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [ [Token](#token) ] |
| 500 | Bad Request | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |

### /api/v1/balance/{address}
---
##### ***GET***
**Summary:** Get account balance for an address.

**Description:** Get account balance for an address.

**Example for mainnet**
```
http://localhost:8080/api/v1/balances/bnb1qwugqccfrefqyg9kgm0st8szjf8mmgkmvyt76lv9
```

**Example for testnet:**

```
http://localhost:8080/api/v1/balances/tbnb1g9rzc0e2jf8ef3qp9ax8h0pmpmvjzwmtq4jxfr
```


**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success |  [Balance](#balances) |
| 500 | Bad Request | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |

### /api/v1/balance/{address}/{symbol}
---
##### ***GET***
**Summary:** Get balance for one token from an address.

**Description:** Get balance for one token from an address.

**Example for mainnet**
```
http://localhost:8080/api/v1/balances/bnb1qwugqccfrefqyg9kgm0st8szjf8mmgkmvyt76lv9/BNB
```

**Example for testnet:**

```
http://localhost:8080/api/v1/balances/tbnb1g9rzc0e2jf8ef3qp9ax8h0pmpmvjzwmtq4jxfr/BNB
```


**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success |  [Balance](#balances) |
| 500 | Bad Request | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |


### /api/v1/fees
---
##### ***GET***
**Summary:** Obtain trading fees information.

**Description:** Gets the current trading fees settings.

**Example for mainnet**
```
http://localhost:8080/api/v1/fees
```

**Example for testnet:**

```
http://localhost:8080/api/v1/fees
```

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [ [Fee](#fee) ] |
| default | Generic error response | [Error](#error) |


### /api/v1/validators
---
##### ***GET***
**Summary:** Get validators.

**Description:** Gets the list of validators used in consensus.

**Example for mainnet**
```
http://localhost:8080/api/v1/stake/validators
```

**Example for testnet:**

```
http://localhost:8080/api/v1/stake/validators
```

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [ [Validators](#validators) ] |
| 400 | Bad Request | [Error](#error) |
| 404 | Not Found |  |
| default | Generic error response | [Error](#error) |


### /api/v1/timelock/timelocks/{address}
---
##### ***GET***
**Summary:** Get all the timelock records of an address.

**Description:** Gets the list of the timelock records of an address.

**Example for mainnet**
```
http://localhost:8080/api/v1/timelock/timelocks/bnb1ycuzfx8cxpqmleu7z64uys9wx5ntcujre2knpc
```

**Example for testnet:**

```
http://localhost:8080/api/v1/timelock/timelocks/tbnb1g9rzc0e2jf8ef3qp9ax7h0pmpmvjzwmtq4jxfr
```

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [TimelockList](#TimelockList)  |
| default | Generic error response | [Error](#error) |

### /api/v1/timelock/timelock/{address}/{id}
---
##### ***GET***
**Summary:** Get a timelock record of an address.

**Description:** Gets a timelock record of an address.

**Example for mainnet**
```
http://localhost:8080/api/v1/timelock/timelock/bnb1ycuzfx8cxpqmleu7z54uys9wx5ntcujre2knpc/1
```

**Example for testnet:**

```
http://localhost:8080/api/v1/timelock/timelock/tbnb1g9rzc0e2jf7ef3qp9ax8h0pmpmvjzwmtq4jxfr/1
```

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Success | [Timelock](#Timelock)  |
| default | Generic error response | [Error](#error) |


### Account

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| account_number | integer |  |  |
| address | string (address) |  |  |
| balances | [ [Balance](#balance) ] |  |  |
| public_key | [ integer ] | Public key bytes |  |
| sequence | long | sequence is for preventing replay attack |  |


### Balances

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| address | string (address) |  |  |
| balances | [ [Balance](#balance) ] |  |  |


### Balance

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| symbol | string (currency) | asset symbol | BNB |
| free | string (fixed8) | In decimal form, e.g. 0.00000000 | 0.00000000 |
| locked | string (fixed8) | In decimal form, e.g. 0.00000000 | 0.00000000 |
| frozen | string (fixed8) | In decimal form, e.g. 0.00000000 | 0.00000000 |


### Token

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| name | string | token name | Binance Chain Native Token |
| symbol | string | unique token trade symbol | BTC-000 |
| original_symbol | string | token symbol | BTC |
| total_supply | string (fixed8) | total token supply in decimal form, e.g. 1.00000000 | 0.00000000 |
| owner | string (address) | Address which issue the token |  |

### Fee

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| msg_type | string | Transaction msg type that this fee applies to | submit_proposal |
| fee | number | The fee amount | 1000000000 |
| fee_for | integer | 1 = proposer, 2 = all, 3 = free | 1 |
| multi_transfer_fee | string | Fee for multi-transfer | 200000 |
| lower_limit_as_multi | string | e.g. 2 | 2 |
| fixed_fee_params | [FixedFeeParams](#fixedfeeparams) | Set if the fee is fixed |  |
| dex_fee_fields | [DexFeeFieldParams](#dexfeefieldparams) | dex fee |  |

### FixedFeeParams

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| msg_type | string | Transaction msg type that this fee applies to | submit_proposal |
| fee | number | The fixed fee amount | 1000000000 |
| fee_for | integer | 1 = proposer, 2 = all, 3 = free | 1 |

### DexFeeFieldParams

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| fee_name | string | fee name |  |
| fee_value | integer | fee value |  |


### Error

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| code | long | error code | 400 |
| message | string | error message |  |

### TimelockList

| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| Timelocks | [ [Timelock](#timelock) ] | list of timelock records |  |

#### Timelock
| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| ID | integer |  |  |
| description | string |  |  |
| amount | [Coin](#coin) |  |  |
| locktime | timestamp |  |  |


#### Coin
| Name | Type | Description | Example |
| ---- | ---- | ----------- | ------- |
| denom | string |  |  |
| amount | int |  |  |
