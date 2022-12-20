---
sidebar_label: BscScan에서 컨트랙트 확인하기
hide_table_of_contents: false
sidebar_position: 2
---

# BscScan에서 컨트랙트 확인하기

**Step 1:** BNB 스마트 체인에 컨트랙트를 배포합니다

**Step 2:** [BSC 익스플로러](https://bscscan.com/) 또는 [테스트넷 익스플로러](https://testnet.bscscan.com/)에 들어갑니다.

"Verify and Publish"를 클릭합니다.

![img](https://lh3.googleusercontent.com/SHt9Cf6Nw2lvVK2rVkiOkpwlM876wW4ZwzEg34DWOgjkeXrRgBuMxnTOjLcEYimPBmKAfC860nu6iM3pfrUKif7lZdp3e_fUwNWtzSuVlOwlVrwJP9K-npvvKGclWFIZsUcrzvsu)

**Step 3:** 컨트랙트 정보를 입력합니다.


![img](https://lh4.googleusercontent.com/XnMmBoBQQMcPNogOjRG4ebUkWf5R0rztarXd7DmgKgw2wi82s4OX_pG6kxVMNHblM1zxI04aL78LZiYCeDWOqKBjeQVuy2RYVlBOTSF8LqcPSZWrVhbcWus4lhVPzQyXgwluN535)


* 컨트랙트 주소
* Remix나 다른 컴파일러에서 선택한 컴파일러 타입
* 오픈소스 라이선스 타입 선택

**Step 4:**  솔리디티 컨트랙트 코드 입력하기


![img](https://lh4.googleusercontent.com/vzkUcj-_WH3_XN8FH81lQ7Ha_2_xPZAP-VT0pM_KzWUA9tRKhG9Ha-gaeZeSCClHUWE4CTv9wslSFtbAaJVVwfDWIjgXyF50ZxCbVEjsZ9yLYavB-5BuyGmd1t1LR875rIQj7sCu)

최적화가 활성화되어 있다면 Optimization에 "Yes"를 선택합니다.

Contructor argument는 선택 사항입니다. 이것이 컨트랙트에 있다면, [이 페이지](https://abi.hashex.org/#)로 가서 인코딩된 ABI json을 생성하세요.

!!! 정보

	기본 BEP20 컨트랙트 템플릿은 constructor 메서드를 가지고 있지 않습니다.


"Verify and Publish"를 클릭하여 이 프로세스를 종료합니다. 이제 모든 준비가 완료되었습니다!