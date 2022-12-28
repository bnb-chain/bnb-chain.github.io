---
sidebar_label: 크로스 체인 API
sidebar_position: 2
hide_table_of_contents: false
---
# 크로스 체인 API

BNB 비컨 체인과 BNB 스마트 체인 간 크로스 체인 트랜잭션 쿼리를 돕기 위해 다음과 같은 API가 제공됩니다.

메인넷 base 경로: <https://api.bnbchain.org>

**버전:** 1.0.0


## /cross_chain/v1/transfer_in_txs?address={address}
### 메서드
GET

### 요약
크로스 체인 트랜잭션에서 전송을 쿼리합니다.

### 매개변수

| 이름      | 위치        | 설명                                      | 필수     | 스키마  |
|-----------|------------|-------------------------------------------|----------|--------|
| address   | query      | BNB 비컨 체인 주소 혹은 BNB 스마트 체인 주소 | 네       | string |
| page      | query      | 페이지 넘버                                | 아니오    | int    |
| page_size | query      | 페이지 사이즈                              | 아니오    | int    |

### 응답

| 코드 | 설명         | 스키마                      |
|------|--------------|-----------------------------|
| 200  | OK           | [TransferIns](#TransferIns) |
| 401  | 승인되지 않음 |                             |
| 403  | 금지됨       |                             |


## /cross_chain/v1/transfer_out_txs?address={address}
### 메서드
GET

### 요약
전송되어 나가는 크로스 체인 트랜잭션 쿼리

### 매개변수

| 이름      | 위치        | 설명                                      | 필수     | 스키마  |
|-----------|------------|-------------------------------------------|----------|--------|
| address   | query      | BNB 비컨 체인 주소 혹은 BNB 스마트 체인 주소 | 네       | string |
| page      | query      | 페이지 넘버                                | 아니오    | int    |
| page_size | query      | 페이지 사이즈                              | 아니오    | int    |

### 응답

| 코드 | 설명         | 스키마                         |
|------|--------------|-------------------------------|
| 200  | OK           | [TransferOuts](#TransferOuts) |
| 401  | 승인되지 않음 |                               |
| 403  | 금지된       |                               |


## /cross_chain/v1/tx/{tx_hash}
### 메서드
GET

### 요약
Query cross chain transaction on target chain by transaction hash.

### 매개변수

| 이름    | 위치   | 설명                        | 필수 | 스키마 |
|---------|-------|-----------------------------|-----|--------|
| tx_hash | query | BNB 스마트 체인 트랜잭션 해시 | 예  | string |

### 응답

| 코드 | 설명          | 스키마    |
|------|--------------|-----------|
| 200  | OK           | [Tx](#Tx) |
| 401  | 승인되지 않음 |           |
| 403  | 금지된        |           |


## /cross_chain/v1/reverse_tx/{tx_hash}
### 메서드
GET

### 요약
목표(target) 체인의 트랜잭션 해시에서 source 트랜잭션 (다른 체인의 트랜잭션) 쿼리

### 매개변수

| 이름    | 위치   | 설명                       | 필수 | 스키마 |
|---------|-------|----------------------------|------|--------|
| tx_hash | 쿼리   | BNB 비컨 체인 트랜잭션 해시 | 예   | string |

### 응답

| 코드 | 설명          | 스키마                  |
|------|--------------|-------------------------|
| 200  | OK           | [ReverseTx](#ReverseTx) |
| 401  | 승인되지 않음 |                         |
| 403  | 금지된        |                         |

## 모델

### Tx

| 이름                | 타입     |  설명                         | 필수    |
|---------------------|---------|-------------------------------|--------|
| has_refund          | boolean | 트랜잭션이 환불되었는지 여부    | 예      |
| cross_chain_tx_hash | string  | 다른 체인에서의 트랜잭션 해시   | 예      |
| refund_tx_hash      | string  | 존재 시 환불 트랜잭션 해시      | 아니오  |

### ReverseTx

| 이름                   | 타입    |  설명                             | 필수 |
|------------------------|--------|-----------------------------------|------|
| original_chain_tx_hash | string | 다른 체인에서 source 트랜잭션 해시  | 예   |

### TransferIns

| 이름            | 타입   |  설명                               | 필수 |
|-----------------|-------|-------------------------------------|------|
| page            | int   | 페이지 넘버                          | 예   |
| page_size       | int   | 페이지 사이즈                        | 예   |
| total_count     | int   | 총 트랜잭션                          | 예   |
| transfer_in_txs | array | 들어오는(transfer-in) 트랜잭션 해시   | 예   |
| original_txs    | array | 대응되는 source 트랜잭션 해시         | 예   |

### TransferOuts

| 이름             | 타입   |  설명                               | 필수 |
|------------------|-------|-------------------------------------|------|
| page             | int   | 페이지 넘버                          | 예   |
| page_size        | int   | 페이지 사이즈                        | 예   |
| total_count      | int   | 총 트랜잭션                          | 예   |
| transfer_out_txs | array | 나가는(transfer-out) 트랜잭션 해시    | 예   |
| original_txs     | array | 대응되는 source 트랜잭션 해시         | 예   |