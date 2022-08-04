---
sidebar_label: Using Remix IDE
hide_table_of_contents: false
sidebar_position: 2
---

# Using Remix IDE for Issuing BEP20 Tokens on BSC

In this tutorial, we provide guidelines on how to create, compile, and deploy a smart contract for deploying BEP020 tokens on BSC using the [Remix IDE](https://remix.ethereum.org/).


### Pre-requisites
There is no need for any local environment settings for deploying solidity smart contracts on BSC using the Remix IDE.
 
All you require is a browser-based Web3 wallet (e.g. MetaMask) to interact with the BSC Testnet and deployed contracts. If you are already using MetaMask, it is recommended to create a new account for testing with Replit. You can do this from the account menu, which appears when you click on the account avatar in the top right corner of MetaMask interface.
 
You must set up all of the following Pre-requisites to be able to deploy your solidity smart contract on BSC:

* [Download Metamask wallet](https://metamask.io/)
* [Configure BNB Smart Chain Testnet on Metamask](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain)
* [Get BNB testnet tokens](https://testnet.binance.org/faucet-smart)
 
### Setting Up Remix IDE

- Remix is an online IDE to develop smart contracts.
- You need to choose Solidity Compiler, Choose the appropriate compiler version. We used 0.8.4 for this tutorial.

<img src="https://user-images.githubusercontent.com/93580180/182832093-0229df42-6f44-4027-b418-b8045208a30f.png" alt="img" style={{zoom:"100%"}}/>


## Writing the Smart Contract

- Create new file, name it as ```BEP20Token.sol``` and copy contract code from the [BEP20 token template](BEP20Token.template)

- Remember to modify “name”, “symbol”, “decimals” and “totalSupply” according to your requirements.

<img src="https://user-images.githubusercontent.com/93580180/182832302-2e9bb7b7-9b54-49d8-888e-d03613ce59b1.png"/> 

The first line, `pragma solidity ^0.8.4` specifies that the source code is for a Solidity version greater than 0.8.4. [Pragmas](https://solidity.readthedocs.io/en/latest/layout-of-source-files.html#pragma) are common instructions for compilers about how to treat the source code (e.g., pragma once).

A contract in the sense of Solidity is a collection of code (its functions) and data (its state) that resides at a specific address on the Ethereum blockchain. Learn more about the [constructor](https://solidity.readthedocs.io/en/latest/contracts.html#constructor) and  [memory](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack) in the docs.

## Compile Smart Contract

- Step1: Click button to switch to compile page.

- Step2: Select the appropriate compiler version, 0.8.4 in our case.

- Step3: Enable "Auto compile" and "Optimization" from Advanced Configurations,

- Step4: Select "BEP20Token" from the contract drop-down menu.

- Step5: Click "ABI" to copy the contract ABI and save it.

<img src="https://user-images.githubusercontent.com/93580180/182832411-56a76672-40c9-490b-85a3-46eeecf7b911.png" alt="img" style={{zoom:"100%"}}/>

## Configure MetaMask and Fund Your Account

Now, We have to deploy our smart contract on BNB Smart Chain Network. For that, we have to connect to Web3 world, this can be done by many services like MetaMask, Brave, Portis etc. We will be using MetaMask. Please follow this [tutorial to setup a Metamask Account](wallet/metamask.md) for configuring the MetaMask wallet to use with BSC.


- Open Metamask and select Custom RPC from the networks dropdown

- Go to setting page

<img src="https://lh5.googleusercontent.com/NqWPIv1MrMJ-W2wDKjxtdxcdFhDwiqhsZ6G6MY6FQnhxPTCCPfPHBJ59vBl1ddxpbfV11ufETWAolV1s9YjCYHPeJCKW1S-sr8gfjcFt3swXM-p3IgafNBqPZ86DvThK-I9gKbrw" alt="img" style={{zoom:"30%"}}/>

- Add a new network

<img src="https://lh6.googleusercontent.com/jrq511YshO6rPPx4i-ePRy2gs-66b465c_JFXEW8Cm5CSNTM7CXgCPuFmIh_Im3JlEhxpAqEDDjmUqfskq2m5rG-FKhwZ4_jIenOTdAVs_rMMTjTvZlM6iOpQeivrz_V1liSvuB5" alt="img" style={{zoom:"30%"}}/>

* Testnet
  * [RPC URLs](rpc.md)
  * ChainID: 97
  * Symbol: BNB
  * Block Explorer: https://testnet.bscscan.com

* Mainnet
  * [RPC URLs](rpc.md)
  * ChainID: 56
  * Symbol: BNB
  * Block Explorer: https://bscscan.com


- Go ahead and click save
- Copy your address from Metamask

- Head over to [Faucet](https://testnet.binance.org/faucet-smart) and request test BNB

## Deploy Smart Contract 

Let's Deploy the Smart Contract on BNB Smart Chain Testnet.

- Select Injected Web3 in the Environment dropdown and your contract

<img src="https://lh5.googleusercontent.com/Z4XBNJcsMWk5SzSKB8no5vAzv8ie46p4dbv4sh0_9FxIyMfEFlCj2z_a_ZUWR6l3fH9OIr3B2A0_Puh89FzbxlkLMVsTo9diSbLGdbp2Swml0afc7Unl10hBw9jsAY6Ozgbe6HqE" alt="img" style={{zoom:"20%"}}/>

- Accept the Connection Request!

<img src="https://lh3.googleusercontent.com/-SBQ0YKnAs_IR80dcqc3EpWRte8KlVCgTIPgSiFPe6H_TKDZj4O5TBR0rpvts4YZpA1LYN2-5IocYkcZjuMP5yb7rch0NovdTMH-55Pjg4HIorxZGeFO7dkyYGlrY0W5DYfs7t_z" alt="img" style={{zoom:"30%"}}/>

- Once Metamask is connected to Remix, the ‘Deploy’ transaction would generate another metamask popup that requires transaction confirmation.

<img src="https://lh4.googleusercontent.com/9awuDudNSuUOZDQAlW5FPZ5SbRkWsKPlJSYWGUL7R4raJ5o2mprRP7jt87hP_wbuYeoJy75ErwDcKVC7_spf8YkumCkwOP4Eak9SfcV6dZvyVhy84JqKfVUvmEeLw5mWEZ3-aCED" alt="img" style={{zoom:"20%"}}/>

**Congratulations!** You have successfully deployed a BEP20 Contract. Now you can interact with the Smart Contract. Check the deployment status here: <https://testnet.bscscan.com/>

## Conclusion
This tutorial guided you through the basics of creating and deploying a contract of BEP20 tokens using the Remix IDE and MetaMask Web Wallet. This tutorial uses testnet, however, the exact same instructions and sequence will work on the mainnet as well.
