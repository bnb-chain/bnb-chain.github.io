---
sidebar_label: Introduction
sidebar_position: 2
---

# BEP20 Token

## Introduction

BEP20 is a token standard on BNB Smart Chain (BSC). It is an extension of the Ethereum ERC-20 token standard, and it defines a set of rules that all BEP20 tokens must follow. These rules include how tokens can be transferred, burned, and minted. It is designed to enable developers to create and deploy tokens on the BNB Smart Chain.

BEP20 tokens are very popular on BSC, and they are used for a variety of purposes, including decentralized finance (DeFi), non-fungible tokens (NFTs), and gaming.

## Difference between BEP20 and ERC20

BEP20 and ERC20 are both token standards, but they are used on different blockchains. BEP20 is used on Binance Smart Chain (BSC), while ERC20 is used on Ethereum. Both standards define a set of rules that all tokens must follow, such as how to transfer, burn, and mint tokens.

Here is a summary of the key differences between BEP20 and ERC20 tokens:
| Feature | BEP20 | ERC20 |
|---|---|---|
| Blockchain | Binance Smart Chain (BSC) | Ethereum |
| Transaction fees | Low | High |
| Transaction speed | Fast | Slow |
| Smart contract compatibility | Compatible with Ethereum smart contracts | Not compatible with BSC smart contracts |

## Implementing BEP20 Tokens

To implement a BEP20 token on BNB Smart Chain, you must use the `IBEP20` interface. The IBEP20 interface defines the following functions: `totalSupply()`, `balanceOf(address account)`, `transfer(address recipient, uint256 amount)`, `allowance(address owner, address spender)`, `approve(address spender, uint256 amount)`, `transferFrom(address sender, address recipient, uint256 amount)`.

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IBEP20 {
    function totalSupply() external view returns (uint256);
    function decimals() external view returns (uint8);
    function symbol() external view returns (string memory);
    function name() external view returns (string memory);
    function getOwner() external view returns (address);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address _owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

In addition to these functions, the IBEP20 interface also defines a number of events that can be emitted by tokens, such as the Transfer event when tokens are transferred, the Approval event when an account approves another account to spend its tokens, and the Burn event when tokens are burned.

The IBEP20 interface is used by all tokens on the BSC, and it provides a common set of functions and events that can be used to interact with tokens. This makes it easier for developers to build applications that interact with tokens on the BSC, and it also makes it easier for users to understand how tokens on the BSC work.

### Methods that Need to be Implemented

All BEP20 tokens must implement the following methods:

* **totalSupply():** Returns the total supply of tokens.
* **balanceOf():** Returns the balance of tokens held by a specific address.
* **transfer():** Transfers a specific number of tokens to another address.
* **allowance():** Returns the maximum amount of tokens that an address is allowed to transfer on behalf of another address.
* **approve():** Sets the maximum amount of tokens that an address is allowed to transfer on behalf of another address.
* **transferFrom():** Transfers a specific number of tokens from one address to another address, on behalf of the first address.

To implement, compile, and deploy BEP20 tokens on BNB Smart Chain, users can use various different IDEs like [Remix IDE](https://remix.ethereum.org), [Truffle](https://trufflesuite.com/), [Hardhat](https://hardhat.org/), etc. They can use Web3 wallets like [Trust Wallet](wallet/trustwallet.md) and [Metamask](wallet/metamask.md) for signing transactions and paying any gas cost that may incur.

## Interact with Contract with [Web3](https://www.npmjs.com/package/web3) and NodeJS.

### Connect to BNB Smart Chain's public RPC endpoint

```js
const Web3 = require('web3');
// mainnet
const web3 = new Web3('https://bsc-dataseed.bnbchain.org');
// testnet
const web3 = new Web3('https://data-seed-prebsc-1-s1.bnbchain.org:8545');
```

### Create a Wallet

```javascript
web3.eth.accounts.create([entropy]);
```
Output:
```bash
web3.eth.accounts.create();
{
  address: '0x926605D0729a968266f1BB299d8Df0471C4F5367',
  privateKey: '0x6b4618539d95f205f33e916e89404b301dde545c0c4acc181fd0c0b42708bad3',
  signTransaction: [Function: signTransaction],
  sign: [Function: sign],
  encrypt: [Function: encrypt]
}
```

### Recover a Wallet

```javascript
const account = web3.eth.accounts.privateKeyToAccount("0xe500f5754d761d74c3eb6c2566f4c568b81379bf5ce9c1ecd475d40efe23c577")
```


### Check Balance

```javascript
web3.eth.getBalance(holder).then(console.log);
```

Output (The balance will be bumped by e18 for BNB):

```
6249621999900000000
```

### Create Transaction

**Parameters**

* Object - The transaction object to send:
* from - String|Number: The address for the sending account. Uses the web3.eth.defaultAccount property, if not specified. Or an address or index of a local wallet in web3.eth.accounts.wallet.
* to - String: (optional) The destination address of the message, left undefined for a contract-creation transaction.
* value - Number|String|BN|BigNumber: (optional) The value transferred for the transaction in wei, also the endowment if it’s a contract-creation transaction.
* gas - Number: (optional, default: To-Be-Determined) The amount of gas to use for the transaction (unused gas is refunded).
* gasPrice - Number|String|BN|BigNumber: (optional) The price of gas for this transaction in wei, defaults to web3.eth.gasPrice.
* data - String: (optional) Either a ABI byte string containing the data of the function call on a contract, or in the case of a contract-creation transaction the initialisation code.
* nonce - Number: (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.

```Javascript
// Make a transaction using the promise
web3.eth.sendTransaction({
	  from: holder,
	  to: '0x0B75fbeB0BC7CC0e9F9880f78a245046eCBDBB0D',
	  value: '1000000000000000000',
	  gas: 5000000,
    gasPrice: 18e9,
}, function(err, transactionHash) {
  if (err) {
      console.log(err);
      } else {
      console.log(transactionHash);
      }
});
```


