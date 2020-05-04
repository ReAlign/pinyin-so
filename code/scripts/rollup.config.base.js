// const path = require('path');
// const resolvePath = pathName => path.join(__dirname, '..', pathName);

import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';

import { eslint } from 'rollup-plugin-eslint';

const opts = {
  json: {}
};

export default {
  input: 'src/main.js',
  plugins: [
    alias({
      resolve: ['.js'],
    }),
    json(opts.json),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    resolve(),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'node_modules/**'
    }),
    eslint({
      include: ['src/**/*.js']
    }),
    babel({
      // runtimeHelpers: true,
      babelHelpers: 'runtime',
      exclude: 'node_modules/**' // only transpile our source code
    }),
  ]
}