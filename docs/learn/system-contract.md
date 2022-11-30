---
sidebar_label: Build-in System Contracts
sidebar_position: 2
hide_table_of_contents: false
---

# 빌트인 시스템 컨트랙트

### 면책 조항

**이 소프트웨어 및 관련 문서는 아직 상업적 사용에 부적합하며, 현재도 개발이 활발히 진행 중이므로 사전 고지 없이 변경될 수 있습니다. 코드와 보안 감사가 완결되지 않았고, 버그 바운티도 준비가 되어있지 않습니다. 네트워크를 사용한 테스트를 진행할 때 리스크를 잘 인지하시고 주의하실 것을 당부드립니다.**


GitHub 구현 링크: <https://github.com/bnb-chain/bsc-genesis-contract>


| 컨트랙트 이름        | 컨트랙트 주소  | ABI 파일 |
| --------------------- | ----------------- | ------------- |
| BSCValidatorSet 컨트랙트 | 0x0000000000000000000000000000000000001000 | [bscvalidatorset](system-smart-contract/bscvalidatorset.abi)|
| Liveness Slash 컨트랙트 | 0x0000000000000000000000000000000000001001 | [slashindicator](system-smart-contract/slashindicator.abi)|
| SystemReward 컨트랙트 | 0x0000000000000000000000000000000000001002 | [systemreward](system-smart-contract/systemreward.abi)|
| TendermintLightClient 컨트랙트 | 0x0000000000000000000000000000000000001003 | [tendermintlightclient](system-smart-contract/tendermintlightclient.abi) |
| TokenHub 컨트랙트 | 0x0000000000000000000000000000000000001004 | [tokenhub](system-smart-contract/tokenhub.abi)|
| RelayerIncentivize 컨트랙트 | 0x0000000000000000000000000000000000001005 | [relayerincentivize](system-smart-contract/relayerincentivize.abi)|
| RelayerHub 컨트랙트 | 0x0000000000000000000000000000000000001006 | [relayerhub](system-smart-contract/relayerhub.abi) |
| GovHub Contract |0x0000000000000000000000000000000000001007 | [govhub](system-smart-contract/govhub.abi)                               |
| TokenManager 컨트랙트 |0x0000000000000000000000000000000000001008 |[tokenmanager](system-smart-contract/tokenmanager.abi) |
| CrossChain 컨트랙트 |0x0000000000000000000000000000000000002000 |[crosschain](system-smart-contract/crosschain.abi) |

## 온체인 라이트 클라이언트

체인 간 상호운용성의 목적은 한 블록체인이 다른 블록체인의 라이트 클라이언트로 기능할 수 있도록 해주는 것입니다. 비컨 체인은 전형적인 비잔틴 오류 허용 합의 알고리즘을 사용하고 있기 때문에, 라이트 클라이언트 검증은 저렴하고 간단합니다. 최신 블록에서 검증인의 서명을 확인하고, 상태의 머클 증명을 확인하면 됩니다.

텐더민트에서는 검증인들이 블록을 처리하기 전 합의를 합니다. 즉, 그 블록의 서명들과 상태 루트는 다음 블록 전까지 포함되지 않습니다. 따라서 모든 블록은 이전 블록을 생성한 표들을 포함하는 LastCommit이라는 필드를 포함하고 있으며, 블록 헤더에는 이전 블록에서 트랜잭션을 처리한 후 엡의 머클 루트 해시를 나타내는 AppHash라는 필드도 있습니다. 그래서, 만약 H 높이에서 AppHash를 검증하고 싶다면, LastCommit로부터 H+1의 높이의 서명이 필요합니다. (이 AppHash는 단 H-1 블록까지 모든 트랜잭션 결과를 포함한다는 사실을 잊지 마세요)

작업증명(Proof-of-Work)과는 달리, 라이트 클라이언트 프로토콜은 블록체인의 모든 헤더를 다운로드해서 확인할 필요가 없습니다. 클라이언트는 검증인 집단이 크게 변화하지 않은 이상 언제든 최신 헤더에 접근할 수 있습니다. 만약 검증인 집단이 변하는 중이라면 클라이언트들은 이 변경 사항들을 추적해야 하는데, 이를 위해서는 중대한 변화가 있는 모든 블록의 헤더를 다운받아야 합니다. 여기에서는 검증인 집단이 일정하다고 간주하며, 검증인 집단의 변경에 대해서는 다음에 다루도록 하겠습니다.

이더리움 플랫폼은 golang으로 구현된 컨트랙트(서명 검증과 같은 무상태 계산)와 solidity로 구현된 일반 컨트랙트를 지원합니다. 일반 컨트랙트에 비해 미리 컴파일된 컨트랙트는 더 효율적이며 가스비도 더 낮지만, 상태가 없습니다. 하지만 온체인 라이트 클라이언트는 상태가 있어야 합니다. 따라서 여기서는 미리 컴파일된 컨트랙트(서명 검증과 같은 무상태 계산)과 일반 컨트랙트(검증인 집단과 신뢰할 수 있는 appHast 저장)가 혼합된 접근법을 취해볼 것입니다.

![img](../../static/img/lightclient.png)

### 미리 컴파일된 컨트랙트

#### 텐더민트 헤더 검증하기

이 컨트랙트는 텐더민트 헤더 검증 알고리즘을 나타냅니다. 입력 파라미터에는 신뢰할 수 있는 합의 상태와 새 텐더민트 헤더가 들어갑니다. 확인 알고리즘은 합의 상태와 텐더민트 헤더를 비교하게 됩니다. 만일 새 헤더가 유효하면, 새로운 합의 상태가 만들어지고 호출자에게 반환됩니다. 아닌 경우에는 에러가 반환됩니다.

#### 머클 증명 검증하기

이 컨트랙트는 [텐더민트 머클 증명 검증 알고리즘](https://github.com/tendermint/tendermint/blob/master/docs/architecture/adr-026-general-merkle-proof.md)을 나타냅니다.

### 솔리디티 컨트랙트

#### 텐더민트 라이트 클라이언트 컨트랙트

1. ConsensusState: 첫 합의 상태(consensus state)는 생성자에 쓰여질 것입니다. 새로운 텐더민트 헤더가 검증이 되고 나면 새로운 컨센서스 상태가 생성됩니다.
    ```golang
    type ConsensusState struct {
      chainID              string
      height               int64
      appHash              []byte
      curValidatorSetHash  []byte
      nextValidatorSet     *tmtypes.ValidatorSet
    }
    ```
2. 텐더민트 헤더: 새로운 텐더민트 헤더를 동기화하고 싶은 릴레이어(relayer)는 이 객체를 빌드하기 위해 BC를 쿼리해야 합니다. 그리고 byte 배열에 인코딩한 뒤, syncTendermintHeader를 호출합니다.
    ```golang
    type Header struct {
        Header blockHeader
        Validator[] CurValidatorSet
        Validator[] NextValidatorSet
    }
    ```
이 컨트랙트는 아래의 네 메서드를 구현하고 있습니다.

1. function **syncTendermintHeader**(byte[] header, uint64 height)

    **syncTendermintHeader** 가장 최근의 합의 상태를 높이별로 가져오며, 미리 컴파일된 컨트랙트에서 validateTendermintHeader를 호출하여 텐더민트 헤더를 증명합니다. 성공 시, 새로운 합의 상태가 저장됩니다.

2. function **getAppHash**(uint64 height) returns(bytes32)

    **getAppHash**는 특정 높이에서 증명된 appHash를 불러옵니다. 해당 높이의 헤더가 증명되지 않았다면, 0 값이 반환됩니다.

3. function **isHeaderSynced**(uint64 height) returns (bool)

    **isHeaderSynced**는 특정 높이에서 동기화가 되었는지 판단하는 저렴한 방법입니다.

4. function **getSubmitter**(uint64 height) returns (address)

    **getSubmitter**는 특정 헤더의 제출자(submitter)를 반환하는 메서드입니다.

#### 머클 증명 확인 라이브러리
이 라이브러리는 BC에서 머클 증명을 확인할 수 있는 util을 제공합니다. 머클 증명을 확인해야 하는 컨트랙트들은 이 라이브러리를 임포트하기만 하면 됩니다.

function **verifyMerkleProof**(int64 height, byte[] key, byte[] value, byte[] proof) bool

**verifyMerkleProof**는 사용자 파라미터를 재조립하여 위의 증명을 확인하기 위해 미리 컴파일된 컨트랙트를 호출합니다.

## 기타 빌트인 시스템 컨트랙트

* **TokenHub 컨트랙트**

    이 컨트랙트는 크로스체인 토큰 전송을 위한 것입니다.

* **TokenManager 컨트랙트**

    이 컨트랙트는 두 체인에서 토큰들을 결합하고 해체하기 위한 것입니다.

* **BSCValidatorSet 컨트랙트**

    비컨 체인(BC)에서 BSC의 검증인 변경을 감시합니다. 체인 간 트랜잭션 검증을 위해 라이트 클라이언트와 소통하며, BSC를 위한 검증인 집단 변경을 적용합니다. 검증인을 위한 블록 생성 가스비 보상을 저장하기도 하며, validatorSet 변경의 크로스체인 패키지 수신 시 검증인들에게 분배합니다.

* **시스템 보상 컨트랙트**

    릴레이어들이 시스템 컨트랙트를 유지해주도록 하는 인센티브 메커니즘입니다. 이들은 시스템 보상 컨트랙트로부터 보상을 받습니다.

* **Liveness Slash 컨트랙트**

    BSC의 활성 상태는 검증인 집단이 순서에 맞게 블록을 성실히 생성하는 데에 달려있습니다. 검증인들은 어떠한 이유에서든 자신의 순서를 놓칠 수도 있습니다. 이러한 운영상 불안정성은 네트워크의 성능을 저하시키며, 시스템에 비결정성을 야기합니다. 이 컨트랙트는 개별 검증인이 놓친 블록 생성 지표를 기록하는 역할을 합니다. 이 지표들이 미리 지정된 기준선을 넘을 경우, 블록 생성 보상은 분배를 위해 BC로 보내지는 대신 더 우수한 검증인들과 공유됩니다.

* **BscValidatorSet 컨트랙트**

    이 컨트랙트는 BC의 스테이킹 변경 패키지를 다루기 위한 것입니다. BSC 컨센서스 엔진을 위해 validatorset 데이터 쿼리를 제공하기도 합니다.

* **RelayerHub 컨트랙트**

    이 컨트랙트는 bsc-relayer의 권위를 관리합니다. bsc-relayer를 운영하고자 하는 사람은 승인을 받기 위해 이 컨트랙트를 호출하여 BNB를 예치해야 합니다.

* **Governance 컨트랙트**

    이 컨트랙트는 BC의 거버넌스 패키지를 다룹니다. 거버넌스 패키지는 타겟 컨트랙트 주소, 파라미터 이름 그리고 새로운 파라미터 값을 포함하고 있습니다. 패키지가 확인이 되고 나면, 이 컨트랙트는 타겟 컨트랙트의 파라미터 업데이트 메서드를 호출하여 새로운 값으로 업데이트할 것입니다.

* **Cross Chain 컨트랙트**

    이 컨트랙트는 크로스체인 패키지의 사전처리와 emit 이벤트를 통해 BC로 크로스체인 패키지를 전송합니다. 패키지 사전처리에는 순서 검증과 머클 증명 검증이 포함됩니다. 통과되고 나면 패키지는 tokenhub이나 bscvalidator와 같은 애플리케이션 빌트인 시스템 컨트랙트로 전달됩니다. 또한 만약 tokenhub이나 bscvalidator가 BC로 패키지를 전송하고자 하는 경우, 패키지를 rlp와 함께 인코딩한 뒤 전송을 위해 이 컨트랙트를 호출합니다.
