import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import eslint from "@rollup/plugin-eslint";

export default function buildHelper(pkg, globals) {
  const input = pkg.source;

  const external = Object.keys(pkg.dependencies || {})
    .concat(Object.keys(pkg.peerDependencies || {}))
    .concat([
      "@babel/runtime/helpers/extends",
      "@babel/runtime/helpers/defineProperty"
    ]);

  const watch = {
    clearScreen: false,
    chokidar: {
      usePolling: true
    }
  };

  return [
    {
      input,
      output: {
        name: pkg.name,
        file: pkg.browser,
        format: "umd",
        sourcemap: true,
        globals
      },
      plugins: [
        resolve(),
        eslint(),
        babel({
          exclude: ["node_modules/**"],
          babelHelpers: "runtime"
        }),
        commonjs()
      ],
      watch,
      external
    },

    {
      input,
      output: [
        { file: pkg.main, format: "cjs", sourcemap: true },
        { file: pkg.module, format: "es", sourcemap: true }
      ],
      plugins: [
        eslint(),
        babel({
          exclude: ["node_modules/**"],
          babelHelpers: "runtime"
        })
      ],
      watch,
      external
    }
  ];
}
