# FAQ

## 1. What will happen during and after the final sunset hardfork?

Before executing Final Sunset, users still have the opportunity to transfer funds across chains. However, after Final
Sunset, cross-chain communication between the Beacon Chain and BSC will be completely stopped.

After Sunset Fork (i.e., post fusion), the validators in the Beacon Chain community will gradually shut down, and the entire chain will no
longer accept new transactions or propose new blocks.

Some of the funds will be permanently locked:

* On the Beacon Chain, the BEP2/BEP8 tokens that are not mirrored or bound to BSC.
* The BEP153 staking reward that is less than 0.1BNB or staked value which is less than 0.01BNB will be locked forever.

All these funds are not recoverable after the Final Sunset Fork.

After BC shutdown, the core dev team will dump the ledger of Beacon Chain and generate a merkle tree.
A governance proposal will be submitted to set the merkel root and approver account of the token migration contract.
A dapp (token recovery dApp) will be provided for token migration from Beacon Chain to BSC.
All the blockchain data of Beacon Chain will be uploaded to Greenfield, Filecoin and Arweave for archive.

## 2.What users should do to manage their BEP2/BEP8 assets before and after the fusion?

Before the final sunset hardfork:

* Users should cross-chain transfer the BNB and bound BEP2/BEP8 to the BSC network.

After the final sunset hadfork (i.e., post fusion):

* Users should wait for the release of [the token recovery dApp](token-recovery.md), and use the token recovery dApp to get the assets back on
  the BSC network.

Important: to use the token recovery dApp, the private key/mnemonic for your BC account will be used to prove that you
are the owner of the assets. Please take care of your key/mnemonic.

## 3. How do users access the balance snapshot post fusion?

* Several BC nodes (not validators) will be kept for users to query the blockchain data, including the user balances.
    - Testnet RPC Node: https://data-seed-pre-0-s1.bnbchain.org/
    - Mainnet RPC Node: https://dataseed1.bnbchain.org/
* An API endpoint will be kept for querying the snapshot balance.
    - Testnet API Endpoint: https://testnet-dex.bnbchain.org/api/v1/account/{tbnb_address}
    - Mainnet API Endpoint: https://dex.bnbchain.org/api/v1/account/{bnb_address}
* The snapshot file can be downloaded from Greenfield, R2, and so on. The users can download the snapshot file and set up
  a local BC node for retrieving any data on the blockchain.
    - Testnet/Mainnet snpashot file: https://github.com/bnb-chain/node-dump/blob/master/Readme.md

## 4. Can I still acccess the BC releated services or products after the fusion?

Most of the BC related services and products will be shut down after the final sunset hardfork, inluding and not limited to:

* Staking service (including UI/API) 
    - Testnet staking service: https://testnet-staking.bnbchain.org/en/staking
    - Mainnet staking service: https://www.bnbchain.org/en/staking
* Block service (including API)
    - Testnet block service: https://testnet-api.bnbchain.org/bc
    - Mainnet block service: https://api.bnbchain.org/bc/

Be noted: No snapshot will be provided for any of the BC related services and products.

The Beacon Chain Explorer will keep running for users to query the blockchain data, however,   
the explorer for BC testnet will be shut down if there is no query traffic for a long time.

* Explorer service (including UI)
    - Testnet explorer service: https://testnet-explorer.bnbchain.org/
    - Mainnet explorer service: https://explorer.bnbchain.org/

# Other Commonly Asked Questions

- [Recovering EOS Tokens from SafePal Wallet After BEP2 Shutdown](../faq/recovering-eos-token-from-safepal.md)

If your issue is not listed here, please explore our other documentation or open an issue.
