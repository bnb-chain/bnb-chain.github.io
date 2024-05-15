---
title: Billing and Payment
order: 4
---

# Billing and Payment

In Greenfield, users are required to pay two different types of fees:

- Firstly, every transaction will require gas fees to pay the Greenfield validator to
  write the metadata on-chain as described in [Gas and Fee](gas-fees.md) part.
- Secondly, the Storage Providers (SPs) charge the users for their storage service. Such payment also happens on the
  Greenfield.

The storage service fee will be charged on Greenfield in a steam payment style
like [Superfluid](https://docs.superfluid.finance/superfluid/protocol-overview/in-depth-overview/super-agreements/constant-flow-agreement-cfa).

## Storage Service Fee

There are two kinds of storage service fees in Greenfield: **object storage fee** and **data package fee**.

For storage, every object stored on Greenfield is charged at the price calculated by size, replica numbers,
a base price ratio, and other parameters. Once the object is stored, the total charge of
storage will be mainly only related to time and the base price.

The storage fee calculation is:

```math
Storage Fee = sum(ChargedSize) * (PrimaryStorePrice + SecondaryStorePrice*SecondarySPNumber) * (1+Validator Tax Rate) * ReserveTime
```

Users are granted a free, time-based quota for downloading data, with each bucket corresponding to a set of their objects. If the quota is exceeded, users can upgrade their data package to obtain an additional quota. The price for each data package is fixed for a certain period (unless the read price has been changed and the user takes some actions to reflect the price change), during which users will only be charged based on the amount of time they spend downloading and the package price. This charging scheme remains in effect until the user modifies their data package settings.

The download quota fee calculation is:

```math
Download Quota Fee Fee = ChargedReadQuota * ReadPrice * (1 + Validator Tax Rate) * ReserveTime
```

### Global Virtual Group Family & Global Virtual Group
For storage fees, it will be not streamed to storage providers directly. It will be streamed to:
- Global Virtual Group Family's virtual funding address for **data package fee** and primary sp's **object storage fee**
- Global Virtual Group's virtual funding address for all secondary sp's **object storage fee**
- Validator tax pool for extra tax fee (e.g. 1%), which will be used for rewarding data availability challenge submitters.

When storage providers want to get their income, they can withdraw from Global Virtual Group Family and Global Virtual Group 
they are in.
The validator tax pool cannot be controlled via any private key, and is used for challenge reward.

### Payment Account

By default, the object owner's address will be used to pay for the objects it owns.
But users can also create multiple "payment accounts" and associate objects to different payment
accounts to pay for storage and bandwidth.

The address format of the payment account is the same as normal accounts.
It's derived by the hash of the user address and payment account index.
However, the payment accounts are only logical ones and only exist in the storage payment module.
Users can deposit into, withdraw from, and query the balance of payment accounts on the Greenfield blockchain,
but users cannot use payment accounts to perform staking or other on-chain transactions.
Payment accounts can be set as "non-refundable". Users cannot withdraw funds from such payment accounts.

### Paymaster

Besides using the owner's address or payment accounts to pay for the storage and bandwidth, users can also use others' 
address or payment account by setting the payment account for the bucket. The owner of payment account need to set
the flow rate limit for the bucket before the bucket can be used.

This will lower the barrier for users to use Greenfield since they don't need to have BNB to pay for the storage and bandwidth
and they don't need to understand the charging mechanism of Greenfield which is quite complex.

It will also provide a possibility for projects to sponsor the storage and bandwidth for their users.

For more details, you can refer to the [BEP of the paymaster](https://github.com/bnb-chain/BEPs/pull/362).

### Downgraded service

Once the payment accounts run out of BNB, the objects associated with these payment accounts will
suffer from a downgraded service of downloading, i.e. the download speed and connection numbers will be limited.
Once the fund is transferred to the payment accounts, the service quality can be resumed right away.
If the service is not resumed for a long time, it is the SPs' discretionary decision to clear the data out,
in a similar way to how SPs claim to stop services to certain objects. In such a case, the data may be gone
from Greenfield completely.

!!! warning "asdf"
    If users fail to renew their subscription on time, **there is a risk of their stored data being permanently deleted.** 

### Trust or Shift

In Greenfield, there is trust between the users and the SPs for data download.

Since downloading bandwidth incurs additional fees and the download journal is not completely stored on the Greenfield
blockchain, SPs offer an endpoint interface for users to access detailed logs and downloaders'
signatures for download billing.
If the users and the SPs cannot agree on the bill, users may just select another Primary SP.

For more tech details, please refer to
the [stream payment module design](https://github.com/bnb-chain/greenfield/blob/doc-refactor/docs/modules/billing-and-payment.md).
