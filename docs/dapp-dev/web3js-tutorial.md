---
sidebar_label: Using Web3.js Library on BNB Smart Chain
sidebar_position: 2
hide_table_of_contents: false
---

# Using Web3.js Library on BNB Smart Chain
Designed for anyone wanting to learn development on the BNB Smart Chain, this tutorial provides a step-by-step guide on how to use web3.js library along with Nodereal API to fetch transaction details from the BNB Smart Chain blockchain for the given transaction hash. The technology stack used in this tutorial includes Web3.js, Nodereal MegaNode, and http-server. 

## Learning Takeaways:
This tutorial will help you gain knowledge on the following learning points:
-	Using Web3.js library to fetch blockchain data;
-	Using Nodereal’s Meganode API;
-	Deploying static pages onto localhost using http-server.

## Technology Stack Details-	node v16.13.0
-	npm v8.1.0
-	Web3.js
-	http-server 

## Setting up the development environment
1.	Install http-server: ```npm install -g http-server```

![image](https://user-images.githubusercontent.com/93580180/177191619-12099c27-bd4e-414b-8fda-b3bdd52c5d51.png)
 
2.	Clone the BNBChain-Tutorial repository: ```git clone https://github.com/bnb-chain/bnb-chain-tutorial.git```
3.	Change the current directory: ```cd "02-BSC-Block-Explorer"```
4.	Install all the dependencies (node modules): ```npm install```
5.	Before running the application, make sure that you have included the HTTP link for the Nodereal Meganode API in the ```index.html``` as shown in the figure below.

![image](https://user-images.githubusercontent.com/93580180/177191680-2c9b530a-21fa-448b-bf88-e0d6558ada6a.png)

6.	For this project, we have used the BSC Testnet public API key, as shown in the figure below. For a complete list of Nodereal Meganode Public API keys, refer [here](https://docs.nodereal.io/nodereal/meganode/meganode-api-overview/public-api-key). 

![image](https://user-images.githubusercontent.com/93580180/177192584-f76dd7dd-ba44-461a-aac7-568703a4f78d.png)

7.	Run the application by using the command ```http-server``` from the project directory.

![image](https://user-images.githubusercontent.com/93580180/177192648-29422ee0-c8d5-42ff-91e6-5db1bd4c985e.png)

8.	Open your web browser and navigate to any of the ports indicated by the ```http-server``` command.

![image](https://user-images.githubusercontent.com/93580180/177192746-0d9953dd-d398-4e19-b630-30ed90f5e30a.png)

## How to Use
1.	Since we have used the HTTP reference of Nodereal’s Meganode API for BSC testnet, open [BSCscan for Testnet](https://testnet.bscscan.com/), and copy the transaction hash of any transaction of your choice.
2.	Paste this transaction hash into the input field in our block explorer.

![image](https://user-images.githubusercontent.com/93580180/177192831-677e01c7-c3b9-4d11-b0df-4cdb47029cb0.png)

3.	 Click on the Fetch Details button to fetch details of this transaction. 

![image](https://user-images.githubusercontent.com/93580180/177192858-7e04af6b-980c-4e19-8fa2-4af70752fc1c.png)

4.	You can also display other details from the received transaction receipt by changing the code block shown in the figure below as we have displayed the minimum.

![image](https://user-images.githubusercontent.com/93580180/177192885-67184a5e-2bf9-479d-b9ab-e00693020ee9.png)
 
5.	The received transaction receipt has several fields as shown in the figure below.

![image](https://user-images.githubusercontent.com/93580180/177192924-78c07184-8222-4f0c-9eff-bf8fb0972f12.png)


## Conclusion
In this tutorial, we developed a dapp that has both backend and front-end integration that uses Web3.js library that can be used for fetching details of transactions on the BSC testnet by given a transaction hash. The tech stack includes Web3.js, Nodereal MegaNode, and http-server. Check out our [GitHub](https://github.com/bnb-chain/bnb-chain-tutorial) for more tutorials on how to develop on BSC. If you have any questions or are stuck, reach out to us on our [Discord Channel](https://discord.com/channels/789402563035660308/912296662834241597).



