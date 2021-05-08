import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import eslint from "@rollup/plugin-eslint";

export default pkg => [
  {
    input: pkg.source,
    output: [
      {
        name: pkg.name,
        file: pkg.browser,
        format: "umd",
        sourcemap: true
      },
      { file: pkg.main, format: "cjs", sourcemap: true },
      { file: pkg.module, format: "es", sourcemap: true }
    ],
    plugins: [
      resolve(),
      eslint(),
      babel({
        rootMode: "upward",
        exclude: ["node_modules/**"],
        babelHelpers: "runtime"
      }),
      commonjs()
    ],
    watch: { clearScreen: false },
    external: [...Object.keys(pkg.peerDependencies || {}), /@babel\/runtime/]
  }
];
