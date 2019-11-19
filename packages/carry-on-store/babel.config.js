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
      plugins: [
        "@babel/plugin-transform-modules-commonjs",
        [
          "@babel/plugin-transform-runtime",
          {
            regenerator: true
          }
        ]
      ],
      presets: ["@babel/preset-env"]
    }
  }
};
