import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['./dist/index.js'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: './dist/bundle.js',
  external: ['node:*'],
  sourcemap: true,
  minify: false,
});

console.log('✅ Build completed successfully');
