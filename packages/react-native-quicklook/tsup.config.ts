import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-native'],
  treeshake: true,
  minify: true,
  target: 'es2017',
  platform: 'neutral',
  globalName: 'ReactNativeQuickLook',
});
