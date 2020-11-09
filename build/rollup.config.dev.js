import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
const path = require('path');

export default {
  input: 'src/index.js',
  output: {
    name: 'WxAxois',
    file: 'example/dist/wx-axois.js',
    format: 'umd'
  },
  watch: {
    inlude: 'src/**'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    })
  ]
}
