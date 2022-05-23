import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import eslint from '@rollup/plugin-eslint'
import { visualizer } from 'rollup-plugin-visualizer'
import externals from 'rollup-plugin-node-externals'
import sucrase from '@rollup/plugin-sucrase'

export default pkg => [
  {
    input: pkg.source,
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true }
    ],
    plugins: [
      externals({ deps: true }),
      resolve(),
      !process.env.NO_LINT === 1 && eslint(),
      commonjs({
        include: /node_modules/,
        sourcemap: false
      }),
      sucrase({
        exclude: ['node_modules/**'],
        transforms: ["jsx"]
      }),
      visualizer()
    ],
    watch: { clearScreen: false }
  }
]
