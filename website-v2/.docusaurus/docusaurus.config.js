export default {
  "title": "carry-on",
  "tagline": "State container for React",
  "url": "https://dfadev.github.io/",
  "baseUrl": "/carry-on/",
  "organizationName": "dfadev",
  "projectName": "carry-on",
  "scripts": [],
  "favicon": "img/favicon.ico",
  "customFields": {},
  "onBrokenLinks": "log",
  "onBrokenMarkdownLinks": "log",
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "homePageId": "index",
          "showLastUpdateAuthor": true,
          "showLastUpdateTime": true,
          "path": "../docs",
          "sidebarPath": "/home/hawk/git/carry-on-git/carry-on/website-v2/sidebars.json"
        },
        "blog": {},
        "theme": {
          "customCss": "../src/css/customTheme.css"
        }
      }
    ]
  ],
  "plugins": [],
  "themeConfig": {
    "navbar": {
      "title": "carry-on",
      "logo": {
        "src": "img/card-travel.svg"
      },
      "items": [
        {
          "to": "docs/",
          "label": "Overview",
          "position": "left"
        },
        {
          "to": "docs/api/index",
          "label": "API",
          "position": "left"
        },
        {
          "href": "https://github.com/dfadev/carry-on",
          "label": "GitHub",
          "position": "left"
        }
      ],
      "hideOnScroll": false
    },
    "image": "img/docusaurus.png",
    "footer": {
      "links": [],
      "copyright": "Copyright © 2021 Russ Panula",
      "logo": {
        "src": "img/card-travel.svg"
      },
      "style": "light"
    },
    "colorMode": {
      "defaultMode": "light",
      "disableSwitch": false,
      "respectPrefersColorScheme": false,
      "switchConfig": {
        "darkIcon": "🌜",
        "darkIconStyle": {},
        "lightIcon": "🌞",
        "lightIconStyle": {}
      }
    },
    "docs": {
      "versionPersistence": "localStorage"
    },
    "metadatas": [],
    "prism": {
      "additionalLanguages": []
    },
    "hideableSidebar": false
  },
  "baseUrlIssueBanner": true,
  "i18n": {
    "defaultLocale": "en",
    "locales": [
      "en"
    ],
    "localeConfigs": {}
  },
  "onDuplicateRoutes": "warn",
  "themes": [],
  "titleDelimiter": "|",
  "noIndex": false
};