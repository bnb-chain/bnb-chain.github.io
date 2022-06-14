// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'BNB Chain Documentation',
  url: 'https://github.com/RumeelHussainbnb/beta_BSC_Docs',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/icon/favicon.ico',
  organizationName: 'RumeelHussainbnb', 
  projectName: 'beta_BSC_Docs/docs', 
  deploymentBranch: 'gh-pages',
 
  
  plugins: [require.resolve("docusaurus-plugin-image-zoom")],
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/RumeelHussainbnb/beta_BSC_Docs/blob/master/',
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
                href: 'https://www.bnbchain.org/en/blog/',
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
                href: 'https://twitter.com/BNBCHAIN',
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
