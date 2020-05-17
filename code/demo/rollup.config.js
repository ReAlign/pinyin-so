import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import {
  terser
} from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import copy from 'rollup-plugin-copy';
// rollup.config.js
import postcss from 'rollup-plugin-postcss'

const IS_PROD = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: !IS_PROD,
    format: 'iife',
    name: 'app',
    file: 'build/bundle.[hash].js'
  },
  plugins: [
    // Copies public folder into `build/`
    copy({
      targets: [{
        src: 'public/*',
        dest: 'build'
      }]
    }),

    svelte({
      // enable run-time checks when not in IS_PROD
      dev: !IS_PROD,
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css: css => {
        // Emits CSS to file, disables CSS sourcemaps in production
        css.write('build/bundle.[hash].css', !IS_PROD);
      }
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !IS_PROD && serve({
      contentBase: ['build'],
      port: 3000,
    }),

    // Watch the `public` directory and refresh the
    // browser on changes when not in IS_PROD
    !IS_PROD && livereload('build'),

    // If we're building for IS_PROD (npm run build
    // instead of npm run dev), minify
    IS_PROD && terser(),

    postcss({
      minimize: true
      // extract: true,
      // // Or with custom file name
      // extract: path.resolve('dist/my-custom-file-name.css')
    })
  ],
  watch: {
    clearScreen: false
  }
};
