# 서명

서명은 발신자가 트랜잭션을 보유하고 있음을 증명하며, 아래와 같은 절차를 통해 생성됩니다. 

1. 자료 구조를 생성합니다. 참고로 `msgs`, `memo`, `source`, `data` 는 상위 `payload`에서 사용되는 것과 같습니다.

    - `chain_id`: 체인의 고유 ID를 나타내는 문자열로 보통은 동일하게 유지되지만, 비컨 체인이 진화하면 바뀔 수도 있습니다.
    - `account_number`: 64비트 정수를 문자열로 나타내며, 서명 주소와 관련된 식별자 번호를 지닙니다.
    - `sequence`: 64비트 정수를 문자열로 나타내며, 자세한 내용은 [계정](accounts.md) 문서를 확인해 주세요.
    - `memo`: 문자열로 트랜잭션에 관한 간단한 문장이 적혀 있습니다.
    - `msgs`: **json 인코딩된** 트랜잭션 메시지이며, 바이트 배열로 나타냅니다. 자세한 내용은 [인코딩](encoding/encoding.md) 문서를 확인해 주세요.
    - `source`: 64비트 정수를 문자열로 나타내며, 트랜잭션 수신 도구의 식별자입니다.
    - `data`: 바이트 배열로, 향후 이용할 수 있는 공간으로 남아 있습니다.

 다음은 [go-sdk](https://github.com/bnb-chain/go-sdk/blob/master/types/tx/stdsign.go#L22)의 예시입니다:
 ```golang
 // StdSignMsg def
type StdSignMsg struct {
	ChainID       string    `json:"chain_id"`
	AccountNumber int64     `json:"account_number"`
	Sequence      int64     `json:"sequence"`
	Msgs          []msg.Msg `json:"msgs"`
	Memo          string    `json:"memo"`
	Source        int64     `json:"source"`
	Data          []byte    `json:"data"`
}
 ```

2. 위의 자료 구조를 json으로 인코딩합니다. 키는 순서대로 정렬하는데:

    - Maps의 키는 사전순으로 정렬됩니다
    - Struct의 키는 구조에 정의된 순으로 정렬됩니다


3. 인코딩된 바이트 배열을 SHA256으로 서명하여, Secp256k1 곡선 상 ECDSA 서명을 만들고 도출되는 `R`과 `S`의 결과들을 64바이트 배열에 나열합니다. (`R`과 `S`는 32바이트 빅 엔디언 정수로 인코딩 되며, 64 바이트 배열에서 `R`이 첫 32 바이트에 배치되고 `S`는 뒤쪽 32 바이트에 배치됩니다. `S`의 전성(malleability)을 방지하려면 `S > curnve.Order()/2`일 때 `S`를 `curve.Order() - S`로 설정하면 됩니다)

위에서 설명했듯이, `서명`은 트랜잭션 메세지와 함께 인코딩되어 `payload`로 RPC나 http REST API를 통해 비컨 체인 노드에 전송됩니다.
