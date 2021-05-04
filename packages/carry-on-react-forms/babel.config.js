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
    ],
    "@babel/preset-react"
  ],
  env: {
    test: {
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: ["@babel/plugin-transform-modules-commonjs"]
    }
  },
  plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-transform-runtime"]
};
