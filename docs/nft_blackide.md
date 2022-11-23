---
sidebar_label: Using Black IDE
hide_table_of_contents: false
sidebar_position: 2
---

# Black IDE를 사용하여 BSC에 NFT 배포하기

이 튜토리얼에서는 Black IDE를 사용하여 BNB 스마트 체인(BSC) 테스트넷에 NFT(Non-funcible Token)(ERC721/1155)를 발행하는 방법에 대한 단계별 가이드를 독자에게 제공합니다. 이 문서는 BSC 테스트넷에서 NFT를 발행 및 양도하는 방법을 자세히 안내합니다. 이 튜토리얼에 사용되는 기술 스택에는 솔리디티, Truffle, MetaMask 및 Black IDE가 포함됩니다.

## 학습 요점:
이 튜토리얼은 다음 학습 요점에 대한 지식을 얻는 데 도움이 됩니다.
- 스마트 컨트랙트 개발을 위한 Black IDE
- 키쌍을 관리하고 Black IDE의 계정에 BNB 토큰을 전송하기
- BSC 테스트넷에 메타마스크 연결입니다.
- 스마트 컨트랙트 개발
- NFT를 발행, 민팅 및 양도

## 기술 스택 세부
-	BlackIDE v0.15.4
-	Truffle v5.5.19 (core: 5.5.19)
-	MetaMask Wallet v10.16.1
-	Docker v20.10.14

## 간단한 기술 스택 소개
1. **솔리디티:** 가장 인기 있는 객체 지향 고급 스마트 계약 프로그래밍 언어 중 하나입니다. 솔리디티에 대한 자세한 내용은 여기를 참조하십시오.
2. **메타마스크 지갑 브라우저 익스텐션:** 메타마스크 크롬 확장을 사용하는 것이 좋습니다. 이것은 크롬 브라우저를 유효한 블록체인 네트워크에 연결할 수 있는 웹 지갑입니다.
3. **Black IDE:** Black IDE는 통합 개발 환경(IDE)으로, EVM 호환 스마트 계약을 더 빠르고 쉽게 개발할 수 있습니다. Black IDE는 데스크톱 및 웹(Black IDE Web) 응용 프로그램을 모두 제공합니다.

## 환경 설정하기
이 튜토리얼은 가능한 한 단순하게 유지하는 것이 목표이므로 리소스를 최대한 적게 사용합니다. 다음과 같은 도구를 사용했습니다.
* 메타마스크 지갑
* 브라우저에서 메타마스크 지갑 익스텐션이 설치되어 실행 중인지 확인하십시오.
* BSC 테스트넷과 함께 사용할 수 있도록 메타마스크 지갑을 구성합니다. 다음 세부 정보를 사용하여 BSC 테스트넷을 추가합니다. 자세한 내용은 여기를 참조하십시오.
* 네트워크 이름: BSC 테스트넷입니다.
* RPC URL: https://data-seed-prebsc-1-s1.binance.org:8545/
* 체인 ID: 97
* 통화 기호: BNB
* 블록 탐색기 URL: https://testnet.bscscan.com 
* Black IDE: 데스크톱 앱과 웹 앱을 모두 사용할 수 있으며 사용자의 편의에 따라 선택할 수 있습니다. 웹 앱은 OpenZeppelin 컨트랙트를 가져오기를 지원하지 않기 때문에 이 튜토리얼에서는 데스크톱 앱을 사용했습니다. 
* BlackIDE에 필요한 디펜던시를 다운로드/설치합니다.

![image](https://user-images.githubusercontent.com/93580180/177942609-e2c942a6-342c-46cd-b794-92fc8e72bdc0.png)

## Black IDE에 로그인하기
1. Black IDE 데스크톱 애플리케이션을 엽니다. BSC 테스트넷에서 NFT에 대한 스마트 컨트랙트를 컴파일하고 배포하는 데 사용할 것입니다.
2. 로그인 버튼을 클릭하고 GitHub 계정을 사용하여 인증합니다.


## 새 프로젝트 생성하기
3. 프로젝트 옆에 있는 New 버튼을 클릭하여 새 프로젝트를 만듭니다. 

4. 장치에서 프로젝트를 저장할 위치(예: "BSC-NFT")를 지정하고 드롭다운 목록에서 프로젝트 유형을 "Basics - ERC20, ERC721, & ERC1155(v31+)"로 선택합니다. 그런 다음 Create 버튼을 클릭하여 프로젝트를 생성합니다.


5. 이 튜토리얼의 스마트 컨트랙트는 샘플일 뿐이며 언제든지 수정하고 개선할 수 있습니다.

## 스마트 컨트랙트 생성하기
6. 컨트랙트 메뉴를 확장하고 기본 파일을 삭제합니다. 


7. 컨트랙트 메뉴를 마우스 오른쪽 버튼으로 클릭하고 새 파일을 선택합니다. 파일 이름(예: BSC-NFT.sol)을 지정한 다음 만들기 단추를 클릭합니다.


## 스마트 컨트랙트 코드 작성
8. 다음 코드를 스마트 컨트랙트 파일에 복사합니다. 우리는 이[repo](https://github.com/RumeelHussainbnb/ERC721_NFT/blob/main/BSC-NFT.sol)의 계약 코드를 사용했습니다.
9. 필요에 따라 토큰의 ```MINT_PRICE```, ```MAX_SUPPLY```, ```name```, ```symbol```을 변경하세요. 또한 토큰에 따라 ```_baseURI``를 변경해야 합니다.
10.	
![image](https://user-images.githubusercontent.com/93580180/177949895-a095fdb5-f770-4530-84f6-8854a0d7a5eb.png)

## 기본 프로젝트 설정 편집
10. config.json 파일을 클릭하여 기본 설정을 변경합니다. 우리의 경우 메인 파일 이름을 컨트랙트 이름인 BSC-NFT.sol로 변경합니다. 마찬가지로 배포할 스마트 컨트랙트 이름(이 경우 BSCNFT.json)을 변경하십시오. 


 
## Black IDE를 BSC 테스트넷에 연결하기
11. Black IDE를 BSC 테스트넷에 연결하려면 오른쪽 상단 모서리에 있는 네트워크 메뉴에서 드롭다운 아이콘을 클릭한 다음 BNB 체인 레이블에서 테스트넷을 선택합니다.

![image](https://user-images.githubusercontent.com/93580180/177948186-e052e522-7069-4072-abae-fd0e6c819ee6.png)

12. IDE 왼쪽 하단에 있는. ![image](https://user-images.githubusercontent.com/93580180/177943789-3557fde5-8805-4b03-ace8-05d2ace216c0.png) 아이콘을 클릭하여 트랜잭션을 수행할 새 키 쌍을 생성합니다. 키 쌍을 이미 생성한 경우 이 단계를 건너뛸 수 있습니다. 키 쌍 관리자에서 CREATE 버튼을 클릭하여 새 키 쌍을 생성합니다.

![image](https://user-images.githubusercontent.com/93580180/177944146-eb6e2f1e-95f0-4b00-8458-c8145b008d15.png)

13. 키 쌍의 원하는 이름을 지정하십시오(이 경우 BSC-Testnet-Key). 그런 다음 CREATE 버튼을 클릭합니다. 개인 키는 안전하게 보관하고 다른 사람과 공유하지 마십시오.

![image](https://user-images.githubusercontent.com/93580180/177944170-fa9ed3bc-53d9-41f3-8a46-a07f56fee1d7.png)

## BNB 테스트 토큰 받기
* 처음에 새로 생성된 키 쌍의 잔액은 0.0 ETH입니다. BNB 테스트 토큰을 받으려면 [BSC Testnet Tipe](https://testnet.binance.org/faucet-smart/)를 이용하면 됩니다.
* 키 쌍 관리자에서 퍼블릭 주소를 복사합니다.

![image](https://user-images.githubusercontent.com/93580180/177944290-d06f2f06-e256-4110-8936-809c0f78e0fa.png)

* 아래 그림과 같이 포셋에 붙여넣고 필요에 따라 테스트 토큰을 획득합니다. 테스트 토큰이 성공적으로 전송되면 녹색 팝업이 표시됩니다.

![image](https://user-images.githubusercontent.com/93580180/177944333-ca8aefed-fec2-4271-aa3e-d2ccc301eb6c.png)
 
*  키 쌍 관리자를 닫았다가 다시 열어 잔액이 업데이트되었는지 확인합니다. 잔액이 업데이트될 때까지 1~2분 정도 기다리세요.

## BSC 테스트넷에 스마트 컨트랙트 배포하기
1. IDE의 오른쪽 하단 모서리에 있는 Solc (0.8.4) 에서 적절한 솔리디티 컴파일러 버전을 선택합니다. 이 경우 ![image](https://user-images.githubusercontent.com/93580180/177944415-e733562a-54ad-4ed8-85a5-f17c79edfeac.png)입니다. 
2. 빌드 아이콘![image](https://user-images.githubusercontent.com/93580180/177944483-ff523eed-017d-4265-b722-78ded06fe826.png)을 클릭하여 스마트 컨트랙트를 구축합니다. 빌드에 성공하면 프로젝트 탐색 창에 빌드라는 새 폴더가 반영됩니다. 이 폴더에는 컨트랙트의 json 파일이 빌드된 컨트랙트 폴더가 포함되어 있습니다. 우리의 BSCNFT 컨트랙트에서 가져온 모든 컨트랙트도 json 파일로 옵니다.

3. 컨트랙트를 성공적으로 구축했으니 이제 배포할 수 있습니다. 스마트 컨트랙트를 배포하려면 배포 아이콘![image](https://user-images.githubusercontent.com/93580180/177944540-10d86198-03f2-40d8-8ac0-c013483c6458.png)을 클릭하십시오. 아래 그림과 같이 컨트랙트에 대한 세부 정보를 지정한 다음 Estimate & Deploy 버튼을 클릭합니다. 마법사가 자동으로 견적을 내고 컨트랙트에 대한 가스 한도를 채웁니다. 그런 다음 Deploy 버튼을 클릭합니다. 

4. 아래 그림과 같이 배포 세부 정보가 팝업됩니다.

![image](https://user-images.githubusercontent.com/93580180/177944726-41c20038-1fc5-434a-b61f-be54f36f3ac6.png)

5. 아래 그림과 같이 트랜잭션 확인 후 트랜잭션 상태가 업데이트되어 확인 가능합니다.

![image](https://user-images.githubusercontent.com/93580180/177944768-dc622464-832f-4afd-8ccd-0529c675d46d.png)

6. IDE 왼쪽 하단의 트랜잭션 아이콘을 클릭하여 이 트랜잭션을 볼 수도 있습니다.

![image](https://user-images.githubusercontent.com/93580180/177944786-8b7f3e34-e562-406b-890e-dcc22d48313f.png)

## 배포된 스마트 컨트랙트 및 Mint NFT와 상호 작용하기
1. 다른 기능을 사용하여 컨트랙트와 상호 작용할 수도 있습니다. IDE의 좌측 하단에 있는 트랜잭션 아이콘을 클릭한 다음 스마트 컨트랙트 배포 트랜잭션을 클릭합니다. 트랜잭션 내역에서 컨트랙트 주소를 클릭하면 스마트 컨트랙트와 상호 작용하는 기능에 접속할 수 있습니다. 맨 왼쪽 열에는 모든 쓰기 기능들이 있습니다. 가운데 열에는 보기 기능들이 있고, 맨 오른쪽 열에는 이벤트 세부 정보가 있습니다.

![image](https://user-images.githubusercontent.com/93580180/177948835-197860e5-8f25-4692-bc34-467a997f98a1.png)
 
## NFT 민팅하기
1. 스마트 컨트랙트에 따라 컨트랙트가 배포될 때 NFT가 발행되지 않았다면 지갑에는 표시되지 않습니다. 
2. 이전에 정의된 대로 키 쌍을 만듭니다. 이 새로운 키 쌍의 퍼블릭 주소로 NFT를 발행할 것입니다.
3. 특정 사용자에게 NFT를 발행하기 위해 배포된 스마트 계약의 "safeMint" 함수를 사용합니다. 아래 그림의 1단계와 2단계와 같이 배포된 컨트랙트로 이동한 다음 가장 왼쪽 열에서 드롭다운 메뉴를 클릭하여 배포된 계약에서 사용할 수 있는 쓰기 기능 목록을 확인합니다. "safeMint" 함수를 선택합니다. 
4. safeMint 함수를 사용하여 새 NFT를 특정 사용자 주소로 만듭니다. 위 그림에서 보는 바와 같이 3~6단계에서는 NFT의 민팅 가격으로 "보낼 ETH"를 입력합니다. 스마트 컨트랙트에 따라 민팅 가격은 5000000000000 Wei, 즉 0.05 ETH입니다. 0.06 ETH를 입력하여 트랜잭션 비용도 부담했습니다. 그런 다음 NFT를 발행(민트)할 대상 주소를 선택합니다. 받는 사람 주소의 경우 위 섹션에서 새로 생성된 키 쌍을 사용합니다. 그런 다음 트랜잭션 버튼을 클릭하여 safeMint 함수를 실행합니다. 서명자의 경우 스마트 컨트랙트를 배포하는 데 사용된 계정인지 확인하세요.

![image](https://user-images.githubusercontent.com/93580180/177949113-3de5d538-852f-4a21-aa75-47d0231b6521.png)

5. 어떤 전송이 발생했는지 확인하려면 맨 오른쪽 열에서 전송 이벤트를 실행합니다. 아래 그림과 같이 NFT 토큰 ID와 함께 NFT 전송 목록이 표시됩니다.

![image](https://user-images.githubusercontent.com/93580180/177945187-4e426ba2-a63f-4648-a259-fc9506ab5cb1.png)

6. NFT의 소유자를 확인하려면 ownerOf 함수를 사용합니다. 아래 그림과 같이 토큰 ID를 함수에 전달합니다.

![image](https://user-images.githubusercontent.com/93580180/177945228-3a984146-dfa5-4a7b-9306-6258e9990f2a.png)

## 메타마스크에서 NFT 확인하기
1. 수신하자는 NFT 토큰 세부 정보를 메타마스크 지갑으로 가져와 자산을 볼 수 있습니다. 현재 메타마스크 웹 익스텐션은 NFT 사용을 지원하지 않지만 모바일 앱 버전은 지원합니다. 메타마스크 지갑에 있는 소유 NFT를 보기 위한 다음 단계는 메타마스크 모바일 애플리케이션을 사용하는 것입니다.
2. Black IDE에서 키 쌍 관리자를 열고 발행한 키 쌍의 개인 키를 복사합니다(예: NFT 전송).

![image](https://user-images.githubusercontent.com/93580180/177945281-060b95ce-2912-49a2-aa5d-bbf848ba9688.png)

3. 메타마스크 지갑 모바일 앱에서 이 키 쌍을 사용하여 계정을 가져옵니다. 이전 단계에서 복사한 개인 키를 입력하고 가져오기를 클릭합니다.

![image](https://user-images.githubusercontent.com/93580180/177954799-b86dae87-5274-4408-9d0b-5b52682549d1.png)

4. 계정을 가져온 후 BSC 테스트넷 구성을 지갑에 추가합니다. NFT를 발급한 퍼블릭 주소가 속한 동일한 계정을 사용하고 있는지 확인하십시오.

![image](https://user-images.githubusercontent.com/93580180/177950571-4674930b-c8c6-4480-8808-ea587af2bb2d.png)

5. 계정이 BSC 테스트넷에 연결되어 있는지 확인합니다. 또한 계정에 충분한 BNB 테스트 토큰이 있는지 확인하십시오. 그렇지 않은 경우 BSC 테스트넷 포셋을 사용하여 앞서 언급한 대로 일부를 획득할 수 있습니다.

![image](https://user-images.githubusercontent.com/93580180/177945438-84033dff-6d51-4fe6-875b-3b12bfe815c1.png)
 
6. 메타마스크 모바일 월렛 소유 NFT 자산을 보려면 NFT 탭을 클릭한 다음 토큰 가져오기를 클릭합니다. NFT 세부 정보를 입력합니다. 주소 필드에서 배포된 컨트랙트의 주소를 전달하고 ID 필드에 토큰 ID를 전달합니다. 그런 다음 Import 버튼을 클릭합니다.

![image](https://user-images.githubusercontent.com/93580180/177949365-52efd22c-25ac-4eac-b47e-82349d6b0a5c.png)

## 결론
이 튜토리얼에서는 Obsidian Labs의 Black IDE를 사용하여 BSC 테스트넷에서 NFT를 발행 및 전송하는 방법에 대한 단계별 가이드를 제공했습니다. 이 튜토리얼에 사용되는 기술 스택에는 솔리디티, 트러플, 메타마스크 및 Black IDE가 포함됩니다. BSC에서 개발하는 방법에 대한 자세한 튜토리얼은 [GitHub](https://github.com/bnb-chain/bnb-chain-tutorial)을 참고하세요. 질문이 있거나 막히는 부분이 생기면 [Discord Channel](https://discord.com/channels/789402563035660308/912296662834241597)로 문의하세요.

