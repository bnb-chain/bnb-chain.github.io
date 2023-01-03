---
sidebar_label: Band Protocol Price Feed on BNB Smart Chain
hide_table_of_contents: false
sidebar_position: 2
---

# Band Protocol Price Feed on BNB Smart Chain 

## Introduction

Developers building on BNB Smart Chain can now leverage Band’s decentralized oracle infrastructure. With Band’s oracle, they now have access to various cryptocurrency price data to integrate into their applications.

## Supported Tokens

Currently, the following token symbols are supported. Going forward, this list will continue to expand based on developer needs and community feedback.

|              Token Name               | Symbol |
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

### Price Pairs

The method provided below supports price query with any denomination as long as the base and quote symbols are supported in the list above.

For example, you can use the APIs in Javascripts and Solidity to query the following price pairs:

- `BTC/USD`
- `BNB/ETH`

## Querying Prices

Currently, there are two methods for developers to query prices from Band’s oracle: through Band’s `StdReference` smart contract on BNB Smart Chain  and through their [`bandchain.js`](https://www.npmjs.com/package/%40bandprotocol%2Fbandchain.js) JavaScript helper library.

### Solidity Smart Contract

To query prices from Band’s oracle through smart contracts, the contract looking to use the price values should reference Band’s `StdReference` contract. This contract exposes `getReferenceData` and `getReferenceDataBulk` functions.

`getReferenceData` takes two strings as the inputs, the base and quote symbol, respectively. It then queries the `StdReference` contract for the latest rates for those two tokens, and returns a `ReferenceData` struct, shown below.

```
struct ReferenceData {
    uint256 rate; // base/quote exchange rate, multiplied by 1e18.
    uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
    uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
}
```

`getReferenceDataBulk` instead takes two lists, one of the `base` tokens, and one of the `quotes`. It then proceeds to similarly queries the price for each base/quote pair at each index, and returns an array of `ReferenceData` structs.

For example, if we call `getReferenceDataBulk` with `['BTC','BTC','ETH']` and `['USD','ETH','BNB']`, the returned `ReferenceData` array will contain information regarding the pairs:

- `BTC/USD`
- `BTC/ETH`
- `ETH/BNB`

#### Example Usage

The contract code below demonstrates a simple usage of the new `StdReference` contract and the `getReferenceData` function.

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

#### Contract Addresses

| Blockchain    |         Aggregator Contract Address          | Update Every |                           Explorer                           |
| :------------ | :------------------------------------------: | :----------: | :----------------------------------------------------------: |
| BSC (Testnet) | `0xDA7a001b254CD22e46d3eAB04d937489c93174C3` |    5 mins    | [link](https://testnet.bscscan.com/address/0xDA7a001b254CD22e46d3eAB04d937489c93174C3) |
| BSC (Mainnet) | `0xDA7a001b254CD22e46d3eAB04d937489c93174C3` |    5 mins    | [link](https://bscscan.com/address/0xDA7a001b254CD22e46d3eAB04d937489c93174C3) |

### BandChain.JS

Band’s node helper library [`bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js) also supports a similar `getReferenceData` function. This function takes one argument, a list of token pairs to query the result of. It then returns a list of corresponding rate values.

#### Example Usage

The code below shows an example usage of the function

```
const BandChain = require('@bandprotocol/bandchain.js');

(async () => {
  const endpoint = 'https://poa-api.bandchain.org';

  const bandchain = new BandChain(endpoint);
  const price = await bandchain.getReferenceData(['BAND/USD', 'BTC/ETH', 'EUR/USD', 'EUR/BTC']);
  console.log(price);
})();
```

The corresponding result will then be similar to

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

For each pair, the following information will be returned:

- `pair`: The base/quote symbol pair string

- `rate`: The resulting rate of the given pair

- `updated`: The timestamp at which the base and quote symbols was last updated on BandChain. For `USD`, this will be the current timestamp

- `rawRate`: This object consists of two parts.
	- `value` is the `BigInt` value of the actual rate, multiplied by `10^decimals`
	- `decimals` is then the exponent by which `rate` was multiplied by to get `rawRate`



Originally published [here](https://hackmd.io/@tansawit/bsc-developer-docs-standard-dataset#)
