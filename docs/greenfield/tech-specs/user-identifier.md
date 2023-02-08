---
sidebar_label: User Identifier
sidebar_position: 2
hide_table_of_contents: false
---

# User Identifier

Each user has their own address as the identifier for his/her account.
The addresses can create objects to store on Greenfield, bear and manage
the permissions, and pay fees.

Greenfield defines its account in the same format as BSC and Ethereum.
It starts with ECDSA secp256k1 curve for keys and is compliant with
[EIP84](https://github.com/ethereum/EIPs/issues/84) for
full
[BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
paths. The root HD path for Greenfield-based accounts is
`m/44'/60'/0'/0`. In the readable presentation, a Greenfield address is
a 42-character hexadecimal string derived from the last 20 bytes of the
public key of the controlling account with 0x as the prefix.

With this compatible address scheme, the users can reuse existing
accounts and infrastructure from BSC on Greenfield. For example, they
can use TrustWallet and Metamask (or other compatible wallets) to
deposit their BNB from BSC to Greenfield and interact with dApps on
Greenfield. It is also easy to identify the same owner by referring to
the same addresses on both BSC and Greenfield.

Greenfield blockchain is an application-specific chain without EVM, the
transaction data structure and API are different from BSC. Greenfield
will not support full functions in existing wallets, e.g. Transfer, Send
Transactions, etc. But it will enable the existing wallets to sign
transactions with the
[EIP712](https://eips.ethereum.org/EIPS/eip-712) standard.
This standard allows wallets to display data in signing prompts in a
structured and readable format. This is an
[example](https://medium.com/metamask/eip712-is-coming-what-to-expect-and-how-to-use-it-bb92fd1a7a26)
of how to use it in Metamask. Eventually, wallets will start supporting
Greenfield directly.

## User Balance

The user identifier is mapped to an account in the ledger of Greenfield.
The account can hold a balance of BNB. These BNBs can be used to
participate in staking, pay for gas fees of Greenfield transactions, and
pay for Greenfield services.

This balance can be added via native BNB transfer on Greenfield, or
cross-chain transfer between Greenfield and BSC.

