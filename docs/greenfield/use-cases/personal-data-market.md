---
sidebar_label: Personal Data Market
sidebar_position: 2
hide_table_of_contents: false
---

# Potential UseCase: Personal Data Market

This may be the most complicated problem to tackle nowadays: how to own
your data, such as page views, registrations, clicks, behavior data, and
much more. The ownership guarantees that no platforms (usually the
monopoly ones) can abuse using it. Many laws are defined to punish
misuse, but there are few proactive solutions.

BNB Greenfield poses for pioneering new angles to solve this: what if
you can ask the applications to store all your data encrypted on
Greenfield under your account, and only allow the processing of your
data via a publicly readable code?

Let us check a specific scenario. A data market stores your past buy and
sell orders on Greenfield, encrypted by your account's public key. Only
your private key can decrypt and read it. However the data market
application will like to read your data to recommend other items,
meanwhile, another data agency would like to use this data to perform
commercial research. Both of them are willing to pay you for their
processing of your data. You tend to grant permission to them to read
the data but worry they will do other things with your data. How can BNB
Greenfield solve this?

This may not be day 1 implementation but BNB Greenfield targets to solve
this trust computing problem by providing a verifiable computing runtime
("do not trust, verify").

In the above scenario, the data market application and the data agency
may put the programs that need to read the users' data on Greenfield and
share them with you or even the whole public. You can verify whether you
are comfortable with what the programs do. Then you grant the read
permission of this new object with a
"[group-oriented](https://onlinelibrary.wiley.com/doi/epdf/10.1002/sec.1593)"
encryption scheme to these programs. The data market and the data agency
can pay you and then will run these programs to get the result on a
verifiable sandbox of the runtime of Greenfield.

Once this model gets understood, a lot of enhancements can be done via
modern cryptography to improve the user experience.

For example, the deal can be negotiated beforehand between you and the
data market. Thus the grant of the permission and corresponding economic
benefits exchange can happen within a smart contract to reduce the trust
required. After the deal is achieved, the data will be saved via
BLS-based encryption from the time it is generated. Either the data
owner or the data market programs that the data owner approves (not the
data market owner) can, and only those two can decrypt the data.

Many more infrastructures related to the scenario above are not
considered in this paper yet but can be gradually designed and
implemented on BNB Greenfield.