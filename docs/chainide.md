---
sidebar_label: Using ChainIDE
hide_table_of_contents: false
sidebar_position: 2
---

# Using ChainIDE

## Introduction
[ChainIDE](https://chainide.com/)  is a chain agnostic, cloud-based IDE for creating decentralized applications. It enhances the development cycle through pre-configured plugins that save users' time and effort. This is a beginner guide on creating a simple smart contract and deploying it to the BNB Smart Chain. If you have any questions, feel free to ask them in the [ChainIDE Discord](https://discord.gg/QpGq4hjWrh).

## Pre-requisites

1.  ChainIDE
2.  Web3 Wallet 
3.  Solidity

## What You'll Do

The following are general steps for deploying a storage smart contract

1.  Setting up a Wallet
2.  Write down a Storage Smart Contract
3.  Compile a Storage Smart Contract
4.  Deploy a Storage Smart Contract
5.  Create a Flattened File using Flattener Library
6.  Verify a Storage Smart Contract
7.  Contract Interaction

## Setting up a Wallet

### Install Binance Wallet/MetaMask
When deploying a smart contract to a blockchain or when making a transaction to a deployed smart contract, a gas fee must be paid, and for that, we need to use a crypto wallet which can be Binance Wallet or MetaMask. If you want to use Binance Wallet, click [here](https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp) to get Binance Wallet and if you want to continue with MetaMask Wallet, click [here](https://metamask.io/)  to install MetaMask.

### Adding BNB Smart Chain Test Network to MetaMask Wallet
Visit [ChainIDE]((https://chainide.com/)), create a project, and click on the "unconnected button" in the upper right corner, select the "Injected Web3 Provider" button, and then click the "MetaMask" to connect to the MetaMask wallet ("BNB Chain Mainnet" is the main network, and "BNB Chain Testnet" is the test network, click on the "BNB Chain Testnet" and it will be added to your MetaMask wallet.
![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/Untitled+design+(19).png)

### Enabling the BNB Smart Chain Test Network to Binance Wallet
If you want to continue with Binance Wallet, install Binance Wallet, and After installing Binance Wallet, you need to enable "Show Test Networks" and switch to the "BNB Smart Chain Test Network". 

<img src="https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/16.png" alt="img" style={{zoom:"50%"}}/>

### Obtaining Test BNB tokens

Once BNB Smart Chain Test Network has been added to MetaMask, navigate to the  [BNB Smart Chain Faucet](https://testnet.binance.org/faucet-smart)  to receive test tokens. Tokens are needed to pay for gas fees to deploy and interact with the smart contract. On the faucet page, paste your MetaMask wallet address. Then, click submit and the faucet will send you some test BNBs.
![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/BNB_Smart_Chain_Faucet.png)

## Write down a Storage Smart Contract

You need to write down all the required functions that you want to implement in your storage smart contract. A general storage smart contract has the following functions:

-   `Store()`: store value in variables
-   `retrieve()`: returns the stored value

The ChainIDE team has prepared a simple storage smart contract that includes all the required functions; you may use this built-in template and add/delete functions according to your requirements.

Visit the  [ChainIDE site](https://chainide.com/)  and click on "Try Now".

![](https://3869740696-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MYy-lqJKjq1m0yBAX4r%2Fuploads%2Fnpdf7fg51675wYmFcL6b%2Fimage.png?alt=media&token=353fc876-a319-49cb-92d5-1ed23c39aa90)

Then, click on "New Project" and select "BNB Chain", and "Storage".

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/3_.png)

Now, you can see the template contract,  **Storage.sol**, that includes all the required functions.
## Compile a Storage Smart Contract

After you have completed your smart contract, it is time to compile it. To compile, navigate to the "Compile", module, choose an appropriate compiler version according to your source code, and press the "Compile" button. An ABI and bytecode for the source code generate upon successful compilation. If there are some errors in your source code, they will be displayed under the output panel in the "Logger module". You may need to carefully read the error, resolve it accordingly and compile the contract again.

Note down the compiler version and the license for your source code as it would be needed when you verify your smart contract on the BNB Smart Chain Test Network.


![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/4.png)

## Deploy a Storage Smart Contract

After successful compilation, it's time to deploy your compiled storage smart contract to the BNB Smart Chain Test Network. For that, you need to have a MetaMask installed, the BNB Smart Chain Test Network added to your wallet, and some testnet tokens to pay for the transaction fee.

Navigate to the "Deploy & Interaction" module and choose the smart contract that you want to deploy among the compiled smart contracts and click the "deploy" button. For this tutorial, the  `Storage`  smart contract will be deployed.

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/5.png)

## Create a Flattened File using Flattener Library

To verify a smart contract that imports other smart contracts, we need to create a flattened file, a flattened file including all the source code of imported contracts in a single file. To create a flattened file, you need to add a "Flattener" plug-in.

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/7.png)

Once the Flatterner plug-in is activated, you'll be able to access it as a separate module as shown in the figure below. Choose the compiled file, and click on the flatten button to create a flattened file, once the flattened file is created, it will be automatically copied to the clipboard, you may paste it to a file and save it for later usage.

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/8.png)

If you want to save the flattened file, click the save button, and a flattened file will be saved in the current repository.

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/9.png)

The saved flattened file can be accessed under the explorer module.

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/10.png)

## Verify a Smart Contract

To verify a smart contract, you need to visit  [BNB Smart Chain Explorer](https://bscscan.com/) and search for the deployed smart contract using the contract address.

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/10.png)

Click on the "verify and publish" link shown under the contract section.

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/11.png)

Once you click on the verify and publish link, you will be asked for the following:

-   Contract Address: The address of a deployed smart contract that you want to verify
-   Compiler Type: Either you want to verify a single file or multiple files
-   Compiler Version: The compiler version that you used to compile the smart contract
-   License: Open-source license type that you used for your source code

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/12.png)

After that, you need to paste the flattened file that you created in step 5, and your smart contract will be verified.

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/13.png)

If there are no issues with your smart contract, it would be verified, and you'll be able to see an image similar to the one that is shown below.

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/14.png)

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/15.png)
Congratulations, you have successfully deployed your smart contract to the blockchain and verified it, now it's time to interact with your deployed smart contract.

## Contract Interaction
After successful deployment and verification. All the functions in the deployed smart contract can be seen in the "INTERACT" panel. In our scenario, we have two functions, `Store()` that is used to store the value to the blockchain, and `Retrieve()` to retrieve stored data from the blockchain.  

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/6.png) 
