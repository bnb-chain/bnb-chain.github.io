---
sidebar_label: Using Remix IDE
hide_table_of_contents: false
sidebar_position: 2
---

# Using Remix

Deploys a BEP20 smart contract with a message, and renders it in the front-end. You can interact with the smart contract easily!

This dapp implements a "Hello World" style application that echoes a message passed to the contract to the front end. This tutorial is intended to be followed using the online IDE available at [Remix IDE](https://remix.ethereum.org/).

### Setting up [Remix IDE](https://remix.ethereum.org/)

- Remix is an online IDE to develop smart contracts.
- You need to choose Solidity Compiler and Deploy and Run Transactions.

<img src="https://lh3.googleusercontent.com/BUilfLHVuRsIwaPDCry2yk8g58oMZfq65Nf-Ihc7g8rYtp7BjlxJWiwBQj0BK8e8ZsWET4zPcwdKYCcOn1mdsnFaH60E2Uhj5JEyhMz1-f-_aGwupbPbwaoMRZvB0NATWjPQadNT" alt="img" style={{zoom:"30%"}}/>

- Go to File Explorers, And Create a new file, Name it MegaCoin.sol



- Copy/Paste the Smart contract below into the newly created file `MegaCoin.sol`

## The smart contract

- Create new contract BEP20Token.sol and copy contract code from the bep20 token template [here](../BEP20Token.template)

- Modify “name”, “symbol”, “decimals” and “totalSupply” according to your requirements.

<img src="https://lh4.googleusercontent.com/hgxDh_hXCFKwwlkAYG6h9qfxvzyeeD3k-t3tNBD-VSvwTtM4AnaFylZ6SjSmfTKCuIqhs66Z9vi7mRplIfN5ER7n1yMz0EKpO_RDOcTQTrsh5R1DC0doVC7FT05Hu2bboM2o57Qg" alt="img" style={{zoom:"50%"}}/>

The first line, `pragma solidity ^0.5.16` specifies that the source code is for a Solidity version greater than 0.5.16. [Pragmas](https://solidity.readthedocs.io/en/latest/layout-of-source-files.html#pragma) are common instructions for compilers about how to treat the source code (e.g., pragma once).

A contract in the sense of Solidity is a collection of code (its functions) and data (its state) that resides at a specific address on the Ethereum blockchain. Learn more about the [constructor](https://solidity.readthedocs.io/en/latest/contracts.html#constructor) and  [memory](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack) in the docs.

### Compile Smart Contract

- Step1: Click button to switch to compile page

- Step2: Select “BEP20Token” contract

- Step3: Enable “Auto compile” and “optimization”

-  Step4: Click “ABI” to copy the contract abi and save it.

<img src="https://lh6.googleusercontent.com/qY_5g3ZMnJca6n84W2JxIoBvd8iHRQ0qkOQuJ60pRIcKvgZB5-bXcGq6gS7dFwA5rYXbiS2NyaUQ1Qptcagqa0pb7kmq_S-Dh8drA4R-hDg9_NVp1zPl-tmqIDanlcgLibaR3CV7" alt="img" style={{zoom:"50%"}}/>

Now, We have to deploy our smart contract on BNB Smart Chain Network. For that, we have to connect to web3 world, this can be done my many services like Metamask, Brave, Portis etc. We will be using Metamask. Please follow this [tutorial to setup a Metamask Account](wallet/metamask.md).

- Open Metamask and select Custom RPC from the networks dropdown

- Go to setting page

<img src="https://lh5.googleusercontent.com/NqWPIv1MrMJ-W2wDKjxtdxcdFhDwiqhsZ6G6MY6FQnhxPTCCPfPHBJ59vBl1ddxpbfV11ufETWAolV1s9YjCYHPeJCKW1S-sr8gfjcFt3swXM-p3IgafNBqPZ86DvThK-I9gKbrw" alt="img" style={{zoom:"30%"}}/>

- Add a new network

<img src="https://lh6.googleusercontent.com/jrq511YshO6rPPx4i-ePRy2gs-66b465c_JFXEW8Cm5CSNTM7CXgCPuFmIh_Im3JlEhxpAqEDDjmUqfskq2m5rG-FKhwZ4_jIenOTdAVs_rMMTjTvZlM6iOpQeivrz_V1liSvuB5" alt="img" style={{zoom:"30%"}}/>

* Testnet
        * [RPC URLs](rpc.md)
        * ChainID: 97
        * Symbol: BNB
        * Block Explorer: https://testnet.bscscan.com

* Mainnet
        * [RPC URLs](rpc.md)
        * ChainID: 56
        * Symbol: BNB
        * Block Explorer: https://bscscan.com


- Go ahead and click save
- Copy your address from Metamask

- Head over to [Faucet](https://testnet.binance.org/faucet-smart) and request test BNB

- Now, let's Deploy the Smart Contract on BNB Smart Chain Testnet
- Select Injected Web3 in the Environment dropdown and your contract

<img src="https://lh5.googleusercontent.com/Z4XBNJcsMWk5SzSKB8no5vAzv8ie46p4dbv4sh0_9FxIyMfEFlCj2z_a_ZUWR6l3fH9OIr3B2A0_Puh89FzbxlkLMVsTo9diSbLGdbp2Swml0afc7Unl10hBw9jsAY6Ozgbe6HqE" alt="img" style={{zoom:"30%"}}/>

- Accept the Connection Request!

<img src="https://lh3.googleusercontent.com/-SBQ0YKnAs_IR80dcqc3EpWRte8KlVCgTIPgSiFPe6H_TKDZj4O5TBR0rpvts4YZpA1LYN2-5IocYkcZjuMP5yb7rch0NovdTMH-55Pjg4HIorxZGeFO7dkyYGlrY0W5DYfs7t_z" alt="img" style={{zoom:"30%"}}/>

- Once Metamask is connected to Remix, the ‘Deploy’ transaction would generate another metamask popup that requires transaction confirmation.

<img src="https://lh4.googleusercontent.com/9awuDudNSuUOZDQAlW5FPZ5SbRkWsKPlJSYWGUL7R4raJ5o2mprRP7jt87hP_wbuYeoJy75ErwDcKVC7_spf8YkumCkwOP4Eak9SfcV6dZvyVhy84JqKfVUvmEeLw5mWEZ3-aCED" alt="img" style={{zoom:"30%"}}/>

**Congratulations!** You have successfully deployed a BEP20 Contract. Now you can interact with the Smart Contract. Check the deployment status here: <https://testnet.bscscan.com/>


