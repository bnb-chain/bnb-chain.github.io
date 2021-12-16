
# Using Truffle
## Setting up the development environment

There are a few technical requirements before we start. Please install the following:
Requirements:

- Windows, Linux or Mac OS X
- [Node.js v8.9.4 LTS or later](https://nodejs.org/en/)
- [Git](https://git-scm.com/)

**Recommendations for Windows**

If you're running Truffle on Windows, you may encounter some naming conflicts that could prevent Truffle from executing properly. Please see the section on resolving naming conflicts for solutions.

## Installing

Once we have those installed, we only need one command to install Truffle:
```
npm install -g truffle
```
To verify that Truffle is installed properly, type **`truffle version`** on a terminal. If you see an error, make sure that your npm modules are added to your path.

## Create A Project

The first step is to create a Truffle project. We'll use the *MegaCoin as an example, which creates a token that can be transferred between accounts:

- Create a new directory for your Truffle project

```
mkdir MegaCoin
cd MegaCoin
```

- Intialize your project:
```
truffle init
```

Once this operation is completed, you'll now have a project structure with the following items:

* contracts/: Directory for Solidity contracts
* migrations/: Directory for scriptable deployment files
* test/: Directory for test files for testing your application and contracts
* truffle-config.js: Truffle configuration file

### Create Contract

You can write your own smart contract or download the BEP20 token smart contract template.

### Compile Contract

To compile a Truffle project, change to the root of the directory where the project is located and then type the following into a terminal:
```
truffle compile
```


### Config Truffle for BSC

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
      version: "^0.6.12", // A version or constraint - Ex. "^0.5.0"
    }
  }
}
```

Notice, it requires mnemonic to be passed in for Provider, this is the seed phrase for the account you'd like to deploy from. Create a new .secret file in root directory and enter your 12 word mnemonic seed phrase to get started. To get the seedwords from metamask wallet you can go to Metamask Settings, then from the menu choose Security and Privacy where you will see a button that says reveal seed words.

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

> Remember your address, transaction_hash and other details provided would differ, Above is just to provide an idea of structure.

**Congratulations!** You have successfully deployed BEP20 Smart Contract. Now you can interact with the Smart Contract.

You can check the deployment status here: <https://bscscan.com/> or <https://testnet.bscscan.com/>


