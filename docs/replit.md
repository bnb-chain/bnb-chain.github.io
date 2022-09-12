---
sidebar_label: Using Replit
hide_table_of_content: false
sidebar_position: 2
---
 
# Using Replit IDE for Deploying Smart Contracts on BSC
 
[Replit](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide) is a coding platform that allows you to write code and host apps. Replit supports [Solidity programming language](https://replit.com/@replit/Solidity-starter-beta?v=1) and provides all of the features and functionality that are required by Web3 developers for creating and deploying smart contracts.
 
In this tutorial, we explain how to build and deploy a solidity smart contract on the BSC Testnet using the [Replit IDE](https://replit.com/signup) and the [Replit Solidity Template (Solidity starter beta)](https://replit.com/@replit/Solidity-starter-beta?v=1)
 
:::note
For additional examples about Solidity with Replit, you can read the article <ins>**[Get started with Replit!](https://blog.replit.com/solidity)**</ins> or check <ins>**[Replit Solidity documentation and Escrow contract tutorial](https://docs.replit.com/tutorials/33-escrow-contract-with-solidity)**</ins>
:::
 
## Pre-Requisites
 
There is no need for any local environment settings for deploying solidity smart contracts on BSC using Replit.
 
All you require is a browser-based Web3 wallet (e.g. MetaMask) to interact with the BSC Testnet and deployed contracts. If you are already using MetaMask, it is recommended to create a new account for testing with Replit. You can do this from the account menu, which appears when you click on the account avatar in the top right corner of MetaMask interface.
 
You must set up all of the following Pre-requisites to be able to deploy your solidity smart contract on BSC:
 
1. [Create a Replit account](https://replit.com/signup)
2. [Download Metamask wallet](https://metamask.io/)
3. [Configure BNB Smart Chain Testnet on Metamask](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain)
4. [Get BNB testnet tokens](https://testnet.binance.org/faucet-smart)
 
## Working with a Repl
 
Every [Repl](https://docs.replit.com/getting-started/using-replit-free#repls) that you create is a fully functional development and production environment. Follow the steps to create a solidity starter Repl:
 
1. [Login](https://replit.com/login) or [create an account](https://replit.com/signup). After creating your [Replit account](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide), your home screen will include a dashboard where you can view, create projects, and manage your account.
2. Once logged in, create a Solidity starter repl, Select **+ Create Repl** from the left panel or **+** in the top right corner of the screen.
3. Select the [**Solidity starter (beta)**](https://replit.com/@replit/Solidity-starter-beta?v=1) template and specify a title for your project.
4. Click on **+ Create Repl** for creating your project.
 
> **Note**
The Solidity starter repl comes with a friendly web interface, built using the <ins>**[Web3 Ethereum JavaScript API](https://web3js.readthedocs.io/en/v1.5.2/)**</ins>, which you can use to deploy and interact with your smart contracts. For this tutorial, we will deploy smart contract on to BNB Smart Chain Testnet.

## Create Smart Contract
Delete the contents of the contract.sol file and paste the following solidity code into this file.

![image](https://user-images.githubusercontent.com/93580180/189648710-7185193d-b705-4453-99f6-51cfa103499e.png)

## Deploy on BSC
 
Make sure that you have followed the list of Pre-requisites above so that you are ready to deploy and interact with your smart contract:
 
1. Click on **Run** (at the Top) to install all relevant packages and start up the contract deployment UI.
2. Click on ![image](https://user-images.githubusercontent.com/93580180/189651036-d5c68e4d-9154-4f36-a9b1-09ddb75bf64c.png) icon to open the web interface for deloyment in a new browser tab.
3. Connect your MetaMask wallet to the web interface and switch to the [BSC Testnet](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain).
4. Click on **Connect wallet**, select your account, then choose Connect.

![image](https://user-images.githubusercontent.com/93580180/189649199-320b56ef-8cf8-44f7-a90d-d4a640c4521f.png)

![image](https://user-images.githubusercontent.com/93580180/189649134-41518f50-054f-4d5d-9b37-9af57bd16526.png)

5. From the Drop-down list, Select the contract that you want to deploy. Click on **Deploy**.

![image](https://user-images.githubusercontent.com/93580180/189649368-75a8e91d-3225-48f9-81f4-3bc1c2f5a7a5.png)

6. Approve the MetaMask notification that appears asking for confirmation of the transaction from your wallet to deploy the smart contract.

![image](https://user-images.githubusercontent.com/93580180/189649422-4677b218-4292-43dd-8c7f-c9c14d6604fe.png)

7. Copy the address of the deployed contract.

![image](https://user-images.githubusercontent.com/93580180/189649474-8ba1660f-ee56-4284-bdf7-e216161409f5.png)

8. [Navigate to BscScan Testnet Explorer](https://testnet.bscscan.com/) to search and view your deployed contract. Using the contract address to search for it. 
 
![image](https://user-images.githubusercontent.com/93580180/189649528-73701873-9a32-41cc-9276-fe1daafe809d.png)

Once your contract has been deployed, it will show up as expandable boxes below the drop-down box. Expand it and take a look at all the different functions available. You can now interact with your contract using the provided user interface or from a sharable URL shown on the interface.

![image](https://user-images.githubusercontent.com/93580180/189649592-5ce05a4f-1961-41f3-9a97-e0b11f54a470.png)

## Publish to Replit​
 
Replit allows you to publish your projects to a personal profile. After publishing, projects will show up on your spotlight page for others to explore, interact with, clone, and collaborate.
 
See [Publish your Repl](https://docs.replit.com/hosting/sharing-your-repl#publish-your-repl).
 
## Conclusion
This tutorial guided you through the basics of creating and deploying a smart contract using the Replit IDE. We also provided steps on how to interact with the deployed contract online and publish your replit project. This tutorial uses testnet, however, the exact same instructions and sequence will work on the mainnet as well.
