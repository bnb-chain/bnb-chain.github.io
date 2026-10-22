---
title: BNB Chain Safe Multi-Sig Wallet Service
index: yes
---
# BNB Chain Safe Multi-Sig Wallet Service

Safe now supports BSC Mainnet and opBNB Mainnet. BNB Chain deployed a multi-sig wallet service on BSC Testnet, opBNB Testnet. It provides users with a secure and convenient way to manage their digital assets and transactions.

# How to Use the BNB Chain Multi-Sig Wallet Service

To use the BNB Chain multi-sig wallet service, connect with your own EOA wallet to start. Visit [https://multisig.bnbchain.org/welcome](https://multisig.bnbchain.org/welcome)

Read the [Safe Doc](https://docs.safe.global/getting-started/readme) for details.  

# Safe Transaction Service API
To create or list safe transactions programmatically, use the Safe Transaction Service API. Here are the endpoints for the BSC testnet, opBNB testnet, BSC mainnet and opBNB mainnet:

Mainnet: [https://docs.safe.global/core-api/api-overview](https://docs.safe.global/core-api/api-overview)

Testnet: 
- [https://safe-transaction-bsc-testnet.bnbchain.org/](https://safe-transaction-bsc-testnet.bnbchain.org/)
- [https://safe-transaction-opbnb-testnet.bnbchain.org/](https://safe-transaction-opbnb-testnet.bnbchain.org/)

## Example Usage

The Safe Transaction Service API is generic and can be used across different networks by simply changing the endpoint. Here's an example of how to query the service status on BSC testnet:

```bash
curl --location --request GET 'https://safe-transaction-bsc-testnet.bnbchain.org/api/v1/about/' \
--header 'accept: application/json' \
--header 'X-CSRFToken: YOUR_CSRF_TOKEN_HERE'
```

To use the same API on opBNB testnet, simply replace the endpoint with `https://safe-transaction-opbnb-testnet.bnbchain.org/`.

Read the [api-kit Doc](https://docs.safe.global/safe-core-aa-sdk/api-kit/reference) for details.
