---
sidebar_label: API
hide_table_of_contents: true
sidebar_position: 2
---

# BNB 월렛 API

바이낸스 익스텐션 지갑은 웹사이트 방문자들에게 `window.BinanceChain`을 통해 글로벌 API를 주입합니다.

이 API 명세는 널리 도입된 API 메타마스크를 많이 참고하였습니다. Web3 개발자들은 쉽게 dApp을 바이낸스 익스텐션 지갑에 연결시킬 수 있습니다. 이 API들을 통해 웹사이트들은 사용자의 BNB 스마트 체인 주소를 요청하고, 사용자가 연결된 블록체인으로부터 데이터를 읽어오고, 사용자들이 메시지와 트랜잭션에 서명하도록 요청할 수 있습니다.

provider 객체 `window.BinanceChain`가 존재한다는 것은 비콘 체인/BNB 스마트 체인 사용자임을 나타냅니다.

이 익스텐션 지갑이 제공하는 API는 [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193)와 [MetaMask](https://docs.metamask.io/guide/ethereum-provider.html)에서 규정하는 API 및 레거시에 크게 의존하는 것들입니다.

## 개발 경과
현재 (버전 1.112.8) 바이낸스 익스텐션 지갑은 자체적으로 비콘 체인을 지원하고 있으며, dApp 개발자들이 비콘 체인과 상호작용할 수 있도록 일련의 API들을 공개할 계획입니다. 결과적으로 [비컨 체인 자바스크립트 sdk에서 사용가능한 API](https://github.com/bnb-chain/javascript-sdk/tree/master/docs) 대부분이 사용 가능해질 것입니다.

현재 지원되는 것은 다음과 같습니다.
* [`transfer`](https://github.com/bnb-chain/javascript-sdk/tree/master/docs#transfer-tokens) 

## 메타마스크와의 차이점
!!! 경고

    메타마스크와 연동된 Web3 개발자로, 바이낸스 익스텐션 지갑과의 연동에 관심이 있는 경우 이 섹션을 읽어주세요.

### 페이지 내 주입된 객체

바이낸스 익스텐션 지갑과 메타마스크의 가장 큰 차이점은 웹 페이지에 `ethereum`(또는 `web3`)이 아닌 `BinanceChain`을 주입한다는 것입니다. 따라서 사용자는 두 개의 확장자를 동시에 유지할 수 있습니다.

### BinanceChain.request({method: "eth_sign", params: ["address", "message"])

우리는 표준 [`eth_sign`](https://eth.wiki/json-rpc/API#eth_sign) JSON-RPC 호출만 제공하는 반면, 메타마스크가 제공하는 완전한 복합 [signing data](https://docs.metamask.io/guide/signing-data.html#signing-data-with-metamask) API는 지원하지 않습니다.

메타마스크에서 이 요청에 대한 params의 `message` 항목은 16진수 keccak256 해시여야 합니다(아니면 API가 조용히 실패합니다 https://www.reddit.com/r/Metamask/comments/9wp7kj/eth_sign_not_working/). 반면 BNB 월렛에서는 web3 개발자들은 어떤 메시지도 일반 텍스트로 이 메서드에 전달할 수 있으며, 우리의 UI는 지갑 사용자에게 그대로 렌더링합니다.

### BinanceChain.request({method: "eth_accounts"})

이 API가 사용자의 승인 없이 호출되면 메타마스크는 빈 배열을 반환합니다. 반면 BNB 월렛에서는 지갑의 잠금을 해제하고 사용자가 연결된 주소를 반환하도록 요청합니다.

## 곧 다가올 변화

!!! 경고

    중요한 정보

    **2020년 11월 16일**에 메타마스크는 일부 web3 사이트에서 사용할 수 있는 provider API를 변경합니다.
    이러한 변화는 곧 있을 예정이지만, 지금 바로 이러한 변화에 대비할 수 있습니다.
    업데이트를 보려면 [이 GitHub 이슈](https://github.com/MetaMask/metamask-extension/issues/8077)를 참고하세요.

    이 구현에서 일부 API는 [Legacy API](#legacy-api)로 지원됩니다(예를 들어 메타마스크가 공식적으로 이를 폐지할 때까지 BinanceChain 객체에 `chainIdChanged`를 계속 구현합니다).

## 기본 사용법

규모가 있는 BNB 스마트 체인 웹 애플리케이션(일명 web3 사이트)이 작동하려면 다음과 같이 해야 합니다.

1. BNB 스마트 체인 제공자를 탐지합니다 (`window.BinanceChain`)
2. 사용자가 연결되어 있는 BNB 스마트 체인 네트워크를 감지합니다.
3. 사용자의 BNB 스마트 체인 계정을 가져옵니다.

위의 목록에서 `2`와 `3`을 수행하는 방법은 [Provider 부분 사용하기](#using-the-provider)의 예시를 참고할 수 있습니다.

제공자 API만 있으면 모든 기능을 갖춘 web3 애플리케이션을 만들 수 있습니다.

즉, 많은 개발자는 공급자를 직접 사용하는 대신 ethers나 web3.js와 같은 convenience 라이브러리를 사용합니다. 이 API에서 제공하는 것보다 더 높은 수준의 추상화가 필요한 경우 편의 라이브러리를 사용하는 것이 좋습니다.

오늘날 많은 dApp은 [web3-react](https://github.com/NoahZinsmeister/web3-react) 또는 [use-wallet](https://github.com/aragon/use-wallet)(web3-react 위에 구축됨)에서 제공하는 더 높은 레벨의 API를 기반으로 구축됩니다.

 * web3-react

[web3-react](https://github.com/NoahZinsmeister/web3-react) 라이브러리의 [AbstractConnector](https://github.com/NoahZinsmeister/web3-react/blob/v6/packages/abstract-connector/src/index.ts#L4) 인터페이스를 구현하는 작은 lib [bsc-connector](https://www.npmjs.com/package/@binance-chain/bsc-connector)을 만들었습니다. 다음과 같이 [injected-connector](https://github.com/NoahZinsmeister/web3-react/tree/v6/packages/injected-connector)와 함께 프로젝트에 추가할 수 있습니다: `yarn add @binance-chain/bsc-connector` 또는 `npm i @binance-chain/bsc-connector`.

```
import { BscConnector } from '@binance-chain/bsc-connector'

export const bsc = new BscConnector({
  supportedChainIds: [56, 97] // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported
})

// invoke method on bsc e.g.
await bsc.activate();
await bsc.getAccount();
await bsc.getChainId();
```

* use-wallet

use-wallet origin repo에 커스텀 web3-react 커넥터를 `UseWalletProvider`에 'inject(주입)'하는 것을 보여주는 [예시](https://github.com/aragon/use-wallet/tree/master/examples/binance-chain)가 있습니다:
```js
function App( ) {
  const { account, connect, reset, status } = useWallet()
  return (
    <div>
      <h1>Beacon Chain Connector</h1>
      {status === 'disconnected' ? (
        <button onClick={() => connect('bsc')}>Connect</button>
      ) : (
        <button onClick={() => reset()}>Disconnect</button>
      )}
      {account && <p>Connected as {account}</p>}
    </div>
  )
}

render(
  <UseWalletProvider
    connectors={ {
      bsc: {
        web3ReactConnector( ) {
          return new BscConnector( { supportedChainIds: [56, 97] } )
        },
        handleActivationError(err) {
          if (err instanceof UserRejectedRequestError) {
            return new ConnectionRejectedError()
          }
        },
      },
    } }
  >
  <App />
  </UseWalletProvider>,
  document.getElementById('root')
)

```
## 체인 ID

!!! 경고

    이 API는 사용자가 비콘 체인으로 전환할 경우 B비콘 체인의 체인 ID를 반환할 수도 있습니다. 가능한 반환값은 다음과 같습니다.
    
    현재로서는 `eth_chainId` RPC 메서드 보다 [`BinanceChain.chainId`](#ethereum-chainid) 속성 및 [`chainChanged`](#chainchanged) 이벤트를 선호해야 합니다.

    체인 ID 값은 아래 표에 따라 올바르게 포맷되어 있습니다.

    `eth_chainId`는 아래 표에 있는 체인에 대해 잘못된 형식의 (0 패딩된) 체인 ID를 반환합니다(예: `0x1` 대신 `0x01`). `eth_chainId` RPC 메서드의 수정 시기에 대한 자세한 내용은 [Upcoming Breaking Changes section](#upcoming-breaking-changes) 섹션을 참조하십시오.

    커스텀 RPC 엔드포인트는 영향을 받지 않으며, 사용자가 지정한 체인 ID를 항상 반환합니다.

바이낸스 익스텐션 지갑이 기본적으로 지원하는 BNB 스마트 체인의 ID입니다.

| Hex  | Decimal | 네트워크                                        |
| ---- | ------- | ---------------------------------------------- |
| 0x38 | 56      | BNB Smart Chain Main Network (bsc-mainnet) |
| 0x61 | 97      | BNB Smart Chain Test Network (bsc-testnet) |

이 API는 유저가 비컨 체인으로 전환하면 체인지 ID를 바환할 수 있다 가능성은 반값은:

| 체인 Id             | 네트워크                                  |
| -------------------- | ---------------------------------------- |
| Binance-Chain-Tigris | Beacon Chain Main Network (bbc-mainnet) |
| Binance-Chain-Ganges | Beacon Chain Test Network (bbc-testnet) |

## 속성

### BinanceChain.chainId

!!! 경고

    이 자산의 가치는 언제든지 변경될 수 있으며 전적으로 의존해서는 안 됩니다. 자세한 내용은 [`chainChanged`](#chainchanged) 이벤트를 참고하세요.

**참고:** 바이낸스 익스텐션 지갑 제공자의 체인 ID에 대한 중요한 정보는 [체인 ID 섹션](#chain-ids)을 참고하세요.


현재 체인 ID를 나타내는 16진수 문자열입니다.

### BinanceChain.autoRefreshOnNetworkChange

이 API의 소비자로서 [`chainChanged` event](#chainChanged)를 사용하여 체인 변경 사항을 처리하는 것은 여러분의 책임입니다.
그러지 않을 이유가 없다면 `chainChange`에서 페이지를 재로딩할 것을 권장합니다.

[MetaMask Doc](https://docs.metamask.io/guide/ethereum-provider.html#ethereum-autorefreshonnetworkchange)를 참고하세요. 유일한 차이점은 다른 객체를 주입했다는 것입니다.

이 행동을 비활성화하려면 제공자를 탐지한 직후 이 속성을 `false`로 설정하세요.

```javascript
BinanceChain.autoRefreshOnNetworkChange = false;
```

## 메서드

### BinanceChain.isConnected()

[MetaMask Doc](https://docs.metamask.io/guide/ethereum-provider.html#ethereum-isconnected)를 참고하세요. 유일한 차이점은 다른 객체를 주입했다는 것입니다.

```typescript
BinanceChain.isConnected(): boolean;
```

### BinanceChain.request(args)

[MetaMask Doc](https://docs.metamask.io/guide/ethereum-provider.html#ethereum-request-args)를 참고하세요. 유일한 차이점은 다른 객체를 주입했다는 것입니다.

이 메서드를 사용해 RPC API를 래팽했습니다. [the Ethereum wiki](https://eth.wiki/json-rpc/API#json-rpc-methods)를 참고하세요.

이 API의 중요한 메서드들은 다음과 같습니다:

- [`eth_accounts`](https://eth.wiki/json-rpc/API#eth_accounts)
- [`eth_call`](https://eth.wiki/json-rpc/API#eth_call)
- [`eth_getBalance`](https://eth.wiki/json-rpc/API#eth_getBalance)
- [`eth_sendTransaction`](https://eth.wiki/json-rpc/API#eth_sendTransaction)
- [`eth_sign`](https://eth.wiki/json-rpc/API#eth_sign)

```typescript
interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

BinanceChain.request(args: RequestArguments): Promise<unknown>;
```

#### 예시

아래 코드 예시는 [메타마스크 예시](https://docs.metamask.io/guide/ethereum-provider.html#example)와 같습니다. 유일한 차이점은 다른 객체를 주입했다는 것입니다.

```javascript
params: [
  {
    from: '0xb60e8dd61c5d32be8058bb8eb970870f07233155',
    to: '0xd46e8dd67c5d32be8058bb8eb970870f07244567',
    gas: '0x76c0', // 30400
    gasPrice: '0x9184e72a000', // 10000000000000
    value: '0x9184e72a', // 2441406250
    data:
      '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675',
  },
];

BinanceChain
  .request({
    method: 'eth_sendTransaction',
    params,
  })
  .then((result) => {
    // The result varies by by RPC method.
    // For example, this method will return a transaction hash hexadecimal string on success.
  })
  .catch((error) => {
    // If the request fails, the Promise will reject with an error.
  });
```

### BinanceChain.bnbSign(address: string, message: string): Promise<{publicKey: string, signature: string}>

*이 API에 대한 예시를 준비했습니다. 자세한 내용은 https://github.com/bnb-chain/js-eth-personal-sign-examples을 참고하세요.*

`eth_sign`처럼 사용자가 임의 메시지에 서명하여 이더리움 주소에 대한 제어권을 가지고 있는지 확인할 수 있게 해줍니다. 우리는 dApp 개발자가 비콘 체인(BC) 및 BNB 스마트 체인(BSC)에 대한 임의 메시지 서명을 요청할 수 있도록 이 메서드를 제공합니다.

`address` 파라미터가 비콘 체인 주소(`bnb` 또는 `tbnb`로 시작)인 경우, 메시지의 **sha256 해시를 계산**하고 사용자가 BNB 비콘 체인 주소 개인 키로 해시에 서명하도록 합니다. 참고: 비콘 체인은 이더리움과 동일한 타원 곡선(`secp256k1`)을 사용합니다.

`address` 파라미터가 BNB 스마트 체인 주소인 경우(`0x`로 시작), 메시지는 [`eth_sign`](https://eth.wiki/json-rpc/API#eth_sign)와 동일한 방식으로 해시로 변환됩니다.

반환되는 `publicKey`는 비콘 체인에 대해 압축 인코딩된 형식("0x02, "0x03"로 시작하는 33바이트로 인코딩된 16진수 문자열)입니다. 그리고 압축되지 않은 인코딩 형식("0x04"로 시작하는 65바이트 인코딩 16진수 문자열)입니다.

반환된 `signature`는 `0x`로 시작하는 16진수 문자열로 인코딩된 바이트입니다. 바이낸스 체인의 경우 총 64바이트로 된 r, s 값입니다. BNB 스마트 체인의 경우, `eth_sign`과 같이 총 64바이트로 된 r, s 값과 끝에 붙은 복구 바이트입니다.

!!! 경고

    모든 플러그인은 바이낸스 익스텐션 지갑과 동일한 객체 `BinanceChain`을 주입할 수 있기 때문에 dApp 개발자는 반환된 공개 키가 ECDSA 서명 확인 외에 사용자가 주장하는 주소로 변환될 수 있는지 확인해야 합니다.

### BinanceChain.switchNetwork(networkId: string): Promise<{networkId: string}>

바이낸스 익스텐션 지갑은 병렬로 실행되는 이종 블록체인인 비콘 체인과 BNB 스마트 체인을 기본적으로 지원합니다. API는 어떤 상황에서도 다를 수 있습니다. (우리는 곧 비콘 체인 용 API를 열 것입니다.)

개발자는 현재 `BinanceChain.chainId` 또는 `BinanceChain.on('chainChanged', callback)`을 통해 `chainChanged` 이벤트를 듣고 있는 사용자가 선택한 네트워크를 판단할 수 있습니다.

네트워크 전환을 요청하기 위해 개발자는 `bbc-mainnet`(비콘 체인 메인 네트워크), `bsc-mainnet`(BNB 스마트 체인 메인 네트워크), `bbc-testnet`(비콘 체인 테스트 네트워크), `bsc-testnet`(BNB 스마트 체인 테스트 네트워크)과 함께 이 API를 호출하여 사용자가 네트워크 전환에 동의하도록 할 수 있습니다.

### BinanceChain.requestAccounts()

이 익스텐션에 의해 관리되는 모든 계정을 요청합니다.

응답의 `id`는 비콘체인 API를 위한 `accountId`로 사용됩니다.

이 메서드는 계정의 배열을 반환합니다:
```
{
  addresses: [{address: string, type: string}],
  icon: string,
  id: string,
  name: string
}
```

예시:
```
[
    {
        "id":"fba0b0ce46c7f79cd7cd91cdd732b6c699440acf8c539d7e7d753d38c9deea544230e51899d5d9841b8698b74a3c77b79e70d686c76cb35dca9cac0e615628ed",
        "name":"Account 1",
        "icon":"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgY2xhc3M9InNjLXBraElSIGhnRUNmUyI+PHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iOCIgZmlsbD0iI2ZjNmU3NSI+PC9yZWN0Pjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzFlMjAyNiIgc3R5bGU9ImZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtZmFtaWx5OkJpbmFuY2VQbGV4LCAtYXBwbGUtc3lzdGVtLCAmI3gyNzsuU0ZOU1RleHQtUmVndWxhciYjeDI3OywgJiN4Mjc7U2FuIEZyYW5jaXNjbyYjeDI3OywKQmxpbmtNYWNTeXN0ZW1Gb250LCAmI3gyNzsuUGluZ0ZhbmctU0MtUmVndWxhciYjeDI3OywgJiN4Mjc7TWljcm9zb2Z0IFlhSGVpJiN4Mjc7LCAmI3gyNztTZWdvZSBVSSYjeDI3OywgJiN4Mjc7SGVsdmV0aWNhIE5ldWUmI3gyNzssCkhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYiPkE8L3RleHQ+PC9zdmc+",
        "addresses":[
            {
                "type":"bbc-testnet",
                "address":"tbnb1akt8vgstdaz8pax5zgykzee5u9kamjdkkcf2dw"
            },
            {
                "type":"bbc-mainnet",
                "address":"bnb1akt8vgstdaz8pax5zgykzee5u9kamjdkcdqwdl"
            },
            {
                "type":"eth",
                "address":"0x43364696e478E344E95831CE8427623202e5CBFb"
            }
        ]
    }
]
```

### BinanceChain.transfer({fromAddress:string, toAddress:string, asset:string, amount:number, memo?: string, sequence?: number, accountId:string, networkId:string})>

비콘 체인에서 특정 `asset`(BNB or BEP2)을 `amount`만큼 전송합니다.

`accountId`는 `BinanceChain.requestAccounts` API (`id` field of each account)에서 가져올 수 있습니다.

`networkId`는 `bbc-mainnet` 또는 `bbc-testnet`입니다.

예시:

1. BNB를 스스로에게 전송하는 것에 대한 승인을 요청합니다.
`BinanceChain.transfer({fromAddress:"tbnb1sndxdzsg42jg8lc0hehx8dzzpyfxrvq937mt0w", toAddress:"tbnb1sndxdzsg42jg8lc0hehx8dzzpyfxrvq937mt0w", asset:"BNB", amount:1, accountId:"fba0b0ce46c7f79cd7cd91cdd732b6c699440acf8c539d7e7d753d38c9deea544230e51899d5d9841b8698b74a3c77b79e70d686c76cb35dca9cac0e615628ed", networkId:"bbc-testnet"})`

2. BUSD를 스스로에게 전송하는 것에 대한 승인을 요청합니다.
`BinanceChain.transfer({fromAddress:"tbnb1sndxdzsg42jg8lc0hehx8dzzpyfxrvq937mt0w", toAddress:"tbnb1sndxdzsg42jg8lc0hehx8dzzpyfxrvq937mt0w", asset:"BUSD-BAF", amount:1, accountId:"fba0b0ce46c7f79cd7cd91cdd732b6c699440acf8c539d7e7d753d38c9deea544230e51899d5d9841b8698b74a3c77b79e70d686c76cb35dca9cac0e615628ed", networkId:"bbc-testnet"})`

## 이벤트

[MetaMask Doc](https://docs.metamask.io/guide/ethereum-provider.html#events)를 참고하세요. 유일한 차이점은 다른 객체를 주입했다는 것입니다.


```javascript
BinanceChain.on('accountsChanged', (accounts) => {
  // Handle the new accounts, or lack thereof.
  // "accounts" will always be an array, but it can be empty.
});

BinanceChain.on('chainChanged', (chainId) => {
  // Handle the new chain.
  // Correctly handling chain changes can be complicated.
  // We recommend reloading the page unless you have a very good reason not to.
  window.location.reload();
});
```

### connect

[MetaMask Doc](https://docs.metamask.io/guide/ethereum-provider.html#connect)를 참고하세요. 유일한 차이점은 다른 객체를 주입했다는 것입니다.

```typescript
interface ConnectInfo {
  chainId: string;
}

BinanceChain.on('connect', handler: (connectInfo: ConnectInfo) => void);
```

### disconnect

[MetaMask Doc](https://docs.metamask.io/guide/ethereum-provider.html#disconnect)를 참고하세요. 유일한 차이점은 다른 객체를 주입했다는 것입니다.

```typescript
BinanceChain.on('disconnect', handler: (error: ProviderRpcError) => void);
```

### accountsChanged

[MetaMask Doc](https://docs.metamask.io/guide/ethereum-provider.html#accountschanged)를 참고하세요. 유일한 차이점은 다른 객체를 주입했다는 것입니다.

```typescript
BinanceChain.on('accountsChanged', handler: (accounts: Array<string>) => void);
```

### chainChanged

[MetaMask Doc](https://docs.metamask.io/guide/ethereum-provider.html#chainchanged)를 참고하세요. 유일한 차이점은 다른 객체를 주입했다는 것입니다.

```typescript
BinanceChain.on('chainChanged', handler: (chainId: string) => void);
```

```javascript
BinanceChain.on('chainChanged', (_chainId) => window.location.reload());
```

### 메시지

[MetaMask Doc](https://docs.metamask.io/guide/ethereum-provider.html#message)를 참고하세요. 유일한 차이점은 다른 객체를 주입했다는 것입니다.


```typescript
interface ProviderMessage {
  type: string;
  data: unknown;
}

BinanceChain.on('message', handler: (message: ProviderMessage) => void);
```

## 에러

[MetaMask Doc](https://docs.metamask.io/guide/ethereum-provider.html#errors)를 참고하세요. 유일한 차이점은 다른 객체를 주입했다는 것입니다.

## 제공자 사용하기

이 부분은 web3 사이트의 가장 대표적인 세 가지 요구 사항을 충족하는 법을 설명합니다.

- 사용자가 어떤 바이낸스 체인 네트워크에 연결했는지 파악
- 사용자의 BinanceChain 계정 가져오기

```
/**********************************************************/
/* Handle chain (network) and chainChanged (per EIP-1193) */
/**********************************************************/

// Normally, we would recommend the 'eth_chainId' RPC method, but it currently
// returns incorrectly formatted chain ID values.
let currentChainId = BinanceChain.chainId;

BinanceChain.on('chainChanged', handleChainChanged);

function handleChainChanged(_chainId) {
  // We recommend reloading the page, unless you must do otherwise
  window.location.reload();
}

/***********************************************************/
/* Handle user accounts and accountsChanged (per EIP-1193) */
/***********************************************************/

let currentAccount = null;
BinanceChain
  .request({ method: 'eth_accounts' })
  .then(handleAccountsChanged)
  .catch((err) => {
    // Some unexpected error.
    // For backwards compatibility reasons, if no accounts are available,
    // eth_accounts will return an empty array.
    console.error(err);
  });

// Note that this event is emitted on page load.
// If the array of accounts is non-empty, you're already
// connected.
BinanceChain.on('accountsChanged', handleAccountsChanged);

// For now, 'eth_accounts' will continue to always return an array
function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // Binance Extension Wallet is locked or the user has not connected any accounts
    console.log('Please connect to Binance Extension Wallet.');
  } else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0];
    // Do any other work!
  }
}

/*********************************************/
/* Access the user's accounts (per EIP-1102) */
/*********************************************/

// You should only attempt to request the user's accounts in response to user
// interaction, such as a button click.
// Otherwise, you popup-spam the user like it's 1999.
// If you fail to retrieve the user's account(s), you should encourage the user
// to initiate the attempt.
document.getElementById('connectButton', connect);

function connect() {
  BinanceChain
    .request({ method: 'eth_requestAccounts' })
    .then(handleAccountsChanged)
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
}
```

## 레거시 API

!!! 경고
    **절대로** 이 메서드, 속성, 이벤트에 의존해선 안 됩니다.

이 섹션은 메타마스크의 레거시 provider API를 기록합니다.

메타마스크를 지원하는 기존의 dApp들과의 호환성을 위해 바이낸스 익스텐션 지갑 또한 이를 구현하지만, 절대 의존하지 마세요. 근시일 내 종료할 수 있습니다.

## 레거시 속성

### BinanceChain.networkVersion (향후 미지원)

[MetaMask Doc](https://docs.metamask.io/guide/ethereum-provider.html#legacy-properties)를 참고하세요. 유일한 차이점은 다른 객체를 주입했다는 것입니다.

### BinanceChain.selectedAddress (향후 미지원)

[MetaMask Doc](https://docs.metamask.io/guide/ethereum-provider.html#ethereum-selectedaddress-deprecated)를 참고하세요. 유일한 차이점은 다른 객체를 주입했다는 것입니다.

## 레거시 메서드

### BinanceChain.enable() (향후 미지원)

[MetaMask Doc](https://docs.metamask.io/guide/ethereum-provider.html#ethereum-enable-deprecated)를 참고하세요. 유일한 차이점은 다른 객체를 주입했다는 것입니다.

### BinanceChain.sendAsync() (향후 미지원)

[MetaMask Doc](https://docs.metamask.io/guide/ethereum-provider.html#ethereum-sendasync-deprecated)를 참고하세요. 유일한 차이점은 다른 객체를 주입했다는 것입니다.

```typescript
interface JsonRpcRequest {
  id: string | undefined;
  jsonrpc: '2.0';
  method: string;
  params?: Array<any>;
}

interface JsonRpcResponse {
  id: string | undefined;
  jsonrpc: '2.0';
  method: string;
  result?: unknown;
  error?: Error;
}

type JsonRpcCallback = (error: Error, response: JsonRpcResponse) => unknown;

BinanceChain.sendAsync(payload: JsonRpcRequest, callback: JsonRpcCallback): void;
```

### BinanceChain.send() (향후 미지원)

[MetaMask Doc](https://docs.metamask.io/guide/ethereum-provider.html#ethereum-send-deprecated)를 참고하세요. 유일한 차이점은 다른 객체를 주입했다는 것입니다.

```typescript
BinanceChain.send(
  methodOrPayload: string | JsonRpcRequest,
  paramsOrCallback: Array<unknown> | JsonRpcCallback,
): Promise<JsonRpcResponse> | void;
```

이 메서드는 예측 불가능하게 동작하기 때문에, 무슨 일이 있어도 사용하지 말아야 합니다.
[`BinanceChain.sendAsync()`](#BinanceChain-sendasync-deprecated)의 오버로딩된 버전이라고 보면 됩니다.

`BinanceChain.send()`는 세 가지 방식으로 호출될 수 있습니다.

```typescript
// 1.
BinanceChain.send(payload: JsonRpcRequest, callback: JsonRpcCallback): void;

// 2.
BinanceChain.send(method: string, params?: Array<unknown>): Promise<JsonRpcResponse>;

// 3.
BinanceChain.send(payload: JsonRpcRequest): unknown;
```

이 서명들은 다음과 같이 생각할 수 있습니다:

1. 이 서명은 `BinanceChain.sendAsync()`와 동일합니다.

2. 이 서명은 JSON-RPC payload와 callback 대신 `method`와 `params`을 인수로 둔 async `BinanceChain.sendAsync()`와 같습니다.

3. 이 서명은 동시에 다음 RPC 메서드들을 호출할 수 있게 해줍니다:

   - `eth_accounts`
   - `eth_coinbase`
   - `eth_uninstallFilter`
   - `net_version`

## 레거시 이벤트

### close (DEPRECATED)

[MetaMask Doc](https://docs.metamask.io/guide/ethereum-provider.html#close-deprecated)를 참고하세요. 유일한 차이점은 다른 객체를 주입했다는 것입니다.

```typescript
BinanceChain.on('close', handler: (error: Error) => void);
```

### chainIdChanged (DEPRECATED)

[MetaMask Doc](https://docs.metamask.io/guide/ethereum-provider.html#chainidchanged-deprecated)를 참고하세요. 유일한 차이점은 다른 객체를 주입했다는 것입니다.

```typescript
BinanceChain.on('chainChanged', handler: (chainId: string) => void);
```

### networkChanged (DEPRECATED)

[MetaMask Doc](https://docs.metamask.io/guide/ethereum-provider.html#networkchanged-deprecated)를 참고하세요. 유일한 차이점은 다른 객체를 주입했다는 것입니다.

```typescript
BinanceChain.on('networkChanged', handler: (networkId: string) => void);
```

### notification (DEPRECATED)

[MetaMask Doc](https://docs.metamask.io/guide/ethereum-provider.html#notification-deprecated)를 참고하세요. 유일한 차이점은 다른 객체를 주입했다는 것입니다.

```typescript
BinanceChain.on('notification', handler: (payload: any) => void);
```
