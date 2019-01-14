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
  coverageDirectory: "<rootDir>/coverage/",
  moduleNameMapper: {
    "^carry-on-utils$":
      "<rootDir>/node_modules/carry-on-utils/dist/carry-on-utils.esm.js",
    "^carry-on-store$":
      "<rootDir>/node_modules/carry-on-store/dist/carry-on-store.esm.js",
  }
};
