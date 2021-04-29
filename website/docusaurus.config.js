module.exports={
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
          "sidebarPath": "sidebars.json"
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
      ]
    },
    "image": "img/docusaurus.png",
    "footer": {
      "links": [],
      "copyright": "Copyright © 2021 Russ Panula",
      "logo": {
        "src": "img/card-travel.svg"
      }
    }
  }
}
