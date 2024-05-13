---
title: Key Management
order: 2
---

# Key Management

Greenfield blockchain is an application-specific chain without EVM.
As a result, its transaction data structure and API are different from those of BSC.
Greenfield will not support full functions in existing wallets, e.g. Transfer, Send Transactions, etc. 
However, these wallets can still sign transactions using the [EIP712](https://eips.ethereum.org/EIPS/eip-712) standard.
This standard allows wallets to display data in signing prompts in a structured and readable format. 
This is an [example](https://medium.com/metamask/eip712-is-coming-what-to-expect-and-how-to-use-it-bb92fd1a7a26) of how to use it in Metamask. 
Eventually, wallets will start supporting Greenfield directly.

## EIP-712 Support

The greenfield chain supports and only supports EIP-712 structured transaction.  These enable the existing wallet 
infrastructure to interact with Greenfield at the beginning naturally.

To achieve this, the following changes have been made.

1. An Ethereum-compatible RPC backend. Be noted that we only support necessary methods to connect a 
  wallet(`eth_chainId`, `eth_networkId`, `eth_blockNumber`, `eth_getBlockByNumber` and `eth_getBalance`). Other RPC methods are not implemented.
2. Same signing algorithm(`eth_scep256k1`) as Ethereum.

For developers, they can refer to [greenfield-go-sdk](https://github.com/bnb-chain/greenfield-go-sdk) and 
[greenfield-js-sdk](https://github.com/bnb-chain/greenfield-js-sdk) for easy integration.

## Keyring Interface

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


## Backend Options

The greenfield-cosmos-sdk provides different options for key storage, each with its own strengths and weaknesses. The choice of backend will depend on your specific use case. Here are the available options:

### System Options

- **os**: This backend uses the `operating system`'s default credentials store to handle key storage operations securely. 
The keyring may be kept unlocked for the whole duration of the user session.

- **memory**: This backend uses a transient storage, meaning that Keys are discarded when the process terminates or the type 
instance is garbage collected.

### Tools Options

- **file**: This backend stores the keyring encrypted within the app's configuration directory. This keyring will request a password each time it is accessed, which may occur multiple times in a single command resulting in repeated password prompts.

- **kwallet**: This backend uses the `KDE Wallet Manager` as a credentials management application.

- **pass**: This backend uses the `pass` command line utility to store and retrieve keys.

- **test**: This backend stores keys insecurely to disk. It does not prompt for a password to be unlocked and should 
only be used for testing purposes.
 

## Supported Sign Algorithms

The greenfield-cosmos-sdk supports as many sign algorithms as users want, but in Greenfield context, we only 
support `eth_secp256k1` and `ed25519`. These algorithms were chosen for their security and compatibility with the 
Ethereum and Tendermint ecosystems.