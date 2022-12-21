/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
 
  bscSideBar: [
    {
      type: 'category',
      label: 'BNB 체인',
     // collapsible: true,
      collapsed: true,
      items: [
         'bnbIntro', 'getting-started', 
          
          {
            type: 'category',
            collapsible: true,
            collapsed: true,
            label: 'BNB 스마트 체인',
            items: ['learn/intro', 

                {type: 'doc', label: 'Tutorials', id:'bsc-tutorials'},

                {
                type: 'category',
                collapsed: true,
                label: '핵심 개념',
                items: ['learn/consensus', 
                          {type: 'category',
                          //collapsible: true,
                          collapsed: true,
                          label: 'BC와 BSC 크로스 체인 구조',
                          items: ['learn/cross-chain', 'learn/system-contract',
                                  'cross-chain-transfer','learn/bsc-relayer', 'learn/incentives',
                                  'learn/oracle-module','learn/oracle-relayer']},
                                  'learn/bsc-gov']
                },

      
              {type: 'category',
              //collapsible: true,
              collapsed: true,
              label: '개발',
              items: [
                      {type: 'doc', label: '개발 도구', id:'learn/ecosystem'},
                      {type:'doc', id:'rpc', label:'RPC 엔드포인트'},
                      'BSCmainnet', 'BSCtestnet', 'BSCexplorers',
                      {
                        type: 'category',
                        collapsed: true,
                        label: '풀 노드 운영하기',
                        items: ['validator/fullnode','validator/snapshot','local', 'validator/upgrade-fullnode']
                      },
                      {
                        type: 'category',
                        collapsed: true,
                        label: '아카이브 노드 운영하기',
                        items: ['archivenode']
                      },
                      {
                        type: 'category',
                        collapsed: true,
                        label: '개별 노드',
                        items: ['BSC-separate-node','BSC-verify-node', 'BSC-fast-node']
                      },
                      {
                        type: 'category',
                        collapsed: true,
                        label: '스마트 컨트랙트 배포하기',
                        items: ['chainide', 'remix-new', 'truffle-new', 'hardhat-new', 'replit', 'verify']
                      },
                      {
                        type: 'category',
                        label: 'BSC에서 NFT 배포하기',
                        items:['nft-metadata-standard', 'ERC721', 'nft_blackide']
                      },
                      {
                        type: 'category',
                        collapsed: true,
                        label: 'BEP20 토큰',
                        items: ['BEP20', 'issue-BEP20', 
                                  {
                                    type: 'category',
                                    //collapsible: true,
                                    collapsed: true,
                                    label: '토큰 바인딩',
                                    items: ['tokens-cross-chain', 'bind-tokens', 'mirror', 
                                    'circulation-model', 'sync' ]
                                  },
                                  'cross-chain-transfer',
                                  {
                                    type: 'category',
                                    //collapsible: true,
                                    collapsed: true,
                                    label: 'BEP20 컨트랙트',
                                    items: ['proxy', 'verify-proxy']
                                  },
                              ]
                      }, 
                      {
                        type: 'category',
                        collapsed: true,
                        label: '디앱 개발',
                        items: ['dapp-dev/Hello-World', 'dapp-dev/web3js-tutorial']
                      },
                      
                      'bsc-relayer', 
                      'oracles',
                      {type: 'doc', id: 'learn/cross-chain-bridges', label: '크로스 체인 브릿지'},
            ]},  
            
            {
              type: 'category',
              //collapsible: true,
              collapsed: true,
              label: '검증인',
              items: ['validator/overview','del-guide', 'validator/requirements', 
                      {
                        type: 'category',
                        collapsed: true,
                        label: 'BSC에서 검증인 운영하기',
                        items:['validator/guideline-mainnet',
                        {
                          type: 'category',
                        collapsed: true,
                        label: '테스트넷 합류',
                        items:['validator/guideline-testnet', 'validator/testnet']
                        },
                        
                        'validator/snapshot', ]
                      },
                      //'validator/security', 
                      'validator/best-practice','validator/node-maintenance',
                      'validator/commonproblems', //'validator/troubleshoot'
                    ], 
            },
            {
              type: 'category',
              //collapsible: true,
              collapsed: true,
              label: '스테이킹',
              items: ['stake/Staking', 'stake/cli-commands', 'wallet/staking',
              {
                type: 'category',
                collapsed: true,
                label: '슬래싱',
                items:['validator/Penalty-overview',  'validator/send-slash-evidence', 
                      'validator/scenarios-slash', 'validator/slash-fee', 'validator/unjail',
                      'validator/monitor-and-query-slash'
                ]
              },
              ]
            },
            /*{type:'doc', id:'Staking', label:'Staking on BSC'},*/
            //{type: 'doc',   id: 'del-guide',   label: 'Delegator Guide'},
                    
            {
              type: 'category',
              collapsed: true,
              label: 'BNB 체인으로 이전하기',
              items: [
                 {
                  type: 'category',
                  collapsed: true,
                  label: '솔라나',
                  items:['migration/non-evm-chains/solana/architecture-comparison', 
                         'migration/non-evm-chains/solana/token-migration']
                 },
                 {
                  type: 'category',
                  collapsed: true,
                  label: '폴리곤',
                  items:['migration/evm-chains/chain-comparison', 
                         'migration/evm-chains/token-comparison',
                         'migration/evm-chains/token-migration']
                 }
                ]
            },
           
            {type: 'doc',   id: 'Integrate',   label: '통합하기'},
      
            {
              type: 'category',
              //collapsible: true,
              collapsed: true,
              label: '지갑',
              items: ['Wallet', 'create-wallet', 
              {
                type: 'category',
                //collapsible: true,
                collapsed: true,
                label: 'BNB 체인 익스텐션 지갑',
                items: ['binance','manual', 'add-account', 'wallet_api','staking-with-ext-wallet']
              },
              {type:'doc', id:'wallet/wallet_api', label:'Binance Extension Wallet API'},
              {
                type: 'category',
                collapsed: true,
                label: '서드 파티 지갑 튜토리얼',
                items:['wallets/wallet-tutorial-overview','wallet/trustwallet', 'wallet/metamask','wallet/arkane', 'wallet/math', 'wallet/myetherwallet',
                  'wallet/ezdefi', 'wallet/infinitywallet', 'wallet/AlphaWallet', 'wallet/coin98wallet',
                  'wallet/ledger', 'wallet/trezor', 'wallets/tutorial/BSCimToken', 'learn/gnosis']
            },
              ]
            },
          
          ],
          }, 
                    
          {
            type: 'category',
            label: '비컨 체인',
          // collapsible: true,
            collapsed: true,
            items: ['learn/beaconIntro',
                      {type: 'doc', label: 'Tutorials', id:'beaconchain/bc-tutorials'},
                      {
                        type:'category',
                        label: '배우기',
                        collapsed: true,
                        items:[ 'beaconchain/learn/architecture', 'beaconchain/governance', 'beaconchain/learn/accounts', 'beaconchain/learn/escrow-accounts', 'beaconchain/learn/assets',
                        'beaconchain/learn/transactions', 'beaconchain/learn/genesis', 'beaconchain/learn/signature', 'beaconchain/learn/BEP8', 
                        
                        {
                            type: 'category',
                            label: '인코딩',
                            collapsed: true,
                            items: [ 'encoding', 'beaconchain/learn/encoding/encoding',
                            'beaconchain/learn/encoding/amino-example']
                        },
                        ]
                      },
                      {
                        type:'category',
                        label:'개발',
                        items: [
                          {
                          type:'category',
                          label:'비컨 체인 풀 노드',
                          items:['beaconchain/develop/node/install', 'beaconchain/develop/node/join-mainnet',
                                  'beaconchain/develop/node/join-testnet', 'beaconchain/develop/node/synctypes',
                                'beaconchain/develop/node/extra-info', 'beaconchain/develop/node/nodetypes',
                              'beaconchain/develop/node/upgrade', 'beaconchain/develop/node/localnetwork',
                            'beaconchain/develop/node/fullnodeissue', 'beaconchain/develop/api-reference/dex-api/staking',
                            'beaconchain/develop/node/snapshot'
                          ]
                        }, 
                        {type:'doc', id: 'beaconchain/develop/api-reference/cli', label:'비컨 체인 클라이언트'},
                        {type:'doc', id: 'beaconchain/light-client', label:'라이트 클라이언트'},
                        {type:'doc', id: 'beaconchain/tokens', label:'자산 관리'},
                        {type:'doc', id: 'beaconchain/list_instruction', label:'상장 명령어'},
                        {type:'doc', id: 'beaconchain/list', label:'상장 트랜잭션'},
                        {type:'doc', id: 'beaconchain/trading-spec', label:'거래 세부사항'},
                        {type:'doc', id: 'beaconchain/develop/api-reference/api-server', label:'간단한 API 서버'},
                        {type:'doc', id: 'beaconchain/develop/bcsdk', label:'비컨 체인 SDK'},
                        {type:'doc', id: 'beaconchain/develop/testnetandexplorer', label:'비컨 체인 테스트넷 & SDK'},
                        {
                          type: 'category',
                          label:'비컨 체인 및 DEX API 레퍼런스',
                          items:[
                            {type:'doc', id:'beaconchain/develop/api-reference/dex-api/paths', label: '가속 노드 HTTP API 메인넷 - 경로 및 모델'},
                            {type:'doc', id:'beaconchain/develop/api-reference/dex-api/block-service', label: '새 가속 노드 HTTP API 메인넷'},
                            {type:'link', href:"pathname:///api-swagger/index.html", label: '가속 노드 HTTP API Swagger'},
                            {type:'doc', id:'beaconchain/develop/api-reference/dex-api/paths-testnet', label: '가속 노드 HTTP API 테스트넷- 경로 및 모델'},
                            {type:'doc', id:'beaconchain/develop/api-reference/dex-api/ws-connection', label: '웹 소켓 - 연결하기'},
                            {type:'doc', id:'beaconchain/develop/api-reference/dex-api/ws-streams', label: '웹 소켓 - 스트림'},
                            {type:'doc', id:'beaconchain/develop/api-reference/node-rpc', label: '노드 RPC - 경로 및 모델'},
                            {type:'link', href:"pathname:///rpc-swagger/index.html", label: '노드 RPC Swagger'},
                            {type:'doc', id:'beaconchain/changelog', label:'CHANGELOG'}
      
                          ]
                        },
                        
                        ]
                      },
                      {
                        type: 'category',
                        label:'지갑',
                        items:['beaconchain/wallets',
                          {
                            type: 'category',
                            label:'튜토리얼',
                            items:[
                            {type:'doc', id:'beaconchain/wallet/tutorial/how-to-create-a-wallet-on-trustwallet', label:'트러스트 웰렛 가이드'},
                            {type:'doc', id:'beaconchain/wallet/tutorial/ledger-nano-s-usage-guide', label:'렛저 월렛 가이드'},
                            {type:'doc', id:'beaconchain/wallet/tutorial/trezor-model-t-user-guide', label:'트레저 월렛 가이드'},
                            {type:'doc', id:'beaconchain/wallet/tutorial/bep8', label:'웹 지갑으로 BEP8 토큰 관리하기'},
                          ]
                          }
                        ]
                      }
            ],
          },

          {
            type: 'category',
            collapsed: true,
            label: 'BNB 사이드 체인', 
            //link: {type: "doc", id: 'BNBSidechain/overview/bas'}, //SUPPORTED in 2.0.0-beta.10 unrealeased version 
            items:[
               'BNBSidechain/overview/bs-overview', 'BNBSidechain/overview/whenBNBSidechain',
               {
                  type: 'doc',
                  label: '아키텍처',
                  id: 'BNBSidechain/architecture/bs-arch'
               },
              {
                type: 'doc',
                label: '개발 도구',
                id: 'BNBSidechain/develop/BNBSidechainTestnet/development-tools'
              },
              'BNBSidechain/develop/BNBSidechainTestnet/launch-bs',
              'BNBSidechain/bs-tutorials',
               {
                  type: 'category',
                  collapsed: true,
                  label: '보안',
                  items:['BNBSidechain/security/blockchain-and-evm-security', 
                        'BNBSidechain/security/bridge-security']
               },
              {type: 'doc', label: 'BNB 사이드 체인 파일럿 프로젝트', id:'BNBSidechain/bs-pilot-projects'},
            
            ]
          },


          {
            type: 'category',
            collapsed: true,
            label: 'ZkBNB', 
            items:['zkbnb/zkbnb-overview','zkbnb/zkbnb-architecture','zkbnb/zkbnb-storageLayout',
                   'zkbnb/zkbnb-tokenomics','zkbnb/zkbnb-wallets'],
          },
          
    ],
    },



    {
      type: 'category',
      collapsed: true,
      label: '향후 개발',
      items:['dev-outlook-2022', 'dev-outlook/scaling', 'dev-outlook/community'],
    },

    {
      type: 'category',
      //collapsible: true,
      collapsed: true,
      label: 'FAQs',
      items: [      
        {
          type: 'category',
          collapsed: true,
          label: 'BNB 스마트 체인 FAQs',
          items: ['BSC-FAQs-general', 'BSC-FAQs-tokens', 
                  'BSC-FAQs-validator', 'BSC-FAQs-delegator', 
                  'parameters', 'cross',  'faq'],
        },
        {
          type: 'doc', label: 'BNB 비컨 체인 FAQs', id: 'beaconchain/faq/faq',
        },
        {
          type: 'doc',
          id: 'BNBSidechain/faqs-bas',
          label: 'BNB 사이드 체인 FAQs',
        },  
     ],

    },
    
    {type: 'doc',   id: 'contribute',   label: 'BSC에 기여하기'},
    {type: 'doc',   id: 'more-help',   label: '도움'},
  ],
   
};

module.exports = sidebars;
