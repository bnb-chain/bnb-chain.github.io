---
sidebar_label: Math Wallet
hide_table_of_contents: false
---

# How to use Math Wallet for BNB Smart Chain
## Install
1. Get App from Chrome web store
<img src="https://lh5.googleusercontent.com/XbwCKYstUkfmKqHeaZHsU712-id33U5UvR5Dniq2UuwUIRnM8C-cTscbJixIKSFMTCkVBrdb3zmgCa2leASOMlUAgM139TalYkZLyb_eUhWc6xWnTbDj4I8ERd6FI5GlXEYQ2XrL" alt="img" style={{zoom:"50%"}} />

2. Add to your browser, for example, Brave
<img src="https://lh6.googleusercontent.com/li_pfeaAEkB4UyYwOl1TdjoF7i7X9lvi8UNPBoUJQJ5Kd7V2Ptaw-00cMzM2CGeKuWb4c_meuE7UWuiPfYpplRTJhrqluYsPyCnfEGNxKJg9znh_o5iyUVitq4kPQ64qNB8zz9ej" alt="img" style={{zoom:"33%"}} />

<img src="https://lh4.googleusercontent.com/b0aBH_0jXMg2U4Ixm-ids57EGqluIih3tQLqOaZIQw3lHW3685vI9QUlcIjCVB7EThsRx86hJwT1jYEGCHHfcyTraY1eStP8VxThXUtgvRypsXyEsw4-bh8Tem9tH2LtUM5_izph" alt="img" style={{zoom:"50%"}} />

## Setup Your Wallet
1. Set your password

<img src="https://lh4.googleusercontent.com/04v_hzZBF2wOiNk3XYDKgXi0CzVtfChzC9bIoT0EwCtHMYpGk1OaDfz1bCHAgegKxNHzA14mtHQDoeFnaOTX_BStwTC_GNb-bTzpOihIwjSumdnb2uZtR1obgDYoJwb3aiURKMMz" alt="img" style={{zoom:"50%"}} />

2. Choose BSC network

<img src="https://lh5.googleusercontent.com/vAIW4n_vrcfuqkUJibumqPSGwv3_HeTazQSz0nEFyQz9hntjytTF-i_QiGmPUayUXqMM42dgjJIEdB-dBSygz7i1mrrIJmvQ-6IJNx_HLGtFajxuBDQgXeZd7TTokOX19CSR_OEh" alt="img" style={{zoom:"33%"}} />

3. Choose BNB Smart Chain from this list

![img](../assets/math_choose_network.png)

4. Create Your Wallet

![img](../assets/math_create_wallet_1.png)
![img](../assets/math_create_wallet_2.png)

5. Save your private key

<img src="https://lh5.googleusercontent.com/fhgMWkIjTo_KE5QloGrYesFfaOSgHS6KdySsGjMBLYFH1mmRunRmLSTu4CD3ia4S7nWn044g9lvGIBLiH9MkikPBbIBetiWrOTY1TlQA84WJYieMbFpUeY5dTiR1L5eDO6m23c3C" alt="img" style={{zoom:"33%"}} />

It’s ready, and now you can get some testnet BNB from the faucet.

## Get Testnet Fund
1. Copy your address.

<img src="https://lh3.googleusercontent.com/1WquPDgLagkXcni9u9yPXzgaagCRd0nzm49cZ516XZSRB_rlOuybVG48C4R2ozhiSlIizxEMI_J7GexZz64E4vUpH362rrAn74GP1ALLOFOZusF8qjM1Xk71cTo5-EWcFvvqpIRL" alt="img" style={{zoom:"33%"}} />

2. Go to <https://testnet.bnbchain.org/faucet-smart/>

Go to explorer to verify BNB is sent: <https://testnet.bscscan.com/>

## Transfer BNB from BSC to BC in Testnet

1. Create your BNB Chain Ganges Testnet address with tbnbcli
* Download the binary [here](https://github.com/bnb-chain/node/releases/tag/v0.8.1)
> If you already have a backup of your recovery phrase from BNB Chain Ganges Testnet, it can be reused here.
```
tbnbcli keys add {wallet-alias}
```
2. Go to this page: <https://developer.mathwallet.org/bsc02/>

Go to this page for mainnet: <https://developer.mathwallet.org/bsc01/>


Paste your testnet address to `Recipient` and fill the transfer amount.
![img](../assets/math_across_transfer_02.jpg)

Please note the fees are also deducted for paying gas and cross-chain transfer.

3. Approve your transaction

![img](../assets/math_across_transfer_01.jpg)

4. Confirm Reception in explorer
Link: <https://testnet-explorer.bnbchain.org/>

## Transfer BEP20 from BSC to BC in Testnet

One of the key innovations of a dual-chain architecture is that token issuer can manage its assets on both chains. They could bind BEP2 tokens and BEP20 tokens together. In BNB Chain Ganges Testnet, there are several pegged tokens:

* Pegged BTC on [BNB Beacon Chain Testnet](https://explorer.bnbchain.org/testnet/asset/BTC-E24) and  [BNB Smart Chain Testnet](https://testnet.bscscan.com/address/0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8#code)
* Pegged ETH on  [BNB Beacon Chain Testnet](
https://explorer.bnbchain.org/testnet/asset/ETH-64F) and  [BNB Smart Chain Testnet](https://testnet.bscscan.com/address/0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378#code)
* Pegged XRP on  [BNB Beacon Chain Testnet](
https://explorer.bnbchain.org/testnet/asset/XRP-C46) and  [BNB Smart Chain Testnet](https://testnet.bscscan.com/address/0xa83575490d7df4e2f47b7d38ef351a2722ca45b9#code)

You can get some of these pegged tokens from faucet and transfer them back to BNB Beacon Chain testnet.

### 1. Approve this transaction

![img](../assets/math_across_transfer_03.jpg)

### 2. Send BEP20 To BC

![img](https://lh5.googleusercontent.com/_RKYU23BD2xhw-g63K8O3RRF1sEKGAC5zyTOIpWUJl9scDyn1kbjwEO6gjFPkVCeFMoG-8D0xvqNH17sJSlZP_FxCrduCqEKZqHfk8DtTnBk6XKHnHDLPAaR8VjVcNNWZsAw74FB)