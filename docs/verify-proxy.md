---
sidebar_label: 프록시 컨트랙트 검증하기
hide_table_of_contents: false
sidebar_position: 2
---
# 프록시 컨트랙트 검증하기
이 섹션에서는 배포된 BEP20 프록시 컨트랙트를 검증하는 방법을 알아보겠습니다.

## 컨트랙트 flatten하기

### flattener 설치하기
```
npm install truffle-flattener -g
```
다음 명령어를 실행하세요:
```
$ truffle-flattener BEP20TokenImplementation.sol > BEP20TokenImplementationFlattened.sol
$ truffle-flattener BEP20UpgradeableProxy.sol > BEP20UpgradeableProxyFlattened.sol"
```
## Remix를 사용하여 컨트랙트를 컴파일하고 배포하세요

### 구현 컨트랙트 컴파일하기

- Remix IDE를 엽니다: [https://remix.ethereum.org](https://remix.ethereum.org/)
- 솔리디티 언어를 선택합니다.
- 새로운 `BEP20Token.sol` 컨트랙트를 열고 flatten된 `BEP20TokenImplementationFlattened.sol`에서 컨트랙트 코드를 복사합니다.
- 구현 컨트랙트를 컴파일합니다.
- 이 버튼을 클릭하여 컴파일 페이지로 이동합니다.
  - “BEP20TokenImplementation” 컨트랙트를 선택합니다.
  - “Auto compile”과 “optimization”을 활성화합니다.
  - “ABI”를 클릭하여 컨트랙트 abi를 복사하고 저장합니다.
### 구현 컨트랙트 배포하기
- “Injected Web3”를 선택합니다.
- “BEP20TokenImplementation” 컨트랙트를 선택합니다.
- “Deploy”를 클릭하면 메타마스크가 나타납니다.
- “Confirm”을 클릭하여 서명하고, BSC에 트랜잭션을 전파합니다.
- 그리고 토큰을 초기화합니다: 모든 파라미터를 채워넣고 “transact”를 클릭합니다.

<img src="https://lh3.googleusercontent.com/SjMHLYY9A1LtFXJFc2gtIOL_lEzZk--eiJyNspL-8qfDvkfNYGAgGKvodCo0-Pfp3UhmrPGUc4oOpFFuDBzYhLxqN3-LIAW7BRKdeoiPdYuJMep0hT67ifNw0i33DzVXNfzPjwZi"alt="img" style={{zoom:"50%"}}/>

> 참고: `Owner`는 이전에 배포 트랜잭션을 보낸 주소여야 합니다.

- “Copy”를 클릭하여 다음과 같이 초기화 데이터를 저장합니다:


```
0xef3ebcb800000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000f42400000000000000000000000000000000000000000000000000000000000000001000000000000000000000000fc41d5571120442d1bb82cea0884966e543cb78b000000000000000000000000000000000000000000000000000000000000000548656c6c6f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000548454c4c4f000000000000000000000000000000000000000000000000000000
```

- 메타마스크에서 트랜잭션을 확인합니다.


<img src="https://lh5.googleusercontent.com/kPAo0FyEgt0vNDkBMxIHNIFqdq0mP4BhFT21vXvusa8-wlP-BXr4FcHjYV-NZEuQZrgwq74fV2oXAKIrAovpXi7KHChXtowSI3sbu5wTQL-_3-x8Qd-6-z7xRDkRXzJZLcakxrR3" alt="img" style={{zoom:"40%"}}/>

## 프록시 컨트랙트 컴파일하기

- 새로운 컨트랙트 proxy.sol를 생성하고 flatten된 `BEP20UpgradeableProxyFlattened.sol`에서 컨트랙트 코드를 복사합니다. 여기 [예시](https://bscscan.com/address/0xA6Ec2Fe4F6040b188A926048f44c9A59Fca189d4#code)를 참고하세요.
- 구현 컨트랙트를 컴파일합니다.
- 이 버튼을 클릭하여 컴파일 페이지로 이동합니다.
  - “BEP20UpgradeableProxy” 컨트랙트를 선택합니다.
  - “Auto compile”과 “optimization”을 활성화합니다.
  - “ABI”를 클릭하여 컨트랙트 abi를 복사하고 저장합니다.

### 프록시 컨트랙트 배포하기

- “Injected Web3”를 선택합니다.
- “BEP20UpgradeableProxy.sol” 컨트랙트를 선택합니다.
- 파라미터를 입력합니다.

<img src="https://lh3.googleusercontent.com/bdTP2V-Fco3HogiRVO-2FTlGwzXGsgiOa2VcCUdkr1LCD2kuRbHbz0u7eM7xmLhYiJAToG9IKL-R3heI2i_TPf2dQoFE215s9w-b8D6PLjYPAktKoLRRDozV8aOpQvfYGJgEYtJM" alt="img" style={{zoom:"50%"}}/>

**Logic**: `BEP20Implementation` 컨트랙트의 주소

**Admin**: 관리자는 BEP20 토큰 소유자가 될 수 없습니다

**Data**: 이전에 저장한 초기화 데이터를 사용하세요

- “Deploy” 버튼을 클릭하면 메타마스크 창이 나타납니다.
- “Confirm” 버튼을 클릭하여 트랜잭션에 서명하고 BSC에 전파합니다.

## BscScan에서 프록시 컨트랙트 확인하기
주의: BEP20TokenImplementation 컨트랙트를 검증하는 방법은 이전과 같습니다.

- 컨트랙트 페이지로 이동하여 “Verify and Publish”를 클릭하세요.

<img src="https://lh5.googleusercontent.com/RvHXgGR_7rvaNXNgBCB5JnHQE90ziGcr1kmy4NDxJfWxTJTZz3bkZuHtGRrpXY-Qb_7_5FLzzD1vwBo3cER_6Qfbvd7g3CmHE8l16cemD-92jZYhQX6XUUZRvvzFwr61f9jUuIuC" alt="img" style={{zoom:"50%"}}/>

- Single file을 선택하세요.

<img src="https://lh4.googleusercontent.com/PWp8_JMP9S4pXB08e3Rs2lta4Xn4ZOCoBkAmgsyr4tE0kv_KtlvA1TjLOwrBYG7ON1Z51CZh7NuFzD9IlOYZIRg6B5OZx0Z6yiyrlu2VjkvmjgqPV6BOsF4hWqzeKC8_g8PeTTZ_" alt="img" style={{zoom:"50%"}}/>


- 아래의 컨트랙트 코드를 복사하여 “Optimization”이 활성화된 것을 확인해주세요.
- Contractor Data: 올바른 constructor 데이터는 이 사이트에서 받을 수 있습니다: https://abi.hashex.org/#

첫 째로, “BEP20UpgradeableProxy.sol” 컨트랙트의 ABI json을 복사합니다. 그리고 “Parse”를 클릭합니다.

<img src="https://lh4.googleusercontent.com/Z1Ky-aHOBVvi5qDVNv4q-kOiK_v4uLzMpct08hQ-RcGbGgyb3HdOXMPMF9a-eNw5MybIjM222lZRrtV7Bn_cxntDIw9ivZ90dpsIeB44cpu6F9S9ena8BufByPN1Yvc508gnSZQ4" alt="img" style={{zoom:"40%"}}/>

이 세 파라미터를 전부 추가합니다. 그리고 결과를 복사/붙여넣기합니다.

이제 됐습니다! 프록시 컨트랙트를 확인했습니다.

 <img src="https://lh4.googleusercontent.com/MgaUVOq6GdeA374T6DYsRPbphwSG4WNsfm-fJunGif4sFU4ILDQN_XcJ6O-qh8I6SuILbu2O9oriSQii6RcCYQY09_T1qoNvK6JxFkydM9u9zDWMUrybam1Zu_YiFAoa-3T867ea" alt="img" style={{zoom:"50%"}}/>

## 두 컨트랙트 연결하기
- “More Options”를 클릭하고 “is this a proxy”를 선택하세요.

<img src="https://lh3.googleusercontent.com/2_dq4WNMba2_RWJzLSRehjDjMWx8SgcUkU5d88lNzllt6QViM1uEW49e-H0nUbhjIc9iFCsXx3iavTsUFahjTR4Gocdf_jw_IhK_QvETb-G9CFgCb1LIlZvsGor37g8dKVxDnj7I" alt="img" style={{zoom:"50%"}}/>

- 프록시 주소를 확인하세요.

<img src="https://camo.githubusercontent.com/836725ceebb9698ebd3ce738e2ea4301de8fedd4a2e437d2d0c5734eb922de51/68747470733a2f2f6c68352e676f6f676c6575736572636f6e74656e742e636f6d2f477539345878614741614b677158357278586d417572506c446f4a52315577734a7330365a413357636b5a70334a4a4e6b4a67384670576b4d573265424470634f77746c597a6550615453547a45414b6a4b654d32364f744f614f6d7353694a2d76376d67346f532d71686f4d76625838706b626b725631444a31554e6e4d4237596d6a494c4a33" alt="img" style={{zoom:"50%"}}/>

- 구현 주소를 확인하세요.

<img src="https://camo.githubusercontent.com/832b0418bb3a4e670ec02f61d857fb23646bc3f84893dd8631e9469b44415ce7/68747470733a2f2f6c68352e676f6f676c6575736572636f6e74656e742e636f6d2f554f6a425971756161366b315a745f57786e7356526e6c696b4d5462654654786979796d655254302d58724e774372506a6e49764266494e75456d5f55762d764f6c3763684f664b7573386e694e7168765832315362697077554f5a386c54583647334a413447506d523354435167744c6e493941303072736875496a6633516f71624b4d466145"alt="img" style={{zoom:"50%"}}/>

컨트랙트 페이지로 돌아가면 “Read as Proxy”와 “Write as Proxy” 두 개의 버튼이 추가된 것을 볼 수 있습니다.

<img src="https://lh6.googleusercontent.com/xcVqGgOZ2mySt25Z7emHzwNmquYy4cyFSuQh-F7mJYG7rWfit4QWyxjBFl8V7Hc7_y3FepNRMLR7htZ-OiLqHfnvtwamep7exo2pocrNPMX5iyfZNlp5qVcDuPcwB8_VsisVG9dY"alt="img" style={{zoom:"50%"}}/>