# WebSocket Connections

The DEX exposes several data streams over standard WebSocket connections, which can be consumed by modern web browsers and server-side WebSocket libraries.

- The base endpoint for mainnet is: **wss://dex.binance.org/api/**.
- The base endpoint for testnet is: **wss://testnet-dex.binance.org/api/**.
- Each connection can consume a single stream or multiple streams may be multiplexed through one connection for more complex apps.
- All symbols in stream names are lowercase.

Stream names may be provided in the URL **or** there is a mechanism to `subscribe` to consume streams on demand through one connection.

Note: Once the connection is established, the websocket server will send ping frame to the client every 30 seconds. The client should reply with pong frame in time (this has already been implemented by most modern browsers, but programmatical users need to be aware of whether your websocket library supports this), otherwise, the connection might be closed.

Examples of each of these methods are provided below in JavaScript:

### Method 1: Connect with stream names in the URL

Using this method, stream names are specified in the URLs used to connect to the data streams:

- Single streams `/ws/<streamName>`
- Combined streams `/stream?streams=<streamName1>/<streamName2>/<streamName3>` (etc.)


**Mainnet Example:** Various methods of connecting to streams where stream names are provided in URLs:

```javascript
  // for personal streams, ex: Account & Orders & Transfers
  const accountAndOrdersFeeds = new WebSocket("wss://dex.binance.org/api/ws/<USER_ADDRESS>");

  // for single streams
  const tradesFeeds = new WebSocket("wss://dex.binance.org/api/ws/<symbol>@trades");
  const marketFeeds = new WebSocket("wss://dex.binance.org/api/ws/<symbol>@marketDiff");
  const deltaFeeds = new WebSocket("wss://dex.binance.org/api/ws/<symbol>@marketDepth");
  ... etc

  // for all symbols
  const allTickers = new WebSocket("wss://dex.binance.org/api/ws/$all@allTickers");
  const allMiniTickers = new WebSocket("wss://dex.binance.org/api/ws/$all@allMiniTickers");
  const blockHeight = new WebSocket("wss://dex.binance.org/api/ws/$all@blockheight");

  // for combined streams, can combined a mixed symbols and streams
  const combinedFeeds = new WebSocket("wss://dex.binance.org/api/stream?streams=<symbol>@trades/<symbol>@marketDepth/<symbol>@marketDiff");
```

**Testnet Example:** Various methods of connecting to streams where stream names are provided in URLs:

```javascript
  // for personal streams, ex: Account & Orders & Transfers
  const accountAndOrdersFeeds = new WebSocket("wss://testnet-dex.binance.org/api/ws/<USER_ADDRESS>");

  // for single streams
  const tradesFeeds = new WebSocket("wss://testnet-dex.binance.org/api/ws/<symbol>@trades");
  const marketFeeds = new WebSocket("wss://testnet-dex.binance.org/api/ws/<symbol>@marketDiff");
  const deltaFeeds = new WebSocket("wss://testnet-dex.binance.org/api/ws/<symbol>@marketDepth");
  ... etc

  // for all symbols
  const allTickers = new WebSocket("wss://testnet-dex.binance.org/api/ws/$all@allTickers");
  const allMiniTickers = new WebSocket("wss://testnet-dex.binance.org/api/ws/$all@allMiniTickers");
  const blockHeight = new WebSocket("wss://testnet-dex.binance.org/api/ws/$all@blockheight");

  // for combined streams, can combined a mixed symbols and streams
  const combinedFeeds = new WebSocket("wss://testnet-dex.binance.org/api/stream?streams=<symbol>@trades/<symbol>@marketDepth/<symbol>@marketDiff");
```

### Method 2: Subscribe to streams on demand

Using this method, streams are be consumed via subscribe and unsubscribe commands, sent through a single WebSocket connection.

**Note: one connection is only allowed to subscribe to one address.**

```javascript
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        // send Subscribe/Unsubscribe messages here (see below)
    }
    conn.onmessage = function(evt) {
        console.info('received data', evt.data);
    };
    conn.onerror = function(evt) {
        console.error('an error occurred', evt.data);
    };
```

After connecting successfully you can subscribe/unsubscribe to different topics.

**Example:** To subscribe to orders events and market depth updates, you should send a socket message with the `subscribe` payload as below:

```javascript
    const conn = new WebSocket("wss://dex.binance.org/api/ws/bnb17zw3mqjx64x4dxtwqjqz5tssql6qp2m0cgv06x");
    conn.onopen = function(evt) {
        // for personal topics such as accounts & orders & transfers, an `address` is required
        // Note: one connection is only allowed to subscribe to one address.
        // If you subscribe to a new address, regardless of whether the topic is new, the subscriptions for the previous addresses will be removed.
        conn.send(JSON.stringify({ method: "subscribe", topic: "orders", address: "bnb17zw3mqjx64x4dxtwqjqz5tssql6qp2m0cgv06x" }));

        // for data topics such as marketDepth, marketDelta, trades and ticker;
        // a list of symbols is required. Same message can be used to append new topic and/or symbols
        conn.send(JSON.stringify({ method: "subscribe", topic: "marketDepth", symbols: ["BNB_BTC","BNB_ETH"] }));
    }
```

**Example:** To unsubscribe from orders events, you should send a socket message with payloads as below:

```javascript
    // unsubscribe from topic
    conn.send(JSON.stringify({ method: "unsubscribe", topic: "orders" }));

    // unsubscribe from individual symbols
    conn.send(JSON.stringify({ method: "unsubscribe", topic: "marketDepth", symbols: ["BNB_BTC"] }));
```

**Example:** To extend connection life, you should send a a message with a payload using the `keepAlive` method:

```javascript
    // This will extend the connection time to another 30 minutes
    // It's good to send this message every 30 minutes to maintain the connection life
    conn.send(JSON.stringify({ method: "keepAlive" }));
```

**Example:** To close a connection, you should send a socket message with a payload as below:

```javascript
    // Connections will auto close after 30 - 60 minutes if no "keepAlive" messages received
    // Connections with no subscriptions will be closed, regardless the keepAlive messages.
    conn.send(JSON.stringify({ method: "close" }));
```
