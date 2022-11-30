---
sidebar_label: Full Stack Hello World dApp
sidebar_position: 2
hide_table_of_contents: false
---

# BNB 스마트 체인에서 5분만에 풀스택 dApp 개발하기

블록체인 개발을 원하는 모든 사람들을 위해 구성된 이 튜토리얼은 BSC 블록체인에 데이터를 저장하고 조회할 수 있는 풀스택 _Hello World Smart dApp_ 을 개발하기 위한 단계 별 설명을 제공합니다. 이 튜토리얼에서 사용되는 기술 스택에는 솔리디티(Solidity), 트러플(Truffle), 가나슈(Ganache), Web3.js, and Node.js가 포함됩니다. 또한 BNB 스마트 체인 테스트넷에서 스마트 컨트랙트를 배포하는 법을 다룹니다.

## **핵심 학습내용:**

이 튜토리얼은 다음의 내용을 학습하는 데 도움을 줍니다:

- BSC 테스트넷에 메타마스크 월렛 연결하기
- 스마트 컨트랙트 개발
- 로컬 개발 및 테스팅을 위해 트러플과 가나슈 사용하기
- 스마트 컨트랙트 유닛 테스팅
- BSC 테스트넷에 스마트 컨트랙트 배포하기
- web3.js 라이브러리를 사용한 프론트엔드와 스마트 컨트랙트 연계

## 기술 스택 세부사항

- node v16.13.0
- npm v8.1.0
- Truffle v5.5.19 (core: 5.5.19)
- Ganache CLI v6.12.2 (ganache-core: 2.13.2)
- Solidity ^0.8.0 (solc-js)
- Web3.js v1.5.3
- MetaMask Wallet v10.16.1

### 기술 스택 소개

1. _**Truffle Framework:**_ 이더리움 가상 머신(EVM, Ethereum Virtual Machine)을 사용하는 모든 블록체인의 스마트 컨트랙트 개발, 테스팅 및 에셋 파이프라이닝을 위한 일련의 도구입니다.
2. _**Ganache:**_ 데스크톱 앱과 CLI로 이용 가능한 개인 블록체인으로, 로컬 블록체인 개발에 사용될 수 있습니다.
3. _**Solidity:**_ 가장 인기가 많은 객체 지향 하이레벨 스마트 컨트랙트 프로그래밍 언어 중 하나입니다. 더 자세한 정보는 [여기](https://solidity-kr.readthedocs.io)에서 확인하세요.
4. _**MetaMask Wallet Browser Extension:**_ 메타마스크 크롬 브라우저 익스텐션을 사용할 것을 권장합니다. 크롬 브라우저를 유효한 모든 블록체인에 연결시킬 수 있게 해주는 웹 월렛입니다.
5. _**Node JS:**_ UI 또는 프론트엔드 개발에 사용됩니다.
6. _**Web3.js:**_ EVM 기반 블록체인들과의 상호작용을 가능하게 해주는 JavaScript 라이브러리입니다. 웹 애플리케이션을 블록체인 애플리케이션으로 만들어주는 마법의 도구입니다.

## **개발환경 구축하기**

1. 트러플 설치하기: ```npm install -g truffle```

2. 가나슈 CLI 설치하기: ```npm install -g ganache-cli```

3. BNBChain-Tutorial 리포지토리를 클론하기: ```git clone https://github.com/bnb-chain/bnb-chain-tutorial.git```

4. 현재 디렉토리를 변경하기: ```cd 01- Hello World Full Stack dApp on BSC```;

5. 모든 디펜던시를 설치하기 (노드 모듈): ```npm install```

6. 메타마스크 크롬 익스텐션을 설치하고 BSC 테스트넷과 사용할 수 있게 설정하기. 더 자세한 설명은 [여기](https://academy.binance.com/ko/articles/connecting-metamask-to-binance-smart-chain)를 참고하세요.

7. 메타마스크의 비밀 문구를 포함한 .secret 파일 생성하기. 메타마스크 비밀 문구를 얻는 방법에 대해서는 [여기](https://metamask.zendesk.com/hc/ko/articles/360015290032-%EB%B9%84%EB%B0%80-%EB%B3%B5%EA%B5%AC-%EB%AC%B8%EA%B5%AC%EB%A5%BC-%EA%B3%B5%EA%B0%9C%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)를 참고하세요.

## **스마트 컨트랙트 사용하기: 컴파일 및 배포**

1. **스마트 컨트랙트 컴파일하기** commandtrufflecompile를 사용하여 스마트 컨트랙트를 컴파일하세요.

![image](https://user-images.githubusercontent.com/93580180/177171360-8066812a-a309-43c9-b2df-f5a1fedcdcd2.png)

2. **스마트 컨트랙트 이동시키기** 아래의 명령어를 사용해 스마트 컨트랙트를 BSC 테스트넷에 배포/이동시키세요. ```truffle migrate --reset --network bscTestnet```

![image](https://user-images.githubusercontent.com/93580180/177171461-f92f9f2a-17cb-43e2-bcca-cdd69eb6a9ff.png)


3. **스마트 컨트랙트 유닛 테스트하기**

      1. 터미널을 열고 프로젝트의 루트 디렉토리로 이동하세요. 다음의 명령어를 사용해 ganache-cli를 실행시키세요. ``ganache-cli``.

![image](https://user-images.githubusercontent.com/93580180/177171537-8a77135e-9750-4800-aa4f-918b7b82dc43.png)

      2. 터미널이 열려있는 것을 확인하세요. ganache-cli가 배경에서 작동하고 있어야 합니다. 이것이 중요한 이유는 테스팅이 로컬 네트워크에서 이루어지고 있기 때문입니다.

      3. 프로젝트의 루트 디렉토리에서부터 새로운 터미널에서 명령어 ```truffle test```를 사용해 테스트를 실행시키세요.

![image](https://user-images.githubusercontent.com/93580180/177171621-f884d615-e65e-46fb-9e3d-edaa9a8c26bf.png)

4. **빌드 생성하기** 명령어 ```npm run build```를 사용해 웹팩(webpack) 라이브러리를 이용하여 웹 애플리케이션을 위한 빌드 파일을 생성하세요.

![image](https://user-images.githubusercontent.com/93580180/177171669-b8bd829f-81ec-45ec-951a-c9920ef2c1b3.png)

5. **애플리케이션 실행하기** 명령어 ```npm run dev```를 사용해 로컬호스트에서 애플리케이션을 동작시키세요. **노트:** _애플리케이션을 실헹시키기 전에 localhost:3000에 아무 것도 동작하고 있지 않음을 확인하세요._

![image](https://user-images.githubusercontent.com/93580180/177171781-2a2eba8c-eea9-4af5-8b02-fc9bdd88e9d6.png)

6. 크롬 브라우저에서 localhost:3000로 이동하여 dApp이 실행되는 것을 지켜보세요.

![image](https://user-images.githubusercontent.com/93580180/177171856-abaf323d-c35c-4d3a-bfd0-ec1270fa333e.png)

## **dApp 사용하기**

1. 여러분의 메타마스크 월렛이 올바르게 설치되었으며, BSC 테스트넷에 연결될 수 있도록 설정되었음을 확인해주세요. 자세한 내용은 [가이드](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain)를 참고하세요. dApp을 제대로 사용하기 위해서는 메타마스크 월렛이 사이트에 연결되어 있는 것을 확인해야 합니다.

![image](https://user-images.githubusercontent.com/93580180/177172042-75583f4d-588e-49c0-9e13-ef13bf53610d.png)

2. _**Greet Button**_을 눌러 메시지를 노출시킵니다. 기본값은 _**Hello, World**_입니다.

![image](https://user-images.githubusercontent.com/93580180/177172075-f19f48e4-2802-4bc0-8017-5febd412c06a.png)

3. 인풋 필드에 이름을 입력하고 _**Save Name**_ 버튼을 눌러 이름을 저장합니다.

![image](https://user-images.githubusercontent.com/93580180/177172100-eb80c577-2898-47cf-8b57-89b0e478c765.png)

4. 메타마스크 화면이 나타나면 트랜잭션을 확인합니다.

![image](https://user-images.githubusercontent.com/93580180/177172154-5662d3ae-9039-4034-81cf-e90d2b427ec2.png)

5. 트랜잭션이 성공적으로 확인되었다면 _**Save successful**_ 메시지가 나타날 것입니다.

![image](https://user-images.githubusercontent.com/93580180/177172193-b21c70d9-fc3a-4201-afc8-9a1ae978e18b.png)

6. _**Greet Button**_을 클릭하여 현 계정으로 저장된 최신 이름과 함께 메시지를 노출시킬 수 있습니다.

![image](https://user-images.githubusercontent.com/93580180/177172207-d7b890de-c603-463d-ab39-a78e3cd56a63.png)

## **결론**

이 튜토리얼에서 우리는 BSC 테스트넷에 배포된 스마트 컨트랙트와 소통할 수 있는, Node.js를 사용하여 개발된 탈중앙화 앱을 위한 백엔드와 프론트엔드를 모두 개발해봤습니다. 기술 스택에는 Web3.js, 트러플, 가나슈 cli, Node.js, 메타마스크 그리고 jQuery가 포함됩니다. [GitHub](https://github.com/bnb-chain/bnb-chain-tutorial)에서 더 많은 튜토리얼을 확인할 수 있습니다. 질문이 있거나 어려운 점이 있을 시에는 [Discord Channel](https://discord.com/channels/789402563035660308/912296662834241597)을 방문해주세요.
