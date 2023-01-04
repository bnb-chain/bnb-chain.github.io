# Escrow Accounts
A purely-code-controlled escrow account is a kind of account which is derived from a hard-coded string in Beacon Chain protocol. This kind of account doesn't have its own private key and it's only controlled by code of the protocol. The code for calculating escrow account is the same that is used in cosmos-sdk.

## Addresses of Escrow Accounts

### Governance module
A purely-code-controlled escrow account is created for holding deposits during voting period.

Address in mainnet: `bnb1vu5max8wqn997ayhrrys0drpll2rlz4dh39s3h`

Address in testnet: `tbnb1vu5max8wqn997ayhrrys0drpll2rlz4deyv53x`
```go
// bnb prefix address: bnb1vu5max8wqn997ayhrrys0drpll2rlz4dh39s3h
// tbnb prefix address: tbnb1vu5max8wqn997ayhrrys0drpll2rlz4deyv53x
DepositedCoinsAccAddr = sdk.AccAddress(crypto.AddressHash([]byte("BinanceChainDepositedCoins")))
```

### Staking module
A purely-code-controlled escrow account is created for holding delegations.

Address in mainnet: `bnb1j725qk29cv4kwpers4addy9x93ukhw7czfkjaj`

Address in testnet: `tbnb1j725qk29cv4kwpers4addy9x93ukhw7cvulkar`
```go
// bnb prefix address: bnb1j725qk29cv4kwpers4addy9x93ukhw7czfkjaj
// tbnb prefix address: tbnb1j725qk29cv4kwpers4addy9x93ukhw7cvulkar
DelegationAccAddr = sdk.AccAddress(crypto.AddressHash([]byte("BinanceChainStakeDelegation")))
```

### Bridge module
A purely-code-controlled escrow account is created to secure the total circulation of the token on both chains.

Address in mainnet: `bnb1v8vkkymvhe2sf7gd2092ujc6hweta38xadu2pj`

Address in testnet: `tbnb1v8vkkymvhe2sf7gd2092ujc6hweta38xnc4wpr`
```go
// bnb prefix address: bnb1v8vkkymvhe2sf7gd2092ujc6hweta38xadu2pj
// tbnb prefix address: tbnb1v8vkkymvhe2sf7gd2092ujc6hweta38xnc4wpr
PegAccount = sdk.AccAddress(crypto.AddressHash([]byte("BinanceChainPegAccount")))
```

### Token module
A purely-code-controlled escrow account is created to facilitate atomic swaps.

Address in mainnet: `bnb1wxeplyw7x8aahy93w96yhwm7xcq3ke4f8ge93u`

Address in testnet: `tbnb1wxeplyw7x8aahy93w96yhwm7xcq3ke4ffasp3d`
```go
// bnb prefix address: bnb1wxeplyw7x8aahy93w96yhwm7xcq3ke4f8ge93u
// tbnb prefix address: tbnb1wxeplyw7x8aahy93w96yhwm7xcq3ke4ffasp3d
AtomicSwapCoinsAccAddr = sdk.AccAddress(crypto.AddressHash([]byte("BinanceChainAtomicSwapCoins")))
```

Another purely-code-controlled escrow account is created to facilitate time locks.

Address in mainnet: `bnb1hn8ym9xht925jkncjpf7lhjnax6z8nv24fv2yq`

Address in testnet: `tbnb1hn8ym9xht925jkncjpf7lhjnax6z8nv2mu9wy3`
```go
// bnb prefix address: bnb1hn8ym9xht925jkncjpf7lhjnax6z8nv24fv2yq
// tbnb prefix address: tbnb1hn8ym9xht925jkncjpf7lhjnax6z8nv2mu9wy3
TimeLockCoinsAccAddr = sdk.AccAddress(crypto.AddressHash([]byte("BinanceChainTimeLockCoins")))
```