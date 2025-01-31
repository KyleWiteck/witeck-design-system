import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'Magnit Design',
  tagline: 'Brand Consistent, Scalable, and Accessible UI Library.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://peopleticker.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/magnit-design/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'peopleticker', // Usually your GitHub org/user name.
  projectName: 'magnit-design', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },

  themes: [
    '@docusaurus/theme-live-codeblock',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: '/',
        indexDocs: true,
        indexBlog: false,
        indexPages: false
      }
    ]
  ],

  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'types-api',
        out: './docs/types-api',
        entryPoints: ['../lib/src/types/index.ts'],
        tsconfig: '../lib/tsconfig.json',
        skipErrorChecking: true,
        readme: 'none',
        sidebar: { pretty: true },
        parametersFormat: 'list',
        enumMembersFormat: 'list',
        useCodeBlocks: true,
        disableSources: true,
        outputFileStrategy: 'modules',
        textContentMappings: {
          'title.indexPage': 'Types API Reference',
          'title.memberPage': '{name}'
        }
      }
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'hooks-api',
        out: './docs/hooks-api',
        entryPoints: ['../lib/src/hooks/index.ts'],
        tsconfig: '../lib/tsconfig.json',
        skipErrorChecking: true,
        readme: 'none',
        sidebar: { pretty: true },
        indexFormat: 'table',
        parametersFormat: 'table',
        enumMembersFormat: 'table',
        useCodeBlocks: true,
        disableSources: true,
        outputFileStrategy: 'modules',
        textContentMappings: {
          'title.indexPage': 'Hooks API Reference',
          'title.memberPage': '{name}'
        }
      }
    ],
    [
      'docusaurus-plugin-typedoc',
      {
        id: 'utils-api',
        out: './docs/utils-api',
        entryPoints: ['../lib/src/utils/index.ts'],
        tsconfig: '../lib/tsconfig.json',
        skipErrorChecking: true,
        readme: 'none',
        sidebar: { pretty: true },
        indexFormat: 'list',
        parametersFormat: 'list',
        enumMembersFormat: 'list',
        typeDeclarationFormat: 'table',
        useCodeBlocks: true,
        disableSources: true,
        outputFileStrategy: 'modules',
        textContentMappings: {
          'title.indexPage': 'Utilities API Reference',
          'title.memberPage': '{name}'
        }
      }
    ]
  ],
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/'
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/'
        },
        theme: {
          customCss: ['./src/css/custom.css']
        }
      } satisfies Preset.Options
    ]
  ],
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false
    },
    // Replace with your project's social card
    // image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Magnit Design',
      logo: {
        alt: 'Magnit Design',
        src: 'img/logo.svg'
      },
      items: [
        {
          to: '/docs/guides/styles-and-theming/style-basics',
          label: 'Styling Basics',
          position: 'right'
        },
        {
          to: '/docs/category/components/',
          label: 'Components',
          position: 'right'
        },
        {
          to: '/docs/hooks-api/',
          label: 'Hooks API',
          position: 'right'
        },
        {
          href: 'https://github.com/peopleticker/magnit-design',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },

    prism: {
      theme: prismThemes.vsDark
    }
  } satisfies Preset.ThemeConfig
};

export default config;
