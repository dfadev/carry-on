import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import eslint from "@rollup/plugin-eslint";
import camelcase from "camelcase";

export default pkg => [
  {
    input: pkg.source,
    output: [
      {
        name: camelcase(pkg.name),
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
      commonjs({
        include: /node_modules/,
        sourcemap: false
      }),
      babel({
        rootMode: "upward",
        babelHelpers: "runtime"
      })
    ],
    watch: { clearScreen: false },
    external: [
      ...Object.keys(pkg.peerDependencies || {}),
      ...Object.keys(pkg.dependencies || {}),
      /@babel\/runtime-corejs3/
    ]
  }
];
