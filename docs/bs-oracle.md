---
sidebar_label: Binance Oracle
hide_table_of_contents: false
sidebar_position: 2
---

# Binance Oracle on BNB Smart Chain

## Introduction to Binance Oracle

Oracles are decentralized applications that gather, validate, and deliver off-chain data to smart contracts on the blockchain. Similarly, they can do the same for delivering on-chain data to off-chain systems. Oracles act as middleware connecting smart contracts on blockchains to off-chain data providers, sources and systems. Without oracles, smart contract applications would be limited to executing using only on-chain data. Please read our article in [Binance Academy](https://academy.binance.com/en/articles/what-is-binance-oracle) to understand more about blockchain oracle.

<a href="https://oracle.binance.com/docs/" target="_blank">Binance Oracle</a> brings the crypto asset's real-world market prices to your smart contracts on the BNB Smart Chain. We offer a 

**highly reliable** and **low latency** price feed for multiple crypto pairs aggregated over a variety of sources to boost Defi development. It should be:

* `Secure and trustworthy`: Data source is from high-fidelity Binance Index data and well designed self-implemented data feed, and no single person can manipulate the price data.
* `Highly available`: An elaborate infrustructure can ensure the service by and large 100% available.
* `Accurate and Timely`: The price is updated periodically or when a big price deviation is detected, please refer to 
**[refesh logic](https://oracle.binance.com/docs/knowledge-base/refresh-frequency)** for more details.
* `Integration friendly`: Provide interface which is compatible with ChainLink users on BSC.
* `Powerful Combination`: Publish data to Pyth network, making Pyth price feeds are now available to Dapp users on BNB Chain mainnet and Binance Sidechains.

Before using the Oracle, it is important to ensure high data quality for your needs. For this purpose, we offer multiple <a href="https://oracle.binance.com/docs/knowledge-base/data-feed-categories" target="_blank">`data quality tiers`</a>.
Please read through them carefully and understand the underlying risks before using the Oracle.

## How to use Binance Oracle?

For Dapp users, they don't really need to interact with oracles. However, for blockchain developers who need to utilize data beyond the chain, this section will guide them how to do the integration.

Price feeds can be queried through two channels. [FeedRegistry](https://oracle.binance.com/docs/price-feeds/feed-registry/) and [FeedAdapters](https://oracle.binance.com/docs/price-feeds/feed-adapter/). Both channels are access controlled and therefore users need to be whitelisted before using the service.

### Request Access
There are thress kinds of access available for our users:

1. **Global access**: Access to all the trading pairs - need to be whitelisted
2. **Pair-wise access**: Access to selected trading pairs - need to be whitelisted
3. **Public access**: Access to free trading pairs - no need of whitelist

To obtain 
*Global access*, please 
**<a href="https://oracle.binance.com/en/contact" target="_blank">contact us</a>** with the contract address which reads the FeedRegistry/ FeedAdapter. For 
*Pair-wise* access, along with the contract address, we require a list of trading pairs you would require access to. Even though the service is subscription based, some pairs are open for all. To check the currently available pairs as well as open access pairs, refer to <a href="https://oracle.binance.com/docs/price-feeds/feeds-available" target="_blank">feeds available</a>.

***Note***: Though access control is enforced for contracts, any EOA will be able to freely query all the FeedRegistry/FeedAdapter endpoints.

### Sample Project
Users can leverage our <a href="https://github.com/binance-cloud/binance-oracle" target="_blank">`starter project`</a> repository to get a quick start with Binance Oracle. It has all required interfaces, sample consumer contracts and tests for you to query symbol prices on the chain.

## Get Data from FeedRegistry

The <a href="https://oracle.binance.com/docs/price-feeds/feed-registry/" target="_blank">FeedRegistry</a> contract maintains registry of trading pairs and exposes API to query prices on the chain in the most convenient way possible. Registry allows users to:

* Query all the active trading pairs listed on the oracle
* Query prices by token string names along with addresses
* Query historical data

### Consumer Contract

**Solidity Contract**

To consume price data, your smart contract should reference <a href="https://github.com/smartcontractkit/chainlink/blob/master/evm-contracts/src/v0.6/interfaces/AggregatorV3Interface.sol" target="_blank">`AggregatorV3Interface`</a>, which defines the external functions implemented by Price Feeds.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/FeedRegistryInterface.sol";

contract PriceConsumer {
  FeedRegistryInterface internal s_feedRegistry;


  constructor(address _registry) {
    s_feedRegistry = FeedRegistryInterface(_registry);
  }

  function getLatestPrice(address base, address quote)
  external
  view
  returns (int256 answer)
  {
    return s_feedRegistry.latestAnswer(base, quote);
  }
}

```

**Hardhat/ Ethers**

```
import { ethers } from "hardhat";

async function main() {
  const registryAddress = "0x1647a10D50e1Ebf84FF6E38e4c8dd1298E0E69cC"; //Testnet address
  //Pass the name or ABI of the contract
  const registry = await ethers.getContractAt("FeedRegistryInterface", registryAddress);
  const priceWithoutDecimals = await registry.latestAnswerByName("BTC", "USD");
  console.log("Answer for BTC/USD: ", priceWithoutDecimals.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

**JavaScript**

```javascript
import Web3 from 'web3'
import contract_abi from './contract_abi.json'

async function getSymbolPairPrice(baseAsset, quoteAsset) {
  const registryAddress = "0x1647a10D50e1Ebf84FF6E38e4c8dd1298E0E69cC"; //Testnet address
  const provider = new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(contract_abi, registryAddress);
  const result = await contract.methods.latestRoundDataByName(baseAsset, quoteAsset).call();
  console.log(result)
}

getSymbolPairPrice("BTC", "USD")

/** Output
  Result {
    '0': '18446744073709551616',
    '1': '1936203781166',
    '2': '1666108882',
    '3': '1666108887',
    '4': '18446744073709551616',
    roundId: '18446744073709551616',
    answer: '1936203781166',
    startedAt: '1666108882',
    updatedAt: '1666108887',
    answeredInRound: '18446744073709551616'
  }
*/

```
### API Reference

API reference for <a href="https://github.com/smartcontractkit/chainlink/blob/develop/evm-contracts/src/v0.6/interfaces/AggregatorV3Interface.sol" target="_blank">`AggregatorV3Interface`</a>.

#### Core Functions

|Name|Description|
|---|---|
|[totalPairsAvailable](#decimals)|The number of decimals in the response.|
|[getAllPairs](#description)|The description of the aggregator that the proxy points to.|
|[getTradingPairDetails](#getrounddata)|Get data from a specific round.|
|[exists](#latestrounddata)|Get data from the latest round.|
|[version](#version)|The version representing the type of aggregator the proxy points to.|

#### Peripheral Functions

|Name|Description|
|---|---|
|[decimals](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#decimals)|The number of decimals in the response.|
|[decimalsByName](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#decimalsByName)|The number of decimals in the response and also resolves the decimals for synthetic pairs.|
|[description](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#description)|The description of the underlying aggregator.|
|[descriptionByName](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#descriptionByName)|The description of the underlying aggregator.|
|[version](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#version)|The version of the underlying aggregator.|
|[versionByName](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#versionByName)|The version of the underlying aggregator.|
|[latestRoundData](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#latestRoundData)|Get the data of the latest round.|
|[latestRoundDataByName](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#latestRoundDataByName)|The latest round data for a pair.|
|[latestRound](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#latestRound)|Get the latest round ID for a base/quote pair (V2 interface).|
|[latestAnswer](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#latestAnswer)|The latest answer of a base/quote pair (V2 interface).|
|[latestAnswerByName](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#latestAnswerByName)|The latest answer of a base/quote pair and also resolves the answer for synthetic pairs.|
|[latestTimestamp](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#latestTimestamp)|Returns the last timestamp when the pair was updated on-chain (V2 interface).|
|[getRoundData](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#getRoundData)|Get the round data details on a given round.|
|[getAnswer](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#getAnswer)|Get the answer for a specific round (V2 interface).|
|[getTimestamp](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#getTimestamp)|Get the updated time timestamp for a specific round (V2 interface).|
|[getFeed](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#getFeed)|Get the current aggregator for this pair.|
|[getPhaseFeed](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#getPhaseFeed)|The aggregator address given a phaseId.|
|[isFeedEnabled](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#isFeedEnabled)|Checks if a given aggregator is currently being used.|
|[getPhase](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#getPhase)|Get the raw starting and the ending round IDs of the given Phase Id.|
|[getRoundFeed](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#getRoundFeed)|The aggregator which executed the given roundId.|
|[getPhaseRange](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#getPhaseRange)|Get the starting and the ending round IDs of the given Phase Id.|
|[getPreviousRoundId](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#getPreviousRoundId)|Returns the previous round ID of a base/quote pair given a specified round.|
|[getNextRoundId](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#getNextRoundId)|Returns the next round ID of a base/quote pair given a specified round.|
|[getCurrentPhaseId](https://oracle.binance.com/docs/price-feeds/feed-registry/feed-registry-api-reference#getCurrentPhaseId)|Returns the current phase id of a base/quote pair.|

___

#### latestRoundData

Get the latest round data details for the pair

```javascript Solidity
function latestRoundData(address base, address quote) 
    external 
    view 
    returns (
        uint80 roundId, 
        int256 answer, 
        uint256 startedAt, 
        uint256 updatedAt, 
        uint80 answeredInRound
    );
```

**Parameters**

* `base`: The base asset address
* `quote`: The quote asset address

**Return Values**

* `roundId`: The round ID.
* `answer`: The price on the round.
* `startedAt`: The timestamp at which the price was submitted.
* `updatedAt`: The timestamp at which the price was updated on the chain.
* `answeredInRound`: The round ID of the round in which the answer was computed.

#### latestRoundDataByName

Get the latest round data details for the pair using string params

```javascript Solidity
function latestRoundDataByName(string memory base, string memory quote) 
    external 
    view 
    returns (
        uint80 roundId, 
        int256 answer, 
        uint256 startedAt, 
        uint256 updatedAt, 
        uint80 answeredInRound
    );
```

**Parameters**

* `base`: The base asset string
* `quote`: The quote asset string

**Return Values**

* `roundId`: The round ID.
* `answer`: The price.
* `startedAt`: Timestamp of when the round started.
* `updatedAt`: Timestamp of when the round was updated.
* `answeredInRound`: The round ID of the round in which the answer
   * was computed.

#### latestAnswer

Get the latest answer for the pair

```javascript Solidity
function latestAnswerByName(string memory base, string memory quote) external view returns (int256);
```

**Parameters**

* `base`: The base asset address
* `quote`: The quote asset address

**Return Values**

* `RETURN`: The latest answer from the underlying aggregator.

#### latestAnswerByName

Get the latest answer from the underlying aggregator using string params

```javascript Solidity
function latestAnswerByName(string memory base, string memory quote) external view returns (int256);
```
**Parameters**

* `base`: The base asset string
* `quote`: The quote asset string

**Return Values**

* `RETURN`: The latest answer from the underlying aggregator.

___

## Get Data from FeedAdapters

<a href="https://oracle.binance.com/docs/price-feeds/feed-adapter" target="_blank">FeedAdapters</a> conform to AggregatorV2V3Interface and offer compatibility to existing Chainlink price consumer contracts. Adapters allows users to:

* Query prices by token addresses
* Query historical data

### Consumer Contract

**Solidity Contract**

To consume price data from the adapter, one can use the <a href="https://github.com/binance-cloud/binance-oracle/blob/main/contracts/interfaces/FeedAdapterInterface.sol" target="_blank">`FeedAdapterInterface`</a> or the <a href="https://github.com/smartcontractkit/chainlink/blob/master/evm-contracts/src/v0.6/interfaces/AggregatorV3Interface.sol" target="_blank">`AggregatorV2V3Interface`</a>. Which are equivalent.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../interfaces/FeedAdapterInterface.sol";

contract PriceConsumerWithAdapter {
  AggregatorV2V3Interface private s_feedAdapter;

  constructor(address adapter) {
    s_feedAdapter = AggregatorV2V3Interface(adapter);
  }

  function getLatestPrice()
  external
  view
  returns (int256 answer)
  {
    return s_feedAdapter.latestAnswer();
  }
}

```

**Hardhat/ Ethers**

```
import { ethers } from "hardhat";

async function main() {
  const adapterAddress = "0x491fD333937522e69D1c3FB944fbC5e95eEF9f59"; //Testnet address
  //Pass the name or ABI of the contract
  const adapterBTCUSD = await ethers.getContractAt("AggregatorV2V3Interface", adapterAddress);
  const price = await adapterBTCUSD.latestAnswer();
  console.log("Answer for BTC/USD: ", price.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });const Web3 = require('web3')

const contract_abi = [
  { 
    "inputs": [
      { "internalType": "contract FeedRegistryInterface", "name": "feedRegistry_", "type": "address" }
      ...
    ]
  },
  ...
]

async function getBTCUSDAnswer() {
  const adapterAddress = '0x491fD333937522e69D1c3FB944fbC5e95eEF9f59'; // testnet address
  const provider = new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(contract_abi, adapterAddress);
  const result = await contract.methods.latestAnswer().call();
  console.log(result)
}

/**
Output: 1997642165957
*/

```

### API Reference

API reference for <a href="https://github.com/smartcontractkit/chainlink/blob/develop/evm-contracts/src/v0.6/interfaces/AggregatorV3Interface.sol" target="_blank">`AggregatorV3Interface`</a>.

#### Functions

|Name|Description|
|---|---|
|[decimals](https://oracle.binance.com/docs/price-feeds/feed-adapter/feed-adapter-api-reference#decimals)|The number of decimals in the response.|
|[description](https://oracle.binance.com/docs/price-feeds/feed-adapter/feed-adapter-api-reference#description)|The description of the feed adapter.|
|[version](https://oracle.binance.com/docs/price-feeds/feed-adapter/feed-adapter-api-reference#version)|Get the number of decimals of the response.|
|[latestRoundData](https://oracle.binance.com/docs/price-feeds/feed-adapter/feed-adapter-api-reference#latestRoundData)|Get the latest round data details.|
|[latestRound](https://oracle.binance.com/docs/price-feeds/feed-adapter/feed-adapter-api-reference#latestRound)|Get the latest round id using AggregatorV2 interface.|
|[latestAnswer](https://oracle.binance.com/docs/price-feeds/feed-adapter/feed-adapter-api-reference#latestAnswer)|Get the latest answer (V2 interface).|
|[latestTimestamp](https://oracle.binance.com/docs/price-feeds/feed-adapter/feed-adapter-api-reference#latestTimestamp)|Returns the last timestamp when the pair was updated on-chain (V2 interface).|
|[getRoundData](https://oracle.binance.com/docs/price-feeds/feed-adapter/feed-adapter-api-reference#getRoundData)|Get the round data details on a given round.|
|[getAnswer](https://oracle.binance.com/docs/price-feeds/feed-adapter/feed-adapter-api-reference#getAnswer)|Get the answer for a specific round (V2 interface).|
|[getTimestamp](https://oracle.binance.com/docs/price-feeds/feed-adapter/feed-adapter-api-reference#getTimestamp)|Get the updated timestamp on-chain on a specific round (V2 interface).|
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

| FeedRegistry      | Proxy                                                        |
| :-------- | :----------------------------------------------------------- |
| FeedRegistry | Coming soon, using feed adapter is recommended |

| FeedAdapter      | Proxy                                                        |
| :-------- | :----------------------------------------------------------- |
| BNB / USD | [`0xC5A35FC58EFDC4B88DDCA51AcACd2E8F593504bE`](https://bscscan.com/address/0xC5A35FC58EFDC4B88DDCA51AcACd2E8F593504bE) |
| BTC / USD | [`0x83968bCa5874D11e02fD80444cDDB431a1DbEc0f`](https://bscscan.com/address/0x83968bCa5874D11e02fD80444cDDB431a1DbEc0f) |
| ETH / USD | [`0x7a023F0346a564F5e8942dae1342c2bB42909406`](https://bscscan.com/address/0x7a023F0346a564F5e8942dae1342c2bB42909406) |

| Asset      | Proxy                                                        |
| :-------- | :----------------------------------------------------------- |
| BNB | [`0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c`](https://bscscan.com/address/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c) |
| BTC | [`0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c`](https://bscscan.com/address/0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c) |
| ETH | [`0x2170Ed0880ac9A755fd29B2688956BD959F933F8`](https://bscscan.com/address/0x2170Ed0880ac9A755fd29B2688956BD959F933F8) |
| USD | [`0x0000000000000000000000000000000000000348`](https://bscscan.com/address/0x0000000000000000000000000000000000000348) |

### Testnet

| FeedRegistry      | Proxy                                                        |
| :-------- | :----------------------------------------------------------- |
| FeedRegistry | [`0x1647a10D50e1Ebf84FF6E38e4c8dd1298E0E69cC`](https://testnet.bscscan.com/address/0x1647a10D50e1Ebf84FF6E38e4c8dd1298E0E69cC) |

| FeedAdapter      | Proxy                                                        |
| :-------- | :----------------------------------------------------------- |
| BNB / USD | [`0x1A26d803C2e796601794f8C5609549643832702C`](https://testnet.bscscan.com/address/0x1A26d803C2e796601794f8C5609549643832702C) |
| BTC / USD | [`0x491fD333937522e69D1c3FB944fbC5e95eEF9f59`](https://testnet.bscscan.com/address/0x491fD333937522e69D1c3FB944fbC5e95eEF9f59) |
| ETH / USD | [`0x635780E5D02Ab29d7aE14d266936A38d3D5B0CC5`](https://testnet.bscscan.com/address/0x635780E5D02Ab29d7aE14d266936A38d3D5B0CC5) |

| Asset      | Proxy                                                        |
| :-------- | :----------------------------------------------------------- |
| BNB | [`0xD26547AD6a46a6274E6ba39129d08504Dd546AD3`](https://testnet.bscscan.com/address/0xD26547AD6a46a6274E6ba39129d08504Dd546AD3) |
| BTC | [`0xE3fDB7552A766B76258ed7d282bFed7F552095F4`](https://testnet.bscscan.com/address/0xE3fDB7552A766B76258ed7d282bFed7F552095F4) |
| ETH | [`0x4f080ce6642042814c9A32356b3149672B229372`](https://testnet.bscscan.com/address/0x4f080ce6642042814c9A32356b3149672B229372) |
| USD | [`0xE29F914Af45489cAfED9B65672b3A0165Fa93073`](https://testnet.bscscan.com/address/0xE29F914Af45489cAfED9B65672b3A0165Fa93073) |

For the latest or more information of Binance Oracle, please visit [Binance Oracle Official website](https://oracle.binance.com/docs/)
