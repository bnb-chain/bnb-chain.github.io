# Architecture

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

## Block Size

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

_714 comes from Binance's birthday, July 14th. :)_

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

Beacon Chain  uses an ECDSA signature on curve secp256k1 against a `SHA256` hash of the byte array of a JSON-encoded canonical representation of the transaction. For more information, please see [this page](encoding/encoding.md#canonical-bytes-for-signing).
