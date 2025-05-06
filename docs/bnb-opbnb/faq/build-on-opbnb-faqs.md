---
title: Build on opBNB - opBNB FAQs
---

### How to check if a smart contract is verified on opBNB using an API GET request?

With the [API key](https://nodereal.io/meganode) and smart contract address, you can retrieve the contract's verification status, source code & ABI.

- For opBNB mainnet, `https://open-platform.nodereal.io/{{yourAPIkey}}/op-bnb-mainnet/contract/?action=getsourcecode&address={{contract address}}`
- For opBNB testnet, `https://open-platform.nodereal.io/{{yourAPIkey}}/op-bnb-testnet/contract/?action=getsourcecode&address={{contract address}}`

### Why does token info (like name, symbol) is not displayed on opBNBscan despite having contract verified?

If the deployed contract is a proxy contract, then the info. will not be displayed as opBNBscan uses enhanced API to fetch the token details like name, symbol etc. In this case, enhanced API needs to call the implementation contract to fetch the token details.
Currently, this feature is under development where enhanced API will make call to implementation contract when token info. returned from proxy contract is empty.

### Are there any grants or financial support for projects on opBNB?

Yes, we provide the same support for opBNB as for BNB Smart Chain when it comes to grants or financing projects. Check [here](https://www.bnbchain.org/en/developers/developer-programs) for the complete details.

### Is there an ability to run nodes on opBNB?

Check out the official [documentation](../advanced/local-node.md) to learn how to run nodes on opBNB.

### Can a native project on opBNB issues its token natively on opBNB?

Yes, it is up to the project.

### What is the recommended approach for launching projects, should the project be natively launched on opBNB and then bridged to L1 or the other way around?

The choice of L2 or L1 depends on the specific needs of the project. L2 offers better performance and lower cost, so it is advisable to use L2 as the starting point if these factors are important for the project.

### Is there a possibility of a shared sequencer/liquidity with other chains built on OPStack in the future?

Unfortunately, no, in short term, this is BNB Chain team`s goal yet.

### What programming language is used for the opBNB chain and contracts?

The pre-deployed smart contracts are written in Solidity, and opBNB is built with OP Stack framework. For details, please refer to [official docs](../core-concepts/why-opstack.md) for more details.

### Are there any airdrops for opBNB?

We want to clarify that there is NO airdrop planned for opBNB as of now. Please be cautious and aware of any claims or messages suggesting otherwise. Protect yourself from potential scams by staying vigilant and verifying information from official sources.

### What oracles and VRF does opBNB support?

opBNB is a permissionless chain that allows any VRF and oracle services to be integrated. The
first two services that have been launched on opBNB are Binance Oracle and Polythera, which
provide reliable and secure data feeds for smart contracts.

### What to do if there is trouble verifying smart contract with all available methods using the <https://opbnbscan.com/verifyContract>

Try using the alternative explorer <https://opbnb-testnet.bscscan.com/> for verifying your smart contracts.

### How do we set hardhat verification parameters for opBNB?

Refer to the official Hardhat documentation [here](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify#adding-support-for-other-networks)

### How does opBNB handle the storage and execution of metadata associated with NFTs on its optimistic rollup?

The process of creating and storing NFTs on the opBNB is similar to other blockchains. You need to have a smart contract that defines the properties and functions of your NFT, and then deploy it on the opBNB. To store the metadata of your NFT, such as the name, description, image, and other attributes, you can use various storage solutions. Some examples are BNB Greenfield, IPFS, and Filecoin.

### Why my opBNB node is unable to catch up with current blocks?

There is a possibility that the node's chain has been forked and is different from other nodes.

In the event that the chain is forked due to a hard fork, it is recommended to reset the blockchain and synchronize it with the latest version of the program:

1. Clear the data directory in OP Geth 
2. Update the opbnb to latest version: `git clone -b v0.x.x git@github.com:bnb-chain/opbnb.git`
3. Update the op-geth to latest version: `git clone -b v0.x.x git@github.com:bnb-chain/op-geth.git`

Follow the instructions [here](../advanced/local-node.md) to re-sync the node. Just note that make sure to use the latest version of opbnb and op-geth, and use the new version `genesis.json` and `rollup.json`.

### How to verify ERC1967Proxy upgradeable contract on opbnb-testnet by Hardhat?

You can follow the instructions from How to verify a contract on [Etherscan/BscScan/PolygonScan](https://forum.openzeppelin.com/t/how-to-verify-a-contract-on-etherscan-bscscan-polygonscan/14225#if-proxy-is-not-verified-10) to use the solc-input.json to verify the proxy.

### How to get proxy's constructor arguments for verification?
To form _data argument we need: 

1. Function name.
2. Owner address + argument1 + argument2 + etc. Then copy "Encoded data", add "0x" at the beginning of the text and past it as _data (Bytes) argument. For details, please refer to [openzeppelin docs](https://forum.openzeppelin.com/t/how-to-verify-upgradeable-contract-on-opbnb-testnet-by-hardhat/39495/6?u=serghd). An easier way is to look at the input data of the creation transaction for your proxy: https://testnet.opbnbscan.com/tx/0xa287b0b69472cb4961c528b16e799136a520f700b5407595314c3cdd0a21f8d6?tab=overview 
3. You can see that the encoded constructor arguments are at the last portion of the bytecode.

