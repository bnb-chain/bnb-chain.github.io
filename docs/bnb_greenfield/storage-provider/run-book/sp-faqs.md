---
title: SP FAQ
description: A list of BNB Greenfield frequently asks questions about Storage Provider.  
keywords: [BNB Greenfield Storage Provider, BNB Greenfield Storage Provider Requirements]
---

### What are requirements for Greenfield Storage Provider?
Storage Providers(SP) should meet the following requirements:
* Collateral:
	* Each SP candidate has to deposit **500 BNB** as collateral
	* SP needs to pledge additional funds to store more data at 200% of the storage fees of the data stored as Primary SP, which is 0.023 * 1024 * 2 = $47.104/TB.

* [Hardware requirements](./run-SP-node.md#recommended-hardware)

### How does SP receive their rewards?

SP will receive their rewards in `funding address` after sending `Settlement Transaction`.

### When to update store price and read price?

Every SP can set their own suggested store price and read price via on-chain transactions. Read how to send commands [here](./join-SP-network.md#update-sp-price)

There are some [constrains](https://github.com/bnb-chain/greenfield/blob/master/docs/modules/billing-and-payment.md#storage-fee-price-and-adjustment
):
* When to Update : The global rates will be calculated and updated in each month's first block (UTC time) by default.
* When not Update: By default, SPs cannot update their price in the last two days of the current month.


### How much BNB is required by SP to stake in relation to how much space they want to provide?

SP needs to stake additional funds to store user's data. It's based on formula: storage_staking_price * stored_size, and the price is now 160000 wei/byte, which could be fetched from [this API](https://greenfield-chain.bnbchain.org/openapi#/Query/VirtualGroupParams) .


### What's the limit of Storage Provider capacity?

Each VGF serves a limited number of buckets. Once the store size exceeds a specified threshold, the family will no longer allow to serve more buckets. No limit on number of VGF but max size per VGF is 64T


### How to become a reliable SP?

1. Make sure your SP passed this [standard test](https://github.com/bnb-chain/greenfield-sp-standard-test)
2. If your infra is not working, switch your SP back to `maintenance mode`. Then, back up lost data from secondary SPs.