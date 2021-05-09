module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { browsers: ["> 3%, not dead"] } }],
    "@babel/preset-react"
  ],
  plugins: [["@babel/plugin-transform-runtime", { corejs: 3 }]]
};
