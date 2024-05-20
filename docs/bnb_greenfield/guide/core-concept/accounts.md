---
title: Accounts
description: Greenfield defines its account in the same format as BSC and Ethereum.
keywords: [BNB Greenfield address, BNB Greenfield signature]
order: 1
---

## Accounts
Each Greenfield user has their own address as the identifier for his/her account.
The addresses can create objects to store on Greenfield, bear and manage
the permissions, and pay fees.

Greenfield defines its account in the same format as BSC and Ethereum.
It starts with ECDSA secp256k1 curve for keys and is compliant with
[EIP84](https://github.com/ethereum/EIPs/issues/84) for
full [BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
paths. The root HD path for Greenfield-based accounts is
m/44'/60'/0'/0. In the readable presentation, a Greenfield address is
a 42-character hexadecimal string derived from the last 20 bytes of the
public key of the controlling account with 0x as the prefix.

With this compatible address scheme, the users can reuse existing
accounts and infrastructure from BSC on Greenfield. For example, they
can use TrustWallet and Metamask (or other compatible wallets) to
deposit their BNB from BSC to Greenfield and interact with dApps on
Greenfield. It is also easy to identify the same owner by referring to
the same addresses on both BSC and Greenfield.

### User Balance

The account can hold a balance of BNB. These BNBs can be used to
participate in staking, pay for gas fees of Greenfield transactions, and
pay for Greenfield services.

This balance can be added via native BNB transfer on Greenfield, or
cross-chain transfer between Greenfield and BSC.

### Account Definition

In the Greenfield, an **account** designates a pair of `PubKey` and `PrivKey`. 
The `PubKey` can be derived to generate various `Addresses`, which are used to identify users (among other parties) in 
the application.

### Signatures

The principal way of authenticating a user is done using [digital signatures](https://en.wikipedia.org/wiki/Digital_signature). 
Users sign transactions using their own private key. Signature verification is done with the associated public key. 
For on-chain signature verification purposes, we store the public key in an `Account` object (alongside other data required 
for a proper transaction validation).

In the node, all data is stored using [Protocol Buffers](https://protobuf.dev/) serialization.

Greenfield only supports [secp256k1](https://en.bitcoin.it/wiki/Secp256k1) key schemes for creating digital signatures:

|             | Address length in bytes | Public key length in bytes | Used for transaction authentication | Used for consensus (Tendermint) |
| :---------: | :---------------------: | :------------------------: | :---------------------------------: | :-----------------------------: |
| `secp256k1` |           20            |             33             |                 yes                 |               no                |

### Addresses

`Addresses` and `PubKey`s are both public information that identifies actors in the application. `Account` is used to 
store authentication information. The basic account implementation is provided by a `BaseAccount` object.

To identify users, Greenfield uses the variable `AccAddress`. The address format follows [ERC-55](https://eips.ethereum.org/EIPS/eip-55).




## Key Management

Greenfield blockchain is an application-specific chain without EVM.
As a result, its transaction data structure and API are different from those of BSC.
Greenfield will not support full functions in existing wallets, e.g. Transfer, Send Transactions, etc.
However, these wallets can still sign transactions using the [EIP712](https://eips.ethereum.org/EIPS/eip-712) standard.
This standard allows wallets to display data in signing prompts in a structured and readable format.
This is an [example](https://medium.com/metamask/eip712-is-coming-what-to-expect-and-how-to-use-it-bb92fd1a7a26) of how to use it in Metamask.
Eventually, wallets will start supporting Greenfield directly.

### EIP-712 Support

The greenfield chain supports and only supports EIP-712 structured transaction.  These enable the existing wallet
infrastructure to interact with Greenfield at the beginning naturally.

To achieve this, the following changes have been made.

1. An Ethereum-compatible RPC backend. Be noted that we only support necessary methods to connect a
   wallet(`eth_chainId`, `eth_networkId`, `eth_blockNumber`, `eth_getBlockByNumber` and `eth_getBalance`). Other RPC methods are not implemented.
2. Same signing algorithm(`eth_scep256k1`) as Ethereum.

For developers, they can refer to [greenfield-go-sdk](https://github.com/bnb-chain/greenfield-go-sdk) and
[greenfield-js-sdk](https://github.com/bnb-chain/greenfield-js-sdk) for easy integration.

### Keyring Interface

The `Keyring` interface is the primary interface for key management in the greenfield-cosmos-sdk. It defines the methods
that a type needs to implement to be used as a key storage backend. These methods include:

-   `Get`: retrieves a key by name.
-   `List`: lists all keys stored in the keyring.
-   `Delete`: deletes a key by name.
-   `Sign`: signs a message using a key.

By implementing these methods, you can create a custom key storage backend that meets the specific needs of your application.

!!! tip
It means you don't have to follow the `Keyring` interface to manage your key, any existing Ethereum wallets are applicable to
Greenfield as well.


### Backend Options

The greenfield-cosmos-sdk provides different options for key storage, each with its own strengths and weaknesses. The choice of backend will depend on your specific use case. Here are the available options:

#### System Options

- **os**: This backend uses the `operating system`'s default credentials store to handle key storage operations securely.
  The keyring may be kept unlocked for the whole duration of the user session.

- **memory**: This backend uses a transient storage, meaning that Keys are discarded when the process terminates or the type
  instance is garbage collected.

#### Tools Options

- **file**: This backend stores the keyring encrypted within the app's configuration directory. This keyring will request a password each time it is accessed, which may occur multiple times in a single command resulting in repeated password prompts.

- **kwallet**: This backend uses the `KDE Wallet Manager` as a credentials management application.

- **pass**: This backend uses the `pass` command line utility to store and retrieve keys.

- **test**: This backend stores keys insecurely to disk. It does not prompt for a password to be unlocked and should
  only be used for testing purposes.


### Supported Sign Algorithms

The greenfield-cosmos-sdk supports as many sign algorithms as users want, but in Greenfield context, we only
support `eth_secp256k1` and `ed25519`. These algorithms were chosen for their security and compatibility with the
Ethereum and Tendermint ecosystems.