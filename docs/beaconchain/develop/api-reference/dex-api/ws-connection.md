# 웹 소켓 연결

DEX는 표준 웹 소켓 연결을 통해 여러 데이터 스트림을 제공하며, 현대 웹 브라우저 및 서버 측 웹 소켓 라이브러리에서 사용할 수 있습니다.

- 메인넷의 기본 엔트포인트는: **wss://dex.binance.org/api/**.
- 테스트넷의 기본 엔트포인트는: **wss://testnet-dex.binance.org/api/**.
- 각 연결은 하나의 스트림을 소비하거나 더 복잡한 앱을 위해 하나의 연결이 다중화 될 수 있습니다.
- 스트림 이름의 모든 기호는 소문자입니다.

스트림 이름은 URL에 제공되거나 **아니면** 스트림을 언제든지 소비하기 위해 하나의 연결로 `구독`할 수 있는 매커니즘이 있습니다.

참고: 연결된 후, 웹 소켓 서버는 30초마다 클라이언트에게 핑 프레임을 전송합니다. 클라이언트는 제 시간 안에 퐁 프레임으로 응답해야 합니다(대부분 현대 브라우저에 도입 되었지만, 프로그램 사용자들은 웹 소켓이 다음 기능을 지원하는지 알고 있어야 합니다). 답장하지 못 한다면, 연결이 끊기게 됩니다.

각 방법에 대한 예시는 JavaScript로 제공됩니다:

### 방법 1: URL에서 스트림 이름으로 연결하기

이 방법을 통해 데이터 스트림에 연결되는 스트림 이름이 URL에 명시됩니다:

- 단일 스트림 `/ws/<streamName>`
- 결합 스트림 `/stream?streams=<streamName1>/<streamName2>/<streamName3>` (등.)


**메인넷 예시:** 스트림 이름이 URL에 제공 될 시 스트림에 연결하는 다양한 방법:

```javascript
  // for personal streams, ex: Account & Transfers
  const accountAndOrdersFeeds = new WebSocket("wss://dex.binance.org/api/ws/<USER_ADDRESS>");

  // for all symbols
  const blockHeight = new WebSocket("wss://dex.binance.org/api/ws/$all@blockheight");
```

**테스트넷 예시:** 스트림 이름이 URL에 제공 될 시 스트림에 연결하는 다양한 방법:

```javascript
  // for personal streams, ex: Account & Transfers
  const accountAndOrdersFeeds = new WebSocket("wss://testnet-dex.binance.org/api/ws/<USER_ADDRESS>");

  // for all symbols
  const blockHeight = new WebSocket("wss://testnet-dex.binance.org/api/ws/$all@blockheight");
```

### 방법 2: 스트림 온디맨드(On-Demand) 구독하기

해당 메서드로, 스트림은 구독 및 구독 취소 명령어를 통해 소비됩니다. 하나의 웹 소켓 연결을 통해 보내집니다.

**Note: 하나의 연결은 한 주소의 구독만 허용됩니다.**

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

연결에 성공하면 다양한 주제에 대해 구독/해제가 가능합니다.

**예시:** 주문 이벤트와 시장 깊이 업데이트를 구독하려면, 다음과 같은 `subscribe` 페이로드를 가진 메세지를 전송합니다:

```javascript
    const conn = new WebSocket("wss://dex.binance.org/api/ws/bnb17zw3mqjx64x4dxtwqjqz5tssql6qp2m0cgv06x");
    conn.onopen = function(evt) {
        // for personal topics such as accounts & transfers, an `address` is required
        // Note: one connection is only allowed to subscribe to one address.
        // If you subscribe to a new address, regardless of whether the topic is new, the subscriptions for the previous addresses will be removed.
        conn.send(JSON.stringify({ method: "subscribe", topic: "transfers", address: "bnb17zw3mqjx64x4dxtwqjqz5tssql6qp2m0cgv06x" }));
    }
```

**예시:** 주문 이벤트 구독을 해제하려면, 페이로드와 다음과 같은 소켓 메세지를 전송하세요:

```javascript
    // unsubscribe from topic
    conn.send(JSON.stringify({ method: "unsubscribe", topic: "transfers" }));
```

**예시:** 연결 기간을 늘리려면, `keepAlive` 메서드를 사용하며 페이로드와 다음과 같은 메세지를 전송하세요:

```javascript
    // This will extend the connection time to another 30 minutes
    // It's good to send this message every 30 minutes to maintain the connection life
    conn.send(JSON.stringify({ method: "keepAlive" }));
```

**예시:** 연결을 종료하려면, 페이로드와 다음과 같은 소켓 메세지를 전송하세요:

```javascript
    // Connections will auto close after 30 - 60 minutes if no "keepAlive" messages received
    // Connections with no subscriptions will be closed, regardless the keepAlive messages.
    conn.send(JSON.stringify({ method: "close" }));
```
