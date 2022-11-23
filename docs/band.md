---
sidebar_label: Band Protocol Price Feed on BNB Smart Chain
hide_table_of_contents: false
sidebar_position: 2
---

# BNB 스마트 체인의 밴드 프로토콜 가격 피드

## 개요

BNB 스마트 체인의 개발자들은 이제 밴드의 탈중앙화 오라클 인프라를 이용할 수 있습니다. 밴드의 오라클을 사용해 다양한 암호화폐 가격 데이텨를 애플리케이션에 연동시킬 수 있습니다.

## 지원 토큰

현재 지원되는 토큰들은 다음과 같습니다. 앞으로도 개발자들의 필요나 커뮤니티 피드백에 근거해 확장될 예정입니다.

|              토큰 이름              | 심볼 |
| :-----------------------------------: | :----: |
|             Binance Coin              |  BNB   |
|              Binance USD              |  BUSD  |
|                Bitcoin                |  BTC   |
|               Ethereum                |  ETH   |
|                Tether                 |  USDT  |
|                  XRP                  |  XRP   |
|               Chainlink               |  LINK  |
|               Polkadot                |  DOT   |
|             Bitcoin Cash              |  BCH   |
|               Litecoin                |  LTC   |
|                Cardano                |  ADA   |
|              Bitcoin SV               |  BSV   |
| [Crypto.com](http://crypto.com/) Coin |  CRO   |
|                  EOS                  |  EOS   |
|                 Tezos                 |  XTZ   |
|                 Tron                  |  TRX   |
|                Stellar                |  XLM   |
|                Cosmos                 |  ATOM  |
|                Monero                 |  XMR   |
|                  OKB                  |  OKB   |
|                 Swipe                 |  SXP   |

### 가격 페어

아래 제공되는 메서드는 `base` 및 `quote` 토큰 심볼이 위 목록에 포함되어 있다면 모든 가격 쿼리를 지원할 수 있습니다.

예를 들어 자바스크립트 API와 솔리디티를 사용하여 다음과 같은 가격 페어를 쿼리할 수 있습니다.

- `BTC/USD`
- `BNB/ETH`

## 가격 쿼리하기

현재 개발자들이 밴드 오라클로부터 가격을 쿼리할 수 있는 두 가지 방법이 있습니다. BNB 스마트 체인에서 밴드의 `StdReference` 스마트 컨트랙트 그리고 자바스크립트 헬퍼 라이브러리 [`bandchain.js`](https://www.npmjs.com/package/%40bandprotocol%2Fbandchain.js)를 사용하는 것입니다..

### 솔리디티 스마트 컨트랙트

스마트 컨트랙트를 통해 밴드 오라클의 가격 피드를 가져오기 위해서는 가격 값들을 사용하려는 컨트랙트가 밴드의 `StdReference` 컨트랙트를 참조해야 합니다. 이 컨트랙트에는 `getReferenceData`와 `getReferenceDataBulk` 함수가 있습니다.

`getReferenceData`는 입력값으로 `base`와 `quote` 심볼 두 문자열을 받습니다. 그리고 나서 그 후 두 토큰의 최신 가격을 불러오기 위해 `StdReference` 컨트랙트를 쿼리하고, `ReferenceData` 구조체를 아래와 같이 반환합니다.

```
struct ReferenceData {
    uint256 rate; // base/quote exchange rate, multiplied by 1e18.
    uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
    uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
}
```

`getReferenceDataBulk`는 `base` 토큰 그리고 `quotes`에 대한 리스트를 받습니다. 그리고 각 인덱스에서의 base/quote 페어 가격을 쿼리하며 `ReferenceData` 구조체의 배열을 반환합니다.

예를 들어 `['BTC','BTC','ETH']`와 `['USD','ETH','BNB']`로 `getReferenceDataBulk`를 호출하면, 반환된 `ReferenceData` 배열은 다음 페어에 대한 정보를 포함하고 있을 것입니다.

- `BTC/USD`
- `BTC/ETH`
- `ETH/BNB`

#### 예시

아래 컨트랙트 코드는 새로운 `StdReference` 컨트랙트와 `getReferenceData` 함수의 사용 예시를 보여줍니다.

```
pragma solidity 0.6.11;
pragma experimental ABIEncoderV2;

interface IStdReference {
    /// A structure returned whenever someone requests for standard reference data.
    struct ReferenceData {
        uint256 rate; // base/quote exchange rate, multiplied by 1e18.
        uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
        uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
    }

    /// Returns the price data for the given base/quote pair. Revert if not available.
    function getReferenceData(string memory _base, string memory _quote)
        external
        view
        returns (ReferenceData memory);

    /// Similar to getReferenceData, but with multiple base/quote pairs at once.
    function getReferenceDataBulk(string[] memory _bases, string[] memory _quotes)
        external
        view
        returns (ReferenceData[] memory);
}

contract DemoOracle {
    IStdReference ref;
    
    uint256 public price;
    
    constructor(IStdReference _ref) public {
        ref = _ref;
    }
    
    function getPrice() external view returns (uint256){
        IStdReference.ReferenceData memory data = ref.getReferenceData("BTC","USD");
        return data.rate;
    }
    
    function getMultiPrices() external view returns (uint256[] memory){
        string[] memory baseSymbols = new string[](2);
        baseSymbols[0] = "BTC";
        baseSymbols[1] = "ETH";
         
        string[] memory quoteSymbols = new string[](2);
        quoteSymbols[0] = "USD";
        quoteSymbols[1] = "USD";
        IStdReference.ReferenceData[] memory data = ref.getReferenceDataBulk(baseSymbols,quoteSymbols);
        
        uint256[] memory prices = new uint256[](2);
        prices[0] = data[0].rate;
        prices[1] = data[1].rate;
        
        return prices;
    }
    
    function savePrice(string memory base, string memory quote) external {
        IStdReference.ReferenceData memory data = ref.getReferenceData(base,quote);
        price = data.rate;
    }
}
```

#### 컨트랙트 주소

| 블록체인    |        애그리게이터 컨트랙트 주소         | 업데이트 주기 |                           익스플로러                           |
| :------------ | :------------------------------------------: | :----------: | :----------------------------------------------------------: |
| BSC (Testnet) | `0xDA7a001b254CD22e46d3eAB04d937489c93174C3` |    5 분    | [link](https://testnet.bscscan.com/address/0xDA7a001b254CD22e46d3eAB04d937489c93174C3) |
| BSC (Mainnet) | `0xDA7a001b254CD22e46d3eAB04d937489c93174C3` |    5 분    | [link](https://bscscan.com/address/0xDA7a001b254CD22e46d3eAB04d937489c93174C3) |

### BandChain.JS

밴드 노드 헬퍼 라이브러리[`bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js)는 또한 유사한 `getReferenceData` 함수를 지원합니다. 이 함수는 하나의 인수, 즉 결과를 쿼리할 토큰 페어 리스트를 받습니다. 그리고 상응하는 값들의 리스트를 반환합니다.

#### 사용 예시

아래 코드는 함수의 사용 예시를 보여줍니다.

```
const BandChain = require('@bandprotocol/bandchain.js');

(async () => {
  const endpoint = 'https://poa-api.bandchain.org';

  const bandchain = new BandChain(endpoint);
  const price = await bandchain.getReferenceData(['BAND/USD', 'BTC/ETH', 'EUR/USD', 'EUR/BTC']);
  console.log(price);
})();
```

결과는 아래와 같습니다.

```
$ node index.js
[
  {
    pair: 'BAND/USD',
    rate: 6.49,
    updated: { base: 1600676205, quote: 0 },
    rawRate: { value: 6490000000n, decimals: 9 }
  },
  {
    pair: 'BTC/ETH',
    rate: 29.574702955490906,
    updated: { base: 1600676187, quote: 1600676187 },
    rawRate: { value: 29574702955n, decimals: 9 }
  },
  {
    pair: 'EUR/USD',
    rate: 1.185569204,
    updated: { base: 1600676032, quote: 0 },
    rawRate: { value: 1185569204n, decimals: 9 }
  },
  {
    pair: 'EUR/BTC',
    rate: 0.00010899500647220628,
    updated: { base: 1600676032, quote: 1600676187 },
    rawRate: { value: 108995n, decimals: 9 }
  }
]
```

각 페어에 대해 아래와 같은 정보가 반환됩니다.

- `pair`: base/quote 심볼 페어 문자열입니다.

- `rate`: 주어진 페어의 가격입니다.

- `updated`: 밴드체인에서 base 및 quote 심볼이 마지막으로 업데이트된 타임스탬프이며, `USD`의 경우 현재 타임스탬프입니다.

- `rawRate`: 이 객체는 두 개로 구성됩니다.
	- `value`가 현재 가격의 `BigInt` 값으로, `10^decimals`로 곱해져 있습니다.
	- `decimals`은 `rawRate` 반환을 위해 `rate`가 곱해진 지수입니다.



Originally published [here](https://hackmd.io/@tansawit/bsc-developer-docs-standard-dataset#)
