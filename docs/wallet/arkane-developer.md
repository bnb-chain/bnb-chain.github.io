# Wallet provider for Dapps

A wallet provider is a service that allows DApps to provide wallets to their end-users without having to deal with key management's security concerns. It is a great way to prepare your Dapp for onboarding a more mainstream audience.

[**Venly**](https://www.venly.io/?utm_source=binance&utm_medium=documentation) allows you to easily integrate your app with the BNB Smart Chain, whether you already have a Dapp integrated with web3 or are building a new application from scratch. **Venly** provides a smooth and delightful experience for you and your users on both web and mobile.

Venly will help you interact with the BNB Smart Chain, create blockchain wallets, create different asset types such as fungible (BEP20, ERC20) and non-fungible tokens (NFTs—ERC721 and ERC1155), and interact with smart contracts. In addition to a superior developer experience, you can give your users a user-friendly interface.

Each application is unique and has different needs, so it provides different ways of interacting with Venly. Applications that support Web3 are recommended to integrate the [Venly Web3 Provider](https://docs.venly.io/docs/web3js), while others are suggested to use the [Venly Widget](https://docs.venly.io/docs/widget-overview) or [Wallet-API](https://docs.venly.io/docs/wallet-api-overview).

## Key features

- Support for Web and mobile applications
- Offers social logins
- Offers a fiat-on-ramp
- Only wallet that supports NFTs (ERC721 and ERC1155) on BNB Smart Chain
- Multichain supports both BSC and Ethereum
- Easy to integrate using web3 
- Build for a mainstream audience
- Offers in-app customer support
- Provide a complete test environment
- Wallet creation via APIs

## Getting Started 🎉

If you already support Web3 technology, you can improve your application's UX by integrating the [Venly Web3 Provider](https://docs.venly.io/docs/web3js), a smart wrapper around the existing Web3 Ethereum JavaScript API.

By using our [Web3 provider](https://docs.venly.io/docs/web3js), you can leverage the full potential of Venly with minimal effort, and you will be able to onboard less tech-savvy users without making them leave your application or download third-party plugins. Integrating just takes two steps and 5 minutes!

**Don't support Web3 yet?**

> Don't worry we've got you covered with our 📦 [Venly - Widget](https://docs.venly.io/docs/widget-overview).

### Step 1: Add the library to your project

Install the library by downloading it to your project via NPM

```javascript
npm i @venly/web3-provider
```

Alternatively, you could also include the library directly from a CDN

```javascript
<script src="https://unpkg.com/@venly/web3-provider/umd/index.js"></script>
```

```javascript
<script src="https://cdn.jsdelivr.net/npm/@venly/web3-provider/umd/index.js"></script>
```

## Step 2: Initialize the web3 provider

Add the following lines of code to your project, it will load the Venly web3 provider.

### Simple:

```javascript
import Web3 from 'web3';
import { VenlyProvider } from '@venly/web3-provider';

const Venly = new VenlyProvider();
const options: VenlyProviderOptions = {
  clientId: 'YOUR_CLIENT_ID'
};

const provider = await Venly.createProvider(options);
const web3 = new Web3(provider);
```

### Advanced:

```javascript
import Web3 from 'web3';
import { VenlyProvider } from '@venly/web3-provider';

const Venly = new VenlyProvider();
const options = {
  clientId: 'YOUR_CLIENT_ID',
  environment: 'staging', //optional, production by default
  signMethod: 'POPUP', //optional, REDIRECT by default
  bearerTokenProvider: () => 'obtained_bearer_token', //optional, default undefined
  //optional: you can set an identity provider to be used when authenticating
  authenticationOptions: {
    idpHint: 'google'
  },
  secretType: 'ETHEREUM' //optional, ETHEREUM by default
};

const provider = await Venly.createProvider(options);
const web3 = new Web3(provider);
```

You can fetch wallets, sign transactions, and messages.

> Congratulations, your dapp now supports Venly 🎉
> Ready to try out the Wallet-Widget? [Click here to get started](https://docs.venly.io/docs/widget-getting-started).

> Want to know more about the wonderful world Venly has to offer, [check out their documentation](https://docs.venly.io/docs/widget-overview)

## Receive BNB and BEP20 tokens

Every BSC wallet in Venly can send and receive BNB or BEP20 tokens. They will automatically appear in your wallet.

![img](https://github.com/ArkaneNetwork/content-management/blob/master/tutorials/bsc/create_wallet/09.png?raw=true)

## Resources:

- [Venly Widget](https://docs.venly.io/docs/widget-overview)
- [Web3 Wallet Providers](https://docs.venly.io/docs/ethersjs)
- [Web3.js](https://docs.venly.io/docs/web3js)
