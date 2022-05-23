const path = require("path");

module.exports = {
  title: "carry-on",
  tagline: "State container for React",
  url: "https://dfadev.github.io/",
  baseUrl: "/carry-on/",
  organizationName: "dfadev",
  projectName: "carry-on",
  scripts: [],
  favicon: "img/favicon.ico",
  customFields: {},
  onBrokenLinks: "log",
  onBrokenMarkdownLinks: "log",
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          path: "../docs",
          sidebarPath: require.resolve("./sidebars.js")
        },
        blog: {},
        theme: {
          customCss: [require.resolve('./src/css/customTheme.css')]
        }
      }
    ]
  ],
  themes: ["@docusaurus/theme-live-codeblock"],
  themeConfig: {
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true
    },
    navbar: {
      title: "carry-on",
      logo: {
        src: "img/card-travel.svg"
      },
      items: [
        {
          to: "docs/",
          label: "Get Started",
          position: "left"
        },
        {
          to: "docs/examples/",
          label: "Examples",
          position: "left"
        },
        {
          href: "https://github.com/dfadev/carry-on",
          label: "GitHub",
          position: "left"
        }
      ]
    },
    image: "img/docusaurus.png",
    footer: {
      links: [],
      copyright: "Copyright © 2022 Russ Panula",
      logo: {
        src: "img/card-travel.svg"
      }
    }
  }
};
