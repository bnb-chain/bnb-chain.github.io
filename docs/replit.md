---
sidebar_label: Replit 사용하기
hide_table_of_content: false
sidebar_position: 2
---
 
# Replit IDE를 사용하여 BSC에 스마트 컨트랙트 배포하기
 
[Replit](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide)은 코드를 작성하고 앱을 호스팅하게 해주는 코딩 플랫폼입니다. Replit은 [Solidity](https://replit.com/@replit/Solidity-starter-beta?v=1)를 지원하며 web3 개발자들이 스마트 컨트랙트를 생성하고 배포하는 데 필요한 모든 기능들을 제공합니다.
 
이 튜토리얼에서는 [Replit IDE](https://replit.com/signup)와 [Replit Solidity Template (Solidity starter beta)](https://replit.com/@replit/Solidity-starter-beta?v=1)를 사용하여 스마트 컨트랙트를 작성하고 BSC 테스트넷에 배포하는 법에 대해 설명하겠습니다.
 
::: 참고
Replit과 솔리디티에 대한 추가적 설명은 <ins>**[Get started with Replit!](https://blog.replit.com/solidity)**</ins> 또는 <ins>**[Replit Solidity documentation and Escrow contract tutorial](https://docs.replit.com/tutorials/33-escrow-contract-with-solidity)**</ins>에서 확인해보세요.
:::
 
## 요구사항
 
Replit을 이용해 BSC에 스마트 컨트랙트를 배포하는 데 있어서 로컬 환경설정을 할 필요가 없습니다.
 
오직 필요한 것은 BSC 테스트넷과 배포된 컨트랙트 사용을 위한 메타마스크와 같은 브라우저 기반 web3 월렛입니다. 이미 메타마스크를 사용중이라면, Replit을 테스트하는 목적으로 새 계정을 만드는 것을 권장합니다. 메타마스크 우측 상단의 버튼을 클릭하여 Account 메뉴에서 계정을 생성할 수 있습니다.
 
BSC에서 스마트 컨트랙트를 배포하기 위해서는 아래의 요구사항들을 셋업해야 합니다:
 
1. [Replit 계정 생성](https://replit.com/signup)
2. [메타마스크 월렛 다운로드하기](https://metamask.io/)
3. [메타마스크에서 BNB 스마트 체인 테스트넷 설정하기](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain)
4. [BNB 테스트넷 토큰 받기](https://testnet.binance.org/faucet-smart)
 
## Repl 사용하기
 
생성되는 모든 [Repl](https://docs.replit.com/getting-started/using-replit-free#repls)은 완전하게 기능하는 개발 및 프로덕션 환경입니다. 아래의 단계들을 따라 솔리디티 스타터 Repl을 생성할 수 있습니다:
 
1. [로그인](https://replit.com/login)을 하거나 [계정을 생성](https://replit.com/signup)합니다. [Replit 계정](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide)을 생성한 뒤, 홈 스크린에는 계정을 보고, 프로젝트를 생성하고, 계정을 관리할 수 있는 대시보드가 포함될 것입니다.
2. 로그인하고 나면 솔리디티 스타터 repl이 나타날 것입니다. 좌측 패널에서 **+ Create Repl**을 클릭하거나 화면 우측 상단의 **+** 를 클릭하세요.
3. [**Solidity starter (beta)**](https://replit.com/@replit/Solidity-starter-beta?v=1) 템플릿을 선택하고 프로젝트 제목을 지정하세요.
4. 프로젝트 생성을 위해 **+ Create Repl**을 클릭하세요.
 
> **참고**
솔리디티 스타터 repl은 스마트 컨트랙트 배포 및 사용을 가능하게 해주는 <ins>**[Web3 Ethereum JavaScript API](https://web3js.readthedocs.io/en/v1.5.2/)**</ins>를 사용하여 개발되었고, 친절한 인터페이스를 가지고 있습니다. 이 튜토리얼에서는 BNB 스마트 체인 테스트넷에 컨트랙트를 배포해보겠습니다.

## 스마트 컨트랙트 생성하기
contract.sol 파일의 내용을 제거하고 아래의 솔리디티 코드를 파일에 작성해 주세요.

![image](https://user-images.githubusercontent.com/93580180/189648710-7185193d-b705-4453-99f6-51cfa103499e.png)

## BSC에 배포하기
 
앞서 소개된 요구사항 목록을 다 갖췄음을 확인하세요. 그러면 스마트 컨트랙트를 배포하고 사용해 볼 준비가 되었습니다.
 
1. 상단의 **Run**을 클릭하여 필요한 모든 패키지를 설치하고 컨트랙트 배포 UI를 시작하세요.
2. ![image](https://user-images.githubusercontent.com/93580180/189651036-d5c68e4d-9154-4f36-a9b1-09ddb75bf64c.png) 아이콘을 클릭하여 새 브라우저 탭에 배포를 위한 웹 인터페이스를 여세요.
3. 메타마스크 월렛을 웹 인터페이스에 연결하여 [BSC 테스트넷](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain)으로 변경하세요.
4. **Connect wallet**을 클릭하고, 계정을 선택하고 Connect를 클릭하세요.

![image](https://user-images.githubusercontent.com/93580180/189649199-320b56ef-8cf8-44f7-a90d-d4a640c4521f.png)

![image](https://user-images.githubusercontent.com/93580180/189649134-41518f50-054f-4d5d-9b37-9af57bd16526.png)

5. 드랍다운 리스트에서 배포하고자 하는 컨트랙트를 선택하세요. **Deploy**를 클릭하세요.

![image](https://user-images.githubusercontent.com/93580180/189649368-75a8e91d-3225-48f9-81f4-3bc1c2f5a7a5.png)

6. 메타마스크 알림에서 컨트랙트 배포를 위한 트랜잭션을 승인해주세요.

![image](https://user-images.githubusercontent.com/93580180/189649422-4677b218-4292-43dd-8c7f-c9c14d6604fe.png)

7. 배포된 컨트랙트의 주소를 복사하세요.

![image](https://user-images.githubusercontent.com/93580180/189649474-8ba1660f-ee56-4284-bdf7-e216161409f5.png)

8. [BscScan 테스트넷 익스플로러](https://testnet.bscscan.com/)에서 주소를 사용해 배포된 컨트랙트를 확인하세요.
 
![image](https://user-images.githubusercontent.com/93580180/189649528-73701873-9a32-41cc-9276-fe1daafe809d.png)

컨트랙트가 배포되면 드롭다운 상자 아래에 확장 가능한 상자로 표시됩니다. 확장하여 사용 가능한 모든 함수들을 살펴보세요. 이제 제공된 사용자 인터페이스를 사용하거나 인터페이스에 표시된 공유 가능한 URL을 사용하여 컨트랙트를 사용할 수 있습니다.

![image](https://user-images.githubusercontent.com/93580180/189649592-5ce05a4f-1961-41f3-9a97-e0b11f54a470.png)

## Replit에 게시하기
 
Replit을 사용하면 프로젝트를 개인 프로필에 게시할 수 있습니다. 게시 후에는 다른 사용자가 탐색, 사용, 클론 및 협업을 할 수 있도록 프로젝트가 스포트라이트 페이지에 표시됩니다.
 
[Replit에 게시하기](https://docs.replit.com/hosting/sharing-your-repl#publish-your-repl).
 
## 결론
이 튜토리얼에서는 Replit IDE를 사용하여 스마트 컨트랙트를 만들고 배포하는 기본 사항들을 안내했습니다. 또한 배포된 컨트랙트를 온라인으로 사용하고 Replit 프로젝트를 게시하는 방법에 대한 단계도 제공했습니다. 이 튜토리얼은 테스트넷을 사용하지만, 메인넷에서도 동일한 명령어와 순서가 작동합니다.
