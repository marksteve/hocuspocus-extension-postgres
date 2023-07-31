import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
  },
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          allowSyntheticDefaultImports: true,
          declaration: true,
          lib: ['es2015'],
          target: 'es6',
        },
      },
    }),
  ],
}
