---
title: Storage Provider
order: 4
---

# Storage Provider

## Abstract
The SP module is responsible for managing and maintaining all storage providers in the Greenfield network. It provides basic functions such as joining, depositing, editing, and etc.

The RPC addresses for mainnet and Testnet are listed below. In this tutorial, we are going to use Mainnet RPC address.

=== "Mainnet"
    ```shell
    node = "https://greenfield-chain.bnbchain.org:443"
    ```

=== "Testnet"
    ```shell
    node = "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org:443"
    ```

## List Storage providers

```shell
gnfd query sp storage-providers [flags]
```

Example:

```sh
gnfd query sp storage-providers --node https://greenfield-chain.bnbchain.org:443
```

## Query a Storage provider by id

```shell
gnfd query sp storage-provider [sp-id] [flags]
```

Example:

```sh
gnfd query sp storage-provider 1 --node https://greenfield-chain.bnbchain.org:443
```

## Query a Storage Provider by address

```shell
gnfd query sp storage-provider-by-operator-address [sp-address] [flags]
```

Example:

```sh
gnfd query sp storage-provider-by-operator-address 0x.. --node https://greenfield-chain.bnbchain.org:443
```

## Query a Storage Provider maintenance records

```shell
gnfd query sp maintenance-records-by-operator-address [operator address] [flags]
```

Example:

```sh
gnfd query sp maintenance-records-by-operator-address 0x.. --node https://greenfield-chain.bnbchain.org:443
```

## Submit a proposal for creating Storage Provider

```shell
gnfd tx sp create-storage-provider [path/to/create_storage_provider_proposal.json] [flags]
```

Example:

```sh
gnfd tx sp create-storage-provider create_storage_provider_proposal.json  --from your_funding_key --home ~/.gnfd --node https://greenfield-chain.bnbchain.org:443
```

```json
{
  "messages": [
    {
      "@type": "/greenfield.sp.MsgCreateStorageProvider",
      "description": {
        "moniker": "sp0",
        "identity": "",
        "website": "",
        "security_contact": "",
        "details": ""
      },
      "sp_address": "0x012Eadb23D670db68Ba8e67e6F34DE6ACE55b547",
      "funding_address": "0x84b3307313e253eF5787b55616BB1F6F7139C2c0",
      "seal_address": "0xbBD6cD73Cd376c3Dda20de0c4CBD8Fb1Bca2410D",
      "approval_address": "0xdCE01bfaBc7c9c0865bCCeF872493B4BE3b343E8",
      "gc_address": "0x0a1C8982C619B93bA7100411Fc58382306ab431b",
      "maintenance_address": "0xbE03316B1D7c3FCB69136e47e02442d6Fb3396dB",
      "endpoint": "https://sp0.greenfield.io",
      "deposit": {
        "denom": "BNB",
        "amount": "500000000000000000000"
      },
      "read_price":"0.1469890427",
      "store_price":"0.02183945725",
      "free_read_quota": 1073741824,
      "creator": "0x7b5Fe22B5446f7C62Ea27B8BD71CeF94e03f3dF2",
      "bls_key": "af8c586885a490a1775bcbef95e6162de1904777f3fb91e3bfd0ffd690fe0d477d0984f11852c64dc77d4583c99f34cb",
      "bls_proof": "8bbce5330c5a46416ec41bfb93d938e8fb2e01d0a4035bd7b87efb98762e5e71faf00427d991003680325b7f97b362640f8e58e69bf774cd59e2267bdfe5a2e6578194b6834531893a39253c718edae2511977991895cdc8dd9e1136e43d721c"
    }
  ],
  "title": "create sp",
  "summary": "create sp",
  "metadata": "4pIMOgIGx1vZGU=",
  "deposit": "1000000000000000000BNB"
}
```

## Deposit

SP stake token from its funding account into Greenfield.

```shell
gnfd tx sp deposit [sp-address] [fund-address] [value] [flags]
```

Example:

```sh
gnfd tx sp deposit 0x... 0x... 10000000000BNB  --from funding_key --home ~/.gnfd --node https://greenfield-chain.bnbchain.org:443
```

## EditStorageProvider

```shell
gnfd tx sp edit-storage-provider [sp-address] [flags]
```

Example:

```sh
gnfd tx sp edit-storage-provider 0x... --endpoint https://www.new-endpoint.com --new-moniker newmoniker  --from your_key --home ~/.gnfd --node https://greenfield-chain.bnbchain.org:443
```

## UpdateStorageProviderStatus

SP update status of itself, Currently status can be STATUS_IN_SERVICE and STATUS_IN_MAINTENANCE.
```shell
gnfd tx sp update-status [sp-address] [new-status] [flags]
```

Example:

Update an SP to in service status.
```sh
gnfd tx sp update-status 0x... STATUS_IN_SERVICE --from your_key --home ~/.gnfd --node https://greenfield-chain.bnbchain.org:443
```

Update an SP to in maintenance status with request duration is 1200 seconds.
```sh
gnfd tx sp update-status 0x... STATUS_IN_MAINTENANCE --duration 1200 --from your_key --home ~/.gnfd --node https://greenfield-chain.bnbchain.org:443
```
