---
sidebar_label: Using Remix IDE
hide_table_of_contents: false
sidebar_position: 2
---

# BSC에서 BEP20 토큰 발행을 위해 Remix IDE 사용하기

이 튜토리얼에서는 [Remix IDE](https://remix.ethereum.org/)를 사용하여 BSC에 BEP20 토큰을 발행하기 위해 스마트 컨트랙트를 생성, 컴파일, 배포하는 법을 알아보겠습니다.


### 요구사항
Remix IDE를 사용하여 BSC에 솔리드 스마트 컨트랙트를 배포하는 데에는 로컬 환경 설정이 필요하지 않습니다.
 
BSC 테스트넷 및 배포된 컨트랙트와 상호 작용하는 브라우저 기반 웹3 지갑(예: 메타마스크)만 있으면 됩니다. 이미 메타마스크를 사용하는 경우 Replit을 사용하여 테스트할 새 계정을 만드는 것이 좋습니다. 메타마스크 인터페이스의 우측 상단 모서리에 있는 계정 아바타를 클릭하면 나타나는 계정 메뉴에서 이 작업을 수행할 수 있습니다.
 
BSC에 솔리디티 스마트 컨트랙트를 배포하려면 다음 모든 요구 사항이 필요합니다.

* [메타마스크 지갑 다운로드](https://metamask.io/)
* [메타마스크에서 BNB 스마트 체인 테스트넷 구성](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain)
* [BNB 테스트넷 토큰 받기](https://testnet.binance.org/faucet-smart)
 
### 리믹스 IDE 설정하기

- Remix는 스마트 컨트랙트를 개발하기 위한 온라인 IDE입니다.
- Solidity 컴파일러를 선택하고, 적절한 컴파일러 버전을 선택해야 합니다. 이 튜토리얼은 0.8.4을 사용했습니다.

<img src="https://user-images.githubusercontent.com/93580180/182832093-0229df42-6f44-4027-b418-b8045208a30f.png" alt="img" style={{zoom:"100%"}}/>


## 스마트 컨트랙트 작성하기

- 새 파일을 생성하고 ```BEP20Token.sol``` 라고 파일명을 설정합니다. [BEP20 토큰 형식](BEP20Token.template)에서 컨트랙트 코드를 복사합니다.

- 적절하게 “name”, “symbol”, “decimals”, “totalSupply” 값을 입력합니다.

<img src="https://user-images.githubusercontent.com/93580180/182832302-2e9bb7b7-9b54-49d8-888e-d03613ce59b1.png"/> 

첫 째줄의 `pragma solidity ^0.8.4`는 이 소스코드가 솔리디티 버전 0.8.4 이상을 위한 것임을 나타냅니다. [Pragmas](https://solidity.readthedocs.io/en/latest/layout-of-source-files.html#pragma)는 소스모드를 어떻게 처리해야 하는지에 대한 일반적 지침들입니다 (e.g., pragma once).

솔리디티에서 컨트랙트는 이더리움 블록체인의 특정 주소에 존재하는 코드(함수들)와 데이터(상태)의 집합입니다. [constructor](https://solidity.readthedocs.io/en/latest/contracts.html#constructor)와 [memory](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack)에 대한 자세한 내용은 각 문서를 참고하세요.

## 스마트 컨트랙트 컴파일하기

- 1단계: 버튼을 클릭하여 컴파일 페이지로 전환합니다.

- 2단계: 적절한 컴파일러 버전을 선택합니다(여기에서는 0.8.4입니다).

- 3단계: Advanced Configurations에서 "Auto compile" 및 "Optimization"를 활성화합니다.

- 4단계: 컨트랙트 드롭다운 메뉴에서 "BEP20Token"를 선택합니다.

- 5단계: "ABI"를 클릭하여 컨트랙트 ABI를 복사하고 저장합니다.

<img src="https://user-images.githubusercontent.com/93580180/182832411-56a76672-40c9-490b-85a3-46eeecf7b911.png" alt="img" style={{zoom:"100%"}}/>

## 메타마스크 설정하고 계정 충전하기

이제 BNB 스마트 체인 네트워크에 스마트 컨트랙트를 배포해야 합니다. 이를 위해 Web3 세계에 연결해야 합니다. 이것은 메타마스크, 브레이브, 포티스 등과 같은 서비스를 통해 가능합니다. 여기서는 메타마스크를 사용할 예정입니다. BSC에서 사용할 메타마스크 지갑을 구성하려면 [메타마스크 계정 설정 튜토리얼](wallet/metamask.md)을 따르십시오.


- 메타마스크를 열고 네트워크 드롭다운에서 Custom RPC를 선택합니다.

- 설정 페이지로 이동합니다.

<img src="https://lh5.googleusercontent.com/NqWPIv1MrMJ-W2wDKjxtdxcdFhDwiqhsZ6G6MY6FQnhxPTCCPfPHBJ59vBl1ddxpbfV11ufETWAolV1s9YjCYHPeJCKW1S-sr8gfjcFt3swXM-p3IgafNBqPZ86DvThK-I9gKbrw" alt="img" style={{zoom:"30%"}}/>

- 새로운 네트워크를 추가합니다.

<img src="https://lh6.googleusercontent.com/jrq511YshO6rPPx4i-ePRy2gs-66b465c_JFXEW8Cm5CSNTM7CXgCPuFmIh_Im3JlEhxpAqEDDjmUqfskq2m5rG-FKhwZ4_jIenOTdAVs_rMMTjTvZlM6iOpQeivrz_V1liSvuB5" alt="img" style={{zoom:"30%"}}/>

* 테스트넷
    * [RPC URLs](./rpc.md)
    * ChainID: 97
    * Symbol: BNB
    * Block Explorer: https://testnet.bscscan.com

* 메인넷
    * [RPC URLs](./rpc.md)
    * ChainID: 56
    * Symbol: BNB
    * Block Explorer: https://bscscan.com

- Save를 클릭하여 저장합니다.
- 메타마스크에서 주소를 복사합니다.

- [포셋](https://testnet.binance.org/faucet-smart)에서 테스트 BNB를 받습니다.

## 스마트 컨트랙트 배포하기

BNB 스마트 체인 테스트넷에서 스마트 컨트랙트를 배포해보겠습니다.

- 환경 드롭다운에서 Injected Provider와 컨트랙트를 선택합니다.

<img src="https://lh5.googleusercontent.com/Z4XBNJcsMWk5SzSKB8no5vAzv8ie46p4dbv4sh0_9FxIyMfEFlCj2z_a_ZUWR6l3fH9OIr3B2A0_Puh89FzbxlkLMVsTo9diSbLGdbp2Swml0afc7Unl10hBw9jsAY6Ozgbe6HqE" alt="img" style={{zoom:"20%"}}/>

- 연결 요청을 수락합니다.

<img src="https://lh3.googleusercontent.com/-SBQ0YKnAs_IR80dcqc3EpWRte8KlVCgTIPgSiFPe6H_TKDZj4O5TBR0rpvts4YZpA1LYN2-5IocYkcZjuMP5yb7rch0NovdTMH-55Pjg4HIorxZGeFO7dkyYGlrY0W5DYfs7t_z" alt="img" style={{zoom:"30%"}}/>

- 메타마스크가 Remix에 연결되고 "Deploy" 트랜잭션을 전송하면 트랜잭션 확인을 요구하는 메타마스크 팝업이 생성됩니다.

<img src="https://lh4.googleusercontent.com/9awuDudNSuUOZDQAlW5FPZ5SbRkWsKPlJSYWGUL7R4raJ5o2mprRP7jt87hP_wbuYeoJy75ErwDcKVC7_spf8YkumCkwOP4Eak9SfcV6dZvyVhy84JqKfVUvmEeLw5mWEZ3-aCED" alt="img" style={{zoom:"20%"}}/>

**축하합니다!** BSC 테스트넷에 BEP20 스마트 컨트랙트를 배포했습니다. 이제 스마트 컨트랙트를 사용할 수 있습니다. 배포 상태는 여기에서 확인하세요. < https://testnet.bscscan.com/>

## 결론
이 튜토리얼은 Remix IDE 및 메타마스크 웹 월렛을 사용하여 BEP20 컨트랙트를 만들고 배포하는 기본 사항을 안내했습니다. 또한 배포된 스마트 컨트랙트를 확인하고 게시하는 방법에 대한 단계별 가이드도 제공합니다. 이 튜토리얼은 테스트넷을 사용하지만, 메인넷에서도 동일한 명령어와 순서가 작동합니다.
