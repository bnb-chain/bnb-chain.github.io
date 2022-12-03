# BNB 체인 테스트넷 웹 지갑으로 BEP8 토큰 관리하기
이 문서에서는 BNB 체인 테스트넷에서 [웹 지갑](https://testnet.binance.org/en/tokens)으로 BEP8 토큰을 관리하는 법에 관해 배웁니다.

## BEP8 토큰이란?
비컨 체인 테스트넷의 [나이팅게일(Nightingale) 업그레이드](https://community.binance.org/topic/2828) 이후, [BEP8](https://github.com/bnb-chain/BEPs/blob/master/BEP8.md)이라는 새로운 프로토콜이 소개되었습니다. BEP8 프로토콜을 통해 마이크로 금융 같은 새로운 시장과 잠재적인 비즈니스에 활용할 수 있게 되었습니다.

현재 바이낸스 DEX에 상장되어 있는 BEP2 토큰을 구매하는데 상당한 비용이 들어가는데 이는 시스템 자원이 들어가기 때문이고, 시장에서 인지도가 있는 성숙하고 큰 프로젝트에 사용하는 것이 적합합니다.
반면 토큰화를 통해 자금을 마련하고 성장할려는 프로젝트들도 존재하는데 마이크로 금융 프로젝트나, 저작권 소유자, 피어 생산 및 커뮤니티 인센티브 등이 대표적인 예시입니다. 이들은 토큰화로 유연하게 거래가 가능한 플랫폼을 찾고 있습니다. BEP8 토큰 마켓은 이러한 수요를 충족하기 위해 제작되었고, 비교적 작은 프로젝트 유틸리티 토큰의 유동성을 증가시켜 기존 주식 시장의 중소기업이나 벤처기업을 위한 시장과 같은 역할을 수행합니다.

## BEP8 토큰 발행하기

1. 발행 [페이지](https://testnet.binance.org/en/tokens)에서 “Issue Token” 버튼을 클릭합니다.

![img](https://lh6.googleusercontent.com/oncU08EeRRDZTvp83CurYlE1uh695kGpaNkapFgkTC5cfWJKHkptzmLkx2EKnhRgz9TZFTgyMBUz5GeZUYFskLGlimM7zMkcn-gexTErxryARD9bOjC-FUGytw8UEFo2FgIH3IPW)

2. BEP8(혹은 MiniToken)을 선택하세요.

![img](https://lh4.googleusercontent.com/OwbEzux0-HWV9L0VWPrtBAOvhG-owvQbPfaRhnCzF0fIRQSWzTfQxYVvggdKi624arMDTl_VD6gyEG4b_fLmB6siCmMoQq5mYLb1KXLeMNzp00rE3O4VWwYRhNkpvpsTQnEJGiZy)

3. 토큰에 대한 정보를 채워 넣습니다.

![img](https://lh5.googleusercontent.com/sUI0AaTZ3paH5dxeRm83l5ZAH8VYZ48bibo_P-fGAaMHXsHR0G9_giQ3V5JTwXAEic7LEZOpWrutnj_gTls9wXsOdqzukZGb24gHuqXiLyly_E6K1DdW46gi0VcNARgipzpKug0a)

* **Token Name(토큰 이름)**: 토큰 이름의 길이는 3에서 32 사이입니다.
* **Token Symbol(토큰 심볼)**: 심볼 길이는 2에 5 사이입니다.
* **Maximum Supply(토큰 공급)**: BEP8 토큰은 최대 공급에 따라 분류될 수 있는데, 10000개 혹은 100만개로 나눌 수 있습니다. 최대 공급이 많을 수록 비용을 더 지불해야 합니다.
* **Supply(공급)**: 토큰의 양은 토큰 발행인의 잔고에 나타납니다.
* **Mintable(민팅 가능)**: 발행 후 토큰이 추가 공급 가능한지 결정합니다.
* **Token URI(토큰 URI)**: "Mini-BEP2 Metadata JSON Schema"를 준수하는 JSON 파일에 프로젝트의 웹사이트 주소나 URI 포인트를 붙어 넣습니다. https://docs.bnbchain.org/docs/beaconchain/learn/BEP8.html#set-token-uri

1. 토큰 정보 확정

![img](https://lh6.googleusercontent.com/fBfSXxquRX2jxQ6yxH-ZWMyFoPbFY-e211kBEBuYvV4EEBajbBP2LeUeG3e_GxZ2BI91dULqDzbovVIJS8ktvZGP5uO-20fKaRkZ2TQqT3OC_dFs9rDxoXiMp0tOd041vlJp4vwR)

토큰 리스트에 나타나기까지 잠시 기다려야 할 수 있습니다.

## BEP8 토큰 상장

상장 과정은 BEP 토큰 상장 과정과 다릅니다. BEP8 토큰 발행인은 비컨 체인 검증 노드들의 동의 없이 토큰을 상장할 수 있습니다. 다만 BEP8 토큰은 BNB나 BUSD 거래 쌍으로만 상장 가능하며, 견적 심볼(quote symbol)로 사용될 수 없습니다. 

1. 상장 버튼 클릭

![img](https://lh4.googleusercontent.com/AX1YK2vECeTKBO-MnSud2L29R_-q-UZg7kQquF51fu-GQZHxu1Kv2mXYY_vFyFYgvqK7IJMySNvr1x-0AmLs4m320vuCp_yKbcur1XKQ-9QG-DZHOd-mpm3Ykv9Z1hLsKVKhPWlZ)

2. 가격 설정

*  BUSD 쌍으로 상장

![img](https://lh3.googleusercontent.com/mICjk5Ell929GEvgKgEmSmnUt_nCqkHUOJTv9FI93cGchyNHvulMxysqBFTS39WuPMRALbKVyK_fx6relNd4tXh0gDWAKlnjXJnOunYaQBlQU4yQBAjCge_jJ4gIIx4QKO7cj9pP)

* BNB 쌍으로 상장

![img](https://lh3.googleusercontent.com/iSYkKN1UgLTaZ39mqnEuzhfcyPKS9X370dx52c66bAv6-CxnNCfyJeu2FQafFJDVfA9DdU11Vw5ZxP-p-9z7o3B637E1vcHjviA2WKSctqtCv99UM9kzuhfe8JjDoKvRXRh0-F7M)

## BEP8 토큰 거래

1. [BEP8 Token exchange](https://testnet.binance.org/en/trade/mini/ABC-524M_BNB) 에 들어가세요

![img](https://lh4.googleusercontent.com/ExmXaWy9NlsjZnOUFY3L_SnBADNLkiXn7hea95BTlECKmzoc8KT7DiEHT0VCj0NRiTF-5fki8zVA0_gNNqnCBZyaanD908RiV5DuRB_s4h9TU_gvhxozTaxbvy_rYLoY3K391lFZ)

2. 주문을 넣습니다

![img](https://lh3.googleusercontent.com/kjI__AIls9kvnIz0CYTWHTuRwXGz2YwQf3IuRS3Y6lopunTvyTJ7ucsBNqcGSE4bWkeZebHVlC2Z6Vss2BfAUDQsbiqM77r-mUGIE6871WYjq9kS9U-VFncrGxE7Zqt4p8xEcTWb)

## BEP8 토큰 공급 관리하기
* 토큰 민팅
`Mint` 버튼을 클릭하고 추가할 양을 입력합니다
![img](https://lh3.googleusercontent.com/wt4IKUxV2gxzdRQqGiOXA0QN-VoeKqYiqYbifo1EP4P1kR-ucGkv2KCka50loerOGFFErBBFinTZDG6cr5eeEBV0elr3mDdjD9L5Zd4WJTHBgXBhgEzzFMR58dw4LcyKrDhX-Jd7)

-총 공급량은 최대 공급량을 초과할 수 없습니다.

* 토큰 동결
`Freeze` 버튼을 클릭하고 동결할 양을 입력합니다
![img](https://lh5.googleusercontent.com/ztXqTJxQ7HWmEUBTOhR1I11k-sVlLlKwCBjanVbNh3CGHdXJH3xU2_AfM0Xgaeq5PqPUVa07yDvmV9DpihGpcipuJr1x2sHC_WZ19K4oaxP4JUXBO3tmhChQMFp2pdSlsXJ2H_eF)
* 토큰 동결 해제
`Unfreeze` 버튼을 클릭하고 동결 해제할 양을 입력합니다
![img](https://lh4.googleusercontent.com/MWYG9ONKMGamRt3EZIxxxdP03C4vFOcwk3zL2pBiqFuzDBUNovHGcp5Ypo6FriUX50RAmI_zIroX209jWiFTazS_pHPfNm-vUYMO2fnRTRBA3O1Wn8lkBbzvKrIBhj_y6PnpyzDr)
* Burn Tokens
`Burn` 버튼을 클릭하고 소각할 양을 입력합니다
![img](https://lh6.googleusercontent.com/2htVnYFl21yQsYZAzG7zbRdVChbd6PGPhe4sfxnZEnJgCOytNKJ1RuWk1dxxB5JPoPMQuAruvdRx8hbXdffB7lZry3NQ0oGfdjSO2eAfT68WoKI5_3ulPYb_xDcFwKPWMYoBenEo)
