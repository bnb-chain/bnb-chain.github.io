---
sidebar_label: Delegator Guide
sidebar_position: 2
hide_table_of_contents: false
---

# How to Delegate your BNB tokens with the BNB Extension Wallet

Detailed user guide is [here](staking-with-ext-wallet.md)

### Create an account if necessary

Please refer to this guide on [how to create a wallet](binance.md) with BNB Extension Wallet

### Go to the staking page:

- Mainnet: <https://www.bnbchain.org/en/staking>
- Testnet: <https://testnet-staking.binance.org/en/staking>

### Unlock your wallet
![img](https://lh4.googleusercontent.com/rCFd8jPzCspJDYEKO02JvZTVhNPWL1UGZIENnhIJ9_7h-8UXp20PhGxg2xzwNmRKQiFRLnrmMVaTDd1dYAmVk1b2WVG9DBnsuFFYOlpI-xCeZhtObAfgjzVUlmqQ43BWCyPKhwjl)


### Click on “Connect Wallet”

![img](https://lh6.googleusercontent.com/4o4Aj53r-LincYLkStkIXTi-wTHuAj4BKkS-Yt7pWokTEfiFtjstvMFHt4yiTr5WrNwsqfUFdhWhsnUDCv11UpogqHo08vd41-o7bcFRLSOlsdGmJmLhdfqNHK6Pge4IToISwU-R)

### Swtich to Binance Chain Network

If you are using BNB Smart Chain, please follow these steps to switch network:

- Click on "Change Network"

<img src="https://lh3.googleusercontent.com/bvWgOJ931BpcUOjOhzCCdKacevk6-MWrbGL1tFGQXPnJJFf6GmfAw1Ot_TtT2zsWCPOFOPolryPbhOBmrovOXW2kSnpY9_edQZVf_vxRpn4ohzkvfshbW7r-ivJg9Bp8Yxs2ELCZ" alt="img" style={{zoom:"50%"}}/>

- Choose "Binance Chain Network"

<img src="https://lh3.googleusercontent.com/Jnw7n1ADkE1T1wCi3cYGhLg4YrlQo5X98FmY3YEysgiUr1Efo8QSPketnZ8YK-EmcE2OSVFMSxpHAoq13cyuD51eRwb7QecETgDCYXf_NvpVXu-00QUrFD6pL2of-aS1cdgdW8YE" alt="img" style={{zoom:"50%"}}/>

## Choose a validator

![img](https://lh3.googleusercontent.com/62tAplbV-lv5Hy5-lrUEvkLk29GT_LPpsRmOq-tR5az_1KwVkdLjG__Oxoe2skKSjqkDA7TqGgq1YlPDkXEFiejiD_mSyhLUiyD8O4CCH9nBztTu2ctetdHfXZH85b6Ge9kHEV2Q)

- Click on “delegate” and input the amount

![img](https://lh4.googleusercontent.com/-mfR40ZPqZ3yih90oXNee4DULAnbV1l3ZWbkGgqgi07tdXDcCFR_5eA5PY23vW_GqO0sXlkwTr_laljPl11COpX0hB4KBA6_dHgGGUqe8y2YxYNECcKZvc75GdW9WlaFJf4zx776)

- Confirm your transaction in extension wallet

![img](https://lh5.googleusercontent.com/U_ji1L_LgRaxKmRHFvvUwtiOb7SXqTZ6GrMiqvK2gR_aS21bVTqgTHp2aF207pKxfZaYd38QFvRau20n8zbd_MZ1_6ktWEoXYbRrf6vSUdp2W1yWfwqWFqbhjvrbGiX1YRMzJj7b)

**Success**

![img](https://lh5.googleusercontent.com/avie7-_5sa8jnI8XdFa1EytOMB9pZVULKQntno3hk3w3MuWJtwE9WNYayKTA0W7mymtJLG5mKZFk42TvUyGa_qSAi5rIH88LL2riKln35loCEHl3ntaqZEspWwUMbOgPdZbhOSp6)

-  Your delegation overview

![img](https://lh6.googleusercontent.com/U1QavwEpXDRUaYfy2Ghd4N1Di8lKQ3kHKEw1rOv9Y-OV3W6wY1IbCSs8XdIwvHjMe5VfzoKnOVKazdJicAhS6LwmqlYYvRKJYBzTX9pjPZctvCQlTFNhSzV2-rZKMu2XUvfB8Xuf)

- You can also see the staking history

![img](https://lh4.googleusercontent.com/m8hyetwRYQS-HLcubdSkuhjAAFDyWQptswGJKUWaAwcK-m1yVblM-5pXL599ogLJ1DjkKUo75WOzt6JUDxrnUNwNANDa1ZpuyHxlDxRg7enDF8jkhF70SkWeAPq6hAARAcphlaKw)

## Delegate with BNB Chain Command line

### Download *bnbcli*

### Verify your balance is enough

Fee for `Delegate Smart Chain Validator`is **0.001BNB**

The minimum delegated amount is **1BNB**.

### Choose a validator

You can use `bnbcli` or `tbnbcli` for querying the [list of current validators](stake/cli-commands.md#query-side-chain-top-validators).

```bash
## mainnet
bnbcli staking side-top-validators --top 10 --side-chain-id=bsc --chain-id=Binance-Chain-Tigris

## testnet
tbnbcli staking side-top-validators --top 10 --side-chain-id=chapel --chain-id=Binance-Chain-Ganges
```

## Delegate BNB

You can use `bnbcli` or `tbnbcli` to [delegate](stake/cli-commands.md#delegate-bnb) some of BNB to a validator

Go to [explorer](https://explorer.bnbchain.org/) to verify your transactions.

```bash
## mainnet
bnbcli staking bsc-delegate --chain-id Binance-Chain-Tigris --side-chain-id bsc --from bnb1tfh30c67mkzfz06as2hk0756mgdx8mgypu7ajl --validator bva1tfh30c67mkzfz06as2hk0756mgdx8mgypqldvm --amount 1000000000:BNB --home ~/home_cli

## testnet
tbnbcli staking bsc-delegate --chain-id Binance-Chain-Ganges --side-chain-id chapel --from tbnb1tfh30c67mkzfz06as2hk0756mgdx8mgypu7ajl --validator bva1tfh30c67mkzfz06as2hk0756mgdx8mgypqldvm --amount 1000000000:BNB --home ~/home_cli
```
## Undelegate BNB

You can use `bnbcli`or `tbnbcli` to [undelegate](stake/cli-commands.md#undelegate-bnb) some bonded BNB from a validator

## Redelegate BNB

You can use `bnbcli`or `tbnbcli` to [redelegate](stake/cli-commands.md#redelegate-bnb) some bonded BNB from a validator

## For Testnet

### Enable Testnet Configuration

![img](https://lh6.googleusercontent.com/mrQlZM2w-TDXQ_xfSA3XsSo_IhM0mtdnSg52Vi8pgjQYItKDAiuVwxoilMqBgVHgpc71c118-3U-79iXWP4cW-DacdfrY_RcbF3x633khQcB271pLCvLIa3uOwq19vrjZ46HDeB6)

### Get some testnet fund from faucet

Go to this faucet page: <https://testnet.binance.org/faucet-smart>

### Transfer BNB from BSC to BC

Please refer to this [guide](binance.md)