---
sidebar_label: 도구
sidebar_position: 2
hide_table_of_contents: false
---

# 개발 도구

생태계 관련 최신 업데이트는 [공식 GitHub 페이지](https://github.com/bnb-chain/bsc-ecosystem)에서 확인하세요.

이 페이지에서는 BNB 스마트 체인 기술 스택의 현 상태 및 BSC 커뮤니티와 생태계에서 가장 요구되는 흥미로운 프로젝트를 소개합니다.

## 개요
BNB 스마트 체인은 이더리움 EVM과 100% 호환 가능한 블록체인으로, DeFi, NFT, 게임 등 많은 분야의 dApp 개발에 최적화되어 있습니다.

현재 BSC 현황에 대한 이해를 돕기 위해 각 레이어를 중요한 요소(component) 별로 구분했습니다. 그리고 흥미로운 기존의 프로젝트들을 비롯하여 바이낸스 엑셀러레이터 펀드(Binance Accelerator Funds)를 통해 지원하고자 하는 **유망한** 프로젝트들을 소개합니다. 만약 기존 프로젝트가 하나도 없거나 한 개만 있는 요소가 있다면, 해당 영역에 그랜트를 지급하는 것을 고려할 가능성이 높습니다. 우선순위 영역을 상세히 설명하는 것이 미처 생각하지 못했던 다양한 영역에서의 지원을 배제하고자 함은 아닙니다. 생태계에 가치를 가져오는 모든 프로젝트들을 지원하고자 합니다.

>📝 _이 문서는 살아있는 문서로, 커뮤니티가 기여하고 있으며 유지하는 데 도움을 주고 있습니다. Pull Request를 통해 마음껏 수정, 추가를 해주세요._

## BSC 스택 레이어

아래에서는 BSC 스택의 다양한 레이어들을 소개합니다.

### Explorer and Wallets

| 요소 | 기존 프로젝트 | 유망한 프로젝트
|-|-|-
| 데스크톱 월렛 | [Wise Safe](https://smart-binance.portonvictor.org/) (a port of Gnosis Safe), [TokenPocket](https://www.tokenpocket.pro/en/download/pc)
| 브라우저 익스텐션 | [Binance Wallet](https://chrome.google.com/webstore/detail/binance-chain-wallet/fhbohimaelbohpjbbldcngcnapndodjp),[MetaMask](https://metamask.io/), [MathWallet](https://mathwallet.xyz/en/), [SafePal](https://www.safepal.io/)  
| 모바일 월렛|  [MathWallet](https://mathwallet.xyz/en/), [TrustWallet](https://trustwallet.com/), [BitKeep](https://bitkeep.com/), [TokenPocket](https://www.tokenpocket.pro/), [SafePal](https://www.safepal.io/), [ONTO Wallet](https://www.onto.app/en)
| 웹 (버너) 월렛| [Torus](https://toruswallet.io/),[MyEtherWallet](https://www.myetherwallet.com/)
| CLI 월렛 | [geth](https://github.com/bnb-chain/bsc), [Seth](https://github.com/dapphub/dapptools/tree/master/src/seth)
| 다중서명 월렛| [MultiSigWallet](https://github.com/gnosis/MultiSigWallet) | gnosis
| 하드웨어 월렛 | [Ledger](https://www.ledger.com/ethereum-wallet), [Trezor](https://trezor.io/), [SafePal](https://safepal.io/)
| 블록 탐색기 | [BSCScan](https://bscscan.com/), [NFTscan](https://bnb.nftscan.com/)
| 검증인 대시보드 | [BSCScan](https://bscscan.com/validatorset/), [BSC-Staking](https://www.binance.org/en/staking)
| 거버넌스 대시보드 | | UI for BSC proposal/vote
| BNBChain 리스트 탐색기 | [BNBChain List](https://www.bnbchainlist.org/) 

### 인프라
| 요소 | 기존 프로젝트 | 유망한 프로젝트
|-|-|-
|API/Node 액세스| [Ankr](https://www.ankr.com/), [Chainstack](https://chainstack.com/build-better-with-binance-smart-chain/), [NowNodes](https://nownodes.io/blog/binance-smart-chain-an-introduction), [QuickNode](https://www.quicknode.com/), [Nodereal](https://nodereal.io/)
| NFT APIs| [NFTScan](https://bnb.nftscan.com/), [BlockVision](https://blockvision.org/), [Venly](https://www.venly.io/)
|아카이브 노드 서비스| [Chainstack](https://chainstack.com/build-better-with-binance-smart-chain/), [InfStones](https://infstones.com/), [QuickNode](https://www.quicknode.com/), [Nodereal’s Meganode](https://docs.nodereal.io/nodereal/meganode/archive-node)
|퍼블릭 RPC 엔드포인트| [RPC Endpoints](https://docs.binance.org/smart-chain/developer/rpc.html)| More public nodes are encouraged
|커뮤니티 투표 대시보드| |
|가스 스테이션 네트워크| [opengsn](https://opengsn.org/)
|포셋| [BSC Test Faucet](https://testnet.binance.org/faucet-smart)


### 도구, API, 언어

| 요소 | 기존 프로젝트 | 유망한 프로젝트
|-|-|-
| 스마트 컨트랙트 언어 | [Solidity](https://solidity.readthedocs.io/en/latest/), [Vyper](https://vyper.readthedocs.io/en/latest/)
| 개발 프레임워크 | [Truffle](https://trufflesuite.com/),[Embark](https://github.com/embark-framework/embark),[Waffle](https://getwaffle.io/),[Dapp](https://dapp.tools/dapp/),[OpenZeppelin SDK](https://openzeppelin.com/sdk/),[hardhat](https://hardhat.org/)
| IDE | [BSC Studio](https://github.com/ObsidianLabs/BSC-Studio),[Remix](https://remix.ethereum.org/),[Intellij Solidity Plugin](https://jetbrains.com/idea/), [chainide](https://eth.chainide.com/project/welcome)
| 린트(Lint) 도구 | [Solhint](https://github.com/protofire/solhint), [Ethlint](https://github.com/duaraghav8/Ethlint)
| 테스팅 도구 | [Solidity code coverage](https://github.com/0xProject/0x-monorepo/tree/development/packages/sol-coverage), [Solidity function profiler](https://github.com/EricR/sol-function-profiler), [eth-tester](https://github.com/ethereum/eth-tester)
| 테스트 블록체인 네트워크 | [bscnode](https://docs.binance.org/smart-chain/developer/fullnode.html), [Ganache](https://github.com/trufflesuite/ganache)
| 보안 도구 | [MythX](https://mythx.io/), [Mythril](https://github.com/ConsenSys/mythril), [Oyente](https://github.com/melonproject/oyente), [Securify](https://securify.chainsecurity.com/), [Solgraph](https://github.com/raineorshine/solgraph), [solc-verify](https://github.com/SRI-CSL/solidity/)
| ABI (Application Binary Interface) tools | [ABI decoder](https://github.com/ConsenSys/abi-decoder), [ABI-gen](https://github.com/0xProject/0x-monorepo/tree/development/packages/abi-gen), [Ethereum ABI UI](https://github.com/hiddentao/ethereum-abi-ui)
| 모니터링 | [Neufund - Smart Contract Watch](https://github.com/Neufund/smart-contract-watch), [BlockScout](https://github.com/poanetwork/blockscout), [Terminal](https://terminal.co/), [Ethereum-watcher](https://github.com/HydroProtocol/ethereum-watcher)
| 프론트엔드 BSC API | [Web3.js](https://github.com/ethereum/web3.js/), [Eth.js](https://github.com/ethjs), [Ethers.js](https://github.com/ethers-io/ethers.js/), [light.js](https://github.com/paritytech/js-libs/tree/master/packages/light.js)
| 백엔드 BSC API | [Web3.py](https://github.com/ethereum/web3.py), [Web3.php](https://github.com/sc0Vu/web3.php), [Java Web3](https://github.com/web3j/web3j), [Net Web3](https://nethereum.com/), [Ruby Web3](https://github.com/EthWorks/ethereum.rb)

전체 목록은 [BSC Developer Ecosystem](https://github.com/bnb-chain/bsc-ecosystem/blob/master/BSC_Develop_Ecosystem.md)에서 확인하세요.

### dApp 인프라
| 요소 | 기존 프로젝트 | 유망한 프로젝트
|-|-|-
| 데이터 분석 및 시각화| [The Graph](https://thegraph.com/en/),[DappRadar](https://dappradar.com/rankings/protocol/binance-smart-chain),[dapp.com](https://www.dapp.com/search_product?chain=BSC),[CMC](https://coinmarketcap.com/yield-farming/),[dapp.review](https://dapp.review/explore/bsc),[DefiStation](https://www.defistation.io/),[BitQuery](https://bitquery.io/),[PARSIQ](https://www.parsiq.io/), [CryptoSlam](https://cryptoslam.io/)
| 오라클 | [Band Protocol](https://bandprotocol.com/), [ChainLink](https://chain.link/), [Pyth](https://pyth.network/)
| 아카이브 데이터 |[InfStones](https://infstones.com/), , [Filecoin](https://filecoin.io/build/), [Arweave](https://www.arweave.org/), [pinata.cloud](https://www.pinata.cloud/)
| 파일 스토리지, 클라우드 | [IPFS](https://ipfs.io/) 
| 크로스체인 브릿지| [renVM](https://renproject.io/), [NerveNetwork](https://nerve.network/),[PolyNetwork](https://www.poly.network/), [Orbit Bridge](https://bridge.orbitchain.io/), [Multichain](https://multichain.xyz/), [Celer cbridge](https://cbridge.celer.network/), [ChainHop] (https://chainhop.exchange/)| Decentralized, trustless, Open Access|
| 자동화 | [Gelato](https://www.gelato.network/)
| 브라우저 | [Brave](https://brave.com/), [Opera](https://www.opera.com/)
| Identity/DID/Credentials | [Ontology](https://ont.io/), [Galaxy](https://galaxy.eco/), [Space ID](https://space.id/), [CyberConnect](https://cyberconnect.me/)
| 쉬운 월렛 온보딩	| [Web3auth](https://web3auth.io/), [Venly](https://www.venly.io/), [Sequence](https://sequence.xyz/)
| 소셜 네트워킹| [Prometeus](https://prometeus.io/), [CyberConnect](https://cyberconnect.me/)
| 거버넌스/DAO | 
| 게임 관련 인프라 | [Carv (Gaming Credential)](https://carv.io/), [Community Gaming (Tournament)](https://www.communitygaming.io/)
| 보안 감사 |	[Certik](https://www.certik.com/), [PeckShield](https://peckshield.com/)
| 결제 | [SWFT](https://www.swft.pro/zh-pc/#/home), [MultiSender](https://multisender.app/) | [Celer Network](https://www.celer.network/), [Connext](https://connext.network/)
| 결제 게이트웨이 | [Bifinity](https://bifinity.com), [MoonPay](https://www.moonpay.com/), [Transak](https://transak.com/)
