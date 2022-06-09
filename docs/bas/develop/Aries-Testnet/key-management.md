---
sidebar_label: Key Management
---

# Key Management
This article is a guide about key management strategy on the client-side of your Decentralized Application on BAS

## Set up Web3
`web3.js` is a javascript library that allows our client-side application to talk to the blockchain. We configure Web3 to communicate via Metamask. For more details about `web3.js`, refer to [official docs](https://web3js.readthedocs.io/en/v1.2.2/getting-started.html#adding-web3-js).

## Connect to BAS ARIES network

```
    // testnet
    const web3 = new Web3('https://bas-aries-public.nodereal.io');
```

## Set up an account
If the installation and instantiation of Web3 were successful, the following should successfully return a random 

```
account:
    const account = web3.eth.accounts.create();
```

## Recover account
If you have backed up the private key of your account, you can use it to restore your account.

```
    const account = web3.eth.accounts.privateKeyToAccount("$private-key")
```

## Example

```
const Web3 = require('web3');
async function main() {
​
    const web3 = new Web3('https://bas-aries-public.nodereal.io');
    const loader = setupLoader({ provider: web3 }).web3;
​
    const account = web3.eth.accounts.create();
    console.log(account);
}
```