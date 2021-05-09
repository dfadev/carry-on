const { guessRootConfig } = require("lerna-jest");
const config = guessRootConfig(__dirname);
for (let c of config.projects) {
  c.moduleNameMapper = {
    "carry-on-utils": "<rootDir>/../carry-on-utils/dist/carry-on-utils.cjs.js",
    "carry-on-store": "<rootDir>/../carry-on-store/dist/carry-on-store.cjs.js",
    "carry-on-react": "<rootDir>/../carry-on-react/dist/carry-on-react.cjs.js",
    "carry-on-react-forms":
      "<rootDir>/../carry-on-react-forms/dist/carry-on-react-forms.cjs.js",
    "carry-on-react-router":
      "<rootDir>/../carry-on-react-router/dist/carry-on-react-router.cjs.js"
  };

  if (c.name.indexOf("react") !== -1)
    Object.assign(c.moduleNameMapper, {
      "^react($|/.+)": "<rootDir>/node_modules/react$1",
      "^react-dom($|/.+)": "<rootDir>/node_modules/react-dom$1"
    });
}

module.exports = config;
