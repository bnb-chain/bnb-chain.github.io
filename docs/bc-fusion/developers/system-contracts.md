# Build-in System Contracts

GitHub Implementation link: https://github.com/bnb-chain/bsc-genesis-contract

| Contract Name                 | Contract Address                           | ABI File                                                                                                       |
|-------------------------------|--------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| Stake Hub Contract            | 0x0000000000000000000000000000000000002002 | [stakehub](https://github.com/bnb-chain/bsc-genesis-contract/blob/master/abi/stakehub.abi)                     |
| Stake Credit Contract         | 0x0000000000000000000000000000000000002003 | [stakecredit](https://github.com/bnb-chain/bsc-genesis-contract/blob/master/abi/stakecredit.abi)               |
| Governor Contract             | 0x0000000000000000000000000000000000002004 | [bscgovernor](https://github.com/bnb-chain/bsc-genesis-contract/blob/master/abi/bscgovernor.abi)               |
| Gov Token Contract            | 0x0000000000000000000000000000000000002005 | [govtoken](https://github.com/bnb-chain/bsc-genesis-contract/blob/master/abi/govtoken.abi)                     |
| Timelock Contract             | 0x0000000000000000000000000000000000002006 | [bsctimelock](https://github.com/bnb-chain/bsc-genesis-contract/blob/master/abi/bsctimelock.abi)               |
| Token Recover Portal Contract | 0x0000000000000000000000000000000000003000 | [tokenrecoverportal](https://github.com/bnb-chain/bsc-genesis-contract/blob/master/abi/tokenrecoverportal.abi) |

### Precompiled Contracts

### Secp256k1 Signature Recover

The precompiled contract is used to verify the signature of a message signed using the secp256k1 elliptic curve
cryptography algorithm. It will also retrun the Tendermint address of the signer.

### Verify Double Sign Evidence

The precompiled contract is used to verify the submitted double sign evidence,
which includes the two block headers signed by the same validator at different times.

## Build-in System Contracts

### Stake Hub Contract

The Stake Hub contract is a contract that manages the staking process, including delegation, undelegation, redelegation,
and claiming rewards.

### Stake Credit Contract

The Stake Credit contract is a template proxy contract. When a validator is created, a new stake credit contract is deployed,
to manage staking credit and facilitate the exchange between credit and BNB.

### Governor Contract

The Governor contract is a contract that manages the BNB Smart Chain governance process.
It allows users to propose and vote on changes to the protocol.

### Gov Token Contract

The Gov Token contract is a contract that manages the governance token, i.e., `govBNB`.

### Timelock Contract

The Timelock contract is a contract that allows executing a time lock on some specific operations (e.g., token
recovery).
After the timelock period, the locked tokens can be claimed or released.

### Token Recover Portal Contract

The Token Recover Portal contract is a contract that allows users to recover their BEP2/BEP8 tokens,
which must have been bound to BEP20 tokens, after the shutdown of the cross-chaind transfer between
BNB Smart Chain and BNB Beacon Chain. 



