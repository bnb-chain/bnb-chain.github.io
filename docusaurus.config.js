// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Binance Smart Chain Documentation',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Binance', // Usually your GitHub org/user name.
  //projectName: 'binance documentation', // Usually your repo name.
    
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
          editUrl: 'https://github.com/binance',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://www.binance.com/en/blog',
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
          'We are looking to revamp our docs, please fill <a target="_blank" rel="noopener noreferrer" href="#">this survey</a>',
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
        title: 'Binance Smart Chain Documentation',
        style: 'primary',
        logo: {
          alt: 'BSC',
          src: 'img/image.png',
        },
        items: [
          {
            type: 'dropdown',
            //type: 'doc',
            //docId: 'BSCtestnet',
            position: 'right',
            label: 'Develop',
            items: [
              {
                type: 'doc',
                label: 'Binance Chain',
                docId: 'bcdevelop',
              },
              {
                type: 'doc',
                label: 'Binance Smart Chain',
                docId: 'BSCtestnet',
              },
            ]
          },
          {
            type: 'doc',
            docId: 'validator/overview',
            position: 'right',
            label: 'Validate',
          },
          {
            type: 'doc',
            docId: 'Integrate',
            position: 'right',
            label: 'Integrate',
          },
          {
            type: 'doc',
            docId: 'learn/intro',
            position: 'right',
            label: 'Learn',
          },
          {
            type: 'doc',
            docId: 'cat-FAQs',
            position: 'right',
            label: 'FAQs',
          },
          {href: 'https://www.binance.org/en/blog/', label: 'Blog', position: 'right'},
          {href: 'http://discord.com/invite/binancesmartchain' , label:'Chat', position:'right'},
          {
            href: 'https://github.com/binance',
            label: 'GitHub',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/learn/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              /*{
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },*/
              
              {
                label: 'Blog',
                href: 'https://www.binance.org/en/blog/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/binance',
              },
              {
                label: 'Discord',
                href: 'http://discord.com/invite/binancesmartchain',
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
        copyright: `Copyright © ${new Date().getFullYear()} Binance Smart Chain.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
