---
sidebar_label: Deploy NFTs
---

# Deploy NFTs on BAS Aries Network

> This work is inspired by ​[this blog](https://forum.openzeppelin.com/t/draft-create-an-nft-and-deploy-to-a-public-testnet-using-truffle/2961).

In this tutorial we will create a non-fungible token (NFT) and deploy to the Aries testnet. ERC721 is a standard for representing ownership of, that is, where each token is unique such as in real estate or collectibles. We will use [Presents](https://docs.openzeppelin.com/contracts/3.x/api/presets) contracts in [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/3.x/) to create an ERC721 and deploy using Truffle.

## Setting up the Environment
We begin by creating a new project.

```
$ mkdir mynft && cd mynft
$ npm init -y
```
Then we install [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts) which has an implementation of ERC721.

```
$ npm i --save-dev @openzeppelin/contracts
```

Next we install a development tool for deployment, for this tutorial we will use [Truffle](https://www.trufflesuite.com/) but we could use any other tools such as Buidler, [Remix](https://remix.ethereum.org) or [OpenZeppelin CLI](https://docs.openzeppelin.com/cli).

```
$ npm i truffle
```

## Getting the contract artifacts

We will setup our Solidity project using `truffle init` to create a `contracts` directory and configuration to connect to a network.

```
$ npx truffle init
Starting init...
================

> Copying project files to

Init successful, sweet!
```

We are going to use Preset `ERC721PresetMinterPauserAutoId` which is an ERC721 that is preset so it can be minted (with auto token ID and metadata URI), paused and burned.

The Preset contracts have already been compiled, so we only need to copy the artifacts to the `build/contracts` directory.

```
$ mkdir -p build/contracts/
$ cp node_modules/@openzeppelin/contracts/build/contracts/* build/contracts/
Using your favorite editor create 2_deploy.js in the migrations directory with the following contents:
// migrations/2_deploy.js
// SPDX-License-Identifier: MIT
const ERC721PresetMinterPauserAutoId = artifacts.require("ERC721PresetMinterPauserAutoId");

module.exports = function(deployer) {
  deployer.deploy(ERC721PresetMinterPauserAutoId, "My NFT","NFT", "http://my-json-server.typicode.com/huangsuyu/nft/tokens");
};
```

## Deploy the contract to a local blockchain

We will use `truffle develop` to open a Truffle console with a development blockchain.

* Head over to Faucet and request test BNB
  
```
$ npx truffle develop
Truffle Develop started at http://127.0.0.1:8545/

Accounts:
(0) 0xc7e4bbc4269fdc62f879834e363173aee7895f45

Private Keys:
(0) ef424b4dc91a9c9d6c1fc4ae0a50ce80668f3a955a7e982584b45577e2c70e27

Mnemonic: mechanic cannon setup general indicate people notable frown poet friend credit true

⚠️  Important ⚠️  : This mnemonic was created for you by Truffle. It is not secure.
Ensure you do not use it on production blockchains, or else you risk losing funds.

truffle(develop)> migrate

Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Artifacts written to /Users/Documents/work/mynft/build/contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang

Starting migrations...
======================
> Network name:    'develop'
> Network id:      5777
> Block gas limit: 67211175 (0x6691b7)

1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x9a17a50e6efd52ba3e55245c76c52b065d20587add45aee732c233987033e567
   > Blocks: 0            Seconds: 0
   > contract address:    0x77409B688eA5461078a31450F3138EA8324F72C9
   > block number:        1
   > block timestamp:     1604387655
   > account:             0xc7e4bBc4269fdC62F879834E363173aeE7895F45
   > balance:             99.99616114
   > gas used:            191943 (0x2edc7)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00383886 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00383886 ETH


2_deploy.js
===========

   Deploying 'ERC721PresetMinterPauserAutoId'
   ------------------------------------------
   > transaction hash:    0xc1a3994c2ad2ba706ac49934b4f480c7b3d9b94241f526afa2dfe91545145a4e
   > Blocks: 0            Seconds: 0
   > contract address:    0xEaB17D581552123695f03F12b09e378EE9463b44
   > block number:        3
   > block timestamp:     1604387655
   > account:             0xc7e4bBc4269fdC62F879834E363173aeE7895F45
   > balance:             99.92142266
   > gas used:            3694586 (0x385ffa)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.07389172 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.07389172 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.07773058 ETH

truffle(develop)>
```

We can deploy our new NFT to our development blockchain using `migrate` command.

```
truffle(develop)> migrate

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



Starting migrations...
======================
> Network name:    'develop'
> Network id:      5777
> Block gas limit: 67211175 (0x6691b7)


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0x5d71b0a45a0fe20e2ca645393bb44b83fbd47351c009c48be0b8b84b610fb3b7
   > Blocks: 0            Seconds: 0
   > contract address:    0x37117c825cAC4a1FA765F6D8cd7787fB195849555
   > block number:        1
   > block timestamp:     1590736865
   > account:             0x0445c33BdCe670D57189158b88c0034B579f37cE
   > balance:             99.99671674
   > gas used:            164163 (0x28143)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00328326 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00328326 ETH


2_deploy.js
===========

   Replacing 'ERC721PresetMinterPauserAutoId'
   ------------------------------------------
   > transaction hash:    0x166d7b28f4afb949585b5a0e5b4151daa54acbcb70566b202fd62ab380a6650c
   > Blocks: 0            Seconds: 0
   > contract address:    0xDEE9411430c7Dd9b67fC6DA723DE729AdAB50AD7
   > block number:        3
   > block timestamp:     1590736866
   > account:             0x0445c33BdCe670D57189158b88c0034B579f37cE
   > balance:             99.92191642
   > gas used:            36117675 (0x386c0b)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0739535 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0739535 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.07723676 ETH
```

We can then use our deployed contract.

```
truffle(develop)> nft = await ERC721PresetMinterPauserAutoId.deployed()
undefined
```

## Interact with our Token
The accounts that we can use were displayed when we started `truffle develop`

### Token metadata

We can call the contract to read token metadata such as `name`, `symbol`, and `baseURI`.

```
truffle(develop)> await nft.name()
'My NFT'
truffle(develop)> await nft.symbol()
'NFT'
truffle(develop)> await nft.baseURI()
```

### Mint
We can send a transaction to mint tokens to a given account, from an account with the minter role. In our case we are minting from the account which deployed the token, which is given the minter role.

We will mint 1 NFT with token ID 0.

```
truffle(develop)> await nft.mint("0x0445c33bdce670d57189158b88c0034b579f37ce")
{ tx:
   '0xd301a60dbb8ac187687f6639f200d4e6f2cfa065923092b3940330e35a26421d',
  receipt:
   { transactionHash:
      '0xd301a60dbb8ac187687f6639f200d4e6f2cfa065923092b3940330e35a26421d',
     transactionIndex: 0,
     blockHash:
      '0x3ad3cfcb26da0c969e9d5a5414a5e90a91a3a862c9e9082afc38a0ec0f1a5d00',
     blockNumber: 5,
     from: '0x0445c33bdce670d57189158b88c0034b579f37ce',
     to: '0xdee9411430c7dd9b67fc6da723de729adab50ad7',
     gasUsed: 156470,
...
```

We can check the owner of the token and the token URI for the metadata

```
truffle(develop)> await nft.ownerOf(1)
'0x0445c33BdCe670D57189158b88c0034B579f37cE'
truffle(develop)> await nft.tokenURI(1)
```

## MetaData
For this tutorial, we will use [My JSON Server](https://my-json-server.typicode.com/) where we can store a single JSON file in a GitHub repository that we can access via a fake JSON server.

For production we need to store our metadata in a permanent location that can exist for the life of the token.
 
A sample JSON for tokenID 1 is: http://my-json-server.typicode.com/huangsuyu/nft/tokens/1


## Deploy to a public testnet

Next we will deploy to BAS Testnet .

To deploy, we will use the instructions for [Connecting to Public Test Networks with Truffle](https://forum.openzeppelin.com/t/connecting-to-public-test-networks-with-truffle/2960)

You will need the following:

* `@truffle/hdwallet-provider` installed
  
* Configure truffle-config.js for BAS testnet network
  
* A funded testnet account and mnemonic
  
* A `secrets.json` or another secret-management solution. **Make sure you don’t commit this to GitHub!**
  
The `truffle-config.js` has the following testnet configuration:
```
     testnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://bas-aries-public.nodereal.io`),
      network_id: 117,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    }
```

## Deploy to BAS Testnet
```
$ npx truffle migrate --network testnet

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.

Starting migrations...
======================
> Network name:    'develop'
> Network id:      5777
> Block gas limit: 67211175 (0x6691b7)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x9a17a50e6efd52ba3e55245c76c52b065d20587add45aee732c233987033e567
   > Blocks: 0            Seconds: 0
   > contract address:    0x77409B688eA5461078a31450F3138EA8324F72C9
   > block number:        1
   > block timestamp:     1604387655
   > account:             0xc7e4bBc4269fdC62F879834E363173aeE7895F45
   > balance:             99.99616114
   > gas used:            191943 (0x2edc7)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00383886 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00383886 ETH


2_deploy.js
===========

   Deploying 'ERC721PresetMinterPauserAutoId'
   ------------------------------------------
   > transaction hash:    0xc1a3994c2ad2ba706ac49934b4f480c7b3d9b94241f526afa2dfe91545145a4e
   > Blocks: 0            Seconds: 0
   > contract address:    0xEaB17D581552123695f03F12b09e378EE9463b44
   > block number:        3
   > block timestamp:     1604387655
   > account:             0xc7e4bBc4269fdC62F879834E363173aeE7895F45
   > balance:             99.92142266
   > gas used:            3694586 (0x385ffa)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.07389172 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.07389172 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.07773058 ETH
```


## Mint
We can send a transaction to mint tokens to a given account, from an account with the minter role.

```
truffle(develop)> nft = await ERC721PresetMinterPauserAutoId.deployed()
undefined
```

In our case we are minting from the account which deployed the token, which is given the minter role.
To see configured accounts run the command `accounts`.

```
truffle(testnet)> accounts
[ '0x133d144f52705ceb3f5801b63b9ebccf4102f5ed',
We will mint 1 NFT with token ID 1. Specify the address that you want to be the token holder (0xc7e4bBc4269fdC62F879834E363173aeE7895F45 is a test account)
truffle(testnet)> await nft.mint("0x133d144f52705ceb3f5801b63b9ebccf4102f5ed")
{ tx:
   '0x0d90d4a2a4ac3f33d5220deb11e8f65adf14a6669afd18abd4cce8ca7ab58e04',
  receipt:
   { blockHash: '0x724ba66bc1d799820c05a93ae67991b21bb769fd1e9dddd5db9f725f5f633331',
     blockNumber: 3333746,
     contractAddress: null,
     cumulativeGasUsed: 164785,
     from: '0x77737a65c296012c67f8c7f656d1df81827c9541',
     gasUsed: 164785,
...
```