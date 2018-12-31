module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        targets: {
          browsers: [">3%"]
        }
      }
    ]
  ],
  env: {
    test: {
      presets: ["@babel/preset-env"]
    }
  }
};
