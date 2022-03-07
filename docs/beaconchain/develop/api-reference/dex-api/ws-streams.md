# WebSocket Streams

### 1. Orders

Returns individual order updates.

Examples are written in JavaScript.

**Topic Name:** orders | Stream: /ws/address

**Mainnet Connection Example:**

```javascript
    // URL connection
    const accountAndOrderAndTransfers = new WebSocket("wss://dex.binance.org/api/ws/bnb1m4m9etgf3ca5wpgkqe5nr6r33a4ynxfln3yz4v");

    // Or Subscribe method
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "orders", address: "bnb1m4m9etgf3ca5wpgkqe5nr6r33a4ynxfln3yz4v" }));
    }
```

**Testnet Connection Example:**

```javascript
    // URL connection
    const accountAndOrderAndTransfers = new WebSocket("wss://testnet-dex.binance.org/api/ws/tbnb1qtuf578qs9wfl0wh3vs0r5nszf80gvxd28hkrc");

    // Or Subscribe method
    const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "orders", address: "tbnb1qtuf578qs9wfl0wh3vs0r5nszf80gvxd28hkrc" }));
    }
```

**Received Payload:**

```javascript
  {
    "stream": "orders",
    "data": [{
        "e": "executionReport",        // Event type
        "E": 1499405658658,            // Event height
        "s": "ETH_BTC",                // Symbol
        "S": 1,                        // Side, 1 for Buy; 2 for Sell
        "o": 2,                        // Order type, 2 for LIMIT (only)
        "f": 1,                        // Time in force,  1 for Good Till Expire (GTE); 3 for Immediate Or Cancel (IOC)
        "q": "1.00000000",             // Order quantity
        "p": "0.10264410",             // Order price
        "x": "NEW",                    // Current execution type
        "X": "Ack",                    // Current order status, possible values Ack, Canceled, Expired, IocNoFill, PartialFill, FullyFill, FailedBlocking, FailedMatching, Unknown
        "i": "91D9...7E18-2317",       // Order ID
        "l": "0.00000000",             // Last executed quantity
        "z": "0.00000000",             // Cumulative filled quantity
        "L": "0.00000000",             // Last executed price
        "n": "10000BNB",               // Commission amount for all user trades within a given block. Fees will be displayed with each order but will be charged once.
                                       // Fee can be composed of a single symbol, ex: "10000BNB"
                                       // or multiple symbols if the available "BNB" balance is not enough to cover the whole fees, ex: "1.00000000BNB;0.00001000BTC;0.00050000ETH"
        "T": 1499405658657,            // Transaction time
        "t": "TRD1",                   // Trade ID
        "O": 1499405658657,            // Order creation time
    },
    {
        "e": "executionReport",        // Event type
        "E": 1499405658658,            // Event height
        "s": "ETH_BNB",                // Symbol
        "S": "BUY",                    // Side
        "o": "LIMIT",                  // Order type
        "f": "GTE",                    // Time in force
        "q": "1.00000000",             // Order quantity
        "p": "0.10264410",             // Order price
        "x": "NEW",                    // Current execution type
        "X": "Ack",                    // Current order status
        "i": 4293154,                  // Order ID
        "l": "0.00000000",             // Last executed quantity
        "z": "0.00000000",             // Cumulative filled quantity
        "L": "0.00000000",             // Last executed price
        "n": "10000BNB",               // Commission amount for all user trades within a given block. Fees will be displayed with each order but will be charged once.
                                        // Fee can be composed of a single symbol, ex: "10000BNB"
                                        // or multiple symbols if the available "BNB" balance is not enough to cover the whole fees, ex: "1.00000000BNB;0.00001000BTC;0.00050000ETH"
        "T": 1499405658657,            // Transaction time
        "t": "TRD2",                   // Trade ID
        "O": 1499405658657,            // Order creation time
      }]
  }
```

### 2. Account

Return account updates.

**Topic Name:** accounts | Stream: /ws/address

**Mainnet Connection Example:**

```javascript
    // URL connection
    const accountAndOrderAndTransfers = new WebSocket("wss://dex.binance.org/api/ws/bnb1m4m9etgf3ca5wpgkqe5nr6r33a4ynxfln3yz4v");

    // Or Subscribe method
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "accounts", address: "bnb1m4m9etgf3ca5wpgkqe5nr6r33a4ynxfln3yz4v" }));
    }
```


**Testnet Connection Example:**

```javascript
    // URL connection
    const accountAndOrderAndTransfers = new WebSocket("wss://testnet-dex.binance.org/api/ws/tbnb1qtuf578qs9wfl0wh3vs0r5nszf80gvxd28hkrc");

    // Or Subscribe method
    const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "accounts", address: "tbnb1qtuf578qs9wfl0wh3vs0r5nszf80gvxd28hkrc" }));
    }
```

**Received Payload:**

```javascript
{
    "stream": "accounts",
    "data": [{
      "e": "outboundAccountInfo",   // Event type
      "E": 1499405658849,           // Event height
      "B": [                        // Balances array
        {
          "a": "LTC",               // Asset
          "f": "17366.18538083",    // Free amount
          "l": "0.00000000",        // Locked amount
          "r": "0.00000000"         // Frozen amount
        },
        {
          "a": "BTC",
          "f": "10537.85314051",
          "l": "2.19464093",
          "r": "0.00000000"
        },
        {
          "a": "ETH",
          "f": "17902.35190619",
          "l": "0.00000000",
          "r": "0.00000000"
        }
      ]
    }]
}
```

### 3. Transfer

Return transfer updates if address is involved (as sender or receiver) in a transfer. Multisend is also covered

**Topic Name:** transfers | Stream: /ws/address

**Mainnet Connection Example:**

```javascript
    // URL connection
    const accountAndOrderAndTransfers = new WebSocket("wss://dex.binance.org/api/ws/bnb1z220ps26qlwfgz5dew9hdxe8m5malre3qy6zr9");

    // Or Subscribe method
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "transfers", address: "bnb1z220ps26qlwfgz5dew9hdxe8m5malre3qy6zr9" }));
    }
```

**Testnet Connection Example:**

```javascript
    // URL connection
    const accountAndOrderAndTransfers = new WebSocket("wss://testnet-dex.binance.org/api/ws/tbnb1c346qk3yfk89lzcacwzxsx402rv25gu6v40ghf");

    // Or Subscribe method
    const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "transfers", address: "tbnb1c346qk3yfk89lzcacwzxsx402rv25gu6v40ghf" }));
    }
```

**Received Payload:**

```javascript
{
  "stream": "transfers",
  "data": {
    "e":"outboundTransferInfo",                                                // Event type
    "E":12893,                                                                 // Event height
    "H":"0434786487A1F4AE35D49FAE3C6F012A2AAF8DD59EC860DC7E77123B761DD91B",    // Transaction hash
    "M":"123456789",                                                           // Transaction memo, added for BEP39
    "f":"bnb1z220ps26qlwfgz5dew9hdxe8m5malre3qy6zr9",                          // From addr
    "t":
      [{
        "o":"bnb1xngdalruw8g23eqvpx9klmtttwvnlk2x4lfccu",                      // To addr
        "c":[{                                                                 // Coins
          "a":"BNB",                                                           // Asset
          "A":"100.00000000"                                                   // Amount
          }]
      }]
  }
}

```

### 4. Trades

Returns individual trade updates.

**Topic Name:** trades | Stream: \<symbol\>@trades

**Mainnet Connection Example:**

```javascript
    // URL connection
    const trades = new WebSocket("wss://dex.binance.org/api/ws/BNB_BTCB-1DE@trades");

    // Or Subscribe method
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "trades", symbols: ["BNB_BTCB-1DE"] }));
    }
```

**Testnet Connection Example:**

```javascript
    // URL connection
    const trades = new WebSocket("wss://testnet-dex.binance.org/api/ws/BNB_USDT.B-B7C@trades");

    // Or Subscribe method
    const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "trades", symbols: ["BNB_USDT.B-B7C"] }));
    }
```

**Received Payload:**

```javascript
{
    "stream": "trades",
    "data": [{
        "e": "trade",       // Event type
        "E": 123456789,     // Event height
        "s": "BNB_BTC",     // Symbol
        "t": "12345",       // Trade ID
        "p": "0.001",       // Price
        "q": "100",         // Quantity
        "b": "88",          // Buyer order ID
        "a": "50",          // Seller order ID
        "T": 123456785,     // Trade time
        "sa": "bnb1me5u083m2spzt8pw8vunprnctc8syy64hegrcp", // SellerAddress
        "ba": "bnb1kdr00ydr8xj3ydcd3a8ej2xxn8lkuja7mdunr5" // BuyerAddress
        "tt": 1             //tiekertype 0: Unknown 1: SellTaker 2: BuyTaker 3: BuySurplus 4: SellSurplus 5: Neutral
    },
    {
        "e": "trade",       // Event type
        "E": 123456795,     // Event time
        "s": "BNB_BTC",     // Symbol
        "t": "12348",       // Trade ID
        "p": "0.001",       // Price
        "q": "100",         // Quantity
        "b": "88",          // Buyer order ID
        "a": "52",          // Seller order ID
        "T": 123456795,     // Trade time
        "sa": "bnb1me5u083m2spzt8pw8vunprnctc8syy64hegrcp", // SellerAddress
        "ba": "bnb1kdr00ydr8xj3ydcd3a8ej2xxn8lkuja7mdunr5" // BuyerAddress
        "tt": 1             //tiekertype 0: Unknown 1: SellTaker 2: BuyTaker 3: BuySurplus 4: SellSurplus 5: Neutral
    }]
}
```

### 5. Diff. Depth Stream

Order book price and quantity depth updates used to locally keep an order book.

**Topic Name:** marketDiff | Stream: \<symbol\>@marketDiff

**Mainnet Connection Example:**

```javascript
    // URL connection
    const marketDiff = new WebSocket("wss://dex.binance.org/api/ws/BNB_BTCB-1DE@marketDiff");

    // Or Subscribe method
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "marketDiff", symbols: ["BNB_BTCB-1DE"] }));
    }
```

**Testnet Connection Example:**

```javascript
    // URL connection
    const marketDiff = new WebSocket("wss://testnet-dex.binance.org/api/ws/BNB_USDT.B-B7C@marketDiff");

    // Or Subscribe method
    const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "marketDiff", symbols: ["BNB_USDT.B-B7C"] }));
    }
```

**Received Payload:**

```javascript
{
    "stream": "marketDiff",
    "data": {
        "e": "depthUpdate",   // Event type
        "E": 123456789,       // Event time
        "s": "BNB_BTC",       // Symbol
        "b": [                // Bids to be updated
            [
            "0.0024",         // Price level to be updated
            "10"              // Quantity
            ]
        ],
        "a": [                // Asks to be updated
            [
            "0.0026",         // Price level to be updated
            "100"             // Quantity
            ]
        ]
    }
}
```

### 6. Book Depth Streams

Top 20 (could extend to 100, 500, 1000) levels of bids and asks.

If you want subscribe topic marketDepth1000,your client must enable [compression](https://tools.ietf.org/html/rfc7692).

**Topic Name:** marketDepth | Stream: \<symbol\>@marketDepth

**Extension:** marketDepth100, marketDepth500, marketDepth1000 | Stream: \<symbol\>@marketDepth100, \<symbol\>@marketDepth500, \<symbol\>@marketDepth1000

**Mainnet Connection Example:**

```javascript
    // URL connection
    const marketDepth = new WebSocket("wss://dex.binance.org/api/ws/BNB_BTCB-1DE@marketDepth");

    // Or Subscribe method
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "marketDepth", symbols: ["BNB_BTCB-1DE"] }));
    }
```
**Testnet Connection Example:**

```javascript
    // URL connection
    const marketDepth = new WebSocket("wss://testnet-dex.binance.org/api/ws/BNB_USDT.B-B7C@marketDepth");

    // Or Subscribe method
    const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "marketDepth", symbols: ["BNB_USDT.B-B7C"] }));
    }
```

**Received Payload:**

```javascript
{
    "stream": "marketDepth",
    "data": {
        "lastUpdateId": 160,    // Last update ID
        "symbol": "BNB_BTC",    // symbol
        "bids": [               // Bids to be updated
            [
            "0.0024",           // Price level to be updated
            "10"                // Quantity
            ]
        ],
        "asks": [               // Asks to be updated
            [
            "0.0026",           // Price level to be updated
            "100"               // Quantity
            ]
        ]
    }
}
```

### 7. Kline/Candlestick Streams

The kline/candlestick stream pushes updates to the current klines/candlestick every second.

**Kline/Candlestick chart intervals:**

m -> minutes; h -> hours; d -> days; w -> weeks; M -> months

* 1m
* 3m
* 5m
* 15m
* 30m
* 1h
* 2h
* 4h
* 6h
* 8h
* 12h
* 1d
* 3d
* 1w
* 1M

**Topic Name:** kline_\<interval\> | Stream: \<symbol\>@kline_\<interval\>

**Mainnet Connection Example:**

```javascript
    // URL connection
    const kline = new WebSocket("wss://dex.binance.org/api/ws/BNB_BTCB-1DE@kline_1h");

    // Or Subscribe method
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "kline_1h", symbols: ["BNB_BTCB-1DE"] }));
    }
```

**Testnet Connection Example:**

```javascript
    // URL connection
    const kline = new WebSocket("wss://testnet-dex.binance.org/api/ws/BBNB_USDT.B-B7C@kline_1h");

    // Or Subscribe method
    const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "kline_1h", symbols: ["BNB_USDT.B-B7C"] }));
    }
```

**Received Payload:**

```javascript
{
  "stream": "kline_1m",
  "data": {
    "e": "kline",         // Event type
    "E": 123456789,       // Event time
    "s": "BNBBTC",        // Symbol
    "k": {
      "t": 123400000,     // Kline start time
      "T": 123460000,     // Kline close time
      "s": "ABC_0DX-BNB",      // Symbol
      "i": "1m",          // Interval
      "f": "100",         // First trade ID
      "L": "200",         // Last trade ID
      "o": "0.0010",      // Open price
      "c": "0.0020",      // Close price
      "h": "0.0025",      // High price
      "l": "0.0015",      // Low price
      "v": "1000",        // Base asset volume
      "n": 100,           // Number of trades
      "x": false,         // Is this kline closed?
      "q": "1.0000",      // Quote asset volume
    }
  }
}
```

### 8. Individual Symbol Ticker Streams

24hr Ticker statistics for a single symbol are pushed every second.

**Topic Name:** ticker | Stream: \<symbol\>@ticker

**Mainnet Connection Example:**

```javascript
    // URL connection
    const ticker = new WebSocket("wss://dex.binance.org/api/ws/BNB_BTCB-1D@ticker");

    // Or Subscribe method
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "ticker", symbols: ["BNB_BTCB-1D"] }));
    }
```

**Testnet Connection Example:**

```javascript
    // URL connection
    const ticker = new WebSocket("wss://testnet-dex.binance.org/api/ws/BBNB_USDT.B-B7C@ticker");

    // Or Subscribe method
    const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "ticker", symbols: ["BNB_USDT.B-B7C"] }));
    }
```

**Received Payload:**

"stream" and "data" wrapper object is ignored here

```javascript
{
  "stream": "ticker",
  "data": {
    "e": "24hrTicker",  // Event type
    "E": 123456789,     // Event time
    "s": "ABC_0DX-BNB",      // Symbol
    "p": "0.0015",      // Price change
    "P": "250.00",      // Price change percent
    "w": "0.0018",      // Weighted average price
    "x": "0.0009",      // Previous day's close price
    "c": "0.0025",      // Current day's close price
    "Q": "10",          // Close trade's quantity
    "b": "0.0024",      // Best bid price
    "B": "10",          // Best bid quantity
    "a": "0.0026",      // Best ask price
    "A": "100",         // Best ask quantity
    "o": "0.0010",      // Open price
    "h": "0.0025",      // High price
    "l": "0.0010",      // Low price
    "v": "10000",       // Total traded base asset volume
    "q": "18",          // Total traded quote asset volume
    "O": 0,             // Statistics open time
    "C": 86400000,      // Statistics close time
    "F": "0",           // First trade ID
    "L": "18150",       // Last trade Id
    "n": 18151          // Total number of trades
  }
}
```

### 9. All Symbols Ticker Streams

24hr Ticker statistics for a all symbols are pushed every second.

**Topic Name:** allTickers | Stream: $all@allTickers

**Mainnet Connection Example:**

```javascript
    // URL connection
    const allTickers = new WebSocket("wss://dex.binance.org/api/ws/$all@allTickers");

    // Or Subscribe method
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "allTickers", symbols: ["$all"] }));
    }
```


**Connection Example:**

```javascript
    // URL connection
    const allTickers = new WebSocket("wss://testnet-dex.binance.org/api/ws/$all@allTickers");

    // Or Subscribe method
    const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "allTickers", symbols: ["$all"] }));
    }
```

**Received Payload:**

```javascript
{
  "stream": "allTickers",
  "data": [
    {
      "e": "24hrTicker",  // Event type
      "E": 123456789,     // Event time
      "s": "ABC_0DX-BNB",      // Symbol
      "p": "0.0015",      // Price change
      "P": "250.00",      // Price change percent
      "w": "0.0018",      // Weighted average price
      "x": "0.0009",      // Previous day's close price
      "c": "0.0025",      // Current day's close price
      "Q": "10",          // Close trade's quantity
      "b": "0.0024",      // Best bid price
      "B": "10",          // Best bid quantity
      "a": "0.0026",      // Best ask price
      "A": "100",         // Best ask quantity
      "o": "0.0010",      // Open price
      "h": "0.0025",      // High price
      "l": "0.0010",      // Low price
      "v": "10000",       // Total traded base asset volume
      "q": "18",          // Total traded quote asset volume
      "O": 0,             // Statistics open time
      "C": 86400000,      // Statistics close time
      "F": "0",           // First trade ID
      "L": "18150",       // Last trade Id
      "n": 18151          // Total number of trades
    },
    {
      ...
    }]
}
```

### 10. Individual Symbol Mini Ticker Streams

A ticker for a single symbol is pushed every second.

**Topic Name:** miniTicker | Stream: \<symbol\>@miniTicker


**Mainnet Connection Example:**

```javascript
    // URL connection
    const miniTicker = new WebSocket("wss://dex.binance.org/api/ws/BNB_BTCB-1D@miniTicker");

    // Or Subscribe method
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "miniTicker", symbols: ["BNB_BTCB-1D"] }));
    }
```

**Testnet Connection Example:**

```javascript
    // URL connection
    const miniTicker = new WebSocket("wss://testnet-dex.binance.org/api/ws/BNB_USDT.B-B7C@miniTicker");

    // Or Subscribe method
    const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "miniTicker", symbols: ["BNB_USDT.B-B7C"] }));
    }
```

**Received Payload:**

```javascript
{
  "stream": "miniTicker",
  "data": {
    "e": "24hrMiniTicker",    // Event type
    "E": 123456789,           // Event time
    "s": "ABC_0DX-BNB",            // Symbol
    "c": "0.0025",            // Current day's close price
    "o": "0.0010",            // Open price
    "h": "0.0025",            // High price
    "l": "0.0010",            // Low price
    "v": "10000",             // Total traded base asset volume
    "q": "18",                // Total traded quote asset volume
  }
}
```

### 11. All Symbols Mini Ticker Streams

Array of 24hr Mini Ticker statistics for a all symbols pushed every second.

**Topic Name:** allMiniTickers | Stream: $all@allMiniTickers

**Mainnet Connection Example:**

```javascript
    // URL connection
    const miniTickers = new WebSocket("wss://dex.binance.org/api/ws/$all@allMiniTickers");

    // Or Subscribe method
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "allMiniTickers", symbols: ["$all"] }));
    }
```

**Testnet Connection Example:**

```javascript
    // URL connection
    const miniTickers = new WebSocket("wss://testnet-dex.binance.org/api/ws/$all@allMiniTickers");

    // Or Subscribe method
    const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "allMiniTickers", symbols: ["$all"] }));
    }
```

**Received Payload:**

```javascript
{
  "stream": "allMiniTickers",
  "data": [
    {
      "e": "24hrMiniTicker",      // Event type
      "E": 123456789,             // Event time
      "s": "ABC_0DX-BNB",              // Symbol
      "c": "0.0025",              // Current day's close price
      "o": "0.0010",              // Open price
      "h": "0.0025",              // High price
      "l": "0.0010",              // Low price
      "v": "10000",               // Total traded base asset volume
      "q": "18",                  // Total traded quote asset volume
    },
    {
      ...
    }]
}
```

### 12. Blockheight

Streams the latest block height.

**Topic Name:** blockheight | Stream: $all@blockheight

**Mainnet Connection Example:**

```javascript
    // URL connection
    const blockHeights = new WebSocket("wss://dex.binance.org/api/ws/$all@blockheight");

    // Or Subscribe method
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "blockheight", symbols: ["$all"] }));
    }
```

**Testnet Connection Example:**

```javascript
    // URL connection
    const blockHeights = new WebSocket("wss://testnet-dex.binance.org/api/ws/$all@blockheight");

    // Or Subscribe method
    const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "blockheight", symbols: ["$all"] }));
    }
```

**Received Payload:**

```javascript
{
  "stream": "blockheight",
  "data": {
    "h": 123456789,     // Block height
  }
}
```
