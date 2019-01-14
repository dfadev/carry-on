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
  },
  {
    file: pkg.main,
    format: "cjs",
    name: pkg.name,
    sourcemap: true
  },
  {
    file: pkg.browser,
    format: "umd",
    name: pkg.name,
    sourcemap: true,
    globals: {
      react: "React",
      "carry-on-utils": "carryOnUtils",
      "carry-on-store": "carryOnStore",
      "hoist-non-react-statics": "hoistNonReactStatic",
      history: "history",
      "history/createBrowserHistory": "createBrowserHistory",
      "path-to-regexp": "pathToRegExp",
      "carry-on-react": "carryOnReact"
    }
  }
];
const eslintPlugin = eslint();
const babelPlugin = babel();
const external = Object.keys(pkg.dependencies || {}).concat(
  Object.keys(pkg.peerDependencies || {})
);
const watch = {
  clearScreen: false
};
const defaultConfig = {
  plugins: [eslintPlugin, babelPlugin],
  input,
  output,
  external,
  watch
};

export default defaultConfig;
