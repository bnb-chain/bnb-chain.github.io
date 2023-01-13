---
sidebar_label: 타입
sidebar_position: 2
hide_table_of_contents: false
---

# 인코딩

코스모스 SDK 두 개의 바이너리 와이어 인코딩을 지원하는데, [비컨 체인 Amino](https://github.com/bnb-chain/bnc-go-amino)와
[Protocol Buffers](https://developers.google.com/protocol-buffers)입니다. 여기서 Amino는 객체 인코딩 규격이며 Proto3에 인터페이스 지원을 확장한 형태로 만들어 졌습니다.
Amino가 대부분 호환되는 Proto3에 관한 더 자세한 정보를 위해서는 다음 [문서](https://developers.google.com/protocol-buffers/docs/proto3)를 확인하세요. (참고로 proto2와는 호환되지 않습니다)

Amino의 상당한 성능 저하, 반영 기반(reflection-based) 구조, 의미있는 언어간/클라이언트 지원의 부족으로 Protocal Buffers, 특히 [gogoprotobuf](https://github.com/gogo/protobuf/)를 Amino 대신 사용하고 있는 추세입니다. Protocol Buffers를 Amino 대신 사용하는 것은 아직 진행되고 있는 과정입니다.
코스모스 SDK 상 타입의 바이너리 와이어 인코딩은 클라이언트(client) 인코딩과 저장소(store) 인코딩 두 가지로 분류할 수 있습니다. 클라이언트 인코딩은 트랜잭션 처리와 서명에 중점을 두는 반면 저장소 인코딩은 상태 머신 전환과 궁극적으로 머클 트리에 저장되는 과정에 중점을 둡니다.

저장소 인코딩은 protobuf 정의는 어떤 타입으로든 존재할 수 있고 보통 Amino 기반 "중간자" 유형으로 존재합니다. 구체적으로, protobuf 기반 타입 정의는 직렬화와 지속성에 사용되는 반면, Amino 기반 타입은 지속적으로 전환되는 상태 기계의 비즈니스 로직에 사용됩니다. 참고로 Amino 기반 타입은 미래에 폐지될 수 있으므로 개발자들은 가능하면 protobuf 메세지 정의를 사용하는 것을 권장합니다.

`codec` 페키지에는 `Marshaler`(마샬러)와 `ProtoMarshaler`(프로토마샬러)라는 두 개의 핵심 인터페이스가 존재합니다. 마샬러는 일반 `interface{}`타입을 사용하는 대신 프로토마샬러를 구현하는 타입에서 작동한다는 점을 제외하고는 현재 Amino 인터페이스를 캡슐화하여 구현되어 있습니다.

추가로 `Marshaler`를 구현하는 방법은 3가지가 존재합니다. 첫 번째는 `AminoCodec`으로 바이너리와 JSON 직렬화가 둘 다 Amino에서 다뤄집니다. 두 번째 방법은 `ProtoCodec`를 사용하며 바이너리와 JSON 직렬화가 Protobuf에 의해 다뤄집니다. 마지막으로 `HybridCodec`은 바이너리 직렬화는 Protobuf를 사용하고 JSON 직렬화는 Amino를 사용합니다. 대부분의 경우 클라이언트 사용과 상태 직렬화에 쉬운 `HybridCodec`이 많이 사용됩니다.

모듈에서는 Amino나 Protobuf 인코딩을 사용할 수 있지만 타입들은 `ProtoMarshaler`를 도입해야 합니다. 만일 모듈의 타입에서 해당 인터페이스를 사용하는 것을 원하지 않을 경우에는 직접 Amino 코덱을 사용하면 됩니다.

## Amino

모든 모듈은 타입과 인터페이스를 직렬화하기 위해 Amino 코덱을 사용합니다. 이 코덱은 일반적으로
메세지 같은 해당 모듈의 도메인에만 타입과 인터페이스를 등록하지만, `x\gov` 같은 예외도 존재합니다.
각 모듈은 사용자가 코덱을 제공하고 모든 타입을 등록할 수 있는 `RegisterCodec` 함수를 사용할 수 있습니다.
어플리케이션에서는 각 메서드에 대해 이 모듈을 호출할 것입니다.

아래와 같이 모듈에 protobuf 기반의 타입 정의가 존재하지 않는 경우,
Amino를 통해 처리되지 않은 와이어 바이트를 구체적인 타입이나 인터페이스로 인코딩 및 디코딩을 진행할 수 있습니다:

```go
bz := keeper.cdc.MustMarshalBinaryBare(typeOrInterface)
keeper.cdc.MustUnmarshalBinaryBare(bz, &typeOrInterface)
```

참고로 위의 기능에 대한 길이 접두사 변형(length-prefixed variants)이 존재하며, 
이는 보통 데이터가 스트리밍이나 그룹화 되는 경우 사용됩니다. (예시. `ResponseDeliverTx.Data`)


Amino의 또 다른 중요한 기능은 [트랜잭션](../transaction.md)의 인코딩 및 디코딩입니다.
트랜잭션은 어플리케이션이나 SDK에 의해 정의되지만, 다른 피어들로 전파될려면 기본 합의 엔진을 거쳐야합니다.
기본 합의 엔진은 응용 프로그램의 영향을 받지 않으므로, 가공되지 않은 바이트 형태로만 트랜잭션을 받습니다.
따라서 `TxEncoder`라는 객체에서 인코딩이 진행되며 `TxDecoder`에서 디코딩이 진행됩니다.


두 객체에 대한 표준 구현은 [`auth` 모듈](https://github.com/cosmos/cosmos-sdk/blob/master/x/auth)에서 볼 수 있습니다:


## Gogoproto

모듈은 자신의 타입에 해당하는 Protobuf 인코딩을 사용하는 것이 권장됩니다. 
만일 모듈이 `Account`나 `Content`같은 인터페이스를 포함하지 않는다면, 추가적인
세부 조정 없이 `HybridCoded`을 통해 구현된 `Marshaler`(마샬러)코덱을 사용하면 됩니다.

그러나 만일 모듈이 타입 인터페이스를 다룬다면, 해당 타입을 다루기 위해 확장된 `Marshaler` 인터페이스 계약을 사용해야 합니다. (예시. `MarshalAccount`).
참고로 내부적으로는 `HybridCodec`을 사용해야 합니다. 이런 확장된 계약은 고유의 `oneof` 메세지를 갖는 구체적인 타입을 사용할 것입니다.

