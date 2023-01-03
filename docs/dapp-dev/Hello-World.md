---
sidebar_label: Full Stack Hello World dApp
sidebar_position: 2
hide_table_of_contents: false
---

# Develop Full Stack dApp on BNB Smart Chain in 5 minutes

Designed for anyone wanting to learn blockchain development, this tutorial provides a step-by-step guide on how to develop a full-stack _Hello World Smart dApp_ that is used for storing and retrieving data from the BSC blockchain. The technology stack used in this tutorial includes Solidity, Truffle, Ganache, Web3.js, and Node js. We also cover how to deploy smart contracts on the BNB Smart Chain Testnet.

## **Learning Takeaways:**

This tutorial will help you gain knowledge on the following learning points:

- MetaMask Wallet connectivity to BSC Testnet;
- Smart-contract development;
- Using truffle and ganache for local development and testing;
- Unit testing of smart contracts;
- Deploying smart contracts on BSC Testnet;
- Front-end integration with the smart contract using web3.js library;

## Technology Stack Details

- node v16.13.0
- npm v8.1.0
- Truffle v5.5.19 (core: 5.5.19)
- Ganache CLI v6.12.2 (ganache-core: 2.13.2)
- Solidity ^0.8.0 (solc-js)
- Web3.js v1.5.3
- MetaMask Wallet v10.16.1

### Brief Introduction Tech Stack

1. _**Truffle Framework:**_ set of tools for smart contract development, testing, and asset pipelining for any blockchain that uses the Ethereum Virtual Machine (EVM).
2. _**Ganache:**_ available as both desktop application and CLI, it is a personal blockchain that can be used for local blockchain development.
3. _**Solidity:**_ one of the most popular object-oriented high-level smart contract programming languages. For more details on Solidity, refer [here](https://docs.soliditylang.org/en/v0.8.15/).
4. _**MetaMask Wallet Browser Extension:**_ we recommend using the Metamask Chrome extension. It is a web wallet that allows connecting the chrome browser to any valid blockchain network.
5. _**Node JS:**_ this is used for UI or Front end development.
6. _**Web3.js:**_ JavaScript library that allows communication with the EVM-based blockchains. This is the magic tool that turns our web application into a blockchain-enabled application.

## **Setting up the development environment**

1. Install Truffle: ```npm install -g truffle```

2. Install Ganache-CLI: ```npm install -g ganache-cli```

3. Clone the BNBChain-Tutorial repository: ```git clone https://github.com/bnb-chain/bnb-chain-tutorial.git```

4. Change the current directory: ```cd 01- Hello World Full Stack dApp on BSC```;

5. Install all the dependencies (node modules): ```npm install```

6. Install and configure MetaMask Chrome Extension to use with BSC Testnet. Refer[here](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain)for a detailed guide.

7. Create a .secret file with the secret phrase of MetaMask. Refer [here](https://metamask.zendesk.com/hc/en-us/articles/360015290032-How-to-reveal-your-Secret-Recovery-Phrase) for details on how to get MetaMask secret phrase.

## **Smart Contract in Action: Compile and Deploy**

1. **Compile Smart Contracts.** Use the commandtrufflecompile to compile your smart contracts.

![image](https://user-images.githubusercontent.com/93580180/177171360-8066812a-a309-43c9-b2df-f5a1fedcdcd2.png)

2. **Migrate Smart Contracts.** Use the following command to deploy/migrate your smart contracts onto the BSC Testnet ```truffle migrate --reset --network bscTestnet```

![image](https://user-images.githubusercontent.com/93580180/177171461-f92f9f2a-17cb-43e2-bcca-cdd69eb6a9ff.png)


3. **Unit Test Your Smart Contracts.**

      1. Open a terminal and move into the root directory of the project. Run the ganache-cli using the command ```ganache-cli```.

![image](https://user-images.githubusercontent.com/93580180/177171537-8a77135e-9750-4800-aa4f-918b7b82dc43.png)

      2. Make sure that the terminal is not closed, i.e., ganache-cli is running in the background. This is important because testing is done on the local network.

      3. From the root directory of the project, in a new terminal, run the command ```truffle test``` to run the tests.

![image](https://user-images.githubusercontent.com/93580180/177171621-f884d615-e65e-46fb-9e3d-edaa9a8c26bf.png)

4. **Create the build.** Run the command ```npm run build``` to create the build files for your web application using the webpack library.

![image](https://user-images.githubusercontent.com/93580180/177171669-b8bd829f-81ec-45ec-951a-c9920ef2c1b3.png)

5. **Run the application.** Run the command ```npm run dev``` to start the application on the localhost. **Note:** _before running the application make sure nothing is running on localhost:3000_

![image](https://user-images.githubusercontent.com/93580180/177171781-2a2eba8c-eea9-4af5-8b02-fc9bdd88e9d6.png)

6. Navigate to localhost:3000 on Chrome Browser to see the dApp in action

![image](https://user-images.githubusercontent.com/93580180/177171856-abaf323d-c35c-4d3a-bfd0-ec1270fa333e.png)

## **Using the dApp**

1. Make sure that your MetaMask wallet is correctly installed and configured to connect to BSC Testnet. Refer to this [guide](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain) for details. To use the dApp successfully make sure that your MetaMask wallet is connected to the site.

![image](https://user-images.githubusercontent.com/93580180/177172042-75583f4d-588e-49c0-9e13-ef13bf53610d.png)

2. Click on _**Greet Button**_ to display a message, by default it&#39;s _**Hello, World**_.

![image](https://user-images.githubusercontent.com/93580180/177172075-f19f48e4-2802-4bc0-8017-5febd412c06a.png)

3. Enter a name in the input field, Click _**Save Name**_ button to save the name.

![image](https://user-images.githubusercontent.com/93580180/177172100-eb80c577-2898-47cf-8b57-89b0e478c765.png)

4. Confirm the transaction when MetaMask notification pops up.

![image](https://user-images.githubusercontent.com/93580180/177172154-5662d3ae-9039-4034-81cf-e90d2b427ec2.png)

5. Upon successful transaction confirmation you will see the _**Save successful**_ message.

![image](https://user-images.githubusercontent.com/93580180/177172193-b21c70d9-fc3a-4201-afc8-9a1ae978e18b.png)

6. Click on the _**Greet Button**_ to display a message along with the last name saved with the current account.

![image](https://user-images.githubusercontent.com/93580180/177172207-d7b890de-c603-463d-ab39-a78e3cd56a63.png)

## **Conclusion**

In this post, we developed both the backend and front-end for a decentralized application developed in Node.js that can be used for interacting with smart contracts deployed on the BSC Testnet. The tech stack includes Web3.js, Truffle, Ganache-cli, Node js, MetaMask, and jQuery. Check out our [GitHub](https://github.com/bnb-chain/bnb-chain-tutorial) for more tutorials on how to develop on BSC. If you have any questions or are stuck, reach out to us on our [Discord Channel](https://discord.com/channels/789402563035660308/912296662834241597).
