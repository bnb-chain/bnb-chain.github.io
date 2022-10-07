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
      label: 'BNB Chain',
     // collapsible: true,
      collapsed: true,
      items: [
        'bnbIntro', 'getting-started', 
          
          {
            type: 'category',
            collapsible: true,
            collapsed: true,
            label: 'BNB Smart Chain',
            items: ['learn/intro', 

                {type: 'doc', label: 'Tutorials', id:'bsc-tutorials'},

                {
                type: 'category',
                collapsed: true,
                label: 'Core Concepts',
                items: ['learn/consensus', 
                          {type: 'category',
                          //collapsible: true,
                          collapsed: true,
                          label: 'BC and BSC Cross-Chain Mechanism',
                          items: ['learn/cross-chain', 'learn/system-contract',
                                  'learn/cross-chain-transfer','learn/bsc-relayer', 'learn/incentives',
                                  'learn/oracle-module','learn/oracle-relayer']},
                                  'learn/bsc-gov']
                },

      
              {type: 'category',
              //collapsible: true,
              collapsed: true,
              label: 'Develop',
              items: [
                      {type: 'doc', label: 'Development Tools', id:'learn/ecosystem'},
                      {type:'doc', id:'rpc', label:'RPC Endpoints'},
                      'BSCmainnet', 'BSCtestnet', 'BSCexplorers',
                      {
                        type: 'category',
                        collapsed: true,
                        label: 'Running Fullnode',
                        items: ['validator/fullnode','validator/snapshot','local', 'validator/upgrade-fullnode']
                      },
                      {
                        type: 'category',
                        collapsed: true,
                        label: 'Running Archive Node',
                        items: ['archivenode']
                      },
                      {
                        type: 'category',
                        collapsed: true,
                        label: 'Separate Node',
                        items: ['BSC-separate-node','BSC-verify-node', 'BSC-fast-node']
                      },
                      {
                        type: 'category',
                        collapsed: true,
                        label: 'Deploy Smart Contract',
                        items: ['chainide', 'remix-new', 'truffle-new', 'hardhat-new', 'replit', 'verify']
                      },
                      {
                        type: 'category',
                        label: 'Deploy NFTs on BSC',
                        items:['nft-metadata-standard', 'ERC721', 'nft_blackide']
                      },
                      {
                        type: 'category',
                        collapsed: true,
                        label: 'BEP20 Tokens',
                        items: ['BEP20', 'issue-BEP20', 'remix',
                                  {
                                    type: 'category',
                                    //collapsible: true,
                                    collapsed: true,
                                    label: 'Bind Tokens',
                                    items: ['tokens-cross-chain', 'bind-tokens', 'mirror', 
                                    'circulation-model', 'sync' ]
                                  },
                                  'cross-chain-transfer',
                                  {
                                    type: 'category',
                                    //collapsible: true,
                                    collapsed: true,
                                    label: 'BEP20 Contracts',
                                    items: ['proxy', 'verify-proxy']
                                  },
                              ]
                      }, 
                      {
                        type: 'category',
                        collapsed: true,
                        label: 'Dapp Development',
                        items: ['dapp-dev/Hello-World', 'dapp-dev/web3js-tutorial']
                      },
                      
                      'bsc-relayer', 
                      {
                        type: 'category',
                        collapsed: true,
                        label: 'Oracles',
                        items: ['band',  'link']
                      },
                      {type: 'doc', id: 'learn/cross-chain-app-list', label: 'Cross-Chain App Support'},
            ]},  
            
            {
              type: 'category',
              //collapsible: true,
              collapsed: true,
              label: 'Validator',
              items: ['validator/overview','del-guide', 'validator/requirements', 
                      {
                        type: 'category',
                        collapsed: true,
                        label: 'Running as Validator on BSC',
                        items:['validator/guideline-mainnet',
                        {
                          type: 'category',
                        collapsed: true,
                        label: 'Join Testnet',
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
              label: 'Staking',
              items: ['stake/Staking', 'stake/cli-commands', 'wallet/staking',
              {
                type: 'category',
                collapsed: true,
                label: 'Slashing',
                items:['validator/Penalty-overview',  'validator/send-slash-evidence', 
                      'validator/scenarios-slash', 'validator/slash-fee', 'validator/unjail',
                      'validator/monitor-and-query-slash'
                ]
              },
              ]
            },
            /*{type:'doc', id:'Staking', label:'Staking on BSC'},*/
            //{type: 'doc',   id: 'del-guide',   label: 'Delegator Guide'},
        
            {type: 'doc',   id: 'Integrate',   label: 'Integration'},
      
            {
              type: 'category',
              //collapsible: true,
              collapsed: true,
              label: 'Wallet',
              items: ['Wallet', 'create-wallet', 
              {
                type: 'category',
                //collapsible: true,
                collapsed: true,
                label: 'BNB Chain Extension Wallet',
                items: ['binance','manual', 'add-account', 'wallet_api','staking-with-ext-wallet']
              },
              {type:'doc', id:'wallet/wallet_api', label:'Binance Extension Wallet API'},
              {
                type: 'category',
                collapsed: true,
                label: 'Tutorials on Third Party Wallets',
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
            label: 'Beacon Chain',
          // collapsible: true,
            collapsed: true,
            items: ['learn/beaconIntro',
                      {type: 'doc', label: 'Tutorials', id:'beaconchain/bc-tutorials'},
                      {
                        type:'category',
                        label: 'Learn',
                        collapsed: true,
                        items:[ 'beaconchain/learn/architecture', 'beaconchain/learn/accounts', 'beaconchain/learn/assets',
                        'beaconchain/learn/transactions', 'beaconchain/learn/genesis', 'beaconchain/learn/signature',
                        {
                            type: 'category',
                            label: 'Encoding',
                            collapsed: true,
                            items: [ 'encoding', 'beaconchain/learn/encoding/encoding',
                            'beaconchain/learn/encoding/amino-example']
                        },
                        ]
                      },
                      {
                        type:'category',
                        label:'Develop',
                        items: [
                          {
                          type:'category',
                          label:'Beacon Chain Fullnode',
                          items:['beaconchain/develop/node/install', 'beaconchain/develop/node/join-mainnet',
                                  'beaconchain/develop/node/join-testnet', 'beaconchain/develop/node/synctypes',
                                'beaconchain/develop/node/extra-info', 'beaconchain/develop/node/nodetypes',
                              'beaconchain/develop/node/upgrade', 'beaconchain/develop/node/localnetwork',
                            'beaconchain/develop/node/fullnodeissue', 'beaconchain/develop/api-reference/dex-api/staking',
                            'beaconchain/develop/node/snapshot'
                          ]
                        }, 
                        {type:'doc', id: 'beaconchain/develop/api-reference/cli', label:'Beacon Chain Client'},
                        {type:'doc', id: 'beaconchain/light-client', label:'Light Client'},
                        {type:'doc', id: 'beaconchain/tokens', label:'Asset Management'},
                        {type:'doc', id: 'beaconchain/list_instruction', label:'List Instructions'},
                        {type:'doc', id: 'beaconchain/list', label:'List Transaction'},
                        {type:'doc', id: 'beaconchain/trading-spec', label:'Trading Specification'},
                        {type:'doc', id: 'beaconchain/develop/api-reference/api-server', label:'Simple API Server'},
                        {type:'doc', id: 'beaconchain/develop/bcsdk', label:'Beacon Chain SDK'},
                        {type:'doc', id: 'beaconchain/develop/testnetandexplorer', label:'Beacon Chain Testnet & SDK'},
                        {
                          type: 'category',
                          label:'Beacon Chain and DEX API Reference',
                          items:[
                            {type:'doc', id:'beaconchain/develop/api-reference/dex-api/paths', label: 'Accelerated Node HTTP API Mainnet - Paths and Models'},
                            {type:'doc', id:'beaconchain/develop/api-reference/dex-api/block-service', label: 'New Accelerated Node HTTP API Mainnet'},
                            {type:'link', href:"pathname:///api-swagger/index.html", label: 'Accelerated Node HTTP API Swagger'},
                            {type:'doc', id:'beaconchain/develop/api-reference/dex-api/paths-testnet', label: 'Accelerated Node HTTP API Testnet- Paths and Models'},
                            {type:'doc', id:'beaconchain/develop/api-reference/dex-api/ws-connection', label: 'WebSockets - Connecting'},
                            {type:'doc', id:'beaconchain/develop/api-reference/dex-api/ws-streams', label: 'WebSockets - Streams'},
                            {type:'doc', id:'beaconchain/develop/api-reference/node-rpc', label: 'Node RPC - Paths and Models'},
                            {type:'link', href:"pathname:///rpc-swagger/index.html", label: 'Node RPC Swagger'},
                            {type:'doc', id:'beaconchain/changelog', label:'CHANGELOG'}
      
                          ]
                        },
                        
                        ]
                      },
                      {
                        type: 'category',
                        label:'Wallet',
                        items:['beaconchain/wallets',
                          {
                            type: 'category',
                            label:'Tutorials',
                            items:[
                            {type:'doc', id:'beaconchain/wallet/tutorial/how-to-create-a-wallet-on-trustwallet', label:'Trust Wallet Guide'},
                            {type:'doc', id:'beaconchain/wallet/tutorial/ledger-nano-s-usage-guide', label:'Ledger Wallet Guide'},
                            {type:'doc', id:'beaconchain/wallet/tutorial/trezor-model-t-user-guide', label:'Trezor Wallet Guide'},
                            {type:'doc', id:'beaconchain/wallet/tutorial/bep8', label:'How to manage BEP8 token with Web Wallet'},
                          ]
                          }
                        ]
                      }
            ],
          },

          {
            type: 'category',
            collapsed: true,
            label: 'BNB Sidechain', 
            //link: {type: "doc", id: 'BNBSidechain/overview/bas'}, //SUPPORTED in 2.0.0-beta.10 unrealeased version 
            items:[
               'BNBSidechain/overview/bs-overview', 'BNBSidechain/overview/whenBNBSidechain',
               {
                  type: 'doc',
                  label: 'Architecture',
                  id: 'BNBSidechain/architecture/bs-arch'
               },
              {
                type: 'doc',
                label: 'Development Tools',
                id: 'BNBSidechain/develop/BNBSidechainTestnet/development-tools'
              },
              'BNBSidechain/develop/BNBSidechainTestnet/launch-bs',
              'BNBSidechain/bs-tutorials',
               {
                  type: 'category',
                  collapsed: true,
                  label: 'Security',
                  items:['BNBSidechain/security/blockchain-and-evm-security', 
                        'BNBSidechain/security/bridge-security']
               },
              {type: 'doc', label: 'BNB Sidechain Pilot Projects', id:'BNBSidechain/bs-pilot-projects'},
            
            ]
          },
    ],
    },


    {
      type: 'category',
      collapsed: true,
      label: 'Future Developments',
      items:[
                {
                  type: 'category',
                  collapsed: true,
                  label: '2022 Development Outlook',
                  items:['dev-outlook-2022', 'dev-outlook/scaling', 'dev-outlook/user-exp',
                             'dev-outlook/sharding-and-multichain', 'dev-outlook/community'],
                }
      ],
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
          label: 'BNB Smart Chain FAQs',
          items: ['BSC-FAQs-general', 'BSC-FAQs-tokens', 
                  'BSC-FAQs-validator', 'BSC-FAQs-delegator', 
                  'parameters', 'cross',  'faq'],
        },
        {
          type: 'doc', label: 'Beacon Chain FAQs', id: 'beaconchain/faq/faq',
        },
        {
          type: 'doc',
          id: 'BNBSidechain/faqs-bas',
          label: 'BNB Sidechain FAQs',
        },  
     ],

    },
    
    {type: 'doc',   id: 'contribute',   label: 'Contribute to BSC'},
    {type: 'doc',   id: 'more-help',   label: 'More Help'},
  ],
   
};

module.exports = sidebars;
