---
sidebar_label: Billing and Payment
sidebar_position: 2
hide_table_of_contents: false
---

# Billing and Payment

Greenfield will charge the users in two parts. Firstly, every transaction will require gas fees to pay the Greenfield validator to write the metadata on-chain. Secondly, the SPs charge the users for their storage service. Such payment also happens on the Greenfield. This section is about the latter: how such off-chain service fees are billed and charged.

There are two kinds of fees for the off-chain service: object storage fee and read package fee:

  **1.** Every object stored on Greenfield is charged a fee based on its size, content type, and other parameters.

  **2.** There is a free quota for users' objects to be read based on their size, content types, and more. If exceeded, i.e. the object data has been downloaded too many times, SP will limit the bandwidth for more downloads. Users can raise their data package level to get more download quota. Every data package has a fixed price.

As described in the [Design Section](../design/design-principles.md), the fees are paid on Greenfield in the style of "Stream" from users to the SPs at a constant rate. The fees are charged every second as they are used.

## Concepts and Formulas

Streaming is a constant by-the-second movement of funds from a sending account to a receiving account. Instead of sending payment transactions now and then, Greenfield records the static balance, the latest update
timestamp, and flow rate in its payment module, and calculates the dynamic balance with a formula using this data in the records. If the net flow rate is not zero, the dynamic balance will change as time elapses.

### Terminology

* **Payment Module:** This is a special module and ledger system managing the billing and payment on the Greenfield blockchain. Funds will be deposited or charged into it from users' balance or payment accounts in this Payment Module.

* **Stream Account:** The Payment Module has its own ledger for billing management. Users can deposit and withdraw funds into their corresponding "**accounts**" on the payment module ledger. These accounts are called "**Stream Account**", which will directly interact with the stream payment functions and bill the users for the storage and data service.

* **Payment Account:** Payment account has been discussed in other sections of [Design](../design/design-principles.md) and [Technical Specifications](../tech-specs/ecosystem-players.md) already. It is actually a type of Stream Account. Users can create different payment accounts and associate it with different buckets for different purposes.

* **Payment Stream:** Whenever the users add/delete/change a storage object or download a data package, they add or change one or more "payment streams" for that service provided by SPs. 

* **Flow Rate:** The per-second rate at which a sender decreases its net outflow stream and increases a receiver's net inflow stream when creating or updating a payment stream.

* **Netflow Rate:** The per-second rate that an account's balance is changing. It is the sum of the account's inbound and outbound flow rates.

* **Sender:** The stream account that starts the payment stream by specifying a receiver and a flow rate at which its net flow decreases.

- **Receiver**: The stream account on the receiving end of one or more payment streams. 
  
* **CRUD Timestamp:** The timestamp of when the user creates, updates, or deletes a payment stream.

* **Delta Balance:** The amount of the stream account's balance has changed since the latest CRUD timestamp due to the flow. It can be positive or negative.

* **Static Balance:** The balance of the stream account at the latest CRUD timestamp.

* **Dynamic Balance:** The actual balance of a stream account. It is the sum of the Static Balance and the Delta Balance.

When a user's stream account is initiated in the payment module by deposit, several fields will be recorded for this stream account:

  * CRUD Timestamp - will be the timestamp at the time.
  * Static Balance - will be the deposit amount.
  * Netflow Rate - will be 0.
  * Buffer Balance - will be 0.

### Formula

  `Static Balance = Initial Balance at latest CRUD timestamp`

  `Delta Balance = Netflow Rate \* Seconds elapsed since latest CRUD timestamp`

  `Current Balance = Static Balance + Delta Balance`

  `Buffer Balance = - Netflow Rate \* pre-configed ReserveTime if Netflow Rate is negative`


![inflow-and-outflow-of-funds](../../../static/img/assets/greenfield/21.1-How-a-User-Receives-Inflow-and-Outflow-of-Funds.jpg)
<div align="center"><i>How a User Receives Inflow and Outflow of Funds</i></div>

Every time a user creates, updates, or deletes a payment stream, many variables in the above formulas will be updated and the users' stream accounts in the payment module will be settled.

* The net flow for the user's stream account in the payment module will be re-calculated to net all of its inbound and outbound flow rates by adding/removing the new payment stream against the current NetFlow Rate. E.g. when a user creates a new object whose price is \$0.4/month, its NetFlow Rate will add -\$0.4/month.

* If the NetFlow rate is negative, the associated amount of BNB will be reserved in a buffer balance. It is used to avoid the dynamic balance becoming negative. When the dynamic balance becomes under the threshold, the account will be forced settled.

* CRUD Timestamp will become the current timestamp.

* Static Balance will be re-calculated. The previous dynamic balance will be settled. The new static Balance will be the Current Balance plus the change of the Buffer Balance.

#### Types and Interfaces

```go
type PaymentConfig struct {
    // Time duration which the buffer balance need to be reserved for NetOutFlow e.g. 6 month
    ReserveTime      uint64
    // Time duration threshold of forced settlement.
    // If dynamic balance is less than NetOutFlowRate * forcedSettleTime, the account can be forced settled.
    ForcedSettleTime uint64
}
```

```go
type StreamPayment struct {
    CRUDTimestamp uint64
    NetflowRate   int64
    StaticBalance uint64
    BufferBalance uint64 // reserved balance for a period, e.g. 1 day
}
```

```go
type PaymentKeeperI interface {
    GetStorePrice(replicaNum, size uint64) (uint64, error)
    GetReadPackagePrice(packageType ReadPackageType) (uint64, error)
    UpdatePaymentFlow(from, to Address, rate int64) error
    LiquidateAccount(addr Address) error
}
```

## Key Workflow

### Deposit and Withdrawal

All users(including SPs) can deposit and withdraw BNB in the payment
module. The `StaticBalance` in the `StreamPayment` data struct will be
"**settled**" first: the `CRUDTimeStamp` will be updated and `StaticBalance` will be netted with DeltaBalance. Then the deposit and withdrawal number will try to add/reduce the `StaticBalance` in the record. If the static balance is less than the withdrawal amount, the withdrawal will fail.

Deposit/withdrawal via cross-chain will also be supported to enable
users to deposit/withdraw from BSC directly.

Specifically, the payment deposit can be triggered automatically during
the creation of objects or the addition of data packages. As long as
users have assets in their address accounts and payment accounts, the
payment module may directly charge the users by moving the funds from
address accounts.

### Payment Stream

Payment streams are flowing in one direction. Whenever the users deposit
from their address accounts into the stream accounts (including users'
default payment account and other payment accounts), the funds first go
from the users' address accounts to a system account maintained by the
Payment Module, although the fund size and other payment parameters will
be recorded on the users' stream account, i.e. the StreamPayment record,
in the Payment Module ledger. When the payment is settled, the funds
will go from the system account to SPs' address accounts according to
their in-flow calculation.

Every time users do the actions below, their StreamPayment record will
be updated:

* Creating an object will create a new stream to the system account
* Deleting an object will delete a stream to the system account
* Adjusting the data packages for read/download will create/delete/update the associated streams

The stream from the system account to storage providers will be updated
together when the users do the above actions. The in-flow flow rate of
SP will be recorded accurately in the payment module as well, such as
the total size stored(as primary or secondary SP), etc. The total
inbound flow will be split among the SPs according to the records.

### Forced Settlement

If a user doesn't deposit for a long time, his previous deposit may be
all used up for the stored objects. Greenfield has a forced settlement
mechanism to ensure enough funds are secured for further service fees.

There are two configurations, `ReserveTime` and `ForcedSettleTime`. Let's say 7 days and 1 day. If a user wants to store an object at the price of approximately $0.1 per month($0.00000004/second), he must reserve fees for 7 days in buffer balance, which is `$0.00000004 * 7 * 86400 = $0.024192`. If the user deposits $1 initially, the stream payment record will be as below.

* CRUD Timestamp: 100
* Static Balance: $0.975808
* Netflow Rate: -$0.00000004/sec
* Buffer Balance: $0.024192

After 10000 seconds, the dynamic balance of the user is `0.975808 - 10000 * 0.00000004 = 0.975408`.

After 24395200 seconds(approximately 282 days), the dynamic balance of
the user will become negative. Users should have some alarms for such
events that remind them to supply more funds in time.

If no more funds are supplied and the dynamic balance plus buffer
balance is under the forced settlement threshold, the account will be
forcibly settled. All payment streams of the account will be closed and
the account will be marked as out of balance. The download speed for all
objects associated with the account or payment account will be
downgraded. The objects will be deleted by the SPs if no fund is
provided within the predefined threshold.

The forced settlement will also charge some fees which is another
incentive for users to replenish funds proactively.

Let's say the ForceSettlementTime is 1 day. After 24913601
seconds(approximately 288 days), the dynamic balance becomes `0.975808 -
24913601 *0.00000004 = -0.02073604`, plus the buffer balance is
$0.00345596. The forced settlement threshold is `86400* 0.00000004 =
0.003456`. The forced settlement will be triggered, and the record of the user will become as below:

* CRUD Timestamp: 24913701
* Static Balance: \$0
* Netflow Rate: \$0/sec
* Buffer Balance: \$0

The validators will get the remaining $0.00345596 as a reward. The
account will be marked as "insufficient" and his objects get downgraded
by SPs.

Every time a stream record is updated, Greenfield calculates the time
when the account will be out of balance. So Greenfield can keep an
on-chain list to trace the timestamps for the potential forced
settlement. The list will be checked by the end of every block
processing. When the block time passes the forced settlement timestamp,
the settlement of the associated stream accounts will be triggered
automatically.

### Payment Account

Payment account is a special "**Stream Account**" type in the Payment
Module. Users can create multiple payment accounts and have the
permission to link buckets to different payment accounts to pay for
storage and data package.

The relevant data structures and interface are as the following:

```go
// PaymentAccountNum mapping
// key: PaymentAccountNumPrefix | Address
// value: uint64  // counter
// use cases:
// - record the number of payment accounts of a user
// - derive new payment account address from user address
// - PaymentAccountAddress = Hash(OwnerAddress | current_num), increased by 1 when create a new payment account

// key: PaymentAccountPrefix | Address
type PaymentAccount struct {
    Owner        Address
    Withdrawable bool
}

type PaymentKeeperI interface {
    Deposit(from, to Address, amount uint64) error
    Withdraw(from, to Address, amount uint64) error
    CreatePaymentAccount(addr Address) (paymentAccountAddr Address, err error)
    ForbidWithdraw(sender, paymentAccount Address) error
    SetBucketStorePayer(bucket BucketID, sender, payer Address) error
    SetBucketReadDataPayer(bucket BucketID, sender, payer Address) error
}
```

The payment accounts have the below traits:

* Every user can create multiple payment accounts. The payment accounts created by the user are recorded with a map on the BNB Greenfield blockchain.

* The address format of the payment account is the same as normal accounts. It's derived by the hash of the user address and payment account index. The payment account only exists in the storage payment module. Users can deposit into, withdraw from and query the balance of payment accounts in the payment module, which means payment accounts cannot be used for transfer or staking.

* Users can only associate their buckets with their payment accounts to pay for storage and bandwidth. Users cannot associate their own buckets with others' payment accounts, and users cannot associate others' buckets with their own payment accounts.

* The owner of a payment account is the user who creates it. The owner can set it non-refundable. It's a one-way setting and can not be revoked. Thus users can set some objects as "public goods" which can receive donations for storage and bandwidth while preserving the ownership.

### Account Freeze and Resume

If a payment account is out of balance, it will be settled and set a
flag as out of balance.

The NetflowRate will be set to 0, while the current settings of the
stream pay will be backed up in another data structure. The download
speed for all objects under this account will be downgraded.

If someone deposits into a frozen account and the static balance is
enough for reserved fees, the account will be resumed automatically. The
stream pay will be recovered from the backup.

During the OutOfBalance period, no objects can be associated with this
payment account again, which results in no object can be created under
the bucket associated with the account.

If the associated object is deleted, the backup stream pay settings will
be changed accordingly to ensure it reflects the latest once the account
is resumed.

### Storage Fee Price and Adjustment

The object storage fee is calculated with a function of object metadata
and time. The unit of the price will be US dollars. The payment actually
charged on Greenfield is BNB, and the price of BNB will be submitted by
the oracle.

For example, if the price is 0.03 USD / GB / month, the current BNB
price on-chain is 258 USD, 70% of the storage fee will be received by
the primary SP, and the rest are split by secondary SPs.

When an object of 123, 456, 789 bytes(approximately 123 MB) is sealed,
there will be 7 payment streams updated. The fee rate is `0.03 / 258 *
123456789 / (1024*1024*1024) / (30*24*60*60) = 5.158003812501789e-12`
BNB/second.

Let's set the rate as R.

* User -\> Primary SP flow rate: 0.7 \* R
* User -\> Secondary SP 1 flow rate: 0.05 \* R
* User -\> Secondary SP 2 flow rate: 0.05 \* R
* User -\> Secondary SP 3 flow rate: 0.05 \* R
* User -\> Secondary SP 4 flow rate: 0.05 \* R
* User -\> Secondary SP 5 flow rate: 0.05 \* R
* User -\> Secondary SP 6 flow rate: 0.05 \* R

The stream records of the payment accounts will be adjusted. If the
reserved time is 6 months, the user has to reserve `(R * 6 * 30 * 24 * 60 * 60) = 8.021727529202782e-05` BNB in
the Buffer Balance. If the balance of the payment account is not enough, either the trigger
transaction will fail or the account will be marked as "insufficient".

The BNB price will be submitted by an oracle from the Greenfield
validator relayers periodically. When the price updates, all payment
prices will be calculated with the latest price. But all the flow rates
of existing payments will remain unchanged until the next settlement,
triggered by either the user's new actions like putting a new object or
the auto-settlement.

The object storage fee price formula is expected to be steady since the
price unit is USD and the cost of storage changes slowly over time. The
formula might be flexible enough so it can be hard-coded on-chain.

There may be a chance the SPs want to change the formula(e.g. for
business model update). That will be achieved by SPs and validators'
coordinated governance.

