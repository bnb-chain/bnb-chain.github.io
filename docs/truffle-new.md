---
sidebar_label: Using Truffle
hide_table_of_contents: false
sidebar_position: 2
---

# Using Truffle for Deploying Smart Contracts on BSC 
In this tutorial, you will learn to create, compile nad deploy smart contract on the BNB Smart Chain network using the Truffle IDE. 

## Setting up the development environment

### Requirements
There are a few technical requirements before we start. Please install the following:

- Windows, Linux or Mac OS X
- [Node.js v8.9.4 LTS or later](https://nodejs.org/en/)
- [Git](https://git-scm.com/)

**Recommendations for Windows**
If you're running Truffle on Windows, you may encounter some naming conflicts that could prevent Truffle from executing properly. Please refer to the [official Truffle Documentation](https://trufflesuite.com/docs/truffle/reference/configuration/#resolving-naming-conflicts-on-windows) to find solutions for resolving naming conflicts.

### Installing Truffle

Once the above mentioned softwares are installed, we only need one command to install Truffle:

```
npm install -g truffle
```
To verify that Truffle is installed properly, type **`truffle version`** on a terminal. If you see an error, make sure that your npm modules are added to your path.

If you're new to Truffle then please follow the [Getting Started](https://www.trufflesuite.com/docs/truffle/quickstart) by truffle, To setup the truffle environment.

## Project Creation, Compilation, and Configuration

To use most Truffle commands, you need to run them against an existing Truffle project. So the first step is to create a Truffle project.

## Creation 

For creating a scaffold project for getting started, you can use the [Truffle Boxes](https://trufflesuite.com/boxes), BSC Starter Box for an eample template to start devloping on BNB Smart Chain. 

For this tutorial, we have used the [MetaCoin box](https://trufflesuite.com/boxes/metacoin) as an example, which creates a token that can be transferred between accounts. Use the command ```truffle unbox metacoin``` to unbox the metacoin box.


> **_NOTE:_**  You can use the ```truffle unbox <box-name>``` command to download any of the other [Truffle Boxes](https://trufflesuite.com/boxes). Another alternative is to create a bare Truffle project with no smart contracts included using the ```truffle init``` command.


Once this operation is completed, you'll now have a project structure with the following items:

* contracts/: Directory for Solidity contracts
* migrations/: Directory for scriptable deployment files
* test/: Directory for test files for testing your application and contracts
* truffle-config.js: Truffle configuration file

### Create Contract

You can write your own smart contract or download the [BEP20 token smart contract template](https://github.com/bnb-chain/bsc-genesis-contract/blob/master/contracts/bep20_template/BEP20Token.template) and place it in the ``contracts`` directory.

### Compile Contract

To compile a Truffle project, change to the root of the directory where the project is located and then type the following into a terminal:

```
truffle compile
```

### Configuring Truffle for BSC

- Go to truffle-config.js
- Update the truffle-config with bsc-network-crendentials.

```js
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard BSC port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    testnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bsc: {
      provider: () => new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.8.0", // A version or constraint - Ex. "^0.5.0"
    }
  }
}
```

> **_NOTE:_** Notice, it requires mnemonic to be passed in for Provider, this is the seed phrase for the account you'd like to deploy from. Create a new .secret file in root directory and enter your 12 word mnemonic seed phrase to get started. To get the seedwords from metamask wallet you can go to Metamask Settings, then from the menu choose Security and Privacy where you will see a button that says reveal seed words, refer [here](https://metamask.zendesk.com/hc/en-us/articles/360015290032-How-to-reveal-your-Secret-Recovery-Phrase) for more details.

## Deploying on BSC Network

Run this command in root of the project directory:
```js
$ truffle migrate --network testnet
```

Contract will be deployed on Binance Chain Chapel Testnet, it look like this:

```js
1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xaf4502198400bde2148eb4274b08d727a17080b685cd2dcd4aee13d8eb954adc
   > Blocks: 3            Seconds: 9
   > contract address:    0x81eCD10b61978D9160428943a0c0Fb31a5460466
   > block number:        3223948
   > block timestamp:     1604049862
   > account:             0x623ac9f6E62A8134bBD5Dc96D9B8b29b4B60e45F
   > balance:             6.24574114
   > gas used:            191943 (0x2edc7)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00383886 ETH

   Pausing for 5 confirmations...
   ------------------------------
   > confirmation number: 2 (block: 3223952)
   > confirmation number: 3 (block: 3223953)
   > confirmation number: 4 (block: 3223954)
   > confirmation number: 6 (block: 3223956)

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00383886 ETH


Summary
=======
> Total deployments:   1
> Final cost:          0.00383886 ETH
```

> **_Note_** Remember your address, transaction_hash and other details provided would differ, Above is just to provide an idea of structure.

🎉 **Congratulations!** You have successfully deployed BEP20 Smart Contract. Now you can interact with the Smart Contract.

You can check the deployment status here: <https://bscscan.com/> or <https://testnet.bscscan.com/>


# Verify Your Contract on BscScan

The recommended way to verify a smart contract is using the plugin. It is easier to read and imports and licenses are maintained.

**Verified using Truffle**

Example: <https://testnet.bscscan.com/token/0x68D2E27940CA48109Fa3DaD0D2C8B27E64a0c6cf>

GitHub Project: <https://github.com/huangsuyu/verify-example>

## BscScan plugin for Truffle

Truffle has a BscScan plugin: [truffle-plugin-verify](https://github.com/rkalis/truffle-plugin-verify)

You need to deploy with Truffle to verify with the Truffle verify plugin.

Get API key: https://bscscan.com/myapikey

### Install the plugin

```bash
npm install -D truffle-plugin-verify
```

### Configure the plugin 

Configure the plugin in `truffle-config.js` using the following command

```js
const HDWalletProvider = require("@truffle/hdwallet-provider");

// const infuraKey = "fj4jll3k.....";
//
const { mnemonic, BSCSCANAPIKEY} = require('./env.json');

module.exports = {

  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    bscscan: BSCSCANAPIKEY
  },
  networks: {

    testnet: {
        provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
        network_id: 97,
        timeoutBlocks: 200,
        confirmations: 5,
        production: true    // Treats this network as if it was a public net. (default: false)
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
       version: "0.5.16",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: false,
         runs: 200
       },
       evmVersion: "byzantium"
      }
    },
  },
};

```

### Verification Command

```
truffle run verify BEP20Token@{contract-address} --network testnet
```
You should see the following output:

```
Verifying BEP20Token@0x68D2E27940CA48109Fa3DaD0D2C8B27E64a0c6cf
Pass - Verified: https://testnet.bscscan.com/address/0x68D2E27940CA48109Fa3DaD0D2C8B27E64a0c6cf#contracts
Successfully verified 1 contract(s).
```
