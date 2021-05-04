module.exports = {
  plugins: ["@babel/plugin-transform-runtime"],
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
