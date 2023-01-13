# 웹 소켓 스트림

### 1. 주문

개인 주문 업데이트를 반환합니다.

예시는 JavaScript로 작성되었습니다.

**주제 이름:** orders | 스트림: /ws/address

**메인넷 연결 예시:**

```javascript
    // URL connection
    const accountAndOrderAndTransfers = new WebSocket("wss://dex.binance.org/api/ws/bnb1m4m9etgf3ca5wpgkqe5nr6r33a4ynxfln3yz4v");

    // Or Subscribe method
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "orders", address: "bnb1m4m9etgf3ca5wpgkqe5nr6r33a4ynxfln3yz4v" }));
    }
```

**테스트넷 연결 예시:**

```javascript
    // URL connection
    const accountAndOrderAndTransfers = new WebSocket("wss://testnet-dex.binance.org/api/ws/tbnb1qtuf578qs9wfl0wh3vs0r5nszf80gvxd28hkrc");

    // Or Subscribe method
    const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "orders", address: "tbnb1qtuf578qs9wfl0wh3vs0r5nszf80gvxd28hkrc" }));
    }
```

**수신된 페이로드:**

```javascript
  {
    "stream": "orders",
    "data": [{
        "e": "executionReport",        // 이벤트 유형
        "E": 1499405658658,            // 이벤트 높이
        "s": "ETH_BTC",                // 심볼
        "S": 1,                        // 사이드, 1은 구매; 2는 판매
        "o": 2,                        // 주문 유형, 2 제한 주문 (현재는 2만 가능)
        "f": 1,                        // 시간 제한,  1 for Good Till Expire (GTE); 3 for Immediate Or Cancel (IOC)
        "q": "1.00000000",             // 주문 수량
        "p": "0.10264410",             // 주문 가격
        "x": "NEW",                    // 현재 실행 유형
        "X": "Ack",                    // 현재 주문 상태: Ack, Canceled, Expired, IocNoFill, PartialFill, FullyFill, FailedBlocking, FailedMatching, Unknown
        "i": "91D9...7E18-2317",       // 주문 ID
        "l": "0.00000000",             // 최종 실행된 수량
        "z": "0.00000000",             // 누적충전수량
        "L": "0.00000000",             // 최종 실행 가격
        "n": "10000BNB",               // 주어진 블록에서 모든 사용자 거래 커미션 비. 각 주문에 대해 표시되지만 한 번에 청구됩니다.
                                       //수수료는 하나의 심볼로 이뤄질 수 있습니다, 예: "10000BNB"
                                       // "BNB"로 모든 수수료를 못 낼 경우 다양한 심볼을 사용할 수 있습니다, 예: "1.00000000BNB;0.00001000BTC;0.00050000ETH"
        "T": 1499405658657,            // 트랜잭션 시간
        "t": "TRD1",                   // 거래 ID
        "O": 1499405658657,            // 주문 생성 시간
    },
    {
        "e": "executionReport",        // 이벤트 유형
        "E": 1499405658658,            // 이벤트 높이
        "s": "ETH_BNB",                // 심볼
        "S": "BUY",                    // 사이드
        "o": "LIMIT",                  // 주문 유형
        "f": "GTE",                    // 시간 제한
        "q": "1.00000000",             // 주문 수량
        "p": "0.10264410",             // 주문 가격
        "x": "NEW",                    // 현재 실행 유형
        "X": "Ack",                    // 현재 주문 상태
        "i": 4293154,                  // 주문 ID
        "l": "0.00000000",             // 최종 실행된 수량
        "z": "0.00000000",             // 누적충전수량
        "L": "0.00000000",             // 최종 실행 가격
        "n": "10000BNB",               // 주어진 블록에서 모든 사용자 거래 커미션 비. 각 주문에 대해 표시되지만 한 번에 청구됩니다.
                                        //수수료는 하나의 심볼로 이뤄질 수 있습니다, 예: "10000BNB"
                                        // "BNB"로 모든 수수료를 못 낼 경우 다양한 심볼을 사용할 수 있습니다, 예: "1.00000000BNB;0.00001000BTC;0.00050000ETH"
        "T": 1499405658657,            // 트랜잭션 시간
        "t": "TRD2",                   // 거래 ID
        "O": 1499405658657,            // 주문 생성 시간
      }]
  }
```

### 2. 계정

어카운트 업데이트를 반환합니다.

**주제 이름:** accounts | 스트림: /ws/address

**메인넷 연결 예시:**

```javascript
    // URL connection
    const accountAndOrderAndTransfers = new WebSocket("wss://dex.binance.org/api/ws/bnb1m4m9etgf3ca5wpgkqe5nr6r33a4ynxfln3yz4v");

    // Or Subscribe method
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "accounts", address: "bnb1m4m9etgf3ca5wpgkqe5nr6r33a4ynxfln3yz4v" }));
    }
```


**테스트넷 연결 예시:**

```javascript
    // URL connection
    const accountAndOrderAndTransfers = new WebSocket("wss://testnet-dex.binance.org/api/ws/tbnb1qtuf578qs9wfl0wh3vs0r5nszf80gvxd28hkrc");

    // Or Subscribe method
    const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "accounts", address: "tbnb1qtuf578qs9wfl0wh3vs0r5nszf80gvxd28hkrc" }));
    }
```

**수신된 페이로드:**

```javascript
{
    "stream": "accounts",
    "data": [{
      "e": "outboundAccountInfo",   // 이벤트 유형
      "E": 1499405658849,           // 이벤트 높이
      "B": [                        // 잔고 배열
        {
          "a": "LTC",               // 자산
          "f": "17366.18538083",    // 자유 금액
          "l": "0.00000000",        // 잠긴 금액
          "r": "0.00000000"         // 동결 금액
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

### 3. 전송

주소가 전송에 참여했을 시(송신 및 수신) 전송 업데이트를 반환합니다. 다중 전송(Multisend)도 다룹니다.

**주제 이름:** transfers | 스트림: /ws/address

**메인넷 연결 예시:**

```javascript
    // URL connection
    const accountAndOrderAndTransfers = new WebSocket("wss://dex.binance.org/api/ws/bnb1z220ps26qlwfgz5dew9hdxe8m5malre3qy6zr9");

    // Or Subscribe method
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "transfers", address: "bnb1z220ps26qlwfgz5dew9hdxe8m5malre3qy6zr9" }));
    }
```

**테스트넷 연결 예시:**

```javascript
    // URL connection
    const accountAndOrderAndTransfers = new WebSocket("wss://testnet-dex.binance.org/api/ws/tbnb1c346qk3yfk89lzcacwzxsx402rv25gu6v40ghf");

    // Or Subscribe method
    const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "transfers", address: "tbnb1c346qk3yfk89lzcacwzxsx402rv25gu6v40ghf" }));
    }
```

**수신된 페이로드:**

```javascript
{
  "stream": "transfers",
  "data": {
    "e":"outboundTransferInfo",                                                // 이벤트 유형
    "E":12893,                                                                 // 이벤트 높이
    "H":"0434786487A1F4AE35D49FAE3C6F012A2AAF8DD59EC860DC7E77123B761DD91B",    // 트랜잭션 해시
    "M":"123456789",                                                           // 트랜잭션 메모 (BEP39 위해 추가)
    "f":"bnb1z220ps26qlwfgz5dew9hdxe8m5malre3qy6zr9",                          // 발신 주소
    "t":
      [{
        "o":"bnb1xngdalruw8g23eqvpx9klmtttwvnlk2x4lfccu",                      // 수신 주소
        "c":[{                                                                 // 코인들
          "a":"BNB",                                                           // 자산
          "A":"100.00000000"                                                   // 규모
          }]
      }]
  }
}

```

### 4. 거래

개인 거래 업데이트를 반환합니다Returns individual trade updates.

**주제 이름:** trades | 스트림: \<symbol\>@trades

**메인넷 연결 예시:**

```javascript
    // URL connection
    const trades = new WebSocket("wss://dex.binance.org/api/ws/BNB_BTCB-1DE@trades");

    // Or Subscribe method
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "trades", symbols: ["BNB_BTCB-1DE"] }));
    }
```

**테스트넷 연결 예시:**

```javascript
    // URL connection
    const trades = new WebSocket("wss://testnet-dex.binance.org/api/ws/BNB_USDT.B-B7C@trades");

    // Or Subscribe method
    const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "trades", symbols: ["BNB_USDT.B-B7C"] }));
    }
```

**수신된 페이로드:**

```javascript
{
    "stream": "trades",
    "data": [{
        "e": "trade",       // 이벤트 유형
        "E": 123456789,     // 이벤트 높이
        "s": "BNB_BTC",     // 심볼
        "t": "12345",       // 거래 ID
        "p": "0.001",       // 가격
        "q": "100",         // 수량
        "b": "88",          // 구매자 주문 ID
        "a": "50",          // 판매자 주문 ID
        "T": 123456785,     // 거래 시간
        "sa": "bnb1me5u083m2spzt8pw8vunprnctc8syy64hegrcp", // SellerAddress (판매자 주소)
        "ba": "bnb1kdr00ydr8xj3ydcd3a8ej2xxn8lkuja7mdunr5" // BuyerAddress (구매자 주소)
        "tt": 1             // 티커 타입 0: Unknown 1: SellTaker 2: BuyTaker 3: BuySurplus 4: SellSurplus 5: Neutral
    },
    {
        "e": "trade",       // 이벤트 유형
        "E": 123456795,     // 이벤트 시간
        "s": "BNB_BTC",     // 심볼
        "t": "12348",       // 거래 ID
        "p": "0.001",       // 가격
        "q": "100",         // 수량
        "b": "88",          // 구매자 주문 ID
        "a": "52",          // 판매자 주문 ID
        "T": 123456795,     // 거래 시간
        "sa": "bnb1me5u083m2spzt8pw8vunprnctc8syy64hegrcp", // SellerAddress (판매자 주소)
        "ba": "bnb1kdr00ydr8xj3ydcd3a8ej2xxn8lkuja7mdunr5" // BuyerAddress (구매자 주소)
        "tt": 1             // 티커 타입 0: Unknown 1: SellTaker 2: BuyTaker 3: BuySurplus 4: SellSurplus 5: Neutral
    }]
}
```

### 5. Diff. 규모 스트림

오더 북 가격과 수량 규모 업데이트는 로컬에서 오더 북을 유지하기 위해 사용합니다.

**주제 이름:** marketDiff | 스트림: \<symbol\>@marketDiff

**메인넷 연결 예시:**

```javascript
    // URL connection
    const marketDiff = new WebSocket("wss://dex.binance.org/api/ws/BNB_BTCB-1DE@marketDiff");

    // Or Subscribe method
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "marketDiff", symbols: ["BNB_BTCB-1DE"] }));
    }
```

**테스트넷 연결 예시:**

```javascript
    // URL connection
    const marketDiff = new WebSocket("wss://testnet-dex.binance.org/api/ws/BNB_USDT.B-B7C@marketDiff");

    // Or Subscribe method
    const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "marketDiff", symbols: ["BNB_USDT.B-B7C"] }));
    }
```

**수신된 페이로드:**

```javascript
{
    "stream": "marketDiff",
    "data": {
        "e": "depthUpdate",   // 이벤트 유형
        "E": 123456789,       // 이벤트 시간
        "s": "BNB_BTC",       // 심볼
        "b": [                // 업데이트 될 매수
            [
            "0.0024",         // 업데이트 될 가격 레벨
            "10"              // 수량
            ]
        ],
        "a": [                // 업데이트 될 매도
            [
            "0.0026",         // 업데이트 될 가격 레벨
            "100"             // 수량
            ]
        ]
    }
}
```

### 6. 오더북 규모 스트림

상위 20(100, 500, 1000으로 확장 가능합니다)레벨의 구매와 판매 주문입니다.

marketDepth1000 주제를 구독하고 싶으면, 클라이언트가 [압축(compression)](https://tools.ietf.org/html/rfc7692)을 활성화 해야 합니다.

**주제 이름:** marketDepth | 스트림: \<symbol\>@marketDepth

**확장:** marketDepth100, marketDepth500, marketDepth1000 | 스트림: \<symbol\>@marketDepth100, \<symbol\>@marketDepth500, \<symbol\>@marketDepth1000

**메인넷 연결 예시:**

```javascript
    // URL connection
    const marketDepth = new WebSocket("wss://dex.binance.org/api/ws/BNB_BTCB-1DE@marketDepth");

    // Or Subscribe method
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "marketDepth", symbols: ["BNB_BTCB-1DE"] }));
    }
```
**테스트넷 연결 예시:**

```javascript
    // URL connection
    const marketDepth = new WebSocket("wss://testnet-dex.binance.org/api/ws/BNB_USDT.B-B7C@marketDepth");

    // Or Subscribe method
    const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "marketDepth", symbols: ["BNB_USDT.B-B7C"] }));
    }
```

**수신된 페이로드:**

```javascript
{
    "stream": "marketDepth",
    "data": {
        "lastUpdateId": 160,    // 최근 업데이트 ID
        "symbol": "BNB_BTC",    // 심볼
        "bids": [               // 업데이트 될 매수
            [
            "0.0024",           // 업데이트 될 가격 레벨
            "10"                // 수량
            ]
        ],
        "asks": [               // 업데이트 될 매도
            [
            "0.0026",           // 업데이트 될 가격 레벨
            "100"               // 수량
            ]
        ]
    }
}
```

### 7. 클리인/캔들스틱 스트림

클라인/캔들스틱(Kline/Candlestick) 스트림은 매 초마다 현재 클라인/캔들스틱을 업데이트합니다.

**Kline/Candlestick 차트 주기:**

m -> 분; h -> 시간; d -> 일; w -> 주; M -> 월

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

**주제 이름:** kline_\<interval\> | 스트림: \<symbol\>@kline_\<interval\>

**메인넷 연결 예시:**

```javascript
    // URL connection
    const kline = new WebSocket("wss://dex.binance.org/api/ws/BNB_BTCB-1DE@kline_1h");

    // Or Subscribe method
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "kline_1h", symbols: ["BNB_BTCB-1DE"] }));
    }
```

**테스트넷 연결 예시:**

```javascript
    // URL connection
    const kline = new WebSocket("wss://testnet-dex.binance.org/api/ws/BBNB_USDT.B-B7C@kline_1h");

    // Or Subscribe method
    const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "kline_1h", symbols: ["BNB_USDT.B-B7C"] }));
    }
```

**수신된 페이로드:**

```javascript
{
  "stream": "kline_1m",
  "data": {
    "e": "kline",         // 이벤트 유형
    "E": 123456789,       // 이벤트 시간
    "s": "BNBBTC",        // 심볼
    "k": {
      "t": 123400000,     // 클라인 시작 시간
      "T": 123460000,     // 클라인 종료 시간
      "s": "ABC_0DX-BNB",      // 심볼
      "i": "1m",          // 주기
      "f": "100",         // 첫 거래 ID
      "L": "200",         // 최종 거래 ID
      "o": "0.0010",      // 희망 가격
      "c": "0.0020",      // 종가
      "h": "0.0025",      // 최고 가격
      "l": "0.0015",      // 최저 가격
      "v": "1000",        // 기초 자산 규모
      "n": 100,           // 거래 개수
      "x": false,         // 클라인 종료 여부
      "q": "1.0000",      // 견적 자산 규모
    }
  }
}
```

### 8. 개별 심볼 티커 스트림

개별 심볼의 24시간 통계가 매 초마다 푸시됩니다.

**주제 이름:** ticker | 스트림: \<symbol\>@ticker

**메인넷 연결 예시:**

```javascript
    // URL connection
    const ticker = new WebSocket("wss://dex.binance.org/api/ws/BNB_BTCB-1D@ticker");

    // Or Subscribe method
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "ticker", symbols: ["BNB_BTCB-1D"] }));
    }
```

**테스트넷 연결 예시:**

```javascript
    // URL connection
    const ticker = new WebSocket("wss://testnet-dex.binance.org/api/ws/BBNB_USDT.B-B7C@ticker");

    // Or Subscribe method
    const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "ticker", symbols: ["BNB_USDT.B-B7C"] }));
    }
```

**수신된 페이로드:**

"stream"과 "data" wrapper 객체는 무시됩니다

```javascript
{
  "stream": "ticker",
  "data": {
    "e": "24hrTicker",  // 이벤트 유형
    "E": 123456789,     // 이벤트 시간
    "s": "ABC_0DX-BNB",      // 심볼
    "p": "0.0015",      // 가격 변화
    "P": "250.00",      // 가격 변화율
    "w": "0.0018",      // 가중 평균 가격
    "x": "0.0009",      // 전일 종가
    "c": "0.0025",      // 오늘 종가
    "Q": "10",          // 마감 거래 수량
    "b": "0.0024",      // 최고 매수 가격
    "B": "10",          // 최고 매수 수량
    "a": "0.0026",      // 최고 매도 가격
    "A": "100",         // 최고 매도 수량
    "o": "0.0010",      // 희망 가격
    "h": "0.0025",      // 최고 가격
    "l": "0.0010",      // 최저 가격
    "v": "10000",       // 총거래기준자산량
    "q": "18",          // 총거래견젹자산량
    "O": 0,             // 통계 시작 시간
    "C": 86400000,      // 통계 종료 시간
    "F": "0",           // 첫 거래 ID
    "L": "18150",       // 최종 거래 ID
    "n": 18151          // 총 거래량
  }
}
```

### 9. 모든 심볼 티커 스트림

모든 심볼의 24시간 통계가 매 초마다 푸시됩니다.

**주제 이름:** allTickers | 스트림: $all@allTickers

**메인넷 연결 예시:**

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

**수신된 페이로드:**

```javascript
{
  "stream": "allTickers",
  "data": [
    {
      "e": "24hrTicker",  // 이벤트 유형
      "E": 123456789,     // 이벤트 시간
      "s": "ABC_0DX-BNB",      // 심볼
      "p": "0.0015",      // 가격 변화
      "P": "250.00",      // 가격 변화율
      "w": "0.0018",      // 가중 평균 가격
      "x": "0.0009",      // 전일 종가
      "c": "0.0025",      // 오늘 종가
      "Q": "10",          // 마감 거래 수량
      "b": "0.0024",      // 최고 매수 가격
      "B": "10",          // 최고 매수 수량
      "a": "0.0026",      // 최고 매도 가격
      "A": "100",         // 최고 매도 수량
      "o": "0.0010",      // 희망 가격
      "h": "0.0025",      // 최고 가격
      "l": "0.0010",      // 최저 가격
      "v": "10000",       // 총거래기준자산량
      "q": "18",          // 총거래견젹자산량
      "O": 0,             // 통계 시작 시간
      "C": 86400000,      // 통계 종료 시간
      "F": "0",           // 첫 거래 ID
      "L": "18150",       // 최종 거래 ID
      "n": 18151          // 총 거래량
    },
    {
      ...
    }]
}
```

### 10. 개별 심볼 미니 티커 스트림

개별 심볼의 티커가 매 초마다 푸시됩니다.

**주제 이름:** miniTicker | 스트림: \<symbol\>@miniTicker


**메인넷 연결 예시:**

```javascript
    // URL connection
    const miniTicker = new WebSocket("wss://dex.binance.org/api/ws/BNB_BTCB-1D@miniTicker");

    // Or Subscribe method
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "miniTicker", symbols: ["BNB_BTCB-1D"] }));
    }
```

**테스트넷 연결 예시:**

```javascript
    // URL connection
    const miniTicker = new WebSocket("wss://testnet-dex.binance.org/api/ws/BNB_USDT.B-B7C@miniTicker");

    // Or Subscribe method
    const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "miniTicker", symbols: ["BNB_USDT.B-B7C"] }));
    }
```

**수신된 페이로드:**

```javascript
{
  "stream": "miniTicker",
  "data": {
    "e": "24hrMiniTicker",    // 이벤트 유형
    "E": 123456789,           // 이벤트 시간
    "s": "ABC_0DX-BNB",            // 심볼
    "c": "0.0025",            // 오늘 종가
    "o": "0.0010",            // 희망 가격
    "h": "0.0025",            // 최고 가격
    "l": "0.0010",            // 최저 가격
    "v": "10000",             // 총거래기준자산량
    "q": "18",                // 총거래견젹자산량
  }
}
```

### 11. 모든 심볼 미니 티커 스트림

모든 심볼에 대한 24시간 미니 티커 배열이 매 초마다 푸시됩니다.

**주제 이름:** allMiniTickers | 스트림: $all@allMiniTickers

**메인넷 연결 예시:**

```javascript
    // URL connection
    const miniTickers = new WebSocket("wss://dex.binance.org/api/ws/$all@allMiniTickers");

    // Or Subscribe method
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "allMiniTickers", symbols: ["$all"] }));
    }
```

**테스트넷 연결 예시:**

```javascript
    // URL connection
    const miniTickers = new WebSocket("wss://testnet-dex.binance.org/api/ws/$all@allMiniTickers");

    // Or Subscribe method
    const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "allMiniTickers", symbols: ["$all"] }));
    }
```

**수신된 페이로드:**

```javascript
{
  "stream": "allMiniTickers",
  "data": [
    {
      "e": "24hrMiniTicker",      // 이벤트 유형
      "E": 123456789,             // 이벤트 시간
      "s": "ABC_0DX-BNB",              // 심볼
      "c": "0.0025",              // 오늘 종가
      "o": "0.0010",              // 희망 가격
      "h": "0.0025",              // 최고 가격
      "l": "0.0010",              // 최저 가격
      "v": "10000",               // 총거래기준자산량
      "q": "18",                  // 총거래견젹자산량
    },
    {
      ...
    }]
}
```

### 12. 블록 높이

최신 블록 높이를 스트림합니다.

**주제 이름:** blockheight | 스트림: $all@blockheight

**메인넷 연결 예시:**

```javascript
    // URL connection
    const blockHeights = new WebSocket("wss://dex.binance.org/api/ws/$all@blockheight");

    // Or Subscribe method
    const conn = new WebSocket("wss://dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "blockheight", symbols: ["$all"] }));
    }
```

**테스트넷 연결 예시:**

```javascript
    // URL connection
    const blockHeights = new WebSocket("wss://testnet-dex.binance.org/api/ws/$all@blockheight");

    // Or Subscribe method
    const conn = new WebSocket("wss://testnet-dex.binance.org/api/ws");
    conn.onopen = function(evt) {
        conn.send(JSON.stringify({ method: "subscribe", topic: "blockheight", symbols: ["$all"] }));
    }
```

**수신된 페이로드:**

```javascript
{
  "stream": "blockheight",
  "data": {
    "h": 123456789,     // 블록 높이
  }
}
```
