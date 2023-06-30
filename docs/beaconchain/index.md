# BNB Beacon Chain Documentation

Welcome to the BNB Beacon Chain documentation site!

Please note that both the BNB Beacon Chain software and this documentation site will improve over time and is still a work-in-progress.<br/>
Be sure to engage with our community channels to stay updated.

Have fun trading and see you on chain!

## What are BNB Beacon Chain and Binance DEX?

[BNB Beacon Chain](https://www.bnbchain.org) is a blockchain software system developed by its community.
Binance DEX refers to the decentralized exchange features developed on top of BNB Beacon Chain.

Please read the [FAQ](faq/faq.md) to get started.

## What is BNB Smart Chain?

[BNB Smart Chain](https://www.bnbchain.org/en/smartChain) is an innovative solution to bring programmability and interoperability to BNB Beacon Chain . BNB Smart Chain relies on a system of [41 validators with Proof of Staked Authority (PoSA)](https://https://github.com/bnb-chain/whitepaper/blob/master/WHITEPAPER.md) consensus that can support short block time and lower fees. The most bonded validator candidates of staking will become validators and produce blocks. The double-sign detection and other slashing logic guarantee security, stability, and chain finality.

Please read the [FAQ](../BSC-FAQs-general.md) to get started.


## What can I do with BNB Beacon Chain ?

The purpose of the new blockchain and DEX is to create an alternative marketplace for issuing and exchanging digital assets in a decentralized manner.

You can:

- [Send and receive BNB](transfer.md#web-wallet)
- [Issue new tokens to digitalize assets](https://community.binance.org/topic/2487), and use BNB Beacon Chain  as underlying exchange/transfer
network for the assets
- Send, receive, [burn](tokens.md#burn)/[mint](tokens.md#mint) and [freeze/unfreeze](tokens.md#freeze-unfreeze) tokens
- [Sumbit an on-chain governance proposal for BNB Smart Chain ](learn/bsc-gov.md)


**For traders**, you can:

- [Propose to create trading pairs](list_instruction.md) between two different tokens
- [Send orders](learn/trading-interface.md) to buy or sell assets through trading pairs created on the chain with[SDK](exchange-integration.md#sdks)
- [Watch the DEX market](develop/api-reference/dex-api/paths.md#apiv1markets) to confirm price and market activity of certain assets

**For developers**, you can also:

- Explore the transaction history and blocks on the chain, via [BNB Beacon Chain  Explore](https://explorer.binance.org), [API](develop/api-reference/dex-api/paths.md)
and [node RPC](develop/api-reference/node-rpc.md) interfaces.
- Run a [full node](fullnode.md) to listen to and broadcast live updates on transactions, blocks, and consensus activities
- Extract other data of BNB Beacon Chain  via full node or [APIs](develop/api-reference/dex-api/paths.md#apiv1markets)
- [Develop tools](exchange-integration.md#sdks) and application to help users use BNB Beacon Chain  and Binance DEX

## What can I do with BNB Smart Chain ?

BNB Smart Chain  (BSC) is best described as a blockchain that runs in parallel to the BNB Beacon Chain . Unlike BNB Beacon Chain , BSC boasts smart contract functionality and compatibility with the Ethereum Virtual Machine (EVM). The design goal here was to leave the high throughput of BNB Beacon Chain  intact while introducing smart contracts into its ecosystem.

Because BSC is EVM-compatible, it launched with support for the rich universe of [Ethereum](https://academy.binance.com/en/articles/what-is-ethereum) tools and DApps. In theory, this makes it easy for developers to port their projects over from Ethereum. For users, it means that applications like [MetaMask](../wallet/metamask.md) can be easily configured to work with BSC. Seriously – it’s just a matter of tweaking a couple of settings. Check out [Use MetaMask for BNB Smart Chain ](../wallet/metamask.md) to get started.

You can:

- Send and receive [BNB](https://docs.bnbchain.org/docs/binance#transfer-testnet-bnb-from-bsc-to-bc) and other [BEP2 tokens](https://docs.bnbchain.org/docs/binance#swap-testnet-bep2-token-to-its-bep20-equivalent) cross-chain
- Explore the transaction history and blocks on the chain, via [bscscan](https://bscscan.com), API
and node RPC interfaces.
- [Stake you BNB](../wallet/staking.md) to earn some block rewards

**Developers** can also:

- [Issue](../issue-BEP20.md) new tokens to digitalize assets
- [Migrate](https://github.com/bnb-chain/bsc-develop-ecosystem) existing DApps
- Run a [full node](fullnode.md) to listen to and broadcast live updates on transactions, blocks, and consensus activities
- [Develop wallets](../wallet/wallet_api.md) and tools to help users use Dapps

## Comparision Between BC and BSC

|                   | BNB Beacon Chain  | BNB Smart Chain                     |
| ----------------- | ------------- | -------------------------------------- |
| Consensus         | DPoS          | PoSA                                   |
| No. of Validators | 11            | up to 50                               |
| Mean Block Time   | <1s           | ~5s                                    |
| Programmability   | BEPs          | Support EVM-compatible smart contracts |
| Cross Chain       |[BEP3](https://github.com/bnb-chain/BEPs/blob/master/BEP3.md) introduces *Hash Timer Locked Contract functions* and further [mechanism](https://community.binance.org/topic/1892) to handle inter-blockchain tokens peg.    | BSC comes with efficient [native dual chain communication](../learn/cross-chain.md); Optimized for scaling high-performance dApps that require fast and smooth user experience.                    |

## Get Started

Want to try it **BNB Beacon Chain **? Just give a peek at the first few of pages of the [getting started guide](get-started.md).<br/>
You could also have a read through the [FAQ](faq/faq.md).

Want to develop on **BNB Smart Chain **? First, read through the [FAQ](../BSC-FAQs-general.md) and learn about tokens [here](../BEP20.md).

## Asset Management

### BEP2 Asset

BNB Beacon Chain  is essentially a digital asset creation and exchange platform.<br/>
The features listed below are currently supported on BNB Beacon Chain :

- [The Issuance, Burning, Minting and Freezing of Tokens](tokens.md)
- [Transfer of Tokens](transfer.md)

### BEP20 Asset

A token protocol on BSC which is compatible with BEP2 and [ERC20](https://eips.ethereum.org/EIPS/eip-20). It extends ERC20 and contains more interfaces, such as `getOwner` and `decimals`. Read the full proposal here: <https://github.com/bnb-chain/BEPs/blob/master/BEP20.md>

- [Issue BEP20](../issue-BEP20.md)
- [Wallet](../Wallet.md)

## BNB (and Other Coins) MainNet Switch

Build N Build Coin (BNB) was an ERC20 token on the Ethereum network. After the launch of BNB Beacon Chain, Build N Build Coin (BNB) is being converted into native BNB tokens on the main network via the exchange platform at [binance.com](https://www.binance.com), a pragmatic and efficient way to perform the initial token swap.

BNB Beacon Chain  is ready for other projects to migrate their tokens to take advantage of performant transactions with more liquidity options and native marketplace features.<br/>
More information about how projects can set themselves up for this (via [binance.com](https://www.binance.com) or partners) will come soon.

## BNB Staking

Please read the guide [here](../wallet/staking.md)

## Trading on Binance DEX

Binance DEX is the native marketplace on BNB Beacon Chain , allowing you to exchange digital assets issued and listed on it.<br/>
The matching happens within the blockchain nodes and all of the transactions are recorded on-chain, therefore forming a complete, auditable ledger of activity.

**ATTENTION**: The match logic on DEX is quite different from normal centralized exchange.<br/>
Please go over the trading and match spec below to get the best interests for your orders.

- [Trading Spec](trading-spec.md)
- [Match Logic](match.md)
- [Anti-front-running](anti-frontrun.md)

## Technology Details
Continue reading below if you are interested in what is happening under the hood!

- [BNB Beacon Chain  as a Block Chain](blockchain.md): about consensus, software stack, network layout and roles.
- [Connect to BNB Beacon Chain ](chain-access.md): how to connect to BNB Beacon Chain  and DEX via different ways.
- [Run a BNB Beacon Chain  full node](fullnode.md): how to run a full node and become part of the p2p network of BNB Beacon Chain .
- [Run a BNB Beacon Chain  light client](light-client.md): how to run a light client.
- [BNB Beacon Chain  Governance](governance.md): about proposal, vote, and join as a validator.

## Acknowledgement
Thanks to the [community, our partners and supporters](acknowledgement.md).
