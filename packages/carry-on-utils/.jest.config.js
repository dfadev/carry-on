module.exports = {
  setupTestFrameworkScriptFile: "./test/jest.setup.js",
  verbose: true,
  testPathIgnorePatterns: [
    "<rootDir>/build/",
    "<rootDir>/node_modules/",
    "<rootDir>/examples/",
    "<rootDir>/lib",
    "<rootDir>/src/jest.setup.js"
  ],
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage/"
};
