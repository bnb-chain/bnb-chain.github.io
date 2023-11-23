# WebSocket Streams

### 1. Account

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

### 2. Transfer

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

### 3. Blockheight

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

**Received Payload:**

```javascript
{
  "stream": "blockheight",
  "data": {
    "h": 123456789,     // Block height
  }
}
```
