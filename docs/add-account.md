---
sidebar_label: 계정 추가
hide_table_of_contents: false
sidebar_position: 2
---

# 계정 추가하는 법

## BIP39
[Bitcoin Improvement Proposal (BIP) 39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)는 니모닉 문장(니모닉 단어, 시드 프레이즈, 복구 프레이즈 등으로도 불립니다) 생성 및 해당 문장에서 시드를 생성하기 위한 공식을 정의합니다. 시드 프레이즈는 개인 및 퍼블릭 키를 생성하는 데 사용됩니다.

## BIP32
[BIP 32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)는 [계층적 결정 지갑](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)를 생성하기 위한 명세입니다. 이 지갑들은 루트에서부터 다수의 "자식" 개인키를 결정론적으로 생성할 수 있습니다. 오직 자식 키의의 "경로(path)"만 기억하고 있으면 됩니다. 예를 들어 하드웨어 월렛들은 하나의 루트를 이용하여 비트코인(path m/44'/0'/0'/0)과 이더리움(path m/44'/60'/0'/0)을 위한 개별 키를 생성할 수 있습니다.

## 바이낸스 익스텐션 월렛에서 계정 추가하기
BNB 체인 익스텐션 월렛은 이더리움과 비슷한 방식으로 키를 생성합니다. 즉, "44'/60'/"와 같은 HD 접두사와 함께 BIP32/BIP44를 이용하여 개인키를 도출하는 것입니다. 이는 이더리움에서의 도출 경로와 동일합니다.

![img](https://camo.githubusercontent.com/27efab81cd5ca43ba036a29bc4e2dfdfda88cac69de2880385335d0a4234619a/68747470733a2f2f6c68332e676f6f676c6575736572636f6e74656e742e636f6d2f73506b703861503069334161766e6176506255473459777a6666324649694c724f754b7372636a34706365687a39414c716f7553705f61715f54315354485953324d43414e6145776367687135795076376f4a78414f39476d4d5869666d7a3936514a2d4457496350337063432d786355736d317a3763416f31456e4b5f54707a5f31646b643742)


“**Add Account**”를 클릭하면 시드가 끝부분의 카운터 값을 통해 연장됨에 따라 익스텐션 지갑의 새로운 주소에서 무제한적으로 새 주소를 자동 도출할 수 있게 됩니다.