---
sidebar_label: Issue BEP20 Tokens
sidebar_position: 2
---

# Issue BEP20 Tokens
This document provides a brief walk through on how to issue BEP20 tokens on the BNB Smart Chain. For this tutorial we have used [Remix IDE](https://remix.ethereum.org) and [Metamask Wallet](https://metamask.io/). Further, in this guide, we provide steps for issuing BEP20 tokens on the BSC Testnet, however, the steps for mainnet are also the same.

## Compile and Deploy BEP20 Contract

1. Navigate to [Remix IDE](https://remix.ethereum.org)

![image](https://github.com/bnb-chain/bnb-chain.github.io/assets/93580180/47f4950f-4715-4617-b477-c8966b9503d8)

2. Create a new workspace

![image](https://github.com/bnb-chain/bnb-chain.github.io/assets/93580180/e04476b8-43a4-47dd-ae12-e2a18b884fe7)

3. Choose Blank Template and an appropriate name for the workspace, then click "Ok". 

![image](https://github.com/bnb-chain/bnb-chain.github.io/assets/93580180/735c656c-6a90-4bbc-8390-229654c328a2)

4. Create new contract file, by clicking on the ![image](https://github.com/bnb-chain/bnb-chain.github.io/assets/93580180/d46b95cd-273f-49d4-9a9b-c4afa367688e) icon in the file explorer section. Name the file as `BEP20Token.sol`

5. Copy contract code from the bep20 token template [here](BEP20Token.template) and paste it into your `BEP20Token.sol` file.

6. Modify `name`, `symbol`, `decimals` and `totalSupply` according to your requirements. 

```javascript
    string public name = "MyBEP20Token";
    string public symbol = "MBT";
    uint8 public decimals = 18;
    uint256 public _totalSupply = 100;
```

7. Compile the BEP20 token contract

    a. Step1: Click on the Compile button to switch to compile page

    b. Step2: Select the latest Solidity compiler version

    c. Step3: Enable _Auto compile_ and _Optimization_

    d. Step4: Click _ABI_ to copy the contract ABI and save it.


![image](https://github.com/bnb-chain/bnb-chain.github.io/assets/93580180/98c4879a-f9a7-4b4d-84ed-5ea7ae529ae9)


8. Deploy the contract to BSC

    a. Step1: Click the Deploy button to switch to deploy page

    b. Step2: Select _Injected Web3_

    c. Step3: Select _BEP20Token_

    d. Step4: Click on the _Deploy_ button and your wallet will pop up

    e. Client _Confirm_ button to sign and broadcast transaction to BSC.

![image](https://github.com/bnb-chain/bnb-chain.github.io/assets/93580180/5b375fd1-fabf-4ae2-a6bb-5857b795ce70)

9. You can view the details of your deployed smart contract in the BSC Scan block explorer.

