module.exports = {
  //setupTestFrameworkScriptFile: "./node_modules/jest-enzyme/lib/index.js",
  setupTestFrameworkScriptFile: "./test/jest.setup.js",
  verbose: true,
  testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/", "<rootDir>/examples/", "<rootDir>/lib", "<rootDir>/src/jest.setup.js"],
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage/",
  moduleNameMapper: {
    '^carry-on-notify$': '<rootDir>/node_modules/carry-on-notify/es/carry-on-notify.js',
    '^carry-on-store$': '<rootDir>/node_modules/carry-on-store/es/carry-on-store.js',
    '^carry-on-transaction$': '<rootDir>/node_modules/carry-on-transaction/es/carry-on-transaction.js'
  }
};
