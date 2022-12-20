---
sidebar_label: ChainIDE 사용하기
hide_table_of_contents: false
sidebar_position: 2
---

# ChainIDE 사용하기

## 개요
[ChainIDE](https://chainide.com/)은 틸중앙화 앱 개발을 위해 체인에 상관없이 동작하는, 클라우드 기반 IDE입니다. 사용자의 시간과 노력을 절약하는 사전 구성된 플러그인을 통해 개발 주기를 개선합니다. 다음은 간단한 스마트 컨트랙트 작성 및 BNB 스마트 체인 배포에 대한 초보자용 가이드입니다. 궁금한 점이 있으면 언제든지 [ChainIDE 디스코드](https://discord.gg/QpGq4hjWrh)에서 질문해주세요.

## 요구사항

1.  ChainIDE
2.  Web3 월렛
3.  Solidity

## 하게 될 일

다음은 스토리지 스마트 컨트랙트를 배포하기 위한 일반적인 단계입니다.

1. 월렛을 설정하세요
2. 스토리지 스마트 컨트랙트를 적습니다.
3. 스토리지 스마트 컨트랙트를 작성합니다.
4. 스토리지 스마트 컨트랙트를 배포합니다.
5. 플랫트너(Flattener) 라이브러리를 사용하여 플랫튼드(Flattened) 파일을 만듭니다.
6. 스토리지 스마트 컨트랙트를 확인합니다.
7. 컨트랙트 상호 작용

## 월렛 설정하기

### 바이낸스 지갑/메타마스크 설치하기
블록체인에 스마트 컨트랙트를 배포하거나 배포된 스마트 컨트랙트로 거래할 때 가스비를 내야 하며, 이를 위해서는 바이낸스 월렛이나 메타마스크가 가능한 암호화폐 월렛을 사용해야 합니다. 바이낸스 월렛을 이용하려면 [here](https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp)을 클릭하여 다운로드 받고, 메타마스크 월렛을 계속 이용하려면 [here](https://metamask.io/)을 클릭하여 메타마스크를 설치하시면 됩니다.

### 메타마스크에 BNB 스마트 체인 테스트 네트워크를 추가하기
[ChainIDE](https://chainide.com/)를 방문하여 프로젝트를 만들고 오른쪽 상단에 있는 "unconnected button"을 클릭하고 "Injected Web3 Provider" 버튼을 선택한 다음 "MetaMask"를 클릭하여 메타마스크 지갑에 연결합니다("BNB Chain Mainnet"은 메인 네트워크, "BNB Chain Testnet"은 테스트 네트워크입니다. "BNB Chain Testnet"를 클릭하면 메타마스크 월렛에 추가됩니다.
![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/Untitled+design+(19).png)

### 바이낸스에서 BNB 스마트 체인 테스트 네트워크 활성화하기
바이낸스 월렛을 계속 사용하고 싶다면 바이낸스 월렛을 설치하고 바이낸스 월렛을 설치한 후 "Show Test Networks"를 활성화하고 'BNB 스마트 체인 테스트 네트워크'로 전환해야 합니다. 

<img src=" https://chainide-doc.s3.amazonaws.com/Using+Chain입니다.IDE+BNB+스마트+체인/16.png" alt="img" style="50%" />

### 테스트 BNB 토큰 받기

메타마스크에 BNB 스마트 체인 테스트 네트워크가 추가되었으면 [BNB 스마트 체인 포셋](https://testnet.binance.org/faucet-smart)으로 이동하여 테스트 토큰을 받으십시오. 스마트 컨트랙트를 배포하고 상호 작용하기 위해 가스비를 지불하려면 토큰이 필요합니다. 포셋 페이지에서 메타마스크 지갑 주소를 붙여넣습니다. 그런 다음 "submit"을 클릭하면 포셋에서 테스트 BNB가 전송됩니다.
![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/BNB_Smart_Chain_Faucet.png)

## 스토리지 스마트 컨트랙트 작성하기

스토리지 스마트 컨트랙트에서 구현하려는 모든 필수 함수를 기록해야 합니다. 일반 스토리지 스마트 컨트랙트에는 다음과 같은 기능이 있습니다.

-   `Store()`: 변수에 값 저장
-   `retrieve()`: 저장된 값 반환

ChainIDE 팀은 필요한 모든 함수를 포함하는 간단한 스토리지 스마트 계약을 준비했습니다. 이 빌트인 템플릿을 사용하고 필요에 따라 기능을 추가/삭제할 수 있습니다.

 [ChainIDE site](https://chainide.com/)에서 "Try Now"를 클릭하세요.

![](https://3869740696-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MYy-lqJKjq1m0yBAX4r%2Fuploads%2Fnpdf7fg51675wYmFcL6b%2Fimage.png?alt=media&token=353fc876-a319-49cb-92d5-1ed23c39aa90)

그런 다음 "New Project"를 클릭하고 "BNB Chain"과 "Storage"를 선택합니다.

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/3_.png)

이제 필요한 모든 함수를 포함한 템플릿 컨트랙트인 **Storage.sol**를 볼 수 있습니다.
## 스토리지 스마트 컨트랙트를 컴파일하기

스마트 컨트랙트를 완료했으면 이제 컨트랙트를 컴파일할 때입니다. 컴파일하려면 "Compile" 모듈로 이동하고 소스 코드에 따라 적절한 컴파일러 버전을 선택한 후 "Compile" 버튼을 누르세요. 성공적으로 컴파일되면 소스 코드의 ABI 및 바이트 코드가 생성됩니다. 소스 코드에 오류가 있으면 "Logger module"의 출력 패널 아래에 표시됩니다. 오류를 주의 깊게 읽고 그에 따라 해결한 후 계약을 다시 작성해야 할 수도 있습니다.

BNB 스마트 체인 테스트 네트워크에서 스마트 컨트랙트를 확인할 때 필요한 컴파일러 버전과 소스 코드의 라이센스를 잘 기억해두세요.


![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/4.png)

## 스토리지 스마트 컨트랙트 배포하기

성공적으로 컴파일된 후에는 컴파일된 스토리지 스마트 계약을 BNB 스마트 체인 테스트 네트워크에 배포할 때입니다. 그러기 위해서는 메타마스크가 설치되어 있어야 하고, 지갑에 BNB 스마트 체인 테스트 네트워크가 추가되어야 하며, 거래 수수료를 지불하기 위해 일부 테스트넷 토큰이 필요합니다.

"Deploy & Interaction" 모듈로 이동하여 컴파일된 스마트 컨트랙트 중 배포할 스마트 컨트랙트를 선택하고 "Deploy" 버튼을 클릭합니다. 이 튜토리얼에서는 `Storage` 스마트 컨트랙트가 배포됩니다.

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/5.png)

## 플래트너 라이브러리를 사용하여 플랫 파일 생성하기

다른 스마트 컨트랙트를 가져오는 스마트 컨트랙트를 검증하려면 가져온 컨트랙트의 모든 소스 코드를 포함하는 플랫 파일을 만들어야 합니다. 플랫 파일을 만들려면 "Flattener" 플러그인을 추가해야 합니다.

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/7.png)

Flattner 플러그인이 활성화되면 아래 그림과 같이 별도의 모듈로 플러그인에 액세스할 수 있습니다. 컴파일된 파일을 선택하고 flatten 버튼을 클릭하여 플랫 파일을 만듭니다. 플랫 파일이 만들어지면 클립보드에 자동으로 복사되므로 파일에 붙여넣기하여 저장한 뒤 나중에 사용할 수 있습니다.

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/8.png)

저장 버튼을 클릭하면 플랫 파일이 현재 리포지토리에 저장됩니다.

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/9.png)

저장된 플랫 파일은 탐색기 모듈에서 액세스할 수 있습니다.

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/10.png)

## 스마트 컨트랙트 확인하기

스마트 컨트랙트를 확인하려면 [BNB 스마트 체인 익스플로러](https://bscscan.com/)를 방문하여 컨트랙트 주소를 사용하여 배포된 스마트 컨트랙트를 검색해야 합니다.

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/10.png)

컨트랙트 섹션 아래에 표시된 "verify and publish" 링크를 클릭합니다.

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/11.png)

"verify and publish" 링크를 클릭하면 다음 메시지가 표시됩니다.

-   계약 주소(Contract Address): 확인하려는 배포된 스마트 계약의 주소입니다.
-   컴파일러 유형(Compiler Type): 단일 파일을 확인하거나 여러 파일을 확인하려고 합니다.
-   컴파일러 버전(Compiler Version): 스마트 계약을 컴파일하는 데 사용한 컴파일러 버전입니다.
-   라이센스(License): 소스 코드에 사용한 오픈 소스 라이센스 유형입니다.

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/12.png)

그런 다음 5단계에서 만든 플랫 파일을 붙여넣어야 스마트 컨트랙트가 검증됩니다.

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/13.png)

스마트 컨트랙트에 문제가 없으면 확인되며 아래 그림과 유사한 이미지를 볼 수 있습니다.

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/14.png)

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/15.png)
축하합니다. 스마트 계약을 블록체인에 성공적으로 배포하고 검증했습니다. 이제 배포된 스마트 컨트랙트를 사용해 볼 시간입니다.

## 컨트랙트 사용
배포 및 검증에 성공한 후, 배포된 스마트 컨트랙트의 모든 함수는 "INTERACT" 패널에서 볼 수 있습니다. 우리의 시나리오에서는 블록체인에 토큰을 저장하는 데 사용되는 `Store()` 그리고 블록체인의 저장된 데이터를 반환하는 `Retrieve()`라는 두 가지 함수가 있습니다.

![](https://chainide-doc.s3.amazonaws.com/Using+ChainIDE+BNB+Smart+Chain/6.png) 
