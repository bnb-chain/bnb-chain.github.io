# Use opBNBScan to verify your contract via Hardhat and Truffle

opBNBScan provides a convenient and user-friendly platform for developers to verify their smart contracts using popular developer tools like Truffle and Hardhat. Here are the step-by-step instructions to get started with opBNBScan's smart contract verification APIs.

1. Go to the [NodeReal](http://nodereal.io) portal and click the **Login** button.
2. Login with your github account or discord account.
3. And create your API key by clicking the **create new key** button.
4. Copy your API key to your clipboard and and use it as your key of smart verification contract APIs.

## **Hardhat**

You can use the [hardhat-verify](https://hardhat.org/hardhat-runner/docs/guides/verifying) plugin to verify your deployed smart contract. You can follow the steps in the hardhat document. Below is an example of how to configure your hardhat.config.js. Pay attention to the network's configuration settings, and replace the corresponding settings that meet your requirements.

```typescript
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.19", //replace your own solidity compiler version
  networks: {
    opbnb: {
      url: "https://opbnb-testnet-rpc.bnbchain.org/",
      chainId: 5611, // Replace with the correct chainId for the "opbnb" network
      accounts: ["{{YOUR-PRIVATE-KEY}}"], // Add private keys or mnemonics of accounts to use
      gasPrice: 20000000000,
    },
  },
  etherscan: {
    apiKey: {
      opbnb: "{{YOUR-NODEREAL-API-KEY}}", //replace your nodereal API key
    },

    customChains: [
      {
        network: "opbnb",
        chainId: 5611, // Replace with the correct chainId for the "opbnb" network
        urls: {
          apiURL:
            "https://open-platform.nodereal.io/{{YOUR-NODEREAL-API-KEY}}/op-bnb-testnet/contract/",
          browserURL: "https://testnet.opbnbscan.com/",
        },
      },
    ],
  },
};
```

## **Truffle**

You can also use truffle to verify your smart contract on opBNBScan.

Please make sure the truffle-plugin-verify is installed correctly, and in the plugin, add the 'truffle-plugin-verify'

```typescript
module.exports = {
 plugins: [
  'truffle-plugin-verify'
 ],
 networks:
 {
  development: {
  	host: "127.0.0.1", // Localhost (default: none)
  	port: 8545, // Standard port (default: none)
  	network_id: "*", // Any network (default: none)
 	},
 	dashboard: {
  	verify: {
  	apiUrl: 'https://open-platform.nodereal.io/{{YOUR-NODEREAL-API-KEY}}/op-bnb-testnet/contract/',
  	apiKey: '{{YOUR-NODEREAL-API-KEY}}',
  	explorerUrl: 'https://testnet.opbnbscan.com/',
 		},
 			host: "127.0.0.1",
 			port: 24012,
 			network_id: "*"
		},
 },
// Set default mocha options here, use special reporters, etc.
mocha: {
// timeout: 100000
},
// Configure your compilers
compilers: {
	solc: {
		version: "0.8.15", // Fetch exact version from solc-bin (default: truffle's version)
	}
},
```

Make sure your smart contract is deployed first. I am using the dashboard to avoid saving your private credentials to your local machine.

```shell
npx truffle migrate –network dashboard
```

And then you can verify your smart contract by specifying your contract name

```shell
npx truffle run verify {{Your-Contract-Name}} --network dashboard
```

Then you can go to the [opBNBScan explorer](https://testnet.opbnbscan.com/address/0x57996bA7FC3F0C61E7A949ac050b9E2437eA1972?p=1&tab=Contract) to check if your smart contract has been verified.

!!!info
    For the mainnet contract verification, please change the following URLs:
    url: "https://opbnb-testnet-rpc.bnbchain.org/" change to "https://opbnb-mainnet-rpc.bnbchain.org/"
    apiUrl: 'https://open-platform.nodereal.io/{{YOUR-NODEREAL-API-KEY}}/op-bnb-testnet/contract/' change to 'https://open-platform.nodereal.io/{{YOUR-NODEREAL-API-KEY}}/op-bnb-mainnet/contract/'
