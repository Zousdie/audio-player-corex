/* eslint-disable import/no-extraneous-dependencies */
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import { eslint } from 'rollup-plugin-eslint';
import html from 'rollup-plugin-fill-html';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default {
  input: 'examples/index.js',
  output: {
    file: 'dist/examples.min.js',
    format: 'umd',
    name: 'Playerx',
    exports: 'named',
    sourcemap: true,
  },
  plugins: [
    eslint({
      throwOnError: true,
      throwOnWarning: false,
      include: ['src/**'],
      exclude: ['node_modules/**'],
    }),
    babel(),
    uglify(),
    html({
      template: 'examples/index.html',
      filename: 'index.html',
    }),
    serve('dist'),
    livereload(),
  ],
  watch: {
    exclude: 'node_modules/**',
    include: [
      'src/**',
      'examples/**',
    ],
  },
};
