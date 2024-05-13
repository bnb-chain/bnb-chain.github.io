---
title: Storage FAQ
description: A list of BNB Greenfield frequently asks questions about storage.  
keywords: [BNB Greenfield Storage, BNB Greenfield Storage Pricing]
---

### How much does it cost to store files in Greenfield?

If you're interested in knowing the real-time pricing for storage and querying on Greenfield, we invite you to the [Price Calculator](https://dcellar.io/pricing-calculator).


### How is my billing calculated?

In Greenfield, bsides transaction fee, users are required to pay two kinds of storage service fees: `storage fee` and `download quota fee`. These storage service fees are charged by Storage Providers (SPs) in a [stream payment](../guide/greenfield-blockchain/modules/billing-and-payment.md). Users need to lock some BNB when they start using the service.

```math
Storage Fee = sum(ChargedSize) * (PrimaryStorePrice + SecondaryStorePrice*SecondarySPNumber) * (1+Validator Tax Rate) * ReserveTime
```

```math
Download Quota Fee = ChargedReadQuota * ReadPrice * (1 + Validator Tax Rate) * ReserveTime
```

Currently,  `ReserveTime` is 180 days and `Validator Tax Rate` is 1%

### What is Charged Size?
The ChargeSize is calculated from the object's payload size, if the payload size is less than 128k then ChargeSize is 128k, otherwise ChargeSize is equal to payload size.

If Data Size < 128K, ChargedSize = 128K; else, ChargedSize = Data Size

If object is an empty folder, ChargedSize = 128K

You can query the value from [this API](https://docs.bnbchain.org/greenfield-docs/docs/greenfield-api/storage-params)

### What is Primary/Secondary Store Price?
Every SP can set their own suggested store price and read price via on-chain transactions. At the first block of each month, the median all SPs' store prices will be calculated as the Primary SP Store Price, the Secondary SP Store Price will be calculated as [SecondaryPriceRatio](https://docs.bnbchain.org/greenfield-docs/docs/greenfield-api/sp-params) (e.g. 12%, which can be governed) multiply the Primary SP Store Price , and the median of all SPs' read prices will be calculated as the Primary SP Read Price. To learn more about it, please refer to [this](../guide/greenfield-blockchain/modules/billing-and-payment.md#storage-fee-price-and-adjustment)

### What is Validator Tax Rate?
For each data related operation on Greenfield, validators can get some rewards for protecting the security and integrity of data (i.e. challenge). Through charging validator tax, part of user's cost will go to validator tax pool, and then become validators' rewards.

You can query the value from [this API](https://docs.bnbchain.org/greenfield-docs/docs/greenfield-api/payment-params)

### What is Read Price?
A storage provider can update its free read quote and monthly gree read quota, suggested primary store price and read price. All SPs' suggested primary store and read prices will be used to generate the global primary/secondary store price and read price.

### What is Reserve Time?
The storage fee will be charged on Greenfield in a steam payment style. The fees are paid on Greenfield in the style of "Stream" from users to receiver accounts at a constant rate. By reseveing some balance, users do not need to payment the fee in a very high frequency. Currently, the reserve time is 6 months and it can be governed.

You can query the value from [this API](https://docs.bnbchain.org/greenfield-docs/docs/greenfield-api/payment-params)

### What's best practice to store small files in Greenfield?

* The more data bundled, the more $BNB saved

If a single transaction only store a small size file to the Greenfield Network, it is like separate packages being sent through the mail – even though they were all going to the same destination. It's recommended to take all of the files to reach the `Charged Size` and put them together to get sent as one transaction to the network.

* Be Mindful to Delete
Currently, the reserve time to be charged on Greenfield is 6 months. It means a six-month storage fee will charged even for deleted items.
