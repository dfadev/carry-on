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
          customCss: "../src/css/customTheme.css"
        }
      }
    ]
  ],
  plugins: [
    [
      "docusaurus-plugin-module-alias",
      {
        alias: {
          react: path.resolve(__dirname, "../node_modules/react"),
          "react-dom": path.resolve(__dirname, "../node_modules/react-dom")
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
      copyright: "Copyright © 2021 Russ Panula",
      logo: {
        src: "img/card-travel.svg"
      }
    }
  }
};
