---
sidebar_label: Using Remix IDE
hide_table_of_contents: false
sidebar_position: 2
---

# Using Remix IDE for Deploying Smart Contracts on BSC

In this tutorial, we provide guidelines on how to create, compile, and deploy a simple Hello World smart contract on BSC using the [Remix IDE](https://remix.ethereum.org/).

### Pre-requisites
There is no need for any local environment settings for deploying solidity smart contracts on BSC using the Remix IDE.
 
All you require is a browser-based Web3 wallet (e.g. MetaMask) to interact with the BSC Testnet and deployed contracts. If you are already using MetaMask, it is recommended to create a new account for testing with Replit. You can do this from the account menu, which appears when you click on the account avatar in the top right corner of MetaMask interface.
 
You must set up all of the following Pre-requisites to be able to deploy your solidity smart contract on BSC:

* [Download Metamask wallet](https://metamask.io/)
* [Configure BNB Smart Chain Testnet on Metamask](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain)
* [Get BNB testnet tokens](https://testnet.binance.org/faucet-smart)
 
### Setting Up Remix IDE

- Remix is an online IDE to develop smart contracts.
- You need to choose Solidity Compiler, Choose the appropriate compiler version. We used 0.8.15 for this tutorial.

<img src="https://user-images.githubusercontent.com/93580180/182832884-f3554c38-84aa-46f0-85e6-32b54e24eba6.png"/>

## Writing the Smart Contract

- Create a new file, name it ```HelloWorld.sol```, and copy the contract code given below

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;
contract HelloWorld {
    function sayHelloWorld() public pure returns (string memory) {
        return "Hello World";
    }
}
```

The first line, `pragma solidity ^0.8.15` specifies that the source code is for a Solidity version greater than 0.8.15. [Pragmas](https://solidity.readthedocs.io/en/latest/layout-of-source-files.html#pragma) are common instructions for compilers about how to treat the source code (e.g., pragma once).

A contract in the sense of Solidity is a collection of code (its functions) and data (its state) that resides at a specific address on the Ethereum blockchain. Learn more about the [constructor](https://solidity.readthedocs.io/en/latest/contracts.html#constructor) and  [memory](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack) in the docs.

## Compile Smart Contract

- Step1: Click button to switch to compile page.

- Step2: Select the appropriate compiler version, 0.8.15 in our case.

- Step3: Enable "Auto compile" and "Optimization" from Advanced Configurations,

- Step4: Select "HelloWorld" from the contract drop-down menu.

- Step5: Click "ABI" to copy the contract ABI and save it.

<img src="https://user-images.githubusercontent.com/93580180/182833004-bd530c91-adb4-4b8c-a87b-70139ef75e35.png" alt="img" style={{zoom:"80%"}}/>

## Configure MetaMask and Fund Your Account

Now, We have to deploy our smart contract on BNB Smart Chain Network. For that, we have to connect to Web3 world, this can be done by many services like MetaMask, Brave, Portis etc. We will be using MetaMask. Please follow this [tutorial to setup a Metamask Account](wallet/metamask.md) for configuring the MetaMask wallet to use with BSC.


- Open Metamask and select Custom RPC from the networks dropdown

- Go to setting page

<img src="https://lh5.googleusercontent.com/NqWPIv1MrMJ-W2wDKjxtdxcdFhDwiqhsZ6G6MY6FQnhxPTCCPfPHBJ59vBl1ddxpbfV11ufETWAolV1s9YjCYHPeJCKW1S-sr8gfjcFt3swXM-p3IgafNBqPZ86DvThK-I9gKbrw" alt="img" style={{zoom:"80%"}}/>

- Add a new network

<img src="https://lh6.googleusercontent.com/jrq511YshO6rPPx4i-ePRy2gs-66b465c_JFXEW8Cm5CSNTM7CXgCPuFmIh_Im3JlEhxpAqEDDjmUqfskq2m5rG-FKhwZ4_jIenOTdAVs_rMMTjTvZlM6iOpQeivrz_V1liSvuB5" alt="img" style={{zoom:"30%"}}/>

* Testnet
    * [RPC URLs](./rpc.md)
    * ChainID: 97
    * Symbol: BNB
    * Block Explorer: https://testnet.bscscan.com

* Mainnet
    * [RPC URLs](./rpc.md)
    * ChainID: 56
    * Symbol: BNB
    * Block Explorer: https://bscscan.com

- Go ahead and click save
- Copy your address from Metamask

- Head over to [Faucet](https://testnet.binance.org/faucet-smart) and request test BNB

## Deploy Smart Contract 

Follow the following steps to deploy the HelloWorld smart contract on the BNB Smart Chain Testnet. 

<img src="https://user-images.githubusercontent.com/93580180/182833072-ca9cbd50-253e-400b-84c5-720e0ee6bb32.png" alt="img" style={{zoom:"80%"}}/>

- Step1: Navigate to the Deployment Page.
- Step2: Select Injected Provider in the Environment dropdown
- Step3: Confirm the Connection Request on the MetaMask notification.

<img src="https://user-images.githubusercontent.com/93580180/182833162-4aff06eb-9d20-41c0-a5b6-df996db41a1c.png" alt="img" style={{zoom:"80%"}}/>

- Step4: Once Metamask is connected to Remix, click on the "Deploy" button which would generate another metamask popup that requires transaction confirmation.

<img src="https://user-images.githubusercontent.com/93580180/182833376-8497b8c8-1edf-4f9f-a586-acfbe20ab696.png" alt="img" style={{zoom:"80%"}}/>

**Congratulations!** You have successfully deployed a simple Smart Contract on the BSC Testnet. Now you can interact with the Smart Contract. Check the deployment status here: <https://testnet.bscscan.com/>

# Flatten and Verify the deployed contract on BscScan

The first and foremost step is to flatten the solidity contract into a single file to be able to get it verified on [BscScan](https://testnet.bscscan.com/).

### Flatten the Smart Contract Code

* Install [Truffle Flattener](https://github.com/nomiclabs/truffle-flattener) by running the command ```npm install truffle-flattener```
* Flatten the contract by running the command in the ```npx truffle-flattener HelloWorld.sol > FlatHelloWorld.sol``` contracts directory
* Clean up the licensing information.
    * The flattened contract will have the same licensing note imported from each of the files. 
    * Multiple licensing notes in one file break the BscScan verification, so you have to leave one licensing note for the entirety of the flattened contract. 
    * The easiest way to clean up is to search for the SPDX mentions in the file and remove all of them except for the very first one.

### Using Flattened Code to Verify 
At this point, you have your flattened and cleaned-up contract ready for the BscScan verification.
* Go to [BscScan Testnet](https://testnet.bscscan.com/).
* Find your deployed contract by searching it using its address.
* On the main page of BscScan, on the header click **Misc > Verify Contract.**
* In Compiler Type, select **Solidity (Single file)**.
* In Compiler Version, select **v0.8.15**. This is the version this tutorial used to compile the contract.
* In Open Source License Type, select **MIT License (MIT)**.
* Click **Continue**.
* Keep the **Optimization** option set to **No** as Remix does not use optimization by default.
* Paste the entirety of your flattened .sol contract in the **Enter the Solidity Contract Code below** field.
* Click **Verify and Publish**.
* BscScan will take a few seconds to compile your contract, verify, and publish it.


## Conclusion
This tutorial guided you through the basics of creating and deploying a simple smart contract using the Remix IDE and MetaMask Web Wallet. It also provides step-by-step guide on how to verify and publish your deployed smart contract. This tutorial uses testnet, however, the exact same instructions and sequence will work on the mainnet as well.
