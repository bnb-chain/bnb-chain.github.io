---
sidebar_label: Introduction
sidebar_position: 2
---

# BEP20 토큰 개요
BEP20 토큰은 [IBEP20.sol](IBEP20.sol)에서 `IBEP20` 인터페이스를 구현해야 합니다. 이 것은 템플릿 컨트랙트 [BEP20Token.template](BEP20Token.template)입니다. `_name`, `_symbol`, `_decimals`, `_totalSupply` 만 채워넣으면 됩니다:
```
  constructor() public {
    _name = {{TOKEN_NAME}};
    _symbol = {{TOKEN_SYMBOL}};
    _decimals = {{DECIMALS}};
    _totalSupply = {{TOTAL_SUPPLY}};
    _balances[msg.sender] = _totalSupply;

    emit Transfer(address(0), msg.sender, _totalSupply);
  }
```

그리고 [Remix IDE](https://remix.ethereum.org)나 [메타마스크](wallet/metamask.md)를 사용하여 BEP20 컨트랙트를 컴파일하고 BSC에 배포할 수 있습니다.

## [Web3](https://www.npmjs.com/package/web3)와 NodeJS로 컨트랙트 이용하기

### BNB 스마트 체인의 퍼블릭 RPC 엔드포인트에 연결하기

```js
const Web3 = require('web3');
// mainnet
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

// testnet
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
```

### 월렛 생성하기

```javascript
web3.eth.accounts.create([entropy]);

```
Output:
```bash
web3.eth.accounts.create();
{
  address: '0x926605D0729a968266f1BB299d8Df0471C4F5367',
  privateKey: '0x6b4618539d95f205f33e916e89404b301dde545c0c4acc181fd0c0b42708bad3',
  signTransaction: [Function: signTransaction],
  sign: [Function: sign],
  encrypt: [Function: encrypt]
}

```

### 월렛 복구하기

```javascript

const account = web3.eth.accounts.privateKeyToAccount("0xe500f5754d761d74c3eb6c2566f4c568b81379bf5ce9c1ecd475d40efe23c577")

```


### 잔고 확인하기

```javascript
web3.eth.getBalance(holder).then(console.log);

```

결과:

잔고는 BNB가 e18로 표시됩니다.

```
6249621999900000000
```

### Create Transaction

**Parameters**

* Object - 전송할 트랜잭션 객체
* from - String|Number: 전송 계정의 주소. 명시되지 않을 시 web3.eth.defaultAccount 프로퍼티 사용. 또는 web3.eth.accounts.wallet의 로컬 월렛의 주소 또는 인덱스.
* to - String: (선택 사항) 메시지의 도착 주소. 컨트랙트 생성의 경우 정의되지 않음.
* value - Number|String|BN|BigNumber: (선택 사항) wei로 표시된 트랜잭션 전송 액수. 컨트랙트 생성 트랜잭션의 경우 endowment.
* gas - Number: (optional, default: To-Be-Determined) 트랜잭션에 사용될 가스양(미사용분은 환불).
* gasPrice - Number|String|BN|BigNumber: (선택 사항) wei로 표시된 트랜잭션의 가스비. 기본값은 web3.eth.gasPrice.
* data - String: (선택 사항) 컨트랙트의 함수 호출 데이터 포함 ABI 바이트 문자열. 컨트랙트 생성 트랜잭션의 경우 초기화 코드.
* nonce - Number: (선택 사항) 논스의 정수. 같은 논스를 사용하는 대기 중 트랜잭션 위에 새로운 트랜잭션을 겹쳐 쓸 수 있게(overwrite) 해줌.

```Javascript

	// // Make a transaction using the promise
	web3.eth.sendTransaction({
	    from: holder,
	    to: '0x0B75fbeB0BC7CC0e9F9880f78a245046eCBDBB0D',
	    value: '1000000000000000000',
	    gas: 5000000,
        gasPrice: 18e9,
	}, function(err, transactionHash) {
      if (err) {
        console.log(err);
        } else {
        console.log(transactionHash);
       }
    });
```


