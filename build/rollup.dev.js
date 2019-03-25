/* eslint-disable import/no-extraneous-dependencies */
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import { eslint } from 'rollup-plugin-eslint';
import html from 'rollup-plugin-fill-html';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const eslintPlugin = eslint({
  throwOnError: true,
  throwOnWarning: false,
  include: ['src/**'],
  exclude: ['node_modules/**'],
});

export default {
  input: 'examples/index.js',
  output: {
    file: 'demo/playerx.min.js',
    format: 'umd',
    name: 'Playerx',
    exports: 'named',
    sourcemap: true,
  },
  plugins: [
    eslintPlugin,
    babel(),
    uglify(),
    html({
      template: 'examples/index.html',
      filename: 'index.html',
    }),
    serve('demo'),
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
