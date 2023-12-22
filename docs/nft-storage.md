---
sidebar_label: Storing NFT on IPFS & Filecoin
hide_table_of_contents: false
sidebar_position: 2

---

# Storing NFTs on IPFS & Filecoin

After the preview two tutorials, you must have learned how to write NFT smart contract and deploy it on BSC testNet. The most important part for any NFT project is that where your NFT assets are stored. If you want to avoid the risk of losing your NFT assets or not able to access them, storing your NFTs on decentralized network is the better option for you.

So in this tutorial, we will walk you through the process of storing your NFT assets on decentralized storage network, like [IPFS](https://ipfs.io/) & [Filecoin](https://filecoin.io/).  We will use [NFT.Storage](https://nft.storage/) in this tutorial since it provides easy to use API/SDK for developers to upload their NFT assets on both IPFS and Filecoin. 

What we will use in this tutorial:

+ [Node.js](https://nodejs.org/en/)
+ [NFT.Storage](https://nft.storage/)
+ BSC Testnet
+ [Remix IDE](https://remix.ethereum.org/)
+ [Metamask](https://metamask.io/)

## Store NFTs using NFT.storage

NFT.Storage is a storage service that lets you store off-chain NFT assets decentralized for free.  Your NFT assets will be stored on both IPFS and Filecoin for the guaranty of fast content-addressing and retrieval on IPFS, as well as verifiable long-term storage on Filecoin. 

NFT.Storage provides multiple ways to upload your NFTs, from user-friendly web UI and NFTUp application to easy to use API to support developers. So it is especially useful for individual creators who are minting NFTs, or NFT tooling developers looking to support creators and collectors! 

In this tutorial, we will more focus on developers who are integrating [NFT.Storage](https://nft.storage/) into their application to Mint NFTs. If you want to learn more about different ways to upload and manager your NFTs, you can check this [Quick Start docs](https://nft.storage/docs/quickstart/). 

Then let's get started. 

### Create an account and get an API token

If this is the first time you use NFT.Storage, you need to create a NFT.Storage account to get an API token which you can use in your applications when you upload NFTs. 

You can sign up for an account for free using either your email or GitHub.

1. Go to [nft.storage/login](https://nft.storage/login) to get started.

2. Click **GitHub** on the Login screen.

3. **Authorize** NFT.Storage when asked by GitHub.

4. Once you are logged in success, you can click the **API Keys** to create a token.

   ![API Token](https://bafybeic55jy6d5gr5uvquz6jqg53wdqqqqtwqsgsch2dmoltsxirmtf3we.ipfs.w3s.link/API-token.png)

5. Click **+ New Key**, and enter a descriptive name for your API token and click **Create**.

6. Now you have successfully create an API Token, you can click **Action- Copy** to copy it to your clipboard to use it later.

### Upload NFTs using Javascript Client

The NFT.Storage [JavaScript client](https://nft.storage/docs/quickstart/client/js/) makes it simple to upload files and create ERC-1155 compatible NFT metadata in your NFT applications.  Both NFT and its metadata will be stored on IPFS and Filecoin, you will receive an IPFS URL for your metadata which you can use to mint your NFT.

We will use a simple node JS script to demonstrate the code to upload NFT and receive the corresponding IPFS URL for its metadata. You can easily integrate this function in your JavaScript or TypeScript applications.

You'll need [Node.js](https://nodejs.org/) version 16 or later for this example.

1. **Make a new JavaScript project.**

   ```shell
   mkdir nft-storage-quickstart
   cd nft-storage-quickstart
   npm init
   ```

   NPM will ask a few questions about your project and create a `package.json` file.

2. **Install `nft.storage` client in your project.**

   Run the following command to install the latest version of `nft.storage` package, and also install `mime` package for the file types.

   ```shell
   npm install nft.storage
   npm install mime
   ```

3. **Create a file called `upload.mjs` and open it with your VS Code.**

   Below is the code you need to upload an image with ERC-1155 compatible NFT metadata. This code here will be used only as example, you can add similar upload logic in your application.

   ```javascript
   import { NFTStorage, File } from "nft.storage"
   import fs from 'fs'
   import dotenv from 'dotenv'
   dotenv.config()
   //This is the API token you have created earlier which is added as one env variable.
   const API_KEY = process.env.NFT_STORAGE_API_KEY 
   
   async function storeAsset() {
      const client = new NFTStorage({ token: API_KEY })
      const metadata = await client.store({
          name: 'ExampleNFT',
          description: 'My ExampleNFT is an NFT example!',
          image: new File(
              [await fs.promises.readFile('MyExampleNFT.png')],
              'MyExampleNFT.png',
              { type: 'image/png' }
          ),
      })
      console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url)
   }
   
   storeAsset()
      .then(() => process.exit(0))
      .catch((error) => {
          console.error(error);
          process.exit(1);
      });
   ```

   The main part of the script is the `storeAsset` function. It creates a new client connecting to NFT.Storage using the API key you created earlier. Next we introduce the metadata consisting of the name, description, and image. Note that we are reading the NFT asset directly from the file system from the `assets` directory. At the end of the function, we will print the metadata URL as we will use it later when creating the NFT on BNB Chain.

4. **Run your script with nodeJS**

   Let's execute the upload logic by running the script and see the output.

   ```shell
   node upload.mjs
   ```

   The output should look like down below. You can directly use the IPFS URL to mint NFT token, or use the URL of NFT.Storage gateway. For instance, `https://nftstorage.link/ipfs/<CID of your NFT>/metadata.json`

   ```shell
   Metadata stored on Filecoin and IPFS with URL: ipfs://bafyreihegljuej4y4ai5ftzb2rdztseb5mmjzba5f5xcdktgd43rkoxhw4/metadata.json
   ```

Now you have your NFT assets stored on IPFS and Filecoin, you can access it via [NFT.Storage gateway](https://nftstorage.link/ipfs/bafyreihegljuej4y4ai5ftzb2rdztseb5mmjzba5f5xcdktgd43rkoxhw4/metadata.json) and you are ready to mint your NFT. Please record the metadata url which we will use to mint NFT later.

## Mint NFTs

This tutorial will more focus on how to store NFT assets on IPFS and Filecoin other them teaching how to develop NFT smart contract. If you wish to learn how to deploy NFTs on BSC, you should learn it from [Deploy NFTS on BSC using Truffle](https://docs.bnbchain.org/docs/ERC721).

In this section, I will simply use Remix to write NFT contract, deploy and invoke it via MetaMask. Before we move forward, let's make sure you have the following items ready.

+ Installed MetaMask.
+ Configured BNB Smart Chain TestNet on MetaMask.
+ Requested BNB TestNet tokens.

### Write NFT contract using Remix

We will use Remix IDE to write your NFT contract. In this example, we are going to use ERC721URIStorage from OpenZeppenlin. 

Open [Remix IDE](https://remix.ethereum.org/), create a new solidify file, name it `NFTExample.sol` and copy the contract code down below. 

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BSCNFT is ERC721URIStorage{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    event NewNFTMinted(address sender, uint256 tokenId, string tokenURI);

    constructor() ERC721 ("NFT Examples on BSC", "BSC-NFT") {}

    function mintItem(string memory tokenURI) public{
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        emit NewNFTMinted(msg.sender, newItemId, tokenURI);
    }
}
```

If everything works fine, the Remix will compile your smart contract automatically and it is ready to be deployed to BSC TestNet.

### Deploy your NFT contract

Before deploying your NFT smart contract, make sure you switch the network to BSC TestNet on MetaMask and also have some test tokens to pay for transaction fees.

On the Remix IDE, go to `Deployment` page and make sure you choose `Injected Provider - MetaMask` for the environment. Now, you can click the `Deply` button and confirm the transaction on MetaMask.

![Remix Deploy contract](https://bafybeidvywca5576p7w445zaywsw5jf5gmyyktkhik2o52nlkjvlp7d6tu.ipfs.w3s.link/Remix-Deploy.png)

Once the deployment transaction is confirmed on-chain, you will be able to verify the transaction and contract on [BSC TestNet blockchain explorer](https://testnet.bscscan.com/). 

You can also directly interact with the deployed NFT contract on Remix IDE. Try to invoke the `name` and `symbol` methods to verify if this is the NFT contract you deployed.

### Mint your NFT

Now, we are all set to mint the NFT. Instead of using metadata storing on centralized server, we will use the metadata which we stored on IPFS & Filecoin using NFT.Storage in previous steps. 

We will copy the NFT metadata URL, something like `ipfs://bafyreihegljuej4y4ai5ftzb2rdztseb5mmjzba5f5xcdktgd43rkoxhw4/metadata.json` and mint NFT on Remix IDE. 

+ On Remix IDE, go to the `Deployed Contracts` section and find `mintItem` method.

+ Paste the NFT metadata URL in the tokenURI params field, and click `transact`.

  ![Mint NFT image](https://bafybeidfqia4cfhj77g4n3wfstdf6qdauyrvxlubiwpvzbf5n6hlnmkg3m.ipfs.w3s.link/MintNFT.png)

+ You will need to confirm and sign the transaction when MetaMask popup for confirmation. 

+ **Verify your newly minted NFT**
  Once the transaction is confirmed on BSC TestNet, you will be able to verify whether your NFT is minted successfully or not by invoking either  `balanceOf` or `ownerOf`. I will take `balanceOf` as the example here. 

  ![Balance of Image](https://bafybeibcjnrijqdlwml6iuknkg6c6ydwlcqihiobzomelctmcbond75ima.ipfs.w3s.link/balanceOf.png)You can also verify your NFT on [Opensea Testnets](https://testnets.opensea.io/account) once you connect to MetaMask account. Then you will see the freshly minted NFT under your account. 

  ![Your NFT on OpenSea](https://bafybeiapuxvoxxfdxjgyta6nl6uc65aoknvv57dq73x6vowfkq4c26ehb4.ipfs.w3s.link/NFT-OS.png)
