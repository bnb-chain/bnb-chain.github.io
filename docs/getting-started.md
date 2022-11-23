---
sidebar_label: Getting Started
---

# 시작하기
본 튜토리얼의 목적은 BNB 체인에 대한 전반적인 개요를 제공하고 BNB 체인 생태계에 대한 신규 사용자의 출발점 역할을 하는 것입니다. 암호화폐에 대한 일반적인 지식, 특히 이더리움 생태계에 대한 익숙하다는 것을 가정합니다. 만약 여러분이 무언가를 바로 이해하지 못한다면 괜찮습니다. 온라인에서 검색하고 답변을 찾을 수 없으면 [Discord](http://discord.com/invite/bnbchain)에서 문의하십시오.


BNB 체인을 사용하기 전에 이 문서를 완전히 읽는 것이 좋습니다. 그러면 새로운 사용자가 직면하는 일반적인 함정과 문제를 피할 수 있습니다. BNB 체인에는 여러 구성 요소가 있으므로 혼란을 피하기 위해 시작하기에 앞서 모든 것을 파악하는 것이 가장 좋습니다. 

BNB 체인에 대한 전반적 개요를 [여기](bnbIntro)에서 확인할 수 있습니다. BNB 체인과 다른 플랫폼 간의 유사점과 차이점을 이해하는 데 유용할 것입니다.

## BNB 체인: 비콘 체인과 BNB 스마트 체인
BNB 체인은 비콘 체인(BC)과 BNB 스마트 체인(BSC)이라는 두 개의 블록 체인으로 구성되어 있습니다. [비콘 체인](learn/beaconIntro.md)는 BNB 체인의 거버넌스를 담당하고 BNB 체인에 대한 지분 및 투표를 관리하는 블록체인 컴포넌트입니다. 반면, [BNB 스마트 체인](learn/intro.md)은 EVM과 호환되며, 합의 계층이며 멀티체인 허브를 갖춘 블록체인 컴포넌트입니다.

### 비콘 체인(BC)으로 무엇을 할 수 있나요?
비콘 체인의 목적은 DEX를 따라 작동하는 효율적인 블록체인 생태계를 제공하여 탈중앙화된 방식으로 디지털 자산을 발행하고 교환할 수 있는 대체 시장을 제공하는 것입니다.

다음을 수행할 수 있습니다.

- [BNB 송수신](beaconchain/wallet/../transfer.md#web-wallet)
- [자산 디지털화를 위한 새로운 토큰 발행](https://community.binance.org/topic/2487), 및 비콘 체인을 자산의 기본 교환/전송 네트워크로 사용
- 토큰 송신, 수신, [소각](beaconchain/tokens.md#burn)/[발행](beaconchain/tokens.md#mint), [동결/동결 해제](beaconchain/tokens.md#freeze-unfreeze)
- [BNB 스마트체인을 위한 온체인 거버넌스 제안서 제출](learn/bsc-gov.md)


**트레이더*의 경우 다음을 수행할 수 있습니다.

- 두 개의 다른 토큰 [거래 페어 생성 제안](beaconchain/list_instruction.md)
- [SDK](beaconchain/exchange-integration.md#sdks)를 통해 체인에서 생성된 트레이딩 페어를 구매하거나 매매하기 위해 [오더 발송](beaconchain/learn/trading-interface.md)
- 특정 자산의 가격 및 시장 활동 확인을 우한 [DEX 시장 감시](beaconchain/develop/api-reference/dex-api/paths.md#apiv1markets)

**개발자*의 경우 다음을 수행할 수 있습니다.

- [BNB 체인 탐색기](https://explorer.bnbchain.org/), [API](beaconchain/develop/api-reference/dex-api/paths.md)와 [node RPC](beaconchain/develop/api-reference/node-rpc.md) 인터페이스를 통한 체인의 트랜잭션 기록 및 블록을 탐색
- [풀노드](beaconchain/fullnode.md)를 실행하여 트랜잭션, 블록 및 합의 활동에 대한 라이브 업데이트를 주시 및 전파
- 풀노드 또는 [API](beaconchain/develop/api-reference/dex-api/paths.md#apiv1markets)를 통한 바이낸스 체인의 다른 데이터를 추출
- 사용자가 바이낸스 체인 및 바이낸스 DEX를 사용할 수 있도록 도와주는 [도구](Integrate.md#sdks) 및 애플리케이션 개발

### BNB 스마트 체인(BSC)으로 무엇을 할 수 있습니까?

BNB 스마트 체인(BSC)은 비콘 체인과 병렬로 실행되는 블록 체인으로 가장 잘 설명할 수 있습니다. 비콘 체인과 달리 BSC는 스마트 컨트랙트 기능과 이더리움 가상 머신(EVM)과의 호환성을 자랑합니다. 설계 목표는 비콘체인의 높은 처리량을 그대로 유지하는 동시에 스마트 계약을 생태계에 도입하는 것이었습니다.

BSC는 EVM과 호환되므로 [Ethereum](https://academy.binance.com/en/articles/what-is-ethereum) 도구 및 DApp의 풍부한 환경을 지원하며 출시되었습니다. 이론적으로 이것은 개발자들이 이더리움에서 프로젝트를 쉽게 포팅할 수 있게 해줍니다. 즉, 사용자는 [메타마스크](wallet/metamask.md)와 같은 애플리케이션을 BSC와 함께 간단히 사용할 수 있습니다. 몇 가지 설정만 조정하면 됩니다. 시작하려면 [BNB 스마트 체인에서 메타마스크 사용하기](wallet/metamask.md)을 확인하십시오.

다음을 수행할 수 있습니다.

- 체인 간 [BNB](binance.md#transfer-testnet-bnb-from-bsc-to-bc) 및 기타 [BEP2 토큰](binance.md#swap-testnet-bep2-token-to-its-bep20-equivalent) 거래
- [bscscan](https://bscscan.com), API, 노드 RPC 인터페이스를 통한 거래 내역 및 블록을 탐색
- [BNB 스테이킹](wallet/staking.md)을 통한 블록 보상 획득

**개발자**는 또한 다음을 수행할 수 있습니다.

- 자산 디지털화를 위한 새로운 토큰 [발행] (issue-BEP20.md)
- 기존 DApps [이동](https://github.com/bnb-chain/bsc-develop-ecosystem)
- [풀노드](validator/fullnode.md) 실행하여 트랜잭션, 블록 및 합의 활동에 대한 실시간 업데이트 주시 및 전파
- [테스트넷](validator/guideline-testnet.md) 및 [메인넷](validator/guideline-mainnet.md)의 검증자 되기
- 사용자가 Dapp을 사용할 수 있도록 도와주는 [지갑](wallet/wallet_api.md) 및 도구 개발

## 지갑
BNB 비콘과 BNB 스마트체인을 사용하는 가장 쉬운 방법은 해당 체인에서 계정 및 전송을 지원하는 지갑을 사용하는 것입니다.

BNB 체인은 [https://www.bnbchain.org/en](https://www.bnbchain.org/en))에서 웹 지갑을 제공합니다. BNB 체인은 테스트넷용 웹 월렛도 [https://testnet.binance.org](https://testnet.binance.org)에서 제공합니다. 두 가지 모두 아래에 설명된 기능을 제공합니다.

- 지갑의 기본 역할을 하는 암호화 키 및 주소를 생성
- 주소의 자산 잔액을 표시
- 자산을 보내고 받기

바이낸스 익스텐션 월렛은 시장 데이터를 검토하고 상장된 자산 간 거래를 위한 주문을 관리할 수 있는 트레이딩 UI도 제공합니다. BNB 스마트체인은 [메타마스크](wallet/metamask.md) 및 [트러스트월렛](wallet/trustwallet.md)와 같은 여러 인기 지갑을 지원합니다. 지원되는 지갑에 대한 자세한 내용은 [여기](Wallet.md)를 참고하세요. BNB 스마트체인에서 지원되는 기타 지갑을 사용하는 방법에 대한 튜토리얼 목록은 [여기](wallet-tutorial-overview.md)를 참조하십시오.

## BNB 토큰 및 수수료
BNB는 BNB 체인 생태계의 기반이 되는 암호화폐 코인입니다. 세계에서 가장 인기 있는 유틸리티 토큰 중 하나로, 다른 암호화폐처럼 BNB를 거래할 수 있을 뿐만 아니라, 다양한 애플리케이션과 활용 사례들에서 BNB를 사용할 수 있습니다. 

ERC-20 BNB 토큰은 처음에는 이더리움 네트워크를 기반으로 했지만 이후 [BEP-2](https://academy.binance.com/en/glossary/bep-2)와 함께 BNB와 1:1 비율로 스왑되었습니다. BEP-2 BNB는 비콘 체인과 메인넷의 네이티브 코인입니다.
2020년에는 BNB 스마트 체인(BSC)이 출시되었다. BSC는 BNB 비콘 체인과 평행적으로 작동하는 블록체인 네트워크입니다. 이는 BNB가 세 가지 다른 형태로 있을 수 있음을 뜻합니다.

- BNB 비콘 체인의 BNB BEP-2
- BNB 스마트 체인의 BNB BEP-20
- 이더리움 네트워크의 BNB ERC-20

## BNB 토큰 구매하기
BNB 체인의 모든 수수료는 BNB로 지불되므로, BNB 체인 네트워크와 상호 작용하기 위해서는 BNB 토큰이 필요합니다. 
- 테스트넷 사용을 위한 BNB 토큰은 [테스트넷 포셋](https://testnet.binance.org/faucet-smart)를 통해 수령할 수 있습니다.
- 메인넷에서 사용하기 위한 BNB 토큰은 [여기](#wallet)에 설명된 대로 여러 주요 거래소 및 지갑에서 구입할 수 있습니다. BNB 토큰을 주고받고 구매하기 위해 BNB 체인과 함께 사용하기 위해 다른 지갑을 사용하는 방법에 대한 튜토리얼은 [여기](wallets/wallet-tutorial-overview)를 참조할 수도 있습니다.

## 체인 탐색기
체인 탐색기는 블록 및 트랜잭션 세부 정보를 탐색할 수 있는 포털을 제공합니다. [BNB 체인 익스플로러](https://explorer.bnbchain.org/) 및 [BscScan](https://bscscan.com/)에서도 다양한 자산 유형, 소유권의 분포 및 소유자의 거래를 확인할 수 있습니다.

## REST API
일반인을 위한 API 서비스를 제공하는 [고속 노드(Accelerated Nodes)](beaconchain/develop/node/nodetypes.md)가 있습니다. 고속 노드가 제공하는 모든 Rest API 정보 목록은 [paths](beaconchain/develop/api-reference/dex-api/paths)에서 확인할 수 있습니다. BSC용 RPC 엔드포인트에 대한 자세한 내용은 [여기](rpc.md)를 참조하십시오.

### 노드 RPC
네트워크에는 사용자가 ABCI 쿼리 실행, 네트워크/컨센서스 상태 보기 또는 트랜잭션 전파와 같은 낮은 레벨의 작업을 수행할 수 있는 데이터 시드 노드가 있습니다.
풀노드를 직접 실행하는 경우 이러한 RPC 기능도 사용할 수 있습니다. 비콘 체인은 [여기](beaconchain/develop/api-reference/node-rpc.md)를 참고하고 BNB 스마트 체인은 [여기](rpc.md)를 참고하세요.

## BNB 체인을 사용하는 고급 방법
### 풀노드 실행

[비콘체인](beaconchain/fullnode.md) 및 [BNB 스마트체인](validator/fullnode.md)에서 자체적인 풀노드를 실행하는 방법에 대해서는 본 안내서를 참고하세요.

### 자체 라이트 클라이언트 실행

[비콘체인에서 자체 라이트 클라이언트를 실행하는 방법](beaconchain/light-client.md)에 대해서는 본 가이드를 참고하세요.

### 노드 커맨트 라인 인터페이스(CLI)를 통해 액세스하기

CLI는 Linux 및 Mac 플랫폼에서 사용할 수 있습니다. [CLI 문서](beaconchain/develop/api-reference/cli)를 참조하십시오.

### SDK 사용하기

앱 개발의 시작점으로 SDK도 제공됩니다.

비콘 체인에는 [Java](<https://github.com/bnb-chain/java-sdk>)와 [Golang](<https://github.com/bnb-chain/go-sdk>)의 두 가지 고급 SDK 솔루션이 있습니다.

두 가지 모두 다음의 기능을 제공합니다.

* 지갑 생성 및 키 관리
* 전송, 신규 주문, 주문 취소 등을 포함한 트랜잭션을 인코딩/서명하고 바이낸스 체인/DEX에 제출
* 퍼블릭 노드 RPC 서비스 또는 자체 풀노드를 통해 바이낸스 체인/DEX 노드 RPC 호출과 통신

더 자세한 정보는 각 SDK 문서를 참고하세요.

- [Go](https://github.com/bnb-chain/go-sdk)([Documentation](https://github.com/bnb-chain/go-sdk/wiki))
- [Java](https://github.com/bnb-chain/java-sdk)([Documentation](https://github.com/bnb-chain/java-sdk/wiki))
- [Javascript](https://github.com/bnb-chain/javascript-sdk) ([Documentation](https://github.com/bnb-chain/javascript-sdk/wiki))
- [C++](https://github.com/bnb-chain/cplusplus-sdk)([Documentation](https://github.com/bnb-chain/cplusplus-sdk/wiki))
- [C#](https://github.com/bnb-chain/csharp-sdk)([Documentation](https://github.com/bnb-chain/csharp-sdk))
- [Python](https://github.com/bnb-chain/python-sdk)([Documentation](https://github.com/bnb-chain/python-sdk))
- [Swift](https://github.com/bnb-chain/swift-sdk)([Documentation](https://github.com/bnb-chain/swift-sdk/blob/master/README.md))


## 블록체인 세부 정보
더 기술적인 정보는 [기술적 사항들](learn/beaconIntro.md#technology-details)을 참고하세요.
