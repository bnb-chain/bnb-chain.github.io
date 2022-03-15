---
sidebar_label: Token Circulation Model
hide_table_of_contents: false
sidebar_position: 2
---

# Circulation Model

BC and BSC share the same token universe for BNB and BEP8/BEP2/BEP20 tokens. This defines:

- The same token can circulate on both networks, and flow between them bi-directionally via a cross-chain communication mechanism. 
- The total circulation of the same token should be managed across the two networks, i.e. the total effective supply of a token should be the sum of the token’s total effective supply on both BSC and BC.
- The tokens can be initially created on BSC as a BEP20, or on BC as a BEP2, then created on the other. There are native ways on both networks to link the two and secure the total supply of the token.

## Peg Account
To secure the total circulation of the token on both chains, we introduce `Peg Account` to lock tokens on chain.
`Peg Account` is a pure-code-controlled account that no one has the right to access to the account.
 
- For BC, the `Peg Account` is `bnb1v8vkkymvhe2sf7gd2092ujc6hweta38xadu2pj`. (`tbnb1v8vkkymvhe2sf7gd2092ujc6hweta38xnc4wpr` for testnet) 
- For BSC, the `Peg Account` is [TokenHub](https://bscscan.com/address/0x0000000000000000000000000000000000001004) contract.

## Bind
Token Binding can happen at any time after BEP2/BEP8 and BEP20 are ready. The token owners of either BEP2/BEP8 or BEP20 only need to complete the **Binding** process when a cross-chain feature is necessary.

**Binding** process helps to build the relationship between the two tokens on BC and BSC. It will ensure that the two tokens share the same symbol and same total supply. The most important part is that it will reallocate the circulation on both chains to ensure the total circulation equals the total supply. 

Let's walk through an example:

1. Bob issues BTC on BC with a total supply of 10, and he sends Alice 2 BTC.
2. Bob issues BTC on BSC with a total supply of 10, and he sends Tom 1 BTC.

Now Bob wants BTC to flow between BC and BSC, but the total circulation on BC and BSC is 20=10+10 BTC which is not correct, so he decided to bind these two tokens. He made a decision that 8 BTC circulation on BC and 2 BTC circulation on BSC, then he started a bind transaction.

The BC execution engine will:
1. Transfer 2 BTC from Bob's account to `Peg Account`. 
2. Emit a cross-chain event.

For now, on BC, Bob has 6 BTC, Alice has 2 BTC, 2 BTC is locked in `Peg Account`, circulation on BC is 8 BTC.

The Relayer watches the cross-chain event on BC, and sends a transaction to [TokenManager](https://bscscan.com/address/0x0000000000000000000000000000000000001008) contract on BSC.

Then Bob invokes the BTC contract on BSC to approve [TokenManager](https://bscscan.com/address/0x0000000000000000000000000000000000001008) to spend 8 BTC of his account.
After that Bob approves the bind request by invoking [TokenManager](https://bscscan.com/address/0x0000000000000000000000000000000000001008). 
The [TokenManager](https://bscscan.com/address/0x0000000000000000000000000000000000001008) will transfer 8 BTC from Bob's account to `Peg Account`.
 
For now, on BSC, Bob has 1 BTC, Tom has 1 BTC, 8 BTC is locked in `Peg Account`, circulation on BSC is 2 BTC.

The binding process ends here, and the total circulation on both chains is 10 BTC which equals to its total supply.

## Cross Chain Transfer

When one token transfer from the native chain to the parallel chain, the process is:
1. Token transfer from the sender to `Peg Account` on the native chain.  
2. Token transfer from `Peg Account` to the receiver on the parallel chain.

## Burn
When a user burns a certain amount of token on the native chain, there is no need to burn on the parallel chain.

Let's walk through an example:

1. The circulation on BC is 5 BTC, and 5 BTC on BSC.
2. User burns 2 BTC on BC.
3. Now circulation on BC is 3 BTC, and 5 BTC on BSC. 
4. The total circulation is 8 now which is expected.


## Mint
When a user mints a token on the native chain, but does not mint it on the parallel chain, it may cause an issue that users can not cross transfer all tokens from the native chain to the parallel chain.

Let's walk through an example:

1. The circulation on BC is 5 BTC, and the locked token is 5 BTC.
2. The circulation on BSC is 5 BTC, and the locked token is 5 BTC.
3. User mint 2 BTC on BC.
4. It will fail if the user tries to transfer 7 BTC from BC to BSC, because the balance of `Peg Account` on BSC is 5 BTC and can’t afford to unlock 7 BTC.

The best practice for mint is:

1. Mint token on the native chain.
2. Mint token on the parallel chain.
3. Transfer the mint token to `Peg Account` on the parallel chain.   