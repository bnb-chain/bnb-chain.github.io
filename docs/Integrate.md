---
sidebar_label: 통합하기
sidebar_position: 2
hide_table_of_contents: false
---

## 퍼블릭 서비스
BNB 체인 커뮤니티에서 운영하는 퍼블릭 노드를 통해 블록체인과 상호 작용할 수 있습니다.

### REST API
[가속 노드](https://docs.bnbchain.org/docs/beaconchain/faq/faq#what-is-the-accelerated-node)는 일반인을 위한 고급 API 서비스를 제공합니다.<br/>
가속 노드에서 사용할 수 있는 모든 Rest API 정보 목록을 찾을 수 있습니다: [여기](api-reference/dex-api/paths.md)

### 노드 RPC
네트워크에는 사용자가 ABCI 쿼리 실행, 트랜잭션 전파 또는 네트워크/합의 상태 보기와 같은 하위 레벨의 작업을 수행할 수 있는 여러 데이터 시드 노드가 있습니다.<br/>
혼자서 풀노드를 운영하는 경우, 그 RPC 함수들도 사용할 수 있습니다.<br/>
노드 RPC 서비스가 제공하는 모든 엔드포인트 목록을 찾을 수 있습니다: [여기](api-reference/node-rpc.md)

## 풀노드 운영하기
풀노드를 실행하려면 상당한 연산/대역폭 리소스가 필요합니다.<br/>
[자체 노드 운영하기](validator/fullnode.md)를 참고해주세요.

## 노드 CLI를 통한 액세스
CLI는 현재 Linux, Mac 및 Windows에서 사용할 수 있습니다.<br/>
[CLI Reference](api-reference/cli.md)를 참고해주세요.

## SDK
BNB 체인에 사용할 수 있는 여러 고급 SDK 솔루션이 있습니다. 대부분의 SDK는 다음과 같은 단순화된 기능을 제공합니다.

- 지갑 생성 및 키 관리
- 전송, 새 주문, 주문 취소 등 트랜잭션 인코딩/서명하고 Beacon Chain/DEX에 전송
- 퍼블릭 노드 RPC 서비스 또는 개인 풀노드를 통한 노드 RPC 호출을 통해 비콘 체인/DEX와 통신

현재 사용 가능한 SDK 및 해당 문서의 목록입니다.

- [Go](https://github.com/bnb-chain/go-sdk) - [Documentation](https://github.com/bnb-chain/go-sdk/wiki)
- [Java](https://github.com/bnb-chain/java-sdk) - [Documentation](https://github.com/bnb-chain/java-sdk/wiki)
- [JavaScript](https://github.com/bnb-chain/javascript-sdk) - [Documentation](https://github.com/bnb-chain/javascript-sdk/wiki)
- [C++](https://github.com/bnb-chain/cplusplus-sdk) - [Documentation](https://github.com/bnb-chain/cplusplus-sdk/wiki)
- [C#](https://github.com/bnb-chain/csharp-sdk) - [Documentation](https://github.com/bnb-chain/csharp-sdk)
- [Python](https://github.com/bnb-chain/python-sdk) - [Documentation](https://python-bnb-chain.readthedocs.io/en/latest/bnb-chain.html#module-binance_chain)
- [Swift](https://github.com/bnb-chain/swift-sdk) - [Documentation](https://github.com/bnb-chain/swift-sdk/blob/master/README.md)

## 중요: 트랜잭션의 최종성 보장

"deposit(입금)" 및 "withdrawal(인출)" 기능을 구현에 추가하려면 백엔드 시스템이 사용자 계정에서 자금을 공제하거나 입금하기 전에 트랜잭션이 최종적인지 확인하는 것이 중요합니다.

간단히 말해서, 트랜잭션은 여러 [단계](https://tendermint.com/docs/spec/abci/abci.html#overview)를 거쳐서 블록에 포함됩니다.

각 단계에 대해 기록된 상태 "code"는 다를 수 있으므로 각 단계에 대해  `0`(성공을 의미)인지 확인하십시오. 0이 아닌 "code"는 처리 중 트랜잭션에 문제가 있었음을 나타냅니다.

예를 들어 [이 트랜잭션](https://explorer.binance.org/tx/F296E84917A92FC4876AFE77DE662CC9417F9D6F2EB8ED1AD723A5433EBB8362)은 주문이 이미 취소되었기 때문에 무효입니다. 이 트랜잭션의 코드가 `405`인지 쿼리할 수 있습니다.
```json
{
code: 393621,
hash: "F296E84917A92FC4876AFE77DE662CC9417F9D6F2EB8ED1AD723A5433EBB8362",
height: "30771453",
log: "{"codespace":6,"code":405,"abci_code":393621,"message":"Failed to find order [E0B781A5DA419E0E596D13FE8A06BF5F9CE9C37D-19450]"}",
ok: false,
tx: {
type: "auth/StdTx",
value: {
data: null,
memo: "",
msg: [
{
type: "dex/CancelOrder",
value: {
refid: "E0B781A5DA419E0E596D13FE8A06BF5F9CE9C37D-19450",
sender: "bnb1uzmcrfw6gx0quktdz0lg5p4lt7wwnsmat6ksd6",
symbol: "BNB_TUSDB-888"
}
}
],
signatures: [
{
account_number: "153135",
pub_key: {
type: "tendermint/PubKeySecp256k1",
value: "AzWMnQAwvCP9mbpNyaGuOtNVum1ktvlBb+XFy8D50xmh"
},
sequence: "19452",
signature: "y2FTS4rAqWvDmNWLxsOg+8vrz9XZ4gDXs/tGh/psnQwRMQBtw1x1a2TSCgc0G4qbvh0YICe5ZvJFRNvg/zGG7w=="
}
],
source: "889"
}
}
}
```

우리가 관심을 가질 두 단계는 `CheckTx`와 `DeliverTx`입니다.

[REST API](#rest-api)를 통해 트랜잭션을 전파하거나,  명령어 `BroadcastTxSync`를 통해 [풀노드](#full-node), [노드 RPC](#node-rpc)를 실행하는 것을 권장합니다.

RPC 명령 중에 `BroadcastTxCommit` 이란 명령이 `CheckTx`와 `DeliverTx`를 모두 대기 한 후 코드와 블록 높이를 반환하지만, 아쉽게도 이 기능은 [실제 운영에서 사용하는 것은 권장하지 않습니다](https://github.com/tendermint/tendermint/blob/e3a97b09814bf9289e8c10420af38ce369160752/rpc/core/mempool.go#L154).

대신, 브로드캐스트한 후에 트랜잭션 상태를 확인하는 두 가지 방법이 있습니다.

몇 블록이 지나도 아무것도 받지 못한 경우 트랜잭션을 다시 보내세요. 같은 일이 다시 발생하면 다른 노드로 보내세요. *동일* 트랜잭션을 전파하는 동안에는 이 작업을 수행하는 것이 안전합니다. 트랜잭션은 블록체인에서 고유하며 동일한 데이터의 전송을 재시도하면서 코인을 두 번 사용할 수 없습니다.

### 권장 방법(WebSocket)

트랜잭션이 블록에 포함되도록 하려면 웹 소켓을 통해 JSONRPC를 사용하여 결과에 구독할 수 있습니다. [WebSocket을 통한 이벤트 구독](https://docs.bnbchain.org/docs/beaconchain/develop/api-reference/node-rpc#631-subscribe)을 참조하십시오.

### 대안적 방법(RPC 폴링)

아직 RPC 쿼리에 대한 WebSocket 구독을 지원하지 않는 SDK도 있으므로 일부 사용 사례에서는 이 옵션을 사용하는 것이 좋습니다.

`Tx` RPC 메서드를 사용하여 트랜잭션을 쿼리하고 블록 높이를 가져올 수 있습니다. 다음은 JavaScript SDK를 사용한 예입니다.

```js
> rpc.tx({
  hash: Buffer.from('B2EF71DAEB86385E64F6C0B923636ADE5510B3C34C07D19EE5A114FC9075273D', 'hex'),
  prove:false
}).then(x => console.log('',x))
{
  hash: 'B2EF71DAEB86385E64F6C0B923636ADE5510B3C34C07D19EE5A114FC9075273D',
  height: '30261607',
  index: 0,
  tx_result: { log: 'Msg 0: ', tags: [ [Object], [Object], [Object] ] },
  tx: '0AHwYl3uCkwqLIf6CiIKFLjeOPB9sCxE5v+lpkRhnPu+K1ahEgoKA0JOQhCMy5ZfEiIKFI6nDX0uqKFLorM9GNXfvW+uCm6oEgoKA0JOQhCMy5ZfEnEKJuta6YchA6Xy63LJBSKNsW1nkGMbPyvWl7VDeD/lVByJrtnB3v1kEkA243QKSCn5GxFSTFbh6EA8ZuqdO+0UTR8+Vq7CDikOzCIpuRo95Ww7zak0qXRmL3/shGkwHcvB4l9ofF61mSQgGKfQCSDDARoJMTAxNzg5MTEz'
}
```

트랜잭션이 아직 블록체인에 없으면 이 시도가 오류와 함께 반환됩니다.

`tx_result`에서 빈 "code" 필드를 확인해야 합니다. 이는 `0` 코드를 나타냅니다. 또한 `log`에 대한 추가 검사를 수행하여 예상값과 일치하는지 확인할 수 있습니다.
