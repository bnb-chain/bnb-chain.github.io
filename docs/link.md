---
sidebar_label: Chainlink Price Feeds for BSC
hide_table_of_contents: false
sidebar_position: 2
---

# BNB Smart Chain Price Feeds from Chainlink

## Introduction to Price Feeds

Chainlink Price Feeds are the quickest way to connect your smart contracts to the real-world market prices of assets. They enable smart contracts to retrieve the latest price of an asset in a single call.

Often, smart contracts need to act upon prices of assets in real-time. This is especially true in [DeFi](https://defi.chain.link/). For example, [Synthetix](https://www.synthetix.io/) use Price Feeds to determine prices on their derivatives platform. Lending and Borrowing platforms like [AAVE](https://aave.com/) use Price Feeds to ensure the total value of the collateral.

## Get the Latest Price

This section explains how to get the latest price of BNB inside smart contracts using Chainlink Price Feeds, on the BNB Smart Chain.

**Solidity Contract**

To consume price data, your smart contract should reference <a href="https://github.com/smartcontractkit/chainlink/blob/master/evm-contracts/src/v0.6/interfaces/AggregatorV3Interface.sol" target="_blank">`AggregatorV3Interface`</a>, which defines the external functions implemented by Price Feeds.

```
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: BNB Smart Chain
     * Aggregator: BNB/USD
     * Address: 0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}

```

**Javascript Web3**

```javascript
const Web3 = require("web3");
const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
const aggregatorV3InterfaceABI = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
const addr = "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE";
const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);
priceFeed.methods.latestRoundData().call()
    .then((roundData) => {
        // Do something with roundData
        console.log("Latest Round Data", roundData)
    });

```

**Python Web3**

```python
from web3 import Web3
web3 = Web3(Web3.HTTPProvider('https://data-seed-prebsc-1-s1.binance.org:8545'))
abi = '[{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]'
addr = '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE'
contract = web3.eth.contract(address=addr, abi=abi)
latestData = contract.functions.latestRoundData().call()
print(latestData)
```


## Get Historical Price Data

The most common use case for Price Feeds is to get the latest price. However, <a href="https://github.com/smartcontractkit/chainlink/blob/master/evm-contracts/src/v0.6/interfaces/AggregatorV3Interface.sol" target="_blank" rel="noreferrer, noopener">`AggregatorV3Interface`</a> also exposes functions which can be used to retrieve price data of a previous round ID.

**Solidity Contract**

```
pragma solidity ^0.6.7;

import "https://github.com/smartcontractkit/chainlink/blob/master/evm-contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract HistoricalPriceConsumerV3 {

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: BNB Smart Chain
     * Aggregator: BNB/USD
     * Address: 0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE);
    }

    /**
     * Returns historical price for a round id.
     * roundId is NOT incremental. Not all roundIds are valid.
     * You must know a valid roundId before consuming historical data.
     * @dev A timestamp with zero value means the round is not complete and should not be used.
     */
    function getHistoricalPrice(uint80 roundId) public view returns (int256) {
        (
            uint80 id,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.getRoundData(roundId);
        require(timeStamp > 0, "Round not complete");
        return price;
    }
}
```
**Javascript Web3**

```javascript

const Web3 = require("web3");

const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
const aggregatorV3InterfaceABI = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
const addr = "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE";
const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);

// Valid roundId must be known. They are NOT incremental.
let validId = BigInt("18446744073709554130");

priceFeed.methods.getRoundData(validId).call()
    .then((historicalRoundData) => {
        // Do something with price
        console.log("Historical round data", historicalRoundData);
    })
```

**Python Web3**

```python
from web3 import Web3

web3 = Web3(Web3.HTTPProvider('https://data-seed-prebsc-1-s1.binance.org:8545'))
abi = '[{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]'
addr = '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE'
contract = web3.eth.contract(address=addr, abi=abi)

#  Valid roundId must be known. They are NOT incremental.
validRoundId = 18446744073709554130

historicalData = contract.functions.getRoundData(validRoundId).call()
print(historicalData)
```


## API Reference

API reference for <a href="https://github.com/smartcontractkit/chainlink/blob/develop/evm-contracts/src/v0.6/interfaces/AggregatorV3Interface.sol" target="_blank">`AggregatorV3Interface`</a>.

### Functions

|Name|Description|
|---|---|
|[decimals](#decimals)|The number of decimals in the response.|
|[description](#description)|The description of the aggregator that the proxy points to.|
|[getRoundData](#getrounddata)|Get data from a specific round.|
|[latestRoundData](#latestrounddata)|Get data from the latest round.|
|[version](#version)|The version representing the type of aggregator the proxy points to.|

___

#### decimals

Get the number of decimals present in the response value.

```javascript Solidity
function decimals() external view returns (uint8)
```

* `RETURN`: The number of decimals.

#### description

Get the description of the underlying aggregator that the proxy points to.

```javascript Solidity
function description() external view returns (string memory)
```

* `RETURN`: The description of the underlying aggregator.

#### getRoundData

Get data about a specific round, using the `roundId`.

```javascript Solidity
function getRoundData(uint80 _roundId) external view
    returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    )
```

**Parameters**

* `roundId`: The round ID

**Return Values**

* `roundId`: The round ID.
* `answer`: The price.
* `startedAt`: Timestamp of when the round started.
* `updatedAt`: Timestamp of when the round was updated.
* `answeredInRound`: The round ID of the round in which the answer
   * was computed.

#### latestRoundData

Get the price from the latest round.

```javascript Solidity
function latestRoundData() external view
    returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    )
```

**Return Values**

* `roundId`: The round ID.
* `answer`: The price.
* `startedAt`: Timestamp of when the round started.
* `updatedAt`: Timestamp of when the round was updated.
* `answeredInRound`: The round ID of the round in which the answer
   * was computed.

#### version

The version representing the type of aggregator the proxy points to.

```javascript Solidity
function version() external view returns (uint256)
```

* `RETURN`: The version number.

___



## Contract Addresses

Chainlink price feed contracts are updated on a regular basis by multiple Chainlink nodes. This section lists the contract addresses for Price Feeds on the BNB Smart Chain.

### Mainnet

| Pair      | Proxy                                                        |
| :-------- | :----------------------------------------------------------- |
| BNB / USD | [`0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE`](https://bscscan.com/address/0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE) |
| BTC / USD | [`0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf`](https://bscscan.com/address/0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf) |
| ETH / USD | [`0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e`](https://bscscan.com/address/0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e) |

Original source is from [Chainlink website](https://docs.chain.link/docs/binance-smart-chain-addresses)
