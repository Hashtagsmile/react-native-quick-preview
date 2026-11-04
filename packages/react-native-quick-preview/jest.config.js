module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['./jest-setup.js'],
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-gesture-handler|react-native-reanimated|react-native-safe-area-context)/)',
  ],
}
