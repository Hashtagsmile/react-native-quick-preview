module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest-setup.js'],
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-gesture-handler|react-native-reanimated|react-native-portalize|react-native-safe-area-context)/)',
  ],
}
