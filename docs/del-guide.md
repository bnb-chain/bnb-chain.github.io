---
sidebar_label: 위임 가이드
sidebar_position: 2
hide_table_of_contents: false
---

# BNB Extension Wallet으로 BNB 토큰 위임하기

더 자세한 가이드는 [여기](staking-with-ext-wallet.md)를 참고하세요.

1. 필요 시 계정을 생성합니다
    - BNB Extension Wallet와 [지갑 생성하는 법](binance.md)에 대한 가이드를 참고하세요.

2. 스테이킹 페이지로 이동합니다:
   - 메인넷: <https://www.bnbchain.org/en/staking>
   - 테스트넷: <https://testnet-staking.binance.org/en/staking>

3.  지갑을 언락(unlock)합니다.
   
![img](https://lh4.googleusercontent.com/rCFd8jPzCspJDYEKO02JvZTVhNPWL1UGZIENnhIJ9_7h-8UXp20PhGxg2xzwNmRKQiFRLnrmMVaTDd1dYAmVk1b2WVG9DBnsuFFYOlpI-xCeZhtObAfgjzVUlmqQ43BWCyPKhwjl)

4. “Connect Wallet”을 클릭합니다.

![img](https://lh6.googleusercontent.com/4o4Aj53r-LincYLkStkIXTi-wTHuAj4BKkS-Yt7pWokTEfiFtjstvMFHt4yiTr5WrNwsqfUFdhWhsnUDCv11UpogqHo08vd41-o7bcFRLSOlsdGmJmLhdfqNHK6Pge4IToISwU-R)

5. 비컨 체인 네트워크로 변경합니다.

BNB 스마트 체인을 사용 중이라면, 다음의 절차를 따라 네트워크를 변경합니다:

- "Change Network"를 클릭합니다.

<img src="https://lh3.googleusercontent.com/bvWgOJ931BpcUOjOhzCCdKacevk6-MWrbGL1tFGQXPnJJFf6GmfAw1Ot_TtT2zsWCPOFOPolryPbhOBmrovOXW2kSnpY9_edQZVf_vxRpn4ohzkvfshbW7r-ivJg9Bp8Yxs2ELCZ" alt="img" style={{zoom:"50%"}}/>

- "Beacon Chain Network"를 선택합니다.

<img src="https://lh3.googleusercontent.com/Jnw7n1ADkE1T1wCi3cYGhLg4YrlQo5X98FmY3YEysgiUr1Efo8QSPketnZ8YK-EmcE2OSVFMSxpHAoq13cyuD51eRwb7QecETgDCYXf_NvpVXu-00QUrFD6pL2of-aS1cdgdW8YE" alt="img" style={{zoom:"50%"}}/>

6. 검증인을 선택합니다.

![img](https://lh3.googleusercontent.com/62tAplbV-lv5Hy5-lrUEvkLk29GT_LPpsRmOq-tR5az_1KwVkdLjG__Oxoe2skKSjqkDA7TqGgq1YlPDkXEFiejiD_mSyhLUiyD8O4CCH9nBztTu2ctetdHfXZH85b6Ge9kHEV2Q)

7. “Delegate”를 클릭하고 액수를 입력합니다.

![img](https://lh4.googleusercontent.com/-mfR40ZPqZ3yih90oXNee4DULAnbV1l3ZWbkGgqgi07tdXDcCFR_5eA5PY23vW_GqO0sXlkwTr_laljPl11COpX0hB4KBA6_dHgGGUqe8y2YxYNECcKZvc75GdW9WlaFJf4zx776)

8. Binance Extension Wallet에서 트랜잭션을 확인합니다.

![img](https://lh5.googleusercontent.com/U_ji1L_LgRaxKmRHFvvUwtiOb7SXqTZ6GrMiqvK2gR_aS21bVTqgTHp2aF207pKxfZaYd38QFvRau20n8zbd_MZ1_6ktWEoXYbRrf6vSUdp2W1yWfwqWFqbhjvrbGiX1YRMzJj7b)

9. **성공** 시 다음과 같은 화면이 나타납니다.

![img](https://lh5.googleusercontent.com/avie7-_5sa8jnI8XdFa1EytOMB9pZVULKQntno3hk3w3MuWJtwE9WNYayKTA0W7mymtJLG5mKZFk42TvUyGa_qSAi5rIH88LL2riKln35loCEHl3ntaqZEspWwUMbOgPdZbhOSp6)

10. 위임 정보를 확인합니다.

![img](https://lh6.googleusercontent.com/U1QavwEpXDRUaYfy2Ghd4N1Di8lKQ3kHKEw1rOv9Y-OV3W6wY1IbCSs8XdIwvHjMe5VfzoKnOVKazdJicAhS6LwmqlYYvRKJYBzTX9pjPZctvCQlTFNhSzV2-rZKMu2XUvfB8Xuf)

11. 스테이킹 내역을 확인할 수도 있습니다.

![img](https://lh4.googleusercontent.com/m8hyetwRYQS-HLcubdSkuhjAAFDyWQptswGJKUWaAwcK-m1yVblM-5pXL599ogLJ1DjkKUo75WOzt6JUDxrnUNwNANDa1ZpuyHxlDxRg7enDF8jkhF70SkWeAPq6hAARAcphlaKw)

## BNB 체인 명령어로 위임하기

1. *bnbcli*를 다운로드합니다.

2. 잔액이 충분한지 확인합니다.

   - `Delegate Smart Chain Validator`의 수수료는 **0.001BNB**입니다.

   - 최소 위임 액수는 **1BNB**입니다.

3. 검증인을 선택합니다.

`bnbcli` 또는 `tbnbcli`를 사용하여 [현재 검증인 목록](stake/cli-commands.md#query-side-chain-top-validators)을 조회할 수 있습니다.

```bash
## mainnet
bnbcli staking side-top-validators --top 10 --side-chain-id=bsc --chain-id=Binance-Chain-Tigris

## testnet
tbnbcli staking side-top-validators --top 10 --side-chain-id=chapel --chain-id=Binance-Chain-Ganges
```

4. BNB을 위임합니다.

`bnbcli` 또는 `tbnbcli`를 사용하여 일부 BNB를 다른 검증인이게 [위임](stake/cli-commands.md#delegate-bnb)할 수 있습니다.

[explorer](https://explorer.bnbchain.org/)에서 트랜잭션을 검증할 수 있습니다.

```bash
## mainnet
bnbcli staking bsc-delegate --chain-id Binance-Chain-Tigris --side-chain-id bsc --from bnb1tfh30c67mkzfz06as2hk0756mgdx8mgypu7ajl --validator bva1tfh30c67mkzfz06as2hk0756mgdx8mgypqldvm --amount 1000000000:BNB --home ~/home_cli

## testnet
tbnbcli staking bsc-delegate --chain-id Binance-Chain-Ganges --side-chain-id chapel --from tbnb1tfh30c67mkzfz06as2hk0756mgdx8mgypu7ajl --validator bva1tfh30c67mkzfz06as2hk0756mgdx8mgypqldvm --amount 1000000000:BNB --home ~/home_cli
```
## BNB 위임 해제

`bnbcli` 또는 `tbnbcli`를 사용하여 다른 검증인에게 예치된 BNB를 [위임 해제](stake/cli-commands.md#undelegate-bnb)할 수 있습니다.

## BNB 재위임

`bnbcli` 또는 `tbnbcli`를 사용하여 다른 검증인에게 예치된 BNB를 [재위임](stake/cli-commands.md#redelegate-bnb)할 수 있습니다.

## 테스트넷

1. 테스트넷을 설정합니다.

![img](https://lh6.googleusercontent.com/mrQlZM2w-TDXQ_xfSA3XsSo_IhM0mtdnSg52Vi8pgjQYItKDAiuVwxoilMqBgVHgpc71c118-3U-79iXWP4cW-DacdfrY_RcbF3x633khQcB271pLCvLIa3uOwq19vrjZ46HDeB6)

2. 포셋(Faucet)에서 테스트넷 토큰을 받습니다.
   - 포셋 페이지: <https://testnet.binance.org/faucet-smart>

3. BNB를 BSC에서 BC로 옮깁니다.
   - 이 [가이드](binance.md)를 참고하세요.