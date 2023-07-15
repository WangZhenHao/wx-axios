import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const name = require('./package.json').main.replace(/\.js$/, '')

const bundle = config => ({
  ...config,
  input: './main/index.ts',
  external: id => !/^[./]/.test(id),
  
})

export default [
  bundle({
    plugins: [esbuild()],
    output: [
      {
        file: `${name}.js`,
        format: 'cjs',
        sourcemap: false,
      },
      {
        file: `${name}.mjs`,
        format: 'es',
        sourcemap: false,
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `${name}.d.ts`,
      format: 'es',
    },
  }),
]