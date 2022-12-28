---
sidebar_label: 키 관리
hide_table_of_contents: false
sidebar_position: 2
---
# 키 관리

이 아티클은 BNB 스마트 체인에 있는 여러분의 dApp 클라이언트 측의 키 관리 전략에 대한 가이드를 제공합니다.

## Web3 셋업

`web3.js`은 클라이언트 사이드 앱이 블록체인과 소통할 수 있도록 해주는 자바스크립트 라이브러리입니다. 메타마스크와 소통할 수 있도록 web3를 설정합니다.

`web3.js` 문서는 [여기](https://web3js.readthedocs.io/en/v1.2.2/getting-started.html#adding-web3-js)에서 볼 수 있습니다.

## BSC 네트워크에 연결하기

```javascript
    // mainnet 
     const web3 = new Web3('https://bsc-dataseed1.binance.org:443');
    // testnet
	const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
```

## 계정 설정하기
web3의 설치와 인스턴스화가 성공적이면 다음과 같이 임의의 계정이 반환됩니다.
```javascript
    const account = web3.eth.accounts.create();
```

## 계정 복구하기

만약 여러분 계정의 개인키 백업이 있다면, 계정을 복구하는 데 사용할 수 있습니다.
```javascript
	const account = web3.eth.accounts.privateKeyToAccount("$private-key")
```

## 전체 예시
```javascript
const Web3 = require('web3');
async function main() {

	const web3 = new Web3('https://bsc-dataseed1.binance.org:443');
    const loader = setupLoader({ provider: web3 }).web3;

    const account = web3.eth.accounts.create();
    console.log(account);
}
```