# Cross-Chain API

To facilitate querying cross chain transactions between BNB Beacon Chain and BNB Smart Chain, following apis are provided.

Mainnet base path: <https://api.bnbchain.org>

**Version:** 1.0.0


## /cross_chain/v1/transfer_in_txs?address={address}
### Method
GET

### Summary
Query transfer in cross chain transactions.

### Parameters

| Name      | Located in | Description                                         | Required | Schema |
|-----------|------------|-----------------------------------------------------|----------|--------|
| address   | query      | BNB Beacon Chain address or BNB Smart Chain address | Yes      | string |
| page      | query      | page number                                         | No       | int    |
| page_size | query      | page size                                           | No       | int    |

### Responses

| Code | Description  | Schema                      |
|------|--------------|-----------------------------|
| 200  | OK           | [TransferIns](#TransferIns) |
| 401  | Unauthorized |                             |
| 403  | Forbidden    |                             |


## /cross_chain/v1/transfer_out_txs?address={address}
### Method
GET

### Summary
Query transfer-out cross chain transactions.

### Parameters

| Name      | Located in | Description                                         | Required | Schema |
|-----------|------------|-----------------------------------------------------|----------|--------|
| address   | query      | BNB Beacon Chain address or BNB Smart Chain address | Yes      | string |
| page      | query      | page number                                         | No       | int    |
| page_size | query      | page size                                           | No       | int    |

### Responses

| Code | Description  | Schema                        |
|------|--------------|-------------------------------|
| 200  | OK           | [TransferOuts](#TransferOuts) |
| 401  | Unauthorized |                               |
| 403  | Forbidden    |                               |


## /cross_chain/v1/tx/{tx_hash}
### Method
GET

### Summary
Query cross chain transaction on target chain by transaction hash.

### Parameters

| Name    | Located in | Description                      | Required | Schema |
|---------|------------|----------------------------------|----------|--------|
| tx_hash | query      | BNB Smart Chain transaction hash | Yes      | string |

### Responses

| Code | Description  | Schema    |
|------|--------------|-----------|
| 200  | OK           | [Tx](#Tx) |
| 401  | Unauthorized |           |
| 403  | Forbidden    |           |


## /cross_chain/v1/reverse_tx/{tx_hash}
### Method
GET

### Summary
Query source transaction (the transaction on the other chain) by the transaction hash on target chain.

### Parameters

| Name    | Located in | Description                       | Required | Schema |
|---------|------------|-----------------------------------|----------|--------|
| tx_hash | query      | BNB Beacon Chain transaction hash | Yes      | string |

### Responses

| Code | Description  | Schema                  |
|------|--------------|-------------------------|
| 200  | OK           | [ReverseTx](#ReverseTx) |
| 401  | Unauthorized |                         |
| 403  | Forbidden    |                         |

## Models

### Tx

| Name                | Type    | Description                               | Required |
|---------------------|---------|-------------------------------------------|----------|
| has_refund          | boolean | whether the transaction has been refunded | Yes      |
| cross_chain_tx_hash | string  | transaction hash on the other chain       | Yes      |
| refund_tx_hash      | string  | refund transaction hash if exists         | No       |

### ReverseTx

| Name                   | Type   | Description                                | Required |
|------------------------|--------|--------------------------------------------|----------|
| original_chain_tx_hash | string | source transaction hash on the other chain | Yes      |

### TransferIns

| Name            | Type  | Description                                 | Required |
|-----------------|-------|---------------------------------------------|----------|
| page            | int   | page number                                 | Yes      |
| page_size       | int   | page size                                   | Yes      |
| total_count     | int   | total transactions                          | Yes      |
| transfer_in_txs | array | transfer-in transaction hashes              | Yes      |
| original_txs    | array | the corresponding source transaction hashes | Yes      |

### TransferOuts

| Name             | Type  | Description                                 | Required |
|------------------|-------|---------------------------------------------|----------|
| page             | int   | page number                                 | Yes      |
| page_size        | int   | page size                                   | Yes      |
| total_count      | int   | total transactions                          | Yes      |
| transfer_out_txs | array | transfer-out transaction hashes             | Yes      |
| original_txs     | array | the corresponding source transaction hashes | Yes      |
