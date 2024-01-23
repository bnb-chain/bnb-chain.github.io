# Token Bind

Token binding was introduced to faciliate that one token can circulate in both BC and BSC with confirmed total supply. 
- If a token is binded, then it can be transferred bewteen BC and BSC for different use cases.
After [the final sunset
hardfork](https://github.com/bnb-chain/bEPs/pull/333), the cross chain between BC and BSC will be shutdown. 
However, users still can use token recover tool to recover the binded assets on BSC (but it is much more complex compared to crosschain transfer).
- If a token is not binded, after the final sunset hardfork, the assets cannot be recovered anymore. 
Token owners or issuers should take actions to bind their valueable tokens.

***NOTE: The BC Fusion program is scheduled for implementation in April 2024. Please ensure careful planning for the
asset migration and keep the fund safe.***

Please check the tutorial [**Confirm if the Assets Support Cross-chain Transfers**](../users/assets.md) to verify if the
token allows cross-chain
transfers. If the answer is positive, congratulations! You don't need
to do anything. Otherwise, it is highly recommended to follow the
[Token Bind Tool](https://github.com/bnb-chain/token-bind-tool) to
deploy a BEP20 token on BSC and enable cross-chain functionality.

Due to the time limitation, the Token Issuer should take actions as soon as possbile. It is
recommended that the Token Issuer use multiple channels to promptly
notify asset holders to migrate as soon as possible.

***Note: BEP2/BEP8 assets that do not support cross-chain functionality
will be permanently lost after BC Fusion. Users will be unable to
recover these assets forever.***