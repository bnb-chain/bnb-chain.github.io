---
sidebar_label: Token Migration
---

# Token Migration from Solana to BNB Smart Chain

Blockchain technology has gained superlative popularity over time, proving that it is here to stay. This popularity has resulted in a multitude of blockchain platforms that offer unique features for dapp development. As every blockchain platform has its pros and cons and differs from each other in terms of the underlying architecture, working mechanisms, etc., it is possible for blockchain-based projects and crypto tokens to migrate from one blockchain platform to another. For instance, from Solana to BNB Smart Chain (BSC), for better user experience by leveraging the innovative features of BSC.

Even though it has been only two years since its launch, BNB Chain has quickly gained a lot of popularity because of its compelling features of low cost and faster transaction rate. BSC is the largest network with an all-time high daily active users (DAU) of 2.2M on Dec 2021. At the time of writing, the current value of DAU of BNB Smart Chain is 1.2M with daily network usage of approximately 13% and more than 3.6B transactions, along with a [TVL of 6.14B](https://defillama.com/chain/BSC). Being the largest smart contracts-powered blockchain ecosystem, several projects that are based on other blockchain platforms are now migrating to the BNB Chain platform.

In this article, we dive into token migration from a non-EVM chain, Solana, to BSC. We provide an overview of what tokens are, supported tokens by BSC, migrating tokens from Solana to BSC, and migration of vested tokens.

## Overview of Tokens

Technically, "token" can be described as a term that is used for referencing cryptocurrencies or crypto-assets. However, with advancements in standards for cryptocurrencies and assets, the term token can be used in different contexts, since now tokens are functional in a wide spectrum of use cases. For example,, tokens can take up the form of cryptocurrencies, as well as, they can also be digital assets that run on top of other cryptocurrencies' blockchains. Nevertheless, all tokens in all forms can generally be traded or held like any other cryptocurrency.

## Importance of Tokens

In a blockchain-based decentralized ecosystem, tokens play a very important role in accomplishing various different purposes within a decentralized application's (dApp) ecosystem. Broadly, tokens can be divided into two categories, fungible and non-fungible. Fungible tokens are essentially representations of interchangeable assets on a blockchain and are usually used as cryptocurrencies. Other important classifications of tokens based on usage are as follows:

- **DeFi tokens:** DeFi protocols and dapps are aimed at rendering traditional financial-system functions (lending, borrowing, saving, insurance, trading, etc.). DeFi tokens essentially power DeFi apps and protocols and are programmable to perform payments as well as transaction flows. These are also tradable or can be held like any other cryptocurrency.
- **Utility Tokens:** are designed to serve particular purposes within a specific application/protocol's ecosystem. These further allow users to be part of the decision-making process of a specific network. Additionally, utility tokens are unique to their ecosystem and are non-mineable cryptocurrencies. These are usually pre-mined, created all at once, and distributed in a manner chosen by the team behind the project.
- **Governance tokens:** these are specialized tokens that authorize holders the right to vote on issues related to the governance of the development and operations of a blockchain project. It's a method for projects to distribute decision-making power to their communities. This decentralized governance model helps align the interests of the token holders with that of the project.
- **Non-Fungible Tokens (NFTs):** NFTs are used for representing ownership rights to a unique digital or real-world asset. These allow the tokenization of real-world things like art, collectibles, real estate, etc. Ownership of an asset is secured by the blockchain network as no one can modify the record of ownership or copy/paste a new NFT into existence.
- **Security tokens:** are a new class of assets that aim to be the crypto equivalent of traditional securities like stocks and bonds. Their main use case is to sell shares in a company (very much like the shares or fractional shares sold via conventional markets) or other enterprises (for instance, real estate) without the need for a broker. Major companies and startups have been reported to be investigating security tokens as a potential alternative to other methods of fundraising.

## Token Standards

With blockchain technology gaining unprecedented popularity there is a multitude of blockchain projects issuing their own tokens on different blockchains. It is important to make sure that these tokens are compatible with the underlying blockchains and adhere to the platform's token standards.

To ensure compatibility, interoperability, and security, token standards are issued. token standards are designed to help avoid fraud, technical incompatibilities between tokens, and issuance of tokens not aligned with the blockchain's principles. These are essentially a set of rules defining the issuance and implementation of new tokens. Some of the most commonly included rules in these token standards include the token's total supply limit, minting process, burning process, and process for performing transactions using the token.

### ERC Token Standard

One of the most widely used token standards is the ERC standard. Ethereum Request for Comments (ERC) is a set of rules defining the issuance and implementation of tokens on the Ethereum Blockchain. ERC20 is a technical standard that describes a common set of rules that should be followed for a token to function properly within the Ethereum ecosystem. It is one of the most commonly used standards and is usually used for fungible tokens in the form of cryptocurrencies. Other popular ERC standards are ERC-721 (NFTs) and ERC-1155 Multi-Token standard.

#### BEP Token Standard

Similarly to ERC, BNB Chain defines its own set of standards for token issuance, management, and implementation known as BEP (BNB Chain Evolution Proposals). BEPs are token management rules and pre-defined criteria for launching on-chain assets on BNB Chain. The most popular BEP standards are BEP2 and BEP20. BEP2 is the native coin of the BNB Beacon Chain. Whereas, BEP20 is popular for use on BSC. It is to note here that BEP20 is very similar to ERC20 and extends its functionality. Note that, BNB which is the native token of the BNB Chain ecosystem, is also a BEP20 token.

#### SPL Token Standard

Famous for its parallel execution engine, the Solana blockchain was launched in 2017 and is currently amongst the popular blockchain ecosystems. SOL is the native token of the Solana ecosystem and is essentially a Utility token. SOL uses the SPL protocol. Similar to the ERC standard on Ethereum and BEP on BSC, [Solana Program Library (SPL)](https://spl.solana.com/token) is the token standard of the Solana blockchain. SPL is a collection of on-chain programs that target Solana's "Sealevel" parallel runtime. The Token Program on Solana defines a common implementation for Fungible and Non-Fungible tokens. The SOL token has two main use cases:

- Paying for transaction fees incurred when using the network or smart contracts.
- Staking tokens as part of the Proof of Stake consensus mechanism.

### Token Standards Supported by BSC

BNB Chain is an ecosystem that runs on two blockchain giants, namely, BNB Beacon Chain (BC) and BNB Smart Chain (BSC). The native token standard for BNB Beacon Chain is BEP2, while the native token standard for BNB Smart Chain is BEP-20. BNB Ecosystem's native currency, BNB, initially launched as an ERC20 token, is a BEP2 token.

#### BEP2 Tokens

The BNB Beacon Chain is responsible for the governance of the BNB Chain ecosystem which includes staking and voting. BEP2 is the token standard for BNB Chain's native currency, BNB, on Binance's crypto exchanges. It is a unique token standard, BEP2 is not compatible with blockchains other than BNB Chain. Additionally, BNB in the BEP2 format can only be used as a transaction fee on both Binance cryptocurrency exchanges. One limitation of BEP2 is its lack of support for smart contract development. For more information, you can read the full BEP2 proposal [here](https://github.com/bnb-chain/BEPs/blob/master/BEP2.md).

#### BEP20 Tokens

BSC is the blockchain component of the BNB Chain that provides its users with a smart contract facility and is a platform for dApp development. BEP20 is a token interface standard for creating token contracts on BSC. The BEP20 tokens are designed to be compatible with BEP2 and[ERC20](https://eips.ethereum.org/EIPS/eip-20). It extends ERC20 for compatibility with EVM chain and Ethereum smart contracts. Other than the ERC20 functionalities, the BEP20 standard contains additional interfaces, such as getOwner and decimals. For more information on BEP20, read the full proposal [here](https://github.com/bnb-chain/BEPs/blob/master/BEP20.md).

## Token migration

Often blockchain projects begin as whitepapers promising innovative technologies to follow in the future. However, there can be multiple twists and turns in the process of transforming from a design paper to a real product. One such can be choosing to move to an entirely different blockchain than that proposed initially. In such scenarios, it is possible for projects to require a token migration, also known as a token swap. Token migration is a process that involves transmitting a token holder's balance on one blockchain to another blockchain. In this section, we cover token migration from Solana to BSC.

### Migrating Tokens from Solana to BSC

The process of bridging between Solana and BNB Smart Chain (BSC) is a little difficult because they are not compatible chains. There are two options to migrate your tokens from Solana to BSC. First, you can use cross-chain bridges to migrate the tokens to BSC from Solana. The second is to create new tokens on the BSC network, deposit equivalent amounts to the holders and discontinue the previously deployed token on Solana. In this section, we provide readers with a guide on how to create custom BEP20 tokens on BSC and later how to bridge tokens from Solana to BSC.

#### Creating BEP20 Token on BSC

BEP20 is BSC's equivalent version of the ERC20 token standard for Ethereum. The difference between the two is that BEP20 Tokens are only compatible with the BSC network. Nevertheless, as BSC is Ethereum Virtual Machine (EVM) based both ERC20 and BEP20 are practically identical in both specification and implementation. In this section, we provide you with a walkthrough on how to create custom BEP20 tokens.

For this tutorial, we will be using [Remix IDE](https://remix.ethereum.org/) for compiling and deploying BEP20 token smart contracts onto the BSC test network.

#### Pre-requisites
[_For details, refer here_​](https://docs.bnbchain.org/docs/remix-new#pre-requisites)**

There is no need for any local environment settings for compiling and deploying Solidity smart contracts on BSC using the Remix IDE.

All you require is a browser-based Web3 wallet (e.g. [MetaMask](https://metamask.io/)) to interact with the BSC Testnet and deployed contracts. If you are already using [MetaMask](https://metamask.io/), it is recommended to create a new account for testing with Remix IDE. You can do this from the account menu, which appears when you click on the account avatar in the top right corner of the MetaMask interface, for more details refer [here](https://metamask.zendesk.com/hc/en-us/articles/360015289452-How-to-create-an-additional-account-in-your-wallet#:~:text=Either%20tap%20the%20account%20icon,the%20account%20to%20change%20it.).

You must set up all of the following prerequisites to be able to deploy your solidity smart contract on BSC:

- [Download Metamask wallet](https://metamask.io/)
- [Configure BNB Smart Chain Testnet on Metamask](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain)
- [Get BNB testnet tokens](https://testnet.bnbchain.org/faucet-smart)

#### Setting Up Remix IDE
[_For details, refer here_](https://docs.bnbchain.org/docs/remix-new#setting-up-remix-ide)

- Remix is an online IDE to develop smart contracts.
- You need to choose Solidity Compiler, Choose the appropriate compiler version. We used 0.8.17 for this tutorial.

![img](./token-1.png)

#### Creating a Workspace in Remix IDE

- Click on the plus icon to create a new workspace. 

![img](./token-2.png)

- Choose OpenZeppelin's ERC20 template; give a meaningful name to your workspace and press ok.

![img](token-3.png)

- Remix will create a smart contract "MyToken.sol" for you as well as will import any dependencies. We can edit this "MyToken.sol" to create our own ERC20 tokens.

![img](token-4.png)

#### Writing the Smart Contract

[_For details, refer here_](https://docs.bnbchain.org/docs/remix-new#writing-the-smart-contract)

- Open the "MyToken.sol" file and replace the token name and symbol with that of your choice, as shown in the code below

```
SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BEP20 is ERC20 {
    constructor(uint256 initialSupply) ERC20("BEP20Test", "BPT") {
        \_mint(msg.sender, initialSupply);
    }
} 

```

- Rename the MyToken.sol file to the name of your token, BEP20.sol in our case.

![img](token-5.png)

- Compile the smart contract

![img](token-6.png)

- Deploy the smart contract. Make sure that your MetaMask wallet is configured for use with the BNB Smart Chain Testnet. Select inject provider in the environment variable and make sure you see your connect account address in the Account field. Click on the Deploy button to deploy the BEP20 token smart contract. Our smart contract takes initialSupply as a parameter to the constructor that would create that many tokens at the time of deployment.

![img](token-7.png)

- The input field next to the Deploy button is the place to specify the initialSupply parameter. For e.g. if you want to create 100 tokens, then pass 100000000000000000000 and then click on "Deploy".
- You will need to accept a MetaMask transaction as it will cost BNB to deploy something to the network. Confirm the transaction by pressing the confirm button on the metamask notification

![img](token-8.png)

- To view your tokens in your metamask wallet follow [this](https://metamask.zendesk.com/hc/en-us/articles/360015489031-How-to-display-tokens-in-MetaMask) tutorial.

![img](token-9.png)

## Bridging Tokens from Solana to BSC

With several different blockchain platforms available for development, of the varied underlying architecture, consensus mechanism, etc., interoperability and cross-communication between these platforms with respect to token and data transfers can be nearly impossible. Blockchain bridges are designed to overcome this hindrance of interoperability and provide a secure mechanism for decentralized token transfers.

A cross-chain bridge connects independent blockchains and enables the transfer of assets and information between them, allowing users to access other protocols easily. One thing critical to understand is how cross-chain bridges actually work. Cross-chain bridges work by "wrapping" tokens in a smart contract and issuing native assets you can use on another chain. For e.g., wrapped BTC (wBTC) is an ERC-20 token that uses BTC as collateral. Users must deposit BTC on the Bitcoin blockchain before receiving wBTC tokens on the Ethereum network.

In this section of the article, we describe how to use the [Portal Bridge](https://www.portalbridge.com/) for bridging tokens from Solana to BSC. One thing to remember is to be able to see your deployed custom token on the Portal bridge, you will have to get your token whitelisted by the Portal bridge's team. For this tutorial, we will be bridging a more commonly supported USDC token from the Solana blockchain to BSC using the [Portal Bridge](https://www.portalbridge.com/).

### Wormhole's Portal Bridge

Wormhole's Portal Bridge allows you to bridge tokens across different chains. Instead of swapping or converting assets directly, Wormhole locks your source assets in a smart contract and mints new Wormhole-wrapped assets on the target chain. You can then swap Wormhole-wrapped assets on an exchange for other assets on the target chain. This tutorial can be used to bridge your assets between Solana and other chains, including BSC, using Wormhole.

### Using Portal Bridge to Bridge Tokens from Solana to BSC

One thing to remember is to be able to see your deployed custom token on the Portal bridge, you will have to get your token whitelisted by the bridge's official team. For this tutorial, we will be bridging a more commonly supported USDC token from the Solana blockchain to BSC using the [Portal Bridge](https://www.portalbridge.com/).

- Navigate to the [Portal Token Bridge](https://www.portalbridge.com/)

![](token-10.png)

The bridging process involves four primary steps, as indicated on the landing page:

- Source selection
- Target selection
- Sending tokens
- Redeeming tokens

In this guide, we will be bridging from Solana to BSC.

**Step 1: Select Source Chain, Target Chain, and Source Token**

- On "Source," select the chain from which you want to bridge. In this case, the tokens are on the Solana blockchain, so Solana is selected as our "Source."
- "Target" is the chain to which the tokens will be bridged. Select BNB Smart Chain as your "Target."

![](token-11.png)

- After selecting Source and Target, click "Connect." This will prompt a pop-up from the Source wallet, which is Phantom in this guide.
- When the wallet is connected, the "Select a Token" button will appear.
- Select the Source Token. These are the tokens that you want to bridge or swap from Solana. In this guide, we'll be bridging USDCso from Solana to BSC.

![](token-12.png)

**Note:** The "Featured" tokens at the top of the drop-down menu are those with liquidity on Solana, and there are links to the exchanges where you can swap these tokens. Do not select tokens besides those in the Featured category. You may accidentally bridge a token with little or no liquidity on Solana, and you won't be able to swap them.

- After selecting the token you want to bridge, the interface will display the current balance of the selected Source Token.
- Select the amount of tokens you want to bridge. Then, click "Next."

![](token-13.png)

**Step 2: Select Target Chain and Connect Target Wallet**

- Select your Target Chain. This is the chain to which you want to bridge your tokens.

![](token-14.png)

- Click "Select Wallet." This will prompt a pop-up from the native wallet of your Target Chain. In this guide, we'll be using Metamask.
- On the pop-up, click "Connect."
- The "Create Associated Account" button will now appear. Click this button to create a token account in your Metamask wallet where your tokens will appear.

![](token-15.png)

- When you click "Create an Associated Account," a pop-up from the Target Wallet will appear. Click "Approve."

**Step 3: Send Tokens**

- Your Source Wallet will now be connected, and your token's associated account will be ready. Click "Transfer" to initiate the transaction.

![](token-16.png)

- Click "Confirm" in the site pop-up.
- Click "Confirm" in your wallet pop-up. This will approve paying gas to transfer tokens from the chain you want to bridge from. **Note:** You will be paying transaction fees on the sending as well as receiving side.

**Step 4: Redeem Tokens**

- Click "Redeem" to initiate the transfer to your Target Wallet.
- A series of pop-ups (typically four) will appear from your Target Wallet.
- Approve each of these transactions to continue.
- Remember: Transaction fees on the receiving side need to be paid in the Target chain's native token.

[**Reference Tutorial:**](https://blog.hubbleprotocol.io/how-to-get-started-on-solana-part-2-bridging-tokens/)

## Migrating Vested Tokens from Solana to BSC

In crypto-space, _**Vesting**_ is known as the process of locking and distributing purchased tokens within a particular timeframe called the _**Vesting Period**_. Vested tokens can be described as a certain amount of tokens that are held aside for a particular time period usually for the team members, partners, advisors, and others who are contributing to the development of the project.

Vested tokens are locked in a smart contract and released automatically until certain conditions are met. Vesting basically gives the impression that the team is highly interested in the project, and aims to continue working on the project development. Additionally, vesting lowers market price manipulations.

There are two options available for migrating vested tokens from Solana to BSC.

- Migrate the vesting contract and move the vesting schedule from Solana to BSC.
- Migrate the tokens and release them as per schedule.

### Migrating Vesting Contract

Vesting is essentially a smart contract that has all of the vested tokens locked up which are released over a time period automatically when certain conditions are met. One of the possible ways to migrate vested tokens from the Solana blockchain to BSC is to migrate the vesting contract from the Solana blockchain to BSC. One thing to remember here is that Solana uses the RUST programming language for writing smart contracts. Whereas, smart contracts in BSC are usually written in the Solidity programming language. This language incompatibility means that either you would have to re-write your smart contract in Solidity from scratch or use rust-compatible EVM solutions on BSC for running rust-based smart contracts.

### Migrating Vesting Tokens

As both Solana and BSC have completely different token standards, even though the tokens can be bridged, a better approach is to mint new tokens on the BSC. The migrating project's team can ask the holders of its vested tokens to exchange the already bought vested tokens with a newly created equivalent token on BSC within a given time frame and continue the release of vested tokens as per schedule. Another way is to take a snapshot of the vested token holders and update their wallets with an equivalent amount of new tokens and continue with the vesting schedule and release of tokens.

## Conclusion

With several advantages and an ecosystem that supports Web3 development, BNB Chain has gained much attention from developers and blockchain projects. Several blockchain projects are now choosing to migrate their blockchain projects and crypto tokens from non-EVM-based chains like Solana to BSC which is an EVM-based chain. In this article, we provided a brief overview of token migration from Solana to BSC, covering an overview of crypto tokens, how to create custom tokens on BSC, how to bridge assets from Solana to BSC, and how to migrate vested tokens.