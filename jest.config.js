const { guessRootConfig } = require('lerna-jest')

const config = guessRootConfig(__dirname);
for (let c of config.projects) {
  if (c.name.indexOf("react") !== -1)
    c.moduleNameMapper = {
      "^react($|/.+)": "<rootDir>/node_modules/react$1",
      "^react-dom($|/.+)": "<rootDir>/node_modules/react-dom$1"
    };
};

module.exports = config;
