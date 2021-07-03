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
          react: path.resolve(__dirname, "node_modules/react"),
          "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
          "object-assign": path.resolve(
            __dirname,
            "node_modules/object-assign"
          ),
          "prop-types": path.resolve(__dirname, "node_modules/prop-types"),
          scheduler: path.resolve(__dirname, "node_modules/scheduler"),
          "@babel/runtime": path.resolve(
            __dirname,
            "node_modules/@babel/runtime"
          ),
          "@material-ui/core": path.resolve(
            __dirname,
            "node_modules/@material-ui/core"
          ),
          "@material-ui/icons": path.resolve(
            __dirname,
            "node_modules/@material-ui/icons"
          ),
          "@material-ui/styles": path.resolve(
            __dirname,
            "node_modules/@material-ui/styles"
          ),
          "@material-ui/system": path.resolve(
            __dirname,
            "node_modules/@material-ui/system"
          ),
          "@material-ui/utils": path.resolve(
            __dirname,
            "node_modules/@material-ui/utils"
          ),
          clsx: path.resolve(__dirname, "node_modules/clsx"),
          "dom-helpers": path.resolve(__dirname, "node_modules/dom-helpers"),
          "hoist-non-react-statics": path.resolve(
            __dirname,
            "node_modules/hoist-non-react-statics"
          ),
          "is-in-browser": path.resolve(
            __dirname,
            "node_modules/is-in-browser"
          ),
          jss: path.resolve(__dirname, "node_modules/jss"),
          "react-is": path.resolve(__dirname, "node_modules/react-is"),
          "react-transition-group": path.resolve(
            __dirname,
            "node_modules/react-transition-group"
          ),
          "tiny-warning": path.resolve(__dirname, "node_modules/tiny-warning"),
          "@babel/runtime-corejs3": path.resolve(
            __dirname,
            "node_modules/@babel/runtime-corejs3"
          ),
          //"carry-on-react": path.resolve(
          //__dirname,
          //"node_modules/carry-on-react"
          //),
          //"carry-on-store": path.resolve(
          //__dirname,
          //"node_modules/carry-on-store"
          //),
          //"carry-on-utils": path.resolve(
          //__dirname,
          //"node_modules/carry-on-utils"
          //),
          "core-js-pure": path.resolve(__dirname, "node_modules/core-js-pure"),
          "debounce-promise": path.resolve(
            __dirname,
            "../packages/carry-on-utils/node_modules/debounce-promise"
          ),
          "react-fast-compare": path.resolve(
            __dirname,
            "../packages/carry-on-utils/node_modules/react-fast-compare"
          ),
          "throttle-debounce": path.resolve(
            __dirname,
            "../packages/carry-on-utils/node_modules/throttle-debounce"
          ),
          rifm: path.resolve(__dirname, "node_modules/rifm")
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
