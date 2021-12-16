# DIA Data Oracles on Binance Smart Chain

## Introduction

DApp developers who want to leverage DIA oracles can access the published data on Binance Smart Chain. DIA offers cryptocurrency and data about traditional financial assets.

## Supported Assets

DIA supports assets from various categories to be included into the oracle. A selection of assets is listed here:

|              Data Feed Name           | Data Type |
| :-----------------------------------: | :----: |
|             Binance Coin              |  Crypto Price   |
|                Bitcoin                |  Crypto Price  |
|               Ethereum                |  Crypto Price   |
|                Tether                 |  Crypto Price  |
|                  XRP                  |  Crypto price   |
|              Barnbridge Protocol      |  Farming Pool Data |
|              yearn.finance            |  Farming Pool Data |
|              CREX on Crex            |  Chart Point on Exchange |
|              DAI on CurveFi            |  Chart Point on Exchange |
|              WBNB on PancakeSwap           |  Chart Point on Exchange |

## Data Access

All asset prices are determined in USD.
Where appliccable, the oracle also provides information on circulating supply and the timestamp of data collection.
The query in the smart contract is realized with the symbol of the asset.

### Smart Contract

DIA data is published in the `DIAOracle` smart contract. By querying the `getCoinInfo()` function you can retrieve the requested data.

It takes the name of the asset as input, e.g., `Bitcoin` and returns this struct of data:

```
struct CoinInfo {
	uint256 price;
	uint256 supply;
	uint256 lastUpdateTimestamp;
	string symbol;
}
```

The following snippet shows how to retrieve the BTC price of an asset (e.g. `Binance Coin`) using a smart contract.

```
pragma solidity ^0.4.24;

contract DiaOracle {
	address owner;

	struct CoinInfo {
		uint256 price;
		uint256 supply;
		uint256 lastUpdateTimestamp;
		string symbol;
	}

	mapping(string => CoinInfo) diaOracles;

	event newCoinInfo(
		string name,
		string symbol,
		uint256 price,
		uint256 supply,
		uint256 lastUpdateTimestamp
	);

	constructor() public {
		owner = msg.sender;
	}

	function changeOwner(address newOwner) public {
		require(msg.sender == owner);
		owner = newOwner;
	}

	function updateCoinInfo(string name, string symbol, uint256 newPrice, uint256 newSupply, uint256 newTimestamp) public {
		require(msg.sender == owner);
		diaOracles[name] = (CoinInfo(newPrice, newSupply, newTimestamp, symbol));
		emit newCoinInfo(name, symbol, newPrice, newSupply, newTimestamp);
	}

	function getCoinInfo(string name) public view returns (uint256, uint256, uint256, string) {
		return (
			diaOracles[name].price,
			diaOracles[name].supply,
			diaOracles[name].lastUpdateTimestamp,
			diaOracles[name].symbol
		);
	}
}

contract DiaAssetBtcOracle {
	DiaOracle oracle;
	address owner;
    
	constructor() public {
		owner = msg.sender;
	}
    
	function setOracleAddress(address _address) public {
		require(msg.sender == owner);
		oracle = DiaOracle(_address);
	}
    
	function getAssetEurRate(string asset) constant public returns (uint256) {
		(uint assetPrice,,,) = oracle.getCoinInfo(asset);
		(uint btcPrice,,,) = oracle.getCoinInfo("Bitcoin");
		return (assetPrice * 100000 / btcPrice);
	}
    
}
```

#### Deployed Addresses

| Chain name    |        Oracle Contract Address          | Update Frequency |
| :------------ | :------------------------------------------: | :----------: |
| BSC: Testnet | `0xf35bEE4B6727D2D1c9167C5fB4D51855D6bB693c` |    1/day    |
| BSC: Mainnet | `0xf35bEE4B6727D2D1c9167C5fB4D51855D6bB693c` |    1/day    |

The full documentation of the DIA oracle is located [here](https://docs.diadata.org/documentation/oracle-documentation).
