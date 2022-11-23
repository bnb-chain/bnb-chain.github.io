---
sidebar_label: Issue BEP20 Tokens
sidebar_position: 2
---

# BEP20 토큰 발행하기

## **BEP20 컨트랙트 컴파일 및 배포하기**

1. Remix IDE 열기: [https://remix.ethereum.org](https://remix.ethereum.org/)

![img](https://lh6.googleusercontent.com/zwki3hgBILOzXHtayDLvNCrmOXv6LTUQAIG02lRkOtzOtNJsUbIBXB7LUoN6RF8PbvkUGcRuLCA36I_RdqJCQVrfeZpwfbpfwlN7R0s3fJGMSTdMT8y56ngL3qCocUPW65UJ2bQZ)

2. Solidity 선택하기

![img](https://lh3.googleusercontent.com/aLlINgoy2Luj45ZKVxPTExUS4I2QoX3WHzmLbO7_CJHQiL3plGvx0iCaI2YTGE8QmnhytN-HDOPvhGixQ7utrA_o9UJJVaujmQ5yj7ET8ju12Jh0luVtZHgpLGmOx9LUoFnzu2Eg)

3. 새 컨트랙트 BEP20Token.sol 생성 후 [여기](BEP20Token.template)에서 BEP20 토큰 템플릿의 컨트랙트 코드 복사하기


4. “name”, “symbol”, “decimals”, “totalSupply” 값을 설정하기

![img](https://lh4.googleusercontent.com/hgxDh_hXCFKwwlkAYG6h9qfxvzyeeD3k-t3tNBD-VSvwTtM4AnaFylZ6SjSmfTKCuIqhs66Z9vi7mRplIfN5ER7n1yMz0EKpO_RDOcTQTrsh5R1DC0doVC7FT05Hu2bboM2o57Qg)

5. BEP20 토큰 컨트랙트 컴파일하기

    a. 1 단계: 컴파일 페이지로 변경 위해 버튼 클릭

    b. 2 단계: “BEP20Token” 컨트랙트 선택

    c. 3 단계: “Auto compile”과 “optimization” 활성화

    d. 4 단계: “ABI”를 클릭하여 컨트랙트 ABI 복사 및 저장

![img](https://lh6.googleusercontent.com/qY_5g3ZMnJca6n84W2JxIoBvd8iHRQ0qkOQuJ60pRIcKvgZB5-bXcGq6gS7dFwA5rYXbiS2NyaUQ1Qptcagqa0pb7kmq_S-Dh8drA4R-hDg9_NVp1zPl-tmqIDanlcgLibaR3CV7)

6. BSC에 컨트랙트 배포하기

    a. 1 단계: 컴파일 버튼으로 변경을 위해 버튼 클릭

    b. 2 단계: “Injected Web3” 선택

    c. 3 단계: “BEP20Token” 선택

    d. 4 단계: “Deploy” 클릭하면 메타마스크가 나타남

![img](https://lh5.googleusercontent.com/lsWXpUN12iRTzMSJZpb8HFBL2ycH7JVPlrMqlK7aLOl4zLanqlp-3UHbranHk__tugeqWfnjg1k_2_0VnZlzJkJucJw3R-JDoxP84rAPWOJc1Oi5dgJZA3wRzyjwxKiy_6BdcBMb)

    e. "confirm" 클릭하여 트랜잭션에 서명 후 BSC에 전파

![img](https://lh4.googleusercontent.com/9awuDudNSuUOZDQAlW5FPZ5SbRkWsKPlJSYWGUL7R4raJ5o2mprRP7jt87hP_wbuYeoJy75ErwDcKVC7_spf8YkumCkwOP4Eak9SfcV6dZvyVhy84JqKfVUvmEeLw5mWEZ3-aCED)
