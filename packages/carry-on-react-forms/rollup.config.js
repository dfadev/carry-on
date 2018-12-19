/** @format */
import babel from "rollup-plugin-babel";
import { eslint } from "rollup-plugin-eslint";

const pkg = require("./package.json");
const input = pkg.source;
const output = [
  {
    file: pkg.module,
    format: "esm",
    name: pkg.name,
    sourcemap: true
  }
];
const eslintPlugin = eslint();
const babelPlugin = babel();
const external = Object.keys(pkg.dependencies || {})
  .concat(Object.keys(pkg.peerDependencies || {}))
  .concat([
    "lodash/isFunction",
    "lodash/get",
    "lodash/isEqual",
    "lodash/clone",
    "lodash/isNumber",
    "lodash/isString",
    "lodash/setWith",
    "lodash/isEmpty"
  ]);

const defaultConfig = {
  plugins: [eslintPlugin, babelPlugin],
  input,
  output,
  external
};

export default defaultConfig;
