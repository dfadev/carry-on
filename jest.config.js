/* eslint-disable no-restricted-syntax */
const { guessRootConfig } = require("lerna-jest");

const config = guessRootConfig(__dirname);

const reactProjects = [
  "carry-on-react",
  "carry-on-react-forms",
  "carry-on-react-router",
  "carry-on-react-view",
  "carry-on-material-view",
  "carry-on-material-app"
];

const reactProject = {
  moduleNameMapper: {
    "^react($|/.+)": "<rootDir>/node_modules/react$1",
    "^react-dom($|/.+)": "<rootDir>/node_modules/react-dom$1"
  }
};

for (const entry of config.projects) {
  const nm = entry.name.slice(0, -12);
  if (reactProjects.includes(nm)) Object.assign(entry, reactProject);
}

config.collectCoverageFrom = ["**/src/*.js"];
module.exports = config;
