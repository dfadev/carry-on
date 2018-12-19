module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        targets: {
          browsers: ["last 2 versions"]
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
  plugins: ["@babel/plugin-proposal-class-properties"]
};
