# Wallet provider for Dapps 

A wallet provider is a service that allows DApps to provide wallets to their end-users without having to deal with the security concerns of key management. It is a great way to make your Dapp ready to onboard a more mainstream audience.

[Arkane](https://arkane.network/?utm_source=binance&utm_medium=documentation) allows you to easily integrate your app with the BNB Smart Chain, whether you already have an Dapp integrated with web3 or are building a new application from scratch. Arkane provides a smooth and delightful experience for you, your users on both web and mobile.

Arkane will help you interact with the BNB Smart Chain, create blockchain wallets, create different asset types such as fungible (BEP20, ERC20), and non-fungible tokens - NFTs - (ERC721, and ERC1155) and interact with smart contracts. Next to a superior developer experience, you can give your users a user-friendly interface.

Each application is unique and has different needs, therefore they provide different ways of interacting with Arkane. Applications that have support for Web3 are recommendated to integrate the [Arkane Web3 provider](https://docs.arkane.network/widget/web3-provider/getting-started), others are suggested to use the [Arkane Widget](https://docs.arkane.network/widget/widget/introduction).


## Key features
- Support for Web and mobile applications
- Offers social logins
- Offers a fiat-on-ramp
- Only wallet that supports NFTs (ERC721 and ERC1155) on BNB Smart Chain
- Multichain, supports both BSC and Ethereum
- Easy to integrate using web3 
- Build for a mainstream audience
- Offers in-app customer support
- Provide a complete test environment
- Wallet creation via APIs


## Getting Started 🎉
If you already support Web3-technology, you can improve the UX within your application by integrating the Arkane Web3 provider, a smart wrapper around the existing Web3 Ethereum JavaScript API.

By making use of our Web3 provider you are able to leverage the full potential of Arkane with minimal effort and you will be able to onboard users that are less tech savvy without making them leave your application or download third party plugins. Integrating just takes 2 steps and 5 minutes




**Don't support Web3 yet?**
>Don't worry we've got you covered with our 📦 [Widget - Arkane Connect](https://docs.arkane.network/widget/).




### Step 1: Add the library to your project 
Install the library by downloading it to your project via NPM

```
npm i @arkane-network/web3-arkane-provider
```

followed by adding the script to the head of your page.

```
<script src="/node_modules/@arkane-network/web3-arkane-provider/dist/web3-arkane-provider.js"></script>
```

After adding the javascript file to your page, a global Arkane object is added to your window. This object is the gateway for creating the web3 wrapper and fully integrates the widget - Arkane Connect.

### Step 2: Initialize the web3 provider
Add the following lines of code to your project, it will load the Arkane web3 provider.

```
Arkane.createArkaneProviderEngine({clientId: ‘Arketype’}).then(provider => {
    web3 = new Web3(provider);
});
```
The web3 instance now works as if it was injected by parity or metamask. You can fetch wallets, sign transactions, and messages.
### Congratulations, your dapp now supports Arkane 🎉
>🧙 To connect to Arkanes production environment and mainnet, you will need to [register your app](https://arkane-network.typeform.com/to/hzbcGJ) and request your [Client ID](https://docs.arkane.network/widget/deep-dive/authentication#client-id).

Want to know more about the wonderful world Arkane has to offer, [check out their documentation](https://docs.arkane.network/widget/)



## Receive BNB and BEP20 tokens

Every BSC wallet in Arkane is able to send and receive BNB or BEP20 tokens. They will automatically  appear in your wallet.

![img](https://github.com/ArkaneNetwork/content-management/blob/master/tutorials/bsc/create_wallet/09.png?raw=true)

## Resources:
* [BNB Smart Chain partners with Arkane](https://arkane.network/blog/binance-smart-chain-partners-with-arkane?utm_source=binance&utm_medium=documentation)
* [Arkane Developer Introduction Video (25min)](https://www.youtube.com/watch?v=F5yFvIKHCPk)



