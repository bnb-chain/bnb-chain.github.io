# The Beacon Chain Blockchain

The purpose of the Beacon Chain blockchain and DEX is to create an alternative marketplace for issuing and exchanging digital assets in a decentralized manner.

## Consensus Details

Beacon Chain  is a peer-to-peer distributed system, connecting together multiple clients that reach consensus on their views of the "state of the world". Beacon Chain  uses [Tendermint](https://github.com/tendermint/tendermint) BFT consensus and has a dedicated `application layer` that runs upon it. A simplified overview of the application's architecture might look something like this:

```
+------------+-----------+
| RPC API    | Web API   |
+------------------------+---------+
| Asset Management | Match Engine  |
+----------------------------------+
| Account Management | Governance  |---------> crypto and blockchain governance
+----------------------------------+
| State Caching and Persisence     +-+
+----------------------------------+ |
| Consensus Protocol               | |
+----------------------------------+ |-----> revised Tendermint
| P2P Protocol                     | |
+----------------------------------+ |
| Networking    |  Database        +-+
+----------------------------------+

```

For more information, please have a look at the [Tendermint spec](https://github.com/tendermint/tendermint/blob/master/docs/spec/consensus/consensus.md).


## Node Roles

### What is a Validator Node?

Validators are a group/IT infrastructure that take the responsibility to maintain the Binance
Chain/DEX data and validate all the transactions. They join the consensus procedure and
vote to produce blocks. The fees are collected and distributed among all validators.
You can consider Validator as "miner" in Bitcoin and Ethereum and similar concepts exist in dPoS
blockchain as EOS or dBFT in NEO. The initial validators are selected from trusted members of the
Binance community, and will eventually expand to more members as the Binance blockchain and
ecosystem matures, this responsibility will be distributed. The decentralized governance procedure
will be introduced and executed. More qualified organization/individual can become Validators.


### What is a Witness Node?

Witness nodes represent the majority of nodes in a Beacon Chain  deployment. Although they do not join the consensus process
and produce blocks, they take care of:

- The witness consensus process.
- They serve as data replicas and help to propagate the chain state around the network.
- They receive transactions and broadcast them to all other nodes including Validator nodes.

### What is an Accelerated Node?
Please check [here](faq/faq.md#what-is-the-accelerated-node).

For testnet, there are 2 accelerated nodes setup as below. API users should try to use them directly.

- `testnet-dex-atlantic.binance.org`
- `testnet-dex-asiapacific.binance.org`

For mainnet, there are more accelerated nodes.

- `dex-atlantic.binance.org`
- `dex-asiapacific.binance.org`
- `dex-european.binance.org`

## Blocking

Beacon Chain  uses a similar block structure as Tendermint proposes, with a size limit of 1 megabyte.
It is expected a block will be produced on a-few-of-seconds level among validators, and can include
from 0 up to several thousands of transactions.

## Blockchain State

Blockchain state stores the below information:

- account and balances
- fees
- token information
- trading pairs
- tick size and lot size
- governance information

please note the transactions are not stored as chain state, because they are stored in blocks, while
trades are not stored as state either, because they can be reproduced via balances and transactions.

## Cryptographic Design

### Account and Address
For normal users, all the keys and addresses can be generated via Binance [Web Wallet](https://www.binance.org/en/create).

This default wallet would use a similar way to generate keys as Bitcoin, i.e. use 256 bits entropy to generate a 24-word mnemonic based on [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki), and then use the mnemonic and an empty passphrase to generate a seed; finally use the seed to generate a master key, and derive the private key using BIP32/BIP44 with HD prefix as `"44'/714'/"`, which is reserved at [SLIP 44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md).

*714 comes from Binance's birthday, July 14th. :)*

#### Keys
Beacon Chain  uses the same elliptic curve cryptography as the current [Bitcoin implementation](https://github.com/btcsuite/btcd/tree/master/btcec), i.e. `secp256k1`. Its private key is 32 bytes while public key is 33 bytes.

#### Address

Addresses on Beacon Chain  are 20 bytes and may be expressed as:
```
Address = RIPEMD160(SHA256(compressed public key))
```

Typically, an address is encoded in the [bech32](https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki) format which includes a checksum and human-readable prefix (HRP). However, it doesn't use the `SegWit` address format (because we do not have `SegWit` function anyway, so no `witness program version` etc.).

A Beacon Chain  address is therefore more similar to a [Bitcoin Cash address](https://github.com/bitcoincashorg/bitcoincash.org/blob/master/spec/cashaddr.md), which does not include a SegWit program script.

Address format pseudo-code:
```
Address_Bech32 = HRP + '1' + bech32.encode(convert8BitsTo5Bits(RIPEMD160(SHA256(compressed public key))))
```

For Beacon Chain  address, the prefix is `bnb` for production network, and `tbnb` for testnet.

#### Signature

Beacon Chain  uses an ECDSA signature on curve secp256k1 against a `SHA256` hash of the byte array of a JSON-encoded canonical representation of the transaction. For more information, please see [this page](./encoding.md#canonical-bytes-for-signing).
