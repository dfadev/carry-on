module.exports = {
  setupFilesAfterEnv: ["./test/jest.setup.js"],
  verbose: true,
  testPathIgnorePatterns: [
    "<rootDir>/build/",
    "<rootDir>/node_modules/",
    "<rootDir>/examples/",
    "<rootDir>/lib",
    "<rootDir>/test/jest.setup.js"
  ],
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage/"
};
