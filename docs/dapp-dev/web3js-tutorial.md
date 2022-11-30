---
sidebar_label: Using Web3.js Library on BNB Smart Chain
sidebar_position: 2
hide_table_of_contents: false
---

# BNB 스마트 체인에서 Web3.js 라이브러리 사용하기
블록체인 개발을 원하는 모든 사람들을 위해 구성된 이 튜토리얼은 web3.js 라이브러리와 함께 특정 해시값으로 BNB 스마트 체인에서 트랜잭션을 조회하기 위해 Nodereal API를 사용하는 법에 대한 단계별 가이드를 제공합니다. 이 튜토리얼에서 사용된 기술 스택에는 Web3.js, Nodereal MegaNode 그리고 http-server가 포함됩니다.

## 핵심 학습내용:
이 튜토리얼은 다음의 내용을 학습하는 데 도움을 줍니다:
-	Web3.js 라이브러리를 사용하여 블록체인 데이터 조회하기
-	Nodereal의 Meganode API를 사용하기
-	정적 페이지를 http-server를 사용하여 로컬호스트에 올리기

## 기술 스택 세부사항-	node v16.13.0
-	npm v8.1.0
-	Web3.js
-	http-server 

## 개발환경 구축하기
1. http-server를 설치하세요: ```npm install -g http-server```

![image](https://user-images.githubusercontent.com/93580180/177191619-12099c27-bd4e-414b-8fda-b3bdd52c5d51.png)
 
2.	BNBChain-Tutorial 리포지토리를 클론하세요: ```git clone https://github.com/bnb-chain/bnb-chain-tutorial.git```
3.	현재 디렉토리를 변경하세요: ```cd "02-BSC-Block-Explorer"```
4.	모든 디펜던시를 설치하기 (노드 모듈): ```npm install```
5.	애플리케이션을 실행하기 전에 Nodereal Meganode API의 ```index.html```에 아래와 같이 HTTP 링크를 추기했음을 확인해주세요.

![image](https://user-images.githubusercontent.com/93580180/177191680-2c9b530a-21fa-448b-bf88-e0d6558ada6a.png)

6.	이 프로젝트에서는 아래와 같이 BSC 테스트넷 퍼블릭 API 키를 사용했습니다. Nodereal Meganode 퍼블릭 API 키 전체 목록은 [여기](https://docs.nodereal.io/nodereal/meganode/meganode-api-overview/public-api-key)에서 확인하세요. 

![image](https://user-images.githubusercontent.com/93580180/177192584-f76dd7dd-ba44-461a-aac7-568703a4f78d.png)

7.	프로젝트 디렉토리에서 명령어 ```http-server```를 사용해 애플리케이션을 실행하세요.

![image](https://user-images.githubusercontent.com/93580180/177192648-29422ee0-c8d5-42ff-91e6-5db1bd4c985e.png)

8.	웹 브라우저를 열고 명령어 ```http-server```를 통해 보여지는 포트 중 하나로 들어가세요.

![image](https://user-images.githubusercontent.com/93580180/177192746-0d9953dd-d398-4e19-b630-30ed90f5e30a.png)

## 사용 방법
1.	BSC 테스트넷에 Nodereal’s Meganode API의 HTTP 레퍼런스를 사용했으므로, [BSCscan for Testnet](https://testnet.bscscan.com/)을 열고 원하는 트랜잭션의 해시를 복사하세요.
2.	해당 해시값을 블록 탐색기의 입력 필드에 붙여넣기하세요.

![image](https://user-images.githubusercontent.com/93580180/177192831-677e01c7-c3b9-4d11-b0df-4cdb47029cb0.png)

3. Fetch Details 버튼을 눌러 트랜잭션의 세부 내용들을 확인하세요.

![image](https://user-images.githubusercontent.com/93580180/177192858-7e04af6b-980c-4e19-8fa2-4af70752fc1c.png)

4.	아래와 같이 코드 블록을 변경하여 수신된 트랜잭션 결과의 다른 내용을 확인할 수도 있습니다.

![image](https://user-images.githubusercontent.com/93580180/177192885-67184a5e-2bf9-479d-b9ab-e00693020ee9.png)
 
5.	아래와 같이 트랜잭션 결과에는 다수의 필드가 있습니다.

![image](https://user-images.githubusercontent.com/93580180/177192924-78c07184-8222-4f0c-9eff-bf8fb0972f12.png)


## 결론
이 튜토리얼에서 우리는 특정 트랜잭션의 해시값으로 BSC 테스트넷의 트랜잭션의 세부 내용을 조회하기 위한, Web3.js를 사용하는 백엔드, 프론트엔드를 갖춘 dApp을 개발해봤습니다. 기술 스택에는 Web3.js, Nodereal MegaNode 그리고 http-server가 포함됩니다. [GitHub](https://github.com/bnb-chain/bnb-chain-tutorial)에서 더 많은 튜토리얼을 확인할 수 있습니다. 질문이 있거나 어려운 점이 있을 시에는 [Discord Channel](https://discord.com/channels/789402563035660308/912296662834241597)을 방문해주세요.


