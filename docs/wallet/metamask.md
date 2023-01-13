---
sidebar_label: Metamask 
hide_table_of_contents: false
---
# BNB 스마트 체인에서 메타마스크 사용하기

!!! 팁
    메타마스크에서 네트워크 설정 시 문제가 발생한다면 최신 버전이 작동하고 있는지 확인해주세요.

## 무엇인가요?

메타마스크는 더 안전하고 사용하기 편한 이더라움 기반 웹사이트를 만들 필요성에서 생겨났습니다. 특히 계정 관리 및 사용자를 블록체인에 연결시키는 기능을 수행합니다.
크롬, 브레이브, 사파리 브라우저에서 지원됩니다.
## 설치하기

**예시: Brave 브라우저에서 메타마스크 설치하기**

* Brave에서 메타마스크를 위한 익스텐션 카테고리를 엽니다: https://chrome.google.com/webstore/category/extensionsSearch

![img](https://lh5.googleusercontent.com/JMX8XXKQLkARgzfJUsPDrW8VCTUuP0xsUcqRELilEUr7owNdb5lC1mtAFd8KwbBHKnSRf-T9Df50Yh9Cw88ni5w9bmTIKOqvNWkVpgD1NzU36hDpBRLivqCP1tmZXWhcj41cR3Ly)

!!! 경고
    주의: 제공자가 metamask.io임을 확인해주세요.

* “Add to Brave”를 클릭하세요.

잘 하셨습니다! Brave에서 성공적으로 메타마스크 익스텐션을 받았습니다.

![img](https://lh5.googleusercontent.com/1Xct4vmkSVmPfqznMI4mEa_icigbKVQ0WeVftXE8MOjvk3kW9HJrdIDEoeTi8ARlv6rrlLHmtbhleMFuVmlf5NjIbluOBSQUgLU-HGAg518plJsdap5XXpNupZVCjiFZBaOsO4Ad)

!!! 팁
    모든 브라우저에 워크플로우는 동일합니다.

## BNB 스마트 체인을 위한 메타마스크 계정 생성하기

1. “Create a wallet” 버튼 누르기

![img](https://lh5.googleusercontent.com/Tnz34GivDYUUsCfoi4GZvJ-XXcACX2m5BamPzlQZ7nI71XBVrYYoCv-Kot4E24QHz3P3tzt31O9OeeV-Lbtn_ZrvYGNpp-GWIMWN82MdPslljJZMCwkfPM8SmsBGWL7bFcPTKWG-)

2. 최소 8 글자 비밀번호 생성하기
   
<img src="https://lh6.googleusercontent.com/q2Yq_dtl38CD2V41amALyCSr2IjrLeEYgpEQh1LKrI7iVWjzkWse0FdLPNlCb_qqjR6mI3vfkKxYgHemCBgHLkEPwPErBXb0ioGxC0GGEzGyh_JYz8kL3MukPll-xhgMpjZmDNXp" alt="img" style={{zoom:"30%"}}/>

3. “Create”를 클릭하고 백업 문구 받아 적기

![img](https://lh5.googleusercontent.com/hluBiNbCN4-8J31jX_5j2OqoNZZxb1WoApMr8RnxQ68FswgpD5D0WCZLb01nMVxDR57k-7WlDndvHEIgpB9pVHCr6O9KgenSPG6ayZrZ3D2wtZuWfTiu5Pbi_mDM19414i5FUDl4)

4. 각 문구를 올바른 순서대로 정렬하고 “Confirm” 클릭하기.
   
![img](https://lh5.googleusercontent.com/rokxHmh0CZCjyIQqrngQm7qfEGRXbBvHoHuiZHvAon4_k0DLirngnQKqzucSJfrGdyVf-42IhwtDhz2C4PLm4dUjWH3rMrOTPqNC0kUYMSQEflF1ltbGwtiAYFQoxvyKfcNFGJCj)

축하합니다! 메타마스크 계정이 생성되었습니다!

## BNB 스마트 체인에 메타마스크 연동하기

1. 설정 페이지로 가기

<img src="https://lh5.googleusercontent.com/NqWPIv1MrMJ-W2wDKjxtdxcdFhDwiqhsZ6G6MY6FQnhxPTCCPfPHBJ59vBl1ddxpbfV11ufETWAolV1s9YjCYHPeJCKW1S-sr8gfjcFt3swXM-p3IgafNBqPZ86DvThK-I9gKbrw" alt="img" style={{zoom:"30%"}}/>

2. 새로운 네트워크 추가하기
   
<img src="https://lh5.googleusercontent.com/wRHX351ldc2PWT1wXE6U1NYyUkaEmVHVoA0Ex4LKz51prqRgwJcBCs2DhL0lQ3PVmE7Sv2dE02ReXcHlXNaf0lczFZtFl5htOtAzUYkDzu5eySe7y4wpcMaCzY6GaHv6NCXM1qZQ" alt="img" style={{zoom:"30%"}}/>

  * **Testnet**
    * [RPC URLs](rpc.md)
    * ChainID: 0x61, 97 (10진수) (97이 통하지 않는다면 0x61 입력)
    * Symbol: BNB
    * Block Explorer: https://testnet.bscscan.com

  * **Mainnet**
    * [RPC URLs](rpc.md)
    * ChainID: 0x38, 56 (10진수) (56이 통하지 않는다면 0x38 입력)
    * Symbol: BNB
    * Block Explorer: https://bscscan.com

3. 계정에 테스트넷 토큰 추가하기. 주소를 클릭하여 복사하기.
   
![img](https://lh3.googleusercontent.com/3-6iXj8gVhTYrhzkDHcRBWOMvkkfUwm2W8aDssNTZ5bFqCsjq1BlY-nhCJDZWwT8kx-9URnQur1JxmAot-3Nu1lhypqVM068MovqDlv-oXPDJtz4PwsNTYGM3TZM_F5uRlnUwrP3)

1. 포셋 페이지 방문하기: https://testnet.binance.org/faucet-smart, 그리고 주소를 붙여넣기 하고 “Give me BNB”를 클릭하기.

!!! 팁
   1분에 한 번 밖에 수령하지 못합니다

![img](https://lh6.googleusercontent.com/DqxU17JcP9iW5f1yUujY5S8w2m32yv00jrQgJJ0vp_OptrNwCWotbb1_X7msseR72OpXSj8fxbLXhWZgpVEtaMJ_STof2D2mZcGsl6Qh4-KWJH8LsYu97SXySMToDnx15qS4po5z)

전송 트랜잭션을 보낸 후, 잔액이 증가한 것을 확인할 수 있습니다.

![img](https://lh6.googleusercontent.com/Azy6npo0J6hrV_H_X2-IfVcYHE7U6vaMEh2_GPnVb_5oKZSy9Qqa43QYlzEZlmgcJHnMYbyAvyFNJ16Opcn4xbNRO_6Z11Gnl0eePqOkwOfgOptGT0H9gWG2uepkRaHlYsOZ1w4b)

## BNB를 다른 BNB 스마트 체인 주소로 보내기

1. 메타마스크에 로그인하기
   
<imgg src="https://lh3.googleusercontent.com/7HKZWIzMtfolKrO42OI6Zw3XCUj4CjKo15mXT8n_B3J6CC4Po3nDK59ORv2qvgL_G84I_JOYrnp3oNXcfSO3u0IsXBo4vvB3CpaberJ86ORb9_02campWQOyBr-Y07yYPI68qR85" alt="img" style={{zoom:"30%"}}/>

2.  Send 버튼 누르기
 
<img src="https://lh6.googleusercontent.com/uLiVRN4qJW3DOxgq3zM-f5JFrZRe22ipiPOQq72IgEY4YlN6gUyJiJoWPO7cJTyblU9OtWtrkRJFe4XPLcMZk2Z06M75PnA1Ql9pw2CLUL1m1PZkhDOW3lJMlvUiAe4hDUwuwKTu" alt="img" style={{zoom:"30%"}}/>

3. 수신자 주소를 박스에서 복사하기

<img src="https://lh6.googleusercontent.com/m6RLRP6FeCy63skJ5KP6Qx94a9lzz1fLRuxpW1hf2FP932EpG7QjRaxmVNwFm4tYMp9OQvAf_xSqlO0XR-zVz5a5YXn6S7T1hprdg4n51YqjcX1jjlh-O5mw9EIjiPbiLDvs2goG" alt="img" style={{zoom:"30%"}}/>

4. 금액을 입력하기
  
<img src="https://lh3.googleusercontent.com/Pg1DZtsQJuyWbYtZ4kwgpLeJ72jmQ30CYQWJ7YjclMjKEFaw4DZnMmM8Wzusf2p7dVwyNvcFagZulQXKTv1NAnbYR5CqvIaKWrBBRz85q94EkXev9gBa-CLtUazU-IWpZSRw6OfW" alt="img" style={{zoom:"30%"}}/>

5. Advanced Options에서 필요 시 기본 가스비 수정하기 
  
<img src="https://lh6.googleusercontent.com/ffcVo2g2uczLTxksHa0wsZamfdPqtFWjsixSyQQPwWESztE1-didrWM8hdwhGCNOuf2qgmAujKywpB8Xr8ENd_awP8bVLoOjkzVrLhZnxOrperDAYd1fNJtS9_6_88cS2vDa-dGS" alt="img" style={{zoom:"30%"}}/>

6. 트랜잭션 확인한 뒤 Next 클릭하기
  
<img src="https://lh4.googleusercontent.com/vEK49MvskI51rOeENZsdh3hkdLWDCIGnPXdUAgIvcnMubfKGuyEvbcpBDDNCtxOyAKYDcQqerxpQae4WWuuTOhOYbHZWPRfJUZSwubYtejvDeLcYpLYOCU9pf7UexaOOC3ctP1fe" alt="img" style={{zoom:"30%"}}/>

7. Confirm 클릭하여 트랜잭션 확인하기

<img src="https://lh6.googleusercontent.com/6zke1TXCT9l8uzT1RkUbOFyijv2xR8GwXVqNhVN1KRVzAONn-5h-jG0ffxxDWrXXPgbyJzpiAHUU56ADomzmac_Tkpt_zx2LGTpDrobcZDE-_Z8vF-IVgxPNW3cQIj-x8dfkeEQ2" alt="img" style={{zoom:"30%"}}/>

8. 트랜잭션이 블록에 포함될 때까지 기다리기

<img src="https://lh5.googleusercontent.com/1QcOjIgBnGMPpA-b_RDi5T40ZL8uXlmjTVMpWFN-GOZHM14FQm7EEbIqKYZmv5F7f6P4dInjhvOScQ82Fo_qMMzp2ocXrBwL9zIXb4rnxtacSzQdAoBdBwBH8ckevoG-cuHdiGiu" alt="img" style={{zoom:"30%"}}/>

9. 트랜잭션이 확인 되면 Details를 클릭해 블록 탐색기에서 확인하기 

<img src="https://lh3.googleusercontent.com/QuX2cP0ZnhqnCY5xVOlodwRo1bEF126gM7XgjzLAZK2ZWlMa7z48dX-4rgC2nuiHC9-EOby69BuN-ANQtEQyL3JhnJm2KsAxAUbsEnlOK_5Wnj2Ir-J5CHC9TR8MN4bqYthY2BfB" alt="img" style={{zoom:"30%"}}/>

10.  계정을 클릭해 "Details" 확인하기
    
<img src="https://lh3.googleusercontent.com/Ssn6x6ZcRHS1V-LuI1D7eRIjPgxQF1SxlUKxQuJ5NcpPkf77XVTC-tEEWmqkxS9esWOsaQo0Qw93I7_rX6M6_qmjlm_HGqLuCNL-fuDPDTKYHXObCGcb7xCL2kRI6uideSBdny_0" alt="img" style={{zoom:"30%"}}/>

<br/>

<img src="https://lh4.googleusercontent.com/OrKkETdaAMyuqWFsaoh6ngdkS735NgR8pIYJYoXMflrGulBSQp3Z8tl3Ttugd2CftF4eHVBJFUV4KKPjbpMCQZ9qtOi10w81g08suXC9ukN4EQpwQEESXv4BwhsvjKiXquzHVngZ" alt="img" style={{zoom:"30%"}}/>

1. Explorer에서 트랜잭션 확인하기:

![img](https://lh4.googleusercontent.com/BOOwJeG2f0LYGZrud8rtD4fyGTMXWZO_EVcHE8Iiwo3VWHGCDPll6lEtp-aquCG6A_naVQbhYoHZm-mkSf0PIQdKjlyYzC-OXkHIncvryftHbSRjQxq0rg7CaORFskxSs2zhzDKG)

## BEP20 토큰 추가하기
1. https://remix.ethereum.org/에서 ERC20 컨트랙트 배포하기

2. 새로운 파일을 생성하거나 샘플 컨트랙트 불러오기: <https://gist.github.com/HaoyangLiu/3c4dc081b7b5250877e40b82667c8508>
   
<img src="https://lh4.googleusercontent.com/Kzs4VR0Xq8JPnRUKasYl01i0bllJNPcTLjhDpzKAHrzsHUm3789-sXs3m0UQZxjk8E4MOugCdga2_7JemvdGcxl_yqhK1Jc4vRan6ZxCo8CUv2BxmIrBPsTcBMEsNrHqfNpkxyU2"/>


<img src="https://lh5.googleusercontent.com/Jgip5Dl46QEEiDo1Gpy9Oc4tuPhqyV9QTwI_72PmJOTG8Fd2K_6BG5K8X-U_OvE2u6fjfXUKvVuxL-hITWweD2aX5GUP4nggR4qwTILRdXyM1tZDSxcYf1DDc0PmQYJK5D24WSVC"/>

3. 리믹스에 BNB 스마트 체인 계정 연동하기
   
<img src="https://lh4.googleusercontent.com/ZxPg5aaTnSArl6j0z5twRbJTRuN7S7IlkFFWL1gkai1EoHDYXTdHJvqL2iREmEIq5c4ERY2BN3Sf180fE77ti8-6BoWGrCV7G68SV9a2HTVYmM7rONn7ARZHVMwnzSXGQmliIT32" alt="img" style={{zoom:"30%"}}/>

4. “ABCToken” 컨트랙트 선택 후 컴파일하기

![img](https://lh3.googleusercontent.com/AVz8Ud1YCb9tA7iuFvzP_JwACrbzugcSpOj_ZZZmew8Gy3u6vwC4biOSEExLhz6Euvgh1Ow8L4LIbpMYw9upNTWHnYJnmRlsNKZF_sVpYwMt11SWv5spZ2d3n7PiAZOts6exDg9W)

5. 컴파일된 컨트랙트 배포하기
  
![img](https://lh6.googleusercontent.com/x918VLGGD8BG8-27sMOuqhpuVawQPpM6paq-7WOi3PVjmQJw4Lo1jlNFCa9R_TPYHJgFc-7xrRuMxTzdlTUzVPl-XQG8hBYqmlsk8VJr3oBsnI4kfyBVUfuiSzswQl2-9kK8fNdf)

6. 컨트랙트의 가스비를 조정한 뒤 배포된 컨트랙트 확인하기

<img src="https://lh5.googleusercontent.com/ciF5AVMG8DziCOjktsUAPdPlEgaqsrBOfLc0cYtYX1kWm1GgKNNmSLKqWuR628sQKU4iKXyE1mIT2h2ownM3POMUu6tdMuFUebmYVLy2d54l6j30yJrGr6ymX_tlQHDTWjKIgzCx" alt="img" style={{zoom:"30%"}}/>

7. 블록 탐색기에서 새로운 트랜잭션 확인하기

<img src="https://lh6.googleusercontent.com/7xsQbT6W66buPH6mfKKt_gXKa0iioDD8P98OmtMoU717ADZ7USMssS0UEMHcEQphQBRXjJsiSInNSs25OroEcIstxHSKGu19e-NWTg08-qyN1myyIdDO-OCcySpZ9m9-E2GPuACL" alt="img" style={{zoom:"30%"}}/>

8. 메타마스크에서 “Add Token” 클릭하기

<img src="https://lh6.googleusercontent.com/oztOHGoDrNjAa0UuBvWmhBATmUIovWu9svZff_Wwl2LVl3qZosdjHRQVQhZT-ImWYQS5P82TzzlOl_trfGgURBrlp8pORngqC40ho72lN6JsG2pr2nN6x-W8reGcz1CiqJGYyStX" alt="img" style={{zoom:"30%"}}/>

9. “Custom Token”을 선택하고 컨트랙트 주소 복사하기

<img src="https://lh3.googleusercontent.com/IotGapmGylVAuwIS5JpXjLVF4faQ3Kzv8Bznc3tkue_MJv8lP6C_RRYFktcMnBmi0gAcIGeYs5nlqj5Ip8o_p2enVXF478dCWpA1Ni4YGHpFtdbrXybXXdGelX2coOGTnJ9Tc9er" alt="img" style={{zoom:"30%"}}/>

10. “Add Tokens” 클릭하기
    
<img src="https://lh4.googleusercontent.com/K8Ry7dTB-2qV9J0W04L_RGK7LD8rim_gOXZlDyahgCnPo1q_2RnRcOuQ-mrgmi9zgDbSYt1N6SY7_am0uk1dmJGUJJ0pcriClmCOfR9OdVq4uL7AQfJftpk16sMtTyo4yRY3WxCW" alt="img" style={{zoom:"30%"}}/>

잔액이 변경된 것을 확인할 수 있습니다.

<img src="https://lh3.googleusercontent.com/PPvqLu8VePVzrlR281HHnmclkj3qcRsKWA3zvJsUyCKiTP2NkOeI11v88DEUgma7KHg3OzU4N0Fko_8XRrXVJEFGtNlSd0D9elxjwypO0MGG9BrRBh5KGsVYEuAj1gIxo5XK5Wfu" alt="img" style={{zoom:"30%"}}/>                                


<img src="https://lh5.googleusercontent.com/jhQwd9OYfxLMBTlREiy_igjx5AFGa_pTwpEG9sc6Vvkf0YGzuwyZtLUylFEF0OQwpOYIFxwt7PNRARQHYsAxNjfUHwcRR6M09YxRdHBDsfTTHlsDXkgUIEyzAc6PRCGIAh4EuuFB" alt="img" style={{zoom:"30%"}}/>

## 다수의 계정 생성하기

1. 다수의 계정을 생성하고자 한다면 메타마스크에서 Profile 아이콘을 누르고 Create Account를 클릭합니다.
   
<img src="https://lh6.googleusercontent.com/2Xza8K_NtkE63R1j3NwBH7rxsay9zOKu_v-3fawtt86On_vGavW87c1qUP0JpfIaWRc5QPTk6ZqC6bmm_-6-829WnU5woMXKh7BM0-0OkraO55LKYMwuZxEZ3R2k0-SsyNnh4cNc" alt="img" style={{zoom:"30%"}}/>

2. 계정 이름을 추가하고 Create를 클릭합니다.
   
<img src="https://lh6.googleusercontent.com/86QMeVAhod3bDV_3ZqoWVB-D-E4CdPyb4iJdbvbBGwVPrcN0ZBqYeRYqf9gk9C4DxzW0Z86KK0a8vf2CKQGB6NlqGFKv95gON5LrtXL4-uT1LLMvSmdYePEa1ilD9MswEbpwtMGP" alt="img" style={{zoom:"30%"}}/>

3. 새로운 계정이 생성되었습니다!

<img src="https://lh5.googleusercontent.com/uhVQO7NLq_x9y8oBSfmT0PB4SohfUKUSZwN5qxxF6xA_6vNgU-QRpAQENdLQRk8hyc_gSukrAUqosIv_OUcJv5AviDn2TQ_6U8QWXx02HgigXO7w5BRL3If3Mrx3KOHRWw7ay3U8" alt="img" style={{zoom:"30%"}}/>

## 업그레이드

v8.1.3 릴리즈 이래로 "Invalid Custom Network"라는 경고 메시지가 종종 나타납니다.  

<img src="https://lh6.googleusercontent.com/AbMd49RFlERw1E_OpmURgZxqYHqHOXpPJLtT-ysIB2oAwmVf054jzQndDxJOfqj-FFCR_Beb1LTXvw6T7TvO03aVlHGmEaE1N2J5mg5kUm-dbcaXnlLH-0RLM-SGV0brrlweEyrQ" alt="img" style={{zoom:"30%"}}/>

이 문제 해결을 위해서는 "Settings"에서 BNB 스마트 체인의 Chain ID를 다시 입력합니다. **56**가 안 된다면 **0x38**을 시도해보세요. 

<img src="https://lh5.googleusercontent.com/wRHX351ldc2PWT1wXE6U1NYyUkaEmVHVoA0Ex4LKz51prqRgwJcBCs2DhL0lQ3PVmE7Sv2dE02ReXcHlXNaf0lczFZtFl5htOtAzUYkDzu5eySe7y4wpcMaCzY6GaHv6NCXM1qZQ"/>

![img](https://lh6.googleusercontent.com/vKWf01WY7u0bFp1Iww2VgFzqnk_Zw2yhBQfBCfG2UAE5aHJOZouYGNGGS1C1w5yvEMzmynwRcE1gwZS9VZ1akfyQItzF6-2Sw5I9M33w4caHqnKoAN2GhajkqqQYBnc-IiOkGrMg)