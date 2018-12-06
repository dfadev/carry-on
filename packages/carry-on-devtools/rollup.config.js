/** @format */
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import { eslint } from "rollup-plugin-eslint";

const pkg = require("./package.json");
const input = pkg.source;
const output = require("./.outputrc");
const minOutput = require("./.min.outputrc");
const eslintPlugin = eslint();
const babelPlugin = babel();
const terserPlugin = terser(require("./.terserc"));
const external = Object.keys(pkg.dependencies || {}).concat(
  Object.keys(pkg.peerDependencies || {})
);

const defaultConfig = {
  plugins: [eslintPlugin, babelPlugin],
  input,
  output,
  external
};

const minConfig = {
  plugins: [eslintPlugin, babelPlugin, terserPlugin],
  input,
  output: minOutput,
  external
};

export default [defaultConfig, minConfig];
