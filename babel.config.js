const common = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        useBuiltIns: "usage",
        corejs: 3,
        targets: {
          chrome: "89",
          edge: "89",
          firefox: "87",
          //ie: "11",
          ios: "14",
          safari: "14",
          samsung: "13"
        }
        //debug: true
      }
    ]
  ]
};

module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [["@babel/plugin-transform-runtime", { corejs: 3 }]],

  env: {
    production: { ...common },
    development: { ...common },
    test: {}
  }
};
