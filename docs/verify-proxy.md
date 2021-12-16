---
sidebar_label: Verify Proxy Contracts
hide_table_of_contents: false
sidebar_position: 2
---
# How to Verify Proxy Contract
In this section, we provide a quick guide on how to verify a deployed BEP20 proxy contract.

## Flatten your contract

### Install flattener
```
npm install truffle-flattener -g
```
Run the following command:
```
$ truffle-flattener BEP20TokenImplementation.sol > BEP20TokenImplementationFlattened.sol
$ truffle-flattener BEP20UpgradeableProxy.sol > BEP20UpgradeableProxyFlattened.sol"
```
## Compile and deploy your contract with Remix

### Compile Implementation contract

- Open Remix IDE: [https://remix.ethereum.org](https://remix.ethereum.org/)
- Select solidity language
- Create new contract `BEP20Token.sol` and copy contract code from flattened `BEP20TokenImplementationFlattened.sol`
- Compile the implementation contract
- Click on this button to switch to the compile page
  - Select “BEP20TokenImplementation” contract
  - Enable “Auto compile” and “optimization”
  - Click “ABI” to copy the contract abi and save it.
### Deploy the implementation contract
- Select “Injected Web3”
- Select “BEP20TokenImplementation” contract
- Click the “Deploy” button and Metamask will pop up
- Click the “confirm” button to sign and broadcast the transaction to BSC.
- Then, you need to initialize the token: fill in all the parameters and click on “transact”

<img src="https://lh3.googleusercontent.com/SjMHLYY9A1LtFXJFc2gtIOL_lEzZk--eiJyNspL-8qfDvkfNYGAgGKvodCo0-Pfp3UhmrPGUc4oOpFFuDBzYhLxqN3-LIAW7BRKdeoiPdYuJMep0hT67ifNw0i33DzVXNfzPjwZi"alt="img" style={{zoom:"50%"}}/>

> Note: `Owner` should be the address who send the deploy transaction before.

- Click on the “Copy” icon to save the initializatioin data: Like the following: ```


```
0xef3ebcb800000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000f42400000000000000000000000000000000000000000000000000000000000000001000000000000000000000000fc41d5571120442d1bb82cea0884966e543cb78b000000000000000000000000000000000000000000000000000000000000000548656c6c6f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000548454c4c4f000000000000000000000000000000000000000000000000000000
```

- Confirm your transaction in MetaMask


<img src="https://lh5.googleusercontent.com/kPAo0FyEgt0vNDkBMxIHNIFqdq0mP4BhFT21vXvusa8-wlP-BXr4FcHjYV-NZEuQZrgwq74fV2oXAKIrAovpXi7KHChXtowSI3sbu5wTQL-_3-x8Qd-6-z7xRDkRXzJZLcakxrR3" alt="img" style={{zoom:"40%"}}/>

## Compile Proxy Contract

- Create new contract proxy.sol and copy contract code from flattened `BEP20UpgradeableProxyFlattened.sol `.  Here is and [example](https://bscscan.com/address/0xA6Ec2Fe4F6040b188A926048f44c9A59Fca189d4#code)
- Compile the proxy contractClick on this button to switch to the compile page
  - Select “BEP20UpgradeableProxy” contract
  - Enable “Auto compile” and “optimization”Click “ABI” to copy the contract abi and save it.

### Deploy the proxy contract

- Select “Injected Web3”Select “BEP20UpgradeableProxy.sol” contract
- Fill in the parameters

<img src="https://lh3.googleusercontent.com/bdTP2V-Fco3HogiRVO-2FTlGwzXGsgiOa2VcCUdkr1LCD2kuRbHbz0u7eM7xmLhYiJAToG9IKL-R3heI2i_TPf2dQoFE215s9w-b8D6PLjYPAktKoLRRDozV8aOpQvfYGJgEYtJM" alt="img" style={{zoom:"50%"}}/>

**Logic**: The address of `BEP20Implementation` contract
**Admin**: admin cannot be BEP20 token owner
**Data**: use the initialization data you saved before

- Click the “Deploy” button and Metamask will pop up
- Click the “confirm” button to sign and broadcast transaction to BSC.

## Verify Proxy Contract on BscScan
Note: The way to verify the BEP20TokenImplementation contract is the same as before.

- Go to your contact page and click on “Verify and Publish”

<img src="https://lh5.googleusercontent.com/RvHXgGR_7rvaNXNgBCB5JnHQE90ziGcr1kmy4NDxJfWxTJTZz3bkZuHtGRrpXY-Qb_7_5FLzzD1vwBo3cER_6Qfbvd7g3CmHE8l16cemD-92jZYhQX6XUUZRvvzFwr61f9jUuIuC" alt="img" style={{zoom:"50%"}}/>

- Select Single file

<img src="https://lh4.googleusercontent.com/PWp8_JMP9S4pXB08e3Rs2lta4Xn4ZOCoBkAmgsyr4tE0kv_KtlvA1TjLOwrBYG7ON1Z51CZh7NuFzD9IlOYZIRg6B5OZx0Z6yiyrlu2VjkvmjgqPV6BOsF4hWqzeKC8_g8PeTTZ_" alt="img" style={{zoom:"50%"}}/>


- Copy your contract code below and check “Optimization” if it’s enabled
- Contractor Data: Please use this site for getting the correct constructor data: https://abi.hashex.org/#

First, you need to copy ABI json of “BEP20UpgradeableProxy.sol” contractThen, click on “Parse”

<img src="https://lh4.googleusercontent.com/Z1Ky-aHOBVvi5qDVNv4q-kOiK_v4uLzMpct08hQ-RcGbGgyb3HdOXMPMF9a-eNw5MybIjM222lZRrtV7Bn_cxntDIw9ivZ90dpsIeB44cpu6F9S9ena8BufByPN1Yvc508gnSZQ4" alt="img" style={{zoom:"40%"}}/>

Add all those 3 parameters as indicated. Then copy/paste the result.

That’s it! You have verified your proxy contract.

 <img src="https://lh4.googleusercontent.com/MgaUVOq6GdeA374T6DYsRPbphwSG4WNsfm-fJunGif4sFU4ILDQN_XcJ6O-qh8I6SuILbu2O9oriSQii6RcCYQY09_T1qoNvK6JxFkydM9u9zDWMUrybam1Zu_YiFAoa-3T867ea" alt="img" style={{zoom:"50%"}}/>

## Link these two contracts
- Click on “More Options” and choose “is this a proxy”.

<img src="https://lh3.googleusercontent.com/2_dq4WNMba2_RWJzLSRehjDjMWx8SgcUkU5d88lNzllt6QViM1uEW49e-H0nUbhjIc9iFCsXx3iavTsUFahjTR4Gocdf_jw_IhK_QvETb-G9CFgCb1LIlZvsGor37g8dKVxDnj7I" alt="img" style={{zoom:"50%"}}/>

- Verify your proxy address

<img src="https://camo.githubusercontent.com/836725ceebb9698ebd3ce738e2ea4301de8fedd4a2e437d2d0c5734eb922de51/68747470733a2f2f6c68352e676f6f676c6575736572636f6e74656e742e636f6d2f477539345878614741614b677158357278586d417572506c446f4a52315577734a7330365a413357636b5a70334a4a4e6b4a67384670576b4d573265424470634f77746c597a6550615453547a45414b6a4b654d32364f744f614f6d7353694a2d76376d67346f532d71686f4d76625838706b626b725631444a31554e6e4d4237596d6a494c4a33" alt="img" style={{zoom:"50%"}}/>

- Confirm the implementation address.

<img src="https://camo.githubusercontent.com/832b0418bb3a4e670ec02f61d857fb23646bc3f84893dd8631e9469b44415ce7/68747470733a2f2f6c68352e676f6f676c6575736572636f6e74656e742e636f6d2f554f6a425971756161366b315a745f57786e7356526e6c696b4d5462654654786979796d655254302d58724e774372506a6e49764266494e75456d5f55762d764f6c3763684f664b7573386e694e7168765832315362697077554f5a386c54583647334a413447506d523354435167744c6e493941303072736875496a6633516f71624b4d466145"alt="img" style={{zoom:"50%"}}/>

If you go back to the contract page and you can see two more buttons “Read as Proxy” and “Write as Proxy”

<img src="https://lh6.googleusercontent.com/xcVqGgOZ2mySt25Z7emHzwNmquYy4cyFSuQh-F7mJYG7rWfit4QWyxjBFl8V7Hc7_y3FepNRMLR7htZ-OiLqHfnvtwamep7exo2pocrNPMX5iyfZNlp5qVcDuPcwB8_VsisVG9dY"alt="img" style={{zoom:"50%"}}/>