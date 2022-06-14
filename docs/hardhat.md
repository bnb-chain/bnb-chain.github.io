# Using Hardhat

## What is Hardhat

Hardhat is a development environment to compile, deploy, test, and debug your smart contract.

## Setting up the development environment

There are a few technical requirements before we start. Please install the following:
Requirements:

## Installing

There are a few technical requirements before we start. Please install the following:
Requirements:

- Windows, Linux or Mac OS X
- [Node.js v8.9.4 LTS or later](https://nodejs.org/en/)
- [Git](https://git-scm.com/)

First, you need to create an empty project `npm init --yes`

Once your project is ready, you should run

```
npm install --save-dev hardhat
```
It's recommeded to install some dependencies.

```
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
```
To use your local installation of Hardhat, you need to use `npx` to run it (i.e. `npx hardhat`).

## Create A Project

To create your Hardhat project run npx hardhat in your project folder:

```
mkdir MegaCoin
cd MegaCoin
```

- Intialize your project:

```
$ npx hardhat
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

Welcome to Hardhat v2.0.8

? What do you want to do? …
❯ Create a sample project
  Create an empty hardhat.config.js
  Quit
```

Once this project is initialized, you'll now have a project structure with the following items:

* contracts/: Directory for Solidity contracts
* scripts/: Directory for scriptable deployment files
* test/: Directory for test files for testing your application and contracts
* hardhat-config.js: Hardhat configuration file


### Create Contract

You can write your own smart contract or download the [BEP20 token smart contract template](../BEP20Token.template).

### Config Hardhat for BSC

- Go to hardhat.config.js
- Update the  config with bsc-network-crendentials.

```js
require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
const { mnemonic } = require('./secrets.json');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "mainnet",
  networks: {
  	localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: {mnemonic: mnemonic}
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: {mnemonic: mnemonic}
    }
  },
  solidity: {
  version: "0.5.16",
  settings: {
    optimizer: {
      enabled: true
    }
   }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
};

```

!!! Note
		It requires mnemonic to be passed in for Provider, this is the seed phrase for the account you'd like to deploy from. Create a new `.secret` file in root directory and enter your 12 word mnemonic seed phrase to get started. To get the seedwords from MetaMask wallet you can go to Metamask Settings, then from the menu choose Security and Privacy where you will see a button that says reveal seed words.
    
### Compile Contract

To compile a Hardhat project, change to the root of the directory where the project is located and then type the following into a terminal:
```
npx hardhat compile
```


## Deploying on BSC Network

Run this command in root of the project directory:
```js
$  npx hardhat run --network testnet scripts/deploy.js
```

> Remember your address, transaction_hash and other details provided would differ, Above is just to provide an idea of structure.

**Congratulations!** You have successfully deployed BEP20 Smart Contract. Now you can interact with the Smart Contract.

You can check the deployment status here: <https://bscscan.com/> or <https://testnet.bscscan.com/>



