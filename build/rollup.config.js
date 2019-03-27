import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import { eslint } from 'rollup-plugin-eslint';
import html from 'rollup-plugin-fill-html';

const { BABEL_MODULE } = process.env;

const eslintPlugin = eslint({
  throwOnError: true,
  throwOnWarning: false,
  include: ['src/**'],
  exclude: ['node_modules/**'],
});

export default BABEL_MODULE !== 'umd'
  ? {
    input: 'src/index.js',
    output: [
      {
        file: 'esm/index.js',
        format: 'es',
      },
      {
        file: 'lib/index.js',
        format: 'cjs',
        exports: 'named',
      },
    ],
    plugins: [
      eslintPlugin,
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true,
      }),
    ],
    external (id) {
      return /@babel\/runtime/.test(id);
    },
  }
  : [
    {
      input: 'src/index.js',
      output: {
        file: 'lib/playerx.min.js',
        format: 'umd',
        name: 'Playerx',
        exports: 'named',
      },
      plugins: [
        eslintPlugin,
        babel(),
        uglify(),
      ],
    },
    {
      input: 'examples/index.js',
      output: {
        file: 'demo/playerx.min.js',
        format: 'umd',
        name: 'Playerx',
        exports: 'named',
      },
      plugins: [
        eslintPlugin,
        babel(),
        uglify(),
        html({
          template: 'examples/index.html',
          filename: 'index.html',
        }),
      ],
    },
  ];
