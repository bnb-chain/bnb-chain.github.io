---
sidebar_label: Using Black IDE
hide_table_of_contents: false
sidebar_position: 2
---

# Using Black IDE to Deploy NFTs on BSC

In this tutorial, we provide a step-by-step guide to the readers on how to issue Non-fungible tokens (NFTs) (ERC721/1155) on the BNB Smart Chain (BSC) Testnet using the Black IDE. This is a detailed guide to learning how to issue, mint and transfer NFTs on the BSC Testnet. The technology stack used in this tutorial includes Solidity , Truffle, MetaMask, and BlackIDE. 

## Learning Takeaways:
This tutorial will help you gain knowledge on the following learning points:
-	Using BlackIDE for smart contract development;
-	Managing Keypairs and Funding BNB Tokens to your account on BlackIDE;
-	MetaMask Wallet connectivity to BSC Testnet;
-	Smart-contract development;
-	Issuing, minting, and transferring NFTs;

## Technology Stack Details
-	BlackIDE v0.15.4
-	Truffle v5.5.19 (core: 5.5.19)
-	MetaMask Wallet v10.16.1
-	Docker v20.10.14

## Brief Introduction Tech Stack
1.	**Solidity:** one of the most popular object-oriented high-level smart contract programming languages. For more details on Solidity, refer here.
2.	**MetaMask Wallet Browser Extension:** we recommend using the Metamask Chrome extension. It is a web wallet that allows connecting the chrome browser to any valid blockchain network.
3.	**Black IDE:** Black IDE is an integrated development environment (IDE), making developing EVM-compatible smart contracts faster and easier. Black IDE offers both desktop and web (Black IDE Web) applications.

## Setting up the Environment
We aim to keep this tutorial as simple as possible and hence tend to use as minimal resources as possible and have used the following tools in this tutorial.
*	Metamask Wallet
*	Ensure that you have the Metamask Wallet extension installed and running on our browser.
*	Configure the Metamask wallet for use with the BSC Testnet. Use the following details to add the BSC Testnet. For further details, refer here.
*	Network Name: BSC Testnet
*	RPC URL: https://data-seed-prebsc-1-s1.binance.org:8545/
*	Chain ID: 97
*	Currency Symbol: BNB
*	Block Explorer URL: https://testnet.bscscan.com 
*	Black IDE: both desktop app and web app are available and it is up to your convenience to choose from. For this tutorial, we used the desktop app as the web app lacks support for importing OpenZeppelin Contracts. 
*	Download/Install any dependencies required by BlackIDE

![image](https://user-images.githubusercontent.com/93580180/177942609-e2c942a6-342c-46cd-b794-92fc8e72bdc0.png)

## Login into Black IDE
1.	Open the Black IDE desktop application. We will be using it for compiling and deploying our smart contract for NFTs on the BSC Testnet.
2.	Click on the Login button and authorize using your GitHub account.

![image](https://user-images.githubusercontent.com/93580180/177942736-d3d79717-8952-4fc7-b7c2-b28dc978f277.png)

## Create New Project
3.	Click on the New button next to the projects to create a new project. 

![image](https://user-images.githubusercontent.com/93580180/177942931-510837df-ed97-4a8e-a4df-cc4aeca24294.png)

4.	Specify the location where you want to save your project on your device, the project name, e.g. “BSC-NFT”, and select the project type from the dropdown list as “Basics- ERC20, ERC721, & ERC1155 (v31+)”. Then click the Create button to create the project.

![image](https://user-images.githubusercontent.com/93580180/177942969-a1e8170f-e806-44d5-9e9f-99e5cc2914f8.png)

5.	Remember the smart contract in this tutorial is just a sample, you can always modify and be innovative.

## Smart Contract Creation 
6.	Expand the contracts menu and delete the default files. 

![image](https://user-images.githubusercontent.com/93580180/177948005-436776e5-07b4-4109-8b19-897925e623e4.png)

7.	Right-click on the contracts menu and select New File. Specify a name for your file, e.g., BSC-NFT.sol, and then click Create button.

![image](https://user-images.githubusercontent.com/93580180/177943065-cc591abd-d856-4c9c-bbef-94b2e826af7f.png)

## Write your smart contract code
8.	Copy the following code into your smart contract file. We have used the contract code from this [repo](https://github.com/RumeelHussainbnb/ERC721_NFT/blob/main/BSC-NFT.sol).
9.	Remember to change the ```MINT_PRICE```, ```MAX_SUPPLY```, ```name```, and ```symbol``` of the token as per your need. Also, remember to change the ```_baseURI``` as per your token.
10.	
![image](https://user-images.githubusercontent.com/93580180/177949895-a095fdb5-f770-4530-84f6-8854a0d7a5eb.png)

## Edit default project settings
10.	Click on the config.json file to change the default setting. Change the main file name to the name of your contract, BSC-NFT.sol in our case. Similarly, change the name of the smart contract to deploy, BSCNFT.json in our case. 

![image](https://user-images.githubusercontent.com/93580180/177948095-b6a905da-792c-47da-86d6-8a5d5db6a40b.png)
 
## Connect the Black IDE to the BSC Testnet
11.	In order to connect the Black IDE to the BSC Testnet, click on the dropdown icon on the network menu in the top right corner and then select Testnet under the BNB Chain label.

![image](https://user-images.githubusercontent.com/93580180/177948186-e052e522-7069-4072-abae-fd0e6c819ee6.png)

12.	Click on the ![image](https://user-images.githubusercontent.com/93580180/177943789-3557fde5-8805-4b03-ace8-05d2ace216c0.png) icon in the bottom left corner of the IDE to generate new keypair to perform transactions. You can skip this step if you already have generated a keypair. On the Keypair Manager, click on the CREATE button to generate new keypair.

![image](https://user-images.githubusercontent.com/93580180/177944146-eb6e2f1e-95f0-4b00-8458-c8145b008d15.png)

13.	Specify your desired name for the keypair, in our case BSC-Testnet-Key. Then click on the CREATE button. Remember to keep your private keys securely and not share them with anyone.

![image](https://user-images.githubusercontent.com/93580180/177944170-fa9ed3bc-53d9-41f3-8a46-a07f56fee1d7.png)

## Acquire BNB Test Tokens
*	Initially, the balance of a newly created key pair is 0.0 ETH. To get BNB test tokens, you can use the [BSC Testnet Faucet](https://testnet.binance.org/faucet-smart/).
*	Copy your public address from the keypair manager

![image](https://user-images.githubusercontent.com/93580180/177944290-d06f2f06-e256-4110-8936-809c0f78e0fa.png)

*	Paste this on the facet and acquire test tokens as required, as shown below. A green pop-up is displayed on the successful transfer of test tokens.

![image](https://user-images.githubusercontent.com/93580180/177944333-ca8aefed-fec2-4271-aa3e-d2ccc301eb6c.png)
 
*	 Close and re-open keypair manager to verify that the balance has been updated. Wait for approx. 1-2 mins for balance to get updated.

![image](https://user-images.githubusercontent.com/93580180/177944370-3aa70613-be45-4558-8c83-aca1a00557c3.png)

## Deploy Smart Contract on BSC Testnet
1.	Select the appropriate Solidity compiler version from the bottom right corner of the IDE, Solc (0.8.4), ![image](https://user-images.githubusercontent.com/93580180/177944415-e733562a-54ad-4ed8-85a5-f17c79edfeac.png)
in our case. 
2.	Click on the Build icon ![image](https://user-images.githubusercontent.com/93580180/177944483-ff523eed-017d-4265-b722-78ded06fe826.png) to build your smart contract. Upon successful build, the project navigation pane reflects a new folder named build. This folder contains contracts folder that has json files of the contracts built. All of the contracts imported in our BSCNFT contract are also built and imported as json files. 

![image](https://user-images.githubusercontent.com/93580180/177948331-ece850ae-01fd-479b-b25f-d1f28c3400f6.png)

3.	After successfully building your contract, it’s time to deploy the contract. Click on the Deploy icon ![image](https://user-images.githubusercontent.com/93580180/177944540-10d86198-03f2-40d8-8ac0-c013483c6458.png) for deploying your smart contract. Specify the details for your contract, as shown below, then click on the Estimate & Deploy button. The wizard will auto-estimate and fill the gas limit for your contract. Then click the Deploy button. 

![image](https://user-images.githubusercontent.com/93580180/177944618-47b0fb1d-0ce3-4512-9b29-66f7a3416325.png)
![image](https://user-images.githubusercontent.com/93580180/177944632-839f7ac5-c9d5-4d80-b6fe-0b6be2e6c3fb.png)

4.	Deployment details will pop-up, as shown in the figure below.

![image](https://user-images.githubusercontent.com/93580180/177944726-41c20038-1fc5-434a-b61f-be54f36f3ac6.png)

5.	The status of the transaction will be updated to confirmed after the transaction is confirmed as shown in the figure below

![image](https://user-images.githubusercontent.com/93580180/177944768-dc622464-832f-4afd-8ccd-0529c675d46d.png)

6.	You can also view this transaction by clicking on the transaction icon in the bottom left on the IDE.

![image](https://user-images.githubusercontent.com/93580180/177944786-8b7f3e34-e562-406b-890e-dcc22d48313f.png)

## Interact with deployed smart contract and Mint NFTs
1.	You can also interact with the contract using the different functions. Click on the Transactions Icon on the bottom-left corner of the IDE and then transaction of deployment of your smart contract. On the transaction details, click on the contract address to access the functions to interact with the smart contract. The left most column has all the Write Functions. The middle column has the View Functions and the right most column has the Events details.

![image](https://user-images.githubusercontent.com/93580180/177948835-197860e5-8f25-4692-bc34-467a997f98a1.png)
 
## Mint NFTs
1.	As per our smart contract, when the contract is deployed, unless the NFTs are minted they won’t be visible in the wallet. 
2.	Create another keypair as defined previously. We will be issuing i.e. minting NFTs to the public address of this new keypair.
3.	To mint i.e. issue an NFT to a specific user we use the “safeMint” function of the deployed smart contract. As shown in Steps 1 and 2 in the figure below, navigate to the deployed contracts, then in the left-most column click the drop-down menu to view the list of write functions available for use with the deployed contract. Select the “safeMint” function. 
4.	Use the safeMint function to mint new NFTs to a specific user address. As shown in figure above, steps 3 to 6, enter the “ETH to send” as the minting price of NFT, as per our smart contract the minting price is 50000000000000000 Wei, i.e., 0.05 ETH. We entered 0.06 ETH to cover the transaction charges as well. Then select the address to whom you want to issue (mint) an NFT to. Here, for the To address use the newly generated keypair in the section above. After this, click the transact button  to execute the safeMint function. For the Signer, ensure that you are using the account that was used to deploy the smart contract. 

![image](https://user-images.githubusercontent.com/93580180/177949113-3de5d538-852f-4a21-aa75-47d0231b6521.png)

5.	To confirm what transfers have occurred, execute the Transfer event from the right most column. This will display the list of NFT transfers along with NFT token id, as shown in the figure below.

![image](https://user-images.githubusercontent.com/93580180/177945187-4e426ba2-a63f-4648-a259-fc9506ab5cb1.png)

6.	To confirm owner of an NFT, use the ownerOf function. Pass the token id as input to the function, as illustrated in the figure below.

![image](https://user-images.githubusercontent.com/93580180/177945228-3a984146-dfa5-4a7b-9306-6258e9990f2a.png)

## View Your NFTs in Metamask Wallet
1.	On the receiving end, the user can import the NFT token details into their Metamask wallet to view the assets. Please note that currently, Metamask Web Extension does not support the use of NFTs however, the mobile app version does support it. For the next steps to view the owned NFTs in your Metamask wallet, we will be using the Metamask Mobile Application.
2.	Open Keypair manager on the Black IDE and copy the private key of the keypair that you minted i.e., transfer NFT.

![image](https://user-images.githubusercontent.com/93580180/177945281-060b95ce-2912-49a2-aa5d-bbf848ba9688.png)

3.	On the Metamask wallet mobile app, import an account using this key pair. Enter the private key copied in the previous step and click import.

![image](https://user-images.githubusercontent.com/93580180/177954799-b86dae87-5274-4408-9d0b-5b52682549d1.png)

4.	After importing account, the next step is to add the BSC Testnet configuration to the wallet. Ensure that you are using the same account whose pubic address was issued the NFT.

![image](https://user-images.githubusercontent.com/93580180/177950571-4674930b-c8c6-4480-8808-ea587af2bb2d.png)

5.	Ensure that your account is connected to the BSC Testnet. Also, ensure that you have enough BNB test tokens in your account. If not, you can use the BSC Testnet Faucet to acquire some, as mentioned earlier.

![image](https://user-images.githubusercontent.com/93580180/177945438-84033dff-6d51-4fe6-875b-3b12bfe815c1.png)
 
6.	To view the owned NFT assets your Metamask Mobile Wallet, click on the NFTs tab and then on the Import Tokens. Fill in the NFT details. In the address field, pass the address of the deployed contract and in the Id field pass the tokenID. Then click the Import button.

![image](https://user-images.githubusercontent.com/93580180/177949365-52efd22c-25ac-4eac-b47e-82349d6b0a5c.png)

## Conclusion 
In this tutorial, we provided a step-to-step guide on how to issue, mint and transfer NFTs on the BSC Testnet using the BlackIDE from Obsidian Labs.. The technology stack used in this tutorial includes Solidity, Truffle, MetaMask, and BlackIDE. Check out our [GitHub](https://github.com/bnb-chain/bnb-chain-tutorial) for more tutorials on how to develop on BSC. If you have any questions or are stuck, reach out to us on our [Discord Channel](https://discord.com/channels/789402563035660308/912296662834241597).

