const { guessRootConfig } = require("lerna-jest");

const config = guessRootConfig(__dirname);
config.collectCoverageFrom = ["**/src/*.js"];

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
  if (reactProjects.includes(nm)) {
    Object.assign(entry, reactProject);
    entry.snapshotSerializers = ["@emotion/jest/serializer"];
  }

  entry.transform = { "\\.(js|jsx|ts|tsx)$": "@sucrase/jest-plugin" };
  delete entry.name
}

module.exports = config;
