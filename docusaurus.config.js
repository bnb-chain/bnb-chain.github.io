// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'BNB Chain Documentation',
  url: 'https://bnb-chain.github.io',
  baseUrl: '/docs-site-v2/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'bnb-chain', // Usually your GitHub org/user name.
  projectName: 'docs-site-v2', // Usually your repo name.
    
  /*i18n: {
      defaultLocale: 'en',
      locales: ['en', 'fr', 'zh'],
    },*/
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/bnb-chain/docs-site-v2/docs',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://www.bnbchain.world/en/blog/',
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
      /*announcementBar: {
        id: 'support_us',
        content:
          'Binance Chain and Binance Smart Chain are entering a new development era with a new brand. The documentations and the web pages are under reconstruction.',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: false,
      },*/
      colorMode: {
        defaultMode: 'light',
      },

      highlight: {
        theme: 'default',
      },
      navbar: {
        title: 'BNB Chain Documentation',
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
                label: 'Introduction',
                to: '/docs/bnbIntro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label:'BuildnBuild Forum',
                href: 'https://www.buildnbuild.dev/',
              },
              {
                label: 'Blog',
                href: 'https://www.bnbchain.world/en/blog/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/bnb-chain',
              },
              {
                label: 'Discord',
                href: 'https://discord.com/invite/bnbchain',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/binance',
              },
              {
                label: 'Telegram',
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
