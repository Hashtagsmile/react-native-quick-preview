import { defineConfig } from 'tsup'

const external = [
  // core
  'react',
  'react/jsx-runtime',
  'react-native',

  // RN deps used by the lib (do NOT bundle)
  'react-native-gesture-handler',
  'react-native-reanimated',
  'react-native-worklets',
  'react-native-safe-area-context',
  'react-native-portalize',
  'expo-haptics', // optional
]

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,          // friendlier in dev; flip to true for release
  target: 'es2017',
  platform: 'neutral',

  external,
  skipNodeModulesBundle: true,

  esbuildOptions(opts) {
    // Prefer RN-friendly resolution when it does need to resolve
    opts.conditions = ['react-native', 'module', 'import', 'default']
    // Fallback if some dependency ships JSX in .js (shouldn't be needed once externalized):
    // opts.loader = { '.js': 'jsx' }
  },
})
