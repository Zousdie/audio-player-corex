import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import { eslint } from 'rollup-plugin-eslint';

const eslintPlugin = eslint({
  throwOnError: true,
  throwOnWarning: false,
  include: ['src/**'],
  exclude: ['node_modules/**'],
});

export default [
  {
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
  },

  {
    input: 'src/index.js',
    output: {
      file: 'dist/recorderx.min.js',
      format: 'umd',
      name: 'Recorderx',
      exports: 'named',
    },
    plugins: [
      eslintPlugin,
      babel(),
      uglify(),
    ],
  },
];
