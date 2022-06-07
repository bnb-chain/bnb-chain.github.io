# Assets

Assets are stored as `tokens` on Beacon Chain , and the below management actions are available. All the assets are complied with [BEP2 standard](https://github.com/bnb-chain/BEPs/blob/master/BEP2.md). [BEP](https://github.com/bnb-chain/BEPs/blob/master/BEP1.md) stands for BNB Chain Evolution Proposal. Each BEP will be a proposal document providing information to the Beacon Chain /DEX community. The BEP should provide a concise technical specification of the feature or improvement and the rationale behind it. Each BEP proposer is responsible for building consensus within the community and documenting dissenting opinions. Each BEP has a unique index number.

## BEP2 Token Properties

- Source Address: Source Address is the owner of the issued token.

- Token Name: Token Name represents the long name of the token - e.g. "MyToken".

- Symbol: Symbol is the identifier of the newly issued token.

- Total Supply: Total supply will be the total number of issued tokens.

- Mintable: Mintable means whether this token can be minted in the future, which would increase the total supply of the token

### Symbol Convention:

[Symbol][b]-[Suffix]

Explanations: Suffix is the first 3 bytes of the issue transaction’s hash, for example: [BUSD-BD1](https://explorer.binance.org/asset/BUSD-BD1). It helps to remove the constraint of requiring unique token names. If this token pegs to an existing blockchain, there should be an additional suffix of “B”.

### Issue Process:

1. Issuer signed an issue transaction and broadcast it to one of Beacon Chain nodes
2. This Beacon Chain  node will check this transaction. If there is no error, then this transaction will be broadcasted to other Beacon Chain  nodes
3. Issue transaction is committed on the blockchain by block proposer
4. Validators will verify the constraints on total supply and symbol and deduct the fee from issuer’s account
5. New token’s symbol is generated based on the transaction hash. It is added to the issuer’s address and token info is saved on the Beacon Chain 

## BNB

The Binance Coin, `BNB`, is the native asset on Beacon Chain . There are 200MM BNB coins in total. There will be no mining. The existing coin burns and freezes will still be in effect on the new Beacon Chain  blockchain.

The exact number of BNB coins will be destroyed based on the same number of BNB ERC20 tokens that have already been destroyed.

Since Beacon Chain  is live, all BNB ERC20 tokens will be swapped for Beacon Chain  coins. All users who hold BNB ERC20 tokens can deposit them to Binance.com, and upon withdrawal, the new Beacon Chain  native coins will be sent to their new wallets.
