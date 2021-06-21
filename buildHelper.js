import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import eslint from "@rollup/plugin-eslint";
import camelcase from "camelcase";
import { visualizer } from "rollup-plugin-visualizer";

const replace = item =>
  item.indexOf("@") > -1
    ? new RegExp(item.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
    : item;

export default pkg => {
  const external = [
    ...Object.keys(pkg.peerDependencies || {}).map(replace),
    ...Object.keys(pkg.dependencies || {}).map(replace)
  ];

  console.log("External:\n", external);
  return [
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
        }),
        visualizer()
      ],
      watch: { clearScreen: false },
      external
    }
  ];
};
