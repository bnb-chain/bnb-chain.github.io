// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'BNB 체인 공식 Docs',
  url: 'https://bnb-chain.github.io/',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/icon/favicon.ico',
  organizationName: 'bnb-chain', 
  projectName: 'bnb-chain.github.io', 
  deploymentBranch: 'gh-pages',
 
  
  plugins: [
             require.resolve("docusaurus-plugin-image-zoom"),
              
              [require.resolve('docusaurus-gtm-plugin'),
              {
                  id: 'GTM-W9BVQXM', // GTM Container ID
                  preview: 'live',
              }],
              
            ],

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/bnb-chain/bnb-chain.github.io/blob/master/',
          editCurrentVersion: true,
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://www.bnbchain.org/en/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    
    ({
      
      zoom: {
        selector: '.markdown :not(em) > img',
        config: {
          // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
          background: {
            light: 'rgb(255, 255, 255)',
            dark: 'rgb(50, 50, 50)'
          }
        }
      },
      
      algolia: {
        // The application ID provided by Algolia
        appId: '3LF005YNGZ',
  
        // Public API key: it is safe to commit it
        apiKey: 'dbc11ec6638f9c767ef6ed2856871f58',
  
        indexName: 'bnbchain',
  
        // Optional: see doc section below
        // contextualSearch: true,
  
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        //externalUrlRegex: 'external\\.com|domain\\.com',
  
        // Optional: Algolia search parameters
        //searchParameters: {},
  
        // Optional: path for search page that enabled by default (`false` to disable it)
      //  searchPagePath: 'search',
  
        //... other Algolia params
      },

      colorMode: {
        defaultMode: 'light',
      },

      highlight: {
        theme: 'default',
      },
      navbar: {
        title: 'BNB 체인 공식 Docs',
        style: 'primary',
        logo: {
          alt: 'BNB',
          src: 'img/image.png',
        },
        
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: '소개',
                to: '/docs/bnbIntro',
              },
            ],
          },
          {
            title: '커뮤니티',
            items: [
              {
                label:'BuildnBuild 포럼',
                href: 'https://www.buildnbuild.dev/',
              },
              {
                label: '블로그',
                href: 'https://www.bnbchain.org/en/blog/',
              },
              {
                label: '깃허브',
                href: 'https://github.com/bnb-chain',
              },
              {
                label: '디스코드',
                href: 'https://discord.com/invite/bnbchain',
              },
              {
                label: '트위터',
                href: 'https://twitter.com/BNBCHAIN',
              },
              {
                label: '텔레그램',
                href: 'http://t.me/BinanceDEXchange',              
              }
            ],
          },
          
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Build N Build.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
